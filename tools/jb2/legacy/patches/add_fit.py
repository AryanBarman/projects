import pathlib
H = pathlib.Path(__file__).resolve().parent
p = H / 'shim_env_jb.js'; s = p.read_text(encoding='utf8')
if 'fitRec' in s:
    print('already'); raise SystemExit
helper = """  // ---- frame-fit log (read by tools/jb/fitcheck.js): screen rect of every label / panel / character this frame
  const _fv = new THREE.Vector3(), _fr = new THREE.Vector3(), _fu = new THREE.Vector3();
  function fitProj(x, y, z) { _fv.set(x, y, z).project(camera); return [(_fv.x * 0.5 + 0.5) * 1920, (-_fv.y * 0.5 + 0.5) * 1080, _fv.z]; }
  function fitRec(name, kind, m) {
    if (!window.__FITON || m.material.opacity < 0.3) return; camera.updateMatrixWorld();
    _fr.setFromMatrixColumn(camera.matrixWorld, 0); _fu.setFromMatrixColumn(camera.matrixWorld, 1);
    const hw = m.scale.x / 2, hh = m.scale.y / 2, c = m.position, xs = [], ys = []; let behind = false;
    [[-1, -1], [1, -1], [1, 1], [-1, 1]].forEach(q => { const px = c.x + _fr.x * hw * q[0] + _fu.x * hh * q[1], py = c.y + _fr.y * hw * q[0] + _fu.y * hh * q[1], pz = c.z + _fr.z * hw * q[0] + _fu.z * hh * q[1], r = fitProj(px, py, pz); if (r[2] > 1) behind = true; xs.push(r[0]); ys.push(r[1]); });
    if (behind) return; (window.__FIT = window.__FIT || []).push({ name: String(name || kind).slice(0, 40), kind, x0: Math.min(...xs), x1: Math.max(...xs), y0: Math.min(...ys), y1: Math.max(...ys) });
  }
"""
a0 = "  function Label(text, x, y, z, w, h, bg, fg, o) {"
assert a0 in s; s = s.replace(a0, helper + a0, 1)
a = "e.m.scale.set(w * sc, h * sc, 1); billboard(e.m, o.rot);\n  }"
assert a in s; s = s.replace(a, "e.m.scale.set(w * sc, h * sc, 1); billboard(e.m, o.rot); fitRec(text, 'label', e.m);\n  }", 1)
b = "e.m.scale.set(w * sx, h * sy, 1); billboard(e.m, o.rot);\n  }"
assert b in s; s = s.replace(b, "e.m.scale.set(w * sx, h * sy, 1); billboard(e.m, o.rot); fitRec(window.__fitName || 'panel', 'panel', e.m); window.__fitName = null;\n  }", 1)
c = "  function Card(x, y, z, w, h, o, t) {\n"
assert c in s; s = s.replace(c, c + "    window.__fitName = (o.text || o.head || o.tag || o.kind || 'card');\n", 1)
d = "  function Char(role, x, z, hW, opts, t0, t1, t) { if (t < t0 || (t1 !== undefined && t >= t1)) return; const P = mp(x, 0, z);"
assert d in s
s = s.replace(d, d + " if (window.__FITON) { camera.updateMatrixWorld(); const f = fitProj(P[0], 0, P[2]), hd = fitProj(P[0], hW * 1.2, P[2]); if (f[2] < 1 && hd[2] < 1) { const hw = Math.abs(f[1] - hd[1]) * 0.25; (window.__FIT = window.__FIT || []).push({ name: 'char:' + role, kind: 'char', x0: f[0] - hw, x1: f[0] + hw, y0: Math.min(f[1], hd[1]), y1: Math.max(f[1], hd[1]) }); } }", 1)
e = "  function beginFrame(t) {\n"
assert e in s; s = s.replace(e, e + "    window.__FIT = [];\n", 1)
p.write_text(s, encoding='utf8'); print('hook added')
