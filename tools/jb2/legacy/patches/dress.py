"""Beat dressing: adds moving assets (flows, orbits, growing stacks, pulses, beams, sparks, bars) to every beat of every part.
Data goes to cfg['dress'] (list of [type, t0, t1, ...]); the page draws it each frame (see 'dressFrame' in shim_env_jb.js).
Run:  python dress.py   (then rebuild the parts).  Edit BEATS to retune.  mk_<part>.py scripts rewrite cfgs: re-run dress.py after them."""
import json, pathlib
H = pathlib.Path(__file__).resolve().parent

def recipe(name, t0, t1, cx):
    """Each recipe is a few moving items placed to the sides / foreground of the station centre cx (scene coordinates)."""
    L, R = cx - 10.5, cx + 10.5
    if name == 'money':
        return [['flow', t0, t1, [L, 2.2, 6.2], [R, 3.2, 6.2], 9, '#E2B857', 0.7],
                ['rise', t0 + 0.4, t1, [R + 1.8, 7.0], 6, '#76B900', 1.2],
                ['sparks', t0, t1, [L - 1, 6.0], 3, '#F2D58F', 6]]
    if name == 'alarm':
        return [['pulse', t0, t1, [cx, 4.5], 10, '#D94E43'],
                ['beam', t0, t1, [L, 6.0], 8, '#D94E43'], ['beam', t0, t1, [R, 6.0], 8, '#D94E43'],
                ['sparks', t0 + 0.3, t1, [cx, 7.0], 9, '#F0A39A', 7]]
    if name == 'win':
        return [['sparks', t0, t1, [cx, 6.0], 16, '#E2B857', 11], ['sparks', t0, t1, [cx, 6.5], 16, '#9BE01B', 11],
                ['beam', t0, t1, [L, 6.0], 10, '#9BE01B'], ['beam', t0, t1, [R, 6.0], 10, '#45B8AC'],
                ['pulse', t0, t1, [cx, 4.5], 9, '#76B900']]
    if name == 'network':
        return [['orbit', t0, t1, [cx, 3.6, 6.0], 8.5, 7, '#45B8AC'], ['orbit', t0, t1, [cx, 5.2, 6.0], 5.5, 5, '#E2B857', -1],
                ['flow', t0, t1, [L, 1.4, 7.0], [R, 1.4, 7.0], 8, '#9BE01B', 0.6]]
    if name == 'build':
        return [['rise', t0, t1, [L, 6.4], 7, '#5E6F7A', 1.1], ['rise', t0 + 0.6, t1, [R, 6.4], 7, '#76B900', 1.1],
                ['flow', t0, t1, [L + 2, 1.8, 7.2], [R - 2, 1.8, 7.2], 7, '#F4F1EA', 0.6]]
    if name == 'docs':
        return [['flow', t0, t1, [L, 2.8, 6.0], [R, 3.6, 6.0], 8, '#F4F1EA', 0.9], ['flow', t0 + 0.8, t1, [R, 1.6, 7.2], [L, 2.4, 7.2], 6, '#E2B857', 0.7],
                ['orbit', t0, t1, [cx, 7.5, 3.0], 5.0, 4, '#2C5BA8']]
    if name == 'watch':
        return [['pulse', t0, t1, [cx, 5.0], 11, '#2C5BA8'], ['orbit', t0, t1, [cx, 8.0, 3.0], 6.5, 6, '#E2B857'],
                ['beam', t0, t1, [R, 6.0], 9, '#2C5BA8']]
    raise ValueError(name)

