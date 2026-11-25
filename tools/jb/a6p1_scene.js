  const HEADS = [
    [0.10, 9.3, 'STEP BACK', 'Past the headlines, the calls and the rallies', PAL.cyan],
    [9.6, 24.2, 'THE ILLUSION', 'Wall Street thought one executive moved NVIDIA’s value', PAL.coral],
    [24.5, 38.3, 'ONE LAYER DEEPER', 'The physical supply chain nobody could afford to lose him from', PAL.amberHi]
  ];

  function renderShots(t) {
    const cv = evalCam(t);
    Cam3D.set([cv[0], cv[1], cv[2]], [cv[3], cv[4], cv[5]], cv[6], 0.01 * Math.sin(t * 0.6));
    GROUND = []; ITEMS = []; OVER = [];
    const hit = (x, y, z, ht, col, r) => { const p = S(x, y, z); if (p) OVER.push(() => hitFx(p.x, p.y, t, ht, { color: col, r: r || 240, rays: 14 })); };
    const pop = (txt, x, y, z, w, h, bg, fg, t0, t1, o) => Card(x, y, z, w, h, Object.assign({ kind: /^#(D94E43|2B8A6E|D99B26)$/i.test(bg) ? 'stamp' : 'tag', text: txt, bg, fg, accent: /^#(0B1A22|0B191E)$/i.test(bg) ? '#E2B857' : fg, t0, t1: t1 || 0 }, o || {}), t);
    const trk = (keys, d) => RigKit.track(t, keys, d);
    for (let k = 0; k < 4; k++) pad(-16 + k * 26, -12, 14 + k * 26, 14, ['#B9C7CE', '#A9B8C2', '#C9B9A9', '#A9AEC4'][k]);

    // ===== S1 (0 - 9.4) step back from the headlines, the White House calls and the rallies; what controls the AI revolution? =====
    if (t < 10.0) {
      const hd = [[-6.2, 3.6, 'HEADLINES', '#F4F1EA'], [0, 4.6, 'CALLS', '#2C5BA8'], [6.2, 3.6, 'RALLIES', '#2B8A6E']];
      hd.forEach(([hx, hy, nm, col], i) => {
        const u = easeOut(seg(t, 0.2 + i * 0.5, 1.0 + i * 0.5)), out = seg(t, 5.6 + i * 0.3, 6.8 + i * 0.3);     // each pane slides away as we "step back"
        if (u > 0.02) Box(hx - 2.2, hy - 1.6 + 5.5 * out, 0.4, 4.4 * u, 3.2 * u * (1 - out * 0.6), 0.5, col, { a: 1 - out * 0.8 });
        if (u > 0.5) pop(nm, hx, hy + 2.6 + 5.5 * out, 3, 4.8, 0.85, '#0B1A22', '#F4F1EA', 0.8 + i * 0.5, 6.8 + i * 0.3, { kind: 'tag' });
      });
      if (t >= 1.8 && t < 6.2) for (let k = 0; k < 6; k++) { const ph = (t * 0.7 + k / 6) % 1; Box(-1 + 4 * Math.sin(k * 2), 2 + ph * 5, 3.5, 0.5, 0.5, 0.5, ['#E2B857', '#9BE01B', '#F4F1EA'][k % 3], { a: 1 - ph, lw: 0 }); }
      const ch = easeOut(seg(t, 5.8, 7.4));
      if (ch > 0.02) { Cyl(0, 0, 1.5, 3.8 * ch, 0.5, '#1B2A31'); for (let i = 0; i < 6; i++) Box(-2.4 + (i % 3) * 1.6, 0.5, 0.6 + Math.floor(i / 3) * 1.6, 1.3, 2.2 * ch * (0.6 + 0.4 * ((i * 7) % 3) / 2), 1.3, i % 2 ? '#76B900' : '#2B8A6E', { emis: 0.35 }); }
      pop('WHAT REALLY CONTROLS THE AI REVOLUTION?', 0, 7.8, 3, 15.0, 1.4, '#D99B26', '#0B191E', 6.2, 0, { kind: 'tag' });
      Char('jensen', -11.5, 4.0, 2.5, { pose: 'spr:think', facing: 1, phase: 1 }, 0.4, 10.0, t);
    }

    // ===== S2 (9.6 - 24.2) the illusion: fire one executive and Nvidia's value falls; rehire him and a trillion appears overnight =====
    if (t >= 9.5 && t < 24.9) {
      Char('jensen', 26, 4.0, 2.6, { pose: t < 16.0 ? 'spr:cross' : 'spr:present', facing: 1, phase: 2 }, 9.7, 24.9, t);
      pop('11 DAYS', 26, 7.6, 4.4, 5.0, 0.9, '#0B1A22', '#E2B857', 9.8, 14.4);
      const dn = seg(t, 11.0, 15.2), up = seg(t, 16.6, 20.4);                              // value bar: falls when he is fired, climbs when rehired
      const val = 5.6 * (1 - 0.6 * easeInOut(dn)) + 4.8 * easeOut(up);
      Box(33.4, 0, 3.0, 3.0, val, 2.2, up > 0.05 ? '#76B900' : dn > 0.05 ? '#D94E43' : '#76B900', { emis: 0.3 });
      Box(33.4, 0, 3.0, 3.2, 0.2, 2.4, '#E2B857'); Box(33.4 - 1.7, 5.6, 3.0, 3.4, 0.08, 0.08, '#E2B857', { lw: 0 });
      pop('NVIDIA’S VALUE', 33.4, 7.4 + (up > 0.05 ? 3.2 * up : 0), 4.6, 6.2, 0.9, '#0B1A22', '#F4F1EA', 10.6, 0);
      if (t >= 11.0 && t < 15.6) { pop('FIRED', 19.6, 5.4, 4.4, 4.2, 1.2, '#D94E43', '#F4F1EA', 11.2, 15.0); }
      if (t >= 16.6) { const n = 1.0 * easeOut(seg(t, 17.0, 20.4)); Card(26, 10.2, 3, 8.6, 2.0, { kind: 'counter', text: '+$' + Math.max(1, Math.round(n)) + ' TRILLION', sub: 'overnight, they believed', fg: '#9BE01B', accent: '#76B900', t0: 17.0, t1: 0, pulse: [20.6] }, t); pop('REHIRED', 19.6, 5.4, 4.4, 4.6, 1.2, '#2B8A6E', '#F4F1EA', 16.8, 21.0); }
      if (t >= 21.6) { pop('THE ILLUSION', 26, 7.0, 6, 9.0, 1.6, '#D94E43', '#F4F1EA', 21.8, 0); hit(26, 7.0, 6, 21.9, PAL.coral, 340); const sh = 0.5 + 0.5 * Math.sin(t * 9); Box(33.4, 9.4, 3.0, 3.0 * (0.4 + 0.1 * sh), 0.15, 2.2, '#E2B857', { a: 0.4, lw: 0 }); }
    }

    // ===== S3 (24.5 - 38.3) one layer deeper: the surface lifts to reveal the physical supply chain; nobody could afford to let Jensen walk away =====
    if (t >= 24.4) {
      const lift = easeInOut(seg(t, 24.6, 27.4));
      Box(52, 6.4 * lift, 1.0, 17, 0.5, 8, '#F4F1EA', { a: 0.55 * (1 - 0.5 * lift) }); pop('SURFACE NEWS', 52, 6.4 * lift + 1.6, 5.4, 7.0, 0.9, '#0B1A22', '#F4F1EA', 24.8, 30.0, { kind: 'tag' });
      const nodes = [[44.8, 'FAB'], [52, 'CHIPS'], [59.2, 'SUPPLY']];
      nodes.forEach(([nx, nm], i) => { const u = easeOut(seg(t, 26.8 + i * 0.5, 27.8 + i * 0.5)); if (u > 0.02) { Box(nx - 1.6, 0, -0.8, 3.2, 2.6 * u, 3.0, i === 1 ? '#76B900' : '#5E6F7A', { emis: i === 1 ? 0.4 : 0 }); Box(nx - 0.4, 2.6 * u, -0.8, 0.8, 1.8 * u, 0.8, '#E2B857'); } });
      if (t >= 28.4) pop('PHYSICAL SUPPLY CHAIN', 52, 8.4, 1.0, 10.8, 1.1, '#0B1A22', '#E2B857', 28.6, 0);
      for (let k = 0; k < 9; k++) { const u = ((t - 28.0) * 0.42 + k / 9) % 1; if (t >= 28.0) { const a = u < 0.5 ? [44.8, 52, u * 2] : [52, 59.2, u * 2 - 1]; Box(lerp(a[0], a[1], a[2]) - 0.3, 2.4 + Math.sin(a[2] * Math.PI) * 1.6, 2.4, 0.6, 0.45, 0.6, '#E2B857', { lw: 0, emis: 0.5 }); } }
      // three parties who could not afford to let him walk away
      const who = [[-10, 'NVIDIA’S BOARD', 'board', 30.2], [6, 'ELON MUSK', 'elon', 32.2], [13, 'THE WHITE HOUSE', 'trump', 34.0]];
      Char('jensen', 50, 6.4, 2.6, { pose: t > 36.4 ? 'spr:present' : 'spr:think', facing: 1, phase: 3 }, 30.0, 39, t);
      who.forEach(([dx, nm, role, t0], i) => { Char(role, 52 + dx, 5.0, 2.5, { pose: 'idle', facing: dx < 0 ? 1 : dx > 0 ? -1 : 1, phase: i }, t0 - 0.2, 39, t); pop(nm, 52 + dx, 6.6, 6.5, 7.4, 0.85, '#0B1A22', '#F4F1EA', t0, 0, { kind: 'tag' }); });
      if (t >= 36.0) { pop('COULD NOT AFFORD TO LET HIM GO', 52, 10.6, 3, 14.0, 1.3, '#D94E43', '#F4F1EA', 36.2, 0); if (t >= 36.2) hit(52, 10.6, 3, 36.3, PAL.coral, 340); }
    }

    drawBG(0.05);
    GROUND.forEach(fn => fn());
    ITEMS.sort((a, b) => b.z - a.z).forEach(it => it.fn());
    OVER.forEach(fn => fn());
    HEADS.forEach(h => { const a = env(t, h[0], h[1], 0.3, 0.3); if (a > 0.01) drawShotBanner(h[2], h[3], a, h[4], t, h[0]); });
  }
