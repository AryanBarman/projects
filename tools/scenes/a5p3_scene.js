  const HEADS = [
    [0.00, 11.30, 'WASHINGTON, D.C.', 'The final layer nobody in Silicon Valley can ignore', PAL.amberHi],
    [11.54, 16.80, 'NOT IN A VACUUM', 'Boardroom and media reports around personal contact', PAL.coral],
    [17.32, 26.10, 'THE PENTAGON CONNECTION', 'SpaceX launches classified payloads and operates Starshield', PAL.cyan],
    [26.34, 38.30, 'IMMEDIATE REVIEWS', 'A freshly ousted CEO at a defense fab triggers national security review', PAL.coral],
    [38.74, 51.48, 'WHY HIRE JENSEN AT ALL?', 'Physics, $44B of debt, and Elon floating the idea anyway', PAL.amberHi]
  ];
  const pad = (x0, z0, x1, z1, col) => groundPoly([[x0, z0], [x1, z0], [x1, z1], [x0, z1]], 0.01, col, null, 0);
  const Line3 = (a, b, col, lw, al) => { const A = toCam(a[0], a[1], a[2]), B = toCam(b[0], b[1], b[2]), cl = clipLine(A, B); if (!cl) return; const p = scr(cl[0]), q = scr(cl[1]); item((cl[0][2] + cl[1][2]) / 2, () => { ctx.save(); ctx.globalAlpha = al === undefined ? 1 : al; ctx.strokeStyle = col; ctx.lineWidth = lw; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y); ctx.stroke(); ctx.restore(); }); };
  const capitol = (x, z, s, u) => { Box(x, 0, z, 8 * s, 2.4 * s * u, 4 * s, '#C9D3D9'); [-3, -1, 1, 3].forEach(c => Cyl(x + c * s, 0, z + 2.3 * s, 0.35 * s, 2.2 * s * u, '#F4F1EA', { seg: 10 })); Cyl(x, 2.4 * s * u, z, 2.4 * s, 0.8 * s * u, '#E8EEF2', { seg: 16 }); Cyl(x, 3.2 * s * u, z, 1.7 * s, 1.0 * s * u, '#F4F1EA', { seg: 16 }); Cyl(x, 4.2 * s * u, z, 0.6 * s, 0.9 * s * u, '#C9D3D9', { seg: 12 }); };

  function renderShots(t) {
    const cv = evalCam(t);
    Cam3D.set([cv[0], cv[1], cv[2]], [cv[3], cv[4], cv[5]], cv[6], 0.01 * Math.sin(t * 0.6));
    GROUND = []; ITEMS = []; OVER = [];
    const hit = (x, y, z, ht, col, r) => { const p = S(x, y, z); if (p) OVER.push(() => hitFx(p.x, p.y, t, ht, { color: col, r: r || 240, rays: 14 })); };
    pad(-16, -9, 46, 12, '#0E2A36'); pad(46, -9, 72, 9, '#12303C'); pad(74, -12, 114, 12, '#0E2A36'); pad(112, -9, 146, 12, '#12303C'); pad(136, -9, 184, 10, '#0E2A36');
    groundPath([[-8, 6], [20, 6], [56, 6], [92, 6], [124, 6], [160, 6]], 0.05, '#E2B857', 5, seg(t, 0.4, 49));

    // 1: Washington, D.C. and Jensen's resignation, not in a vacuum
    if (t < 16.8) {
      [[-8, 3, 9], [-3.4, 3.4, 13], [1.6, 3, 10], [6, 2.6, 7]].forEach((b, i) => Box(b[0], 0, -4, b[1], b[2] * easeOut(seg(t, 0.2 + i * 0.15, 0.9 + i * 0.15)), b[1], '#3D6F86'));
      Label('SILICON VALLEY', 2, 14.6, -4, 8.6, 1.0, '#0B1A22', '#64D2C7', { sc: eBack(seg(t, 0.3, 0.8)) * (1 - seg(t, 3.4, 4.0)) });
      const cu = easeOut(seg(t, 4.0, 5.2)); capitol(34, 0, 1.3, cu);
      Label('WASHINGTON, D.C.', 34, 11.0, 0, 10, 1.1, '#0B1A22', '#E2B857', { sc: eBack(seg(t, 4.0, 4.6)) });
      if (t >= 6.0) {
        const pu = eBack(seg(t, 6.1, 6.7)); Panel(13, 6.4, 3, 3.4, 2.8, (g, pw, ph) => { g.fillStyle = '#F2EEE2'; g.strokeStyle = '#0B161C'; g.lineWidth = pw * 0.025; g.beginPath(); g.roundRect(0, 0, pw, ph, pw * 0.05); g.fill(); g.stroke(); g.fillStyle = '#C8463C'; g.fillRect(0, 0, pw, ph * 0.24); g.fillStyle = '#F4F1EA'; g.textAlign = 'center'; g.textBaseline = 'middle'; g.font = '900 ' + ph * 0.15 + 'px system-ui'; g.fillText('NOVEMBER 2026', pw / 2, ph * 0.12); g.fillStyle = '#0B161C'; g.font = '900 ' + ph * 0.2 + 'px system-ui'; g.fillText('RESIGNATION', pw / 2, ph * 0.6); }, { sx: pu * (1 - seg(t, 11.0, 11.6)), sy: pu * (1 - seg(t, 11.0, 11.6)) });
        Char('jensen', 9.5, 6.4, 2.35, { facing: 1, phase: 1, armAngleR: -0.4, armAngleL: 0.3, browTension: 0.7, talk: 0.3 }, 6.0, 11.2, t);
        const jar = easeInOut(seg(t, 9.7, 10.6));
        Box(20, 0, 3, 3, 0.2, 3, '#9FB3BD'); Box(20, 0.6, 3, 1.4, 0.9, 1.0, '#F2EEE2'); Cyl(20, 0.2 + jar * 6, 3, 1.9, 3.4, '#9FD8FF', { a: 0.28, seg: 14, lw: 1 });
        Label('NOT IN A VACUUM', 20, 6.4 + jar * 0.6, 3, 8.2, 1.0, '#C8463C', '#F4F1EA', { sc: eBack(seg(t, 9.7, 10.3)) });
      }
    }
    // 2: explosive boardroom and media reports around personal contact
    if (t >= 11.5 && t < 17.2) {
      Box(56, 0, 0, 8, 1, 3, '#6B5238'); [[52, 3], [55, 3.6], [58, 3.6], [61, 3]].forEach((p, i) => Char('analyst', p[0] - 0.4, p[1] + 1.4, 2.2, { facing: i < 2 ? 1 : -1, phase: 2 + i, armAngleR: i === 1 ? -1.65 : -0.4, armAngleL: 0.3, browTension: 0.7 }, 11.7 + i * 0.12, 17.2, t));
      const tu = eBack(seg(t, 11.8, 12.4)); Panel(63, 4.6, -2, 5.6, 3.6, (g, pw, ph) => { g.fillStyle = '#0B1A22'; g.strokeStyle = '#C8463C'; g.lineWidth = pw * 0.02; g.beginPath(); g.roundRect(0, 0, pw, ph, pw * 0.04); g.fill(); g.stroke(); g.fillStyle = '#C8463C'; g.fillRect(pw * 0.04, ph * 0.08, pw * 0.4, ph * 0.18); g.fillStyle = '#F4F1EA'; g.textAlign = 'left'; g.textBaseline = 'middle'; g.font = '900 ' + ph * 0.13 + 'px system-ui'; g.fillText('BREAKING', pw * 0.07, ph * 0.17); g.font = '900 ' + ph * 0.17 + 'px system-ui'; g.fillText('PERSONAL CONTACT', pw * 0.06, ph * 0.55); g.fillStyle = '#E2B857'; g.fillRect(0, ph * 0.84, pw * ((t * 0.7) % 1), ph * 0.06); }, { sx: tu, sy: tu });
      Box(50, 0, 3, 0.2, 2.2, 0.2, '#9FB3BD'); Box(50, 2.2, 3, 1.0, 0.7, 0.8, '#1A1A1A'); Label('MEDIA', 50, 4.4, 3, 3.2, 0.7, '#0B1A22', '#F4F1EA', { sc: eBack(seg(t, 12.0, 12.5)) });
      Label('EXPLOSIVE REPORTS', 57, 8.4, 0, 9.4, 1.0, '#C8463C', '#F4F1EA', { sc: eBack(seg(t, 12.4, 12.9)) * (1 - seg(t, 16.4, 17.0)) });
      hit(63, 4.6, -2, 12.4, PAL.coral, 320);
    }
    // 3: SpaceX, one of the Pentagon's most sensitive national security contractors: classified payloads and Starshield
    if (t >= 17.2 && t < 26.4) {
      const pu = easeOut(seg(t, 17.4, 18.2)), P = []; for (let k = 0; k < 5; k++) P.push([84 + Math.cos(k / 5 * TAU - 1.57) * 6.2 * pu, Math.sin(k / 5 * TAU - 1.57) * 6.2 * pu]);
      groundPoly(P, 0.03, '#8C98A0', '#0B161C', 3); groundPoly(P.map(p => [84 + (p[0] - 84) * 0.55, p[1] * 0.55]), 0.05, '#2A4452', '#0B161C', 2);
      Label('PENTAGON', 84, 4.2, 0, 6, 1.0, '#0B1A22', '#E2B857', { sc: eBack(seg(t, 17.6, 18.1)) });
      Box(96, 0, 0, 6, 6 * pu, 4, '#C9A24A'); Label('SPACEX', 96, 7.2, 0, 4.4, 0.95, '#0B1A22', '#E2B857', { sc: eBack(seg(t, 17.8, 18.3)) });
      Label('NATIONAL SECURITY CONTRACTOR', 90, 9.4, 0, 12, 1.0, '#0B1A22', '#64D2C7', { sc: eBack(seg(t, 18.4, 19.0)) * (1 - seg(t, 22.6, 23.2)) });
      Line3([87, 1.6, 1], [93, 1.6, 1], '#E2B857', 5, 0.9);
      const ly = 16 * eIn(seg(t, 22.0, 25.4)); Cyl(104, ly, 0, 1.0, 6, '#CFD6DA', { seg: 14 }); Cyl(104, ly + 6, 0, 0.7, 1.2, '#9FB3BD', { seg: 14 }); Box(104, ly + 7.2, 0, 1.3, 1.0, 1.3, '#1A1A1A'); if (t >= 22.0 && ly < 14) Cyl(104, ly - 1.8, 0, 0.6, 1.8, '#FFB340', { emis: 0.8, lw: 0, seg: 8 });
      Label('CLASSIFIED DEFENSE PAYLOADS', 104, ly + 10.0, 0, 11, 0.95, '#C8463C', '#F4F1EA', { sc: eBack(seg(t, 20.3, 20.9)) * (1 - seg(t, 25.4, 26.0)) });
      if (t >= 23.8) { const ring = []; for (let k = 0; k <= 40; k++) ring.push([100 + Math.cos(k / 40 * TAU) * 7, Math.sin(k / 40 * TAU) * 7]); groundPath(ring, 14, '#64D2C7', 3, easeOut(seg(t, 23.8, 24.8))); for (let i = 0; i < 4; i++) { const a = t * 0.5 + i * 1.57; Box(100 + Math.cos(a) * 7, 14, Math.sin(a) * 7, 1.0, 0.8, 0.8, '#CFD6DA'); Box(100 + Math.cos(a) * 7 - 1.5, 14.3, Math.sin(a) * 7, 1.8, 0.08, 0.7, '#3A78B8', { emis: 0.2 }); Box(100 + Math.cos(a) * 7 + 1.5, 14.3, Math.sin(a) * 7, 1.8, 0.08, 0.7, '#3A78B8', { emis: 0.2 }); } Label('STARSHIELD', 100, 18.8, 0, 7.2, 1.0, '#0B1A22', '#64D2C7', { sc: eBack(seg(t, 24.0, 24.6)) }); }
    }
    // 4: a freshly ousted CEO at the helm of a defense contractor's fab triggers immediate national security reviews in Washington
    if (t >= 26.3 && t < 38.6) {
      Box(124, 0, 0, 10, 5, 5, '#3D6F86'); Label('TERRAFAB: STRATEGIC FAB', 124, 6.6, 0, 11, 1.0, '#0B1A22', '#E2B857', { sc: eBack(seg(t, 26.4, 26.9)) });
      Box(124, 0, 4.4, 2.4, 1.2, 1.4, '#2E5261'); Cyl(124, 1.2, 4.4, 1.1, 0.12, '#E2B857', { seg: 16 }); [0, 1, 2, 3].forEach(k => Box(124 + Math.cos(k * 1.57) * 0.8, 1.34, 4.4 + Math.sin(k * 1.57) * 0.8, 0.12, 0.12, 0.12, '#E2B857', { lw: 0 }));
      Label('AT THE HELM', 124, 3.4, 4.4, 4.6, 0.8, '#C8463C', '#F4F1EA', { sc: eBack(seg(t, 27.6, 28.1)) * (1 - seg(t, 32.6, 33.2)) });
      const jw = easeInOut(seg(t, 26.6, 27.8)); Char('jensen', lerp(114, 124, jw), 7.4, 2.35, { facing: 1, phase: 5, walkAmt: jw > 0 && jw < 1 ? 1 : 0, armAngleR: -0.4, armAngleL: 0.3, browTension: 0.6 }, 26.6, 38.6, t);
      Label('FRESHLY OUSTED CEO', 124, 4.8, 7.4, 8.4, 0.9, '#C8463C', '#F4F1EA', { sc: eBack(seg(t, 26.8, 27.3)) * (1 - seg(t, 32.0, 32.6)) });
      if (t >= 32.8) {
        capitol(140, 0, 0.8, easeOut(seg(t, 32.8, 33.6))); Label('WASHINGTON', 140, 6.2, 0, 6.8, 0.9, '#0B1A22', '#E2B857', { sc: eBack(seg(t, 33.0, 33.5)) });
        const flash = Math.sin(t * 12) > 0 ? 0.9 : 0.2; Box(124, 5, 0, 0.8, 0.8, 0.8, '#D8483A', { emis: flash });
        for (let k = 0; k < 8; k++) { const f = (((t - 33.4) * 0.7 + k / 8) % 1 + 1) % 1; if (t >= 33.4) Box(lerp(138, 128, f), 3.6 + Math.sin(f * Math.PI) * 1.4, 2, 0.6, 0.45, 0.1, '#F2EEE2', { lw: 1 }); }
        Label('REGULATORY REVIEW', 118, 8.8, 3, 8.4, 0.9, '#C8463C', '#F4F1EA', { sc: eBack(seg(t, 33.0, 33.5)) }); Label('NATIONAL SECURITY REVIEW', 130, 10.4, 3, 11, 0.9, '#0B1A22', '#E2B857', { sc: eBack(seg(t, 34.6, 35.1)) });
        [0, 1].forEach(i => { const w = easeInOut(seg(t, 33.4 + i * 0.4, 35.4 + i * 0.4)); Char('lawyer', lerp(138, 128, w) + i * 1.6, 7.6 + i * 0.5, 2.3, { facing: -1, phase: 7 + i, walkAmt: w > 0 && w < 1 ? 1 : 0, armAngleR: -0.4, armAngleL: 0.3, browTension: 0.7 }, 33.4 + i * 0.4, 38.6, t); });
        hit(124, 5, 0, 33.0, PAL.coral, 300);
      }
    }
    // 5: if physics slows TerraFab and $44B of GPU debt chains SpaceX to NVIDIA, why is Elon floating hiring Jensen at all?
    if (t >= 38.7) {
      const u = easeOut(seg(t, 38.8, 39.6)); Box(142, 0, 0, 5, 3 * u, 4, '#3D6F86'); for (let k = 0; k < 4; k++) Box(139.8 + k * 1.4, 0, 2.2, 0.8, 0.4 * u, 0.4, k % 2 ? '#E2B857' : '#1A1A1A', { lw: 1 });
      Label('PHYSICS SLOWS TERRAFAB', 142, 4.8, 0, 10, 0.95, '#C8463C', '#F4F1EA', { sc: eBack(seg(t, 38.9, 39.5)) * (1 - seg(t, 41.4, 42.0)) });
      Box(152, 0, 0, 6, 6 * u, 4, '#C9A24A'); Label('SPACEX', 152, 7.2, 0, 4.4, 0.95, '#0B1A22', '#E2B857', { sc: eBack(seg(t, 41.4, 41.9)) });
      Box(170, 0, 0, 5, 8 * u, 4, '#5D9B00'); Label('NVIDIA', 170, 9.2, 0, 4.4, 0.95, '#0B1A22', '#9BE01B', { sc: eBack(seg(t, 41.5, 42.0)) });
      for (let k = 0; k < 9; k++) { const ku = easeOut(seg(t, 41.8 + k * 0.12, 42.3 + k * 0.12)); Box(155.6 + k * 1.5, 1.6, 0, 1.0 * ku, 0.5, 0.5, '#9FB3BD'); Box(155.6 + k * 1.5 + 0.6, 1.4, 0, 0.4, 0.9, 0.4, '#6B7C86', { lw: 1 }); }
      if (t >= 43.4) { Box(161.2, 2.4, 0, 1.6, 1.2, 0.9, '#E2B857', { emis: 0.2 }); Label('$44B GPU DEBT', 161.2, 4.6, 0, 7, 1.0, '#0B1A22', '#E2B857', { sc: eBack(seg(t, 43.4, 44.0)) }); hit(161, 2.4, 0, 43.4, PAL.amberHi, 260); }
      Char('elon', 158, 7, 2.4, { facing: -1, phase: 9, armAngleR: -1.65, armAngleL: 0.3, talk: 0.7, browTension: 0.3 }, 45.4, 60, t);
      if (t >= 46.0) { const bu = eBack(seg(t, 46.0, 46.7)); Panel(160, 9.6, 6, 6.4, 3.6, (g, pw, ph) => { g.fillStyle = '#F2EEE2'; g.strokeStyle = '#0B161C'; g.lineWidth = pw * 0.02; g.beginPath(); g.ellipse(pw / 2, ph * 0.42, pw * 0.46, ph * 0.4, 0, 0, TAU); g.fill(); g.stroke(); g.beginPath(); g.arc(pw * 0.4, ph * 0.86, ph * 0.07, 0, TAU); g.fill(); g.stroke(); g.fillStyle = '#0B161C'; g.textAlign = 'center'; g.textBaseline = 'middle'; g.font = '900 ' + ph * 0.2 + 'px system-ui'; g.fillText('HIRE JENSEN?', pw / 2, ph * 0.42); }, { sx: bu, sy: bu }); }
      if (t >= 49.0) { Label('?', 160, 14.2, 6, 3.6, 3.6, '#C8463C', '#F4F1EA', { sc: eBack(seg(t, 49.0, 49.7)) }); hit(160, 14, 6, 49.0, PAL.coral, 320); }
      Label('WHY HIRE HIM AT ALL?', 160, 11.6, 6, 10, 1.0, '#0B1A22', '#E2B857', { sc: eBack(seg(t, 49.2, 49.8)) });
    }

    drawBG(0.1);
    GROUND.forEach(fn => fn());
    ITEMS.sort((a, b) => b.z - a.z).forEach(it => it.fn());
    OVER.forEach(fn => fn());
    HEADS.forEach(h => { const a = env(t, h[0], h[1], 0.3, 0.3); if (a > 0.01) drawShotBanner(h[2], h[3], a, h[4], t, h[0]); });
  }

