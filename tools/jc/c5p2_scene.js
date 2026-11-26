  const HEADS = [
    [1.6, 19.0, 'JENSEN\'S FIRST WEEK OF DECEMBER', 'Closed-door questions, then a live public hearing', PAL.coral],
    [19.4, 25.3, 'WHAT THE HEARING IS ABOUT', 'U.S. export rules and protecting America\'s AI lead', PAL.cyan],
    [25.7, 34.9, 'HOW DID THE CHIPS GET TO CHINA?', 'Lawmakers from both parties want to know, including military use', PAL.coral],
    [35.1, 37.9, 'A REPORTED SEC REVIEW', 'Of NVIDIA\'s accounting', PAL.amberHi],
    [38.2, 44.9, 'IS THE BOARD TRULY INDEPENDENT?', 'It reversed its own decision in just 11 days', PAL.coral],
    [45.2, 50.8, 'WHY BIG INVESTORS WILL NOT CHASE', 'Monday\'s 31.5% jump', PAL.amberHi]
  ];
  // TOOLBOX + FOCUS RULE (docs/JC_TOOLBOX.md): S1 planner paper (3 day rows built one by one) + Jensen seated; S2 board (rules protect the AI lead); S3 board (chips route to China, military use) ; S4 board (SEC reviews accounting); S5 3D board members + arrow card (OUT -> BACK) + 11-day count; S6 paper chart + investors walk away.
  // Spoken-word times (wt.py "Act 5 part 2"): schedule 1.29, week 2.58, december 3.08, 1 4.70, closed-door 6.5, questioning 7.07, committees 9.11, lawyer 11.58, 2 12.56, 3 14.72, live-streamed 16.52, senate 18.48, export 22.06, lead 24.55, lawmakers 25.84, china 31.21, military 32.95, sec 35.12, accounting 36.55, board 40.27, independent 41.02, reversing 42.03, 11 44.0, investors 46.36, chase 48.01, 31.5% 49.40

  function renderShots(t) {
    const cv = evalCam(t);
    Cam3D.set([cv[0], cv[1], cv[2]], [cv[3], cv[4], cv[5]], cv[6], 0.01 * Math.sin(t * 0.6));
    GROUND = []; ITEMS = []; OVER = [];
    const hit = (x, y, z, ht, col, r) => { const p = S(x, y, z); if (p) OVER.push(() => hitFx(p.x, p.y, t, ht, { color: col, r: r || 240, rays: 14 })); };
    const pop = (txt, x, y, z, w, h, bg, fg, t0, t1, o) => Card(x, y, z, w, h, Object.assign({ kind: /^#(D94E43|2B8A6E|D99B26)$/i.test(bg) ? 'stamp' : 'tag', text: txt, bg, fg, accent: /^#(0B1A22|0B191E)$/i.test(bg) ? '#E2B857' : fg, t0, t1: t1 || 0 }, o || {}), t);
    const trk = (keys, d) => RigKit.track(t, keys, d);
    const board = (cx, t0, spec) => Card(cx, 7.6, 1.2, 21.0, 13.7, { kind: 'paint', t0, t1: 0, paint: (g, pw, ph) => boardDiagram(g, pw, ph, spec, t) }, t);
    const who = (role, cx, t0, t1, keys, hW) => Char(role, cx - 12.8, 3.2, hW || 2.4, Object.assign({ facing: 1, phase: 1 }, trk(keys)), t0, t1, t);
    for (let k = 0; k < 8; k++) pad(-42 + k * 26, -12, -12 + k * 26, 14, ['#B9C7CE', '#A9B8C2', '#C9B9A9', '#A9AEC4', '#B9BFC9'][k % 5]);

    // ===== S0 (0 - 1.4) CONNECTION: the last picture of Act 5 part 1 (three committee leaders behind desks, the warning letter) =====
    if (t < 2.0) {
      const C = -26; [[-8.0, 'FOREIGN AFFAIRS', 'lawmaker'], [0.0, 'INTELLIGENCE', 'reed'], [8.0, 'CHINA', 'vance']].forEach(([dx, nm, r]) => { Box(C + dx - 2.2, 0, 0.9, 4.4, 2.2, 1.8, '#6B4A2B'); Box(C + dx - 2.4, 2.2, 0.8, 4.8, 0.25, 2.0, '#4A3827'); Char(r, C + dx, 0.4, 2.6, Object.assign({ facing: 1, phase: dx }, trk([[0, 'point']])), 0, 2.0, t); pop(nm, C + dx, 5.4, 0.8, 7.0, 1.1, '#0B1A22', '#F4F1EA', -30, 0); });
      Card(C, 12.6, 1.6, 14.0, 5.0, { kind: 'doc', tag: 'WARNING', accent: '#D94E43', head: 'HUANG\'S RETURN', typeHead: true, type: true, cps: 15, lines: ['has not answered', 'our national security concerns'], lineAt: [-29, -28], hl: -1, t0: -30, t1: 0 }, t);
    }

    // ===== S1 (1.4 - 19) PLANNER, row by row: the schedule (1.29) for the first WEEK (2.58) of DECEMBER (3.08): Dec 1 (4.70) closed-door questioning (6.5 / 7.07) with the three House committees (9.11); Dec 2 (12.56) NVIDIA's top lawyer (11.58); Dec 3 (14.72) a live-streamed (16.52) public hearing before the Senate Banking Committee (18.48) =====
    if (t >= 1.3 && t < 19.8) {
      const C = 0; Card(C + 4.6, 7.9, 1.2, 15.0, 13.4, { kind: 'paint', rot: 0.012, t0: 1.5, t1: 0, paint: (g, pw, ph) => plannerPaint(g, pw, ph, { title: 'FIRST WEEK OF DECEMBER', titleT: 2.58, rows: [{ day: 'DEC 1', t0: 4.5, ico: 'door', title: 'CLOSED-DOOR QUESTIONING', sub: 'THREE HOUSE COMMITTEES', subT: 9.1 }, { day: 'DEC 2', t0: 11.5, ico: 'case', title: 'NVIDIA\'S TOP LAWYER', sub: '', subT: 99 }, { day: 'DEC 3', t0: 14.5, ico: 'live', title: 'LIVE-STREAMED HEARING', sub: 'SENATE BANKING COMMITTEE', subT: 18.4 }] }, t) }, t);
      Char('jensen', C - 8.2, 3.2, 2.8, Object.assign({ facing: 1, phase: 1 }, trk([[0, 'spr:cross'], [4.7, 'spr:chair'], [12.56, 'spr:think'], [16.52, 'spr:overwhelmed']])), 1.4, 19.8, t);
    }

    // ===== S2 (19.4 - 25.3) BOARD: the hearing is focused on U.S. EXPORT RULES (22.06) and PROTECTING America's AI LEAD (24.55) =====
    if (t >= 19.3 && t < 25.9) {
      const C = 26; board(C, 19.5, { nodes: [{ id: 'rl', label: 'U.S. EXPORT RULES', ico: 'paper', x: 0.2, y: 0.5, t0: 21.8 }, { id: 'ld', label: 'AMERICA\'S AI LEAD', ico: 'shield', x: 0.8, y: 0.5, t0: 23.8, lit: 24.9 }], links: [{ a: 'rl', b: 'ld', t0: 23.0, kind: 'paper', label: 'PROTECTS', lab: -1.5 }] });
      who('lawmaker', C, 19.3, 25.9, [[0, 'cross'], [22.06, 'point']], 2.5);
    }

    // ===== S3 (25.7 - 34.9) BOARD: lawmakers from BOTH PARTIES (25.84) want to know how advanced NVIDIA chips allegedly ended up in CHINA (31.21), including for MILITARY use (32.95) =====
    if (t >= 25.6 && t < 35.4) {
      const C = 52; board(C, 25.8, { nodes: [{ id: 'nv', label: 'NVIDIA', ico: 'nvidia', x: 0.16, y: 0.5, t0: 28.0 }, { id: 'q', ico: 'q', bare: 1, x: 0.5, y: 0.5, t0: 29.6 }, { id: 'cn', label: 'CHINA', ico: 'flag', x: 0.84, y: 0.17, t0: 31.1, badge: [[31.3, 'ALLEGEDLY']] }, { id: 'ml', label: 'MILITARY USE', ico: 'helmet', x: 0.84, y: 0.84, t0: 32.8 }],
        links: [{ a: 'nv', b: 'cn', t0: 30.4, kind: 'chip', label: 'ADVANCED CHIPS', lab: -1.5, col: '#2B8A6E' }, { a: 'cn', b: 'ml', t0: 32.95, kind: 'chip', label: 'INCLUDING', lab: 1.3, col: '#D64545' }] });
      Char('reed', C - 13.6, 3.2, 2.4, Object.assign({ facing: 1, phase: 1 }, trk([[0, 'cross'], [25.84, 'point']])), 25.6, 35.4, t); Char('lawmaker', C - 11.4, 3.6, 2.4, Object.assign({ facing: 1, phase: 2 }, trk([[0, 'cross'], [25.84, 'point']])), 25.6, 35.4, t);
    }

    // ===== S4 (35 - 37.9) BOARD: on top of a reported SEC REVIEW (35.12) of NVIDIA's ACCOUNTING (36.55) =====
    if (t >= 34.9 && t < 38.4) {
      const C = 78; board(C, 35.1, { nodes: [{ id: 'sec', label: 'SEC', ico: 'gov', x: 0.2, y: 0.5, t0: 35.3, badge: [[35.5, 'REPORTED']] }, { id: 'ac', label: 'NVIDIA ACCOUNTING', ico: 'paper', x: 0.8, y: 0.5, t0: 36.4, eye: [36.9, 38.4] }], links: [{ a: 'sec', b: 'ac', t0: 36.55, kind: 'paper', label: 'REVIEW', lab: -1.5 }] });
    }

    // ===== S5 (38 - 44.9) 3D + CARD: is the board truly INDEPENDENT (41.02)? it reversed its own decision (42.03) in just 11 days (44.0): an arrow card OUT -> BACK and a day count =====
    if (t >= 38.0 && t < 45.5) {
      const C = 104; boardWall(C + 4.0, 0);
      [C + 4.0, C + 7.0, C + 10.0].forEach((bx, i) => Char('board', bx, 3.4, 2.4, Object.assign({ facing: -1, phase: i }, trk([[0, 'cross'], [41.02, 'think']])), 38.0, 45.5, t));
      if (t >= 41.02) Card(C + 7.0, 11.2, 1.6, 3.2, 3.2, { kind: 'paint', t0: 41.02, t1: 0, paint: (g, pw, ph) => { const u = seg(t, 41.02, 41.4); g.save(); g.translate(pw / 2, ph / 2); g.scale(0.6 + 0.4 * u, 0.6 + 0.4 * u); bdIcon(g, 'q', 0, 0, pw * 0.34); g.restore(); } }, t);
      Card(C - 6.0, 8.0, 1.2, 10.0, 10.0, { kind: 'paint', rot: -0.015, t0: 41.9, t1: 0, paint: (g, pw, ph) => arrowCard(g, pw, ph, { stages: [{ t0: 42.03, t1: 43.6, dir: 'down', col: '#D64545', label: 'JENSEN OUT', x: 43.2 }, { t0: 43.7, dir: 'up', col: '#1F9D6B', label: 'JENSEN BACK' }] }, t) }, t);
      if (t >= 44.0) Card(C + 1.0, 13.4, 1.6, 7.0, 2.2, { kind: 'counter', text: '11 DAYS', sub: 'to reverse', fg: '#F2D58F', accent: '#E2B857', t0: 44.0, t1: 0, pulse: [44.3] }, t);
    }

    // ===== S6 (45 - 50.9) PAPER CHART + INVESTORS: big INVESTORS (46.36) refuse to CHASE (48.01) Monday's 31.5% jump (49.40): they turn and walk away from the spike =====
    if (t >= 45.0) {
      const C = 130; Card(C - 0.4, 7.6, 1.2, 18.0, 10.2, { kind: 'paint', rot: -0.012, t0: 45.3, t1: 0, paint: (g, pw, ph) => cashChart(g, pw, ph, { keys: [[45.4, 0.7], [46.4, 0.2, 1.4]], title: 'MONDAY\'S JUMP', tags: [[47.0, '+31.5%', '#1F9D6B']], opt: { sub: 'NVIDIA stock', col: '#1F9D6B' }, n0: 2, n1: 15, t0: 45.4, bursts: [] }, t) }, t);
      [[C - 9.0, 'trader', 1], [C - 6.6, 'bondholder', 2], [C + 8.0, 'banker', 3]].forEach(([x, r, i]) => courier(r, [[45.0, x, 3.4], [48.0, x, 3.4], [50.4 + i * 0.1, x + (x < C ? -6.0 : 6.0), 3.4]], [], t, { face: x < C ? 1 : -1, idle: 'cross', phase: i }));
    }

    drawBG(0.05);
    GROUND.forEach(fn => fn());
    ITEMS.sort((a, b) => b.z - a.z).forEach(it => it.fn());
    OVER.forEach(fn => fn());
    HEADS.forEach(h => { const a = env(t, h[0], h[1], 0.3, 0.3); if (a > 0.01) drawShotBanner(h[2], h[3], a, h[4], t, h[0]); });
  }
