    // ---- environment: sky dome, soft sun, drifting clouds, distant skyline and hills, pale gridded ground; all follow the camera
    X.floorN.visible = false; X.floorD.visible = false;
    camera.far = 1400; camera.updateProjectionMatrix();
    scene.fog = new THREE.Fog(0xD8EAF0, 110, 520); scene.background = new THREE.Color(0xD8EAF0);
    hemiLight.color.set(0xffffff); hemiLight.groundColor.set(0xB9CDD6); hemiLight.intensity = 1.0; dirLight.intensity = 0.9; rimLight.intensity = 0.5;
    X.env = new THREE.Group(); scene.add(X.env);
    { // sky dome
      const c = document.createElement('canvas'); c.width = 4; c.height = 256; const g = c.getContext('2d'), gr = g.createLinearGradient(0, 0, 0, 256);
      gr.addColorStop(0, '#2F78A8'); gr.addColorStop(0.35, '#6DB4D4'); gr.addColorStop(0.55, '#B7DDE8'); gr.addColorStop(0.62, '#D8EAF0'); gr.addColorStop(1, '#D8EAF0'); g.fillStyle = gr; g.fillRect(0, 0, 4, 256);
      X.sky = new THREE.Mesh(new THREE.SphereGeometry(1200, 24, 16), new THREE.MeshBasicMaterial({ map: new THREE.CanvasTexture(c), side: THREE.BackSide, fog: false, depthWrite: false }));
      X.sky.renderOrder = -10; scene.add(X.sky);
    }
    { // pale gridded ground
      X.ground = new THREE.Mesh(new THREE.PlaneGeometry(1500, 1500), new THREE.MeshStandardMaterial({ map: gridTex('#B7CED8', 'rgba(25,75,95,0.20)', 250, 250), roughness: 0.95 }));
      X.ground.rotation.x = -Math.PI / 2; X.ground.receiveShadow = true; scene.add(X.ground);
    }
    { // distant skyline, hills, clouds, sun
      const sk = new THREE.Group(), mk = (w, h, d, col, ang, rad) => { const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), new THREE.MeshBasicMaterial({ color: col })); m.position.set(Math.cos(ang) * rad, h / 2, Math.sin(ang) * rad); m.rotation.y = -ang; sk.add(m); };
      for (let i = 0; i < 90; i++) { const a = i / 90 * TAU, r = 300 + hash(i * 3 + 1) * 90, h = 14 + hash(i * 7 + 2) * 70 * (0.4 + 0.6 * hash(i * 11 + 3)); mk(10 + hash(i * 5 + 4) * 22, h, 10 + hash(i * 13 + 5) * 16, i % 3 ? 0xB4CFDA : 0x9EBFCD, a, r); }
      for (let i = 0; i < 14; i++) { const a = (i / 14) * TAU + 0.2, m = new THREE.Mesh(new THREE.ConeGeometry(70 + hash(i * 17) * 60, 60 + hash(i * 19) * 70, 5), new THREE.MeshBasicMaterial({ color: 0xA9C6D2 })); m.position.set(Math.cos(a) * 520, 25, Math.sin(a) * 520); sk.add(m); }
      X.sky2 = sk; X.env.add(sk);
      const cc = document.createElement('canvas'); cc.width = cc.height = 128; const cg = cc.getContext('2d'), cr = cg.createRadialGradient(64, 64, 4, 64, 64, 62); cr.addColorStop(0, 'rgba(255,255,255,0.95)'); cr.addColorStop(1, 'rgba(255,255,255,0)'); cg.fillStyle = cr; cg.fillRect(0, 0, 128, 128);
      const ct = new THREE.CanvasTexture(cc); X.clouds = [];
      for (let i = 0; i < 14; i++) { const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: ct, transparent: true, opacity: 0.55 + 0.3 * hash(i * 23), fog: false, depthWrite: false })); const w = 150 + hash(i * 29) * 160; s.scale.set(w, w * 0.32, 1); s.userData = { a: hash(i * 31) * TAU, r: 260 + hash(i * 37) * 340, y: 130 + hash(i * 41) * 120, sp: 0.01 + hash(i * 43) * 0.02 }; X.env.add(s); X.clouds.push(s); }
      const sc2 = document.createElement('canvas'); sc2.width = sc2.height = 128; const sg = sc2.getContext('2d'), sr = sg.createRadialGradient(64, 64, 2, 64, 64, 62); sr.addColorStop(0, 'rgba(255,250,225,1)'); sr.addColorStop(0.25, 'rgba(255,240,190,0.55)'); sr.addColorStop(1, 'rgba(255,240,190,0)'); sg.fillStyle = sr; sg.fillRect(0, 0, 128, 128);
      X.sun = new THREE.Sprite(new THREE.SpriteMaterial({ map: new THREE.CanvasTexture(sc2), transparent: true, fog: false, depthWrite: false })); X.sun.scale.set(330, 330, 1); X.env.add(X.sun);
    }
    // ---- world layer: pooled meshes driven each frame by the scene code
    X.world = new THREE.Group(); scene.add(X.world);
    X.uBox = THREE.RoundedBoxGeometry ? new THREE.RoundedBoxGeometry(1, 1, 1, 3, 0.09) : new THREE.BoxGeometry(1, 1, 1);
    X.uEdge = new THREE.EdgesGeometry(new THREE.BoxGeometry(1, 1, 1)); X.uCyl = new THREE.CylinderGeometry(1, 1, 1, 18); X.uPlane = new THREE.PlaneGeometry(1, 1);
  }

  // =========================================================================
  // WORLD SHIM: the canvas scene API (Box / Cyl / Label / Panel / Char / groundPoly / groundPath / Line3) drawn as real 3D
  // =========================================================================
  const eBack = u => { const c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * Math.pow(u - 1, 3) + c1 * Math.pow(u - 1, 2); };
  const eIn = u => u * u * u;
  let GROUND = [], ITEMS = [], OVER = [], CAST = [];
  const POOL = { box: [], cyl: [], label: [], panel: [], poly: [], seg: [] }, CNT = { box: 0, cyl: 0, label: 0, panel: 0, poly: 0, seg: 0 };
  const LBL = new Map(), NEARCULL = 9;
  function grab(type, make) { const p = POOL[type]; let o = p[CNT[type]]; if (!o) { o = make(); X.world.add(o.m); p.push(o); } CNT[type]++; o.m.visible = true; return o; }
  function setCol(mat, col, em, a) { mat.color.set(col); if (mat.emissive) { mat.emissive.set(col); mat.emissiveIntensity = (em || 0) * 0.8; } const tr = a < 1; mat.opacity = a; if (mat.transparent !== tr) { mat.transparent = tr; mat.depthWrite = !tr; mat.needsUpdate = true; } }
  function paleCol(c) { const n = parseInt(String(c).replace('#', ''), 16) || 0, r = n >> 16 & 255, g = n >> 8 & 255, b = n & 255; if (r + g + b > 330) return c; const f = 0.6; return 'rgb(' + Math.round(r + (255 - r) * f) + ',' + Math.round(g + (255 - g) * f) + ',' + Math.round(b + (255 - b) * f) + ')'; }
  function Box(x, y0, z, w, h, d, col, o) {
    o = o || {}; if (h <= 0.001 || (o.a !== undefined && o.a <= 0.02)) return; const P = mp(x, y0 + h / 2, z), a = o.a === undefined ? 1 : o.a;
    const e = grab('box', () => { const m = new THREE.Mesh(X.uBox, new THREE.MeshStandardMaterial({ roughness: 0.5, metalness: 0.15 })); m.castShadow = true; m.receiveShadow = true; const l = new THREE.LineSegments(X.uEdge, new THREE.LineBasicMaterial({ color: 0x071318, transparent: true, opacity: 0.55 })); m.add(l); return { m, l }; });
    e.m.position.set(P[0], P[1], P[2]); e.m.scale.set(w, h, d); setCol(e.m.material, col, o.emis, a); e.l.visible = o.lw !== 0;
    if (e.m.position.distanceTo(camera.position) < NEARCULL) e.m.visible = false;
  }
  function Cyl(x, y0, z, r, h, col, o) {
    o = o || {}; if (h <= 0.001 || (o.a !== undefined && o.a <= 0.02)) return; const P = mp(x, y0 + h / 2, z), a = o.a === undefined ? 1 : o.a;
    const e = grab('cyl', () => { const m = new THREE.Mesh(X.uCyl, new THREE.MeshStandardMaterial({ roughness: 0.45, metalness: 0.25 })); m.castShadow = true; m.receiveShadow = true; return { m }; });
    e.m.position.set(P[0], P[1], P[2]); e.m.scale.set(r, h, r); setCol(e.m.material, col, o.emis, a);
    if (e.m.position.distanceTo(camera.position) < NEARCULL) e.m.visible = false;
  }
  function labelTex(text, w, h, bg, fg, line) {
    const key = text + '|' + w + '|' + h + '|' + bg + '|' + fg + '|' + line; let t = LBL.get(key); if (t) return t;
    const cw = Math.max(256, Math.min(1024, Math.round(w * 120))), ch = Math.max(64, Math.round(cw * h / w)), c = document.createElement('canvas'); c.width = cw; c.height = ch; const g = c.getContext('2d');
    if (bg) { g.fillStyle = bg; g.strokeStyle = line || '#0B161C'; g.lineWidth = Math.max(2, ch * 0.06); g.beginPath(); g.roundRect(g.lineWidth / 2, g.lineWidth / 2, cw - g.lineWidth, ch - g.lineWidth, ch * 0.18); g.fill(); g.stroke(); }
    g.fillStyle = fg; g.textAlign = 'center'; g.textBaseline = 'middle'; let sz = ch * 0.62; const fam = ' system-ui, "Segoe UI", sans-serif'; g.font = '900 ' + sz + 'px' + fam; while (g.measureText(text).width > cw * 0.86 && sz > 8) { sz *= 0.93; g.font = '900 ' + sz + 'px' + fam; }
    g.fillText(text, cw / 2, ch / 2 + ch * 0.03); t = new THREE.CanvasTexture(c); t.anisotropy = 4; LBL.set(key, t); return t;
  }
  function billboard(m, rot) { m.quaternion.copy(camera.quaternion); if (rot) m.rotateZ(-rot); }
  function Label(text, x, y, z, w, h, bg, fg, o) {
    o = o || {}; const sc = o.sc === undefined ? 1 : o.sc; if (sc <= 0.02 || (o.a !== undefined && o.a <= 0.02)) return; const P = mp(x, y, z);
    const e = grab('label', () => { const m = new THREE.Mesh(X.uPlane, new THREE.MeshBasicMaterial({ transparent: true, depthTest: false, fog: false, toneMapped: false })); m.renderOrder = 20; return { m }; });
    e.m.material.map = labelTex(text, w, h, bg, fg, o.line); e.m.material.opacity = o.a === undefined ? 1 : o.a; e.m.position.set(P[0], P[1], P[2]); e.m.scale.set(w * sc, h * sc, 1); billboard(e.m, o.rot);
  }
  function Panel(x, y, z, w, h, paint, o) {
    o = o || {}; const sx = o.sx === undefined ? 1 : o.sx, sy = o.sy === undefined ? 1 : o.sy; if (sx <= 0.02 || sy <= 0.02) return; const P = mp(x, y, z);
    const cw = 512, ch = Math.max(64, Math.min(1024, Math.round(512 * h / w)));
    const e = grab('panel', () => { const c = document.createElement('canvas'); const tex = new THREE.CanvasTexture(c); const m = new THREE.Mesh(X.uPlane, new THREE.MeshBasicMaterial({ map: tex, transparent: true, depthTest: false, fog: false, toneMapped: false })); m.renderOrder = 19; return { m, c, tex }; });
    if (e.c.width !== cw || e.c.height !== ch) { e.c.width = cw; e.c.height = ch; } const g = e.c.getContext('2d'); g.clearRect(0, 0, cw, ch); g.save(); paint(g, cw, ch); g.restore(); e.tex.needsUpdate = true;
    e.m.material.opacity = o.a === undefined ? 1 : o.a; e.m.position.set(P[0], P[1], P[2]); e.m.scale.set(w * sx, h * sy, 1); billboard(e.m, o.rot);
  }
  function groundPoly(pts, y, fill, stroke, lw, a) {
    if (!pts.length) return; const P0 = mp(pts[0][0], y, pts[0][1]), c = STN.length ? STN[stIdx(pts[0][0])].c : 0, zo = P0[2] - pts[0][1]; a = a === undefined ? 1 : a; if (a <= 0.02) return;
    const key = JSON.stringify(pts) + y;
    const e = grab('poly', () => { const g = new THREE.Group(); return { m: g, key: '' }; });
    if (e.key !== key) {
      while (e.m.children.length) { const ch = e.m.children[0]; e.m.remove(ch); if (ch.geometry) ch.geometry.dispose(); }
      const sh = new THREE.Shape(); pts.forEach((p, i) => i ? sh.lineTo(p[0] - c, -(p[1] + zo)) : sh.moveTo(p[0] - c, -(p[1] + zo)));
      const f = new THREE.Mesh(new THREE.ShapeGeometry(sh), new THREE.MeshBasicMaterial({ transparent: true, side: THREE.DoubleSide })); f.rotation.x = -Math.PI / 2; f.position.y = y + 0.02; f.receiveShadow = false; e.m.add(f);
      const ln = new THREE.LineLoop(new THREE.BufferGeometry().setFromPoints(pts.map(p => new THREE.Vector3(p[0] - c, y + 0.05, p[1] + zo))), new THREE.LineBasicMaterial({ transparent: true })); e.m.add(ln); e.key = key;
    }
    const f = e.m.children[0], ln = e.m.children[1]; f.visible = !!fill; if (fill) { f.material.color.set(paleCol(fill)); f.material.opacity = Math.min(1, a); } ln.visible = !!stroke; if (stroke) { ln.material.color.set(stroke); ln.material.opacity = Math.min(1, a); }
  }
  function segMesh() { return grab('seg', () => ({ m: new THREE.Mesh(X.uBox, new THREE.MeshBasicMaterial()) })); }
  function groundPath(pts, y, stroke, lw, frac) {
    let total = 0; const L = []; for (let i = 0; i < pts.length - 1; i++) { const d = Math.hypot(pts[i + 1][0] - pts[i][0], pts[i + 1][1] - pts[i][1]); L.push(d); total += d; } let left = total * frac;
    for (let i = 0; i < pts.length - 1 && left > 0; i++) {
      const u = Math.min(1, left / L[i]); left -= L[i]; const A = mp(pts[i][0], y, pts[i][1]), B = mp(pts[i][0] + (pts[i + 1][0] - pts[i][0]) * u, y, pts[i][1] + (pts[i + 1][1] - pts[i][1]) * u);
      const dx = B[0] - A[0], dz = B[2] - A[2], len = Math.hypot(dx, dz); if (len < 0.01 || len > 500) continue;
      const e = segMesh(); e.m.position.set((A[0] + B[0]) / 2, y + 0.06, (A[2] + B[2]) / 2); e.m.scale.set(len, 0.08, Math.max(0.12, lw * 0.045)); e.m.rotation.set(0, -Math.atan2(dz, dx), 0); e.m.material.color.set(stroke);
    }
  }
  function Line3(a, b, col, lw, al) {
    const A = mp(a[0], a[1], a[2]), B = mp(b[0], b[1], b[2]), dx = B[0] - A[0], dy = B[1] - A[1], dz = B[2] - A[2], len = Math.hypot(dx, dy, dz); if (len < 0.01) return;
    const e = grab('seg', () => ({ m: new THREE.Mesh(X.uBox, new THREE.MeshBasicMaterial()) })); e.m.position.set((A[0] + B[0]) / 2, (A[1] + B[1]) / 2, (A[2] + B[2]) / 2);
    e.m.quaternion.setFromUnitVectors(new THREE.Vector3(1, 0, 0), new THREE.Vector3(dx, dy, dz).normalize()); const th = Math.max(0.06, lw * 0.022); e.m.scale.set(len, th, th); e.m.material.color.set(col);
  }
  function Char(role, x, z, hW, opts, t0, t1, t) { if (t < t0 || (t1 !== undefined && t >= t1)) return; const P = mp(x, 0, z); CAST.push({ role, wx: P[0], wy: 0, wz: P[2], h: hW * 1.2, t0, t1, o: opts }); }
  function S(x, y, z) { const P = mp(x, y, z), v = new THREE.Vector3(P[0], P[1], P[2]); const cz = v.clone().applyMatrix4(camera.matrixWorldInverse).z; if (cz > -0.5) return null; v.project(camera); const dist = camera.position.distanceTo(new THREE.Vector3(P[0], P[1], P[2])); return { x: (v.x * 0.5 + 0.5) * 1920, y: (-v.y * 0.5 + 0.5) * 1080, z: dist, k: 540 / (dist * Math.tan(camera.fov * Math.PI / 360)) }; }
  function beginFrame(t) {
    CAST.length = 0; GROUND = []; ITEMS = []; OVER = []; Object.keys(CNT).forEach(k => CNT[k] = 0);
    applyCamera(t, [], null);
    X.env.position.set(camera.position.x, 0, camera.position.z); X.sky.position.copy(camera.position);
    X.ground.position.set(Math.round(camera.position.x / 6) * 6, 0, Math.round(camera.position.z / 6) * 6);
    X.clouds.forEach(s => { const u = s.userData, a = u.a + t * u.sp; s.position.set(Math.cos(a) * u.r, u.y, Math.sin(a) * u.r); });
    X.sun.position.set(-260, 150, -560);
  }
  function endFrame(t) {
    Object.keys(POOL).forEach(k => { for (let i = CNT[k]; i < POOL[k].length; i++) POOL[k][i].m.visible = false; });
    renderer.render(scene, camera);
    smearPass(t);
    drawCast(t, CAST);
    GROUND.forEach(fn => fn()); OVER.forEach(fn => fn());
    HEADS.forEach(h => { const a = env(t, h[0], h[1], 0.3, 0.3); if (a > 0.01) drawHeadline(h[2], h[3], a, h[4], t, h[0]); });
  }

