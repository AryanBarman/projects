import pathlib
H = pathlib.Path(__file__).resolve().parent
p = H / 'assets_jb.js'; t = p.read_text(encoding='utf8'); assert 'const metricTiles' not in t
def sub(a, b):
    global t; assert t.count(a) == 1, a[:70]; t = t.replace(a, b)
# stepChart: optional dashed PROJECTION to the right (opt.proj = {t0, t1, y}) and a forced colour (opt.col)
sub("opt = opt || {}; const A = paperSheet(g, pw, ph, title, opt.sub), T0 = keys[0][0], T1 = keys[keys.length - 1][0] + (keys[keys.length - 1][2] || 0.35); paperAxes(g, ph, A, opt.y, opt.x);",
    "opt = opt || {}; const A = paperSheet(g, pw, ph, title, opt.sub), T0 = keys[0][0], T1 = keys[keys.length - 1][0] + (keys[keys.length - 1][2] || 0.35), EXT = opt.proj ? (T1 - T0) * 0.45 : 0; paperAxes(g, ph, A, opt.y, opt.x);")
sub("const px = tt => A.X0 + ph * 0.03 + (A.X1 - A.X0 - ph * 0.06) * (tt - T0) / (T1 - T0), py = y => A.Y0 + (A.Y1 - A.Y0) * y, te = Math.min(t, T1), N = 90, pts = [];\n    (opt.refs",
    "const px = tt => A.X0 + ph * 0.03 + (A.X1 - A.X0 - ph * 0.06) * (tt - T0) / (T1 + EXT - T0), py = y => A.Y0 + (A.Y1 - A.Y0) * y, te = Math.min(t, T1), N = 90, pts = [];\n    (opt.refs")
sub("g.strokeStyle = pts[i][1] > pts[i - 1][1] + 0.05 ? '#D64545' : '#1F9D6B'; g.beginPath(); g.moveTo(pts[i - 1][0], pts[i - 1][1]); g.lineTo(pts[i][0], pts[i][1]); g.stroke(); }",
    "g.strokeStyle = opt.col || (pts[i][1] > pts[i - 1][1] + 0.05 ? '#D64545' : '#1F9D6B'); g.beginPath(); g.moveTo(pts[i - 1][0], pts[i - 1][1]); g.lineTo(pts[i][0], pts[i][1]); g.stroke(); }\n      if (opt.proj && t >= opt.proj.t0) { const q = easeOut(seg(t, opt.proj.t0, opt.proj.t1)), e = pts[pts.length - 1], X2 = px(T1 + EXT), Y2 = py(opt.proj.y); g.save(); g.setLineDash([ph * 0.03, ph * 0.025]); g.strokeStyle = opt.col || '#1F9D6B'; g.lineWidth = ph * 0.02; g.beginPath(); g.moveTo(e[0], e[1]); g.lineTo(lerp(e[0], X2, q), lerp(e[1], Y2, q)); g.stroke(); g.restore(); }")
