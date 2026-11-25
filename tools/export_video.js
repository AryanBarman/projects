// OFFLINE FRAME-EXACT EXPORT: renders page.render(t) for every frame (no real-time capture => no dropped frames, perfect A/V sync)
// and pipes the frames to ffmpeg. Works for every page that has the ?capture=1 / window.render(t) / window.READY hooks (all -3d, -hybrid, -short pages).
//
// usage: node export_video.js <page.html> <out.mp4> --dur 66.8 [--wav "audio/Act 3 part 1.wav"] [--fps 30] [--w 1920 --h 1080]
//                              [--workers 3] [--start 0] [--crf 18] [--gpu 1] [--offset 0] [--frames-only 1] [--max 0]
//   --workers N   N parallel Chrome tabs/processes, each renders a slice of the frames (about N x faster; use 2-4 on a GPU machine)
//   --gpu 1       real GPU (default). --gpu 0 = SwiftShader (slow, for machines without GPU)
//   --offset ms   shift audio vs video (+ = audio later)
//   --frames-only write PNGs to <out>_frames/ and print the ffmpeg command instead of running it (use when ffmpeg is missing)
//   --max N       render only the first N frames (quick test)
// Portrait shorts: pass the -short.html page with --w 1080 --h 1920.
const { spawn, spawnSync } = require('child_process');
const fs = require('fs'), path = require('path'), os = require('os');
const A = process.argv.slice(2), pos = A.filter(a => !a.startsWith('--') && !/^--/.test(A[A.indexOf(a) - 1] || ''));
const opt = (k, d) => { const i = A.indexOf('--' + k); return i >= 0 ? A[i + 1] : d; };
const page = path.resolve(A[0]), out = path.resolve(A[1]);
const dur = parseFloat(opt('dur', 0)), fps = parseInt(opt('fps', 30)), W = parseInt(opt('w', 1920)), H = parseInt(opt('h', 1080));
const workers = Math.max(1, parseInt(opt('workers', 1))), t0 = parseFloat(opt('start', 0)), crf = opt('crf', '18');
const wav = opt('wav', ''), gpu = opt('gpu', '1') !== '0', offset = parseFloat(opt('offset', 0)), framesOnly = opt('frames-only', '0') === '1';
const maxF = parseInt(opt('max', 0));
if (!A[0] || !A[1] || !dur) { console.log(fs.readFileSync(__filename, 'utf8').split('\n').slice(0, 15).join('\n')); process.exit(1); }
const CHROME = process.env.CHROME || 'C:/Program Files/Google/Chrome/Application/chrome.exe';
let total = Math.round(dur * fps); if (maxF) total = Math.min(total, maxF);
const sleep = ms => new Promise(r => setTimeout(r, ms));
const hasFF = !spawnSync('ffmpeg', ['-version']).error;
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'exp_'));
const url = 'file:///' + page.replace(/\\/g, '/').split('/').map((s, i) => i === 0 ? s : encodeURIComponent(s)).join('/') + '?capture=1&t=0';

