  const HEADS = [
    [0.10, 15.2, 'BY THE TEXTBOOK', 'The board accepts the resignation on November 12th', PAL.amberHi],
    [15.9, 30.9, 'NOT A NORMAL COMPANY', 'A personal handshake empire held together by one man', PAL.coral],
    [31.1, 41.3, 'THE MARKET REACTS', 'Down more than 40% from its highs, a seven-day rout', PAL.coral],
    [41.6, 52.4, 'THE REVOLT', 'Panic in Santa Clara, then an internal petition', PAL.cyan]
  ];

  // ---- custom card painters (used through Card kind 'paint'): the 4-step governance playbook and the falling stock chart
  const typedStr = (s, tt, at, cps) => { const n = Math.floor(Math.max(0, tt - at) * cps); return s.slice(0, n) + (n < s.length && n > 0 && Math.floor(tt * 4) % 2 === 0 ? '▌' : ''); };
  const playbook = (g, pw, ph, u, tt) => {
    const m = pw * 0.03; g.save(); g.shadowColor = 'rgba(11,25,30,0.4)'; g.shadowBlur = pw * 0.03; g.shadowOffsetY = pw * 0.012; rrect(g, m, m, pw - 2 * m, ph - 2 * m, ph * 0.08); g.fillStyle = '#0F2229'; g.fill(); g.restore();
    g.lineWidth = ph * 0.015; g.strokeStyle = 'rgba(235,193,107,0.5)'; rrect(g, m, m, pw - 2 * m, ph - 2 * m, ph * 0.08); g.stroke();
    g.fillStyle = '#EBC16B'; g.textAlign = 'left'; g.textBaseline = 'alphabetic'; g.font = '900 ' + ph * 0.1 + 'px' + FAM; g.fillText(typedStr('TEXTBOOK CORPORATE GOVERNANCE', tt, 5.6, 22), pw * 0.06, ph * 0.22);
    const steps = [['SCANDAL HITS', 7.6, '#D94E43'], ['FOUNDER STEPS DOWN', 9.2, '#D99B26'], ['CFO STEPS UP', 11.5, '#2B8A6E'], ['LIFE GOES ON', 14.5, '#45B8AC']], sw = pw * 0.2, gap = pw * 0.02, x0 = pw * 0.06, y0 = ph * 0.38, sh = ph * 0.5;
    steps.forEach((st, i) => {
      const x = x0 + i * (sw + gap), on = tt >= st[1], k = Math.max(0, Math.min(1, (tt - st[1]) / 0.35)), e = 1 - Math.pow(1 - k, 3);
      g.beginPath(); g.moveTo(x, y0); g.lineTo(x + sw - sh * 0.22, y0); g.lineTo(x + sw, y0 + sh / 2); g.lineTo(x + sw - sh * 0.22, y0 + sh); g.lineTo(x, y0 + sh); g.lineTo(x + sh * 0.22, y0 + sh / 2); g.closePath(); g.fillStyle = on ? st[2] : '#1E3340'; g.globalAlpha = on ? 0.35 + 0.65 * e : 1; g.fill(); g.globalAlpha = 1; g.lineWidth = ph * 0.012; g.strokeStyle = 'rgba(255,255,255,0.25)'; g.stroke();
      g.fillStyle = on ? '#FFFFFF' : 'rgba(255,255,255,0.25)'; g.textAlign = 'center'; g.font = '900 ' + ph * 0.07 + 'px' + FAM; g.fillText(String(i + 1), x + sw / 2 + sh * 0.05, y0 + sh * 0.34);
      g.font = '800 ' + ph * 0.058 + 'px' + FAM; const lab = on ? typedStr(st[0], tt, st[1], 26) : ''; const words = lab.split(' '); words.forEach((w, q) => g.fillText(w, x + sw / 2 + sh * 0.05, y0 + sh * 0.56 + q * ph * 0.07));
    });
  };
  const stockChart = (g, pw, ph, u, tt) => {
    const m = pw * 0.03; g.save(); g.shadowColor = 'rgba(11,25,30,0.4)'; g.shadowBlur = pw * 0.03; g.shadowOffsetY = pw * 0.012; rrect(g, m, m, pw - 2 * m, ph - 2 * m, ph * 0.06); g.fillStyle = '#0F2229'; g.fill(); g.restore();
    g.lineWidth = ph * 0.012; g.strokeStyle = 'rgba(235,193,107,0.5)'; rrect(g, m, m, pw - 2 * m, ph - 2 * m, ph * 0.06); g.stroke();
    const X0 = pw * 0.1, X1 = pw * 0.94, Y0 = ph * 0.2, Y1 = ph * 0.86, p = Math.max(0, Math.min(1, (tt - 31.2) / 3.0)), ep = p * p * (3 - 2 * p);
    g.fillStyle = '#F4F1EA'; g.textAlign = 'left'; g.font = '900 ' + ph * 0.07 + 'px' + FAM; g.fillText('NVIDIA STOCK', X0, ph * 0.13);
    g.strokeStyle = 'rgba(255,255,255,0.12)'; g.lineWidth = 2; for (let i = 0; i < 5; i++) { g.beginPath(); g.moveTo(X0, Y0 + i * (Y1 - Y0) / 4); g.lineTo(X1, Y0 + i * (Y1 - Y0) / 4); g.stroke(); }
    g.setLineDash([12, 9]); g.strokeStyle = '#EBC16B'; g.lineWidth = 3; g.beginPath(); g.moveTo(X0, Y0 + 4); g.lineTo(X1, Y0 + 4); g.stroke(); g.setLineDash([]); g.fillStyle = '#EBC16B'; g.font = '800 ' + ph * 0.05 + 'px' + FAM; g.textAlign = 'right'; g.fillText('ITS HIGHS', X1, Y0 - ph * 0.02);
    const pts = []; for (let i = 0; i <= 40; i++) { const f = i / 40, drop = Math.pow(f, 1.4) * 0.58, wob = (hash(i * 5 + 3) - 0.5) * 0.06 * (0.4 + f); pts.push([X0 + f * (X1 - X0), Y0 + (Y1 - Y0) * Math.min(1, 0.04 + drop + wob + (i % 7 === 0 ? 0.03 : 0))]); }
    const n = Math.floor(ep * 40); g.beginPath(); g.moveTo(pts[0][0], pts[0][1]); for (let i = 1; i <= n; i++) g.lineTo(pts[i][0], pts[i][1]);
    if (n >= 1) { g.lineTo(pts[n][0], Y1); g.lineTo(pts[0][0], Y1); g.closePath(); g.fillStyle = 'rgba(217,78,67,0.28)'; g.fill(); }
    g.beginPath(); g.moveTo(pts[0][0], pts[0][1]); for (let i = 1; i <= n; i++) g.lineTo(pts[i][0], pts[i][1]); g.strokeStyle = '#FF6B5E'; g.lineWidth = ph * 0.022; g.lineJoin = 'round'; g.stroke();
    if (n >= 1) { g.fillStyle = '#FFFFFF'; g.beginPath(); g.arc(pts[n][0], pts[n][1], ph * 0.03, 0, 7); g.fill(); }
  };

  function renderShots(t) {
    const cv = evalCam(t);
    Cam3D.set([cv[0], cv[1], cv[2]], [cv[3], cv[4], cv[5]], cv[6], 0.01 * Math.sin(t * 0.6));
    GROUND = []; ITEMS = []; OVER = [];
    const hit = (x, y, z, ht, col, r) => { const p = S(x, y, z); if (p) OVER.push(() => hitFx(p.x, p.y, t, ht, { color: col, r: r || 240, rays: 14 })); };
    const pop = (txt, x, y, z, w, h, bg, fg, t0, t1, o) => Card(x, y, z, w, h, Object.assign({ kind: /^#(D94E43|2B8A6E|D99B26)$/i.test(bg) ? 'stamp' : 'tag', text: txt, bg, fg, accent: /^#(0B1A22|0B191E)$/i.test(bg) ? '#E2B857' : fg, t0, t1: t1 || 0 }, o || {}), t);
    const trk = (keys, d) => RigKit.track(t, keys, d);
    const pad = (x0, z0, x1, z1, col) => groundPoly([[x0, z0], [x1, z0], [x1, z1], [x0, z1]], 0.01, col, null, 0);
    const table = (x, z, w) => { Box(x, 0.7, z, w, 0.35, 3.2, '#6B5238'); [[-1, -1], [1, -1], [-1, 1], [1, 1]].forEach(q => Box(x + q[0] * (w / 2 - 0.5), 0, z + q[1], 0.45, 0.7, 0.45, '#4A3827')); };
    pad(-16, -12, 14, 14, '#B9C7CE'); pad(14, -12, 40, 14, '#A9B8C2'); pad(40, -12, 66, 14, '#C2AAB2'); pad(66, -12, 92, 14, '#A9AEC4');

    // ===== S1 (0 - 15.3) by the textbook: resignation accepted, the four-step playbook =====
    if (t < 15.7) {
      table(0, 0, 9.4); Box(0, 0, -5.4, 12, 7, 0.5, '#9DB4BF'); Box(0, 5.2, -5.1, 9, 1.2, 0.2, '#17252B'); Label('NVIDIA BOARD', 0, 5.8, -4.7, 6.4, 1.0, null, '#9BE01B', { sc: 1 });
      [-3.4, -1.15, 1.15, 3.4].forEach((bx, i) => { Box(bx, 0, -2.6, 1.3, 0.9, 1.1, '#2B2F36'); Char('board', bx, -2.6, 2.1, Object.assign({ phase: i, facing: 1 }, trk([[0, 'sit'], [11.8 + i * 0.12, 'cross']])), 0.0, 15.7, t); });
      // the resignation letter is typed out, line by line
      Card(5.6, 8.9, 1.5, 6.2, 3.4, { kind: 'doc', tag: 'NOVEMBER 12', head: 'RESIGNATION ACCEPTED', typeHead: true, type: true, cps: 22, lines: ['Jensen Huang steps down', 'Accepted by the NVIDIA board'], lineAt: [2.3, 3.4], hl: -1, t0: 0.5, t1: 4.8 }, t);
      if (t >= 1.2 && t < 1.5) hit(-7.2, 7.0, 1.5, 1.2, PAL.amberHi, 200);
      // Jensen steps down from the platform and leaves; Kress steps up as interim CEO
      const lv = seg(t, 8.8, 10.8);
      Char('jensen', lerp(-1.2, -9.5, easeInOut(lv)), 4.4, 2.4, { pose: lv > 0 && lv < 1 ? 'spr:walk' : 'spr:think', facing: lv > 0 ? -1 : 1, phase: 1 }, 0.1, 11.2, t);
      const kw = seg(t, 11.0, 12.4);
      Char('kress', lerp(9, 5.5, easeInOut(kw)), 4.4, 2.4, { pose: kw < 1 ? 'spr:walk' : 'spr:podium', facing: kw < 1 ? -1 : 1, phase: 2 }, 10.8, 15.7, t);
      pop('INTERIM CEO', 5.6, 7.3, 4.4, 6.4, 1.1, '#0B1A22', '#E2B857', 12.4, 15.3);
      Card(0, 8.6, -1.4, 13.6, 3.7, { kind: 'paint', paint: (g, pw, ph, u) => playbook(g, pw, ph, u, t), t0: 5.7, t1: 15.2 }, t);
    }

    // ===== S2 (15.3 - 31) not a normal company: org chart vs handshake empire, then it fractures =====
    if (t >= 15.1 && t < 31.4) {
      { const g = seg(t, 15.5, 17.8); if (g > 0 && t < 18.3) { const P = [[8, 0.06, 6], [12, 0.06, 3.5], [15.5, 0.06, 6.5], [19, 0.06, 3], [22.5, 0.06, 6], [26, 0.06, 2.5], [29.5, 0.06, 6], [33, 0.06, 3.5], [37, 0.06, 6]], n = Math.floor(g * (P.length - 1)); for (let i = 0; i < n; i++) Line3(P[i], P[i + 1], '#C42631', 15, 1); } }
      pop('ONE PROBLEM', 26, 6.4, 3, 6.2, 1.4, '#D94E43', '#F4F1EA', 16.0, 18.1);
      if (t >= 16.0) hit(26, 7.4, 3, 16.1, PAL.coral, 300);
      // a normal company: an org chart
      const oc = easeOut(seg(t, 18.2, 19.0)) * (1 - seg(t, 20.2, 20.8));
      if (oc > 0.03) {
        const OX = 18, OZ = 3, Z = 1.7;      // org chart drawn 1.7x and pulled toward the camera so it reads at the wide hold
        Box(OX, 6.2 * Z * 0.62 + 1.4, OZ, 2.2 * Z * oc, 1.0 * Z * oc, 0.8, '#7F95A0');
        [-3, 0, 3].forEach(dx => { Box(OX + dx * Z, 4.0 * Z * 0.62 + 1.4, OZ, 1.8 * Z * oc, 0.9 * Z * oc, 0.8, '#98AEB9'); Line3([OX, 6.2 * Z * 0.62 + 1.4, OZ], [OX + dx * Z, 4.9 * Z * 0.62 + 1.4, OZ], '#5D7380', 5, oc); [-0.9, 0.9].forEach(d2 => { Box(OX + (dx + d2) * Z, 2.0 * Z * 0.62 + 1.4, OZ, 1.0 * Z * oc, 0.8 * Z * oc, 0.8, '#B2C4CC'); Line3([OX + dx * Z, 4.0 * Z * 0.62 + 1.4, OZ], [OX + (dx + d2) * Z, 2.8 * Z * 0.62 + 1.4, OZ], '#5D7380', 4, oc); }); });
        pop('A NORMAL COMPANY', OX, 9.6, OZ, 7.2, 1.0, '#0B1A22', '#F4F1EA', 18.3, 20.4);
      }
      // NVIDIA: Jensen at the centre of a handshake network, every link personal
      const R = 6.2, N = 8, grow = seg(t, 20.7, 24.0), frac = seg(t, 28.3, 30.2);
      const jx = 33, jz = 0;
      if (t >= 19.4) {
        Cyl(jx, 0, jz, 2.4, 0.12, t >= 24.4 ? '#E2B857' : '#76B900', { a: 0.9 });
        Char('jensen', jx, jz + 1.5, 2.4, { pose: t < 24.4 ? 'spr:explain' : 'spr:present', facing: 1, phase: 3 }, 19.4, 31.4, t);
        for (let i = 0; i < N; i++) {
          const a = i / N * 6.2832 + 0.4, bk = 28.3 + i * 0.16, broken = t >= bk, drift = easeOut(seg(t, bk, bk + 1.4)) * 3.2, nx = jx + Math.cos(a) * (R + drift), nz = jz + Math.sin(a) * R * 0.75 - 1 - (broken ? drift * 0.2 : 0), ny = 1.0 + (i % 2) * 1.3;
          const lg = Math.max(0, Math.min(1, (grow * N - i) / 1.0)); if (lg <= 0) continue;
          Box(nx, ny - 0.6, nz, 1.2, 1.2, 1.2, broken ? '#D94E43' : '#76B900', { emis: broken ? 0.3 : 0 });
          const cx = jx, cy = 3.0, cz = jz + 0.8, mx = lerp(cx, nx, lg), my = lerp(cy, ny, lg), mz = lerp(cz, nz, lg);
          if (!broken) { Line3([cx, cy, cz], [mx, my, mz], '#E2B857', 8, 1); if (lg >= 1) Box(lerp(cx, nx, 0.5), lerp(cy, ny, 0.5) - 0.15, lerp(cz, nz, 0.5), 0.5, 0.3, 0.5, '#FFE8A0', { lw: 0 }); }
          else { const cut = 0.42; Line3([cx, cy, cz], [lerp(cx, nx, cut), lerp(cy, ny, cut), lerp(cz, nz, cut)], '#D94E43', 8, 1); if (t < bk + 0.12) hit(lerp(cx, nx, cut), lerp(cy, ny, cut), lerp(cz, nz, cut), bk, PAL.coral, 120); }
        }
      }
      pop('A PERSONAL HANDSHAKE EMPIRE', 33, 7.6, 3, 11.4, 1.2, '#0B1A22', '#E2B857', 20.8, 24.2);
      pop('ONE MAN', 33, 6.4, 3.6, 4.6, 1.2, '#D99B26', '#0B191E', 24.5, 27.4);
      if (t >= 24.5) hit(33, 6.9, 3.6, 24.6, PAL.amberHi, 260);
      pop('SEMICONDUCTOR ECOSYSTEM', 33, 8.0, 1, 11.4, 1.1, '#0B1A22', '#F4F1EA', 25.4, 28.2);
      pop('FRACTURING', 33, 6.4, 3.8, 6.0, 1.3, '#D94E43', '#F4F1EA', 28.4, 31.2);
      if (t >= 28.4) hit(33, 6.6, 3.8, 28.5, PAL.coral, 320);
    }

    // ===== S3 (31 - 41.4) the market: the stock plunges, indexes fall for seven days =====
    if (t >= 30.9 && t < 41.8) {
      Card(46.8, 5.6, 1.5, 9.6, 5.6, { kind: 'paint', paint: (g, pw, ph, u) => stockChart(g, pw, ph, u, t), t0: 31.0, t1: 0 }, t);
      if (t >= 31.0) Card(54.6, 8.0, 1.5, 5.4, 2.0, { kind: 'counter', text: '-40%+', sub: 'off its highs', bg: '#2A0F0F', fg: '#FF6B5E', accent: '#D94E43', scramble: 0.45, pulse: [34.2], t0: 31.8 }, t);
      pop('MORE THAN 40%', 46.8, 9.0, 1.5, 7.8, 1.1, '#0B1A22', '#F4F1EA', 33.0, 36.0);
      // major indexes drag down day by day
      const day = Math.floor(seg(t, 35.2, 40.4) * 7 + 0.999);
      [0, 1, 2, 3, 4].forEach(i => { const f = 1 - 0.09 * Math.min(7, Math.max(0, seg(t, 35.2, 40.4) * 7)) * (0.7 + i * 0.12), h = 6.0 * f * (0.7 + 0.12 * i) * easeOut(seg(t, 34.6 + i * 0.1, 35.4)); Box(58 + i * 1.5, 0, -1, 1.1, h, 1.4, f > 0.7 ? '#76B900' : '#D94E43'); });
      if (t >= 35.2) Card(61.2, 9.6, 0, 6.2, 1.9, { kind: 'counter', text: 'DAY ' + Math.min(7, Math.max(1, day)) + ' / 7', sub: 'major indexes down', pulse: [36.6, 37.8, 39.0, 40.2], t0: 35.2, t1: 41.4 }, t);
      pop('A SEVEN-DAY ROUT', 61, 11.4, 0, 8, 1.2, '#D94E43', '#F4F1EA', 37.6, 41.0);
    }

    // ===== S4 (41.4 - 52.5) Santa Clara: panic, open revolt, the typed petition =====
    if (t >= 41.2) {
      Box(78, 0, -8, 13, 9.5, 4.5, '#1B2A31'); Box(78, 6.2, -5.7, 13, 1.1, 0.2, '#76B900');
      for (let r = 0; r < 3; r++) for (let c = 0; c < 5; c++) Box(73 + c * 2.5, 1.2 + r * 2.4, -5.7, 1.3, 1.0, 0.1, '#BFE9F2', { emis: 0.35 });
      pop('SANTA CLARA HEADQUARTERS', 78, 14.2, -4, 10.4, 1.1, '#0B1A22', '#9BE01B', 41.4, 44.0);
      for (let i = 0; i < 8; i++) { const cx = 70 + i * 2.3, wave = i % 2; Char(i % 3 === 0 ? 'engineer' : 'employee', cx, 3.6 + (i % 3) * 1.3, 2.2, Object.assign({ phase: i * 0.7, prop: t > 42.7 && i % 2 === 0 ? 'sign' : undefined, propText: 'PETITION' }, trk([[0, 'panic'], [42.6 + i * 0.09, 'cheer']])), 41.4 + i * 0.05, 52.5, t); }
      pop('OPEN REVOLT', 78, 7.6, 4.8, 7.6, 1.6, '#D94E43', '#F4F1EA', 42.2, 44.2);
      if (t >= 42.2) hit(78, 7.6, 4.8, 42.3, PAL.coral, 300);
      Card(78, 6.6, 2.6, 9.8, 5.4, { kind: 'doc', quote: true, serif: true, tag: 'INTERNAL PETITION', accent: '#2C5BA8', head: 'TO THE BOARD', typeHead: true, type: true, cps: 18, lines: ['Engineers and researchers signed.', "Without Jensen, NVIDIA's culture and", 'product roadmap would collapse.'], lineAt: [44.5, 46.9, 49.3], hl: 2, hlWord: 'collapse', hlAt: 7.3, tear: 51.75, t0: 44.1, t1: 0 }, t);
      if (t >= 51.75 && t < 51.95) hit(78, 6.4, 3, 51.75, PAL.coral, 340);
    }

    drawBG(0.05);
    GROUND.forEach(fn => fn());
    ITEMS.sort((a, b) => b.z - a.z).forEach(it => it.fn());
    OVER.forEach(fn => fn());
    HEADS.forEach(h => { const a = env(t, h[0], h[1], 0.3, 0.3); if (a > 0.01) drawShotBanner(h[2], h[3], a, h[4], t, h[0]); });
  }
