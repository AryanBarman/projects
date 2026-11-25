import pathlib
H = pathlib.Path(__file__).resolve().parent
p = H / 'shim_env_jb.js'; s = p.read_text(encoding='utf8')
if 'dressFrame' not in s:
    code = r"""  // ---- beat dressing (data from cfg 'dress', authored by tools/jb/dress.py): flows, orbits, growing stacks, pulses, beams, sparks
  const DRESS = __DRESS__;
  function dressFrame(t) {
    const rn = i => { const v = Math.sin(i * 127.1 + 311.7) * 43758.5453; return v - Math.floor(v); };
    DRESS.forEach((d, di) => {
      const type = d[0], t0 = d[1], t1 = d[2]; if (t < t0 || t > t1 + 0.4) return; const u = t - t0, fade = Math.min(1, u / 0.5) * Math.min(1, (t1 + 0.4 - t) / 0.4);
      if (type === 'flow') { const [a, b, n, col, sz] = [d[3], d[4], d[5], d[6], d[7] || 0.7]; for (let k = 0; k < n; k++) { const q = (u * 0.42 + k / n) % 1; Box(lerp(a[0], b[0], q) - sz / 2, lerp(a[1], b[1], q) + Math.sin(q * Math.PI) * 2.4, lerp(a[2], b[2], q), sz, sz * 0.62, sz, col, { lw: 0, emis: 0.45, a: fade }); } }
      else if (type === 'orbit') { const [c, r, n, col, dir] = [d[3], d[4], d[5], d[6], d[7] || 1]; for (let k = 0; k < n; k++) { const an = dir * (t * 0.9) + (k / n) * 6.2832; Box(c[0] + Math.cos(an) * r - 0.3, c[1] + Math.sin(t * 2 + k) * 0.35, c[2] + Math.sin(an) * r * 0.55, 0.6, 0.6, 0.6, col, { lw: 0, emis: 0.5, a: fade }); } }
      else if (type === 'rise') { const [pt, n, col, w] = [d[3], d[4], d[5], d[6] || 1]; for (let k = 0; k < n; k++) { const g = easeOut(seg(t, t0 + k * 0.28, t0 + k * 0.28 + 0.8)); if (g > 0.02) Box(pt[0] - w / 2, k * 0.62, pt[1], w, 0.55 * g, w, col, { a: fade }); } }
      else if (type === 'pulse') { const [pt, r, col] = [d[3], d[4], d[5]]; for (let i = 0; i < 2; i++) { const q = ((u * 0.38) + i * 0.5) % 1, pts = []; for (let k = 0; k < 40; k++) pts.push([pt[0] + Math.cos(k / 40 * 6.2832) * r * q, pt[1] + Math.sin(k / 40 * 6.2832) * r * q * 0.62]); groundPoly(pts, 0.05 + i * 0.002, null, col, 3, 0.7 * (1 - q) * fade); } }
      else if (type === 'beam') { const [pt, h, col] = [d[3], d[4], d[5]]; Cyl(pt[0], 0, pt[1], 0.55, h, col, { a: (0.2 + 0.12 * Math.sin(t * 3 + di)) * fade, emis: 0.7 }); }
      else if (type === 'sparks') { const [pt, spread, col, h] = [d[3], d[4], d[5], d[6] || 7]; for (let k = 0; k < 14; k++) { const ph = (t * 0.55 + rn(k + di * 7)) % 1; Box(pt[0] + (rn(k * 3 + di) - 0.5) * spread * 2, 0.4 + ph * h, pt[1] + (rn(k * 5 + 1) - 0.5) * 3, 0.26, 0.26, 0.26, col, { lw: 0, emis: 0.6, a: (1 - ph) * fade }); } }
    });
  }
"""
    a = "  function beginFrame(t) {\n"
    assert a in s; s = s.replace(a, code + a, 1)
    b = "    X.animate(t); X.ambientCast(t);\n"
    assert b in s; s = s.replace(b, b + "    dressFrame(t);\n", 1)
    p.write_text(s, encoding='utf8'); print('dress added')
b = H / 'build_jb.py'; t = b.read_text(encoding='utf8')
if '__DRESS__' not in t:
    a = ".replace('__SETS__', json.dumps(cfg.get('sets', [])))"
    assert a in t; b.write_text(t.replace(a, a + ".replace('__DRESS__', json.dumps(cfg.get('dress', [])))", 1), encoding='utf8'); print('build patched')
