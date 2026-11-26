import pathlib, re
H = pathlib.Path(__file__).resolve().parent
def block(t, start, end, new):
    a = t.index(start); b = t.index(end, a); return t[:a] + new + t[b:]

# ---------------- c2p1: charts on paper ----------------
p = H / 'c2p1_scene.js'; t = p.read_text(encoding='utf8')
s1 = r'''    // ===== S1 (5.3 - 15.5) Between its October high (6.78) and Jensen's exit (8.76) in November, NVIDIA had fallen more than 47% (13.16), nearly cut in half (14.67) =====
    if (t >= 5.2 && t < 16.0) {
      Card(0, 7.2, 1.6, 10.8, 7.2, { kind: 'paint', rot: -0.02, t0: 5.6, t1: 0, paint: (g, pw, ph) => paperBars(g, pw, ph, [
        { label: 'OCTOBER', col: '#1F9D6B', keys: [[6.4, 1.0, 0.8]], text: [[6.78, 'HIGH']] },
        { label: 'NOVEMBER', col: '#D64545', keys: [[8.0, 1.0, 0.4], [8.9, 0.53, 3.4]], text: [[13.16, '-47%']] }], t, 'NVIDIA STOCK', { sub: 'indexed: October high = 100', y: [[0, '0'], [0.5, '50'], [1, '100']], refs: [{ v: 0.5, t0: 14.67, label: 'HALF', col: '#B8860B' }] }) }, t);
      if (t >= 14.67) { pop('NEARLY CUT IN HALF', 0, 2.0, 4.6, 10.2, 1.2, '#D99B26', '#0B191E', 14.67, 0); }
      Char('jensen', lerp(8.2, 14.4, easeInOut(seg(t, 8.76, 11.4))), 2.6, 2.6, Object.assign({ facing: 1, phase: 1 }, trk([[0, 'spr:cross'], [8.76, 'spr:walk']])), 5.4, 16.0, t);
      Char('trader', -9.4, 3.0, 2.3, Object.assign({ facing: 1, phase: 0 }, trk([[0, 'cross'], [9.6, 'panic']])), 5.6, 16.0, t);
      if (t >= 13.16 && t < 13.7) hit(0, 7.2, 3, 13.2, PAL.coral, 280);
    }

'''
s2 = r'''    // ===== S2 (15.5 - 23.8) Even after jumping 31.5% on Monday (17.79), the stock was still more than 30% (22.17) below its record high (23.03) =====
    if (t >= 15.4 && t < 24.4) {
      Card(26, 7.2, 1.6, 10.8, 7.2, { kind: 'paint', rot: 0.02, t0: 15.6, t1: 0, paint: (g, pw, ph) => stepChart(g, pw, ph, [[15.8, 0.76], [17.79, 0.5, 0.45], [24.2, 0.5]], t, 'NVIDIA STOCK', [[17.95, '+31.5%'], [22.17, '-30%+ BELOW', '#D64545']], { sub: 'Monday jump vs the record high', refs: [{ y: 0.1, t0: 23.03, label: 'RECORD HIGH', col: '#B8860B' }] }) }, t);
      Char('jensen', 21.0, 2.8, 2.5, Object.assign({ facing: 1, phase: 1 }, trk([[0, 'spr:cheer'], [19.8, 'spr:think']])), 15.6, 24.4, t);
      Char('trader', 31.2, 2.8, 2.4, Object.assign({ facing: -1, phase: 2 }, trk([[0, 'cheer'], [19.8, 'panic']])), 15.8, 24.4, t);
    }

'''
s3 = r'''    // ===== S3 (24 - 36) If a $100 stock drops to $53 (28.61), a 31% bounce (29.98) only brings it back to about $70 (33.11): still way below where you started (~34.1) =====
    if (t >= 24.0 && t < 36.6) {
      Card(52, 7.2, 1.6, 10.8, 7.2, { kind: 'paint', rot: -0.015, t0: 24.4, t1: 0, paint: (g, pw, ph) => paperBars(g, pw, ph, [
        { label: 'START', col: '#1F9D6B', keys: [[25.8, 1.0, 0.5]], text: [[25.97, '$100']] },
        { label: 'AFTER THE DROP', col: '#D64545', keys: [[27.0, 1.0, 0.3], [27.4, 0.53, 1.2]], text: [[28.61, '$53']] },
        { label: 'AFTER +31%', col: '#1F9D6B', keys: [[29.9, 0.53, 0.3], [30.0, 0.7, 3.1]], text: [[33.11, '$70']] }], t, 'ONE $100 STOCK', { sub: 'a 31% bounce is not a full recovery', y: [[0, '0'], [0.53, '53'], [0.7, '70'], [1, '100']], refs: [{ v: 1.0, t0: 26.2, label: 'WHERE YOU STARTED', col: '#B8860B' }] }) }, t);
      if (t >= 34.1) { pop('STILL BELOW', 52, 12.4, 4, 8.4, 1.2, '#D94E43', '#F4F1EA', 34.1, 0); if (t < 34.6) hit(52, 9.6, 3.4, 34.15, PAL.coral, 240); }
      Char('banker', 43.4, 2.8, 2.5, Object.assign({ facing: 1, phase: 1 }, trk([[0, 'think'], [25.9, 'present'], [33.1, 'cross']])), 24.0, 36.6, t);
      Char('trader', 61.0, 2.8, 2.4, Object.assign({ facing: -1, phase: 2 }, trk([[0, 'cross'], [28.6, 'panic'], [34.1, 'shrug']])), 24.2, 36.6, t);
    }

'''
s4 = r'''    // ===== S4 (36 - 45.3) Even worse, the latest sales (38.80) and profit (39.58) beat expectations (41.54), yet the stock still couldn't stay up (43.87) =====
    if (t >= 35.9) {
      Box(78, 0, -2.4, 20, 7.0, 0.6, '#6B7F8F');
      Card(78, 7.2, 1.6, 10.8, 7.2, { kind: 'paint', rot: 0.015, t0: 36.4, t1: 0, paint: (g, pw, ph) => paperBars(g, pw, ph, [
        { label: 'SALES', col: '#1F9D6B', keys: [[38.8, 0.72, 0.7]], text: [[39.2, 'BEAT']] },
        { label: 'PROFIT', col: '#1F9D6B', keys: [[39.58, 0.8, 0.7]], text: [[40.0, 'BEAT']] },
        { label: 'STOCK', col: '#D64545', keys: [[41.6, 0.8, 0.4], [42.4, 0.42, 1.8]], text: [[43.87, 'STILL FELL']] }], t, 'EXPECTATIONS vs THE STOCK', { sub: 'good news, bad reaction', y: [[0, ''], [1, '']] }) }, t);
      if (t >= 43.87 && t < 44.4) hit(78, 7.2, 4, 43.9, PAL.coral, 280);
      Char('jensen', 88.0, 2.8, 2.6, Object.assign({ facing: -1, phase: 1 }, trk([[0, 'spr:cross'], [42.4, 'spr:shrug']])), 36.0, 46, t);
      Char('trader', 67.6, 2.8, 2.4, Object.assign({ facing: 1, phase: 2 }, trk([[0, 'cross'], [38.8, 'tablet'], [43.87, 'panic']])), 36.0, 46, t);
    }

'''
t = block(t, "    // ===== S1 (5.3 - 15.5)", "    // ===== S2 (15.5 - 23.8)", s1)
t = block(t, "    // ===== S2 (15.5 - 23.8)", "    // ===== S3 (24 - 36)", s2)
t = block(t, "    // ===== S3 (24 - 36)", "    // ===== S4 (36 - 45.3)", s3)
t = block(t, "    // ===== S4 (36 - 45.3)", "    drawBG(0.05);", s4)
p.write_text(t, encoding='utf8')

