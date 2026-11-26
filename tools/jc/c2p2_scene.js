  const HEADS = [
    [4.0, 13.4, 'WHY IT STILL FELL', 'Worth trillions, selling chips is no longer enough', PAL.amberHi],
    [13.8, 24.4, 'THE LEADERSHIP FIX', 'It fixed leadership, not the three problems closing in', PAL.coral],
    [24.8, 34.0, 'THE FIRST WARNING SIGN', 'Not on the stock chart: in a partner\'s unpaid bills', PAL.cyan]
  ];
  // spoken-word times (tools/jc/wt.py "Act 2 part 2" ...): trillions 3.73, chips 7.00, enough 7.87, investors 9.27, uncomfortable 11.31, tuesday 12.47, fixed 15.67, leadership 16.49, three 19.44, money 20.30, government 21.09,
  // closing 22.27, first 25.26, stock 28.28, chart 28.64, unpaid 30.76, bills 31.26, closest 32.53, partner 33.04

  function renderShots(t) {
    const cv = evalCam(t);
    Cam3D.set([cv[0], cv[1], cv[2]], [cv[3], cv[4], cv[5]], cv[6], 0.01 * Math.sin(t * 0.6));
    GROUND = []; ITEMS = []; OVER = [];
    const hit = (x, y, z, ht, col, r) => { const p = S(x, y, z); if (p) OVER.push(() => hitFx(p.x, p.y, t, ht, { color: col, r: r || 240, rays: 14 })); };
    const pop = (txt, x, y, z, w, h, bg, fg, t0, t1, o) => Card(x, y, z, w, h, Object.assign({ kind: /^#(D94E43|2B8A6E|D99B26)$/i.test(bg) ? 'stamp' : 'tag', text: txt, bg, fg, accent: /^#(0B1A22|0B191E)$/i.test(bg) ? '#E2B857' : fg, t0, t1: t1 || 0 }, o || {}), t);
    const trk = (keys, d) => RigKit.track(t, keys, d);
    for (let k = 0; k < 5; k++) pad(-42 + k * 26, -12, -12 + k * 26, 14, ['#B9C7CE', '#A9B8C2', '#C9B9A9', '#A9AEC4', '#B9BFC9'][k % 5]);

    // ===== S0 (0 - 3.9) CONNECTION: the last picture of Act 2 part 1 (sales and profit beat, the stock still fell) stays on screen: "Why? Because when a company is already worth" =====
    if (t < 4.6) {
      Box(-26, 0, -2.4, 20, 7.0, 0.6, '#6B7F8F');
      Card(-26, 7.2, 1.6, 10.8, 7.2, { kind: 'paint', rot: 0.015, t0: -30, t1: 0, paint: (g, pw, ph) => paperBars(g, pw, ph, [
        { label: 'SALES', col: '#1F9D6B', keys: [[-30, 0.72, 0.1]], text: [[-29, 'BEAT']] }, { label: 'PROFIT', col: '#1F9D6B', keys: [[-30, 0.8, 0.1]], text: [[-29, 'BEAT']] },
        { label: 'STOCK', col: '#D64545', keys: [[-30, 0.42, 0.1]], text: [[-29, 'STILL FELL']] }], t, 'EXPECTATIONS vs THE STOCK', { sub: 'good news, bad reaction', y: [[0, ''], [1, '']] }) }, t);
      Char('jensen', -16.0, 2.8, 2.6, Object.assign({ facing: -1, phase: 1 }, trk([[0, 'spr:shrug']])), 0, 4.6, t);
      Char('trader', -36.4, 2.8, 2.4, Object.assign({ facing: 1, phase: 2 }, trk([[0, 'panic']])), 0, 4.6, t);
    }

    // ===== S1 (3.9 - 13.4) already worth trillions (3.73), selling lots of chips isn't enough anymore (7.87); big investors realize something uncomfortable (11.31) on Tuesday morning (12.47) =====
    if (t >= 3.6 && t < 14.0) {
      hqTower(-6.4, -2, 0.62, 'NVIDIA');
      Card(-6.4, 12.6, 1.6, 8.8, 3.0, { kind: 'counter', text: 'WORTH TRILLIONS', sub: 'already', fg: '#F2D58F', accent: '#E2B857', t0: 3.73, t1: 0, pulse: [4.0] }, t);
      Card(7.0, 6.9, 1.6, 11.4, 8.8, { kind: 'paint', rot: -0.01, t0: 6.2, t1: 0, paint: (g, pw, ph) => { const A = paperSheet(g, pw, ph, 'IS SELLING CHIPS ENOUGH?', 'for a company worth trillions'), k = 0.075 * 0.24 * pw / ph, base = 0.83; cashArt(g, pw, ph, [{ k: 'stack', x: 0.3, y: base, s: 0.24, n: 5, t0: 7.0 }, { k: 'stack', x: 0.7, y: base, s: 0.24, n: 14, t0: 7.4 }], t);
        g.fillStyle = '#17252B'; g.font = '900 ' + ph * 0.05 + 'px' + FAM; g.textAlign = 'center'; g.textBaseline = 'top'; if (t >= 7.0) g.fillText('CHIP SALES', pw * 0.3, ph * 0.85); if (t >= 7.4) g.fillText('WHAT INVESTORS WANT', pw * 0.7, ph * 0.85);
        refLine(g, pw, ph, base - 14 * k, '', '#B8860B', seg(t, 7.6, 8.4)); if (t >= 7.87) pill(g, pw * 0.3, ph * (base - 5 * k) - ph * 0.1, 'NOT ENOUGH', '#D64545', ph, easeOut(seg(t, 7.87, 8.3))); } }, t);
      Char('jensen', -2.0, 3.4, 2.6, Object.assign({ facing: 1, phase: 1 }, trk([[0, 'spr:cross'], [7.87, 'spr:think']])), 3.6, 14.0, t);
      Char('bondholder', 13.0, 3.0, 2.3, Object.assign({ facing: -1, phase: 0 }, trk([[0, 'cross'], [9.27, 'think'], [11.31, 'panic']])), 7.0, 14.0, t);
      Char('trader', -11.6, 3.0, 2.3, Object.assign({ facing: 1, phase: 1 }, trk([[0, 'cross'], [9.4, 'think'], [11.31, 'panic']])), 7.0, 14.0, t);
      pop('TUESDAY MORNING', 4.5, 13.6, 3, 9.2, 1.2, '#D99B26', '#0B191E', 12.47, 0); if (t >= 12.47 && t < 13.0) hit(4.5, 13.6, 3, 12.5, PAL.amberHi, 240);
    }

    // ===== S2 (13.7 - 24.4) Bringing Jensen back fixed the leadership problem (15.67); it did not fix the three huge money (20.30) and government (21.09) problems closing in (22.27) =====
    if (t >= 13.6 && t < 25.0) {
      Box(26, 0, -2.4, 22, 7.0, 0.6, '#6B7F8F');
      Char('jensen', 27.0, 1.2, 2.8, Object.assign({ facing: 1, phase: 2 }, trk([[0, 'spr:thumbs'], [19.44, 'spr:overwhelmed']])), 13.7, 25.0, t);
      Char('board', 21.0, 1.6, 2.4, Object.assign({ facing: 1, phase: 1 }, trk([[0, 'cross'], [15.67, 'cheer'], [19.44, 'panic']])), 14.0, 25.0, t);
      pop('LEADERSHIP FIXED', 27.0, 11.6, 3, 10.0, 1.2, '#2B8A6E', '#F4F1EA', 15.67, 0); if (t >= 15.67 && t < 16.2) hit(27.0, 11.6, 3, 15.7, PAL.sageHi, 240);
      [[0, 'DEBT', '#D99B26', '#0B191E', 19.44, 5.4], [1, 'RATES', '#D94E43', '#F4F1EA', 20.3, 7.0], [2, 'GOVERNMENT', '#2C5BA8', '#F4F1EA', 21.09, 8.6]].forEach(([i, lab, bg, fg, t0, h]) => {
        const u = easeOut(seg(t, t0 - 0.3, t0 + 0.7)), cl = easeInOut(seg(t, 22.27, 24.0)), bx = lerp(46 + i * 3.4, 34.0 + i * 3.4 - 2.6 * cl, u);
        if (u > 0.02) { Box(bx - 1.3, 0, 0.2, 2.8, h * u, 2.4, bg); if (t >= t0) pop(lab, bx, h + 1.9, 3, lab.length > 6 ? 7.4 : 5.4, 1.2, bg, fg, t0, 0); }
      });
    }

    // ===== S3 (24.6 - 34.1) the first warning sign didn't show up on the stock chart (28.28), it showed up in the unpaid bills (30.76) of NVIDIA's closest partner (32.53) =====
    if (t >= 24.5) {
      Card(42.0, 6.4, 1.2, 8.2, 5.4, { kind: 'paint', rot: -0.02, t0: 25.2, t1: 0, paint: (g, pw, ph) => stepChart(g, pw, ph, [[25.2, 0.5], [27.4, 0.47, 2.0], [31.5, 0.5, 3.0]], t, 'NVIDIA STOCK', [[28.64, 'NO WARNING', '#1F9D6B']], { sub: 'the chart looks calm' }) }, t);
      for (let k = 0; k < 4; k++) { const t0 = 30.5 + k * 0.28, u = easeOut(seg(t, t0, t0 + 0.4)); if (u > 0.02) { Box(53.0 + (k % 2) * 0.5, 0.2 + k * 0.45, 1.8 - k * 0.1, 4.2, 0.35, 3.0, '#F4F1EA'); Box(53.2 + (k % 2) * 0.5, 0.56 + k * 0.45, 1.8 - k * 0.1, 3.0 * u, 0.04, 0.4, '#D64545', { lw: 0 }); } }
      pop('UNPAID BILLS', 55.0, 4.2, 3, 7.0, 1.1, '#D94E43', '#F4F1EA', 30.76, 0); if (t >= 30.76 && t < 31.3) hit(55.0, 4.2, 3, 30.8, PAL.coral, 240);
      hqTower(65.0, -4, easeOut(seg(t, 32.2, 33.4)) * 0.45, 'PARTNER'); if (t >= 32.53 && t < 33.1) hit(65.0, 5.0, 2, 32.58, PAL.amberHi, 240);
      Char('banker', 38.4, 3.0, 2.5, Object.assign({ facing: 1, phase: 1 }, trk([[0, 'think'], [28.28, 'point']])), 24.6, 34.6, t);
      Char('trader', 58.0, 3.2, 2.4, Object.assign({ facing: 1, phase: 2 }, trk([[0, 'cross'], [30.76, 'panic']])), 24.8, 34.6, t);
    }

    drawBG(0.05);
    GROUND.forEach(fn => fn());
    ITEMS.sort((a, b) => b.z - a.z).forEach(it => it.fn());
    OVER.forEach(fn => fn());
    HEADS.forEach(h => { const a = env(t, h[0], h[1], 0.3, 0.3); if (a > 0.01) drawShotBanner(h[2], h[3], a, h[4], t, h[0]); });
  }
