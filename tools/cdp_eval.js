// usage: node cdp_eval.js <page.html in the myenv-test folder> <file-with-a-JS-expression>   -> prints the JSON result of evaluating the expression inside the loaded page (after READY)
const { spawn } = require('child_process');
const fs = require('fs');
const S = process.env.SCR, file = process.argv[2], expr = fs.readFileSync(process.argv[3], 'utf8');
try { for (const d of fs.readdirSync(S)) if (/^prof[0-9]+$/.test(d)) fs.rmSync(S + '/' + d, { recursive: true, force: true }); } catch (e) {}   // remove headless-Chrome profiles of earlier runs
const port = 9300 + Math.floor(Math.random() * 500);
const chrome = spawn('C:/Program Files/Google/Chrome/Application/chrome.exe', ['--headless=new', '--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--hide-scrollbars', '--window-size=1920,1080', `--remote-debugging-port=${port}`, '--user-data-dir=' + S + '/prof' + port, 'about:blank'], { stdio: 'ignore' });
const sleep = ms => new Promise(r => setTimeout(r, ms));
(async () => {
  let targets; for (let i = 0; i < 40; i++) { try { targets = await (await fetch(`http://127.0.0.1:${port}/json`)).json(); if (targets.length) break; } catch (e) {} await sleep(250); }
  const ws = new WebSocket(targets.find(t => t.type === 'page').webSocketDebuggerUrl); await new Promise(r => ws.onopen = r);
  let id = 0; const pend = {}; const send = (method, params = {}) => new Promise((res, rej) => { const i = ++id; pend[i] = { res, rej }; ws.send(JSON.stringify({ id: i, method, params })); });
  ws.onmessage = ev => { const m = JSON.parse(ev.data); if (m.id && pend[m.id]) { m.error ? pend[m.id].rej(new Error(JSON.stringify(m.error))) : pend[m.id].res(m.result); delete pend[m.id]; } else if (m.method === 'Runtime.exceptionThrown') console.log('EXC', m.params.exceptionDetails.exception?.description || m.params.exceptionDetails.text); };
  await send('Runtime.enable'); await send('Page.enable'); await send('Emulation.setDeviceMetricsOverride', { width: 1920, height: 1080, deviceScaleFactor: 1, mobile: false });
  await send('Page.navigate', { url: `file:///C:/Users/Aryan%20Barman/Projects/learning/myenv-test/${file}?capture=1&t=0` });
  const ev = (e, to = 120000) => Promise.race([send('Runtime.evaluate', { expression: e, returnByValue: true, awaitPromise: true }), sleep(to).then(() => ({ result: { value: 'TIMEOUT' } }))]);
  let ready = false; for (let i = 0; i < 120 && !ready; i++) { await sleep(500); const r = await ev('window.READY===true', 4000); ready = r.result && r.result.value; }
  if (!ready) { console.log('NOT READY'); chrome.kill(); process.exit(1); }
  const r = await ev(expr); console.log(JSON.stringify(r.result ? r.result.value : r)); chrome.kill(); process.exit(0);
})().catch(e => { console.log('ERR', e.message); chrome.kill(); process.exit(1); });
