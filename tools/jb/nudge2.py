import pathlib
H = pathlib.Path(__file__).resolve().parent
p = H / 'shim_env_jb.js'; s = p.read_text(encoding='utf8')
i = s.index("    let dx = 0, dy = 0; const ov = (a, b)"); j = s.index("    dx = Math.max(-320, Math.min(320, dx));")
new = """    let dx = 0, dy = 0; const ov = (a, b) => [Math.min(a.x1, b.x1) - Math.max(a.x0, b.x0), Math.min(a.y1, b.y1) - Math.max(a.y0, b.y0)];
    const rc = () => ({ x0: x0 + dx, x1: x1 + dx, y0: y0 + dy, y1: y1 + dy });
    for (let pass = 0; pass < 3; pass++) {                                                  // label-on-label first, then the fixed zones (so zones always win)
      let R = rc(), ox, oy;
      _NR.forEach(o => { [ox, oy] = ov(R, o); if (ox > 6 && oy > 6) { const small = Math.min(w * h, (o.x1 - o.x0) * (o.y1 - o.y0)); if (ox * oy / small > 0.22) { const up = (R.y0 + R.y1) / 2 < (o.y0 + o.y1) / 2; dy += (up ? -1 : 1) * (oy + 6); R = rc(); } } });
      [ox, oy] = ov(R, NZ_HEAD); if (ox > 0 && oy > 0) { const dn = oy + 10, rt = ox + 10; if (dn <= rt * 1.6) dy += dn; else dx += rt; R = rc(); }
      [ox, oy] = ov(R, NZ_CAP); if (ox > 0 && oy > 0) { dy -= (R.y1 - NZ_CAP.y0) + 10; R = rc(); }
      if (R.x0 < 30) dx += 30 - R.x0; if (R.x1 > 1890) dx -= R.x1 - 1890; if (R.y0 < 24) dy += 24 - R.y0; if (R.y1 > 1056) dy -= R.y1 - 1056;
    }
"""
s = s[:i] + new + s[j:]
s = s.replace("dx = Math.max(-320, Math.min(320, dx)); dy = Math.max(-320, Math.min(320, dy));", "dx = Math.max(-520, Math.min(520, dx)); dy = Math.max(-520, Math.min(520, dy));")
p.write_text(s, encoding='utf8'); print('ok')
