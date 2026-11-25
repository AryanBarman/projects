"""One-off: derive tools/jb/shim_env_jb.js (richer world: plaza ground, windowed skyline rings, trees, mood tints) from tools/shim_env.js."""
import pathlib, json
T = pathlib.Path(__file__).resolve().parent.parent
s = (T / 'shim_env.js').read_text(encoding='utf8')

# ---- ground
a = s.index("    { // pale gridded ground"); b = s.index("    { // distant skyline")
ground = """    { // richer ground: speckled plaza tiles (6 units per tile so the camera-follow snap never shows)
      const c = document.createElement('canvas'); c.width = c.height = 256; const g = c.getContext('2d');
      g.fillStyle = '#B4C9D0'; g.fillRect(0, 0, 256, 256);
      for (let i = 0; i < 900; i++) { const v = 150 + Math.floor(hash(i * 3 + 7) * 60); g.fillStyle = 'rgba(' + (v - 8) + ',' + v + ',' + (v + 6) + ',0.35)'; g.fillRect(hash(i * 5 + 1) * 256, hash(i * 7 + 2) * 256, 2 + hash(i * 11) * 5, 2 + hash(i * 13) * 5); }
      g.strokeStyle = 'rgba(30,80,100,0.30)'; g.lineWidth = 3; g.strokeRect(1.5, 1.5, 253, 253);
      g.strokeStyle = 'rgba(255,255,255,0.35)'; g.lineWidth = 2; g.strokeRect(5, 5, 246, 246);
      const tex = new THREE.CanvasTexture(c); tex.wrapS = tex.wrapT = THREE.RepeatWrapping; tex.repeat.set(250, 250); tex.anisotropy = 8;
      X.ground = new THREE.Mesh(new THREE.PlaneGeometry(1500, 1500), new THREE.MeshStandardMaterial({ map: tex, roughness: 0.95 }));
      X.ground.rotation.x = -Math.PI / 2; X.ground.receiveShadow = true; scene.add(X.ground);
    }
"""
s = s[:a] + ground + s[b:]

# ---- skyline rings with lit windows
a = s.index("      for (let i = 0; i < 90; i++) { const a = i / 90 * TAU"); b = s.index("      for (let i = 0; i < 14; i++) { const a = (i / 14) * TAU + 0.2")
sky = """      X.bMats = [];
      const winTex = (base, win, cols, rows) => { const wc = document.createElement('canvas'); wc.width = 16 * cols; wc.height = 16 * rows; const wg = wc.getContext('2d'); wg.fillStyle = base; wg.fillRect(0, 0, wc.width, wc.height); for (let r = 0; r < rows; r++) for (let q = 0; q < cols; q++) { wg.fillStyle = hash(r * 31 + q * 17 + cols) > 0.28 ? win : base; wg.fillRect(q * 16 + 4, r * 16 + 4, 8, 9); } const tx = new THREE.CanvasTexture(wc); tx.magFilter = THREE.NearestFilter; return tx; };
      const rings = [{ n: 70, r0: 190, r1: 240, base: '#7E9FB0', win: '#C9E3EC', hmax: 46 }, { n: 90, r0: 300, r1: 380, base: '#98B7C5', win: '#D8ECF2', hmax: 80 }, { n: 90, r0: 450, r1: 540, base: '#B4CDD7', win: '#E6F3F7', hmax: 110 }];
      rings.forEach((R, ri) => { const tx = winTex(R.base, R.win, 4, 10); for (let i = 0; i < R.n; i++) { const a = i / R.n * TAU + hash(i * 3 + ri) * 0.05, r = R.r0 + hash(i * 7 + 2 + ri) * (R.r1 - R.r0), h = 10 + hash(i * 11 + 3 + ri) * R.hmax * (0.35 + 0.65 * hash(i * 13 + 5 + ri)), w = 9 + hash(i * 5 + 4 + ri) * 16, d = 9 + hash(i * 17 + 5 + ri) * 12;
        const t2 = tx.clone(); t2.needsUpdate = true; t2.wrapS = t2.wrapT = THREE.RepeatWrapping; t2.repeat.set(Math.max(1, Math.round(w / 6)) / 4, Math.max(1, Math.round(h / 7)) / 10);
        const mat = new THREE.MeshBasicMaterial({ map: t2 }); X.bMats.push(mat);
        const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat); m.position.set(Math.cos(a) * r, h / 2, Math.sin(a) * r); m.rotation.y = -a; sk.add(m);
        if (hash(i * 19 + ri) > 0.8) { const sp = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 1.2, 14, 6), new THREE.MeshBasicMaterial({ color: 0x6F8FA0 })); sp.position.set(Math.cos(a) * r, h + 7, Math.sin(a) * r); sk.add(sp); } } });
"""
s = s[:a] + sky + s[b:]

