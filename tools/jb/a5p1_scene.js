  const HEADS = [
    [0.10, 8.5, 'A STORY BREAKS', 'As Jensen returns, a huge Musk and SpaceX financing story lands', PAL.coral],
    [8.8, 16.8, 'APOLLO + GOLDMAN SACHS', 'About $44B in debt and lease financing', PAL.amberHi],
    [17.0, 25.4, 'LARGEST GPU DEAL EVER', 'So SpaceX can buy tens of thousands of Vera Rubin chips', PAL.sageHi],
    [25.6, 33.0, 'PURE MUSK AMBITION', 'Tens of billions raised on Wall Street to lock down NVIDIA silicon', PAL.cyan],
    [33.2, 39.0, 'EARTH AND ORBIT', 'Power for AI data centers on the ground and on satellites', PAL.cyan]
  ];

  function renderShots(t) {
    const cv = evalCam(t);
    Cam3D.set([cv[0], cv[1], cv[2]], [cv[3], cv[4], cv[5]], cv[6], 0.01 * Math.sin(t * 0.6));
    GROUND = []; ITEMS = []; OVER = [];
    const hit = (x, y, z, ht, col, r) => { const p = S(x, y, z); if (p) OVER.push(() => hitFx(p.x, p.y, t, ht, { color: col, r: r || 240, rays: 14 })); };
    const pop = (txt, x, y, z, w, h, bg, fg, t0, t1, o) => Card(x, y, z, w, h, Object.assign({ kind: /^#(D94E43|2B8A6E|D99B26)$/i.test(bg) ? 'stamp' : 'tag', text: txt, bg, fg, accent: /^#(0B1A22|0B191E)$/i.test(bg) ? '#E2B857' : fg, t0, t1: t1 || 0 }, o || {}), t);
    const trk = (keys, d) => RigKit.track(t, keys, d);
    for (let k = 0; k < 6; k++) pad(-16 + k * 26, -12, 14 + k * 26, 14, ['#B9C7CE', '#A9B8C2', '#C9B9A9', '#A9AEC4', '#B9BFC9'][k % 5]);

    // ===== S1 (0 - 8.5) Monday: Jensen walks into HQ while a breaking story about Musk and SpaceX lands =====
    if (t < 9.1) {
      hqTower(-7, -6, easeOut(seg(t, 0.1, 1.0)), 'NVIDIA');
      const wk = seg(t, 0.3, 2.6); Char('jensen', lerp(-16, -9.6, easeInOut(wk)), 3.6, 2.5, { pose: wk < 1 ? 'spr:walk' : 'spr:explain', facing: 1, phase: 1 }, 0.1, 9.1, t);
      pop('MONDAY', -14.5, 6.4, 4, 5.0, 1.0, '#0B1A22', '#E2B857', 0.6, 3.0);
      if (t >= 3.0) {
        const u = easeOut(seg(t, 3.0, 3.8)); Box(6, 0, 1.6, 8.4 * u, 4.6, 0.5, '#17252B'); Box(6, 3.9, 1.9, 8.4 * u, 0.7, 0.2, '#D94E43');
        pop('BREAKING NEWS', 6, 8.2, 3.6, 7.2, 1.2, '#D94E43', '#F4F1EA', 3.4, 0);
        Char('elon', 4.2, 0.6, 2.3, { pose: 'spr:present', facing: -1, phase: 2 }, 4.2, 9.1, t);
        pop('ELON MUSK', 4.2, 7.0, 5, 5.2, 0.9, '#0B1A22', '#F4F1EA', 4.6, 0);
        Box(9.0, 0, 3.0, 1.0, 4.6, 1.0, '#E0E4E8'); Box(9.0, 4.6, 3.0, 0.8, 1.2, 0.8, '#C9D3D9'); pop('SPACEX', 9.4, 7.6, 5, 4.6, 0.9, '#0B1A22', '#F4F1EA', 6.0, 0);
      }
    }

    // ===== S2 (8.8 - 16.8) Apollo Global Management and Goldman Sachs price about $44B in debt and lease financing =====
    if (t >= 8.7 && t < 17.4) {
      Box(20.4, 0, -1.2, 5.6, 7.0, 3.0, '#2B3A55'); Box(20.4, 7.0, -1.2, 5.8, 0.4, 3.2, '#C9A94A'); pop('APOLLO', 20.4, 8.8, 3, 5.4, 1.0, '#0B1A22', '#F4F1EA', 9.4, 0);
      Box(31.6, 0, -1.2, 5.6, 8.6, 3.0, '#6F8FA8'); Box(31.6, 8.6, -1.2, 5.8, 0.4, 3.2, '#E2B857'); pop('GOLDMAN SACHS', 31.6, 10.2, 3, 7.2, 1.0, '#0B1A22', '#F4F1EA', 10.0, 0);
      const fl = seg(t, 11.0, 14.0);
      for (let k = 0; k < 10; k++) { const u = ((fl * 1.4 + k / 10) % 1); if (t >= 11.0) { const px = lerp(23.4, 28.6, u); Box(px - 0.4, 2.6 + Math.sin(u * Math.PI) * 2.2, 3.0, 0.8, 0.5, 0.5, k % 2 ? '#E2B857' : '#9BE01B', { lw: 0 }); } }
      Card(26, 7.2, 3, 8.6, 2.4, { kind: 'counter', text: '$44 BILLION', sub: 'debt + lease financing', fg: '#F2D58F', accent: '#E2B857', scramble: 0.7, pulse: [13.8], t0: 12.0, t1: 0 }, t);
      pop('DEBT', 22.6, 4.6, 5, 3.4, 0.8, '#D94E43', '#F4F1EA', 14.0, 0, { kind: 'tag' }); pop('LEASE', 29.4, 4.6, 5, 3.4, 0.8, '#2C5BA8', '#F4F1EA', 14.6, 0, { kind: 'tag' });
    }

    // ===== S3 (17 - 25.4) the largest GPU financing deal in history; SpaceX can buy tens of thousands of Vera Rubin chips =====
    if (t >= 16.9 && t < 26.0) {
      pop('LARGEST GPU DEAL IN HISTORY', 52, 9.0, 3, 11.4, 1.2, '#D99B26', '#0B191E', 17.4, 21.0); if (t >= 17.4 && t < 21.0) hit(52, 9.0, 3, 17.5, PAL.amberHi, 300);
      Box(44.4, 0, 0, 2.8, 6.0, 2.0, '#E0E4E8'); Box(44.4, 6.0, 0, 2.0, 1.4, 1.6, '#C9D3D9'); pop('SPACEX', 44.4, 8.0, 3, 4.6, 0.9, '#0B1A22', '#F4F1EA', 18.0, 0);
      const n = Math.min(60, Math.floor(60 * seg(t, 20.2, 24.4)));
      for (let i = 0; i < n; i++) { const c = i % 10, r = Math.floor(i / 10); Box(51.0 + c * 1.05, 0.2 + r * 0.55, 1.0, 0.9, 0.45, 0.9, i % 2 ? '#76B900' : '#1B2A31'); }
      pop('VERA RUBIN CHIPS', 55.6, 5.6, 3.8, 8.2, 1.0, '#0B1A22', '#9BE01B', 21.0, 0);
      pop('TENS OF THOUSANDS', 55.6, 7.2, 3.8, 8.6, 1.0, '#2B8A6E', '#F4F1EA', 22.0, 0, { kind: 'tag' });
    }

    // ===== S4 (25.5 - 33) pure Musk ambition: race tens of billions on Wall Street, lock down NVIDIA's next-gen silicon =====
    if (t >= 25.4 && t < 33.6) {
      Char('elon', 74, 3.4, 2.6, { pose: 'spr:present', facing: 1, phase: 3, talk: 0.5 }, 25.6, 33.6, t);
      pop('PURE MUSK AMBITION', 78, 8.6, 4, 9.6, 1.2, '#0B1A22', '#F4F1EA', 25.8, 28.6);
      const up = easeOut(seg(t, 28.6, 31.0)); barsRow(80.0, 3, [1.2, 1.8, 2.5, 3.4, 4.4].map(h => h * up), ['#3FD08B', '#3FD08B', '#6FE0A5', '#76B900', '#9BE01B']);
      pop('WALL STREET', 83, 6.2, 4.6, 6.8, 0.9, '#0B1A22', '#F4F1EA', 28.8, 0);
      if (t >= 31.0) {
        Box(87.4, 0, 3.4, 2.4, 2.0, 0.8, '#E2B857'); Cyl(86.8, 2.0, 3.4, 0.26, 1.2, '#B8BDC2'); Cyl(88.0, 2.0, 3.4, 0.26, 1.2, '#B8BDC2'); Box(87.4, 3.2, 3.3, 1.7, 0.36, 0.5, '#B8BDC2');
        pop('LOCK DOWN NVIDIA SILICON', 83, 7.6, 5, 10.6, 1.0, '#D99B26', '#0B191E', 31.4, 0, { kind: 'tag' });
      }
    }

    // ===== S5 (33 - 39) AI data centers, on Earth and aboard orbital satellites =====
    if (t >= 33.0) {
      Cyl(104, 0, 0, 7, 0.4, '#4C96C9'); Cyl(104, 0.4, 0, 5, 0.2, '#6FB36A', { a: 0.8 });
      [[-2.6, 0.5], [0, -1.2], [2.6, 0.5]].forEach(([dx, dz]) => { Box(104 + dx - 1, 0.6, dz - 1, 2, 2.6, 2, '#1B2A31'); for (let r = 0; r < 3; r++) Box(104 + dx - 0.7, 1.0 + r * 0.7, dz + 1.05, 1.4, 0.3, 0.1, '#9BE01B', { emis: 0.6 }); });
      pop('ON EARTH', 104, 5.6, 4, 5.4, 0.9, '#0B1A22', '#F4F1EA', 33.8, 0);
      [[-3.6, 9.0], [0.2, 10.6], [3.8, 9.2]].forEach(([dx, hy], i) => { const u = easeOut(seg(t, 35.0 + i * 0.4, 36.2 + i * 0.4)); if (u > 0.02) sat(104 + dx, 4 + (hy - 4) * u, 0.6); });
      pop('IN ORBIT', 104, 12.6, 3, 5.4, 0.9, '#0B1A22', '#F4F1EA', 35.6, 0);
      pop('POWERING AI', 104, 8.0, 5.2, 7.2, 1.2, '#2B8A6E', '#F4F1EA', 37.0, 0); if (t >= 37.0) hit(104, 8.0, 5.2, 37.1, PAL.sageHi, 300);
    }

    drawBG(0.05);
    GROUND.forEach(fn => fn());
    ITEMS.sort((a, b) => b.z - a.z).forEach(it => it.fn());
    OVER.forEach(fn => fn());
    HEADS.forEach(h => { const a = env(t, h[0], h[1], 0.3, 0.3); if (a > 0.01) drawShotBanner(h[2], h[3], a, h[4], t, h[0]); });
  }
