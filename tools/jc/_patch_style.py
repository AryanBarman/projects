import pathlib
H = pathlib.Path(__file__).resolve().parent
# 1) stepChart into assets_jb.js (jc copy only)
p = H / 'assets_jb.js'; t = p.read_text(encoding='utf8'); assert 'const stepChart' not in t
add = r'''  // stepChart(g, pw, ph, keys, t, title, tags): clean stock chart painted into a Card kind:'paint'. keys = [[time, y 0..1 (0 = top), rampSeconds?], ...]: at `time` the line MOVES to y over rampSeconds (default 0.35), so a drop can start exactly on the spoken word.
  // Smooth thick line (green rising, red falling), soft area fill, glowing head dot, no wobble. tags = [[time, 'TEXT', colour]] pills that pop at the head.
  const stepChart = (g, pw, ph, keys, t, title, tags) => {
    const m = pw * 0.03, X0 = pw * 0.09, X1 = pw * 0.95, Y0 = ph * 0.24, Y1 = ph * 0.86, T0 = keys[0][0], T1 = keys[keys.length - 1][0] + (keys[keys.length - 1][2] || 0.35);
    g.save(); g.shadowColor = 'rgba(11,25,30,0.4)'; g.shadowBlur = pw * 0.03; g.shadowOffsetY = pw * 0.012; rrect(g, m, m, pw - 2 * m, ph - 2 * m, ph * 0.07); g.fillStyle = '#0F2229'; g.fill(); g.restore();
    g.fillStyle = '#F4F1EA'; g.textAlign = 'left'; g.textBaseline = 'alphabetic'; g.font = '900 ' + ph * 0.075 + 'px' + FAM; g.fillText(title, X0, ph * 0.15);
    g.strokeStyle = 'rgba(255,255,255,0.07)'; g.lineWidth = 2; for (let i = 0; i < 4; i++) { g.beginPath(); g.moveTo(X0, Y0 + i * (Y1 - Y0) / 3); g.lineTo(X1, Y0 + i * (Y1 - Y0) / 3); g.stroke(); }
    const val = tt => { let y = keys[0][1]; for (let i = 1; i < keys.length; i++) { const r = keys[i][2] || 0.35, u = Math.max(0, Math.min(1, (tt - keys[i][0]) / r)); y = lerp(y, keys[i][1], u * u * (3 - 2 * u)); if (tt < keys[i][0]) break; } return y; };
    const px = tt => X0 + (X1 - X0) * (tt - T0) / (T1 - T0), py = y => Y0 + (Y1 - Y0) * y, te = Math.min(t, T1), N = 90, pts = [];
    for (let i = 0; i <= N; i++) { const tt = T0 + (te - T0) * i / N; pts.push([px(tt), py(val(tt))]); }
    if (pts.length > 1) {
      g.beginPath(); g.moveTo(pts[0][0], Y1); pts.forEach(q => g.lineTo(q[0], q[1])); g.lineTo(pts[pts.length - 1][0], Y1); g.closePath(); const gr = g.createLinearGradient(0, Y0, 0, Y1); gr.addColorStop(0, 'rgba(79,224,165,0.22)'); gr.addColorStop(1, 'rgba(79,224,165,0)'); g.fillStyle = gr; g.fill();
      g.lineJoin = 'round'; g.lineCap = 'round'; g.lineWidth = ph * 0.026;
      for (let i = 1; i < pts.length; i++) { g.strokeStyle = pts[i][1] > pts[i - 1][1] + 0.05 ? '#FF6B5E' : '#4FE0A5'; g.beginPath(); g.moveTo(pts[i - 1][0], pts[i - 1][1]); g.lineTo(pts[i][0], pts[i][1]); g.stroke(); }
      const h = pts[pts.length - 1]; g.fillStyle = 'rgba(255,255,255,0.25)'; g.beginPath(); g.arc(h[0], h[1], ph * 0.055, 0, 7); g.fill(); g.fillStyle = '#FFFFFF'; g.beginPath(); g.arc(h[0], h[1], ph * 0.03, 0, 7); g.fill();
    }
    (tags || []).forEach(a => { const u = (t - a[0]) / 0.25; if (u < 0) return; const sc = u < 1 ? 0.6 + 0.4 * Math.sin(Math.min(1, u) * 1.57) : 1, yv = val(a[0] + 0.3), cx = Math.min(X1 - ph * 0.3, px(Math.min(a[0] + 0.3, T1))), cy = py(yv) + (yv < 0.5 ? ph * 0.16 : -ph * 0.16);
      g.save(); g.translate(cx, cy); g.scale(sc, sc); g.font = '900 ' + ph * 0.1 + 'px' + FAM; const w = g.measureText(a[1]).width + ph * 0.18; rrect(g, -w / 2, -ph * 0.075, w, ph * 0.15, ph * 0.05); g.fillStyle = a[2] || '#4FE0A5'; g.fill(); g.fillStyle = '#0B191E'; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText(a[1], 0, ph * 0.005); g.restore(); });
  };
'''
i = t.index("  const pad = (x0, z0, x1, z1, col)"); p.write_text(t[:i] + add + t[i:], encoding='utf8')
# 2) Card styles (jc copy): stamp / counter / tag without hairlines, generous padding
p = H / 'shim_env_jb.js'; s = p.read_text(encoding='utf8')
a = s.index("      } else if (kind === 'stamp') {"); b = s.index("      } else if (kind === 'counter') {"); c = s.index("      } else {   // tag: dark pill")
stamp = r'''      } else if (kind === 'stamp') {   // solid colour block, white text, soft shadow, NO hairline border, generous padding
        const col = o.bg || '#D94E43', bw = pw - 2 * m, bh = ph - 2 * m;
        g.save(); g.translate(pw / 2, ph / 2); g.shadowColor = 'rgba(11,25,30,0.4)'; g.shadowBlur = pw * 0.03; g.shadowOffsetY = pw * 0.012; rrect(g, -bw / 2, -bh / 2, bw, bh, ph * 0.2); g.fillStyle = col; g.fill(); g.shadowColor = 'transparent';
        g.fillStyle = o.fg || '#FFFFFF'; g.textAlign = 'center'; g.textBaseline = 'middle'; const px = fitPx(g, o.text, '900', FAM, bw * 0.68, ph * 0.44); g.font = '900 ' + px + 'px' + FAM; g.fillText(o.text, 0, ph * 0.02); g.restore();
'''
cnt = s[b:c]
old1 = "g.lineWidth = ph * 0.035; g.strokeStyle = o.accent || '#E2B857'; rrect(g, m, m, bw, bh, ph * 0.18); g.stroke();"; assert old1 in cnt
cnt = cnt.replace(old1, "g.save(); rrect(g, m, m, bw, bh, ph * 0.18); g.clip(); g.fillStyle = o.accent || '#E2B857'; g.fillRect(m, bh + m - ph * 0.07, bw, ph * 0.07); g.restore();")
old2 = "bw * 0.86, ph * (hasSub ? 0.5 : 0.62)"; assert old2 in cnt; cnt = cnt.replace(old2, "bw * 0.76, ph * (hasSub ? 0.46 : 0.56)")
s = s[:a] + stamp + cnt + s[c:]
old3 = "        g.lineWidth = ph * 0.03; g.strokeStyle = 'rgba(255,255,255,0.18)'; rrect(g, m, m, bw, bh, ph * 0.22); g.stroke();\n"; assert old3 in s; s = s.replace(old3, "")
old4 = "const px = fitPx(g, o.text, '900', FAM, bw * 0.8, ph * 0.5); g.font = '900 ' + px + 'px' + FAM; g.fillText(o.text, pw / 2 + ph * 0.05, ph * 0.52);"; assert old4 in s
s = s.replace(old4, "const px = fitPx(g, o.text, '900', FAM, bw * 0.7, ph * 0.46); g.font = '900 ' + px + 'px' + FAM; g.fillText(o.text, pw / 2 + ph * 0.06, ph * 0.52);")
p.write_text(s, encoding='utf8')
# 3) headline box (base page function) replaced at build time
p = H / 'build_jc.py'; b = p.read_text(encoding='utf8'); a = "# ---- 4. duration, rail, audio, title, names"; assert a in b and 'drawHeadline' not in b
new = r'''# ---- 3b. headline box: one rounded dark card (title + subtitle inside), padded, no hairlines (replaces the base drawHeadline)
i0 = s.index('  function drawHeadline('); i1 = s.index('  function applyCamera(')
s = s[:i0] + """  function drawHeadline(title, subTag, alpha, accent = PAL.amber, t = 1e9, t0 = 0) {
    if (alpha <= 0.01) return;
    ctx.save(); ctx.globalAlpha = alpha; const padX = 36, x = 80, y = 66, tf = '800 36px system-ui, sans-serif', sf = '600 22px system-ui, sans-serif';
    ctx.font = tf; const tw = ctx.measureText(title).width; ctx.font = sf; const sw = subTag ? ctx.measureText(subTag).width : 0, w = Math.max(tw, sw) + padX * 2 + 12, h = subTag ? 116 : 78;
    ctx.shadowColor = 'rgba(11,25,30,0.38)'; ctx.shadowBlur = 20; ctx.shadowOffsetY = 7; rrect(ctx, x, y, w, h, 16); ctx.fillStyle = PAL.ink; ctx.fill(); ctx.shadowColor = 'transparent';
    ctx.save(); rrect(ctx, x, y, w, h, 16); ctx.clip(); ctx.fillStyle = accent; ctx.fillRect(x, y, 10, h); ctx.restore();
    ctx.fillStyle = PAL.ivory; ctx.textAlign = 'left'; typeAt(title, x + padX + 6, y + (subTag ? 48 : 52), t, t0 + 0.25, 42, 'left', 36);
    if (subTag) { ctx.font = sf; ctx.globalAlpha = alpha * clamp((t - t0 - 0.25 - title.length / 42) / 0.3, 0, 1); ctx.fillStyle = 'rgba(244, 241, 234, 0.82)'; ctx.textAlign = 'left'; ctx.fillText(subTag, x + padX + 6, y + 90); }
    ctx.restore();
  }

""" + s[i1:]

'''
p.write_text(b.replace(a, new + a), encoding='utf8'); print('patched')
