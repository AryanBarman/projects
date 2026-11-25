  // ===== PORTRAIT (9:16, 1080x1920) OVERRIDES (jb2): headline, captions, rail re-laid-out inside the platform safe zones =====
  //   top UI zone ~0-200 px, bottom UI zone ~1470-1920 px, right button column ~930-1080 px (lower half). Headline sits at y 230-390, captions end at y 1440.
  function drawHeadline(title, subTag, alpha, accent = PAL.amber, t = 1e9, t0 = 0) {
    if (alpha <= 0.01) return;
    ctx.save(); ctx.globalAlpha = alpha; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    const fam = ' system-ui, "Segoe UI", sans-serif', rows = String(title).split('|'), big = rows.length > 1;     // '|' = line break (the hook uses two lines)
    let sz = big ? 74 : 62; const fit = () => { ctx.font = '900 ' + sz + 'px' + fam; return Math.max(...rows.map(r => ctx.measureText(r).width)); };
    while (fit() > 800 && sz > 38) sz -= 3;
    const tw = fit(); let s2 = 34, sw = 0; if (subTag) { ctx.font = '600 ' + s2 + 'px' + fam; while (ctx.measureText(subTag).width > 800 && s2 > 24) { s2 -= 2; ctx.font = '600 ' + s2 + 'px' + fam; } sw = ctx.measureText(subTag).width; }
    const lh = sz * 1.08, hh = rows.length * lh + (subTag ? 70 : 0) + 40, w = Math.max(tw, sw) + 130, x0 = 540 - w / 2, y0 = 232, k = easeOut(seg(t, t0, t0 + 0.3));
    ctx.translate(0, (1 - k) * -18);
    ctx.fillStyle = 'rgba(11,25,30,0.95)'; ctx.beginPath(); ctx.roundRect(x0, y0, w, hh, 26); ctx.fill();
    ctx.fillStyle = accent; ctx.fillRect(x0 + 24, y0 + 26, 10, hh - 52);
    ctx.fillStyle = PAL.ivory; ctx.font = '900 ' + sz + 'px' + fam; rows.forEach((r, i) => ctx.fillText(r, 540 + 14, y0 + 20 + lh * (i + 0.5)));
    if (subTag) { ctx.font = '600 ' + s2 + 'px' + fam; ctx.fillStyle = PAL.amberHi; ctx.fillText(subTag, 540 + 14, y0 + hh - 38); }
    ctx.restore();
  }
  function drawRail(time, S) { }
  // captions: ONE short line at a time (chunks of up to ~22 characters, cut from the SRT line by its word times), low on the screen (box bottom y 1470)
  const CAPBIG = __CAPBIG__;   // cfg caption_style 'big': 1-2 words, 96 px, white with a black stroke, no box (the Stick3D-pack caption style); default = one ~22-character line in a box
  const _capChunks = new Map();
  function capChunks(cue) {
    let ch = _capChunks.get(cue); if (ch) return ch; ch = []; let cur = [], len = 0;
    cue.words.forEach(w => { if (cur.length && (CAPBIG ? (cur.length >= 2 || len + 1 + w.w.length > 17) : len + 1 + w.w.length > 22)) { ch.push(cur); cur = []; len = 0; } cur.push(w); len += (len ? 1 : 0) + w.w.length; }); if (cur.length) ch.push(cur);
    _capChunks.set(cue, ch); return ch;
  }
  function drawCaptions(time) {
    if (!showCaptions || showSheet) return;
    const cue = CAPS.find(c => time >= c.start && time < c.hideAt); if (!cue) return;
    const chunks = capChunks(cue); let k = 0; while (k < chunks.length - 1 && time >= chunks[k + 1][0].t0) k++;
    const words = chunks[k], t0c = words[0].t0, fam = ' system-ui, -apple-system, "Segoe UI", sans-serif';
    if (CAPBIG) {
      ctx.save(); ctx.font = '900 100px' + fam; const sp = ctx.measureText(' ').width, wd = words.map(w => ctx.measureText(w.w).width), tw = wd.reduce((a, b) => a + b, 0) + sp * (words.length - 1), k = easeOut(seg(time, t0c, t0c + 0.12)), sc = 0.8 + 0.2 * k;
      ctx.globalAlpha = Math.min(seg(time, t0c, t0c + 0.06), cue.fades ? 1 - seg(time, cue.end, cue.end + 0.12) : 1); ctx.translate(540, 1320); ctx.scale(sc, sc); ctx.textAlign = 'left'; ctx.textBaseline = 'middle'; ctx.lineJoin = 'round'; ctx.lineWidth = 18; let cx = -tw / 2;
      words.forEach((w, i) => { const hot = w.col && time >= w.t0; ctx.strokeStyle = '#000'; ctx.strokeText(w.w, cx, 0); ctx.fillStyle = hot ? w.col : '#fff'; ctx.fillText(w.w, cx, 0); cx += wd[i] + sp; }); ctx.restore(); return;
    }
    ctx.save(); ctx.font = '900 70px' + fam; const space = ctx.measureText(' ').width, ww = words.map(w => ctx.measureText(w.w).width), lw = ww.reduce((a, b) => a + b, 0) + space * (words.length - 1);
    const boxH = 112, by = 1470 - boxH, boxW = Math.min(1000, lw + 90), bx0 = 540 - boxW / 2, fadeIn = seg(time, t0c, t0c + 0.1), fadeOut = cue.fades ? 1 - seg(time, cue.end, cue.end + 0.16) : 1, A = Math.min(fadeIn, fadeOut);
    ctx.globalAlpha = A; ctx.translate(0, (1 - easeOut(fadeIn)) * 10); ctx.fillStyle = 'rgba(8,17,21,0.9)'; ctx.beginPath(); ctx.roundRect(bx0, by, boxW, boxH, 30); ctx.fill();
    ctx.textAlign = 'left'; ctx.textBaseline = 'middle'; ctx.lineJoin = 'round'; let x = 540 - lw / 2; const y = by + boxH / 2 + 3;
    words.forEach((w, i) => { const spoken = time >= w.t1, active = time >= w.t0 && time < w.t1; ctx.fillStyle = w.col && (spoken || active) ? w.col : active ? PAL.amberHi : spoken ? PAL.ivory : 'rgba(244,241,234,0.55)'; ctx.fillText(w.w, x, active ? y - 3 : y);
      if (w.col) { ctx.fillStyle = w.col; ctx.globalAlpha = A * (spoken || active ? 1 : 0.35); ctx.fillRect(x, y + 38, ww[i], 5); ctx.globalAlpha = A; } x += ww[i] + space; });
    ctx.restore();
  }
