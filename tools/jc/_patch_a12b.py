import pathlib
H = pathlib.Path(__file__).resolve().parent
p = H / 'assets_jb.js'; t = p.read_text(encoding='utf8'); assert 'const cashChart' not in t
add = r'''  // cashChart(g, pw, ph, S, t): DATA + DEPICTION together. Left 64%: the paper line chart (stepChart: keys, tags, opt); right 36%: a cash stack whose height follows the SAME value (n = n0 + (n1-n0)*(1-y)), with bursts of bills at S.bursts times, an optional ghost stack (S.ghost layers = the record/before level) and an optional pill S.pill = [time, text, colour].
  const cashChart = (g, pw, ph, S, t) => { const cw = pw * 0.64, rw = pw - cw, y = keyVal(S.keys, t), n = S.n0 + (S.n1 - S.n0) * (1 - y); stepChart(g, cw, ph, S.keys, t, S.title, S.tags, S.opt); g.save(); g.translate(cw, 0);
    if (S.ghost) { g.save(); g.globalAlpha = 0.28; cashStack(g, rw * 0.46, ph * 0.9, rw * 0.62, S.ghost); g.restore(); }
    cashArt(g, rw, ph, [{ k: 'bag', x: 0.9, y: 0.9, s: 0.28, t0: S.t0 }, { k: 'stack', x: 0.46, y: 0.9, s: 0.62, n, t0: S.t0 }], t); (S.bursts || []).forEach(bt => cashBurst(g, rw, ph, 0.46, 0.5, t, bt, 8)); g.restore();
    if (S.pill && t >= S.pill[0]) pill(g, cw + rw * 0.5, ph * 0.1, S.pill[1], S.pill[2], ph, easeOut(seg(t, S.pill[0], S.pill[0] + 0.4))); };
  // brokenTower(x, z, tt, tCrack0, tCrackStep, nCracks, tFall0, tFall1): NVIDIA's tower BREAKING: a red crack is added at each tick (tCrack0 + k*tCrackStep), then the floors drop away one by one from the top (tFall0..tFall1), tilting and fading, with dust.
  const brokenTower = (x, z, tt, tCrack0, tCrackStep, nCracks, tFall0, tFall1) => { const N = 8, fh = 1.15;
    for (let i = 0; i < N; i++) { const ti = tFall0 + (N - 1 - i) * (tFall1 - tFall0) / N, f = Math.max(0, tt - ti), fall = 3.2 * f * f, a = f > 0 ? 1 - seg(tt, ti + 0.6, ti + 1.2) : 1, lean = Math.min(1, f * 2) * 1.0 * (i % 2 ? 1 : -1); if (a <= 0.02) continue; const y0 = i * fh - fall;
      Box(x - 2.5 + lean, y0, z, 5, fh * 0.96, 3, i === N - 1 ? '#76B900' : '#1B2A31', { a }); if (i < N - 1) for (let c = 0; c < 2; c++) Box(x - 1.7 + c * 2.2 + lean, y0 + 0.28, z + 1.55, 1.3, 0.62, 0.12, '#CFE3EA', { lw: 0, a }); }
    for (let k = 0; k < nCracks; k++) { const tk = tCrack0 + k * tCrackStep; if (tt < tk || tt > tFall0 + 1.4) continue; const u = seg(tt, tk, tk + 0.18), bx = x - 2.0 + ((k * 7) % 5) * 0.9, by = 0.8 + ((k * 5) % 7) * 1.0; Line3([bx, by, z + 1.62], [bx + 0.5 * u, by - 0.45 * u, z + 1.62], '#FF4D3D', 7, 1); Line3([bx + 0.5 * u, by - 0.45 * u, z + 1.62], [bx + 0.15 * u, by - 1.0 * u, z + 1.62], '#FF4D3D', 7, 1); }
    for (let i = 0; i < 14; i++) { const q = (tt - tFall0 - (i % 8) * 0.2); if (q < 0 || q > 1.6) continue; Box(x - 3 + ((i * 37) % 60) / 10, 1.2 + 4 * (1 - q / 1.6) - 3 * q * q, z + 1.0 + (i % 3) * 0.4, 0.4, 0.4, 0.4, '#9AA6B4', { lw: 0, a: 1 - q / 1.6 }); } };
'''
i = t.index("  const pad = (x0, z0, x1, z1, col)"); p.write_text(t[:i] + add + t[i:], encoding='utf8')
def cut(s, a, b, new):
    i = s.index(a); j = s.index(b, i); return s[:i] + new + s[j:]

