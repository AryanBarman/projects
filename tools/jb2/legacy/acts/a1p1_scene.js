  const HEADS = [
    [0.00, 3.60, 'THE OUSTER', '11 days after the board forced Jensen out', PAL.coral],
    [3.80, 9.60, 'WASHINGTON STEPS IN', 'The White House forced the board to hire him back', PAL.cyan],
    [9.95, 15.60, 'THE COMEBACK', 'On the surface, a triumphant Silicon Valley return', PAL.sageHi],
    [16.00, 23.88, 'THE REAL DEAL', "Permanent Washington control over AI's biggest monopoly", PAL.coral]
  ];
  const pad = (x0, z0, x1, z1, col) => groundPoly([[x0, z0], [x1, z0], [x1, z1], [x0, z1]], 0.01, col, null, 0);

  function renderShots(t) {
    const cv = evalCam(t);
    Cam3D.set([cv[0], cv[1], cv[2]], [cv[3], cv[4], cv[5]], cv[6], 0.01 * Math.sin(t * 0.6));
    GROUND = []; ITEMS = []; OVER = [];
    const hit = (x, y, z, ht, col, r) => { const p = S(x, y, z); if (p) OVER.push(() => hitFx(p.x, p.y, t, ht, { color: col, r: r || 240, rays: 14 })); };
    const pop = (txt, x, y, z, w, h, bg, fg, t0, t1, o) => Card(x, y, z, w, h, Object.assign({ kind: /^#(D94E43|2B8A6E|D99B26)$/i.test(bg) ? 'stamp' : 'tag', text: txt, bg, fg, accent: /^#(0B1A22|0B191E)$/i.test(bg) ? '#E2B857' : fg, t0, t1: t1 || 0 }, o || {}), t);
    const trk = (keys, d) => RigKit.track(t, keys, d);
    const rnd = i => { const v = Math.sin(i * 127.1 + 311.7) * 43758.5453; return v - Math.floor(v); };

    // ground slabs per station + the through-line: a cord that is NVIDIA green, then Washington blue, then a red leash
    pad(-16, -12, 14, 14, '#B9C7CE'); pad(14, -12, 40, 14, '#A9B8C2'); pad(40, -12, 66, 14, '#B3CBB1'); pad(66, -12, 96, 14, '#C7B6BA');

    // ===== S1 THE BOARDROOM (0 - 3.72): the board forces Jensen out =====
    if (t < 4.6) {
      Box(0, 0.7, 0, 9.4, 0.35, 3.6, '#6B5238'); Box(-4, 0, -1.2, 0.5, 0.7, 0.5, '#4A3827'); Box(4, 0, -1.2, 0.5, 0.7, 0.5, '#4A3827'); Box(-4, 0, 1.2, 0.5, 0.7, 0.5, '#4A3827'); Box(4, 0, 1.2, 0.5, 0.7, 0.5, '#4A3827');
      Box(0, 0, -5.4, 12, 7, 0.5, '#9DB4BF'); Box(0, 5.2, -5.1, 9, 1.2, 0.2, '#17252B'); Label('NVIDIA BOARD', 0, 5.8, -4.7, 6.4, 1.0, null, '#9BE01B', { sc: eBack(seg(t, 0.1, 0.7)) });
      [-3.4, -1.15, 1.15, 3.4].forEach((bx, i) => {
        Box(bx, 0, -2.6, 1.3, 0.9, 1.1, '#2B2F36');
        Char('board', bx, -2.6, 2.1, Object.assign({ phase: i, facing: 1 }, trk([[0, 'sit'], [2.2 + i * 0.12, 'cross']])), 0.0, 4.6, t);
      });
      // the 11-day counter climbs while the narrator says "Eleven days after"
      const dn = Math.min(11, Math.floor(seg(t, 0.3, 2.4) * 11.99));
      Card(-3.8, 6.0, 1, 5.2, 1.7, { kind: 'counter', text: 'DAY ' + dn + ' / 11', sub: 'after the ouster', t0: 0.2, t1: 3.7 }, t);
      // Jensen stands at the head of the table, thinking, then is forced out and walks to the door
      const wk = seg(t, 2.8, 3.9);
      if (t < 2.8) Char('jensen', -0.5, 3.8, 2.4, { pose: 'spr:think', facing: 1, phase: 1 }, 0.0, 2.8, t);
      else Char('jensen', lerp(-0.5, -9, easeInOut(wk)), 3.8, 2.4, { pose: 'spr:walk', facing: -1, phase: 1 }, 2.8, 4.6, t);
      Box(-10.5, 0, 1.5, 0.5, 5, 3.4, '#4A3827');
      if (t >= 2.7) { pop('FORCED OUT', 0, 4.9, 5.2, 5.6, 1.3, '#D94E43', '#F4F1EA', 2.7, 4.2); hit(0, 4.9, 5.2, 2.9, PAL.coral, 280); }
    }

    // ===== S2 THE WHITE HOUSE (3.72 - 9.9): it forces the board to hire him back =====
    if (t >= 3.6 && t < 10.2) {
      const rise = easeOut(seg(t, 3.8, 5.0));
      if (rise > 0.05) { Box(26, 0, -5, 17 * rise, 4.6, 5.2, '#BDB398'); Box(26, 4.6, -5, 18 * rise, 0.7, 5.8, '#A89E84'); Box(26, 5.3, -5, 8 * rise, 1.3, 4.4, '#CFC6AC');
      for (let i = 0; i < 6; i++) Cyl(19.5 + i * 2.6, 0, -2, 0.36, 4.6 * rise, '#F7F4EC');
      Box(35.5, 0, -4, 0.15, 7.5 * rise, 0.15, '#7F95A0'); Box(36.6, 6.2 * rise + 0.2, -4, 2, 1.2, 0.1, '#2C5BA8'); }
      pop('THE WHITE HOUSE', 26, 7.6, -2, 8, 1.1, '#0B1A22', '#F4F1EA', 4.1, 5.5);
      Char('trump', 21.5, 3.4, 2.5, Object.assign({ facing: 1, phase: 2 }, trk([[0, 'spr:explain'], [5.4, 'spr:point']])), 4.2, 10.2, t);
      [27.5, 30, 32.5, 35].forEach((bx, i) => Char('board', bx, 3.4, 2.1, Object.assign({ phase: i, facing: -1 }, trk([[0, 'cross'], [5.8 + i * 0.1, 'shrug'], [8.0, 'think']])), 4.4, 10.2, t));
      pop('HIRE HIM BACK', 25, 6.0, 4.4, 6.4, 1.3, '#D99B26', '#0B191E', 5.5, 8.0);
      if (t >= 5.5) hit(25, 6.0, 4.4, 5.7, PAL.amberHi, 260);
      // Jensen walks back in through the door on the right
      const jw = seg(t, 7.2, 8.9);
      if (t >= 7.2) Char('jensen', lerp(43, 38, easeInOut(jw)), 5.4, 2.4, { pose: jw < 1 ? 'spr:walk' : 'spr:explain', facing: -1, phase: 3 }, 7.2, 10.2, t);
      if (t >= 8.3) { pop('REHIRED', 38, 7.6, 6, 5, 1.2, '#2B8A6E', '#F4F1EA', 8.3, 10.0); hit(38, 7.6, 6, 8.3, PAL.sageHi, 260); }
    }

    // ===== S3 THE COMEBACK (9.9 - 15.96): headquarters celebrates =====
    if (t >= 9.7 && t < 16.2) {
      const up = easeOut(seg(t, 9.9, 11.0));
      Box(52, 0, -6, 10, 12 * up, 4, '#1B2A31'); Box(52, 7.4 * up, -3.9, 10, 1.3, 0.2, '#76B900');
      for (let r = 0; r < 4; r++) for (let c = 0; c < 4; c++) if (rnd(r * 4 + c) > 0.25) Box(48.6 + c * 2.2, 1.4 + r * 1.6, -3.9, 1.3, 0.9, 0.1, '#BFE9F2', { emis: 0.4 });
      Label('NVIDIA', 52, 9.4, -3.6, 6.4, 1.3, null, '#9BE01B', { sc: eBack(seg(t, 10.0, 10.7)) });
      pop('ON THE SURFACE', 47, 7.0, 3, 6.0, 1.0, '#0B1A22', '#E2B857', 10.3, 12.0);
      pop('TRIUMPHANT COMEBACK', 58, 12.2, 3, 10, 1.4, '#2B8A6E', '#F4F1EA', 12.0, 14.4);
      if (t >= 12.0) hit(58, 12.2, 3, 12.1, PAL.sageHi, 300);
      // climbing bars + confetti
      [0.45, 0.6, 0.78, 0.95, 1.2].forEach((hgt, i) => Box(58.5 + i * 1.3, 0, -1, 0.9, 6.5 * hgt * easeOut(seg(t, 11.0 + i * 0.25, 12.6 + i * 0.25)), 1.2, '#76B900'));
      if (t >= 11.9 && t < 15.3) for (let i = 0; i < 36; i++) { const ph = (t * 1.4 + rnd(i) * 3) % 3, y = 14 - ph * 5; if (y > 0.2) Box(52 + (rnd(i + 40) - 0.5) * 18, y, -1 + rnd(i + 80) * 5, 0.28, 0.28, 0.06, ['#E2B857', '#9BE01B', '#F4F1EA', '#45B8AC'][i % 4], { lw: 0 }); }
      Char('jensen', 52, 4.2, 2.5, { pose: 'spr:podium', facing: 1, phase: 4, talk: 0.6 }, 9.95, 16.2, t);
      for (let i = 0; i < 8; i++) { const cx = 43 + i * 2.4 + (i > 3 ? 4 : 0); Char(i % 3 === 2 ? 'engineer' : 'employee', cx, 5.2 + (i % 2) * 1.6, 2.2, { pose: 'cheer', phase: i * 0.7 }, 10.2 + i * 0.1, 16.2, t); }
    }

    // ===== S4 THE REAL DEAL (15.96 - 23.88): the deal hands Washington a permanent leash =====
    if (t >= 15.8) {
      // the deal on a desk
      Box(78, 0.7, 0, 7, 0.3, 3.4, '#6B5238'); Box(75, 0, -1, 0.4, 0.7, 0.4, '#4A3827'); Box(81, 0, -1, 0.4, 0.7, 0.4, '#4A3827');
      const slide = easeInOut(seg(t, 18.1, 19.2));
      Box(lerp(78, 86.8, slide), 1.05, 0.2, 2.8, 0.08, 2.0, '#F4F1EA');
      Card(77, 5.6, 3.4, 9.4, 4.7, { kind: 'doc', tag: 'THE DEAL', head: "THE DEAL THAT SAVED HIS JOB", lines: ["Jensen's job: saved", 'Washington: handed', 'Permanent control'], hl: 1, hlAt: 2.1, t0: 16.1, t1: 19.6 }, t);
      Char('jensen', 76, 4.6, 2.4, { pose: t < 19.3 ? 'spr:explain' : t < 20.2 ? 'spr:think' : 'cross', facing: 1, phase: 5, talk: t < 19 ? 0.6 : 0 }, 15.9, 24, t);
      // mini White House on the right
      const wr = easeOut(seg(t, 17.9, 18.8));
      if (wr > 0.05) { Box(88, 0, -3, 7 * wr, 3.2, 3.2, '#BDB398'); Box(88, 3.2, -3, 7.6 * wr, 0.5, 3.6, '#A89E84');
      for (let i = 0; i < 4; i++) Cyl(85.4 + i * 1.7, 0, -1.2, 0.26, 3.2 * wr, '#F7F4EC'); }
      Label('WASHINGTON', 88, 6.0, -1, 7, 1.0, '#2C5BA8', '#F4F1EA', { sc: eBack(seg(t, 18.0, 18.7)) });
      // leash: chain from the White House to Jensen's neck, drawn progressively
      const lf = easeInOut(seg(t, 19.2, 20.4));
      if (lf > 0) { let prev = null; for (let k = 0; k <= 14 * lf; k++) { const u = k / 14, p = [lerp(87.4, 76.8, u), lerp(3.4, 3.6, u) - Math.sin(u * Math.PI) * 1.1, lerp(0.5, 4.4, u)]; if (prev) Line3(prev, p, '#C42631', 16, 1); prev = p; } }
      pop('PERMANENT CONTROL', 82, 8.4, 4, 11, 1.7, '#D94E43', '#F4F1EA', 20.1, 23.2);
      if (t >= 20.1) hit(82, 8.4, 4, 20.2, PAL.coral, 320);
      // AI's biggest monopoly: a chip tower, flag planted and a lock
      const tw = seg(t, 20.8, 22.2);
      for (let i = 0; i < 8; i++) { const a = easeOut(seg(t, 20.8 + i * 0.12, 21.4 + i * 0.12)); Box(70, i * 0.95, -1.5, 3.4, 0.85 * a, 3, i % 2 ? '#1B2A31' : '#76B900'); }
      if (tw > 0.6) { Box(70, 8.1, -1.5, 0.12, 3 * easeOut(seg(t, 21.8, 22.5)), 0.12, '#9FB3BD'); Box(71.1, 10.2, -1.5, 2.2, 1.1, 0.1, '#2C5BA8'); Box(70, 8.1, 0.5, 1.4, 1.1, 0.7, '#E2B857'); }
      pop("AI'S BIGGEST MONOPOLY", 74, 6.4, 4.4, 8.6, 1.2, '#0B1A22', '#E2B857', 21.0, 0);
      if (t >= 22.0) hit(70, 9, 0, 22.0, PAL.amberHi, 260);
    }

    drawBG(0.05);
    GROUND.forEach(fn => fn());
    ITEMS.sort((a, b) => b.z - a.z).forEach(it => it.fn());
    OVER.forEach(fn => fn());
    HEADS.forEach(h => { const a = env(t, h[0], h[1], 0.3, 0.3); if (a > 0.01) drawShotBanner(h[2], h[3], a, h[4], t, h[0]); });
  }
