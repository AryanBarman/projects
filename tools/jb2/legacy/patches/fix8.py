import pathlib
H = pathlib.Path(__file__).resolve().parent
for f in ('shim_env_jb.js', 'shim_sets.txt'):
    p = H / f; s = p.read_text(encoding='utf8'); n = s.count("SM('#fff', {"); s = s.replace("SM('#fff', {", "SM('#CFCFCF', {")
    if f == 'shim_env_jb.js':
        a = "X.ground.material.color.setRGB(m.t[0], m.t[1], m.t[2]);"; assert a in s
        s = s.replace(a, "X.ground.material.color.setRGB(m.t[0] * 0.8, m.t[1] * 0.8, m.t[2] * 0.82);")
    p.write_text(s, encoding='utf8'); print(f, n)
