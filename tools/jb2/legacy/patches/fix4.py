import pathlib
def sub(f,a,b):
    p=pathlib.Path(f); s=p.read_text(encoding='utf8'); assert a in s,(f,a); p.write_text(s.replace(a,b),encoding='utf8')
sub('a1p2_scene.js',"pop('BEHIND CLOSED DOORS', 150, 8.4, 0, 9.6,","pop('BEHIND CLOSED DOORS', 156, 10.6, 0, 9.6,")
sub('a2p1_scene.js',"Card(-7.2, 7.0, 1.5, 7.4, 4.0, { kind: 'doc', tag: 'NOVEMBER 12'","Card(-7.2, 5.2, 1.5, 7.4, 4.0, { kind: 'doc', tag: 'NOVEMBER 12'")
sub('a2p1_scene.js',"pop('SANTA CLARA HEADQUARTERS', 78, 11.2, -4,","pop('SANTA CLARA HEADQUARTERS', 78, 14.2, -4,")
sub('a2p1_keys.js',"K(33.40, [50, 6, 24], [52, 4.6, 1], 46, 'push');","K(33.40, [50, 6, 24], [52, 4.6, 1], 46, 'hold');")
