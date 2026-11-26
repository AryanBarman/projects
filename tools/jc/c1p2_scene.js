  const HEADS = [
    [4.0, 11.9, '11 DAYS OF CHAOS', 'NVIDIA looked like it was falling apart after its founder stepped down', PAL.coral],
    [12.0, 29.2, 'THE BOARD BRINGS HIM BACK', 'Monday, November 23rd: up 31.5% in a single day', PAL.sageHi],
    [29.5, 40.4, 'THEN THE FALL', 'Down nearly 6% Tuesday and 4% Wednesday', PAL.coral],
    [40.8, 47.0, 'WHY SELL?', 'Why would big investors cheer, then sell two days later?', PAL.amberHi],
    [47.4, 54.6, 'FOLLOW THE MONEY', 'Start with the simple math most people missed on Monday morning', PAL.cyan]
  ];
  // spoken-word times (tools/jc/wt.py "Act 1 part 2" ...): days 4.00, falling 6.9, stepped 10.83, november 23rd 13.63, board 15.34, brought 15.69, 31.5% 18.17, trillion 22.16, unstoppable 28.38,
  // 6% 33.70, tuesday 34.11, 4% 35.46, wednesday 35.95, billions 38.39, investors 41.77, cheer 42.33, sell 44.75, money 50.47, math 52.22, monday morning 53.76

  function renderShots(t) {
    const cv = evalCam(t);
    Cam3D.set([cv[0], cv[1], cv[2]], [cv[3], cv[4], cv[5]], cv[6], 0.01 * Math.sin(t * 0.6));
    GROUND = []; ITEMS = []; OVER = [];
    const hit = (x, y, z, ht, col, r) => { const p = S(x, y, z); if (p) OVER.push(() => hitFx(p.x, p.y, t, ht, { color: col, r: r || 240, rays: 14 })); };
    const pop = (txt, x, y, z, w, h, bg, fg, t0, t1, o) => Card(x, y, z, w, h, Object.assign({ kind: /^#(D94E43|2B8A6E|D99B26)$/i.test(bg) ? 'stamp' : 'tag', text: txt, bg, fg, accent: /^#(0B1A22|0B191E)$/i.test(bg) ? '#E2B857' : fg, t0, t1: t1 || 0 }, o || {}), t);
    const trk = (keys, d) => RigKit.track(t, keys, d);
    for (let k = 0; k < 7; k++) pad(-42 + k * 26, -12, -12 + k * 26, 14, ['#B9C7CE', '#A9B8C2', '#C9B9A9', '#A9AEC4', '#B9BFC9'][k % 5]);

    // ===== S0 (0 - 3.9) CONNECTION: the last picture of part 1 (three locked doors, Jensen in the middle) stays on screen while the narrator says "But think about what you just watched" =====
    if (t < 4.6) {
      Box(-26, 0, -2.4, 24, 7.4, 0.6, '#6B7F8F'); Box(-26, 7.4, -2.4, 24.6, 0.6, 0.8, '#4E5F6C');
      [[-34.6, 'DEBT CRISIS', '#D99B26', '#0B191E'], [-26, 'RATE HIKE', '#D94E43', '#F4F1EA'], [-17.4, 'INVESTIGATION', '#2C5BA8', '#F4F1EA']].forEach(([dx, txt, bg, fg]) => { door(dx, -1.9, true); pop(txt, dx, 8.9, 3, 6.0, 1.2, bg, fg, -20, 0); });
      Char('jensen', -26, 4.2, 2.6, Object.assign({ facing: 1, phase: 3 }, trk([[0, 'spr:think']])), 0, 4.6, t);
      Char('bondholder', -34.8, 4.4, 2.2, Object.assign({ facing: 1, phase: 1 }, trk([[0, 'panic']])), 0, 4.6, t);
      Char('lawmaker', -17.2, 4.4, 2.2, Object.assign({ facing: -1, phase: 2 }, trk([[0, 'point']])), 0, 4.6, t);
    }

    // ===== S1 (3.9 - 11.9) 11 days in November 2026: NVIDIA looks like it is falling apart after its founder steps down =====
    if (t >= 3.6 && t < 12.4) {
      hqTower(0, -2, 0.62, 'NVIDIA'); const fl = easeInOut(seg(t, 4.2, 10.4));
      [0, 1, 2, 3, 4, 5].forEach(i => Box(-12.5 + i * 1.3, 0, 4.6, 1.0, Math.max(0.05, (3.6 - (i % 3) * 0.4) * (1 - 0.78 * fl)), 1.2, fl > 0.05 ? '#D94E43' : '#2B8A6E'));
      if (t >= 4.0) Card(-7, 9.2, 1.6, 7.6, 3.0, { kind: 'counter', text: 'DAY ' + Math.min(11, 1 + Math.floor(10 * seg(t, 4.2, 10.4))) + ' OF 11', sub: 'November 2026', fg: '#F2D58F', accent: '#E2B857', t0: 4.0, t1: 0 }, t);
      Char('jensen', lerp(3.0, -5.0, easeInOut(seg(t, 10.83, 12.2))), 3.6, 2.7, Object.assign({ facing: -1, phase: 1 }, trk([[0, 'spr:cross'], [10.83, 'spr:walk']])), 3.6, 12.4, t);
      [8.2, 10.4].forEach((bx, i) => Char(i ? 'employee' : 'engineer', bx, 4.0 + i * 0.6, 2.2, Object.assign({ phase: i * 0.7 }, trk([[0, 'cross'], [6.9 + i * 0.3, 'panic']])), 3.6, 12.4, t));
      pop('FOUNDER STEPPED DOWN', 0, 11.4, 3, 10.2, 1.2, '#D94E43', '#F4F1EA', 10.83, 0); if (t >= 10.83 && t < 11.3) hit(0, 11.4, 3, 10.88, PAL.coral, 260);
    }

    // ===== S2 (12 - 29.2) Monday, November 23rd: the board brings him back; +31.5%; nearly a trillion back; unstoppable again =====
    if (t >= 11.9 && t < 29.8) {
      boardWall(26, 0); table(26, 2.2, 10);
      [19.6, 22.6, 29.4, 32.4].forEach((bx, i) => Char('board', bx, 4.8, 2.3, Object.assign({ phase: i, facing: i < 2 ? 1 : -1 }, trk([[0, 'cross'], [15.69 + i * 0.1, 'present'], [18.17, 'cheer']])), 12.0, 29.8, t));
      Char('jensen', lerp(37, 26.4, easeInOut(seg(t, 13.63, 15.7))), 3.4, 2.7, Object.assign({ facing: -1, phase: 2 }, trk([[0, 'spr:walk'], [15.7, 'spr:sit']])), 13.0, 29.8, t);
      pop('MONDAY, NOVEMBER 23RD', 26, 13.4, 3, 10.4, 1.2, '#0B1A22', '#F4F1EA', 13.63, 16.4);
      if (t >= 18.17) steps(36, 2, 6, t, 18.17);
      if (t >= 18.17) { pop('+31.5%', 39, 8.6, 3, 5.6, 1.3, '#2B8A6E', '#F4F1EA', 18.17, 0); if (t < 18.7) hit(39, 8.6, 3, 18.2, PAL.sageHi, 260); }
      if (t >= 22.16) Card(26, 12.6, 1.6, 8.8, 3.2, { kind: 'counter', text: '~$1 TRILLION', sub: 'back in market value', fg: '#F2D58F', accent: '#E2B857', t0: 22.16, t1: 0, pulse: [22.5] }, t);
      if (t >= 28.38) { pop('UNSTOPPABLE?', 26, 12.4, 4, 8.0, 1.2, '#2B8A6E', '#F4F1EA', 28.38, 0); if (t < 28.9) hit(26, 12.4, 4, 28.42, PAL.sageHi, 240); }
    }

    // ===== S3 (29.5 - 40.4) except over the next two days: -6% Tuesday (on "6%"), -4% Wednesday (on "4%"), tens of billions gone =====
    if (t >= 29.4 && t < 41.0) {
      Card(52, 7.4, 1.6, 9.6, 5.6, { kind: 'paint', paint: (g, pw, ph, u) => stepChart(g, pw, ph, [[29.8, 0.14], [33.7, 0.36, 0.28], [35.46, 0.5, 0.28], [38.4, 0.62, 1.4]], t, 'NVIDIA STOCK', [[33.75, '-6%', '#FF6B5E'], [35.5, '-4%', '#FF6B5E']]), t0: 29.6, t1: 0 }, t);
      const fall = 0.4 * easeOut(seg(t, 33.7, 34.0)) + 0.35 * easeOut(seg(t, 35.46, 35.76)) + 0.25 * easeInOut(seg(t, 38.4, 39.8));
      [44.2, 57.6].forEach(bx0 => [0, 1, 2, 3, 4].forEach(i => Box(bx0 + i * 1.5, 0, 0.4, 1.1, Math.max(0.05, 3.2 * (1 - 0.8 * fall)), 1.4, fall > 0.02 ? '#D94E43' : '#2B8A6E')));
      Char('jensen', 52, 2.4, 2.5, Object.assign({ facing: 1, phase: 1 }, trk([[0, 'spr:cheer'], [33.7, 'spr:overwhelmed']])), 29.6, 41.0, t);
      Char('trader', 47.6, 2.6, 2.4, Object.assign({ facing: 1, phase: 0 }, trk([[0, 'cheer'], [33.7, 'panic']])), 29.8, 41.0, t);
      Char('trader', 56.6, 2.6, 2.4, Object.assign({ facing: -1, phase: 1 }, trk([[0, 'cheer'], [35.46, 'panic']])), 29.9, 41.0, t);
      if (t >= 33.7 && t < 34.2) hit(52, 7.4, 3, 33.72, PAL.coral, 280); if (t >= 35.46 && t < 36.0) hit(52, 7.4, 3, 35.5, PAL.coral, 280);
      if (t >= 38.39) Card(52, 3.0, 2.6, 8.6, 2.2, { kind: 'counter', text: 'TENS OF BILLIONS GONE', sub: 'in gains', fg: '#FF9A8F', accent: '#D94E43', t0: 38.39, t1: 0 }, t);
    }

    // ===== S4 (40.4 - 46.8) why would big investors cheer Monday (on "cheer") and sell two days later (on "sell")? =====
    if (t >= 40.3 && t < 47.4) {
      [[70.6, 'trader', 1], [73.8, 'bondholder', 1]].forEach(([bx, r, f], i) => Char(r, bx, 2.8 + i * 0.4, 2.3, Object.assign({ facing: f, phase: i }, trk([[0, 'cheer'], [44.75, 'cross']])), 40.4, 47.4, t));
      [[82.0, 'banker', -1], [85.4, 'trader', -1]].forEach(([bx, r, f], i) => Char(r, bx, 2.8 + i * 0.4, 2.3, Object.assign({ facing: f, phase: i + 2 }, trk([[0, 'cross'], [44.75, 'hold']])), 40.6, 47.4, t));
      pop('MONDAY: CHEER', 72.2, 10.6, 3, 7.4, 1.2, '#2B8A6E', '#F4F1EA', 42.33, 0); pop('TWO DAYS LATER: SELL', 83.8, 10.6, 3, 9.6, 1.2, '#D94E43', '#F4F1EA', 44.75, 0);
      if (t >= 44.75) { if (t < 45.3) hit(83.8, 10.6, 3, 44.8, PAL.coral, 240); const mb = easeOut(seg(t, 44.9, 46.4)); Box(80 - 6 * mb, 0, 6, 1.2, 1.0, 1.2, '#E2B857'); }
      Card(78, 7.0, 1.6, 4.4, 4.4, { kind: 'counter', text: '?', sub: 'why', fg: '#F2D58F', accent: '#E2B857', t0: 41.77, t1: 0 }, t);
    }

    // ===== S5 (47 - 54.7) to see what they spotted, follow the money (on "money"), start with the simple math (on "math") from Monday morning =====
    if (t >= 47.2) {
      Box(104, 0, -2.4, 18, 7.0, 0.6, '#6B7F8F');
      Card(108.4, 7.6, 1.6, 7.6, 4.4, { kind: 'doc', tag: 'MONDAY MORNING', accent: '#2C5BA8', head: 'THE SIMPLE MATH', typeHead: true, type: true, cps: 16, lines: ['What most people missed', 'Before the jump'], lineAt: [52.6, 53.76], hl: -1, t0: 52.0, t1: 0 }, t);
      for (let k = 0; k < 6; k++) { const q = (t * 0.7 + k / 6) % 1; coin(lerp(97, 105, q), 2.4 + Math.sin(q * Math.PI) * 1.8, 3.2, seg(t, 50.47, 51.0)); }
      if (t >= 50.47) Line3([97, 2.2, 3.2], [lerp(97, 105.4, easeInOut(seg(t, 50.5, 52.0))), 2.2, 3.2], '#E2B857', 10, 1);
      pop('FOLLOW THE MONEY', 101, 10.8, 3, 9.2, 1.2, '#0B1A22', '#E2B857', 50.47, 0);
      Char('banker', 96.6, 2.8, 2.5, Object.assign({ facing: 1, phase: 1 }, trk([[0, 'think']])), 47.2, 55, t);
      Char('trader', 103.4, 2.8, 2.5, Object.assign({ facing: 1, phase: 2 }, trk([[0, 'cross'], [52.2, 'hold']])), 47.4, 55, t);
    }

    drawBG(0.05);
    GROUND.forEach(fn => fn());
    ITEMS.sort((a, b) => b.z - a.z).forEach(it => it.fn());
    OVER.forEach(fn => fn());
    HEADS.forEach(h => { const a = env(t, h[0], h[1], 0.3, 0.3); if (a > 0.01) drawShotBanner(h[2], h[3], a, h[4], t, h[0]); });
  }
