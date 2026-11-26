  // =========================================================================
  // ASSET LIBRARY (spliced before every jen_back scene by build_jb.py). Reusable world objects; each takes world coords and a progress u (0..1)
  // so scenes only decide WHEN. See docs/ASSET_LIBRARY.md for the narration-phrase -> asset -> camera-type mapping.
  // stepChart(g, pw, ph, keys, t, title, tags): clean stock chart painted into a Card kind:'paint'. keys = [[time, y 0..1 (0 = top), rampSeconds?], ...]: at `time` the line MOVES to y over rampSeconds (default 0.35), so a drop can start exactly on the spoken word.
  // Smooth thick line (green rising, red falling), soft area fill, glowing head dot, no wobble. tags = [[time, 'TEXT', colour]] pills that pop at the head.
  const stepChart = (g, pw, ph, keys, t, title, tags) => {
    const m = pw * 0.03, X0 = pw * 0.09, X1 = pw * 0.95, Y0 = ph * 0.24, Y1 = ph * 0.86, T0 = keys[0][0], T1 = keys[keys.length - 1][0] + (keys[keys.length - 1][2] || 0.35);
    g.save(); g.shadowColor = 'rgba(11,25,30,0.4)'; g.shadowBlur = pw * 0.03; g.shadowOffsetY = pw * 0.012; rrect(g, m, m, pw - 2 * m, ph - 2 * m, ph * 0.07); g.fillStyle = '#0F2229'; g.fill(); g.restore();
    g.fillStyle = '#F4F1EA'; g.textAlign = 'left'; g.textBaseline = 'alphabetic'; g.font = '900 ' + ph * 0.075 + 'px' + FAM; g.fillText(title, X0, ph * 0.15);
    g.strokeStyle = 'rgba(255,255,255,0.07)'; g.lineWidth = 2; for (let i = 0; i < 4; i++) { g.beginPath(); g.moveTo(X0, Y0 + i * (Y1 - Y0) / 3); g.lineTo(X1, Y0 + i * (Y1 - Y0) / 3); g.stroke(); }
    const val = tt => { let y = keys[0][1]; for (let i = 1; i < keys.length; i++) { const r = keys[i][2] || 0.35, u = Math.max(0, Math.min(1, (tt - keys[i][0]) / r)); y = lerp(y, keys[i][1], u * u * (3 - 2 * u)); if (tt < keys[i][0]) break; } return y; };
    const px = tt => X0 + (X1 - X0) * (tt - T0) / (T1 - T0), py = y => Y0 + (Y1 - Y0) * y, te = Math.min(t, T1), N = 90, pts = [];
    for (let i = 0; i <= N; i++) { const tt = T0 + (te - T0) * i / N; pts.push([px(tt), py(val(tt))]); }
    if (pts.length > 1) {
      g.beginPath(); g.moveTo(pts[0][0], Y1); pts.forEach(q => g.lineTo(q[0], q[1])); g.lineTo(pts[pts.length - 1][0], Y1); g.closePath(); const gr = g.createLinearGradient(0, Y0, 0, Y1); gr.addColorStop(0, 'rgba(79,224,165,0.22)'); gr.addColorStop(1, 'rgba(79,224,165,0)'); g.fillStyle = gr; g.fill();
      g.lineJoin = 'round'; g.lineCap = 'round'; g.lineWidth = ph * 0.026;
      for (let i = 1; i < pts.length; i++) { g.strokeStyle = pts[i][1] > pts[i - 1][1] + 0.05 ? '#FF6B5E' : '#4FE0A5'; g.beginPath(); g.moveTo(pts[i - 1][0], pts[i - 1][1]); g.lineTo(pts[i][0], pts[i][1]); g.stroke(); }
      const h = pts[pts.length - 1]; g.fillStyle = 'rgba(255,255,255,0.25)'; g.beginPath(); g.arc(h[0], h[1], ph * 0.055, 0, 7); g.fill(); g.fillStyle = '#FFFFFF'; g.beginPath(); g.arc(h[0], h[1], ph * 0.03, 0, 7); g.fill();
    }
    (tags || []).forEach((a, ti) => { const u = (t - a[0]) / 0.25; if (u < 0) return; const sc = u < 1 ? 0.6 + 0.4 * Math.sin(Math.min(1, u) * 1.57) : 1, yv = val(a[0] + 0.3), cx = Math.min(X1 - ph * 0.3, px(Math.min(a[0] + 0.3, T1))), cy = py(yv) + (yv < 0.5 ? ph * 0.16 : -ph * 0.16) + (ti % 2 ? ph * 0.2 : 0);
      g.save(); g.translate(cx, cy); g.scale(sc, sc); g.font = '900 ' + ph * 0.1 + 'px' + FAM; const w = g.measureText(a[1]).width + ph * 0.18; rrect(g, -w / 2, -ph * 0.075, w, ph * 0.15, ph * 0.05); g.fillStyle = a[2] || '#4FE0A5'; g.fill(); g.fillStyle = '#0B191E'; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText(a[1], 0, ph * 0.005); g.restore(); });
  };
  const pad = (x0, z0, x1, z1, col) => groundPoly([[x0, z0], [x1, z0], [x1, z1], [x0, z1]], 0.01, col, null, 0);
  const rndA = i => { const v = Math.sin(i * 127.1 + 311.7) * 43758.5453; return v - Math.floor(v); };
  const table = (x, z, w) => { Box(x, 0.7, z, w, 0.35, 3.2, '#6B5238'); [[-1, -1], [1, -1], [-1, 1], [1, 1]].forEach(q => Box(x + q[0] * (w / 2 - 0.5), 0, z + q[1], 0.45, 0.7, 0.45, '#4A3827')); };
  const boardWall = (x, z) => { Box(x, 0, z - 2.8, 12, 7, 0.5, '#9DB4BF'); Box(x, 5.2, z - 2.5, 9, 1.2, 0.2, '#17252B'); Label('NVIDIA BOARD', x, 5.8, z - 2.1, 6.4, 1.0, null, '#9BE01B', { sc: 1 }); };
  const seats = (x, z, n, gap) => { const out = []; for (let i = 0; i < n; i++) { const bx = x + (i - (n - 1) / 2) * gap; Box(bx, 0, z, 1.3, 0.9, 1.1, '#2B2F36'); out.push(bx); } return out; };
  const whiteHouse = (cx, z, u) => { if (u < 0.05) return; Box(cx, 0, z, 17 * u, 4.6, 5.2, '#BDB398'); Box(cx, 4.6, z, 18 * u, 0.7, 5.8, '#A89E84'); Box(cx, 5.3, z, 8 * u, 1.3, 4.4, '#CFC6AC'); for (let i = 0; i < 6; i++) Cyl(cx - 6.5 + i * 2.6, 0, z + 3, 0.36, 4.6 * u, '#F7F4EC'); Box(cx + 9.5, 0, z + 1, 0.15, 7.5 * u, 0.15, '#7F95A0'); Box(cx + 10.6, 6.2 * u + 0.2, z + 1, 2, 1.2, 0.1, '#2C5BA8'); };
  const capitol = (x, z, s, u) => { Box(x, 0, z, 8 * s, 2.4 * s * u, 4 * s, '#C9D3D9'); [-3, -1, 1, 3].forEach(c => Cyl(x + c * s, 0, z + 2.3 * s, 0.35 * s, 2.2 * s * u, '#F4F1EA', { seg: 10 })); Cyl(x, 2.4 * s * u, z, 2.4 * s, 0.8 * s * u, '#E8EEF2', { seg: 16 }); Cyl(x, 3.2 * s * u, z, 1.7 * s, 1.0 * s * u, '#F4F1EA', { seg: 16 }); Cyl(x, 4.2 * s * u, z, 0.6 * s, 0.9 * s * u, '#C9D3D9', { seg: 12 }); };
  const hqTower = (cx, z, u, label) => { if (u < 0.03) return; Box(cx, 0, z, 10, 12 * u, 4, '#1B2A31'); Box(cx, 7.4 * u, z + 2.1, 10, 1.3, 0.2, '#76B900'); for (let r = 0; r < 4; r++) for (let c = 0; c < 4; c++) if (rndA(r * 4 + c) > 0.25) Box(cx - 3.4 + c * 2.2, 1.4 + r * 1.6, z + 2.1, 1.3, 0.9, 0.1, '#BFE9F2', { emis: 0.4 }); if (label) Label(label, cx, 9.4, z + 2.4, 6.4, 1.3, null, '#9BE01B', { sc: 1 }); };
  const fabSite = (cx, z, u) => { Box(cx, 0, z, 14, 0.4, 8, '#8A7B66'); for (let i = 0; i < 4; i++) Box(cx - 4.5 + i * 3, 0.4, z, 2.4, 3.4 * u * (0.5 + 0.5 * rndA(i + 4)) + 0.2, 4, i % 2 ? '#9FB3BD' : '#CFD6DA'); Box(cx + 6.5, 0, z - 2, 0.3, 8 * u, 0.3, '#E2B857'); Box(cx + 4, 8 * u, z - 2, 5, 0.25, 0.25, '#E2B857'); };
  const door = (x, z, locked) => { Box(x, 0, z, 4.4, 6.4, 0.5, '#6B4A2B'); Box(x + 1.5, 2.6, z + 0.3, 0.4, 0.4, 0.3, '#E2B857'); if (locked) Box(x, 2.4, z + 0.45, 1.1, 1.0, 0.4, '#E2B857'); };
  const orgChart = (ox, oz, Z, oc) => { const Y = v => v * Z * 0.62 + 1.4; Box(ox, Y(6.2), oz, 2.2 * Z * oc, 1.0 * Z * oc, 0.8, '#7F95A0'); [-3, 0, 3].forEach(dx => { Box(ox + dx * Z, Y(4.0), oz, 1.8 * Z * oc, 0.9 * Z * oc, 0.8, '#98AEB9'); Line3([ox, Y(6.2), oz], [ox + dx * Z, Y(4.9), oz], '#5D7380', 5, oc); [-0.9, 0.9].forEach(d2 => { Box(ox + (dx + d2) * Z, Y(2.0), oz, 1.0 * Z * oc, 0.8 * Z * oc, 0.8, '#B2C4CC'); Line3([ox + dx * Z, Y(4.0), oz], [ox + (dx + d2) * Z, Y(2.8), oz], '#5D7380', 4, oc); }); }); };
  // star network around (cx,cz): grow 0..1 draws the links; each node i breaks at breakAt + i*0.16 (pass 1e9 for never)
  const network = (cx, cz, t, grow, breakAt, N, R) => { for (let i = 0; i < N; i++) { const a = i / N * 6.2832 + 0.4, bk = breakAt + i * 0.16, broken = t >= bk, drift = easeOut(seg(t, bk, bk + 1.4)) * 3.2, nx = cx + Math.cos(a) * (R + drift), nz = cz + Math.sin(a) * R * 0.75 - 1 - (broken ? drift * 0.2 : 0), ny = 1.0 + (i % 2) * 1.3, lg = Math.max(0, Math.min(1, (grow * N - i) / 1.0)); if (lg <= 0) continue;
      Box(nx, ny - 0.6, nz, 1.2, 1.2, 1.2, broken ? '#D94E43' : '#76B900', { emis: broken ? 0.3 : 0 }); const ax = cx, ay = 3.0, az = cz + 0.8;
      if (!broken) { Line3([ax, ay, az], [lerp(ax, nx, lg), lerp(ay, ny, lg), lerp(az, nz, lg)], '#E2B857', 8, 1); if (lg >= 1) Box(lerp(ax, nx, 0.5), lerp(ay, ny, 0.5) - 0.15, lerp(az, nz, 0.5), 0.5, 0.3, 0.5, '#FFE8A0', { lw: 0 }); }
      else Line3([ax, ay, az], [lerp(ax, nx, 0.42), lerp(ay, ny, 0.42), lerp(az, nz, 0.42)], '#D94E43', 8, 1); } };
  const steps = (x0, z, n, t, t0) => { for (let i = 0; i < n; i++) Box(x0 + i * 1.6, 0, z, 1.5, (0.5 + i * 0.5) * easeOut(seg(t, t0 + i * 0.12, t0 + 0.5 + i * 0.12)), 3, i === n - 1 ? '#76B900' : '#E2B857'); };
  const barsRow = (x, z, hs, cols) => hs.forEach((h, i) => Box(x + i * 1.5, 0, z, 1.1, Math.max(0.01, h), 1.4, cols[i % cols.length]));
  const chipTower = (x, z, u) => { for (let i = 0; i < 8; i++) Box(x, i * 0.95, z, 3.4, 0.85 * easeOut(seg(u, i * 0.12, 0.45 + i * 0.12)), 3, i % 2 ? '#1B2A31' : '#76B900'); };
  const crack = (pts, t, t0) => { pts.forEach((p, i) => { if (i && t >= t0 + i * 0.1) Line3(pts[i - 1], p, '#D94E43', 10, 1); }); };
  const coin = (x, y, z, a) => Cyl(x, y, z, 0.25, 0.07, '#E2B857', { emis: 0.25, seg: 10, lw: 1, a: a });
  const sat = (x, y, z) => { Box(x, y, z, 1.2, 0.9, 1.0, '#CFD6DA'); Box(x - 1.7, y + 0.35, z, 2.0, 0.08, 0.8, '#3A78B8', { emis: 0.2 }); Box(x + 1.7, y + 0.35, z, 2.0, 0.08, 0.8, '#3A78B8', { emis: 0.2 }); };
  const ringPts = (cx, cz, r) => Array.from({ length: 36 }, (_, k) => [cx + Math.cos(k / 36 * TAU) * r, cz + Math.sin(k / 36 * TAU) * r]);
  const trophy = (x, z, u) => { Cyl(x, 0, z, 0.9, 0.5, '#8A6A2A'); Cyl(x, 0.5, z, 0.25, 1.4 * u, '#E2B857'); Cyl(x, 1.9 * u, z, 0.95, 1.1 * u, '#E2B857', { emis: 0.25 }); };
  const ball = (x, y, z) => { Cyl(x, y, z, 0.7, 0.7, '#E07B2A'); Box(x, y + 0.3, z + 0.1, 1.45, 0.07, 0.2, '#3A2410', { lw: 0 }); };
  // a wide, readable 'people' row of old-style casual characters and portrait avatars
  const peopleRow = (x, z, n, gap, t, t0, pose, t1) => { for (let i = 0; i < n; i++) Char('student', x + (i - (n - 1) / 2) * gap, z + (i % 2) * 1.2, 2.0, Object.assign({ phase: i * 0.6, pose }, {}), t0 + i * 0.08, t1 === undefined ? 1e9 : t1, t); };
