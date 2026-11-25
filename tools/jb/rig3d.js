  // ---- 3D character rig (prototype): real 3D body (rounded parts + ink hull outline) driven by RigKit pose angles, hand-drawn head on a billboard plane ----
  const RIG3D = __RIG3D__;                         // roles drawn as 3D models (cfg 'rig3d'); everything else stays a sprite
  const R3 = { pool: {}, n: {}, ready: false };
  const R3_MAP = { explain: 'talk', podium: 'present', present: 'present', point: 'point', think: 'think', walk: 'walk', run: 'run', cross: 'cross', negotiate: 'talk', rally: 'cheer', discuss: 'talk', raised: 'cheer', statement: 'present', call: 'phone', tablet: 'hold', document: 'hold', stand: 'idle', idle: 'idle' };
  const R3_HULL = new THREE.MeshBasicMaterial({ color: 0x15191d, side: THREE.BackSide });
  function r3Ok(role) { const K = window.RigKit && RigKit.K; return RIG3D.indexOf(role) >= 0 && K && K.expr10 && K.smeta && K.smeta.exprRows.indexOf(RigKit.specOf(role).head) >= 0; }
  function r3Col(col, f) { const c = new THREE.Color(col); c.multiplyScalar(f); return c; }
  function r3Mesh(parent, geo, col, x, y, z, hull) {
    const sk = (col === '#f3c99a'), m = new THREE.Mesh(geo, new THREE.MeshStandardMaterial({ color: r3Col(col, sk ? 0.72 : 0.3), roughness: 0.6, metalness: 0.04, emissive: r3Col(col, sk ? 0.08 : 0.03) })); m.position.set(x, y, z); m.castShadow = true; m.receiveShadow = true; parent.add(m);
    if (hull !== 0) { const h = new THREE.Mesh(geo, R3_HULL); h.scale.setScalar(hull || 1.09); m.add(h); }
    return m;
  }
  function r3Build(role) {
    const spec = RigKit.specOf(role), SKIN = '#f3c99a', bulk = (spec.big || 1) * (spec.slim ? 0.9 : 1), sw = 24 * bulk, g = new THREE.Group(), body = new THREE.Group(); g.add(body);
    const RB = (w, h, d, r) => THREE.RoundedBoxGeometry ? new THREE.RoundedBoxGeometry(w, h, d, 3, r) : new THREE.BoxGeometry(w, h, d), CY = (r, h) => new THREE.CylinderGeometry(r, r * 0.92, h, 14), SP = r => new THREE.SphereGeometry(r, 14, 10);
    // torso, pelvis, neck
    r3Mesh(body, RB(sw * 2.45, 84, 36 * bulk, 11), spec.j, 0, 130, 0);
    r3Mesh(body, RB(sw * 2.0, 26, 32 * bulk, 8), spec.p, 0, 94, 0);
    r3Mesh(body, CY(9, 16), SKIN, 0, 170, 0, 1.12);
    if (spec.zip) r3Mesh(body, new THREE.BoxGeometry(3, 76, 1.5), '#8a909a', 0, 130, 19 * bulk, 0);
    if (spec.logo) r3Mesh(body, new THREE.BoxGeometry(15, 10, 1.2), '#76B900', sw * 0.7, 150, 19 * bulk, 0);
    if (spec.tie) r3Mesh(body, new THREE.BoxGeometry(8, 46, 1.6), spec.tie, 0, 140, 17.8 * bulk, 0);
    if (spec.suit) { r3Mesh(body, new THREE.BoxGeometry(sw * 0.7, 78, 1.2), spec.s, 0, 134, 17.4 * bulk, 0); r3Mesh(body, new THREE.BoxGeometry(5, 64, 2), spec.j2, -sw * 0.55, 136, 17.7 * bulk, 0); r3Mesh(body, new THREE.BoxGeometry(5, 64, 2), spec.j2, sw * 0.55, 136, 17.7 * bulk, 0); }
    // arms: pivot at the shoulder; upper arm + elbow + forearm + hand
    const arm = side => { const piv = new THREE.Group(); piv.position.set(side * (sw * 1.25 + 5), 160, 0); body.add(piv);
      r3Mesh(piv, SP(11), spec.j, 0, 0, 0); r3Mesh(piv, CY(10.5, 40), spec.j, 0, -20, 0);
      const el = new THREE.Group(); el.position.set(0, -40, 0); piv.add(el); r3Mesh(el, SP(9.6), spec.j, 0, 0, 0); r3Mesh(el, CY(9.4, 36), spec.j2 || spec.j, 0, -18, 0); r3Mesh(el, SP(9.2), SKIN, 0, -38, 0, 1.12);
      return { piv, el }; };
    const leg = side => { const piv = new THREE.Group(); piv.position.set(side * 12 * bulk, 94, 0); body.add(piv);
      r3Mesh(piv, CY(11, 48), spec.p, 0, -24, 0); const kn = new THREE.Group(); kn.position.set(0, -48, 0); piv.add(kn); r3Mesh(kn, SP(10.4), spec.p, 0, 0, 0); r3Mesh(kn, CY(9.6, 46), spec.p, 0, -23, 0);
      r3Mesh(kn, RB(18, 9, 30, 4), '#1b1d21', 0, -48, 7); return { piv, kn }; };
    const aR = arm(1), aL = arm(-1), lR = leg(1), lL = leg(-1);
    // head: billboard plane with the hand-drawn expression sheet
    const cv = document.createElement('canvas'); cv.width = cv.height = 128; const tex = new THREE.CanvasTexture(cv); tex.anisotropy = 4;
    const head = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), new THREE.MeshBasicMaterial({ map: tex, transparent: true, alphaTest: 0.12, side: THREE.DoubleSide, fog: false }));
    scene.add(head); scene.add(g);
    return { g, body, aR, aL, lR, lL, head, cv, tex, key: '', role };
  }
  function r3Expr(inst, names, want, ri) {
    let ni = names.indexOf(want); if (ni < 0) ni = 0; const key = ri + ':' + ni; if (inst.key === key) return; inst.key = key;
    const K = RigKit.K, E = K.smeta.exprCell, c2 = inst.cv.getContext('2d'); c2.clearRect(0, 0, 128, 128); c2.drawImage(K.expr10, ni * E, ri * E, E, E, 0, 0, 128, 128); inst.tex.needsUpdate = true;
  }
  function r3Begin() { Object.keys(R3.n).forEach(k => R3.n[k] = 0); }
  function r3End() { Object.keys(R3.pool).forEach(role => R3.pool[role].forEach((it, i) => { const on = i < (R3.n[role] || 0); it.g.visible = on; it.head.visible = on; })); }
  function r3Draw(role, P, hW, o, t) {
    const spec = RigKit.specOf(role), K = RigKit.K, list = R3.pool[role] = R3.pool[role] || [], idx = R3.n[role] = (R3.n[role] || 0) + 1, i = idx - 1;
    if (!list[i]) list[i] = r3Build(role); const it = list[i], fx = o.facing < 0 ? -1 : 1, ph = o.phase || 0;
    let nm = (o.pose || ((o.walkAmt || 0) > 0.3 ? 'walk' : (o.talk || 0) > 0.5 ? 'talk' : 'idle')).replace('spr:', ''); nm = R3_MAP[nm] || (RigKit.POSE[nm] ? nm : 'idle');
    const walking = nm === 'walk' || nm === 'run', tt = t * (1 + ((ph * 0.37) % 0.17));
    const P0 = (RigKit.POSE[nm] || RigKit.POSE.idle)(tt, ph, { _side: walking }); const PK = ['aR', 'eR', 'aL', 'eL', 'tR', 'kR', 'tL', 'kL', 'bob', 'lean', 'tilt', 'sit'];
    if (o.from && o.blend !== undefined && o.blend < 1) { let fn = (o.from + '').replace('spr:', ''); fn = R3_MAP[fn] || (RigKit.POSE[fn] ? fn : 'idle'); const Q = (RigKit.POSE[fn] || RigKit.POSE.idle)(tt, ph, { _side: walking }), u = Math.min(1.2, o.blend); PK.forEach(k => { P0[k] = Q[k] + (P0[k] - Q[k]) * u; }); }
    const kS = (hW * 1.2) / 278; it.g.position.set(P[0], P[1], P[2]); it.g.scale.setScalar(kS);
    const yawCam = Math.atan2(camera.position.x - P[0], camera.position.z - P[2]); it.g.rotation.y = walking ? (fx > 0 ? Math.PI / 2 : -Math.PI / 2) : yawCam * 0.65 + fx * 0.34;
    it.body.position.y = Math.abs(P0.bob) * 0.8; it.body.rotation.z = -fx * P0.lean;
    const side = walking, sg = side ? -1 : fx, ax = side ? 'x' : 'z';
    const setR = (obj, v) => { obj.rotation.set(0, 0, 0); obj.rotation[ax] = (side ? -1 : fx) * v; };
    setR(it.aR.piv, P0.aR); setR(it.aR.el, P0.eR); setR(it.aL.piv, P0.aL); setR(it.aL.el, P0.eL);
    setR(it.lR.piv, P0.tR); it.lR.kn.rotation.set(0, 0, 0); it.lR.kn.rotation[ax] = (side ? 1 : -fx) * P0.kR; setR(it.lL.piv, P0.tL); it.lL.kn.rotation.set(0, 0, 0); it.lL.kn.rotation[ax] = (side ? 1 : -fx) * P0.kL;
    // head
    const names = K.smeta.expr[spec.head], ri = K.smeta.exprRows.indexOf(spec.head); let want = o.expr || (nm === 'think' ? 'thinking' : (nm === 'talk' || nm === 'present' || (o.talk || 0) > 0.5) ? (Math.sin(t * 7 + ph) > -0.2 ? 'speaking' : 'neutral') : nm === 'cheer' ? 'smiling' : nm === 'panic' ? 'concerned' : 'neutral');
    r3Expr(it, names, want, ri);
    const S = 96 * K.headMul * (o.headScale || 1) * kS, up = (171 + 96 * K.headMul * 0.5) * kS + it.body.position.y * kS;
    it.head.position.set(P[0], P[1] + up, P[2]); it.head.position.x += (camera.position.x - P[0]) * 0.012; it.head.position.z += (camera.position.z - P[2]) * 0.012 + 0.02;
    it.head.scale.set(S, S, 1); it.head.quaternion.copy(camera.quaternion); it.head.rotateZ(-fx * P0.tilt);
  }
