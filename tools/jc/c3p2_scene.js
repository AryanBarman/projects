  const HEADS = [
    [5.2, 17.9, 'COREWEAVE\'S DEBT AFTER THE RETURN', 'A rally on Monday, then lenders dumped it to record lows', PAL.coral],
    [18.3, 25.7, 'THE PRICE OF BORROWING', 'About 75 to 77 cents on the dollar pushed the rate on 2031 loans to nearly 18%', PAL.amberHi],
    [26.0, 34.9, 'WHAT 18% REALLY MEANS', 'Safe U.S. government loans pay around 4%', PAL.cyan],
    [35.2, 44.9, 'LENDERS ARE WORRIED', 'Even with NVIDIA backing it, they fear not being paid back', PAL.coral],
    [45.2, 51.9, 'A BIG CASH NEED', 'Up to $5 billion in fresh cash through 2027', PAL.amberHi],
    [52.2, 61.8, 'THE BIG QUESTION', 'How do debt-heavy AI companies keep buying tens of billions in chips?', PAL.coral],
    [62.0, 68.6, 'THE $118 BILLION RISK', 'What if a big partner runs short on cash?', PAL.coral],
    [69.0, 77.8, 'THEN THE INFLATION REPORT', 'Borrowing got even more expensive', PAL.amberHi]
  ];
  // PATH PER IDEA (docs/JC_DEPICTION_MAP.md): numbers over time = PAPER CHART (stepChart / paperBars); deals, loans, loops, causes = 2D BOARD (boardDiagram) with a presenter; lenders shouting = 3D scene.
  // Spoken-word times (wt.py "Act 3 part 2"): monday 5.81, lenders 12.46, dumped 12.96, record 14.94, cents 17.54, 2031 21.91, 18 percent 24.08 / 26.7, safe 31.90, 4 percent 33.83, worried 44.13, $5 48.44, 2027 51.16, borrowing 52.29, buying 58.38, guarantees 65.86, short 67.84, inflation 74.12, report 74.62, expensive 76.62

  function renderShots(t) {
    const cv = evalCam(t);
    Cam3D.set([cv[0], cv[1], cv[2]], [cv[3], cv[4], cv[5]], cv[6], 0.01 * Math.sin(t * 0.6));
    GROUND = []; ITEMS = []; OVER = [];
    const hit = (x, y, z, ht, col, r) => { const p = S(x, y, z); if (p) OVER.push(() => hitFx(p.x, p.y, t, ht, { color: col, r: r || 240, rays: 14 })); };
    const pop = (txt, x, y, z, w, h, bg, fg, t0, t1, o) => Card(x, y, z, w, h, Object.assign({ kind: /^#(D94E43|2B8A6E|D99B26)$/i.test(bg) ? 'stamp' : 'tag', text: txt, bg, fg, accent: /^#(0B1A22|0B191E)$/i.test(bg) ? '#E2B857' : fg, t0, t1: t1 || 0 }, o || {}), t);
    const trk = (keys, d) => RigKit.track(t, keys, d);
    const board = (cx, t0, spec) => Card(cx, 7.6, 1.2, 21.0, 13.7, { kind: 'paint', t0, t1: 0, paint: (g, pw, ph) => boardDiagram(g, pw, ph, spec, t) }, t);
    const paper = (cx, t0, fn) => Card(cx, 7.6, 1.2, 17.0, 11.2, { kind: 'paint', rot: -0.015, t0, t1: 0, paint: fn }, t);
    const who = (role, cx, t0, t1, keys, hW) => Char(role, cx - 12.8, 3.2, hW || 2.4, Object.assign({ facing: 1, phase: 1 }, trk(keys)), t0, t1, t);
    for (let k = 0; k < 10; k++) pad(-42 + k * 26, -12, -12 + k * 26, 14, ['#B9C7CE', '#A9B8C2', '#C9B9A9', '#A9AEC4', '#B9BFC9'][k % 5]);

    // ===== S0 (0 - 5) CONNECTION: the last board of Act 3 part 1 (NVIDIA -> guarantee -> bank -> LOAN -> partner, chips and payment back); the partner is now named: CoreWeave =====
    if (t < 5.6) {
      const C = -26; board(C, -30, { nodes: [{ id: 'nv', label: 'NVIDIA', ico: 'nvidia', x: 0.16, y: 0.66, t0: -30 }, { id: 'bk', label: 'BANK', ico: 'bank', x: 0.5, y: 0.24, t0: -30 }, { id: 'pt', label: 'COREWEAVE', ico: 'cloud', x: 0.84, y: 0.66, t0: -30 }],
        links: [{ a: 'nv', b: 'bk', t0: -30, kind: 'paper', label: 'GUARANTEE', lab: -1.9 }, { a: 'bk', b: 'pt', t0: -30, kind: 'bag', label: 'LOAN', lab: -1.9 }, { a: 'pt', b: 'nv', t0: -30, kind: 'coin', label: 'PAY', off: 1.0, lab: -1.3, col: '#B8860B' }, { a: 'nv', b: 'pt', t0: -30, kind: 'chip', label: 'CHIPS', off: 1.0, lab: 1.5, col: '#2B8A6E' }] });
      who('trader', C, 0, 5.6, [[0, 'cross'], [3.0, 'point']]);
    }

    // ===== S1 (5 - 17.9) PAPER CHART: on Monday CoreWeave's debt price ROSE with NVIDIA's rally (5.81); by Tuesday and Wednesday lenders DUMPED it (12.46) to record lows (14.94), about 75 to 77 cents on the dollar (17.54) =====
    if (t >= 4.9 && t < 18.4) {
      const C = 0; Card(C, 7.4, 1.2, 18.0, 10.4, { kind: 'paint', rot: -0.01, t0: 5.0, t1: 0, paint: (g, pw, ph) => cashChart(g, pw, ph, { keys: [[5.0, 0.5], [5.81, 0.3, 1.6], [12.46, 0.82, 0.7], [14.94, 0.88, 1.2]], title: 'COREWEAVE DEBT PRICE', tags: [[6.4, 'RALLY', '#1F9D6B'], [12.7, 'LENDERS DUMP', '#D64545'], [17.54, '75-77 CENTS', '#D64545']], opt: { sub: 'what lenders would pay for its bonds', refs: [{ y: 0.12, t0: 5.4, label: '100 CENTS = FACE VALUE', col: '#B8860B' }, { y: 0.9, t0: 14.94, label: 'RECORD LOW', col: '#D64545' }] }, n0: 2, n1: 15, t0: 5.0, bursts: [12.46, 13.2] }, t) }, t);
      who('banker', C, 4.8, 18.4, [[0, 'think'], [12.46, 'panic']]);
    }

    // ===== S2 (18.2 - 25.7) BOARD: the 2031 LOANS (bond paper) pushed the interest rate up (21.91) to nearly 18% (24.08) =====
    if (t >= 18.1 && t < 26.2) {
      const C = 26; board(C, 18.3, { nodes: [{ id: 'bd', label: '2031 LOANS', ico: 'paper', x: 0.2, y: 0.55, t0: 18.6, badge: [[17.54 + 1.2, '75-77 CENTS']] }, { id: 'gg', label: 'INTEREST RATE', ico: 'gauge', x: 0.74, y: 0.55, t0: 19.0, needle: [[19.0, 0.12], [22.0, 0.12], [22.4, 0.88, 2.4]], badge: [[24.1, 'NEARLY 18%']] }],
        links: [{ a: 'bd', b: 'gg', t0: 21.91, kind: 'coin', label: 'PUSHES UP', lab: -1.6, col: '#D64545' }] });
      who('banker', C, 18.1, 26.2, [[0, 'cross'], [21.91, 'point']]);
    }

    // ===== S3 (26 - 34.9) PAPER BARS: what 18% means in real life (26.7): safe U.S. government loans pay around 4% (31.9 / 33.83) =====
    if (t >= 25.9 && t < 35.4) {
      const C = 52; Card(C, 7.6, 1.2, 15.0, 10.0, { kind: 'paint', rot: -0.01, t0: 26.0, t1: 0, paint: (g, pw, ph) => { paperSheet(g, pw, ph, 'INTEREST ON $100 BORROWED', 'what lenders charge each year'); const k = 0.075 * 0.19 * pw / ph, base = 0.83, u1 = seg(t, 26.7, 27.6), u2 = seg(t, 31.9, 32.6), n1 = 18 * easeOut(u1), n2 = 4 * easeOut(u2);
        cashArt(g, pw, ph, [{ k: 'stack', x: 0.32, y: base, s: 0.19, n: Math.max(0.01, n1), t0: 26.7 }, { k: 'stack', x: 0.7, y: base, s: 0.19, n: Math.max(0.01, n2), t0: 31.9 }], t); cashBurst(g, pw, ph, 0.32, 0.45, t, 27.2, 8); refLine(g, pw, ph, base - 4 * k, '', '#2B8A6E', seg(t, 31.9, 32.7));
        g.fillStyle = '#17252B'; g.font = '900 ' + ph * 0.045 + 'px' + FAM; g.textAlign = 'center'; g.textBaseline = 'top'; if (t >= 26.7) g.fillText('COREWEAVE', pw * 0.32, ph * 0.85); if (t >= 31.9) g.fillText('US GOVERNMENT', pw * 0.7, ph * 0.85);
        if (t >= 27.2) pill(g, pw * 0.32, ph * (base - n1 * k) - ph * 0.1, '~18%', '#D64545', ph, easeOut(seg(t, 27.2, 27.6))); if (t >= 33.83) pill(g, pw * 0.7, ph * (base - 4 * k) - ph * 0.1, '~4%', '#1F9D6B', ph, easeOut(seg(t, 33.83, 34.2))); } }, t);
      who('trader', C, 25.9, 35.4, [[0, 'cross'], [31.9, 'point']]);
    }

    // ===== S4 (35 - 44.9) 3D: big lenders DEMAND 18% to lend to an AI company; even with NVIDIA backing it (40.4: the umbrella opens over CoreWeave), they are SHOUTING they are worried (44.13) =====
    if (t >= 35.0 && t < 45.4) {
      const C = 78; miniTower(C + 8.5, -4.8, 7.5, 'COREWEAVE'); const um = easeOut(seg(t, 40.4, 41.6)); umbrella(C + 8.5, -3.0, 6.4, 9.6, um, '#76B900');
      Char('engineer', C + 3.4, 3.6, 2.4, Object.assign({ facing: -1, phase: 2 }, trk([[0, 'cross'], [40.4, 'hold'], [43.1, 'panic']])), 35.0, 45.4, t);
      [[C - 9.0, 'trader', 0], [C - 6.0, 'bondholder', 1], [C - 3.0, 'banker', 2]].forEach(([bx, r, i]) => Char(r, bx, 3.0 + (i % 2) * 0.8, 2.4, Object.assign({ facing: 1, phase: i }, trk([[0, 'cross'], [38.4, 'point'], [43.1, 'panic']])), 35.0, 45.4, t));
      if (t >= 38.2 && t < 43.0) pop('18%!', C - 6.0, 8.4, 3, 4.8, 1.2, '#D94E43', '#F4F1EA', 38.2, 43.0);
      if (t >= 43.1) pop('WILL WE BE PAID BACK?', C - 4.0, 9.4, 3, 11.0, 1.2, '#0B1A22', '#F4F1EA', 43.1, 0);
    }

    // ===== S5 (45 - 51.9) 3D (re-mixed from a board): CoreWeave expects to need up to $5 billion (48.44) in fresh cash: big money bags are STACKED up one by one beside its tower; through 2027 (51.16): a calendar tag =====
    if (t >= 45.0 && t < 52.4) {
      const C = 104; miniTower(C + 9.0, -5.0, 7.0, 'COREWEAVE'); Char('kress', C + 3.6, 3.4, 2.6, Object.assign({ facing: -1, phase: 1 }, trk([[0, 'think'], [48.44, 'point']])), 45.2, 52.4, t);
      [[-7.4, 0], [-3.4, 0], [-5.4, 1.5], [-7.4, 3.0], [-3.4, 3.0]].forEach(([dx, dy], i) => { const t0 = 48.44 + i * 0.4, u = easeOut(seg(t, t0, t0 + 0.4)); if (u > 0.02) itemBag(C + dx, dy + 6.0 * (1 - u), 2.0, 2.2); });
      if (t >= 48.44) Card(C - 5.4, 9.6, 1.8, 8.6, 2.8, { kind: 'counter', text: 'UP TO $5 BILLION', sub: 'fresh cash needed', fg: '#F2D58F', accent: '#E2B857', t0: 48.44, t1: 0, pulse: [48.8] }, t);
      if (t >= 51.16) Card(C + 9.0, 12.6, 1.8, 8.4, 2.2, { kind: 'paint', t0: 51.16, t1: 0, paint: (g, pw, ph) => { const q = seg(t, 51.16, 51.6); g.save(); g.globalAlpha = q; rrect(g, pw * 0.04, ph * 0.08, pw * 0.92, ph * 0.84, ph * 0.18); g.fillStyle = '#17252B'; g.fill(); bdIcon(g, 'cal', pw * 0.17, ph * 0.5, ph * 0.3); g.fillStyle = '#F2D58F'; g.font = '900 ' + ph * 0.3 + 'px' + FAM; g.textAlign = 'left'; g.textBaseline = 'middle'; g.fillText('THROUGH 2027', pw * 0.3, ph * 0.52); g.restore(); } }, t);
    }

    // ===== S6 (52 - 61.8) BOARD: if borrowing costs nearly 18% (52.29), how do debt-heavy AI companies keep BUYING (58.38) tens of billions of dollars in NVIDIA chips? =====
    if (t >= 52.0 && t < 62.3) {
      const C = 130; board(C, 52.2, { nodes: [{ id: 'co', label: 'DEBT-HEAVY AI COMPANIES', ico: 'company', x: 0.2, y: 0.58, t0: 52.4, badge: [[52.5, 'NEARLY 18%']] }, { id: 'nv', label: 'NVIDIA', ico: 'nvidia', x: 0.8, y: 0.58, t0: 55.0, badge: [[59.2, 'TENS OF BILLIONS']] }, { id: 'q', ico: 'q', bare: 1, x: 0.5, y: 0.2, t0: 56.2 }],
        links: [{ a: 'co', b: 'nv', t0: 58.38, kind: 'coin', label: 'PAY', off: 1.1, lab: 1.5, col: '#B8860B' }, { a: 'nv', b: 'co', t0: 58.9, kind: 'chip', label: 'CHIPS', off: 1.1, lab: -1.5, col: '#2B8A6E' }] });
      who('trader', C, 52.0, 62.3, [[0, 'cross'], [58.38, 'point']]);
    }

    // ===== S7 (62 - 68.6) 3D (re-mixed from a board): NVIDIA's $118 billion in GUARANTEES (65.86) = a big green umbrella over the partner's data centers; if the partner runs SHORT on cash (67.84) the umbrella folds, the rain falls on the racks and the partner's cash runs out =====
    if (t >= 61.9 && t < 69.2) {
      const C = 156; miniTower(C - 11.0, -5.0, 6.0, 'NVIDIA'); rackRow(C + 1.0, -2.2, 6, [62.4, 62.6, 62.8, 63.0, 63.2, 63.4], t);
      const up = easeOut(seg(t, 65.4, 66.4)) * (1 - Math.pow(seg(t, 67.84, 68.6), 2) * 0.9); umbrella(C + 5.2, -2.2, 7.0, 6.4, up, '#76B900');
      if (t >= 65.86) Card(C + 5.2, 9.6, 1.8, 9.0, 2.8, { kind: 'counter', text: '$118 BILLION', sub: 'guarantees', fg: '#F2D58F', accent: '#76B900', t0: 65.86, t1: 0, pulse: [66.2] }, t);
      rain(C + 5.2, 0.0, 16, t, 36, seg(t, 67.84, 68.4)); if (t >= 67.84 && t < 68.4) hit(C + 5.2, 8.0, 0.0, 67.88, PAL.coral, 220);
      Char('banker', C - 4.0, 3.4, 2.5, Object.assign({ facing: 1, phase: 1 }, trk([[0, 'think'], [65.86, 'point'], [67.84, 'panic']])), 61.9, 69.2, t);
      Char('trader', C + 13.4, 3.4, 2.4, Object.assign({ facing: -1, phase: 2 }, trk([[0, 'cross'], [67.84, 'panic']])), 62.2, 69.2, t);
    }

    // ===== S8 (69 - 77.9) BOARD: right as lenders asked that question (69.4), the GOVERNMENT released an INFLATION REPORT (74.12 / 74.62) that made borrowing even more EXPENSIVE (76.62) =====
    if (t >= 68.9) {
      const C = 182; board(C, 69.0, { nodes: [{ id: 'q', ico: 'q', bare: 1, x: 0.5, y: 0.17, t0: 69.4 }, { id: 'gv', label: 'GOVERNMENT', ico: 'gov', x: 0.11, y: 0.6, t0: 72.0 }, { id: 'rp', label: 'INFLATION REPORT', ico: 'paper', x: 0.5, y: 0.6, t0: 74.12 }, { id: 'gg', label: 'BORROWING COST', ico: 'gauge', x: 0.89, y: 0.6, t0: 69.6, needle: [[69.6, 0.86], [75.6, 0.86], [76.62, 1.0, 1.3]] }],
        links: [{ a: 'gv', b: 'rp', t0: 74.12, kind: 'paper', label: 'RELEASES', lab: -1.5 }, { a: 'rp', b: 'gg', t0: 75.3, kind: 'coin', label: 'PUSHES UP', lab: -1.6, col: '#D64545' }] });
      who('lawmaker', C, 68.9, 78.4, [[0, 'cross'], [74.12, 'point']]);
    }

    drawBG(0.05);
    GROUND.forEach(fn => fn());
    ITEMS.sort((a, b) => b.z - a.z).forEach(it => it.fn());
    OVER.forEach(fn => fn());
    HEADS.forEach(h => { const a = env(t, h[0], h[1], 0.3, 0.3); if (a > 0.01) drawShotBanner(h[2], h[3], a, h[4], t, h[0]); });
  }
