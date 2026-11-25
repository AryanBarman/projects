  // SHORT "The $44B Space Repo Loophole" (9:16) v2. One continuous stage, ideas laid out left to right 14 units apart: A x=0, B x=14, C x=28, D x=42.
  // Idea list (docs/DIRECTION_GUIDE Part A): A lend $44B -> chips | B lenders panic, GPUs = collateral | C rocket to orbit, 340 miles, no repo | D the legal clause | loop back to A.
  // v2: characters ACT (expression tracks, impact recoils, close-ups), real 3D models (Earth, satellite, rover; rocket built in code), camera moves tied to words (docs/MOTION_PLAYBOOK.md).
  const HEADS = [
    [0.0, 5.4, 'THE LOAN WALL STREET|CAN NEVER REPO', 'Vera Rubin GPUs headed to orbit', PAL.coral],
    [5.9, 10.6, 'BANKS LOVE HARDWARE', 'Until this deal', PAL.amberHi],
    [10.8, 16.4, 'THE COLLATERAL', 'Physical GPUs back the loan', PAL.cyan],
    [16.8, 21.6, 'THE MASTER PLAN', 'AI data centers in orbit', PAL.sageHi],
    [22.0, 30.3, 'THE LOOPHOLE', 'No repo truck can reach orbit', PAL.coral],
    [30.7, 40.0, 'THE FIX', 'A clause: GPUs may not leave Earth', PAL.amberHi]
  ];
  const gpuStack = (x, z, n, u, a, y0) => { for (let i = 0; i < n; i++) Box(x - 1.0, (y0 || 0) + i * 0.62, z, 2.0, 0.55 * easeOut(seg(u, i * 0.1, 0.4 + i * 0.1)), 1.6, i % 2 ? '#1B2A31' : '#76B900', { a }); };
  const dashed = (a, b, n, col, lw) => { for (let i = 0; i < n; i++) { const u0 = i / n, u1 = (i + 0.6) / n; Line3([lerp(a[0], b[0], u0), lerp(a[1], b[1], u0), lerp(a[2], b[2], u0)], [lerp(a[0], b[0], u1), lerp(a[1], b[1], u1), lerp(a[2], b[2], u1)], col, lw, 1); } };
  // orbital data center from CC0 pieces: module + two solar wings + dish, with the GPU stack bolted on
  const orbitStation = (x, y, z, t, spin) => {      // CC0 module + dish, solar wings from primitives (standing plates facing the camera), the GPU stack bolted underneath
    Model('connector', x, y - 0.8, z, 3.2, { ry: 0, tint: '#B8C6D0' });
    for (let sd = -1; sd <= 1; sd += 2) for (let k = 0; k < 2; k++) { const px = x + sd * (2.1 + k * 1.25); Box(px - 0.55, y - 1.25, z - 0.05, 1.1, 1.7, 0.08, '#2C5BA8', { emis: 0.55 }); Box(px - 0.02, y - 1.25, z - 0.06, 0.04, 1.7, 0.1, '#0B191E', { lw: 0 }); Box(px - 0.55, y - 0.4, z - 0.06, 1.1, 0.04, 0.1, '#0B191E', { lw: 0 }); }
    Box(x - 4.2, y - 0.45, z - 0.03, 8.4, 0.07, 0.07, '#CFD6DA', { lw: 0 });
    Model('dish', x, y + 0.05, z, 1.7, { ry: spin * 2 });
    gpuStack(x, z + 0.2, 3, 1, 1, y - 2.5);
  };

  function renderShots(t) {
    const cv = evalCam(t);
    Cam3D.set([cv[0], cv[1], cv[2]], [cv[3], cv[4], cv[5]], cv[6], 0.01 * Math.sin(t * 0.6));
    GROUND = []; ITEMS = []; OVER = [];
    const hit = (x, y, z, ht, col, r) => { const p = S(x, y, z); if (p) OVER.push(() => hitFx(p.x, p.y, t, ht, { color: col, r: r || 240, rays: 14 })); };
    const pop = (txt, x, y, z, w, h, bg, fg, t0, t1, o) => Card(x, y, z, w, h, Object.assign({ kind: /^#(D94E43|2B8A6E|D99B26)$/i.test(bg) ? 'stamp' : 'tag', text: txt, bg, fg, accent: /^#(0B1A22|0B191E)$/i.test(bg) ? '#E2B857' : fg, t0, t1: t1 || 0 }, o || {}), t);
    const trk = (keys, d) => RigKit.track(t, keys, d);
    // ---- clean-flow handoff of the GPU stack: A (x 3.6) -> B (x 15.6) during the flight 5.3-6.4 -> C (x 29.9) during 16.3-17.3 (it ends up in orbit)
    const stackX = t < 5.3 ? 3.6 : t < 6.4 ? hand(t, 5.3, 6.4, [3.6, 0, 3], [15.6, 0, 3])[0] : t < 16.3 ? 15.6 : t < 17.3 ? hand(t, 16.3, 17.3, [15.6, 0, 3], [29.9, 0, 3])[0] : 29.9;
    const orbit = t >= 19.9 && t < 21.75;   // space beat: no ground, no skyline, stars on, Earth below
    X.sets.forEach(g => { g.visible = g.visible && !orbit; }); X.ground.visible = !orbit; X.env.visible = !orbit; X.stars.visible = orbit;

    // ===== A (0 - 5.6, and again 40.0 - 42.2 so the last frame equals the first: LOOP) Wall Street banks lent Elon Musk $44 billion to buy NVIDIA AI chips =====
    if (t < 5.7 || t >= 40.0) {
      const ta = t < 20 ? t : t - 40.0, a1 = t < 20 ? outA(t, 5.6, 0.4) : 1, tEnd = t < 20 ? 5.7 : 1e9;
      Char('analyst', -3.0, 3.0, 3.0, Object.assign({ phase: 1.3, facing: 1, ex: [[0, 'proud'], [3.3, 'happy']] }, trk([[0, 'present'], [3.0, 'hold']])), 0.0, tEnd, t);
      Char('elon', 0.2, 3.0, 3.1, { pose: ta < 3.2 ? 'present' : 'point', phase: 0.4, facing: 1, ex: [[0, 'smirk'], [3.2, 'proud']], hit: [3.35] }, 0.0, tEnd, t);
      pop('WALL STREET BANKS', -1.9, 4.9, 3.0, 4.6, 1.0, '#0B1A22', '#F4F1EA', 0.4, t < 20 ? 5.4 : 0, { kind: 'tag' });
      Card(0.4, 6.8, 2.0, 7.0, 2.3, { kind: 'counter', text: '$44 BILLION', sub: 'lent to Musk', fg: '#F2D58F', accent: '#E2B857', t0: 0.0, t1: t < 20 ? 5.4 : 0, scramble: 0 }, t);
      if (ta < 3.4) for (let k = 0; k < 4; k++) { const q = ((ta * 0.55 + k / 4) % 1), p = [lerp(-2.0, 0.0, q), 3.4 + Math.sin(q * Math.PI) * 1.6, 3.2]; coin(p[0], p[1], p[2], a1 * (ta > 0.3 ? 1 : 0)); }
      if (t < 20 && ta >= 3.3) { for (let k = 0; k < 3; k++) { const q = (((ta - 3.3) * 0.6 + k / 3) % 1), p = [lerp(0.8, 3.6, q), 3.4 + Math.sin(q * Math.PI) * 1.2, 3.2]; coin(p[0], p[1], p[2], a1); } pop('NVIDIA AI CHIPS', 2.5, 5.9, 3.0, 4.2, 0.95, '#0B1A22', '#9BE01B', 3.5, 5.4, { kind: 'tag' }); }
    }
    if (t >= 3.4 && t < 6.5) gpuStack(stackX, 3.0, 6, seg(t, 3.4, 4.6), 1);

    // ===== B (5.8 - 16.6) lenders panic: hardware used to be safe; the physical Vera Rubin GPUs are the collateral =====
    if (t >= 5.6 && t < 17.4) {
      const bx = 14, sl = easeInOut(seg(t, 10.5, 11.1)), px = lerp(bx - 3.0, bx - 2.4, sl);
      Char('analyst', px, 3.0, 3.0, Object.assign({ phase: 2.1, facing: 1, ex: [[5.8, 'proud'], [8.2, 'concerned'], [8.45, 'panic'], [10.4, 'scared'], [13.0, 'determined']], hit: [8.45] }, trk([[0, 'cross'], [8.4, 'shrug'], [10.4, 'hold']], 0.4)), 5.8, 16.6, t);
      if (t >= 6.4 && t < 17.3) gpuStack(15.6, 3.0, 6, 1, 1);
      pop('HARDWARE = SAFE LOAN', bx + 0.4, 6.2, 3.0, 5.4, 1.1, '#0B1A22', '#9BE01B', 6.6, 8.3, { kind: 'tag' });
      pop('LENDERS PANICKING', bx, 7.3, 3.0, 6.4, 1.6, '#D94E43', '#F4F1EA', 9.0, 10.3); if (t >= 9.0 && t < 9.2) hit(bx, 7.3, 3.0, 9.0, PAL.coral, 280);
      if (t >= 10.8 && t < 16.4) {
        pop('APOLLO + GOLDMAN SACHS', bx + 1.6, 7.6, 3.0, 6.2, 1.15, '#0B1A22', '#F4F1EA', 11.0, 14.0, { kind: 'tag' });
        pop('VERA RUBIN GPUs', bx + 1.8, 5.5, 3.0, 4.4, 1.0, '#0B1A22', '#9BE01B', 12.4, 16.2, { kind: 'tag' });
        const ul = easeOut(seg(t, 13.0, 13.9)); if (ul > 0.02) Line3([px + 1.3, 2.4, 3.0], [lerp(px + 1.3, 14.5, ul), 2.4, 3.0], '#C42631', 14, 1);
        pop('COLLATERAL', bx + 0.2, 7.6, 3.0, 5.6, 1.5, '#D99B26', '#0B191E', 14.2, 16.2); if (t >= 14.2 && t < 14.4) hit(bx + 0.2, 7.6, 3.0, 14.2, PAL.amberHi, 260);
      }
    }

    // ===== C (16.8 - 30.4) AI data centers into low-Earth orbit; the loophole; a repo truck cannot go 340 miles up =====
    if (t >= 16.2 && t < 31.0) {
      const cx = 28, up = easeIn(seg(t, 17.9, 19.9)), ry = up * 13.5, rkOut = t < 20.0 ? 1 : 0;
      if (rkOut) { Model('rocket', cx - 1.4, ry, 3.0, 6.0, { flame: t >= 17.7 ? 0.5 + 0.5 * up : 0 }); if (up > 0.02) dashed([cx - 1.4, 0.2, 3.0], [cx - 1.4, Math.max(0.3, ry - 1.9), 3.0], 8, '#F2A93B', 8); }
      if (t >= 16.2 && t < 19.9) gpuStack(stackX + 1.2, 3.0, 6, 1, 1, ry);
      if (orbit) {
        Model('earth', cx + 1.2, 15.6 - 18.0 - 13.0, 3.0 - 6.0, 26.0, { ry: t * 0.06, rx: 0.3 });
        orbitStation(cx + 1.2, 15.6, 3.0, t, 0.5 + (t - 19.9) * 0.18);
        groundPoly(ringPts(cx + 1.2, 3.0, 4.6), 14.0, null, '#E2B857', 3, 0.9 * easeOut(seg(t, 20.1, 20.8)));
      } else if (t >= 21.75) orbitStation(cx + 1.2, 15.6, 3.0, t, 1.1);
      pop('LOW-EARTH ORBIT', cx + 0.4, 17.3, 3.0, 5.6, 1.0, '#0B1A22', '#F4F1EA', 20.1, 21.6, { kind: 'tag' });
      pop('AI DATA CENTERS', cx + 1.2, 11.4, 3.0, 5.0, 0.95, '#0B1A22', '#9BE01B', 20.5, 21.6, { kind: 'tag' });
      if (t >= 22.0 && t < 30.6) Char('bondholder', cx - 3.6, 3.0, 3.0, Object.assign({ phase: 3.3, facing: 1, ex: [[22.0, 'shock'], [24.0, 'scared'], [26.0, 'concerned'], [28.8, 'panic']], hit: [22.0, 28.8] }, trk([[0, 'shrug'], [24.6, 'cross']], 0.4)), 22.0, 30.6, t);
      if (t >= 24.5 && t < 30.6) {
        const tx = lerp(cx - 11, cx + 0.8, easeOut(seg(t, 24.5, 25.6))), bob = Math.sin(t * 16) * 0.05 * (t < 25.6 ? 1 : 0);
        Model('rover', tx, bob, 3.0, 4.6, { ry: 0.5, tint: '#F2EDE0' });
        pop('REPO TRUCK', cx + 0.6, 4.6, 3.0, 4.4, 1.0, '#0B1A22', '#F4F1EA', 25.6, 28.2, { kind: 'tag' });
        const dl = easeInOut(seg(t, 26.0, 27.4)); if (dl > 0.02) dashed([cx + 0.8, 2.8, 3.0], [cx + 0.8 + 0.4 * dl, 2.8 + 11.0 * dl, 3.0], 10, '#E2B857', 8);
        if (t >= 27.2) Card(cx + 2.9, 7.8, 3.2, lerp(6.0, 8.6, seg(t, 27.6, 28.8)), lerp(2.4, 3.4, seg(t, 27.6, 28.8)), { kind: 'counter', text: '340 MILES', sub: 'straight up', fg: '#F2D58F', accent: '#E2B857', t0: 27.2, t1: 29.9, scramble: 0 }, t);
        pop('CAN’T REPO', cx + 0.4, 11.6, 3.0, 8.0, 2.1, '#D94E43', '#F4F1EA', 28.8, 29.9); if (t >= 28.8 && t < 29.0) hit(cx + 0.4, 11.6, 3.0, 28.8, PAL.coral, 280);
      }
    }
    // re-hook band (2D overlay, at the real turn of the story)
    if (t >= 22.0 && t < 24.0) OVER.push(() => { const u = seg(t, 22.0, 22.4), o = 1 - seg(t, 23.6, 24.0), x = lerp(-1100, 0, easeOut(u)), fl = Math.max(0, 1 - (t - 22.0) / 0.2);
      ctx.save(); ctx.globalAlpha = o; ctx.fillStyle = '#D94E43'; ctx.fillRect(x, 620, 1080, 170); ctx.fillStyle = '#0B191E'; ctx.fillRect(x, 614, 1080, 8); ctx.fillRect(x, 790, 1080, 8);
      ctx.fillStyle = '#F4F1EA'; ctx.font = '900 58px system-ui, "Segoe UI", sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText('THE TERRIFYING LOOPHOLE', 540 + x, 708);
      if (fl > 0) { ctx.globalAlpha = fl * 0.7; ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, 1080, 1920); } ctx.restore(); });

    // ===== D (30.7 - 40.0) how Wall Street tried to stop him: a legal clause barring the GPUs from leaving Earth =====
    if (t >= 30.4 && t < 40.4) {
      const dx = 42;
      Char('analyst', dx - 2.3, 3.4, 3.0, Object.assign({ phase: 4.2, facing: 1, ex: [[30.6, 'think'], [33.5, 'determined'], [37.4, 'proud']], hit: [37.4] }, trk([[0, 'think'], [33.6, 'point']], 0.4)), 30.6, 40.2, t);
      if (t < 33.4) pop('?', dx + 1.6, 5.2, 3.0, 4.6, 3.0, '#D99B26', '#F4F1EA', 31.0, 33.2, { rot: -3 });
      if (t >= 33.6) Card(dx + 1.4, 6.0, 2.6, 5.6, 4.4, { kind: 'doc', tag: 'LOAN AGREEMENT', head: 'CLAUSE 7', lines: ['Collateral GPUs', 'may NOT leave Earth'], hl: 1, hlWord: 'NOT', type: true, cps: 22, accent: '#D94E43', t0: 33.6, t1: 39.7 }, t);
      pop('BARRED FROM ORBIT', dx + 2.0, 3.0, 3.1, 4.8, 1.25, '#D99B26', '#0B191E', 37.4, 39.7, { nonudge: 1 }); if (t >= 37.4 && t < 37.6) hit(dx + 2.0, 3.0, 3.1, 37.4, PAL.amberHi, 260);
    }

    drawBG(0.05);
    GROUND.forEach(fn => fn());
    ITEMS.sort((a, b) => b.z - a.z).forEach(it => it.fn());
    OVER.forEach(fn => fn());
    HEADS.forEach(h => { const a = env(t, h[0], h[1], h[0] < 0.1 ? 0.001 : 0.3, 0.3); if (a > 0.01) drawHeadline(h[2], h[3], a, h[4], t, h[0]); });
  }
