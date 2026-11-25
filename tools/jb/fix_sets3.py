import pathlib
H = pathlib.Path(__file__).resolve().parent
p = H / 'shim_env_jb.js'; s = p.read_text(encoding='utf8')
a = "    X.applySets(m);\n"; assert a in s; s = s.replace(a, "")
b = "    applyCamera(t, [], null);\n"; assert b in s; s = s.replace(b, b + "    camera.updateMatrixWorld(); X.applySets(moodAt(t));\n")
p.write_text(s, encoding='utf8')
print('ok')
