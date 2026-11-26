import pathlib
H = pathlib.Path(__file__).resolve().parent
def cut(s, a, b, new):
    i = s.index(a); j = s.index(b, i); return s[:i] + new + s[j:]
# 1) cashChart: the graph covers the whole card (so the later part of the screen is the line); the cash stack stands ON TOP of its right part
p = H / 'assets_jb.js'; t = p.read_text(encoding='utf8')
t = cut(t, "  // cashChart(g, pw, ph, S, t)", "  // brokenTower(", r'''  // cashChart(g, pw, ph, S, t): DATA + DEPICTION together. The paper line chart (stepChart: keys, tags, opt) covers the WHOLE card; a cash stack stands on top of its later (right) part and its height follows the SAME value (n = n0 + (n1-n0)*(1-y)); bursts of bills at S.bursts, optional ghost stack S.ghost (layers), optional pill S.pill = [time, text, colour].
  const cashChart = (g, pw, ph, S, t) => { const rw = pw * 0.44, y = keyVal(S.keys, t), n = S.n0 + (S.n1 - S.n0) * (1 - y); stepChart(g, pw, ph, S.keys, t, S.title, S.tags, S.opt); g.save(); g.translate(pw * 0.56, 0);
    if (S.ghost) { g.save(); g.globalAlpha = 0.3; cashStack(g, rw * 0.55, ph * 0.9, rw * 0.5, S.ghost); g.restore(); }
    cashArt(g, rw, ph, [{ k: 'bag', x: 0.92, y: 0.9, s: 0.2, t0: S.t0 }, { k: 'stack', x: 0.55, y: 0.9, s: 0.5, n, t0: S.t0 }], t); (S.bursts || []).forEach(bt => cashBurst(g, rw, ph, 0.55, 0.5, t, bt, 8)); g.restore();
    if (S.pill && t >= S.pill[0]) pill(g, pw * 0.5, ph * 0.1, S.pill[1], S.pill[2], ph, easeOut(seg(t, S.pill[0], S.pill[0] + 0.4))); };
''')
p.write_text(t, encoding='utf8')
# 2) c1p2: S2 money rise = a graph moving upward with the pile on top; widen the other cash charts
f = H / 'c1p2_scene.js'; s = f.read_text(encoding='utf8')
s = cut(s, "      if (t >= 18.17) Card(40.5, 7.4, 1.6, 11.0, 9.6", "      if (t >= 28.38) Card(26, 12.8", r'''      if (t >= 18.17) Card(41.0, 7.4, 1.6, 15.0, 9.6, { kind: 'paint', t0: 18.17, t1: 0, paint: (g, pw, ph) => cashChart(g, pw, ph, { keys: [[18.17, 0.72], [19.4, 0.34, 1.2], [22.16, 0.12, 2.6]], title: 'NVIDIA STOCK', tags: [[18.6, '+31.5%', '#1F9D6B']], opt: { sub: 'back up in a single day', col: '#1F9D6B' }, n0: 3, n1: 16, t0: 18.17, bursts: [], pill: [22.16, '~$1 TRILLION BACK', '#17252B'] }, t) }, t);
''')
s = s.replace("Card(52, 7.2, 1.6, 16.0, 8.8, { kind: 'paint', t0: 29.6", "Card(52, 7.2, 1.6, 18.0, 9.6, { kind: 'paint', t0: 29.6")
f.write_text(s, encoding='utf8')
for name, a, b in [('c1p1_scene.js', "Card(26, 7.2, 1.6, 16.0, 8.8,", "Card(26, 7.2, 1.6, 18.0, 9.6,"), ('c2p1_scene.js', "Card(26, 7.2, 1.6, 16.0, 8.8,", "Card(26, 7.2, 1.6, 18.0, 9.6,"), ('c5p2_scene.js', "Card(C - 0.4, 7.6, 1.2, 16.0, 9.6,", "Card(C - 0.4, 7.6, 1.2, 18.0, 10.2,")]:
    f = H / name; s = f.read_text(encoding='utf8'); assert s.count(a) == 1, (name, a); f.write_text(s.replace(a, b), encoding='utf8')
# 3) still-imperfect list
f = H / 'c1p1_scene.js'; s = f.read_text(encoding='utf8'); a = "Card(dx, 9.8, 1.6, 5.2, 5.2,"; assert s.count(a) == 1; f.write_text(s.replace(a, "Card(dx, 9.6, 1.6, 4.4, 4.4,"), encoding='utf8')
f = H / 'c2p1_scene.js'; s = f.read_text(encoding='utf8'); a = "refLine(g, pw, ph, base - 14 * k, 'WHERE YOU STARTED', '#B8860B', seg(t, 26.2, 26.9));"; assert s.count(a) == 1; f.write_text(s.replace(a, "refLine(g, pw, ph, base - 14 * k, '', '#B8860B', seg(t, 26.2, 26.9));"), encoding='utf8')
f = H / 'c2p2_scene.js'; s = f.read_text(encoding='utf8'); a = "Card(-6.4, 10.6, 1.6, 8.8, 3.0, { kind: 'counter', text: 'WORTH TRILLIONS'"; assert s.count(a) == 1; f.write_text(s.replace(a, "Card(-6.4, 12.6, 1.6, 8.8, 3.0, { kind: 'counter', text: 'WORTH TRILLIONS'"), encoding='utf8')
print('ok')
