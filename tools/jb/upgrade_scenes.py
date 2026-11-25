"""One-off: move a1p1 / a1p2 scenes onto Card / pose tracks and add the winding layouts to the configs."""
import pathlib, json, re
H = pathlib.Path(__file__).resolve().parent
OLDPOP = "const pop = (txt, x, y, z, w, h, bg, fg, t0, t1, o) => { const u = seg(t, t0, t0 + 0.5), out = t1 ? 1 - seg(t, t1, t1 + 0.4) : 1; if (u > 0 && out > 0) Label(txt, x, y, z, w, h, bg, fg, Object.assign({ sc: eBack(u) * out }, o || {})); };"
NEWPOP = "const pop = (txt, x, y, z, w, h, bg, fg, t0, t1, o) => Card(x, y, z, w, h, Object.assign({ kind: /^#(D94E43|2B8A6E|D99B26)$/i.test(bg) ? 'stamp' : 'tag', text: txt, bg, fg, accent: /^#(0B1A22|0B191E)$/i.test(bg) ? '#E2B857' : fg, t0, t1: t1 || 0 }, o || {}), t);\n    const trk = (keys, d) => RigKit.track(t, keys, d);"

def edit(name, pairs):
    p = H / (name + '_scene.js'); s = p.read_text(encoding='utf8')
    assert OLDPOP in s; s = s.replace(OLDPOP, NEWPOP, 1)
    for a, b in pairs:
        assert a in s, (name, a[:70]); s = s.replace(a, b, 1)
    p.write_text(s, encoding='utf8')

