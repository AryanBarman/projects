import pathlib
def sub(f,a,b):
    p=pathlib.Path(f); s=p.read_text(encoding='utf8'); assert a in s,(f,a[:60]); p.write_text(s.replace(a,b),encoding='utf8')
f='a3p2_scene.js'
sub(f,"pop('THE PEAK', -4.2, 9.0, 2,","pop('THE PEAK', -4.2, 7.6, 2,")
sub(f,"      pop('JENSEN PROMISED', 75.5, 8.6, 4.2, 8, 1.1, '#0B1A22', '#E2B857', 21.8, 24.6);\n","")
sub(f,"'#2B8A6E', '#F4F1EA', 27.2, 0); if (t >= 27.2) hit(104, 8.4, 3, 27.3","'#2B8A6E', '#F4F1EA', 27.2, 30.2); if (t >= 27.2 && t < 30.2) hit(104, 8.4, 3, 27.3")
sub(f,"Card(105.5, 10.6, 1.5, 9.0, 2.0, { kind: 'counter', text: 'NEARLY $1 TRILLION'","Card(104.5, 8.8, 1.5, 9.0, 2.0, { kind: 'counter', text: 'NEARLY $1 TRILLION'")
sub(f,"pop('THE POLITICAL BACKLASH', 130, 9.4, 3,","pop('THE POLITICAL BACKLASH', 130, 8.8, 3,")
sub(f,"pop('NOBODY PRICED IT IN', 130, 6.4, 4.2,","pop('NOBODY PRICED IT IN', 130, 4.8, 4.8,")
sub(f,"hit(130, 6.4, 4.2, 36.1","hit(130, 4.8, 4.8, 36.1")
sub(f,"capitol(130, -5, 1.6, easeOut(seg(t, 38.5, 39.7)));","capitol(130, -5, 1.6, easeOut(seg(t, 34.4, 35.6)));")
