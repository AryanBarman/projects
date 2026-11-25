import pathlib
H = pathlib.Path(__file__).resolve().parent
def sub(f, a, b):
    p = H / f; s = p.read_text(encoding='utf8'); assert a in s, (f, a[:60]); p.write_text(s.replace(a, b), encoding='utf8')

# --- colour punch: more light contrast, deeper ground, less wash on panels, slightly stronger vignette
sub('shim_env_jb.js', "hemiLight.intensity = m.h; dirLight.intensity = 0.9 * m.h;", "hemiLight.intensity = 0.86 * m.h; dirLight.intensity = 1.15 * m.h;")
sub('shim_env_jb.js', "g.fillStyle = '#B4C9D0'; g.fillRect(0, 0, 256, 256);", "g.fillStyle = '#9DB7C1'; g.fillRect(0, 0, 256, 256);")
sub('shim_env_jb.js', "const f = 0.6; return 'rgb('", "const f = 0.3; return 'rgb('")
sub('shim_env_jb.js', "vg.addColorStop(1, 'rgba(11,25,30,0.24)')", "vg.addColorStop(1, 'rgba(11,25,30,0.32)')")

# --- 'plaza' setting: a dressed city square (deeper tiles, inlay ring, lamp posts, benches, planters) so abstract beats are never an empty pale floor
plaza = """        plaza: G => { floor(G, 120, 90, SM('#fff', { map: plazaTex2 })).position.z = 0; const ring = new THREE.Mesh(new THREE.RingGeometry(15, 17.5, 48), SM('#E2B857')); ring.rotation.x = -Math.PI / 2; ring.position.set(0, 0.01, 0); G.add(ring);
          const ring2 = new THREE.Mesh(new THREE.RingGeometry(8, 8.6, 48), SM('#76B900')); ring2.rotation.x = -Math.PI / 2; ring2.position.set(0, 0.011, 0); G.add(ring2);
          [-30, 30].forEach(x => [-14, 14].forEach(z => { B(G, 0.4, 9, 0.4, x, 0, z, SM('#4A5A66')); const l = new THREE.Mesh(new THREE.SphereGeometry(0.9, 10, 8), basic('#FFF1B8')); l.position.set(x, 9.6, z); G.add(l); }));
          [-22, 0, 22].forEach(x => { B(G, 6, 0.7, 1.6, x, 0.9, -20, SM('#8A6A4A')); B(G, 6, 1.6, 0.4, x, 1.6, -20.8, SM('#8A6A4A')); B(G, 0.4, 0.9, 1.4, x - 2.7, 0, -20, SM('#4A5A66')); B(G, 0.4, 0.9, 1.4, x + 2.7, 0, -20, SM('#4A5A66')); });
          [-36, -11, 11, 36].forEach(x => { B(G, 2.4, 1.6, 2.4, x, 0, -14, SM('#C98B5A')); const m = new THREE.Mesh(new THREE.SphereGeometry(2, 10, 8), SM('#4FA36A')); m.position.set(x, 3.6, -14); G.add(m); }); },
"""
sub('shim_env_jb.js', "      const kinds = {\n", "      const plazaTex2 = ctex(g => { g.fillStyle = '#8FAAB7'; g.fillRect(0, 0, 256, 256); g.fillStyle = 'rgba(255,255,255,0.10)'; g.fillRect(0, 0, 128, 128); g.fillRect(128, 128, 128, 128); g.strokeStyle = 'rgba(30,60,75,0.35)'; g.lineWidth = 3; g.strokeRect(1, 1, 254, 254); }, 10);\n      const kinds = {\n" + plaza)

# --- empty beat: 'There was just one problem' gets a spreading red fracture across the floor
sub('a2p1_scene.js', "      pop('ONE PROBLEM', 26, 6.4, 3, 6.2, 1.4,", "      { const g = seg(t, 15.5, 17.8); if (g > 0) { const P = [[8, 0.06, 6], [12, 0.06, 3.5], [15.5, 0.06, 6.5], [19, 0.06, 3], [22.5, 0.06, 6], [26, 0.06, 2.5], [29.5, 0.06, 6], [33, 0.06, 3.5], [37, 0.06, 6]], n = Math.floor(g * (P.length - 1)); for (let i = 0; i < n; i++) Line3(P[i], P[i + 1], '#C42631', 15, 1); } }\n      pop('ONE PROBLEM', 26, 6.4, 3, 6.2, 1.4,")
print('ok')
