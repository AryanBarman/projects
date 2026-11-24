  // ===== PORTRAIT (9:16) OVERRIDES: headline, captions and progress are re-laid-out for a phone screen =====
  function drawHeadline(title, subTag, alpha, accent, t, t0) {
    if (alpha <= 0.01) return;
    ctx.save(); ctx.globalAlpha = alpha; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    let sz = 70; ctx.font = '900 ' + sz + 'px system-ui, "Segoe UI", sans-serif'; while (ctx.measureText(title).width > 900 && sz > 36) { sz -= 4; ctx.font = '900 ' + sz + 'px system-ui, "Segoe UI", sans-serif'; }
    const tw = ctx.measureText(title).width; let s3 = 34; if (subTag) { ctx.font = '600 ' + s3 + 'px system-ui, "Segoe UI", sans-serif'; while (ctx.measureText(subTag).width > 860 && s3 > 22) { s3 -= 2; ctx.font = '600 ' + s3 + 'px system-ui, "Segoe UI", sans-serif'; } } const sw = subTag ? ctx.measureText(subTag).width : 0; ctx.font = '900 ' + sz + 'px system-ui, "Segoe UI", sans-serif'; const w = Math.min(1000, Math.max(tw, sw) + 100), hh = subTag ? 190 : 120, y0 = 150, x0 = 540 - w / 2;
    ctx.fillStyle = 'rgba(8,19,24,0.88)'; ctx.beginPath(); ctx.roundRect(x0, y0, w, hh, 26); ctx.fill();
    ctx.fillStyle = accent; ctx.fillRect(x0 + 26, y0 + 26, 12, hh - 52);
    ctx.fillStyle = PAL.ivory; ctx.fillText(title, 540 + 14, y0 + (subTag ? 62 : hh / 2));
    if (subTag) { let s2 = 34; ctx.font = '600 ' + s2 + 'px system-ui, "Segoe UI", sans-serif'; while (ctx.measureText(subTag).width > 860 && s2 > 22) { s2 -= 2; ctx.font = '600 ' + s2 + 'px system-ui, "Segoe UI", sans-serif'; } ctx.fillStyle = accent; ctx.globalAlpha = alpha * clamp((t - t0 - 0.3) / 0.3, 0, 1); ctx.fillText(subTag, 540 + 14, y0 + 130); }
    ctx.restore();
  }
  function drawCaptions(time) {
    if (!showCaptions || showSheet) return;
    const cue = CAPS.find(c => time >= c.start && time < c.hideAt); if (!cue) return;
    ctx.save(); ctx.font = '900 66px system-ui, -apple-system, "Segoe UI", sans-serif';
    const maxW = 940, space = ctx.measureText(' ').width, lines = [[]]; let lw = 0;
    cue.words.forEach(w => { const ww = ctx.measureText(w.w).width; if (lw + ww > maxW && lines[lines.length - 1].length) { lines.push([]); lw = 0; } lines[lines.length - 1].push({ ...w, ww }); lw += ww + space; });
    const lineW = lines.map(l => l.reduce((a, w) => a + w.ww, 0) + space * (l.length - 1)), lh = 88, boxH = lines.length * lh + 44, by = 1640 - boxH;
    const fadeIn = seg(time, cue.start, cue.start + 0.14), fadeOut = cue.fades ? 1 - seg(time, cue.end, cue.end + 0.16) : 1, A = Math.min(fadeIn, fadeOut);
    ctx.globalAlpha = A; ctx.fillStyle = 'rgba(8,17,21,0.82)'; ctx.beginPath(); ctx.roundRect(40, by, 1000, boxH, 30); ctx.fill();
    ctx.textAlign = 'left'; ctx.textBaseline = 'middle'; ctx.lineJoin = 'round';
    lines.forEach((l, li) => { let x = 540 - lineW[li] / 2; const y = by + 22 + lh * li + lh / 2; l.forEach(w => { const spoken = time >= w.t1, active = time >= w.t0 && time < w.t1; ctx.fillStyle = w.col && (spoken || active) ? w.col : active ? PAL.amberHi : spoken ? PAL.ivory : 'rgba(244,241,234,0.48)'; ctx.fillText(w.w, x, active ? y - 3 : y); x += w.ww + space; }); });
    ctx.restore();
  }
  function drawRail(time, S) { ctx.save(); ctx.fillStyle = 'rgba(244,241,234,0.25)'; ctx.fillRect(60, 70, 960, 10); ctx.fillStyle = PAL.amberHi; ctx.fillRect(60, 70, 960 * clamp(time / DUR, 0, 1), 10); ctx.restore(); }

