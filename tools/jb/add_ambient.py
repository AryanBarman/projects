import pathlib
H = pathlib.Path(__file__).resolve().parent
for fn in ('shim_env_jb.js', 'shim_sets.txt'):
    p = H / fn
    if not p.exists(): continue
    s = p.read_text(encoding='utf8')
    if 'X.ambientCast' in s: print(fn, 'already'); continue
    if fn == 'shim_sets.txt':
        # sets source copy: keep it in sync only for the kinds table edit below
        pass
    # animated trading-floor bars
    a = "for (let k = 0; k < 9; k++) { const v = hash(r * 50 + c * 9 + k) - 0.45; B(G, 0.8, 0.5 + Math.abs(v) * 4.5, 0.2, x - 6.4 + k * 1.5, y + 0.8, -21.2, basic(v > 0 ? '#3FD08B' : '#F0604F')); }"
    if a in s:
        b = "for (let k = 0; k < 9; k++) { const v = hash(r * 50 + c * 9 + k) - 0.45, hh0 = 0.5 + Math.abs(v) * 4.5, bm = B(G, 0.8, hh0, 0.2, x - 6.4 + k * 1.5, y + 0.8, -21.2, basic(v > 0 ? '#3FD08B' : '#F0604F')); (X.anim = X.anim || []).push({ m: bm, h: hh0, y0: y + 0.8, ph: r * 3 + c * 1.7 + k * 0.9, sp: 1.2 + 0.3 * (k % 3) }); }"
        s = s.replace(a, b, 1)
    if fn == 'shim_env_jb.js':
        c = "      X.applySets = function (m) {"
        assert c in s
        extra = """      X.animate = function (t) { (X.anim || []).forEach(o => { const hh = o.h * (0.55 + 0.55 * Math.abs(Math.sin(t * o.sp + o.ph))); o.m.scale.y = hh / o.h; o.m.position.y = o.y0 + hh / 2; }); };
      const WALK = { office: ['employee', 'banker', 'compliance'], mall: ['employee', 'journalist', 'employee'], campus: ['employee', 'engineer', 'employee', 'engineer'], market: ['trader', 'trader', 'banker'], texas: ['factory', 'supply', 'factory'], plaza: ['employee', 'journalist', 'banker'] };
      X.curSet = 0;
      X.ambientCast = function (t) {
        const kind = SETS[X.curSet] || 'plaza', L = LAYOUT[X.curSet] || [0, 0], roles = WALK[kind] || WALK.plaza;
        roles.forEach((role, k) => { const sp = 2.1 + 0.5 * (k % 3), span = 70, u = ((t * sp + k * 23.0) % span), dir = k % 2 ? -1 : 1, lx = dir > 0 ? -35 + u : 35 - u, lz = -9.5 - 1.8 * k;
          CAST.push({ role, wx: L[0] + lx, wy: 0, wz: L[1] + lz, h: 2.5, t0: 0, t1: 1e9, o: { pose: 'walk', facing: dir, phase: k * 1.3, walkAmt: 1 } }); });
      };
"""
        s = s.replace(c, extra + c, 1)
        d = "const kind = SETS[bi] || 'plaza'; X.trees.visible"
        assert d in s
        s = s.replace(d, "X.curSet = bi; " + d, 1)
        e = "    camera.updateMatrixWorld(); X.applySets(moodAt(t));\n"
        assert e in s
        s = s.replace(e, e + "    X.animate(t); X.ambientCast(t);\n", 1)
    p.write_text(s, encoding='utf8'); print(fn, 'patched')
