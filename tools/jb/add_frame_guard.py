"""1) characters become depth-tested planes INSIDE the 3D scene (props now hide them correctly; no more sprites painted over 3D assets)
   2) automatic framing guard: a per-part table (built from dry runs of the scene) that zooms the camera out just enough to keep every label / card in frame
   3) calmer camera: smaller lateral dolly and flight bulge."""
import pathlib
H = pathlib.Path(__file__).resolve().parent

# ------------------------------------------------------------------ camera shim
p = H / 'shim_cam_jb.js'; s = p.read_text(encoding='utf8')
if '__ADJ' not in s:
    def sub(a, b):
        global s
        assert a in s, a[:70]; s = s.replace(a, b, 1)
    sub("const dl = Math.hypot(v[0] - fx, v[2] - fz) || 1, rx = (v[2] - fz) / dl, rz = -(v[0] - fx) / dl, sh = (0.35 + amp) * 1.8 * Math.sin(t * 0.45 + 0.4);",
        "const dl = Math.hypot(v[0] - fx, v[2] - fz) || 1, rx = (v[2] - fz) / dl, rz = -(v[0] - fx) / dl, sh = (0.2 + 0.6 * amp) * 1.1 * Math.sin(t * 0.45 + 0.4);")
    sub("Math.min(9, L * 0.22) * sg;", "Math.min(6, L * 0.15) * sg;")
    # face weight + framing guard applied after the face blend
    sub("    for (const f of FACES) {\n      const w0", "    let wFace = 0;\n    for (const f of FACES) {\n      const w0")
    sub("w = sm(w0) * sm(w1), P = mp(", "w = sm(w0) * sm(w1); wFace = Math.max(wFace, w); const P = mp(")
    # the loop body continues with 'side = ...' using P; keep structure valid
    sub("      for (let q = 0; q < 7; q++) v[q] = v[q] + (fc[q] - v[q]) * w;\n    }\n    return v;",
        "      for (let q = 0; q < 7; q++) v[q] = v[q] + (fc[q] - v[q]) * w;\n    }\n    window.__faceW = wFace;\n    if (window.__ADJ && !window.__NOADJ) { const A = window.__ADJ, x = Math.max(0, Math.min(A.length - 1.001, t / 0.25)), i0 = Math.floor(x), fa = A[i0] + (A[i0 + 1] - A[i0]) * (x - i0), k = 1 + (fa - 1) * (1 - wFace); v[0] = v[3] + (v[0] - v[3]) * k; v[1] = v[4] + (v[1] - v[4]) * k; v[2] = v[5] + (v[2] - v[5]) * k; }\n    return v;")
    p.write_text(s, encoding='utf8')

