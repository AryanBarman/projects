  const HEADS = [
    [0.10, 17.7, 'THE CHOKEPOINT', 'Four physical links hold up modern AI', PAL.amberHi],
    [18.0, 23.1, 'NOT COPY-PASTE', 'Relationships you cannot hand to a new CEO', PAL.coral],
    [23.4, 37.0, 'BREAKING FREE', 'Hyperscalers and Terafab chase NVIDIA’s 75% margins', PAL.cyan],
    [37.4, 57.5, 'THE SECOND ACT', 'The only one who can hold it together, on a leash', PAL.coral]
  ];

  function renderShots(t) {
    const cv = evalCam(t);
    Cam3D.set([cv[0], cv[1], cv[2]], [cv[3], cv[4], cv[5]], cv[6], 0.01 * Math.sin(t * 0.6));
    GROUND = []; ITEMS = []; OVER = [];
    const hit = (x, y, z, ht, col, r) => { const p = S(x, y, z); if (p) OVER.push(() => hitFx(p.x, p.y, t, ht, { color: col, r: r || 240, rays: 14 })); };
    const pop = (txt, x, y, z, w, h, bg, fg, t0, t1, o) => Card(x, y, z, w, h, Object.assign({ kind: /^#(D94E43|2B8A6E|D99B26)$/i.test(bg) ? 'stamp' : 'tag', text: txt, bg, fg, accent: /^#(0B1A22|0B191E)$/i.test(bg) ? '#E2B857' : fg, t0, t1: t1 || 0 }, o || {}), t);
    const trk = (keys, d) => RigKit.track(t, keys, d);
    for (let k = 0; k < 5; k++) pad(-16 + k * 26, -12, 14 + k * 26, 14, ['#B9C7CE', '#A9B8C2', '#C9B9A9', '#A9AEC4'][k % 4]);

    // ===== S1 (0 - 17.8) a razor-thin physical chokepoint: TSMC, ASML EUV machines, SK Hynix HBM stacks, multi-gigawatt grids =====
    if (t < 18.4) {
      const lift = easeOut(seg(t, 0.4, 2.2));
      Box(0, 5.4 * lift + 0.1, 1.5, 15, 0.7, 5.5, '#76B900', { emis: 0.3 }); if (lift > 0.5) pop('MODERN AI', 0, 5.4 * lift + 2.2, 4, 6.4, 1.0, '#0B1A22', '#9BE01B', 1.6, 4.8);
      const P = [[-6.6, 'TSMC', 'TAIWAN', 5.0, '#6F8FA8'], [-2.2, 'ASML', 'NETHERLANDS', 8.0, '#2C5BA8'], [2.2, 'SK HYNIX', 'MEMORY STACKS', 11.4, '#D99B26'], [6.6, 'POWER GRID', 'MULTI-GIGAWATT', 15.2, '#E2B857']];
      P.forEach(([px, nm, sub, t0, col], i) => {
        const g = easeOut(seg(t, t0 - 0.6, t0 + 0.4)); if (g > 0.02) { Box(px - 0.9, 0, 1.5, 1.8, 5.4 * g, 1.8, col, { emis: 0.25 }); }
        if (t >= t0) { pop(nm, px, 7.9 + (i % 2) * 1.5, 4.0, 4.6, 0.85, '#0B1A22', '#F4F1EA', t0, 0); pop(sub, px, 6.5 + (i % 2) * 1.5, 4.0, 5.2, 0.7, '#0B1A22', '#E2B857', t0 + 0.5, 0, { kind: 'tag' }); }
      });
      if (t >= 5.0) for (let k = 0; k < 6; k++) { const ph = (t * 0.6 + k / 6) % 1; Box(-6.6 + (rndA(k) - 0.5) * 1.2, 1 + ph * 4.6, 3.0, 0.4, 0.4, 0.4, '#9BE01B', { a: 1 - ph, lw: 0, emis: 0.5 }); }
      if (t >= 8.4) { Cyl(-2.2, 5.5, 3.0, 0.5, 0.2, '#B8BDC2'); const bm = Math.sin(t * 6) > 0 ? 0.9 : 0.5; Cyl(-2.2, 0, 3.0, 0.22, 5.5, '#8F6BFF', { a: 0.35 * bm, emis: 0.8 }); }
      if (t >= 11.6) for (let k = 0; k < 4; k++) Box(1.4 + k * 0.45, 0.6, 3.0, 0.35, 1.0 + k * 0.9, 0.35, '#E2B857');
      if (t >= 15.4) { const a = t * 3; for (let k = 0; k < 5; k++) Box(6.2 + Math.sin(a + k) * 0.5 - 0.3, 0.6 + k * 1.0, 3.0, 0.6, 0.35, 0.6, '#FFE27A', { emis: 0.9, lw: 0 }); }
      pop('RAZOR-THIN', 0, 11.0, 2, 8.4, 1.2, '#D94E43', '#F4F1EA', 16.6, 0); if (t >= 16.6) hit(0, 11.0, 2, 16.7, PAL.coral, 300);
      Char('jensen', -10.5, 4.0, 2.4, { pose: 'spr:think', facing: 1, phase: 1 }, 0.4, 18.4, t);
    }

    // ===== S2 (18 - 23.1) these relationships are not software you can copy-paste onto a new CEO's laptop =====
    if (t >= 17.8 && t < 23.7) {
      Box(24.0, 0.8, 1.2, 7.0, 0.4, 4.6, '#B8BDC2'); Box(24.0, 1.2, 0.0, 6.4, 4.2, 0.4, '#2B2F36'); Box(24.0 - 2.9, 1.5, 0.3, 5.8, 3.6, 0.2, '#BFE9F2', { emis: 0.35 });
      Card(24.0, 4.2, 1.8, 4.4, 2.6, { kind: 'doc', tag: 'COPY', accent: '#2C5BA8', head: 'CODE', lines: ['paste to new CEO'], hl: -1, t0: 18.8, t1: 0 }, t);
      pop('NEW CEO’S LAPTOP', 24.0, 8.0, 3, 8.2, 1.0, '#0B1A22', '#F4F1EA', 19.0, 0);
      pop('CANNOT COPY-PASTE', 24.0, 0.6, 7.4, 10.6, 1.3, '#D94E43', '#F4F1EA', 21.0, 0); if (t >= 21.0) hit(24.0, 0.6, 7.4, 21.1, PAL.coral, 320);
      for (let k = 0; k < 5; k++) { const ph = (t * 0.5 + k / 5) % 1; if (t >= 19.4) Box(17.5 + ph * 12, 3.0 + Math.sin(ph * 6) * 0.6, 2.8, 0.7, 0.45, 0.45, '#9BE01B', { a: ph > 0.65 ? 1 - (ph - 0.65) / 0.35 : 1, lw: 0, emis: 0.4 }); }
    }

    // ===== S3 (23.4 - 37) hyperscalers (Google, Amazon, Broadcom) and Musk's Terafab spend tens of billions to break free of NVIDIA's 75% margins =====
    if (t >= 23.3 && t < 37.6) {
      Box(52, 0, 0.5, 3.6, 9.0, 3.0, '#1B2A31'); Box(52, 9.0, 0.5, 3.8, 0.8, 3.2, '#76B900'); pop('NVIDIA', 52, 10.9, 3, 5.0, 0.9, '#0B1A22', '#9BE01B', 23.6, 0);
      const R = [[44.0, 'GOOGLE', 24.4, '#2C5BA8'], [48.0, 'AMAZON', 25.6, '#D99B26'], [56.0, 'BROADCOM', 26.8, '#D94E43'], [60.0, 'TERAFAB', 29.8, '#76B900']];
      R.forEach(([rx, nm, t0, col]) => { const g = easeOut(seg(t, t0, t0 + 1.2)); if (g > 0.02) { Box(rx - 1.1, 0, 1.5, 2.2, 5.0 * g, 2.2, col); } if (t >= t0) pop(nm, rx, 6.4 + (rx > 52 ? 0 : 0), 3.4, 5.4, 0.85, '#0B1A22', '#F4F1EA', t0 + 0.4, 0); });
      if (t >= 30.6) Card(52, 12.8, 1.5, 7.2, 1.9, { kind: 'counter', text: '75% MARGINS', sub: 'what they want to escape', fg: '#F0A39A', accent: '#D94E43', t0: 30.6, t1: 0, pulse: [31.0] }, t);
      for (let k = 0; k < 8; k++) { const ph = ((t - 28.0) * 0.5 + k / 8) % 1; if (t >= 28.0) { const sx = k % 2 ? 56 : 48; Box(lerp(sx, 52, 1 - ph) - 0.3, 1.0 + ph * 2.4, 3.4, 0.55, 0.4, 0.4, '#E2B857', { a: 1 - ph * 0.6, lw: 0, emis: 0.5 }); } }
      pop('TENS OF BILLIONS', 52, 4.0, 7.0, 9.6, 1.0, '#D99B26', '#0B191E', 33.0, 0, { kind: 'tag' });
      if (t >= 34.0) { const cr = seg(t, 34.0, 36.4); Box(52, 3.0, 3.6, 7.5 * cr, 0.22, 0.22, '#D94E43', { lw: 0 }); }
    }

    // ===== S4 (37.3 - 57.5) Jensen is the only one who can hold the fragile supply chain together while defending the moat; leash + wall of rivals =====
    if (t >= 37.2) {
      Char('jensen', 78, 4.2, 2.7, Object.assign({ facing: 1, phase: 4 }, trk([[0, 'spr:explain'], [47.0, 'spr:think'], [51.0, 'spr:cross']])), 37.4, 58.5, t);
      pop('JENSEN WON HIS JOB BACK', 78, 8.2, 4.6, 10.6, 1.0, '#0B1A22', '#F4F1EA', 37.6, 41.0);
      const nd = [[70.5, 3.0, '#6F8FA8'], [73.8, 2.2, '#2C5BA8'], [82.2, 2.2, '#D99B26'], [85.5, 3.0, '#E2B857']];                                 // the fragile chain he holds together
      if (t >= 40.4) { nd.forEach(([nx, nz], i) => { const g = easeOut(seg(t, 40.4 + i * 0.3, 41.2 + i * 0.3)); Box(nx - 0.5, 0, 0.8, 1.0, 2.4 * g, 1.0, nd[i][2]); }); for (let k = 0; k < 5; k++) { const ph = ((t * 0.5) + k / 5) % 1, a = k % 2 ? 70.5 : 85.5; Box(lerp(a, 78, ph) - 0.2, 2.6 + Math.sin(ph * 3.1) * 0.8, 1.2, 0.4, 0.4, 0.4, '#9BE01B', { lw: 0, emis: 0.4 }); } }
      if (t >= 43.2) pop('FRAGILE SUPPLY CHAIN', 78, 6.4, 1.2, 9.4, 0.95, '#0B1A22', '#E2B857', 43.4, 46.4, { kind: 'tag' });
      if (t >= 46.4) pop('DEFENDING THE MOAT', 78, 6.4, 1.2, 9.4, 0.95, '#2C5BA8', '#F4F1EA', 46.6, 49.6, { kind: 'tag' });
      // the leash to Washington
      if (t >= 49.8) { const lf = easeInOut(seg(t, 49.8, 52.0)); Box(92.0, 0, 0.0, 5.4 * lf, 3.0 * lf, 3.0, '#BDB398'); for (let i = 0; i < 4; i++) Cyl(89.8 + i * 1.3, 0, 1.8, 0.2, 3.0 * lf, '#F7F4EC'); Box(95.0, 0, 1.0, 0.1, 5.0 * lf, 0.1, '#7F95A0');
        let prev = null; for (let k = 0; k <= 10 * lf; k++) { const u = k / 10, p = [lerp(89.8, 79.0, u), lerp(2.4, 3.4, u) - Math.sin(u * Math.PI) * 0.9, lerp(3.0, 4.4, u)]; if (prev) Line3(prev, p, '#C42631', 12, 1); prev = p; }
        pop('WASHINGTON LEASH', 90, 7.4, 4.4, 8.8, 1.0, '#C42631', '#F4F1EA', 51.4, 0); }
      // a wall of custom chip rivals closes in from every direction: a ring of towers around Jensen that tightens
      if (t >= 52.6) { const cl = easeInOut(seg(t, 52.6, 56.4)), R = 17 - 8 * cl; for (let k = 0; k < 9; k++) { const an = (k / 9) * 6.2832 + 0.3, gx = 78 + Math.cos(an) * R * 1.15, gz = 4.2 + Math.sin(an) * R * 0.5; if (gz > 7.6) continue; Box(gx - 1.4, 0, gz, 2.8, 4.4 + (k % 3) * 1.2, 2.4, ['#2C5BA8', '#D99B26', '#D94E43', '#6F8FA8', '#E2B857'][k % 5], { a: 0.95 }); }
        pop('CUSTOM CHIP RIVALS', 78, 10.6, 2, 10.4, 1.1, '#D94E43', '#F4F1EA', 53.0, 0); if (t >= 53.0) hit(78, 10.6, 2, 53.1, PAL.coral, 320); }
    }

    drawBG(0.05);
    GROUND.forEach(fn => fn());
    ITEMS.sort((a, b) => b.z - a.z).forEach(it => it.fn());
    OVER.forEach(fn => fn());
    HEADS.forEach(h => { const a = env(t, h[0], h[1], 0.3, 0.3); if (a > 0.01) drawShotBanner(h[2], h[3], a, h[4], t, h[0]); });
  }
