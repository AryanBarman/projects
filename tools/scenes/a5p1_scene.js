  const HEADS = [
    [0.00, 10.20, 'THE REAL OBSTACLES', 'Lawyers, bondholders and the US government', PAL.coral],
    [10.46, 20.50, 'THE FINANCIAL WEB', 'SpaceX and NVIDIA are tied together', PAL.amberHi],
    [20.70, 36.00, 'WALL STREET, NOV 20, 2026', 'Apollo and Goldman Sachs: $44B in lease notes', PAL.cyan],
    [36.18, 48.90, 'SATURN FUNDING TRUST', 'Vera Rubin racks leased to SpaceX from H1 2027', PAL.sageHi],
    [48.98, 67.64, 'NOBODY REPOS ORBIT', 'Lenders watch Star Mind launch in late 2027', PAL.coral]
  ];
  const pad = (x0, z0, x1, z1, col) => groundPoly([[x0, z0], [x1, z0], [x1, z1], [x0, z1]], 0.01, col, null, 0);
  const Line3 = (a, b, col, lw, al) => { const A = toCam(a[0], a[1], a[2]), B = toCam(b[0], b[1], b[2]), cl = clipLine(A, B); if (!cl) return; const p = scr(cl[0]), q = scr(cl[1]); item((cl[0][2] + cl[1][2]) / 2, () => { ctx.save(); ctx.globalAlpha = al === undefined ? 1 : al; ctx.strokeStyle = col; ctx.lineWidth = lw; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y); ctx.stroke(); ctx.restore(); }); };

  function renderShots(t) {
    const cv = evalCam(t);
    Cam3D.set([cv[0], cv[1], cv[2]], [cv[3], cv[4], cv[5]], cv[6], 0.01 * Math.sin(t * 0.6));
    GROUND = []; ITEMS = []; OVER = [];
    const hit = (x, y, z, ht, col, r) => { const p = S(x, y, z); if (p) OVER.push(() => hitFx(p.x, p.y, t, ht, { color: col, r: r || 240, rays: 14 })); };
    const coin = (x, y, z) => Cyl(x, y, z, 0.25, 0.07, '#E2B857', { emis: 0.25, seg: 10, lw: 1 });
    pad(-22, -8, 22, 8, '#0E2A36'); pad(24, -9, 58, 9, '#12303C'); pad(60, -9, 82, 9, '#0E2A36'); pad(82, -9, 112, 9, '#12303C'); pad(112, -9, 142, 9, '#0E2A36');
    groundPath([[-14, 0], [10, 0], [40, 0], [70, 0], [94, 0], [118, 0], [132, 0]], 0.05, '#E2B857', 5, seg(t, 0.4, 65));

    // 1: even if the physics is solved, the lawyers, the bondholders and the US government remain
    if (t < 20) {
      Box(-6.2, 0, 0, 1.0, 1.0, 1.0, '#45B8AC', { emis: 0.4 });
      Label('PHYSICS SOLVED', -7.5, 5.8, 0, 7.4, 1.0, '#2B8A6E', '#F4F1EA', { sc: eBack(seg(t, 1.2, 1.7)) * (1 - seg(t, 9.6, 10.2)) });
      const w = seg(t, 4.5, 9.4), ex = lerp(-6, 0, easeInOut(w));
      Char('jensen', ex - 3, 3.4, 2.35, { facing: 1, phase: 1, walkAmt: w > 0 && w < 1 ? 1 : 0, armAngleR: -0.4, armAngleL: 0.3, talk: w >= 1 ? 0.6 : 0 }, 0.2, 10.2, t);
      Char('elon', ex, 3.4, 2.4, { facing: 1, phase: 2, walkAmt: w > 0 && w < 1 ? 1 : 0, armAngleR: -1.5, armAngleL: 0.3, talk: w >= 1 ? 0.6 : 0 }, 0.2, 10.2, t);
      // lawyers
      const lu = easeOut(seg(t, 4.6, 5.4)); Box(5, 0, 0, 0.3, 3.4 * lu, 0.3, '#9FB3BD'); Box(7.4, 0, 0, 0.3, 3.4 * lu, 0.3, '#9FB3BD'); Box(6.2, 3.1 * lu, 0, 2.7, 0.3, 0.3, '#C8463C');
      [5.2, 6.4, 7.2].forEach((x, i) => Char('lawyer', x, 2.6 + (i % 2) * 0.8, 2.2, { facing: -1, phase: 3 + i, armAngleR: -0.4, armAngleL: 0.3, browTension: 0.8 }, 4.9 + i * 0.1, 10.2, t));
      Label('LAWYERS', 6.2, 5.4, 0, 4.2, 0.9, '#0B1A22', '#F4F1EA', { sc: eBack(seg(t, 4.9, 5.4)) * (1 - seg(t, 9.8, 10.2)) });
      // bondholders: a growing stack of bonds
      for (let k = 0; k < 6; k++) { const u = easeOut(seg(t, 7.0 + k * 0.12, 7.4 + k * 0.12)); Box(12, k * 0.55, 0, 2.4, 0.5 * u, 1.8, k % 2 ? '#F2EEE2' : '#D8D2C2'); }
      Label('BONDHOLDERS', 12, 4.6, 0, 6.0, 0.9, '#0B1A22', '#F4F1EA', { sc: eBack(seg(t, 7.0, 7.5)) * (1 - seg(t, 9.8, 10.2)) });
      // US government
      const gu = easeOut(seg(t, 8.6, 9.5)); Box(19, 0, 0, 7, 4 * gu, 4, '#A5B1B8'); Box(19, 4 * gu, 0, 7.6, 0.8 * gu, 4.4, '#C9D3D9'); [-2.4, -0.8, 0.8, 2.4].forEach(c => Cyl(19 + c, 0, 2.3, 0.35, 3.8 * gu, '#E8EEF2', { seg: 10 }));
      Box(23.4, 0, 0, 0.12, 6 * gu, 0.12, '#9FB3BD'); Box(24.2, 4.6 * gu, 0, 1.6, 1.0 * gu, 0.08, '#C8463C');
      Label('US GOVERNMENT', 19, 7.4, 0, 7.2, 1.0, '#0B1A22', '#E2B857', { sc: eBack(seg(t, 8.6, 9.1)) * (1 - seg(t, 9.8, 10.2)) });
    }
    // 2-3: the financial web that ties SpaceX and NVIDIA together; no clean breakup
    if (t >= 10.4) {
      const bu = easeOut(seg(t, 10.5, 11.3));
      Box(34, 0, 0, 6, 6 * bu, 4, '#C9A24A'); Box(46, 0, 0, 5, 8 * bu, 4, '#5D9B00');
      Label('SPACEX', 34, 7.2, 0, 4.4, 0.95, '#0B1A22', '#E2B857', { sc: eBack(seg(t, 10.6, 11.1)) }); Label('NVIDIA', 46, 9.2, 0, 4.4, 0.95, '#0B1A22', '#9BE01B', { sc: eBack(seg(t, 10.8, 11.3)) });
      for (let i = 0; i < 8; i++) { const a = [37, 0.8 + i * 0.7, 2.2 - (i % 3)], b = [43.5, 0.6 + ((i * 3) % 8) * 0.9, 2.2 - ((i * 2) % 3)], u = easeOut(seg(t, 11.0 + i * 0.25, 11.6 + i * 0.25)); Line3(a, [lerp(a[0], b[0], u), lerp(a[1], b[1], u), lerp(a[2], b[2], u)], '#E2B857', 4, 0.9); }
      [['LOANS', 11.6], ['LEASES', 12.4], ['NOTES', 13.2], ['CONTRACTS', 14.0]].forEach((c, i) => Label(c[0], 40.2, 2.0 + i * 1.5, 3.2, 3.6, 0.7, '#0B1A22', '#F4F1EA', { sc: eBack(seg(t, c[1], c[1] + 0.4)) * (1 - seg(t, 20.2, 20.7)) }));
      Label('THE FINANCIAL WEB', 40, 11.4, 0, 9.4, 1.1, '#0B1A22', '#E2B857', { sc: eBack(seg(t, 10.7, 11.3)) * (1 - seg(t, 15.2, 15.8)) });
      if (t >= 15.4 && t < 20.7) {
        const pull = easeOut(seg(t, 18.0, 18.9)) - easeOut(seg(t, 19.2, 19.7)) * 0.7, jx = 44 - 6 * pull;
        Char('jensen', jx, 3.6, 2.35, { facing: -1, phase: 4, walkAmt: pull > 0.05 && pull < 0.95 ? 1 : 0, armAngleR: -0.4, armAngleL: 0.3, browTension: 0.8 }, 15.4, 20.7, t);
        Char('elon', 33, 3.6, 2.4, { facing: 1, phase: 5, armAngleR: -1.65, armAngleL: 0.3, talk: 0.7 }, 15.5, 20.7, t);
        const red = Math.round(lerp(226, 200, pull)), col = pull > 0.2 ? '#D8483A' : '#E2B857';
        for (let i = 0; i < 4; i++) Line3([46 - 2, 1 + i * 1.6, 2.2], [jx + 0.4, 1.2 + i * 0.5, 3.6], col, 3 + pull * 3, 0.95);
        Label('NOT A CLEAN BREAKUP', 40, 12.0, 3.2, 8.8, 1.0, '#C8463C', '#F4F1EA', { sc: eBack(seg(t, 15.6, 16.1)) * (1 - seg(t, 20.2, 20.7)) });
        if (t >= 18.2) Label("CAN'T JUST WALK AWAY", 40, 10.4, 3.2, 9.4, 0.9, '#0B1A22', '#E2B857', { sc: eBack(seg(t, 18.2, 18.7)) * (1 - seg(t, 20.2, 20.7)) });
      }
    }
    // 4-5: Wall Street, Nov 20 2026: Apollo and Goldman price $44B of lease notes
    if (t >= 20.5 && t < 48) {
      const su = easeOut(seg(t, 20.8, 21.8));
      [[64, -3, 3, 9], [68, -4, 3.4, 13], [73, -3, 3, 10], [77, -2, 2.6, 7]].forEach(b => Box(b[0], 0, b[1], b[2], b[3] * su, b[2], '#3D6F86'));
      Label('WALL STREET', 70, 15.2, -4, 8, 1.0, '#0B1A22', '#E2B857', { sc: eBack(seg(t, 21.0, 21.5)) * (1 - seg(t, 24.8, 25.4)) });
      if (t >= 22.4 && t < 25.6) Panel(70, 5.6, 4, 4.4, 3.0, (g, pw, ph) => { g.fillStyle = '#F2EEE2'; g.strokeStyle = '#0B161C'; g.lineWidth = pw * 0.02; g.beginPath(); g.roundRect(0, 0, pw, ph, pw * 0.04); g.fill(); g.stroke(); g.fillStyle = '#C8463C'; g.fillRect(0, 0, pw, ph * 0.22); g.fillStyle = '#F4F1EA'; g.textAlign = 'center'; g.textBaseline = 'middle'; g.font = '900 ' + ph * 0.13 + 'px system-ui'; g.fillText('NOVEMBER 2026', pw / 2, ph * 0.11); g.fillStyle = '#0B161C'; g.font = '900 ' + ph * 0.55 + 'px system-ui'; g.fillText('20', pw / 2, ph * 0.6); }, { sx: eBack(seg(t, 22.4, 22.9)) * (1 - seg(t, 25.0, 25.6)), sy: eBack(seg(t, 22.4, 22.9)) * (1 - seg(t, 25.0, 25.6)) });
      if (t >= 25.4) {
        const au = easeOut(seg(t, 25.5, 26.3));
        Box(63, 0, 4, 4, 5 * au, 3, '#2E5261'); Box(77, 0, 4, 4, 5 * au, 3, '#6B5238');
        Label('APOLLO', 63, 6.2, 4, 4.2, 0.9, '#0B1A22', '#64D2C7', { sc: eBack(seg(t, 25.6, 26.1)) }); Label('GOLDMAN SACHS', 77, 6.2, 4, 6.4, 0.9, '#0B1A22', '#E2B857', { sc: eBack(seg(t, 26.0, 26.5)) });
        for (let k = 0; k < 20; k++) { const u = easeOut(seg(t, 28.7 + k * 0.1, 29.2 + k * 0.1)); Box(70, k * 0.22, 4, 3, 0.2 * u, 2, k % 2 ? '#F2EEE2' : '#D8D2C2', { lw: 1 }); }
        if (t >= 28.7) Label('$' + Math.round(44 * easeOut(seg(t, 28.7, 31.5))) + 'B', 70, 7.4, 4, 5.6, 1.5, '#0B1A22', '#E2B857', { sc: eBack(seg(t, 28.7, 29.2)) });
        if (t >= 29.4) Label('OFF-BALANCE-SHEET LEASE NOTES', 70, 9.4, 4, 13, 1.0, '#C8463C', '#F4F1EA', { sc: eBack(seg(t, 29.4, 29.9)) });
        if (t >= 32.8) { const tu = easeOut(seg(t, 32.8, 33.5)); Cyl(80.5, 0, 4, 1.2, 0.5, '#E2B857'); Cyl(80.5, 0.5, 4, 0.35, 1.6 * tu, '#E2B857'); Cyl(80.5, 2.1, 4, 1.3 * tu, 1.5 * tu, '#E2B857', { emis: 0.25 }); Label('LARGEST GPU FINANCING DEAL EVER', 80.5, 6.8, 4, 11.6, 1.0, '#0B1A22', '#E2B857', { sc: eBack(seg(t, 33.0, 33.5)) * (1 - seg(t, 35.8, 36.4)) }); hit(80.5, 3, 4, 32.8, PAL.amberHi, 260); }
        hit(70, 3, 4, 28.7, PAL.amberHi, 300);
      }
    }
    // 6: Saturn Funding Trust buys Vera Rubin racks and leases them to SpaceX, landing in H1 2027
    if (t >= 36) {
      const u = easeOut(seg(t, 36.2, 37.0));
      Box(86, 0, 0, 4, 4 * u, 3, '#5D9B00'); Label('NVIDIA VERA RUBIN', 86, 5.6, 0, 7.6, 0.9, '#0B1A22', '#9BE01B', { sc: eBack(seg(t, 36.4, 36.9)) });
      Box(94, 0, 0, 5, 3.4 * u, 3.4, '#6B5238'); Cyl(94, 3.4 * u, 0, 2.2, 0.1, '#E2B857', { seg: 18 }); Box(94, 3.5 * u, 0, 1.2, 1.2 * u, 1.2, '#C9A24A', { emis: 0.2 });
      Label('SATURN FUNDING TRUST', 94, 7.0, 0, 9.4, 1.0, '#0B1A22', '#E2B857', { sc: eBack(seg(t, 41.4, 41.9)) });
      Box(104, 0, 0, 6, 0.4, 5, '#2E5261'); Label('SPACEX', 104, 7.4, 0, 4.4, 0.95, '#0B1A22', '#E2B857', { sc: eBack(seg(t, 38.6, 39.1)) });
      for (let i = 0; i < 12; i++) { const u2 = (((t - 36.6) * 0.18 + i / 12) % 1 + 1) % 1; if (t >= 36.6 && t < 46) coin(lerp(78, 85, u2), 2 + Math.sin(u2 * Math.PI) * 1.2, 3.4 * (1 - u2)); }
      if (t >= 39.4) Label('LEASED TO SPACEX', 94, 8.4, 0, 8.6, 0.9, '#2B8A6E', '#F4F1EA', { sc: eBack(seg(t, 39.4, 39.9)) * (1 - seg(t, 48.4, 49.0)) });
      for (let i = 0; i < 6; i++) { const t0 = 39.6 + i * 0.55, f = seg(t, t0, t0 + 2.6); if (f > 0 && t < 56) { const done = f >= 1; Box(done ? 102 + (i % 3) * 1.4 : lerp(86, 102, easeInOut(f)), done ? 0.4 + Math.floor(i / 3) * 1.6 : 0.4, done ? -1 + (i % 2) * 1.6 : 2.2, 1.1, 1.5, 1.0, '#16303A', { emis: 0.2 }); } }
      if (t >= 44.6) Label('H1 2027', 104, 5.6, 2, 4.2, 1.1, '#C8463C', '#F4F1EA', { sc: eBack(seg(t, 44.6, 45.2)) * (1 - seg(t, 48.4, 49.0)) });
    }
    // 7: lenders watch SpaceX launch Star Mind GPUs into orbit in late 2027
    if (t >= 48.9) {
      Box(98.5, 0, 6, 2, 7, 2, '#8C98A0'); Label('LENDERS', 98.5, 8.6, 6, 4.6, 0.9, '#0B1A22', '#64D2C7', { sc: eBack(seg(t, 49.0, 49.5)) * (1 - seg(t, 59.6, 60.2)) });
      Char('analyst', 100.6, 7.4, 2.2, { facing: 1, phase: 6, armAngleR: -1.65, armAngleL: 0.3, browTension: 0.4 }, 49.2, 60.0, t); Char('analyst', 96.6, 7.4, 2.2, { facing: 1, phase: 7, armAngleR: -0.4, armAngleL: 0.3, browTension: 0.8 }, 49.5, 60.0, t);
      if (t < 60.4) {
        const lf = easeInOut(seg(t, 56.2, 60.0)), rx = lerp(106, 130, lf), ry = lerp(0, 22, lf);
        Cyl(rx, ry, 0, 1.0, 6, '#CFD6DA', { seg: 14 }); Cyl(rx, ry + 6, 0, 0.7, 1.2, '#9FB3BD', { seg: 14 }); if (t >= 56.2) Cyl(rx, ry - 1.8, 0, 0.6, 1.8, '#FFB340', { emis: 0.8, lw: 0, seg: 8 });
        Label('STAR MIND GPUs', rx, ry + 8.4, 0, 6.6, 0.9, '#0B1A22', '#64D2C7', { sc: eBack(seg(t, 53.0, 53.5)) * (1 - seg(t, 59.4, 60.0)) });
        if (t >= 56.4) Label('LATE 2027', rx + 3.6, ry + 4, 0, 5.2, 1.1, '#C8463C', '#F4F1EA', { sc: eBack(seg(t, 56.4, 57.0)) * (1 - seg(t, 59.4, 60.0)) });
      }
    }
    // 8: a lender can repossess a rack in a Texas data center, but nobody can repo low-Earth orbit
    if (t >= 59.8) {
      Box(118, 0, 0, 8, 4, 5, '#3D6F86'); for (let k = 0; k < 3; k++) Box(116.4 + k * 1.6, 0, 3.2, 1.1, 2.2, 1.0, '#16303A', { emis: 0.15 });
      Label('TEXAS DATA CENTER', 118, 6.2, 0, 9.4, 1.0, '#0B1A22', '#E2B857', { sc: eBack(seg(t, 62.2, 62.7)) });
      const tx = lerp(128, 121, easeInOut(seg(t, 60.4, 62.0))) + lerp(0, 9, easeInOut(seg(t, 63.8, 65.6)));
      Box(tx, 0.3, 6, 3.2, 1.8, 1.8, '#E2B857'); Box(tx - 2.0, 0.3, 6, 1.4, 1.4, 1.6, '#C8463C'); Cyl(tx - 1.6, 0, 7, 0.4, 0.2, '#1A1A1A', { seg: 8, lw: 1 }); Cyl(tx + 1.2, 0, 7, 0.4, 0.2, '#1A1A1A', { seg: 8, lw: 1 });
      Label('REPO', tx, 3.0, 6, 2.2, 0.7, '#C8463C', '#F4F1EA', { sc: eBack(seg(t, 60.6, 61.1)) });
      if (t >= 61.6 && t < 63.8) { const m = easeInOut(seg(t, 62.0, 63.4)); Box(lerp(116.4, tx, m), lerp(0, 2.0, m), lerp(3.2, 6, m), 1.1, 2.2, 1.0, '#16303A', { emis: 0.2 }); Label('RACK REPOSSESSED', 118, 8.2, 3, 9.2, 0.9, '#2B8A6E', '#F4F1EA', { sc: eBack(seg(t, 62.4, 62.9)) * (1 - seg(t, 63.8, 64.3)) }); }
      const ring = []; for (let k = 0; k <= 40; k++) ring.push([130 + Math.cos(k / 40 * TAU) * 7, Math.sin(k / 40 * TAU) * 7]);
      groundPath(ring, 22, '#64D2C7', 3, easeOut(seg(t, 60.0, 61.6)));
      const a = t * 0.3; Box(130 + Math.cos(a) * 7, 22, Math.sin(a) * 7, 1.2, 0.9, 1.0, '#CFD6DA'); Box(130 + Math.cos(a) * 7 - 1.7, 22.35, Math.sin(a) * 7, 2.0, 0.08, 0.8, '#3A78B8', { emis: 0.2 }); Box(130 + Math.cos(a) * 7 + 1.7, 22.35, Math.sin(a) * 7, 2.0, 0.08, 0.8, '#3A78B8', { emis: 0.2 });
      Label('LOW-EARTH ORBIT', 130, 26.4, 0, 8.4, 1.0, '#0B1A22', '#64D2C7', { sc: eBack(seg(t, 64.2, 64.7)) });
      if (t >= 65.0) { for (let k = 0; k < 8; k++) Box(130, 2.6 + k * 2.4, 6, 0.2, 1.0, 0.2, '#9FB3BD', { a: 0.5 }); Label('NO ROAD', 130, 9.0, 6, 4.2, 0.9, '#C8463C', '#F4F1EA', { sc: eBack(seg(t, 65.0, 65.5)) }); Label('NOBODY CAN REPO ORBIT', 130, 17, 6, 12, 1.1, '#0B1A22', '#E2B857', { sc: eBack(seg(t, 65.6, 66.2)) }); hit(130, 12, 6, 65.6, PAL.coral, 340); }
    }

    drawBG(0.1);
    GROUND.forEach(fn => fn());
    ITEMS.sort((a, b) => b.z - a.z).forEach(it => it.fn());
    OVER.forEach(fn => fn());
    HEADS.forEach(h => { const a = env(t, h[0], h[1], 0.3, 0.3); if (a > 0.01) drawShotBanner(h[2], h[3], a, h[4], t, h[0]); });
  }

