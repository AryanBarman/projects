  const HEADS = [
    [0.08, 6.00, 'LOOK UP INTO ORBIT', 'One month before the ouster', PAL.amberHi],
    [6.08, 16.20, 'STAR MIND', 'Co-engineered by SpaceX and NVIDIA on Vera Rubin', PAL.cyan],
    [16.24, 32.40, 'DATA CENTERS IN SPACE', 'Free solar power and radiative cooling', PAL.amberHi],
    [32.50, 49.20, 'THE VERTICAL STACK', 'Silicon wafers to Starship to low-Earth orbit', PAL.sageHi],
    [49.26, 61.80, 'THE PEAK OF THE WHAT-IF DREAM', 'Earth and space, one hardware juggernaut', PAL.coral]
  ];
  const pad = (x0, z0, x1, z1, col) => groundPoly([[x0, z0], [x1, z0], [x1, z1], [x0, z1]], 0.01, col, null, 0);
  const Z = -6;

  function renderShots(t) {
    const cv = evalCam(t);
    Cam3D.set([cv[0], cv[1], cv[2]], [cv[3], cv[4], cv[5]], cv[6], 0.01 * Math.sin(t * 0.6));
    GROUND = []; ITEMS = []; OVER = [];
    const hit = (x, y, z, ht, col, r) => { const p = S(x, y, z); if (p) OVER.push(() => hitFx(p.x, p.y, t, ht, { color: col, r: r || 240, rays: 14 })); };
    const sat = (x, y, z, ang) => { Box(x, y, z, 1.2, 0.9, 1.0, '#CFD6DA'); Box(x - 1.7, y + 0.35, z, 2.0, 0.08, 0.8, '#3A78B8', { emis: 0.2 }); Box(x + 1.7, y + 0.35, z, 2.0, 0.08, 0.8, '#3A78B8', { emis: 0.2 }); };
    const dark = seg(t, 0, 3), lf = 1 - seg(t, 56.4, 57.2);
    pad(-18, Z - 8, 18, Z + 14, '#0E2A36');
    // the orbit ring and the vertical through-line that links Earth to space
    const ring = []; for (let k = 0; k <= 48; k++) ring.push([Math.cos(k / 48 * TAU) * 16, Z + Math.sin(k / 48 * TAU) * 16]);
    groundPath(ring, 30, '#64D2C7', 3, easeOut(seg(t, 0.5, 2.4)));
    Box(-9, 0, Z, 0.25, 30 * easeOut(seg(t, 0.5, 50)), 0.25, '#E2B857', { emis: 0.3, lw: 1 });
    [0, 1, 2].forEach(i => { const a = t * 0.15 + i * 2.1; if (t > 2.0 && !(i === 0 && t > 18)) sat(Math.cos(a) * 16, 30, Z + Math.sin(a) * 16); });

    // Starship on the pad (it launches at 34.4)
    {
      const ly = 30 * eIn(seg(t, 34.4, 37.4));
      Cyl(11, ly, Z, 1.2, 9, '#CFD6DA', { seg: 14 }); Cyl(11, ly + 9, Z, 0.8, 1.5, '#9FB3BD', { seg: 14 });
      Label('STARSHIP', 11, ly + 11.2, Z, 3.6, 0.8, '#0B1A22', '#E2B857', { sc: eBack(seg(t, 0.4, 0.9)) * (1 - seg(t, 4.2, 4.6)) });
      if (t >= 34.5 && t < 38.2) Label('NVIDIA CHIPS TO ORBIT', 11, ly + 12.6, Z, 6.4, 0.9, '#2B8A6E', '#F4F1EA', { sc: eBack(seg(t, 34.5, 35.0)) });
      if (t >= 34.4 && t < 36.8) Cyl(11, ly - 2.2, Z, 0.7, 2.2, '#FFB340', { emis: 0.8, lw: 0, seg: 8 });
    }
    // 2: one month before the ouster
    if (t >= 3.2 && t < 6.6) {
      const u = eBack(seg(t, 3.3, 3.9)) * (1 - seg(t, 6.0, 6.6));
      Panel(-7, 4, Z + 2, 4.0, 3.0, (g, pw, ph) => {
        g.fillStyle = '#F2EEE2'; g.strokeStyle = '#0B161C'; g.lineWidth = pw * 0.02; g.beginPath(); g.roundRect(0, 0, pw, ph, pw * 0.04); g.fill(); g.stroke();
        g.fillStyle = '#C8463C'; g.fillRect(0, 0, pw, ph * 0.2); g.fillStyle = '#F4F1EA'; g.font = '900 ' + ph * 0.11 + 'px system-ui'; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText('ONE MONTH BEFORE', pw / 2, ph * 0.1);
        const n = Math.floor(30 * seg(t, 3.6, 5.4));
        for (let i = 0; i < 30; i++) { const cx = pw * (0.1 + (i % 6) * 0.15), cy = ph * (0.3 + Math.floor(i / 6) * 0.13); g.fillStyle = i < n ? '#C8463C' : '#D8D2C2'; g.fillRect(cx, cy, pw * 0.11, ph * 0.09); }
        if (n >= 30) { g.fillStyle = '#0B161C'; g.font = '900 ' + ph * 0.1 + 'px system-ui'; g.fillText('JENSEN\'S OUSTER', pw / 2, ph * 0.93); }
      }, { sx: u, sy: u });
    }
    // 3-4: Elon and Jensen unveil Star Mind: curtain, co-engineered halves, Vera Rubin chip
    if (t >= 5.4 && t < 16.4) {
      const fade = 1 - seg(t, 15.8, 16.4), cur = 1 - easeOut(seg(t, 6.5, 7.3));
      Box(0, 0, Z, 5, 1.2, 3.4, '#2E5261', { a: fade });
      if (t < 7.4) Box(0, 0, Z + 2.2, 9, 5 * cur, 0.3, '#7A2A33');
      if (t >= 6.9) {
        const sx = 1.6 * (1 - easeOut(seg(t, 10.1, 11.0))) * (t >= 10.0 ? 1 : 0), pop = easeOut(seg(t, 6.9, 7.5));
        Box(-0.8 - sx, 1.2, Z, 1.5, 1.2 * pop, 1.4, '#E2B857', { emis: 0.15, a: fade }); Box(0.8 + sx, 1.2, Z, 1.5, 1.2 * pop, 1.4, '#5D9B00', { emis: 0.15, a: fade });
        if (t >= 7.0 && t < 10.0) Label('STAR MIND', 0, 3.9, Z, 4.6, 1.0, '#0B1A22', '#E2B857', { sc: eBack(seg(t, 7.0, 7.5)) });
        if (t >= 10.3) Label('ORBITAL AI COMPUTE PAYLOAD', 0, 4.7, Z, 8.0, 0.95, '#0B1A22', '#64D2C7', { sc: eBack(seg(t, 10.3, 10.8)) * fade });
        if (t >= 11.0) hit(0, 1.8, Z, 11.0, PAL.amberHi, 220);
        if (t >= 13.64) { const cy = lerp(8, 2.5, eIn(seg(t, 13.64, 14.2))); Box(0, cy, Z, 1.2, 0.18, 1.2, '#45B8AC', { emis: 0.6, a: fade }); Label('VERA RUBIN', 0, 3.6, Z, 3.8, 0.8, '#2B8A6E', '#F4F1EA', { sc: eBack(seg(t, 14.2, 14.7)) * fade }); }
        if (t >= 10.0) { Label('SPACEX', -2.4, 2.9, Z, 2.2, 0.55, '#E2B857', '#0B161C', { sc: eBack(seg(t, 10.2, 10.7)) * fade }); Label('NVIDIA', 2.4, 2.9, Z, 2.2, 0.55, '#5D9B00', '#F4F1EA', { sc: eBack(seg(t, 10.4, 10.9)) * fade }); }
      }
      const w = easeOut(seg(t, 6.1, 7.2)), wk = w > 0 && w < 1 ? 1 : 0;
      Char('jensen', lerp(-9, -2.6, w), Z + 3.4, 2.35, { facing: 1, phase: 1, walkAmt: wk, armAngleR: -1.5, armAngleL: 0.3, talk: 0.5 }, 6.1, 16.0, t);
      Char('elon', lerp(9, 2.6, w), Z + 3.4, 2.4, { facing: -1, phase: 2, walkAmt: wk, armAngleR: -1.5, armAngleL: 0.3, talk: 0.5 }, 6.1, 16.0, t);
    }
    // 5: the payload goes into a massive satellite that flies up to orbit, starting 2027
    if (t >= 16.2 && t < 23.0) {
      const lu = easeInOut(seg(t, 16.6, 18.0)), up = easeInOut(seg(t, 18.6, 22.4));
      const bx0 = 12, by = lerp(0.4, 29.6, up), bz = lerp(Z + 3, Z, up), bx = lerp(bx0, 16, up);
      Box(bx, by, bz, 3, 2.4, 2.4, '#9FB3BD'); Box(bx - 3.6, by + 1.0, bz, 4, 0.1, 1.6, '#3A78B8', { emis: 0.2 }); Box(bx + 3.6, by + 1.0, bz, 4, 0.1, 1.6, '#3A78B8', { emis: 0.2 });
      if (t < 18.1) Box(lerp(0, bx0, lu), 1.2 + Math.sin(lu * Math.PI) * 3, lerp(Z, Z + 3, lu), 1.5, 1.0, 1.4, '#45B8AC', { emis: 0.4 });
      Label('MASSIVE SPACEX SATELLITE', bx, by + 3.4, bz, 6.4, 0.9, '#0B1A22', '#E2B857', { sc: eBack(seg(t, 17.0, 17.5)) * (1 - seg(t, 21.0, 21.6)) });
      if (t >= 19.9) Label('2027', bx, by + 5.0 + (up > 0 ? 0 : 0), bz, 4.2, 1.6, '#C8463C', '#F4F1EA', { sc: eBack(seg(t, 19.9, 20.4)) * (1 - seg(t, 22.4, 23.0)) });
    }
    // 6: a data-center satellite with free solar power and radiative cooling
    if (t >= 23.4) {
      const u = easeOut(seg(t, 23.5, 24.4));
      Box(0, 30, Z, 5, 2 * u, 2, '#2E5261'); for (let k = 0; k < 3; k++) Box(0, 30.5 + k * 0.5, Z + 1.05, 4, 0.14, 0.05, '#64D2C7', { emis: 0.8, lw: 0 });
      Box(-5.5, 30.9, Z, 6, 0.12, 2.6, '#3A78B8', { emis: 0.25 }); Box(5.5, 30.9, Z, 6, 0.12, 2.6, '#3A78B8', { emis: 0.25 });
      Label('SPACE-BASED DATA CENTER', 0, 34.6, Z, 8.4, 1.0, '#0B1A22', '#64D2C7', { sc: eBack(seg(t, 24.0, 24.5)) });
      if (t >= 25.5) {
        Box(-18, 36, Z - 2, 3.5, 3.5, 3.5, '#FFD34E', { emis: 0.8 }); hit(-18, 37.5, Z - 2, 25.6, PAL.amberHi, 300);
        for (let i = 0; i < 9; i++) { const f = (((t - 25.5) * 0.5 + i / 9) % 1 + 1) % 1; Box(lerp(-17, -7, f), lerp(36, 31.2, f), lerp(Z - 2, Z, f), 0.4, 0.4, 0.4, '#FFD34E', { emis: 0.9, lw: 0 }); }
        Label('FREE 24/7 SOLAR POWER', -11, 38.8, Z, 8.2, 1.0, '#E2B857', '#0B161C', { sc: eBack(seg(t, 25.6, 26.1)) });
      }
      if (t >= 28.6) {
        const pu = 0.5 + 0.5 * Math.sin(t * 4); for (let k = 0; k < 6; k++) Box(-2.5 + k * 1.0, 31.0, Z - 0.6 - k * 0.0, 0.5, 1.6 * easeOut(seg(t, 28.7 + k * 0.1, 29.4 + k * 0.1)), 0.1, '#9FD8FF', { emis: 0.4 + 0.4 * pu, lw: 1 });
        Label('RADIATIVE COOLING', 3.0, 36.2, Z, 6.6, 0.95, '#3D6F86', '#F4F1EA', { sc: eBack(seg(t, 28.7, 29.2)) });
      }
    }
    // 7: Jensen inside SpaceX: Starship launches (above)
    if (t >= 32.3 && t < 37.9) {
      Box(-10, 0, Z, 9, 5, 6, '#8C98A0'); Box(-10, 0, Z + 3.05, 3, 3.4, 0.2, '#10222B'); Label('SPACEX', -10, 6.3, Z, 4.2, 1.0, '#0B1A22', '#E2B857', { sc: eBack(seg(t, 32.5, 33.0)) });
      const jw = seg(t, 32.8, 34.0);
      Char('jensen', lerp(-10, -5.6, easeInOut(jw)), Z + 3.8, 2.35, { facing: 1, phase: 3, walkAmt: jw > 0 && jw < 1 ? 1 : 0, armAngleR: jw >= 1 ? -1.65 : -0.4, armAngleL: 0.3, talk: jw >= 1 ? 0.7 : 0 }, 32.8, 38.0, t);
      if (t >= 33.6) Label('JENSEN INSIDE SPACEX', -6.0, 8.4, Z + 3.8, 6.8, 0.9, '#C8463C', '#F4F1EA', { sc: eBack(seg(t, 33.6, 34.1)) });
    }
    // 8: owning the entire vertical stack, wafers to Starship to low-Earth orbit
    if (t >= 37.8) {
      Label('OWNS THE ENTIRE STACK', 0, 14.5, Z, 9, 1.1, '#0B1A22', '#E2B857', { sc: eBack(seg(t, 37.9, 38.5)) * lf });
      const w = easeOut(seg(t, 40.64, 41.6)); for (let k = 0; k < 3; k++) Cyl(0, k * 0.4, Z, 2.3, 0.35 * w, '#9FB3BD', { seg: 16 });
      if (t >= 40.7) Label('SILICON WAFERS · TEXAS', 6.4, 0.8, Z, 7.2, 0.8, '#0B1A22', '#F4F1EA', { sc: eBack(seg(t, 40.8, 41.3)) * lf });
      const c = easeOut(seg(t, 43.0, 43.9)); Box(0, 1.3, Z, 4, 1.6 * c, 3, '#45B8AC', { emis: 0.2 }); if (c > 0.9) for (let k = 0; k < 3; k++) Box(0, 1.8 + k * 0.4, Z + 1.55, 3.2, 0.12, 0.05, '#F4F1EA', { emis: 0.6, lw: 0 });
      if (t >= 43.1) Label('RAD-HARDENED AI PROCESSORS', 7.4, 2.2, Z, 8.6, 0.85, '#0B1A22', '#64D2C7', { sc: eBack(seg(t, 43.1, 43.6)) * lf });
      const r = easeOut(seg(t, 46.0, 47.0)); Cyl(0, 2.9, Z, 1.0, 7 * r, '#CFD6DA', { seg: 14 }); Cyl(0, 2.9 + 7 * r, Z, 0.7, 1.4 * r, '#9FB3BD', { seg: 14 });
      if (t >= 46.1) Label('STARSHIP ROCKETS', 5.6, 8.0, Z, 6.2, 0.85, '#0B1A22', '#E2B857', { sc: eBack(seg(t, 46.2, 46.7)) * lf });
      if (t >= 47.6) { groundPath(Array.from({ length: 25 }, (_, k) => [Math.cos(k / 24 * TAU) * 3.2, Z + Math.sin(k / 24 * TAU) * 3.2]), 13.2, '#64D2C7', 4, 1); Label('LOW-EARTH ORBIT', 0, 14.2 - 0.0, Z, 6.2, 0.85, '#2E5261', '#F4F1EA', { sc: eBack(seg(t, 47.6, 48.1)) * (1 - seg(t, 49.0, 49.4)) }); }
      Char('elon', -5.2, Z + 3, 2.4, { facing: 1, phase: 4, armAngleR: -0.4, armAngleL: 0.3 }, 38.0, 56.4, t);
    }
    // 9: the peak of the what-if dream; Earth and space as one machine; the two execution machines
    if (t >= 49.2) {
      if (t < 56.0) Label('THE PEAK OF THE WHAT-IF DREAM', 0, 12.2, Z, 11, 1.2, '#C8463C', '#F4F1EA', { sc: eBack(seg(t, 49.4, 50.0)) * (1 - seg(t, 55.4, 56.0)) });
      if (t >= 52.0) { Label('EARTH', -9, 0.9, Z + 0.6, 3, 0.8, '#2B8A6E', '#F4F1EA', { sc: eBack(seg(t, 52.0, 52.5)) }); Label('SPACE', -9, 31.4, Z + 0.6, 3, 0.8, '#3D6F86', '#F4F1EA', { sc: eBack(seg(t, 52.4, 52.9)) }); }
      if (t >= 52.6 && t < 59.4) Label('ONE VERTICALLY INTEGRATED JUGGERNAUT', 10, 16, Z, 13, 1.2, '#0B1A22', '#E2B857', { sc: eBack(seg(t, 52.6, 53.2)) * (1 - seg(t, 58.8, 59.4)) });
      const wj = easeOut(seg(t, 56.1, 57.4)), wk = wj > 0 && wj < 1 ? 1 : 0;
      Char('jensen', lerp(-12, -2.6, wj), Z + 5, 2.35, { facing: 1, phase: 5, walkAmt: wk, armAngleR: -1.5, armAngleL: 0.3, talk: 0.5 }, 56.1, 70, t);
      Char('elon', lerp(5, 2.6, wj), Z + 5, 2.4, { facing: -1, phase: 6, walkAmt: 0, armAngleR: -1.5, armAngleL: 0.3, talk: 0.5 }, 56.1, 70, t);
      if (t >= 59.4) { Label('JENSEN', -2.6, 3.4, Z + 5, 2.6, 0.7, '#0B1A22', '#64D2C7', { sc: eBack(seg(t, 59.4, 59.9)) }); Label('ELON', 2.6, 3.4, Z + 5, 2.6, 0.7, '#0B1A22', '#E2B857', { sc: eBack(seg(t, 59.5, 60.0)) }); Label('TWO EXECUTION MACHINES', 0, 5.4, Z + 5, 7.4, 0.9, '#C8463C', '#F4F1EA', { sc: eBack(seg(t, 59.7, 60.2)) }); hit(0, 3.5, Z + 5, 59.4, PAL.coral, 300); }
    }

    drawBG(0.2 * dark);
    GROUND.forEach(fn => fn());
    ITEMS.sort((a, b) => b.z - a.z).forEach(it => it.fn());
    OVER.forEach(fn => fn());
    HEADS.forEach(h => { const a = env(t, h[0], h[1], 0.3, 0.3); if (a > 0.01) drawShotBanner(h[2], h[3], a, h[4], t, h[0]); });
  }

