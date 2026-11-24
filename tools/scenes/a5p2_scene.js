  const HEADS = [
    [0.11, 12.50, 'NO WAR WITH NVIDIA', 'SpaceX spends tens of billions a year on NVIDIA compute', PAL.coral],
    [12.87, 27.20, 'IF SHIPMENTS SLOW', 'A six-month delay hits the $44B structure and 2027 launches', PAL.amberHi],
    [27.43, 48.90, 'THE LEGAL WALL', '33 years of Jensen\'s work belongs to NVIDIA', PAL.cyan],
    [49.09, 66.50, 'TRADE SECRET INJUNCTIONS', 'NVIDIA could bury TerraFab before a wafer ships', PAL.coral],
    [66.95, 81.28, 'BACK TO ZERO', 'New chip, new software, against the CUDA moat', PAL.sageHi]
  ];
  const pad = (x0, z0, x1, z1, col) => groundPoly([[x0, z0], [x1, z0], [x1, z1], [x0, z1]], 0.01, col, null, 0);
  const Line3 = (a, b, col, lw, al) => { const A = toCam(a[0], a[1], a[2]), B = toCam(b[0], b[1], b[2]), cl = clipLine(A, B); if (!cl) return; const p = scr(cl[0]), q = scr(cl[1]); item((cl[0][2] + cl[1][2]) / 2, () => { ctx.save(); ctx.globalAlpha = al === undefined ? 1 : al; ctx.strokeStyle = col; ctx.lineWidth = lw; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y); ctx.stroke(); ctx.restore(); }); };

  function renderShots(t) {
    const cv = evalCam(t);
    Cam3D.set([cv[0], cv[1], cv[2]], [cv[3], cv[4], cv[5]], cv[6], 0.01 * Math.sin(t * 0.6));
    GROUND = []; ITEMS = []; OVER = [];
    const hit = (x, y, z, ht, col, r) => { const p = S(x, y, z); if (p) OVER.push(() => hitFx(p.x, p.y, t, ht, { color: col, r: r || 240, rays: 14 })); };
    const coin = (x, y, z) => Cyl(x, y, z, 0.25, 0.07, '#E2B857', { emis: 0.25, seg: 10, lw: 1 });
    const paper = (x, y, z, w, h, d) => Box(x, y, z, w, h, d, '#F2EEE2', { lw: 1 });
    pad(-14, -9, 32, 14, '#0E2A36'); pad(46, -9, 72, 9, '#12303C'); pad(72, -9, 94, 9, '#0E2A36'); pad(94, -9, 122, 12, '#12303C'); pad(128, -9, 160, 9, '#0E2A36');
    groundPath([[-6, 6], [20, 6], [52, 6], [84, 6], [104, 6], [140, 6], [150, 6]], 0.05, '#E2B857', 5, seg(t, 0.4, 79));

    // 1-3: no war with NVIDIA; SpaceX spends tens of billions a year; a slowdown would hit the $44B structure and the 2027 launch
    if (t < 27.2) {
      const bu = easeOut(seg(t, 0.2, 1.2));
      Box(2, 0, -2, 6, 6 * bu, 4, '#C9A24A'); Box(20, 0, -2, 5, 8 * bu, 4, '#5D9B00');
      Label('SPACEX', 2, 7.2, -2, 4.4, 0.95, '#0B1A22', '#E2B857', { sc: eBack(seg(t, 0.4, 0.9)) }); Label('NVIDIA', 20, 9.2, -2, 4.4, 0.95, '#0B1A22', '#9BE01B', { sc: eBack(seg(t, 0.6, 1.1)) });
      Label('THE REAL WORLD', 11, 10.6, -2, 8, 1.0, '#0B1A22', '#F4F1EA', { sc: eBack(seg(t, 0.2, 0.7)) * (1 - seg(t, 2.6, 3.1)) });
      const ew = easeOut(seg(t, 3.0, 4.2));
      Char('elon', lerp(-8, -3, ew), 7.6, 2.4, { facing: 1, phase: 1, walkAmt: ew > 0 && ew < 1 ? 1 : 0, armAngleR: ew >= 1 ? -1.65 : -0.4, armAngleL: 0.3, talk: ew >= 1 ? 0.7 : 0 }, 3.0, 27.2, t);
      if (t >= 3.3 && t < 12.5) Panel(11, 5.6, 4, 3.0, 3.0, (g, pw, ph) => { g.fillStyle = '#F2EEE2'; g.beginPath(); g.arc(pw / 2, ph / 2, pw * 0.46, 0, TAU); g.fill(); g.strokeStyle = '#D8483A'; g.lineWidth = pw * 0.09; g.beginPath(); g.arc(pw / 2, ph / 2, pw * 0.44, 0, TAU); g.stroke(); g.fillStyle = '#0B161C'; g.textAlign = 'center'; g.textBaseline = 'middle'; g.font = '900 ' + pw * 0.26 + 'px system-ui'; g.fillText('WAR', pw / 2, ph / 2); g.strokeStyle = '#D8483A'; g.lineWidth = pw * 0.09; g.beginPath(); g.moveTo(pw * 0.2, pw * 0.2); g.lineTo(pw * 0.8, ph * 0.8); g.stroke(); }, { sx: eBack(seg(t, 3.3, 3.9)) * (1 - seg(t, 12.0, 12.5)), sy: eBack(seg(t, 3.3, 3.9)) * (1 - seg(t, 12.0, 12.5)) });
      if (t >= 3.4 && t < 12.5) Label('CANNOT DECLARE WAR', 11, 8.6, 4, 9.0, 0.95, '#C8463C', '#F4F1EA', { sc: eBack(seg(t, 3.4, 3.9)) * (1 - seg(t, 6.6, 7.1)) });
      if (t >= 7.0) for (let i = 0; i < 16; i++) { const u = (((t - 7.0) * 0.5 + i / 16) % 1 + 1) % 1; coin(lerp(5, 17.5, u), 2 + Math.sin(u * Math.PI) * 2, lerp(2, 2, u)); }
      if (t >= 7.2 && t < 12.6) { Label('TENS OF BILLIONS', 11, 11.2, 2, 9, 1.0, '#0B1A22', '#E2B857', { sc: eBack(seg(t, 7.4, 7.9)) * (1 - seg(t, 12.1, 12.6)) }); Label('IN A SINGLE YEAR', 11, 9.8, 2, 7.6, 0.8, '#E2B857', '#0B161C', { sc: eBack(seg(t, 9.2, 9.7)) * (1 - seg(t, 12.1, 12.6)) }); }
      if (t >= 9.9) { for (let k = 0; k < 3; k++) Box(15 + k * 1.4, 0, 6, 1.1, 2.2, 1.0, '#16303A', { emis: 0.2 }); Label('NVIDIA COMPUTE', 16.4, 3.6, 6, 6.2, 0.8, '#0B1A22', '#64D2C7', { sc: eBack(seg(t, 10.0, 10.5)) * (1 - seg(t, 12.6, 13.2)) }); }
      // conveyor of Vera Rubin racks that slows when the new leadership brakes
      if (t >= 12.8) {
        Box(11, 0, 5, 16, 0.3, 1.2, '#2E5261');
        const slow = easeOut(seg(t, 13.6, 14.6)), sp = lerp(0.35, 0.07, slow), ph = (t * sp) % 1;
        for (let i = 0; i < 5; i++) { const u = ((ph + i / 5) % 1); Box(lerp(19, 3, u), 0.3, 5, 1.1, 1.6, 0.9, '#16303A', { emis: 0.25 }); }
        Label('VERA RUBIN SHIPMENTS', 11, 3.4, 5, 9.0, 0.8, '#0B1A22', '#9BE01B', { sc: eBack(seg(t, 12.9, 13.4)) * (1 - seg(t, 26.4, 27.0)) });
        Char('analyst', 22.4, 7.6, 2.3, { facing: -1, phase: 2, armAngleR: t >= 14.0 ? -1.9 : -0.4, armAngleL: 0.3, browTension: 0.3, talk: 0.5 }, 13.0, 27.2, t);
        Label('NEW LEADERSHIP SLOWS IT DOWN', 14, 11.0, 5, 12.4, 1.0, '#C8463C', '#F4F1EA', { sc: eBack(seg(t, 13.4, 13.9)) * (1 - seg(t, 19.0, 19.6)) });
        if (t >= 14.6) Box(2.2, 0.3, 5, 0.5, 1.2, 0.5, '#D8483A', { emis: 0.6 });
        if (t >= 16.6) Label('SIX MONTHS LATE', 11, 10.2, 5, 8.2, 1.0, '#0B1A22', '#E2B857', { sc: eBack(seg(t, 16.6, 17.1)) * (1 - seg(t, 26.4, 27.0)) });
      }
      if (t >= 19.2) {
        const fa = eBack(seg(t, 19.3, 19.9)), sh1 = t >= 23.4 ? Math.sin((t - 23.4) * 30) * 0.2 * (1 - seg(t, 23.4, 24.4)) : 0, sh2 = t >= 24.4 ? Math.sin((t - 24.4) * 30) * 0.2 * (1 - seg(t, 24.4, 25.4)) : 0;
        for (let k = 0; k < 14; k++) paper(6 + sh1, k * 0.3, 11, 3, 0.26 * Math.max(0.01, fa), 2.2);
        Label('$44B FINANCING', 6, 6.2, 11, 6.4, 0.9, '#0B1A22', '#E2B857', { sc: eBack(seg(t, 19.4, 19.9)) });
        Cyl(16 + sh2, 0, 11, 1.1, 6 * fa, '#CFD6DA', { seg: 14 }); Cyl(16 + sh2, 6 * fa, 11, 0.75, 1.3 * fa, '#9FB3BD', { seg: 14 });
        Label('2027 SATELLITE LAUNCH', 16, 9.4, 11, 8.6, 0.9, '#0B1A22', '#64D2C7', { sc: eBack(seg(t, 21.4, 21.9)) });
        [[6, 23.0], [16, 24.0]].forEach(m => { const f = seg(t, m[1], m[1] + 0.4); if (f > 0 && f < 1) Box(m[0], lerp(14, 3, eIn(f)), 11, 1.6, 1.6, 1.6, '#C8463C', { emis: 0.5 }); if (t >= m[1] + 0.4) hit(m[0], 3, 11, m[1] + 0.4, PAL.coral, 280); });
        if (t >= 24.6) Label('DIRECT HIT', 11, 12.4, 11, 7.2, 1.2, '#C8463C', '#F4F1EA', { sc: eBack(seg(t, 24.6, 25.2)) * (1 - seg(t, 26.4, 27.0)) });
      }
    }
    // 4: the legal wall on Jensen's side; 33 years is not a blank slate
    if (t >= 27.3 && t < 48.6) {
      Box(50, 0, 0, 5, 7, 4, '#5D9B00'); Label('NVIDIA', 50, 8.2, 0, 4.4, 0.95, '#0B1A22', '#9BE01B', { sc: eBack(seg(t, 27.6, 28.1)) });
      for (let r = 0; r < 3; r++) for (let c = 0; c < 8; c++) { const u = easeOut(seg(t, 27.6 + (c + r * 8) * 0.08, 28.1 + (c + r * 8) * 0.08)); Box(58, r * 1.2, -4.6 + c * 1.3, 1.5, 1.1 * u, 1.2, '#8C98A0'); }
      Label('LEGAL WALL', 58, 5.6, 0, 6.4, 1.0, '#C8463C', '#F4F1EA', { sc: eBack(seg(t, 28.0, 28.5)) });
      Char('jensen', 65, 3.2, 2.35, { facing: -1, phase: 3, armAngleR: -0.4, armAngleL: 0.3, browTension: 0.6 }, 27.6, 38.0, t);
      if (t >= 30.8 && t < 38.2) Panel(60, 9.4, -3, 10, 1.8, (g, pw, ph) => { g.fillStyle = '#0B1A22'; g.strokeStyle = '#E2B857'; g.lineWidth = pw * 0.01; g.beginPath(); g.roundRect(0, 0, pw, ph, ph * 0.2); g.fill(); g.stroke(); const n = Math.floor(33 * seg(t, 31.2, 34.0)); for (let k = 0; k < 33; k++) { g.fillStyle = k < n ? '#E2B857' : '#2E5261'; g.fillRect(pw * 0.04 + k * pw * 0.028, ph * 0.3, pw * 0.02, ph * 0.4); } g.fillStyle = '#F4F1EA'; g.textAlign = 'center'; g.textBaseline = 'middle'; g.font = '900 ' + ph * 0.3 + 'px system-ui'; g.fillText('33 YEARS AT THE HELM', pw / 2, ph * 0.84); }, { sx: eBack(seg(t, 30.8, 31.3)) * (1 - seg(t, 37.6, 38.2)), sy: eBack(seg(t, 30.8, 31.3)) * (1 - seg(t, 37.6, 38.2)) });
      if (t >= 35.6 && t < 38.4) { const u = eBack(seg(t, 35.6, 36.2)) * (1 - seg(t, 37.8, 38.4)); Panel(66, 5.4, 4, 3.4, 2.4, (g, pw, ph) => { g.fillStyle = '#F2EEE2'; g.strokeStyle = '#0B161C'; g.lineWidth = pw * 0.03; g.beginPath(); g.roundRect(0, 0, pw, ph, pw * 0.05); g.fill(); g.stroke(); g.strokeStyle = '#D8483A'; g.lineWidth = pw * 0.05; g.beginPath(); g.moveTo(pw * 0.15, ph * 0.15); g.lineTo(pw * 0.85, ph * 0.85); g.moveTo(pw * 0.85, ph * 0.15); g.lineTo(pw * 0.15, ph * 0.85); g.stroke(); }, { sx: u, sy: u }); Label('NOT A BLANK SLATE', 66, 7.6, 4, 7.4, 0.9, '#C8463C', '#F4F1EA', { sc: eBack(seg(t, 36.0, 36.5)) * (1 - seg(t, 37.8, 38.4)) }); }
    }
    // 5: every blueprint, protocol and optimization belongs to NVIDIA
    if (t >= 38.6 && t < 49) {
      [['BLUEPRINTS', 76, 38.9, 44.5], ['NVLINK PROTOCOLS', 82, 40.4, 45.3], ['CUDA OPTIMIZATIONS', 88, 43.3, 46.2]].forEach(c => {
        const u = easeOut(seg(t, c[2] - 0.3, c[2] + 0.4)); Box(c[1], 0, 0, 3, 3.6 * u, 2, '#6B7C86'); Box(c[1], 3.6 * u, 0, 3.2, 0.2, 2.2, '#9FB3BD');
        Label(c[0], c[1], 5.4, 0, 5.6, 0.85, '#0B1A22', '#F4F1EA', { sc: eBack(seg(t, c[2], c[2] + 0.5)) });
        if (t >= c[3]) { Label('OWNED BY NVIDIA', c[1], 2.0, 1.2, 4.4, 0.9, '#5D9B00', '#F4F1EA', { sc: eBack(seg(t, c[3], c[3] + 0.4)), rot: -0.08 }); hit(c[1], 2.4, 1.2, c[3], PAL.sageHi, 230); }
      });
      Label('BELONGS LEGALLY TO NVIDIA', 82, 8.6, 0, 11.8, 1.1, '#0B1A22', '#9BE01B', { sc: eBack(seg(t, 46.2, 46.8)) });
    }
    // 6: Jensen walks into TerraFab with ex-NVIDIA engineers; a lookalike chip; the legal team buries TerraFab in injunctions
    if (t >= 49 && t < 66.4) {
      Box(104, 0, 0, 10, 5, 5, '#3D6F86'); Label('TERRAFAB', 104, 6.4, 0, 6, 1.1, '#0B1A22', '#E2B857', { sc: eBack(seg(t, 49.1, 49.6)) });
      const jw = easeInOut(seg(t, 49.2, 51.2));
      Char('jensen', lerp(92, 99, jw), 5.4, 2.35, { facing: 1, phase: 4, walkAmt: jw > 0 && jw < 1 ? 1 : 0, armAngleR: -0.4, armAngleL: 0.3, talk: 0.4 }, 49.2, 66.4, t);
      [0, 1, 2, 3].forEach(i => { const w = easeInOut(seg(t, 51.4 + i * 0.3, 53.6 + i * 0.3)); Char('analyst', lerp(86, 95.5, w) - i * 1.6, 6.4, 2.2, { facing: 1, phase: 5 + i, walkAmt: w > 0 && w < 1 ? 1 : 0, armAngleR: -0.4, armAngleL: 0.3 }, 51.4 + i * 0.3, 66.4, t); });
      Label('FORMER NVIDIA ENGINEERS', 92, 5.4, 6, 8.8, 0.8, '#0B1A22', '#64D2C7', { sc: eBack(seg(t, 52.0, 52.5)) * (1 - seg(t, 56.0, 56.6)) });
      if (t >= 55.4) { Box(108, 0.1, 8.4, 1.6, 0.3, 1.6, '#5D9B00', { emis: 0.3 }); Box(112, 0.1, 8.4, 1.6, 0.3, 1.6, '#45B8AC', { emis: 0.3 }); Label('≈', 110, 1.6, 8.4, 1.4, 1.2, null, '#E2B857', { sc: eBack(seg(t, 56.2, 56.7)) }); Label('NVIDIA IP', 108, 2.6, 8.4, 3.4, 0.7, '#0B1A22', '#9BE01B', { sc: eBack(seg(t, 55.6, 56.1)) }); Label('JENSEN\'S NEW CHIP', 112.6, 2.6, 8.4, 4.6, 0.7, '#0B1A22', '#64D2C7', { sc: eBack(seg(t, 56.0, 56.5)) }); Label('LOOKS LIKE NVIDIA IP', 110, 4.4, 8.4, 8.4, 0.9, '#C8463C', '#F4F1EA', { sc: eBack(seg(t, 57.5, 58.0)) * (1 - seg(t, 61.2, 61.8)) }); }
      [0, 1, 2].forEach(i => { const w = easeInOut(seg(t, 58.3 + i * 0.25, 60.6 + i * 0.25)); Char('lawyer', lerp(130, 119, w) + i * 1.5, 6 + i * 0.6, 2.3, { facing: -1, phase: 9 + i, walkAmt: w > 0 && w < 1 ? 1 : 0, armAngleR: -0.4, armAngleL: 0.3, browTension: 0.7 }, 58.3 + i * 0.25, 66.4, t); });
      for (let k = 0; k < 16; k++) { const u = easeOut(seg(t, 62.0 + k * 0.12, 62.6 + k * 0.12)); paper(100 + (k % 4) * 2.6, Math.floor(k / 4) * 0.5 + 0.2, 3.6, 2.2, 0.4 * u, 1.6); }
      if (t >= 62.0) Label('TRADE SECRET INJUNCTIONS', 104, 9.6, 3.6, 11.2, 1.0, '#C8463C', '#F4F1EA', { sc: eBack(seg(t, 62.0, 62.6)) });
      if (t >= 64.4) { Box(113, 0, 0.5, 0.4, 2.6, 3, '#D8483A', { emis: 0.4 }); Cyl(114.8, 0.3, 0.5, 0.7, 0.14, '#9FB3BD', { seg: 12 }); Label('BEFORE A SINGLE WAFER LEAVES', 114, 4.4, 0.5, 8.6, 0.85, '#0B1A22', '#E2B857', { sc: eBack(seg(t, 64.5, 65.0)) }); hit(113, 1.4, 0.5, 64.4, PAL.coral, 260); }
    }
    // 7: a brand new chip and a brand new software ecosystem against the CUDA moat
    if (t >= 66.9) {
      Panel(134, 4, 0, 4.6, 3.2, (g, pw, ph) => { g.fillStyle = '#0F2B3A'; g.strokeStyle = '#64D2C7'; g.lineWidth = pw * 0.02; g.beginPath(); g.roundRect(0, 0, pw, ph, pw * 0.04); g.fill(); g.stroke(); g.strokeStyle = 'rgba(100,210,199,0.3)'; g.lineWidth = 1; for (let k = 1; k < 10; k++) { g.beginPath(); g.moveTo(pw * k / 10, 0); g.lineTo(pw * k / 10, ph); g.stroke(); g.beginPath(); g.moveTo(0, ph * k / 8); g.lineTo(pw, ph * k / 8); g.stroke(); } g.fillStyle = '#E2B857'; g.textAlign = 'center'; g.textBaseline = 'middle'; g.font = '900 ' + pw * 0.16 + 'px system-ui'; g.fillText('FROM ZERO', pw / 2, ph / 2); }, { sx: eBack(seg(t, 67.0, 67.6)), sy: eBack(seg(t, 67.0, 67.6)) });
      Label('NEW CHIP ARCHITECTURE', 134, 6.8, 0, 8.6, 0.95, '#0B1A22', '#64D2C7', { sc: eBack(seg(t, 67.2, 67.8)) });
      for (let k = 0; k < 4; k++) { const u = easeOut(seg(t, 69.6 + k * 0.7, 70.2 + k * 0.7)); Box(142, k * 1.1, 0, 4, 1.0 * u, 3, ['#2B8A6E', '#3D6F86', '#C9A24A', '#6B5238'][k]); }
      Label('NEW SOFTWARE ECOSYSTEM', 142, 5.4, 0, 10.4, 0.95, '#0B1A22', '#E2B857', { sc: eBack(seg(t, 72.7, 73.2)) * (1 - seg(t, 76.0, 76.6)) });
      Char('jensen', 138, 5.8, 2.35, { facing: 1, phase: 6, armAngleR: -1.65, armAngleL: 0.3, talk: 0.6 }, 67.2, 82, t);
      if (t >= 75.8) {
        const mu = easeOut(seg(t, 75.8, 77.0));
        groundPoly([[144, -6.5], [156, -6.5], [156, 6.5], [144, 6.5]], 0.03, '#1A4E78', null, 0, mu); groundPoly([[146.5, -4], [153.5, -4], [153.5, 4], [146.5, 4]], 0.05, '#12303C', '#E2B857', 3, mu);
        Box(150, 0, 0, 4, 5 * mu, 4, '#5D9B00'); Label('CUDA', 150, 6.2, 0, 4.4, 1.0, '#0B1A22', '#9BE01B', { sc: eBack(seg(t, 76.2, 76.7)) });
        Label('SOFTWARE MOAT', 150, 8.2, 0, 8.4, 1.0, '#0B1A22', '#E2B857', { sc: eBack(seg(t, 76.4, 76.9)) });
        if (t >= 77.4) Label('20 YEARS TO BUILD', 150, 10.2, 0, 9, 0.9, '#2B8A6E', '#F4F1EA', { sc: eBack(seg(t, 77.4, 77.9)) });
        if (t >= 79.2) { Label('IMPOSSIBLE TO REPLACE', 150, 12.0, 0, 11, 1.1, '#C8463C', '#F4F1EA', { sc: eBack(seg(t, 79.2, 79.8)) }); hit(150, 3, 0, 79.2, PAL.coral, 340); }
      }
    }

    drawBG(0.1);
    GROUND.forEach(fn => fn());
    ITEMS.sort((a, b) => b.z - a.z).forEach(it => it.fn());
    OVER.forEach(fn => fn());
    HEADS.forEach(h => { const a = env(t, h[0], h[1], 0.3, 0.3); if (a > 0.01) drawShotBanner(h[2], h[3], a, h[4], t, h[0]); });
  }

