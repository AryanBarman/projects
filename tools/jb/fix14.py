import pathlib
def sub(f,a,b):
    p=pathlib.Path(f); s=p.read_text(encoding='utf8'); assert a in s,(f,a[:60]); p.write_text(s.replace(a,b),encoding='utf8')
f='a3p2_scene.js'
sub(f,"[185.6, 187.6, 189.6].forEach((rx, i) => Char('compliance', rx,","[183.4, 185.2, 187.0].forEach((rx, i) => Char('compliance', rx,")
sub(f,"pop('REPUBLICAN LAWMAKERS', 187.6, 7.8, 4.4, 8.6,","pop('REPUBLICANS', 185.2, 7.4, 4.4, 5.6,")
for a,b in [("[184.0, 7.4, 0.4], [184.8, 5.6, 0.4]","[181.6, 7.4, 0.4], [182.4, 5.6, 0.4]"),("[184.8, 5.6, 0.4], [183.8, 3.8, 0.4]","[182.4, 5.6, 0.4], [181.4, 3.8, 0.4]"),("[183.8, 3.8, 0.4], [185.0, 1.8, 0.4]","[181.4, 3.8, 0.4], [182.6, 1.8, 0.4]"),("[185.0, 1.8, 0.4], [184.0, 0.2, 0.4]","[182.6, 1.8, 0.4], [181.6, 0.2, 0.4]")]: sub(f,a,b)
sub(f,"pop('BROKE WITH THE WHITE HOUSE', 181, 10.4, 3,","pop('BROKE WITH THE WHITE HOUSE', 179.5, 10.4, 3,")
sub(f,"hit(181, 10.4, 3, 55.7","hit(179.5, 10.4, 3, 55.7")
sub(f,"Char('jensen', 177, 4.8, 2.4,","Char('jensen', 177.6, 4.8, 2.4,")
sub(f,"pop('STILL UNDER SCRUTINY', 177, 7.4,","pop('STILL UNDER SCRUTINY', 178, 7.4,")
sub(f,"pop('ALLEGED CHIP SMUGGLING', 180.6,","pop('ALLEGED CHIP SMUGGLING', 179.4,")
sub(f,"pop('ALLEGED CHINESE INTELLIGENCE TIES', 180.6,","pop('ALLEGED CHINESE INTELLIGENCE TIES', 179.4,")
p=pathlib.Path('a3p2_keys.js'); s=p.read_text(encoding='utf8')
for a,b in [("[183, 6, 24], [183, 4.6, 1]","[181, 6, 24], [181, 4.6, 1]"),("[183, 6, 22], [182, 5.0, 2]","[181, 6, 22], [180, 5.0, 2]")]: s=s.replace(a,b)
p.write_text(s,encoding='utf8')
