import pathlib
H = pathlib.Path(__file__).resolve().parent
p = H / 'shim_env_jb.js'; s = p.read_text(encoding='utf8')
if 'r3Draw' not in s:
    code = (H / 'rig3d.js').read_text(encoding='utf8')
    a = "  function Char(role, x, z, hW, opts, t0, t1, t) {"
    assert a in s; s = s.replace(a, code + a, 1)
    # route Char() to the 3D rig for opted-in roles (after the fit-log hook, before the sprite CAST push)
    b = "CAST.push({ role, wx: P[0], wy: 0, wz: P[2], h: hW * 1.2, t0, t1, o: opts });"
    assert b in s; s = s.replace(b, "if (r3Ok(role)) { r3Draw(role, P, hW, opts || {}, t); return; } " + b, 1)
    c = "    window.__FIT = [];\n"
    assert c in s; s = s.replace(c, c + "    r3Begin();\n", 1)
    d = "    Object.keys(POOL).forEach(k => { for (let i = CNT[k]; i < POOL[k].length; i++) POOL[k][i].m.visible = false; });\n"
    assert d in s; s = s.replace(d, d + "    r3End();\n", 1)
    p.write_text(s, encoding='utf8'); print('rig3d added')
b = H / 'build_jb.py'; t = b.read_text(encoding='utf8')
if '__RIG3D__' not in t:
    a = ".replace('__DRESS__', json.dumps(cfg.get('dress', [])))"
    assert a in t; b.write_text(t.replace(a, a + ".replace('__RIG3D__', json.dumps(cfg.get('rig3d', [])))", 1), encoding='utf8'); print('build patched')
