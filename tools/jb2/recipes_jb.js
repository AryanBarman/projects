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
    street:  { floor: ['asphalt', '#3A3F46', '#E8E8EE'], wall: ['plain', '#C4CCD6', '#9AA6B4'], trim: '#2A2E36', buildings: true,
               props: [['lamp', -6.0, -2.4, 3.8], ['lamp', 6.0, -2.4, 3.8], ['plant', -3.0, -2.6, 2.2], ['plant', 3.0, -2.6, 2.2], ['cabinet', 7.5, -2.0, 2.4]] }
  };
  function SetRoom(kind, x, z, t, t0) {
    const R = ROOMS[kind]; if (!R || t < t0) return; const W = 9, D0 = -4.4, D1 = 7.2, wy = 8.6, wz = z + D0, wc = R.wall[1], dw = 2.6;
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