edit('a1p1', [
 ("pop('DAY ' + dn + ' OF 11', -3.8, 6.0, 1, 5.2, 1.0, '#0B1A22', '#E2B857', 0.2, 3.7);", "Card(-3.8, 6.0, 1, 5.2, 1.7, { kind: 'counter', text: 'DAY ' + dn + ' / 11', sub: 'after the ouster', t0: 0.2, t1: 3.7 }, t);"),
 ("Char('board', bx, -2.6, 2.1, { pose: t > 2.2 ? 'cross' : 'sit', phase: i, facing: 1 }, 0.0, 4.6, t);", "Char('board', bx, -2.6, 2.1, Object.assign({ phase: i, facing: 1 }, trk([[0, 'sit'], [2.2 + i * 0.12, 'cross']])), 0.0, 4.6, t);"),
 ("{ pose: t < 5.4 ? 'spr:explain' : 'spr:point', facing: 1, phase: 2 }", "Object.assign({ facing: 1, phase: 2 }, trk([[0, 'spr:explain'], [5.4, 'spr:point']]))"),
 ("{ pose: t < 5.8 ? 'cross' : t < 8.0 ? 'shrug' : 'think', phase: i, facing: -1 }", "Object.assign({ phase: i, facing: -1 }, trk([[0, 'cross'], [5.8 + i * 0.1, 'shrug'], [8.0, 'think']]))"),
 ("""pop("THE DEAL THAT SAVED HIS JOB", 78, 6.6, 3, 11, 1.4, '#0B1A22', '#E2B857', 16.2, 18.4);""", """Card(77, 6.9, 3.2, 10.5, 5.2, { kind: 'doc', tag: 'THE DEAL', head: "THE DEAL THAT SAVED HIS JOB", lines: ["Jensen's job: saved", 'Washington: handed', 'Permanent control'], hl: 1, hlAt: 2.1, t0: 16.1, t1: 19.6 }, t);"""),
])
edit('a1p2', [
 ("pop('NOVEMBER 12, 2026', 26, 6.6, 3, 8, 1.1, '#0B1A22', '#E2B857', 5.4, 9.2);", "pop('NOVEMBER 12, 2026', 26, 6.6, 3, 8, 1.1, '#0B1A22', '#E2B857', 5.4, 9.2);"),
 ("Box(48, 0, 1.5, 4.6 * pu, 4.2 * pu, 0.3, '#F4F1EA'); Box(48, 3.4 * pu, 1.7, 3.8 * pu, 0.5 * pu, 0.1, '#D94E43');", "Box(48, 0, 1.5, 4.6 * pu, 4.2 * pu, 0.3, '#F4F1EA'); Box(48, 3.4 * pu, 1.7, 3.8 * pu, 0.5 * pu, 0.1, '#D94E43');"),
 ("pop('EXPLOSIVE PERSONAL SCANDAL', 48, 6.4, 3, 10.5, 1.3, '#D94E43', '#F4F1EA', 15.3, 18.4);", "Card(48, 6.6, 4, 10.4, 5.2, { kind: 'doc', tag: 'SCANDAL', head: 'EXPLOSIVE PERSONAL SCANDAL', lines: ['Alleged Chinese intelligence', 'scrutiny'], hl: 0, hlAt: 3.4, t0: 15.3, t1: 22.0 }, t);"),
 ("pop('ALLEGED', 52.5, 6.9, 4.6, 4.6, 1.0, '#2B2F36', '#E2B857', 18.5, 22.0);", "pop('ALLEGED', 53.5, 3.4, 5.2, 4.6, 1.3, '#D94E43', '#F4F1EA', 18.5, 22.0);"),
 ("pop('CHINESE INTELLIGENCE SCRUTINY', 51, 5.5, 4.6, 9.4, 1.1, '#0B1A22', '#F4F1EA', 18.9, 21.6);\n", ""),
 ("hit(52.5, 6.9, 4.6, 18.6, PAL.amberHi, 240);", "hit(53.5, 3.4, 5.2, 18.6, PAL.amberHi, 240);"),
 ("{ pose: t < 27.6 ? 'sit' : 'cheer', phase: i * 0.4, facing: 1 }", "Object.assign({ phase: i * 0.4, facing: 1 }, trk([[0, 'sit'], [27.6 + i * 0.15, 'cheer']]))"),
 ("{ pose: t < 48.5 ? 'sit' : 'shrug', phase: i * 0.6, facing: -1 }", "Object.assign({ phase: i * 0.6, facing: -1 }, trk([[0, 'sit'], [48.5 + i * 0.2, 'shrug']]))"),
 ("Label('DAY ' + dn, 105, 7.8, 0, 5, 1.1, '#0B1A22', '#E2B857', { sc: eBack(seg(t, 40.4, 40.9)) });", "Card(105, 7.8, 0, 5.2, 1.3, { kind: 'counter', text: 'DAY ' + dn, t0: 40.4 }, t);"),
 ("if (t >= 32.0) Label('+$' + dv + ' BILLION', 87, 9.6, 1, 9.4, 1.5, '#0B1A22', '#9BE01B', { sc: eBack(seg(t, 32.0, 32.5)) });", "if (t >= 32.0) Card(87, 9.6, 1, 9.6, 1.9, { kind: 'counter', text: '+$' + dv + 'B', sub: 'market value added', fg: '#9BE01B', accent: '#76B900', t0: 32.0 }, t);"),
 ("if (t >= 47.0) Label(hrs + ' HOURS', 127, 6.4, 3, 5.6, 1.2, '#0B1A22', '#E2B857', { sc: eBack(seg(t, 47.0, 47.5)) });", "if (t >= 47.0) Card(127, 6.4, 3, 5.8, 1.6, { kind: 'counter', text: hrs + ' H', sub: 'of pressure', t0: 47.0 }, t);"),
])
for name, lay in (('a1p1', [[0, 0], [36, -30], [74, -58], [46, -92]]), ('a1p2', [[0, 0], [34, -26], [70, -30], [100, -58], [76, -90], [38, -98], [2, -76]])):
    p = H / ('cfg_%s.json' % name); c = json.loads(p.read_text(encoding='utf8')); c['layout'] = lay; p.write_text(json.dumps(c, indent=1), encoding='utf8')
print('scenes upgraded')
