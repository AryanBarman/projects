  const HEADS = [
    [2.8, 7.9, 'MEANWHILE IN WASHINGTON', 'Lawmakers were lining up tough questions', PAL.coral],
    [8.2, 15.9, 'MANY ASSUMED IT WAS OVER', 'The board brought Jensen back on Monday', PAL.amberHi],
    [16.2, 19.2, 'JUST HOURS LATER', 'After the announcement', PAL.coral],
    [19.5, 29.4, 'THREE HOUSE COMMITTEES', 'Foreign affairs, intelligence and China: the return did not answer their national security concerns', PAL.coral]
  ];
  // TOOLBOX + FOCUS RULE (docs/JC_TOOLBOX.md): S1 3D Capitol, lawmakers walk in and line up, THEN question marks pop one by one; S2 board returns Jensen (3D), THEN the "trouble over" paper: check mark, THEN struck out (wrong); S3 clock + announcement; S4 three committee leaders appear one at a time, THEN the warning letter types.
  // Spoken-word times (wt.py "Act 5 part 1"): investors 0.82, lawmakers 3.44, washington 4.18, questions 6.01, board 8.09, brought 8.37, assumed 11.21, over 13.80, wrong 15.50, hours 16.93, announcement 17.66, three 19.41, committees 20.43, foreign 21.86, intelligence 22.78, china 23.74, warned 24.80, answered 26.77, national 27.61, security 28.12

  function renderShots(t) {
    const cv = evalCam(t);
    Cam3D.set([cv[0], cv[1], cv[2]], [cv[3], cv[4], cv[5]], cv[6], 0.01 * Math.sin(t * 0.6));
    GROUND = []; ITEMS = []; OVER = [];
    const hit = (x, y, z, ht, col, r) => { const p = S(x, y, z); if (p) OVER.push(() => hitFx(p.x, p.y, t, ht, { color: col, r: r || 240, rays: 14 })); };
    const pop = (txt, x, y, z, w, h, bg, fg, t0, t1, o) => Card(x, y, z, w, h, Object.assign({ kind: /^#(D94E43|2B8A6E|D99B26)$/i.test(bg) ? 'stamp' : 'tag', text: txt, bg, fg, accent: /^#(0B1A22|0B191E)$/i.test(bg) ? '#E2B857' : fg, t0, t1: t1 || 0 }, o || {}), t);
    const trk = (keys, d) => RigKit.track(t, keys, d);
    const qBubble = (x, t0) => Card(x, 9.6, 2.4, 3.0, 3.0, { kind: 'paint', t0, t1: 0, paint: (g, pw, ph) => { const u = seg(t, t0, t0 + 0.35); g.save(); g.translate(pw / 2, ph / 2); g.scale(0.6 + 0.4 * u, 0.6 + 0.4 * u); bdIcon(g, 'q', 0, 0, pw * 0.34); g.restore(); } }, t);
    for (let k = 0; k < 5; k++) pad(-42 + k * 26, -12, -12 + k * 26, 14, ['#B9C7CE', '#A9B8C2', '#C9B9A9', '#A9AEC4', '#B9BFC9'][k % 5]);

    // ===== S0 (0 - 2.6) CONNECTION: the last picture of Act 4 part 2 (the December calendar, the locked door with the red alert, Jensen thinking). "Because, while investors were watching stock prices" =====
    if (t < 3.2) {
      const C = -26; Card(C - 7.0, 7.4, 1.2, 8.6, 8.6, { kind: 'paint', rot: -0.02, t0: -30, t1: 0, paint: (g, pw, ph) => monthSheet(g, pw, ph, 'DECEMBER 2026', 2, 31, [], t) }, t);
      door(C + 6.0, -1.6, true); Card(C + 6.0, 9.4, 1.6, 3.4, 3.4, { kind: 'paint', t0: -30, t1: 0, paint: (g, pw, ph) => { g.beginPath(); g.arc(pw / 2, ph / 2, pw * 0.4, 0, 7); g.fillStyle = '#D64545'; g.fill(); g.fillStyle = '#FFFFFF'; g.font = '900 ' + ph * 0.62 + 'px' + FAM; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText('!', pw / 2, ph * 0.53); } }, t);
      Char('jensen', C - 0.4, 3.2, 2.8, Object.assign({ facing: 1, phase: 1 }, trk([[0, 'spr:think']])), 0, 3.2, t);
    }

    // ===== S1 (2.6 - 8) 3D: while investors watched prices, LAWMAKERS in WASHINGTON (3.44 / 4.18): the Capitol rises, three lawmakers walk in and LINE UP, then a question mark pops over each (questions 6.01) =====
    if (t >= 2.5 && t < 8.6) {
      const C = 0; capitol(C, -5.5, 1.5, easeOut(seg(t, 3.0, 4.4)));
      [['lawmaker', -6.0, -17.0, 0], ['reed', -1.0, -13.0, 0.5], ['vance', 4.0, -9.0, 1.0]].forEach(([r, fx, sx, d], i) => courier(r, [[2.6, C + sx, 3.2], [4.2 + d * 0.5, C + sx, 3.2], [5.9 + d * 0.3, C + fx, 3.2]], [], t, { face: 1, hW: 2.5, idle: 'cross' }));
      [-6.0, -1.0, 4.0].forEach((x, i) => { if (t >= 6.01 + i * 0.55) qBubble(C + x, 6.01 + i * 0.55); });
    }

    // ===== S2 (8 - 16) the board brought Jensen back on Monday (8.09 / 8.37): he walks in, the board cheers; many assumed the political trouble around his exit was OVER (13.80): a storm cloud, a green check; they were WRONG (15.50): the check is struck out and the storm returns =====
    if (t >= 7.9 && t < 16.4) {
      const C = 26; boardWall(C + 4.0, 0);
      courier('jensen', [[8.0, C - 11.0, 3.2], [8.2, C - 11.0, 3.2], [10.2, C - 0.4, 3.2], [16.4, C - 0.4, 3.2]], [], t, { face: 1, hW: 2.8, idle: 'cross' });
      [C + 4.0, C + 7.0, C + 10.0].forEach((bx, i) => Char('board', bx, 3.4, 2.4, Object.assign({ facing: -1, phase: i }, trk([[0, 'cross'], [10.0, 'cheer'], [11.4, 'cross']])), 7.9, 16.4, t));
      Card(C - 7.6, 8.0, 1.2, 11.0, 8.0, { kind: 'paint', rot: -0.02, t0: 11.2, t1: 0, paint: (g, pw, ph) => { const m = pw * 0.04, st = t >= 15.5, ok = seg(t, 13.8, 14.3), bad = seg(t, 15.5, 15.9); g.save(); g.shadowColor = 'rgba(11,25,30,0.35)'; g.shadowBlur = pw * 0.04; g.shadowOffsetY = pw * 0.015; rrect(g, m, m, pw - 2 * m, ph - 2 * m, ph * 0.03); g.fillStyle = '#FBF8EF'; g.fill(); g.restore();
        g.fillStyle = '#17252B'; g.font = '900 ' + ph * 0.075 + 'px' + FAM; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText('POLITICAL TROUBLE', pw / 2, ph * 0.14); g.font = '700 ' + ph * 0.05 + 'px' + FAM; g.fillStyle = '#5B6B76'; g.fillText('around his exit', pw / 2, ph * 0.22);
        // storm cloud (grey, with lightning when it returns) fading to a pale cloud while "over"
        g.save(); g.translate(pw / 2, ph * 0.52); g.globalAlpha = 1 - 0.55 * ok * (1 - bad); g.fillStyle = st ? '#5A6B78' : '#9FB0BC'; g.beginPath(); g.arc(-pw * 0.11, 0, ph * 0.14, 0, 7); g.arc(0, -ph * 0.07, ph * 0.18, 0, 7); g.arc(pw * 0.11, 0, ph * 0.14, 0, 7); g.rect(-pw * 0.11, 0, pw * 0.22, ph * 0.14); g.fill();
        if (st) { g.fillStyle = '#F2C94C'; g.beginPath(); g.moveTo(pw * 0.02, ph * 0.1); g.lineTo(-pw * 0.03, ph * 0.22); g.lineTo(pw * 0.005, ph * 0.22); g.lineTo(-pw * 0.02, ph * 0.33); g.lineTo(pw * 0.05, ph * 0.18); g.lineTo(pw * 0.015, ph * 0.18); g.closePath(); g.fill(); } g.restore();
        if (ok > 0) { g.save(); g.translate(pw * 0.78, ph * 0.7); g.scale(0.5 + 0.5 * ok, 0.5 + 0.5 * ok); g.beginPath(); g.arc(0, 0, ph * 0.12, 0, 7); g.fillStyle = '#1F9D6B'; g.fill(); g.strokeStyle = '#FFFFFF'; g.lineWidth = ph * 0.028; g.lineCap = 'round'; g.lineJoin = 'round'; g.beginPath(); g.moveTo(-ph * 0.055, 0); g.lineTo(-ph * 0.012, ph * 0.045); g.lineTo(ph * 0.06, -ph * 0.045); g.stroke();
          if (bad > 0) { g.strokeStyle = '#D64545'; g.lineWidth = ph * 0.04; g.beginPath(); g.moveTo(-ph * 0.14 * bad, -ph * 0.14 * bad); g.lineTo(ph * 0.14 * bad, ph * 0.14 * bad); g.stroke(); g.beginPath(); g.moveTo(ph * 0.14 * bad, -ph * 0.14 * bad); g.lineTo(-ph * 0.14 * bad, ph * 0.14 * bad); g.stroke(); } g.restore(); } } }, t);
      if (t >= 15.5 && t < 16.0) hit(C - 7.6 + 3.6, 6.2, 3, 15.55, PAL.coral, 220);
    }

    // ===== S3 (16 - 19.2) just HOURS (16.93) after the ANNOUNCEMENT (17.66): a clock spins, then the press release =====
    if (t >= 15.9 && t < 19.8) {
      const C = 52; Card(C - 6.6, 7.8, 1.2, 11.0, 11.0, { kind: 'paint', rot: 0.015, t0: 16.1, t1: 0, paint: (g, pw, ph) => { const m = pw * 0.05; g.save(); g.shadowColor = 'rgba(11,25,30,0.35)'; g.shadowBlur = pw * 0.04; g.shadowOffsetY = pw * 0.015; rrect(g, m, m, pw - 2 * m, ph - 2 * m, ph * 0.03); g.fillStyle = '#FBF8EF'; g.fill(); g.restore(); g.translate(pw / 2, ph / 2); g.beginPath(); g.arc(0, 0, pw * 0.32, 0, 7); g.fillStyle = '#FFFFFF'; g.fill(); g.lineWidth = ph * 0.02; g.strokeStyle = '#17252B'; g.stroke(); for (let i = 0; i < 12; i++) { const a = i / 12 * 6.283; g.beginPath(); g.moveTo(Math.cos(a) * pw * 0.27, Math.sin(a) * pw * 0.27); g.lineTo(Math.cos(a) * pw * 0.3, Math.sin(a) * pw * 0.3); g.stroke(); }
        const sp = seg(t, 16.3, 17.6), hr = -1.57 + sp * 6.283 * 2.5, mn = -1.57 + sp * 6.283 * 30; g.lineCap = 'round'; g.lineWidth = ph * 0.03; g.beginPath(); g.moveTo(0, 0); g.lineTo(Math.cos(hr) * pw * 0.16, Math.sin(hr) * pw * 0.16); g.stroke(); g.lineWidth = ph * 0.018; g.beginPath(); g.moveTo(0, 0); g.lineTo(Math.cos(mn) * pw * 0.25, Math.sin(mn) * pw * 0.25); g.stroke(); } }, t);
      Card(C + 6.8, 7.6, 1.2, 11.0, 7.6, { kind: 'doc', tag: 'ANNOUNCEMENT', accent: '#2B8A6E', head: 'JENSEN HUANG IS BACK', typeHead: true, type: true, cps: 15, lines: ['NVIDIA board press release'], lineAt: [18.4], hl: -1, t0: 17.66, t1: 0 }, t);
    }

    // ===== S4 (19.3 - 29.5) the leaders of THREE (19.41) powerful House COMMITTEES (20.43): FOREIGN AFFAIRS (21.86), INTELLIGENCE (22.78), CHINA (23.74) appear one by one; they WARNED (24.80) that his return had not ANSWERED (26.77) their NATIONAL SECURITY concerns (27.61): a warning letter types =====
    if (t >= 19.2) {
      const C = 78; [[-8.0, 'FOREIGN AFFAIRS', 21.86, 'lawmaker'], [0.0, 'INTELLIGENCE', 22.78, 'reed'], [8.0, 'CHINA', 23.74, 'vance']].forEach(([dx, nm, t0, r]) => { const u = seg(t, t0 - 0.3, t0 + 0.4); if (u <= 0) return; Box(C + dx - 2.2, 0, 0.9, 4.4, 2.2 * u, 1.8, '#6B4A2B'); Box(C + dx - 2.4, 2.2 * u, 0.8, 4.8, 0.25, 2.0, '#4A3827'); Char(r, C + dx, 0.4, 2.6, Object.assign({ facing: 1, phase: dx }, trk([[0, 'cross'], [t0, 'point']])), t0 - 0.3, 30, t); pop(nm, C + dx, 5.4, 0.8, 7.0, 1.1, '#0B1A22', '#F4F1EA', t0, 0); });
      if (t >= 24.8) Card(C, 12.6, 1.6, 14.0, 5.0, { kind: 'doc', tag: 'WARNING', accent: '#D94E43', head: 'HUANG\'S RETURN', typeHead: true, type: true, cps: 15, lines: ['has not answered', 'our national security concerns'], lineAt: [26.77, 27.61], hl: -1, t0: 24.8, t1: 0 }, t);
    }

    drawBG(0.05);
    GROUND.forEach(fn => fn());
    ITEMS.sort((a, b) => b.z - a.z).forEach(it => it.fn());
    OVER.forEach(fn => fn());
    HEADS.forEach(h => { const a = env(t, h[0], h[1], 0.3, 0.3); if (a > 0.01) drawShotBanner(h[2], h[3], a, h[4], t, h[0]); });
  }
