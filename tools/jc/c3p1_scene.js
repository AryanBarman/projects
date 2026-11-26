  const HEADS = [
    [3.6, 10.8, 'DON\'T JUST WATCH NVIDIA', 'Watch the companies borrowing billions to buy its chips', PAL.amberHi],
    [11.2, 21.6, 'MEET COREWEAVE', 'A fast-growing AI cloud company and one of NVIDIA\'s closest partners', PAL.cyan],
    [21.9, 31.0, 'MORE THAN A CUSTOMER', 'NVIDIA invested $2 billion and promised to buy unused computing power', PAL.sageHi],
    [31.2, 40.6, 'THE $118 BILLION BACKSTOP', 'Financial guarantees for AI data center projects', PAL.coral],
    [41.0, 47.9, 'IN SIMPLE TERMS', 'NVIDIA helps guarantee the loans that let partners buy NVIDIA chips', PAL.amberHi]
  ];
  // CLEAN STAGING RULES (review 2026-11-26): one wide still composition per idea (stage = centre +-12), buildings at the sides and BEHIND (z -3..-5), people in front lanes (z 2.8-5.2) so nothing overlaps,
  // everything is shown standing for ~1 s BEFORE it moves, the camera only holds / eases (no arcs through the set). Verbs shown as actions (docs/JC_DEPICTION_MAP.md).
  // Spoken-word times (wt.py "Act 3 part 1"): don't 3.51, borrowing 6.98, buy 8.92, coreweave 11.54, fastest-growing 12.92, closest 17.33, doesn't 19.04, invested 23.18, unused 27.66, april 29.90, revealed 31.34, $118 35.42, data 39.62, guarantee 43.77, loans 44.70, buy chips ~46.1

  function renderShots(t) {
    const cv = evalCam(t);
    Cam3D.set([cv[0], cv[1], cv[2]], [cv[3], cv[4], cv[5]], cv[6], 0.01 * Math.sin(t * 0.6));
    GROUND = []; ITEMS = []; OVER = [];
    const hit = (x, y, z, ht, col, r) => { const p = S(x, y, z); if (p) OVER.push(() => hitFx(p.x, p.y, t, ht, { color: col, r: r || 240, rays: 14 })); };
    const pop = (txt, x, y, z, w, h, bg, fg, t0, t1, o) => Card(x, y, z, w, h, Object.assign({ kind: /^#(D94E43|2B8A6E|D99B26)$/i.test(bg) ? 'stamp' : 'tag', text: txt, bg, fg, accent: /^#(0B1A22|0B191E)$/i.test(bg) ? '#E2B857' : fg, t0, t1: t1 || 0 }, o || {}), t);
    const trk = (keys, d) => RigKit.track(t, keys, d);
    const board = (cx, t0, spec) => Card(cx, 7.6, 1.2, 21.0, 13.7, { kind: 'paint', t0, t1: 0, paint: (g, pw, ph) => boardDiagram(g, pw, ph, spec, t) }, t);   // a deal explained on a board (2D): see boardDiagram in assets_jb.js
    const held = (kind, x, z, t0, t1, hW) => { if (t >= t0 && t < t1) item(kind, x, (hW || 2.4) * 0.72, z + 0.6, 1.6); };
    for (let k = 0; k < 6; k++) pad(-42 + k * 26, -12, -12 + k * 26, 14, ['#B9C7CE', '#A9B8C2', '#C9B9A9', '#A9AEC4', '#B9BFC9'][k % 5]);

    // ===== S0 (0 - 3.4) CONNECTION: the last picture of Act 2 part 2 (calm paper chart, stack of UNPAID BILLS, the partner tower) =====
    if (t < 4.0) {
      Card(-43, 6.4, 1.2, 8.2, 5.4, { kind: 'paint', rot: -0.02, t0: -30, t1: 0, paint: (g, pw, ph) => stepChart(g, pw, ph, [[-30, 0.5], [-5, 0.47, 2.0], [-2, 0.5, 3.0]], t, 'NVIDIA STOCK', [[-29, 'NO WARNING', '#1F9D6B']], { sub: 'the chart looks calm' }) }, t);
      for (let k = 0; k < 4; k++) { Box(-32.0 + (k % 2) * 0.5, 0.2 + k * 0.45, 1.8 - k * 0.1, 4.2, 0.35, 3.0, '#F4F1EA'); Box(-31.8 + (k % 2) * 0.5, 0.56 + k * 0.45, 1.8 - k * 0.1, 3.0, 0.04, 0.4, '#D64545', { lw: 0 }); }
      pop('UNPAID BILLS', -30.0, 4.2, 3, 7.0, 1.1, '#D94E43', '#F4F1EA', -30, 0); hqTower(-20.0, -4, 0.45, 'PARTNER');
      Char('trader', -27.0, 3.2, 2.4, Object.assign({ facing: 1, phase: 2 }, trk([[0, 'panic']])), 0, 4.0, t); Char('banker', -46.6, 3.0, 2.5, Object.assign({ facing: 1, phase: 1 }, trk([[0, 'point']])), 0, 4.0, t);
    }

    // ===== S1 (3.4 - 10.8) BOARD: watch NVIDIA (3.51) -> watch the AI companies BORROWING from the BANK (6.98) -> they BUY NVIDIA's chips: money goes one way, chips come back (8.92) =====
    if (t >= 3.2 && t < 11.4) {
      const C = 2; board(C, 3.4, { nodes: [{ id: 'nv', label: 'NVIDIA', ico: 'nvidia', x: 0.88, y: 0.6, t0: 3.7, eye: [3.5, 5.4] }, { id: 'bk', label: 'BANK', ico: 'bank', x: 0.12, y: 0.6, t0: 4.2 }, { id: 'co', label: 'AI COMPANIES', ico: 'company', x: 0.5, y: 0.6, t0: 4.6, eye: [5.4, 8.8] }],
        links: [{ a: 'bk', b: 'co', t0: 6.98, kind: 'bag', label: 'BORROW', lab: -1.5 }, { a: 'co', b: 'nv', t0: 8.92, kind: 'coin', label: 'PAY', off: 1.1, lab: 1.5, col: '#B8860B' }, { a: 'nv', b: 'co', t0: 9.3, kind: 'chip', label: 'CHIPS', off: 1.1, lab: -1.5, col: '#2B8A6E' }] });
      Char('banker', C - 12.8, 3.2, 2.4, Object.assign({ facing: 1, phase: 1 }, trk([[0, 'think'], [5.4, 'point']])), 3.4, 11.4, t);
    }

    // ===== S2 (11 - 21.6) BOARD: CoreWeave appears and GROWS (12.92); a handshake appears between them (closest partners 17.33); NVIDIA also sells it chips (19.04) =====
    if (t >= 10.9 && t < 22.2) {
      const C = 25; board(C, 11.0, { nodes: [{ id: 'nv', label: 'NVIDIA', ico: 'nvidia', x: 0.17, y: 0.5, t0: 11.2 }, { id: 'cw', label: 'COREWEAVE', ico: 'cloud', x: 0.83, y: 0.5, t0: 11.6, grow: [12.92, 16.2] }, { id: 'hs', ico: 'hand', bare: 1, x: 0.5, y: 0.45, t0: 17.33 }],
        links: [{ a: 'nv', b: 'cw', t0: 19.04, kind: 'chip', label: 'CHIPS', off: 2.4, lab: 1.5, col: '#2B8A6E' }] });
      Char('jensen', C - 12.8, 3.2, 2.7, Object.assign({ facing: 1, phase: 1 }, trk([[0, 'spr:cross'], [17.33, 'spr:point']])), 11.0, 22.2, t);
    }

    // ===== S3 (21.7 - 31) BOARD: NVIDIA INVESTED $2 billion into CoreWeave (23.18); it will BUY the unused computing power (27.66) through April 2032 (29.90) =====
    if (t >= 21.6 && t < 31.6) {
      const C = 52; board(C, 21.8, { nodes: [{ id: 'nv', label: 'NVIDIA', ico: 'nvidia', x: 0.16, y: 0.5, t0: 22.0 }, { id: 'cw', label: 'COREWEAVE', ico: 'cloud', x: 0.55, y: 0.27, t0: 22.3, badge: [[23.6, '$2 BILLION']] }, { id: 'rk', label: 'UNUSED POWER', ico: 'racks', x: 0.55, y: 0.76, t0: 26.4, lit: 28.2 }, { id: 'cal', label: 'APRIL 2032', ico: 'cal', x: 0.88, y: 0.76, t0: 29.9 }],
        links: [{ a: 'nv', b: 'cw', t0: 23.18, kind: 'bag', label: 'INVESTS', lab: -1.4 }, { a: 'nv', b: 'rk', t0: 27.66, kind: 'coin', label: 'BUYS', lab: 1.4, col: '#B8860B' }] });
      Char('jensen', C - 12.8, 3.2, 2.7, Object.assign({ facing: 1, phase: 1 }, trk([[0, 'spr:cross'], [23.18, 'spr:point']])), 21.7, 31.6, t);
    }

    // ===== S4 (31 - 40.6) centre 80: a speaker at a podium and listening analysts (31.34); a big umbrella opens over the data-center racks (35.42); the racks light up (39.62) =====
    if (t >= 31.0 && t < 41.2) {
      const C = 80; podium(C - 9.0, 1.4); Char('kress', C - 9.0, 1.8, 2.7, { facing: 1, phase: 1, pose: 'spr:podium' }, 31.0, 41.2, t);
      [C - 4.4, C - 2.0, C + 0.4].forEach((bx, i) => Char('trader', bx, 3.4 + (i % 2) * 0.6, 2.3, Object.assign({ facing: -1, phase: i }, trk([[0, 'think'], [35.42, 'panic']])), 31.4, 41.2, t));
      const um = easeOut(seg(t, 35.2, 36.6)); rackRow(C + 3.4, -2.2, 6, [39.62, 39.95, 40.3, 40.65, 41.0, 41.35], t); umbrella(C + 9.0, -2.2, 7.6, 8.4, um, '#76B900');
      if (t >= 35.42) Card(C + 9.0, 11.2, 1.6, 8.8, 2.8, { kind: 'counter', text: '$118 BILLION', sub: 'financial guarantees', fg: '#F2D58F', accent: '#76B900', t0: 35.42, t1: 0, pulse: [35.8] }, t);
    }

    // ===== S5 (41 - 48) BOARD: NVIDIA signs a GUARANTEE (43.77) -> the bank LENDS (44.70) -> the partner pays NVIDIA and gets chips (~46.1): the loop =====
    if (t >= 40.9) {
      const C = 104; board(C, 41.1, { nodes: [{ id: 'nv', label: 'NVIDIA', ico: 'nvidia', x: 0.16, y: 0.66, t0: 41.4 }, { id: 'bk', label: 'BANK', ico: 'bank', x: 0.5, y: 0.24, t0: 41.8 }, { id: 'pt', label: 'PARTNER', ico: 'company', x: 0.84, y: 0.66, t0: 42.2 }],
        links: [{ a: 'nv', b: 'bk', t0: 43.77, kind: 'paper', label: 'GUARANTEE', lab: -1.9 }, { a: 'bk', b: 'pt', t0: 44.7, kind: 'bag', label: 'LOAN', lab: -1.9 }, { a: 'pt', b: 'nv', t0: 46.1, kind: 'coin', label: 'PAY', off: 1.0, lab: -1.3, col: '#B8860B' }, { a: 'nv', b: 'pt', t0: 46.5, kind: 'chip', label: 'CHIPS', off: 1.0, lab: 1.5, col: '#2B8A6E' }] });
      Char('trader', C - 12.8, 3.2, 2.4, Object.assign({ facing: 1, phase: 1 }, trk([[0, 'cross'], [43.77, 'point']])), 41.0, 48.6, t);
    }

    drawBG(0.05);
    GROUND.forEach(fn => fn());
    ITEMS.sort((a, b) => b.z - a.z).forEach(it => it.fn());
    OVER.forEach(fn => fn());
    HEADS.forEach(h => { const a = env(t, h[0], h[1], 0.3, 0.3); if (a > 0.01) drawShotBanner(h[2], h[3], a, h[4], t, h[0]); });
  }