# ---- c1p1 S2: chart + cash together
f = H / 'c1p1_scene.js'; s = f.read_text(encoding='utf8')
s = cut(s, "      Card(26, 7.0, 1.6, 12.0, 8.2, { kind: 'paint', t0: 7.3", "      Char('trader', 22.4", r'''      Card(26, 7.2, 1.6, 16.0, 8.8, { kind: 'paint', t0: 7.3, t1: 0, paint: (g, pw, ph) => cashChart(g, pw, ph, { keys: [[7.3, 0.76], [8.3, 0.2, 1.2], [11.0, 0.52, 0.3], [13.8, 0.72, 0.5]], title: 'NVIDIA STOCK', tags: [[9.4, '+31.5%']], opt: { sub: 'Monday jump, then the slide' }, n0: 2, n1: 15, t0: 7.4, bursts: [11.0, 13.83], pill: [13.83, 'TENS OF BILLIONS GONE', '#D64545'] }, t) }, t);
''')
f.write_text(s, encoding='utf8')

# ---- c1p2: 11 days (fast ticks + the tower BREAKS) and S3 chart + cash
f = H / 'c1p2_scene.js'; s = f.read_text(encoding='utf8')
s = cut(s, "      hqTower(0, -2, 0.62, 'NVIDIA');\n      Card(10.0, 6.8, 1.6, 9.8, 7.6", "      Char('jensen', lerp(3.0", r'''      brokenTower(0, -2.4, t, 3.9, 0.33, 11, 6.9, 9.6);
      for (let k = 0; k < 11; k++) { const tk = 3.9 + k * 0.33; if (t >= tk && t < tk + 0.28) hit(-1.5 + (k % 3) * 1.5, 1.5 + (k % 4) * 1.6, 2, tk, PAL.coral, 150); }
      Card(10.4, 6.8, 1.6, 9.8, 7.6, { kind: 'paint', t0: 3.8, t1: 0, paint: (g, pw, ph) => { const m = pw * 0.05, n = Math.max(0, Math.min(11, Math.floor((t - 3.9) / 0.33) + 1)), ph0 = (t - 3.9) % 0.33; g.save(); g.shadowColor = 'rgba(11,25,30,0.35)'; g.shadowBlur = pw * 0.04; g.shadowOffsetY = pw * 0.015; rrect(g, m, m, pw - 2 * m, ph - 2 * m, ph * 0.03); g.fillStyle = '#FBF8EF'; g.fill(); g.restore();
        g.fillStyle = '#D64545'; g.fillRect(m, m, pw - 2 * m, ph * 0.13); g.fillStyle = '#FFFFFF'; g.font = '900 ' + ph * 0.08 + 'px' + FAM; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText('NOVEMBER 2026', pw / 2, ph * 0.105);
        for (let i = 0; i < 11; i++) { const c = i % 4, r = Math.floor(i / 4), x = pw * (0.16 + c * 0.22), y = ph * (0.3 + r * 0.19), tk = 3.9 + i * 0.33, on = t >= tk, pop2 = on ? 1 + 0.35 * Math.max(0, 1 - (t - tk) / 0.18) : 1; g.save(); g.translate(x, y); g.scale(pop2, pop2); rrect(g, -pw * 0.08, -ph * 0.07, pw * 0.16, ph * 0.14, ph * 0.02); g.fillStyle = on ? '#D64545' : '#EEF2F4'; g.fill(); g.strokeStyle = '#17252B'; g.lineWidth = ph * 0.008; g.stroke(); g.fillStyle = on ? '#FFFFFF' : '#8A97A2'; g.font = '900 ' + ph * 0.075 + 'px' + FAM; g.fillText(String(i + 1), 0, ph * 0.005); if (on && t - tk < 0.15) { g.strokeStyle = '#FFFFFF'; g.lineWidth = ph * 0.015; g.beginPath(); g.moveTo(-pw * 0.05, -ph * 0.04); g.lineTo(pw * 0.05, ph * 0.04); g.moveTo(pw * 0.05, -ph * 0.04); g.lineTo(-pw * 0.05, ph * 0.04); g.stroke(); } g.restore(); }
        const last = n > 0 ? 3.9 + (n - 1) * 0.33 : 99, bump = 1 + 0.45 * Math.max(0, 1 - (t - last) / 0.2); g.fillStyle = '#17252B'; g.save(); g.translate(pw / 2, ph * 0.9); g.scale(bump, bump); g.font = '900 ' + ph * 0.1 + 'px' + FAM; g.fillText('DAY ' + Math.max(1, n) + ' OF 11', 0, 0); g.restore(); } }, t);
''')
s = cut(s, "      Card(52, 7.0, 1.6, 12.0, 8.2, { kind: 'paint', t0: 29.6", "      Char('jensen', 52, 2.4", r'''      Card(52, 7.2, 1.6, 16.0, 8.8, { kind: 'paint', t0: 29.6, t1: 0, paint: (g, pw, ph) => cashChart(g, pw, ph, { keys: [[29.8, 0.16], [33.7, 0.36, 0.28], [35.46, 0.5, 0.28], [38.4, 0.64, 1.4]], title: 'NVIDIA STOCK', tags: [[33.75, '-6%', '#D64545'], [35.5, '-4%', '#D64545']], opt: { sub: 'Tuesday and Wednesday', col: null }, n0: 3, n1: 15, t0: 29.7, bursts: [33.7, 35.46, 38.39], pill: [38.39, 'TENS OF BILLIONS GONE', '#D64545'] }, t) }, t);
''')
f.write_text(s, encoding='utf8')

