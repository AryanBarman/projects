import pathlib
def sub(f,a,b):
    p=pathlib.Path(f); s=p.read_text(encoding='utf8'); assert a in s,(f,a[:60]); p.write_text(s.replace(a,b),encoding='utf8')
f='a4p1_scene.js'
sub(f,"Char('compliance', 123.4, 3.6, 2.5,","Char('compliance', 126.0, 3.6, 2.5,")
sub(f,"pop('CHIEF COMPLIANCE OFFICER', 123.4, 8.2, 4.4, 9.6, 1.0,","pop('COMPLIANCE OFFICER', 126.0, 7.6, 4.4, 7.4, 1.0,")
sub(f,"table(136, 2, 8.4);","table(133.6, 2, 7.0);")
sub(f,"[133.6, 136, 138.4].forEach((bx, i) => Char('board', bx, -0.4,","[131.8, 133.6, 135.4].forEach((bx, i) => Char('board', bx, -0.4,")
sub(f,"pop('GOVERNANCE COMMITTEE', 136, 8.0, 3.6, 9.6, 1.0,","pop('GOVERNANCE COMMITTEE', 133.6, 7.2, 3.6, 8.6, 1.0,")
sub(f,"Line3([124.6, 5.4, 3.6], [lerp(124.6, 131.6, ln),","Line3([127.2, 5.4, 3.6], [lerp(127.2, 130.8, ln),")
sub(f,"pop('REPORTS DIRECTLY', 128, 10.4, 3, 8.2, 1.0,","pop('REPORTS DIRECTLY', 130, 10.2, 3, 7.2, 1.0,")
