import pathlib
H = pathlib.Path(__file__).resolve().parent
def cut(s, a, b, new):
    i = s.index(a); j = s.index(b, i); return s[:i] + new + s[j:]
f = H / 'c3p2_scene.js'; s = f.read_text(encoding='utf8')
s = cut(s, "      const C = 0; paper(C, 5.0", "      who('banker', C, 4.8", r'''      const C = 0; Card(C, 7.4, 1.2, 18.0, 10.4, { kind: 'paint', rot: -0.01, t0: 5.0, t1: 0, paint: (g, pw, ph) => cashChart(g, pw, ph, { keys: [[5.0, 0.5], [5.81, 0.3, 1.6], [12.46, 0.82, 0.7], [14.94, 0.88, 1.2]], title: 'COREWEAVE DEBT PRICE', tags: [[6.4, 'RALLY', '#1F9D6B'], [12.7, 'LENDERS DUMP', '#D64545'], [17.54, '75-77 CENTS', '#D64545']], opt: { sub: 'what lenders would pay for its bonds', refs: [{ y: 0.12, t0: 5.4, label: '100 CENTS = FACE VALUE', col: '#B8860B' }, { y: 0.9, t0: 14.94, label: 'RECORD LOW', col: '#D64545' }] }, n0: 2, n1: 15, t0: 5.0, bursts: [12.46, 13.2] }, t) }, t);
''')
f.write_text(s, encoding='utf8')
f = H / 'c5p2_scene.js'; s = f.read_text(encoding='utf8')
i = s.index("      const C = 130; Card(C - 1.0, 7.6, 1.2, 14.0, 9.2"); j = s.index('\n', i) + 1
s = s[:i] + r'''      const C = 130; Card(C - 0.4, 7.6, 1.2, 16.0, 9.6, { kind: 'paint', rot: -0.012, t0: 45.3, t1: 0, paint: (g, pw, ph) => cashChart(g, pw, ph, { keys: [[45.4, 0.7], [46.4, 0.2, 1.4]], title: 'MONDAY\'S JUMP', tags: [[47.0, '+31.5%', '#1F9D6B']], opt: { sub: 'NVIDIA stock', col: '#1F9D6B' }, n0: 2, n1: 15, t0: 45.4, bursts: [] }, t) }, t);
''' + s[j:]
f.write_text(s, encoding='utf8'); print('ok')
