  // =========================================================================
  // RECIPES (jb2): reusable acting presets and setups. Spliced after assets_jb.js. Phrase -> recipe map: docs/SCENE_MAP.md.
  // Every helper is a pure function of t (no state), takes world x/z and the time it starts, and draws only while it is active.
  // =========================================================================
  // ---- acting presets: poses / expressions / impact times, all RELATIVE to the preset's start time t0 (see stickman.js for the names)
  const ACTING = {
    greedy: { pose: 'rub', ex: [[0, 'greedy']] },                                         // rubs hands, dollar-sign eyes: "loves money", "bank lends"
    smug: { pose: 'present', ex: [[0, 'smirk'], [1.5, 'proud']] },                        // pleased with himself
    love: { pose: 'hold', ex: [[0, 'happy']] },
    panic: { poses: [[0, 'cross'], [0.5, 'shrug']], ex: [[0, 'concerned'], [0.25, 'panic']], hit: [0.25] },   // sweat, recoil: "panicking"
    alarm: { poses: [[0, 'idle'], [0.15, 'shrug']], ex: [[0, 'alarm']], hit: [0.1] },     // "!" over the head: "realized a terrifying ..."
    think: { pose: 'think', ex: [[0, 'think']] },                                         // "?" over the head: "how did they stop him?"
    point: { pose: 'point', ex: [[0, 'determined']] },
    explain: { pose: 'talk', ex: [[0, 'talk']] },
    celebrate: { pose: 'cheer', ex: [[0, 'laughing']] },
    cart: { pose: 'carry', ex: [[0, 'smirk']] },                                          // pushes a trolley
    worried: { pose: 'cross', ex: [[0, 'concerned'], [1.2, 'scared']] },
    annoyed: { pose: 'shrug', ex: [[0, 'annoyed']] }
  };
  // Act(role, x, z, hW, preset, t0, t1, t, extra): a character acting a preset between t0 and t1. `extra` overrides any option (facing, phase, prop, ex ...).
  function Act(role, x, z, hW, preset, t0, t1, t, extra) {
    const P = typeof preset === 'string' ? ACTING[preset] : preset, o = Object.assign({ facing: 1, phase: (x * 0.37 + z) % 6.28 }, extra || {});
    o.ex = o.ex || (P.ex || []).map(e => [t0 + e[0], e[1]]); if (P.hit && !o.hit) o.hit = P.hit.map(h => t0 + h);
    if (P.poses) Object.assign(o, RigKit.track(t, P.poses.map(p => [t0 + p[0], p[1]]), 0.35)); else if (!o.pose) o.pose = P.pose;
    if (P.prop && !o.prop) o.prop = P.prop; Char(role, x, z, hW, o, t0, t1, t);
  }
  // ---- small shapes
  const gpuStack = (x, z, n, u, a, y0) => { for (let i = 0; i < n; i++) Box(x - 1.0, (y0 || 0) + i * 0.62, z, 2.0, 0.55 * easeOut(seg(u, i * 0.1, 0.4 + i * 0.1)), 1.6, i % 2 ? '#1B2A31' : '#76B900', { a }); };
  const dashed = (a, b, n, col, lw) => { for (let i = 0; i < n; i++) { const u0 = i / n, u1 = (i + 0.6) / n; Line3([lerp(a[0], b[0], u0), lerp(a[1], b[1], u0), lerp(a[2], b[2], u0)], [lerp(a[0], b[0], u1), lerp(a[1], b[1], u1), lerp(a[2], b[2], u1)], col, lw, 1); } };
  const redX = (x, y, z, s, t, t0) => { const u = easeOut(seg(t, t0, t0 + 0.25)); if (u < 0.02) return; Line3([x - s * u, y + s * u, z], [x + s * u, y - s * u, z], '#D94E43', 26, 1); Line3([x - s * u, y - s * u, z], [x + s * u, y + s * u, z], '#D94E43', 26, 1); };   // a "no" mark, no text
  const SpaceMode = on => { X.sets.forEach(g => { g.visible = g.visible && !on; }); X.ground.visible = !on; X.env.visible = !on; X.stars.visible = on; };   // call every frame: space beat = no ground, no skyline, stars
  // ---- setups (all take the time they start, t0; they draw nothing before it)
  function SetBank(x, z, t, t0, s) { if (t < t0) return; pad(x - 6.8, z - 2.6, x + 6.8, z + 6.6, '#7C8D98'); Model('bank', x, 0, z, 9 * (s || 1)); [[-4.9, 1.2, 1.5], [5.0, 1.0, 1.6], [-5.8, 2.6, 1.2], [5.9, 2.5, 1.3]].forEach((m, i) => Model('moneybag', x + m[0], 0, z + m[1] + 1.2, m[2], { ry: i })); }   // exterior: building + money bags at the door
  function SetVault(x, z, t, t0) { if (t < t0) return; Box(x - 6.5, 0, z - 3.4, 13, 8.5, 0.4, '#E3DCCB'); Box(x - 6.5, 0, z - 3.1, 13, 0.55, 0.3, '#9AA6AE'); Model('vault', x - 2.6, 0, z - 2.7, 5.6);
    Model('goldbars', x + 3.2, 0, z - 1.4, 2.8); Model('goldbars', x + 5.2, 0, z - 0.8, 2.3); Model('moneybag', x + 1.8, 0, z - 0.6, 1.7); Model('moneybag', x + 6.0, 0, z - 2.2, 1.9); }   // interior: wall, vault door, gold, bags
  function SetCart(x, z, t, t0, n) { if (t < t0) return; Model('trolley', x, 0, z, 2.8); gpuStack(x, z, n || 4, seg(t, t0, t0 + 1.0), 1, 0.55); }                                                  // trolley loaded with GPUs
  function SetLock(x, z, t, t0) { const u = easeOut(seg(t, t0 - 0.35, t0)); if (t < t0 - 0.35) return; Model('padlock', x, lerp(4.2, 1.7, u), z + 1.2, 1.9);
    if (t >= t0) { Line3([x - 1.0, 1.8, z + 1.3], [x + 1.0, 0.5, z + 1.3], '#CFD6DA', 12, 1); Line3([x + 1.0, 1.8, z + 1.3], [x - 1.0, 0.5, z + 1.3], '#CFD6DA', 12, 1); } }                    // collateral: a padlock snaps onto a stack
  function SetLaunch(cx, z, t, t0, t1, stackX) { const up = easeIn(seg(t, t0, t1)), ry = up * 13.5; if (t >= t1 + 0.1) return 0; Model('rocket', cx - 1.4, ry, z, 6, { flame: t >= t0 - 0.2 ? 0.5 + 0.5 * up : 0 });
    if (up > 0.02) dashed([cx - 1.4, 0.2, z], [cx - 1.4, Math.max(0.3, ry - 1.9), z], 8, '#F2A93B', 8); if (stackX !== undefined) gpuStack(stackX + 1.2, z, 6, 1, 1, ry); return ry; }   // rocket + flame + trail (+ the stack riding it)
  function Station(x, y, z, spin) { Model('connector', x, y - 0.8, z, 3.2, { tint: '#B8C6D0' });
    for (let sd = -1; sd <= 1; sd += 2) for (let k = 0; k < 2; k++) { const px = x + sd * (2.1 + k * 1.25); Box(px - 0.55, y - 1.25, z - 0.05, 1.1, 1.7, 0.08, '#2C5BA8', { emis: 0.55 }); Box(px - 0.02, y - 1.25, z - 0.06, 0.04, 1.7, 0.1, '#0B191E', { lw: 0 }); }
    Box(x - 4.2, y - 0.45, z - 0.03, 8.4, 0.07, 0.07, '#CFD6DA', { lw: 0 }); Model('dish', x, y + 0.05, z, 1.7, { ry: (spin || 0) * 2 }); gpuStack(x, z + 0.2, 3, 1, 1, y - 2.5); }          // orbital data center
  function SetOrbit(cx, z, t, spin) { Model('earth', cx + 1.2, 15.6 - 18.0 - 13.0, z - 6.0, 26.0, { ry: t * 0.06, rx: 0.3 }); Station(cx + 1.2, 15.6, z, spin); groundPoly(ringPts(cx + 1.2, z, 4.6), 14.0, null, '#E2B857', 3, 0.9); }
  function SetRepo(x, z, t, t0) { if (t < t0) return; const tx = lerp(x + 11, x + 3.2, easeOut(seg(t, t0, t0 + 1.1))); Model('rover', tx, Math.sin(t * 16) * 0.05 * (t < t0 + 1.1 ? 1 : 0), z, 4.6, { ry: -0.5, tint: '#F2EDE0' }); return tx; }   // the repo truck drives in from the right
  // =========================================================================
  // ROOM KITS (jb2, adopted from the Stick3D pack's idea of "15-20 props, textured floor, door walls, depth layers", rebuilt on our outlined primitives).
  // SetRoom(kind, x, z, t, t0): floor + wall (with a REAL doorway) + side walls + props. Add a room = add a row to ROOMS (data). Story: ["Room", "office", x].
  //   floor [pattern 'tile'|'plank'|'asphalt', colour, line colour] - wall [pattern 'panel'|'plain', colour, line colour] - trim - door [dx, leaf colour] | null - rug - glow (light behind the door) - led (trading wall) - curtain (stage) - buildings (street)
  //   props [[model, dx, dz, size, y?]]: any Model() name (plant lamp chair cooler cabinet bookshelf frame monitor desk bank vault ...)
  // =========================================================================
  const dk = (h, f) => '#' + [1, 3, 5].map(i => Math.round(parseInt(h.substr(i, 2), 16) * f).toString(16).padStart(2, '0')).join('');
  const ROOMS = {
    office:  { floor: ['plank', '#A0602F', '#85491F'], wall: ['panel', '#C07A40', '#8E5A2E'], trim: '#5A2E18', door: [5.4, '#7B3FA0'], rug: '#C8232D', glow: '#FFE2A0', shaft: [-1.5, -1.5],
               props: [['bookshelf', -6.4, -3.4, 3.8], ['plant', -3.8, -3.2, 2.4], ['frame', -1.0, -3.85, 1.9, 3.6], ['cooler', 2.2, -3.2, 2.8], ['lamp', 7.9, -3.0, 3.8], ['desk', -5.0, -0.6, 3.4], ['monitor', -5.6, -0.6, 1.5, 1.28], ['chair', -3.6, 1.0, 1.9], ['plant', 7.4, 4.4, 2.2], ['cabinet', 1.0, -3.3, 2.6]] },
    hallway: { floor: ['tile', '#DDE3F0', '#A9B5CF'], wall: ['plain', '#B7C6E6', '#9DB0D8'], trim: '#2C5BA8', door: [0, '#1F4FD8'], rug: '#C8232D', glow: '#FFD36B', shaft: [4.5, -1.5],
               props: [['plant', -6.6, -3.2, 2.6], ['frame', -4.4, -3.85, 1.9, 3.6], ['cabinet', -2.8, -3.4, 2.8], ['frame', 4.4, -3.85, 1.9, 3.6], ['plant', 6.8, -3.2, 2.5], ['lamp', -7.9, -3.0, 3.8], ['lamp', 7.9, -3.0, 3.8], ['cooler', 3.2, -3.2, 2.8]] },
    trading: { floor: ['tile', '#12505C', '#0F4450'], wall: ['plain', '#0D3A48', '#0A2E3A'], trim: '#061E26', led: true,
               props: [['desk', -5.5, -0.8, 3.4], ['monitor', -6.2, -0.8, 1.5, 1.28], ['monitor', -5.0, -0.8, 1.5, 1.28], ['desk', 5.5, -0.8, 3.4], ['monitor', 4.8, -0.8, 1.5, 1.28], ['monitor', 6.0, -0.8, 1.5, 1.28], ['chair', -5.5, 1.1, 1.9], ['chair', 5.5, 1.1, 1.9], ['plant', -8.0, -3.0, 2.4], ['plant', 8.0, -3.0, 2.4], ['cabinet', 0.0, -3.3, 2.6]] },
    stage:   { floor: ['plank', '#7A4A24', '#5F3A1C'], wall: ['panel', '#7B2D8E', '#5A1F6B'], trim: '#E2B857', curtain: true, rug: '#C8232D', shaft: [0, -1.0],
               props: [['plant', -7.2, -2.6, 2.6], ['plant', 7.2, -2.6, 2.6], ['lamp', -8.0, -1.0, 3.8], ['lamp', 8.0, -1.0, 3.8], ['desk', 0.0, -1.2, 2.2], ['chair', -4.6, 1.5, 1.9], ['chair', 4.6, 1.5, 1.9]] },
    boardroom: { floor: ['plank', '#5B3A24', '#47301D'], wall: ['panel', '#2C3E50', '#1F2D3B'], trim: '#C9A24B', door: [6.2, '#2A1D12'], rug: '#243447', glow: '#FFE9B0', shaft: [-1.5, -1.0],
               props: [['plant', -7.8, -3.0, 2.6], ['plant', 7.8, -3.0, 2.6], ['lamp', -8.4, -2.6, 3.8], ['frame', -5.0, -3.85, 1.9, 3.8], ['frame', 3.0, -3.85, 1.9, 3.8], ['cabinet', -2.0, -3.3, 2.6]] },
    street:  { floor: ['asphalt', '#3A3F46', '#E8E8EE'], wall: ['plain', '#C4CCD6', '#9AA6B4'], trim: '#2A2E36', buildings: true,
               props: [['lamp', -6.0, -2.4, 3.8], ['lamp', 6.0, -2.4, 3.8], ['plant', -3.0, -2.6, 2.2], ['plant', 3.0, -2.6, 2.2], ['cabinet', 7.5, -2.0, 2.4]] }
  };
  function SetRoom(kind, x, z, t, t0) {
    let R = ROOMS[kind]; if (!R || t < t0) return;
    { const m = moodAt(t), f = Math.pow(Math.min(1, m.h), 1.3), tn = h => '#' + [1, 3, 5].map((i, c) => Math.round(Math.min(255, parseInt(h.substr(i, 2), 16) * Math.min(1.08, m.t[c] * 1.15) * f)).toString(16).padStart(2, '0')).join(''), dm = v => typeof v === 'string' && /^#[0-9a-fA-F]{6}$/.test(v) ? tn(v) : Array.isArray(v) ? v.map(dm) : (v && typeof v === 'object') ? Object.keys(v).reduce((o, k) => (o[k] = dm(v[k]), o), {}) : v; if (f < 0.97 || m.t[0] < 0.97) R = dm(R); }   // rooms follow the mood: night/dusk darken floor, walls and trim (hex colours only)
 const W = 9, D0 = -4.4, D1 = 7.2, wy = 8.6, wz = z + D0, wc = R.wall[1], dw = 2.6;
    pad(x - W, z + D0, x + W, z + D1, R.floor[1]);
    if (R.floor[0] === 'tile') { for (let i = -W; i <= W; i += 1.8) Line3([x + i, 0.05, z + D0], [x + i, 0.05, z + D1], R.floor[2], 5, 1); for (let k = D0; k <= D1; k += 1.8) Line3([x - W, 0.05, z + k], [x + W, 0.05, z + k], R.floor[2], 5, 1); }
    else if (R.floor[0] === 'plank') { for (let k = D0; k <= D1; k += 0.9) Line3([x - W, 0.05, z + k], [x + W, 0.05, z + k], R.floor[2], 5, 1); }
    else if (R.floor[0] === 'asphalt') { for (let i = -6; i <= 6; i += 2) pad(x + i - 0.5, z + 2.4, x + i + 0.5, z + 5.6, R.floor[2]); pad(x - W, z + 0.6, x + W, z + 0.8, '#E2B857'); }
    if (R.rug) { pad(x - 3.8, z - 1.0, x + 3.8, z + 6.2, '#E2B857'); pad(x - 3.4, z - 0.6, x + 3.4, z + 5.8, R.rug); }
    if (R.buildings) { ['#8E5A4E', '#4E6E8E', '#B89A4E', '#6E4E8E', '#4E8E7A', '#8E4E5E'].forEach((c, i) => { const bx = x - W + i * 3.2, bh = 7 + (i * 5 % 4) * 1.6; Box(bx, 0, wz - 0.4 - (i % 2) * 0.6, 3.0, bh, 1.6, c);
        for (let r = 0; r < 3; r++) for (let q = 0; q < 2; q++) Box(bx + 0.4 + q * 1.3, 1.6 + r * 2.0, wz + 0.45 - (i % 2) * 0.6, 0.9, 0.9, 0.1, '#FFE9A8', { emis: 0.7, lw: 0 }); }); }
    else if (R.door) { const dx = x + R.door[0]; Box(x - W, 0, wz, dx - dw / 2 - (x - W), wy, 0.5, wc); Box(dx + dw / 2, 0, wz, x + W - (dx + dw / 2), wy, 0.5, wc); Box(dx - dw / 2, 4.4, wz, dw, wy - 4.4, 0.5, wc);
      Box(dx - dw / 2, 0, wz - 0.2, dw, 4.4, 0.2, R.glow, { emis: 0.9, lw: 0 }); Box(dx - dw / 2, 0, wz + 0.4, 0.6, 4.3, 0.18, R.door[1]); Box(dx - dw / 2 - 0.16, 0, wz + 0.3, 0.16, 4.55, 0.25, '#F4F1EA'); Box(dx + dw / 2, 0, wz + 0.3, 0.16, 4.55, 0.25, '#F4F1EA'); Box(dx - dw / 2 - 0.16, 4.4, wz + 0.3, dw + 0.32, 0.18, 0.25, '#F4F1EA'); }
    else Box(x - W, 0, wz, 2 * W, wy, 0.5, wc);
    Box(x - W, 0, wz + 0.5, 2 * W, 0.7, 0.2, R.trim);
    if (R.wall[0] === 'panel' && !R.curtain) for (let i = -W + 0.8; i < W; i += 1.5) { if (R.door && Math.abs(i - R.door[0]) < dw / 2 + 0.3) continue; Line3([x + i, 0.9, wz + 0.55], [x + i, 8.2, wz + 0.55], R.wall[2], 5, 1); }
    if (R.curtain) for (let i = 0; i < 12; i++) Box(x - W + i * 1.5, 0.7, wz + 0.52, 1.5, 7.9, 0.25, i % 2 ? R.wall[1] : R.wall[2], { lw: 0 });
    if (R.led) { Box(x - 4.6, 2.2, wz + 0.5, 9.2, 4.6, 0.25, '#06141C'); Box(x - 4.4, 2.4, wz + 0.72, 8.8, 4.2, 0.1, '#0A2A3A', { emis: 0.5, lw: 0 });
      const pts = [[0.03, 0.55], [0.15, 0.48], [0.27, 0.38], [0.4, 0.28], [0.5, 0.45], [0.62, 0.6], [0.74, 0.72], [0.86, 0.82], [0.97, 0.9]]; for (let i = 0; i < pts.length - 1; i++) Line3([x - 4.4 + pts[i][0] * 8.8, 2.4 + (1 - pts[i][1]) * 4.2, wz + 0.85], [x - 4.4 + pts[i + 1][0] * 8.8, 2.4 + (1 - pts[i + 1][1]) * 4.2, wz + 0.85], i < 4 ? '#2FD46A' : '#FF2B3B', 18, 1); }
    Box(x - W - 0.5, 0, wz, 0.5, wy, D1 - D0, dk(wc, 0.82)); Box(x + W, 0, wz, 0.5, wy, D1 - D0, dk(wc, 0.82));
    if (R.shaft) Box(x + R.shaft[0] - 1.2, 0, z + R.shaft[1], 2.4, 7.5, 3.2, '#FFF3B8', { a: 0.1, lw: 0, emis: 0.6 });
    R.props.forEach(p => Model(p[0], x + p[1], p[4] || 0, z + p[2], p[3]));
  }
  // ---- held / thrown objects (IK hands + props that stay in the hand + ballistic throws)
  const HandWorld = (x, z, hW, tgt) => [x + tgt[0] * hW * 1.32, tgt[1] * hW * 1.32, z + 0.3];          // world position of an IK hand target [fx, fy] (figure heights from the body centre / feet)
  function Hold(model, x, z, hW, tgt, size, t, o) { const p = HandWorld(x, z, hW, tgt); return Model(model, p[0], p[1] - size * 0.25, p[2], size, o); }   // a model that stays in a character's hand
  function Throw(model, p0, p1, t0, t1, size, t, o) { if (t < t0 || t > t1 + 0.4) return; o = o || {}; const u = seg(t, t0, t1), h = o.h || 2.5; return Model(model, lerp(p0[0], p1[0], u), lerp(p0[1], p1[1], u) + 4 * h * u * (1 - u), lerp(p0[2], p1[2], u), size, { ry: t * 7, rz: t * 5 }); }   // a parabolic throw with spin
  // =========================================================================
  // JC PROPS (Jensen-crash series, reusable): immediate-mode, animated by t, built from Box/Cyl/Line3. Story: ["Stockline", ...] etc. (docs/JC_ACT1_STORYBOARD.md)
  // =========================================================================
  const vt = (pts, t) => { if (t <= pts[0][0]) return pts[0][1]; for (let i = 0; i < pts.length - 1; i++) if (t < pts[i + 1][0]) return lerp(pts[i][1], pts[i + 1][1], easeInOut(seg(t, pts[i][0], pts[i + 1][0]))); return pts[pts.length - 1][1]; };
  // Stockline(x, y0, z, w, h, pts [[time, value 0..1]], t, {n bars, detach:[fromBar, tStart], tags:[[time,text]], board:false}): a BAR chart standing in the world (physical, green rising / red falling) with a line over the bar tops; bars from `detach[0]` fall off one after another from `detach[1]`.
  function Stockline(x, y0, z, w, h, pts, t, o) {
    o = o || {}; const N = o.n || 14, ta = pts[0][0], tb = pts[pts.length - 1][0], gap = w / N, bw = gap * 0.74, G = '#4FD6A0', R = '#E0524A';
    if (t < ta - 0.05) return;
    if (o.board !== false) { Box(x - w / 2 - 0.35, y0 - 0.35, z - 0.45, w + 0.7, h + 1.0, 0.3, '#0E1A22'); for (let k = 1; k < 4; k++) Line3([x - w / 2, y0 + h * k / 4, z - 0.28], [x + w / 2, y0 + h * k / 4, z - 0.28], '#2A3E4A', 3, 0.8); }
    let pv = null, last = null; const dt = o.detach;
    for (let i = 0; i < N; i++) {
      const ti = ta + (tb - ta) * i / (N - 1); if (ti > t) break; const v = vt(pts, ti), up = pv === null ? true : v >= pv, bx = x - w / 2 + gap * i + gap / 2; pv = v;
      let dy = 0, a = 1; if (dt && i >= dt[0] && t > dt[1] + (i - dt[0]) * 0.12) { const f = t - dt[1] - (i - dt[0]) * 0.12; dy = -(0.4 + 9 * f * f); a = 1 - seg(f, 0.55, 1.0); }
      const bh = Math.max(0.2, v * h); if (a > 0.03) { Box(bx - bw / 2, y0 + dy, z, bw, bh, 0.9, up ? G : R, { emis: 0.35, a }); if (last && dy === 0) Line3([last[0], last[1], z + 0.5], [bx, y0 + bh, z + 0.5], '#F4F1EA', 7, 1); }
      last = [bx, y0 + bh];
    }
    (o.tags || []).forEach(g => { if (last && t >= g[0] && t < g[0] + 2.4) Card(last[0], last[1] + 1.2, z + 0.9, 2.6, 0.9, { kind: 'counter', text: g[1], sub: '', fg: '#F4F1EA', accent: g[2] || '#4FD6A0', t0: g[0], t1: g[0] + 2.4, scramble: 0 }, t); });
  }
  // Panel(x, z, gauge 0..1, sag 0..1, lights 0 ok | 1 warn | 2 dark, t, {doc:true}): the financial control panel Jensen operates; the problems act ON it (gauge needle to red, sag = pulled down by chains, flicker).
  function ControlPanel(x, z, g, sag, st, t, o) {
    o = o || {}; const dy = -sag * 0.7, fl = st === 2 ? (Math.sin(t * 38) > 0.3 ? 1 : 0.15) : 1, on = st === 2 ? fl > 0.5 : true;
    Box(x - 3, 0, z - 0.8, 6, 1.7 + dy, 1.6, '#2B3A4A'); Box(x - 3, 1.7 + dy, z - 0.8, 6, 0.5, 1.0, '#3A4D60'); Box(x - 3, 2.2 + dy, z - 0.9, 6, 3.4, 0.3, st === 2 ? '#0B141B' : '#16232E');
    const cx = x - 1.5, cy = 3.7 + dy, r = 1.15; Box(cx - 1.4, cy - 1.4, z - 0.62, 2.8, 2.8, 0.08, '#F4EFE2', { lw: 0 }); Box(cx - 1.55, cy - 1.55, z - 0.7, 3.1, 3.1, 0.08, '#E2B857', { lw: 0 });
    for (let i = 0; i <= 10; i++) { const a = lerp(Math.PI * 1.15, -Math.PI * 0.15, i / 10); Line3([cx + Math.cos(a) * r * 0.78, cy + Math.sin(a) * r * 0.78, z - 0.5], [cx + Math.cos(a) * r, cy + Math.sin(a) * r, z - 0.5], i >= 7 ? '#D94E43' : '#2A3E4A', 6, 1); }
    const na = lerp(Math.PI * 1.15, -Math.PI * 0.15, g + (st === 2 ? 0 : 0.012 * Math.sin(t * 20))); Line3([cx, cy, z - 0.45], [cx + Math.cos(na) * r * 0.86, cy + Math.sin(na) * r * 0.86, z - 0.45], '#101010', 13, 1); Cyl(cx, cy - 0.15, z - 0.5, 0.17, 0.3, '#101010');
    for (let i = 0; i < 5; i++) { const col = st === 0 ? '#4FD6A0' : st === 1 ? (i < 3 ? '#F2B84B' : '#D94E43') : '#D94E43'; Box(x + 0.4 + i * 0.5, 2.17 + dy, z - 0.2, 0.3, 0.2, 0.3, on ? col : '#33414C', { emis: on ? 0.8 : 0, lw: 0 }); }
    for (let k = 0; k < 4; k++) Box(x + 0.4 + k * 0.62, 3.0 + dy, z - 0.62, 0.45, 1.7 * (0.3 + 0.6 * Math.abs(Math.sin(k * 1.7 + g * 3))), 0.08, on ? '#4FD6A0' : '#33414C', { emis: on ? 0.5 : 0, lw: 0 });
    if (o.doc) { Box(x + 0.5, 2.25 + dy, z - 0.45, 2.2, 1.3, 0.05, '#F4F1EA', { lw: 0 }); for (let k = 0; k < 4; k++) Line3([x + 0.7, 3.25 + dy - k * 0.25, z - 0.4], [x + 2.5 - (k % 2) * 0.5, 3.25 + dy - k * 0.25, z - 0.4], '#9AA6B4', 4, 1); Box(x + 0.7, 2.45 + dy, z - 0.42, 1.5, 0.22, 0.02, '#FFE066', { emis: 0.6, lw: 0, a: 0.8 }); }
  }
  // Magnifier(x, y, z, r, t, a): a gold ring with a faint blue lens and handle (facing the camera); grow r to fill the frame for a transition.
  function Magnifier(x, y, z, r, t, a) {
    a = a === undefined ? 1 : a; const n = 28; for (let i = 0; i < n; i++) { const a0 = i / n * 6.2832, a1 = (i + 1) / n * 6.2832; Line3([x + Math.cos(a0) * r, y + Math.sin(a0) * r, z], [x + Math.cos(a1) * r, y + Math.sin(a1) * r, z], '#E2B857', 10, a); }
    Box(x - r * 0.92, y - r * 0.92, z - 0.05, r * 1.84, r * 1.84, 0.04, '#BFE3FF', { a: 0.22 * a, lw: 0, emis: 0.2 }); Line3([x + r * 0.72, y - r * 0.72, z], [x + r * 1.7, y - r * 1.7, z], '#7A4A24', 16, a);
  }
  // CeoChair(x, z, {col}): leather high-back chair with a gold nameplate: the recurring anchor (empty in S4, filled in S5).
  function CeoChair(x, z, o) {
    o = o || {}; const c = o.col || '#7A1F2B', d = dk(c, 0.7); Cyl(x, 0, z, 0.75, 0.15, '#2A2E36'); Cyl(x, 0.15, z, 0.14, 1.15, '#4A4F58'); Box(x - 0.85, 1.3, z - 0.7, 1.7, 0.35, 1.5, c); Box(x - 0.85, 1.65, z - 0.9, 1.7, 2.5, 0.35, c); Box(x - 1.0, 1.65, z - 0.6, 0.18, 0.9, 1.1, d); Box(x + 0.82, 1.65, z - 0.6, 0.18, 0.9, 1.1, d);
    Box(x - 0.45, 3.4, z - 0.55, 0.9, 0.3, 0.08, '#E2B857', { emis: 0.45 });
  }
  // Ledger(x, y, z, w, t, t0): an open ledger; rows write in from t0 and one row is highlighted (the "Monday morning" entry for the Act 1 -> Act 2 hand-off).
  function Ledger(x, y, z, w, t, t0) {
    window.__NC = 1; const h = w * 0.7; Box(x - w / 2 - 0.12, y - 0.1, z - 0.1, w + 0.24, h + 0.2, 0.16, '#5A2E18'); Box(x - w / 2, y, z, w / 2 - 0.03, h, 0.08, '#F4F1EA', { lw: 0 }); Box(x + 0.03, y, z, w / 2 - 0.03, h, 0.08, '#F4F1EA', { lw: 0 });
    for (let i = 0; i < 9; i++) { const u = seg(t, t0 + i * 0.12, t0 + i * 0.12 + 0.4), yy = y + h - 0.35 - i * h / 10.5; if (u > 0) { Line3([x - w / 2 + 0.25, yy, z + 0.06], [lerp(x - w / 2 + 0.25, x - 0.25, u * (0.7 + 0.3 * ((i * 7) % 3) / 2)), yy, z + 0.06], '#2A3947', 4, 1); Line3([x + 0.25, yy, z + 0.06], [lerp(x + 0.25, x + w / 2 - 0.25, u * (0.6 + 0.4 * ((i * 5) % 3) / 2)), yy, z + 0.06], '#2A3947', 4, 1); } }
    const hu = seg(t, t0 + 0.8, t0 + 1.3); if (hu > 0) Box(x - w / 2 + 0.12, y + h - 0.35 - 4 * h / 10.5 - 0.17, z + 0.07, (w - 0.24) * hu, 0.34, 0.03, '#FFD94A', { emis: 0.7, lw: 0, a: 0.85 });
    window.__NC = 0;
  }
  // Crown(x, y, z, s): gold crown (5 spikes + gems). Calendar(x, y, z, days, t, t0, t1): 2-week wall calendar, one day crossed out per step between t0 and t1 (no digits needed).
  function Crown(x, y, z, s) { Box(x - s * 0.9, y, z - s * 0.3, s * 1.8, s * 0.35, s * 0.6, '#D9A93E', { emis: 0.15 }); for (let i = 0; i < 5; i++) { Cyl(x - s * 0.7 + i * s * 0.35, y + s * 0.35, z, s * 0.09, s * (i % 2 ? 0.5 : 0.75), '#E2B857', { emis: 0.12 }); Box(x - s * 0.7 + i * s * 0.35 - s * 0.07, y + s * (i % 2 ? 0.85 : 1.1), z - s * 0.07, s * 0.14, s * 0.14, s * 0.14, i === 2 ? '#D94E43' : '#6EE7A8', { emis: 0.8, lw: 0 }); } }
  function Calendar(x, y, z, days, t, t0, t1) {
    const w = 3.6, h = 2.6; Box(x - w / 2, y, z, w, h, 0.12, '#F4F1EA'); Box(x - w / 2, y + h - 0.55, z + 0.01, w, 0.55, 0.14, '#D94E43');
    for (let k = 0; k < 14; k++) { const cx = x - w / 2 + 0.3 + (k % 7) * (w - 0.6) / 6.2, cy = y + 0.25 + (1 - Math.floor(k / 7)) * 0.75; Box(cx - 0.17, cy, z + 0.08, 0.34, 0.5, 0.02, '#DDE3F0', { lw: 0 }); if (k < days && t > t0 + (t1 - t0) * k / Math.max(1, days)) { Line3([cx - 0.17, cy, z + 0.12], [cx + 0.17, cy + 0.5, z + 0.12], '#D94E43', 7, 1); Line3([cx - 0.17, cy + 0.5, z + 0.12], [cx + 0.17, cy, z + 0.12], '#D94E43', 7, 1); } }
  }
  // BoardTable(x, z, len): long boardroom table with chairs down both sides.
  function BoardTable(x, z, len) { Box(x - len / 2, 2.2, z - 1.2, len, 0.3, 2.4, '#5A2E18'); Box(x - len / 2 + 0.6, 0, z - 0.8, 0.5, 2.2, 1.6, '#3A1F10'); Box(x + len / 2 - 1.1, 0, z - 0.8, 0.5, 2.2, 1.6, '#3A1F10'); const n = Math.max(2, Math.round(len / 2.4)); for (let i = 0; i < n; i++) { const cx = x - len / 2 + (i + 0.5) * len / n; Model('chair', cx, 0, z - 2.3, 2.1, { ry: 3.14 }); Model('chair', cx, 0, z + 2.3, 2.1); } }
