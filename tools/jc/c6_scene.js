  const HEADS = [
    [1.8, 11.9, 'STEP BACK FROM THE CHART', 'Inside NVIDIA\'s labs and factories, demand for AI chips is still massive', PAL.sageHi],
    [12.2, 18.3, 'WHAT HAS NOT CHANGED', 'Sales, profits and the technology lead have not disappeared overnight', PAL.sageHi],
    [18.6, 27.4, 'WHAT HAS CHANGED', 'The money system supporting the AI boom', PAL.amberHi],
    [27.8, 45.4, 'THREE ROADBLOCKS AT ONCE', 'Lenders, the central bank and Congress', PAL.coral],
    [45.8, 54.3, 'PRICED FOR PERFECTION', 'A small crack in credit or government rules triggers fast selling', PAL.coral]
  ];
  // TOOLBOX + FOCUS RULE (docs/JC_TOOLBOX.md): S1 3D factory + a queue of buyers growing one by one; S2 paper bars (three strengths stand tall); S3 board (the money system: lenders -> buyers -> NVIDIA, then the rocket nobody could slow); S4 three roadblock cards, each with a barrier that slams in on its words; S5 paper chart priced high, a crack, then the drop and sellers.
  // Spoken-word times (wt.py "Act 6"): step 0.18, chart 3.47, labs 7.59, factories 8.25, demand 9.44, massive 11.39, sales 13.26, profits 13.74, technology 14.64, disappeared 16.30, changed 18.56, money 19.62, system 20.04, investors 23.69, treated 24.33, slow 26.52,
  // three 28.34, roadblocks 29.43, same 31.83, lenders 33.36, central 37.75, december 40.52, congress 41.55, exports 43.54, spotlight 44.77, priced 47.04, wrong 48.95, crack 50.37, credit 51.00, fast 53.13, selling 53.41

  function renderShots(t) {
    const cv = evalCam(t);
    Cam3D.set([cv[0], cv[1], cv[2]], [cv[3], cv[4], cv[5]], cv[6], 0.01 * Math.sin(t * 0.6));
    GROUND = []; ITEMS = []; OVER = [];
    const hit = (x, y, z, ht, col, r) => { const p = S(x, y, z); if (p) OVER.push(() => hitFx(p.x, p.y, t, ht, { color: col, r: r || 240, rays: 14 })); };
    const pop = (txt, x, y, z, w, h, bg, fg, t0, t1, o) => Card(x, y, z, w, h, Object.assign({ kind: /^#(D94E43|2B8A6E|D99B26)$/i.test(bg) ? 'stamp' : 'tag', text: txt, bg, fg, accent: /^#(0B1A22|0B191E)$/i.test(bg) ? '#E2B857' : fg, t0, t1: t1 || 0 }, o || {}), t);
    const trk = (keys, d) => RigKit.track(t, keys, d);
    const board = (cx, t0, spec) => Card(cx, 7.6, 1.2, 21.0, 13.7, { kind: 'paint', t0, t1: 0, paint: (g, pw, ph) => boardDiagram(g, pw, ph, spec, t) }, t);
    const held = (kind, x, z, t0, t1, hW) => { if (t >= t0 && t < t1) item(kind, x, (hW || 2.4) * 0.72, z + 0.6, 1.6); };
    const who = (role, cx, t0, t1, keys, hW) => Char(role, cx - 12.8, 3.2, hW || 2.4, Object.assign({ facing: 1, phase: 1 }, trk(keys)), t0, t1, t);
    const barrier = (x, t0) => { const u = easeOut(seg(t, t0, t0 + 0.4)); if (u <= 0.02) return; Box(x - 2.4, 0, 1.4, 4.8, 1.3 * u, 0.6, '#F4F1EA'); for (let i = 0; i < 4; i++) Box(x - 2.2 + i * 1.2, 0, 1.45, 0.6, 1.3 * u, 0.55, '#D64545'); Box(x - 2.4, 0, 1.2, 0.35, 2.2 * u, 0.35, '#8A97A2'); Box(x + 2.05, 0, 1.2, 0.35, 2.2 * u, 0.35, '#8A97A2'); };
    const rb = (kind, t0) => (g, pw, ph) => { const u = seg(t, t0, t0 + 0.5), m = pw * 0.05; g.save(); g.globalAlpha = u; g.shadowColor = 'rgba(11,25,30,0.35)'; g.shadowBlur = pw * 0.05; g.shadowOffsetY = pw * 0.02; rrect(g, m, m, pw - 2 * m, ph - 2 * m, ph * 0.04); g.fillStyle = '#FBF8EF'; g.fill(); g.shadowColor = 'transparent';
      g.fillStyle = '#D64545'; g.fillRect(m, m, pw - 2 * m, ph * 0.1); g.fillStyle = '#17252B'; g.textAlign = 'center'; g.textBaseline = 'middle';
      if (kind === 'rate') { bdIcon(g, 'gauge', pw / 2, ph * 0.42, pw * 0.3, undefined, 0.5 + 0.38 * seg(t, t0 + 0.2, t0 + 1.2)); g.font = '900 ' + ph * 0.14 + 'px' + FAM; g.fillText('~18%', pw / 2, ph * 0.72); g.font = '800 ' + ph * 0.062 + 'px' + FAM; g.fillText('LENDERS', pw / 2, ph * 0.86); }
      else if (kind === 'fed') { bdIcon(g, 'bank', pw / 2, ph * 0.38, pw * 0.26); g.font = '900 ' + ph * 0.13 + 'px' + FAM; g.fillText('DEC 8', pw / 2, ph * 0.72); g.font = '800 ' + ph * 0.056 + 'px' + FAM; g.fillText('CENTRAL BANK', pw / 2, ph * 0.86); }
      else { g.fillStyle = 'rgba(242,201,76,0.5)'; g.beginPath(); g.moveTo(pw / 2, ph * 0.12); g.lineTo(pw * 0.1, ph * 0.66); g.lineTo(pw * 0.9, ph * 0.66); g.closePath(); g.fill(); bdIcon(g, 'gov', pw / 2, ph * 0.42, pw * 0.26); g.fillStyle = '#17252B'; g.font = '900 ' + ph * 0.1 + 'px' + FAM; g.fillText('SPOTLIGHT', pw / 2, ph * 0.74); g.font = '800 ' + ph * 0.056 + 'px' + FAM; g.fillText('CONGRESS', pw / 2, ph * 0.87); }
      g.restore(); };
    for (let k = 0; k < 8; k++) pad(-42 + k * 26, -12, -12 + k * 26, 14, ['#B9C7CE', '#A9B8C2', '#C9B9A9', '#A9AEC4', '#B9BFC9'][k % 5]);

    // ===== S0 (0 - 1.8) CONNECTION: the last picture of Act 5 part 2 (the paper chart of Monday's jump, investors walking away). "Step back from the daily ups and downs on the stock chart" =====
    if (t < 2.4) {
      const C = -26; Card(C - 1.0, 7.6, 1.2, 14.0, 9.2, { kind: 'paint', rot: -0.015, t0: -30, t1: 0, paint: (g, pw, ph) => stepChart(g, pw, ph, [[-30, 0.7], [-29, 0.2, 1.4]], t, 'MONDAY\'S JUMP', [[-28, '+31.5%', '#1F9D6B']], { sub: 'NVIDIA stock', col: '#1F9D6B' }) }, t);
      [[C - 15.0, 'trader'], [C - 12.6, 'bondholder'], [C + 14.0, 'banker']].forEach(([x, r], i) => Char(r, x, 3.4, 2.4, Object.assign({ facing: x < C ? -1 : 1, phase: i }, trk([[0, 'cross']])), 0, 2.4, t));
    }

    // ===== S1 (1.8 - 12) 3D: inside NVIDIA's LABS (7.59) and FACTORIES (8.25) DEMAND (9.44) for AI chips is still MASSIVE (11.39): the fab stands, then a queue of buyers with money bags grows one by one =====
    if (t >= 1.7 && t < 12.6) {
      const C = 0; miniTower(C - 9.0, -5.0, 7, 'NVIDIA LABS'); fabSite(C - 1.0, -4.5, easeOut(seg(t, 7.2, 8.8)));
      [['employee', 12.6], ['supply', 10.4], ['banker', 8.2], ['journalist', 6.0], ['engineer', 3.8]].forEach(([r, x], i) => { const t0 = 9.44 + i * 0.5; if (t < t0) return; Char(r, C + x, 3.4 + (i % 2) * 0.6, 2.3, Object.assign({ facing: -1, phase: i }, trk([[0, 'cross']])), t0, 12.6, t); held('bag', C + x - 1.0, 3.4 + (i % 2) * 0.6, t0, 12.6); });
      Char('engineer', C - 6.0, 3.2, 2.4, Object.assign({ facing: 1, phase: 1 }, trk([[0, 'cross'], [11.39, 'cheer']])), 7.0, 12.6, t);
    }

    // ===== S2 (12 - 18.3) PAPER BARS: NVIDIA's SALES (13.26), PROFITS (13.74) and TECHNOLOGY lead (14.64) have not DISAPPEARED (16.30) overnight: three tall bars stand one after another =====
    if (t >= 11.9 && t < 18.9) {
      const C = 26; Card(C, 7.6, 1.2, 16.0, 10.4, { kind: 'paint', rot: -0.012, t0: 12.2, t1: 0, paint: (g, pw, ph) => { paperSheet(g, pw, ph, 'NVIDIA\'S BUSINESS', 'still standing'); const base = 0.83, xs = [0.22, 0.5, 0.78], ts = [13.26, 13.74, 14.64], ns = [15, 14, 16], lb = ['SALES', 'PROFITS', 'TECH LEAD'];
        cashArt(g, pw, ph, xs.map((x, i) => ({ k: 'stack', x, y: base, s: 0.19, n: ns[i], t0: ts[i] })), t); g.fillStyle = '#17252B'; g.font = '900 ' + ph * 0.05 + 'px' + FAM; g.textAlign = 'center'; g.textBaseline = 'top'; xs.forEach((x, i) => { if (t >= ts[i]) g.fillText(lb[i], pw * x, ph * 0.85); });
        xs.forEach((x, i) => { if (t >= ts[i] + 0.5) pill(g, pw * x, ph * (base - ns[i] * 0.075 * 0.19 * pw / ph) - ph * 0.1, 'STRONG', '#1F9D6B', ph, easeOut(seg(t, ts[i] + 0.5, ts[i] + 0.85))); }); } }, t);
      who('engineer', C, 12.0, 18.9, [[0, 'cross'], [16.3, 'cheer']], 2.4);
    }

    // ===== S3 (18.4 - 27.6) BOARD: what has CHANGED (18.56) is the MONEY (19.62) SYSTEM (20.04): lenders -> AI buyers -> NVIDIA; for two years INVESTORS (23.69) treated NVIDIA as if nothing could SLOW it (26.52): a rocket climbs =====
    if (t >= 18.3 && t < 28.2) {
      const C = 52; board(C, 18.5, { nodes: [{ id: 'ld', label: 'LENDERS', ico: 'bank', x: 0.14, y: 0.55, t0: 19.0 }, { id: 'by', label: 'AI BUYERS', ico: 'company', x: 0.5, y: 0.55, t0: 19.4 }, { id: 'nv', label: 'NVIDIA', ico: 'nvidia', x: 0.86, y: 0.55, t0: 19.8 }, { id: 'iv', label: 'INVESTORS', ico: 'eye', x: 0.5, y: 0.14, t0: 23.6 }, { id: 'rk', label: 'NOTHING COULD SLOW IT', ico: 'rocket', x: 0.86, y: 0.14, t0: 25.8, bob: 1 }],
        links: [{ a: 'ld', b: 'by', t0: 19.62, kind: 'bag', label: 'LOANS', lab: -1.5, col: '#B8860B' }, { a: 'by', b: 'nv', t0: 20.6, kind: 'coin', label: 'CHIPS', lab: -1.5, col: '#2B8A6E' }, { a: 'iv', b: 'rk', t0: 24.4, kind: 'coin', label: 'CHEERING', lab: 1.6, col: '#2B8A6E' }] });
      who('banker', C, 18.3, 28.2, [[0, 'cross'], [19.62, 'point']]);
    }

    // ===== S4 (27.6 - 45.6) THREE (28.34) real-world ROADBLOCKS (29.43) at the exact SAME (31.83) time: LENDERS charging nearly 18% (33.36); a CENTRAL bank (37.75) ready to raise rates on December 8 (40.52); CONGRESS (41.55) putting chip EXPORTS (43.54) in a public SPOTLIGHT (44.77) =====
    if (t >= 27.5 && t < 46.2) {
      const C = 78; [[-8.0, 'rate', 33.36], [0.8, 'fed', 37.75], [9.6, 'congress', 41.55]].forEach(([dx, k, t0]) => { Card(C + dx, 8.4, 1.2, 7.6, 9.4, { kind: 'paint', t0, t1: 0, paint: rb(k, t0) }, t); barrier(C + dx, t0 + 0.2); if (t >= t0 + 0.2 && t < t0 + 0.8) hit(C + dx, 1.2, 1.6, t0 + 0.25, PAL.coral, 200); });
      Char('jensen', C - 13.4, 3.2, 2.8, Object.assign({ facing: 1, phase: 1 }, trk([[0, 'spr:cross'], [33.36, 'spr:think'], [41.55, 'spr:overwhelmed']])), 27.6, 46.2, t);
    }

    // ===== S5 (45.6 - 54.4) PAPER CHART: a stock PRICED (47.04) as if nothing can go WRONG (48.95) stays high; a small CRACK (50.37) in CREDIT (51.0) or government rules; FAST (53.13) SELLING (53.41) =====
    if (t >= 45.5) {
      const C = 104; Card(C - 0.4, 7.6, 1.2, 18.0, 10.2, { kind: 'paint', rot: -0.012, t0: 45.8, t1: 0, paint: (g, pw, ph) => { cashChart(g, pw, ph, { keys: [[46.0, 0.34], [47.0, 0.2, 1.4], [53.13, 0.78, 0.7]], title: 'PRICED FOR PERFECTION', tags: [[53.4, 'FAST SELLING', '#D64545']], opt: { sub: 'as if nothing can go wrong', refs: [{ y: 0.2, t0: 47.4, label: 'NOTHING CAN GO WRONG', col: '#B8860B' }] }, n0: 2, n1: 15, t0: 46.0, bursts: [53.13, 53.8] }, t);
        if (t >= 50.37) { const u = seg(t, 50.37, 50.9), x = pw * 0.4, y = ph * 0.34; g.save(); g.strokeStyle = '#D64545'; g.lineWidth = ph * 0.014; g.lineCap = 'round'; g.lineJoin = 'round'; g.beginPath(); g.moveTo(x, y); g.lineTo(x + pw * 0.02 * u, y + ph * 0.07 * u); g.lineTo(x - pw * 0.008 * u, y + ph * 0.13 * u); g.lineTo(x + pw * 0.016 * u, y + ph * 0.2 * u); g.stroke(); g.restore(); } } }, t);
      [[C - 15.0, 'trader', 1], [C - 12.4, 'bondholder', 2], [C + 13.2, 'banker', 3]].forEach(([x, r, i]) => Char(r, x, 3.4, 2.4, Object.assign({ facing: x < C ? 1 : -1, phase: i }, trk([[0, 'cross'], [53.13, 'panic']])), 45.5, 55.0, t));
    }

    drawBG(0.05);
    GROUND.forEach(fn => fn());
    ITEMS.sort((a, b) => b.z - a.z).forEach(it => it.fn());
    OVER.forEach(fn => fn());
    HEADS.forEach(h => { const a = env(t, h[0], h[1], 0.3, 0.3); if (a > 0.01) drawShotBanner(h[2], h[3], a, h[4], t, h[0]); });
  }
