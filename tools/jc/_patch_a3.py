import pathlib
H = pathlib.Path(__file__).resolve().parent
def cut(s, a, b, new):
    i = s.index(a); j = s.index(b, i); return s[:i] + new + s[j:]
f = H / 'c3p2_scene.js'; s = f.read_text(encoding='utf8')
s = cut(s, "      const C = 52; paper(C, 26.0", "      who('trader', C, 25.9", r'''      const C = 52; Card(C, 7.6, 1.2, 15.0, 10.0, { kind: 'paint', rot: -0.01, t0: 26.0, t1: 0, paint: (g, pw, ph) => { paperSheet(g, pw, ph, 'INTEREST ON $100 BORROWED', 'what lenders charge each year'); const k = 0.075 * 0.24 * pw / ph, base = 0.83, u1 = seg(t, 26.7, 27.6), u2 = seg(t, 31.9, 32.6), n1 = 18 * easeOut(u1), n2 = 4 * easeOut(u2);
        cashArt(g, pw, ph, [{ k: 'stack', x: 0.32, y: base, s: 0.24, n: Math.max(0.01, n1), t0: 26.7 }, { k: 'stack', x: 0.7, y: base, s: 0.24, n: Math.max(0.01, n2), t0: 31.9 }], t); cashBurst(g, pw, ph, 0.32, 0.45, t, 27.2, 8); refLine(g, pw, ph, base - 4 * k, 'SAFE US GOVERNMENT', '#2B8A6E', seg(t, 31.9, 32.7));
        g.fillStyle = '#17252B'; g.font = '900 ' + ph * 0.045 + 'px' + FAM; g.textAlign = 'center'; g.textBaseline = 'top'; if (t >= 26.7) g.fillText('COREWEAVE 2031 LOANS', pw * 0.32, ph * 0.85); if (t >= 31.9) g.fillText('SAFE US GOVERNMENT LOANS', pw * 0.7, ph * 0.85);
        if (t >= 27.2) pill(g, pw * 0.32, ph * (base - n1 * k) - ph * 0.1, '~18%', '#D64545', ph, easeOut(seg(t, 27.2, 27.6))); if (t >= 33.83) pill(g, pw * 0.7, ph * (base - 4 * k) - ph * 0.1, '~4%', '#1F9D6B', ph, easeOut(seg(t, 33.83, 34.2))); } }, t);
''')
f.write_text(s, encoding='utf8'); print('ok')
