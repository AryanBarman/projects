// usage: node cdp.js file t1,t2,t3 [prefix]   -> screenshots S/<prefix>_<t>.png ; prints console errors; on hang prints stack
const { spawn } = require('child_process');
const fs = require('fs');
const S = process.env.SCR;
const file = process.argv[2], times = process.argv[3].split(','), prefix = process.argv[4] || 'e';
const port = 9300 + Math.floor(Math.random() * 500);
const chrome = spawn('C:/Program Files/Google/Chrome/Application/chrome.exe', [
  '--headless=new', '--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--hide-scrollbars',
  '--window-size=1920,1080', `--remote-debugging-port=${port}`, '--user-data-dir=' + S + '/prof' + port, 'about:blank'
], { stdio: 'ignore' });
const sleep = ms => new Promise(r => setTimeout(r, ms));
(async () => {
  let targets;
  for (let i = 0; i < 40; i++) { try { targets = await (await fetch(`http://127.0.0.1:${port}/json`)).json(); if (targets.length) break; } catch (e) {} await sleep(250); }
  const page = targets.find(t => t.type === 'page');
  const ws = new WebSocket(page.webSocketDebuggerUrl);
  await new Promise(r => ws.onopen = r);
  let id = 0; const pend = {};
  const send = (method, params = {}) => new Promise((res, rej) => { const i = ++id; pend[i] = { res, rej }; ws.send(JSON.stringify({ id: i, method, params })); });
  ws.onmessage = ev => {
    const m = JSON.parse(ev.data);
    if (m.id && pend[m.id]) { m.error ? pend[m.id].rej(new Error(JSON.stringify(m.error))) : pend[m.id].res(m.result); delete pend[m.id]; }
    else if (m.method === 'Runtime.exceptionThrown') console.log('EXC', m.params.exceptionDetails.exception?.description || m.params.exceptionDetails.text);
    else if (m.method === 'Runtime.consoleAPICalled' && ['error', 'warning'].includes(m.params.type)) console.log('CONSOLE', m.params.type, m.params.args.map(a => a.value || a.description).join(' ').slice(0, 300));
    else if (m.method === 'Debugger.paused') { console.log('PAUSED', m.params.callFrames.slice(0, 8).map(f => `${f.functionName}:${f.location.lineNumber + 1}`).join(' < ')); }
  };
  await send('Runtime.enable'); await send('Debugger.enable'); await send('Page.enable');
  await send('Emulation.setDeviceMetricsOverride', { width: 1920, height: 1080, deviceScaleFactor: 1, mobile: false });
  await send('Page.navigate', { url: `file:///C:/Users/Aryan%20Barman/Projects/learning/myenv-test/${file}?capture=1&t=0` });
  const ev = async (expr, to = 30000) => {
    return Promise.race([send('Runtime.evaluate', { expression: expr, returnByValue: true, awaitPromise: true }), sleep(to).then(() => 'TIMEOUT')]);
  };
  let ready = false;
  for (let i = 0; i < 60 && !ready; i++) { await sleep(500); const r = await ev('window.READY===true', 4000); if (r === 'TIMEOUT') break; ready = r.result && r.result.value; }
  if (!ready) { console.log('NOT READY -> pausing'); await send('Debugger.pause').catch(() => {}); await sleep(1500); chrome.kill(); process.exit(1); }
  for (const t of times) {
    const t0 = Date.now();
    const r = await ev(`(()=>{ window.render(${t}); return 'ok'; })()`, 45000);
    if (r === 'TIMEOUT') { console.log('RENDER HANG at', t); await send('Debugger.pause').catch(() => {}); await sleep(1500); break; }
    if (r.exceptionDetails) { console.log('RENDER EXC at', t, r.exceptionDetails.exception?.description?.slice(0, 500)); continue; }
    await sleep(120);
    const shot = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(`${S}/${prefix}_${t}.png`, Buffer.from(shot.data, 'base64'));
    console.log('shot', t, (Date.now() - t0) + 'ms');
  }
  chrome.kill(); process.exit(0);
})().catch(e => { console.log('ERR', e.message); chrome.kill(); process.exit(1); });
