import pathlib, json
H = pathlib.Path(__file__).resolve().parent
p = H / 'shim_env_jb.js'; s = p.read_text(encoding='utf8')
if '__SETS__' not in s:
    mark = "    // ---- world layer: pooled meshes driven each frame by the scene code"
    assert mark in s
    s = s.replace(mark, (H / 'shim_sets.txt').read_text(encoding='utf8') + mark)
    a = "    X.sun.material.color.setHex(m.sun); hemiLight.intensity = m.h; dirLight.intensity = 0.9 * m.h;\n"
    assert a in s
    s = s.replace(a, a + "    X.applySets(m);\n")
    p.write_text(s, encoding='utf8')
b = H / 'build_jb.py'; t = b.read_text(encoding='utf8')
if '__SETS__' not in t:
    a = ".replace('__MOOD__', json.dumps(cfg.get('mood', [[0, 'day']])))"
    assert a in t
    b.write_text(t.replace(a, a + ".replace('__SETS__', json.dumps(cfg.get('sets', [])))"), encoding='utf8')
S = {'a1p1': ['office', 'mall', 'campus', 'mall'], 'a1p2': ['plaza', 'campus', 'office', 'office', 'plaza', 'mall', 'plaza'],
     'a2p1': ['office', 'plaza', 'market', 'campus'], 'a2p2': ['plaza', 'office', 'texas', 'office', 'campus', 'plaza']}
for k, v in S.items():
    c = H / ('cfg_%s.json' % k); d = json.loads(c.read_text(encoding='utf8')); d['sets'] = v; c.write_text(json.dumps(d, indent=1), encoding='utf8')
print('ok')
