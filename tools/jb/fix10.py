import pathlib
H = pathlib.Path(__file__).resolve().parent
p = H / 'a2p2_scene.js'; s = p.read_text(encoding='utf8')
a = "      if (t >= 22.8) Card(50.2, 10.4, 3, 7.4, 2.0, { kind: 'counter', text: '$119 BILLION', sub: 'semiconductor complex', scramble: 1.0, pulse: [23.0, 24.6], t0: 22.8 }, t);"
assert a in s
b = """      if (t >= 22.8) Card(50.2, 9.6, 3, 9.0, 2.0, { kind: 'counter', text: 'UP TO $119 BILLION', sub: 'across all phases', scramble: 1.0, pulse: [23.0, 24.6], t0: 22.8 }, t);
      if (t >= 24.2) { const gu = easeOut(seg(t, 24.2, 25.8)); Box(50.2, 12.2, 3.4, 14, 0.8, 0.5, '#E2B857', { a: 0.28 }); Box(43.2 + 3.25 * gu, 12.2, 3.4, 6.5 * gu, 0.8, 0.55, '#D99B26');
        pop('FIRST PHASE $55B', 46.4, 13.9, 3.4, 6.6, 0.9, '#0B1A22', '#E2B857', 25.4, 0); pop('ALL PHASES: UP TO $119B', 55.6, 13.9, 3.4, 8.2, 0.9, '#0B1A22', '#F4F1EA', 25.9, 0); }"""
p.write_text(s.replace(a, b), encoding='utf8')
c = H / 'cfg_a2p2.json'; t = c.read_text(encoding='utf8')
t = t.replace('Texas map, job cards, rising fab, $119B counter', 'Texas map, job cards, rising fab, UP TO $119B counter with $55B first-phase gauge')
c.write_text(t, encoding='utf8'); print('ok')
