import pathlib
H = pathlib.Path(__file__).resolve().parent
# ---------------- assets: cashBurst, refLine, doorCard ----------------
p = H / 'assets_jb.js'; t = p.read_text(encoding='utf8'); assert 'const doorCard' not in t
add = r'''  // cashBurst(g, pw, ph, x, y, tt, t0, n, a): n bills burst out of a pile (x, y fractions) from time t0. refLine(g, pw, ph, y, label, col, u): dashed reference line across a cash card (y fraction), label at the right.
  const cashBurst = (g, pw, ph, x, y, tt, t0, n, a) => { const q = tt - t0; if (q <= 0 || q > 1.4) return; for (let k = 0; k < n; k++) { const vx = (k - (n - 1) / 2) * pw * 0.07, vy = ph * (0.45 + 0.12 * ((k * 5) % 3)); cashBill(g, x * pw + vx * q * 1.4, y * ph - vy * q + ph * 1.5 * q * q, pw * 0.1, pw * 0.055, q * (k % 2 ? 4 : -4), Math.max(0, 1 - q / 1.3) * (a === undefined ? 1 : a)); } };
  const refLine = (g, pw, ph, y, label, col, u) => { if (u <= 0) return; g.save(); g.setLineDash([ph * 0.03, ph * 0.025]); g.strokeStyle = col || '#B8860B'; g.lineWidth = ph * 0.01; g.beginPath(); g.moveTo(pw * 0.03, y * ph); g.lineTo(pw * (0.03 + 0.94 * u), y * ph); g.stroke(); g.restore(); if (label && u > 0.9) { g.fillStyle = col || '#B8860B'; g.font = '900 ' + ph * 0.05 + 'px' + FAM; g.textAlign = 'right'; g.textBaseline = 'bottom'; g.fillText(label, pw * 0.97, y * ph - ph * 0.01); } };
  // doorCard(g, pw, ph, kind 'debt'|'rate'|'probe', label, t, t0): icon card for the three problems (chained money bag / rate gauge / magnifier over a paper)
  const doorCard = (g, pw, ph, kind, label, t, t0) => { const q = seg(t, t0, t0 + 0.4), m = pw * 0.05; g.save(); g.translate(pw / 2, ph / 2); g.scale(0.7 + 0.3 * q, 0.7 + 0.3 * q); g.translate(-pw / 2, -ph / 2); g.globalAlpha = q; g.shadowColor = 'rgba(11,25,30,0.35)'; g.shadowBlur = pw * 0.05; g.shadowOffsetY = pw * 0.02; rrect(g, m, m, pw - 2 * m, ph - 2 * m, ph * 0.08); g.fillStyle = '#FBF8EF'; g.fill(); g.shadowColor = 'transparent';
    if (kind === 'debt') { cashBag(g, pw * 0.5, ph * 0.7, ph * 0.5); g.strokeStyle = '#5E6F7A'; g.lineWidth = ph * 0.03; for (let s2 = 0; s2 < 2; s2++) for (let k = 0; k < 6; k++) { const f = k / 5, x = lerp(pw * 0.2, pw * 0.8, s2 ? 1 - f : f), y = lerp(ph * 0.22, ph * 0.66, f); g.beginPath(); g.ellipse(x, y, ph * 0.035, ph * 0.02, s2 ? -0.7 : 0.7, 0, 7); g.stroke(); } }
    else if (kind === 'rate') bdIcon(g, 'gauge', pw * 0.5, ph * 0.46, pw * 0.3, undefined, 0.15 + 0.75 * seg(t, t0, t0 + 1.4));
    else { bdIcon(g, 'paper', pw * 0.42, ph * 0.46, pw * 0.22); bdIcon(g, 'eye', pw * 0.64, ph * 0.38, pw * 0.17); }
    g.fillStyle = '#17252B'; g.textAlign = 'center'; g.textBaseline = 'middle'; g.font = '900 ' + Math.min(ph * 0.1, pw * 0.86 / (label.length * 0.62)) + 'px' + FAM; g.fillText(label, pw / 2, ph * 0.9); g.restore(); };
'''
i = t.index("  const pad = (x0, z0, x1, z1, col)"); p.write_text(t[:i] + add + t[i:], encoding='utf8')

