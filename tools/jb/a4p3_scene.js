  const HEADS = [
    [0.10, 10.2, 'SENATOR JACK REED ASKS', 'Too big to fail, or too powerful to fire?', PAL.cyan],
    [10.5, 23.2, 'THE LESSON', 'Critical infrastructure: the CEO is never truly independent again', PAL.coral],
    [23.5, 33.0, 'MEANWHILE, IN SPACE', 'His biggest customer fights a $44B battle to launch NVIDIA chips', PAL.amberHi]
  ];

  function renderShots(t) {
    const cv = evalCam(t);
    Cam3D.set([cv[0], cv[1], cv[2]], [cv[3], cv[4], cv[5]], cv[6], 0.01 * Math.sin(t * 0.6));
    GROUND = []; ITEMS = []; OVER = [];
    const hit = (x, y, z, ht, col, r) => { const p = S(x, y, z); if (p) OVER.push(() => hitFx(p.x, p.y, t, ht, { color: col, r: r || 240, rays: 14 })); };
    const pop = (txt, x, y, z, w, h, bg, fg, t0, t1, o) => Card(x, y, z, w, h, Object.assign({ kind: /^#(D94E43|2B8A6E|D99B26)$/i.test(bg) ? 'stamp' : 'tag', text: txt, bg, fg, accent: /^#(0B1A22|0B191E)$/i.test(bg) ? '#E2B857' : fg, t0, t1: t1 || 0 }, o || {}), t);
    const trk = (keys, d) => RigKit.track(t, keys, d);
    for (let k = 0; k < 4; k++) pad(-16 + k * 26, -12, 14 + k * 26, 14, ['#B9C7CE', '#A9B8C2', '#C9B9A9', '#A9AEC4'][k]);

    // ===== S1 (0 - 10.3) Senator Jack Reed's question, shown as a balance: too big to fail vs too powerful to fire =====
    if (t < 10.9) {
      Char('reed', -9, 3.6, 2.6, Object.assign({ facing: 1, phase: 1 }, trk([[0, 'spr:podium'], [3.0, 'spr:point']])), 0.1, 10.9, t);
      pop('SENATOR JACK REED', -9, 7.6, 4.2, 7.6, 1.0, '#2C5BA8', '#F4F1EA', 0.3, 0);
      Card(-1.0, 10.6, 1.6, 8.4, 2.8, { kind: 'doc', serif: true, quote: true, tag: 'AFTER THE WHITE HOUSE INTERVENED', accent: '#2C5BA8', head: 'IS NVIDIA NOW...', typeHead: true, type: true, cps: 16, lines: [], t0: 2.4, t1: 0 }, t);
      Box(2.6, 0, 0, 0.6, 4.6, 0.6, '#5E6F7A'); Box(2.6, 4.6, 0, 11, 0.4, 0.5, '#5E6F7A');
      const tilt = easeInOut(seg(t, 6.2, 8.0));
      [[-2.2, 'TOO BIG TO FAIL', '#2B8A6E', 3.4, 3.4, 4.0], [7.4, 'TOO POWERFUL TO FIRE', '#D94E43', 6.4, 8.5, 6.8]].forEach(([px, nm, col, t0, tt0, w], i) => { if (t < t0) return; const yy = 2.6 - (i ? -1 : 1) * 0.0 + (i ? -0.8 * tilt : 0.8 * tilt) * 0.0; Box(px - 1.8, 3.2 + (i ? 0.7 : -0.7) * tilt * 0, 0, 3.6, 0.35, 2.2, col); Box(px - 1.0, 3.55, 0.3, 2.0, 1.6 * (i ? 1 + tilt * 0.4 : 1), 1.2, col === '#2B8A6E' ? '#76B900' : '#C42631');
        pop(nm, px, 7.4 + (i ? 0.0 : 0.0), 2.4, w, 1.0, '#0B1A22', '#F4F1EA', t0, 0, { kind: 'tag' }); });
      if (t >= 8.4) { pop('EITHER WAY', 2.6, 5.8, 4.8, 6.2, 1.4, '#D99B26', '#0B191E', 10.4, 0); }
    }

    // ===== S2 (10.4 - 23.2) the lesson: critical infrastructure for the US government; the CEO is never independent again =====
    if (t >= 10.3 && t < 23.8) {
      pop('UNMISTAKABLE LESSON', 26, 12.2, 2, 9.2, 1.1, '#0B1A22', '#F4F1EA', 10.6, 13.6);
      hqTower(22, -6, easeOut(seg(t, 11.8, 12.8)), 'NVIDIA');
      const wh = easeOut(seg(t, 13.6, 14.6)); if (wh > 0.03) { Box(38, 0, -5, 11 * wh, 3.2, 3.6, '#BDB398'); Box(38, 3.2, -5, 12 * wh, 0.5, 4, '#A89E84'); for (let i = 0; i < 5; i++) Cyl(33.4 + i * 2.3, 0, -3.1, 0.3, 3.2 * wh, '#F7F4EC'); }
      pop('CRITICAL INFRASTRUCTURE', 30, 9.8, 3, 9.8, 1.2, '#2C5BA8', '#F4F1EA', 14.0, 0, { kind: 'tag' });
      const ln = seg(t, 14.6, 16.4); if (ln > 0) for (let k = 0; k < 8 * ln; k++) { const u = k / 8; Box(lerp(25, 34, u) - 0.25, 5.2 - Math.sin(u * Math.PI) * 1.2, 1.4, 0.5, 0.5, 0.5, '#E2B857'); }
      Char('jensen', 27.4, 3.4, 2.6, { pose: t < 17.0 ? 'spr:explain' : 'spr:think', facing: 1, phase: 2 }, 11.0, 23.8, t);
      if (t >= 17.0) { const k = easeOut(seg(t, 17.0, 17.9)); Box(27.4, 3.6 * k, 4.0, 0.3, 0.3 + 0.3 * k, 0.3, '#C42631'); for (let i = 0; i < 6; i++) Box(26.0 + i * 0.5, 4.2 + 0.3 * Math.sin(i), 3.9, 0.35, 0.2, 0.2, '#C42631', { lw: 0 }); }
      pop('NEVER TRULY INDEPENDENT AGAIN', 28, 8.0, 5.2, 13.4, 1.6, '#D94E43', '#F4F1EA', 20.0, 0); if (t >= 20.0) hit(28, 8.0, 5.2, 20.1, PAL.coral, 340);
    }

    // ===== S3 (23.2 - 33) while Jensen fights for control on Earth, his biggest customer fights a $44B battle to put NVIDIA chips in space =====
    if (t >= 23.1) {
      Cyl(52, 0, 0, 9, 0.5, '#4C96C9'); Cyl(52, 0.5, 0, 6.2, 0.2, '#6FB36A', { a: 0.7 });
      pop('EARTH', 52, 3.0, 8, 5.0, 1.0, '#0B1A22', '#F4F1EA', 23.8, 0);
      Char('jensen', 47.6, 0.6, 2.2, { pose: 'spr:think', facing: 1, phase: 3 }, 23.5, 33.5, t);
      pop('FIGHTING FOR CONTROL ON EARTH', 50, 12.8, 3, 12.2, 1.1, '#0B1A22', '#E2B857', 24.0, 27.2);
      Char('elon', 56.2, 0.6, 2.4, { pose: 'spr:point', facing: -1, phase: 4 }, 26.2, 33.5, t);
      pop('HIS BIGGEST CUSTOMER', 56.2, 6.0, 4.4, 8.6, 1.0, '#0B1A22', '#F4F1EA', 26.4, 29.4);
      Card(53, 9.6, 1.5, 8.6, 2.2, { kind: 'counter', text: '$44 BILLION', sub: 'battle to launch chips into space', fg: '#F2D58F', accent: '#E2B857', scramble: 0.6, pulse: [29.8], t0: 29.0, t1: 0 }, t);
      for (let k = 0; k < 4; k++) { const t0 = 29.6 + k * 0.7; if (t < t0) continue; const u = seg(t, t0, t0 + 2.6); sat(46 + k * 3.2, 4 + 8.5 * u, 0.5); }
      if (t >= 29.4) { const rl = Math.pow(seg(t, 29.6, 32.6), 2); Box(60.6, 3.0 * rl, -1, 1.4, 5.0, 1.4, '#E0E4E8'); Box(60.6, 3.0 * rl + 5.0, -1, 1.0, 1.4, 1.0, '#76B900'); Box(60.6, 3.0 * rl - 0.8, -1, 1.8, 0.8, 1.8, '#E2B857', { emis: 0.6 }); }
      pop('LAUNCH TO SPACE', 53, 6.6, 5, 8.2, 1.2, '#2C5BA8', '#F4F1EA', 30.6, 0, { kind: 'tag' });
    }

    drawBG(0.05);
    GROUND.forEach(fn => fn());
    ITEMS.sort((a, b) => b.z - a.z).forEach(it => it.fn());
    OVER.forEach(fn => fn());
    HEADS.forEach(h => { const a = env(t, h[0], h[1], 0.3, 0.3); if (a > 0.01) drawShotBanner(h[2], h[3], a, h[4], t, h[0]); });
  }
