import pathlib
H = pathlib.Path(__file__).resolve().parent
def sub(f, a, b):
    p = H / f; s = p.read_text(encoding='utf8'); assert a in s, (f, a[:70]); p.write_text(s.replace(a, b), encoding='utf8')
F = 'shim_env_jb.js'

# ---- grey slabs become a coloured stage per setting (grey/near-grey pads only; coloured pads keep their colour)
sub(F, "f.material.color.set(deepCol(paleCol(fill)));", "f.material.color.set(stageCol(fill, pts));")
sub(F, "  function deepCol(c) {", """  const STAGE = { plaza: '#5C86A6', office: '#4F6F9A', mall: '#C2B48C', campus: '#6F8FA0', texas: '#C79A62', market: '#2E4C70' };
  function stageCol(fill, pts) { const k = new THREE.Color(paleCol(fill)), h = {}; k.getHSL(h); if (h.s < 0.3 && h.l > 0.45 && X.setKinds) return new THREE.Color(STAGE[X.setKinds[stIdx(pts[0][0])]] || STAGE.plaza); return deepCol(paleCol(fill)); }
  function deepCol(c) {""")
sub(F, "const SETS = __SETS__; X.sets = [];", "const SETS = __SETS__; X.setKinds = SETS; X.sets = [];")

# ---- richer sky, clearer air (less fog wash), deeper skyline and trees
sub(F, "gr.addColorStop(0, '#2F78A8'); gr.addColorStop(0.35, '#6DB4D4'); gr.addColorStop(0.55, '#B7DDE8'); gr.addColorStop(0.62, '#D8EAF0'); gr.addColorStop(1, '#D8EAF0');",
        "gr.addColorStop(0, '#1B5FA3'); gr.addColorStop(0.35, '#3F9AD6'); gr.addColorStop(0.55, '#8FCBEA'); gr.addColorStop(0.62, '#C4E3F1'); gr.addColorStop(1, '#C4E3F1');")
sub(F, "scene.fog = new THREE.Fog(0xD8EAF0, 110, 520); scene.background = new THREE.Color(0xD8EAF0);", "scene.fog = new THREE.Fog(0xC4E3F1, 190, 760); scene.background = new THREE.Color(0xC4E3F1);")
sub(F, "day: { t: [1, 1, 1], f: 0xD8EAF0,", "day: { t: [1, 1, 1], f: 0xC4E3F1,")
sub(F, "base: '#7E9FB0', win: '#C9E3EC'", "base: '#5C84A0', win: '#BFE0EC'")
sub(F, "base: '#98B7C5', win: '#D8ECF2'", "base: '#7497AE', win: '#CFE6EF'")
sub(F, "base: '#B4CDD7', win: '#E6F3F7'", "base: '#8FB0C3', win: '#DDEEF4'")
sub(F, "new THREE.MeshStandardMaterial({ color: 0x4A8F66, roughness: 0.9 })", "new THREE.MeshStandardMaterial({ color: 0x3A8758, roughness: 0.9 })")
print('ok')
