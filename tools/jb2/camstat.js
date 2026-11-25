// usage: node camstat.js <file in myenv-test> <duration>   (env SCR = scratch folder)
// Samples evalCam(t) every 0.25 s and prints how much the camera really moves: speed, % of near-static seconds, distance and fov range, close-up seconds.
const { spawn } = require('child_process'); const fs = require('fs');
const S = process.env.SCR, file = process.argv[2], dur = parseFloat(process.argv[3]);
const port = 9300 + Math.floor(Math.random() * 500);
const chrome = spawn('C:/Program Files/Google/Chrome/Application/chrome.exe', ['--headless=new', '--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--window-size=1920,1080', '--remote-debugging-port=' + port, '--user-data-dir=' + S + '/prof' + port, 'about:blank'], { stdio: 'ignore' });
const sleep = ms => new Promise(r => setTimeout(r, ms));
(async () => {
  let targets; for (let i = 0; i < 40; i++) { try { targets = await (await fetch('http://127.0.0.1:' + port + '/json')).json(); if (targets.length) break; } catch (e) {} await sleep(250); }
  const ws = new WebSocket(targets.find(t => t.type === 'page').webSocketDebuggerUrl); await new Promise(r => ws.onopen = r);
  let id = 0; const pend = {}; ws.onmessage = ev => { const m = JSON.parse(ev.data); if (m.id && pend[m.id]) { pend[m.id].res(m.result); delete pend[m.id]; } };
  const send = (method, params = {}) => new Promise(res => { const i = ++id; pend[i] = { res }; ws.send(JSON.stringify({ id: i, method, params })); });
  await send('Runtime.enable'); await send('Page.enable');
  await send('Page.navigate', { url: 'file:///C:/Users/Aryan%20Barman/Projects/learning/myenv-test/' + file + '?capture=1&t=0' });
  const ev = async e => (await send('Runtime.evaluate', { expression: e, returnByValue: true, awaitPromise: true })).result;
  for (let i = 0; i < 80; i++) { await sleep(500); const r = await ev('window.READY===true'); if (r && r.value) break; }
  const r = await ev('(()=>{ const o=[]; for(let t=0;t<=' + dur + ';t+=0.25){ const v=window.__evalCam(t); o.push(v.slice()); } return JSON.stringify(o); })()');
  const V = JSON.parse(r.value), dt = 0.25; let path = 0, still = 0, close = 0; const secs = Math.floor(dur); const perSec = new Array(secs).fill(0), dist = [], fov = [];
  for (let i = 0; i < V.length; i++) { const v = V[i], d = Math.hypot(v[0] - v[3], v[1] - v[4], v[2] - v[5]); dist.push(d); fov.push(v[6]); if (d < 13) close += dt;
    if (i) { const p = V[i - 1], mv = Math.hypot(v[0] - p[0], v[1] - p[1], v[2] - p[2]) + 0.6 * Math.hypot(v[3] - p[3], v[4] - p[4], v[5] - p[5]) + 0.2 * d * Math.abs(v[6] - p[6]) * Math.PI / 180; path += mv; const s = Math.min(secs - 1, Math.floor(i * dt)); perSec[s] += mv; } }
  perSec.forEach(m => { if (m < 1.0) still++; });
  const out = file + '  dur=' + dur + '  speed=' + (path / dur).toFixed(2) + ' u/s  near-static seconds=' + Math.round(still / secs * 100) + '%  dist ' + Math.min(...dist).toFixed(1) + '-' + Math.max(...dist).toFixed(1) + '  fov ' + Math.min(...fov).toFixed(0) + '-' + Math.max(...fov).toFixed(0) + '  close-up(<13u) seconds=' + close.toFixed(1);
  console.log(out); fs.appendFileSync(S + '/camstat.txt', out + '\n'); chrome.kill(); process.exit(0);
})();
