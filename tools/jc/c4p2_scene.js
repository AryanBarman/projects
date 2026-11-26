  const HEADS = [
    [1.8, 14.8, 'WHY INVESTORS GOT NERVOUS', 'The Fed was expected to raise rates, not cut them, on December 8 and 9', PAL.coral],
    [15.2, 31.8, 'WHAT A RATE HIKE DOES NEXT', 'Borrowing gets more expensive for everyone', PAL.amberHi],
    [32.2, 38.0, 'BUT THERE IS A BIGGER PROBLEM', 'Waiting for Jensen Huang in December', PAL.coral]
  ];
  // ONE THING MOVES AT A TIME (docs/JC_TOOLBOX.md focus rule): S1 = investors react (3.5), THEN the cut arrow (4.5) and its cross-out (8.5), THEN the hike arrow (10.7), THEN the calendar dates (13.4 / 14.0); S2 = one arrow of the star board at a time (the board dims the rest);
  // S3 = calendar, then Jensen, then the door. Spoken-word times (wt.py "Act 4 part 2"): numbers 0.62, nervous 3.53, instead 4.13, cutting 4.87, federal 8.03, raise 10.71, december 12.85, 8 13.36, 9 13.97, think 15.12, central 17.62, raises 18.30, borrowing 19.54, expensive 20.88,
  // squeezing 22.74, coreweave 24.94, raising 25.80, costs 26.28, tech stocks ~28.9, attractive 29.96, overnight 30.56, urgent 35.16, waiting 35.91, jensen 36.44

  function renderShots(t) {
    const cv = evalCam(t);
    Cam3D.set([cv[0], cv[1], cv[2]], [cv[3], cv[4], cv[5]], cv[6], 0.01 * Math.sin(t * 0.6));
    GROUND = []; ITEMS = []; OVER = [];
    const hit = (x, y, z, ht, col, r) => { const p = S(x, y, z); if (p) OVER.push(() => hitFx(p.x, p.y, t, ht, { color: col, r: r || 240, rays: 14 })); };
    const trk = (keys, d) => RigKit.track(t, keys, d);
    const board = (cx, t0, spec) => Card(cx, 7.6, 1.2, 21.0, 13.7, { kind: 'paint', t0, t1: 0, paint: (g, pw, ph) => boardDiagram(g, pw, ph, spec, t) }, t);
    for (let k = 0; k < 5; k++) pad(-42 + k * 26, -12, -12 + k * 26, 14, ['#B9C7CE', '#A9B8C2', '#C9B9A9', '#A9AEC4', '#B9BFC9'][k % 5]);

    // ===== S0 (0 - 1.6) CONNECTION: the last picture of Act 4 part 1 (Fed survey + the shelf whose price tags have climbed, worried shop owners) =====
    if (t < 2.2) {
      const C = -26; Card(C - 7.6, 7.4, 1.2, 8.4, 5.8, { kind: 'doc', tag: 'FEDERAL RESERVE SURVEY', accent: '#2C5BA8', head: 'BUSINESSES EXPECT', typeHead: true, type: true, cps: 15, lines: ['Prices to keep climbing'], lineAt: [-29], hl: -1, t0: -30, t1: 0 }, t);
      [1.6, 3.8, 6.0].forEach((py, r) => { Box(C - 0.4, py - 0.3, -1.0, 13.6, 0.3, 2.2, '#8A6A4A'); for (let i = 0; i < 6; i++) { const ph = 1.0 + ((i * 7 + r * 3) % 4) * 0.25; Box(C + 0.2 + i * 2.2, py, -0.6, 1.4, ph, 1.2, ['#E2A03F', '#7FB8D9', '#D9807F', '#8FC98F'][(i + r) % 4]); Box(C + 0.2 + i * 2.2, py + 0.7, 0.7, 1.0, 0.5, 0.12, '#F4F1EA', { lw: 0 }); Box(C + 0.2 + i * 2.2, py + 1.0, 0.82, 1.0, 0.14, 0.05, '#D64545', { lw: 0 }); } });
      Char('fed', C - 12.9, 3.2, 2.7, Object.assign({ facing: 1, phase: 1 }, trk([[0, 'paper']])), 0, 2.2, t); [C + 2.0, C + 6.0].forEach((bx, i) => Char(i ? 'employee' : 'supply', bx, 3.6 + i * 0.5, 2.3, Object.assign({ facing: -1, phase: i }, trk([[0, 'panic']])), 0, 2.2, t));
    }

    // ===== S1 (1.6 - 15) 1) investors get NERVOUS (3.53); 2) instead of CUTTING rates to help tech stocks (4.87): a green cut arrow + the tech-stock icon; 3) the Fed is now widely EXPECTED (8.03): the cut arrow is crossed out; 4) to RAISE rates (10.71): a red hike arrow grows; 5) on DECEMBER (12.85) 8 (13.36) and 9 (13.97): the calendar circles the two dates =====
    if (t >= 1.5 && t < 15.6) {
      const C = 0;
      Card(C - 5.6, 7.4, 1.2, 9.6, 9.6, { kind: 'paint', rot: -0.015, t0: 4.3, t1: 0, paint: (g, pw, ph) => arrowCard(g, pw, ph, { stages: [{ t0: 4.87, t1: 10.5, dir: 'down', col: '#1F9D6B', label: 'RATE CUT', x: 8.6 }, { t0: 10.71, dir: 'up', col: '#D64545', label: 'RATE HIKE' }] }, t) }, t);
      Card(C + 7.4, 7.4, 1.2, 8.6, 8.6, { kind: 'paint', rot: 0.02, t0: 12.5, t1: 0, paint: (g, pw, ph) => monthSheet(g, pw, ph, 'DECEMBER 2026', 2, 31, [[8, 13.36], [9, 13.97]], t) }, t);
      Char('fed', C - 12.9, 3.2, 2.7, Object.assign({ facing: 1, phase: 1 }, trk([[0, 'cross'], [10.71, 'sign']])), 1.6, 15.6, t);
      [C + 0.8, C + 3.2].forEach((bx, i) => Char('trader', bx, 3.6 + i * 0.5, 2.3, Object.assign({ facing: -1, phase: i }, trk([[0, 'cross'], [3.53, 'panic'], [4.6, 'cross']])), 1.8, 12.0, t));
    }

    // ===== S2 (15 - 31.8) BOARD, one arrow at a time: when the central bank RAISES rates (18.30) -> borrowing gets more EXPENSIVE (19.54) -> squeezing debt-heavy AI builders like COREWEAVE (22.74) -> raising COSTS for big tech buyers (25.80) -> tech stocks LESS ATTRACTIVE overnight (29.96) =====
    if (t >= 14.9 && t < 32.4) {
      const C = 26; board(C, 15.2, { nodes: [{ id: 'fed', label: 'RATE HIKE', ico: 'gauge', x: 0.5, y: 0.5, t0: 15.6, needle: [[15.6, 0.3], [17.7, 0.3], [18.3, 0.88, 1.2]], hero: [17.6, 19.6] }, { id: 'bw', label: 'BORROWING MONEY', ico: 'bag', x: 0.16, y: 0.24, t0: 19.2 }, { id: 'ai', label: 'AI BUILDERS LIKE COREWEAVE', ico: 'cloud', x: 0.16, y: 0.78, t0: 22.4 }, { id: 'bt', label: 'BIG TECH BUYERS', ico: 'nvidia', x: 0.84, y: 0.24, t0: 25.4 }, { id: 'ts', label: 'TECH STOCKS', ico: 'trend', x: 0.84, y: 0.78, t0: 28.2 }],
        links: [{ a: 'fed', b: 'bw', t0: 19.54, kind: 'coin', label: 'MORE EXPENSIVE', lab: -1.4, col: '#D64545' }, { a: 'fed', b: 'ai', t0: 22.74, kind: 'bag', label: 'SQUEEZED', lab: 1.4, col: '#D64545' }, { a: 'fed', b: 'bt', t0: 25.8, kind: 'coin', label: 'HIGHER COSTS', lab: -1.4, col: '#D64545' }, { a: 'fed', b: 'ts', t0: 28.4, kind: 'paper', label: 'LESS ATTRACTIVE', lab: 1.4, col: '#D64545' }] });
      Char('fed', C - 12.9, 3.2, 2.7, Object.assign({ facing: 1, phase: 1 }, trk([[0, 'cross'], [17.62, 'sign']])), 15.0, 32.4, t);
    }

    // ===== S3 (32 - 38.1) the DECEMBER calendar (32.2); then Jensen (36.44); yet higher rates were not the most URGENT problem (35.16): a locked door with a red alert appears =====
    if (t >= 32.0) {
      const C = 52; Card(C - 7.0, 7.4, 1.2, 8.6, 8.6, { kind: 'paint', rot: -0.02, t0: 32.3, t1: 0, paint: (g, pw, ph) => monthSheet(g, pw, ph, 'DECEMBER 2026', 2, 31, [], t) }, t);
      if (t >= 35.16) { door(C + 6.0, -1.6, true); Card(C + 6.0, 9.4, 1.6, 3.4, 3.4, { kind: 'paint', t0: 35.4, t1: 0, paint: (g, pw, ph) => { const u = seg(t, 35.4, 35.9); g.save(); g.translate(pw / 2, ph / 2); g.scale(0.6 + 0.4 * u, 0.6 + 0.4 * u); g.beginPath(); g.arc(0, 0, pw * 0.4, 0, 7); g.fillStyle = '#D64545'; g.fill(); g.fillStyle = '#FFFFFF'; g.font = '900 ' + ph * 0.62 + 'px' + FAM; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText('!', 0, ph * 0.03); g.restore(); } }, t); }
      Char('jensen', C - 0.4, 3.2, 2.8, Object.assign({ facing: 1, phase: 1 }, trk([[0, 'spr:cross'], [36.44, 'spr:think']])), 36.3, 38.6, t);
    }

    drawBG(0.05);
    GROUND.forEach(fn => fn());
    ITEMS.sort((a, b) => b.z - a.z).forEach(it => it.fn());
    OVER.forEach(fn => fn());
    HEADS.forEach(h => { const a = env(t, h[0], h[1], 0.3, 0.3); if (a > 0.01) drawShotBanner(h[2], h[3], a, h[4], t, h[0]); });
  }
