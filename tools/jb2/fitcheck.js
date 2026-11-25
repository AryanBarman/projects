// usage: node fitcheck.js <file in myenv-test> <duration> [step=0.5]   (env SCR = output folder)
// Renders the page on a dense time grid with window.__FITON and reports: labels/panels/characters cropped by the frame,
// labels under the caption box or headline block, and label-on-label overlaps. Output: SCR/fit_<file>.txt
const { spawn } = require('child_process'); const fs = require('fs');
const S = process.env.SCR, file = process.argv[2], dur = parseFloat(process.argv[3]), step = parseFloat(process.argv[4] || 0.5);
const port = 9300 + Math.floor(Math.random() * 500);
const chrome = spawn('C:/Program Files/Google/Chrome/Application/chrome.exe', ['--headless=new', '--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--hide-scrollbars', '--window-size=1920,1080', '--remote-debugging-port=' + port, '--user-data-dir=' + S + '/prof' + port, 'about:blank'], { stdio: 'ignore' });
const sleep = ms => new Promise(r => setTimeout(r, ms));
(async () => {
  let targets; for (let i = 0; i < 40; i++) { try { targets = await (await fetch('http://127.0.0.1:' + port + '/json')).json(); if (targets.length) break; } catch (e) {} await sleep(250); }
  const ws = new WebSocket(targets.find(t => t.type === 'page').webSocketDebuggerUrl); await new Promise(r => ws.onopen = r);
  let id = 0; const pend = {}; ws.onmessage = ev => { const m = JSON.parse(ev.data); if (m.id && pend[m.id]) { pend[m.id].res(m.result); delete pend[m.id]; } };
  const send = (method, params = {}) => new Promise(res => { const i = ++id; pend[i] = { res }; ws.send(JSON.stringify({ id: i, method, params })); });
  await send('Runtime.enable'); await send('Page.enable'); await send('Emulation.setDeviceMetricsOverride', { width: 1920, height: 1080, deviceScaleFactor: 1, mobile: false });
  await send('Page.navigate', { url: 'file:///C:/Users/Aryan%20Barman/Projects/learning/myenv-test/' + file + '?capture=1&t=0' });
  const ev = async e => (await send('Runtime.evaluate', { expression: e, returnByValue: true, awaitPromise: true })).result;
  for (let i = 0; i < 80; i++) { await sleep(500); const r = await ev('window.READY===true'); if (r && r.value) break; }
  await ev('window.__FITON=true');
  const M = 14, CAP = { x0: 360, x1: 1560, y0: 885, y1: 1030 }, HEAD = { x0: 0, x1: 640, y0: 0, y1: 190 };
  const issues = {}; const add = (k, t, msg) => { (issues[k] = issues[k] || { msg, ts: [] }).ts.push(t); };
  for (let t = 0; t <= dur; t += step) {
    const r = await ev('(()=>{ window.render(' + t + '); return JSON.stringify(window.__FIT||[]); })()'); if (!r || !r.value) continue; const L = JSON.parse(r.value);
    const lab = L.filter(o => o.kind !== 'char');
    L.forEach(o => {
      const w = o.x1 - o.x0, h = o.y1 - o.y0; if (w > 3000 || h > 2000) return;
      const cx = Math.max(0, Math.min(1920, o.x1)) - Math.max(0, o.x0), cy = Math.max(0, Math.min(1080, o.y1)) - Math.max(0, o.y0), vis = (cx > 0 && cy > 0) ? (cx * cy) / (w * h) : 0;
      if (vis < 0.02) return;
      const crop = o.x0 < -M || o.x1 > 1920 + M || o.y0 < -M || o.y1 > 1080 + M;
      if (crop && vis < 0.97) add('CROP|' + o.kind + '|' + o.name, t, o.kind + ' "' + o.name + '" cropped by the frame (' + Math.round(vis * 100) + '% visible)');
      if (o.kind === 'label' || o.kind === 'panel') {
        const ox = Math.min(o.x1, CAP.x1) - Math.max(o.x0, CAP.x0), oy = Math.min(o.y1, CAP.y1) - Math.max(o.y0, CAP.y0); if (ox > 40 && oy > 25 && h < 400) add('CAP|' + o.name, t, '"' + o.name + '" sits under the caption box');
        const hx = Math.min(o.x1, HEAD.x1) - Math.max(o.x0, HEAD.x0), hy = Math.min(o.y1, HEAD.y1) - Math.max(o.y0, HEAD.y0); if (hx > 40 && hy > 20 && h < 400) add('HEAD|' + o.name, t, '"' + o.name + '" sits under the headline block');
      }
    });
    for (let i = 0; i < lab.length; i++) for (let j = i + 1; j < lab.length; j++) {
      const a = lab[i], b = lab[j]; if (a.name === b.name || (a.x1 - a.x0) > 1500 || (b.x1 - b.x0) > 1500) continue;
      const ox = Math.min(a.x1, b.x1) - Math.max(a.x0, b.x0), oy = Math.min(a.y1, b.y1) - Math.max(a.y0, b.y0); if (ox <= 0 || oy <= 0) continue;
      const small = Math.min((a.x1 - a.x0) * (a.y1 - a.y0), (b.x1 - b.x0) * (b.y1 - b.y0)); if (ox * oy / small > 0.3) add('OVL|' + [a.name, b.name].sort().join('|'), t, '"' + a.name + '" overlaps "' + b.name + '"');
    }
  }
  const rng = ts => { const out = []; let s = ts[0], p = ts[0]; for (let i = 1; i <= ts.length; i++) { if (i === ts.length || ts[i] - p > step * 1.6) { out.push(s === p ? s.toFixed(1) : s.toFixed(1) + '-' + p.toFixed(1)); s = ts[i]; } p = ts[i]; } return out.join(', '); };
  const lines = Object.values(issues).sort((a, b) => a.ts[0] - b.ts[0]).map(v => v.msg + '  @ ' + rng(v.ts) + ' s  (' + v.ts.length + ' samples)');
  const out = 'FIT CHECK ' + file + '  dur=' + dur + ' step=' + step + '  issues=' + lines.length + '\n' + (lines.join('\n') || 'no issues found');
  fs.writeFileSync(S + '/fit_' + file.replace('.html', '') + '.txt', out); console.log(out); chrome.kill(); process.exit(0);
})();
