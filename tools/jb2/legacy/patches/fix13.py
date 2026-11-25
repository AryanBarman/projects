import pathlib
def sub(f,a,b):
    p=pathlib.Path(f); s=p.read_text(encoding='utf8'); assert a in s,(f,a[:60]); p.write_text(s.replace(a,b),encoding='utf8')
f='a3p2_scene.js'
sub(f,"whiteHouse(178.5, -6,","whiteHouse(176.5, -6,")
sub(f,"[189.4, 191.6, 193.8].forEach((rx, i) => Char('compliance', rx,","[185.6, 187.6, 189.6].forEach((rx, i) => Char('compliance', rx,")
sub(f,"pop('REPUBLICAN LAWMAKERS', 191.6, 8.0, 4.4, 8.6,","pop('REPUBLICAN LAWMAKERS', 187.6, 7.8, 4.4, 8.6,")
sub(f,"Line3([187.8, 7.4, 0.4], [188.6, 5.6, 0.4], '#D94E43', 12, 1); Line3([188.6, 5.6, 0.4], [187.6, 3.8, 0.4], '#D94E43', 12, 1); Line3([187.6, 3.8, 0.4], [188.8, 1.8, 0.4], '#D94E43', 12, 1); Line3([188.8, 1.8, 0.4], [187.8, 0.2, 0.4], '#D94E43', 12, 1);",
        "Line3([184.0, 7.4, 0.4], [184.8, 5.6, 0.4], '#D94E43', 12, 1); Line3([184.8, 5.6, 0.4], [183.8, 3.8, 0.4], '#D94E43', 12, 1); Line3([183.8, 3.8, 0.4], [185.0, 1.8, 0.4], '#D94E43', 12, 1); Line3([185.0, 1.8, 0.4], [184.0, 0.2, 0.4], '#D94E43', 12, 1);")
sub(f,"pop('BROKE WITH THE WHITE HOUSE', 183, 11.0, 3,","pop('BROKE WITH THE WHITE HOUSE', 181, 10.4, 3,")
sub(f,"hit(183, 11.0, 3, 55.7","hit(181, 10.4, 3, 55.7")
sub(f,"Char('jensen', 178, 4.8, 2.4, { pose: 'spr:think', facing: 1, phase: 6 }, 59.6, 67.6, t); pop('STILL UNDER SCRUTINY', 178, 8.0, 4.8, 8.8, 1.0, '#0B1A22', '#E2B857', 60.0, 0);",
        "Char('jensen', 177, 4.8, 2.4, { pose: 'spr:think', facing: 1, phase: 6 }, 59.6, 67.6, t); pop('STILL UNDER SCRUTINY', 177, 7.4, 4.8, 8.8, 1.0, '#0B1A22', '#E2B857', 60.0, 61.9);")
sub(f,"pop('ALLEGED CHIP SMUGGLING', 183.6, 6.2, 5.2,","pop('ALLEGED CHIP SMUGGLING', 180.6, 8.0, 5.2,")
sub(f,"pop('ALLEGED CHINESE INTELLIGENCE TIES', 183.6, 4.6, 5.2,","pop('ALLEGED CHINESE INTELLIGENCE TIES', 180.6, 9.6, 5.2,")
for a,b in [("K(55.20, [182, 6, 24], [182, 4.6, 1], 46, 'arc');","K(55.20, [183, 6, 24], [183, 4.6, 1], 46, 'arc');"),("K(52.60, [182, 6, 24], [182, 4.6, 1], 46, 'fly');","K(52.60, [183, 6, 24], [183, 4.6, 1], 46, 'fly');"),("K(58.00, [182, 6, 20], [182, 5.0, 2], 44, 'push');","K(58.00, [183, 6, 22], [182, 5.0, 2], 44, 'push');"),("K(62.00, [182, 6, 20], [182, 5.0, 2], 44, 'hold');","K(62.00, [183, 6, 22], [182, 5.0, 2], 44, 'hold');"),("K(65.80, [182, 6, 20], [182, 5.0, 2], 44, 'hold');","K(65.80, [183, 6, 22], [182, 5.0, 2], 44, 'hold');")]:
    sub('a3p2_keys.js',a,b)
