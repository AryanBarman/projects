import pathlib
H = pathlib.Path(__file__).resolve().parent
p = H / 'a2p2_scene.js'; s = p.read_text(encoding='utf8')
i = s.index("      if (t >= 22.8) Card(50.2, 9.6, 3, 9.0, 2.0,"); j = s.index("\n", s.index("pop('ALL PHASES: UP TO $119B'", i)) + 1
new = """      if (t >= 22.8) Card(58.6, 9.4, 3, 8.8, 2.0, { kind: 'counter', text: 'UP TO $119 BILLION', sub: 'across all phases', scramble: 1.0, pulse: [23.0, 24.6], t0: 22.8 }, t);
      if (t >= 24.2) { const gu = easeOut(seg(t, 24.2, 25.8)); Box(58.6, 7.0, 3.4, 8.4, 0.7, 0.5, '#E2B857', { a: 0.3 }); Box(54.4 + 1.94 * gu, 7.0, 3.5, 3.88 * gu, 0.7, 0.55, '#D99B26');
        pop('FIRST PHASE: $55B', 56.4, 5.6, 3.5, 6.0, 0.9, '#0B1A22', '#E2B857', 25.4, 0); }
"""
p.write_text(s[:i] + new + s[j:], encoding='utf8'); print('ok')
