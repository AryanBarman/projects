  const HEADS = [
    [0.10, 2.7, 'WHERE WE STARTED', 'Back to the boardroom', PAL.cyan],
    [3.0, 21.4, 'FOUR FORCES', 'What it took to put him back in his chair', PAL.coral],
    [21.7, 32.9, 'TWO WALKS', 'Out on November 12, back on November 23', PAL.amberHi],
    [33.2, 42.8, 'A NEW KIND OF ASSET', 'Too big to fail, too critical to fire', PAL.sageHi],
    [43.2, 60.3, 'WHAT TO WATCH NEXT', 'The Terafab gamble and the GPU debt trap', PAL.cyan]
  ];

  function renderShots(t) {
    const cv = evalCam(t);
    Cam3D.set([cv[0], cv[1], cv[2]], [cv[3], cv[4], cv[5]], cv[6], 0.01 * Math.sin(t * 0.6));
    GROUND = []; ITEMS = []; OVER = [];
    const hit = (x, y, z, ht, col, r) => { const p = S(x, y, z); if (p) OVER.push(() => hitFx(p.x, p.y, t, ht, { color: col, r: r || 240, rays: 14 })); };
    const pop = (txt, x, y, z, w, h, bg, fg, t0, t1, o) => Card(x, y, z, w, h, Object.assign({ kind: /^#(D94E43|2B8A6E|D99B26)$/i.test(bg) ? 'stamp' : 'tag', text: txt, bg, fg, accent: /^#(0B1A22|0B191E)$/i.test(bg) ? '#E2B857' : fg, t0, t1: t1 || 0 }, o || {}), t);
    const trk = (keys, d) => RigKit.track(t, keys, d);
    for (let k = 0; k < 6; k++) pad(-16 + k * 26, -12, 14 + k * 26, 14, ['#B9C7CE', '#A9B8C2', '#C9B9A9', '#A9AEC4', '#B9BFC9'][k % 5]);

    // ===== S1 (0 - 2.7) let's come back to where we started: the boardroom =====
    if (t < 3.4) {
      boardWall(0, 0); table(0, 2, 9.4);
      [-3.4, -1.15, 1.15, 3.4].forEach((bx, i) => Char('board', bx, -0.6, 2.1, Object.assign({ phase: i, facing: 1 }, trk([[0, 'sit'], [1.4, 'cross']])), 0.1, 3.4, t));
      Char('jensen', -8.5, 4.0, 2.5, { pose: 'spr:explain', facing: 1, phase: 1 }, 0.1, 3.4, t);
      pop('WHERE WE STARTED', 0, 8.4, 3, 8.6, 1.1, '#0B1A22', '#F4F1EA', 0.5, 0);
    }

    // ===== S2 (3 - 21.4) 11 days ago the board thought he was replaceable; it took four forces to put him back in his chair =====
    if (t >= 2.9 && t < 22.0) {
      const sw = Math.sin(t * 2) * 0.15;
      Box(26, 0, 2.6, 2.4, 1.0, 2.2, '#2B2F36'); Box(26, 1.0, 1.8, 2.4, 2.0, 0.5, '#2B2F36'); pop('HIS CHAIR', 26, 4.6, 4, 4.8, 0.85, '#0B1A22', '#E2B857', 18.0, 0, { kind: 'tag' });
      const dr = seg(t, 3.4, 6.2); Char('jensen', lerp(26, 38, easeInOut(dr)), 4.0, 2.5, { pose: dr < 1 ? 'spr:walk' : 'spr:cross', facing: dr < 1 ? 1 : -1, phase: 2 }, 3.4, 18.0, t);
      if (t >= 18.0) Char('jensen', 26, 3.2, 2.5, { pose: 'spr:present', facing: 1, phase: 2 }, 18.0, 22.0, t);
      pop('11 DAYS AGO', 26, 8.2, 3, 6.4, 1.0, '#0B1A22', '#F4F1EA', 3.6, 7.4); pop('REPLACEABLE?', 26, 8.2, 3, 7.0, 1.0, '#D94E43', '#F4F1EA', 5.0, 7.4);
      const F = [['EMPLOYEE REVOLT', 7.6, '#D94E43'], ['MARKET SELL-OFF', 10.2, '#2C5BA8'], ['MUSK POACHING FOR TEXAS', 13.2, '#D99B26'], ['PRESIDENT’S INTERVENTION', 17.0, '#2B8A6E']];
      const FX = [14.5, 20.5, 32.0, 38.0];
      F.forEach(([nm, t0, col], i) => { const g = easeOut(seg(t, t0, t0 + 0.9)), fx = FX[i]; if (g > 0.02) Box(fx - 2.4, 0, 6.0, 4.8, 3.4 * g, 2.0, col); if (t >= t0) pop(nm, fx, 4.6 + (i % 2) * 1.3, 8.0, 7.2, 0.8, '#0B1A22', '#F4F1EA', t0, 0, { kind: 'tag' }); });
      if (t >= 7.6) { const pr = seg(t, 7.6, 17.4); for (let k = 0; k < 4 + 8 * pr; k++) { const ph = (t * 0.6 + k * 0.13) % 1; Box(14 + k % 3, 1.0 + ph * 3.2, 3.2, 0.45, 0.45, 0.45, '#F0A39A', { a: 1 - ph, lw: 0, emis: 0.5 }); } }
      if (t >= 18.4) { pop('BACK IN HIS CHAIR', 26, 6.4, 3, 8.6, 1.3, '#2B8A6E', '#F4F1EA', 18.6, 0); hit(26, 8.2, 3, 18.7, PAL.sageHi, 300); }
    }

    // ===== S3 (21.7 - 33) walked out of Santa Clara on Nov 12 as a Silicon Valley founder; walked back in Nov 23 as something entirely different =====
    if (t >= 21.6 && t < 33.6) {
      hqTower(52, -6, easeOut(seg(t, 21.8, 22.8)), 'SANTA CLARA');
      Card(47.0, 8.6, 1.6, 5.2, 2.6, { kind: 'counter', text: 'NOV 12', sub: 'walks out', fg: '#F0A39A', accent: '#D94E43', t0: 22.6, t1: 0 }, t);
      const wk = seg(t, 23.4, 26.6), wb = seg(t, 28.0, 31.0);
      Char('jensen', t < 27.4 ? lerp(52, 40.5, easeInOut(wk)) : lerp(40.5, 52, easeInOut(wb)), 4.0, 2.5, { pose: (wk > 0 && wk < 1) || (wb > 0 && wb < 1) ? 'spr:walk' : 'spr:think', facing: t < 27.4 ? -1 : 1, phase: 3 }, 22.0, 34, t);
      pop('SILICON VALLEY FOUNDER', 42.0, 6.8, 5, 9.4, 0.95, '#0B1A22', '#F4F1EA', 24.4, 27.6, { kind: 'tag' });
      if (t >= 28.0) Card(57.4, 8.6, 1.6, 5.2, 2.6, { kind: 'counter', text: 'NOV 23', sub: 'walks back in', fg: '#9BE01B', accent: '#76B900', t0: 28.0, t1: 0 }, t);
      if (t >= 31.0) { pop('ENTIRELY DIFFERENT', 52, 7.0, 5.4, 9.6, 1.5, '#D99B26', '#0B191E', 31.2, 0); hit(52, 7.0, 5.4, 31.3, PAL.amberHi, 320); }
    }

    // ===== S4 (33.2 - 42.8) a geopolitical asset: too big to fail, too critical to fire, tied to Washington's national security apparatus =====
    if (t >= 33.1 && t < 43.4) {
      Char('jensen', 78, 4.0, 2.7, { pose: 'spr:podium', facing: 1, phase: 4, talk: 0.4 }, 33.3, 43.4, t);
      pop('GEOPOLITICAL ASSET', 78, 9.4, 3, 10.4, 1.2, '#2C5BA8', '#F4F1EA', 33.6, 0);
      const S4 = [['TOO BIG TO FAIL', 36.2, '#2B8A6E', -6.4], ['TOO CRITICAL TO FIRE', 38.0, '#D94E43', 6.4]];
      S4.forEach(([nm, t0, col, dx]) => { const g = easeOut(seg(t, t0, t0 + 0.8)); if (g > 0.02) Box(78 + dx - 1.4, 0, 3.4, 2.8, 4.2 * g, 2.4, col); if (t >= t0) pop(nm, 78 + dx, 6.0, 6, 7.6, 0.9, '#0B1A22', '#F4F1EA', t0, 0, { kind: 'tag' }); });
      if (t >= 40.0) { const lf = easeInOut(seg(t, 40.0, 41.8)); Box(86.4, 0, -2.0, 5.2 * lf, 3.0 * lf, 3.0, '#BDB398'); for (let i = 0; i < 4; i++) Cyl(84.2 + i * 1.3, 0, -0.2, 0.2, 3.0 * lf, '#F7F4EC');
        let prev = null; for (let k = 0; k <= 10 * lf; k++) { const u = k / 10, p = [lerp(84.2, 79.4, u), lerp(2.4, 3.2, u) - Math.sin(u * Math.PI) * 0.8, lerp(0.4, 4.2, u)]; if (prev) Line3(prev, p, '#C42631', 12, 1); prev = p; }
        pop('TIED TO WASHINGTON', 82, 11.0, 3, 9.4, 1.0, '#C42631', '#F4F1EA', 41.0, 0); }
    }

    // ===== S5 (43.2 - 60.4) call to action: the full breakdown of the $119B Terafab gamble and the $44B GPU debt trap =====
    if (t >= 43.1) {
      const up = easeOut(seg(t, 43.4, 44.6));
      Box(104, 0, 1.6, 15 * up, 8.0 * up, 0.6, '#17252B'); Box(104, 0, 1.9, 14.2 * up, 7.2 * up, 0.2, '#0B141D');
      if (up > 0.8) { Box(104, 3.6, 2.1, 3.4, 2.4, 0.2, '#D94E43', { emis: 0.6 }); Box(103.5, 3.9, 2.25, 1.0, 1.7, 0.2, '#F4F1EA'); pop('CLICK THE VIDEO', 104, 8.6, 3, 9.4, 1.2, '#D94E43', '#F4F1EA', 45.0, 0); }
      if (t >= 46.0) Card(97.6, 9.6, 1.6, 7.4, 2.2, { kind: 'counter', text: '$119 BILLION', sub: 'Terafab gamble (up to)', fg: '#9BE01B', accent: '#76B900', t0: 46.0, t1: 0 }, t);
      if (t >= 52.4) Card(110.6, 9.6, 1.6, 7.4, 2.2, { kind: 'counter', text: '$44 BILLION', sub: 'GPU debt trap', fg: '#F2D58F', accent: '#E2B857', t0: 52.4, t1: 0 }, t);
      Char('elon', 104, 4.6, 2.6, { pose: 'spr:explain', facing: 1, phase: 5, talk: 0.4 }, 47.0, 61, t);
      if (t >= 56.4) { pop('NOW ON YOUR SCREEN', 104, 1.2, 6, 10.0, 1.0, '#0B1A22', '#E2B857', 56.6, 0); const a = 0.5 + 0.5 * Math.sin(t * 6); Cyl(104, 0, 0.5, 6.0 + 0.4 * a, 0.1, '#E2B857', { a: 0.4, lw: 0 }); }
    }

    drawBG(0.05);
    GROUND.forEach(fn => fn());
    ITEMS.sort((a, b) => b.z - a.z).forEach(it => it.fn());
    OVER.forEach(fn => fn());
    HEADS.forEach(h => { const a = env(t, h[0], h[1], 0.3, 0.3); if (a > 0.01) drawShotBanner(h[2], h[3], a, h[4], t, h[0]); });
  }
