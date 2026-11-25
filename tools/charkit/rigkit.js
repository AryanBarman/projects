/* RigKit - reusable hybrid character rig: sprite HEADS (heads_atlas.webp) + procedural stickman BODY with outfits, poses, props.
   Drop-in for the old Char(role,...) API: RigKit.draw(ctx, role, footX, footY, scale, opts, t)  (scale 1 = 258 px tall, same as drawCharacter)
   opts (old, still honoured): facing(+1/-1) phase walkAmt armAngleR armAngleL talk browTension
   opts (new): pose, from, blend, expr, view('front'|'q'|'side'|'back'), prop, propText, jacket, shadow(0/1), alpha, sit
   poses: idle talk point think cross cheer clap panic hold phone shrug present sit walk run wave
   props: paper phone laptop mic camera case folder clipboard gavel flag sign coffee
   exprs: neutral talk concerned think happy angry shock                                                              */
(function (G) {
  'use strict';
  const INK = '#15191d', SKIN = '#f3c99a', LW = 3.2;
  const CHIN = -176, SHY = -166, HIPY = -96, UA = 38, FA = 34, TH = 47, SH = 47;
  // ---- atlas -------------------------------------------------------------------------------------------------------
  const K = { img: null, meta: null, cell: 96, ready: false, sizeMul: 1.15, headMul: 1.12, heroMinPx: 200, crowdMinPx: 120, expr10: null, poses: null, smeta: null };
  const HERO = { jensen: 1, elon: 1, trump: 1, vance: 1, kress: 1, reed: 1, cheung: 1 };
  const ORDER = ['jensen', 'elon', 'trump', 'vance', 'cheung', 'reed', 'kress', 'compliance', 'board', 'banker', 'bondholder', 'engineer', 'factory', 'supply', 'journalist', 'trader'];
  // expression columns (0..5 within the expression half of the atlas): neutral talk concerned think happy angry shock
  const EX = {
    jensen: [0, 3, 2, 1, 5, 4, 2], elon: [0, 4, 3, 2, 1, 5, 3], trump: [0, 2, 1, 4, 5, 3, 3], vance: [0, 3, 2, 1, 5, 4, 2],
    cheung: [0, 2, 4, 1, 3, 5, 4], reed: [0, 3, 1, 2, 4, 5, 5], kress: [0, 3, 1, 2, 5, 4, 1], compliance: [0, 3, 2, 1, 5, 4, 2],
    board: [0, 4, 2, 1, 4, 5, 2], banker: [0, 3, 2, 1, 4, 5, 2], bondholder: [0, 3, 1, 2, 5, 4, 1], engineer: [0, 4, 1, 2, 5, 3, 3],
    factory: [0, 3, 2, 1, 5, 4, 2], supply: [0, 3, 2, 1, 5, 4, 2], journalist: [0, 3, 1, 4, 5, 2, 2], trader: [0, 4, 2, 1, 5, 5, 3]
  };
  const SYN = { talk: ['speaking', 'explaining', 'emphatic', 'assertive'], concerned: ['concerned', 'worried'], think: ['thinking'], happy: ['smiling', 'calm', 'amused', 'satisfied', 'smirk', 'confident'], angry: ['angry', 'determined', 'firm', 'serious'], shock: ['surprised'], confident: ['confident', 'determined'], serious: ['serious', 'firm', 'focused'] };
  const EXI = { neutral: 0, talk: 1, concerned: 2, think: 3, happy: 4, angry: 5, shock: 6 };
  // ---- outfits (from the clothing sheet palette) -------------------------------------------------------------------
  // head: which head sheet character; j jacket, j2 shade, p pants, s shirt, tie, logo
  const OUT = {
    jensen: { head: 'jensen', j: '#23262b', j2: '#101215', p: '#17191c', s: '#2a2d33', logo: 'nv', zip: 1 },
    elon: { head: 'elon', j: '#25272b', j2: '#101215', p: '#17191c', s: '#1c1d20', logo: 'tesla', zip: 1 },
    trump: { head: 'trump', j: '#1d3a7a', j2: '#122650', p: '#1d3a7a', s: '#f4f1ea', tie: '#d11f2a', suit: 1, big: 1.1 },
    vance: { head: 'vance', j: '#2c2f36', j2: '#1a1c21', p: '#2c2f36', s: '#f4f1ea', tie: '#2b5fc9', suit: 1 },
    cheung: { head: 'cheung', j: '#1b1c1f', j2: '#0c0c0e', p: '#1b1c1f', s: '#f4f1ea', tie: '#111', suit: 1 },
    reed: { head: 'reed', j: '#1f2c52', j2: '#131c38', p: '#1f2c52', s: '#f4f1ea', tie: '#2b5fc9', suit: 1 },
    kress: { head: 'kress', j: '#8a8d93', j2: '#62656b', p: '#6e7177', s: '#f4f1ea', suit: 1, slim: 1 },
    compliance: { head: 'compliance', j: '#26282d', j2: '#131417', p: '#26282d', s: '#f4f1ea', tie: '#555', suit: 1, badge: 1 },
    board: { head: 'board', j: '#1f2024', j2: '#0e0e10', p: '#1f2024', s: '#f4f1ea', tie: '#c42631', suit: 1 },
    banker: { head: 'banker', j: '#2a2c33', j2: '#16171b', p: '#2a2c33', s: '#f4f1ea', tie: '#6a4aa8', suit: 1, stripe: 1 },
    bondholder: { head: 'bondholder', j: '#6b4a2b', j2: '#47301b', p: '#5a3d23', s: '#efe6d3', tie: '#b02a2a', suit: 1 },
    engineer: { head: 'engineer', j: '#25282c', j2: '#121417', p: '#2b2d31', s: '#2a2d33', logo: 'nv', zip: 1, badge: 1 },
    employee: { head: 'engineer', j: '#202226', j2: '#101113', p: '#1d1e22', s: '#202226', polo: 1, badge: 1 },
    spacex: { head: 'supply', j: '#1b2a4f', j2: '#101a33', p: '#25272b', s: '#1b2a4f', polo: 1 },
    factory: { head: 'factory', j: '#2a2c31', j2: '#15161a', p: '#25272b', s: '#2a2c31', vest: 1 },
    supply: { head: 'supply', j: '#2a56a3', j2: '#1b3a73', p: '#1d2e55', s: '#2a56a3', zip: 1, logo: 'trader' },
    journalist: { head: 'journalist', j: '#8a7448', j2: '#5e4e2e', p: '#2b2d31', s: '#e8e0cc', zip: 1, badge: 1 },
    trader: { head: 'trader', j: '#1f3a6e', j2: '#122347', p: '#1d2e55', s: '#f4f1ea', zip: 1, logo: 'trader' }
  };
  const ALIAS = { analyst: 'banker', host: 'journalist', lawyer: 'compliance', public: 'employee', cfo: 'kress', senator: 'reed', president: 'trump', vp: 'vance', staff: 'employee', official: 'cheung', engineer2: 'engineer', investor: 'bondholder', worker: 'factory', reporter: 'journalist' };
  OUT.student = Object.assign({}, OUT.employee);
  const specOf = r => OUT[r] || OUT[ALIAS[r]] || OUT.employee;

  // ---- tiny helpers ------------------------------------------------------------------------------------------------
  const lerp = (a, b, u) => a + (b - a) * u, cl = (v, a, b) => Math.max(a, Math.min(b, v));
  const sm = u => { u = cl(u, 0, 1); return u * u * (3 - 2 * u); };
  function shade(hex, f) { const n = parseInt(hex.slice(1), 16); let r = n >> 16, g = (n >> 8) & 255, b = n & 255; r = cl(Math.round(r * f), 0, 255); g = cl(Math.round(g * f), 0, 255); b = cl(Math.round(b * f), 0, 255); return '#' + ((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1); }
  function limb(c, pts, w, col) {            // outlined capsule chain
    c.lineCap = 'round'; c.lineJoin = 'round';
    c.strokeStyle = INK; c.lineWidth = w + LW * 2; c.beginPath(); c.moveTo(pts[0][0], pts[0][1]); for (let i = 1; i < pts.length; i++) c.lineTo(pts[i][0], pts[i][1]); c.stroke();
    c.strokeStyle = col; c.lineWidth = w; c.beginPath(); c.moveTo(pts[0][0], pts[0][1]); for (let i = 1; i < pts.length; i++) c.lineTo(pts[i][0], pts[i][1]); c.stroke();
    c.save(); c.translate(-w * 0.2, -w * 0.16); c.strokeStyle = 'rgba(255,255,255,0.16)'; c.lineWidth = Math.max(1.5, w * 0.24); c.beginPath(); c.moveTo(pts[0][0], pts[0][1]); for (let i = 1; i < pts.length; i++) c.lineTo(pts[i][0], pts[i][1]); c.stroke(); c.restore();   // rim light
  }
  function rr(c, x, y, w, h, r) { c.beginPath(); c.moveTo(x + r, y); c.arcTo(x + w, y, x + w, y + h, r); c.arcTo(x + w, y + h, x, y + h, r); c.arcTo(x, y + h, x, y, r); c.arcTo(x, y, x + w, y, r); c.closePath(); }
  function fillStroke(c, fill) { c.fillStyle = fill; c.fill(); c.lineWidth = LW; c.strokeStyle = INK; c.lineJoin = 'round'; c.stroke(); }

  // ---- poses: return joint angles (radians, 0 = limb hangs down, + = toward facing side) --------------------------------
  // keys: aR eR aL eL (upper-arm angle, elbow bend)   tR kR tL kL (thigh angle, knee flexion)   bob lean tilt sit prop
  const D = () => ({ aR: 0.08, eR: 0.15, aL: -0.08, eL: 0.15, tR: 0.04, kR: 0, tL: -0.04, kL: 0, bob: 0, lean: 0, tilt: 0, sit: 0, hand: 'R' });
  const POSE = {
    idle(t, ph) { const b = Math.sin(t * 2 + ph); return Object.assign(D(), { bob: b * 1.2, aR: 0.1 + b * 0.03, aL: -0.1 - b * 0.03 }); },
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
    present(t, ph) { const s = Math.sin(t * 2 + ph) * 0.06; return Object.assign(D(), { aR: 1.2 + s, eR: 0.4, aL: -0.1, eL: 0.2, lean: 0.03 }); },
    sit(t, ph) { const b = Math.sin(t * 2 + ph); return Object.assign(D(), { tR: 1.45, kR: 1.5, tL: 1.38, kL: 1.45, sit: 1, aR: 0.35, eR: 0.9, aL: 0.25, eL: 0.8, bob: b * 0.6 }); },
    walk(t, ph, o) { const f = 1.7, w = Math.sin(t * f * 6.283 + ph), w2 = Math.sin(t * f * 6.283 + ph + 1.5708), amp = o._side ? 1 : 0.4; return Object.assign(D(), { tR: w * 0.62 * amp, kR: Math.max(0, -w2) * 0.9 * amp, tL: -w * 0.62 * amp, kL: Math.max(0, w2) * 0.9 * amp, aR: -w * 0.5, aL: w * 0.5, eR: 0.3, eL: 0.3, bob: Math.abs(w) * -3 * amp + 1, lean: 0.05 * amp }); },
    run(t, ph, o) { const f = 2.6, w = Math.sin(t * f * 6.283 + ph), w2 = Math.sin(t * f * 6.283 + ph + 1.5708), amp = o._side ? 1 : 0.5; return Object.assign(D(), { tR: w * 0.95 * amp, kR: Math.max(0, -w2) * 1.5 * amp, tL: -w * 0.95 * amp, kL: Math.max(0, w2) * 1.5 * amp, aR: -w * 0.9, aL: w * 0.9, eR: 1.5, eL: 1.5, bob: Math.abs(w) * -6 * amp, lean: 0.18 * amp }); }
  };
  const backOut = (u, s) => { s = s || 1.25; u = Math.max(0, Math.min(1, u)); return 1 + (s + 1) * Math.pow(u - 1, 3) + s * Math.pow(u - 1, 2); };
  const PKEYS = ['aR', 'eR', 'aL', 'eL', 'tR', 'kR', 'tL', 'kL', 'bob', 'lean', 'tilt', 'sit'];
  function getPose(o, t, ph) {
    let name = o.pose;
    if (!name) {                                           // map the old drawCharacter opts
      if ((o.walkAmt || 0) > 0.3) name = 'walk';
      else if ((o.armAngleR || 0) < -1.2) name = 'point';
      else if ((o.browTension || 0) > 0.7) name = 'think';
      else if ((o.talk || 0) > 0.5) name = 'talk';
      else name = 'idle';
    }
    if (o.sit) name = 'sit';
    const tt = t * (1 + ((ph * 0.37) % 0.17)), P = (POSE[name] || POSE.idle)(tt, ph, o);   // each character gets its own tempo
    if (o.from && o.blend !== undefined && o.blend < 1) {  // smooth transition between two poses
      const Q = (POSE[o.from] || POSE.idle)(tt, ph, o), u = Math.min(1.3, backOut(o.blend));
      PKEYS.forEach(k => { P[k] = lerp(Q[k], P[k], u); });
    }
    if (typeof o.armAngleR === 'number' && !o.pose && name !== 'walk' && name !== 'point') { /* old arm override ignored: poses are richer */ }
    return P;
  }

  // ---- heads -------------------------------------------------------------------------------------------------------
  function headCell(spec, view, facing, expr, talkPhase, o) {
    const row = ORDER.indexOf(spec.head); if (row < 0) return null;
    let col;
    if (view === 'back') col = 3;
    else if (view === 'side') col = facing >= 0 ? 4 : 2;
    else if (view === 'q') col = facing >= 0 ? 5 : 1;
    else {
      const ei = typeof expr === 'number' ? expr : EXI[expr] === undefined ? 0 : EXI[expr];
      let idx = EX[spec.head][ei];
      if (expr === 'talk' && talkPhase) idx = EX[spec.head][0];          // mouth closes on the off-beat
      col = 6 + idx;
    }
    return [col * K.cell, row * K.cell];
  }
  function drawHead(c, spec, x, y, view, facing, expr, talkPhase, tilt, o) {
    if (view === 'front' && K.expr10 && K.smeta) {                      // high-detail 10-expression heads for the 8 main characters
      const ri = K.smeta.exprRows.indexOf(spec.head), names = K.smeta.expr[spec.head];
      if (ri >= 0) {
        const want = (expr === 'talk' && talkPhase) ? 'neutral' : expr;
        let ni = typeof want === 'number' ? want : names.indexOf(want);
        if (ni < 0) { const syn = SYN[want] || []; for (let q = 0; q < syn.length && ni < 0; q++) ni = names.indexOf(syn[q]); }
        if (ni < 0) ni = 0;
        const S = 96 * K.headMul * (o && o.headScale || 1), E = K.smeta.exprCell;
        c.save(); c.translate(x, y); c.rotate(tilt); c.drawImage(K.expr10, ni * E, ri * E, E, E, -S / 2, -S + 5, S, S); c.restore(); return;
      }
    }
    const cell = headCell(spec, view, facing, expr, talkPhase, o); if (!cell || !K.ready) { c.fillStyle = SKIN; c.beginPath(); c.arc(x, y - 34, 32, 0, 7); fillStroke(c, SKIN); return; }
    const S = 96 * K.headMul * (o && o.headScale || 1);
    c.save(); c.translate(x, y); c.rotate(tilt);
    c.drawImage(K.img, cell[0], cell[1], K.cell, K.cell, -S / 2, -S + 5, S, S);
    c.restore();
  }

  // ---- body --------------------------------------------------------------------------------------------------------
  function hand(c, x, y) { c.beginPath(); c.arc(x, y, 6.5, 0, 7); fillStroke(c, SKIN); }
  function torso(c, spec, view, sw, hw, lean, jacket) {
    const top = SHY - 6, bot = HIPY + 8, side = view === 'side';
    c.save(); c.translate(0, HIPY); c.rotate(lean); c.translate(0, -HIPY);
    const j = jacket || spec.j;
    c.beginPath();
    if (side) { c.moveTo(-9, top); c.lineTo(9, top); c.lineTo(10, bot); c.lineTo(-10, bot); }
    else { c.moveTo(-sw, top + 6); c.quadraticCurveTo(0, top - 4, sw, top + 6); c.lineTo(hw, bot); c.lineTo(-hw, bot); }
    c.closePath(); fillStroke(c, j);
    if (view === 'back') { c.restore(); return; }
    if (!side) {
      if (spec.suit) {                                   // shirt wedge, lapels, tie
        c.beginPath(); c.moveTo(-8, top + 2); c.lineTo(8, top + 2); c.lineTo(0, top + 44); c.closePath(); c.fillStyle = spec.s; c.fill(); c.lineWidth = 2; c.strokeStyle = INK; c.stroke();
        c.beginPath(); c.moveTo(-8, top + 2); c.lineTo(-sw * 0.62, top + 46); c.lineTo(-3, top + 52); c.moveTo(8, top + 2); c.lineTo(sw * 0.62, top + 46); c.lineTo(3, top + 52); c.lineWidth = 2; c.strokeStyle = shade(j, 0.55); c.stroke();
        if (spec.tie) { c.beginPath(); c.moveTo(-3, top + 3); c.lineTo(3, top + 3); c.lineTo(5, top + 44); c.lineTo(0, top + 52); c.lineTo(-5, top + 44); c.closePath(); c.fillStyle = spec.tie; c.fill(); c.lineWidth = 1.6; c.strokeStyle = INK; c.stroke(); }
        if (spec.stripe) { c.strokeStyle = 'rgba(255,255,255,.22)'; c.lineWidth = 1.2; for (let i = -sw + 5; i < sw; i += 7) { c.beginPath(); c.moveTo(i, top + 8); c.lineTo(i * 0.8, bot - 4); c.stroke(); } }
      } else if (spec.polo) { c.beginPath(); c.moveTo(-9, top + 2); c.lineTo(0, top + 16); c.lineTo(9, top + 2); c.lineWidth = 2; c.strokeStyle = shade(j, 1.8); c.stroke(); }
      else {                                              // jacket zip + collar
        c.beginPath(); c.moveTo(0, top + 2); c.lineTo(0, bot); c.lineWidth = 2; c.strokeStyle = shade(j, 0.5); c.stroke();
        c.beginPath(); c.moveTo(-9, top + 1); c.lineTo(-5, top + 14); c.lineTo(0, top + 5); c.lineTo(5, top + 14); c.lineTo(9, top + 1); c.lineWidth = 2; c.strokeStyle = shade(j, 1.9); c.stroke();
        if (spec.logo === 'nv') { rr(c, sw * 0.35, top + 18, 11, 9, 3); c.fillStyle = '#76b900'; c.fill(); c.lineWidth = 1.5; c.strokeStyle = INK; c.stroke(); }
        if (spec.logo === 'tesla') { c.fillStyle = '#d11f2a'; c.fillRect(sw * 0.3, top + 18, 11, 3); c.fillRect(sw * 0.3 + 4, top + 18, 3, 10); }
        if (spec.logo === 'trader') { rr(c, -sw * 0.8, top + 18, 20, 7, 2); c.fillStyle = '#e8e8e8'; c.fill(); }
      }
      if (spec.vest) {                                    // hi-vis vest + reflective bands
        c.beginPath(); c.moveTo(-sw + 3, top + 4); c.lineTo(-7, top + 2); c.lineTo(-5, bot); c.lineTo(-hw + 2, bot); c.closePath(); c.moveTo(sw - 3, top + 4); c.lineTo(7, top + 2); c.lineTo(5, bot); c.lineTo(hw - 2, bot); c.closePath(); fillStroke(c, '#f28a1b');
        c.fillStyle = '#e8e6c8'; c.fillRect(-hw + 3, top + 40, hw - 7, 5); c.fillRect(7, top + 40, hw - 7, 5);
      }
      if (spec.badge) { c.beginPath(); c.moveTo(-5, top + 2); c.lineTo(-2, top + 28); c.lineTo(5, top + 2); c.lineWidth = 1.6; c.strokeStyle = '#4a7fd1'; c.stroke(); rr(c, -6, top + 28, 12, 16, 2); c.fillStyle = '#f4f1ea'; c.fill(); c.lineWidth = 1.6; c.strokeStyle = INK; c.stroke(); }
    }
    c.restore();
  }

  // props, drawn with origin at the hand, +x toward facing
  const PROP = {
    paper(c) { c.save(); c.rotate(-0.1); rr(c, -2, -26, 28, 34, 2); fillStroke(c, '#f4f1ea'); c.strokeStyle = '#8a8f96'; c.lineWidth = 1.4; for (let i = 0; i < 4; i++) { c.beginPath(); c.moveTo(3, -19 + i * 7); c.lineTo(21, -19 + i * 7); c.stroke(); } c.restore(); },
    phone(c) { c.save(); c.rotate(-0.2); rr(c, -4, -18, 11, 20, 3); fillStroke(c, '#222'); c.fillStyle = '#7fd0ff'; c.fillRect(-2.5, -15, 8, 14); c.restore(); },
    laptop(c) { rr(c, -8, -10, 34, 20, 2); fillStroke(c, '#c9ced4'); rr(c, -6, -8, 30, 16, 1); c.fillStyle = '#10161c'; c.fill(); c.fillStyle = '#76b900'; c.fillRect(2, -4, 8, 2); },
    mic(c) { c.beginPath(); c.moveTo(0, 0); c.lineTo(5, -22); c.lineWidth = 5; c.strokeStyle = INK; c.stroke(); c.beginPath(); c.arc(6, -26, 7, 0, 7); fillStroke(c, '#222'); },
    camera(c) { rr(c, -4, -16, 28, 20, 3); fillStroke(c, '#2a2d33'); c.beginPath(); c.arc(16, -6, 7, 0, 7); fillStroke(c, '#66737f'); },
    case(c) { rr(c, -12, 4, 34, 24, 3); fillStroke(c, '#5a3d23'); c.strokeStyle = INK; c.lineWidth = 3; c.beginPath(); c.arc(5, 4, 7, Math.PI, 0); c.stroke(); },
    folder(c) { rr(c, -2, -24, 28, 32, 2); fillStroke(c, '#d9b45a'); c.fillStyle = '#c29c3d'; c.fillRect(-2, -24, 12, 5); },
    clipboard(c) { rr(c, -2, -28, 26, 36, 3); fillStroke(c, '#8a5a2b'); rr(c, 1, -24, 20, 29, 1); c.fillStyle = '#f4f1ea'; c.fill(); c.fillStyle = '#8a5a2b'; c.fillRect(7, -30, 8, 5); },
    gavel(c) { c.save(); c.rotate(-0.5); c.beginPath(); c.moveTo(0, 4); c.lineTo(0, -24); c.lineWidth = 4; c.strokeStyle = '#6b4a2b'; c.stroke(); rr(c, -9, -30, 18, 10, 2); fillStroke(c, '#8a5a2b'); c.restore(); },
    flag(c, o) { c.beginPath(); c.moveTo(0, 6); c.lineTo(0, -50); c.lineWidth = 3; c.strokeStyle = '#ddd'; c.stroke(); c.fillStyle = '#c42631'; c.fillRect(0, -50, 28, 18); c.fillStyle = '#fff'; c.fillRect(0, -44, 28, 4); c.fillStyle = '#1d3a7a'; c.fillRect(0, -50, 12, 9); c.strokeStyle = INK; c.lineWidth = 1.5; c.strokeRect(0, -50, 28, 18); },
    sign(c, o) { c.beginPath(); c.moveTo(4, 8); c.lineTo(4, -34); c.lineWidth = 3.5; c.strokeStyle = '#8a6a3a'; c.stroke(); rr(c, -20, -78, 56, 44, 3); fillStroke(c, '#f4f1ea'); c.fillStyle = '#c42631'; c.font = '800 13px Arial, sans-serif'; c.textAlign = 'center'; const t = (o.propText || 'RETURN').split(' '); t.slice(0, 3).forEach((w, i) => c.fillText(w, 8, -62 + i * 14)); },
    coffee(c) { rr(c, -5, -14, 14, 18, 3); fillStroke(c, '#f4f1ea'); c.fillStyle = '#8a5a2b'; c.fillRect(-5, -9, 14, 6); }
  };

  // hand-drawn key-pose sprites cut from the individual sheets (8 main characters): pose 'spr:point' etc.
  function drawSpr(c, role, x, y, sc, o, t) {
    if (!K.poses || !K.smeta) return false;
    const spec = specOf(role), d = K.smeta.poses[spec.head]; if (!d) return false;
    const name = o.pose.slice(4), r = d[name]; if (!r) return false;
    const minH = (HERO[role] ? K.heroMinPx : K.crowdMinPx) * (o.minScale || 1); if (sc * 258 < minH) sc = minH / 258;
    const ref = d._ref, k = 258 / ref * sc * (o.sprScale || 1), fx = o.facing < 0 ? -1 : 1, ph = o.phase || 0;
    const walk = name === 'walk', bob = walk ? Math.abs(Math.sin(t * 9 + ph)) * 5 : Math.sin(t * 2 + ph) * 1.2, tilt = walk ? Math.sin(t * 9 + ph) * 0.03 : 0;
    const talk = (o.talk || 0) > 0.5 || name === 'podium' || name === 'explain';
    const sy = 1 + Math.sin(t * 2.2 + ph) * 0.006 + (talk ? Math.abs(Math.sin(t * 7 + ph)) * 0.01 : 0);
    if (o.alpha !== undefined) c.globalAlpha = o.alpha;
    c.save(); c.translate(x, y);
    if (o.shadow !== 0) { c.fillStyle = 'rgba(0,0,0,.22)'; c.beginPath(); c.ellipse(0, 2, r[2] * k * 0.3, 8 * sc, 0, 0, 7); c.fill(); }
    c.translate(0, -bob * sc); c.rotate(tilt); c.scale(fx, 1);
    c.imageSmoothingEnabled = true; c.imageSmoothingQuality = 'high';
    c.drawImage(K.poses, r[0], r[1], r[2], r[3], -r[2] * k / 2, -r[3] * k * sy, r[2] * k, r[3] * k * sy);
    c.restore(); return true;
  }

  // ---- main draw ---------------------------------------------------------------------------------------------------
  function draw(c, role, x, y, sc, o, t) {
    o = o || {};
    const isS = n => typeof n === 'string' && n.indexOf('spr:') === 0 || role === 'student';
    if (o.from && o.blend !== undefined && o.blend < 1 && (isS(o.from) || isS(o.pose))) {          // sprite poses cannot bend: crossfade instead
      const u = Math.max(0, Math.min(1, o.blend)), al = o.alpha === undefined ? 1 : o.alpha;
      draw1(c, role, x, y, sc, Object.assign({}, o, { pose: o.from, from: undefined, blend: undefined, alpha: al * (1 - u) }), t);
      draw1(c, role, x, y, sc, Object.assign({}, o, { from: undefined, blend: undefined, alpha: al * u }), t); return;
    }
    draw1(c, role, x, y, sc, o, t);
  }
  // the old 'normal people' sprites: role 'student' = one casual person with 10 poses; RigKit.bust() draws the 8 head-and-shoulder variants
  const STU = { idle: 'stand', stand: 'stand', talk: 'explain', explain: 'explain', point: 'point', think: 'think', panic: 'worried', worried: 'worried', cheer: 'cheer', crowd: 'crowd', phone: 'phone', hold: 'phone', sit: 'laptop', laptop: 'laptop', shrug: 'react', react: 'react', walk: 'stand', wave: 'cheer', cross: 'stand', present: 'explain' };
  function drawStudent(c, x, y, sc, o, t) {
    const d = K.pubMeta; let nm = (o.pose || '').replace('spr:', '');
    if (!nm) nm = (o.walkAmt || 0) > 0.3 ? 'walk' : (o.armAngleR || 0) < -1.2 ? 'point' : (o.browTension || 0) > 0.7 ? 'worried' : (o.talk || 0) > 0.5 ? 'talk' : 'idle';
    const r = d['pub_' + (STU[nm] || 'stand')]; if (!r) return false;
    const ph = o.phase || 0, k = 258 * 0.9 / 171 * sc * K.sizeMul * (o.sprScale || 1), fx = o.facing < 0 ? -1 : 1, walk = nm === 'walk';
    const bob = walk ? Math.abs(Math.sin(t * 9 + ph)) * 5 : Math.sin(t * 2.1 + ph) * 1.2, minH = K.crowdMinPx * 0.9; let kk = k; if (r[3] * kk < minH) kk = minH / r[3];
    if (o.alpha !== undefined) c.globalAlpha = o.alpha;
    c.save(); c.translate(x, y); if (o.shadow !== 0) { c.fillStyle = 'rgba(0,0,0,.22)'; c.beginPath(); c.ellipse(0, 2, r[2] * kk * 0.35, 7 * sc, 0, 0, 7); c.fill(); }
    c.translate(0, -bob * sc); c.rotate(walk ? Math.sin(t * 9 + ph) * 0.03 : 0); c.scale(fx, 1); c.imageSmoothingQuality = 'high';
    c.drawImage(K.pub, r[0], r[1], r[2], r[3], -r[2] * kk / 2, -r[3] * kk, r[2] * kk, r[3] * kk); c.restore(); return true;
  }
  function draw1(c, role, x, y, sc, o, t) {
    o = o || {}; t = t || 0;
    if (role === 'student' && K.pub && K.pubMeta && drawStudent(c, x, y, sc, o, t)) return;
    const spec = specOf(role), fx = o.facing === -1 || o.facing < 0 ? -1 : 1, ph = o.phase || 0;
    const walking = ((o.walkAmt || 0) > 0.3) || o.pose === 'walk' || o.pose === 'run';
    const view = o.view || (walking ? 'side' : 'front');
    const oo = Object.assign({}, o, { _side: view === 'side' });
    const P = getPose(oo, t, ph);
    const sw0 = view === 'side' ? 6 : view === 'q' ? 17 : 24, hw0 = view === 'side' ? 7 : view === 'q' ? 15 : 20;
    const bulk = (spec.big || 1) * (spec.slim ? 0.9 : 1);
    const sw = sw0 * bulk, hw = hw0 * bulk;
    if (o.pose && o.pose.indexOf('spr:') === 0 && drawSpr(c, role, x, y, sc * K.sizeMul, o, t)) return;
    if (o.pose && o.pose.indexOf('spr:') === 0) { o = Object.assign({}, o, { pose: o.pose.slice(4) in POSE ? o.pose.slice(4) : 'idle' }); }
    sc *= K.sizeMul; const minH = (HERO[role] ? K.heroMinPx : K.crowdMinPx) * (o.minScale || 1); if (sc * 258 < minH) sc = minH / 258;   // mobile readability floor
    c.save(); c.translate(x, y); c.scale(sc, sc);
    if (o.alpha !== undefined) c.globalAlpha = o.alpha;
    if (o.shadow !== 0) { c.fillStyle = 'rgba(0,0,0,.22)'; c.beginPath(); c.ellipse(0, 2, 38 - P.bob * 0.3, 8, 0, 0, 7); c.fill(); }
    const sit = P.sit ? 1 : 0, dy = (sit ? 44 : 0) + P.bob;
    c.translate(0, dy * -1 * 0 + (sit ? 0 : 0));
    // joints
    const hipY = HIPY + dy * (sit ? 1 : 0) + (sit ? 0 : P.bob * -1 * 0);
    const bodyY = sit ? 46 : 0, bob = -Math.abs(P.bob) * (sit ? 0.3 : 1) * 0 + (sit ? 0 : P.bob);
    const lsx = view === 'side' ? 3 : view === 'q' ? 9 : 12;       // hip half-spread
    const hipR = [fx * lsx * (view === 'side' ? 0.6 : 1), HIPY + bodyY + bob], hipL = [-fx * lsx * (view === 'side' ? 0.6 : 1), HIPY + bodyY + bob];
    function leg(h, ang, kn, col) {
      const kx = h[0] + Math.sin(ang) * TH * fx, ky = h[1] + Math.cos(ang) * TH;
      const sa = ang - kn, fx2 = kx + Math.sin(sa) * SH * fx, fy = Math.min(ky + Math.cos(sa) * SH, sit ? 0 : 0 + 0);
      limb(c, [[h[0], h[1]], [kx, ky], [fx2, fy]], 15, col);
      c.beginPath(); c.ellipse(fx2 + fx * 7, fy - 2, 14, 7, 0, 0, 7); fillStroke(c, '#1b1d21');
    }
    const pc = spec.p;
    const farLegFirst = true;
    if (farLegFirst) { leg(hipL, P.tL, P.kL, shade(pc, 0.85)); leg(hipR, P.tR, P.kR, pc); }
    // torso + head anchor follow bob / sit
    c.save(); c.translate(0, bodyY + bob);
    const far = (fxS, a, e, col) => { };
    const shoulderY = SHY, shR = [fx * sw * 0.92, shoulderY], shL = [-fx * sw * 0.92, shoulderY];
    const armCol = o.jacket || spec.j, sleeve = spec.polo || spec.vest ? SKIN : armCol;
    function arm(sh, a, e, col, isR) {
      const ex = sh[0] + Math.sin(a) * UA * fx, ey = sh[1] + Math.cos(a) * UA;
      const fa = a + e * (a >= 0 ? 1 : 1);
      const hx = ex + Math.sin(fa) * FA * fx, hy = ey + Math.cos(fa) * FA;
      const bare = spec.polo || spec.vest;
      limb(c, [[sh[0], sh[1]], [ex, ey]], 13, bare ? (spec.j) : col);
      limb(c, [[ex, ey], [hx, hy]], 11.5, bare ? SKIN : col);
      hand(c, hx, hy);
      return [hx, hy, fa];
    }
    // far arm behind torso
    const hl = arm(shL, P.aL, P.eL, shade(armCol, 0.85), false);
    torso(c, spec, view, sw, hw, P.lean, o.jacket);
    // head + neck
    c.save(); c.translate(0, 0); c.beginPath(); c.rect(-5, CHIN - 4, 10, 18); c.fillStyle = SKIN; c.fill(); c.lineWidth = 2; c.strokeStyle = INK; c.stroke(); c.restore();
    let expr = o.expr;
    if (expr === undefined) expr = (o.browTension || 0) > 0.7 ? 'concerned' : ((o.talk || 0) > 0.5 || P === null ? 'talk' : (o.pose === 'talk' ? 'talk' : o.pose === 'think' ? 'think' : o.pose === 'cheer' ? 'happy' : o.pose === 'panic' ? 'shock' : 'neutral'));
    const sy = Math.sin(t * 1.3 + ph * 2.1) + Math.sin(t * 0.53 + ph), talkOff = !(sy > -0.4 && Math.sin(t * (22 + (ph % 1.3) * 9)) > -0.2);   // bursts and breath pauses, different per character
    drawHead(c, spec, P.lean * -20, CHIN + 2, view, fx, expr, talkOff, P.tilt + P.lean, o);
    // near arm in front
    const hr = arm(shR, P.aR, P.eR, armCol, true);
    c.restore();
    // prop in the near (or chosen) hand
    if (o.prop && PROP[o.prop]) {
      const h = P.hand === 'L' || o.hand === 'L' ? hl : hr;
      c.save(); c.translate(h[0], h[1] + bodyY + bob); if (fx < 0) c.scale(-1, 1); PROP[o.prop](c, o); c.restore();
    }
    c.restore();
  }

  // ---- public ------------------------------------------------------------------------------------------------------
  const API = {
    K, draw, POSE, OUT, ORDER, EX, EXI, specOf, props: Object.keys(PROP), poses: Object.keys(POSE), roles: Object.keys(OUT).concat(Object.keys(ALIAS)),
    init(img, meta) { K.img = img; K.meta = meta; K.cell = meta && meta.cell || 96; K.ready = true; },
    load(src, meta, cb) { const im = new Image(); im.onload = () => { API.init(im, meta); cb && cb(); }; im.src = src; },
    loadExtra(exprSrc, posesSrc, smeta, cb) {            // high-detail expressions + key-pose sprites (individual sheets)
      let n = 2; const done = () => { if (--n === 0) cb && cb(); };
      K.smeta = smeta; const a = new Image(); a.onload = () => { K.expr10 = a; done(); }; a.src = exprSrc;
      const b = new Image(); b.onload = () => { K.poses = b; done(); }; b.src = posesSrc;
    },
    sprPoses(role) { const d = K.smeta && K.smeta.poses[specOf(role).head]; return d ? Object.keys(d).filter(k => k[0] !== '_') : []; },
    track(t, keys, dur) { dur = dur || 0.4; let i = 0; while (i < keys.length - 1 && t >= keys[i + 1][0]) i++; const cur = keys[i][1]; if (i === 0) return { pose: cur }; const u = (t - keys[i][0]) / dur; return u >= 1 ? { pose: cur } : { pose: cur, from: keys[i - 1][1], blend: u }; },
    loadPub(src, meta, cb) { const im = new Image(); im.onload = () => { K.pub = im; K.pubMeta = meta; cb && cb(); }; im.src = src; },
    bust(g, name, x, y, w, h) { const r = K.pubMeta && K.pubMeta['var_' + name]; if (!r || !K.pub) return; const k = Math.min(w / r[2], h / r[3]); g.drawImage(K.pub, r[0], r[1], r[2], r[3], x + (w - r[2] * k) / 2, y + h - r[3] * k, r[2] * k, r[3] * k); },
    busts: ['man', 'woman', 'office', 'senior', 'srwoman', 'student', 'midwoman', 'young'],
    crowdRole(i) { const r = ['employee', 'engineer', 'employee', 'trader', 'journalist', 'supply', 'factory', 'banker']; return r[i % r.length]; }
  };
  G.RigKit = API;
})(typeof window !== 'undefined' ? window : globalThis);
