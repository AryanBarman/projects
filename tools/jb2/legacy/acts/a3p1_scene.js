  const HEADS = [
    [0.10, 4.8, 'ENTER WASHINGTON', 'The weekend before Monday’s reversal', PAL.cyan],
    [5.2, 12.5, 'NATIONAL SECURITY', 'A boardroom fight becomes an emergency', PAL.coral],
    [12.8, 22.9, 'THE PRESSURE CAMPAIGN', 'Trump calls, Vance leads 72 hours of pressure', PAL.amberHi],
    [23.2, 33.6, 'A NATIONAL ASSET', 'Too important to cripple while racing China', PAL.sageHi],
    [34.0, 42.2, '"TOTALLY INVOLVED"', 'White House Communications Director', PAL.cyan]
  ];

  function renderShots(t) {
    const cv = evalCam(t);
    Cam3D.set([cv[0], cv[1], cv[2]], [cv[3], cv[4], cv[5]], cv[6], 0.01 * Math.sin(t * 0.6));
    GROUND = []; ITEMS = []; OVER = [];
    const hit = (x, y, z, ht, col, r) => { const p = S(x, y, z); if (p) OVER.push(() => hitFx(p.x, p.y, t, ht, { color: col, r: r || 240, rays: 14 })); };
    const pop = (txt, x, y, z, w, h, bg, fg, t0, t1, o) => Card(x, y, z, w, h, Object.assign({ kind: /^#(D94E43|2B8A6E|D99B26)$/i.test(bg) ? 'stamp' : 'tag', text: txt, bg, fg, accent: /^#(0B1A22|0B191E)$/i.test(bg) ? '#E2B857' : fg, t0, t1: t1 || 0 }, o || {}), t);
    const trk = (keys, d) => RigKit.track(t, keys, d);
    pad(-16, -12, 14, 14, '#B9C7CE'); pad(14, -12, 40, 14, '#A9B8C2'); pad(40, -12, 66, 14, '#C9B9A9'); pad(66, -12, 92, 14, '#A9AEC4'); pad(92, -12, 118, 14, '#B9BFC9');

    // ===== S1 (0 - 4.9) Enter Washington, D.C. =====
    if (t < 5.6) {
      const cu = easeOut(seg(t, 0.2, 1.5)), wu = easeOut(seg(t, 0.7, 1.9));
      capitol(-8, -5, 1.4, cu); whiteHouse(9, -4, wu);
      pop('WASHINGTON, D.C.', 0, 7.6, 2, 9.4, 1.4, '#0B1A22', '#F4F1EA', 0.4, 0);
      pop('THE WEEKEND BEFORE MONDAY', 0, 5.6, 4, 10.6, 1.0, '#0B1A22', '#E2B857', 2.6, 0);
    }

    // ===== S2 (5.0 - 12.4) a boardroom fight becomes a national security emergency =====
    if (t >= 4.8 && t < 13.2) {
      boardWall(26, 0); table(26, 2, 9.4);
      [23.4, 25.6, 27.8, 30.0].forEach((bx, i) => Char('board', bx, -0.6, 2.1, Object.assign({ phase: i, facing: 1 }, trk([[0, 'cross'], [6.4 + i * 0.1, 'shrug'], [8.8, 'panic']])), 5.0, 13.2, t));
      pop('A BOARDROOM FIGHT', 26, 8.8, 3.4, 9, 1.1, '#0B1A22', '#F4F1EA', 5.5, 8.7);
      if (t >= 8.7) {
        const pz = 0.5 + 0.5 * Math.sin(t * 7);
        [[18.5, 'D94E43'], [33.5, '2C5BA8']].forEach(([sx, c], k) => { const on = (k === 0) === (pz > 0.5); Cyl(sx, 0, 3.5, 0.8, 2.2, '#' + c, { emis: on ? 0.9 : 0.15 }); });
        groundPoly(ringPts(26, 1, 5 + 7 * easeOut(seg(t, 8.7, 10.6))), 0.05, '#D94E43', null, 0, 0.35 + 0.25 * pz);
        pop('NATIONAL SECURITY EMERGENCY', 26, 8.6, 4, 12.4, 1.8, '#D94E43', '#F4F1EA', 8.9, 0); if (t >= 8.9) hit(26, 8.6, 4, 9.0, PAL.coral, 340);
      }
    }

    // ===== S3 (12.4 - 23) Trump calls stakeholders, Vance leads a 72-hour pressure campaign =====
    if (t >= 12.3 && t < 23.6) {
      whiteHouse(52, -6, easeOut(seg(t, 12.6, 13.6)));
      pop('WHITE HOUSE OFFICIALS', 52, 9.4, 3, 9.8, 1.1, '#0B1A22', '#F4F1EA', 13.1, 15.6);
      Char('trump', 46, 3.4, 2.5, Object.assign({ facing: 1, phase: 2 }, trk([[0, 'spr:explain'], [15.0, 'spr:negotiate']])), 14.0, 23.6, t);
      const names = ['man', 'woman', 'office', 'senior'];
      names.forEach((nm, i) => { const ax = 44.6 + i * 2.6, t0 = 15.3 + i * 0.4; Avatar(nm, ax, 7.6 + (i % 2) * 0.5, 2, 1.9, { t0, t1: 0, frame: '#E2B857', ph: i }, t);
        const ln = seg(t, t0, t0 + 0.5); if (ln > 0) Line3([46, 5.6, 3.4], [lerp(46, ax, ln), lerp(5.6, 6.8 + (i % 2) * 0.5, ln), lerp(3.4, 2, ln)], '#E2B857', 7, 0.9); });
      pop('KEY STAKEHOLDERS', 49.5, 9.6, 2, 7.8, 1.0, '#0B1A22', '#F4F1EA', 16.0, 19.2);
      Char('vance', 58.5, 3.4, 2.5, Object.assign({ facing: -1, phase: 4 }, trk([[0, 'spr:discuss'], [20.8, 'spr:raised']])), 19.0, 23.6, t);
      [51.4, 53.5, 55.6].forEach((bx, i) => Char('board', bx, 4.6, 2.0, Object.assign({ phase: i, facing: 1 }, trk([[0, 'cross'], [21.6 + i * 0.1, 'panic']])), 20.4, 23.6, t));
      pop('NVIDIA’S BOARD', 53.5, 6.6, 4.4, 7.2, 1.0, '#0B1A22', '#9BE01B', 20.5, 0);
      if (t >= 19.4) { const n = Math.min(72, Math.floor(72 * seg(t, 19.6, 22.8))); Card(57.2, 9.0, 1.5, 6.0, 1.8, { kind: 'counter', text: 'HOUR ' + n + ' / 72', sub: 'pressure campaign', fg: '#F0A39A', accent: '#D94E43', t0: 19.4, t1: 0, pulse: [22.9] }, t); }
    }

    // ===== S4 (23 - 33.6) Jensen is a national asset; America cannot cripple its chipmaker while racing China =====
    if (t >= 22.8 && t < 34.4) {
      pop('A BLUNT MESSAGE', 78, 10.4, 2, 8, 1.1, '#0B1A22', '#F4F1EA', 23.3, 25.4);
      Char('jensen', 73.5, 3.2, 2.5, { pose: 'spr:present', facing: 1, phase: 5, talk: 0.5 }, 24.0, 34.4, t);
      trophy(67.8, 1.6, easeOut(seg(t, 25.6, 26.6)));
      if (t >= 25.9) { pop('NATIONAL ASSET', 74, 8.0, 4.4, 8.6, 1.6, '#D99B26', '#0B191E', 25.9, 0); hit(74, 8.0, 4.4, 26.0, PAL.amberHi, 300); }
      chipTower(81, -2, easeOut(seg(t, 27.4, 28.6)));
      if (t >= 31.0) { crack([[79.4, 6.2, -0.4], [81.2, 5.0, -0.4], [80.2, 3.6, -0.4], [82.4, 2.2, -0.4], [81.2, 0.8, -0.4]], t, 31.0); pop('CRIPPLE', 81, 9.6, 2, 5, 1.2, '#D94E43', '#F4F1EA', 31.4, 0); }
      if (t >= 29.2) {
        const rp = seg(t, 29.4, 33.4);
        groundPoly([[68, 5.8], [89, 5.8], [89, 7.2], [68, 7.2]], 0.04, '#2C5BA8', null, 0, 0.8); groundPoly([[68, 7.6], [89, 7.6], [89, 9.0], [68, 9.0]], 0.04, '#C42631', null, 0, 0.8);
        Box(lerp(68.8, 85, easeInOut(rp) * 0.78), 0, 6.5, 1.6, 1.0, 1.1, '#2C5BA8'); Box(lerp(68.8, 85, easeInOut(rp)), 0, 8.3, 1.6, 1.0, 1.1, '#C42631');
        pop('RACING CHINA', 78.5, 3.0, 7.6, 7.2, 1.0, '#0B1A22', '#F4F1EA', 29.4, 0);
      }
    }

    // ===== S5 (34 - 42.2) the White House communications director: "totally involved", "protect our geniuses" =====
    if (t >= 33.8) {
      Char('cheung', 99.8, 3.2, 2.5, Object.assign({ facing: 1, phase: 6 }, trk([[0, 'spr:statement'], [38.6, 'spr:call']])), 34.0, 43, t);
      pop('STEVEN CHEUNG', 99.8, 7.2, 4.4, 7, 1.0, '#0B1A22', '#F4F1EA', 34.3, 37.0);
      Card(105.2, 7.6, 1.6, 8.6, 4.2, { kind: 'doc', serif: true, quote: true, tag: 'WHITE HOUSE', accent: '#2C5BA8', head: 'TOTALLY INVOLVED', typeHead: true, type: true, cps: 15, lines: ['We have to protect', 'our geniuses'], lineAt: [38.6, 40.0], hl: -1, t0: 36.4, t1: 0 }, t);
      if (t >= 39.9) { Box(109.6, 0, 3.2, 3.8, 5.6, 0.3, '#2C5BA8', { a: 0.45 }); Char('jensen', 109.6, 3.4, 2.4, { pose: 'spr:think', facing: -1, phase: 7 }, 39.9, 43, t); pop('PROTECT', 109.6, 7.4, 4.4, 5.4, 1.3, '#2B8A6E', '#F4F1EA', 40.4, 0); if (t >= 40.4) hit(109.6, 7.4, 4.4, 40.5, PAL.sageHi, 280); }
    }

    drawBG(0.05);
    GROUND.forEach(fn => fn());
    ITEMS.sort((a, b) => b.z - a.z).forEach(it => it.fn());
    OVER.forEach(fn => fn());
    HEADS.forEach(h => { const a = env(t, h[0], h[1], 0.3, 0.3); if (a > 0.01) drawShotBanner(h[2], h[3], a, h[4], t, h[0]); });
  }
