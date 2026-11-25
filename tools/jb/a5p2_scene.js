  const HEADS = [
    [0.10, 6.8, 'THE MATH HITS A WALL', 'The lenders push back', PAL.coral],
    [7.0, 22.6, 'PROBLEM ONE: THE RATES', 'Wall Street demands high yields on GPU debt', PAL.amberHi],
    [22.9, 38.6, 'PROBLEM TWO: THE LOOPHOLE', 'The orbital data center plan depends on launching chips', PAL.coral],
    [38.9, 53.6, 'THE BONDHOLDER QUESTION', 'How do you repossess a GPU in orbit?', PAL.cyan]
  ];

  function renderShots(t) {
    const cv = evalCam(t);
    Cam3D.set([cv[0], cv[1], cv[2]], [cv[3], cv[4], cv[5]], cv[6], 0.01 * Math.sin(t * 0.6));
    GROUND = []; ITEMS = []; OVER = [];
    const hit = (x, y, z, ht, col, r) => { const p = S(x, y, z); if (p) OVER.push(() => hitFx(p.x, p.y, t, ht, { color: col, r: r || 240, rays: 14 })); };
    const pop = (txt, x, y, z, w, h, bg, fg, t0, t1, o) => Card(x, y, z, w, h, Object.assign({ kind: /^#(D94E43|2B8A6E|D99B26)$/i.test(bg) ? 'stamp' : 'tag', text: txt, bg, fg, accent: /^#(0B1A22|0B191E)$/i.test(bg) ? '#E2B857' : fg, t0, t1: t1 || 0 }, o || {}), t);
    const trk = (keys, d) => RigKit.track(t, keys, d);
    for (let k = 0; k < 5; k++) pad(-16 + k * 26, -12, 14 + k * 26, 14, ['#B9C7CE', '#A9B8C2', '#C9B9A9', '#A9AEC4'][k % 4]);

    // ===== S1 (0 - 6.8) the math and the lenders hit a wall =====
    if (t < 7.4) {
      const rise = easeOut(seg(t, 0.2, 1.6));
      for (let r = 0; r < 5; r++) for (let c = 0; c < 7; c++) if (r * 0.9 < 4.6 * rise) Box(-3.6 + c * 2.1 + (r % 2) * 1.0, r * 0.95, -1.2, 2.0, 0.9, 1.2, (r + c) % 2 ? '#B5654A' : '#C9785A');
      Char('spacex', -5.6, 3.6, 2.3, Object.assign({ facing: 1, phase: 1 }, trk([[0, 'walk'], [1.6, 'cross']])), 0.2, 7.4, t);
      pop('SPACEX', -5.6, 6.8, 4.4, 4.8, 0.9, '#0B1A22', '#F4F1EA', 0.8, 0);
      [[6.8, 0], [8.8, 1]].forEach(([bx, i]) => Char('banker', bx, 3.6, 2.3, Object.assign({ facing: -1, phase: 2 + i }, trk([[0, 'idle'], [3.6, 'present']])), 0.6, 7.4, t));
      pop('LENDERS', 7.8, 6.8, 4.4, 5.4, 0.9, '#0B1A22', '#F4F1EA', 1.0, 0);
      pop('A WALL', 1, 6.6, 3, 6.6, 1.5, '#D94E43', '#F4F1EA', 3.4, 0); if (t >= 3.4) hit(1, 6.6, 3, 3.5, PAL.coral, 320);
    }

    // ===== S2 (6.9 - 22.8) interest rates: yields as high as 8.36% because GPUs depreciate brutally fast =====
    if (t >= 6.8 && t < 23.4) {
      pop('WALL STREET DEMANDED', 26, 11.2, 2, 10.4, 1.1, '#0B1A22', '#F4F1EA', 7.0, 10.2);
      // tranche stack: senior (safe) at the bottom, subordinated at the top glows red
      const tr = [['SENIOR', '#2C5BA8', 1.6], ['MEZZANINE', '#6F8FA8', 1.6], ['SUBORDINATED', '#D94E43', 1.8]];
      tr.forEach(([nm, col, h], i) => { const u = easeOut(seg(t, 8.0 + i * 0.5, 9.0 + i * 0.5)); if (u > 0.02) { Box(20, i * 1.9, 0.6, 7.6, h * u, 2.2, col); } });
      if (t >= 10.2) pop('SUBORDINATED TRANCHES', 20, 7.0, 3.2, 9.2, 1.0, '#D94E43', '#F4F1EA', 10.2, 0, { kind: 'tag' });
      // yield gauge climbing to 8.36
      const y = 8.36 * easeOut(seg(t, 11.0, 14.4)); const yy = Math.round(y * 100) / 100;
      Card(30.6, 8.0, 1.6, 6.8, 2.4, { kind: 'counter', text: yy.toFixed(2) + '%', sub: 'yield, as high as', fg: '#F0A39A', accent: '#D94E43', t0: 11.0, t1: 0, pulse: [14.6] }, t);
      // GPUs depreciate: a row of chips, each newer chip makes the old ones lose value
      for (let i = 0; i < 4; i++) { const born = 16.0 + i * 1.3; if (t < born) continue; const age = t - born, v = Math.max(0.35, 1 - age * 0.14); Box(25.4 + i * 2.2, 0, 3.8, 1.8, 1.0 + 0.45 * v, 1.8, i === 3 || t < 20 ? '#76B900' : '#7A8A8F'); }
      pop('GPUS DEPRECIATE', 28, 4.8, 6, 8.2, 1.0, '#0B1A22', '#F4F1EA', 16.0, 0);
      if (t >= 17.8) { const f = seg(t, 17.8, 21.4); for (let k = 0; k < 7 * f; k++) Box(33.6 + 0.2 * Math.sin(k), 6.2 - k * 0.5, 3.0, 0.9, 0.35, 0.3, '#D94E43', { lw: 0 }); pop('NEWER CHIP, OLDER LOSES VALUE', 28, 6.4, 6.4, 11.0, 0.95, '#D99B26', '#0B191E', 19.0, 0, { kind: 'tag' }); }
    }

    // ===== S3 (22.9 - 38.8) the loophole: the orbital data center pitch relies on launching Vera Rubin chips into low-Earth orbit =====
    if (t >= 22.8 && t < 39.4) {
      pop('A TERRIFYING LOOPHOLE', 52, 11.0, 2, 10.8, 1.2, '#D94E43', '#F4F1EA', 23.2, 27.4);
      Char('elon', 47.0, 3.4, 2.5, { pose: 'spr:present', facing: 1, phase: 4, talk: 0.4 }, 23.0, 39.4, t);
      pop('MUSK’S MASTER PLAN', 47.0, 7.0, 4.4, 7.2, 0.9, '#0B1A22', '#F4F1EA', 24.0, 29.6);
      Cyl(53.6, 0, 1, 5.0, 0.4, '#4C96C9'); Cyl(53.6, 0.4, 1, 3.4, 0.2, '#6FB36A', { a: 0.8 });
      const lf = seg(t, 29.0, 36.0);
      Box(53.6, 0.4, 0, 1.8, 9 * lf * lf, 1.8, '#E0E4E8'); Box(53.6, 0.4 + 9 * lf * lf, 0, 1.2, 1.8, 1.2, '#76B900'); if (lf > 0.02) Box(53.6, 0.1, 0, 2.6, 0.5 + 1.5 * lf, 2.6, '#E2B857', { emis: 0.5, a: 0.8 });
      for (let k = 0; k < 3; k++) { const u = Math.max(0, Math.min(1, (lf - 0.4 - k * 0.12) / 0.5)); if (u > 0) sat(48.4 + k * 4.2, 6 + 6.5 * u, 0.5); if (u > 0.5) Box(48.4 + k * 4.2 - 0.5, 5.4 + 6.5 * u, 0.9, 1.0, 0.4, 0.8, '#76B900', { emis: 0.5 }); }
      pop('VERA RUBIN CHIPS', 53.6, 7.4, 4.8, 8.2, 1.0, '#0B1A22', '#9BE01B', 31.0, 0);
      pop('LOW-EARTH ORBIT', 55.5, 12.6, 3, 8.0, 1.0, '#2C5BA8', '#F4F1EA', 33.0, 0, { kind: 'tag' });
      pop('ORBITAL DATA CENTERS', 55.4, 5.4, 6.8, 9.2, 0.9, '#0B1A22', '#E2B857', 27.8, 0);
    }

    // ===== S4 (38.9 - 53.6) institutional bondholders ask: if SpaceX defaults on a $40+B loan, how do you repossess a GPU 340 miles up? =====
    if (t >= 38.8) {
      Char('bondholder', 76, 3.6, 3.2, Object.assign({ facing: 1, phase: 5 }, trk([[0, 'idle'], [41.2, 'think']])), 39.0, 54, t);
      pop('BONDHOLDERS ASK', 76, 7.4, 4.4, 7.4, 0.9, '#0B1A22', '#F4F1EA', 39.4, 43.4);
      if (t >= 41.4) { const n = 40 * easeOut(seg(t, 41.4, 43.4)); Card(84, 8.6, 1.6, 7.8, 2.2, { kind: 'counter', text: '$' + Math.round(n) + '+ BILLION', sub: 'loan in default?', fg: '#F0A39A', accent: '#D94E43', t0: 41.4, t1: 0, pulse: [43.6] }, t); }
      pop('DEFAULT', 76, 9.4, 5, 5.4, 1.2, '#D94E43', '#F4F1EA', 43.4, 46.0); if (t >= 43.4 && t < 46.0) hit(76, 9.4, 5, 43.5, PAL.coral, 280);
      const rp = seg(t, 45.0, 50.0), hy = 3.8 + 8.4 * easeInOut(Math.min(1, rp * 1.6));
      if (t >= 45.0) { Box(81.6, 0, 3.6, 0.5, hy, 0.5, '#8A7B66'); Box(81.6, hy, 3.5, 2.0, 0.6, 0.8, '#B8BDC2'); }
      if (t >= 44.6) { const su = easeOut(seg(t, 44.6, 46.0)); sat(88, 13.4 * su + 0.001, 0.5); if (su > 0.9) { Box(88.6, 12.6, 0.9, 1.4, 0.5, 1.0, '#76B900', { emis: 0.5 }); } pop('340 MILES UP', 88, 7.8, 5.0, 6.6, 0.95, '#0B1A22', '#F4F1EA', 46.4, 0); }
      if (t >= 49.0) pop('?', 80.4, 8.2, 5.4, 2.4, 2.4, '#D99B26', '#0B191E', 49.2, 0);
      if (t >= 50.2) pop('HOW DO YOU REPOSSESS IT?', 80, 11.4, 3, 11.4, 1.1, '#0B1A22', '#E2B857', 50.4, 0);
    }

    drawBG(0.05);
    GROUND.forEach(fn => fn());
    ITEMS.sort((a, b) => b.z - a.z).forEach(it => it.fn());
    OVER.forEach(fn => fn());
    HEADS.forEach(h => { const a = env(t, h[0], h[1], 0.3, 0.3); if (a > 0.01) drawShotBanner(h[2], h[3], a, h[4], t, h[0]); });
  }
