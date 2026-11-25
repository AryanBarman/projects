"""Colour pass: make the world vivid again (less haze, less grey mood tint, richer sets, stronger key light, lighter vignette). Idempotent."""
import pathlib, re
H = pathlib.Path(__file__).resolve().parent
for fn in ('shim_env_jb.js', 'shim_sets.txt'):
    p = H / fn
    if not p.exists(): continue
    s = p.read_text(encoding='utf8'); o = s
    def sub(a, b):
        global s
        if a in s: s = s.replace(a, b)
    sub("scene.fog = new THREE.Fog(0xC4E3F1, 190, 760)", "scene.fog = new THREE.Fog(0xBFE0F2, 320, 1000)")
    sub("tense: { t: [0.74, 0.8, 0.88], f: 0xAAB8C2, h: 0.82, sun: 0xDDE6EE }", "tense: { t: [0.9, 0.92, 1.0], f: 0xB4CEE0, h: 0.95, sun: 0xFFE8D0 }")
    sub("dusk: { t: [0.95, 0.66, 0.68], f: 0xD6A9A6, h: 0.82, sun: 0xFF9A6A }", "dusk: { t: [1.0, 0.76, 0.74], f: 0xE6A9A0, h: 0.95, sun: 0xFF9A6A }")
    sub("night: { t: [0.3, 0.36, 0.58], f: 0x1C2744, h: 0.55, sun: 0x8FA2D8 }", "night: { t: [0.5, 0.56, 0.86], f: 0x2A3D6E, h: 0.8, sun: 0xA8B8F0 }")
    sub("X.ground.material.color.setRGB(m.t[0] * 0.8, m.t[1] * 0.8, m.t[2] * 0.82);", "X.ground.material.color.setRGB(m.t[0] * 0.95, m.t[1] * 0.95, m.t[2] * 0.97);")
    sub("hemiLight.intensity = 0.86 * m.h; dirLight.intensity = 1.15 * m.h;", "hemiLight.intensity = 0.95 * m.h; dirLight.intensity = 1.4 * m.h;")
    sub("vg.addColorStop(1, 'rgba(11,25,30,0.32)')", "vg.addColorStop(1, 'rgba(11,25,30,0.2)')")
    sub("const STAGE = { plaza: '#5C86A6', office: '#4F6F9A', mall: '#C2B48C', campus: '#6F8FA0', texas: '#C79A62', market: '#2E4C70' };", "const STAGE = { plaza: '#4C86B8', office: '#4468A8', mall: '#D6B97A', campus: '#4F94AE', texas: '#D6954F', market: '#27518A' };")
    sub("'#CFCFCF', {", "'#E6E6E6', {")
    # saturate sky / set colours (HSL) once
    if 'satBoost' not in s and fn == 'shim_env_jb.js':
        s = s.replace("  const STAGE = {", "  function satBoost(c, k) { const h = {}; c.getHSL(h); c.setHSL(h.h, Math.min(1, h.s * k), h.l); return c; }\n  const STAGE = {", 1)
        s = s.replace("X.setMats.forEach(s => s.m.color.setRGB(s.base.r * m.t[0], s.base.g * m.t[1], s.base.b * m.t[2]));", "X.setMats.forEach(s => { s.m.color.setRGB(s.base.r * m.t[0], s.base.g * m.t[1], s.base.b * m.t[2]); if (!s.sat) { s.sat = 1; satBoost(s.base, 1.35); } });")
    if s != o: p.write_text(s, encoding='utf8'); print(fn, 'vivid')
