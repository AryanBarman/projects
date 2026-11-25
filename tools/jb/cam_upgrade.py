import pathlib, json
H = pathlib.Path(__file__).resolve().parent

# ---------------------------------------------------------------- camera shim
p = H / 'shim_cam_jb.js'; s = p.read_text(encoding='utf8')
if '__FACES__' not in s:
    def sub(a, b):
        global s
        assert a in s, a[:60]; s = s.replace(a, b, 1)
    sub("  const CAM_KEYS = [];", "  const FACES = __FACES__;   // [[t0, t1, [x, y, z] head point in scene coords, side(+1/-1)], ...] face close-ups\n  const CAM_KEYS = [];")
    # stronger push / pull, slightly closer flights
    sub("Math.max(DMIN * 0.7, prev.Dh * 0.72) : Math.min(DMAX * 1.35, prev.Dh * 1.6);", "Math.max(DMIN * 0.55, prev.Dh * 0.6) : Math.min(DMAX * 1.35, prev.Dh * 1.7);")
    sub("ty === 'push' ? prev.fov - 7 : prev.fov + 5;", "ty === 'push' ? prev.fov - 9 : prev.fov + 6;")
    sub("Dh = DMIN + (DMAX - DMIN) * ORB_DST[j];", "Dh = (DMIN + (DMAX - DMIN) * ORB_DST[j]) * 0.86;")
    # fly = curved crane path with a small whoosh (fov widens mid-flight)
    old = "      const k = b.type === 'fly' ? Math.min(1, (t - a.t) / Math.min(1.1, dt * 0.6)) : u, e = k * k * k * (k * (k * 6 - 15) + 10);\n      return a.v.map((x, c) => x + (b.v[c] - x) * e);"
    new = """      const k = b.type === 'fly' ? Math.min(1, (t - a.t) / Math.min(1.5, dt * 0.7)) : u, e = k * k * k * (k * (k * 6 - 15) + 10), r = a.v.map((x, c) => x + (b.v[c] - x) * e);
      if (b.type === 'fly') { const dx = b.v[0] - a.v[0], dz = b.v[2] - a.v[2], L = Math.hypot(dx, dz) || 1, sg = (Math.round(b.t * 10) % 2) ? 1 : -1, bu = Math.sin(Math.PI * e) * Math.min(9, L * 0.22) * sg; r[0] += (-dz / L) * bu; r[2] += (dx / L) * bu; r[1] += Math.sin(Math.PI * e) * 2.6; r[6] += Math.sin(Math.PI * e) * 5; }
      return r;"""
    sub(old, new)
    sub("const AMP = { auto: 1, fly: 0.45, hold: 0.3, arc: 0.1, push: 0, pull: 0 };", "const AMP = { auto: 1, fly: 0.45, hold: 0.9, arc: 0.4, push: 0.35, pull: 0.35 };")
    # slow dolly on every shot + face close-up blend
    old2 = "    v[0] = fx + dx * c - dz * s; v[2] = fz + dx * s + dz * c; v[1] += amp * 0.55 * Math.sin(t * 0.52 + 0.8); v[6] += amp * 1.2 * Math.sin(t * 0.43);\n    return v;"
    new2 = """    v[0] = fx + dx * c - dz * s; v[2] = fz + dx * s + dz * c; v[1] += amp * 0.55 * Math.sin(t * 0.52 + 0.8); v[6] += amp * 1.2 * Math.sin(t * 0.43);
    { const dl = Math.hypot(v[0] - fx, v[2] - fz) || 1, rx = (v[2] - fz) / dl, rz = -(v[0] - fx) / dl, sh = (0.35 + amp) * 1.8 * Math.sin(t * 0.45 + 0.4); v[0] += rx * sh; v[2] += rz * sh; }   // lateral dolly
    for (const f of FACES) {
      const w0 = (t - f[0]) / 0.7, w1 = (f[1] - t) / 0.7; if (w0 <= 0 || w1 <= 0) continue; const sm = q => { q = Math.max(0, Math.min(1, q)); return q * q * (3 - 2 * q); }, w = sm(w0) * sm(w1), P = mp(f[2][0], f[2][1], f[2][2]), side = f[3] || 1, yaw = 0.4 * side, D = 10.0 - 2.2 * ((t - f[0]) / (f[1] - f[0])), fc = [P[0] + D * Math.sin(yaw), P[1] + 0.35, P[2] + D * Math.cos(yaw), P[0], P[1] - 0.15, P[2], 33];
      for (let q = 0; q < 7; q++) v[q] = v[q] + (fc[q] - v[q]) * w;
    }
    return v;"""
    sub(old2, new2)
    p.write_text(s, encoding='utf8')