def cut(s, a, b, new, keep_b=True):
    i = s.index(a); j = s.index(b, i); return s[:i] + new + s[j:]

# ---------------- c1p1 ----------------
f = H / 'c1p1_scene.js'; s = f.read_text(encoding='utf8')
s2 = r'''      Card(26, 7.0, 1.6, 12.0, 8.2, { kind: 'paint', t0: 7.3, t1: 0, paint: (g, pw, ph) => { const up = easeOut(seg(t, 8.3, 9.6)), d1 = easeInOut(seg(t, 11.0, 12.6)), d2 = easeInOut(seg(t, 13.83, 14.6)), n = 5 + 9 * up - 5.5 * d1 - 3 * d2, k = 0.075 * 0.34 * pw / ph;
        refLine(g, pw, ph, 0.9 - 5 * k, 'BEFORE THE RALLY', '#B8860B', seg(t, 8.0, 8.8)); cashArt(g, pw, ph, [{ k: 'bag', x: 0.12, y: 0.9, s: 0.2, t0: 7.5 }, { k: 'bag', x: 0.88, y: 0.9, s: 0.2, t0: 7.6 }, { k: 'stack', x: 0.42, y: 0.9, s: 0.34, n, t0: 7.4 }], t);
        cashBurst(g, pw, ph, 0.42, 0.5, t, 11.0, 7); cashBurst(g, pw, ph, 0.42, 0.5, t, 13.83, 9);
        if (t >= 9.4 && t < 11.0) pill(g, pw * 0.42, ph * (0.9 - n * k) - ph * 0.1, '+31.5%', '#1F9D6B', ph, easeOut(seg(t, 9.4, 9.8))); if (t >= 13.83) pill(g, pw * 0.5, ph * 0.12, 'TENS OF BILLIONS GONE', '#D64545', ph, easeOut(seg(t, 13.83, 14.2))); } }, t);
'''
s = cut(s, "      Card(26, 7.2, 1.6, 10.8, 7.2, { kind: 'paint', rot: -0.02, t0: 7.4", "      Char('trader', 22.4", s2)
s3 = r'''      [[43.4, 19.58, 'debt', 'DEBT'], [52, 21.77, 'rate', 'RATE HIKE'], [60.6, 23.24, 'probe', 'INVESTIGATION']].forEach(([dx, t0, kd, lab]) => {
        door(dx, -1.9, true); if (t >= t0 - 0.1) { Card(dx, 9.6, 1.6, 6.2, 6.2, { kind: 'paint', t0, t1: 0, paint: (g, pw, ph) => doorCard(g, pw, ph, kd, lab, t, t0) }, t); hit(dx, 4.4, -1.2, t0 + 0.05, kd === 'probe' ? PAL.cyan : PAL.amberHi, 240); }
      });
'''
s = cut(s, "      [[43.4, 19.58, 'DEBT CRISIS'", "      Char('jensen', 52, 4.2", s3)
f.write_text(s, encoding='utf8')

