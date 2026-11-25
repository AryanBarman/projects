  const HEADS = [
    [0.10, 8.2, 'BUILT AROUND HIM', 'What the board quietly set up before returning the keys', PAL.coral],
    [8.6, 16.2, 'WHAT HE GOT BACK', 'His title, his board seat, his cheering engineers', PAL.sageHi],
    [16.6, 22.8, 'TWO NEW MECHANISMS', 'Locked into place during the 11 days', PAL.amberHi],
    [23.2, 31.6, 'MECHANISM ONE', 'A permanent national security and export control committee', PAL.cyan],
    [32.0, 38.7, 'MECHANISM TWO', 'In the press release: an independent compliance officer', PAL.cyan],
    [39.0, 45.5, 'REPORTING TO THE BOARD', 'Directly to the governance committee', PAL.amberHi],
    [45.8, 48.6, 'STILL ONGOING', 'Government investigations continue', PAL.coral]
  ];

  function renderShots(t) {
    const cv = evalCam(t);
    Cam3D.set([cv[0], cv[1], cv[2]], [cv[3], cv[4], cv[5]], cv[6], 0.01 * Math.sin(t * 0.6));
    GROUND = []; ITEMS = []; OVER = [];
    const hit = (x, y, z, ht, col, r) => { const p = S(x, y, z); if (p) OVER.push(() => hitFx(p.x, p.y, t, ht, { color: col, r: r || 240, rays: 14 })); };
    const pop = (txt, x, y, z, w, h, bg, fg, t0, t1, o) => Card(x, y, z, w, h, Object.assign({ kind: /^#(D94E43|2B8A6E|D99B26)$/i.test(bg) ? 'stamp' : 'tag', text: txt, bg, fg, accent: /^#(0B1A22|0B191E)$/i.test(bg) ? '#E2B857' : fg, t0, t1: t1 || 0 }, o || {}), t);
    const trk = (keys, d) => RigKit.track(t, keys, d);
    for (let k = 0; k < 7; k++) pad(-16 + k * 26, -12, 14 + k * 26, 14, ['#B9C7CE', '#A9B8C2', '#C9B9A9', '#A9AEC4', '#B9BFC9'][k % 5]);
    const padlock = (x, y, z, u, col) => { Box(x, y, z, 2.6, 2.2, 0.9, col || '#E2B857'); Cyl(x - 0.8, y + 2.2, z, 0.28, 1.5 * u, '#B8BDC2'); Cyl(x + 0.8, y + 2.2, z, 0.28, 1.5, '#B8BDC2'); Box(x - 0.8, y + 2.2 + 1.5 * u, z - 0.1, 1.9, 0.4, 0.5, '#B8BDC2'); Box(x, y + 0.7, z + 0.5, 0.4, 0.8, 0.1, '#5E4A12', { lw: 0 }); };

    // ===== S1 (0 - 8.4) the board quietly builds a cage of bars around Jensen, then hands back the keys =====
    if (t < 9.0) {
      Char('jensen', 0, 3.4, 2.7, Object.assign({ facing: 1, phase: 1 }, trk([[0, 'spr:think'], [5.0, 'spr:explain']])), 0.1, 9.0, t);
      for (let i = 0; i < 9; i++) { const a = Math.PI + (i / 8) * Math.PI, g = easeOut(seg(t, 0.8 + i * 0.25, 1.9 + i * 0.25)); if (g > 0.02) Box(Math.cos(a) * 4.8, 0, 2.6 + Math.sin(a) * 4.0 + 1.2, 0.5, 6.6 * g, 0.5, '#5E6F7A'); }
      const top = easeOut(seg(t, 3.0, 3.8)); if (top > 0.02) Box(0, 6.6, -1.4, 9.6 * top, 0.5, 0.5, '#5E6F7A');
      [[-8.4, 0.6], [8.4, 0.6]].forEach(([bx, bz], i) => Char('board', bx, bz + 3, 2.2, Object.assign({ phase: i, facing: i ? -1 : 1 }, trk([[0, 'hold'], [4.6, 'present']])), 0.4, 9.0, t));
      pop('QUIETLY BUILT AROUND HIM', 0, 9.8, 3, 11.2, 1.2, '#0B1A22', '#F4F1EA', 0.6, 4.0);
      if (t >= 4.2) { const kp = easeInOut(seg(t, 4.6, 7.4)); const kx = lerp(7.4, 1.8, kp); Cyl(kx, 3.8, 3.2, 0.9, 0.28, '#E2B857', { emis: 0.3 }); Box(kx - 1.8, 3.9, 3.2, 2.6, 0.3, 0.4, '#E2B857', { emis: 0.3 }); Box(kx - 2.6, 3.5, 3.2, 0.3, 0.5, 0.4, '#E2B857'); Box(kx - 3.1, 3.5, 3.2, 0.3, 0.5, 0.4, '#E2B857');
        pop('BEFORE HANDING BACK THE KEYS', 0, 8.0, 4.6, 12.4, 1.2, '#D99B26', '#0B191E', 4.6, 0, { kind: 'tag' }); }
    }

    // ===== S2 (8.4 - 16.4) what he got back: title, board seat, cheering engineers =====
    if (t >= 8.3 && t < 17.0) {
      Char('jensen', 21.8, 3.4, 2.6, { pose: 'spr:explain', facing: 1, phase: 2, talk: 0.5 }, 8.6, 17.0, t);
      pop('YES, HE GOT HIS TITLE BACK', 26, 11.0, 2, 11.4, 1.1, '#0B1A22', '#F4F1EA', 8.8, 11.0);
      Card(32.6, 8.0, 1.6, 8.0, 4.4, { kind: 'doc', tag: 'HE GOT BACK', accent: '#2B8A6E', head: 'JENSEN HUANG', typeHead: true, type: true, cps: 16, lines: ['His title', 'His board seat', 'His cheering engineers'], lineAt: [10.0, 11.6, 13.4], hl: -1, t0: 9.2, t1: 0 }, t);
      if (t >= 11.5) { const su = easeOut(seg(t, 11.5, 12.3)); Box(24.2, 0, 4.2, 2.2, 1.0 * su, 2.0, '#2B2F36'); Box(24.2, 1.0 * su, 3.4, 2.2, 1.8 * su, 0.5, '#2B2F36'); pop('HIS BOARD SEAT', 24.2, 4.4, 5.4, 6.0, 0.9, '#2B8A6E', '#F4F1EA', 11.8, 13.2); }
      for (let i = 0; i < 5; i++) Char(i % 2 ? 'engineer' : 'employee', 31.5 + i * 2.1, 5.6 + (i % 2) * 1.4, 2.2, { pose: 'cheer', phase: i * 0.8 }, 13.5 + i * 0.12, 17.0, t);
    }

    // ===== S3 (16.4 - 22.8) two new governance mechanisms locked into place in 11 days =====
    if (t >= 16.3 && t < 23.4) {
      Box(52, 0, -2.4, 14, 7.2, 0.6, '#6B7F8F'); Box(52, 7.2, -2.4, 14.6, 0.6, 0.8, '#4E5F6C');
      const u1 = 1 - easeOut(seg(t, 17.4, 17.9)) * 0.0, c1 = seg(t, 17.5, 17.9), c2 = seg(t, 20.3, 20.7);
      if (t >= 17.0) padlock(47.4, 2.2, -1.9, 1 - c1 * 0.55, '#E2B857');
      if (t >= 19.4) padlock(56.6, 2.2, -1.9, 1 - c2 * 0.55, '#E2B857');
      pop('NEW MECHANISM 1', 47.4, 7.0, 3, 7.4, 1.0, '#0B1A22', '#E2B857', 17.0, 0);
      pop('NEW MECHANISM 2', 56.6, 7.0, 3, 7.4, 1.0, '#0B1A22', '#E2B857', 19.4, 0);
      if (t >= 17.9) hit(47.4, 3.2, -1.2, 17.95, PAL.amberHi, 240); if (t >= 20.7) hit(56.6, 3.2, -1.2, 20.75, PAL.amberHi, 240);
      if (t >= 20.0) { const n = Math.min(11, 1 + Math.floor(11 * seg(t, 20.2, 22.0))); Card(52, 10.6, 1.5, 6.6, 1.8, { kind: 'counter', text: n + ' DAYS', sub: 'locked into place', fg: '#F2D58F', accent: '#E2B857', t0: 20.0, t1: 0, pulse: [22.1] }, t); }
    }

    // ===== S4 (23.1 - 31.8) first: Nov 17, a permanent national security and export control oversight committee =====
    if (t >= 23.0 && t < 32.4) {
      pop('NOVEMBER 17', 72.5, 8.6, 3, 6.6, 1.1, '#0B1A22', '#E2B857', 23.3, 0);
      table(78, 2, 9.4);
      [75.4, 77.6, 79.8, 82.0].forEach((bx, i) => Char('board', bx, -0.4, 2.1, Object.assign({ phase: i, facing: 1 }, trk([[0, 'cross'], [25.2 + i * 0.12, 'present']])), 23.4, 32.4, t));
      Card(84.8, 8.2, 1.6, 8.2, 4.4, { kind: 'doc', tag: 'NEW COMMITTEE', accent: '#2C5BA8', head: 'OVERSIGHT', typeHead: true, type: true, cps: 16, lines: ['National security', 'Export control', 'Permanent committee'], lineAt: [27.4, 29.2, 30.6], hl: -1, t0: 25.6, t1: 0 }, t);
      pop('PERMANENT', 77, 6.0, 4.6, 6.6, 1.5, '#D99B26', '#0B191E', 26.4, 0); if (t >= 26.4) hit(77, 6.0, 4.6, 26.5, PAL.amberHi, 300);
    }

    // ===== S5 (31.9 - 38.9) second: the press release announces an independent Chief Compliance Officer =====
    if (t >= 31.8 && t < 39.5) {
      Card(103.0, 6.8, 1.6, 8.6, 4.4, { kind: 'doc', tag: 'PRESS RELEASE', accent: '#E2B857', head: 'JENSEN HUANG RETURNS', typeHead: true, type: true, cps: 17, lines: ['NVIDIA is hiring', 'an independent Chief Compliance Officer'], lineAt: [36.0, 37.4], hl: -1, t0: 32.2, t1: 0 }, t);
      pop('MECHANISM TWO', 98.5, 11.4, 2, 6.8, 1.0, '#0B1A22', '#E2B857', 32.4, 36.0);
      Char('compliance', 110.2, 3.6, 2.4, { pose: 'idle', facing: -1, phase: 4 }, 37.6, 39.5, t);
      pop('INDEPENDENT', 110.2, 7.0, 4.4, 6.4, 1.1, '#2B8A6E', '#F4F1EA', 37.9, 0);
    }

    // ===== S6 (38.9 - 45.7) the Chief Compliance Officer reports directly to the board's governance committee =====
    if (t >= 38.8 && t < 46.2) {
      Char('compliance', 126.0, 3.6, 2.5, { pose: 'idle', facing: 1, phase: 5 }, 38.9, 46.2, t);
      pop('COMPLIANCE OFFICER', 126.0, 7.6, 4.4, 7.4, 1.0, '#0B1A22', '#F4F1EA', 39.2, 0);
      table(133.6, 2, 7.0);
      [131.8, 133.6, 135.4].forEach((bx, i) => Char('board', bx, -0.4, 2.1, Object.assign({ phase: i, facing: -1 }, trk([[0, 'cross'], [43.6 + i * 0.1, 'present']])), 40.0, 46.2, t));
      pop('GOVERNANCE COMMITTEE', 133.6, 7.2, 3.6, 8.6, 1.0, '#0B1A22', '#E2B857', 43.2, 0);
      const ln = seg(t, 41.2, 42.8); if (ln > 0) Line3([127.2, 5.4, 3.6], [lerp(127.2, 130.8, ln), lerp(5.4, 4.6, ln), lerp(3.6, 1.6, ln)], '#E2B857', 10, 1);
      pop('REPORTS DIRECTLY', 130, 10.2, 3, 7.2, 1.0, '#2C5BA8', '#F4F1EA', 41.4, 45.4, { kind: 'tag' });
    }

    // ===== S7 (45.7 - 48.6) government investigations are still ongoing =====
    if (t >= 45.6) {
      groundPoly(ringPts(156, 0, 7), 0.05, '#D94E43', '#8A2A20', 2, 0.28);
      const a = t * 2.4; Line3([156, 0.2, 0], [156 + Math.cos(a) * 7, 0.2, Math.sin(a) * 7], '#F0A39A', 14, 0.9);
      Card(156, 8.0, 1.6, 8.4, 3.8, { kind: 'doc', tag: 'GOVERNMENT', accent: '#D94E43', head: 'INVESTIGATIONS', typeHead: true, type: true, cps: 20, lines: ['Still ongoing'], lineAt: [46.9], hl: -1, t0: 45.8, t1: 0 }, t);
      pop('STILL ONGOING', 156, 4.6, 4.6, 7.4, 1.5, '#D99B26', '#0B191E', 47.0, 0); if (t >= 47.0) hit(156, 4.6, 4.6, 47.1, PAL.amberHi, 300);
    }

    drawBG(0.05);
    GROUND.forEach(fn => fn());
    ITEMS.sort((a, b) => b.z - a.z).forEach(it => it.fn());
    OVER.forEach(fn => fn());
    HEADS.forEach(h => { const a = env(t, h[0], h[1], 0.3, 0.3); if (a > 0.01) drawShotBanner(h[2], h[3], a, h[4], t, h[0]); });
  }