async function worker(id, f0, f1) {
  const port = 9600 + id * 7 + Math.floor(Math.random() * 5), prof = path.join(tmp, 'prof' + id);
  const args = ['--headless=new', '--hide-scrollbars', '--mute-audio', `--window-size=${W},${H}`, `--remote-debugging-port=${port}`, '--user-data-dir=' + prof, '--allow-file-access-from-files', '--disable-background-timer-throttling', '--disable-renderer-backgrounding'];
  if (!gpu) args.push('--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader'); else args.push('--ignore-gpu-blocklist', '--enable-gpu-rasterization');
  const chrome = spawn(CHROME, args.concat('about:blank'), { stdio: 'ignore' });
  let targets; for (let i = 0; i < 60; i++) { try { targets = await (await fetch(`http://127.0.0.1:${port}/json`)).json(); if (targets.length) break; } catch (e) {} await sleep(250); }
  const ws = new WebSocket(targets.find(t => t.type === 'page').webSocketDebuggerUrl); await new Promise(r => ws.onopen = r);
  let n = 0; const pend = {};
  const send = (method, params = {}) => new Promise((res, rej) => { const i = ++n; pend[i] = { res, rej }; ws.send(JSON.stringify({ id: i, method, params })); });
  ws.onmessage = ev => { const m = JSON.parse(ev.data); if (m.id && pend[m.id]) { m.error ? pend[m.id].rej(new Error(JSON.stringify(m.error))) : pend[m.id].res(m.result); delete pend[m.id]; } else if (m.method === 'Runtime.exceptionThrown' && id === 0) console.log('EXC', (m.params.exceptionDetails.exception || {}).description || m.params.exceptionDetails.text); };
  await send('Runtime.enable'); await send('Page.enable');
  await send('Emulation.setDeviceMetricsOverride', { width: W, height: H, deviceScaleFactor: 1, mobile: false });
  await send('Page.navigate', { url });
  let ready = false; for (let i = 0; i < 240 && !ready; i++) { await sleep(500); const r = await send('Runtime.evaluate', { expression: 'window.READY===true', returnByValue: true }).catch(() => null); ready = r && r.result && r.result.value; }
  if (!ready) { chrome.kill(); throw new Error('page never became READY (needs internet for three.js? syntax error?)'); }
  const segFile = path.join(tmp, `seg_${id}.mp4`), framesDir = out.replace(/\.\w+$/, '') + '_frames';
  let ff = null;
  if (framesOnly || !hasFF) fs.mkdirSync(framesDir, { recursive: true });
  else {
    ff = spawn('ffmpeg', ['-y', '-loglevel', 'error', '-f', 'image2pipe', '-framerate', String(fps), '-c:v', 'mjpeg', '-i', '-', '-c:v', 'libx264', '-preset', 'medium', '-crf', crf, '-pix_fmt', 'yuv420p', '-r', String(fps), '-an', segFile], { stdio: ['pipe', 'inherit', 'inherit'] });
  }
  const ts = Date.now();
  for (let f = f0; f < f1; f++) {
    const t = t0 + f / fps;
    const r = await send('Runtime.evaluate', { expression: `(()=>{window.render(${t.toFixed(5)});return 1})()`, returnByValue: true });
    if (r.exceptionDetails) console.log('RENDER EXC at', t.toFixed(2), (r.exceptionDetails.exception || {}).description);
    const shot = await send('Page.captureScreenshot', ff ? { format: 'jpeg', quality: 96 } : { format: 'png' });
    const buf = Buffer.from(shot.data, 'base64');
    if (ff) { if (!ff.stdin.write(buf)) await new Promise(r => ff.stdin.once('drain', r)); } else fs.writeFileSync(path.join(framesDir, `f_${String(f).padStart(6, '0')}.png`), buf);
    if (id === 0 && (f - f0) % (fps * 2) === 0) console.log(`worker0 frame ${f - f0}/${f1 - f0}  ${((Date.now() - ts) / Math.max(1, f - f0 + 1)).toFixed(0)} ms/frame`);
  }
  if (ff) { ff.stdin.end(); await new Promise(r => ff.on('close', r)); }
  ws.close(); chrome.kill();
  return { seg: segFile, framesDir };
}

(async () => {
  const per = Math.ceil(total / workers), jobs = [];
  for (let i = 0; i < workers; i++) { const a = i * per, b = Math.min(total, a + per); if (a < b) jobs.push(worker(i, a, b)); }
  const res = await Promise.all(jobs);
  const framesDir = res[0].framesDir;
  const audioArgs = wav ? (offset ? ['-itsoffset', String(offset / 1000), '-i', wav] : ['-i', wav]) : [];
  if (framesOnly || !hasFF) {
    console.log(`\nFrames saved to ${framesDir}  (${total} frames @ ${fps} fps). ffmpeg ${hasFF ? 'skipped (--frames-only)' : 'NOT FOUND on PATH'}. Run this where ffmpeg exists:`);
    console.log(`ffmpeg -framerate ${fps} -i "${framesDir}/f_%06d.png"${wav ? ` -i "${wav}"` : ''} -c:v libx264 -preset slow -crf ${crf} -pix_fmt yuv420p -r ${fps}${wav ? ' -c:a aac -b:a 192k -shortest' : ''} -movflags +faststart "${out}"`);
    return;
  }
  const list = path.join(tmp, 'list.txt'); fs.writeFileSync(list, res.map(r => `file '${r.seg.replace(/\\/g, '/')}'`).join('\n'));
  const ffArgs = ['-y', '-loglevel', 'error', '-f', 'concat', '-safe', '0', '-i', list].concat(audioArgs, ['-c:v', 'copy'], wav ? ['-c:a', 'aac', '-b:a', '192k', '-shortest'] : [], ['-movflags', '+faststart', out]);
  const r = spawnSync('ffmpeg', ffArgs, { stdio: 'inherit' });
  console.log(r.status === 0 ? `DONE ${out}` : 'ffmpeg mux failed');
  fs.rmSync(tmp, { recursive: true, force: true });
})().catch(e => { console.log('ERR', e.message); process.exit(1); });
