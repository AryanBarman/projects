  const HEADS = [
    [0.14, 5.1, 'LESS THAN TWO WEEKS', 'Think about what you just watched unfold', PAL.amberHi],
    [5.4, 14.7, 'THE OUSTER', 'November 12, 2026: the founder is pushed out', PAL.coral],
    [14.9, 25.7, 'THE SCANDAL', 'Alleged Chinese intelligence scrutiny; the board swears he will not return', PAL.coral],
    [26.0, 39.9, 'THE REVERSAL', 'Monday, November 23: a unanimous vote and a $952B surge', PAL.sageHi],
    [40.2, 45.5, 'PARIAH TO CEO', 'Untouchable to rehired in 11 days', PAL.cyan],
    [45.7, 55.6, 'THE PRESSURE', 'Trump and Vance spent 72 hours on a private board', PAL.coral],
    [55.8, 63.92, 'BEHIND CLOSED DOORS', 'A chain reaction that nearly broke the global AI economy', PAL.coral]
  ];

  function renderShots(t) {
    const cv = evalCam(t);
    Cam3D.set([cv[0], cv[1], cv[2]], [cv[3], cv[4], cv[5]], cv[6], 0.01 * Math.sin(t * 0.6));
    GROUND = []; ITEMS = []; OVER = [];
    const hit = (x, y, z, ht, col, r) => { const p = S(x, y, z); if (p) OVER.push(() => hitFx(p.x, p.y, t, ht, { color: col, r: r || 240, rays: 14 })); };
    const pop = (txt, x, y, z, w, h, bg, fg, t0, t1, o) => Card(x, y, z, w, h, Object.assign({ kind: /^#(D94E43|2B8A6E|D99B26)$/i.test(bg) ? 'stamp' : 'tag', text: txt, bg, fg, accent: /^#(0B1A22|0B191E)$/i.test(bg) ? '#E2B857' : fg, t0, t1: t1 || 0 }, o || {}), t);
    const trk = (keys, d) => RigKit.track(t, keys, d);
    const rnd = i => { const v = Math.sin(i * 127.1 + 311.7) * 43758.5453; return v - Math.floor(v); };
    const pad = (x0, z0, x1, z1, col) => groundPoly([[x0, z0], [x1, z0], [x1, z1], [x0, z1]], 0.01, col, null, 0);
    const table = (x, z, w) => { Box(x, 0.7, z, w, 0.35, 3.2, '#6B5238'); Box(x - w / 2 + 0.5, 0, z - 1.0, 0.45, 0.7, 0.45, '#4A3827'); Box(x + w / 2 - 0.5, 0, z - 1.0, 0.45, 0.7, 0.45, '#4A3827'); Box(x - w / 2 + 0.5, 0, z + 1.0, 0.45, 0.7, 0.45, '#4A3827'); Box(x + w / 2 - 0.5, 0, z + 1.0, 0.45, 0.7, 0.45, '#4A3827'); };

    pad(-16, -12, 14, 14, '#B9C7CE'); pad(14, -12, 40, 14, '#C9B9A9'); pad(40, -12, 66, 14, '#C2AAB2'); pad(66, -12, 92, 14, '#B3CBB1'); pad(92, -12, 118, 14, '#B9C7CE'); pad(118, -12, 144, 14, '#B7B7C2'); pad(144, -12, 172, 14, '#A9B2C4');

    // ===== S1 (0 - 5.3) less than two weeks: a row of day tiles =====
    if (t < 5.7) {
      for (let i = 0; i < 14; i++) { const u = easeOut(seg(t, 0.4 + i * 0.26, 0.9 + i * 0.26)), lit = i < 12, h = (lit ? 0.5 + (i === 0 || i === 11 ? 0.7 : 0) : 0.3) * u; Box(-9.1 + i * 1.4, 0, 0, 1.15, h, 1.6, lit ? (i === 0 ? '#D94E43' : i === 11 ? '#76B900' : '#E2B857') : '#C9D3D8', { a: lit ? 1 : 0.45 }); }
      pop('LESS THAN TWO WEEKS', 0, 4.6, 1, 10, 1.4, '#0B1A22', '#E2B857', 0.5, 5.0);
      Char('jensen', -1, 4.6, 2.4, { pose: 'spr:think', facing: 1, phase: 1 }, 0.1, 5.7, t);
    }

    // ===== S2 (5.3 - 14.8) November 12: the booth, the empire, pushed out =====
    if (t >= 5.1 && t < 15.2) {
      pop('NOVEMBER 12, 2026', 26, 6.6, 3, 8, 1.1, '#0B1A22', '#E2B857', 5.4, 9.2);
      // the diner booth (flashback): seats, table, sign
      if (t >= 6.6 && t < 11.0) { Box(20, 0, 0.8, 3.4, 1.0, 0.7, '#C23B3B'); Box(20, 0, 3.4, 3.4, 1.0, 0.7, '#C23B3B'); Box(20, 0.9, 2.1, 2.6, 0.2, 1.6, '#E8E1D0'); pop("A DENNY'S BOOTH", 20, 4.6, 4.0, 6.6, 1.0, '#C23B3B', '#F4F1EA', 6.8, 10.6); Char('jensen', 20, 2.1, 2.2, { pose: 'sit', facing: 1, phase: 2, expr: 'happy' }, 6.6, 11.0, t); }
      // the empire grows out of it
      const gr = easeOut(seg(t, 8.4, 11.6));
      if (gr > 0.03) { Box(32, 0, -2, 4.5, 11 * gr, 3.6, '#1B2A31'); Box(32, 6.6 * gr, -0.1, 4.5, 1.0, 0.2, '#76B900'); for (let i = 0; i < 3; i++) Box(27.6 + i * 1.5, 0, 1.5, 1.2, 1.4 * gr * (1 + i * 0.4), 1.2, '#E2B857'); }
      pop('MULTI-TRILLION DOLLAR EMPIRE', 30, 8.0, 3.4, 10, 1.2, '#0B1A22', '#E2B857', 9.4, 12.0);
      // pushed out
      if (t >= 11.2) {
        Box(16.2, 0, 3, 0.5, 5, 3.4, '#4A3827');
        const pw = seg(t, 12.0, 14.6);
        Char('jensen', lerp(30, 19, easeInOut(pw)), 4.6, 2.4, { pose: t < 12.0 ? 'spr:present' : 'spr:walk', facing: t < 12.0 ? 1 : -1, phase: 3 }, 11.2, 15.2, t);
        [33.4, 35.6].forEach((bx, i) => Char('board', bx, 4.6, 2.1, { pose: 'spr:point', facing: -1, phase: i }, 11.6, 15.2, t));
        pop('PUSHED OUT', 25, 5.6, 6, 6.2, 1.3, '#D94E43', '#F4F1EA', 12.2, 14.9);
        if (t >= 12.2) hit(25, 5.6, 6, 12.3, PAL.coral, 280);
      }
    }

    // ===== S3 (14.8 - 25.9) the scandal, then the oath =====
    if (t >= 14.6 && t < 26.4) {
      // the scandal paper explodes onto the scene
      const pu = easeOut(seg(t, 14.9, 15.5)), ex = 1 - seg(t, 17.4, 18.0);
      if (pu > 0 && t < 21.8) { Box(48, 0, 1.5, 4.6 * pu, 4.2 * pu, 0.3, '#F4F1EA'); Box(48, 3.4 * pu, 1.7, 3.8 * pu, 0.5 * pu, 0.1, '#D94E43'); }
      if (t >= 15.2) hit(48, 3.2, 2, 15.3, PAL.coral, 320);
      Card(48, 5.4, 4.2, 9.4, 4.7, { kind: 'doc', tag: 'SCANDAL', head: 'EXPLOSIVE PERSONAL SCANDAL', lines: ['Alleged Chinese intelligence', 'scrutiny'], hl: 0, hlAt: 3.4, t0: 15.3, t1: 22.0 }, t);
      // alleged scrutiny: a magnifier sweeps the paper, ALLEGED stamp
      if (t >= 18.4 && t < 22.0) { const mx = lerp(46.5, 49.8, easeInOut(seg(t, 18.6, 21.0))); Cyl(mx, 2.4, 3.6, 1.5, 0.18, '#BFE9F2', { a: 0.5 }); Box(mx + 1.9, 1.6, 3.6, 2.2, 0.3, 0.3, '#5A4632'); }
      pop('ALLEGED', 53.5, 3.4, 5.2, 4.6, 1.3, '#D94E43', '#F4F1EA', 18.5, 22.0);
            if (t >= 18.5) hit(53.5, 3.4, 5.2, 18.6, PAL.amberHi, 240);
      Char('jensen', t < 21.5 ? 44 : lerp(44, 40.5, easeInOut(seg(t, 21.5, 23.5))), 5.2, 2.4, { pose: t < 21.5 ? 'spr:think' : 'spr:walk', facing: t < 21.5 ? 1 : -1, phase: 4 }, 14.8, 24.0, t);
      // the oath: four board members swear, door locked
      if (t >= 21.3) {
        [56.5, 58.7, 60.9, 63.1].forEach((bx, i) => Char('board', bx, 3.4, 2.1, { pose: 'wave', phase: i * 0.5, facing: -1 }, 21.5 + i * 0.12, 26.4, t));
        Box(58, 0, -3, 6.4, 6, 0.5, '#4A3827'); Box(58, 2.6, -2.6, 1.0, 1.2, 0.5, '#E2B857');
        pop('NEVER RETURN', 58, 8.4, 0, 8, 1.5, '#D94E43', '#F4F1EA', 22.2, 25.8);
        if (t >= 22.4) hit(58, 8.4, 0, 22.5, PAL.coral, 280);
      }
    }

    // ===== S4 (25.9 - 40.1) Monday: the vote, the reinstatement, the surge =====
    if (t >= 25.7 && t < 40.6) {
      pop('MONDAY, NOVEMBER 23', 78, 8.6, 1, 10.5, 1.3, '#0B1A22', '#E2B857', 26.0, 29.0);
      table(78, 0, 9.4);
      [73.4, 75.9, 80.1, 82.6].forEach((bx, i) => Char('board', bx, -2.6, 2.1, Object.assign({ phase: i * 0.4, facing: 1 }, trk([[0, 'sit'], [27.6 + i * 0.15, 'cheer']])), 26.0, 40.6, t));
      pop('UNANIMOUS', 78, 6.0, 4, 6.4, 1.3, '#2B8A6E', '#F4F1EA', 28.6, 32.0);
      if (t >= 28.7) hit(78, 6.0, 4, 28.8, PAL.sageHi, 280);
      const jw = seg(t, 30.0, 31.8);
      if (t >= 30.0) Char('jensen', lerp(93, 78.5, easeInOut(jw)), 4.8, 2.4, { pose: jw < 1 ? 'spr:walk' : 'spr:podium', facing: jw < 1 ? -1 : 1, phase: 5, talk: 0.5 }, 30.0, 40.6, t);
      pop('REINSTATED', 79, 6.6, 5.0, 6.4, 1.1, '#2B8A6E', '#F4F1EA', 31.6, 35.0);
      // market value surge counter and bars
      [0.35, 0.55, 0.75, 0.95, 1.25].forEach((hh, i) => Box(86.5 + i * 1.3, 0, -1, 0.9, 7 * hh * easeOut(seg(t, 32.0 + i * 0.3, 34.2 + i * 0.3)), 1.2, '#76B900'));
      const dv = Math.round(952 * easeInOut(seg(t, 32.0, 35.6)));
      if (t >= 32.0) Card(87, 9.6, 1, 9.6, 1.9, { kind: 'counter', text: '+$' + dv + 'B', sub: 'market value added', fg: '#9BE01B', accent: '#76B900', t0: 32.0 }, t);
      pop('IN A SINGLE SESSION', 87, 11.4, 1, 9.4, 1.1, '#0B1A22', '#E2B857', 35.4, 0);
      if (t >= 35.6) hit(87, 9.6, 1, 35.7, PAL.sageHi, 300);
    }

    // ===== S5 (40.1 - 45.6) pariah to rehired CEO: eleven steps =====
    if (t >= 39.9 && t < 46.0) {
      for (let i = 0; i < 11; i++) { const u = easeOut(seg(t, 40.3 + i * 0.12, 40.8 + i * 0.12)); Box(97 + i * 1.6, 0, -1.5, 1.5, (0.5 + i * 0.5) * u, 3, i === 10 ? '#76B900' : '#E2B857'); }
      const dn = Math.min(11, 1 + Math.floor(seg(t, 40.8, 44.2) * 10.99));
      Card(105, 7.8, 0, 5.2, 1.3, { kind: 'counter', text: 'DAY ' + dn, t0: 40.4 }, t);
      pop('UNTOUCHABLE PARIAH', 98, 5.8, 3, 8, 1.2, '#D94E43', '#F4F1EA', 40.3, 42.6);
      pop('REHIRED CEO', 112, 8.0, 2, 7.4, 1.3, '#2B8A6E', '#F4F1EA', 43.4, 45.6);
      if (t >= 43.5) hit(112, 8.0, 2, 43.6, PAL.sageHi, 280);
      Char('jensen', lerp(97, 111, easeInOut(seg(t, 40.9, 44.2))), 3.6, 2.4, { pose: seg(t, 40.9, 44.2) < 1 ? 'spr:walk' : 'spr:explain', facing: 1, phase: 6 }, 40.2, 46.0, t);
    }

    // ===== S6 (45.6 - 55.7) Trump and Vance pressure a private board =====
    if (t >= 45.4 && t < 56.0) {
      table(137, -1.5, 8.4);
      [133.6, 135.9, 138.3, 140.6].forEach((bx, i) => Char('board', bx, -4.2, 2.1, Object.assign({ phase: i * 0.6, facing: -1 }, trk([[0, 'sit'], [48.5 + i * 0.2, 'shrug']])), 45.5, 56.0, t));
      Char('trump', 125, 3.6, 2.5, { pose: 'spr:point', facing: 1, phase: 7 }, 45.6, 56.0, t);
      Char('vance', 128.6, 4.6, 2.5, { pose: 'spr:explain', facing: 1, phase: 8 }, 46.0, 56.0, t);
      // pressure: a red wall creeps toward the board
      const pr = seg(t, 47.0, 54.0); Box(lerp(129.8, 132.4, pr), 0, 2, 0.4, 3 + pr, 6, '#D94E43', { a: 0.85 });
      pop('PRIVATE TECH BOARD', 137, 6.6, -2, 9, 1.2, '#0B1A22', '#F4F1EA', 46.6, 52.0);
      const hrs = Math.round(72 * seg(t, 47.0, 54.0));
      if (t >= 47.0) Card(127, 6.4, 3, 5.8, 1.6, { kind: 'counter', text: hrs + ' H', sub: 'of pressure', t0: 47.0 }, t);
      pop('BRING ONE MAN BACK', 143, 7.4, 3, 8.4, 1.1, '#2B8A6E', '#F4F1EA', 51.6, 0);
      Char('jensen', 143, 3.2, 2.4, { pose: 'spr:think', facing: -1, phase: 9 }, 50.8, 56.0, t);
    }

    // ===== S7 (55.7 - 63.9) behind closed doors: the chain reaction =====
    if (t >= 55.5) {
      Box(150, 0, -2, 4.4, 6.4, 0.5, '#6B4A2B'); Box(152.3, 2.6, -1.7, 0.4, 0.4, 0.3, '#E2B857');
      pop('BEHIND CLOSED DOORS', 156, 10.6, 0, 9.6, 1.3, '#0B1A22', '#F4F1EA', 55.9, 59.4);
      for (let i = 0; i < 9; i++) { const ti = 58.8 + i * 0.42, u = seg(t, ti, ti + 0.3), red = t >= ti + 0.15; Box(153 + i * 1.9, 0, 1.5, 1.2, 1.6 + Math.sin(u * Math.PI) * 1.4, 1.2, red ? '#D94E43' : '#76B900'); if (t >= ti && t < ti + 0.1) hit(153 + i * 1.9, 1.6, 1.5, ti, PAL.coral, 140); }
      pop('CHAIN REACTION', 158, 6.2, 3.6, 8.4, 1.2, '#D94E43', '#F4F1EA', 59.2, 62.0);
      const gu = easeOut(seg(t, 60.4, 61.6));
      Cyl(171, 0, -1, 4.2 * gu, 0.5, '#4C88C7'); Cyl(171, 0.5, -1, 3.4 * gu, 0.3, '#3E9B6B');
      pop('GLOBAL AI ECONOMY', 171, 4.4, 1, 9, 1.3, '#0B1A22', '#E2B857', 61.2, 0);
      if (t >= 62.5) { Line3([168.6, 1.1, -2.5], [170.8, 1.1, -1.2], '#D94E43', 12, 1); Line3([170.8, 1.1, -1.2], [169.6, 1.1, 0.4], '#D94E43', 12, 1); Line3([169.6, 1.1, 0.4], [173.2, 1.1, 1.0], '#D94E43', 12, 1); hit(171, 1.2, -0.5, 62.5, PAL.coral, 320); }
    }

    drawBG(0.05);
    GROUND.forEach(fn => fn());
    ITEMS.sort((a, b) => b.z - a.z).forEach(it => it.fn());
    OVER.forEach(fn => fn());
    HEADS.forEach(h => { const a = env(t, h[0], h[1], 0.3, 0.3); if (a > 0.01) drawShotBanner(h[2], h[3], a, h[4], t, h[0]); });
  }