# ---------------- c1p2 ----------------
f = H / 'c1p2_scene.js'; s = f.read_text(encoding='utf8')
a0 = r'''      [[-34.6, 'debt', 'DEBT'], [-26, 'rate', 'RATE HIKE'], [-17.4, 'probe', 'INVESTIGATION']].forEach(([dx, kd, lab]) => { door(dx, -1.9, true); Card(dx, 9.6, 1.6, 6.2, 6.2, { kind: 'paint', t0: -20, t1: 0, paint: (g, pw, ph) => doorCard(g, pw, ph, kd, lab, 99, -20) }, t); });
'''
s = cut(s, "      [[-34.6, 'DEBT CRISIS'", "      Char('jensen', -26, 4.2", a0)
a1 = r'''      Card(10.0, 6.8, 1.6, 9.8, 7.6, { kind: 'paint', rot: 0.02, t0: 4.2, t1: 0, paint: (g, pw, ph) => { const m = pw * 0.05, n = Math.min(11, Math.floor((t - 4.2) / 0.6) + 1); g.save(); g.shadowColor = 'rgba(11,25,30,0.35)'; g.shadowBlur = pw * 0.04; g.shadowOffsetY = pw * 0.015; rrect(g, m, m, pw - 2 * m, ph - 2 * m, ph * 0.03); g.fillStyle = '#FBF8EF'; g.fill(); g.restore();
        g.fillStyle = '#D64545'; g.fillRect(m, m, pw - 2 * m, ph * 0.13); g.fillStyle = '#FFFFFF'; g.font = '900 ' + ph * 0.08 + 'px' + FAM; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText('NOVEMBER 2026', pw / 2, ph * 0.105);
        for (let i = 0; i < 11; i++) { const c = i % 4, r = Math.floor(i / 4), x = pw * (0.16 + c * 0.22), y = ph * (0.3 + r * 0.19), on = t >= 4.2 + i * 0.6; rrect(g, x - pw * 0.08, y - ph * 0.07, pw * 0.16, ph * 0.14, ph * 0.02); g.fillStyle = on ? '#D64545' : '#EEF2F4'; g.fill(); g.strokeStyle = '#17252B'; g.lineWidth = ph * 0.008; g.stroke(); g.fillStyle = on ? '#FFFFFF' : '#8A97A2'; g.font = '900 ' + ph * 0.075 + 'px' + FAM; g.fillText(String(i + 1), x, y + ph * 0.005); }
        g.fillStyle = '#17252B'; g.font = '900 ' + ph * 0.1 + 'px' + FAM; g.fillText('DAY ' + Math.max(1, n) + ' OF 11', pw / 2, ph * 0.9); } }, t);
'''
s = cut(s, "      Card(10.0, 6.6, 1.6, 8.8, 5.8", "      Char('jensen', lerp(3.0", a1)
a2 = r'''      if (t >= 18.17) Card(40.5, 7.2, 1.6, 9.4, 8.2, { kind: 'paint', t0: 18.17, t1: 0, paint: (g, pw, ph) => { const up = easeOut(seg(t, 18.17, 19.4)); cashArt(g, pw, ph, [{ k: 'bag', x: 0.1, y: 0.9, s: 0.2, t0: 18.3 }, { k: 'stack', x: 0.3, y: 0.9, s: 0.28, n: 4 + 5 * up, t0: 18.17 }, { k: 'stack', x: 0.64, y: 0.9, s: 0.28, n: 9, t0: 22.16 }, { k: 'stack', x: 0.47, y: 0.56, s: 0.25, n: 8, t0: 22.5 }, { k: 'bag', x: 0.9, y: 0.9, s: 0.2, t0: 22.3 }], t);
        if (t >= 18.4 && t < 21.9) pill(g, pw * 0.3, ph * 0.4, '+31.5%', '#1F9D6B', ph, easeOut(seg(t, 18.4, 18.8))); if (t >= 22.16) pill(g, pw * 0.5, ph * 0.1, '~$1 TRILLION BACK', '#17252B', ph, easeOut(seg(t, 22.16, 22.6))); } }, t);
      if (t >= 28.38) Card(26, 12.6, 1.8, 4.6, 4.6, { kind: 'paint', t0: 28.38, t1: 0, paint: (g, pw, ph) => { const q = easeOut(seg(t, 28.38, 29.6)), a = seg(t, 28.38, 28.7); g.save(); g.globalAlpha = a; bdIcon(g, 'rocket', pw * 0.5, ph * (0.8 - 0.45 * q), pw * 0.3); g.restore(); } }, t);
'''
s = cut(s, "      if (t >= 18.17) steps(36", "    }\n\n    // ===== S3 (29.5", a2)
a3 = r'''      Card(52, 7.0, 1.6, 12.0, 8.2, { kind: 'paint', t0: 29.6, t1: 0, paint: (g, pw, ph) => { const d1 = easeInOut(seg(t, 33.7, 34.5)), d2 = easeInOut(seg(t, 35.46, 36.2)), d3 = easeInOut(seg(t, 38.39, 39.2)), n = 12 - 3.5 * d1 - 2.5 * d2 - 2 * d3;
        cashArt(g, pw, ph, [{ k: 'bag', x: 0.12, y: 0.9, s: 0.2, t0: 29.8 }, { k: 'bag', x: 0.88, y: 0.9, s: 0.2, t0: 29.9 }, { k: 'stack', x: 0.5, y: 0.9, s: 0.34, n, t0: 29.7 }], t); cashBurst(g, pw, ph, 0.5, 0.5, t, 33.7, 7); cashBurst(g, pw, ph, 0.5, 0.5, t, 35.46, 7); cashBurst(g, pw, ph, 0.5, 0.5, t, 38.39, 9);
        if (t >= 33.75) pill(g, pw * 0.2, ph * 0.3, '-6%', '#D64545', ph, easeOut(seg(t, 33.75, 34.1))); if (t >= 35.5) pill(g, pw * 0.8, ph * 0.3, '-4%', '#D64545', ph, easeOut(seg(t, 35.5, 35.9))); if (t >= 38.39) pill(g, pw * 0.5, ph * 0.1, 'TENS OF BILLIONS GONE', '#D64545', ph, easeOut(seg(t, 38.39, 38.8))); } }, t);
'''
s = cut(s, "      Card(52, 7.2, 1.6, 10.8, 7.2, { kind: 'paint', rot: -0.015, t0: 29.6", "      Char('jensen', 52, 2.4", a3)
i = s.index("      if (t >= 38.39) Card(52, 3.0, 2.6"); j = s.index('\n', i) + 1; s = s[:i] + s[j:]
f.write_text(s, encoding='utf8')

