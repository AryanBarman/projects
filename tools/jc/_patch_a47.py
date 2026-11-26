import pathlib
H = pathlib.Path(__file__).resolve().parent
def cut(s, a, b, new):
    i = s.index(a); j = s.index(b, i); return s[:i] + new + s[j:]
f = H / 'c6_scene.js'; s = f.read_text(encoding='utf8')
s = cut(s, "      const C = 26; Card(C, 7.6, 1.2, 17.0, 11.2", "      who('engineer', C, 12.0", r'''      const C = 26; Card(C, 7.6, 1.2, 16.0, 10.4, { kind: 'paint', rot: -0.012, t0: 12.2, t1: 0, paint: (g, pw, ph) => { paperSheet(g, pw, ph, 'NVIDIA\'S BUSINESS', 'still standing'); const base = 0.83, xs = [0.22, 0.5, 0.78], ts = [13.26, 13.74, 14.64], ns = [15, 14, 16], lb = ['SALES', 'PROFITS', 'TECH LEAD'];
        cashArt(g, pw, ph, xs.map((x, i) => ({ k: 'stack', x, y: base, s: 0.19, n: ns[i], t0: ts[i] })), t); g.fillStyle = '#17252B'; g.font = '900 ' + ph * 0.05 + 'px' + FAM; g.textAlign = 'center'; g.textBaseline = 'top'; xs.forEach((x, i) => { if (t >= ts[i]) g.fillText(lb[i], pw * x, ph * 0.85); });
        xs.forEach((x, i) => { if (t >= ts[i] + 0.5) pill(g, pw * x, ph * (base - ns[i] * 0.075 * 0.19 * pw / ph) - ph * 0.1, 'STRONG', '#1F9D6B', ph, easeOut(seg(t, ts[i] + 0.5, ts[i] + 0.85))); }); } }, t);
''')
s = cut(s, "      const C = 104; Card(C - 1.0, 7.6, 1.2, 15.0, 10.0", "      [[C - 15.0, 'trader', 1]", r'''      const C = 104; Card(C - 0.4, 7.6, 1.2, 18.0, 10.2, { kind: 'paint', rot: -0.012, t0: 45.8, t1: 0, paint: (g, pw, ph) => { cashChart(g, pw, ph, { keys: [[46.0, 0.34], [47.0, 0.2, 1.4], [53.13, 0.78, 0.7]], title: 'PRICED FOR PERFECTION', tags: [[53.4, 'FAST SELLING', '#D64545']], opt: { sub: 'as if nothing can go wrong', refs: [{ y: 0.2, t0: 47.4, label: 'NOTHING CAN GO WRONG', col: '#B8860B' }] }, n0: 2, n1: 15, t0: 46.0, bursts: [53.13, 53.8] }, t);
        if (t >= 50.37) { const u = seg(t, 50.37, 50.9), x = pw * 0.4, y = ph * 0.34; g.save(); g.strokeStyle = '#D64545'; g.lineWidth = ph * 0.014; g.lineCap = 'round'; g.lineJoin = 'round'; g.beginPath(); g.moveTo(x, y); g.lineTo(x + pw * 0.02 * u, y + ph * 0.07 * u); g.lineTo(x - pw * 0.008 * u, y + ph * 0.13 * u); g.lineTo(x + pw * 0.016 * u, y + ph * 0.2 * u); g.stroke(); g.restore(); } } }, t);
''')
f.write_text(s, encoding='utf8'); print('ok')