add = r'''  // metricTiles(g, pw, ph, S, t): a row of METRIC tiles built one by one: thermometer fills + the number counts up to its value on the spoken word, optional badge. S = { gov: time, title, tiles:[{label, sub, val, max, t0, t1, col, badge:[time,'text']}] }
  const metricTiles = (g, pw, ph, S, t) => {
    const m = pw * 0.03; g.save(); g.shadowColor = 'rgba(11,25,30,0.38)'; g.shadowBlur = pw * 0.035; g.shadowOffsetY = pw * 0.014; rrect(g, m, m, pw - 2 * m, ph - 2 * m, ph * 0.02); g.fillStyle = '#FBF8EF'; g.fill(); g.restore();
    g.save(); rrect(g, m, m, pw - 2 * m, ph - 2 * m, ph * 0.02); g.clip(); g.strokeStyle = 'rgba(120,160,190,0.2)'; g.lineWidth = 1.5; for (let x = m; x < pw; x += ph * 0.05) { g.beginPath(); g.moveTo(x, m); g.lineTo(x, ph); g.stroke(); } for (let y = m; y < ph; y += ph * 0.05) { g.beginPath(); g.moveTo(m, y); g.lineTo(pw, y); g.stroke(); } g.restore();
    if (S.gov !== undefined && t >= S.gov) { const u = seg(t, S.gov, S.gov + 0.5); g.save(); g.globalAlpha = u; bdIcon(g, 'gov', pw * 0.1, ph * 0.12, ph * 0.075); g.fillStyle = '#17252B'; g.textAlign = 'left'; g.textBaseline = 'middle'; g.font = '900 ' + ph * 0.062 + 'px' + FAM; g.fillText(S.title || 'U.S. GOVERNMENT NUMBERS', pw * 0.17, ph * 0.12); g.restore(); }
    const n = S.tiles.length, gap = pw * 0.03, W = (pw * 0.88 - gap * (n - 1)) / n, X0 = pw * 0.06, Y0 = ph * 0.24, Hh = ph * 0.68;
    S.tiles.forEach((T, i) => {
      const u = seg(t, T.t0, T.t0 + 0.5); if (u <= 0) return; const sc = 0.86 + 0.14 * Math.sin(u * 1.57), p = easeOut(seg(t, T.t0 + 0.3, T.t1)), cx = X0 + i * (W + gap) + W / 2, cy = Y0 + Hh / 2;
      g.save(); g.translate(cx, cy); g.scale(sc, sc); g.globalAlpha = u; g.shadowColor = 'rgba(11,25,30,0.25)'; g.shadowBlur = ph * 0.02; rrect(g, -W / 2, -Hh / 2, W, Hh, ph * 0.03); g.fillStyle = '#FFFFFF'; g.fill(); g.shadowColor = 'transparent'; g.lineWidth = ph * 0.01; g.strokeStyle = '#17252B'; g.stroke();
      g.fillStyle = '#17252B'; g.textAlign = 'center'; g.textBaseline = 'middle'; const ws = T.label.split(' '), two = T.label.length > 12 && ws.length > 1, mid = Math.ceil(ws.length / 2), ls = two ? [ws.slice(0, mid).join(' '), ws.slice(mid).join(' ')] : [T.label], ml = Math.max(...ls.map(q => q.length)); g.font = '900 ' + Math.min(ph * 0.05, W * 0.86 / (ml * 0.62)) + 'px' + FAM; ls.forEach((q, k) => g.fillText(q, 0, -Hh * (two ? 0.4 : 0.38) + k * ph * 0.06));
      if (T.sub) { g.fillStyle = '#5B6B76'; g.font = '700 ' + ph * 0.036 + 'px' + FAM; g.fillText(T.sub, 0, -Hh * 0.27); }
      const tx = -W * 0.27, tw = W * 0.13, top = -Hh * 0.18, bot = Hh * 0.28, lvl = Math.min(1, (T.val / (T.max || 5)) * p); rrect(g, tx - tw / 2, top, tw, bot - top, tw / 2); g.fillStyle = '#EEF2F4'; g.fill(); g.lineWidth = ph * 0.008; g.stroke();
      const fh = (bot - top) * lvl; if (fh > 1) { rrect(g, tx - tw / 2 + 3, bot - fh, tw - 6, fh, (tw - 6) / 2); g.fillStyle = T.col || '#D64545'; g.fill(); } g.beginPath(); g.arc(tx, bot + tw * 0.55, tw * 0.85, 0, 7); g.fillStyle = T.col || '#D64545'; g.fill(); g.stroke();
      g.fillStyle = T.col || '#D64545'; g.font = '900 ' + W * 0.24 + 'px ui-monospace, "Cascadia Mono", Consolas, monospace'; g.textAlign = 'left'; g.fillText((T.val * p).toFixed(1) + '%', -W * 0.12, Hh * 0.04);
      if (T.badge && t >= T.badge[0]) { const w = Math.min(1, (t - T.badge[0]) / 0.3); g.save(); g.translate(0, Hh * 0.38); g.scale(0.7 + 0.3 * w, 0.7 + 0.3 * w); g.font = '900 ' + ph * 0.042 + 'px' + FAM; const bw = Math.min(W * 0.94, g.measureText(T.badge[1]).width + ph * 0.1); rrect(g, -bw / 2, -ph * 0.04, bw, ph * 0.08, ph * 0.03); g.fillStyle = '#17252B'; g.fill(); g.fillStyle = '#F2D58F'; g.textAlign = 'center'; g.fillText(T.badge[1], 0, ph * 0.004); g.restore(); }
      g.restore();
    });
  };
'''
i = t.index("  const pad = (x0, z0, x1, z1, col)"); t = t[:i] + add + t[i:]
p.write_text(t, encoding='utf8'); print('tiles + proj ok')