# ---------------------------------------------------------------- build script: inject faces
b = H / 'build_jb.py'; t = b.read_text(encoding='utf8')
if '__FACES__' not in t:
    a = ".replace('__DMAX__', str(cfg['dmax']))"
    assert a in t; t = t.replace(a, a + ".replace('__FACES__', json.dumps(cfg.get('faces', [])))", 1); b.write_text(t, encoding='utf8')

# ---------------------------------------------------------------- face windows per part (scene coords: [x, head_y, z])
F = {
 'a1p1': [[1.0, 2.9, [-0.5, 2.5, 3.8], 1], [5.0, 7.2, [21.5, 2.6, 3.4], -1], [12.2, 14.4, [52, 2.6, 4.2], -1], [19.6, 22.2, [76, 2.5, 4.6], 1]],
 'a1p2': [[1.0, 3.0, [-1, 2.5, 4.6], 1], [8.0, 10.5, [20, 2.3, 2.1], -1], [47.0, 49.5, [125, 2.6, 3.6], 1], [50.2, 52.8, [128.6, 2.6, 4.6], -1], [53.0, 55.8, [143, 2.5, 3.2], 1]],
 'a2p2': [[2.4, 4.8, [-7.5, 2.5, 4.2], 1], [8.0, 11.0, [26, 2.6, 2.2], -1], [19.0, 22.0, [45.5, 2.5, 3.6], 1]],
 'a3p1': [[14.5, 17.5, [46, 2.6, 3.4], -1], [20.0, 22.6, [58.5, 2.6, 3.4], 1], [25.8, 28.5, [73.5, 2.6, 3.2], -1], [36.0, 38.5, [99.8, 2.6, 3.2], 1], [40.5, 42.4, [109.6, 2.5, 3.4], -1]],
 'a3p2': [[0.6, 2.8, [-6.5, 2.6, 3.6], 1], [10.5, 12.5, [19.6, 2.6, 3.6], -1], [22.5, 25.8, [75.5, 2.7, 3.4], 1], [44.8, 47.2, [150.5, 2.7, 3.6], -1], [60.5, 64.0, [177.6, 2.5, 4.8], 1], [67.6, 70.0, [199.6, 2.6, 3.4], -1]],
 'a4p1': [[0.8, 3.5, [0, 2.8, 3.4], 1], [9.4, 11.4, [21.8, 2.7, 3.4], -1]],
 'a4p2': [[0.8, 3.2, [0, 2.7, 3.4], 1], [6.4, 8.4, [26, 2.7, 3.4], -1], [29.5, 31.5, [105.8, 2.8, 3.8], 1]],
 'a4p3': [[0.6, 2.8, [-9, 2.7, 3.6], 1], [17.2, 19.6, [27.4, 2.7, 3.4], -1], [26.8, 29.0, [56.2, 2.5, 0.6], 1]],
 'a5p1': [[4.6, 6.4, [4.2, 2.4, 0.6], -1], [26.0, 28.4, [74, 2.7, 3.4], 1]],
 'a5p2': [[24.0, 26.5, [47, 2.6, 3.4], 1], [40.0, 42.6, [76, 3.3, 3.6], -1]],
}
for k, v in F.items():
    f = H / ('cfg_%s.json' % k)
    if not f.exists(): continue
    d = json.loads(f.read_text(encoding='utf8')); d['faces'] = v; f.write_text(json.dumps(d, indent=1), encoding='utf8')
# NOTE: mk_<part>.py scripts rewrite the cfg without faces; re-run this script after them.
print('ok')
