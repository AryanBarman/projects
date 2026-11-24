  const HEADS = [
    [0.00, 4.80, 'BENEATH THE HEADLINES', 'The real game being played', PAL.amberHi],
    [5.16, 18.30, 'NOT CHARITY', "Elon's DealBook praise was calculated", PAL.coral],
    [18.56, 35.60, 'INTERIM LEADERSHIP', 'The hottest seat in tech as the stock tumbles', PAL.amberHi],
    [35.86, 46.60, "NVIDIA'S TWO FEARS", 'Losing key architects and its biggest buyer', PAL.coral],
    [46.62, 58.70, 'THREE STRATEGIC WINS', 'No employment contract needed', PAL.cyan],
    [59.22, 81.00, 'WIN 1: PRESSURE', 'NVIDIA executives wonder if Elon will pull the trigger', PAL.coral],
    [81.52, 94.90, 'WIN 2: TALENT MAGNET', "TerraFab's bottleneck is engineers, not concrete", PAL.sageHi],
    [95.30, 107.60, 'A RIVAL TO TSMC', "Jensen's name says Elon is serious", PAL.amberHi],
    [107.70, 118.80, 'WIN 3: THE PHYSICAL CEILING', 'Whatever Jensen chooses, the limits remain', PAL.cyan],
    [119.50, 131.00, 'THE CHOKE POINTS', 'ASML queues, TSMC packaging, gigawatts of power', PAL.coral],
    [131.54, 139.00, 'POWER AND WATER', 'Even TerraFab must build its own', PAL.amberHi],
    [139.84, 146.08, 'THE ALLIANCE THREAT', 'As powerful as the alliance itself', PAL.sageHi]
  ];
  const pad = (x0, z0, x1, z1, col) => groundPoly([[x0, z0], [x1, z0], [x1, z1], [x0, z1]], 0.01, col, null, 0);
  const Line3 = (a, b, col, lw, al) => { const A = toCam(a[0], a[1], a[2]), B = toCam(b[0], b[1], b[2]), cl = clipLine(A, B); if (!cl) return; const p = scr(cl[0]), q = scr(cl[1]); item((cl[0][2] + cl[1][2]) / 2, () => { ctx.save(); ctx.globalAlpha = al === undefined ? 1 : al; ctx.strokeStyle = col; ctx.lineWidth = lw; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y); ctx.stroke(); ctx.restore(); }); };
  const bubble = (x, y, z, w, h, text, u) => Panel(x, y, z, w, h, (g, pw, ph) => { g.fillStyle = '#F2EEE2'; g.strokeStyle = '#0B161C'; g.lineWidth = pw * 0.02; g.beginPath(); g.ellipse(pw / 2, ph * 0.42, pw * 0.46, ph * 0.4, 0, 0, TAU); g.fill(); g.stroke(); g.beginPath(); g.arc(pw * 0.4, ph * 0.86, ph * 0.07, 0, TAU); g.fill(); g.stroke(); g.fillStyle = '#0B161C'; g.textAlign = 'center'; g.textBaseline = 'middle'; let sz = ph * 0.22; g.font = '900 ' + sz + 'px system-ui'; while (g.measureText(text).width > pw * 0.78 && sz > 6) { sz *= 0.92; g.font = '900 ' + sz + 'px system-ui'; } g.fillText(text, pw / 2, ph * 0.42); }, { sx: u, sy: u });
  const ring = (cx, cz, r, y) => Array.from({ length: 36 }, (_, k) => [cx + Math.cos(k / 36 * TAU) * r, cz + Math.sin(k / 36 * TAU) * r]);

  function renderShots(t) {
    const cv = evalCam(t);
    Cam3D.set([cv[0], cv[1], cv[2]], [cv[3], cv[4], cv[5]], cv[6], 0.01 * Math.sin(t * 0.6));
    GROUND = []; ITEMS = []; OVER = [];
    const hit = (x, y, z, ht, col, r) => { const p = S(x, y, z); if (p) OVER.push(() => hitFx(p.x, p.y, t, ht, { color: col, r: r || 240, rays: 14 })); };
    const coin = (x, y, z) => Cyl(x, y, z, 0.25, 0.07, '#E2B857', { emis: 0.25, seg: 10, lw: 1 });
    pad(-14, -10, 34, 14, '#0E2A36'); pad(34, -10, 76, 14, '#12303C'); pad(76, -10, 134, 14, '#0E2A36');
    pad(138, -10, 232, 14, '#12303C'); pad(224, -10, 318, 14, '#0E2A36');
    groundPath([[-8, 8], [22, 8], [64, 8], [116, 8], [152, 8], [190, 8], [206, 8], [240, 8], [266, 8], [290, 8], [306, 8]], 0.05, '#E2B857', 5, seg(t, 0.4, 144));

    // ===================== PART 1 (0 - 46.6) =====================
    if (t < 47) {
      // headlines above, the real game (a chessboard) beneath
      [[-5, 'MARKET TUMBLES'], [0, 'ELON PRAISES JENSEN'], [5, 'NVIDIA SHAKE-UP']].forEach((h, i) => { const u = eBack(seg(t, 0.3 + i * 0.3, 0.9 + i * 0.3)) * (1 - seg(t, 3.4, 4.2)); Panel(h[0], 6.8 - i * 0.5, 0, 4.4, 1.8, (g, pw, ph) => { g.fillStyle = '#F2EEE2'; g.strokeStyle = '#0B161C'; g.lineWidth = pw * 0.02; g.beginPath(); g.roundRect(0, 0, pw, ph, pw * 0.03); g.fill(); g.stroke(); g.fillStyle = '#0B161C'; g.textAlign = 'center'; g.textBaseline = 'middle'; let sz = ph * 0.3; g.font = '900 ' + sz + 'px serif'; while (g.measureText(h[1]).width > pw * 0.88 && sz > 6) { sz *= 0.92; g.font = '900 ' + sz + 'px serif'; } g.fillText(h[1], pw / 2, ph * 0.38); g.fillStyle = '#B9B2A2'; g.fillRect(pw * 0.08, ph * 0.64, pw * 0.84, ph * 0.06); g.fillRect(pw * 0.08, ph * 0.78, pw * 0.6, ph * 0.06); }, { sx: u, sy: u }); });
      for (let i = 0; i < 8; i++) for (let j = 0; j < 8; j++) { const a = easeOut(seg(t, 2.8 + i * 0.1, 3.6 + i * 0.1)); Box(16.4 + i * 1.4 + 0.7, 0, -5.6 + j * 1.4 + 0.7, 1.4, 0.15 * a, 1.4, (i + j) % 2 ? '#1A3340' : '#9FB3BD', { lw: 1 }); }
      if (t >= 3.4) { [[19, 1], [21, 3], [24, -2], [26, 0]].forEach(p => Cyl(p[0], 0.15, p[1], 0.4, 0.9, '#E2B857', { seg: 10 })); [[20, -1], [23, 2], [25, 4]].forEach(p => Cyl(p[0], 0.15, p[1], 0.4, 0.9, '#5D9B00', { seg: 10 })); Cyl(22, 0.15, -3, 0.5, 1.6, '#E2B857', { seg: 10 }); Cyl(25, 0.15, 3, 0.5, 1.6, '#5D9B00', { seg: 10 }); Label('THE REAL GAME', 22, 5.2, 0, 8.4, 1.0, '#0B1A22', '#E2B857', { sc: eBack(seg(t, 3.4, 3.9)) * (1 - seg(t, 5.0, 5.6)) }); }
      // DealBook: not charity; a calculated shockwave through NVIDIA's boardroom
      if (t >= 5.1) {
        Box(44, 0, 0, 8, 0.8, 5, '#2E5261'); Box(44, 0.8, -1.2, 1.4, 1.4, 0.8, '#6B5238'); Panel(44, 5.2, -2.6, 7, 2.4, (g, pw, ph) => { g.fillStyle = '#7A2A33'; g.fillRect(0, 0, pw, ph); g.fillStyle = '#F4F1EA'; g.textAlign = 'center'; g.textBaseline = 'middle'; g.font = '900 ' + ph * 0.38 + 'px system-ui'; g.fillText('DEALBOOK', pw / 2, ph / 2); }, { sx: eBack(seg(t, 5.2, 5.8)), sy: eBack(seg(t, 5.2, 5.8)) });
        Char('elon', 44, 4.2, 2.4, { facing: 1, phase: 1, armAngleR: -1.65, armAngleL: 0.3, talk: 0.8 }, 5.1, 18.4, t);
        if (t >= 6.6 && t < 10.2) bubble(46.4, 6.8, 4, 6.2, 2.8, 'JENSEN IS GREAT', eBack(seg(t, 6.6, 7.1)) * (1 - seg(t, 9.8, 10.2)));
        if (t >= 8.3 && t < 12.4) { const u = eBack(seg(t, 8.3, 8.8)) * (1 - seg(t, 12.0, 12.4)); Panel(38, 5.4, 4, 3.0, 3.0, (g, pw, ph) => { g.fillStyle = '#F2EEE2'; g.beginPath(); g.arc(pw / 2, ph / 2, pw * 0.46, 0, TAU); g.fill(); g.fillStyle = '#D8483A'; g.textAlign = 'center'; g.textBaseline = 'middle'; g.font = '900 ' + pw * 0.5 + 'px system-ui'; g.fillText('♥', pw / 2, ph * 0.52); g.strokeStyle = '#0B161C'; g.lineWidth = pw * 0.08; g.beginPath(); g.moveTo(pw * 0.15, ph * 0.15); g.lineTo(pw * 0.85, ph * 0.85); g.stroke(); }, { sx: u, sy: u }); Label('NOT PURE CHARITY', 38, 8.0, 4, 8.4, 0.9, '#C8463C', '#F4F1EA', { sc: eBack(seg(t, 8.5, 9.0)) * (1 - seg(t, 12.0, 12.4)) }); }
        if (t >= 10.3 && t < 18.4) bubble(46.4, 6.8, 4, 8.0, 2.8, 'JENSEN RUNS TERRAFAB?', eBack(seg(t, 10.3, 10.8)) * (1 - seg(t, 17.6, 18.2)));
        const shake = t >= 16.2 && t < 18.2 ? Math.sin(t * 40) * 0.18 : 0;
        Box(64 + shake, 0, 0, 7, 5, 5, '#5D9B00'); Label('NVIDIA BOARDROOM', 64, 6.4, 0, 9, 1.0, '#0B1A22', '#9BE01B', { sc: eBack(seg(t, 12.6, 13.1)) });
        if (t >= 12.5) for (let k = 0; k < 3; k++) { const r = (((t - 12.5) * 3.8 + k * 6) % 20) + 1; if (r < 21) groundPoly(ring(44, 0, r, 0), 0.06, null, 'rgba(216,72,58,' + (1 - r / 21) + ')', 4); }
        if (t >= 13.4) Label('THE EXACT SHOCKWAVE', 54, 9.6, 3, 9.6, 0.95, '#C8463C', '#F4F1EA', { sc: eBack(seg(t, 13.4, 13.9)) * (1 - seg(t, 17.6, 18.3)) });
        if (t >= 16.2 && t < 16.6) hit(64, 3, 0, 16.2, PAL.coral, 320);
      }
      // interim leadership, a falling stock and hyperscalers replacing GPUs with ASICs
      if (t >= 18.5 && t < 36.2) {
        Box(64, 0, 3.4, 1.2, 1.0, 1.0, '#C8463C'); Box(64, 1.0, 2.9, 1.2, 1.3, 0.25, '#C8463C'); for (let k = 0; k < 3; k++) { const fl = 0.7 + 0.5 * Math.sin(t * 9 + k * 2); Box(63.5 + k * 0.5, 2.4, 3.2, 0.35, 0.6 * fl, 0.35, k % 2 ? '#FFB340' : '#D8483A', { emis: 0.8, lw: 0 }); }
        Label('INTERIM LEADERSHIP', 64, 5.2, 3.4, 8.6, 0.95, '#C8463C', '#F4F1EA', { sc: eBack(seg(t, 18.6, 19.1)) * (1 - seg(t, 23.0, 23.6)) }); if (t >= 21.6) Label('THE HOTTEST SEAT', 64, 4.2, 3.4, 7.4, 0.9, '#E2B857', '#0B161C', { sc: eBack(seg(t, 21.6, 22.1)) * (1 - seg(t, 28.0, 28.6)) });
        if (t >= 24.0) Panel(74, 6.4, 0, 5, 3, (g, pw, ph) => { g.fillStyle = '#0B1A22'; g.strokeStyle = '#D8483A'; g.lineWidth = pw * 0.02; g.beginPath(); g.roundRect(0, 0, pw, ph, pw * 0.04); g.fill(); g.stroke(); g.fillStyle = '#F4F1EA'; g.font = '900 ' + ph * 0.18 + 'px system-ui'; g.textAlign = 'left'; g.fillText('NVDA ▼', pw * 0.06, ph * 0.2); const u = seg(t, 24.2, 27.0); g.strokeStyle = '#D8483A'; g.lineWidth = pw * 0.025; g.beginPath(); for (let k = 0; k <= 20; k++) { if (k / 20 > u) break; const x = pw * (0.06 + k * 0.044), y = ph * (0.35 + 0.5 * (k / 20) * (k / 20) + Math.sin(k * 1.7) * 0.03); k ? g.lineTo(x, y) : g.moveTo(x, y); } g.stroke(); }, { sx: eBack(seg(t, 24.0, 24.6)), sy: eBack(seg(t, 24.0, 24.6)) });
        [['GOOGLE', 84, 27.9], ['AMAZON', 92, 30.5], ['BROADCOM', 100, 31.2]].forEach(h => { const u = easeOut(seg(t, h[2] - 0.5, h[2] + 0.3)); Box(h[1], 0, 0, 5, 4 * u, 4, '#3D6F86'); Label(h[0], h[1], 5.6, 0, 5.2, 0.9, '#0B1A22', '#F4F1EA', { sc: eBack(seg(t, h[2], h[2] + 0.5)) }); });
        if (t >= 30.2) { for (let i = 0; i < 6; i++) Box(80 + i * 1.8, 0, 7, 1.2, 2.2, 1.0, t >= 32.4 + i * 0.35 ? '#2E8A9E' : '#5D9B00', { emis: 0.2 }); Label('CUSTOM ASICs REPLACE NVIDIA GPUs', 86, 4.4, 7, 15, 0.95, '#0B1A22', '#64D2C7', { sc: eBack(seg(t, 33.0, 33.5)) * (1 - seg(t, 35.2, 35.8)) }); }
      }
      // the board's two fears
      if (t >= 35.8) {
        Box(116, 0, 0, 8, 1, 3, '#6B5238'); [[112, 3.4], [115, 3.8], [118, 3.8], [121, 3.4]].forEach((p, i) => Char('analyst', p[0], p[1] + 1.2, 2.2, { facing: i < 2 ? 1 : -1, phase: 2 + i, armAngleR: -2.0, armAngleL: 2.0, browTension: 0.9 }, 36.0 + i * 0.15, 46.6, t));
        Label("THE BOARD IS TERRIFIED", 116, 8.6, 0, 11, 1.0, '#C8463C', '#F4F1EA', { sc: eBack(seg(t, 36.0, 36.6)) * (1 - seg(t, 39.0, 39.6)) });
        Box(106, 0, 2, 0.15, 4.2, 0.15, '#9FB3BD'); Box(107.2, 3.3, 2, 2.2, 1.0, 0.1, '#64D2C7'); Label('LOYAL TO JENSEN', 107, 5.6, 2, 6.4, 0.8, '#0B1A22', '#64D2C7', { sc: eBack(seg(t, 39.4, 39.9)) });
        if (t >= 39.1) { Label('LOSING KEY CHIP ARCHITECTS', 108, 8.4, -2, 11.4, 0.95, '#0B1A22', '#E2B857', { sc: eBack(seg(t, 39.1, 39.6)) }); hit(108, 4, 0, 39.1, PAL.coral, 260); }
        [0, 1].forEach(i => { const w = easeInOut(seg(t, 40.4 + i * 0.4, 43.4 + i * 0.4)); Char('analyst', lerp(113, 104, w) + i * 1.4, 6.4 + i * 0.5, 2.2, { facing: -1, phase: 8 + i, walkAmt: w > 0 && w < 1 ? 1 : 0, armAngleR: -0.4, armAngleL: 0.3 }, 40.4 + i * 0.4, 46.6, t); });
        if (t >= 41.5) { Label('LOSING ITS BIGGEST BUYER', 126, 8.4, -2, 11.4, 0.95, '#0B1A22', '#E2B857', { sc: eBack(seg(t, 41.6, 42.1)) }); hit(126, 4, 0, 41.6, PAL.coral, 260); }
        const ew = easeInOut(seg(t, 43.0, 46.2)); Char('elon', lerp(120, 130, ew), 6.6, 2.4, { facing: 1, phase: 12, walkAmt: ew > 0 && ew < 1 ? 1 : 0, armAngleR: -0.4, armAngleL: 0.3 }, 43.0, 46.6, t);
        if (t >= 43.0) for (let i = 0; i < 5; i++) coin(lerp(121, 131, ew) + i * 0.1, 3.2 + i * 0.12, 6.6);
        if (t >= 45.5) Label('ELON MUSK', 128, 4.8, 6.6, 5, 0.9, '#0B1A22', '#E2B857', { sc: eBack(seg(t, 45.5, 46.0)) });
      }
    }
    // ===================== PART 2 (46.6 - 107.68) =====================
    const q = t - 46.6;
    if (t >= 46.6 && t < 107.9) {
      // dangling the keys to a $119B Texas megafab; three wins; no employment contract
      if (q < 12.4) {
        Box(160, 0, 0, 10, 6, 6, '#3D6F86'); Label('TEXAS MEGAFAB · $119B', 160, 7.6, 0, 11, 1.0, '#0B1A22', '#E2B857', { sc: eBack(seg(t, 46.8, 47.3)) });
        const ky = 3.6 + Math.sin(q * 2) * 0.25; Box(152, ky, 3, 3.4, 0.35, 0.35, '#E2B857', { emis: 0.25 }); Box(150.4, ky - 0.4, 3, 1.1, 1.1, 0.35, '#E2B857', { emis: 0.25 }); Box(153.2, ky - 0.5, 3, 0.4, 0.6, 0.35, '#E2B857'); Box(154.0, ky - 0.5, 3, 0.4, 0.6, 0.35, '#E2B857');
        Label('THE KEYS, DANGLING', 152, 6.4, 3, 9, 0.95, '#0B1A22', '#E2B857', { sc: eBack(seg(t, 47.4, 47.9)) * (1 - seg(t, 52.8, 53.4)) });
        Char('jensen', 147, 7.4, 2.35, { facing: 1, phase: 3, armAngleR: -1.65, armAngleL: 0.3, talk: 0.5 }, 46.7, 59.0, t);
        Char('elon', 156, 7.4, 2.4, { facing: -1, phase: 4, armAngleR: -1.65, armAngleL: 0.3, talk: 0.7 }, 46.8, 59.0, t);
        [['1', 154], ['2', 158], ['3', 162]].forEach((p, i) => { const u = easeOut(seg(q, 7.22 + i * 0.5, 7.9 + i * 0.5)); Box(p[1], 0, 9, 2.2, (2 + i * 0.9) * u, 2.2, ['#2B8A6E', '#3D6F86', '#C9A24A'][i]); Label('WIN ' + p[0], p[1], (2 + i * 0.9) * u + 0.9, 9, 2.6, 0.7, '#0B1A22', '#F4F1EA', { sc: eBack(seg(q, 7.5 + i * 0.5, 8.0 + i * 0.5)) }); });
        if (q >= 10.5) { const u = eBack(seg(q, 10.5, 11.1)); Panel(152, 9.6, -3, 4, 2.6, (g, pw, ph) => { g.fillStyle = '#F2EEE2'; g.strokeStyle = '#0B161C'; g.lineWidth = pw * 0.02; g.beginPath(); g.roundRect(0, 0, pw, ph, pw * 0.04); g.fill(); g.stroke(); g.fillStyle = '#0B161C'; g.textAlign = 'center'; g.textBaseline = 'middle'; g.font = '900 ' + ph * 0.2 + 'px system-ui'; g.fillText('EMPLOYMENT', pw / 2, ph * 0.3); g.fillText('CONTRACT', pw / 2, ph * 0.52); g.strokeStyle = '#D8483A'; g.lineWidth = pw * 0.05; g.beginPath(); g.moveTo(pw * 0.1, ph * 0.1); g.lineTo(pw * 0.9, ph * 0.9); g.moveTo(pw * 0.9, ph * 0.1); g.lineTo(pw * 0.1, ph * 0.9); g.stroke(); }, { sx: u, sy: u }); Label('NO CONTRACT SIGNED', 152, 11.6, -3, 8.2, 0.9, '#C8463C', '#F4F1EA', { sc: eBack(seg(q, 10.5, 11.0)) }); }
      }
      // win 1: pressure on NVIDIA's interim leadership
      if (q >= 12.5 && q < 35) {
        Box(170, 0, 0, 6, 1, 3, '#6B5238'); Char('elon', 165.6, 4.4, 2.4, { facing: 1, phase: 5, armAngleR: -1.65, armAngleL: 0.3, talk: 0.7 }, 59.2, 81.9, t); Char('analyst', 174.6, 4.4, 2.3, { facing: -1, phase: 6, armAngleR: -0.4, armAngleL: 0.3, browTension: 0.9 }, 59.3, 81.9, t);
        Label('PSYCHOLOGICAL PRESSURE', 170, 12.8, 0, 12, 1.0, '#C8463C', '#F4F1EA', { sc: eBack(seg(q, 12.8, 13.3)) * (1 - seg(q, 27.4, 28.0)) });
        [['GPU PRICING', 16.7, 8.6], ['ALLOCATION PRIORITY', 18.6, 9.9], ['CUSTOM ORBITAL SPECS', 21.0, 11.2]].forEach(l => Label(l[0], 170, l[2], 0, 9.6, 0.85, '#0B1A22', '#E2B857', { sc: eBack(seg(q, l[1], l[1] + 0.5)) * (1 - seg(q, 27.4, 28.0)) }));
        if (q >= 23.3) Label('$44B VERA RUBIN ROLLOUT', 170, 6.8, 0, 11, 0.9, '#2B8A6E', '#F4F1EA', { sc: eBack(seg(q, 23.3, 23.8)) * (1 - seg(q, 27.4, 28.0)) });
        if (q >= 28.7) bubble(176, 9.4, 4, 7.6, 3.2, 'IF WE PUSH TOO HARD?', eBack(seg(q, 28.7, 29.2)));
        if (q >= 31.0) { bubble(176, 13.2, 4, 7.8, 3.0, 'JENSEN HEADS TERRAFAB?', eBack(seg(q, 31.0, 31.5))); hit(176, 12, 4, 46.6 + 33.2, PAL.coral, 240); }
      }
      // win 2: a talent magnet; the bottleneck is engineers, not concrete
      if (q >= 34.8 && q < 49) {
        Box(190, 0, 0, 8, 0.4, 5, '#9FB3BD'); Label('NOT CONCRETE', 190, 3.6, 0, 6.4, 0.95, '#2B8A6E', '#F4F1EA', { sc: eBack(seg(q, 38.3, 38.8)) * (1 - seg(q, 43.8, 44.4)) });
        if (q >= 41.4) for (let i = 0; i < 5; i++) Char('analyst', 195 + i * 1.7, 5.4, 2.2, { facing: -1, phase: 7 + i, armAngleR: -0.4, armAngleL: 0.3, browTension: 0.9 }, 41.4 + 46.6 + i * 0.2, 96.0, t);
        if (q >= 41.6) for (let i = 0; i < 5; i++) bubble(195 + i * 1.7, 9.0 - (i % 2) * 0.5, 5.4, 2.0, 1.6, '?', eBack(seg(q, 41.8 + i * 0.2, 42.2 + i * 0.2)));
        if (q >= 41.4) Label('ELITE SEMICONDUCTOR ENGINEERS', 197, 12.0, 0, 14, 0.95, '#0B1A22', '#64D2C7', { sc: eBack(seg(q, 41.5, 42.0)) * (1 - seg(q, 47.4, 48.0)) });
        if (q >= 44.4) { Cyl(184, 0, 3, 0.7, 4.4, '#CFD6DA', { seg: 12 }); Box(187, 0.3, 3, 2.8, 0.7, 1.4, '#C8463C'); Label('ROCKET + CAR COMPANY', 185.5, 6.4, 3, 9.4, 0.85, '#0B1A22', '#E2B857', { sc: eBack(seg(q, 44.6, 45.1)) }); }
        if (q >= 46.9) Label('WORLD-CLASS CHIP FAB?', 190, 9.6, 0, 11, 0.95, '#C8463C', '#F4F1EA', { sc: eBack(seg(q, 46.9, 47.4)) });
      }
      // a rival to TSMC: Jensen's name pulls in engineers from Silicon Valley and Taiwan
      if (q >= 48.6) {
        Box(206, 0, 0, 8, 5, 5, '#3D6F86'); Label('JENSEN HUANG', 206, 7.4, 0, 9, 1.2, '#2B8A6E', '#F4F1EA', { sc: eBack(seg(q, 49.0, 49.6)) * (1 - seg(q, 59.6, 60.6)) }); Label('TERRAFAB', 206, 6.0, 0, 5, 0.8, '#0B1A22', '#E2B857', { sc: eBack(seg(q, 49.2, 49.7)) });
        Box(196, 0, 3, 0.2, 3.6, 0.2, '#9FB3BD'); Label('SILICON VALLEY', 196, 4.8, 3, 6.4, 0.8, '#0B1A22', '#64D2C7', { sc: eBack(seg(q, 53.0, 53.5)) }); Box(218, 0, 3, 0.2, 3.6, 0.2, '#9FB3BD'); Label('TAIWAN', 218, 4.8, 3, 4.4, 0.8, '#0B1A22', '#E2B857', { sc: eBack(seg(q, 55.4, 55.9)) });
        [0, 1, 2].forEach(i => { const w = easeInOut(seg(q, 52.4 + i * 0.4, 57.6 + i * 0.4)); Char('analyst', lerp(196 + i * 0.8, 204 + i, w), 6 + i * 0.6, 2.2, { facing: 1, phase: 14 + i, walkAmt: w > 0 && w < 1 ? 1 : 0, armAngleR: -0.4, armAngleL: 0.3 }, 99.0 + i * 0.4, 107.7, t); Char('analyst', lerp(218 - i * 0.8, 208 - i, w), 6 + i * 0.6, 2.2, { facing: -1, phase: 18 + i, walkAmt: w > 0 && w < 1 ? 1 : 0, armAngleR: -0.4, armAngleL: 0.3 }, 99.0 + i * 0.4, 107.7, t); });
        if (q >= 55.6) { Label('DEADLY SERIOUS', 206, 11.0, 0, 8.2, 1.0, '#C8463C', '#F4F1EA', { sc: eBack(seg(q, 55.6, 56.1)) * (1 - seg(q, 59.6, 60.6)) }); hit(206, 4, 0, 46.6 + 55.6, PAL.coral, 300); }
        if (q >= 58.8) { Box(206, 0, -9, 8, 4, 4, '#8C98A0'); Label('RIVAL TO TSMC', 206, 5.6, -9, 8, 0.95, '#0B1A22', '#E2B857', { sc: eBack(seg(q, 58.8, 59.3)) }); }
      }
    }
    // ===================== PART 3 (107.68 - 146.08) =====================
    const r = t - 107.68;
    if (t >= 107.7) {
      // three Jensen paths under one physical ceiling
      if (r < 11.4) {
        Box(238, 5.6, 0, 16, 0.5, 5, '#9FB3BD', { a: 0.6 * easeOut(seg(r, 0.3, 1.1)) }); Label('THE PHYSICAL CEILING', 238, 7.4, 0, 11, 1.0, '#0B1A22', '#E2B857', { sc: eBack(seg(r, 0.3, 0.9)) });
        [['JOINS TERRAFAB', 232, 4.2], ['STARTS HIS OWN CHIP VENTURE', 238, 7.2], ['ADVISES FROM THE SIDELINES', 244, 9.6]].forEach((d, i) => { Box(d[1] - 1.1, 0, 0, 0.3, 3.4, 0.3, '#9FB3BD'); Box(d[1] + 1.1, 0, 0, 0.3, 3.4, 0.3, '#9FB3BD'); Box(d[1], 3.1, 0, 2.5, 0.3, 0.3, '#E2B857'); Label(d[0], d[1], 4.4, 0, 6.4, 1.0, '#0B1A22', '#F4F1EA', { sc: eBack(seg(r, d[2], d[2] + 0.5)) }); });
        const jx = r < 4.4 ? lerp(226, 232, easeInOut(seg(r, 1.0, 4.4))) : r < 7.6 ? lerp(232, 238, easeInOut(seg(r, 5.0, 7.6))) : lerp(238, 244, easeInOut(seg(r, 8.0, 10.2)));
        Char('jensen', jx, 5.4, 2.35, { facing: 1, phase: 3, walkAmt: 1, armAngleR: -0.4, armAngleL: 0.3 }, 107.7, 119.0, t);
      }
      // the real choke points: ASML queues, TSMC packaging, gigawatts
      if (r >= 11.7 && r < 24) {
        Box(260, 0, 0, 3, 3, 3, '#6B7C86'); Cyl(260, 3, 0, 0.8, 0.9, '#8E5CC8'); for (let i = 0; i < 6; i++) Box(254 - i * 1.5, 0, 0.4, 1.0, 1.0, 1.0, '#C9A24A', { a: easeOut(seg(r, 14.4 + i * 0.2, 15.0 + i * 0.2)) });
        Label('ASML SCANNER DELIVERY QUEUES', 256, 5.8, 0, 13, 0.95, '#0B1A22', '#E2B857', { sc: eBack(seg(r, 14.9, 15.4)) * (1 - seg(r, 23.2, 23.8)) });
        Box(268, 0, 3, 3, 4, 4, '#3D6F86'); Box(268, 0, -3, 3, 4, 4, '#3D6F86'); Box(268, 4, 0, 3, 0.3, 10, '#2E5261'); Label('TSMC ADVANCED PACKAGING', 268, 6.6, 0, 12, 0.95, '#0B1A22', '#64D2C7', { sc: eBack(seg(r, 18.3, 18.8)) * (1 - seg(r, 23.2, 23.8)) });
        Box(278, 0, 0, 0.5, 7 * easeOut(seg(r, 20.0, 20.8)), 0.5, '#9FB3BD'); Box(278, 7.2, 0, 3, 0.2, 0.2, '#9FB3BD'); Box(278, 6.6, 0, 0.8, 0.8, 0.8, '#FFD34E', { emis: 0.9 });
        Label('GIGAWATTS OF POWER', 278, 8.8, 0, 10, 0.95, '#0B1A22', '#FFD34E', { sc: eBack(seg(r, 20.3, 20.8)) * (1 - seg(r, 23.2, 23.8)) });
        Label('NOBODY ESCAPES THE CHOKE POINT', 267, 11.6, 0, 16, 1.0, '#C8463C', '#F4F1EA', { sc: eBack(seg(r, 11.9, 12.4)) * (1 - seg(r, 17.6, 18.2)) });
      }
      // even TerraFab needs on-site power and water for the clean rooms
      if (r >= 23.7 && r < 32) {
        Box(290, 0, 0, 8, 5, 6, '#3D6F86'); Label('TERRAFAB TEXAS SITE', 290, 6.6, 0, 10, 1.0, '#0B1A22', '#E2B857', { sc: eBack(seg(r, 23.9, 24.4)) });
        Box(282, 0, 0, 4, 2.6, 3, '#6B7C86'); Cyl(281, 2.6, 0, 0.6, 3, '#C9D3D9', { seg: 10 }); Cyl(283.2, 2.6, 0, 0.6, 3, '#C9D3D9', { seg: 10 }); Label('ON-SITE POWER', 282, 7.4, 0, 6.8, 0.9, '#0B1A22', '#FFD34E', { sc: eBack(seg(r, 24.8, 25.3)) });
        Box(299, 0, 0, 0.4, 3, 0.4, '#9FB3BD'); Cyl(299, 3, 0, 1.5, 2, '#3A78B8', { seg: 12 }); Label('WATER', 299, 6.4, 0, 4, 0.9, '#0B1A22', '#64D2C7', { sc: eBack(seg(r, 26.6, 27.1)) });
        Line3([284, 1.4, 0], [286, 2, 0], '#FFD34E', 5, 0.9); Line3([297.8, 1.6, 0], [294, 2, 0], '#64D2C7', 5, 0.9);
        if (r >= 30.2) { Box(290, 0.2, 3.2, 3.4, 1.2, 0.2, '#F4F1EA', { emis: 0.4 }); Label('CLEAN ROOMS KEPT RUNNING', 290, 3.2, 3.4, 10, 0.9, '#2B8A6E', '#F4F1EA', { sc: eBack(seg(r, 30.2, 30.7)) }); }
      }
      // the threat of the alliance is almost as powerful as the alliance
      if (r >= 32.0) {
        Cyl(306, 0, 0, 1.2, 0.4, '#6B7C86', { seg: 12 }); Box(306, 0.4, 0, 0.4, 4.8, 0.4, '#9FB3BD'); const tilt = Math.sin(r * 1.6) * 0.15; Box(306, 5.2, 0, 10, 0.3, 0.5, '#E2B857');
        Box(301.4, 3.6 + tilt, 0, 3.4, 0.3, 2, '#2E5261'); Box(310.6, 3.6 - tilt, 0, 3.4, 0.3, 2, '#2E5261');
        Box(301.4, 3.9 + tilt, 0, 2.6, 2.4, 1.6, '#C8463C', { a: 0.35 }); Box(310.6, 3.9 - tilt, 0, 2.6, 2.4, 1.6, '#C8463C');
        Label('THE THREAT', 301.4, 7.8, 0, 5.4, 0.9, '#0B1A22', '#F4F1EA', { sc: eBack(seg(r, 32.6, 33.1)) }); Label('THE ALLIANCE', 310.6, 7.8, 0, 6, 0.9, '#0B1A22', '#E2B857', { sc: eBack(seg(r, 33.4, 33.9)) });
        Label('ALMOST AS POWERFUL', 306, 10.6, 0, 11.4, 1.1, '#C8463C', '#F4F1EA', { sc: eBack(seg(r, 34.7, 35.3)) }); hit(306, 6, 0, 107.68 + 34.7, PAL.coral, 300);
        Char('jensen', 298.4, 6.4, 2.35, { facing: 1, phase: 30, armAngleR: -1.65, armAngleL: 0.3, talk: 0.6 }, 140.0, 146.2, t); Char('elon', 313.6, 6.4, 2.4, { facing: -1, phase: 31, armAngleR: -1.65, armAngleL: 0.3, talk: 0.6 }, 140.2, 146.2, t);
      }
    }

    drawBG(0.1);
    GROUND.forEach(fn => fn());
    ITEMS.sort((a, b) => b.z - a.z).forEach(it => it.fn());
    OVER.forEach(fn => fn());
    HEADS.forEach(h => { const a = env(t, h[0], h[1], 0.3, 0.3); if (a > 0.01) drawShotBanner(h[2], h[3], a, h[4], t, h[0]); });
  }

