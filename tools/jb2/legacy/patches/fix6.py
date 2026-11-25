import pathlib
H = pathlib.Path(__file__).resolve().parent
def sub(f, a, b):
    p = H / f; s = p.read_text(encoding='utf8'); assert a in s, (f, a[:60]); p.write_text(s.replace(a, b), encoding='utf8')
sub('shim_env_jb.js', "f.material.color.set(paleCol(fill));", "f.material.color.set(deepCol(paleCol(fill)));")
sub('shim_env_jb.js', "  function groundPoly(pts, y, fill, stroke, lw, a) {", "  function deepCol(c) { const k = new THREE.Color(c), h = {}; k.getHSL(h); k.setHSL(h.h, Math.min(1, h.s * 1.35 + 0.04), Math.max(0.2, h.l * 0.86)); return k; }\n  function groundPoly(pts, y, fill, stroke, lw, a) {")
sub('a2p1_scene.js', "{ const g = seg(t, 15.5, 17.8); if (g > 0) {", "{ const g = seg(t, 15.5, 17.8); if (g > 0 && t < 18.3) {")
