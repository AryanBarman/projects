import pathlib
H = pathlib.Path(__file__).resolve().parent
p = H / 'assets_jb.js'; t = p.read_text(encoding='utf8'); assert 'const rackArt' not in t
add = r'''  // ===== 2D-WITH-DEPTH PROPS (front + side + top faces, shadow): rackArt (server rack, lit = 0..1), plantArt (power plant: cooling towers rising with prog 0..1, crane, smoke) =====
  const rackArt = (g, cx, by, w, h, lit, tt) => { const d = w * 0.3, dy = d * 0.5; g.save(); g.lineJoin = 'round'; g.lineWidth = Math.max(2, w * 0.025); g.strokeStyle = '#141E26'; g.fillStyle = '#2B3C48'; g.beginPath(); g.moveTo(cx + w / 2, by); g.lineTo(cx + w / 2 + d, by - dy); g.lineTo(cx + w / 2 + d, by - h - dy); g.lineTo(cx + w / 2, by - h); g.closePath(); g.fill(); g.stroke();
    const gr = g.createLinearGradient(cx - w / 2, 0, cx + w / 2, 0); gr.addColorStop(0, '#5A6E7D'); gr.addColorStop(1, '#3C4E5B'); g.fillStyle = gr; g.fillRect(cx - w / 2, by - h, w, h); g.strokeRect(cx - w / 2, by - h, w, h);
    const rows = 6; for (let r = 0; r < rows; r++) { const y = by - h + h * (0.07 + r * 0.15); g.fillStyle = '#1E2B35'; g.fillRect(cx - w * 0.42, y, w * 0.84, h * 0.11); for (let k = 0; k < 4; k++) { const on = lit > (r * 4 + k) / (rows * 4) + 0.02; g.fillStyle = on ? (Math.sin(tt * 7 + r + k) > 0.6 ? '#C8FFD8' : '#4FE0A5') : '#3A4750'; g.beginPath(); g.arc(cx - w * 0.3 + k * w * 0.17, y + h * 0.055, w * 0.04, 0, 7); g.fill(); } }
    g.fillStyle = '#7C91A0'; g.beginPath(); g.moveTo(cx - w / 2, by - h); g.lineTo(cx - w / 2 + d, by - h - dy); g.lineTo(cx + w / 2 + d, by - h - dy); g.lineTo(cx + w / 2, by - h); g.closePath(); g.fill(); g.stroke(); g.restore(); };
  const plantArt = (g, cx, by, s, prog, tt) => { g.save(); g.lineJoin = 'round'; g.lineWidth = Math.max(2, s * 0.025); g.strokeStyle = '#3E4650';
    const tower = (x, sc) => { const H = s * 1.1 * sc * prog; if (H < 2) return; g.save(); g.beginPath(); g.rect(x - s * 0.5, by - H, s, H); g.clip(); g.beginPath(); g.moveTo(x - s * 0.34 * sc, by); g.bezierCurveTo(x - s * 0.2 * sc, by - s * 0.5 * sc, x - s * 0.18 * sc, by - s * 0.8 * sc, x - s * 0.27 * sc, by - s * 1.1 * sc); g.lineTo(x + s * 0.27 * sc, by - s * 1.1 * sc); g.bezierCurveTo(x + s * 0.18 * sc, by - s * 0.8 * sc, x + s * 0.2 * sc, by - s * 0.5 * sc, x + s * 0.34 * sc, by); g.closePath(); const gr = g.createLinearGradient(x - s * 0.34 * sc, 0, x + s * 0.34 * sc, 0); gr.addColorStop(0, '#E4E9EC'); gr.addColorStop(0.6, '#BCC5CB'); gr.addColorStop(1, '#8C99A2'); g.fillStyle = gr; g.fill(); g.stroke(); g.restore(); };
    g.fillStyle = 'rgba(0,0,0,0.18)'; g.beginPath(); g.ellipse(cx, by + s * 0.03, s * 0.8, s * 0.07, 0, 0, 7); g.fill(); tower(cx - s * 0.3, 1); tower(cx + s * 0.32, 0.82);
    if (prog > 0.96) for (let i = 0; i < 4; i++) { const q = (tt * 0.5 + i * 0.25) % 1; g.globalAlpha = 0.6 * (1 - q); g.fillStyle = '#F4F7F9'; g.beginPath(); g.arc(cx - s * 0.3 + Math.sin(q * 5 + i) * s * 0.05, by - s * 1.2 - q * s * 0.5, s * (0.1 + q * 0.12), 0, 7); g.fill(); } g.globalAlpha = 1;
    const mx = cx + s * 0.78, mh = s * 1.45 * Math.min(1, prog * 1.2 + 0.1); g.strokeStyle = '#B8860B'; g.lineWidth = s * 0.035; g.beginPath(); g.moveTo(mx, by); g.lineTo(mx, by - mh); g.stroke(); for (let r = 1; r < 7; r++) { const y = by - mh * r / 7; g.beginPath(); g.moveTo(mx - s * 0.06, y); g.lineTo(mx + s * 0.06, y - mh / 14); g.stroke(); }
    g.lineWidth = s * 0.05; g.beginPath(); g.moveTo(mx - s * 0.5, by - mh); g.lineTo(mx + s * 0.2, by - mh); g.stroke(); const sw = Math.sin(tt * 1.6) * s * 0.05; g.lineWidth = s * 0.012; g.beginPath(); g.moveTo(mx - s * 0.4, by - mh); g.lineTo(mx - s * 0.4 + sw, by - mh + s * 0.22); g.stroke(); g.fillStyle = '#B8860B'; g.fillRect(mx - s * 0.44 + sw, by - mh + s * 0.22, s * 0.08, s * 0.06); g.restore(); };
'''
i = t.index("  const pad = (x0, z0, x1, z1, col)"); p.write_text(t[:i] + add + t[i:], encoding='utf8')
s = (H / 'c27_scene.js').read_text(encoding='utf8')
def blk(s, a, b, new):
    i = s.index(a); j = s.index(b, i); return s[:i] + new + s[j:]
