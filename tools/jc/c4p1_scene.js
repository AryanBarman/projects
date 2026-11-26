  const HEADS = [
    [1.8, 11.2, 'THE PROMISE BEHIND THE BOOM', 'Rates would keep falling, so borrowing billions for data centers stayed cheap', PAL.sageHi],
    [11.5, 17.9, 'WEDNESDAY, NOVEMBER 25, 2026', 'The promise took a direct hit', PAL.coral],
    [18.2, 34.9, 'THE NEW NUMBERS', 'Overall inflation 3.8%, core 3.3%, the economy growing 4.3%', PAL.amberHi],
    [35.2, 41.6, 'A FEDERAL RESERVE SURVEY', 'Businesses expect prices to keep climbing', PAL.coral]
  ];
  // TOOLBOX (docs/JC_TOOLBOX.md): S1 paper chart (rates falling, dashed "would keep falling") + 3D racks and a money bag; S2 calendar sheet + a document that TEARS; S3 METRIC TILES (thermometers count up) ; S4 3D shelf whose price tags climb + a typed Fed survey.
  // Spoken-word times (wt.py "Act 4 part 1"): three 0.86, promise 4.25, falling 6.69, cheap 7.94, borrow 8.41, billions 8.77, data 10.33, november 13.21, 25 14.07, hit 17.30, government 19.90, inflation 21.61, 3.8 22.93, core 25.33, 3.3 27.02, highest 28.20, grew 32.60, 4.3 33.62, survey 37.64, businesses 38.69, climbing 40.63

  function renderShots(t) {
    const cv = evalCam(t);
    Cam3D.set([cv[0], cv[1], cv[2]], [cv[3], cv[4], cv[5]], cv[6], 0.01 * Math.sin(t * 0.6));
    GROUND = []; ITEMS = []; OVER = [];
    const hit = (x, y, z, ht, col, r) => { const p = S(x, y, z); if (p) OVER.push(() => hitFx(p.x, p.y, t, ht, { color: col, r: r || 240, rays: 14 })); };
    const pop = (txt, x, y, z, w, h, bg, fg, t0, t1, o) => Card(x, y, z, w, h, Object.assign({ kind: /^#(D94E43|2B8A6E|D99B26)$/i.test(bg) ? 'stamp' : 'tag', text: txt, bg, fg, accent: /^#(0B1A22|0B191E)$/i.test(bg) ? '#E2B857' : fg, t0, t1: t1 || 0 }, o || {}), t);
    const trk = (keys, d) => RigKit.track(t, keys, d);
    const board = (cx, t0, spec) => Card(cx, 7.6, 1.2, 21.0, 13.7, { kind: 'paint', t0, t1: 0, paint: (g, pw, ph) => boardDiagram(g, pw, ph, spec, t) }, t);
    for (let k = 0; k < 7; k++) pad(-42 + k * 26, -12, -12 + k * 26, 14, ['#B9C7CE', '#A9B8C2', '#C9B9A9', '#A9AEC4', '#B9BFC9'][k % 5]);

    // ===== S0 (0 - 1.8) CONNECTION: the last board of Act 3 part 2 (government -> inflation report -> BORROWING COST gauge at the top). "Over the last three years" (0.86): the needle swings back DOWN: borrowing used to be cheap =====
    if (t < 2.4) {
      const C = -26; board(C, -30, { nodes: [{ id: 'q', ico: 'q', bare: 1, x: 0.5, y: 0.17, t0: -30 }, { id: 'gv', label: 'GOVERNMENT', ico: 'gov', x: 0.11, y: 0.6, t0: -30 }, { id: 'rp', label: 'INFLATION REPORT', ico: 'paper', x: 0.5, y: 0.6, t0: -30 }, { id: 'gg', label: 'BORROWING COST', ico: 'gauge', x: 0.89, y: 0.6, t0: -30, needle: [[-30, 1.0], [0.9, 0.1, 1.5]] }],
        links: [{ a: 'gv', b: 'rp', t0: -30, kind: 'paper', label: 'RELEASES', lab: -1.5 }, { a: 'rp', b: 'gg', t0: -30, kind: 'coin', label: 'PUSHES UP', lab: -1.6, col: '#D64545' }] });
      Char('lawmaker', C - 12.8, 3.2, 2.4, Object.assign({ facing: 1, phase: 1 }, trk([[0, 'point']])), 0, 2.4, t);
    }

    // ===== S1 (1.6 - 11.3) PAPER CHART + 3D: for three years (0.86) rates were FALLING (6.69) and the promise (4.25) was they would KEEP falling (dashed); so borrowing BILLIONS (8.77) was cheap (7.94): a money bag drops and GIANT DATA CENTERS (10.33) rise =====
    if (t >= 1.5 && t < 11.9) {
      const C = 0; Card(C - 5.6, 7.6, 1.2, 15.0, 9.6, { kind: 'paint', rot: -0.015, t0: 1.7, t1: 0, paint: (g, pw, ph) => stepChart(g, pw, ph, [[2.0, 0.26], [6.2, 0.62, 4.2]], t, 'INTEREST RATES', [[6.7, 'FALLING', '#1F9D6B']], { sub: 'the last three years', col: '#1F9D6B', x: [[0.08, '2023'], [0.32, '2024'], [0.56, '2025']], proj: { t0: 5.2, t1: 7.4, y: 0.8 } }) }, t);
      Char('trader', C + 1.2, 3.4, 2.4, Object.assign({ facing: -1, phase: 1 }, trk([[0, 'think'], [4.25, 'point'], [8.41, 'cheer']])), 1.6, 11.9, t);
      if (t >= 8.41) { const d = easeOut(seg(t, 8.41, 9.3)); itemBag(C + 8.4, 0.2 + 7.0 * (1 - d), 2.0, 2.6); }
      rackRow(C + 3.8, -1.4, 6, [9.4, 9.8, 10.2, 10.6, 11.0, 11.4], t);
      if (t >= 8.77 && t < 9.3) hit(C + 8.4, 3.4, 2.0, 8.8, PAL.amberHi, 200);
    }

    // ===== S2 (11.3 - 17.9) CALENDAR + DOCUMENT: On Wednesday, November 25, 2026 (13.21 / 14.07) the promise (a document: rates keep falling) took a direct HIT (17.30): it TEARS =====
    if (t >= 11.2 && t < 18.5) {
      const C = 26; Card(C - 6.8, 7.4, 1.2, 8.4, 8.4, { kind: 'paint', rot: 0.02, t0: 11.4, t1: 0, paint: (g, pw, ph) => { const m = pw * 0.05, u = seg(t, 13.0, 13.6), u2 = seg(t, 14.0, 14.5); g.save(); g.shadowColor = 'rgba(11,25,30,0.35)'; g.shadowBlur = pw * 0.04; g.shadowOffsetY = pw * 0.015; rrect(g, m, m, pw - 2 * m, ph - 2 * m, ph * 0.03); g.fillStyle = '#FBF8EF'; g.fill(); g.restore(); g.fillStyle = '#D64545'; g.fillRect(m, m, pw - 2 * m, ph * 0.2); g.fillStyle = '#FFFFFF'; g.font = '900 ' + ph * 0.09 + 'px' + FAM; g.textAlign = 'center'; g.textBaseline = 'middle'; g.globalAlpha = u; g.fillText('NOVEMBER', pw / 2, ph * 0.15); g.fillStyle = '#17252B'; g.globalAlpha = u2; g.font = '900 ' + ph * 0.42 + 'px' + FAM; g.fillText('25', pw / 2, ph * 0.56); g.font = '800 ' + ph * 0.075 + 'px' + FAM; g.fillText('WEDNESDAY 2026', pw / 2, ph * 0.84); } }, t);
      Card(C + 6.4, 7.2, 1.2, 9.8, 6.6, { kind: 'doc', tag: 'THE PROMISE', accent: '#2B8A6E', head: 'RATES KEEP FALLING', typeHead: true, type: true, cps: 14, lines: ['Cheap borrowing', 'Giant data centers'], lineAt: [14.6, 15.6], hl: -1, t0: 14.2, t1: 0, tear: 17.3 }, t);
      Char('banker', C + 0.2, 3.6, 2.4, Object.assign({ facing: 1, phase: 1 }, trk([[0, 'think'], [17.3, 'panic']])), 11.3, 18.5, t); if (t >= 17.3 && t < 17.9) hit(C + 6.4, 7.0, 3, 17.35, PAL.coral, 280);
    }

    // ===== S3 (18 - 34.9) METRIC TILES: new numbers from the U.S. government (19.90): overall inflation 3.8% (22.93) in October, core inflation 3.3% (27.02), the highest in nearly three years (28.20); the economy grew at a fast 4.3% (33.62) =====
    if (t >= 17.9 && t < 35.4) {
      const C = 52; Card(C, 7.6, 1.2, 21.0, 11.6, { kind: 'paint', rot: -0.01, t0: 18.2, t1: 0, paint: (g, pw, ph) => metricTiles(g, pw, ph, { gov: 19.9, tiles: [{ label: 'OVERALL INFLATION', sub: 'October', val: 3.8, max: 5, t0: 21.6, t1: 23.6, col: '#D64545' }, { label: 'CORE INFLATION', sub: 'October', val: 3.3, max: 5, t0: 25.3, t1: 27.4, col: '#E2A03F', badge: [28.2, 'HIGHEST IN NEARLY 3 YEARS'] }, { label: 'US ECONOMY GROWTH', sub: 'fast pace', val: 4.3, max: 5, t0: 31.6, t1: 33.9, col: '#1F9D6B', badge: [33.7, 'FAST PACE'] }] }, t) }, t);
      Char('lawmaker', C - 12.8, 3.2, 2.4, Object.assign({ facing: 1, phase: 1 }, trk([[0, 'cross'], [21.61, 'point'], [28.2, 'cross'], [32.6, 'point']])), 18.0, 35.4, t);
    }

    // ===== S4 (35 - 41.7) 3D SHELF + SURVEY: at the same time a Federal Reserve survey (37.64) warned that businesses (38.69) expect prices to keep CLIMBING (40.63): the price tags on the shelf rise =====
    if (t >= 35.0) {
      const C = 78; Card(C - 7.6, 7.4, 1.2, 8.4, 5.8, { kind: 'doc', tag: 'FEDERAL RESERVE SURVEY', accent: '#2C5BA8', head: 'BUSINESSES EXPECT', typeHead: true, type: true, cps: 15, lines: ['Prices to keep climbing'], lineAt: [38.9], hl: -1, t0: 37.5, t1: 0 }, t);
      [1.6, 3.8, 6.0].forEach((py, r) => { Box(C - 0.4, py - 0.3, -1.0, 13.6, 0.3, 2.2, '#8A6A4A'); for (let i = 0; i < 6; i++) { const ph = 1.0 + ((i * 7 + r * 3) % 4) * 0.25; Box(C + 0.2 + i * 2.2, py, -0.6, 1.4, ph, 1.2, ['#E2A03F', '#7FB8D9', '#D9807F', '#8FC98F'][(i + r) % 4]); const lift = 0.9 * easeOut(seg(t, 40.4 + i * 0.08 + r * 0.1, 41.4 + i * 0.08 + r * 0.1)); Box(C + 0.2 + i * 2.2, py - 0.2 + lift, 0.7, 1.0, 0.5, 0.12, '#F4F1EA', { lw: 0 }); Box(C + 0.2 + i * 2.2, py + 0.1 + lift, 0.82, 1.0, 0.14, 0.05, '#D64545', { lw: 0 }); if (lift > 0.2) Box(C + 0.55 + i * 2.2, py + 0.7 + lift, 0.84, 0.22, 0.6 * Math.min(1, lift), 0.05, '#D64545', { lw: 0 }); } });
      Char('fed', C - 12.9, 3.2, 2.7, Object.assign({ facing: 1, phase: 1 }, trk([[0, 'paper']])), 35.0, 42.2, t);
      [C + 2.0, C + 6.0].forEach((bx, i) => Char(i ? 'employee' : 'supply', bx, 3.6 + i * 0.5, 2.3, Object.assign({ facing: -1, phase: i }, trk([[0, 'think'], [40.63, 'panic']])), 36.5, 42.2, t));
    }

    drawBG(0.05);
    GROUND.forEach(fn => fn());
    ITEMS.sort((a, b) => b.z - a.z).forEach(it => it.fn());
    OVER.forEach(fn => fn());
    HEADS.forEach(h => { const a = env(t, h[0], h[1], 0.3, 0.3); if (a > 0.01) drawShotBanner(h[2], h[3], a, h[4], t, h[0]); });
  }
