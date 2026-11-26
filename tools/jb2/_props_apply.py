import pathlib
H = pathlib.Path(__file__).resolve().parent
t = (H / 'recipes_jb.js').read_text(encoding='utf8'); add = (H / '_props_add.js').read_text(encoding='utf8')
assert 'function Stockline' not in t
k = "  function Throw(model, p0, p1, t0, t1, size, t, o)"; i = t.index(k); j = t.index('\n', i) + 1
t = t[:j] + add + t[j:]
a = "    street:  {"
b = ("    boardroom: { floor: ['plank', '#5B3A24', '#47301D'], wall: ['panel', '#2C3E50', '#1F2D3B'], trim: '#C9A24B', door: [6.2, '#2A1D12'], rug: '#243447', glow: '#FFE9B0', shaft: [-1.5, -1.0],\n"
     "               props: [['plant', -7.8, -3.0, 2.6], ['plant', 7.8, -3.0, 2.6], ['lamp', -8.4, -2.6, 3.8], ['frame', -5.0, -3.85, 1.9, 3.8], ['frame', 3.0, -3.85, 1.9, 3.8], ['cabinet', -2.0, -3.3, 2.6]] },\n")
assert t.count(a) == 1; t = t.replace(a, b + a)
(H / 'recipes_jb.js').write_text(t, encoding='utf8')
s = (H / 'story_rt.js').read_text(encoding='utf8')
a = "      Stack: (a) =>"
b = ("      Stockline: (a, t) => Stockline(a[0], a[1], a[2], a[3], a[4], a[5], t, a[6]), Panel: (a, t) => Panel(a[0], a[1], a[2], a[3], a[4], t, a[5]), Magnifier: (a, t) => Magnifier(a[0], a[1], a[2], a[3], t, a[4]),\n"
     "      CeoChair: (a) => CeoChair(a[0], a[1], a[2]), Ledger: (a, t, t0) => Ledger(a[0], a[1], a[2], a[3], t, d0(a[4], t0)), Crown: (a) => Crown(a[0], a[1], a[2], a[3]), Calendar: (a, t, t0, t1) => Calendar(a[0], a[1], a[2], a[3], t, d0(a[4], t0), d0(a[5], t1)), BoardTable: (a) => BoardTable(a[0], a[1], a[2]),\n")
assert s.count(a) == 1; (H / 'story_rt.js').write_text(s.replace(a, b + a), encoding='utf8')
(H / '_props_add.js').unlink(); print('ok')