# ---- c2p1: S1/S3 stacks on graph paper (axes + grid) ; S2 chart + cash together
f = H / 'c2p1_scene.js'; s = f.read_text(encoding='utf8')
s = cut(s, "      Card(0, 7.0, 1.6, 12.0, 8.2, { kind: 'paint', t0: 5.6", "      Char('jensen', lerp(8.2", r'''      Card(0, 7.2, 1.6, 12.6, 8.8, { kind: 'paint', rot: -0.01, t0: 5.6, t1: 0, paint: (g, pw, ph) => { const A = paperSheet(g, pw, ph, 'NVIDIA STOCK', 'October high = 100'), k = 0.075 * 0.28 * pw / ph, f = easeInOut(seg(t, 8.9, 12.6)), n = 14 - 6.6 * f, base = 0.83;
        refLine(g, pw, ph, base - 14 * k, 'OCTOBER HIGH', '#B8860B', seg(t, 6.78, 7.4)); cashArt(g, pw, ph, [{ k: 'stack', x: 0.32, y: base, s: 0.28, n: 14, t0: 6.4 }, { k: 'stack', x: 0.7, y: base, s: 0.28, n, t0: 8.0 }], t); cashBurst(g, pw, ph, 0.7, 0.5, t, 9.4, 8);
        g.fillStyle = '#17252B'; g.font = '900 ' + ph * 0.05 + 'px' + FAM; g.textAlign = 'center'; g.textBaseline = 'top'; g.fillText('OCTOBER', pw * 0.32, ph * 0.85); if (t >= 8.0) g.fillText('NOVEMBER', pw * 0.7, ph * 0.85);
        if (t >= 13.16) pill(g, pw * 0.7, ph * (base - n * k) - ph * 0.1, '-47%', '#D64545', ph, easeOut(seg(t, 13.16, 13.5))); refLine(g, pw, ph, base - 7 * k, 'HALF', '#2B8A6E', seg(t, 14.67, 15.3)); } }, t);
      if (t >= 14.67) { pop('NEARLY CUT IN HALF', 0, 1.2, 4.6, 10.2, 1.2, '#D99B26', '#0B191E', 14.67, 0); }
''')
s = cut(s, "      Card(26, 7.0, 1.6, 12.0, 8.2, { kind: 'paint', t0: 15.6", "      Char('jensen', 21.0", r'''      Card(26, 7.2, 1.6, 16.0, 8.8, { kind: 'paint', t0: 15.6, t1: 0, paint: (g, pw, ph) => cashChart(g, pw, ph, { keys: [[15.8, 0.76], [17.79, 0.5, 0.45], [24.2, 0.5]], title: 'NVIDIA STOCK', tags: [[17.95, '+31.5%'], [22.17, '-30%+ BELOW', '#D64545']], opt: { sub: 'Monday jump vs the record high', refs: [{ y: 0.1, t0: 23.03, label: 'RECORD HIGH', col: '#B8860B' }] }, n0: 2, n1: 14, ghost: 13, t0: 15.8, bursts: [] }, t) }, t);
''')
s = cut(s, "      Card(52, 7.0, 1.6, 13.0, 9.0, { kind: 'paint', t0: 24.4", "      if (t >= 34.1) { pop('STILL BELOW'", r'''      Card(52, 7.2, 1.6, 14.0, 9.4, { kind: 'paint', rot: -0.01, t0: 24.4, t1: 0, paint: (g, pw, ph) => { const A = paperSheet(g, pw, ph, 'ONE $100 STOCK', 'a 31% bounce is not a full recovery'), k = 0.075 * 0.2 * pw / ph, d = easeInOut(seg(t, 27.4, 28.6)), u = easeInOut(seg(t, 30.0, 33.1)), n2 = 14 - 6.6 * d, n3 = 7.4 + 2.4 * u, base = 0.83;
        refLine(g, pw, ph, base - 14 * k, 'WHERE YOU STARTED', '#B8860B', seg(t, 26.2, 26.9)); cashArt(g, pw, ph, [{ k: 'stack', x: 0.28, y: base, s: 0.2, n: 14, t0: 25.8 }, { k: 'stack', x: 0.55, y: base, s: 0.2, n: n2, t0: 27.0 }, { k: 'stack', x: 0.82, y: base, s: 0.2, n: n3, t0: 29.9 }], t); cashBurst(g, pw, ph, 0.55, 0.5, t, 27.4, 7);
        g.fillStyle = '#17252B'; g.font = '900 ' + ph * 0.045 + 'px' + FAM; g.textAlign = 'center'; g.textBaseline = 'top'; g.fillText('START', pw * 0.28, ph * 0.85); if (t >= 27.0) g.fillText('AFTER THE DROP', pw * 0.55, ph * 0.85); if (t >= 29.9) g.fillText('AFTER +31%', pw * 0.82, ph * 0.85);
        if (t >= 25.97) pill(g, pw * 0.28, ph * (base - 14 * k) - ph * 0.1, '$100', '#17252B', ph, easeOut(seg(t, 25.97, 26.3))); if (t >= 28.61) pill(g, pw * 0.55, ph * (base - n2 * k) - ph * 0.1, '$53', '#D64545', ph, easeOut(seg(t, 28.61, 28.95))); if (t >= 33.11) pill(g, pw * 0.82, ph * (base - n3 * k) - ph * 0.1, '$70', '#1F9D6B', ph, easeOut(seg(t, 33.11, 33.45))); } }, t);
''')
f.write_text(s, encoding='utf8')

