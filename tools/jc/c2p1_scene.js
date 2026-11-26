  const HEADS = [
    [5.4, 15.4, 'THE FALL BEFORE THE BOUNCE', 'Down more than 47% from the October high to Jensen\'s exit', PAL.coral],
    [15.6, 23.8, 'STILL BELOW THE PEAK', 'Even after +31.5%, more than 30% under the record high', PAL.amberHi],
    [24.2, 35.8, 'THE BASIC MATH', 'A $100 stock that falls to $53 only gets back to about $70', PAL.cyan],
    [36.0, 45.2, 'EVEN GOOD NEWS DIDN\'T HOLD IT', 'Sales and profit beat expectations, yet the stock couldn\'t stay up', PAL.coral]
  ];
  // spoken-word times (tools/jc/wt.py "Act 2 part 1" ...): hidden 1.22, math 3.63, october 6.78, exit 8.76, 47% 13.16, half 14.67, 31.5% 17.79, 30% 22.17, record 23.03, $100 25.97, $53 28.61, 31% 29.98, $70 33.11, way below ~34.1, sales 38.80, profit 39.58, couldn't 43.87

  function renderShots(t) {
    const cv = evalCam(t);
    Cam3D.set([cv[0], cv[1], cv[2]], [cv[3], cv[4], cv[5]], cv[6], 0.01 * Math.sin(t * 0.6));
    GROUND = []; ITEMS = []; OVER = [];
    const hit = (x, y, z, ht, col, r) => { const p = S(x, y, z); if (p) OVER.push(() => hitFx(p.x, p.y, t, ht, { color: col, r: r || 240, rays: 14 })); };
    const pop = (txt, x, y, z, w, h, bg, fg, t0, t1, o) => Card(x, y, z, w, h, Object.assign({ kind: /^#(D94E43|2B8A6E|D99B26)$/i.test(bg) ? 'stamp' : 'tag', text: txt, bg, fg, accent: /^#(0B1A22|0B191E)$/i.test(bg) ? '#E2B857' : fg, t0, t1: t1 || 0 }, o || {}), t);
    const trk = (keys, d) => RigKit.track(t, keys, d);
    const num = (txt, sub, x, y, t0, col) => Card(x, y, 1.6, 4.6, 2.6, { kind: 'counter', text: txt, sub, fg: col || '#F2D58F', accent: col || '#E2B857', t0, t1: 0, pulse: [t0 + 0.3] }, t);
    for (let k = 0; k < 6; k++) pad(-42 + k * 26, -12, -12 + k * 26, 14, ['#B9C7CE', '#A9B8C2', '#C9B9A9', '#A9AEC4', '#B9BFC9'][k % 5]);

    // ===== S0 (0 - 5.3) CONNECTION: the last picture of Act 1 part 2 (money trail into "THE SIMPLE MATH") stays while the narrator says "look at the basic math behind Monday's big jump" =====
    if (t < 5.6) {
      Box(-26, 0, -2.4, 18, 7.0, 0.6, '#6B7F8F');
      Card(-21.6, 7.6, 1.6, 7.6, 4.4, { kind: 'doc', tag: 'MONDAY MORNING', accent: '#2C5BA8', head: 'THE SIMPLE MATH', typeHead: true, type: true, cps: 16, lines: ['What most people missed', 'Before the jump'], lineAt: [-28, -27], hl: -1, t0: -30, t1: 0 }, t);
      for (let k = 0; k < 6; k++) { const q = (t * 0.7 + k / 6) % 1; coin(lerp(-33, -25, q), 2.4 + Math.sin(q * Math.PI) * 1.8, 3.2, 1); }
      Line3([-33, 2.2, 3.2], [-24.6, 2.2, 3.2], '#E2B857', 10, 1);
      Char('banker', -33.4, 2.8, 2.5, Object.assign({ facing: 1, phase: 1 }, trk([[0, 'think']])), 0, 5.6, t);
      Char('trader', -26.6, 2.8, 2.5, Object.assign({ facing: 1, phase: 2 }, trk([[0, 'hold']])), 0, 5.6, t);
      if (t >= 3.63 && t < 4.2) hit(-21.6, 7.6, 2, 3.66, PAL.cyan, 260);
    }

    // ===== S1 (5.3 - 15.5) Between its October high (6.78) and Jensen's exit (8.76) in November, NVIDIA had fallen more than 47% (13.16), nearly cut in half (14.67) =====
    if (t >= 5.2 && t < 16.0) {
      Card(0, 7.2, 1.6, 12.6, 8.8, { kind: 'paint', rot: -0.01, t0: 5.6, t1: 0, paint: (g, pw, ph) => { const A = paperSheet(g, pw, ph, 'NVIDIA STOCK', 'October high = 100'), k = 0.075 * 0.28 * pw / ph, f = easeInOut(seg(t, 8.9, 12.6)), n = 14 - 6.6 * f, base = 0.83;
        refLine(g, pw, ph, base - 14 * k, 'OCTOBER HIGH', '#B8860B', seg(t, 6.78, 7.4)); cashArt(g, pw, ph, [{ k: 'stack', x: 0.32, y: base, s: 0.28, n: 14, t0: 6.4 }, { k: 'stack', x: 0.7, y: base, s: 0.28, n, t0: 8.0 }], t); cashBurst(g, pw, ph, 0.7, 0.5, t, 9.4, 8);
        g.fillStyle = '#17252B'; g.font = '900 ' + ph * 0.05 + 'px' + FAM; g.textAlign = 'center'; g.textBaseline = 'top'; g.fillText('OCTOBER', pw * 0.32, ph * 0.85); if (t >= 8.0) g.fillText('NOVEMBER', pw * 0.7, ph * 0.85);
        if (t >= 13.16) pill(g, pw * 0.7, ph * (base - n * k) - ph * 0.1, '-47%', '#D64545', ph, easeOut(seg(t, 13.16, 13.5))); refLine(g, pw, ph, base - 7 * k, 'HALF', '#2B8A6E', seg(t, 14.67, 15.3)); } }, t);
      if (t >= 14.67) { pop('NEARLY CUT IN HALF', 0, 1.2, 4.6, 10.2, 1.2, '#D99B26', '#0B191E', 14.67, 0); }
      Char('jensen', lerp(8.2, 14.4, easeInOut(seg(t, 8.76, 11.4))), 2.6, 2.6, Object.assign({ facing: 1, phase: 1 }, trk([[0, 'spr:cross'], [8.76, 'spr:walk']])), 5.4, 16.0, t);
      Char('trader', -9.4, 3.0, 2.3, Object.assign({ facing: 1, phase: 0 }, trk([[0, 'cross'], [9.6, 'panic']])), 5.6, 16.0, t);
    }

    // ===== S2 (15.5 - 23.8) Even after jumping 31.5% on Monday (17.79), the stock was still more than 30% (22.17) below its record high (23.03) =====
    if (t >= 15.4 && t < 24.4) {
      Card(26, 7.2, 1.6, 18.0, 9.6, { kind: 'paint', t0: 15.6, t1: 0, paint: (g, pw, ph) => cashChart(g, pw, ph, { keys: [[15.8, 0.76], [17.79, 0.5, 0.45], [24.2, 0.5]], title: 'NVIDIA STOCK', tags: [[17.95, '+31.5%'], [22.17, '-30%+ BELOW', '#D64545']], opt: { sub: 'Monday jump vs the record high', refs: [{ y: 0.1, t0: 23.03, label: 'RECORD HIGH', col: '#B8860B' }] }, n0: 2, n1: 14, ghost: 13, t0: 15.8, bursts: [] }, t) }, t);
      Char('jensen', 21.0, 2.8, 2.5, Object.assign({ facing: 1, phase: 1 }, trk([[0, 'spr:cheer'], [19.8, 'spr:think']])), 15.6, 24.4, t);
      Char('trader', 31.2, 2.8, 2.4, Object.assign({ facing: -1, phase: 2 }, trk([[0, 'cheer'], [19.8, 'panic']])), 15.8, 24.4, t);
    }

    // ===== S3 (24 - 36) If a $100 stock drops to $53 (28.61), a 31% bounce (29.98) only brings it back to about $70 (33.11): still way below where you started (~34.1) =====
    if (t >= 24.0 && t < 36.6) {
      Card(52, 7.2, 1.6, 14.0, 9.4, { kind: 'paint', rot: -0.01, t0: 24.4, t1: 0, paint: (g, pw, ph) => { const A = paperSheet(g, pw, ph, 'ONE $100 STOCK', 'a 31% bounce is not a full recovery'), k = 0.075 * 0.2 * pw / ph, d = easeInOut(seg(t, 27.4, 28.6)), u = easeInOut(seg(t, 30.0, 33.1)), n2 = 14 - 6.6 * d, n3 = 7.4 + 2.4 * u, base = 0.83;
        refLine(g, pw, ph, base - 14 * k, '', '#B8860B', seg(t, 26.2, 26.9)); cashArt(g, pw, ph, [{ k: 'stack', x: 0.28, y: base, s: 0.2, n: 14, t0: 25.8 }, { k: 'stack', x: 0.55, y: base, s: 0.2, n: n2, t0: 27.0 }, { k: 'stack', x: 0.82, y: base, s: 0.2, n: n3, t0: 29.9 }], t); cashBurst(g, pw, ph, 0.55, 0.5, t, 27.4, 7);
        g.fillStyle = '#17252B'; g.font = '900 ' + ph * 0.045 + 'px' + FAM; g.textAlign = 'center'; g.textBaseline = 'top'; g.fillText('START', pw * 0.28, ph * 0.85); if (t >= 27.0) g.fillText('AFTER THE DROP', pw * 0.55, ph * 0.85); if (t >= 29.9) g.fillText('AFTER +31%', pw * 0.82, ph * 0.85);
        if (t >= 25.97) pill(g, pw * 0.28, ph * (base - 14 * k) - ph * 0.1, '$100', '#17252B', ph, easeOut(seg(t, 25.97, 26.3))); if (t >= 28.61) pill(g, pw * 0.55, ph * (base - n2 * k) - ph * 0.1, '$53', '#D64545', ph, easeOut(seg(t, 28.61, 28.95))); if (t >= 33.11) pill(g, pw * 0.82, ph * (base - n3 * k) - ph * 0.1, '$70', '#1F9D6B', ph, easeOut(seg(t, 33.11, 33.45))); } }, t);
      if (t >= 34.1) { pop('STILL BELOW', 52, 12.4, 4, 8.4, 1.2, '#D94E43', '#F4F1EA', 34.1, 0); if (t < 34.6) hit(52, 9.6, 3.4, 34.15, PAL.coral, 240); }
      Char('banker', 43.4, 2.8, 2.5, Object.assign({ facing: 1, phase: 1 }, trk([[0, 'think'], [25.9, 'present'], [33.1, 'cross']])), 24.0, 36.6, t);
      Char('trader', 61.0, 2.8, 2.4, Object.assign({ facing: -1, phase: 2 }, trk([[0, 'cross'], [28.6, 'panic'], [34.1, 'shrug']])), 24.2, 36.6, t);
    }

    // ===== S4 (36 - 45.3) Even worse, the latest sales (38.80) and profit (39.58) beat expectations (41.54), yet the stock still couldn't stay up (43.87) =====
    if (t >= 35.9) {
      Box(78, 0, -2.4, 20, 7.0, 0.6, '#6B7F8F');
      Card(78, 7.2, 1.6, 10.8, 7.2, { kind: 'paint', rot: 0.015, t0: 36.4, t1: 0, paint: (g, pw, ph) => paperBars(g, pw, ph, [
        { label: 'SALES', col: '#1F9D6B', keys: [[38.8, 0.72, 0.7]], text: [[39.2, 'BEAT']] },
        { label: 'PROFIT', col: '#1F9D6B', keys: [[39.58, 0.8, 0.7]], text: [[40.0, 'BEAT']] },
        { label: 'STOCK', col: '#D64545', keys: [[41.6, 0.8, 0.4], [42.4, 0.42, 1.8]], text: [[43.87, 'STILL FELL']] }], t, 'EXPECTATIONS vs THE STOCK', { sub: 'good news, bad reaction', y: [[0, ''], [1, '']] }) }, t);
      Char('jensen', 88.0, 2.8, 2.6, Object.assign({ facing: -1, phase: 1 }, trk([[0, 'spr:cross'], [42.4, 'spr:shrug']])), 36.0, 46, t);
      Char('trader', 67.6, 2.8, 2.4, Object.assign({ facing: 1, phase: 2 }, trk([[0, 'cross'], [38.8, 'tablet'], [43.87, 'panic']])), 36.0, 46, t);
    }

    drawBG(0.05);
    GROUND.forEach(fn => fn());
    ITEMS.sort((a, b) => b.z - a.z).forEach(it => it.fn());
    OVER.forEach(fn => fn());
    HEADS.forEach(h => { const a = env(t, h[0], h[1], 0.3, 0.3); if (a > 0.01) drawShotBanner(h[2], h[3], a, h[4], t, h[0]); });
  }
