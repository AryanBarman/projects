/* STICKMAN v2 (jb2): fully drawn stickman characters, same call as RigKit.draw(ctx, role, footX, footY, scale, opts, t).
   No sprites. Every person is a vector figure with a TRAIT sheet: skin, hair style + colour, eyes, glasses, beard, clothes (jacket / suit / polo / vest / hard hat),
   tie, logo, badge. Clean flat colours + one soft shade + one rim light, one ink colour. See docs/DIRECTION_GUIDE.md Part B.
   opts: pose facing phase talk expr from blend prop propText hand jacket skin hair look alpha shadow sit view('front'|'side')
   poses: idle talk point think cross cheer clap panic hold phone shrug present sit walk run wave (+ 'spr:<name>' names are mapped)
   exprs: neutral talk concerned think happy angry shock serious                                                           */
(function (G) {
  'use strict';
  const INK = '#0B191E', LW = 3.4;
  const cl = (v, a, b) => Math.max(a, Math.min(b, v)), lerp = (a, b, u) => a + (b - a) * u, sm = u => { u = cl(u, 0, 1); return u * u * (3 - 2 * u); };
  const hash = n => { const v = Math.sin(n * 127.1 + 311.7) * 43758.5453; return v - Math.floor(v); };
  function shade(hex, f) { const n = parseInt(hex.slice(1), 16); let r = n >> 16, g = (n >> 8) & 255, b = n & 255; if (f > 1) { r = r + (255 - r) * (f - 1); g = g + (255 - g) * (f - 1); b = b + (255 - b) * (f - 1); } else { r *= f; g *= f; b *= f; } const q = v => cl(Math.round(v), 0, 255); return '#' + ((1 << 24) | (q(r) << 16) | (q(g) << 8) | q(b)).toString(16).slice(1); }

  // ---- trait sheets -----------------------------------------------------------------------------------------------------------------------------------
  // hair: style swept|swoop|short|side|crop|wavy|baldsides|slick|none   glasses: rect|round   beard: full|stubble|mustache
  const T = {
    jensen: { skin: '#EBC092', hair: { s: 'swept', c: '#C9CACE', h: '#F1F1F4' }, glasses: 'rect', j: '#262A30', p: '#1B1D21', s: '#2B2F36', zip: 1, logo: 'nv', brow: '#8E8F94' },
    elon: { skin: '#E8BE94', hair: { s: 'short', c: '#3A281E', h: '#5A4132' }, beard: 'stubble', j: '#26282C', p: '#1B1D21', s: '#1E1F23', zip: 1, logo: 'tesla', brow: '#2E2018' },
    trump: { skin: '#F0B58B', hair: { s: 'swoop', c: '#E3BF58', h: '#F6DE8A' }, j: '#1F3F86', p: '#1F3F86', s: '#F4F1EA', tie: '#D11F2A', suit: 1, big: 1.1, brow: '#C9A24A' },
    vance: { skin: '#EBC4A0', hair: { s: 'side', c: '#46301F', h: '#664A33' }, beard: 'full', j: '#2E3139', p: '#2E3139', s: '#F4F1EA', tie: '#2B5FC9', suit: 1, brow: '#3A2618' },
    cheung: { skin: '#E6BE97', hair: { s: 'crop', c: '#1C1C1F', h: '#3A3A40' }, j: '#1C1D21', p: '#1C1D21', s: '#F4F1EA', tie: '#2A2A30', suit: 1, brow: '#1C1C1F' },
    reed: { skin: '#EDC6A2', hair: { s: 'side', c: '#A3A5AC', h: '#D2D3D8' }, j: '#22305A', p: '#22305A', s: '#F4F1EA', tie: '#2B5FC9', suit: 1, brow: '#8F9198' },
    kress: { skin: '#F0C7A3', hair: { s: 'wavy', c: '#6D4229', h: '#93603C' }, female: 1, j: '#8D9097', p: '#6E7177', s: '#F4F1EA', suit: 1, slim: 1, brow: '#573420' },
    compliance: { skin: '#DDB08A', hair: { s: 'crop', c: '#2B2320', h: '#4A3E38' }, glasses: 'round', j: '#2A2C31', p: '#2A2C31', s: '#F4F1EA', tie: '#5E6068', suit: 1, badge: 1, brow: '#2B2320' },
    board: { skin: '#EFC9A6', hair: { s: 'baldsides', c: '#BEBFC4', h: '#E6E6EA' }, j: '#212226', p: '#212226', s: '#F4F1EA', tie: '#C42631', suit: 1, brow: '#9B9CA1' },
    banker: { skin: '#E4B88F', hair: { s: 'slick', c: '#2C2521', h: '#52463F' }, j: '#2C2E36', p: '#2C2E36', s: '#F4F1EA', tie: '#6A4AA8', suit: 1, stripe: 1, brow: '#2C2521' },
    bondholder: { skin: '#EDC7A4', hair: { s: 'baldsides', c: '#E4E1DA', h: '#FFFFFF' }, beard: 'mustache', j: '#6E4D2D', p: '#5E4025', s: '#EFE6D3', tie: '#B02A2A', suit: 1, brow: '#CFCBC2' },
    engineer: { skin: '#D9A87E', hair: { s: 'short', c: '#241C18', h: '#44362E' }, glasses: 'round', j: '#2A2D32', p: '#2D2F34', s: '#2A2D33', zip: 1, logo: 'nv', badge: 1, brow: '#241C18' },
    employee: { skin: '#E2B58B', hair: { s: 'short', c: '#3A2A20', h: '#5C4636' }, j: '#3A5F8F', p: '#26282D', s: '#3A5F8F', polo: 1, badge: 1, brow: '#3A2A20' },
    spacex: { skin: '#E6BC93', hair: { s: 'crop', c: '#3A2A20', h: '#5C4636' }, j: '#1E2F58', p: '#26282D', s: '#1E2F58', polo: 1, brow: '#3A2A20' },
    factory: { skin: '#D5A27A', hair: { s: 'none', c: '#2A2A2A', h: '#444' }, helmet: '#F2C230', j: '#4A4E55', p: '#2B2E33', s: '#4A4E55', vest: 1, brow: '#2A2A2A' },
    supply: { skin: '#DDAE85', hair: { s: 'short', c: '#2A2118', h: '#4A3B2E' }, j: '#2E5FAE', p: '#212F58', s: '#2E5FAE', zip: 1, logo: 'trader', brow: '#2A2118' },
    journalist: { skin: '#EBC4A0', hair: { s: 'side', c: '#5A4128', h: '#7A5C3C' }, j: '#8E7848', p: '#2E3036', s: '#EAE2CE', zip: 1, badge: 1, brow: '#5A4128' },
    trader: { skin: '#E3B890', hair: { s: 'slick', c: '#2A241F', h: '#4C423A' }, j: '#223F74', p: '#21315A', s: '#F4F1EA', zip: 1, logo: 'trader', brow: '#2A241F' }
  };
  const ALIAS = { analyst: 'banker', host: 'journalist', lawyer: 'compliance', public: 'employee', cfo: 'kress', senator: 'reed', president: 'trump', vp: 'vance', staff: 'employee', official: 'cheung', engineer2: 'engineer', investor: 'bondholder', worker: 'factory', reporter: 'journalist', student: 'employee' };
  // crowd variety: generic roles draw their look from the phase so no two extras match (rule: never the same sprite twice in a frame)
  const SKINS = ['#F2CBA0', '#E6B98F', '#D7A67C', '#BF8A62', '#9C6A48', '#F6D8B8'], HAIRS = ['#1E1A18', '#3A2A20', '#5A4128', '#8A6A3A', '#B9B9BE', '#6A2F22'], STY = ['short', 'side', 'crop', 'slick', 'short', 'wavy'];
  const CLOTH = ['#3A5F8F', '#4E8A78', '#8F6A3A', '#6B5A8F', '#7C8088', '#9A4E48'];
  const GENERIC = { employee: 1, spacex: 1, supply: 1, trader: 1, engineer: 1, journalist: 1, banker: 1, factory: 1 };
  function specOf(role, o) {
    const base = T[role] || T[ALIAS[role]] || T.employee, rn = T[role] ? role : (ALIAS[role] || 'employee');
    const s = Object.assign({}, base); const ph = (o && o.phase) || 0, v = (o && o.variant !== undefined) ? o.variant : ph;
    if (GENERIC[rn] || role === 'student') {
      const k = Math.floor(hash(v * 3.7 + 1) * 6), k2 = Math.floor(hash(v * 5.3 + 2) * 6), k3 = Math.floor(hash(v * 7.1 + 3) * 6);
      s.skin = SKINS[k]; const st = s.hair.s === 'none' ? 'none' : STY[k2]; s.hair = { s: st, c: HAIRS[k3], h: shade(HAIRS[k3], 1.35) }; s.brow = HAIRS[k3];
      if (rn === 'employee' || role === 'student' || rn === 'spacex') { const cc = CLOTH[Math.floor(hash(v * 9.1 + 4) * 6)]; s.j = cc; s.s = cc; }
      if (!s.glasses && hash(v * 2.3 + 9) > 0.78) s.glasses = 'round';
      if (st === 'wavy') s.female = 1;
    }
    if (o && o.jacket) s.j = o.jacket; if (o && o.skin) s.skin = o.skin; if (o && o.hair) s.hair = Object.assign({}, s.hair, { c: o.hair, h: shade(o.hair, 1.35) });
    return s;
  }

  // ---- poses (joint angles in radians; 0 = limb hangs down, + toward facing side) ------------------------------------------------------------------
  const D = () => ({ aR: 0.08, eR: 0.15, aL: -0.08, eL: 0.15, tR: 0.04, kR: 0, tL: -0.04, kL: 0, bob: 0, lean: 0, tilt: 0, sit: 0, hand: 'R' });
  const POSE = {
    idle(t, ph) { const b = Math.sin(t * 2 + ph); return Object.assign(D(), { bob: b * 1.0, aR: 0.1 + b * 0.03, aL: -0.1 - b * 0.03 }); },
    talk(t, ph) { const s = Math.sin(t * 3.1 + ph), s2 = Math.sin(t * 4.3 + ph * 2); return Object.assign(D(), { aR: 0.55 + s * 0.35, eR: 1.0 + s2 * 0.35, aL: -0.15, eL: 0.2, bob: Math.abs(s) * 1.4, tilt: s2 * 0.04, lean: 0.02 }); },
    point(t, ph) { const s = Math.sin(t * 2.4 + ph) * 0.05; return Object.assign(D(), { aR: 1.5 + s, eR: 0.05, aL: -0.12, eL: 0.2, lean: 0.05 }); },
    think(t, ph) { const s = Math.sin(t * 1.5 + ph); return Object.assign(D(), { aR: 0.45, eR: 2.35, aL: 0.5, eL: 1.5, tilt: 0.1 + s * 0.02, bob: s * 0.8 }); },
    cross(t, ph) { return Object.assign(D(), { aR: 0.65, eR: 2.0, aL: 0.4, eL: 1.7, bob: Math.sin(t * 2 + ph) * 0.8 }); },
    cheer(t, ph) { const s = Math.sin(t * 7 + ph); return Object.assign(D(), { aR: 2.5 + s * 0.15, eR: 0.2, aL: -2.5 + s * 0.15, eL: -0.2, bob: Math.abs(s) * 4, tilt: s * 0.05 }); },
    wave(t, ph) { const s = Math.sin(t * 8 + ph); return Object.assign(D(), { aR: 2.6, eR: 0.5 + s * 0.6, aL: -0.1, eL: 0.2, tilt: 0.05 }); },
    clap(t, ph) { const s = Math.sin(t * 9 + ph) * 0.5 + 0.5; return Object.assign(D(), { aR: 0.9 - s * 0.25, eR: 1.4, aL: 0.7 - s * 0.25, eL: 1.2, bob: s * 1.5 }); },
    panic(t, ph) { const s = Math.sin(t * 9 + ph); return Object.assign(D(), { aR: 2.5, eR: 2.0 + s * 0.1, aL: 2.4, eL: 2.0, lean: -0.06, tilt: s * 0.05, bob: s * 1.2 }); },
    hold(t, ph) { return Object.assign(D(), { aR: 0.8, eR: 1.7, aL: 0.55, eL: 1.6, bob: Math.sin(t * 2 + ph) * 0.8 }); },
    phone(t, ph) { return Object.assign(D(), { aR: 0.5, eR: 2.5, aL: -0.1, eL: 0.2, tilt: -0.1 }); },
    shrug(t, ph) { const u = 0.5 + 0.5 * Math.sin(t * 2.5 + ph); return Object.assign(D(), { aR: 0.9, eR: 1.1, aL: -0.9, eL: -1.1, bob: -u * 3 }); },
    rub(t, ph) { const s = Math.sin(t * 15 + ph); return Object.assign(D(), { aR: 0.85, eR: 1.55 + 0.25 * s, aL: 0.75, eL: 1.65 - 0.25 * s, bob: Math.abs(s) * 0.8, lean: 0.03 }); },
    carry(t, ph) { return Object.assign(D(), { aR: 1.05, eR: 0.45, aL: 0.95, eL: 0.5, lean: 0.06, bob: Math.sin(t * 6 + ph) * 0.8 }); },
    present(t, ph) { const s = Math.sin(t * 2 + ph) * 0.06; return Object.assign(D(), { aR: 1.2 + s, eR: 0.4, aL: -0.1, eL: 0.2, lean: 0.03 }); },
    sit(t, ph) { const b = Math.sin(t * 2 + ph); return Object.assign(D(), { tR: 1.45, kR: 1.5, tL: 1.38, kL: 1.45, sit: 1, aR: 0.35, eR: 0.9, aL: 0.25, eL: 0.8, bob: b * 0.6 }); },
    walk(t, ph, o) { const f = 1.7, w = Math.sin(t * f * 6.283 + ph), w2 = Math.sin(t * f * 6.283 + ph + 1.5708), amp = o._side ? 1 : 0.4; return Object.assign(D(), { tR: w * 0.62 * amp, kR: Math.max(0, -w2) * 0.9 * amp, tL: -w * 0.62 * amp, kL: Math.max(0, w2) * 0.9 * amp, aR: -w * 0.5, aL: w * 0.5, eR: 0.3, eL: 0.3, bob: Math.abs(w) * -3 * amp + 1, lean: 0.05 * amp }); },
    run(t, ph, o) { const f = 2.6, w = Math.sin(t * f * 6.283 + ph), w2 = Math.sin(t * f * 6.283 + ph + 1.5708), amp = o._side ? 1 : 0.5; return Object.assign(D(), { tR: w * 0.95 * amp, kR: Math.max(0, -w2) * 1.5 * amp, tL: -w * 0.95 * amp, kL: Math.max(0, w2) * 1.5 * amp, aR: -w * 0.9, aL: w * 0.9, eR: 1.5, eL: 1.5, bob: Math.abs(w) * -6 * amp, lean: 0.18 * amp }); }
  };
  const SPR = { explain: 'talk', podium: 'present', document: 'hold', tablet: 'hold', rally: 'cheer', negotiate: 'present', discuss: 'talk', raised: 'cheer', statement: 'present', call: 'phone', meeting: 'talk', walk: 'walk', stand: 'idle', laptop: 'sit', worried: 'concerned', react: 'shrug', crowd: 'clap' };
  const PKEYS = ['aR', 'eR', 'aL', 'eL', 'tR', 'kR', 'tL', 'kL', 'bob', 'lean', 'tilt', 'sit'];
  const backOut = u => { u = cl(u, 0, 1); return 1 + 2.25 * Math.pow(u - 1, 3) + 1.25 * Math.pow(u - 1, 2); };
  function poseName(o) {
    let n = o.pose; if (!n) n = (o.walkAmt || 0) > 0.3 ? 'walk' : (o.armAngleR || 0) < -1.2 ? 'point' : (o.browTension || 0) > 0.7 ? 'think' : (o.talk || 0) > 0.5 ? 'talk' : 'idle';
    if (n.indexOf('spr:') === 0) n = n.slice(4); if (!POSE[n]) n = SPR[n] || 'idle'; if (o.sit) n = 'sit'; return n;
  }
  function getPose(o, t, ph) {
    const tt = t * (1 + ((ph * 0.37) % 0.17)), P = POSE[poseName(o)](tt, ph, o);
    if (o.from && o.blend !== undefined && o.blend < 1) { const F = Object.assign({}, o, { pose: o.from }), Q = POSE[poseName(F)](tt, ph, o), u = Math.min(1.25, backOut(o.blend)); PKEYS.forEach(k => { P[k] = lerp(Q[k], P[k], u); }); }
    return P;
  }

  // ---- drawing helpers ----------------------------------------------------------------------------------------------------------------------------
  function rr(c, x, y, w, h, r) { c.beginPath(); c.moveTo(x + r, y); c.arcTo(x + w, y, x + w, y + h, r); c.arcTo(x + w, y + h, x, y + h, r); c.arcTo(x, y + h, x, y, r); c.arcTo(x, y, x + w, y, r); c.closePath(); }
  function fs(c, fill, lw) { c.fillStyle = fill; c.fill(); c.lineWidth = lw || LW; c.strokeStyle = INK; c.lineJoin = 'round'; c.stroke(); }
  function limb(c, pts, w, col) {
    c.lineCap = 'round'; c.lineJoin = 'round';
    c.strokeStyle = INK; c.lineWidth = w + LW * 2; c.beginPath(); c.moveTo(pts[0][0], pts[0][1]); for (let i = 1; i < pts.length; i++) c.lineTo(pts[i][0], pts[i][1]); c.stroke();
    c.strokeStyle = col; c.lineWidth = w; c.beginPath(); c.moveTo(pts[0][0], pts[0][1]); for (let i = 1; i < pts.length; i++) c.lineTo(pts[i][0], pts[i][1]); c.stroke();
    c.save(); c.translate(-w * 0.2, -w * 0.18); c.strokeStyle = 'rgba(255,255,255,0.14)'; c.lineWidth = Math.max(1.5, w * 0.22); c.beginPath(); c.moveTo(pts[0][0], pts[0][1]); for (let i = 1; i < pts.length; i++) c.lineTo(pts[i][0], pts[i][1]); c.stroke(); c.restore();
  }

  // ---- expressions: brow angle (+ inner end down = angry, - inner end up = worried), brow height, eye openness, mouth curve (+ smile), mouth open, gaze -------
  const EX = {
    neutral: { ba: 0, by: 0, eo: 1, k: 0.12, mo: 0 }, talk: { ba: 0.05, by: -1, eo: 1, k: 0.2, mo: 0 }, concerned: { ba: -0.38, by: -2, eo: 1, k: -0.4, mo: 0 },
    think: { ba: 0.18, by: -1, eo: 0.82, k: -0.05, mo: 0, gx: 0.5, gy: -0.6, fx: 'qmark' }, happy: { ba: -0.1, by: -1, eo: 0.78, k: 0.95, mo: 0.28 }, angry: { ba: 0.6, by: 2, eo: 0.72, k: -0.55, mo: 0, fx: 'vein' },
    shock: { ba: -0.1, by: -7, eo: 1.3, k: 0, mo: 0.95, fx: 'lines' }, serious: { ba: 0.28, by: 1, eo: 0.88, k: -0.12, mo: 0 },
    sad: { ba: -0.55, by: -2, eo: 0.78, k: -0.75, mo: 0, gy: 0.5 }, laughing: { ba: -0.2, by: -3, eo: 0.35, k: 1, mo: 1 }, smirk: { ba: 0.12, by: 0, eo: 0.82, k: 0.55, mo: 0, as: 1 },
    scared: { ba: -0.5, by: -6, eo: 1.35, k: -0.6, mo: 0.45, fx: 'sweat' }, panic: { ba: -0.45, by: -7, eo: 1.4, k: -0.5, mo: 0.8, fx: 'sweat' }, crying: { ba: -0.6, by: -2, eo: 0.7, k: -0.9, mo: 0.3, fx: 'tears' },
    determined: { ba: 0.45, by: 2, eo: 0.85, k: -0.02, mo: 0 }, greedy: { ba: -0.15, by: -4, eo: 1.2, k: 1, mo: 0.3, fx: 'dollar' }, alarm: { ba: -0.25, by: -7, eo: 1.35, k: -0.1, mo: 0.9, fx: 'exclaim' }, proud: { ba: -0.05, by: -3, eo: 0.9, k: 0.55, mo: 0, gy: -0.3 }, annoyed: { ba: 0.35, by: 1, eo: 0.6, k: -0.3, mo: 0 }
  };
  const EXN = { speaking: 'talk', explaining: 'talk', emphatic: 'talk', assertive: 'talk', worried: 'concerned', thinking: 'think', smiling: 'happy', calm: 'neutral', amused: 'happy', satisfied: 'happy', confident: 'proud', firm: 'determined', focused: 'serious', skeptical: 'annoyed', surprised: 'shock', talking: 'talk', afraid: 'scared', money: 'greedy', greed: 'greedy', alert: 'alarm', horrified: 'alarm', terrified: 'panic', furious: 'angry', mad: 'angry', cry: 'crying', laugh: 'laughing', glad: 'happy' };
  const exOf = n => EX[n] || EX[EXN[n]] || EX.neutral;
  const EXKEYS = ['ba', 'by', 'eo', 'k', 'mo', 'gx', 'gy', 'as'];
  // opts.ex = [[t0,'neutral'],[t1,'panic'],...]: expression keyframes; each change blends over 0.24 s with a small overshoot (the face snaps, then settles). opts.expr = one static expression.
  function exParams(o, exn, t) {
    if (o.ex && o.ex.length) {
      let i = 0; while (i < o.ex.length - 1 && t >= o.ex[i + 1][0]) i++;
      const cur = exOf(o.ex[i][1]), prv = i ? exOf(o.ex[i - 1][1]) : cur, u = Math.min(1.25, backOut(cl((t - o.ex[i][0]) / 0.24, 0, 1))), r = {};
      EXKEYS.forEach(k => { const a = prv[k] || 0, b = cur[k] || 0; r[k] = a + (b - a) * u; }); r.fx = cur.fx; r.name = EX[o.ex[i][1]] ? o.ex[i][1] : (EXN[o.ex[i][1]] || 'neutral'); r.age = t - o.ex[i][0]; return r;
    }
    return Object.assign({ name: EX[exn] ? exn : (EXN[exn] || 'neutral'), age: 9 }, exOf(exn));
  }
  // face effects drawn on the head (head-local coordinates): sweat drops, anger vein, tears, shock lines
  function fxMarks(c, X, t, ph) {
    if (!X.fx) return;
    if (X.fx === 'sweat') { for (let i = 0; i < 2; i++) { const u = (t * 0.9 + i * 0.5 + ph) % 1, x = 31 + i * 7, y = -28 + u * 48; c.save(); c.globalAlpha = Math.sin(Math.PI * Math.min(1, u * 1.05)); c.fillStyle = '#8FD0F0'; c.strokeStyle = INK; c.lineWidth = 2; c.beginPath(); c.moveTo(x, y - 8); c.quadraticCurveTo(x + 6, y + 2, x, y + 7); c.quadraticCurveTo(x - 6, y + 2, x, y - 8); c.fill(); c.stroke(); c.restore(); } }
    else if (X.fx === 'vein') { const s = 1 + 0.14 * Math.sin(t * 13); c.save(); c.translate(-22, -33); c.scale(s, s); c.strokeStyle = '#D94E43'; c.lineWidth = 3.4; c.lineCap = 'round'; [[-7, -4, -2, -8], [2, -8, 7, -3], [7, 3, 2, 8], [-2, 8, -7, 4]].forEach(a => { c.beginPath(); c.moveTo(a[0], a[1]); c.quadraticCurveTo((a[0] + a[2]) / 2 * 0.3, (a[1] + a[3]) / 2 * 0.3, a[2], a[3]); c.stroke(); }); c.restore(); }
    else if (X.fx === 'lines') { const pu = 0.6 + 0.4 * Math.sin(t * 22); c.save(); c.strokeStyle = INK; c.lineWidth = 3.4; c.lineCap = 'round'; c.globalAlpha = pu; [-0.7, 0, 0.7].forEach(a => { const ca = Math.cos(a - Math.PI / 2), sa = Math.sin(a - Math.PI / 2); c.beginPath(); c.moveTo(ca * 48, sa * 52 - 4); c.lineTo(ca * 64, sa * 68 - 4); c.stroke(); }); c.restore(); }
    else if (X.fx === 'dollar') { c.save(); c.textAlign = 'center'; c.textBaseline = 'middle'; [-12, 12].forEach(x => { c.beginPath(); c.arc(x, -1, 7.4, 0, 7); c.fillStyle = '#fff'; c.fill(); c.lineWidth = 2.2; c.strokeStyle = INK; c.stroke(); c.font = '900 ' + (14 + 1.5 * Math.sin(t * 9 + ph)) + 'px Arial'; c.fillStyle = '#1E8F4E'; c.fillText('$', x, -0.5); }); c.restore(); }
    else if (X.fx === 'qmark') { c.save(); c.textAlign = 'center'; c.textBaseline = 'middle'; c.font = '900 34px Arial'; c.lineWidth = 5; c.strokeStyle = INK; c.fillStyle = '#E2B857'; const y = -58 + Math.sin(t * 3 + ph) * 3; c.strokeText('?', 24, y); c.fillText('?', 24, y); c.restore(); }
    else if (X.fx === 'exclaim') { c.save(); c.textAlign = 'center'; c.textBaseline = 'middle'; const s = 1 + 0.15 * Math.sin(t * 16 + ph); c.font = '900 ' + (36 * s) + 'px Arial'; c.lineWidth = 5; c.strokeStyle = INK; c.fillStyle = '#D94E43'; c.strokeText('!', 0, -60); c.fillText('!', 0, -60); c.restore(); }
    else if (X.fx === 'tears') { for (let e = -1; e <= 1; e += 2) for (let i = 0; i < 2; i++) { const u = (t * 1.1 + i * 0.5 + e * 0.2 + ph) % 1, x = e * 13 + e * u * 2, y = 8 + u * 30; c.save(); c.globalAlpha = 1 - u * 0.7; c.fillStyle = '#8FD0F0'; c.strokeStyle = INK; c.lineWidth = 1.6; c.beginPath(); c.moveTo(x, y - 6); c.quadraticCurveTo(x + 4.5, y + 2, x, y + 5); c.quadraticCurveTo(x - 4.5, y + 2, x, y - 6); c.fill(); c.stroke(); c.restore(); } }
  }
  const EMO = { base: { trem: 0, bounce: 0, tempo: 6 }, scared: { trem: 1.6, bounce: 0, tempo: 6 }, panic: { trem: 2.2, bounce: 0, tempo: 6 }, crying: { trem: 1.2, bounce: 0.8, tempo: 5 }, laughing: { trem: 0.3, bounce: 3.2, tempo: 11 }, happy: { trem: 0, bounce: 1.2, tempo: 5 }, proud: { trem: 0, bounce: 0.7, tempo: 3 }, angry: { trem: 0.9, bounce: 0, tempo: 6 }, smirk: { trem: 0, bounce: 0.5, tempo: 3 } };
  // acting layer on top of a pose: bigger gestures, weight shift, small drifts, and an impact RECOIL on every time in opts.hit
  function act(P, o, t, ph) {
    const A = o.act === undefined ? 1.3 : o.act;
    P.aR *= A; P.aL *= A; P.eR *= 1 + (A - 1) * 0.6; P.eL *= 1 + (A - 1) * 0.6;
    P.sway = Math.sin(t * 0.9 + ph) * 5.2 + Math.sin(t * 2.3 + ph * 1.7) * 1.6; P.lean += 0.035 * Math.sin(t * 0.8 + ph * 1.3); P.tilt += 0.03 * Math.sin(t * 1.1 + ph);
    let kick = 0; (o.hit || []).forEach(h => { const u = t - h; if (u >= 0 && u < 0.9) kick += Math.exp(-u * 7) * Math.cos(u * 14); });
    P.lean -= 0.28 * kick; P.bob -= 7 * kick; P.aR += 0.9 * kick; P.aL -= 0.9 * kick; P.tilt -= 0.18 * kick; P.kick = kick;
    // continuous life so a held pose is never frozen: expression-driven tremble / bounce, an emphasis gesture about every 1.7 s, wandering arms
    const nm = (o.ex && o.ex.length) ? exParams(o, 'neutral', t).name : (o.expr || ''), em = EMO[nm] || EMO.base;
    P.sway += em.trem * Math.sin(t * 39 + ph); P.bob += em.trem * 0.5 * Math.sin(t * 33 + ph * 2) - em.bounce * Math.abs(Math.sin(t * em.tempo + ph));
    const g = Math.pow(Math.max(0, Math.sin(t * 3.7 + ph * 2.3)), 8);
    P.aR += 0.4 * g; P.aL -= 0.28 * g; P.eR += 0.25 * g; P.tilt += 0.05 * g; P.bob -= 1.6 * g;
    P.aR += 0.15 * Math.sin(t * 2.3 + ph); P.aL -= 0.15 * Math.sin(t * 2.0 + ph + 1); P.eR += 0.16 * Math.sin(t * 1.7 + ph * 2); P.eL += 0.16 * Math.sin(t * 1.5 + ph * 1.4); P.lean += 0.035 * Math.sin(t * 1.9 + ph); P.tilt += 0.045 * Math.sin(t * 1.7 + ph * 0.7); P.bob += 1.3 * Math.sin(t * 1.4 + ph);
    return P;
  }

  // ---- hair: back mass (behind the face) and front (over the forehead) ------------------------------------------------------------------------------
  function hairBack(c, h, fx, side) {
    if (h.s === 'wavy') { c.beginPath(); c.moveTo(-36, -8); c.bezierCurveTo(-48, 26, -44, 56, -30, 66); c.lineTo(30, 66); c.bezierCurveTo(44, 56, 48, 26, 36, -8); c.bezierCurveTo(30, -44, -30, -44, -36, -8); c.closePath(); fs(c, h.c, LW * 0.9); }
    else if (h.s === 'swoop' || h.s === 'swept') { c.beginPath(); c.ellipse(0, -14, 39, 30, 0, 0, 7); fs(c, h.c, LW * 0.9); }
    else if (h.s === 'short' || h.s === 'side' || h.s === 'crop' || h.s === 'slick') { c.beginPath(); c.ellipse(0, -10, 36, 33, 0, 0, 7); fs(c, h.c, LW * 0.9); }
  }
  function hairFront(c, h, fx, side) {
    const hl = (p) => { c.save(); c.strokeStyle = h.h; c.lineWidth = 2.2; c.lineCap = 'round'; c.globalAlpha = 0.75; p(); c.restore(); };
    if (h.s === 'swoop') {          // big swept golden wave across the forehead
      c.beginPath(); c.moveTo(-37, 2); c.bezierCurveTo(-46, -34, -10, -56, 30, -44); c.bezierCurveTo(52, -38, 46, -8, 38, 4); c.bezierCurveTo(35, -16, 16, -31, -2, -31); c.bezierCurveTo(-16, -31, -30, -16, -37, 2); c.closePath(); fs(c, h.c, LW * 0.9);
      hl(() => { c.beginPath(); c.moveTo(-26, -30); c.quadraticCurveTo(0, -48, 30, -36); c.stroke(); c.beginPath(); c.moveTo(-22, -18); c.quadraticCurveTo(4, -34, 32, -22); c.stroke(); });
    } else if (h.s === 'swept') {   // thick swept-back silver hair, side part
      c.beginPath(); c.moveTo(-37, 0); c.bezierCurveTo(-44, -38, -8, -52, 26, -44); c.bezierCurveTo(50, -36, 44, -6, 37, 2); c.bezierCurveTo(34, -18, 12, -33, -10, -31); c.bezierCurveTo(-24, -29, -33, -14, -37, 0); c.closePath(); fs(c, h.c, LW * 0.9);
      hl(() => { c.beginPath(); c.moveTo(-24, -34); c.quadraticCurveTo(2, -46, 28, -36); c.stroke(); c.beginPath(); c.moveTo(-8, -26); c.quadraticCurveTo(10, -36, 30, -26); c.stroke(); });
    } else if (h.s === 'short' || h.s === 'side' || h.s === 'crop') {
      const top = h.s === 'crop' ? -38 : -45; c.beginPath(); c.moveTo(-36, -2); c.bezierCurveTo(-42, top, 42, top, 36, -2); c.bezierCurveTo(33, -20, 20, -31, 0, -29 + (h.s === 'side' ? 4 : 0)); c.bezierCurveTo(-18, -31, -31, -20, -36, -2); c.closePath(); fs(c, h.c, LW * 0.9);
      if (h.s === 'side') hl(() => { c.beginPath(); c.moveTo(-6, -40); c.quadraticCurveTo(-8, -28, -12, -22); c.stroke(); }); hl(() => { c.beginPath(); c.moveTo(-20, -32); c.quadraticCurveTo(4, -42, 26, -30); c.stroke(); });
    } else if (h.s === 'slick') {
      c.beginPath(); c.moveTo(-36, -2); c.bezierCurveTo(-40, -42, 40, -42, 36, -2); c.bezierCurveTo(32, -24, 12, -33, 0, -33); c.bezierCurveTo(-12, -33, -32, -24, -36, -2); c.closePath(); fs(c, h.c, LW * 0.9);
      hl(() => { for (let i = 0; i < 3; i++) { c.beginPath(); c.moveTo(-24 + i * 4, -30 + i * 4); c.quadraticCurveTo(0, -42 + i * 3, 28, -28 + i * 3); c.stroke(); } });
    } else if (h.s === 'wavy') {    // side-swept fringe over a long wavy back
      c.beginPath(); c.moveTo(-37, 4); c.bezierCurveTo(-44, -40, 30, -54, 40, -4); c.bezierCurveTo(34, -26, 12, -36, -8, -30); c.bezierCurveTo(-24, -24, -32, -6, -37, 4); c.closePath(); fs(c, h.c, LW * 0.9);
      hl(() => { c.beginPath(); c.moveTo(-22, -29); c.quadraticCurveTo(0, -37, 24, -29); c.stroke(); c.beginPath(); c.moveTo(-34, 6); c.quadraticCurveTo(-40, 30, -32, 54); c.stroke(); });
    } else if (h.s === 'baldsides') {   // hair only around the ears + a shine on top
      [-1, 1].forEach(sd => { c.beginPath(); c.moveTo(sd * 33, -22); c.quadraticCurveTo(sd * 44, -8, sd * 36, 10); c.quadraticCurveTo(sd * 28, -2, sd * 29, -18); c.closePath(); fs(c, h.c, LW * 0.8); });
      c.save(); c.globalAlpha = 0.35; c.fillStyle = '#fff'; c.beginPath(); c.ellipse(-8, -28, 10, 5, -0.4, 0, 7); c.fill(); c.restore();
    }
  }

  // ---- head ----------------------------------------------------------------------------------------------------------------------------------------------
  function head(c, S, o, t, ph, fx, exn, tilt, side) {
    const RX = 33, RY = 35, X0 = o.__X || exOf(exn), X = Object.assign({}, X0, { ba: X0.ba * 1.25, by: X0.by * 1.35, k: X0.k * 1.15 }), turn = side ? fx : 0, tx = turn * 13, fw = side ? 0.8 : 1;
    const blinkP = ((t + ph * 1.7) % (3.6 + (ph % 1) * 2.2)) / 0.2, blink = blinkP >= 0 && blinkP < 1 ? Math.sin(blinkP * Math.PI) : 0;           // a short blink every 3.6 to 5.8 s
    const gz = (o.look && o.look[0] !== undefined) ? o.look : [X.gx || 0.15 * Math.sin(t * 0.7 + ph * 2) + (o.lookX || 0) + (hash(Math.floor(t * 0.9 + ph * 3.1)) - 0.5) * 0.9, X.gy || 0.1 * Math.sin(t * 0.9 + ph)];
    c.save(); c.rotate(tilt);
    hairBack(c, S.hair, fx, side);
    // ears
    if (!side) [-1, 1].forEach(sd => { c.beginPath(); c.ellipse(sd * (RX - 1), 4, 6, 9, 0, 0, 7); fs(c, shade(S.skin, 0.94), LW * 0.85); }); else { c.beginPath(); c.ellipse(-turn * 14, 4, 6, 9, 0, 0, 7); fs(c, shade(S.skin, 0.94), LW * 0.85); }
    // face
    c.beginPath(); c.ellipse(side ? -turn * 2 : 0, 0, RX * fw + (side ? 3 : 0), RY, 0, 0, 7); fs(c, S.skin);
    c.save(); c.clip(); c.fillStyle = 'rgba(120,60,30,0.10)'; c.beginPath(); c.ellipse(RX * 0.55 + tx * 0.3, 10, RX, RY, 0, 0, 7); c.rect(-60, -60, 120, 120); c.fill('evenodd'); c.restore();          // soft shade on the far side
    c.save(); c.globalAlpha = 0.5; c.fillStyle = '#E97A6E'; [-1, 1].forEach(sd => { c.beginPath(); c.ellipse(sd * 20 * fw + tx * 0.7, 13, 6.5, 4, 0, 0, 7); c.fill(); }); c.restore();           // cheeks
    // eyes
    const ex = [-12 * fw + tx, 12 * fw + tx], ey = -1, eo = cl(X.eo * (1 - blink * 0.95), 0.04, 1.35);
    ex.forEach((x, i) => {
      const nearFar = side ? (i === (turn > 0 ? 1 : 0) ? 1 : 0.72) : 1;
      if (eo < 0.2) { c.beginPath(); c.moveTo(x - 7 * nearFar, ey + 1); c.quadraticCurveTo(x, ey + 4, x + 7 * nearFar, ey + 1); c.lineWidth = 2.6; c.strokeStyle = INK; c.lineCap = 'round'; c.stroke(); return; }
      c.beginPath(); c.ellipse(x, ey, 6.8 * nearFar, 7.8 * eo, 0, 0, 7); c.fillStyle = '#FFFFFF'; c.fill(); c.lineWidth = 2.3; c.strokeStyle = INK; c.stroke();
      c.save(); c.beginPath(); c.ellipse(x, ey, 6.8 * nearFar, 7.8 * eo, 0, 0, 7); c.clip();
      const px = x + gz[0] * 3.2 + turn * 2.4, py = ey + gz[1] * 3; c.beginPath(); c.arc(px, py, 3.9 * Math.min(1, nearFar + 0.1), 0, 7); c.fillStyle = S.female ? '#4A3322' : '#2A1C12'; c.fill(); c.beginPath(); c.arc(px, py, 2.0, 0, 7); c.fillStyle = '#0A0706'; c.fill(); c.beginPath(); c.arc(px + 1.4, py - 1.6, 1.2, 0, 7); c.fillStyle = '#fff'; c.fill();
      const lid = (0.2 + Math.max(0, 1 - eo) * 0.55) * 7.8 * eo * 2; c.fillStyle = shade(S.skin, 0.97); c.fillRect(x - 9, ey - 9 * eo - 1, 18, lid + 1);       // relaxed upper lid
      c.restore();
      { c.beginPath(); c.moveTo(x - 7.4 * nearFar, ey - 1); c.quadraticCurveTo(x, ey - 9.4 * eo - 2, x + 7.4 * nearFar, ey - 1); c.lineWidth = 2.6; c.strokeStyle = INK; c.lineCap = 'round'; c.stroke(); }
      if (S.female) { c.beginPath(); c.moveTo(x + (i ? 1 : -1) * 7 * nearFar, ey - 2); c.lineTo(x + (i ? 1 : -1) * 11, ey - 5); c.lineWidth = 2; c.strokeStyle = INK; c.stroke(); }
    });
    // brows
    ex.forEach((x, i) => { const sd = i ? 1 : -1, raise = ((X0.name || exn) === 'think' && i === 1) ? -4 : 0, ang = X.ba * sd * -1; c.save(); c.translate(x, ey - 15 + X.by + raise); c.rotate(ang); c.beginPath(); c.moveTo(-8, 1.5); c.quadraticCurveTo(0, -3.2, 8, 1.5); c.lineCap = 'round'; c.lineWidth = S.female ? 3 : 4.6; c.strokeStyle = S.brow || S.hair.c; c.stroke(); c.restore(); });
    // nose
    c.beginPath(); if (side) { c.moveTo(tx + turn * 6, 4); c.quadraticCurveTo(tx + turn * 13, 10, tx + turn * 6, 13); } else { c.moveTo(-1.5, 5); c.quadraticCurveTo(3.5, 10, -0.5, 12.5); } c.lineWidth = 2.4; c.lineCap = 'round'; c.strokeStyle = shade(S.skin, 0.58); c.stroke();
    // mouth
    const mw = 9.5 * fw, my = 21, talking = (X0.name || exn) === 'talk' || (o.talk || 0) > 0.5, sy = Math.sin(t * 1.3 + ph * 2.1) + Math.sin(t * 0.53 + ph), mo = X.mo || (talking && sy > -0.4 ? 0.15 + 0.85 * Math.abs(Math.sin(t * (9 + (ph % 1.3) * 5))) : 0), k = X.k, mx = tx * 0.85;
    if (mo > 0.08 && X.mo !== 0.95) { const h = 3 + mo * 11; c.beginPath(); c.moveTo(mx - mw, my); c.quadraticCurveTo(mx, my - 3 + k * 4, mx + mw, my); c.quadraticCurveTo(mx, my + h + Math.max(0, k) * 4, mx - mw, my); c.closePath(); c.fillStyle = '#6B2229'; c.fill(); c.lineWidth = 2.4; c.strokeStyle = INK; c.stroke(); if (mo > 0.35) { c.save(); c.clip(); c.fillStyle = '#fff'; c.fillRect(mx - mw, my - 3, mw * 2, 4); c.restore(); } }
    else if (X.mo === 0.95) { c.beginPath(); c.ellipse(mx, my + 3, 5.6, 8, 0, 0, 7); c.fillStyle = '#6B2229'; c.fill(); c.lineWidth = 2.4; c.strokeStyle = INK; c.stroke(); }
    else { c.beginPath(); c.moveTo(mx - mw, my + (X.as || 0) * 2); c.quadraticCurveTo(mx, my + k * 9, mx + mw, my - (X.as || 0) * 5); c.lineWidth = 2.8; c.lineCap = 'round'; c.strokeStyle = S.female ? '#B8444F' : INK; c.stroke(); }
    if (S.female) { c.save(); c.globalAlpha = 0.7; c.beginPath(); c.moveTo(mx - mw * 0.85, my); c.quadraticCurveTo(mx, my + 3 + k * 7, mx + mw * 0.85, my); c.lineWidth = 4; c.strokeStyle = '#C2515C'; c.stroke(); c.restore(); }
    // facial hair
    if (S.beard === 'full') { c.save(); c.beginPath(); c.ellipse(0, 0, RX * fw, RY, 0, 0, 7); c.clip(); c.beginPath(); c.moveTo(-34, 6); c.bezierCurveTo(-30, 20, -22, 40, 0, 42); c.bezierCurveTo(22, 40, 30, 20, 34, 6); c.lineTo(34, 16); c.bezierCurveTo(24, 14, 14, 12, 0, 13); c.bezierCurveTo(-14, 12, -24, 14, -34, 16); c.closePath(); c.fillStyle = S.hair.c; c.fill(); c.restore(); c.beginPath(); c.moveTo(mx - mw - 3, my - 1); c.quadraticCurveTo(mx, my - 7, mx + mw + 3, my - 1); c.lineWidth = 3; c.strokeStyle = S.hair.c; c.stroke(); if (!(mo > 0.08)) { c.beginPath(); c.moveTo(mx - mw, my + 1); c.quadraticCurveTo(mx, my + 1 + k * 9, mx + mw, my + 1); c.lineWidth = 2.2; c.strokeStyle = INK; c.stroke(); } }
    else if (S.beard === 'stubble') { c.save(); c.beginPath(); c.ellipse(0, 0, RX * fw, RY, 0, 0, 7); c.clip(); c.globalAlpha = 0.38; c.fillStyle = S.hair.c; for (let i = 0; i < 48; i++) { const a = hash(i * 3.1) * 6.283, r = 10 + hash(i * 5.7) * 22, px = Math.cos(a) * r * 0.95, py = 12 + Math.abs(Math.sin(a)) * r * 0.62 + 4; if (py > 14 && py < 36) c.fillRect(px, py, 1.5, 1.5); } c.restore(); }
    else if (S.beard === 'mustache') { c.beginPath(); c.moveTo(mx - 11, my - 3); c.quadraticCurveTo(mx, my - 11, mx + 11, my - 3); c.quadraticCurveTo(mx, my - 5, mx - 11, my - 3); c.fillStyle = S.hair.c; c.fill(); c.lineWidth = 1.6; c.strokeStyle = INK; c.stroke(); }
    // glasses
    if (S.glasses) { c.lineWidth = 2.3; c.strokeStyle = '#10161A'; ex.forEach((x) => { if (S.glasses === 'round') { c.beginPath(); c.arc(x, ey, 11.5, 0, 7); } else rr(c, x - 11.5, ey - 9, 23, 17, 4.5); c.fillStyle = 'rgba(190,225,255,0.10)'; c.fill(); c.stroke(); c.beginPath(); c.moveTo(x - 7, ey - 6); c.lineTo(x - 3, ey - 9); c.lineWidth = 1.4; c.strokeStyle = 'rgba(255,255,255,0.8)'; c.stroke(); c.lineWidth = 2.3; c.strokeStyle = '#10161A'; }); c.beginPath(); c.moveTo(ex[0] + 11.5, ey - 2); c.lineTo(ex[1] - 11.5, ey - 2); c.stroke(); if (!side) [-1, 1].forEach(sd => { c.beginPath(); c.moveTo(sd * (RX * fw - 1), ey - 2); c.lineTo(sd * (RX * fw - 9) + (sd > 0 ? 0 : 0), ey - 2); c.stroke(); }); }
    hairFront(c, S.hair, fx, side); fxMarks(c, X0, t, ph);
    if (S.helmet) { c.beginPath(); c.moveTo(-38, -4); c.bezierCurveTo(-40, -50, 40, -50, 38, -4); c.lineTo(46, -2); c.quadraticCurveTo(0, 2, -46, -2); c.closePath(); fs(c, S.helmet, LW * 0.9); c.save(); c.globalAlpha = 0.5; c.strokeStyle = '#fff'; c.lineWidth = 2.5; c.beginPath(); c.moveTo(-24, -30); c.quadraticCurveTo(-8, -42, 10, -38); c.stroke(); c.restore(); c.beginPath(); c.moveTo(-3, -46); c.lineTo(-3, -6); c.moveTo(3, -46); c.lineTo(3, -6); c.lineWidth = 2; c.strokeStyle = INK; c.stroke(); }
    c.restore();
  }

  // ---- body ----------------------------------------------------------------------------------------------------------------------------------------------
  const HIPY = -96, SHY = -166, UA = 38, FA = 34, TH = 47, SH = 47;
  function logo(c, kind, x, y) {
    if (kind === 'nv') { rr(c, x, y, 14, 11, 3); fs(c, '#76B900', 1.6); c.beginPath(); c.ellipse(x + 7, y + 5.5, 3.6, 2.4, 0, 0, 7); c.strokeStyle = '#0B191E'; c.lineWidth = 1.4; c.stroke(); }
    else if (kind === 'tesla') { c.fillStyle = '#E02A33'; c.fillRect(x, y, 13, 3.2); c.fillRect(x + 5, y, 3.2, 11); }
    else if (kind === 'trader') { rr(c, x, y, 18, 7, 2); fs(c, '#EDEDED', 1.4); }
  }
  function torso(c, S, sw, hw, side) {
    const top = SHY - 6, bot = HIPY + 8, j = S.j;
    c.beginPath();
    if (side) { c.moveTo(-10, top + 4); c.quadraticCurveTo(0, top - 3, 10, top + 4); c.lineTo(11, bot); c.lineTo(-11, bot); c.closePath(); }
    else { c.moveTo(-hw, bot); c.lineTo(-sw - 1, top + 16); c.quadraticCurveTo(-sw - 2, top + 2, -sw + 9, top + 1); c.quadraticCurveTo(0, top - 5, sw - 9, top + 1); c.quadraticCurveTo(sw + 2, top + 2, sw + 1, top + 16); c.lineTo(hw, bot); c.closePath(); }
    fs(c, j);
    c.save(); c.clip(); c.fillStyle = 'rgba(0,0,0,0.16)'; c.fillRect(sw * 0.38, top - 6, sw, 120); c.fillStyle = 'rgba(255,255,255,0.09)'; c.fillRect(-sw - 2, top - 6, sw * 0.5, 120);
    if (S.stripe) { c.strokeStyle = 'rgba(255,255,255,.2)'; c.lineWidth = 1.2; for (let i = -sw + 4; i < sw; i += 7) { c.beginPath(); c.moveTo(i, top + 10); c.lineTo(i * 0.82, bot); c.stroke(); } }
    c.restore();
    if (side) return;
    if (S.suit) {
      c.beginPath(); c.moveTo(-9, top + 1); c.lineTo(9, top + 1); c.lineTo(0, top + 46); c.closePath(); c.fillStyle = S.s; c.fill(); c.lineWidth = 2; c.strokeStyle = INK; c.stroke();
      if (!S.female) { c.beginPath(); c.moveTo(-9, top + 1); c.lineTo(-sw * 0.62, top + 48); c.lineTo(-3, top + 56); c.lineTo(-1, top + 46); c.closePath(); c.fillStyle = shade(j, 1.12); c.fill(); c.stroke(); c.beginPath(); c.moveTo(9, top + 1); c.lineTo(sw * 0.62, top + 48); c.lineTo(3, top + 56); c.lineTo(1, top + 46); c.closePath(); c.fillStyle = shade(j, 1.12); c.fill(); c.stroke(); }
      else { c.beginPath(); c.moveTo(-9, top + 1); c.lineTo(-sw * 0.6, top + 40); c.lineTo(-2, top + 52); c.moveTo(9, top + 1); c.lineTo(sw * 0.6, top + 40); c.lineTo(2, top + 52); c.lineWidth = 2; c.strokeStyle = INK; c.stroke(); c.beginPath(); c.arc(0, top + 12, 2.6, 0, 7); c.fillStyle = '#E2B857'; c.fill(); }
      if (S.tie) { c.beginPath(); c.moveTo(-4, top + 2); c.lineTo(4, top + 2); c.lineTo(3.4, top + 8); c.lineTo(6, top + 46); c.lineTo(0, top + 56); c.lineTo(-6, top + 46); c.lineTo(-3.4, top + 8); c.closePath(); fs(c, S.tie, 1.8); c.beginPath(); c.moveTo(-3.6, top + 3); c.lineTo(3.6, top + 3); c.lineTo(3.2, top + 9); c.lineTo(-3.2, top + 9); c.closePath(); c.fillStyle = shade(S.tie, 0.8); c.fill(); c.stroke(); }
      c.beginPath(); c.moveTo(0, top + 56); c.lineTo(0, bot); c.lineWidth = 2; c.strokeStyle = 'rgba(11,25,30,0.55)'; c.stroke();
      [[-1, 0.52], [1, 0.52]].forEach(() => { });
      c.beginPath(); c.arc(0, top + 66, 1.8, 0, 7); c.fillStyle = shade(j, 0.45); c.fill();
    } else if (S.polo) { c.beginPath(); c.moveTo(-10, top + 2); c.lineTo(0, top + 18); c.lineTo(10, top + 2); c.lineTo(5, top - 1); c.lineTo(0, top + 6); c.lineTo(-5, top - 1); c.closePath(); c.fillStyle = shade(j, 1.35); c.fill(); c.lineWidth = 2; c.strokeStyle = INK; c.stroke(); c.beginPath(); c.moveTo(0, top + 6); c.lineTo(0, top + 26); c.lineWidth = 1.6; c.stroke(); }
    else {
      c.beginPath(); c.moveTo(0, top + 4); c.lineTo(0, bot); c.lineWidth = 2.2; c.strokeStyle = shade(j, 0.5); c.stroke();
      c.beginPath(); c.moveTo(-11, top + 1); c.lineTo(-6, top + 17); c.lineTo(0, top + 6); c.lineTo(6, top + 17); c.lineTo(11, top + 1); c.lineTo(5, top - 2); c.lineTo(0, top + 3); c.lineTo(-5, top - 2); c.closePath(); c.fillStyle = shade(j, 1.35); c.fill(); c.lineWidth = 2; c.strokeStyle = INK; c.stroke();
      if (S.logo) logo(c, S.logo, sw * 0.28, top + 24);
    }
    if (S.vest) { c.beginPath(); c.moveTo(-sw + 2, top + 5); c.lineTo(-8, top + 2); c.lineTo(-5, bot); c.lineTo(-hw + 1, bot); c.closePath(); fs(c, '#F28A1B', 2); c.beginPath(); c.moveTo(sw - 2, top + 5); c.lineTo(8, top + 2); c.lineTo(5, bot); c.lineTo(hw - 1, bot); c.closePath(); fs(c, '#F28A1B', 2); c.fillStyle = '#F2EDC8'; c.fillRect(-hw + 2, top + 44, hw - 7, 5); c.fillRect(7, top + 44, hw - 7, 5); }
    if (S.badge) { c.beginPath(); c.moveTo(-6, top + 1); c.lineTo(-2, top + 30); c.lineTo(6, top + 1); c.lineWidth = 1.8; c.strokeStyle = '#4A7FD1'; c.stroke(); rr(c, -7, top + 30, 14, 18, 2.5); fs(c, '#F4F1EA', 1.6); c.fillStyle = '#4A7FD1'; c.fillRect(-4.5, top + 33, 9, 5); }
    // belt
    c.fillStyle = '#15171B'; c.fillRect(-hw + 1, bot - 7, hw * 2 - 2, 6); c.fillStyle = '#C8A24A'; c.fillRect(-3.5, bot - 7, 7, 6);
  }
  function hand(c, x, y, skin) { c.beginPath(); c.ellipse(x, y, 6.8, 7.4, 0, 0, 7); fs(c, skin, 2.6); c.beginPath(); c.arc(x - 3, y - 1, 2, 0, 7); c.fillStyle = shade(skin, 0.9); c.fill(); }

  const PROP = {
    paper(c) { c.save(); c.rotate(-0.1); rr(c, -2, -26, 28, 34, 2); fs(c, '#F4F1EA', 2.4); c.strokeStyle = '#8A8F96'; c.lineWidth = 1.4; for (let i = 0; i < 4; i++) { c.beginPath(); c.moveTo(3, -19 + i * 7); c.lineTo(21, -19 + i * 7); c.stroke(); } c.restore(); },
    phone(c) { c.save(); c.rotate(-0.2); rr(c, -4, -18, 11, 20, 3); fs(c, '#222', 2.4); c.fillStyle = '#7FD0FF'; c.fillRect(-2.5, -15, 8, 14); c.restore(); },
    laptop(c) { rr(c, -8, -10, 34, 20, 2); fs(c, '#C9CED4', 2.4); rr(c, -6, -8, 30, 16, 1); c.fillStyle = '#10161C'; c.fill(); c.fillStyle = '#76B900'; c.fillRect(2, -4, 8, 2); },
    mic(c) { c.beginPath(); c.moveTo(0, 0); c.lineTo(5, -22); c.lineWidth = 5; c.strokeStyle = INK; c.stroke(); c.beginPath(); c.arc(6, -26, 7, 0, 7); fs(c, '#222', 2.4); },
    camera(c) { rr(c, -4, -16, 28, 20, 3); fs(c, '#2A2D33', 2.4); c.beginPath(); c.arc(16, -6, 7, 0, 7); fs(c, '#66737F', 2.4); },
    case(c) { rr(c, -12, 4, 34, 24, 3); fs(c, '#5A3D23', 2.4); c.strokeStyle = INK; c.lineWidth = 3; c.beginPath(); c.arc(5, 4, 7, Math.PI, 0); c.stroke(); },
    folder(c) { rr(c, -2, -24, 28, 32, 2); fs(c, '#D9B45A', 2.4); c.fillStyle = '#C29C3D'; c.fillRect(-2, -24, 12, 5); },
    clipboard(c) { rr(c, -2, -28, 26, 36, 3); fs(c, '#8A5A2B', 2.4); rr(c, 1, -24, 20, 29, 1); c.fillStyle = '#F4F1EA'; c.fill(); c.fillStyle = '#8A5A2B'; c.fillRect(7, -30, 8, 5); },
    gavel(c) { c.save(); c.rotate(-0.5); c.beginPath(); c.moveTo(0, 4); c.lineTo(0, -24); c.lineWidth = 4; c.strokeStyle = '#6B4A2B'; c.stroke(); rr(c, -9, -30, 18, 10, 2); fs(c, '#8A5A2B', 2.4); c.restore(); },
    flag(c) { c.beginPath(); c.moveTo(0, 6); c.lineTo(0, -50); c.lineWidth = 3; c.strokeStyle = '#DDD'; c.stroke(); c.fillStyle = '#C42631'; c.fillRect(0, -50, 28, 18); c.fillStyle = '#fff'; c.fillRect(0, -44, 28, 4); c.fillStyle = '#1D3A7A'; c.fillRect(0, -50, 12, 9); c.strokeStyle = INK; c.lineWidth = 1.5; c.strokeRect(0, -50, 28, 18); },
    sign(c, o) { c.beginPath(); c.moveTo(4, 8); c.lineTo(4, -34); c.lineWidth = 3.5; c.strokeStyle = '#8A6A3A'; c.stroke(); rr(c, -20, -78, 56, 44, 3); fs(c, '#F4F1EA', 2.4); c.fillStyle = '#C42631'; c.font = '800 13px Arial, sans-serif'; c.textAlign = 'center'; (o.propText || 'RETURN').split(' ').slice(0, 3).forEach((w, i) => c.fillText(w, 8, -62 + i * 14)); },
    tablet(c) { c.save(); c.rotate(-0.15); rr(c, -4, -24, 30, 22, 3); fs(c, '#2A2D33', 2.4); rr(c, -1.5, -21.5, 25, 17, 1.5); c.fillStyle = '#10161C'; c.fill(); c.fillStyle = '#76B900'; c.fillRect(2, -17, 12, 2.4); c.fillStyle = '#7FD0FF'; c.fillRect(2, -12, 18, 2.4); c.restore(); },
    coffee(c) { rr(c, -5, -14, 14, 18, 3); fs(c, '#F4F1EA', 2.4); c.fillStyle = '#8A5A2B'; c.fillRect(-5, -9, 14, 6); }
  };

  // podium (poses 'spr:podium' or opts.podium): a physical asset in front of the legs, with the speaker's logo
  function podium(c, role, S) {
    c.beginPath(); c.moveTo(-36, -90); c.lineTo(36, -90); c.lineTo(31, 0); c.lineTo(-31, 0); c.closePath(); fs(c, '#1D2B33', 3); c.fillStyle = '#2E4350'; c.fillRect(-36, -92, 72, 8); c.lineWidth = 2.6; c.strokeStyle = INK; c.strokeRect(-36, -92, 72, 8);
    c.save(); c.translate(0, -48);
    if (S.logo === 'nv' || role === 'jensen') { c.fillStyle = '#76B900'; rr(c, -14, -9, 28, 18, 4); c.fill(); c.strokeStyle = '#0B191E'; c.lineWidth = 2.4; c.beginPath(); c.ellipse(0, 0, 8, 5, 0, 0, 7); c.stroke(); c.beginPath(); c.arc(0, 0, 2.4, 0, 7); c.fillStyle = '#0B191E'; c.fill(); }
    else if (S.logo === 'tesla') { c.fillStyle = '#E02A33'; c.fillRect(-12, -10, 24, 5); c.fillRect(-3, -10, 6, 22); }
    else { c.beginPath(); c.arc(0, 0, 13, 0, 7); fs(c, '#27408B', 2.4); c.strokeStyle = '#E2B857'; c.lineWidth = 2; c.beginPath(); c.arc(0, 0, 9, 0, 7); c.stroke(); c.fillStyle = '#E2B857'; c.font = '700 11px Arial'; c.textAlign = 'center'; c.fillText('★', 0, 4); }
    c.restore();
    c.beginPath(); c.moveTo(0, -92); c.lineTo(8, -112); c.lineWidth = 3.2; c.strokeStyle = INK; c.stroke(); c.beginPath(); c.arc(9, -115, 5, 0, 7); fs(c, '#2A2D33', 2.4);
  }
  // ---- main -------------------------------------------------------------------------------------------------------------------------------------------------
  function draw(c, role, x, y, sc, o, t) {
    o = o || {}; t = t || 0;
    const spr = o.pose && o.pose.indexOf('spr:') === 0 ? o.pose.slice(4) : '', autoProp = { document: 'paper', tablet: 'tablet', call: 'phone', laptop: 'laptop' }[spr], propName = o.prop || autoProp;
    const S = specOf(role, o), fx = o.facing < 0 ? -1 : 1, ph = o.phase || 0, name = poseName(o), walking = name === 'walk' || name === 'run', side = (o.view || (walking ? 'side' : 'front')) === 'side';
    const P = act(getPose(Object.assign({}, o, { _side: side }), t, ph), o, t, ph), P2 = act(getPose(Object.assign({}, o, { _side: side }), t - 0.1, ph), o, t - 0.1, ph);          // P2 = a moment ago: the head lags the body (follow-through)
    const bulk = (S.big || 1) * (S.slim ? 0.9 : 1), sw = (side ? 6 : 24) * bulk, hw = (side ? 7 : 20) * bulk;
    sc *= 1.15;
    c.save(); c.translate(x, y); c.scale(sc, sc); if (o.alpha !== undefined) c.globalAlpha = o.alpha;
    if (o.shadow !== 0) { c.fillStyle = 'rgba(11,25,30,.2)'; c.beginPath(); c.ellipse(0, 2, 36, 7.5, 0, 0, 7); c.fill(); }
    const sit = P.sit ? 1 : 0, bodyY = sit ? 46 : 0, bob = sit ? 0 : P.bob, breathe = 1 + 0.012 * Math.sin(t * 1.7 + ph * 2.3);
    const lsx = side ? 3 : 12, hipR = [fx * lsx * (side ? 0.6 : 1), HIPY + bodyY + bob], hipL = [-fx * lsx * (side ? 0.6 : 1), HIPY + bodyY + bob];
    const leg = (h, ang, kn, col) => { const kx = h[0] + Math.sin(ang) * TH * fx, ky = h[1] + Math.cos(ang) * TH, sa = ang - kn, fx2 = kx + Math.sin(sa) * SH * fx, fy = Math.min(ky + Math.cos(sa) * SH, 0); limb(c, [[h[0], h[1]], [kx, ky], [fx2, fy]], 15, col); c.beginPath(); c.ellipse(fx2 + fx * 7, fy - 2, 14.5, 7.4, 0, 0, 7); fs(c, '#17191D', 2.8); c.save(); c.globalAlpha = 0.25; c.fillStyle = '#fff'; c.beginPath(); c.ellipse(fx2 + fx * 9, fy - 5, 7, 2, 0, 0, 7); c.fill(); c.restore(); };
    leg(hipL, P.tL, P.kL, shade(S.p, 0.85)); leg(hipR, P.tR, P.kR, S.p);
    c.save(); c.translate(P.sway || 0, bodyY + bob); if (P.kick > 0) c.scale(1 + 0.05 * P.kick, 1 - 0.06 * P.kick);
    const shR = [fx * sw * 0.92, SHY], shL = [-fx * sw * 0.92, SHY], suitCuff = S.suit || S.zip, sleeve = S.vest || S.polo ? S.skin : S.j;
    const arm = (sh, a, e, col) => { const ex = sh[0] + Math.sin(a) * UA * fx, ey = sh[1] + Math.cos(a) * UA, fa = a + e, hx = ex + Math.sin(fa) * FA * fx, hy = ey + Math.cos(fa) * FA, bare = S.polo || S.vest; limb(c, [[sh[0], sh[1]], [ex, ey]], 13.5, bare ? S.j : col); limb(c, [[ex, ey], [hx, hy]], 12, bare ? S.skin : col); if (suitCuff) { c.save(); c.strokeStyle = S.suit ? '#F4F1EA' : shade(col, 1.4); c.lineWidth = 3; c.lineCap = 'round'; const dx = hx - ex, dy = hy - ey, L = Math.hypot(dx, dy) || 1; c.beginPath(); c.moveTo(hx - dx / L * 9 - dy / L * 6, hy - dy / L * 9 + dx / L * 6); c.lineTo(hx - dx / L * 9 + dy / L * 6, hy - dy / L * 9 - dx / L * 6); c.stroke(); c.restore(); } hand(c, hx, hy, S.skin); return [hx, hy]; };
    const ik = (sh, tg) => { const FH = 250, tx = tg[0] * FH * fx, ty = -tg[1] * FH, dx = tx - sh[0], dy = ty - sh[1]; let d = Math.hypot(dx, dy); d = Math.max(Math.abs(UA - FA) + 0.5, Math.min(UA + FA - 0.5, d));
      const th = Math.atan2(dx * fx, dy), be = Math.acos(cl((UA * UA + d * d - FA * FA) / (2 * UA * d), -1, 1)), a = th - be, exx = sh[0] + Math.sin(a) * UA * fx, eyy = sh[1] + Math.cos(a) * UA, fa = Math.atan2((tx - exx) * fx, ty - eyy); return [a, fa - a]; };
    if (o.armR) { const q = ik(shR, o.armR), k = o.armRK === undefined ? 1 : o.armRK; P.aR = lerp(P.aR, q[0], k); P.eR = lerp(P.eR, q[1], k); }
    if (o.armL) { const q = ik(shL, o.armL), k = o.armLK === undefined ? 1 : o.armLK; P.aL = lerp(P.aL, q[0], k); P.eL = lerp(P.eL, q[1], k); }
    const hl = arm(shL, P.aL, P.eL, shade(sleeve, 0.85));
    c.save(); c.translate(0, HIPY); c.rotate(P.lean); c.scale(1, breathe); c.translate(0, -HIPY); torso(c, S, sw, hw, side); c.restore();
    // neck + head (the head follows a moment behind the body)
    c.beginPath(); c.rect(-6.5, SHY - 16, 13, 18); c.fillStyle = shade(S.skin, 0.92); c.fill(); c.lineWidth = 2.4; c.strokeStyle = INK; c.stroke();
    let exn = o.expr; if (exn === undefined) exn = (o.browTension || 0) > 0.7 ? 'concerned' : (o.talk || 0) > 0.5 ? 'talk' : name === 'talk' || name === 'present' ? 'talk' : name === 'think' ? 'think' : name === 'cheer' ? 'happy' : name === 'panic' ? 'shock' : name === 'shrug' ? 'concerned' : 'neutral';
    c.save(); c.translate(-P2.lean * 22, SHY - 40 - (side ? 0 : 0)); head(c, S, Object.assign({}, o, { __X: exParams(o, exn, t) }), t, ph, fx, exn, P.tilt * 0.6 + P2.tilt * 0.4 + P2.lean * 0.6 * fx * 0 + (P.lean - P2.lean) * 3, side); c.restore();
    const hr = arm(shR, P.aR, P.eR, sleeve);
    c.restore();
    if (spr === 'podium' || o.podium) podium(c, role, S);
    if (propName && PROP[propName]) { const h = (P.hand === 'L' || o.hand === 'L') ? hl : hr; c.save(); c.translate(h[0], h[1] + bodyY + bob); if (fx < 0) c.scale(-1, 1); PROP[propName](c, o); c.restore(); }
    c.restore();
  }
  G.Stick = { draw, T, EX, exParams, specOf, POSE, ALIAS, roles: Object.keys(T).concat(Object.keys(ALIAS)), props: Object.keys(PROP), poses: Object.keys(POSE) };
})(typeof window !== 'undefined' ? window : this);