# ---------------- c1p1: S2 chart on paper, decorative 3D bars removed ----------------
p = H / 'c1p1_scene.js'; t = p.read_text(encoding='utf8')
a = t.index("      Card(26, 7.4, 1.6, 9.6, 5.6, { kind: 'paint', paint: (g, pw, ph, u) => stepChart("); b = t.index("      Char('trader', 22.4")
t = t[:a] + "      Card(26, 7.2, 1.6, 10.8, 7.2, { kind: 'paint', rot: -0.02, t0: 7.4, t1: 0, paint: (g, pw, ph) => stepChart(g, pw, ph, [[7.3, 0.76], [8.3, 0.2, 1.2], [11.0, 0.52, 0.3], [13.8, 0.72, 0.5]], t, 'NVIDIA STOCK', [[9.4, '+31.5%']], { sub: 'Monday jump, Wednesday slide' }) }, t);\n" + t[b:]
p.write_text(t, encoding='utf8')

# ---------------- c1p2: S1 falling line on paper, S3 chart on paper, decorative 3D bars removed ----------------
p = H / 'c1p2_scene.js'; t = p.read_text(encoding='utf8')
a = t.index("      hqTower(0, -2, 0.62, 'NVIDIA'); const fl"); b = t.index("      if (t >= 4.0) Card(-7, 9.2")
t = t[:a] + "      hqTower(0, -2, 0.62, 'NVIDIA');\n      Card(10.0, 6.6, 1.6, 8.8, 5.8, { kind: 'paint', rot: 0.02, t0: 4.2, t1: 0, paint: (g, pw, ph) => stepChart(g, pw, ph, [[4.2, 0.22], [10.6, 0.82, 6.2]], t, 'NVIDIA STOCK', [], { sub: 'the 11 days' }) }, t);\n" + t[b:]
a = t.index("      Card(52, 7.4, 1.6, 9.6, 5.6, { kind: 'paint', paint: (g, pw, ph, u) => stepChart("); b = t.index("      Char('jensen', 52, 2.4, 2.5")
t = t[:a] + "      Card(52, 7.2, 1.6, 10.8, 7.2, { kind: 'paint', rot: -0.015, t0: 29.6, t1: 0, paint: (g, pw, ph) => stepChart(g, pw, ph, [[29.8, 0.16], [33.7, 0.36, 0.28], [35.46, 0.5, 0.28], [38.4, 0.64, 1.4]], t, 'NVIDIA STOCK', [[33.75, '-6%', '#D64545'], [35.5, '-4%', '#D64545']], { sub: 'Tuesday and Wednesday' }) }, t);\n      const fall = 0.4 * easeOut(seg(t, 33.7, 34.0)) + 0.35 * easeOut(seg(t, 35.46, 35.76)) + 0.25 * easeInOut(seg(t, 38.4, 39.8));\n" + t[b:]
p.write_text(t, encoding='utf8'); print('scenes patched')
