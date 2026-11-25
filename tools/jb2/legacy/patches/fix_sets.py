import pathlib
H = pathlib.Path(__file__).resolve().parent
R = [("m.position.set(0, 0, 0); m.receiveShadow = true; mat.polygonOffset = true; mat.polygonOffsetFactor = -1; mat.polygonOffsetUnits = -1; G.add(m);", "m.position.set(0, 0.003, 0); m.receiveShadow = true; G.add(m);"),
 ("B(G, 84, 7, 0.8, 0, 0, -13, SM('#8A6A4A')); B(G, 84, 11, 0.8, 0, 7, -13, SM('#E4D8C2'));", "B(G, 120, 7, 0.8, 0, 0, -22, SM('#8A6A4A')); B(G, 120, 13, 0.8, 0, 7, -22, SM('#E4D8C2'));"),
 ("B(G, 9, 8, 0.4, i * 11, 6.5, -12.4, basic('#BFE3F2')); B(G, 9.6, 0.5, 0.6, i * 11, 6.2, -12.2, SM('#F4F1EA')); B(G, 0.5, 8.6, 0.6, i * 11 + 5.5, 6.3, -12.2, SM('#F4F1EA'));", "B(G, 9, 8, 0.4, i * 15, 8, -21.4, basic('#BFE3F2')); B(G, 9.6, 0.5, 0.6, i * 15, 7.7, -21.2, SM('#F4F1EA')); B(G, 0.5, 8.6, 0.6, i * 15 + 7.5, 7.8, -21.2, SM('#F4F1EA'));"),
 ("for (let i = -3; i <= 3; i++) { B(G, 9, 8", "for (let i = -3; i <= 3; i++) { B(G, 9, 8"),
 ("B(G, 84, 0.5, 0.9, 0, 15.6, -12.8, SM('#76B900'));", "B(G, 120, 0.5, 0.9, 0, 19.6, -21.8, SM('#76B900'));"),
 ("[-24, 24].forEach(x => { B(G, 1.6, 1.4, 1.6, x, 0, -9, SM('#C9A27A')); const m = new THREE.Mesh(new THREE.SphereGeometry(1.7, 10, 8), SM('#5FA86A')); m.position.set(x, 3.2, -9); G.add(m); }); },", "[-40, 40].forEach(x => { B(G, 1.6, 1.4, 1.6, x, 0, -18, SM('#C9A27A')); const m = new THREE.Mesh(new THREE.SphereGeometry(1.7, 10, 8), SM('#5FA86A')); m.position.set(x, 3.2, -18); G.add(m); }); },"),
 ("tree(G, i * 11 + 4, 18, 0.9, '#6FB36A'); }", "}"),
 ("for (let i = -5; i <= 5; i++) tree(G, i * 12, 22, 0.8, '#6FB36A'); },", "for (let i = -5; i <= 5; i++) tree(G, i * 12, -34, 0.9, '#6FB36A'); },"),
 ("B(G, 0.4, 16, 0.4, x, 0, -24, SM('#6B5238')); B(G, 6, 0.3, 0.3, x, 14, -24, SM('#6B5238'));", "B(G, 0.4, 16, 0.4, x, 0, -46, SM('#6B5238')); B(G, 6, 0.3, 0.3, x, 14, -46, SM('#6B5238'));"),
 ("const x = -42 + i * 11 + hash(i) * 4, z = -14 - hash(i * 3) * 8;", "const x = -42 + i * 11 + hash(i) * 4, z = -26 - hash(i * 3) * 8;"),
 ("B(G, 84, 18, 0.8, 0, 0, -13, SM('#16212E'));", "B(G, 120, 20, 0.8, 0, 0, -22, SM('#16212E'));"),
 ("const x = -37 + c * 14.8, y = 1.2 + r * 8.2; B(G, 13, 7, 0.3, x, y, -12.4, basic('#0B141D'));", "const x = -45 + c * 18, y = 2 + r * 9; B(G, 15, 8, 0.3, x, y, -21.4, basic('#0B141D'));"),
 ("B(G, 0.7, 0.5 + Math.abs(v) * 4, 0.2, x - 5.4 + k * 1.3, y + 0.8, -12.2,", "B(G, 0.8, 0.5 + Math.abs(v) * 4.5, 0.2, x - 6.4 + k * 1.5, y + 0.8, -21.2,"),
]
for f in ('shim_env_jb.js', 'shim_sets.txt'):
    p = H / f; s = p.read_text(encoding='utf8')
    for a, b in R:
        if a == b: continue
        assert a in s, (f, a[:50]); s = s.replace(a, b)
    p.write_text(s, encoding='utf8')
print('ok')
