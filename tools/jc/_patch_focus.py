import pathlib
H = pathlib.Path(__file__).resolve().parent
p = H / 'assets_jb.js'; t = p.read_text(encoding='utf8'); assert 'FOCUS RULE' not in t
def sub(a, b):
    global t; assert t.count(a) == 1, a[:70]; t = t.replace(a, b)
# 1) FOCUS RULE in boardDiagram: only the ACTIVE link (the latest one that has started) is bright and animated; earlier links and the nodes not involved settle and dim
sub("    (S.links || []).forEach(l => {\n      const u = seg(t, l.t0, l.t0 + 0.6); if (u <= 0) return;",
    "    // FOCUS RULE (docs/JC_TOOLBOX.md): one thing moves at a time. act = the latest link that has started; earlier links stay drawn but dimmed and STILL, nodes not in the active link dim after they have been introduced.\n    const started = (S.links || []).filter(q => t >= q.t0), act = started.length ? started.reduce((a, b) => (b.t0 > a.t0 ? b : a)) : null;\n    (S.links || []).forEach(l => {\n      const u = seg(t, l.t0, l.t0 + 0.6); if (u <= 0) return; const isAct = l === act; g.save(); g.globalAlpha = isAct ? 1 : 0.42;")
sub("if (u >= 1) { const n = 2, tk = (t - l.t0 - 0.6) * 0.45;", "if (u >= 1 && isAct) { const n = 2, tk = (t - l.t0 - 0.6) * 0.45;")
sub("g.fillStyle = col; g.fill(); g.fillStyle = '#FFFFFF'; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText(l.label, 0, ph * 0.004); g.restore(); }\n    });",
    "g.fillStyle = col; g.fill(); g.fillStyle = '#FFFFFF'; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText(l.label, 0, ph * 0.004); g.restore(); }\n      g.restore();\n    });")
sub("const u = seg(t, n.t0 === undefined ? 0 : n.t0, (n.t0 || 0) + 0.45); if (u <= 0) return; const c = P(n), sc = 0.8 + 0.2 * Math.sin(u * 1.57), lit = n.lit !== undefined && t >= n.lit; g.save(); g.translate(c[0], c[1]); g.scale(sc, sc); g.globalAlpha = u;",
    "const u = seg(t, n.t0 === undefined ? 0 : n.t0, (n.t0 || 0) + 0.45); if (u <= 0) return; const c = P(n), sc = 0.8 + 0.2 * Math.sin(u * 1.57), lit = n.lit !== undefined && t >= n.lit; const fresh = t < (n.t0 || 0) + 1.6 || (n.hero && t >= n.hero[0] && t < n.hero[1]), inAct = act && (act.a === n.id || act.b === n.id), foc = !act || inAct || fresh || n.bare ? 1 : 0.5; g.save(); g.translate(c[0], c[1]); g.scale(sc, sc); g.globalAlpha = u * foc;")
# 2) a 'trend' icon (a falling stock line) for "tech stocks"
add = r'''    else if (k === 'trend') { R(-0.95 * s, -0.8 * s, 1.9 * s, 1.6 * s, 4, '#FFFFFF'); g.lineWidth = s * 0.14; g.strokeStyle = v === 1 ? '#1F9D6B' : '#D64545'; g.beginPath(); if (v === 1) { g.moveTo(-0.7 * s, 0.5 * s); g.lineTo(-0.2 * s, 0.05 * s); g.lineTo(0.15 * s, 0.3 * s); g.lineTo(0.7 * s, -0.45 * s); } else { g.moveTo(-0.7 * s, -0.5 * s); g.lineTo(-0.2 * s, -0.1 * s); g.lineTo(0.15 * s, -0.3 * s); g.lineTo(0.7 * s, 0.5 * s); } g.stroke(); g.lineWidth = s * 0.11; g.strokeStyle = '#17252B'; }
'''
sub("    else if (k === 'eye') {", add + "    else if (k === 'eye') {")
p.write_text(t, encoding='utf8'); print('focus rule ok')
