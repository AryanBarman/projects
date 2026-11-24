  // =========================================================================
  // v2 WORLD: one continuous 3D flight (desk -> press release -> Texas map -> campus -> zones -> ledger -> court)
  // =========================================================================
  const eBack = u => { const c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * Math.pow(u - 1, 3) + c1 * Math.pow(u - 1, 2); };
  const eIn = u => u * u * u;
  const CAM_KEYS = [];
  const K = (t, p, l, fov, cut) => CAM_KEYS.push({ t, v: [p[0], p[1], p[2], l[0], l[1], l[2], fov], cut: !!cut });
  K(0.11, [3.5, 2.4, 7.5], [0.3, 1.4, 0], 44);
  K(1.40, [1.8, 2.3, 6.0], [0.5, 1.6, 0], 40);
  K(2.85, [-1.5, 3.0, 7.6], [0, 2.4, -0.6], 38);
  K(4.60, [1.0, 3.2, 7.4], [0, 2.6, -0.6], 36);
  K(6.47, [3.8, 3.0, 6.8], [0.4, 2.2, -0.5], 40);
  K(8.40, [-3.2, 2.8, 7.4], [0.4, 2.2, 0], 40);
  K(10.31, [0, 5.0, 8.0], [0, 0.5, -8], 46);
  K(12.00, [0, 13, -11], [0, 0, -23], 46);
  K(13.81, [7, 9, -12.5], [2.2, 0.6, -21.6], 40);
  K(15.40, [4.5, 7.5, -14.0], [2.2, 0.6, -21.6], 40);
  K(15.65, [-1.5, 2.6, -40.0], [-3.2, 1.0, -50], 42, true);
  K(17.85, [-8, 13, -28], [0, 0, -68], 48);
  K(21.63, [14, 24, -40], [0, 0, -70], 46);
  K(25.71, [0, 27, -45], [0, 0, -72], 44);
  K(28.00, [0, 10, -58], [0, 1, -78], 44);
  K(31.41, [-6, 7.5, -58], [0, 2.5, -82], 46);
  K(35.21, [-14, 6.5, -62], [-14, 1.5, -80], 40);
  K(38.65, [-2, 7.5, -60], [0, 3.0, -80], 42);
  K(40.50, [10, 7.5, -60], [14, 2.5, -80], 42);
  K(42.41, [8, 8.5, -66], [2, 4, -92], 46);
  K(44.20, [0, 12, -62], [0, 4, -94], 50);
  K(44.35, [42, 7.5, -60], [50, 1.8, -80], 44, true);
  K(47.39, [38, 8.5, -61], [50, 2.0, -80], 44);
  K(51.29, [62, 9.5, -60], [50, 4.0, -80], 44);
  K(54.30, [50, 9.5, -52], [50, 7.5, -80], 42);
  K(55.25, [50, 10, -52], [50, 7.5, -80], 42);
  K(57.40, [86, 7, -58], [90, 3, -82], 46);
  K(61.90, [94, 5.0, -61], [90, 2.4, -80], 42);
  K(66.80, [89, 5.0, -62], [90, 2.4, -80], 40);
  (function buildTangents() {
    const n = CAM_KEYS.length;
    CAM_KEYS.forEach((k, i) => {
      const nx = CAM_KEYS[i + 1];
      if (k.cut || (nx && nx.cut)) { k.m = k.v.map(() => 0); return; }
      const p = CAM_KEYS[Math.max(0, i - 1)], q = nx || k;
      k.m = k.v.map((_, c) => (q.v[c] - p.v[c]) / Math.max(1e-4, q.t - p.t));
    });
  })();
  function evalCam(t) {
    const Ks = CAM_KEYS;
    if (t <= Ks[0].t) return Ks[0].v;
    if (t >= Ks[Ks.length - 1].t) return Ks[Ks.length - 1].v;
    let i = 0;
    while (i < Ks.length - 2 && t > Ks[i + 1].t) i++;
    const a = Ks[i], b = Ks[i + 1];
    if (b.cut) return a.v;
    const dt = b.t - a.t, u = (t - a.t) / dt, u2 = u * u, u3 = u2 * u;
    return a.v.map((_, c) => (2 * u3 - 3 * u2 + 1) * a.v[c] + (u3 - 2 * u2 + u) * dt * a.m[c] + (-2 * u3 + 3 * u2) * b.v[c] + (u3 - u2) * dt * b.m[c]);
  }

  // ---- camera-space helpers (with near-plane clipping) ----
  const NEAR = 0.35;
  function toCam(x, y, z) {
    const dx = x - Cam3D.pos[0], dy = y - Cam3D.pos[1], dz = z - Cam3D.pos[2], r = Cam3D.right, u = Cam3D.up, f = Cam3D.fwd;
    return [dx * r[0] + dy * r[1] + dz * r[2], dx * u[0] + dy * u[1] + dz * u[2], dx * f[0] + dy * f[1] + dz * f[2]];
  }
  function scr(c) { const F = 540 / Math.tan(Cam3D.fov * Math.PI / 360); return { x: 960 + c[0] / c[2] * F, y: 540 - c[1] / c[2] * F, z: c[2], k: F / c[2] }; }
  function S(x, y, z) { const c = toCam(x, y, z); return c[2] < NEAR ? null : scr(c); }
  function clipLine(a, b) {
    if (a[2] < NEAR && b[2] < NEAR) return null;
    if (a[2] < NEAR) { const u = (NEAR - a[2]) / (b[2] - a[2]); a = [a[0] + (b[0] - a[0]) * u, a[1] + (b[1] - a[1]) * u, NEAR]; }
    else if (b[2] < NEAR) { const u = (NEAR - a[2]) / (b[2] - a[2]); b = [a[0] + (b[0] - a[0]) * u, a[1] + (b[1] - a[1]) * u, NEAR]; }
    return [a, b];
  }
  function shade(hex, f, mix) {
    const n = parseInt(hex.slice(1), 16); let r = (n >> 16) & 255, g = (n >> 8) & 255, b = n & 255;
    r *= f; g *= f; b *= f;
    if (mix) { r += (255 - r) * mix; g += (255 - g) * mix; b += (255 - b) * mix; }
    return 'rgb(' + Math.max(0, Math.min(255, r | 0)) + ',' + Math.max(0, Math.min(255, g | 0)) + ',' + Math.max(0, Math.min(255, b | 0)) + ')';
  }

  let GROUND = [], ITEMS = [], OVER = [];
  const item = (z, fn) => ITEMS.push({ z, fn });

  function Box(x, y0, z, w, h, d, col, o) {
    o = o || {}; if (h <= 0.001 || (o.a !== undefined && o.a <= 0.02)) return;
    const hw = w / 2, hd = d / 2, y1 = y0 + h;
    const Wp = [[x - hw, y0, z - hd], [x + hw, y0, z - hd], [x + hw, y0, z + hd], [x - hw, y0, z + hd], [x - hw, y1, z - hd], [x + hw, y1, z - hd], [x + hw, y1, z + hd], [x - hw, y1, z + hd]];
    const C = Wp.map(p => toCam(p[0], p[1], p[2]));
    if (C.some(c => c[2] < NEAR)) return;
    const P = C.map(scr);
    const faces = [[[4, 5, 6, 7], 0, 1, 0, 1.18], [[1, 2, 6, 5], 1, 0, 0, 0.88], [[0, 3, 7, 4], -1, 0, 0, 0.72], [[3, 2, 6, 7], 0, 0, 1, 1.0], [[0, 1, 5, 4], 0, 0, -1, 0.62]];
    item((C[0][2] + C[6][2]) / 2, () => {
      ctx.save(); ctx.globalAlpha = o.a === undefined ? 1 : o.a; ctx.lineJoin = 'round';
      for (const f of faces) {
        const ctr = [x + f[1] * hw, y0 + h / 2 * (f[2] ? 0 : 1) + (f[2] ? h : 0) * (f[2] > 0 ? 1 : 0) + (f[2] ? 0 : 0), z + f[3] * hd];
        const cy = f[2] > 0 ? y1 : (f[1] || f[3] ? y0 + h / 2 : y0 + h / 2);
        const vis = f[1] * (Cam3D.pos[0] - (x + f[1] * hw)) + f[2] * (Cam3D.pos[1] - cy) + f[3] * (Cam3D.pos[2] - (z + f[3] * hd));
        if (vis <= 0) continue;
        ctx.fillStyle = shade(col, f[4], o.emis || 0); ctx.strokeStyle = o.line || '#0B161C'; ctx.lineWidth = o.lw === undefined ? 2 : o.lw;
        ctx.beginPath(); f[0].forEach((k, i) => i ? ctx.lineTo(P[k].x, P[k].y) : ctx.moveTo(P[k].x, P[k].y)); ctx.closePath(); ctx.fill(); if (ctx.lineWidth > 0) ctx.stroke();
      }
      ctx.restore();
    });
  }
  function Cyl(x, y0, z, r, h, col, o) {
    o = o || {}; if (h <= 0.001 || (o.a !== undefined && o.a <= 0.02)) return;
    const N = o.seg || 14, y1 = y0 + h, top = [], bot = [];
    for (let k = 0; k < N; k++) { const a = k / N * TAU; top.push(toCam(x + Math.cos(a) * r, y1, z + Math.sin(a) * r)); bot.push(toCam(x + Math.cos(a) * r, y0, z + Math.sin(a) * r)); }
    if (top.some(c => c[2] < NEAR) || bot.some(c => c[2] < NEAR)) return;
    const T = top.map(scr), B = bot.map(scr), mid = toCam(x, y0 + h / 2, z);
    item(mid[2], () => {
      ctx.save(); ctx.globalAlpha = o.a === undefined ? 1 : o.a; ctx.lineJoin = 'round'; ctx.strokeStyle = o.line || '#0B161C'; ctx.lineWidth = o.lw === undefined ? 2 : o.lw;
      for (let k = 0; k < N; k++) {
        const a = (k + 0.5) / N * TAU, nx = Math.cos(a), nz = Math.sin(a);
        if (nx * (Cam3D.pos[0] - x) + nz * (Cam3D.pos[2] - z) <= 0) continue;
        const k2 = (k + 1) % N;
        ctx.fillStyle = shade(col, 0.6 + 0.5 * (0.5 + 0.5 * Math.cos(a - 0.9)), o.emis || 0);
        ctx.beginPath(); ctx.moveTo(T[k].x, T[k].y); ctx.lineTo(T[k2].x, T[k2].y); ctx.lineTo(B[k2].x, B[k2].y); ctx.lineTo(B[k].x, B[k].y); ctx.closePath(); ctx.fill(); if (ctx.lineWidth > 0) ctx.stroke();
      }
      if (Cam3D.pos[1] > y1) { ctx.fillStyle = shade(col, 1.2, o.emis || 0); ctx.beginPath(); T.forEach((p, i) => i ? ctx.lineTo(p.x, p.y) : ctx.moveTo(p.x, p.y)); ctx.closePath(); ctx.fill(); if (ctx.lineWidth > 0) ctx.stroke(); }
      ctx.restore();
    });
  }
  function fitText(text, w, size, weight) {
    ctx.font = (weight || 900) + ' ' + size + 'px system-ui, "Segoe UI", sans-serif';
    let s = size; while (ctx.measureText(text).width > w && s > 6) { s *= 0.92; ctx.font = (weight || 900) + ' ' + s + 'px system-ui, "Segoe UI", sans-serif'; }
    return s;
  }
  function Label(text, x, y, z, w, h, bg, fg, o) {
    o = o || {}; const sc = o.sc === undefined ? 1 : o.sc; if (sc <= 0.02 || (o.a !== undefined && o.a <= 0.02)) return;
    const c = toCam(x, y, z); if (c[2] < 0.6) return; const s = scr(c);
    item(c[2], () => {
      const pw = w * s.k * sc, ph = h * s.k * sc; ctx.save(); ctx.globalAlpha = o.a === undefined ? 1 : o.a; ctx.translate(s.x, s.y); if (o.rot) ctx.rotate(o.rot);
      if (bg) { ctx.fillStyle = bg; ctx.strokeStyle = o.line || '#0B161C'; ctx.lineWidth = Math.max(1.5, ph * 0.06); ctx.beginPath(); ctx.roundRect(-pw / 2, -ph / 2, pw, ph, ph * 0.18); ctx.fill(); ctx.stroke(); }
      ctx.fillStyle = fg; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; fitText(text, pw * 0.86, ph * 0.6); ctx.fillText(text, 0, ph * 0.04); ctx.restore();
    });
  }
  function Panel(x, y, z, w, h, paint, o) {
    o = o || {}; const sx = o.sx === undefined ? 1 : o.sx, sy = o.sy === undefined ? 1 : o.sy; if (sx <= 0.02 || sy <= 0.02) return;
    const c = toCam(x, y, z); if (c[2] < 0.6) return; const s = scr(c);
    item(c[2], () => {
      const pw = w * s.k * sx, ph = h * s.k * sy; ctx.save(); ctx.globalAlpha = o.a === undefined ? 1 : o.a; ctx.translate(s.x - pw / 2, s.y - ph / 2); if (o.rot) { ctx.translate(pw / 2, ph / 2); ctx.rotate(o.rot); ctx.translate(-pw / 2, -ph / 2); }
      paint(ctx, pw, ph); ctx.restore();
    });
  }
  function Char(role, x, z, hW, opts, t0, t1, t) {
    if (t < t0 || t >= t1) return; const c = toCam(x, 0, z); if (c[2] < 0.8) return; const s = scr(c);
    const pop = eBack(seg(t, t0, t0 + 0.4)) * (1 - seg(t, t1 - 0.3, t1)); const sc = hW * s.k / 258.4 * Math.max(0.01, pop);
    item(c[2], () => { const cc = { role: role, o: opts }; if (!(typeof drawSpriteChar === 'function' && drawSpriteChar(cc, { x: s.x, y: s.y }, sc, t))) drawCharacter(s.x, s.y, sc, Object.assign({ role: role, t: t }, opts)); });
  }
  function groundPoly(pts, y, fill, stroke, lw, a) {
    GROUND.push(() => {
      let C = pts.map(p => toCam(p[0], y, p[1])), out = [];
      for (let i = 0; i < C.length; i++) { const A = C[i], B = C[(i + 1) % C.length], ain = A[2] >= NEAR, bin = B[2] >= NEAR; if (ain) out.push(A); if (ain !== bin) { const u = (NEAR - A[2]) / (B[2] - A[2]); out.push([A[0] + (B[0] - A[0]) * u, A[1] + (B[1] - A[1]) * u, NEAR]); } }
      if (out.length < 3) return; const P = out.map(scr);
      ctx.save(); ctx.globalAlpha = a === undefined ? 1 : a; ctx.beginPath(); P.forEach((p, i) => i ? ctx.lineTo(p.x, p.y) : ctx.moveTo(p.x, p.y)); ctx.closePath();
      if (fill) { ctx.fillStyle = fill; ctx.fill(); } if (stroke) { ctx.strokeStyle = stroke; ctx.lineWidth = lw || 2; ctx.lineJoin = 'round'; ctx.stroke(); } ctx.restore();
    });
  }
  function groundPath(pts, y, stroke, lw, frac) {
    GROUND.push(() => {
      let total = 0; const L = []; for (let i = 0; i < pts.length - 1; i++) { const d = Math.hypot(pts[i + 1][0] - pts[i][0], pts[i + 1][1] - pts[i][1]); L.push(d); total += d; }
      let left = total * frac; ctx.save(); ctx.strokeStyle = stroke; ctx.lineWidth = lw; ctx.lineCap = 'round';
      for (let i = 0; i < pts.length - 1 && left > 0; i++) { const u = Math.min(1, left / L[i]); left -= L[i]; const A = toCam(pts[i][0], y, pts[i][1]), B = toCam(pts[i][0] + (pts[i + 1][0] - pts[i][0]) * u, y, pts[i][1] + (pts[i + 1][1] - pts[i][1]) * u); const cl = clipLine(A, B); if (!cl) continue; const a = scr(cl[0]), b = scr(cl[1]); ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke(); }
      ctx.restore();
    });
  }
  function drawBG(dark) {
    const F = 540 / Math.tan(Cam3D.fov * Math.PI / 360), pitch = Math.asin(clamp(Cam3D.fwd[1], -1, 1));
    const hY = 540 + Math.tan(pitch) * F * 1.0, hh = clamp(hY, 0, 1080);
    const sky = ctx.createLinearGradient(0, 0, 0, Math.max(1, hh)), d = 1 - 0.55 * dark;
    sky.addColorStop(0, shade('#0C1C26', d)); sky.addColorStop(1, shade('#2A5468', d));
    ctx.fillStyle = sky; ctx.fillRect(0, 0, 1920, hh + 1);
    const flr = ctx.createLinearGradient(0, hh, 0, 1080); flr.addColorStop(0, shade('#1C3C4A', d)); flr.addColorStop(1, shade('#0B1A22', d));
    ctx.fillStyle = flr; ctx.fillRect(0, hh, 1920, 1080 - hh);
    ctx.save(); ctx.strokeStyle = 'rgba(100,210,199,0.17)'; ctx.lineWidth = 1.3;
    const cx = Math.round(Cam3D.pos[0] / 4) * 4, cz = Math.round(Cam3D.pos[2] / 4) * 4;
    for (let gx = cx - 64; gx <= cx + 64; gx += 4) { const cl = clipLine(toCam(gx, 0, cz + 64), toCam(gx, 0, cz - 64)); if (!cl) continue; const a = scr(cl[0]), b = scr(cl[1]); ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke(); }
    for (let gz = cz - 64; gz <= cz + 64; gz += 4) { const cl = clipLine(toCam(cx - 64, 0, gz), toCam(cx + 64, 0, gz)); if (!cl) continue; const a = scr(cl[0]), b = scr(cl[1]); ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke(); }
    ctx.restore();
  }

  const HEADS = [
    [0.11, 2.85, 'BEST-CASE SCENARIO', 'A hypothetical morning for TerraFab', PAL.amberHi],
    [2.85, 10.31, 'JOINT PRESS RELEASE', 'SpaceX and Tesla name Jensen Huang CEO of TerraFab', PAL.coral],
    [10.31, 15.65, 'THE TEXAS TAX FILINGS', 'Grimes County, Texas', PAL.amberHi],
    [15.65, 31.41, 'NOT A SMALL RESEARCH LAB', '22,000+ acre reinvestment zone, unveiled early 2026', PAL.cyan],
    [31.41, 44.35, 'ONE ROOF', 'Logic chips, memory and advanced packaging', PAL.amberHi],
    [44.35, 55.25, 'THE PRICE TAG', 'Phase 1: $16.8B. Full build-out: $119B', PAL.amberHi],
    [55.25, 66.80, 'SEALED IN COURT', 'SpaceX tried to keep the records private', PAL.coral]
  ];
  const TEXAS = [[3, 0], [6, 0], [6, 2.2], [10, 2.2], [10, 5], [9, 7], [8, 9.5], [6.5, 11], [5.2, 9.6], [4.3, 8], [3, 6.6], [1.5, 6], [0, 6], [0, 4.6], [2, 4.5], [2.5, 3.8], [3, 2.2]];
  const PHASE = [{ h: 1.7, col: '#2B8A6E', n: 'PHASE 1 · $16.8B', x0: 44 }, { h: 3.4, col: '#389E94', n: 'PHASE 2', x0: 48 }, { h: 3.4, col: '#E2B857', n: 'PHASE 3', x0: 52 }, { h: 3.4, col: '#C8463C', n: 'PHASE 4', x0: 56 }];

  function renderShots(t) {
    const cv = evalCam(t);
    Cam3D.set([cv[0], cv[1], cv[2]], [cv[3], cv[4], cv[5]], cv[6], 0.012 * Math.sin(t * 0.6));
    GROUND = []; ITEMS = []; OVER = [];
    const dark = seg(t, 55.25, 56.2);
    const hit = (x, y, z, ht, col, r) => { const p = S(x, y, z); if (p) OVER.push(() => hitFx(p.x, p.y, t, ht, { color: col, r: r || 240, rays: 14 })); };

    // ---------------- STATION 1-3: desk, phone, press release (0 - 11.3) ----------------
    const dA = 1 - seg(t, 10.5, 11.3);
    if (dA > 0.02) {
      const hf = 1 - seg(t, 2.85, 3.4), lampOn = easeOut(seg(t, 0.15, 0.55)), openU = easeOut(seg(t, 1.35, 2.15)), holo = easeOut(seg(t, 1.45, 2.5));
      Box(0, -0.02, 0, 12, 0.02, 9, '#10222B', { a: dA, lw: 0 });
      Box(0, 0.85, 0, 5.2, 0.18, 2.6, '#6B5238', { a: dA });
      [[-2.3, -1.0], [2.3, -1.0], [-2.3, 1.0], [2.3, 1.0]].forEach(l => Box(l[0], 0, l[1], 0.26, 0.85, 0.26, '#4B3A28', { a: dA }));
      Box(-1.9, 1.03, 0.4, 0.5, 0.06, 0.5, '#C98E24', { a: dA }); Box(-1.9, 1.09, 0.4, 0.12, 1.1, 0.12, '#C98E24', { a: dA });
      Box(-1.9, 2.1, 0.4, 0.9, 0.4, 0.9, lampOn > 0.2 ? '#2B8A6E' : '#133A2E', { a: dA, emis: lampOn * 0.35 });
      GROUND.push(() => { const p = S(-1.9, 2.0, 0.4); if (!p || lampOn < 0.02) return; const g = ctx.createRadialGradient(p.x, p.y, 10, p.x, p.y + 140 * p.k / 100, 520 * Math.min(1.4, p.k / 100)); g.addColorStop(0, 'rgba(242,196,108,' + 0.4 * lampOn * dA + ')'); g.addColorStop(1, 'rgba(5,8,11,0)'); ctx.fillStyle = g; ctx.fillRect(0, 0, 1920, 1080); });
      Box(0.5, 1.03, 0.4, 1.9, 0.08, 1.3, '#C6A372', { a: dA });
      Box(0.5, 1.11 + openU * 0.02, 0.4 - openU * 0.55, 1.9, 0.04, 1.3 * (1 - openU * 0.5), '#DFC092', { a: dA });
      if (t > 0.5) Label('TERRAFAB — CONFIDENTIAL', 0.5, 1.25, 1.2, 1.7, 0.28, null, '#D8483A', { a: dA * (1 - openU), rot: -0.06 });
      if (hf > 0.03) for (let i = 0; i < 4; i++) { const ww = [1.2, 0.9, 0.65, 0.4][i]; Box(0.5, 1.18 + i * 0.5 * holo, 0.4, ww, 0.42 * holo, ww, '#45B8AC', { a: 0.6 * dA * hf, emis: 0.4 }); }
      if (holo > 0.3 && hf > 0.03) Label('TERRAFAB', 0.5, 1.18 + 4 * 0.5 * holo + 0.35, 0.4, 2.0, 0.4, '#0B1A22', '#E2B857', { a: dA * hf, sc: holo });
      Char('host', -3.2, 0.6, 2.3, { facing: 1, phase: 1, armAngleR: lerp(-0.5, -1.65, openU), armAngleL: 0.25, talk: 0.7, browTension: -0.2 }, 0.11, 11.0, t);
      // phone with the clock flip and the alert
      if (t >= 2.85 && t < 7.2) {
        const u = eBack(seg(t, 2.85, 3.5)), d = seg(t, 6.47, 7.0), py = lerp(0.9, 2.7, u) - d * 2.0, fl = seg(t, 3.5, 3.75), al = easeOut(seg(t, 4.2, 4.6));
        Panel(0, py, -0.6, 1.9, 3.3, (g, pw, ph) => {
          g.fillStyle = '#10151B'; g.strokeStyle = '#0B161C'; g.lineWidth = pw * 0.03; g.beginPath(); g.roundRect(0, 0, pw, ph, pw * 0.12); g.fill(); g.stroke();
          g.fillStyle = '#1F3A4A'; g.beginPath(); g.roundRect(pw * 0.06, ph * 0.04, pw * 0.88, ph * 0.92, pw * 0.08); g.fill();
          g.fillStyle = '#F4F1EA'; g.textAlign = 'center'; g.textBaseline = 'middle'; g.save(); g.translate(pw / 2, ph * 0.22); g.scale(1, Math.max(0.05, Math.abs(Math.cos(fl * Math.PI)))); g.font = '900 ' + pw * 0.3 + 'px system-ui'; g.fillText(fl < 0.5 ? '5:59' : '6:00', 0, 0); g.restore();
          g.font = '800 ' + pw * 0.09 + 'px system-ui'; g.fillStyle = '#9FB3BD'; g.fillText('TOMORROW MORNING', pw / 2, ph * 0.36);
          g.save(); g.globalAlpha = al; g.translate(0, (1 - al) * ph * 0.15); g.fillStyle = '#F4F1EA'; g.beginPath(); g.roundRect(pw * 0.1, ph * 0.46, pw * 0.8, ph * 0.3, pw * 0.05); g.fill();
          g.fillStyle = '#0B161C'; g.font = '900 ' + pw * 0.095 + 'px system-ui'; g.fillText('SPACEX × TESLA', pw / 2, ph * 0.56); g.fillStyle = '#C8463C'; g.fillText('JOINT PRESS RELEASE', pw / 2, ph * 0.66); g.restore();
        }, { a: dA, rot: Math.sin(t * 1.6) * 0.012 });
        if (t > 4.4) { const s1 = eBack(seg(t, 4.4, 4.9)), s2 = eBack(seg(t, 4.9, 5.4)); Label('SPACEX', -2.0, 2.9 - d * 2, -0.6, 1.5, 0.42, '#E2B857', '#0B161C', { sc: s1 }); Label('TESLA', 2.0, 2.9 - d * 2, -0.6, 1.5, 0.42, '#C8463C', '#F4F1EA', { sc: s2 }); }
      }
      // press release + Jensen
      if (t >= 6.47) {
        const u = eBack(seg(t, 6.8, 7.5)), fold = 1 - seg(t, 10.35, 11.1), hl = easeOut(seg(t, 8.0, 9.0));
        Panel(0, 2.5, -0.9, 4.4, 2.8, (g, pw, ph) => {
          g.fillStyle = '#F2EEE2'; g.strokeStyle = '#0B161C'; g.lineWidth = pw * 0.012; g.beginPath(); g.roundRect(0, 0, pw, ph, pw * 0.02); g.fill(); g.stroke();
          g.fillStyle = '#0B161C'; g.textAlign = 'left'; g.textBaseline = 'middle'; g.font = '900 ' + pw * 0.07 + 'px system-ui'; g.fillText('JOINT PRESS RELEASE', pw * 0.06, ph * 0.12);
          g.fillStyle = '#C8463C'; g.fillRect(pw * 0.06, ph * 0.2, pw * 0.2, ph * 0.025);
          g.fillStyle = '#B9B2A2'; for (let i = 0; i < 4; i++) g.fillRect(pw * 0.06, ph * (0.3 + i * 0.07), pw * (0.88 - (i % 2) * 0.2), ph * 0.03);
          g.fillStyle = 'rgba(226,184,87,' + 0.9 * hl + ')'; g.fillRect(pw * 0.04, ph * 0.62, pw * 0.92 * hl, ph * 0.18);
          g.fillStyle = '#0B161C'; { let sz = pw * 0.05; const tx = 'JENSEN HUANG NAMED CEO OF TERRAFAB'; g.font = '900 ' + sz + 'px system-ui'; while (g.measureText(tx).width > pw * 0.86 && sz > 6) { sz *= 0.93; g.font = '900 ' + sz + 'px system-ui'; } g.fillText(tx, pw * 0.06, ph * 0.71); }
        }, { sx: u * Math.max(0.01, fold), sy: u * Math.max(0.01, fold) });
        Label('TERRAFAB', -4.4, 4.6, -1.6, 3.0, 0.8, '#2B8A6E', '#F4F1EA', { sc: eBack(seg(t, 9.2, 9.7)) * fold });
        const jx = lerp(6.5, 2.9, easeInOut(seg(t, 6.47, 7.9))), walk = t < 7.9;
        Char('jensen', jx, 0.4, 2.35, { facing: -1, phase: 3, walkAmt: walk ? 1 : 0, armAngleR: walk ? -0.4 : -1.65, armAngleL: 0.3, talk: 0.3, browTension: -0.2 }, 6.47, 11.0, t);
        Label('JENSEN HUANG — CEO', 2.9, 3.1, 0.4, 3.2, 0.5, '#0B1A22', '#E2B857', { sc: eBack(seg(t, 8.3, 8.8)) * fold });
        if (t >= 6.47) hit(0, 2.5, -0.9, 6.47, PAL.amberHi, 260);
      }
    }
    if (t >= 1.45 && t < 2.5) hit(0.5, 2.0, 0.4, 1.45, PAL.cyan, 200);

    // ---------------- STATION 4: Texas map (10.3 - 15.7) ----------------
    if (t >= 10.3 && t < 15.75) {
      const s = easeOut(seg(t, 10.5, 11.6)), cx = 5, cy = 5.5, wx = u => -8 + u * 1.6, wz = v => -23 + (v - 5.5) * 1.6;
      groundPoly(TEXAS.map(p => [lerp(wx(cx), wx(p[0]), s), lerp(wz(cy), wz(p[1]), s)]), 0.03, '#1B4A5E', '#64D2C7', 3, 0.95);
      if (s > 0.6) { Label('TEXAS', wx(4.5), 0.3, wz(4.2), 3.4, 0.9, null, '#9FB3BD', { a: seg(t, 11.0, 11.8) }); }
      const py = lerp(6, 0, eIn(seg(t, 12.2, 12.6)));
      if (t >= 12.2) {
        Box(2.2, py, -21.6, 0.16, 1.0, 0.16, '#D8483A'); Box(2.2, py + 1.0, -21.6, 0.5, 0.5, 0.5, '#D8483A', { emis: 0.35 });
        const pr = ((t - 12.6) * 0.9) % 1; if (t > 12.6) groundPoly(Array.from({ length: 20 }, (_, k) => [2.2 + Math.cos(k / 20 * TAU) * (0.4 + pr * 1.8), -21.6 + Math.sin(k / 20 * TAU) * (0.4 + pr * 1.8)]), 0.05, null, 'rgba(216,72,58,' + (1 - pr) + ')', 3);
        hit(2.2, 0.5, -21.6, 12.6, PAL.coral, 220);
      }
      if (t >= 13.8) {
        groundPoly(Array.from({ length: 24 }, (_, k) => [2.2 + Math.cos(k / 24 * TAU) * 1.4, -21.6 + Math.sin(k / 24 * TAU) * 1.4]), 0.07, 'rgba(255,255,255,0.12)', '#E2B857', 3.5);
        Label('GRIMES COUNTY', 2.2, 3.6, -21.6, 4.2, 0.75, '#0B1A22', '#E2B857', { sc: eBack(seg(t, 14.0, 14.5)) });
        for (let i = 0; i < 5; i++) { const t0 = 13.9 + i * 0.12, u = eBack(seg(t, t0, t0 + 0.4)); Panel(2.2 + (i - 2) * 1.25, 1.2 + u * 0.8 + Math.sin(t * 2 + i) * 0.05, -21.6 - 1.4 + Math.abs(i - 2) * 0.2, 1.0, 1.35, (g, pw, ph) => { g.fillStyle = '#F2EEE2'; g.strokeStyle = '#0B161C'; g.lineWidth = pw * 0.04; g.beginPath(); g.roundRect(0, 0, pw, ph, pw * 0.05); g.fill(); g.stroke(); g.fillStyle = '#B9B2A2'; for (let k = 0; k < 5; k++) g.fillRect(pw * 0.12, ph * (0.14 + k * 0.15), pw * (0.76 - (k % 2) * 0.2), ph * 0.06); g.fillStyle = '#C8463C'; g.fillRect(pw * 0.12, ph * 0.82, pw * 0.3, ph * 0.08); }, { sx: u, sy: u, rot: (i - 2) * 0.12 }); }
      }
    }

    // ---------------- STATION 5-8: the campus (15.6 - 44.4) ----------------
    if (t >= 15.6 && t < 44.4) {
      groundPoly([[-40, -42], [40, -42], [40, -100], [-40, -100]], 0.01, '#0E2430', null, 0);
      groundPoly([[-40, -43], [40, -43], [40, -45.2], [-40, -45.2]], 0.02, '#2A4452', null, 0);
      Box(-3, 0, -50, 1.4, 1.1, 1.2, '#9FB3BD'); Box(-3, 1.1, -50, 1.6, 0.2, 1.4, '#6B7C86');
      const lab = 1 - seg(t, 17.3, 17.9);
      if (lab > 0.02) Label('SMALL RESEARCH LAB?', -3, 2.3, -50, 3.2, 0.55, '#C8463C', '#F4F1EA', { sc: eBack(seg(t, 15.8, 16.2)) * lab });
      Char('host', -5.2, -49.6, 2.2, { facing: 1, phase: 5, armAngleR: -1.65, armAngleL: 0.3, talk: 0.7, browTension: 0.1 }, 15.65, 22.0, t);
      // first wave: front-row halls rise as the camera pulls back
      [-24, -12, 0, 12, 24].forEach((hx, i) => { const u = easeOut(seg(t, 16.5 + i * 0.28, 17.6 + i * 0.28)); Box(hx, 0, -56, 9, 4.2 * u, 6, i % 2 ? '#3D6F86' : '#4C8196'); });
      // perimeter trace, badges, early 2026
      const per = [[-30, -48], [30, -48], [30, -92], [-30, -92], [-30, -48]];
      groundPath(per, 0.05, '#64D2C7', 5, seg(t, 18.23, 21.2));
      const b1 = eIn(seg(t, 18.23, 18.7)), b2 = eIn(seg(t, 18.7, 19.2));
      [[-16, 'TESLA', '#C8463C', '#F4F1EA', b1], [16, 'SPACEX', '#E2B857', '#0B161C', b2]].forEach(b => { Box(b[0], 0, -48, 0.3, 5 * Math.max(0.01, b[4]), 0.3, '#9FB3BD'); if (b[4] > 0.9) Label(b[1], b[0], 6.0, -48, 5.0, 1.3, b[2], b[3], { sc: eBack(seg(t, 19.0 - (b[0] < 0 ? 0.5 : 0), 19.5 - (b[0] < 0 ? 0.5 : 0))) }); });
      if (t >= 19.6 && t < 22.4) Label('UNVEILED EARLY 2026', 0, 10, -70, 11.0, 1.8, '#0B1A22', '#E2B857', { sc: eBack(seg(t, 19.6, 20.1)) * (1 - seg(t, 21.9, 22.4)) });
      hit(-16, 6, -48, 18.7, PAL.coral, 240);
      // parcel grid lights up on "22,000 acres"
      for (let gi = 0; gi < 60; gi++) { const gx = -27 + (gi % 10) * 6, gz = -50 - Math.floor(gi / 10) * 7; const tt = 21.63 + gi * 0.065; if (t >= tt) groundPoly([[gx - 2.7, gz - 3.1], [gx + 2.7, gz - 3.1], [gx + 2.7, gz + 3.1], [gx - 2.7, gz + 3.1]], 0.04, '#2B8A6E', '#64D2C7', 1.5, 0.28 + 0.2 * Math.sin(t * 3 + gi)); }
      if (t >= 22.3 && t < 28.6) { const n = Math.round(22000 * easeOut(seg(t, 22.3, 24.6))); Label(n.toLocaleString('en-US') + '+ ACRES', 0, 13, -70, 14.0, 2.4, '#0B1A22', '#E2B857', { sc: eBack(seg(t, 22.3, 22.9)) * (1 - seg(t, 28.0, 28.6)) }); }
      // second wave: side halls, cooling towers, highway time-lapse for "largest complexes on earth"
      [[-27, -66], [-27, -80], [27, -66], [27, -80]].forEach((p, i) => { const u = easeOut(seg(t, 26.0 + i * 0.35, 27.2 + i * 0.35)); Box(p[0], 0, p[1], 6, 4.6 * u, 10, '#4C8196'); });
      [-21, -7, 7, 21].forEach((x, i) => { const u = easeOut(seg(t, 26.6 + i * 0.3, 27.8 + i * 0.3)); Cyl(x, 0, -95, 2.2, 8 * u, '#C9D3D9'); if (u > 0.9) Cyl(x, 8, -95, 1.7, 0.4, '#9FB3BD'); });
      groundPoly([[-36, -72], [36, -72], [36, -74.6], [-36, -74.6]], 0.03, '#2A4452', null, 0, easeOut(seg(t, 25.9, 27.0)));
      if (t >= 29.3 && t < 31.4) Label('ONE OF THE LARGEST ON EARTH', 0, 11, -72, 13.0, 1.6, '#0B1A22', '#E2B857', { sc: eBack(seg(t, 29.3, 29.8)) });
      // zones under one roof
      if (t >= 30.6) {
        const rf = easeOut(seg(t, 31.0, 32.0));
        [-19, 19].forEach(px => [-86, -74].forEach(pz => Box(px, 0, pz, 0.7, 8 * rf, 0.7, '#9FB3BD')));
        Box(0, 8, -80, 40, 0.4 * rf, 14, '#2E5261', { a: 0.3 });
        if (t < 36.2) Label('UNDER ONE ROOF', 0, 10.5, -80, 12, 1.6, '#0B1A22', '#E2B857', { sc: eBack(seg(t, 31.6, 32.1)) * (1 - seg(t, 35.6, 36.2)) });
        [-14, 0, 14].forEach(zx => Box(zx, 0, -80, 9, 0.14, 8, '#1A3340'));
        // zone 1: logic wafer
        Cyl(-14, 0.14, -80, 0.9, 0.9, '#6B7C86'); Cyl(-14, 1.04, -80, 3, 0.14, '#9FB3BD');
        for (let i = 0; i < 25; i++) { const dx = -14 - 2 + (i % 5), dz = -80 - 2 + Math.floor(i / 5), lit = t >= 35.21 + i * 0.07; Box(dx, 1.18, dz, 0.7, 0.1, 0.7, lit ? '#45B8AC' : '#3A4C57', { emis: lit ? 0.5 : 0, lw: 1 }); }
        Label('LOGIC CHIPS', -14, 5, -80, 5.0, 1.0, '#0B1A22', '#64D2C7', { sc: eBack(seg(t, 33.8, 34.3)) });
        // zone 2: memory tower
        for (let i = 0; i < 8; i++) { const u = easeOut(seg(t, 38.65 + i * 0.25, 39.2 + i * 0.25)); Box(0, 0.14 + i * 0.62, -80, 3, 0.5 * u, 3, i % 2 ? '#45B8AC' : '#2B8A6E', { emis: 0.2 }); }
        Label('MEMORY', 0, 7, -80, 4.0, 1.0, '#0B1A22', '#64D2C7', { sc: eBack(seg(t, 38.2, 38.7)) });
        // zone 3: packaging robot
        Cyl(14, 0.14, -80, 1.2, 0.6, '#6B7C86'); Box(14, 0.74, -80, 1.3, 0.18, 1.3, '#45B8AC', { emis: 0.3 }); Box(14, 0.14, -82, 0.5, 3.6, 0.5, '#E2B857');
        if (t >= 40.0) { const ax = 14 + 2.4 * Math.sin((t - 40) * 2.2); Box(ax, 3.4, -80, 0.4, 0.4, 3.6, '#E2B857'); Box(ax, 1.9, -80, 0.22, 1.5, 0.22, '#9FB3BD'); }
        Label('ADVANCED PACKAGING', 14, 6, -80, 6.2, 1.0, '#0B1A22', '#E2B857', { sc: eBack(seg(t, 39.9, 40.4)) });
        Char('elon', lerp(-12, -7, easeInOut(seg(t, 31.5, 33))), -73, 2.4, { facing: 1, phase: 6, walkAmt: t < 33 ? 1 : 0, armAngleR: -1.65, armAngleL: 0.3, talk: 0.7 }, 31.5, 44.3, t);
        // terawatt: chip rockets to the server grid, racks light up, big slam label
        for (let r = 0; r < 14; r++) { const rx = -21 + (r % 7) * 7, rz = r < 7 ? -93 : -98, lit = t >= 42.5 + r * 0.06; Box(rx, 0, rz, 2.2, 4.2, 1.6, '#16303A', { emis: lit ? 0.2 : 0 }); if (lit) Box(rx, 3.2, rz + 0.85, 1.6, 0.2, 0.05, '#64D2C7', { emis: 0.8, lw: 0 }); }
        if (t >= 42.41 && t < 43.1) { const u = seg(t, 42.41, 43.1); Box(lerp(14, 0, u), 1.2 + Math.sin(u * Math.PI) * 6, lerp(-80, -92, u), 0.9, 0.3, 0.9, '#45B8AC', { emis: 0.6 }); }
        if (t >= 42.7) { const sl = seg(t, 42.7, 43.1); Label('1 TERAWATT', 0, 10, -92, 12, 2.4, '#0B1A22', '#E2B857', { sc: lerp(2.2, 1, easeOut(sl)) }); if (t >= 43.4) Label('OF COMPUTE HARDWARE, EVERY YEAR', 0, 7.7, -92, 12, 0.95, '#E2B857', '#0B161C', { sc: eBack(seg(t, 43.4, 43.9)) }); hit(0, 10, -92, 42.8, PAL.amberHi, 380); }
      }
      hit(0, 10, -92, 42.8, PAL.amberHi, 380);
    }

    // ---------------- STATION 9: the ledger (44.3 - 56.5) ----------------
    if (t >= 44.3 && t < 56.8) {
      Box(50, 0, -80, 16, 0.08, 10, '#E8E2D0', { lw: 1.5 });
      for (let i = 0; i < 6; i++) Box(50, 0.08, -83.6 + i * 1.3, 14, 0.02, 0.1, '#B9B2A2', { lw: 0 });
      Label('GRIMES COUNTY TAX ABATEMENT SCHEDULE', 50, 7.6, -84, 13.0, 1.1, '#0B1A22', '#E2B857', { sc: eBack(seg(t, 44.5, 45.1)) * (1 - seg(t, 52.8, 53.4)) });
      const fuse = easeInOut(seg(t, 54.0, 55.0)); let acc = 0;
      PHASE.forEach((p, i) => {
        let u, y0, px = p.x0, dep;
        if (i === 0) { u = easeOut(seg(t, 46.0, 47.2)); }
        else { const ts = [0, 51.5, 52.1, 52.7][i]; dep = seg(t, ts, ts + 0.35); u = 1; y0 = lerp(14, 0.08, eIn(dep)); if (t < ts) { if (t >= 48.0 + (i - 1) * 0.8) Box(p.x0, 0.08, -80, 3, p.h, 3, p.col, { a: 0.22, lw: 1 }); acc += p.h; return; } if (dep >= 1) hit(p.x0, 1.5, -80, ts + 0.35, PAL.amberHi, 200); }
        const target = 0.08 + acc; const yy = i === 0 ? 0.08 : y0; const fx = lerp(px, 50, fuse), fy = lerp(yy, target, fuse);
        Box(fx, fy, -80, 3, p.h * (i === 0 ? u : 1), 3, p.col, { emis: 0.12 + 0.4 * fuse });
        if (fuse < 0.1 && (i === 0 ? u > 0.8 : dep >= 1)) Label(p.n, p.x0, p.h + 1.6, -80, 3.6, 0.6, '#0B1A22', '#F4F1EA', { sc: 1 });
        acc += p.h;
      });
      if (t >= 54.2) { Label('$119 BILLION', 50, 13.6, -80, 11, 2.2, '#0B1A22', '#E2B857', { sc: eBack(seg(t, 54.2, 54.8)) }); hit(50, 15, -80, 54.2, PAL.amberHi, 380); }
    }

    // ---------------- STATION 10: the courthouse and the sealed records (55.3 - 66.8) ----------------
    if (t >= 55.3) {
      const rise = easeOut(seg(t, 55.8, 57.0));
      groundPoly([[60, -62], [120, -62], [120, -100], [60, -100]], 0.01, '#0B1A22', null, 0);
      Box(90, 0, -90, 20, 5 * rise, 6, '#8C98A0'); Box(90, 5 * rise, -90, 22, 1.2 * rise, 6.5, '#A5B1B8'); Box(90, 6.2 * rise, -90, 16, 1.0 * rise, 5, '#A5B1B8'); Box(90, 7.2 * rise, -90, 10, 0.8 * rise, 4, '#B7C2C8');
      Box(90, 0, -85.5, 16, 0.6, 3, '#6B7C86'); Box(90, 0, -86.9, 2.4, 3.6 * rise, 0.2, '#3B2A1E');
      for (let k = 0; k < 6; k++) Cyl(82 + k * 3.2, 0.6, -86.5, 0.55, 4.4 * rise, '#C9D3D9');
      Label('TEXAS DISTRICT COURT', 90, 9.4, -84, 11.0, 1.3, '#0B1A22', '#E2B857', { sc: eBack(seg(t, 56.5, 57.1)) * (1 - seg(t, 60.0, 60.6)) });
      Box(90, 0, -77, 16, 0.9, 3.0, '#2E4552', { a: 0.95 });
      Char('lawyer', lerp(78, 85, easeInOut(seg(t, 58.0, 59.2))), -73.5, 2.3, { facing: 1, phase: 7, walkAmt: t < 59.2 ? 1 : 0, armAngleR: t >= 59.2 ? -1.65 : -0.4, armAngleL: 0.3, talk: 0.6 }, 58.0, 70, t);
      Char('host', 95, -73.5, 2.2, { facing: -1, phase: 8, armAngleR: -0.4, armAngleL: 0.3, browTension: 0.4 }, 58.6, 70, t);
      if (t >= 59.0 && t < 62.4) Label('SPACEX WENT TO COURT', 90, 8.4, -84, 8.0, 1.0, '#E2B857', '#0B161C', { sc: eBack(seg(t, 59.0, 59.5)) * (1 - seg(t, 61.9, 62.4)) });
      if (t >= 59.4) { const u = eBack(seg(t, 59.4, 60.2)); Panel(90, 5.2, -79, 2.2, 2.7, (g, pw, ph) => { g.fillStyle = '#F2EEE2'; g.strokeStyle = '#0B161C'; g.lineWidth = pw * 0.025; g.beginPath(); g.roundRect(0, 0, pw, ph, pw * 0.03); g.fill(); g.stroke(); g.fillStyle = '#0B161C'; g.textAlign = 'center'; g.textBaseline = 'middle'; g.font = '900 ' + pw * 0.12 + 'px system-ui'; g.fillText('MOTION', pw / 2, ph * 0.12); g.fillText('TO SEAL', pw / 2, ph * 0.24); g.fillStyle = '#B9B2A2'; for (let i = 0; i < 6; i++) g.fillRect(pw * 0.12, ph * (0.4 + i * 0.09), pw * (0.76 - (i % 2) * 0.2), ph * 0.04); }, { sx: u, sy: u }); }
      [['COST', 84, 62.0], ['DESIGN', 87.7, 63.5], ['WATER', 91.4, 64.4], ['POWER', 95.1, 65.1]].forEach(f => {
        const u = eIn(seg(t, f[2], f[2] + 0.4)); if (t < f[2]) return;
        Box(f[1], lerp(6, 0.9, u), -77, 2.2, 0.16, 2.4, '#C6A372');
        Label(f[0], f[1], 2.0, -77, 2.2, 0.6, '#0B1A22', '#F4F1EA', { sc: eBack(seg(t, f[2] + 0.3, f[2] + 0.8)) });
        const st = seg(t, 65.9, 66.15); if (st > 0) Label('SEALED', f[1], 1.5, -76.2, 2.0, 0.5, '#C8463C', '#F4F1EA', { sc: eBack(st), rot: -0.12 });
      });
      if (t >= 65.9) { Label('SEALED FROM THE PUBLIC', 90, 6.6, -77, 11, 1.2, '#C8463C', '#F4F1EA', { sc: eBack(seg(t, 65.9, 66.4)) }); hit(90, 2, -77, 65.9, PAL.coral, 380); }
    }

    // ---------------- draw: background, ground layer, depth-sorted world, overlays, headline ----------------
    drawBG(dark);
    GROUND.forEach(fn => fn());
    ITEMS.sort((a, b) => b.z - a.z).forEach(it => it.fn());
    OVER.forEach(fn => fn());
    HEADS.forEach(h => { const a = env(t, h[0], h[1], 0.3, 0.3); if (a > 0.01) drawShotBanner(h[2], h[3], a, h[4], t, h[0]); });
  }

