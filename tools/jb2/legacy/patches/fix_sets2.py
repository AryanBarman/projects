import pathlib
H = pathlib.Path(__file__).resolve().parent
R = [("X.applySets = function (m) { let bi = 0, bd = 1e9; LAYOUT.forEach((L, k) => { const d = Math.hypot(camera.position.x - L[0], camera.position.z - L[1]); X.sets[k].visible = d < 130; if (d < bd) { bd = d; bi = k; } });",
 "X.applySets = function (m) { let bi = 0, bd = 1e9; const dr = camera.getWorldDirection(new THREE.Vector3()), fx = camera.position.x + dr.x * 22, fz = camera.position.z + dr.z * 22; LAYOUT.forEach((L, k) => { const d = Math.hypot(fx - L[0], fz - L[1]); if (d < bd) { bd = d; bi = k; } }); X.sets.forEach((g, k) => g.visible = k === bi);"),
 ("B(G, 120, 7, 0.8, 0, 0, -22, SM('#8A6A4A')); B(G, 120, 13, 0.8, 0, 7, -22, SM('#E4D8C2'));", "B(G, 64, 7, 0.8, 0, 0, -22, SM('#8A6A4A')); B(G, 64, 13, 0.8, 0, 7, -22, SM('#E4D8C2'));"),
 ("for (let i = -3; i <= 3; i++) { B(G, 9, 8, 0.4, i * 15,", "for (let i = -2; i <= 2; i++) { B(G, 9, 8, 0.4, i * 15,"),
 ("B(G, 120, 0.5, 0.9, 0, 19.6, -21.8, SM('#76B900'));", "B(G, 64, 0.5, 0.9, 0, 19.6, -21.8, SM('#76B900'));"),
 ("B(G, 120, 20, 0.8, 0, 0, -22, SM('#16212E'));", "B(G, 64, 20, 0.8, 0, 0, -22, SM('#16212E'));"),
 ("for (let r = 0; r < 2; r++) for (let c = 0; c < 6; c++) { const x = -45 + c * 18,", "for (let r = 0; r < 2; r++) for (let c = 0; c < 4; c++) { const x = -27 + c * 18,"),
]
for f in ('shim_env_jb.js', 'shim_sets.txt'):
    p = H / f; s = p.read_text(encoding='utf8')
    for a, b in R:
        assert a in s, (f, a[:60]); s = s.replace(a, b)
    p.write_text(s, encoding='utf8')
print('ok')
