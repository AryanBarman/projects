  const HEADS = [
    [0.10, 9.2, 'BOLTED TO THE GROUND', 'Lenders demand guarantees that financed chips stay on Earth', PAL.coral],
    [9.6, 25.8, 'THE 2027 CASH CRUNCH', 'Musk warns: GPUs are paid for before power and cooling are ready', PAL.amberHi],
    [26.2, 33.1, 'THE SAME TRAP', 'Jensen and Elon share one structural reality', PAL.cyan]
  ];

  function renderShots(t) {
    const cv = evalCam(t);
    Cam3D.set([cv[0], cv[1], cv[2]], [cv[3], cv[4], cv[5]], cv[6], 0.01 * Math.sin(t * 0.6));
    GROUND = []; ITEMS = []; OVER = [];
    const hit = (x, y, z, ht, col, r) => { const p = S(x, y, z); if (p) OVER.push(() => hitFx(p.x, p.y, t, ht, { color: col, r: r || 240, rays: 14 })); };
    const pop = (txt, x, y, z, w, h, bg, fg, t0, t1, o) => Card(x, y, z, w, h, Object.assign({ kind: /^#(D94E43|2B8A6E|D99B26)$/i.test(bg) ? 'stamp' : 'tag', text: txt, bg, fg, accent: /^#(0B1A22|0B191E)$/i.test(bg) ? '#E2B857' : fg, t0, t1: t1 || 0 }, o || {}), t);
    const trk = (keys, d) => RigKit.track(t, keys, d);
    for (let k = 0; k < 4; k++) pad(-16 + k * 26, -12, 14 + k * 26, 14, ['#B9C7CE', '#A9B8C2', '#C9B9A9', '#A9AEC4'][k]);

    // ===== S1 (0 - 9.3) lenders scramble to force ironclad guarantees: the financed chips stay bolted to the ground on Earth =====
    if (t < 9.9) {
      Box(0, 0, 1, 15, 0.5, 6, '#8A7B66');                                       // concrete pad = the ground
      [-4.5, 0, 4.5].forEach((cx, i) => {
        const d = easeOut(seg(t, 0.6 + i * 0.35, 1.4 + i * 0.35));
        Box(cx - 1.4, 0.5, 2.2, 2.8, 3.0 * d, 2.4, '#1B2A31'); for (let r = 0; r < 3; r++) if (d > 0.5) Box(cx - 1.0, 1.0 + r * 0.8, 3.45, 2.0, 0.3, 0.1, '#9BE01B', { emis: 0.6 });
        const bt = easeOut(seg(t, 3.0 + i * 0.5, 3.9 + i * 0.5));                  // steel chains drop from each chip to the pad and bolt
        if (bt > 0.02) { Box(cx - 1.5, 0.5, 3.6, 0.22, 3.0 * bt, 0.22, '#B8BDC2'); Box(cx + 1.3, 0.5, 3.6, 0.22, 3.0 * bt, 0.22, '#B8BDC2'); Box(cx - 1.8, 0.5, 3.4, 0.7, 0.35, 0.7, '#E2B857'); Box(cx + 1.1, 0.5, 3.4, 0.7, 0.35, 0.7, '#E2B857'); }
      });
      Char('banker', -9.5, 4.0, 2.4, Object.assign({ facing: 1, phase: 1 }, trk([[0, 'walk'], [1.2, 'point']])), 0.3, 9.9, t);
      Char('bondholder', 9.5, 4.0, 2.4, Object.assign({ facing: -1, phase: 2 }, trk([[0, 'walk'], [1.4, 'present']])), 0.5, 9.9, t);
      pop('LENDERS', -9.5, 6.6, 4.2, 5.0, 0.9, '#0B1A22', '#F4F1EA', 0.8, 0);
      pop('IRONCLAD GUARANTEES', 0, 6.4, 5, 10.0, 1.1, '#D99B26', '#0B191E', 2.4, 0, { kind: 'tag' });
      if (t >= 6.2) { const fl = seg(t, 6.2, 8.2); Cyl(0, 6.8 + 7 * fl, 1, 0.9, 0.1, '#E0E4E8'); pop('NOT LEAVING EARTH', 0, 4.2, 6.2, 9.0, 1.2, '#D94E43', '#F4F1EA', 7.0, 0); if (t >= 7.0) hit(0, 4.2, 6.2, 7.1, PAL.coral, 300); }
    }

    // ===== S2 (9.6 - 25.8) Musk warns on X: a 2027 cash crunch; GPUs are paid months before power plants and cooling are ready =====
    if (t >= 9.5 && t < 26.4) {
      Char('elon', 22.0, 4.0, 2.5, Object.assign({ facing: 1, phase: 3 }, trk([[0, 'spr:present'], [12.4, 'spr:point']])), 9.7, 26.4, t);
      pop('ELON ON X', 22.0, 7.4, 4.4, 5.8, 0.9, '#0B1A22', '#F4F1EA', 10.2, 0);
      Card(31.0, 7.2, 1.6, 7.2, 3.4, { kind: 'doc', tag: 'POST ON X', accent: '#2C5BA8', head: 'MASSIVE 2027 CASH CRUNCH', typeHead: true, type: true, cps: 20, lines: ['AI infrastructure faces', 'a working-capital squeeze'], lineAt: [14.0, 15.6], hl: -1, t0: 11.4, t1: 0 }, t);
      // the timeline gap: GPUs arrive first (green), power and cooling lag (grey) -> a red gap = working capital pain
      const g = easeOut(seg(t, 16.0, 18.4)), p = easeOut(seg(t, 18.2, 22.4));
      Box(15.0, 0.0, 6.0, 13 * g, 0.7, 1.4, '#76B900'); pop('PAY FOR GPUS', 18.2, 2.6, 7.6, 6.4, 0.9, '#0B1A22', '#9BE01B', 16.2, 0, { kind: 'tag' });
      Box(15.0, 0.0, 8.0, 13 * p, 0.7, 1.4, '#8A929A'); pop('POWER + COOLING', 18.2, 1.2, 9.4, 7.4, 0.9, '#0B1A22', '#F4F1EA', 18.6, 0, { kind: 'tag' });
      if (t >= 20.4) { const gp = easeOut(seg(t, 20.4, 22.0)); Box(15.0 + 13 * g * 0.0, 0.0, 10.0, 13 * g * gp * 0.4, 0.5, 1.2, '#D94E43'); }
      for (let k = 0; k < 8; k++) { const ph = (t * 0.5 + k / 8) % 1; if (t >= 22.4) Box(31 - ph * 1.2 + (k % 3) * 0.6, 7.0 - ph * 6.5, 3.0, 0.7, 0.4, 0.4, '#E2B857', { a: 1 - ph, lw: 0 }); }
      if (t >= 22.4) { Card(26, 9.8, 3, 9.4, 2.0, { kind: 'counter', text: 'HUNDREDS OF BILLIONS', sub: 'working capital pain', bg: '#2A0F0F', fg: '#FF6B5E', accent: '#D94E43', scramble: 0.01, pulse: [22.6, 24.0], t0: 22.4, t1: 0 }, t); }
    }

    // ===== S3 (26.2 - 33.1) Jensen and Elon are trapped in the same structural reality =====
    if (t >= 26.1) {
      const cg = easeOut(seg(t, 27.4, 29.0));
      Char('jensen', 48.8, 4.0, 2.6, { pose: 'spr:think', facing: 1, phase: 4 }, 26.4, 34, t);
      Char('elon', 55.2, 4.0, 2.6, { pose: 'spr:cross', facing: -1, phase: 5 }, 26.6, 34, t);
      pop('JENSEN', 48.8, 7.2, 4.4, 4.8, 0.9, '#0B1A22', '#F4F1EA', 26.8, 0); pop('ELON', 55.2, 7.2, 4.4, 4.0, 0.9, '#0B1A22', '#F4F1EA', 27.0, 0);
      for (let i = 0; i < 7; i++) { const a = cg * (1 - Math.abs(i - 3) * 0.0); Box(45.4 + i * 1.84, 0, 2.0, 0.45, 5.6 * a, 0.45, '#5E6F7A'); }
      Box(52, 5.6 * cg, 2.0, 12.8, 0.45, 0.45, '#5E6F7A'); Box(52, 0, 2.0, 12.8, 0.3, 0.45, '#5E6F7A');
      const ln = seg(t, 29.2, 31.0); if (ln > 0) { Box(48.6, 1.6, 1.0, 6.8 * ln, 0.4, 0.4, '#E2B857'); Box(48.6, 1.6, 1.0, 0.8, 0.9, 0.5, '#E2B857'); Box(55.4, 1.6, 1.0, 0.8, 0.9, 0.5, '#E2B857'); }
      pop('SAME STRUCTURAL REALITY', 52, 10.0, 3, 11.6, 1.2, '#D94E43', '#F4F1EA', 30.6, 0); if (t >= 30.6) hit(52, 10.0, 3, 30.7, PAL.coral, 320);
    }

    drawBG(0.05);
    GROUND.forEach(fn => fn());
    ITEMS.sort((a, b) => b.z - a.z).forEach(it => it.fn());
    OVER.forEach(fn => fn());
    HEADS.forEach(h => { const a = env(t, h[0], h[1], 0.3, 0.3); if (a > 0.01) drawShotBanner(h[2], h[3], a, h[4], t, h[0]); });
  }
