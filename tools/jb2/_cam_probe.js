(() => {
  const dt = 1 / 30, rows = []; let prev = null;
  for (let t = 0; t <= 42.2; t += dt) { const v = window.__evalCam(t); if (prev) rows.push([+t.toFixed(3), Math.hypot(v[0] - prev[0], v[1] - prev[1], v[2] - prev[2]) / dt, Math.hypot(v[3] - prev[3], v[4] - prev[4], v[5] - prev[5]) / dt, Math.abs(v[6] - prev[6]) / dt, Math.abs(Math.atan2(v[0] - v[3], v[2] - v[5]) - Math.atan2(prev[0] - prev[3], prev[2] - prev[5])) / dt]); prev = v; }
  const sec = []; for (let s = 0; s < 42; s++) { const r = rows.filter(x => x[0] >= s && x[0] < s + 1); sec.push([s, +(r.reduce((a, x) => a + x[1], 0) / r.length).toFixed(2), +(r.reduce((a, x) => a + x[2], 0) / r.length).toFixed(2), +(r.reduce((a, x) => a + x[3], 0) / r.length).toFixed(2), +(r.reduce((a, x) => a + x[4], 0) / r.length).toFixed(3)]); }
  return { sec, maxPos: Math.max(...rows.map(x => x[1])), keys: (window.__camKeys ? window.__camKeys().length : 0) };
})()
