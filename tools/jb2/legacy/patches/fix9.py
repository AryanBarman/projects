import pathlib
def sub(f,a,b):
    p=pathlib.Path(f); s=p.read_text(encoding='utf8'); assert a in s,(f,a[:60]); p.write_text(s.replace(a,b),encoding='utf8')
f='a3p1_scene.js'
sub(f,"pop('WASHINGTON, D.C.', 0, 9.4, 2, 9.4, 1.4,","pop('WASHINGTON, D.C.', 0, 7.6, 2, 9.4, 1.4,")
sub(f,"pop('THE WEEKEND BEFORE MONDAY', 0, 7.2, 4, 10.6, 1.0,","pop('THE WEEKEND BEFORE MONDAY', 0, 5.6, 4, 10.6, 1.0,")
sub(f,"Avatar(nm, ax, 9.2 + (i % 2) * 0.5, 2,","Avatar(nm, ax, 7.6 + (i % 2) * 0.5, 2,")
sub(f,"lerp(5.6, 8.4 + (i % 2) * 0.5, ln)","lerp(5.6, 6.8 + (i % 2) * 0.5, ln)")
sub(f,"pop('KEY STAKEHOLDERS', 49.5, 11.6, 2,","pop('KEY STAKEHOLDERS', 49.5, 9.6, 2,")
sub(f,"pop('NVIDIA\u2019S BOARD', 53.5, 8.0, 4.4,","pop('NVIDIA\u2019S BOARD', 53.5, 6.6, 4.4,")
sub(f,"Card(57.5, 12.2, 1.5, 6.4, 1.9,","Card(58.5, 10.2, 1.5, 6.4, 1.9,")
sub(f,"trophy(70, 1.6,","trophy(67.8, 1.6,")
sub(f,"Char('cheung', 98.5, 3.2,","Char('cheung', 99.8, 3.2,")
sub(f,"pop('STEVEN CHEUNG', 98.5, 7.2,","pop('STEVEN CHEUNG', 99.8, 7.2,")
sub(f,"Card(105.8, 8.8, 1.6, 9.2, 4.6,","Card(105.2, 7.6, 1.6, 8.6, 4.2,")
sub(f,"Box(110.6, 0, 3.2, 3.8, 5.6, 0.3, '#2C5BA8', { a: 0.45 }); Char('jensen', 110.6,","Box(109.6, 0, 3.2, 3.8, 5.6, 0.3, '#2C5BA8', { a: 0.45 }); Char('jensen', 109.6,")
sub(f,"pop('PROTECT', 110.6, 8.0,","pop('PROTECT', 109.6, 7.4,")
sub(f,"hit(110.6, 8.0, 4.4, 40.5","hit(109.6, 7.4, 4.4, 40.5")
sub('a3p1_keys.js',"K(40.00, [106, 6, 20], [107, 5.0, 2], 44, 'push');","K(40.00, [105, 6, 22], [105, 4.8, 2], 44, 'push');")
