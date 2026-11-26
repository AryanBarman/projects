import pathlib
H = pathlib.Path(__file__).resolve().parent
p = H / 'assets_jb.js'; t = p.read_text(encoding='utf8'); assert "k === 'gauge'" not in t
def sub(a, b):
    global t; assert t.count(a) == 1, a[:60]; t = t.replace(a, b)
sub("const bdIcon = (g, k, cx, cy, s, col) => {", "const bdIcon = (g, k, cx, cy, s, col, v) => {")
add = r'''    else if (k === 'gauge') { const A0 = Math.PI * 1.1, A1 = Math.PI * -0.1; for (let i = 0; i < 10; i++) { const a0 = lerp(A0, A1, i / 10), a1 = lerp(A0, A1, (i + 1) / 10); g.beginPath(); g.arc(0, 0.35 * s, s, a0, a1, true); g.strokeStyle = i < 5 ? '#2B8A6E' : i < 8 ? '#E2B857' : '#D64545'; g.lineWidth = s * 0.26; g.stroke(); }
      const a = lerp(A0, A1, Math.max(0, Math.min(1, v === undefined ? 0.3 : v))); g.strokeStyle = '#17252B'; g.lineWidth = s * 0.12; g.beginPath(); g.moveTo(0, 0.35 * s); g.lineTo(Math.cos(a) * 0.8 * s, 0.35 * s + Math.sin(a) * 0.8 * s); g.stroke(); g.beginPath(); g.arc(0, 0.35 * s, 0.14 * s, 0, 7); g.fillStyle = '#17252B'; g.fill(); }
    else if (k === 'q') { g.beginPath(); g.arc(0, 0, 0.95 * s, 0, 7); g.fillStyle = '#F2D58F'; g.fill(); g.stroke(); g.fillStyle = '#17252B'; g.font = '900 ' + s * 1.5 + 'px' + FAM; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText('?', 0, 0.08 * s); }
    else if (k === 'gov') { g.beginPath(); g.moveTo(-s, -0.1 * s); g.lineTo(-0.5 * s, -0.1 * s); g.arc(0, -0.1 * s, 0.5 * s, Math.PI, 0); g.lineTo(s, -0.1 * s); g.closePath(); g.fillStyle = '#E8EEF2'; g.fill(); g.stroke(); for (let i = -2; i <= 2; i++) R(i * 0.38 * s - 0.1 * s, -0.05 * s, 0.2 * s, 0.75 * s, 2, '#F7F4EC'); R(-s, 0.7 * s, 2 * s, 0.25 * s, 2, '#C9B98A'); R(-0.06 * s, -0.95 * s, 0.12 * s, 0.4 * s, 1, '#D64545'); }
'''
sub("    else if (k === 'eye') {", add + "    else if (k === 'eye') {")
# needle value + crack + the icon call passes v
sub("bdIcon(g, n.ico, 0, -NH * 0.08, ph * 0.095, lit ? '#2B8A6E' : undefined);", "bdIcon(g, n.ico, 0, -NH * 0.08, ph * 0.095, lit ? '#2B8A6E' : undefined, n.needle ? keyVal(n.needle, t) : undefined); if (n.crack && t >= n.crack) { const cu = seg(t, n.crack, n.crack + 0.4); g.strokeStyle = '#D64545'; g.lineWidth = ph * 0.014; g.beginPath(); g.moveTo(-NW * 0.12, -NH * 0.5); g.lineTo(0, -NH * 0.22 * cu - NH * 0.28); g.lineTo(-NW * 0.07, -NH * 0.08 * cu); g.lineTo(NW * 0.06, NH * 0.12 * cu); g.lineTo(-NW * 0.03, NH * 0.3 * cu); g.stroke(); }")
sub("if (n.ico === 'hand' || n.bare) { bdIcon(g, n.ico, 0, 0, ph * 0.13, lit ? '#2B8A6E' : undefined); }", "if (n.ico === 'hand' || n.bare) { bdIcon(g, n.ico, 0, 0, ph * 0.13, lit ? '#2B8A6E' : undefined, n.needle ? keyVal(n.needle, t) : undefined); }")
p.write_text(t, encoding='utf8'); print('board2 ok')