# ------------------------------------------------------------------ env shim
p = H / 'shim_env_jb.js'; s = p.read_text(encoding='utf8')
if 'castToScene' not in s:
    code = r"""  // ---- characters as depth-tested planes inside the 3D scene (props hide them correctly), with a contact shadow
  const CS = { pool: [] }, CS_HERO = { jensen: 1, elon: 1, trump: 1, vance: 1, kress: 1, reed: 1, cheung: 1 };
  function csGet(i) {
    if (!CS.pool[i]) {
      const cv = document.createElement('canvas'); cv.width = 640; cv.height = 760; const tex = new THREE.CanvasTexture(cv); tex.anisotropy = 4;
      const m = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), new THREE.MeshBasicMaterial({ map: tex, alphaTest: 0.3, alphaToCoverage: true, side: THREE.DoubleSide, fog: false })); m.renderOrder = 2; scene.add(m);
      const sh = new THREE.Mesh(new THREE.CircleGeometry(1, 24), new THREE.MeshBasicMaterial({ color: 0x0b191e, transparent: true, opacity: 0.26, depthWrite: false, fog: false })); sh.rotation.x = -Math.PI / 2; sh.renderOrder = 1; scene.add(sh);
      CS.pool[i] = { cv, cx: cv.getContext('2d'), tex, m, sh };
    }
    return CS.pool[i];
  }
  function castToScene(t) {
    let n = 0; const K = RigKit.K; camera.updateMatrixWorld();
    CAST.forEach(c => {
      const v = new THREE.Vector3(c.wx, c.wy + c.h * 0.5, c.wz), dist = camera.position.distanceTo(v); if (v.clone().applyMatrix4(camera.matrixWorldInverse).z > -1.2) return;
      const fade = c.t1 === undefined ? 1 : 1 - easeInOutCubic(seg(t, c.t1 - 0.4, c.t1)), g = easeOutBack(seg(t, c.t0, c.t0 + 0.4)) * fade; if (g <= 0.02) return;
      const ppu = 540 / (dist * Math.tan(camera.fov * Math.PI / 360)), minH = (CS_HERO[c.role] ? K.heroMinPx : K.crowdMinPx) * ((c.o && c.o.minScale) || 1), f = Math.max(1, minH / (c.h * ppu * 1.15));
      const scd = Math.max(0.7, Math.min(1.5, c.h * ppu * f / 258 * 0.95)), wpp = c.h / (258 * scd), it = csGet(n++);
      it.cx.clearRect(0, 0, 640, 760); RigKit.draw(it.cx, c.role, 320, 720, scd, c.o || {}, t); it.tex.needsUpdate = true;
      const k = f * g; it.m.scale.set(640 * wpp * k, 760 * wpp * k, 1); it.m.position.set(c.wx, c.wy + 340 * wpp * k, c.wz); it.m.rotation.set(0, Math.atan2(camera.position.x - c.wx, camera.position.z - c.wz), 0); it.m.visible = true;
      it.sh.position.set(c.wx, c.wy + 0.03, c.wz); it.sh.scale.set(c.h * 0.36 * k, c.h * 0.13 * k, 1); it.sh.visible = true;
    });
    for (let i = n; i < CS.pool.length; i++) { CS.pool[i].m.visible = false; CS.pool[i].sh.visible = false; }
  }
  // ---- framing guard: dry-run the scene on a 0.25 s grid, measure how far labels / cards stick out of the safe area, and store a smoothed zoom-out table
  function buildAdj() {
    window.__ADJREADY = true; const dur = __DUR__, N = Math.ceil(dur / 0.25) + 2, raw = new Array(N).fill(1), prevFit = window.__FITON;
    window.__ADJ = null; window.__DRY = true; window.__FITON = true;
    try {
      for (let i = 0; i < N; i++) {
        const t = i * 0.25; renderShots(t); if ((window.__faceW || 0) > 0.25) continue; let need = 1;
        (window.__FIT || []).forEach(o => { if (o.kind === 'char') return; const w = o.x1 - o.x0, h = o.y1 - o.y0, cx = (o.x0 + o.x1) / 2, cy = (o.y0 + o.y1) / 2;
          if (w > 3500 || h > 2500 || Math.abs(cx - 960) > 1.9 * 900 || Math.abs(cy - 490) > 1.9 * 390) return;
          need = Math.max(need, w / 1640, h / 740, Math.max(Math.abs(o.x0 - 960), Math.abs(o.x1 - 960)) / 900, Math.max(Math.abs(o.y0 - 490), Math.abs(o.y1 - 490)) / 390); });
        raw[i] = Math.min(1.7, need);
      }
    } finally { window.__DRY = false; window.__FITON = prevFit; }
    const dil = raw.map((v, i) => { let m = 1; for (let j = Math.max(0, i - 3); j <= Math.min(N - 1, i + 3); j++) m = Math.max(m, raw[j]); return m; });
    window.__ADJ = dil.map((v, i) => { let a = 0, c = 0; for (let j = Math.max(0, i - 2); j <= Math.min(N - 1, i + 2); j++) { a += dil[j]; c++; } return a / c; });
  }
"""
    a = "  function endFrame(t) {\n"
    assert a in s; s = s.replace(a, code + a, 1)
    b = "    r3End();\n    renderer.render(scene, camera);"
    assert b in s; s = s.replace(b, "    r3End();\n    if (window.__DRY) return;\n    castToScene(t);\n    renderer.render(scene, camera);", 1)
    c = "    drawCast(t, CAST);\n"
    assert c in s; s = s.replace(c, "", 1)
    p.write_text(s, encoding='utf8')

# ------------------------------------------------------------------ build script
b = H / 'build_jb.py'; t = b.read_text(encoding='utf8')
if '__DUR__' not in t:
    a = ".replace('__RIG3D__', json.dumps(cfg.get('rig3d', [])))"
    assert a in t; t = t.replace(a, a + ".replace('__DUR__', str(cfg['dur']))", 1)
    o = 'function renderScene(t) { if (!HAS_THREE) return; renderShots(t); }'
    assert o in t; t = t.replace(o, 'function renderScene(t) { if (!HAS_THREE) return; if (!window.__ADJREADY) buildAdj(); renderShots(t); }', 1)
    b.write_text(t, encoding='utf8')
print('ok')
