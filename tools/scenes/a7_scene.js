  const HEADS = [
    [0.00, 10.60, 'WHERE WE STARTED', 'The board forced Jensen out in November 2026', PAL.amberHi],
    [10.90, 22.20, 'THE BROKEN HANDSHAKE', 'A personal network held the AI supply chain together', PAL.coral],
    [22.32, 43.00, 'NO MAGIC WAND', 'Clean room physics, 14A, IP suits, $44B dependence', PAL.cyan],
    [43.00, 62.50, 'A WAR OF ATTRITION', 'Up to $119B, from Texas to low-Earth orbit', PAL.coral],
    [63.04, 73.60, 'THE MOAT HAS CRACKED', 'Sign or use it as leverage, NVIDIA lost its edge', PAL.sageHi],
    [73.98, 88.40, 'THE FULL STORY', 'The boardroom implosion and the $4T standoff', PAL.amberHi]
  ];
  const pad = (x0, z0, x1, z1, col) => groundPoly([[x0, z0], [x1, z0], [x1, z1], [x0, z1]], 0.01, col, null, 0);
  const Line3 = (a, b, col, lw, al) => { const A = toCam(a[0], a[1], a[2]), B = toCam(b[0], b[1], b[2]), cl = clipLine(A, B); if (!cl) return; const p = scr(cl[0]), q = scr(cl[1]); item((cl[0][2] + cl[1][2]) / 2, () => { ctx.save(); ctx.globalAlpha = al === undefined ? 1 : al; ctx.strokeStyle = col; ctx.lineWidth = lw; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y); ctx.stroke(); ctx.restore(); }); };

  function renderShots(t) {
    const cv = evalCam(t);
    Cam3D.set([cv[0], cv[1], cv[2]], [cv[3], cv[4], cv[5]], cv[6], 0.01 * Math.sin(t * 0.6));
    GROUND = []; ITEMS = []; OVER = [];
    const hit = (x, y, z, ht, col, r) => { const p = S(x, y, z); if (p) OVER.push(() => hitFx(p.x, p.y, t, ht, { color: col, r: r || 240, rays: 14 })); };
    const bubble = (x, y, z, w, h, text, u) => Panel(x, y, z, w, h, (g, pw, ph) => { g.fillStyle = '#F2EEE2'; g.strokeStyle = '#0B161C'; g.lineWidth = pw * 0.02; g.beginPath(); g.ellipse(pw / 2, ph * 0.42, pw * 0.46, ph * 0.4, 0, 0, TAU); g.fill(); g.stroke(); g.beginPath(); g.arc(pw * 0.4, ph * 0.86, ph * 0.07, 0, TAU); g.fill(); g.stroke(); g.fillStyle = '#0B161C'; g.textAlign = 'center'; g.textBaseline = 'middle'; let sz = ph * 0.22; g.font = '900 ' + sz + 'px system-ui'; while (g.measureText(text).width > pw * 0.78 && sz > 6) { sz *= 0.92; g.font = '900 ' + sz + 'px system-ui'; } g.fillText(text, pw / 2, ph * 0.42); }, { sx: u, sy: u });
    pad(-14, -12, 40, 16, '#0E2A36'); pad(40, -14, 90, 14, '#12303C'); pad(96, -14, 160, 14, '#0E2A36'); pad(160, -14, 230, 16, '#12303C'); pad(230, -14, 310, 14, '#0E2A36');
    groundPath([[-8, 8], [20, 6], [50, 8], [80, 4], [110, 8], [150, 6], [190, 8], [230, 4], [270, 8], [300, 6]], 0.05, '#E2B857', 5, seg(t, 0.4, 86));

    // ===== PART 1 =====
    if (t < 22.4) {
      // where we started: the NVIDIA boardroom; the board forces Jensen out in November 2026
      const bu = easeOut(seg(t, 0.2, 1.2));
      Box(2, 0, 0, 10, 5 * bu, 6, '#5D9B00'); Label('NVIDIA BOARDROOM', 2, 6.4, 0, 10, 1.0, '#0B1A22', '#9BE01B', { sc: eBack(seg(t, 0.4, 0.9)) * (1 - seg(t, 10.0, 10.6)) });
      Box(14, 0, 0, 5, 1, 2.4, '#6B5238'); [[12, 3.2], [14, 3.6], [16, 3.2]].forEach((p, i) => Char('analyst', p[0], p[1] + 1.4, 2.2, { facing: -1, phase: 2 + i, armAngleR: -1.65, armAngleL: 0.3, browTension: 0.5 }, 1.0 + i * 0.2, 10.6, t));
      const jw = seg(t, 2.8, 5.6), jx = lerp(8, 30, easeInOut(jw));
      Char('jensen', jx, 5.4, 2.35, { facing: 1, phase: 1, walkAmt: jw > 0 && jw < 1 ? 1 : 0, armAngleR: -0.4, armAngleL: 0.3, browTension: 0.7 }, 0.3, 10.6, t);
      if (t >= 2.8) { Label('FORCED OUT', 18, 6.0, 5.4, 7, 1.0, '#C8463C', '#F4F1EA', { sc: eBack(seg(t, 2.9, 3.4)) * (1 - seg(t, 10.0, 10.6)) }); Panel(36, 4.6, 0, 4.6, 3.4, (g, pw, ph) => { g.fillStyle = '#F2EEE2'; g.strokeStyle = '#0B161C'; g.lineWidth = pw * 0.02; g.beginPath(); g.roundRect(0, 0, pw, ph, pw * 0.04); g.fill(); g.stroke(); g.fillStyle = '#C8463C'; g.fillRect(0, 0, pw, ph * 0.26); g.fillStyle = '#F4F1EA'; g.textAlign = 'center'; g.textBaseline = 'middle'; g.font = '900 ' + ph * 0.16 + 'px system-ui'; g.fillText('NOVEMBER 2026', pw / 2, ph * 0.13); g.fillStyle = '#0B161C'; g.font = '900 ' + ph * 0.22 + 'px system-ui'; g.fillText('JENSEN OUT', pw / 2, ph * 0.62); }, { sx: eBack(seg(t, 3.4, 4.0)) * (1 - seg(t, 10.0, 10.6)), sy: eBack(seg(t, 3.4, 4.0)) * (1 - seg(t, 10.0, 10.6)) }); }
      if (t >= 5.7 && t < 10.8) { Box(40, 0, -4, 5, 3, 3, '#8C98A0'); Label('GOVERNANCE CRISIS?', 40, 4.8, -4, 9, 0.9, '#0B1A22', '#E2B857', { sc: eBack(seg(t, 5.9, 6.4)) * (1 - seg(t, 10.0, 10.6)) }); Cyl(40, 3, -4, 2.8, 0.2, '#C8463C', { seg: 16, a: 0.9 }); Label('PROTECTING THE COMPANY', 36, 8.2, 0, 11, 0.9, '#0B1A22', '#64D2C7', { sc: eBack(seg(t, 6.2, 6.7)) * (1 - seg(t, 10.0, 10.6)) }); }
      // the broken personal handshake network and the free agent
      if (t >= 10.8) {
        const nodes = [[54, 3], [58, 8], [64, 2], [70, 8], [76, 3], [64, 5.2]];
        nodes.forEach((n, i) => { Box(n[0], n[1] - 0.6, -3, 1.4, 1.2, 1.4, i === 5 ? '#E2B857' : '#3D6F86'); });
        const snap = seg(t, 14.4, 15.6);
        [[0, 5], [1, 5], [2, 5], [3, 5], [4, 5], [0, 1], [1, 3], [3, 4], [2, 4]].forEach((e, i) => { const a = nodes[e[0]], b = nodes[e[1]], u = easeOut(seg(t, 11.0 + i * 0.2, 11.6 + i * 0.2)); const col = t >= 14.4 ? '#D8483A' : '#E2B857'; const brk = t >= 14.4 ? 0.28 * snap * ((i % 2) ? 1 : -1) : 0; Line3([a[0], a[1], -3], [lerp(a[0], b[0], u * 0.5 - brk), lerp(a[1], b[1], u * 0.5 - brk), -3], col, 4, 0.95); Line3([b[0], b[1], -3], [lerp(b[0], a[0], u * 0.5 - brk), lerp(b[1], a[1], u * 0.5 - brk), -3], col, 4, 0.95); });
        Label('THE PERSONAL HANDSHAKE NETWORK', 64, 9.6, -3, 14, 1.0, '#0B1A22', '#E2B857', { sc: eBack(seg(t, 11.0, 11.6)) * (1 - seg(t, 17.6, 18.2)) });
        if (t >= 14.4) { Label('BROKEN', 64, 12.2, -3, 5, 1.1, '#C8463C', '#F4F1EA', { sc: eBack(seg(t, 14.4, 14.9)) * (1 - seg(t, 17.6, 18.2)) }); hit(64, 5, -3, 14.4, PAL.coral, 320); }
        Label('AI SUPPLY CHAIN', 64, 1.2, -3, 8, 0.8, '#0B1A22', '#64D2C7', { sc: eBack(seg(t, 12.0, 12.5)) });
        if (t >= 17.8) { const fx = lerp(76, 92, easeInOut(seg(t, 18.2, 21.4))); Box(88, 0, 4, 0.2, 5.2, 0.2, '#9FB3BD'); Box(88.8, 4.0, 4, 1.8, 1.1, 0.1, '#5D9B00'); Char('jensen', fx, 6, 2.35, { facing: 1, phase: 5, walkAmt: t < 21.4 ? 1 : 0, armAngleR: t >= 21.4 ? -1.65 : -0.4, armAngleL: 0.3, talk: t >= 21.4 ? 0.6 : 0 }, 17.8, 22.4, t); Label('MOST VALUABLE CHIP ARCHITECT', 82, 9.6, 4, 14, 1.0, '#0B1A22', '#E2B857', { sc: eBack(seg(t, 18.0, 18.5)) * (1 - seg(t, 21.2, 21.8)) }); if (t >= 21.4) { Label('FREE AGENT', 88, 7.6, 4, 7.6, 1.2, '#2B8A6E', '#F4F1EA', { sc: eBack(seg(t, 21.4, 21.9)) }); hit(88, 5, 4, 21.4, PAL.sageHi, 300); } }
      }
    }
    // ===== PART 2 =====
    if (t >= 22.3) {
      // no overnight miracle: four obstacles stand between a hire and a result
      if (t < 43.2) {
        Box(110, 0, 0, 8, 5, 5, '#3D6F86'); Label('TERRAFAB', 110, 6.2, 0, 6, 1.0, '#0B1A22', '#E2B857', { sc: eBack(seg(t, 22.5, 23.0)) });
        const jw = seg(t, 22.4, 24.4); Char('jensen', lerp(100, 105, easeInOut(jw)), 6.6, 2.35, { facing: 1, phase: 6, walkAmt: jw > 0 && jw < 1 ? 1 : 0, armAngleR: -0.4, armAngleL: 0.3, talk: 0.3 }, 22.4, 43.2, t); Char('elon', 116, 6.6, 2.4, { facing: -1, phase: 7, armAngleR: -1.65, armAngleL: 0.3, talk: 0.6 }, 22.4, 43.2, t);
        if (t >= 26.0) { const u = eBack(seg(t, 26.0, 26.6)), fade = 1 - seg(t, 31.4, 32.0); Panel(110, 9.4, 3, 3.6, 3.0, (g, pw, ph) => { g.strokeStyle = '#E2B857'; g.lineWidth = pw * 0.07; g.beginPath(); g.moveTo(pw * 0.2, ph * 0.8); g.lineTo(pw * 0.8, ph * 0.2); g.stroke(); g.fillStyle = '#F4F1EA'; g.fillRect(pw * 0.75, ph * 0.15, pw * 0.1, pw * 0.1); g.strokeStyle = '#D8483A'; g.lineWidth = pw * 0.07; g.beginPath(); g.moveTo(pw * 0.1, ph * 0.1); g.lineTo(pw * 0.9, ph * 0.9); g.moveTo(pw * 0.9, ph * 0.1); g.lineTo(pw * 0.1, ph * 0.9); g.stroke(); }, { sx: u * fade, sy: u * fade }); Label('NO MAGIC WAND', 110, 12.4, 3, 8, 1.0, '#C8463C', '#F4F1EA', { sc: eBack(seg(t, 26.0, 26.5)) * fade }); }
        [['CLEAN ROOM PHYSICS', 120, 29.64, '#2E5261'], ["INTEL'S 14A RAMP", 128, 32.72, '#3D6F86'], ['IP LAWSUITS', 136, 35.76, '#8C98A0'], ["$44B NVIDIA DEPENDENCE", 144, 38.4, '#C9A24A']].forEach((o, i) => { const u = easeOut(seg(t, o[2], o[2] + 0.7)); Box(o[1], 0, i % 2 ? 4 : -2, 5, 5 * u, 3, o[3]); Label(o[0], o[1], 6.6, i % 2 ? 4 : -2, 8.6, 0.85, '#0B1A22', '#F4F1EA', { sc: eBack(seg(t, o[2] + 0.3, o[2] + 0.8)) * (1 - seg(t, 42.6, 43.2)) }); });
        if (t >= 41.0) { Label('VERA RUBIN', 144, 10.2, 2, 7, 0.9, '#0B1A22', '#9BE01B', { sc: eBack(seg(t, 40.2, 40.7)) * (1 - seg(t, 42.6, 43.2)) }); }
      }
      // brutal multi-year war of attrition betting up to $119B, Texas to orbit
      if (t >= 43.0 && t < 63) {
        for (let i = 0; i < 10; i++) { const u = easeOut(seg(t, 43.4 + i * 0.35, 44.0 + i * 0.35)); Box(176 + (i % 5) * 2.4, 0, -2 + Math.floor(i / 5) * 2.6, 2, 0.6 * u + (i % 3) * 0.2, 2, '#6B5238'); }
        Label('A WAR OF ATTRITION', 182, 6.6, 0, 10, 1.1, '#C8463C', '#F4F1EA', { sc: eBack(seg(t, 43.2, 43.8)) * (1 - seg(t, 60.4, 61.0)) });
        if (t >= 46.84) { for (let k = 0; k < 6; k++) { const u = easeOut(seg(t, 47.0 + k * 0.3, 47.5 + k * 0.3)); Box(178 + k * 2.6, 0.8, 7, 2.0, 0.5 * u, 1.4, '#E2B857', { lw: 1 }); Label(String(26 + k), 178 + k * 2.6, 2.4, 7, 1.6, 0.6, '#0B1A22', '#F4F1EA', { sc: eBack(seg(t, 47.2 + k * 0.3, 47.7 + k * 0.3)) * (1 - seg(t, 52.4, 53.0)) }); } Label('MULTI-YEAR', 184, 4.6, 7, 7.2, 0.9, '#0B1A22', '#E2B857', { sc: eBack(seg(t, 47.4, 47.9)) * (1 - seg(t, 52.4, 53.0)) }); }
        if (t >= 49.08) { const cu = easeOut(seg(t, 49.1, 50.4)); for (let k = 0; k < 18; k++) Box(198 + (k % 6) * 1.2, Math.floor(k / 6) * 0.9 * cu, -3, 1.0, 0.8 * cu, 1.0, '#E2B857', { emis: 0.2, lw: 1 }); Label('UP TO $119 BILLION', 201, 5.6, -3, 9.4, 1.0, '#0B1A22', '#E2B857', { sc: eBack(seg(t, 49.4, 49.9)) * (1 - seg(t, 60.4, 61.0)) }); }
        if (t >= 52.98) { Char('jensen', 206, 6.4, 2.35, { facing: -1, phase: 8, armAngleR: -1.65, armAngleL: 0.3, talk: 0.5 }, 52.98, 62.4, t); Char('elon', 214, 6.4, 2.4, { facing: 1, phase: 9, armAngleR: -1.65, armAngleL: 0.3, talk: 0.5 }, 53.4, 62.4, t); Label('GREATEST CHIP DESIGNER', 206, 5.4, 6.4, 9.6, 0.85, '#0B1A22', '#64D2C7', { sc: eBack(seg(t, 53.2, 53.7)) * (1 - seg(t, 57.4, 58.0)) }); Label('MOST RELENTLESS MANUFACTURER', 215, 5.4, 6.4, 12.4, 0.85, '#0B1A22', '#E2B857', { sc: eBack(seg(t, 54.2, 54.7)) * (1 - seg(t, 57.4, 58.0)) }); }
        if (t >= 55.92) { const hu = easeOut(seg(t, 56.0, 58.0)); Box(206, 0, 0, 3, 0.6, 3, '#6B5238'); Box(206, 0.6, 0, 1.2, 12 * hu, 1.2, '#9FB3BD', { a: 0.7 }); Cyl(206, 12 * hu + 0.6, 0, 1.6, 0.4, '#3A78B8', { seg: 14 }); Label('TEXAS', 206, 1.4, 3, 3.8, 0.8, '#0B1A22', '#E2B857', { sc: eBack(seg(t, 56.2, 56.7)) * (1 - seg(t, 62.4, 63.0)) }); if (t >= 60.0) { Label('LOW-EARTH ORBIT', 206, 15.4, 0, 9, 0.95, '#0B1A22', '#64D2C7', { sc: eBack(seg(t, 60.0, 60.5)) * (1 - seg(t, 62.4, 63.0)) }); Label('SELF-CONTAINED AI ENGINE', 214, 9.4, 0, 11.6, 1.0, '#2B8A6E', '#F4F1EA', { sc: eBack(seg(t, 57.0, 57.5)) * (1 - seg(t, 62.4, 63.0)) }); } }
      }
      // sign it or use it as leverage; NVIDIA's biggest moat is lost
      if (t >= 63.0 && t < 74) {
        Box(240, 0, 0, 4, 1.2, 3, '#6B5238'); Panel(240, 2.4, 1.6, 3.2, 2.2, (g, pw, ph) => { g.fillStyle = '#F2EEE2'; g.strokeStyle = '#0B161C'; g.lineWidth = pw * 0.03; g.beginPath(); g.roundRect(0, 0, pw, ph, pw * 0.05); g.fill(); g.stroke(); g.fillStyle = '#0B161C'; g.textAlign = 'center'; g.textBaseline = 'middle'; g.font = '900 ' + ph * 0.2 + 'px system-ui'; g.fillText('CONTRACT', pw / 2, ph * 0.3); g.strokeStyle = '#2B8A6E'; g.lineWidth = pw * 0.03; g.beginPath(); g.moveTo(pw * 0.15, ph * 0.7); g.bezierCurveTo(pw * 0.3, ph * 0.4, pw * 0.4, ph * 0.9, pw * 0.85, ph * 0.6); g.stroke(); }, { sx: eBack(seg(t, 63.1, 63.7)), sy: eBack(seg(t, 63.1, 63.7)) });
        Label('SIGNS THE CONTRACT', 240, 7.0, 0, 8.4, 0.95, '#0B1A22', '#E2B857', { sc: eBack(seg(t, 63.1, 63.6)) * (1 - seg(t, 65.0, 65.6)) });
        Char('jensen', 236, 5.6, 2.35, { facing: 1, phase: 10, armAngleR: -1.65, armAngleL: 0.3, talk: 0.5 }, 63.1, 74, t);
        if (t >= 65.4) { Box(248, 0, 0, 2, 4, 2, '#3D6F86'); Box(248, 4, 0, 1.4, 1.0, 1.4, '#E2B857'); Label('ELON\'S OFFER', 248, 6.2, 0, 7, 0.9, '#0B1A22', '#E2B857', { sc: eBack(seg(t, 65.4, 65.9)) }); Label('LEVERAGE', 252, 3.6, 4, 6, 0.9, '#C8463C', '#F4F1EA', { sc: eBack(seg(t, 66.2, 66.7)) }); Line3([241, 3.4, 1.6], [247, 4.4, 0], '#E2B857', 5, 0.9); }
        if (t >= 68.0) { Label('ALREADY CERTAIN', 256, 9.4, 0, 9, 1.0, '#0B1A22', '#E2B857', { sc: eBack(seg(t, 68.0, 68.5)) * (1 - seg(t, 70.0, 70.5)) }); }
        if (t >= 70.2) { const cu = easeOut(seg(t, 70.2, 71.0)), crack = seg(t, 71.6, 72.8); Box(268, 0, 0, 14, 3 * cu, 3, '#2E5261'); Box(268, 3 * cu, 0, 14, 0.3 * cu, 3, '#9FB3BD'); Cyl(268, 0.2, 5, 4.4, 0.1, '#3A78B8', { a: 0.5, seg: 20 }); Label('NVIDIA\'S MOAT', 268, 5.4, 0, 8, 1.0, '#0B1A22', '#9BE01B', { sc: eBack(seg(t, 70.4, 70.9)) }); if (crack > 0) { Box(268, 0, 0, 0.5, 3.4 * crack, 3.2, '#0B1A22', { lw: 0 }); Box(268 + 3 * crack, 0, 0, 0.3, 3.0, 3.1, '#D8483A', { emis: 0.5, lw: 0 }); Label('LOST ITS BIGGEST MOAT', 268, 8.2, 0, 11.4, 1.0, '#C8463C', '#F4F1EA', { sc: eBack(seg(t, 72.0, 72.5)) }); hit(268, 2, 0, 71.8, PAL.coral, 320); } }
      }
      // click the video: the full boardroom story
      if (t >= 73.9) {
        Box(292, 0, 0, 12, 0.4, 4, '#2E5261'); Panel(292, 5.6, -2, 8, 4.6, (g, pw, ph) => { g.fillStyle = '#0B1A22'; g.strokeStyle = '#E2B857'; g.lineWidth = pw * 0.015; g.beginPath(); g.roundRect(0, 0, pw, ph, pw * 0.02); g.fill(); g.stroke(); g.fillStyle = '#C8463C'; g.beginPath(); g.moveTo(pw * 0.42, ph * 0.3); g.lineTo(pw * 0.42, ph * 0.7); g.lineTo(pw * 0.66, ph * 0.5); g.closePath(); g.fill(); g.fillStyle = '#F4F1EA'; g.textAlign = 'center'; g.textBaseline = 'middle'; g.font = '900 ' + ph * 0.09 + 'px system-ui'; g.fillText('FULL STORY: THE BOARDROOM IMPLOSION', pw / 2, ph * 0.86); }, { sx: eBack(seg(t, 74.0, 74.7)), sy: eBack(seg(t, 74.0, 74.7)) });
        Label('THE BOARDROOM IMPLOSION', 292, 9.4, -2, 11, 1.0, '#0B1A22', '#E2B857', { sc: eBack(seg(t, 75.9, 76.4)) });
        Label('$4 TRILLION STANDOFF', 292, 10.8, -2, 11.4, 1.0, '#C8463C', '#F4F1EA', { sc: eBack(seg(t, 80.5, 81.0)) });
        if (t >= 84.6) { const pulse = 1 + 0.08 * Math.sin(t * 8); Label('CLICK THE VIDEO', 292, 2.2, 4, 7.4, 1.1, '#C8463C', '#F4F1EA', { sc: eBack(seg(t, 84.6, 85.1)) * pulse }); Label('▼', 292, 0.8, 4, 1.6, 1.4, null, '#E2B857', { sc: pulse }); hit(292, 2.2, 4, 84.6, PAL.coral, 340); }
        Char('elon', 285, 6.0, 2.4, { facing: 1, phase: 11, armAngleR: -1.65, armAngleL: 0.3, talk: 0.5 }, 74.0, 90, t); Char('jensen', 299, 6.0, 2.35, { facing: -1, phase: 12, armAngleR: -1.65, armAngleL: 0.3, talk: 0.5 }, 74.2, 90, t);
      }
    }

    drawBG(0.05);
    GROUND.forEach(fn => fn());
    ITEMS.sort((a, b) => b.z - a.z).forEach(it => it.fn());
    OVER.forEach(fn => fn());
    HEADS.forEach(h => { const a = env(t, h[0], h[1], 0.3, 0.3); if (a > 0.01) drawShotBanner(h[2], h[3], a, h[4], t, h[0]); });
  }