# ---------------- c2p1 ----------------
f = H / 'c2p1_scene.js'; s = f.read_text(encoding='utf8')
b1 = r'''      Card(0, 7.0, 1.6, 12.0, 8.2, { kind: 'paint', t0: 5.6, t1: 0, paint: (g, pw, ph) => { const k = 0.075 * 0.3 * pw / ph, f = easeInOut(seg(t, 8.9, 12.6)), n = 14 - 6.6 * f;
        cashArt(g, pw, ph, [{ k: 'stack', x: 0.28, y: 0.9, s: 0.3, n: 14, t0: 6.4 }], t);
        cashArt(g, pw, ph, [{ k: 'stack', x: 0.72, y: 0.9, s: 0.3, n, t0: 8.0 }], t); cashBurst(g, pw, ph, 0.72, 0.5, t, 9.4, 8);
        if (t >= 6.78) pill(g, pw * 0.28, ph * 0.12, 'OCTOBER HIGH', '#17252B', ph, easeOut(seg(t, 6.78, 7.2))); if (t >= 8.76) pill(g, pw * 0.72, ph * 0.12, 'NOVEMBER', '#17252B', ph, easeOut(seg(t, 8.76, 9.1))); if (t >= 13.16) pill(g, pw * 0.72, ph * (0.9 - n * k) - ph * 0.1, '-47%', '#D64545', ph, easeOut(seg(t, 13.16, 13.5)));
        refLine(g, pw, ph, 0.9 - 7 * k, 'HALF', '#B8860B', seg(t, 14.67, 15.3)); } }, t);
      if (t >= 14.67) { pop('NEARLY CUT IN HALF', 0, 1.2, 4.6, 10.2, 1.2, '#D99B26', '#0B191E', 14.67, 0); }
'''
s = cut(s, "      Card(0, 7.2, 1.6, 10.8, 7.2, { kind: 'paint', rot: -0.02, t0: 5.6", "      Char('jensen', lerp(8.2", b1)
b2 = r'''      Card(26, 7.0, 1.6, 12.0, 8.2, { kind: 'paint', t0: 15.6, t1: 0, paint: (g, pw, ph) => { const k = 0.075 * 0.3 * pw / ph, up = easeOut(seg(t, 17.79, 18.6)), n = 7.4 + 2.3 * up;
        g.save(); g.globalAlpha = 0.28; cashStack(g, pw * 0.72, ph * 0.9, pw * 0.3, 14); g.restore(); refLine(g, pw, ph, 0.9 - 14 * k, 'RECORD HIGH', '#B8860B', seg(t, 23.03, 23.7));
        cashArt(g, pw, ph, [{ k: 'stack', x: 0.28, y: 0.9, s: 0.3, n, t0: 15.8 }], t); cashBurst(g, pw, ph, 0.28, 0.5, t, 17.79, 0);
        if (t >= 17.95 && t < 22.1) pill(g, pw * 0.28, ph * (0.9 - n * k) - ph * 0.1, '+31.5%', '#1F9D6B', ph, easeOut(seg(t, 17.95, 18.3))); if (t >= 22.17) pill(g, pw * 0.5, ph * 0.1, '-30%+ BELOW', '#D64545', ph, easeOut(seg(t, 22.17, 22.6))); } }, t);
'''
s = cut(s, "      Card(26, 7.2, 1.6, 10.8, 7.2, { kind: 'paint', rot: 0.02, t0: 15.6", "      Char('jensen', 21.0", b2)
b3 = r'''      Card(52, 7.0, 1.6, 13.0, 9.0, { kind: 'paint', t0: 24.4, t1: 0, paint: (g, pw, ph) => { const k = 0.075 * 0.22 * pw / ph, d = easeInOut(seg(t, 27.4, 28.6)), u = easeInOut(seg(t, 30.0, 33.1)), n2 = 14 - 6.6 * d, n3 = 7.4 + 2.4 * u;
        cashArt(g, pw, ph, [{ k: 'stack', x: 0.2, y: 0.9, s: 0.22, n: 14, t0: 25.8 }, { k: 'stack', x: 0.5, y: 0.9, s: 0.22, n: n2, t0: 27.0 }, { k: 'stack', x: 0.8, y: 0.9, s: 0.22, n: n3, t0: 29.9 }], t); cashBurst(g, pw, ph, 0.5, 0.5, t, 27.4, 7); refLine(g, pw, ph, 0.9 - 14 * k, 'WHERE YOU STARTED', '#B8860B', seg(t, 26.2, 26.9));
        if (t >= 25.97) pill(g, pw * 0.2, ph * (0.9 - 14 * k) - ph * 0.1, '$100', '#17252B', ph, easeOut(seg(t, 25.97, 26.3))); if (t >= 28.61) pill(g, pw * 0.5, ph * (0.9 - n2 * k) - ph * 0.1, '$53', '#D64545', ph, easeOut(seg(t, 28.61, 28.95))); if (t >= 33.11) pill(g, pw * 0.8, ph * (0.9 - n3 * k) - ph * 0.1, '$70', '#1F9D6B', ph, easeOut(seg(t, 33.11, 33.45))); } }, t);
      if (t >= 34.1) { pop('STILL BELOW', 52, 12.4, 4, 8.4, 1.2, '#D94E43', '#F4F1EA', 34.1, 0); if (t < 34.6) hit(52, 9.6, 3.4, 34.15, PAL.coral, 240); }
'''
s = cut(s, "      Card(52, 7.2, 1.6, 10.8, 7.2, { kind: 'paint', rot: -0.015, t0: 24.4", "      Char('banker', 43.4", b3)
f.write_text(s, encoding='utf8')

