  const HEADS = [
    [0.10, 5.4, 'FROM THIS DAY FORWARD', 'What the new mechanisms mean for how NVIDIA operates', PAL.amberHi],
    [5.8, 10.2, '33 YEARS OF AUTONOMY', 'Jensen ran NVIDIA as a free-moving founder', PAL.sageHi],
    [10.4, 20.6, 'AT LIGHTNING SPEED', 'Billions in wafers: Taiwan, Singapore, global data centers', PAL.cyan],
    [20.8, 27.6, 'NOW EVERYTHING GOES THROUGH A GATE', 'Export licenses, partnerships, geopolitical calls', PAL.coral],
    [27.8, 32.2, 'WASHINGTON WATCHING', 'Looking straight over his shoulder', PAL.coral]
  ];

  function renderShots(t) {
    const cv = evalCam(t);
    Cam3D.set([cv[0], cv[1], cv[2]], [cv[3], cv[4], cv[5]], cv[6], 0.01 * Math.sin(t * 0.6));
    GROUND = []; ITEMS = []; OVER = [];
    const hit = (x, y, z, ht, col, r) => { const p = S(x, y, z); if (p) OVER.push(() => hitFx(p.x, p.y, t, ht, { color: col, r: r || 240, rays: 14 })); };
    const pop = (txt, x, y, z, w, h, bg, fg, t0, t1, o) => Card(x, y, z, w, h, Object.assign({ kind: /^#(D94E43|2B8A6E|D99B26)$/i.test(bg) ? 'stamp' : 'tag', text: txt, bg, fg, accent: /^#(0B1A22|0B191E)$/i.test(bg) ? '#E2B857' : fg, t0, t1: t1 || 0 }, o || {}), t);
    const trk = (keys, d) => RigKit.track(t, keys, d);
    for (let k = 0; k < 6; k++) pad(-16 + k * 26, -12, 14 + k * 26, 14, ['#B9C7CE', '#A9B8C2', '#C9B9A9', '#A9AEC4', '#B9BFC9'][k % 5]);

    // ===== S1 (0 - 5.4) from this day forward: the new cage around the founder =====
    if (t < 6.0) {
      Char('jensen', 0, 3.4, 2.6, Object.assign({ facing: 1, phase: 1 }, trk([[0, 'spr:think'], [3.2, 'spr:explain']])), 0.1, 6.0, t);
      const g = easeOut(seg(t, 0.6, 2.2)); if (g > 0.03) { Box(-6, 0, 1, 0.5, 5.4 * g, 0.5, '#5E6F7A'); Box(6, 0, 1, 0.5, 5.4 * g, 0.5, '#5E6F7A'); Box(0, 5.4 * g, 1, 12.5, 0.4, 0.5, '#5E6F7A'); }
      pop('FROM THIS DAY FORWARD', 0, 7.6, 3, 10.8, 1.3, '#0B1A22', '#F4F1EA', 0.5, 0);
    }

    // ===== S2 (5.4 - 10.2) 33 years of unmatched founder autonomy =====
    if (t >= 5.3 && t < 10.8) {
      Char('jensen', 26, 3.4, 2.6, { pose: 'spr:point', facing: 1, phase: 2 }, 5.6, 10.8, t);
      const n = Math.min(33, Math.floor(33 * seg(t, 5.8, 9.0)));
      Card(33.0, 8.4, 1.6, 7.6, 2.4, { kind: 'counter', text: n + ' YEARS', sub: 'founder autonomy', fg: '#9BE01B', accent: '#76B900', t0: 5.8, t1: 0, pulse: [9.1] }, t);
      for (let i = 0; i < 8; i++) { const a = easeOut(seg(t, 6.2 + i * 0.2, 7.0 + i * 0.2)); Box(19.4 + i * 1.8, 0, 6.4, 1.1, 0.4 + 1.5 * a, 1.1, i % 2 ? '#9BE01B' : '#76B900'); }
      pop('UNMATCHED', 26, 8.6, 3, 6.6, 1.0, '#0B1A22', '#E2B857', 8.2, 0);
    }

    // ===== S3 (10.4 - 20.6) billions in wafers moved at lightning speed: Taiwan, Singapore, data centers =====
    if (t >= 10.3 && t < 21.2) {
      const pts = [[44, 2], [52, 6], [60, 2]], names = ['TAIWAN', 'SINGAPORE', 'DATA CENTERS'];
      pts.forEach((p, i) => { Box(p[0] - 2, 0, p[1] - 2, 4, 1.4, 4, i < 2 ? '#8A7B66' : '#1B2A31'); Box(p[0] - 1, 1.4, p[1] - 1, 2, 1.6, 2, i < 2 ? '#CFD6DA' : '#76B900'); pop(names[i], p[0], 6.2 + (i === 1 ? 1.6 : 0), p[1] + 3, 5.6, 0.9, '#0B1A22', '#F4F1EA', 11.0 + i * 1.6, 0); });
      for (let k = 0; k < 14; k++) { const u = ((t - 10.8) * 0.55 + k / 14) % 1; if (t < 10.8) break; const ph = u * 2, seg2 = ph < 1 ? [pts[0], pts[1], ph] : [pts[1], pts[2], ph - 1]; Box(lerp(seg2[0][0], seg2[1][0], seg2[2]) - 0.4, 2.0 + 2.2 * Math.sin(seg2[2] * Math.PI), lerp(seg2[0][1], seg2[1][1], seg2[2]), 0.8, 0.12, 0.8, '#9BE01B', { emis: 0.4, lw: 0 }); }
      Card(52, 9.6, 1.5, 8.6, 2.0, { kind: 'counter', text: 'BILLIONS IN WAFERS', sub: 'lightning speed', fg: '#9BE01B', accent: '#76B900', t0: 13.2, t1: 0, scramble: 0.4, pulse: [13.6] }, t);
      if (t >= 17.0) pop('NO FRICTION', 44.5, 5.2, 4.8, 6.4, 1.2, '#2B8A6E', '#F4F1EA', 17.2, 0);
      Char('jensen', 40.4, 3.4, 2.5, { pose: 'spr:walk', facing: 1, phase: 3 }, 10.6, 21.2, t);
    }

    // ===== S4 (20.6 - 27.6) every export license, partnership, geopolitical call runs through a compliance gate =====
    if (t >= 20.5 && t < 28.2) {
      Box(78, 0, -1.6, 13, 6.4, 0.6, '#6B7F8F'); Box(78, 6.4, -1.6, 13.6, 0.6, 0.8, '#4E5F6C');
      const gate = 1 - easeOut(seg(t, 21.6, 22.2)) * 0.0; Box(78, 0, 1.0, 3.6, 5.2, 0.5, '#2C5BA8', { a: 0.6 }); Box(78, 5.2, 1.0, 4.2, 0.5, 0.7, '#E2B857');
      Char('compliance', 82.6, 3.6, 2.5, { pose: 'idle', facing: -1, phase: 4 }, 21.0, 28.2, t);
      pop('COMPLIANCE APPARATUS', 80, 9.6, 3, 9.6, 1.1, '#0B1A22', '#E2B857', 21.0, 0);
      [['EXPORT LICENSE', 21.4, 3.0], ['PARTNERSHIP', 23.6, 5.0], ['GEOPOLITICAL CALL', 25.6, 4.0]].forEach(([nm, t0, zz], i) => { const u = easeInOut(seg(t, t0, t0 + 1.6)); if (t >= t0) { const px = lerp(70.4, 78, u); Box(px - 1.4, 1.0 + i * 1.0, zz, 2.8, 0.8, 0.5, ['#E2B857', '#45B8AC', '#D94E43'][i]); if (u < 0.9) pop(nm, px, 7.2 - i * 0.2, zz + 1.2, 5.6, 0.8, '#0B1A22', '#F4F1EA', t0, t0 + 1.8, { kind: 'tag' }); } });
      Char('jensen', 70, 3.4, 2.5, { pose: 'spr:think', facing: 1, phase: 5 }, 21.0, 28.2, t);
      pop('EVERYTHING RUNS THROUGH IT', 78, 11.4, 2.6, 11.6, 1.2, '#D94E43', '#F4F1EA', 25.8, 0); if (t >= 25.8) hit(78, 11.4, 2.6, 25.9, PAL.coral, 320);
    }

    // ===== S5 (27.6 - 32.2) Washington looks straight over his shoulder =====
    if (t >= 27.5) {
      Char('jensen', 100, 3.4, 2.6, { pose: 'spr:explain', facing: 1, phase: 6, talk: 0.4 }, 27.7, 33, t);
      const rise = easeOut(seg(t, 28.0, 29.2)); whiteHouse(107.5, -6, rise);
      Char('trump', 105.8, 3.8, 2.7, { pose: 'spr:point', facing: -1, phase: 7 }, 28.6, 33, t);
      pop('WASHINGTON', 105.8, 10.4, 3, 7.4, 1.1, '#2C5BA8', '#F4F1EA', 28.2, 0);
      pop('OVER HIS SHOULDER', 103, 8.0, 5, 9.2, 1.4, '#D94E43', '#F4F1EA', 30.0, 0); if (t >= 30.0) hit(103, 8.0, 5, 30.1, PAL.coral, 320);
    }

    drawBG(0.05);
    GROUND.forEach(fn => fn());
    ITEMS.sort((a, b) => b.z - a.z).forEach(it => it.fn());
    OVER.forEach(fn => fn());
    HEADS.forEach(h => { const a = env(t, h[0], h[1], 0.3, 0.3); if (a > 0.01) drawShotBanner(h[2], h[3], a, h[4], t, h[0]); });
  }
