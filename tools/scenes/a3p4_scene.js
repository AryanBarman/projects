  const HEADS = [
    [0.00, 5.20, 'REALITY CHECK', 'The dream meets its first brutal test', PAL.coral],
    [5.30, 23.50, 'THE PRICE TAG AND THE CLOCK', 'Construction from Dec 2026; Phase 1 runs to late 2028 or 2029', PAL.amberHi],
    [23.84, 37.00, 'THE $119B CEILING', 'Four bets, only $16.8B committed', PAL.cyan],
    [37.32, 49.28, 'A BIGGER ENGINEERING PROBLEM', 'Designing a chip is not printing it', PAL.coral]
  ];
  const pad = (x0, z0, x1, z1, col) => groundPoly([[x0, z0], [x1, z0], [x1, z1], [x0, z1]], 0.01, col, null, 0);

  function renderShots(t) {
    const cv = evalCam(t);
    Cam3D.set([cv[0], cv[1], cv[2]], [cv[3], cv[4], cv[5]], cv[6], 0.01 * Math.sin(t * 0.6));
    GROUND = []; ITEMS = []; OVER = [];
    const hit = (x, y, z, ht, col, r) => { const p = S(x, y, z); if (p) OVER.push(() => hitFx(p.x, p.y, t, ht, { color: col, r: r || 240, rays: 14 })); };
    const coin = (x, y, z, a) => Cyl(x, y, z, 0.25, 0.07, '#E2B857', { emis: 0.25, seg: 10, lw: 1, a: a });
    pad(-10, -8, 22, 8, '#0E2A36'); pad(22, -8, 62, 8, '#12303C'); pad(62, -9, 90, 9, '#0E2A36'); pad(90, -8, 106, 8, '#12303C');
    groundPath([[-8, 0], [10, 0], [30, 0], [52, 0], [75, 0], [96, 0], [118, 0]], 0.05, '#E2B857', 5, seg(t, 0.5, 47));

    // 1: the dream hits reality
    {
      const fall = seg(t, 0.6, 2.9), y = lerp(6.5, 1.1, eIn(fall));
      if (t < 2.9) { Box(0, y, 0, 2.2, 2.2, 2.2, '#E2B857', { emis: 0.5 }); Label('THE DREAM', 0, y + 3.2, 0, 4.6, 0.9, '#0B1A22', '#E2B857', { sc: eBack(seg(t, 0.2, 0.7)) }); }
      else for (let i = 0; i < 14; i++) { const a = i * 2.4, v = 2 + (i % 4), ts = Math.min(t - 2.9, 1.6); Box(Math.cos(a) * v * ts * 0.9, Math.max(0, 1.1 + 4 * ts - 5 * ts * ts), Math.sin(a) * v * ts * 0.5, 0.45, 0.45, 0.45, '#E2B857', { emis: 0.2 }); }
      if (t >= 3.06) Label('REALITY CHECK', 0, 3.8, 0, 6.6, 1.1, '#C8463C', '#F4F1EA', { sc: eBack(seg(t, 3.06, 3.6)) * (1 - seg(t, 5.0, 5.4)) });
      if (t >= 2.9) hit(0, 1.2, 0, 2.9, PAL.coral, 320);
    }
    // 2: the price tag and the clock
    if (t >= 5.2) {
      const u = eBack(seg(t, 5.3, 5.9));
      Box(8, 0, 0, 0.12, 4.6, 0.12, '#9FB3BD'); Box(13.2, 0, 0, 0.12, 4.6, 0.12, '#9FB3BD');
      Panel(8, 3.4, 0, 3.0, 2.0, (g, pw, ph) => { g.fillStyle = '#F2EEE2'; g.strokeStyle = '#0B161C'; g.lineWidth = pw * 0.03; g.beginPath(); g.roundRect(0, 0, pw, ph, pw * 0.08); g.fill(); g.stroke(); g.fillStyle = '#C8463C'; g.beginPath(); g.arc(pw * 0.14, ph * 0.5, pw * 0.05, 0, TAU); g.fill(); g.fillStyle = '#0B161C'; g.textAlign = 'center'; g.textBaseline = 'middle'; g.font = '900 ' + ph * 0.38 + 'px system-ui'; g.fillText('$119B', pw * 0.56, ph * 0.5); }, { sx: u, sy: u, rot: Math.sin(t * 2) * 0.05 });
      Panel(13.2, 3.4, 0, 2.2, 2.2, (g, pw, ph) => { g.fillStyle = '#F2EEE2'; g.strokeStyle = '#0B161C'; g.lineWidth = pw * 0.05; g.beginPath(); g.arc(pw / 2, ph / 2, pw * 0.47, 0, TAU); g.fill(); g.stroke(); g.strokeStyle = '#0B161C'; g.lineCap = 'round'; for (let k = 0; k < 12; k++) { const a = k / 12 * TAU; g.lineWidth = pw * 0.025; g.beginPath(); g.moveTo(pw / 2 + Math.cos(a) * pw * 0.38, ph / 2 + Math.sin(a) * pw * 0.38); g.lineTo(pw / 2 + Math.cos(a) * pw * 0.43, ph / 2 + Math.sin(a) * pw * 0.43); g.stroke(); } g.lineWidth = pw * 0.05; g.beginPath(); g.moveTo(pw / 2, ph / 2); g.lineTo(pw / 2 + Math.cos(t * 6) * pw * 0.3, ph / 2 + Math.sin(t * 6) * pw * 0.3); g.stroke(); g.strokeStyle = '#C8463C'; g.lineWidth = pw * 0.035; g.beginPath(); g.moveTo(pw / 2, ph / 2); g.lineTo(pw / 2 + Math.cos(t * 0.8) * pw * 0.2, ph / 2 + Math.sin(t * 0.8) * pw * 0.2); g.stroke(); }, { sx: u, sy: u });
    }
    // 3: Dec 2026 construction start, Phase 1 runs to late 2028 or 2029
    if (t >= 7.9 && t < 24) {
      groundPoly([[16, -1.6], [46, -1.6], [46, 1.6], [16, 1.6]], 0.02, '#2A4452', null, 0);
      [[2026, 18, 10.6], [2027, 26, 11.8], [2028, 34, 13.0], [2029, 42, 15.7]].forEach(y => { const u = easeOut(seg(t, y[2], y[2] + 0.5)); Box(y[1], 0, 2.4, 0.2, 2.6 * u, 0.2, '#9FB3BD'); Label(String(y[0]), y[1], 3.5, 2.4, 2.4, 0.8, '#0B1A22', '#E2B857', { sc: eBack(seg(t, y[2] + 0.2, y[2] + 0.7)) }); });
      if (t >= 10.4) { const cu = easeOut(seg(t, 10.4, 11.2)); Box(18, 0, -2.6, 0.4, 4 * cu, 0.4, '#E2B857'); Box(19.4, 4 * cu, -2.6, 3.4, 0.25, 0.3, '#E2B857'); Label('DEC 2026: CONSTRUCTION STARTS', 18, 6.2, -2.6, 8.6, 0.85, '#C8463C', '#F4F1EA', { sc: eBack(seg(t, 10.6, 11.2)) * (1 - seg(t, 13.8, 14.4)) }); }
      const xe = 18 + 18 * easeOut(seg(t, 11.5, 14.5)) + 6 * easeOut(seg(t, 15.6, 16.6));
      if (t >= 11.5) { Box((18 + xe) / 2, 0.05, 0, xe - 18, 0.6, 1.8, '#2B8A6E', { emis: 0.2 }); Label('PHASE 1', (18 + xe) / 2, 1.5, 0, 3.6, 0.7, '#0B1A22', '#9BE01B', { sc: eBack(seg(t, 11.7, 12.2)) }); }
      if (t >= 14.6) Label('LATE 2028 OR 2029', 38, 5.4, 0, 7.8, 1.0, '#0B1A22', '#E2B857', { sc: eBack(seg(t, 14.6, 15.1)) });
    }
    // 4: the $119 billion is not one check in a bank account
    if (t >= 15.7 && t < 36) {
      const u = eBack(seg(t, 15.8, 16.5)), tr = easeOut(seg(t, 19.5, 20.4));
      const check = (half) => (g, pw, ph) => {
        g.save(); g.beginPath(); if (half === 0) { g.moveTo(0, 0); g.lineTo(pw, 0); g.lineTo(0, ph); } else { g.moveTo(pw, 0); g.lineTo(pw, ph); g.lineTo(0, ph); } g.closePath(); g.clip();
        g.fillStyle = '#F2EEE2'; g.fillRect(0, 0, pw, ph); g.strokeStyle = '#0B161C'; g.lineWidth = pw * 0.015; g.strokeRect(2, 2, pw - 4, ph - 4);
        g.fillStyle = '#0B161C'; g.textAlign = 'center'; g.textBaseline = 'middle'; g.font = '900 ' + ph * 0.3 + 'px system-ui'; g.fillText('$119 BILLION', pw / 2, ph * 0.5); g.font = '700 ' + ph * 0.1 + 'px system-ui'; g.fillText('PAY TO THE ORDER OF TERRAFAB', pw / 2, ph * 0.8); g.restore();
      };
      Panel(51 - tr * 0.7, 3.6 + tr * 0.4, 0, 6, 2.8, check(0), { sx: u, sy: u, rot: -tr * 0.25 }); Panel(51 + tr * 0.7, 3.6 - tr * 0.9, 0, 6, 2.8, check(1), { sx: u, sy: u, rot: tr * 0.25 });
      if (t >= 19.6) Label('NOT A SINGLE CHECK', 51, 5.6, 0, 8.2, 1.0, '#C8463C', '#F4F1EA', { sc: eBack(seg(t, 19.6, 20.1)) * (1 - seg(t, 23.0, 23.6)) });
      const door = easeInOut(seg(t, 21.4, 22.6));
      Box(58, 0, 0, 4.4, 4.2, 3, '#6B7C86'); Box(58, 0.3, 1.52, 3.4 * (1 - door * 0.9), 3.4, 0.16, '#9FB3BD'); if (door > 0.3) Box(58, 0.3, 1.0, 3.2, 3.4, 0.05, '#0B1A22', { lw: 0 });
      Label('BANK ACCOUNT', 58, 5.6, 0, 5.6, 0.9, '#0B1A22', '#F4F1EA', { sc: eBack(seg(t, 21.0, 21.5)) * (1 - seg(t, 23.0, 23.6)) });
      if (t >= 22.0) Label('EMPTY', 58, 2.2, 1.8, 2.6, 0.8, '#C8463C', '#F4F1EA', { sc: eBack(seg(t, 22.2, 22.7)) * (1 - seg(t, 23.0, 23.6)) });
    }
    // 5-6: a 10-year ceiling over four separate bets; only Phase 1 is committed; even if Elon raises it all
    if (t >= 23.8) {
      const cu = easeOut(seg(t, 24.4, 25.4));
      Box(75, 7.2, 0, 22, 0.5, 5, '#9FB3BD', { a: 0.55 * cu });
      if (t >= 24.4) Label('10-YEAR CEILING', 75, 8.8, 0, 9, 1.1, '#0B1A22', '#E2B857', { sc: eBack(seg(t, 24.5, 25.1)) });
      const PX = [67, 72, 77, 82];
      PX.forEach((x, i) => {
        const gu = easeOut(seg(t, 25.4 + i * 0.35, 26.1 + i * 0.35)), solid = i === 0 ? seg(t, 28.0, 28.8) : seg(t, 32.2 + (i - 1) * 1.4, 33.4 + (i - 1) * 1.4);
        Box(x, 0, 0, 3, 6.4 * gu, 3, i === 0 ? '#2B8A6E' : '#E2B857', { a: 0.22 + 0.78 * solid, emis: 0.15 * solid });
        if (gu > 0.9) Label('PHASE ' + (i + 1), x, 3.2, 1.6, 2.8, 0.7, '#0B1A22', '#F4F1EA', { sc: eBack(seg(t, 26.2 + i * 0.35, 26.7 + i * 0.35)) });
        if (i > 0 && t >= 29.6 && t < 32.2) Label('NOT COMMITTED', x, 7.9, 0, 3.4, 0.6, '#C8463C', '#F4F1EA', { sc: eBack(seg(t, 29.6 + i * 0.15, 30.1 + i * 0.15)) });
      });
      if (t >= 26.3) Label('FOUR SEPARATE BETS', 75, 11.0, 0, 9.6, 1.0, '#C8463C', '#F4F1EA', { sc: eBack(seg(t, 26.3, 26.8)) * (1 - seg(t, 30.8, 31.4)) });
      if (t >= 28.2) { Label('$16.8B COMMITTED', 67, 8.6, 0, 6.2, 0.9, '#2B8A6E', '#F4F1EA', { sc: eBack(seg(t, 28.2, 28.7)) }); hit(67, 3.5, 0, 28.2, PAL.sageHi, 260); }
      if (t >= 31.6 && t < 37.4) Label('EVEN IF ELON RAISES EVERY PENNY', 75, 12.4, 0, 14, 1.1, '#0B1A22', '#E2B857', { sc: eBack(seg(t, 31.6, 32.2)) * (1 - seg(t, 36.8, 37.4)) });
      if (t >= 32.0 && t < 37.0) for (let i = 0; i < 12; i++) { const u = (((t - 32.0) * 0.6 + i / 12) % 1 + 1) % 1, tx = [72, 77, 82][i % 3]; coin(lerp(75, tx, u), 2.4 + Math.sin(u * Math.PI) * 2.6, 3.4 * (1 - u), 1); }
      Char('elon', 75, 4.4, 2.4, { facing: 1, phase: 1, armAngleR: -1.9, armAngleL: -1.2, talk: 0.7 }, 31.0, 37.5, t);
    }
    // 7: a much bigger engineering problem hiding inside TerraFab's blueprint
    if (t >= 37.2 && t < 44.4) {
      const bu = easeOut(seg(t, 37.4, 38.3)), lift = easeInOut(seg(t, 40.4, 41.8));
      Box(96, 0, 0, 10, 5 * bu, 5, '#3D6F86', { a: 0.5 });
      if (t >= 40.4) { const ru = easeOut(seg(t, 40.8, 41.6)); Box(96, 0.4, 0, 2.6, 2.6 * ru, 2.6, '#C8463C', { emis: 0.5 }); }
      Panel(96, lerp(2.6, 5.4, lift), 2.9, 5.2, 3.0, (g, pw, ph) => { g.fillStyle = '#1A4E78'; g.strokeStyle = '#E2B857'; g.lineWidth = pw * 0.015; g.beginPath(); g.roundRect(0, 0, pw, ph, pw * 0.03); g.fill(); g.stroke(); g.strokeStyle = 'rgba(244,241,234,0.5)'; g.lineWidth = 2; for (let k = 1; k < 10; k++) { g.beginPath(); g.moveTo(pw * k / 10, 0); g.lineTo(pw * k / 10, ph); g.stroke(); g.beginPath(); g.moveTo(0, ph * k / 8); g.lineTo(pw, ph * k / 8); g.stroke(); } g.strokeStyle = '#F4F1EA'; g.lineWidth = pw * 0.012; g.strokeRect(pw * 0.2, ph * 0.25, pw * 0.6, ph * 0.5); g.strokeRect(pw * 0.32, ph * 0.38, pw * 0.36, ph * 0.24); }, { sx: bu, sy: bu });
      Label('TERRAFAB BLUEPRINT', 96, 7.2, 0, 8.4, 1.0, '#0B1A22', '#E2B857', { sc: eBack(seg(t, 38.0, 38.6)) * (1 - seg(t, 43.4, 44.0)) });
      if (t >= 41.2) { Label('ENGINEERING PROBLEM', 96, 4.6, 3.4, 8.6, 1.0, '#C8463C', '#F4F1EA', { sc: eBack(seg(t, 41.2, 41.7)) * (1 - seg(t, 43.6, 44.2)) }); hit(96, 1.7, 0, 41.2, PAL.coral, 300); }
    }
    // 8: designing the chip and printing it are two different sports
    if (t >= 43.6) {
      const u = easeOut(seg(t, 43.8, 44.6));
      groundPoly([[107, -8], [119, -8], [119, 8], [107, 8]], 0.02, '#1E4A3A', '#F4F1EA', 3, u); groundPoly([[121, -8], [133, -8], [133, 8], [121, 8]], 0.02, '#4A3A22', '#F4F1EA', 3, u);
      [[107.4, 1], [132.6, -1]].forEach(g => { Box(g[0], 0, -1.6, 0.2, 2.4 * u, 0.2, '#F4F1EA'); Box(g[0], 0, 1.6, 0.2, 2.4 * u, 0.2, '#F4F1EA'); Box(g[0], 2.4 * u, -1.6, 0.2, 0.2, 3.4, '#F4F1EA'); });
      Box(113, 0, 0, 3, 0.9, 1.6, '#6B5238'); Box(113, 0.9, 0, 1.2, 0.16, 1.2, '#45B8AC', { emis: 0.5 });
      Label('SPORT 1: DESIGNING', 113, 5.6, 0, 8.2, 1.0, '#0B1A22', '#64D2C7', { sc: eBack(seg(t, 44.0, 44.6)) });
      Box(127, 0, 0, 6, 3.4 * u, 4, '#8C98A0'); Cyl(129.5, 0, -1, 0.8, 5.4 * u, '#C9D3D9', { seg: 10 }); Cyl(127, 3.4 * u, 0, 1.6, 0.2, '#9FB3BD', { seg: 14 });
      Label('SPORT 2: PRINTING', 127, 6.8, 0, 8.2, 1.0, '#0B1A22', '#E2B857', { sc: eBack(seg(t, 44.8, 45.4)) });
      if (t >= 47.2) { Label('TWO DIFFERENT SPORTS', 120, 9.4, 0, 12, 1.4, '#C8463C', '#F4F1EA', { sc: eBack(seg(t, 47.2, 47.8)) }); hit(120, 9.4, 0, 47.2, PAL.coral, 340); }
      Char('jensen', 111, 3.6, 2.35, { facing: 1, phase: 2, armAngleR: -1.65, armAngleL: 0.3, talk: 0.7 }, 44.0, 60, t);
      Char('analyst', 124.6, 3.4, 2.2, { facing: -1, phase: 3, armAngleR: -0.4, armAngleL: 0.3, browTension: 0.8 }, 45.0, 60, t);
    }

    drawBG(0.1);
    GROUND.forEach(fn => fn());
    ITEMS.sort((a, b) => b.z - a.z).forEach(it => it.fn());
    OVER.forEach(fn => fn());
    HEADS.forEach(h => { const a = env(t, h[0], h[1], 0.3, 0.3); if (a > 0.01) drawShotBanner(h[2], h[3], a, h[4], t, h[0]); });
  }

