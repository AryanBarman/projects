import pathlib, re
H = pathlib.Path(__file__).resolve().parent
p = H / 'assets_jb.js'; t = p.read_text(encoding='utf8')
a = t.index("  // stepChart(g, pw, ph, keys, t, title, tags)"); b = t.index("  const pad = (x0, z0, x1, z1, col)")
new = r'''  // ===== PAPER CHARTS (charts and graphs are drawn on a sheet of graph paper and shown as a Card kind:'paint'; Manim rule: everything is placed through ONE coordinate mapping) =====
  const paperSheet = (g, pw, ph, title, sub) => {
    const m = pw * 0.03, X0 = pw * 0.15, X1 = pw * 0.93, Y0 = ph * 0.3, Y1 = ph * 0.8;
    g.save(); g.shadowColor = 'rgba(11,25,30,0.38)'; g.shadowBlur = pw * 0.035; g.shadowOffsetY = pw * 0.014; rrect(g, m, m, pw - 2 * m, ph - 2 * m, ph * 0.02); g.fillStyle = '#FBF8EF'; g.fill(); g.restore();
    g.save(); rrect(g, m, m, pw - 2 * m, ph - 2 * m, ph * 0.02); g.clip(); g.strokeStyle = 'rgba(120,160,190,0.22)'; g.lineWidth = 1.5; const st = ph * 0.05;
    for (let x = m; x < pw; x += st) { g.beginPath(); g.moveTo(x, m); g.lineTo(x, ph); g.stroke(); } for (let y = m; y < ph; y += st) { g.beginPath(); g.moveTo(m, y); g.lineTo(pw, y); g.stroke(); }
    g.fillStyle = '#E8E0CB'; g.beginPath(); g.moveTo(pw - m - ph * 0.1, m); g.lineTo(pw - m, m); g.lineTo(pw - m, m + ph * 0.1); g.closePath(); g.fill(); g.restore();                 // folded corner
    g.fillStyle = '#17252B'; g.textAlign = 'left'; g.textBaseline = 'alphabetic'; g.font = '900 ' + ph * 0.075 + 'px' + FAM; g.fillText(title, X0 - ph * 0.02, ph * 0.17);
    if (sub) { g.fillStyle = '#5B6B76'; g.font = '700 ' + ph * 0.042 + 'px' + FAM; g.fillText(sub, X0 - ph * 0.02, ph * 0.235); }
    g.strokeStyle = '#17252B'; g.lineWidth = ph * 0.009; g.lineCap = 'round'; g.beginPath(); g.moveTo(X0, Y0 - ph * 0.02); g.lineTo(X0, Y1); g.lineTo(X1 + ph * 0.02, Y1); g.stroke();   // axes
    return { X0, X1, Y0, Y1 };
  };
  const paperAxes = (g, ph, A, yt, xt) => {
    g.fillStyle = '#4A5A68'; g.font = '700 ' + ph * 0.04 + 'px' + FAM; g.textBaseline = 'middle'; g.textAlign = 'right';
    (yt || []).forEach(q => { const y = A.Y1 - (A.Y1 - A.Y0) * q[0]; g.fillText(q[1], A.X0 - ph * 0.03, y); g.strokeStyle = 'rgba(23,37,43,0.12)'; g.lineWidth = 2; g.beginPath(); g.moveTo(A.X0, y); g.lineTo(A.X1, y); g.stroke(); });
    g.textAlign = 'center'; g.textBaseline = 'top'; (xt || []).forEach(q => g.fillText(q[1], A.X0 + (A.X1 - A.X0) * q[0], A.Y1 + ph * 0.025));
  };
  const keyVal = (keys, tt) => { let y = keys[0][1]; for (let i = 1; i < keys.length; i++) { const r = keys[i][2] || 0.35, u = Math.max(0, Math.min(1, (tt - keys[i][0]) / r)); y = lerp(y, keys[i][1], u * u * (3 - 2 * u)); if (tt < keys[i][0]) break; } return y; };
  const pill = (g, x, y, txt, col, ph, sc) => { g.save(); g.translate(x, y); g.scale(sc, sc); g.font = '900 ' + ph * 0.075 + 'px' + FAM; const w = g.measureText(txt).width + ph * 0.16; rrect(g, -w / 2, -ph * 0.06, w, ph * 0.12, ph * 0.04); g.fillStyle = col; g.fill(); g.fillStyle = '#FFFFFF'; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText(txt, 0, ph * 0.004); g.restore(); };
  // stepChart(g, pw, ph, keys, t, title, tags, opt): LINE chart on paper. keys = [[time, y 0..1 (0 = top), rampSeconds?], ...]: at `time` the line MOVES to y over rampSeconds (default 0.35) so a drop STARTS on the spoken word. opt = { sub, y:[[frac,'label']], x:[[frac,'label']], refs:[{y, t0, label, col}] }
  const stepChart = (g, pw, ph, keys, t, title, tags, opt) => {
    opt = opt || {}; const A = paperSheet(g, pw, ph, title, opt.sub), T0 = keys[0][0], T1 = keys[keys.length - 1][0] + (keys[keys.length - 1][2] || 0.35); paperAxes(g, ph, A, opt.y, opt.x);
    const px = tt => A.X0 + ph * 0.03 + (A.X1 - A.X0 - ph * 0.06) * (tt - T0) / (T1 - T0), py = y => A.Y0 + (A.Y1 - A.Y0) * y, te = Math.min(t, T1), N = 90, pts = [];
    (opt.refs || []).forEach(r => { if (t < r.t0) return; const u = easeOut(Math.min(1, (t - r.t0) / 0.6)), y = py(r.y); g.save(); g.setLineDash([ph * 0.03, ph * 0.02]); g.strokeStyle = r.col || '#B8860B'; g.lineWidth = ph * 0.011; g.beginPath(); g.moveTo(A.X0, y); g.lineTo(A.X0 + (A.X1 - A.X0) * u, y); g.stroke(); g.restore(); g.fillStyle = r.col || '#B8860B'; g.font = '900 ' + ph * 0.045 + 'px' + FAM; g.textAlign = 'right'; g.textBaseline = 'bottom'; g.globalAlpha = u; g.fillText(r.label, A.X1, y - ph * 0.01); g.globalAlpha = 1; });
    for (let i = 0; i <= N; i++) { const tt = T0 + (te - T0) * i / N; pts.push([px(tt), py(keyVal(keys, tt))]); }
    if (pts.length > 1) {
      g.beginPath(); g.moveTo(pts[0][0], A.Y1); pts.forEach(q => g.lineTo(q[0], q[1])); g.lineTo(pts[pts.length - 1][0], A.Y1); g.closePath(); g.fillStyle = 'rgba(31,157,107,0.12)'; g.fill();
      g.lineJoin = 'round'; g.lineCap = 'round'; g.lineWidth = ph * 0.024;
      for (let i = 1; i < pts.length; i++) { g.strokeStyle = pts[i][1] > pts[i - 1][1] + 0.05 ? '#D64545' : '#1F9D6B'; g.beginPath(); g.moveTo(pts[i - 1][0], pts[i - 1][1]); g.lineTo(pts[i][0], pts[i][1]); g.stroke(); }
      const h = pts[pts.length - 1]; g.fillStyle = '#FBF8EF'; g.strokeStyle = '#17252B'; g.lineWidth = ph * 0.012; g.beginPath(); g.arc(h[0], h[1], ph * 0.028, 0, 7); g.fill(); g.stroke();
    }
    (tags || []).forEach((a, ti) => { const u = (t - a[0]) / 0.25; if (u < 0) return; const sc = u < 1 ? 0.7 + 0.3 * Math.sin(Math.min(1, u) * 1.57) : 1, yv = keyVal(keys, a[0] + 0.3), cx = Math.min(A.X1 - ph * 0.12, px(Math.min(a[0] + 0.3, T1))), cy = py(yv) + (yv < 0.5 ? ph * 0.13 : -ph * 0.13) + (ti % 2 ? ph * 0.17 : 0); pill(g, cx, cy, a[1], a[2] || '#1F9D6B', ph, sc); });
  };
  // paperBars(g, pw, ph, bars, t, title, opt): BAR chart on paper. bars = [{ label, col, keys:[[time, v 0..1, ramp?], ...], text:[[time,'$100'], ...] }] (a bar exists from its first key; its value text pops at the given times).
  // opt = { sub, y:[[frac,'label']], refs:[{ v, t0, label, col }] }
  const paperBars = (g, pw, ph, bars, t, title, opt) => {
    opt = opt || {}; const A = paperSheet(g, pw, ph, title, opt.sub); paperAxes(g, ph, A, opt.y, null); const n = bars.length, gap = (A.X1 - A.X0) / n, bw = gap * 0.56, py = v => A.Y1 - (A.Y1 - A.Y0) * v;
    (opt.refs || []).forEach(r => { if (t < r.t0) return; const u = easeOut(Math.min(1, (t - r.t0) / 0.6)), y = py(r.v); g.save(); g.setLineDash([ph * 0.03, ph * 0.02]); g.strokeStyle = r.col || '#B8860B'; g.lineWidth = ph * 0.011; g.beginPath(); g.moveTo(A.X0, y); g.lineTo(A.X0 + (A.X1 - A.X0) * u, y); g.stroke(); g.restore(); g.fillStyle = r.col || '#B8860B'; g.font = '900 ' + ph * 0.045 + 'px' + FAM; g.textAlign = 'right'; g.textBaseline = 'bottom'; g.globalAlpha = u; g.fillText(r.label, A.X1, y - ph * 0.01); g.globalAlpha = 1; });
    bars.forEach((b, i) => {
      const cx = A.X0 + gap * (i + 0.5); g.fillStyle = '#4A5A68'; g.font = '800 ' + ph * 0.042 + 'px' + FAM; g.textAlign = 'center'; g.textBaseline = 'top'; g.fillText(b.label, cx, A.Y1 + ph * 0.025);
      if (t < b.keys[0][0]) return; const v = keyVal(b.keys, t) * Math.min(1, (t - b.keys[0][0]) / 0.5 + 0.0001), y = py(v);
      rrect(g, cx - bw / 2, y, bw, A.Y1 - y, ph * 0.012); g.fillStyle = b.col; g.fill();
      let tx = null; (b.text || []).forEach(q => { if (t >= q[0]) tx = q; }); if (tx) { const u = Math.min(1, (t - tx[0]) / 0.25); pill(g, cx, y - ph * 0.075, tx[1], '#17252B', ph, 0.7 + 0.3 * Math.sin(u * 1.57)); }
    });
  };
'''
t = t[:a] + new + t[b:]; p.write_text(t, encoding='utf8')
# stamps: no overshoot on financial content (motion-art-direction skill) -> soften the slam
s = (H / 'shim_env_jb.js').read_text(encoding='utf8'); x = "en = slam ? 1 + 0.9 * Math.pow(Math.max(0, 1 - u / 0.16), 2)"
assert x in s; (H / 'shim_env_jb.js').write_text(s.replace(x, "en = slam ? 1 + 0.35 * Math.pow(Math.max(0, 1 - u / 0.16), 2)"), encoding='utf8'); print('ok')
