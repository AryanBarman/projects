  const HEADS = [
    [0.10, 6.9, 'THE PEAK', 'The pressure breaks the dam', PAL.coral],
    [7.1, 13.9, 'THE BOARD CAVES', 'Unanimous: president, CEO and board director', PAL.sageHi],
    [14.1, 21.2, 'THE SECOND COMING', 'Employees erupt as Jensen returns to HQ', PAL.sageHi],
    [21.4, 26.6, 'A BETTER CEO', 'Jensen’s promise to the company', PAL.cyan],
    [26.8, 33.7, 'MARKETS EXPLODE', 'Nearly a trillion dollars in a single day', PAL.sageHi],
    [33.9, 44.0, 'THE BACKLASH', 'Washington blows up from both sides of the aisle', PAL.coral],
    [44.2, 52.2, 'DEMOCRATS DEMAND ANSWERS', 'Investigations into corruption and political interference', PAL.cyan],
    [52.4, 66.7, 'REPUBLICANS BREAK RANKS', 'A CEO still under scrutiny over alleged smuggling and ties', PAL.coral],
    [66.9, 73.7, 'THE FINE PRINT', 'Not the same job he left', PAL.amberHi]
  ];

  function renderShots(t) {
    const cv = evalCam(t);
    Cam3D.set([cv[0], cv[1], cv[2]], [cv[3], cv[4], cv[5]], cv[6], 0.01 * Math.sin(t * 0.6));
    GROUND = []; ITEMS = []; OVER = [];
    const hit = (x, y, z, ht, col, r) => { const p = S(x, y, z); if (p) OVER.push(() => hitFx(p.x, p.y, t, ht, { color: col, r: r || 240, rays: 14 })); };
    const pop = (txt, x, y, z, w, h, bg, fg, t0, t1, o) => Card(x, y, z, w, h, Object.assign({ kind: /^#(D94E43|2B8A6E|D99B26)$/i.test(bg) ? 'stamp' : 'tag', text: txt, bg, fg, accent: /^#(0B1A22|0B191E)$/i.test(bg) ? '#E2B857' : fg, t0, t1: t1 || 0 }, o || {}), t);
    const trk = (keys, d) => RigKit.track(t, keys, d);
    for (let k = 0; k < 9; k++) pad(-16 + k * 26, -12, 14 + k * 26, 14, ['#B9C7CE', '#A9B8C2', '#C9B9A9', '#A9AEC4', '#B9BFC9'][k % 5]);

    // ===== S1 (0 - 6.9) the peak of the comeback; the pressure breaks the dam =====
    if (t < 7.6) {
      steps(-12.5, 1, 7, t, 0.2);
      pop('THE PEAK', -4.2, 7.6, 2, 6.0, 1.3, '#0B1A22', '#E2B857', 0.5, 3.4);
      Char('jensen', -6.5, 3.6, 2.5, { pose: 'spr:present', facing: 1, phase: 1, talk: 0.5 }, 0.2, 7.6, t);
      const dm = easeOut(seg(t, 3.4, 4.2)); if (dm > 0.03) Box(8, 0, -1, 9, 5.8 * dm, 2.2, '#9AA5AB');
      if (t >= 3.8 && t < 5.7) [0, 1, 2].forEach(i => { const px = lerp(12.6, 10.4 - i * 0.2, easeOut(seg(t, 3.8, 5.0))) + 0.15 * Math.sin(t * 14 + i); Box(px, 1.4 + i * 1.4, 1.2, 1.6, 0.7, 0.7, '#D94E43', { lw: 0 }); });
      if (t >= 4.5) crack([[5.8, 5.4, 0.2], [7.2, 4.2, 0.2], [6.2, 3.0, 0.2], [8.4, 1.9, 0.2], [7.2, 0.6, 0.2]], t, 4.5);
      if (t >= 5.4) groundPoly(ringPts(8, 3, 1 + 8 * easeOut(seg(t, 5.4, 6.8))), 0.05, '#4FA8DC', null, 0, 0.7);
      pop('PRESSURE BROKE THE DAM', 4, 7.0, 4.4, 10.4, 1.5, '#D94E43', '#F4F1EA', 4.4, 0); if (t >= 4.4) hit(4, 7.0, 4.4, 4.5, PAL.coral, 320);
    }

    // ===== S2 (7 - 13.9) the board caves unanimously: president, CEO, board director =====
    if (t >= 6.9 && t < 14.6) {
      boardWall(26, 0); table(26, 2, 9.4);
      [23.4, 25.6, 27.8, 30.0].forEach((bx, i) => Char('board', bx, -0.6, 2.1, Object.assign({ phase: i, facing: 1 }, trk([[0, 'cross'], [8.0 + i * 0.1, 'shrug']])), 7.1, 14.6, t));
      pop('UNANIMOUS', 25, 8.6, 3.4, 6.2, 1.3, '#2B8A6E', '#F4F1EA', 8.0, 0); if (t >= 8.0) hit(25, 8.6, 3.4, 8.1, PAL.sageHi, 280);
      Char('jensen', 19.6, 3.6, 2.5, { pose: 'spr:explain', facing: 1, phase: 2, talk: 0.5 }, 10.0, 14.6, t);
      Card(33.4, 7.6, 1.6, 7.0, 4.0, { kind: 'doc', tag: 'REINSTATED', accent: '#2B8A6E', head: 'JENSEN HUANG', typeHead: true, type: true, cps: 16, lines: ['President', 'CEO', 'Board director'], lineAt: [10.9, 12.0, 12.9], hl: -1, t0: 9.8, t1: 0 }, t);
    }

    // ===== S3 (14.1 - 21.2) Jensen walks into HQ; employees erupt like a rock concert; second coming =====
    if (t >= 14.0 && t < 21.8) {
      hqTower(52, -6, easeOut(seg(t, 14.2, 15.2)), 'NVIDIA');
      const wk = seg(t, 14.4, 16.6);
      Char('jensen', lerp(40, 49.5, easeInOut(wk)), 3.8, 2.5, { pose: wk < 1 ? 'spr:walk' : 'spr:podium', facing: 1, phase: 3, talk: wk < 1 ? 0 : 0.6 }, 14.4, 21.8, t);
      if (t >= 16.8) [[45, '#E2B857'], [52, '#9BE01B'], [59, '#45B8AC']].forEach(([bx, c], i) => Cyl(bx, 0, -1, 0.5, 11, c, { a: 0.18 + 0.1 * Math.sin(t * 5 + i) }));
      for (let i = 0; i < 8; i++) Char(i % 3 === 2 ? 'engineer' : 'employee', 44 + i * 2.3, 5.4 + (i % 2) * 1.5, 2.2, { pose: 'cheer', phase: i * 0.7 }, 17.0 + i * 0.1, 21.8, t);
      if (t >= 17.2 && t < 21.4) for (let i = 0; i < 30; i++) { const ph = (t * 1.4 + rndA(i) * 3) % 3, y = 13 - ph * 4.4; if (y > 0.2) Box(52 + (rndA(i + 40) - 0.5) * 20, y, -1 + rndA(i + 80) * 6, 0.28, 0.28, 0.06, ['#E2B857', '#9BE01B', '#F4F1EA', '#45B8AC'][i % 4], { lw: 0 }); }
      pop('LIKE A ROCK CONCERT', 52, 12.2, 3, 9.6, 1.2, '#0B1A22', '#F4F1EA', 17.6, 19.6);
      pop('SECOND COMING', 52, 7.4, 4.6, 8.4, 1.6, '#D99B26', '#0B191E', 19.8, 0); if (t >= 19.8) hit(52, 7.4, 4.6, 19.9, PAL.amberHi, 300);
    }

    // ===== S4 (21.4 - 26.6) "I'm going to be a better CEO the second time around" =====
    if (t >= 21.3 && t < 27.2) {
      Char('jensen', 75.5, 3.4, 2.6, { pose: 'spr:podium', facing: 1, phase: 4, talk: 0.7 }, 21.5, 27.2, t);
      Card(83.0, 8.0, 1.6, 8.6, 4.4, { kind: 'doc', serif: true, quote: true, tag: 'JENSEN PROMISED', accent: '#2C5BA8', head: 'A BETTER CEO', typeHead: true, type: true, cps: 14, lines: ['the second time around'], lineAt: [24.4], hl: -1, t0: 22.6, t1: 0 }, t);
    }

    // ===== S5 (26.8 - 33.7) markets explode: nearly a trillion dollars in a day =====
    if (t >= 26.7 && t < 34.4) {
      const up = easeOut(seg(t, 27.0, 29.6));
      barsRow(96.5, 2, [0.9, 1.3, 1.9, 2.7, 3.6, 4.7, 6.2].map(h => h * up), ['#3FD08B', '#3FD08B', '#3FD08B', '#6FE0A5', '#76B900', '#9BE01B', '#C6F23A']);
      pop('MARKETS EXPLODED', 104, 8.4, 3, 9.4, 1.4, '#2B8A6E', '#F4F1EA', 27.2, 30.2); if (t >= 27.2 && t < 30.2) hit(104, 8.4, 3, 27.3, PAL.sageHi, 320);
      if (t >= 30.3) Card(104.5, 8.8, 1.5, 9.0, 2.0, { kind: 'counter', text: 'NEARLY $1 TRILLION', sub: 'added in a single day', fg: '#9BE01B', accent: '#76B900', scramble: 0.5, pulse: [30.8], t0: 30.3 }, t);
    }

    // ===== S6 (33.9 - 44) the political backlash; Washington blows up from both sides =====
    if (t >= 33.8 && t < 44.6) {
      pop('THE POLITICAL BACKLASH', 130, 8.8, 3, 10.8, 1.3, '#0B1A22', '#F4F1EA', 34.1, 38.2);
      pop('NOBODY PRICED IT IN', 130, 4.8, 4.8, 9.6, 1.5, '#D94E43', '#F4F1EA', 36.0, 38.4); if (t >= 36.0) hit(130, 4.8, 4.8, 36.1, PAL.coral, 300);
      capitol(130, -5, 1.6, easeOut(seg(t, 34.4, 35.6)));
      if (t >= 39.4) { groundPoly([[129.5, -4], [130.5, -4], [130.5, 8], [129.5, 8]], 0.05, '#F4F1EA', null, 0, 0.7); const pz = 0.5 + 0.5 * Math.sin(t * 8);
        Cyl(123, 0, 3, 1.1, 2.6, '#2C5BA8', { emis: 0.3 + 0.5 * pz }); Cyl(137, 0, 3, 1.1, 2.6, '#C42631', { emis: 0.8 - 0.5 * pz });
        pop('FROM BOTH SIDES OF THE AISLE', 130, 10.8, 3, 12.2, 1.2, '#0B1A22', '#E2B857', 39.8, 0);
        if (t >= 40.2) hit(123, 4.4, 3, 40.3, PAL.cyan, 280); if (t >= 40.8) hit(137, 4.4, 3, 40.9, PAL.coral, 280); }
    }

    // ===== S7 (44.2 - 52) Democrats demand investigations =====
    if (t >= 44.1 && t < 52.8) {
      Char('reed', 150.5, 3.6, 2.6, Object.assign({ facing: 1, phase: 5 }, trk([[0, 'spr:explain'], [47.0, 'spr:point']])), 44.4, 52.8, t);
      pop('TOP DEMOCRATS', 150.5, 8.0, 4.4, 6.4, 1.0, '#2C5BA8', '#F4F1EA', 44.6, 0);
      Card(160.4, 8.0, 1.6, 8.8, 4.8, { kind: 'doc', tag: 'DEMANDED', accent: '#2C5BA8', head: 'INVESTIGATE', typeHead: true, type: true, cps: 15, lines: ['Potential corruption', 'Improper political interference', 'In a public company'], lineAt: [47.6, 49.3, 50.9], hl: -1, t0: 46.2, t1: 0 }, t);
    }

    // ===== S8 (52.4 - 66.9) Republicans break with the White House; a CEO still under scrutiny =====
    if (t >= 52.3 && t < 67.6) {
      whiteHouse(176.5, -6, easeOut(seg(t, 52.6, 53.6)));
      [183.4, 185.2, 187.0].forEach((rx, i) => Char('compliance', rx, 3.6 + (i % 2) * 0.8, 2.3, Object.assign({ facing: -1, phase: i }, trk([[0, 'spr:explain'], [55.4, 'spr:point']])), 53.8 + i * 0.15, 67.6, t));
      pop('REPUBLICANS', 185.2, 7.4, 4.4, 5.6, 1.0, '#C42631', '#F4F1EA', 54.3, 0);
      if (t >= 55.4) { Line3([181.6, 7.4, 0.4], [182.4, 5.6, 0.4], '#D94E43', 12, 1); Line3([182.4, 5.6, 0.4], [181.4, 3.8, 0.4], '#D94E43', 12, 1); Line3([181.4, 3.8, 0.4], [182.6, 1.8, 0.4], '#D94E43', 12, 1); Line3([182.6, 1.8, 0.4], [181.6, 0.2, 0.4], '#D94E43', 12, 1); }
      pop('BROKE WITH THE WHITE HOUSE', 179.5, 10.4, 3, 12.6, 1.6, '#D94E43', '#F4F1EA', 55.6, 59.4); if (t >= 55.6) hit(179.5, 10.4, 3, 55.7, PAL.coral, 340);
      if (t >= 59.6) { Char('jensen', 177.6, 4.8, 2.4, { pose: 'spr:think', facing: 1, phase: 6 }, 59.6, 67.6, t); pop('STILL UNDER SCRUTINY', 178, 7.4, 4.8, 8.8, 1.0, '#0B1A22', '#E2B857', 60.0, 61.9); }
      pop('ALLEGED CHIP SMUGGLING', 179.4, 8.0, 5.2, 10.4, 1.1, '#D99B26', '#0B191E', 62.0, 0, { kind: 'tag' });
      pop('ALLEGED CHINESE INTELLIGENCE TIES', 179.4, 9.6, 5.2, 13.2, 1.1, '#D99B26', '#0B191E', 64.0, 0, { kind: 'tag' });
    }

    // ===== S9 (66.9 - 73.7) the fine print of the reinstatement filing: not the same job =====
    if (t >= 66.8) {
      Char('jensen', 199.6, 3.4, 2.5, { pose: 'spr:think', facing: 1, phase: 7 }, 67.0, 74, t);
      Card(208.6, 7.4, 1.6, 11, 5.6, { kind: 'doc', tag: 'OFFICIAL FILING', accent: '#E2B857', head: 'REINSTATEMENT', typeHead: true, type: true, cps: 18, lines: ['Read the fine print', 'Not the same job'], lineAt: [68.6, 71.0], hl: -1, t0: 67.0, t1: 0 }, t);
      pop('NOT THE SAME JOB', 208.6, 5.0, 4.8, 9.6, 1.6, '#D94E43', '#F4F1EA', 71.4, 0); if (t >= 71.4) hit(208.6, 5.0, 4.8, 71.5, PAL.coral, 320);
    }

    drawBG(0.05);
    GROUND.forEach(fn => fn());
    ITEMS.sort((a, b) => b.z - a.z).forEach(it => it.fn());
    OVER.forEach(fn => fn());
    HEADS.forEach(h => { const a = env(t, h[0], h[1], 0.3, 0.3); if (a > 0.01) drawShotBanner(h[2], h[3], a, h[4], t, h[0]); });
  }
