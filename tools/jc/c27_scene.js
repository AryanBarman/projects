  const HEADS = [
    [0.2, 6.2, 'THE 2027 CASH CRUNCH', 'Elon Musk warns AI companies', PAL.coral],
    [6.9, 11.4, 'IT IS NOT THE CHIPS', 'Everyone thinks chips are the bottleneck', PAL.amberHi],
    [11.9, 17.2, 'TENS OF BILLIONS UP FRONT', 'Paid today for GPU clusters', PAL.sageHi],
    [17.3, 21.6, 'WEEKS VS YEARS', 'Racks ship fast. Power plants do not', PAL.cyan],
    [22.0, 31.4, 'DARK DATA CENTERS', 'Burning cash every month, zero revenue', PAL.coral],
    [31.6, 38.2, 'THE COST OF DELAY', 'Hundreds of billions in working capital', PAL.coral]
  ];
  // PORTRAIT SHORT (9:16) in the crash style: mix of families, ONE hero at a time, verbs shown. Spoken-word times (WT_DIR=shorts2/audio python tools/jc/wt.py s2027 ...): warned 0.90, crunch 5.00, 2027 5.65, bottleneck 7.69, chips 9.45, backwards 10.45,
  // tens 13.16, billions 13.58, gpu 14.79, weeks 17.92, power 19.13, years 20.87, dark 24.56, burning 24.90, month 26.36, zero 27.66, revenue 28.02, hundreds 33.86, working 35.27, capital 35.60, companies 38.4
  function renderShots(t) {
    const cv = evalCam(t);
    Cam3D.set([cv[0], cv[1], cv[2]], [cv[3], cv[4], cv[5]], cv[6], 0.01 * Math.sin(t * 0.6));
    GROUND = []; ITEMS = []; OVER = [];
    const hit = (x, y, z, ht, col, r) => { const p = S(x, y, z); if (p) OVER.push(() => hitFx(p.x, p.y, t, ht, { color: col, r: r || 240, rays: 14 })); };
    const trk = (keys, d) => RigKit.track(t, keys, d);
    const tag = (cx, y, w, h, t0, fn) => Card(cx, y, 1.8, w, h, { kind: 'paint', t0, t1: 0, paint: (g, pw, ph) => { const q = seg(t, t0, t0 + 0.4); g.save(); g.translate(pw / 2, ph / 2); g.scale(0.7 + 0.3 * q, 0.7 + 0.3 * q); g.globalAlpha = q; g.translate(-pw / 2, -ph / 2); fn(g, pw, ph); g.restore(); } }, t);
    const pillTag = (cx, y, w, h, t0, txt, ico, col) => tag(cx, y, w, h, t0, (g, pw, ph) => { rrect(g, pw * 0.04, ph * 0.08, pw * 0.92, ph * 0.84, ph * 0.2); g.fillStyle = col || '#17252B'; g.fill(); let x0 = pw * 0.5; if (ico) { bdIcon(g, ico, pw * 0.17, ph * 0.5, ph * 0.3, '#FFFFFF'); x0 = pw * 0.6; } g.fillStyle = '#F2D58F'; g.textAlign = 'center'; g.textBaseline = 'middle'; g.font = '900 ' + Math.min(ph * 0.4, pw * (ico ? 0.6 : 0.88) / (txt.length * 0.62)) + 'px' + FAM; g.fillText(txt, x0, ph * 0.52); });
    for (let k = 0; k < 7; k++) pad(-30 + k * 26, -12, -4 + k * 26, 14, ['#B9C7CE', '#A9B8C2', '#C9B9A9', '#A9AEC4', '#B9BFC9'][k % 5]);

    // ===== S1 (0 - 6.2, and the loop 38.4 - 39.3) 2D CASH ART + HQ CHARACTERS: Elon WARNS (0.90); the AI companies' cash pile (stack of bills + money bags) is CRUNCHED (5.00): two steel plates close in, the stack is squeezed and bills burst out; the "2027" tag lands (5.65) =====
    if (t < 6.5 || t >= 38.3) {
      const C = 0, lo = t >= 38.3 ? 38.3 : 0, hi = t >= 38.3 ? 39.6 : 6.8, plate = (g, x, w, ph) => { const gr = g.createLinearGradient(x, 0, x + w, 0); gr.addColorStop(0, '#8FA0AE'); gr.addColorStop(1, '#5B6B78'); g.fillStyle = gr; g.strokeStyle = '#2E3A44'; g.lineWidth = ph * 0.012; rrect(g, x, ph * 0.06, w, ph * 0.86, ph * 0.02); g.fill(); g.stroke(); g.fillStyle = '#C9D3DA'; for (let r = 0; r < 4; r++) { g.beginPath(); g.arc(x + w * 0.5, ph * (0.16 + r * 0.22), ph * 0.012, 0, 7); g.fill(); } };
      Card(C, 6.8, 1.2, 8.2, 7.4, { kind: 'paint', t0: -9, t1: 0, paint: (g, pw, ph) => { const cr = t >= 38.3 ? 0 : easeInOut(seg(t, 5.0, 5.9)), sq = 1 - 0.3 * cr;
        cashArt(g, pw, ph, [{ k: 'bag', x: 0.2, y: 0.88, s: 0.27, t0: lo + 0.1, sx: sq }, { k: 'bag', x: 0.8, y: 0.88, s: 0.27, t0: lo + 0.2, sx: sq }, { k: 'stack', x: 0.46, y: 0.88, s: 0.3, n: 12, t0: lo, sx: sq }], t);
        if (cr > 0.01) { const L = lerp(-0.12, 0.2, cr) * pw, R = lerp(1.12, 0.8, cr) * pw; plate(g, L - pw * 0.3, pw * 0.3, ph); plate(g, R, pw * 0.3, ph); }
        const tt = t - 5.55; if (tt > 0 && t < 38) for (let k = 0; k < 9; k++) { const vx = (k - 4) * pw * 0.09, vy = ph * (0.5 + 0.12 * ((k * 5) % 3)); cashBill(g, pw * 0.5 + vx * tt * 1.3, ph * 0.5 - vy * tt + ph * 1.6 * tt * tt, pw * 0.13, pw * 0.07, tt * (k % 2 ? 4 : -4), Math.max(0, 1 - tt / 1.2)); } } }, t);
      Char('elon', C - 6.7, 3.8, 3.7, Object.assign({ facing: 1, phase: 1 }, trk([[0, 'cross'], [lo + 0.9, 'point'], [lo + 5.0, 'shrug']])), lo, hi, t);
      Char('trader', C + 6.8, 3.8, 3.1, Object.assign({ facing: -1, phase: 2 }, trk([[0, 'cross'], [lo + 3.0, 'think'], [lo + 5.0, 'panic']])), lo, hi, t);
      if (t >= 5.65 && t < 6.9) pillTag(C, 12.0, 7.0, 2.6, 5.65, '2027', 'cal', '#B8412F');
    }

    // ===== S2 (6.9 - 11.4) PAPER CARD + CROWD: everyone thinks CHIPS (9.45) are the BOTTLENECK (7.69) ... BACKWARDS (10.45): the card shows chips; a red cross strikes it; the crowd shrugs =====
    if (t >= 6.8 && t < 11.9) {
      const C = 26; Card(C, 7.6, 1.2, 13.0, 9.6, { kind: 'paint', rot: -0.02, t0: 7.0, t1: 0, paint: (g, pw, ph) => { const m = pw * 0.04, u = seg(t, 7.69, 8.2), x = seg(t, 10.45, 10.85); g.save(); g.shadowColor = 'rgba(11,25,30,0.35)'; g.shadowBlur = pw * 0.04; g.shadowOffsetY = pw * 0.015; rrect(g, m, m, pw - 2 * m, ph - 2 * m, ph * 0.03); g.fillStyle = '#FBF8EF'; g.fill(); g.restore();
        g.fillStyle = '#17252B'; g.textAlign = 'center'; g.textBaseline = 'middle'; g.font = '900 ' + ph * 0.075 + 'px' + FAM; g.globalAlpha = u; g.fillText('THE BOTTLENECK?', pw / 2, ph * 0.12); bdIcon(g, 'chip', pw / 2, ph * 0.5, pw * 0.2); g.font = '900 ' + ph * 0.09 + 'px' + FAM; g.fillText('NVIDIA CHIPS', pw / 2, ph * 0.84); g.globalAlpha = 1;
        if (x > 0) { g.strokeStyle = '#D64545'; g.lineWidth = ph * 0.05; g.lineCap = 'round'; g.beginPath(); g.moveTo(pw * 0.2, ph * 0.2); g.lineTo(pw * (0.2 + 0.6 * x), ph * (0.2 + 0.62 * x)); g.stroke(); g.beginPath(); g.moveTo(pw * 0.8, ph * 0.2); g.lineTo(pw * (0.8 - 0.6 * x), ph * (0.2 + 0.62 * x)); g.stroke(); } } }, t);
      [[C - 5.0, 'employee'], [C, 'engineer'], [C + 5.0, 'banker']].forEach(([x, r], i) => Char(r, x, 4.0, 3.2, Object.assign({ facing: i === 2 ? -1 : 1, phase: i }, trk([[0, 'cross'], [7.69, 'point'], [10.45, 'shrug']])), 6.9, 11.9, t));
    }

    // ===== S3 (11.9 - 17.2) 2D (large, phone-readable): tech giants pay TENS (13.16) of BILLIONS (13.58) UP FRONT for GPU (14.79) clusters: a company building on the left, a rack of GPUs on the right, a thick arrow with money bags travelling to the racks, which then light up =====
    if (t >= 11.8 && t < 17.7) {
      const C = 52; Card(C, 8.2, 1.2, 12.6, 10.4, { kind: 'paint', t0: 12.0, t1: 0, paint: (g, pw, ph) => { const m = pw * 0.03; g.save(); g.shadowColor = 'rgba(11,25,30,0.35)'; g.shadowBlur = pw * 0.04; g.shadowOffsetY = pw * 0.015; rrect(g, m, m, pw - 2 * m, ph - 2 * m, ph * 0.03); g.fillStyle = '#FBF8EF'; g.fill(); g.restore();
        const u1 = seg(t, 12.2, 12.7), u2 = seg(t, 14.4, 14.9), ar = seg(t, 13.16, 13.9), lit = seg(t, 14.79, 16.2); g.save(); g.globalAlpha = u1; g.translate(pw * 0.2, ph * 0.68); bdIcon(g, 'company', 0, -ph * 0.1, ph * 0.2); g.fillStyle = '#17252B'; g.textAlign = 'center'; g.font = '900 ' + ph * 0.075 + 'px' + FAM; g.fillText('BIG TECH', 0, ph * 0.22); g.restore();
        g.save(); g.globalAlpha = u2; rackArt(g, pw * 0.7, ph * 0.74, pw * 0.14, ph * 0.5, lit, t); rackArt(g, pw * 0.84, ph * 0.74, pw * 0.1, ph * 0.4, lit, t + 1); g.fillStyle = '#17252B'; g.textAlign = 'center'; g.font = '900 ' + ph * 0.06 + 'px' + FAM; g.fillText('GPU CLUSTERS', pw * 0.76, ph * 0.9); g.restore();
        if (ar > 0) { const x0 = pw * 0.33, x1 = pw * 0.64, y = ph * 0.52; g.strokeStyle = '#B8860B'; g.lineWidth = ph * 0.045; g.lineCap = 'round'; g.beginPath(); g.moveTo(x0, y); g.lineTo(lerp(x0, x1, ar), y); g.stroke(); if (ar > 0.95) { g.fillStyle = '#B8860B'; g.beginPath(); g.moveTo(x1 + ph * 0.07, y); g.lineTo(x1 - ph * 0.02, y - ph * 0.07); g.lineTo(x1 - ph * 0.02, y + ph * 0.07); g.closePath(); g.fill(); } for (let k = 0; k < 2; k++) { const q = ((t - 13.9) * 0.55 + k * 0.5) % 1; if (t > 13.9) cashBag(g, lerp(x0, x1 - ph * 0.04, q), y - ph * 0.045, ph * 0.12); } }
        g.fillStyle = '#17252B'; g.textAlign = 'center'; g.font = '900 ' + ph * 0.085 + 'px' + FAM; g.globalAlpha = seg(t, 13.16, 13.6); g.fillText('TENS OF BILLIONS', pw * 0.5, ph * 0.12); g.font = '800 ' + ph * 0.06 + 'px' + FAM; g.fillStyle = '#B8412F'; g.fillText('PAID UP FRONT', pw * 0.5, ph * 0.2); } }, t);
      Char('banker', C - 5.4, 3.8, 3.3, Object.assign({ facing: 1, phase: 1 }, trk([[0, 'think'], [13.16, 'point']])), 11.9, 17.7, t);
    }

    // ===== S4 (17.2 - 22.1) 2D with depth: a server rack ships in WEEKS (17.92): it slides in and lights up within a second or two; building the POWER (19.13) plant takes YEARS (20.87): the cooling towers and the crane rise slowly while calendar pages tick by =====
    if (t >= 17.1 && t < 22.1) {
      const C = 78; Card(C, 8.2, 1.2, 12.8, 9.6, { kind: 'paint', t0: 17.2, t1: 0, paint: (g, pw, ph) => { const m = pw * 0.03; g.save(); g.shadowColor = 'rgba(11,25,30,0.35)'; g.shadowBlur = pw * 0.04; g.shadowOffsetY = pw * 0.015; rrect(g, m, m, pw - 2 * m, ph - 2 * m, ph * 0.03); g.fillStyle = '#EAF2F6'; g.fill(); g.restore(); g.fillStyle = '#C9D5DC'; g.fillRect(m, ph * 0.76, pw - 2 * m, ph * 0.2);
        const sl = easeOut(seg(t, 17.4, 18.2)), lit = seg(t, 18.4, 19.2), rx = lerp(-pw * 0.2, pw * 0.2, sl); g.save(); g.globalAlpha = Math.min(1, sl * 2); rackArt(g, rx, ph * 0.8, pw * 0.2, ph * 0.52, lit, t); if (sl < 1) { g.strokeStyle = 'rgba(23,37,43,0.35)'; g.lineWidth = ph * 0.01; for (let k = 0; k < 4; k++) { g.beginPath(); g.moveTo(rx - pw * 0.14 - k * pw * 0.04, ph * (0.35 + k * 0.1)); g.lineTo(rx - pw * 0.2 - k * pw * 0.04, ph * (0.35 + k * 0.1)); g.stroke(); } } g.restore();
        plantArt(g, pw * 0.58, ph * 0.84, pw * 0.3, 0.97 * easeInOut(seg(t, 19.13, 24.2)), t);
        const wk = seg(t, 17.92, 18.3), yr = seg(t, 20.87, 21.3); g.textAlign = 'center'; g.font = '900 ' + ph * 0.1 + 'px' + FAM; g.fillStyle = '#2B8A6E'; g.globalAlpha = wk; g.fillText('WEEKS', pw * 0.2, ph * 0.15); g.fillStyle = '#B8412F'; g.globalAlpha = yr; g.fillText('YEARS', pw * 0.66, ph * 0.15); g.globalAlpha = 1;
        const nc = Math.floor(seg(t, 19.13, 22.0) * 10); for (let k = 0; k < nc; k++) bdIcon(g, 'cal', pw * 0.34 + k * pw * 0.06, ph * 0.93, ph * 0.035); } }, t);
      Char('engineer', C - 5.6, 3.8, 3.3, Object.assign({ facing: 1, phase: 1 }, trk([[0, 'cross'], [17.92, 'cheer'], [20.87, 'think']])), 17.2, 22.1, t);
    }

    // ===== S5 (22 - 31.4) NIGHT: billion-dollar data centers sit DARK (24.56) (3D racks); the cash burns (24.90) every MONTH (26.36): three stacks of cash burn one after another (2D flames, shaded stacks); ZERO (27.66) REVENUE (28.02): "$0" tag =====
    if (t >= 21.9 && t < 31.8) {
      const C = 104; rackRow(C + 0.6, -1.4, 4, [1e9, 1e9, 1e9, 1e9], t);
      Card(C - 3.8, 6.4, 1.2, 8.6, 7.4, { kind: 'paint', t0: 22.0, t1: 0, paint: (g, pw, ph) => cashArt(g, pw, ph, [{ k: 'stack', x: 0.18, y: 0.9, s: 0.3, n: 11, t0: 22.2, burn: [24.9, 26.6] }, { k: 'stack', x: 0.5, y: 0.9, s: 0.3, n: 11, t0: 22.4, burn: [26.36, 28.0] }, { k: 'stack', x: 0.82, y: 0.9, s: 0.3, n: 11, t0: 22.6, burn: [27.7, 29.3] }], t) }, t);
      Char('bondholder', C - 7.2, 3.8, 3.1, Object.assign({ facing: 1, phase: 1 }, trk([[0, 'think'], [24.9, 'panic']])), 21.9, 31.8, t);
      if (t >= 28.02) pillTag(C, 12.2, 8.4, 3.0, 28.02, '$0 REVENUE', null, '#B8412F');
    }

    // ===== S6 (31.2 - 38.4) 2D CASH ART + CHARACTER: how much will the delay cost? HUNDREDS (33.86) of billions: stacks of cash pile up into a pyramid; WORKING (35.27) CAPITAL (35.60): a tag; Elon points (36.4) =====
    if (t >= 31.1 && t < 38.7) {
      const C = 130; Card(C + 0.6, 6.6, 1.2, 11.0, 8.6, { kind: 'paint', t0: 31.2, t1: 0, paint: (g, pw, ph) => cashArt(g, pw, ph, [{ k: 'bag', x: 0.07, y: 0.9, s: 0.2, t0: 31.4 }, { k: 'bag', x: 0.93, y: 0.9, s: 0.2, t0: 31.5 }, { k: 'stack', x: 0.24, y: 0.9, s: 0.27, n: 9, t0: 33.86 }, { k: 'stack', x: 0.5, y: 0.9, s: 0.27, n: 9, t0: 31.6 }, { k: 'stack', x: 0.76, y: 0.9, s: 0.27, n: 9, t0: 34.4 }, { k: 'stack', x: 0.37, y: 0.6, s: 0.25, n: 8, t0: 34.7 }, { k: 'stack', x: 0.63, y: 0.6, s: 0.25, n: 8, t0: 34.95 }, { k: 'stack', x: 0.5, y: 0.34, s: 0.23, n: 7, t0: 35.2 }], t) }, t);
      if (t >= 33.86) pillTag(C + 0.6, 12.8, 9.4, 2.6, 33.86, 'HUNDREDS OF BILLIONS', null, '#17252B');
      if (t >= 35.27) pillTag(C + 0.6, 1.3, 8.6, 2.4, 35.27, 'WORKING CAPITAL', 'bag', '#2B8A6E');
      Char('elon', C - 6.2, 3.8, 3.7, Object.assign({ facing: 1, phase: 1 }, trk([[0, 'think'], [36.4, 'point']])), 31.2, 38.7, t);
    }

    drawBG(0.05);
    GROUND.forEach(fn => fn());
    ITEMS.sort((a, b) => b.z - a.z).forEach(it => it.fn());
    OVER.forEach(fn => fn());
    HEADS.forEach(h => { const a = env(t, h[0], h[1], 0.3, 0.3); if (a > 0.01) drawHeadline(h[2], h[3], a, h[4], t, h[0]); });
  }
