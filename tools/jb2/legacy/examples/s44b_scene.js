  // SHORT "The $44B Space Repo Loophole" (9:16) v3: CHARACTER-LED, almost no text cards. Text left: the hook headline, the $44B counter, the 340-miles counter, the clause document.
  // Stage layout (x): A bank exterior 0, A2 vault interior 12, B lenders 26, C launch/orbit/repo 40, D clause 54. Recipes: tools/jb2/recipes_jb.js (map: docs/SCENE_MAP.md).
  const HEADS = [[0.0, 2.3, 'THE LOAN WALL STREET|CAN NEVER REPO', 'Vera Rubin GPUs headed to orbit', PAL.coral]];
  function renderShots(t) {
    const cv = evalCam(t);
    Cam3D.set([cv[0], cv[1], cv[2]], [cv[3], cv[4], cv[5]], cv[6], 0.01 * Math.sin(t * 0.6));
    GROUND = []; ITEMS = []; OVER = [];
    const stackX = t < 5.3 ? 18.4 : t < 6.4 ? hand(t, 5.3, 6.4, [18.4, 0, 3], [27.6, 0, 3])[0] : t < 16.3 ? 27.6 : t < 17.3 ? hand(t, 16.3, 17.3, [27.6, 0, 3], [39.9, 0, 3])[0] : 39.9;   // the GPU stack travels with the camera
    const orbit = t >= 19.9 && t < 21.75; SpaceMode(orbit);

    // ===== A1 (0-2.4, and again 40.0-42.2 = the loop) Wall Street banks just lent Elon Musk $44 billion: a BANK, a banker who loves money =====
    if (t < 2.4 || t >= 40.0) {
      const t0 = t < 20 ? 0 : 40;
      SetBank(0, 0, t, -1); Act('analyst', -5.0, 3.6, 3.0, 'greedy', t0, t < 20 ? 2.5 : 1e9, t, { phase: 1.3 });
      Card(0.6, 5.6, 2.5, 6.0, 2.0, { kind: 'counter', text: '$44 BILLION', sub: 'lent to Musk', fg: '#F2D58F', accent: '#E2B857', t0: t0 + 0.3, t1: t < 20 ? 2.2 : 0, scramble: 0 }, t);
    }
    // ===== A2 (1.9-6.5) inside the bank: the vault, the banker with dollar-sign eyes, Elon pushes a trolley of NVIDIA chips =====
    if (t >= 1.9 && t < 6.5) {
      SetVault(12, 0, t, 1.9); Act('analyst', 10.6, 3.4, 3.0, 'greedy', 2.0, 5.6, t, { phase: 1.3 });
      Act('elon', 16.6, 3.2, 3.1, 'cart', 3.0, 5.6, t, { phase: 0.4 }); if (t < 5.3) SetCart(18.6, 3.2, t, 3.2, 4);
      if (t >= 2.4 && t < 3.6) for (let k = 0; k < 4; k++) { const q = ((t * 0.9 + k / 4) % 1), p = [lerp(11.4, 16.0, q), 3.4 + Math.sin(q * Math.PI) * 1.7, 3.2]; coin(p[0], p[1], p[2], 1); }
    }
    if (t >= 5.3 && t < 6.5) { Model('trolley', stackX, 0, 3.2, 2.8); gpuStack(stackX, 3.2, 4, 1, 1, 0.55); }

    // ===== B (5.6-17.4) banks love hardware... until the deal: the banker panics; Apollo and Goldman lock the GPUs up as collateral =====
    if (t >= 5.6 && t < 17.4) {
      const bx = 26, px = lerp(bx - 3.0, bx - 2.6, easeInOut(seg(t, 10.5, 11.1)));
      Act('analyst', px, 3.0, 3.0, t < 8.3 ? 'love' : 'panic', t < 8.3 ? 5.8 : 8.3, 16.6, t, { phase: 2.1 });
      if (t >= 6.4 && t < 17.3) gpuStack(27.6, 3.0, 6, 1, 1);
      if (t >= 10.8 && t < 16.4) { Act('banker', bx + 5.0, 3.0, 3.0, 'point', 11.0, 16.4, t, { facing: -1, phase: 4.4 }); SetLock(27.6, 3.0, t, 14.2); }
    }

    // ===== C (16.2-31) the rocket carries the GPUs to orbit; bondholders see the loophole; a repo truck cannot go 340 miles up =====
    if (t >= 16.2 && t < 31.0) {
      const cx = 40; SetLaunch(cx, 3.0, t, 17.9, 19.9, t < 19.9 ? stackX : undefined);
      if (orbit) SetOrbit(cx, 3.0, t, 0.5 + (t - 19.9) * 0.18); else if (t >= 21.75) Station(cx + 1.2, 15.6, 3.0, 1.1);
      if (t >= 22.0 && t < 30.6) [-3.6, -1.8, 0.0].forEach((dx, i) => Act('bondholder', cx + dx, 3.0 + i * 0.3, 2.8, 'alarm', 22.0 + i * 0.12, 30.6, t, { phase: 3.3 + i * 1.7, facing: 1 }));
      if (t >= 24.5 && t < 30.6) {
        SetRepo(cx, 3.0, t, 24.5); Act('factory', cx + 6.4, 3.0, 3.0, 'annoyed', 25.2, 30.6, t, { facing: -1, phase: 5.1 });
        const dl = easeInOut(seg(t, 26.0, 27.4)); if (dl > 0.02) dashed([cx + 3.4, 3.0, 3.0], [cx + 3.4 + 0.4 * dl, 3.0 + 10.8 * dl, 3.0], 10, '#E2B857', 8);
        if (t >= 27.2) Card(cx + 2.6, 7.8, 3.2, lerp(6.0, 8.6, seg(t, 27.6, 28.8)), lerp(2.4, 3.4, seg(t, 27.6, 28.8)), { kind: 'counter', text: '340 MILES', sub: 'straight up', fg: '#F2D58F', accent: '#E2B857', t0: 27.2, t1: 29.9, scramble: 0 }, t);
        redX(cx + 3.4, 10.4, 3.2, 1.6, t, 28.8);
      }
    }
    // re-hook: a colour band with a flash at the real turn of the story (the only band in the short)
    if (t >= 22.0 && t < 24.0) OVER.push(() => { const u = seg(t, 22.0, 22.4), o = 1 - seg(t, 23.6, 24.0), x = lerp(-1100, 0, easeOut(u)), fl = Math.max(0, 1 - (t - 22.0) / 0.2);
      ctx.save(); ctx.globalAlpha = o; ctx.fillStyle = '#D94E43'; ctx.fillRect(x, 560, 1080, 150); ctx.fillStyle = '#0B191E'; ctx.fillRect(x, 554, 1080, 8); ctx.fillRect(x, 710, 1080, 8);
      ctx.fillStyle = '#F4F1EA'; ctx.font = '900 56px system-ui, "Segoe UI", sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText('THE TERRIFYING LOOPHOLE', 540 + x, 636);
      if (fl > 0) { ctx.globalAlpha = fl * 0.7; ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, 1080, 1920); } ctx.restore(); });

    // ===== D (30.4-40.4) how Wall Street tried to stop him: a legal clause, the GPUs may not leave Earth =====
    if (t >= 30.4 && t < 40.4) {
      const dx = 54;
      Act('analyst', dx - 2.3, 3.4, 3.0, t < 33.5 ? 'think' : 'point', t < 33.5 ? 30.6 : 33.5, 40.2, t, { phase: 4.2 });
      if (t >= 33.6) Card(dx + 1.4, 6.0, 2.6, 5.6, 4.4, { kind: 'doc', tag: 'LOAN AGREEMENT', head: 'CLAUSE 7', lines: ['Collateral GPUs', 'may NOT leave Earth'], hl: 1, hlWord: 'NOT', type: true, cps: 22, accent: '#D94E43', t0: 33.6, t1: 39.7, nonudge: 1 }, t);
      if (t >= 37.4 && t < 39.7) { Model('rocket', dx + 2.8, 0.2, 3.2, 3.2, {}); redX(dx + 2.8, 1.8, 3.8, 1.5, t, 37.4); }
    }

    drawBG(0.05);
    GROUND.forEach(fn => fn());
    ITEMS.sort((a, b) => b.z - a.z).forEach(it => it.fn());
    OVER.forEach(fn => fn());
    HEADS.forEach(h => { const a = env(t, h[0], h[1], 0.001, 0.3); if (a > 0.01) drawHeadline(h[2], h[3], a, h[4], t, h[0]); });
  }
