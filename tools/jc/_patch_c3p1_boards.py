import pathlib
H = pathlib.Path(__file__).resolve().parent
def block(t, start, end, new):
    a = t.index(start); b = t.index(end, a); return t[:a] + new + t[b:]
p = H / 'c3p1_scene.js'; t = p.read_text(encoding='utf8')
helper = r'''    const board = (cx, t0, spec) => Card(cx, 7.0, 1.2, 15.0, 9.8, { kind: 'paint', t0, t1: 0, paint: (g, pw, ph) => boardDiagram(g, pw, ph, spec, t) }, t);   // a deal explained on a board (2D): see boardDiagram in assets_jb.js
'''
t = t.replace("    const held = (kind, x, z, t0, t1, hW) =>", helper + "    const held = (kind, x, z, t0, t1, hW) =>", 1)
s1 = r'''    // ===== S1 (3.4 - 10.8) BOARD: watch NVIDIA (3.51) -> watch the AI companies BORROWING from the BANK (6.98) -> they BUY NVIDIA's chips: money goes one way, chips come back (8.92) =====
    if (t >= 3.2 && t < 11.4) {
      const C = 2; board(C, 3.4, { nodes: [{ id: 'nv', label: 'NVIDIA', ico: 'nvidia', x: 0.83, y: 0.6, t0: 3.7, eye: [3.5, 5.4] }, { id: 'bk', label: 'BANK', ico: 'bank', x: 0.17, y: 0.6, t0: 4.2 }, { id: 'co', label: 'AI COMPANIES', ico: 'company', x: 0.5, y: 0.6, t0: 4.6, eye: [5.4, 8.8] }],
        links: [{ a: 'bk', b: 'co', t0: 6.98, kind: 'bag', label: 'BORROW' }, { a: 'co', b: 'nv', t0: 8.92, kind: 'coin', label: 'PAY', off: 1.1, col: '#B8860B' }, { a: 'nv', b: 'co', t0: 9.3, kind: 'chip', label: 'CHIPS', off: 1.1, col: '#2B8A6E' }] });
      Char('banker', C - 10.6, 3.2, 2.4, Object.assign({ facing: 1, phase: 1 }, trk([[0, 'think'], [5.4, 'point']])), 3.4, 11.4, t);
    }

    // ===== S2 (11 - 21.6) BOARD: CoreWeave appears and GROWS (12.92); a handshake appears between them (closest partners 17.33); NVIDIA also sells it chips (19.04) =====
    if (t >= 10.9 && t < 22.2) {
      const C = 25; board(C, 11.0, { nodes: [{ id: 'nv', label: 'NVIDIA', ico: 'nvidia', x: 0.17, y: 0.5, t0: 11.2 }, { id: 'cw', label: 'COREWEAVE', ico: 'cloud', x: 0.83, y: 0.5, t0: 11.6, grow: [12.92, 16.2] }, { id: 'hs', ico: 'hand', bare: 1, x: 0.5, y: 0.45, t0: 17.33 }],
        links: [{ a: 'nv', b: 'cw', t0: 19.04, kind: 'chip', label: 'CHIPS', off: 2.4, col: '#2B8A6E' }] });
      Char('jensen', C - 10.6, 3.2, 2.7, Object.assign({ facing: 1, phase: 1 }, trk([[0, 'spr:cross'], [17.33, 'spr:point']])), 11.0, 22.2, t);
    }

    // ===== S3 (21.7 - 31) BOARD: NVIDIA INVESTED $2 billion into CoreWeave (23.18); it will BUY the unused computing power (27.66) through April 2032 (29.90) =====
    if (t >= 21.6 && t < 31.6) {
      const C = 52; board(C, 21.8, { nodes: [{ id: 'nv', label: 'NVIDIA', ico: 'nvidia', x: 0.16, y: 0.5, t0: 22.0 }, { id: 'cw', label: 'COREWEAVE', ico: 'cloud', x: 0.55, y: 0.27, t0: 22.3, badge: [[23.6, '$2 BILLION']] }, { id: 'rk', label: 'UNUSED POWER', ico: 'racks', x: 0.55, y: 0.76, t0: 26.4, lit: 28.2 }, { id: 'cal', label: 'APRIL 2032', ico: 'cal', x: 0.88, y: 0.76, t0: 29.9 }],
        links: [{ a: 'nv', b: 'cw', t0: 23.18, kind: 'bag', label: 'INVESTS' }, { a: 'nv', b: 'rk', t0: 27.66, kind: 'coin', label: 'BUYS', col: '#B8860B' }] });
      Char('jensen', C - 10.6, 3.2, 2.7, Object.assign({ facing: 1, phase: 1 }, trk([[0, 'spr:cross'], [23.18, 'spr:point']])), 21.7, 31.6, t);
    }

'''
s5 = r'''    // ===== S5 (41 - 48) BOARD: NVIDIA signs a GUARANTEE (43.77) -> the bank LENDS (44.70) -> the partner pays NVIDIA and gets chips (~46.1): the loop =====
    if (t >= 40.9) {
      const C = 104; board(C, 41.1, { nodes: [{ id: 'nv', label: 'NVIDIA', ico: 'nvidia', x: 0.16, y: 0.66, t0: 41.4 }, { id: 'bk', label: 'BANK', ico: 'bank', x: 0.5, y: 0.26, t0: 41.8 }, { id: 'pt', label: 'PARTNER', ico: 'company', x: 0.84, y: 0.66, t0: 42.2 }],
        links: [{ a: 'nv', b: 'bk', t0: 43.77, kind: 'paper', label: 'GUARANTEE' }, { a: 'bk', b: 'pt', t0: 44.7, kind: 'bag', label: 'LOAN' }, { a: 'pt', b: 'nv', t0: 46.1, kind: 'coin', label: 'PAY', off: 1.0, col: '#B8860B' }, { a: 'nv', b: 'pt', t0: 46.5, kind: 'chip', label: 'CHIPS', off: 1.0, col: '#2B8A6E' }] });
      Char('trader', C - 10.6, 3.2, 2.4, Object.assign({ facing: 1, phase: 1 }, trk([[0, 'cross'], [43.77, 'point']])), 41.0, 48.6, t);
    }

'''
m2 = "    // ===== S2 (11 - 21.6)"; m3 = "    // ===== S3 (21.7 - 31)"; m1 = "    // ===== S1 (3.4 - 10.8)"
part1 = s1[s1.index(m1):s1.index(m2)]; part2 = s1[s1.index(m2):s1.index(m3)]; part3 = s1[s1.index(m3):]
t = block(t, m1, m2, part1); t = block(t, m2, m3, part2); t = block(t, m3, "    // ===== S4 (31 - 40.6)", part3)
t = block(t, "    // ===== S5 (41 - 48)", "    drawBG(0.05);", s5)
p.write_text(t, encoding='utf8'); print('boards patched')
