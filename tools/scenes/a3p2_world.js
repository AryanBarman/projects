  const HEADS = [
    [0.00, 5.50, "THE DRIVER'S SEAT", 'Jensen takes the wheel of TerraFab', PAL.amberHi],
    [5.86, 15.00, 'THE ECONOMICS', 'Elon pays a markup on every AI server rack', PAL.coral],
    [15.14, 19.00, "NVIDIA'S MARGINS", 'Nearly 75% gross margins', PAL.amberHi],
    [19.26, 26.30, 'CUSTOM SILICON', 'Designed inside TerraFab', PAL.cyan],
    [26.32, 29.90, 'TESLA, AT COST', 'Edge inference chips for cybercabs and Optimus', PAL.coral],
    [29.92, 38.00, 'XAI SKIPS THE LINE', 'Custom clusters, no queue behind Microsoft, Google or Meta', PAL.cyan]
  ];
  const pad = (x0, z0, x1, z1, col) => groundPoly([[x0, z0], [x1, z0], [x1, z1], [x0, z1]], 0.01, col, null, 0);

  function renderShots(t) {
    const cv = evalCam(t);
    Cam3D.set([cv[0], cv[1], cv[2]], [cv[3], cv[4], cv[5]], cv[6], 0.012 * Math.sin(t * 0.6));
    GROUND = []; ITEMS = []; OVER = [];
    const hit = (x, y, z, ht, col, r) => { const p = S(x, y, z); if (p) OVER.push(() => hitFx(p.x, p.y, t, ht, { color: col, r: r || 240, rays: 14 })); };
    const coin = (x, y, z, a) => Cyl(x, y, z, 0.25, 0.07, '#E2B857', { emis: 0.25, seg: 10, lw: 1, a: a });

    pad(-16, -10, 16, 11, '#0E2A36'); pad(-14, -23, 14, -8, '#13323E'); pad(-14, -40, 22, -24, '#0F2B37');
    pad(-16, -60, 10, -42, '#13323E'); pad(-8, -80, 20, -60, '#0F2B37'); pad(-18, -102, 20, -82, '#13323E');
    groundPath([[0, 8], [0, -10], [-2, -28], [-4, -46], [4, -64], [6, -84]], 0.05, '#E2B857', 5, seg(t, 0.4, 36.5));

    // ---------------- 1: Jensen takes the driver's seat of the TerraFab machine (0 - 5.5) ----------------
    {
      const u = easeOut(seg(t, 0, 1.2));
      Box(0, 0, -3, 12, 6 * u, 7, '#3D6F86'); Box(0, 6 * u, -3, 12.4, 0.3, 7.4, '#E2B857');
      Cyl(-4, 0, -6, 1.1, 9 * u, '#C9D3D9'); Cyl(4, 0, -6, 1.1, 8 * u, '#C9D3D9');
      Label('TERRAFAB', 0, 7.4, -3, 6, 1.2, '#0B1A22', '#E2B857', { sc: eBack(seg(t, 0.4, 1.0)) });
      Box(0, 0, 2.5, 4, 1.2, 3, '#2E5261'); Box(0, 1.2, 3.2, 1.2, 1.0, 1.0, '#C8463C'); Box(0, 2.2, 2.6, 1.2, 1.3, 0.25, '#C8463C'); Cyl(0, 1.9, 4.2, 0.55, 0.1, '#0B161C', { seg: 12 });
      if (t > 3.2) Label("DRIVER'S SEAT", 0, 4.2, 2.6, 3.8, 0.75, '#C8463C', '#F4F1EA', { sc: eBack(seg(t, 3.2, 3.7)) });
      const w = seg(t, 1.0, 3.4);
      Char('jensen', lerp(-9, 2.0, easeInOut(w)), 4.8, 2.35, { facing: 1, phase: 1, walkAmt: w > 0 && w < 1 ? 1 : 0, armAngleR: w >= 1 ? -1.65 : -0.4, armAngleL: 0.3, talk: w >= 1 ? 0.6 : 0 }, 1.0, 6.0, t);
      hit(0, 3, 3, 3.4, PAL.amberHi, 220);
    }
    // ---------------- 2: the economics on the ground (5.86 - 8.0) ----------------
    if (t >= 5.8) {
      Label('THE ECONOMICS', 0, 4.4, -14, 7, 1.1, '#0B1A22', '#E2B857', { sc: eBack(seg(t, 5.9, 6.4)) * (1 - seg(t, 8.0, 8.6)) });
      for (let i = 0; i < 7; i++) { const u = easeOut(seg(t, 6.3 + i * 0.15, 7.0 + i * 0.15)); Cyl(-6 + i * 2, 0, -14, 0.8, (0.5 + i * 0.28) * u, '#E2B857', { emis: 0.2, seg: 12 }); }
    }
    // ---------------- 3: Elon buys an AI server rack from NVIDIA at a markup (8.7 - 15) ----------------
    if (t >= 8.6) {
      const su = easeOut(seg(t, 8.7, 9.6)), ru = easeOut(seg(t, 9.9, 10.6)), mk = easeOut(seg(t, 12.4, 13.2));
      Box(8, 0, -30, 5, 5 * su, 4, '#5D9B00'); Label('NVIDIA', 8, 6.2, -30, 4, 0.9, '#0B1A22', '#9BE01B', { sc: eBack(seg(t, 8.9, 9.4)) });
      Box(1, 0, -30, 1.6, 3 * ru, 1.3, '#16303A', { emis: 0.1 }); if (ru > 0.9) for (let k = 0; k < 3; k++) Box(1, 0.8 + k * 0.7, -29.3, 1.2, 0.15, 0.05, '#64D2C7', { emis: 0.8, lw: 0 });
      if (t >= 10.0) Label('AI SERVER RACK', 1, 4.3, -30, 4.2, 0.7, '#0B1A22', '#64D2C7', { sc: eBack(seg(t, 10.0, 10.5)) });
      Box(1, 3 * ru, -30, 1.9, 1.4 * mk, 1.6, '#C8463C', { emis: 0.2 });
      if (t >= 13.0) { Label('MASSIVE MARKUP', 1, 6.0, -30, 5.2, 0.9, '#C8463C', '#F4F1EA', { sc: eBack(seg(t, 13.0, 13.5)) }); hit(1, 4.2, -30, 13.0, PAL.coral, 240); }
      for (let i = 0; i < 10; i++) { const u = (((t - 10.6) * 0.5 + i / 10) % 1 + 1) % 1; if (t >= 10.6 && t < 19.0) coin(lerp(-3, 6, u), 2 + Math.sin(u * Math.PI) * 1.6, lerp(-28, -30, u)); }
      const ex = lerp(-12, -4, easeInOut(seg(t, 8.7, 10.4))), wk = seg(t, 8.7, 10.4);
      Char('elon', ex, -28, 2.4, { facing: 1, phase: 2, walkAmt: wk > 0 && wk < 1 ? 1 : 0, armAngleR: wk >= 1 ? -1.65 : -0.4, armAngleL: 0.3, talk: wk >= 1 ? 0.6 : 0 }, 8.7, 19.0, t);
    }
    // ---------------- 4: nearly 75% gross margins (15.1 - 19) ----------------
    if (t >= 15.0) {
      Box(15, 0, -30, 3, 8, 3, '#9FB3BD', { a: 0.22 }); Box(15, 0, -30, 2.6, 6 * easeOut(seg(t, 15.6, 17.6)), 2.6, '#9BE01B', { emis: 0.2 });
      Label('~75% GROSS MARGIN', 15, 9.4, -30, 7.4, 1.1, '#0B1A22', '#9BE01B', { sc: eBack(seg(t, 17.3, 17.9)) });
      if (t >= 17.4) hit(15, 6, -30, 17.4, PAL.sageHi, 260);
    }
    // ---------------- 5: Jensen designs custom silicon inside TerraFab (19.3 - 26) ----------------
    if (t >= 19.2) {
      const bu = easeOut(seg(t, 19.3, 20.2)), cu = seg(t, 20.4, 22.0);
      Box(-6, 0, -52, 9, 5 * bu, 6, '#3D6F86'); Label('TERRAFAB', -6, 6.3, -52, 5, 1, '#0B1A22', '#E2B857', { sc: eBack(seg(t, 19.6, 20.1)) });
      Box(-1, 0, -47, 3, 0.8, 1.6, '#6B5238');
      Panel(-1, 3.0, -47.6, 2.6, 1.7, (g, pw, ph) => {
        g.fillStyle = '#0F2B3A'; g.strokeStyle = '#64D2C7'; g.lineWidth = pw * 0.02; g.beginPath(); g.roundRect(0, 0, pw, ph, pw * 0.04); g.fill(); g.stroke();
        g.strokeStyle = 'rgba(100,210,199,0.3)'; g.lineWidth = 1; for (let k = 1; k < 8; k++) { g.beginPath(); g.moveTo(pw * k / 8, 0); g.lineTo(pw * k / 8, ph); g.stroke(); g.beginPath(); g.moveTo(0, ph * k / 8); g.lineTo(pw, ph * k / 8); g.stroke(); }
        g.strokeStyle = '#E2B857'; g.lineWidth = pw * 0.025; const s = Math.min(pw, ph) * 0.5, x0 = pw / 2 - s / 2, y0 = ph / 2 - s / 2; g.beginPath(); g.moveTo(x0, y0); const per = [[x0 + s, y0], [x0 + s, y0 + s], [x0, y0 + s], [x0, y0]]; let left = cu * 4; for (const p of per) { if (left <= 0) break; const f = Math.min(1, left); g.lineTo(g.__x === undefined ? p[0] : p[0], p[1]); left -= 1; } g.stroke();
        g.fillStyle = 'rgba(100,210,199,' + 0.5 * cu + ')'; g.fillRect(x0 + s * 0.25, y0 + s * 0.25, s * 0.5, s * 0.5);
      }, { sx: easeOut(seg(t, 20.2, 20.7)), sy: easeOut(seg(t, 20.2, 20.7)) });
      if (t >= 22.0) { Box(-1, 0.8, -47, 0.9, 0.18, 0.9, '#45B8AC', { emis: 0.6 }); Label('CUSTOM SILICON', -1, 4.8, -47.6, 5.4, 0.9, '#0B1A22', '#64D2C7', { sc: eBack(seg(t, 22.0, 22.5)) }); hit(-1, 1.4, -47, 22.0, PAL.cyan, 240); }
      if (t >= 22.8) Label('IN-HOUSE', -6, 8.0, -52, 4.2, 0.9, '#2B8A6E', '#F4F1EA', { sc: eBack(seg(t, 22.8, 23.3)) });
      const jw = seg(t, 19.5, 20.8);
      Char('jensen', lerp(5, -3.2, easeInOut(jw)), -45, 2.35, { facing: -1, phase: 3, walkAmt: jw > 0 && jw < 1 ? 1 : 0, armAngleR: jw >= 1 ? -1.65 : -0.4, armAngleL: 0.3, talk: jw >= 1 ? 0.7 : 0 }, 19.5, 26.5, t);
    }
    // ---------------- 6: Tesla gets chips at manufacturing cost for Cybercab and Optimus (26.3 - 29.9) ----------------
    if (t >= 26.2 && t < 30.6) {
      const tu = easeOut(seg(t, 26.3, 27.1));
      Box(6, 0, -72, 7, 4.5 * tu, 5, '#B33A30'); Label('TESLA', 6, 5.7, -72, 3.6, 0.9, '#C8463C', '#F4F1EA', { sc: eBack(seg(t, 26.5, 27.0)) });
      Box(6, 0, -66, 10, 0.35, 1.4, '#2E5261');
      for (let i = 0; i < 6; i++) { const u = (((t - 26.6) * 0.3 + i / 6) % 1 + 1) % 1; if (t >= 26.6) Box(lerp(1, 11, u), 0.35, -66, 0.6, 0.15, 0.6, i % 2 ? '#45B8AC' : '#9BE01B', { emis: 0.4, lw: 1 }); }
      const cu = easeOut(seg(t, 27.4, 28.0));
      if (cu > 0.02) { Box(12, 0.3, -61, 3.0, 0.7 * cu, 1.5, '#CFD6DA'); Box(11.8, 1.0, -61, 1.6, 0.6 * cu, 1.3, '#9FB3BD'); [[-1, 0.8], [1, 0.8], [-1, -0.8], [1, -0.8]].forEach(w => Cyl(12 + w[0], 0, -61 + w[1] * 0.8, 0.32, 0.18, '#1A1A1A', { seg: 10, lw: 1 })); Label('CYBERCAB', 12, 3.0, -61, 3.6, 0.7, '#0B1A22', '#E2B857', { sc: eBack(seg(t, 27.6, 28.1)) }); }
      const ou = easeOut(seg(t, 28.4, 29.0));
      if (ou > 0.02) { Box(-0.25, 0, -61, 0.3, 1.1 * ou, 0.3, '#9FB3BD'); Box(0.25, 0, -61, 0.3, 1.1 * ou, 0.3, '#9FB3BD'); Box(0, 1.1 * ou, -61, 0.9, 1.4 * ou, 0.5, '#CFD6DA'); Box(-0.7, 1.2 * ou, -61, 0.25, 1.2 * ou, 0.25, '#9FB3BD'); Box(0.7, 1.2 * ou, -61, 0.25, 1.2 * ou, 0.25, '#9FB3BD'); Box(0, 2.5 * ou, -61, 0.55, 0.55 * ou, 0.55, '#E8EEF2'); Label('OPTIMUS', 0, 3.7, -61, 3.0, 0.65, '#0B1A22', '#E2B857', { sc: eBack(seg(t, 28.6, 29.1)) }); }
      if (t >= 29.0) { Label('MANUFACTURING COST', 6, 7.6, -72, 8.6, 1.1, '#2B8A6E', '#F4F1EA', { sc: eBack(seg(t, 29.0, 29.5)) }); Label('NO MARKUP', 6, 9.0, -72, 4.6, 0.8, '#C8463C', '#F4F1EA', { sc: eBack(seg(t, 29.3, 29.8)) }); hit(6, 7.6, -72, 29.0, PAL.sageHi, 260); }
    }
    // ---------------- 7: xAI gets custom clusters without waiting behind Microsoft, Google, Meta (29.9 - 38) ----------------
    if (t >= 29.8) {
      Label('XAI', 8, 5.9, -92, 4, 1.0, '#0B1A22', '#64D2C7', { sc: eBack(seg(t, 30.0, 30.5)) });
      for (let i = 0; i < 6; i++) { const x = 2 + i * 2.4, u = easeOut(seg(t, 30.3 + i * 0.12, 31.0 + i * 0.12)), lit = t >= 31.2 + i * 0.3; Box(x, 0, -92, 1.8, 4.2 * u, 1.4, '#16303A', { emis: lit ? 0.2 : 0 }); if (lit) for (let k = 0; k < 3; k++) Box(x, 1.0 + k * 0.9, -91.25, 1.4, 0.18, 0.05, '#64D2C7', { emis: 0.8, lw: 0 }); }
      if (t >= 32.2) Label('CUSTOM TRAINING CLUSTERS', 8, 7.4, -92, 9, 0.95, '#0B1A22', '#E2B857', { sc: eBack(seg(t, 32.2, 32.7)) });
      Box(8, 0, -86, 12, 0.3, 1.0, '#2E5261');
      for (let i = 0; i < 6; i++) { const u = (((t - 31.0) * 0.3 + i / 6) % 1 + 1) % 1; if (t >= 31.0) Box(lerp(14, 2, u), 0.3, -86, 0.55, 0.15, 0.55, i % 2 ? '#45B8AC' : '#9BE01B', { emis: 0.4, lw: 1 }); }
      if (t >= 34.4) Label('SKIPS THE LINE', 8, 2.2, -86, 5, 0.8, '#2B8A6E', '#F4F1EA', { sc: eBack(seg(t, 34.4, 34.9)) });
      [['MICROSOFT', -13, 35.3, '#3D6F86'], ['GOOGLE', -9.5, 36.7, '#4C8196'], ['META', -6, 37.2, '#2E5261']].forEach((q, i) => {
        const u = easeOut(seg(t, q[2] - 0.5, q[2])); Box(q[1], 0, -90, 2.6, 3.2 * u, 2.2, q[3]); Label(q[0], q[1], 4.3, -90, 3.4, 0.7, '#0B1A22', '#F4F1EA', { sc: eBack(seg(t, q[2], q[2] + 0.4)) });
        Char('analyst', q[1], -87.3, 2.2, { facing: 1, phase: 4 + i, armAngleR: -0.4, armAngleL: 0.3, browTension: 0.8 }, 33.7 + i * 0.25, 40, t);
      });
      if (t >= 37.0) Label('NO MARKUP · NO QUEUE', 0, 10, -92, 11, 1.8, '#0B1A22', '#E2B857', { sc: eBack(seg(t, 37.0, 37.5)) });
    }

    drawBG(0);
    GROUND.forEach(fn => fn());
    ITEMS.sort((a, b) => b.z - a.z).forEach(it => it.fn());
    OVER.forEach(fn => fn());
    HEADS.forEach(h => { const a = env(t, h[0], h[1], 0.3, 0.3); if (a > 0.01) drawShotBanner(h[2], h[3], a, h[4], t, h[0]); });
  }

