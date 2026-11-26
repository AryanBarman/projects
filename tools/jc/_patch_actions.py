import pathlib
H = pathlib.Path(__file__).resolve().parent
p = H / 'assets_jb.js'; t = p.read_text(encoding='utf8'); assert 'const courier' not in t
add = r'''  // ===== DEPICTION HELPERS (docs/JC_DEPICTION_MAP.md): people DO the verb with props =====
  const itemBag = (x, y, z, s) => { Cyl(x, y, z, 0.55 * s, 0.9 * s, '#E2B857'); Cyl(x, y + 0.9 * s, z, 0.3 * s, 0.35 * s, '#C99A2E'); Box(x - 0.2 * s, y + 0.35 * s, z + 0.52 * s, 0.4 * s, 0.14 * s, 0.1 * s, '#5E4A12', { lw: 0 }); };
  const itemCrate = (x, y, z, s) => { Box(x - 0.6 * s, y, z - 0.5 * s, 1.2 * s, 0.9 * s, 1.0 * s, '#76B900', { emis: 0.2 }); Box(x - 0.6 * s, y + 0.34 * s, z + 0.5 * s, 1.2 * s, 0.14 * s, 0.06, '#1B2A31', { lw: 0 }); Box(x - 0.15 * s, y + 0.9 * s, z - 0.2 * s, 0.3 * s, 0.12 * s, 0.4 * s, '#1B2A31', { lw: 0 }); };
  const itemPaper = (x, y, z, s) => { Box(x - 0.5 * s, y, z - 0.05, 1.0 * s, 1.3 * s, 0.1, '#F4F1EA'); for (let i = 0; i < 3; i++) Box(x - 0.34 * s, y + (0.95 - i * 0.28) * s, z + 0.07, 0.68 * s, 0.07 * s, 0.02, '#9AA6B4', { lw: 0 }); Cyl(x + 0.22 * s, y + 0.18 * s, z + 0.08, 0.14 * s, 0.05, '#D64545', { lw: 0 }); };
  const item = (kind, x, y, z, s) => kind === 'bag' ? itemBag(x, y, z, s) : kind === 'crate' ? itemCrate(x, y, z, s) : itemPaper(x, y, z, s);
  // pathAt(keys [[t, x, z], ...], t) -> [x, z, moving, dir]: eased walk between keys, standing still between them
  const pathAt = (K, t) => { if (t <= K[0][0]) return [K[0][1], K[0][2], 0, 1]; for (let i = 0; i < K.length - 1; i++) if (t < K[i + 1][0]) { const u = easeInOut(seg(t, K[i][0], K[i + 1][0])), dx = K[i + 1][1] - K[i][1], dz = K[i + 1][2] - K[i][2], mv = (Math.abs(dx) + Math.abs(dz) > 0.01 && u > 0.001 && u < 0.999) ? 1 : 0; return [lerp(K[i][1], K[i + 1][1], u), lerp(K[i][2], K[i + 1][2], u), mv, Math.abs(dx) > 0.01 ? Math.sign(dx) : (K[i][3] || 1)]; } const a = K[K.length - 1], b = K[K.length - 2]; return [a[1], a[2], 0, a[1] === b[1] ? 1 : Math.sign(a[1] - b[1])]; };
  // courier(role, keys, carry [[t0, t1, 'bag'|'crate'|'paper'], ...], t, o {hW, face (when standing: 1|-1), idle pose, t1}): walks along keys (walk pose while moving) and shows what is carried at the hands
  const courier = (role, K, carry, t, o) => {
    o = o || {}; const p = pathAt(K, t), hW = o.hW || 2.4, c = carry.find(q => t >= q[0] && t < q[1]), face = p[2] ? p[3] : (o.face || p[3]);
    Char(role, p[0], p[1], hW, { facing: face, phase: o.phase || 0, pose: p[2] ? 'walk' : (c ? 'hold' : (o.idle || 'idle')) }, K[0][0] - 0.3, o.t1 === undefined ? 1e9 : o.t1, t);
    if (c) item(c[2], p[0] + face * 1.0, hW * 1.15, p[1] + 0.6, 0.95);
  };
  const bankHouse = (x, z, u) => { if (u < 0.03) return; Box(x - 4.5, 0, z, 9, 3.4 * u, 4, '#CFC6AC'); for (let i = 0; i < 4; i++) Cyl(x - 3.3 + i * 2.2, 0, z + 2.4, 0.36, 3.4 * u, '#F7F4EC'); Box(x - 5.0, 3.4 * u, z - 0.2, 10, 0.7, 4.6, '#A89E84'); Box(x - 3.0, 4.1 * u, z + 0.3, 6, 1.1 * u, 1.6, '#E2B857', { emis: 0.25 }); Label('BANK', x, 4.2 * u, z + 2.4, 4.4, 0.9, null, '#0B191E', { sc: 1 }); };
  const rackRow = (x, z, n, litAt, tt) => { for (let i = 0; i < n; i++) { const rx = x + i * 1.9, lit = litAt && tt >= litAt[i]; Box(rx, 0, z, 1.5, 4.0, 1.5, lit ? '#2B4A3A' : '#2A3A44'); Box(rx + 0.2, 3.0, z + 0.78, 0.3, 0.22, 0.05, lit ? '#4FE0A5' : '#3A4750', { emis: lit ? 0.9 : 0, lw: 0 }); Box(rx + 0.2, 2.2, z + 0.78, 0.3, 0.22, 0.05, lit ? '#4FE0A5' : '#3A4750', { emis: lit ? 0.9 : 0, lw: 0 }); Box(rx + 0.2, 1.4, z + 0.78, 0.3, 0.22, 0.05, lit ? '#4FE0A5' : '#3A4750', { emis: lit ? 0.9 : 0, lw: 0 }); } };
  const umbrella = (x, z, r, y, u, col) => { if (u < 0.03) return; Cyl(x, y + 0.6 * (1 - u) * 6, z, r * u, 0.5, col || '#76B900', { a: 0.5, emis: 0.3, seg: 24 }); Cyl(x, y - 1.2, z, 0.18, 1.2 + 0.6 * (1 - u) * 6, '#C9D3D9'); };
  const podium = (x, z) => { Box(x - 1.1, 0, z, 2.2, 3.0, 1.4, '#6B4A2B'); Box(x - 1.3, 3.0, z - 0.1, 2.6, 0.25, 1.6, '#4A3827'); Cyl(x, 3.2, z + 0.2, 0.06, 1.0, '#1B2A31'); Cyl(x, 4.2, z + 0.2, 0.18, 0.28, '#1B2A31'); };
'''
i = t.index("  const pad = (x0, z0, x1, z1, col)"); p.write_text(t[:i] + add + t[i:], encoding='utf8'); print('actions added')
