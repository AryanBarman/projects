    // ---- through-line: golden conduit that follows the story into depth
    const TP = [[-10, 0.14, 6], [0, 0.14, 3.5], [0, 0.14, -24], [0, 0.14, -52], [0, 0.14, -80], [0, 0.14, -108]];
    X.thCurve = new THREE.CatmullRomCurve3(TP.map(p => new THREE.Vector3(p[0], p[1], p[2])));
    X.thSeg = 420;
    X.threadMat = new THREE.MeshBasicMaterial({ color: 0xEBC16B });
    X.thread = new THREE.Mesh(new THREE.TubeGeometry(X.thCurve, X.thSeg, 0.07, 8, false), X.threadMat);
    scene.add(X.thread);

    // ---- helpers: five station groups, items pop in on their spoken word
    X.items = [];
    X.G = [0, 1, 2, 3, 4].map(() => { const g = new THREE.Group(); scene.add(g); return g; });
    const put = (gi, o, x, y, z, t0, t1) => { o.position.set(x, y, z); X.G[gi].add(o); X.items.push({ o, t0: t0 === undefined ? -1 : t0, t1, gi }); return o; };
    const R = (gi, w, h, d, col, x, y0, z, t0, t1, em, r) => put(gi, rbx(w, h, d, hexNum(col), em || 0, r === undefined ? 0.08 : r), x, y0 + h / 2, z, t0, t1);
    const T = (gi, text, pw, ph, bg, fg, x, y, z, t0, t1, size) => put(gi, tag(text, pw, ph, bg, fg, size), x, y, z, t0, t1);
    const CYL = (gi, rt, rb, h, col, x, y0, z, t0, t1, em) => put(gi, new THREE.Mesh(new THREE.CylinderGeometry(rt, rb, h, 18), new THREE.MeshStandardMaterial({ color: hexNum(col), emissive: em || 0, roughness: 0.4, metalness: 0.35 })), x, y0 + h / 2, z, t0, t1);
    const cordMesh = (gi, col) => { const m = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 1, 6), new THREE.MeshBasicMaterial({ color: col })); m.visible = false; X.G[gi].add(m); return m; };

    // ======== STATION 1 (z = 0): physics solved, then three gates: lawyers, bondholders, US government
    R(0, 1.3, 1.3, 1.3, PAL.cyan, -7, 0, 0, 1.0, 10.2, 0x165e56);
    T(0, 'PHYSICS SOLVED', 4.6, 0.9, '#2B8A6E', PAL.white, -7, 3.2, 0, 1.2, 10.0);
    X.arch = put(0, KIT.archPortal('LAWYERS', 6.0, 4.6, PAL.coral), 1.2, 0, 0, 4.6, 10.2);
    for (let k = 0; k < 6; k++) R(0, 2.4, 0.5, 1.8, k % 2 ? '#F2EEE2' : '#D8D2C2', 8, k * 0.55, 0, 7.0 + k * 0.12, 10.2, 0, 0.03);
    T(0, 'BONDHOLDERS', 5.4, 0.9, PAL.ink, PAL.ivory, 8, 4.4, 0, 7.0, 10.0);
    R(0, 7, 4, 4, '#A5B1B8', 16, 0, 0, 8.6, 10.2); R(0, 7.8, 0.8, 4.6, '#C9D3D9', 16, 4, 0, 8.6, 10.2);
    [-2.4, -0.8, 0.8, 2.4].forEach(c => CYL(0, 0.35, 0.35, 3.9, '#E8EEF2', 16 + c, 0, 2.4, 8.7, 10.2));
    R(0, 0.14, 6, 0.14, '#9FB3BD', 20.4, 0, 0, 8.7, 10.2); R(0, 1.8, 1.0, 0.1, '#C8463C', 21.4, 4.6, 0, 8.7, 10.2);
    T(0, 'US GOVERNMENT', 6.6, 0.9, PAL.ink, PAL.amberHi, 16, 6.9, 0, 8.6, 10.0);
    T(0, 'LAWYERS', 4.0, 0.9, PAL.ink, PAL.ivory, 1.2, 5.6, 0, 4.9, 10.0);

    // ======== STATION 2 (z = -28): the financial web between SpaceX and NVIDIA
    R(1, 6, 6, 4, '#C9A24A', -8, 0, -28, 10.5, 36);
    R(1, 5, 8, 4, '#5D9B00', 8, 0, -28, 10.7, 36);
    T(1, 'SPACEX', 4.4, 0.95, PAL.ink, PAL.amberHi, -8, 7.2, -28, 10.6, 36);
    T(1, 'NVIDIA', 4.4, 0.95, PAL.ink, PAL.sageHi, 8, 9.2, -28, 10.8, 36);
    X.cords = [];
    for (let i = 0; i < 8; i++) X.cords.push({ m: cordMesh(1, 0xE2B857), a: new THREE.Vector3(-5, 0.9 + i * 0.65, -26.4 + (i % 3) * 0.5), b: new THREE.Vector3(5.5, 0.7 + ((i * 3) % 8) * 0.85, -26.4 + ((i * 2) % 3) * 0.5), t0: 11.0 + i * 0.25 });
    [['LOANS', 11.6], ['LEASES', 12.4], ['NOTES', 13.2], ['CONTRACTS', 14.0]].forEach((c, i) => T(1, c[0], 3.8, 0.8, PAL.ink, PAL.ivory, 0.2, 1.8 + i * 1.6, -24.8, c[1], 20.2));
    T(1, 'THE FINANCIAL WEB', 9.6, 1.1, PAL.ink, PAL.amberHi, 0, 11.6, -28, 10.7, 15.4);
    T(1, 'NOT A CLEAN BREAKUP', 9.6, 1.0, PAL.coral, PAL.white, 0, 12.2, -28, 15.6, 20.4);
    T(1, "CAN'T JUST WALK AWAY", 9.6, 0.9, PAL.ink, PAL.amberHi, 0, 10.4, -28, 18.2, 20.4);

    // ======== STATION 3 (z = -56): Wall Street, Nov 20 2026, Apollo + Goldman, $44B of lease notes
    [[-9, 9], [-3, 13], [3, 10], [9, 7]].forEach((b, i) => R(2, 3.2, b[1], 3.2, '#3D6F86', b[0], 0, -61, 20.8 + i * 0.15, 40, 0, 0.1));
    T(2, 'WALL STREET', 8.0, 1.0, PAL.ink, PAL.amberHi, 0, 15.6, -61, 21.0, 25.0);
    X.cal = put(2, panel(4.6, 3.2, 460, 320, (g, t, w, h) => { g.fillStyle = '#F2EEE2'; g.fillRect(0, 0, w, h); g.fillStyle = '#C8463C'; g.fillRect(0, 0, w, h * 0.24); g.fillStyle = '#F4F1EA'; g.textAlign = 'center'; g.textBaseline = 'middle'; g.font = '900 ' + h * 0.15 + 'px system-ui'; g.fillText('NOVEMBER 2026', w / 2, h * 0.12); g.fillStyle = '#0B161C'; g.font = '900 ' + h * 0.58 + 'px system-ui'; g.fillText('20', w / 2, h * 0.62); }), 0, 6.4, -52, 22.4, 25.6);
    R(2, 4, 5, 3, '#2E5261', -8, 0, -53, 25.5, 40); R(2, 4, 5, 3, '#6B5238', 8, 0, -53, 25.5, 40);
    T(2, 'APOLLO', 4.2, 0.9, PAL.ink, PAL.cyan, -8, 6.2, -53, 25.6, 40); T(2, 'GOLDMAN SACHS', 6.4, 0.9, PAL.ink, PAL.amberHi, 8, 6.2, -53, 26.0, 40);
    for (let k = 0; k < 20; k++) R(2, 3, 0.22, 2, k % 2 ? '#F2EEE2' : '#D8D2C2', 0, k * 0.23, -53, 28.7 + k * 0.1, 40, 0, 0.02);
    X.cnt = put(2, panel(5.6, 1.5, 560, 150, (g, t, w, h) => { g.fillStyle = '#0B1A22'; g.fillRect(0, 0, w, h); g.fillStyle = '#EBC16B'; g.textAlign = 'center'; g.textBaseline = 'middle'; g.font = '900 ' + h * 0.7 + 'px system-ui'; g.fillText('$' + Math.round(44 * easeOut(seg(t, 28.7, 31.5))) + 'B', w / 2, h / 2); }), 0, 7.6, -53, 28.7, 36);
    T(2, 'OFF-BALANCE-SHEET LEASE NOTES', 12.4, 0.95, PAL.coral, PAL.white, 0, 9.6, -53, 29.4, 36);
    R(2, 1.8, 0.4, 1.8, '#E2B857', 12.4, 0, -53, 32.8, 40, 0x4d3400); R(2, 0.5, 1.5, 0.5, '#E2B857', 12.4, 0.4, -53, 32.9, 40); R(2, 2.0, 1.6, 2.0, '#E2B857', 12.4, 1.9, -53, 33.0, 40, 0x4d3400, 0.3);
    T(2, 'LARGEST GPU FINANCING DEAL EVER', 12.0, 0.95, PAL.ink, PAL.amberHi, 12.4, 9.6, -53, 33.0, 36.4);

    // ======== STATION 4 (z = -84): Saturn Funding Trust buys Vera Rubin racks and leases them to SpaceX
    R(3, 4, 4, 3, '#5D9B00', -11, 0, -84, 36.2, 50);
    T(3, 'NVIDIA VERA RUBIN', 7.6, 0.95, PAL.ink, PAL.sageHi, -11, 6.0, -84, 36.4, 50);
    R(3, 5, 3.4, 3.4, '#6B5238', 0, 0, -84, 40.8, 50); CYL(3, 2.2, 2.2, 0.12, '#E2B857', 0, 3.4, -84, 41.0, 50); R(3, 1.2, 1.2, 1.2, '#C9A24A', 0, 3.5, -84, 41.2, 50, 0x4d3400);
    T(3, 'SATURN FUNDING TRUST', 9.4, 1.0, PAL.ink, PAL.amberHi, 0, 7.0, -84, 41.4, 50);
    R(3, 7, 0.4, 5, '#2E5261', 11, 0, -84, 38.6, 50); T(3, 'SPACEX', 4.4, 0.95, PAL.ink, PAL.amberHi, 11, 5.4, -84, 38.8, 50);
    T(3, 'LEASED TO SPACEX', 8.6, 0.95, '#2B8A6E', PAL.white, 5.5, 8.6, -84, 39.4, 48.6);
    X.kitRacks = [KIT.serverRack('VERA RUBIN RACK', PAL.sageHi), KIT.serverRack('VERA RUBIN RACK', PAL.sageHi)];
    put(3, X.kitRacks[0], 9.8, 0.4, -82.2, 44.6, 50); put(3, X.kitRacks[1], 12.6, 0.4, -82.2, 44.9, 50);
    T(3, 'H1 2027', 4.2, 1.1, PAL.coral, PAL.white, 11, 7.0, -84, 44.6, 48.6);
    X.moveRacks = [];
    for (let i = 0; i < 6; i++) { const m = rbx(1.1, 1.5, 1.0, 0x16303A, 0x16303A, 0.08, 0.4, 0.3); m.visible = false; X.G[3].add(m); X.moveRacks.push({ m, t0: 39.6 + i * 0.55 }); }
    X.coins = []; for (let i = 0; i < 10; i++) { const c = new THREE.Mesh(new THREE.CylinderGeometry(0.28, 0.28, 0.07, 14), new THREE.MeshStandardMaterial({ color: 0xEBC16B, emissive: 0x6b4a00, metalness: 0.75 })); c.visible = false; X.G[3].add(c); X.coins.push({ m: c, i }); }

    // ======== STATION 5 (z = -112): lenders watch, a rack can be repossessed in Texas, nobody can repo orbit
    R(4, 2, 7, 2, '#8C98A0', -3, 0, -106, 49.0, 60.2); T(4, 'LENDERS', 4.6, 0.9, PAL.ink, PAL.cyan, -3, 8.6, -106, 49.1, 60.2);
    X.rocket = new THREE.Group();
    { const body = new THREE.Mesh(new THREE.CylinderGeometry(1.0, 1.0, 6, 18), new THREE.MeshStandardMaterial({ color: 0xCFD6DA, metalness: 0.8, roughness: 0.25 })); body.position.y = 3; const nose = new THREE.Mesh(new THREE.ConeGeometry(1.0, 1.6, 18), new THREE.MeshStandardMaterial({ color: 0x9FB3BD, metalness: 0.8, roughness: 0.3 })); nose.position.y = 6.8; X.flame = new THREE.Mesh(new THREE.ConeGeometry(0.8, 2.2, 12), new THREE.MeshBasicMaterial({ color: 0xFFB340 })); X.flame.rotation.x = Math.PI; X.flame.position.y = -1.0; X.rocket.add(body, nose, X.flame); }
    put(4, X.rocket, 8, 0, -112, 49.0, 60.4);
    X.rocketTag = T(4, 'STAR MIND GPUs', 6.6, 0.9, PAL.ink, PAL.cyan, 8, 9.6, -112, 53.0, 59.6); X.lateTag = T(4, 'LATE 2027', 5.2, 1.0, PAL.coral, PAL.white, 11.6, 5.6, -112, 56.4, 59.6);
    R(4, 9, 4, 5, '#3D6F86', -11, 0, -112, 59.9, undefined); for (let k = 0; k < 3; k++) R(4, 1.1, 2.2, 1.0, '#16303A', -13.2 + k * 1.6, 0, -108.6, 59.9, undefined, 0x16303A);
    T(4, 'TEXAS DATA CENTER', 9.4, 0.95, PAL.ink, PAL.amberHi, -11, 6.2, -112, 62.2);
    X.truck = new THREE.Group(); { const bed = rbx(3.4, 1.8, 1.8, 0xE2B857, 0x000000, 0.1, 0.4, 0.3), cab = rbx(1.5, 1.5, 1.7, 0xC8463C, 0x000000, 0.1, 0.4, 0.3); bed.position.set(0, 1.2, 0); cab.position.set(-2.4, 1.05, 0); X.truck.add(bed, cab); [[-2.4, 0.9], [0.9, 0.9], [-2.4, -0.9], [0.9, -0.9]].forEach(w => { const wh = new THREE.Mesh(new THREE.CylinderGeometry(0.4, 0.4, 0.3, 14), new THREE.MeshStandardMaterial({ color: 0x1a1a1a })); wh.rotation.x = Math.PI / 2; wh.position.set(w[0], 0.4, w[1]); X.truck.add(wh); }); }
    put(4, X.truck, -2, 0, -104, 60.4); T(4, 'REPO', 2.4, 0.8, PAL.coral, PAL.white, -2, 4.0, -104, 60.6, 64.6);
    T(4, 'RACK REPOSSESSED', 9.2, 0.9, '#2B8A6E', PAL.white, -11, 8.6, -112, 62.4, 64.2);
    X.orbit = put(4, new THREE.Mesh(new THREE.TorusGeometry(7, 0.09, 8, 64), new THREE.MeshBasicMaterial({ color: 0x64D2C7 })), 8, 24, -112, 60.0); X.orbit.rotation.x = Math.PI / 2;
    X.sat = put(4, rbx(1.4, 1.0, 1.2, 0xCFD6DA, 0, 0.08, 0.3, 0.8), 8, 24, -112, 60.0); const p1 = rbx(2.4, 0.1, 0.9, 0x3A78B8, 0x0a2a4a, 0.03, 0.3, 0.3), p2 = p1.clone(); p1.position.x = -1.9; p2.position.x = 1.9; X.sat.add(p1, p2);
    T(4, 'LOW-EARTH ORBIT', 8.4, 0.95, PAL.ink, PAL.cyan, 8, 28.6, -112, 64.3);
    for (let k = 0; k < 8; k++) R(4, 0.25, 1.0, 0.25, '#9FB3BD', 8, 2.6 + k * 2.4, -108, 65.0);
    T(4, 'NO ROAD', 4.2, 0.9, PAL.coral, PAL.white, 8, 8.6, -108, 65.0); T(4, 'NOBODY CAN REPO ORBIT', 12.0, 1.1, PAL.ink, PAL.amberHi, 8, 18.0, -108, 65.6);
  }

  const HEADS = [
    [0.00, 10.20, 'THE REAL OBSTACLES', 'Lawyers, bondholders and the US government', PAL.coral, 0.00],
    [10.46, 20.50, 'THE FINANCIAL WEB', 'SpaceX and NVIDIA are tied together', PAL.amber, 10.46],
    [20.70, 36.00, 'WALL STREET, NOV 20, 2026', 'Apollo and Goldman Sachs: $44B in lease notes', PAL.cyan, 20.70],
    [36.18, 48.90, 'SATURN FUNDING TRUST', 'Vera Rubin racks leased to SpaceX from H1 2027', PAL.sage, 36.18],
    [48.98, 67.64, 'NOBODY REPOS ORBIT', 'Lenders watch Star Mind launch in late 2027', PAL.coral, 48.98]
  ];

  function renderScene(t) {
    if (!HAS_THREE) return;
    applyCamera(
      t,
      [[4.6, 8, 0.10], [10.5, 8, 0.12], [20.7, 8, 0.12], [28.7, 8, 0.12], [41.2, 8, 0.12], [56.2, 8, 0.12], [65.6, 8, 0.14]],
      tt => Math.sin(seg(tt, 8.4, 10.4) * Math.PI) * 0.03 - Math.sin(seg(tt, 20.0, 21.4) * Math.PI) * 0.03
    );
    applyLook(0.86);

    { const head = clamp(seg(t, 0.4, 65.0), 0.04, 1); X.thread.geometry.setDrawRange(0, Math.floor(head * X.thSeg) * 6 * 8); X.threadMat.color.setHex(t < 10.4 ? 0xEBC16B : t < 20.7 ? 0xE0902B : t < 36 ? 0x45B8AC : t < 49 ? 0x76B900 : 0xD94E43); }
    X.G[0].visible = t < 12.0; X.G[1].visible = t >= 9.8 && t < 37; X.G[2].visible = t >= 19.5 && t < 41; X.G[3].visible = t >= 35 && t < 51; X.G[4].visible = t >= 47;
    X.items.forEach(it => { const on = t >= it.t0 && (it.t1 === undefined || t < it.t1); it.o.visible = on && X.G[it.gi].visible && it.o.position.distanceTo(camera.position) > 9; if (on) { const s = Math.max(0.01, easeOutBack(seg(t, it.t0, it.t0 + 0.45))), f = it.t1 === undefined ? 1 : 1 - seg(t, it.t1 - 0.4, it.t1); it.o.scale.setScalar(Math.max(0.01, s * f)); } });
    if (X.cnt.visible) { const ud = X.cnt.userData; ud.paint(ud.g, t, ud.w, ud.h); ud.tex.needsUpdate = true; }
    // the web: cords grow, turn red and strain while Jensen is pulled back
    { const pull = easeOut(seg(t, 18.0, 18.9)) - easeOut(seg(t, 19.2, 19.7)) * 0.7; X.cords.forEach((c, i) => { const u = easeOut(seg(t, c.t0, c.t0 + 0.6)); c.m.visible = X.G[1].visible && t >= c.t0 && t < 36; if (c.m.visible) { const b = c.a.clone().lerp(c.b, u); cordBetween(c.m, c.a, b); c.m.scale.x = 1 + pull * 1.8; c.m.material.color.setHex(pull > 0.2 ? 0xD8483A : 0xE2B857); } }); }
    // racks travel Vera Rubin -> trust -> SpaceX, coins flow into NVIDIA
    X.moveRacks.forEach((r, i) => { const f = seg(t, r.t0, r.t0 + 3.0); r.m.visible = X.G[3].visible && f > 0 && f < 1; if (r.m.visible) { const e = easeInOut(f); r.m.position.set(lerp(-11, 11, e), 0.75 + Math.sin(e * Math.PI) * 1.2, -82.4 + (i % 2) * 0.8); } });
    X.coins.forEach(c => { const u = (((t - 36.6) * 0.3 + c.i / 10) % 1 + 1) % 1; c.m.visible = X.G[3].visible && t >= 36.6 && t < 46; if (c.m.visible) { c.m.position.set(lerp(-19, -12.6, u), 2 + Math.sin(u * Math.PI) * 1.4, -84.6); c.m.rotation.set(t * 4 + c.i, 0, t * 3); } });
    // rocket launch, orbit sat, repo truck
    if (X.rocket.visible) { const lf = easeInOut(seg(t, 56.2, 60.0)); X.rocket.position.set(8, lerp(0, 22, lf), -112); X.flame.visible = t >= 56.2 && t < 60.2; X.flame.scale.set(1, 0.7 + 0.5 * Math.abs(Math.sin(t * 30)), 1); }
    { const a = t * 0.5; X.sat.position.set(8 + Math.cos(a) * 7, 24, -112 + Math.sin(a) * 7); X.sat.rotation.y = -a; }
    if (X.truck.visible) { const tx = lerp(2, -9, easeInOut(seg(t, 60.4, 62.0))) + lerp(0, 22, easeInOut(seg(t, 63.8, 65.8))); X.truck.position.set(tx, 0, -104); }

    renderer.render(scene, camera);

    smearPass(t);
    const cast = [];
    const add = (role, wx, wy, wz, h, t0, t1, o) => {
      if (t >= t0 && (t1 === undefined || t < t1)) cast.push({ role, wx, wy, wz, h, t0, t1, o });
    };
    const w0 = seg(t, 4.5, 9.4), wk0 = w0 > 0 && w0 < 1 ? 1 : 0, ex = lerp(-9, -2, easeInOut(w0));
    add('jensen', ex - 2.6, 0, 3.4, 3.0, 0.2, 10.2, { facing: 1, phase: 1, walkAmt: wk0, armAngleR: -0.4, armAngleL: 0.3, talk: w0 >= 1 ? 0.6 : 0 });
    add('elon', ex, 0, 3.4, 3.0, 0.2, 10.2, { facing: 1, phase: 2, walkAmt: wk0, armAngleR: -1.5, armAngleL: 0.3, talk: w0 >= 1 ? 0.6 : 0 });
    [0.2, 1.4, 2.6].forEach((dx, i) => add('analyst', 0.6 + dx, 0, 3.2 + (i % 2) * 0.8, 2.8, 4.9 + i * 0.1, 10.2, { facing: -1, phase: 3 + i, armAngleR: -0.4, armAngleL: 0.3, browTension: 0.8 }));
    const pull = easeOut(seg(t, 18.0, 18.9)) - easeOut(seg(t, 19.2, 19.7)) * 0.7;
    add('jensen', 7 + 4 * pull, 0, -24.6, 3.0, 15.4, 20.7, { facing: -1, phase: 4, walkAmt: pull > 0.05 && pull < 0.95 ? 1 : 0, armAngleR: -0.4, armAngleL: 0.3, browTension: 0.8 });
    add('elon', -6, 0, -24.6, 3.0, 15.5, 20.7, { facing: 1, phase: 5, armAngleR: -1.65, armAngleL: 0.3, talk: 0.7 });
    add('analyst', -2.2, 0, -102.6, 2.8, 49.2, 60.0, { facing: 1, phase: 6, armAngleR: -1.65, armAngleL: 0.3, browTension: 0.4 });
    add('analyst', -4.4, 0, -102.6, 2.8, 49.5, 60.0, { facing: 1, phase: 7, armAngleR: -0.4, armAngleL: 0.3, browTension: 0.8 });

    drawCast(t, cast);

    const wb = (x, y, z) => worldToScreen(x, y, z);
    { const [x, y] = wb(1.2, 3, 0.4); hitFx(x, y, t, 4.6, { color: PAL.coral, r: 260, rays: 14 }); }
    { const [x, y] = wb(0, 4, -26); hitFx(x, y, t, 11.0, { color: PAL.amberHi, r: 280, rays: 16 }); }
    { const [x, y] = wb(0, 3, -53); hitFx(x, y, t, 28.7, { color: PAL.amberHi, r: 300, rays: 16 }); }
    { const [x, y] = wb(0, 4, -84); hitFx(x, y, t, 41.4, { color: PAL.amberHi, r: 280, rays: 16 }); }
    { const [x, y] = wb(8, 12, -108); hitFx(x, y, t, 65.6, { color: PAL.coral, r: 340, rays: 18 }); }

    HEADS.forEach(h => {
      const a = env(t, h[0], h[1], 0.35, 0.35);
      if (a > 0.01) drawHeadline(h[2], h[3], a, h[4], t, h[5]);
    });
  }