# ---- roadside trees (instanced), before the world layer
marker = "    // ---- world layer: pooled meshes driven each frame by the scene code"
trees = """    { // roadside trees flanking the station corridor: gives depth parallax while the camera flies
      const N = 260, tr = new THREE.InstancedMesh(new THREE.ConeGeometry(2.3, 6.5, 7), new THREE.MeshStandardMaterial({ color: 0x4A8F66, roughness: 0.9 }), N), tk = new THREE.InstancedMesh(new THREE.CylinderGeometry(0.35, 0.45, 2.4, 6), new THREE.MeshStandardMaterial({ color: 0x7A5B3F }), N), d = new THREE.Object3D();
      for (let i = 0; i < N; i++) { const side = i % 2 ? 1 : -1, x = side * (46 + hash(i * 3 + 9) * 34) + (hash(i * 5) - 0.5) * 6, z = 70 - Math.floor(i / 2) * 3.4 - hash(i * 7 + 1) * 2, sc = 0.8 + hash(i * 11 + 2) * 0.8;
        d.position.set(x, 1.2 * sc + 3.25 * sc, z); d.scale.set(sc, sc, sc); d.updateMatrix(); tr.setMatrixAt(i, d.matrix); d.position.set(x, 1.2 * sc, z); d.updateMatrix(); tk.setMatrixAt(i, d.matrix); }
      X.trees = tr; X.trunks = tk; scene.add(tr); scene.add(tk);
    }
"""
assert marker in s
s = s.replace(marker, trees + marker, 1)

# ---- mood
mood = """  // ---- mood: tints sky, fog, ground, skyline and sun over time (day / warm / dusk / night / tense), lerped between track keys
  const MOODS = { day: { t: [1, 1, 1], f: 0xD8EAF0, h: 1.0, sun: 0xFFFFFF }, warm: { t: [1, 0.9, 0.76], f: 0xF2DFC4, h: 0.98, sun: 0xFFD9A0 }, dusk: { t: [0.95, 0.66, 0.68], f: 0xD6A9A6, h: 0.82, sun: 0xFF9A6A }, night: { t: [0.3, 0.36, 0.58], f: 0x1C2744, h: 0.55, sun: 0x8FA2D8 }, tense: { t: [0.74, 0.8, 0.88], f: 0xAAB8C2, h: 0.82, sun: 0xDDE6EE } };
  const MOOD_TRACK = __MOOD__;
  const _mc1 = new THREE.Color(), _mc2 = new THREE.Color();
  function moodAt(t) { let i = 0; while (i < MOOD_TRACK.length - 1 && t >= MOOD_TRACK[i + 1][0]) i++; const cur = MOODS[MOOD_TRACK[i][1]], prev = MOODS[MOOD_TRACK[Math.max(0, i - 1)][1]], u = i === 0 ? 1 : Math.max(0, Math.min(1, (t - MOOD_TRACK[i][0]) / 1.4)), k = u * u * (3 - 2 * u); return { t: cur.t.map((v, c) => prev.t[c] + (v - prev.t[c]) * k), f: _mc1.set(prev.f).lerp(_mc2.set(cur.f), k).getHex(), h: prev.h + (cur.h - prev.h) * k, sun: _mc1.set(prev.sun).lerp(_mc2.set(cur.sun), k).getHex() }; }
  function applyMood(t) {
    const m = moodAt(t); scene.fog.color.setHex(m.f); scene.background.setHex(m.f);
    X.sky.material.color.setRGB(m.t[0], m.t[1], m.t[2]); X.ground.material.color.setRGB(m.t[0], m.t[1], m.t[2]);
    X.bMats.forEach(b => b.color.setRGB(Math.min(1, m.t[0] * 1.05), Math.min(1, m.t[1] * 1.05), Math.min(1, m.t[2] * 1.05)));
    X.sun.material.color.setHex(m.sun); hemiLight.intensity = m.h; dirLight.intensity = 0.9 * m.h;
  }
  function beginFrame(t) {
    applyMood(t);"""
assert "  function beginFrame(t) {" in s
s = s.replace("  function beginFrame(t) {", mood, 1)
# the corridor of trees follows the camera along x in steps of 90 so it never ends
a1 = "    X.sun.position.set(-260, 150, -560);"
assert a1 in s
s = s.replace(a1, a1 + "\n    if (X.trees) { const ox = Math.round(camera.position.x / 90) * 90; X.trees.position.x = ox; X.trunks.position.x = ox; }", 1)
(T / 'jb' / 'shim_env_jb.js').write_text(s, encoding='utf8')

b = (T / 'jb' / 'build_jb.py').read_text(encoding='utf8')
b = b.replace("env = open(T / 'shim_env.js', encoding='utf8').read()", "env = open(H / 'shim_env_jb.js', encoding='utf8').read().replace('__MOOD__', json.dumps(cfg.get('mood', [[0, 'day']])))")
(T / 'jb' / 'build_jb.py').write_text(b, encoding='utf8')
c = json.load(open(T / 'jb' / 'cfg_a1p1.json', encoding='utf8')); c['mood'] = [[0, 'tense'], [3.72, 'day'], [9.9, 'warm'], [15.96, 'dusk']]
json.dump(c, open(T / 'jb' / 'cfg_a1p1.json', 'w', encoding='utf8'), indent=1)
print('ok', len(s))
