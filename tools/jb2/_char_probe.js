(() => {
  // pixel motion of one character over time: fraction of pixels that change between frames sampled at 15 fps, and mean absolute change, for several poses/expressions
  const cv = document.createElement('canvas'); cv.width = 640; cv.height = 760; const g = cv.getContext('2d', { willReadFrequently: true });
  const cases = { 'shrug+scared (held)': { pose: 'shrug', ex: [[0, 'scared']], phase: 2.1 }, 'cross+determined (held)': { pose: 'cross', ex: [[0, 'determined']], phase: 4.2 }, 'hold paper+proud': { pose: 'hold', prop: 'paper', ex: [[0, 'proud']], phase: 1.3 }, 'talk': { pose: 'talk', ex: [[0, 'talk']], phase: 0.4 }, 'idle neutral': { pose: 'idle', ex: [[0, 'neutral']], phase: 3.3 } };
  const out = {};
  for (const k of Object.keys(cases)) {
    let prev = null, changed = 0, mad = 0, n = 0;
    for (let t = 9.0; t < 11.0; t += 1 / 15) {
      g.clearRect(0, 0, 640, 760); Stick.draw(g, 'analyst', 320, 720, 1.0, cases[k], t); const d = g.getImageData(0, 0, 640, 760).data;
      if (prev) { let c = 0, s = 0; for (let i = 0; i < d.length; i += 16) { const df = Math.abs(d[i] - prev[i]) + Math.abs(d[i + 1] - prev[i + 1]) + Math.abs(d[i + 2] - prev[i + 2]) + Math.abs(d[i + 3] - prev[i + 3]); if (df > 24) c++; s += df; } changed += c / (d.length / 16); mad += s / (d.length / 16); n++; }
      prev = d.slice();
    }
    out[k] = { changedPct: +(100 * changed / n).toFixed(2), meanAbsDiff: +(mad / n).toFixed(2) };
  }
  return out;
})()