BEATS = {
 'a1p1': [(0, 3.7, 0, 'alarm'), (3.7, 9.9, 26, 'docs'), (9.9, 15.9, 52, 'win'), (15.9, 23.9, 78, 'watch'), (20, 23.9, 78, 'alarm')],
 'a1p2': [(0, 5.3, 0, 'docs'), (5.3, 14.8, 26, 'network'), (14.8, 25.9, 52, 'alarm'), (25.9, 40.1, 78, 'win'), (40.1, 45.6, 104, 'build'), (45.6, 55.7, 130, 'watch'), (55.7, 63.9, 156, 'alarm')],
 'a2p1': [(0, 15.3, 0, 'docs'), (15.3, 31, 26, 'network'), (31, 41.4, 52, 'alarm'), (41.4, 52.5, 78, 'alarm'), (48, 52.5, 78, 'docs')],
 'a2p2': [(0, 6.5, 0, 'alarm'), (6.5, 15.3, 26, 'docs'), (15.3, 30, 52, 'money'), (30, 47.5, 78, 'alarm'), (47.5, 58.9, 104, 'network'), (58.9, 68.1, 130, 'watch')],
 'a3p1': [(0, 5, 0, 'watch'), (5, 12.4, 26, 'alarm'), (12.4, 23, 52, 'network'), (23, 34, 78, 'build'), (34, 42.3, 104, 'docs')],
 'a3p2': [(0, 7, 0, 'build'), (7, 14.1, 26, 'docs'), (14.1, 21.4, 52, 'win'), (21.4, 26.8, 78, 'watch'), (26.8, 33.9, 104, 'money'), (33.9, 44.2, 130, 'alarm'), (44.2, 52.4, 156, 'docs'), (52.4, 66.9, 182, 'alarm'), (66.9, 73.8, 208, 'watch')],
 'a4p1': [(0, 8.4, 0, 'build'), (8.4, 16.4, 26, 'win'), (16.4, 23, 52, 'watch'), (23, 31.8, 78, 'docs'), (31.8, 38.9, 104, 'docs'), (38.9, 45.7, 130, 'network'), (45.7, 48.6, 156, 'alarm')],
 'a4p2': [(0, 5.6, 0, 'watch'), (5.6, 10.4, 26, 'build'), (10.4, 20.6, 52, 'money'), (20.6, 27.7, 78, 'alarm'), (27.7, 32.2, 104, 'watch')],
 'a4p3': [(0, 10.4, 0, 'watch'), (10.4, 23.3, 26, 'network'), (23.3, 33.1, 52, 'build')],
 'a5p1': [(0, 8.7, 0, 'alarm'), (8.7, 16.9, 26, 'money'), (16.9, 25.5, 52, 'build'), (25.5, 33.1, 78, 'money'), (33.1, 39, 104, 'build')],
 'a7': [(0, 2.9, 0, 'watch'), (2.9, 21.6, 26, 'alarm'), (21.6, 33.1, 52, 'win'), (33.1, 43.1, 78, 'watch'), (43.1, 60.4, 104, 'money')],
 'a6p2': [(0, 17.8, 0, 'network'), (17.8, 23.3, 26, 'docs'), (23.3, 37.3, 52, 'alarm'), (37.3, 57.6, 78, 'watch')],
 'a6p1': [(0, 9.5, 0, 'docs'), (9.5, 24.4, 26, 'money'), (24.4, 38.3, 52, 'network')],
 'a5p3': [(0, 9.5, 0, 'build'), (9.5, 26.1, 26, 'money'), (26.1, 33.1, 52, 'alarm')],
 'a5p2': [(0, 6.9, 0, 'alarm'), (6.9, 22.9, 26, 'money'), (22.9, 38.9, 52, 'build'), (38.9, 53.6, 78, 'alarm')],
}

for part, beats in BEATS.items():
    f = H / ('cfg_%s.json' % part)
    if not f.exists(): print('missing', part); continue
    items = []
    for (t0, t1, cx, name) in beats: items += recipe(name, t0, t1, cx)
    d = json.loads(f.read_text(encoding='utf8')); d['dress'] = items; f.write_text(json.dumps(d, indent=1), encoding='utf8')
    print(part, len(items), 'items')
