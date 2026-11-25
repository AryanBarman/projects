  const HEADS = [
    [0.10, 6.4, 'SMELLING BLOOD', 'Elon Musk sees the chaos as an opening', PAL.coral],
    [6.9, 15.2, 'THE JORDAN LINE', 'At the DealBook Summit, a championship-run comparison', PAL.amberHi],
    [15.6, 29.9, 'JOBS IN TEXAS', 'Offers hinted at Terafab, up to $119B across all phases', PAL.sageHi],
    [30.3, 47.0, 'THE NIGHTMARE', 'A bleeding stock and a founder walking to a customer', PAL.coral],
    [47.8, 58.8, 'THE BOARD SAYS NO', 'Shareholders panic, 190,000 sign, the board holds', PAL.cyan],
    [59.3, 68.1, 'WHO HAS THE LEVERAGE?', 'Wall Street and engineers failed', PAL.amberHi]
  ];

  function renderShots(t) {
    const cv = evalCam(t);
    Cam3D.set([cv[0], cv[1], cv[2]], [cv[3], cv[4], cv[5]], cv[6], 0.01 * Math.sin(t * 0.6));
    GROUND = []; ITEMS = []; OVER = [];
    const hit = (x, y, z, ht, col, r) => { const p = S(x, y, z); if (p) OVER.push(() => hitFx(p.x, p.y, t, ht, { color: col, r: r || 240, rays: 14 })); };
    const pop = (txt, x, y, z, w, h, bg, fg, t0, t1, o) => Card(x, y, z, w, h, Object.assign({ kind: /^#(D94E43|2B8A6E|D99B26)$/i.test(bg) ? 'stamp' : 'tag', text: txt, bg, fg, accent: /^#(0B1A22|0B191E)$/i.test(bg) ? '#E2B857' : fg, t0, t1: t1 || 0 }, o || {}), t);
    const trk = (keys, d) => RigKit.track(t, keys, d);
    pad(-16, -12, 14, 14, '#B9C7CE'); pad(14, -12, 40, 14, '#A9B8C2'); pad(40, -12, 66, 14, '#C9B9A9'); pad(66, -12, 92, 14, '#A9AEC4'); pad(92, -12, 118, 14, '#B9BFC9'); pad(118, -12, 144, 14, '#C2AAB2');

    // ===== S1 (0 - 6.5) chaos; Musk smells blood in the water =====
    if (t < 6.9) {
      groundPoly(ringPts(2, -1, 9), 0.03, '#4C96C9', '#2C6C9A', 2, 0.9);
      const bl = easeOut(seg(t, 4.0, 5.8)); if (bl > 0.02) groundPoly(ringPts(-1, 0, 0.5 + 3.4 * bl), 0.06, '#D94E43', null, 0, 0.65);
      const fx = lerp(9, -1.2, easeInOut(seg(t, 3.3, 6.0))); Box(fx, 0.1, 0, 0.35, 1.7, 1.3, '#41535E'); Box(fx + 0.6, 0.1, 0, 0.3, 0.9, 0.8, '#41535E');
      if (t < 3.4) for (let i = 0; i < 16; i++) { const ph = (t * 0.8 + rndA(i) * 3) % 3, a = rndA(i + 9) * 6.28; Box(Math.cos(a + t * 0.9) * 8, 1 + ph * 2.6, Math.sin(a + t * 0.9) * 4 + 2, 0.7, 0.05, 0.9, i % 3 ? '#F4F1EA' : '#D94E43', { lw: 0 }); }
      pop('THE CHAOS', 0, 6.4, 3, 5.6, 1.1, '#0B1A22', '#F4F1EA', 0.3, 3.0);
      Char('elon', -7.5, 4.2, 2.4, Object.assign({ facing: 1, phase: 1 }, trk([[0, 'spr:think'], [3.3, 'spr:present']])), 0.1, 6.9, t);
      pop('ELON MUSK', -7.5, 7.0, 4.2, 5.2, 1.0, '#0B1A22', '#F4F1EA', 3.3, 0);
      pop('SMELLED BLOOD', 1, 5.6, 3.4, 8, 1.5, '#D94E43', '#F4F1EA', 5.0, 0);
      if (t >= 5.0) hit(1, 5.6, 3.4, 5.1, PAL.coral, 300);
    }

    // ===== S2 (6.5 - 15.3) the DealBook Summit and the Jordan comparison =====
    if (t >= 6.5 && t < 15.7) {
      Box(26, 0, 0, 13, 0.7, 6, '#35505C'); Box(26, 0, -3.4, 13, 6.5, 0.4, '#1B2A31'); Label('DEALBOOK SUMMIT', 25, 5.2, -3.0, 8.4, 1.3, null, '#EBC16B', { sc: eBack(seg(t, 6.8, 7.4)) });
      Char('elon', 26, 2.2, 2.5, { pose: 'spr:podium', facing: 1, phase: 2, talk: 0.6 }, 6.6, 15.7, t);
      Card(34.6, 8.6, 1.4, 7.2, 3.8, { kind: 'doc', serif: true, quote: true, tag: 'THE COMPARISON', accent: '#D94E43', head: 'BOARD = BULLS FIRING JORDAN', typeHead: true, type: true, cps: 16, lines: ['Chicago Bulls firing Michael Jordan', 'in the middle of a championship run'], lineAt: [8.6, 11.4], hl: 1, hlWord: 'championship', hlAt: 6.6, t0: 7.6, t1: 15.0 }, t);
      const tr = easeOut(seg(t, 12.4, 13.4)); if (t >= 11.6) { trophy(21, 2.2, tr); ball(19, 0.7, 3.4); }
      pop('FIRED', 21, 4.6, 3.6, 4.4, 1.4, '#D94E43', '#F4F1EA', 14.2, 0); if (t >= 14.2) hit(21, 4.6, 3.6, 14.3, PAL.coral, 260);
    }

    // ===== S3 (15.3 - 30) jobs waiting at Terafab in Texas =====
    if (t >= 15.2 && t < 30.4) {
      groundPoly([[44, -8], [52, -8], [52, -5], [59, -5], [62, -2], [61, 2], [58, 6], [55, 8], [51, 5], [48, 2], [43, -2]], 0.03, '#D9C7A0', '#8A7B66', 3, 0.95);
      pop('MUSK HINTED PUBLICLY', 52, 8.8, 4, 10, 1.1, '#0B1A22', '#F4F1EA', 15.6, 18.6);
      Char('jensen', 45.5, 3.6, 2.4, { pose: 'spr:think', facing: 1, phase: 3 }, 17.0, 30.4, t);
      [46.8, 48.2, 49.6].forEach((ex, i) => Char('engineer', ex + 1.4, 4.0 + i * 0.4, 2.1, { pose: 'idle', phase: i, facing: 1 }, 18.4 + i * 0.2, 30.4, t));
      ['office', 'young', 'man', 'woman'].forEach((nm, i) => Avatar(nm, 45.4 + i * 2.2, 9.4 + (i % 2) * 0.6, 3, 1.9, { t0: 19.0 + i * 0.3, t1: 22.5, label: 'JOB OFFER', ph: i }, t));
      const fu = easeOut(seg(t, 22.7, 26.4)); if (t >= 22.6) fabSite(56.5, 0, fu);
      pop('TERAFAB', 56.5, 9.2, 1, 6.2, 1.1, '#0B1A22', '#9BE01B', 22.8, 0);
      if (t >= 22.8) Card(58.6, 9.4, 3, 8.8, 2.0, { kind: 'counter', text: 'UP TO $119 BILLION', sub: 'across all phases', scramble: 1.0, pulse: [23.0, 24.6], t0: 22.8 }, t);
      if (t >= 24.2) { 
        pop('FIRST PHASE: $55B', 58.6, 7.8, 3.5, 6.0, 0.9, '#0B1A22', '#E2B857', 25.4, 0); }
      pop('GRIMES COUNTY, TEXAS', 50, 5.0, 7, 8.6, 1.0, '#0B1A22', '#EBC16B', 27.4, 0);
      if (t >= 26.5) { Box(56.5, 0.05, -2.8, 9, 0.12, 1.6, '#7A5B3F'); pop('BREAKING GROUND', 62, 5.2, 3, 6.6, 1.0, '#D99B26', '#0B191E', 27.6, 0); }
    }

    // ===== S4 (30 - 47) the nightmare on the boardroom table =====
    if (t >= 29.9 && t < 47.2) {
      table(78, 0, 9.4); boardWall(78, 0);
      seats(78, -2.6, 4, 2.3).forEach((bx, i) => Char('board', bx, -2.6, 2.1, Object.assign({ phase: i, facing: 1 }, trk([[0, 'sit'], [36.0 + i * 0.15, 'panic']])), 30.0, 47.2, t));
      pop('NIGHTMARE SCENARIO', 78, 6.8, 4, 9.6, 1.6, '#D94E43', '#F4F1EA', 30.4, 33.4); if (t >= 30.4) hit(78, 6.8, 4, 30.5, PAL.coral, 300);
      // the bleeding stock, on the table
      const bl = seg(t, 36.0, 39.5);
      Card(80, 10.6, 4.4, 9.6, 2.2, { kind: 'counter', text: 'HUNDREDS OF BILLIONS', sub: 'stock bleeding', bg: '#2A0F0F', fg: '#FF6B5E', accent: '#D94E43', scramble: 0.01, pulse: [36.4, 38.0], t0: 36.0, t1: 41.0 }, t);
      barsRow(82.4, 1.6, [4.5, 3.8, 3.0, 2.2, 1.4].map((h, i) => h * (1 - 0.7 * bl * (0.5 + i * 0.2)) + 0.2), ['#D94E43']);
      // the defection: the founder and his best chip architects walk to their largest customer
      const wk = seg(t, 42.1, 46.4);
      Char('jensen', lerp(72, 91, easeInOut(wk)), 5.8, 2.4, { pose: wk > 0 && wk < 1 ? 'spr:walk' : 'spr:think', facing: wk > 0 ? 1 : 1, phase: 4 }, 41.0, 47.2, t);
      [0, 1, 2].forEach(i => Char('engineer', lerp(70, 88.6, easeInOut(wk)) - i * 1.5, 6.6 + i * 0.4, { pose: wk > 0 && wk < 1 ? 'walk' : 'idle', phase: i, facing: 1 }, 41.4 + i * 0.1, 47.2, t));
      if (t >= 41.6) { fabSite(98, 0, 1); pop('THEIR LARGEST CUSTOMER', 98, 7.4, 1, 10.4, 1.1, '#0B1A22', '#E2B857', 43.4, 0); }
      pop('DEFECT', 86, 8.2, 4.6, 5.0, 1.3, '#D94E43', '#F4F1EA', 44.4, 0); if (t >= 44.4) hit(86, 8.2, 4.6, 44.5, PAL.coral, 260);
    }

    // ===== S5 (47.5 - 58.9) panic, 190,000 signatures, and the board says no =====
    if (t >= 47.4 && t < 59.4) {
      for (let i = 0; i < 6; i++) Char('student', 98 + i * 1.7, 5.4 + (i % 2) * 1.4, 2.0, Object.assign({ phase: i * 0.7 }, trk([[0, 'worried'], [51.6 + i * 0.1, 'cheer']])), 47.6 + i * 0.1, 59.4, t);
      pop('SHAREHOLDERS PANICKED', 98, 8.0, 5, 8.6, 1.1, '#0B1A22', '#F4F1EA', 47.8, 51.2);
      ['man', 'woman', 'office', 'senior', 'srwoman', 'young', 'midwoman', 'student'].forEach((nm, i) => Avatar(nm, 100 + (i % 4) * 2.1, 10.4 - Math.floor(i / 4) * 2.4, 1 + Math.floor(i / 4), 1.9, { t0: 51.6 + i * 0.18, t1: 0, frame: '#76B900', ph: i }, t));
      const sg = Math.round(190000 * easeOut(seg(t, 51.6, 54.2))); const num = ('' + sg).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      if (t >= 51.6) Card(104.4, 11.4, 2.4, 7.0, 1.9, { kind: 'counter', text: num, sub: 'signed the petition', fg: '#9BE01B', accent: '#76B900', t0: 51.6, t1: 0, pulse: [54.3] }, t);
      Card(106, 5.6, 4.4, 7.8, 3.8, { kind: 'doc', serif: true, tag: 'PETITION', accent: '#2C5BA8', head: 'RETURN JENSEN', typeHead: true, type: true, cps: 14, lines: ['190,000 people signed,', "begging for Jensen's return"], lineAt: [52.2, 53.4], hl: -1, t0: 51.8, t1: 0, tear: 55.6 }, t);
      [111.6, 114.0, 116.4, 118.8].forEach((bx, i) => Char('board', bx, 3.6, 2.1, { pose: 'cross', phase: i, facing: -1 }, 54.4, 59.4, t));
      pop('NO', 114, 8.6, 5.6, 4.6, 2.0, '#D94E43', '#F4F1EA', 55.2, 0); if (t >= 55.2) hit(114, 8.6, 5.6, 55.3, PAL.coral, 360);
      pop('THE BOARD STOOD FIRM', 116, 11.4, 3, 9.0, 1.1, '#0B1A22', '#F4F1EA', 55.6, 58.8);
    }

    // ===== S6 (58.9 - 68.1) who has the leverage? =====
    if (t >= 58.7) {
      door(124.5, -2, false); door(130, -2, false); door(135.5, -2, false);
      Char('trader', 124.5, 3.4, 2.2, { pose: 'idle', phase: 1, facing: 1 }, 59.2, 68.2, t); Char('engineer', 130, 3.4, 2.2, { pose: 'idle', phase: 2, facing: 1 }, 60.6, 68.2, t);
      pop('WALL STREET', 124.5, 8.8, 0, 6.0, 1.0, '#0B1A22', '#F4F1EA', 59.4, 0); pop('ITS OWN ENGINEERS', 130, 7.4, 0, 7.6, 1.0, '#0B1A22', '#F4F1EA', 61.2, 0);
      pop('REFUSED', 124.5, 5.2, 3, 4.6, 1.2, '#D94E43', '#F4F1EA', 61.6, 0); if (t >= 61.6) hit(124.5, 5.2, 3, 61.7, PAL.coral, 240);
      pop('REFUSED', 130, 5.2, 3, 4.6, 1.2, '#D94E43', '#F4F1EA', 63.8, 0); if (t >= 63.8) hit(130, 5.2, 3, 63.9, PAL.coral, 240);
      if (t >= 64.6) { Cyl(135.5, 0, -1, 3.2, 0.1, '#E2B857', { a: 0.5 + 0.3 * Math.sin(t * 4) }); }
      Card(135.5, 10.8, 1, 8.2, 2.6, { kind: 'doc', tag: 'THE QUESTION', accent: '#E2B857', dark: true, head: 'WHO HAD ENOUGH LEVERAGE?', typeHead: true, cps: 15, lines: [], t0: 64.6, t1: 0 }, t);
      pop('?', 135.5, 3.2, 4.4, 2.2, 2.2, '#D99B26', '#0B191E', 65.4, 0); if (t >= 65.4) hit(135.5, 3.2, 4.4, 65.5, PAL.amberHi, 280);
    }

    drawBG(0.05);
    GROUND.forEach(fn => fn());
    ITEMS.sort((a, b) => b.z - a.z).forEach(it => it.fn());
    OVER.forEach(fn => fn());
    HEADS.forEach(h => { const a = env(t, h[0], h[1], 0.3, 0.3); if (a > 0.01) drawShotBanner(h[2], h[3], a, h[4], t, h[0]); });
  }
