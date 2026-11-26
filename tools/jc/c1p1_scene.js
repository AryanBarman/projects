  const HEADS = [
    [0.10, 6.6, 'THE COMEBACK', 'Jensen is back to save a $4 trillion empire', PAL.sageHi],
    [7.2, 14.7, 'THE BOUNCE', 'Up 31.5% on Monday, billions gone by Wednesday', PAL.amberHi],
    [15.2, 24.6, 'WHAT A CEO CAN\'T FIX', 'A partner\'s debt, a rate hike, an investigation', PAL.coral]
  ];
  // spoken-word times (tools/jc/wt.py "Act 1 part 1" ...): trillion 4.73, jump 8.37, proof 9.65, Wednesday 11.01, vanished 13.83, debt 19.58, hike 21.77, investigation 23.24

  function renderShots(t) {
    const cv = evalCam(t);
    Cam3D.set([cv[0], cv[1], cv[2]], [cv[3], cv[4], cv[5]], cv[6], 0.01 * Math.sin(t * 0.6));
    GROUND = []; ITEMS = []; OVER = [];
    const hit = (x, y, z, ht, col, r) => { const p = S(x, y, z); if (p) OVER.push(() => hitFx(p.x, p.y, t, ht, { color: col, r: r || 240, rays: 14 })); };
    const pop = (txt, x, y, z, w, h, bg, fg, t0, t1, o) => Card(x, y, z, w, h, Object.assign({ kind: /^#(D94E43|2B8A6E|D99B26)$/i.test(bg) ? 'stamp' : 'tag', text: txt, bg, fg, accent: /^#(0B1A22|0B191E)$/i.test(bg) ? '#E2B857' : fg, t0, t1: t1 || 0 }, o || {}), t);
    const trk = (keys, d) => RigKit.track(t, keys, d);
    for (let k = 0; k < 4; k++) pad(-16 + k * 26, -12, 14 + k * 26, 14, ['#B9C7CE', '#A9B8C2', '#C9B9A9', '#A9AEC4'][k % 4]);

    // ===== S1 (0 - 6.4) Jensen is back to save NVIDIA's $4 trillion empire =====
    if (t < 7.0) {
      hqTower(0, -2, easeOut(seg(t, 0.4, 2.0)) * 0.62, 'NVIDIA');
      Char('jensen', -7.4, 3.4, 2.7, Object.assign({ facing: 1, phase: 1 }, trk([[0, 'spr:explain'], [3.4, 'spr:present']])), 0.1, 7.0, t);
      [6.6, 8.6].forEach((bx, i) => Char(i ? 'employee' : 'engineer', bx, 3.6 + i * 0.8, 2.2, { pose: 'cheer', phase: i * 0.7 }, 1.2 + i * 0.2, 7.0, t));
      pop('SUPPOSED TO SAVE NVIDIA', 0, 11.2, 3, 9.6, 1.2, '#0B1A22', '#F4F1EA', 1.4, 4.4);
      Card(0, 9.4, 1.6, 8.6, 3.2, { kind: 'counter', text: '$4 TRILLION', sub: 'NVIDIA empire', fg: '#F2D58F', accent: '#E2B857', t0: 4.7, t1: 0, pulse: [5.0] }, t);
      if (t >= 4.73) hit(0, 9.4, 2, 4.78, PAL.amberHi, 260);
    }

    // ===== S2 (7.2 - 14.6) Monday's 31.5% jump looked like proof, but by Wednesday tens of billions had already vanished =====
    if (t >= 7.1 && t < 15.1) {
      Card(26, 7.2, 1.6, 10.8, 7.2, { kind: 'paint', rot: -0.02, t0: 7.4, t1: 0, paint: (g, pw, ph) => stepChart(g, pw, ph, [[7.3, 0.76], [8.3, 0.2, 1.2], [11.0, 0.52, 0.3], [13.8, 0.72, 0.5]], t, 'NVIDIA STOCK', [[9.4, '+31.5%']], { sub: 'Monday jump, Wednesday slide' }) }, t);
      Char('trader', 22.4, 3.8, 2.4, Object.assign({ facing: 1, phase: 0 }, trk([[0, 'cheer'], [11.0, 'panic']])), 7.4, 15.1, t);
      Char('trader', 30.2, 3.8, 2.4, Object.assign({ facing: -1, phase: 1 }, trk([[0, 'cheer'], [11.1, 'panic']])), 7.5, 15.1, t);
      Char('jensen', 26, 4.6, 2.3, Object.assign({ facing: 1, phase: 2 }, trk([[0, 'spr:explain'], [11.0, 'spr:think']])), 7.6, 15.1, t);
      
    }

    // ===== S3 (15.3 - 24.6) rehiring a CEO can't fix a partner's debt crisis, a December rate hike, or a government investigation =====
    if (t >= 15.2) {
      Box(52, 0, -2.4, 24, 7.4, 0.6, '#6B7F8F'); Box(52, 7.4, -2.4, 24.6, 0.6, 0.8, '#4E5F6C');
      [[43.4, 19.58, 'DEBT CRISIS', '#D99B26', '#0B191E'], [52, 21.77, 'RATE HIKE', '#D94E43', '#F4F1EA'], [60.6, 23.24, 'INVESTIGATION', '#2C5BA8', '#F4F1EA']].forEach(([dx, t0, txt, bg, fg]) => {
        door(dx, -1.9, true); if (t >= t0 - 0.1) { pop(txt, dx, 8.9, 3, 6.0, 1.2, bg, fg, t0, 0); hit(dx, 4.4, -1.2, t0 + 0.05, bg === '#2C5BA8' ? PAL.cyan : PAL.amberHi, 240); }
      });
      Char('jensen', 52, 4.2, 2.6, Object.assign({ facing: 1, phase: 3 }, trk([[0, 'spr:explain'], [19.6, 'spr:overwhelmed'], [23.2, 'spr:think']])), 15.3, 25.0, t);
      Char('bondholder', 43.2, 4.4, 2.2, Object.assign({ facing: 1, phase: 1 }, trk([[0, 'cross'], [19.6, 'panic']])), 15.6, 25.0, t);
      Char('lawmaker', 60.8, 4.4, 2.2, Object.assign({ facing: -1, phase: 2 }, trk([[0, 'cross'], [23.2, 'point']])), 15.8, 25.0, t);
    }

    drawBG(0.05);
    GROUND.forEach(fn => fn());
    ITEMS.sort((a, b) => b.z - a.z).forEach(it => it.fn());
    OVER.forEach(fn => fn());
    HEADS.forEach(h => { const a = env(t, h[0], h[1], 0.3, 0.3); if (a > 0.01) drawShotBanner(h[2], h[3], a, h[4], t, h[0]); });
  }