s3 = r'''    // ===== S3 (11.9 - 17.2) 2D (large, phone-readable): tech giants pay TENS (13.16) of BILLIONS (13.58) UP FRONT for GPU (14.79) clusters: a company building on the left, a rack of GPUs on the right, a thick arrow with money bags travelling to the racks, which then light up =====
    if (t >= 11.8 && t < 17.7) {
      const C = 52; Card(C, 7.4, 1.2, 12.6, 10.4, { kind: 'paint', t0: 12.0, t1: 0, paint: (g, pw, ph) => { const m = pw * 0.03; g.save(); g.shadowColor = 'rgba(11,25,30,0.35)'; g.shadowBlur = pw * 0.04; g.shadowOffsetY = pw * 0.015; rrect(g, m, m, pw - 2 * m, ph - 2 * m, ph * 0.03); g.fillStyle = '#FBF8EF'; g.fill(); g.restore();
        const u1 = seg(t, 12.2, 12.7), u2 = seg(t, 14.4, 14.9), ar = seg(t, 13.16, 13.9), lit = seg(t, 14.79, 16.2); g.save(); g.globalAlpha = u1; g.translate(pw * 0.2, ph * 0.68); bdIcon(g, 'company', 0, -ph * 0.1, ph * 0.2); g.fillStyle = '#17252B'; g.textAlign = 'center'; g.font = '900 ' + ph * 0.075 + 'px' + FAM; g.fillText('BIG TECH', 0, ph * 0.22); g.restore();
        g.save(); g.globalAlpha = u2; rackArt(g, pw * 0.76, ph * 0.74, pw * 0.14, ph * 0.5, lit, t); rackArt(g, pw * 0.9, ph * 0.74, pw * 0.1, ph * 0.4, lit, t + 1); g.fillStyle = '#17252B'; g.textAlign = 'center'; g.font = '900 ' + ph * 0.075 + 'px' + FAM; g.fillText('GPU CLUSTERS', pw * 0.8, ph * 0.9); g.restore();
        if (ar > 0) { const x0 = pw * 0.33, x1 = pw * 0.64, y = ph * 0.52; g.strokeStyle = '#B8860B'; g.lineWidth = ph * 0.045; g.lineCap = 'round'; g.beginPath(); g.moveTo(x0, y); g.lineTo(lerp(x0, x1, ar), y); g.stroke(); if (ar > 0.95) { g.fillStyle = '#B8860B'; g.beginPath(); g.moveTo(x1 + ph * 0.07, y); g.lineTo(x1 - ph * 0.02, y - ph * 0.07); g.lineTo(x1 - ph * 0.02, y + ph * 0.07); g.closePath(); g.fill(); } for (let k = 0; k < 2; k++) { const q = ((t - 13.9) * 0.55 + k * 0.5) % 1; if (t > 13.9) cashBag(g, lerp(x0, x1 - ph * 0.04, q), y - ph * 0.045, ph * 0.12); } }
        g.fillStyle = '#17252B'; g.textAlign = 'center'; g.font = '900 ' + ph * 0.085 + 'px' + FAM; g.globalAlpha = seg(t, 13.16, 13.6); g.fillText('TENS OF BILLIONS', pw * 0.5, ph * 0.12); g.font = '800 ' + ph * 0.06 + 'px' + FAM; g.fillStyle = '#B8412F'; g.fillText('PAID UP FRONT', pw * 0.5, ph * 0.2); } }, t);
      Char('banker', C - 5.4, 3.8, 3.3, Object.assign({ facing: 1, phase: 1 }, trk([[0, 'think'], [13.16, 'point']])), 11.9, 17.7, t);
    }

'''
s4 = r'''    // ===== S4 (17.2 - 22.1) 2D with depth: a server rack ships in WEEKS (17.92): it slides in and lights up within a second or two; building the POWER (19.13) plant takes YEARS (20.87): the cooling towers and the crane rise slowly while calendar pages tick by =====
    if (t >= 17.1 && t < 22.1) {
      const C = 78; Card(C, 7.4, 1.2, 12.8, 9.6, { kind: 'paint', t0: 17.2, t1: 0, paint: (g, pw, ph) => { const m = pw * 0.03; g.save(); g.shadowColor = 'rgba(11,25,30,0.35)'; g.shadowBlur = pw * 0.04; g.shadowOffsetY = pw * 0.015; rrect(g, m, m, pw - 2 * m, ph - 2 * m, ph * 0.03); g.fillStyle = '#EAF2F6'; g.fill(); g.restore(); g.fillStyle = '#C9D5DC'; g.fillRect(m, ph * 0.76, pw - 2 * m, ph * 0.2);
        const sl = easeOut(seg(t, 17.4, 18.2)), lit = seg(t, 18.4, 19.2), rx = lerp(-pw * 0.2, pw * 0.2, sl); g.save(); g.globalAlpha = Math.min(1, sl * 2); rackArt(g, rx, ph * 0.8, pw * 0.2, ph * 0.52, lit, t); if (sl < 1) { g.strokeStyle = 'rgba(23,37,43,0.35)'; g.lineWidth = ph * 0.01; for (let k = 0; k < 4; k++) { g.beginPath(); g.moveTo(rx - pw * 0.14 - k * pw * 0.04, ph * (0.35 + k * 0.1)); g.lineTo(rx - pw * 0.2 - k * pw * 0.04, ph * (0.35 + k * 0.1)); g.stroke(); } } g.restore();
        plantArt(g, pw * 0.7, ph * 0.84, pw * 0.34, easeInOut(seg(t, 19.13, 22.0)) * 0.97, t);
        const wk = seg(t, 17.92, 18.3), yr = seg(t, 20.87, 21.3); g.textAlign = 'center'; g.font = '900 ' + ph * 0.1 + 'px' + FAM; g.fillStyle = '#2B8A6E'; g.globalAlpha = wk; g.fillText('WEEKS', pw * 0.2, ph * 0.15); g.fillStyle = '#B8412F'; g.globalAlpha = yr; g.fillText('YEARS', pw * 0.7, ph * 0.15); g.globalAlpha = 1;
        const nc = Math.floor(seg(t, 19.13, 21.9) * 6); for (let k = 0; k < nc; k++) bdIcon(g, 'cal', pw * 0.5 + k * pw * 0.075, ph * 0.93, ph * 0.035); } }, t);
      Char('engineer', C - 5.6, 3.8, 3.3, Object.assign({ facing: 1, phase: 1 }, trk([[0, 'cross'], [17.92, 'cheer'], [20.87, 'think']])), 17.2, 22.1, t);
    }

'''
s = blk(s, "    // ===== S3 (11.9 - 17.2)", "    // ===== S4 (17.2 - 21.6)", s3)
s = blk(s, "    // ===== S4 (17.2 - 21.6)", "    // ===== S5 (22 - 31.4)", s4)
(H / 'c27_scene.js').write_text(s, encoding='utf8'); print('ok')
