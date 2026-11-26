  const HEADS = [
    [2.0, 11.9, 'WHERE WE STARTED', 'Bringing Jensen Huang back gave NVIDIA a huge 31.5% relief rally', PAL.sageHi],
    [12.2, 27.4, 'THE CAPTAIN IS BACK AT THE WHEEL', 'But the storm outside the ship has not stopped', PAL.coral],
    [27.8, 34.0, 'THE NEXT TWO WEEKS', 'Can the AI boom keep growing when money gets expensive and rules get tighter?', PAL.amberHi]
  ];
  // MIX (docs/JC_TOOLBOX.md, "mix" rule): S1 = 3D location + characters (Jensen walks in, engineers cheer, a green rally arrow rises, the "what if" tower collapses); S2 = METAPHOR SCENE (a ship in a storm: Jensen at the wheel, rain, lightning, three dark clouds rolling in, each with an icon card);
  // S3 = graph on paper + 3D walls squeezing it. Spoken-word times (wt.py "Act 7"): started 1.58, bringing 2.98, relief 7.12, rally 7.71, monday 8.48, founder 10.43, disaster 11.68, captain 13.75, wheel 14.73, storm 15.84, ship 16.68, december 19.24, questioning 20.65, washington 21.47,
  // coreweave's 22.16, loan 22.86, federal 24.56, 8 25.86, decision 26.2, weeks 27.85, boom 29.6, growing 30.45, expensive 31.91, tighter 33.21

  function renderShots(t) {
    const cv = evalCam(t);
    Cam3D.set([cv[0], cv[1], cv[2]], [cv[3], cv[4], cv[5]], cv[6], 0.01 * Math.sin(t * 0.6));
    GROUND = []; ITEMS = []; OVER = [];
    const hit = (x, y, z, ht, col, r) => { const p = S(x, y, z); if (p) OVER.push(() => hitFx(p.x, p.y, t, ht, { color: col, r: r || 240, rays: 14 })); };
    const flash = ft => { const a = Math.max(0, 1 - (t - ft) / 0.28) * 0.55; if (t >= ft && a > 0.02) OVER.push(() => { ctx.save(); ctx.globalAlpha = a; ctx.fillStyle = '#FFFFFF'; ctx.fillRect(0, 0, 1920, 1080); ctx.restore(); }); };
    const trk = (keys, d) => RigKit.track(t, keys, d);
    for (let k = 0; k < 6; k++) pad(-42 + k * 26, -12, -12 + k * 26, 14, ['#B9C7CE', '#A9B8C2', '#C9B9A9', '#A9AEC4', '#B9BFC9'][k % 5]);

    // ===== S0 (0 - 1.8) CONNECTION: the last picture of Act 6 (the stock priced for perfection, the crack, the fast selling, panicking investors). "Let's come back to where we started" =====
    if (t < 2.4) {
      const C = -26; Card(C - 1.0, 7.6, 1.2, 15.0, 10.0, { kind: 'paint', rot: -0.012, t0: -30, t1: 0, paint: (g, pw, ph) => { stepChart(g, pw, ph, [[-30, 0.34], [-29, 0.2, 1.4], [-5, 0.78, 0.7]], t, 'PRICED FOR PERFECTION', [[-4, 'FAST SELLING', '#D64545']], { sub: 'as if nothing can go wrong', refs: [{ y: 0.2, t0: -28, label: 'NOTHING CAN GO WRONG', col: '#B8860B' }] }); } }, t);
      [[C - 15.0, 'trader'], [C - 12.4, 'bondholder'], [C + 13.2, 'banker']].forEach(([x, r], i) => Char(r, x, 3.4, 2.4, Object.assign({ facing: x < C ? 1 : -1, phase: i }, trk([[0, 'panic']])), 0, 2.4, t));
    }

    // ===== S1 (2 - 12) 3D LOCATION + CHARACTERS: back where we started (1.58): Jensen walks back in (bringing 2.98) to NVIDIA's tower, the engineers cheer; a green rally ARROW rises with 31.5% (7.12 - 7.71); then the "what if": without its founder (10.43) the tower would crumble - a disaster (11.68) =====
    if (t >= 1.9 && t < 12.6) {
      const C = 0; miniTower(C - 4.0, -5.0, 8.5, 'NVIDIA');
      courier('jensen', [[2.0, C - 15.0, 3.2], [2.9, C - 15.0, 3.2], [5.6, C - 6.4, 3.2], [12.6, C - 6.4, 3.2]], [], t, { face: 1, hW: 2.8, idle: 'cross' });
      [[C - 10.0, 'engineer'], [C - 8.4, 'employee'], [C - 1.0, 'engineer']].forEach(([x, r], i) => Char(r, x, 4.0 + (i % 2) * 0.5, 2.3, Object.assign({ facing: i < 2 ? 1 : -1, phase: i }, trk([[0, 'cross'], [4.6 + i * 0.25, 'cheer'], [6.6, 'cross']])), 4.4, 12.6, t));
      if (t >= 7.12) { const u = easeOut(seg(t, 7.12, 8.4)); Box(C + 3.4, 0, 1.0, 1.4, 6.0 * u, 1.0, '#2B8A6E', { emis: 0.35 }); Box(C + 2.6, 6.0 * u, 1.0, 3.0, 0.5, 1.0, '#2B8A6E', { emis: 0.35 }); Box(C + 3.0, 6.5 * u, 1.0, 2.2, 0.5, 1.0, '#2B8A6E', { emis: 0.35 }); Card(C + 3.4, 11.4, 1.8, 6.0, 2.6, { kind: 'counter', text: '+31.5%', sub: 'relief rally', fg: '#9BE0B5', accent: '#2B8A6E', t0: 7.12, t1: 0, pulse: [7.5] }, t); }
      if (t >= 10.43) { const f = t - 10.43; for (let i = 0; i < 5; i++) { const fall = Math.max(0, f * 2.4 - i * 0.35), y = Math.max(0, 1.7 * (4 - i) - 3.6 * fall * fall); const a = 0.55 * (1 - seg(t, 11.7, 12.4)); if (a > 0.02) Box(C + 11.0 + (i % 2) * 0.5 + fall * (i % 2 ? 1.4 : -1.2), y, -1.0, 4.4, 1.6, 2.4, i % 2 ? '#5A6B78' : '#6E7F8C', { a }); } if (t >= 11.68 && t < 12.2) hit(C + 11.0, 2.0, 0.0, 11.7, PAL.coral, 240); }
    }

    // ===== S2 (12.2 - 27.5) METAPHOR SCENE: the captain (13.75) back at the WHEEL (14.73) does not stop the STORM (15.84) outside the SHIP (16.68): rain, lightning; then three dark clouds roll in, each with its icon: Jensen's December 1 and 3 questioning in Washington (19.24 - 21.47), CoreWeave's loan troubles (22.16 - 22.86), the Fed's December 8 rate decision (24.56 - 26.2) =====
    if (t >= 12.1 && t < 28.0) {
      const C = 26, storm = easeOut(seg(t, 15.84, 17.2)); waves(C, 0.2, 40, t, 20); ship(C - 2.0, 1.0, t, 1.0 + 1.2 * storm);
      Char('jensen', C + 1.8, 1.2, 2.8, Object.assign({ facing: 1, phase: 1 }, trk([[0, 'spr:cross'], [13.75, 'spr:point'], [15.84, 'spr:overwhelmed']])), 12.2, 28.0, t);
      rain(C, 0.5, 34, t, 48, 0.25 + 0.75 * storm); if (t >= 15.84) { flash(15.9); flash(22.6); }
      [[C - 12.0, 19.24, 'gov', 'DEC 1 AND 3', 'QUESTIONING'], [C - 1.0, 22.16, 'cloud', 'LOAN TROUBLES', 'COREWEAVE'], [C + 9.5, 24.56, 'bank', 'DEC 8', 'RATE DECISION']].forEach(([cx, t0, ic, l1, l2], i) => { const u = easeOut(seg(t, t0 - 0.4, t0 + 0.6)), dim = i === 0 ? 1 - 0.35 * seg(t, 22.16, 22.8) : i === 1 ? 1 - 0.35 * seg(t, 24.56, 25.2) : 1; stormCloud(cx, 15.0, 0.0, 1.9, u, 0.96 * dim);
        if (u > 0.5) Card(cx, 11.0, 1.4, 6.4, 5.2, { kind: 'paint', t0, t1: 0, paint: (g, pw, ph) => { const q = seg(t, t0, t0 + 0.4); g.save(); g.globalAlpha = q * dim; const m = pw * 0.05; rrect(g, m, m, pw - 2 * m, ph - 2 * m, ph * 0.08); g.fillStyle = '#FBF8EF'; g.fill(); g.fillStyle = '#17252B'; g.textAlign = 'center'; g.textBaseline = 'middle'; bdIcon(g, ic, pw / 2, ph * 0.34, pw * 0.2); g.font = '900 ' + ph * 0.12 + 'px' + FAM; g.fillText(l1, pw / 2, ph * 0.68); g.font = '800 ' + ph * 0.09 + 'px' + FAM; g.fillStyle = '#B8412F'; g.fillText(l2, pw / 2, ph * 0.84); g.restore(); } }, t); });
    }

    // ===== S3 (27.6 - 34.1) GRAPH + 3D WALLS: the next two WEEKS (27.85) will show whether the AI BOOM (29.6) can KEEP GROWING (30.45): the line splits into a green and a red path; as money gets EXPENSIVE (31.91) and rules get TIGHTER (33.21), two walls slide in =====
    if (t >= 27.5) {
      const C = 52; Card(C, 7.8, 1.2, 15.0, 10.0, { kind: 'paint', rot: -0.012, t0: 27.7, t1: 0, paint: (g, pw, ph) => { const A = paperSheet(g, pw, ph, 'THE NEXT TWO WEEKS', 'will the AI boom keep growing?'), px = f => A.X0 + (A.X1 - A.X0) * f, py = f => A.Y0 + (A.Y1 - A.Y0) * f; const pts = [[0.04, 0.55], [0.22, 0.42], [0.4, 0.34], [0.52, 0.3]], u = seg(t, 27.85, 29.6), n = Math.max(1, Math.floor(u * (pts.length - 1) * 20));
        g.lineCap = 'round'; g.lineJoin = 'round'; g.lineWidth = ph * 0.026; g.strokeStyle = '#1F9D6B'; g.beginPath(); for (let i = 0; i <= n; i++) { const q = i / 20, k = Math.min(pts.length - 2, Math.floor(q)), f = q - k, x = lerp(pts[k][0], pts[k + 1][0], f), y = lerp(pts[k][1], pts[k + 1][1], f); if (i === 0) g.moveTo(px(x), py(y)); else g.lineTo(px(x), py(y)); } g.stroke();
        const b = seg(t, 29.6, 31.4); if (b > 0) { g.setLineDash([ph * 0.03, ph * 0.025]); g.lineWidth = ph * 0.022; g.strokeStyle = '#1F9D6B'; g.beginPath(); g.moveTo(px(0.52), py(0.3)); g.lineTo(lerp(px(0.52), px(0.94), b), lerp(py(0.3), py(0.08), b)); g.stroke(); g.strokeStyle = '#D64545'; g.beginPath(); g.moveTo(px(0.52), py(0.3)); g.lineTo(lerp(px(0.52), px(0.94), b), lerp(py(0.3), py(0.9), b)); g.stroke(); g.setLineDash([]); }
        if (t >= 29.6) { const q = seg(t, 29.6, 30.0); g.save(); g.translate(px(0.52), py(0.3)); g.scale(0.6 + 0.4 * q, 0.6 + 0.4 * q); bdIcon(g, 'q', 0, -ph * 0.11, ph * 0.075); g.restore(); }
        if (t >= 30.45) pill(g, px(0.72), py(0.04), 'KEEPS GROWING?', '#1F9D6B', ph, 1); if (t >= 31.0) pill(g, px(0.8), py(0.98), 'OR NOT?', '#D64545', ph, 1); } }, t);
      [[-1, 31.91, 'gauge', 'MONEY GETS EXPENSIVE'], [1, 33.21, 'gov', 'RULES GET TIGHTER']].forEach(([sd, t0, ic, lab]) => { const u = easeInOut(seg(t, t0 - 0.3, t0 + 0.9)), x = C + sd * lerp(13.4, 9.0, u); if (u > 0.02) { Box(x - 1.1, 0, 0.8, 2.2, 7.0 * Math.min(1, u * 2), 1.8, sd < 0 ? '#D9A93E' : '#2C5BA8'); Card(x, 11.0, 1.8, 6.4, 3.0, { kind: 'paint', t0, t1: 0, paint: (g, pw, ph) => { const q = seg(t, t0, t0 + 0.4); g.save(); g.globalAlpha = q; rrect(g, pw * 0.04, ph * 0.06, pw * 0.92, ph * 0.88, ph * 0.12); g.fillStyle = '#17252B'; g.fill(); bdIcon(g, ic, pw * 0.16, ph * 0.5, ph * 0.26, '#FFFFFF'); g.fillStyle = '#F2D58F'; g.textAlign = 'left'; g.textBaseline = 'middle'; g.font = '900 ' + Math.min(ph * 0.17, pw * 0.62 / (lab.length * 0.62)) + 'px' + FAM; g.fillText(lab, pw * 0.3, ph * 0.5); g.restore(); } }, t); } });
      Char('jensen', C - 13.6, 3.2, 2.8, Object.assign({ facing: 1, phase: 1 }, trk([[0, 'spr:think']])), 27.5, 35.0, t);
    }

    drawBG(0.05);
    GROUND.forEach(fn => fn());
    ITEMS.sort((a, b) => b.z - a.z).forEach(it => it.fn());
    OVER.forEach(fn => fn());
    HEADS.forEach(h => { const a = env(t, h[0], h[1], 0.3, 0.3); if (a > 0.01) drawShotBanner(h[2], h[3], a, h[4], t, h[0]); });
  }