# ---- c2p2 S1: stacks on paper
f = H / 'c2p2_scene.js'; s = f.read_text(encoding='utf8')
s = cut(s, "      Card(7.0, 6.8, 1.6, 10.8, 8.4, { kind: 'paint', t0: 6.2", "      Char('jensen', -2.0", r'''      Card(7.0, 6.9, 1.6, 11.4, 8.8, { kind: 'paint', rot: -0.01, t0: 6.2, t1: 0, paint: (g, pw, ph) => { const A = paperSheet(g, pw, ph, 'IS SELLING CHIPS ENOUGH?', 'for a company worth trillions'), k = 0.075 * 0.24 * pw / ph, base = 0.83; cashArt(g, pw, ph, [{ k: 'stack', x: 0.3, y: base, s: 0.24, n: 5, t0: 7.0 }, { k: 'stack', x: 0.7, y: base, s: 0.24, n: 14, t0: 7.4 }], t);
        g.fillStyle = '#17252B'; g.font = '900 ' + ph * 0.05 + 'px' + FAM; g.textAlign = 'center'; g.textBaseline = 'top'; if (t >= 7.0) g.fillText('CHIP SALES', pw * 0.3, ph * 0.85); if (t >= 7.4) g.fillText('WHAT INVESTORS WANT', pw * 0.7, ph * 0.85);
        refLine(g, pw, ph, base - 14 * k, '', '#B8860B', seg(t, 7.6, 8.4)); if (t >= 7.87) pill(g, pw * 0.3, ph * (base - 5 * k) - ph * 0.1, 'NOT ENOUGH', '#D64545', ph, easeOut(seg(t, 7.87, 8.3))); } }, t);
''')
f.write_text(s, encoding='utf8'); print('patched')