# ---------------- c2p2 ----------------
f = H / 'c2p2_scene.js'; s = f.read_text(encoding='utf8')
c1 = r'''      Card(7.0, 6.8, 1.6, 10.8, 8.4, { kind: 'paint', t0: 6.2, t1: 0, paint: (g, pw, ph) => { const k = 0.075 * 0.26 * pw / ph; cashArt(g, pw, ph, [{ k: 'stack', x: 0.26, y: 0.9, s: 0.26, n: 5, t0: 7.0 }, { k: 'stack', x: 0.72, y: 0.9, s: 0.26, n: 18, t0: 7.4 }], t);
        g.fillStyle = '#17252B'; g.font = '900 ' + ph * 0.06 + 'px' + FAM; g.textAlign = 'center'; g.textBaseline = 'middle'; if (t >= 7.0) g.fillText('CHIP SALES', pw * 0.26, ph * 0.96); if (t >= 7.4) g.fillText('WHAT INVESTORS WANT', pw * 0.72, ph * 0.96);
        if (t >= 7.87) pill(g, pw * 0.26, ph * (0.9 - 5 * k) - ph * 0.1, 'NOT ENOUGH', '#D64545', ph, easeOut(seg(t, 7.87, 8.3))); } }, t);
'''
s = cut(s, "      Card(7.0, 6.8, 1.6, 9.6, 6.4, { kind: 'paint', rot: -0.02, t0: 6.2", "      Char('jensen', -2.0", c1)
f.write_text(s, encoding='utf8'); print('patched a1 a2')
