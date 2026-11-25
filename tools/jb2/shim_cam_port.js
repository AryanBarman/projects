  // ---- PORTRAIT camera v2 (shorts, 9:16). Literal keys, interpolated in ORBIT space (look point, distance, yaw, pitch, fov, roll), so an orbit really orbits.
  //      K(t, look[x,y,z], dist, yaw, pitch, fov, type, leaveAt, opt)   the camera ARRIVES at this shot at time t.
  //      type: 'ease'  glide from the previous shot across the whole segment (push / pull / crane / orbit: change dist, look.y or yaw)
  //            'fly'   leave at leaveAt (default t-0.9), arrive at t, ease in-out (the previous idea is held until its line ended)
  //            'whip'  like fly but violent: leave at leaveAt, arrive at t (0.4-0.6 s), strong ease, so the motion blur shows (a swish transition)
  //            'cut'   jump at t
  //      opt = { curve: 'io' (default) | 'in' | 'out' | 'snap', roll: radians (dutch angle) }
  //      PUNCH (cfg "punch": [[t, fovKick deg, dollyKick 0..1, shake units], ...]): an instant zoom-in kick that decays in ~0.35 s plus a small shake: lands on stamps/impacts.
  //      See docs/MOTION_PLAYBOOK.md for when to use each move (one movement per beat, a move every 2-4 s).
  const STN = __STN__;
  const LAYOUT = __LAYOUT__;
  const DMIN = __DMIN__, DMAX = __DMAX__, FACES = [];
  const PUNCH = __PUNCH__;
  window.__GUARD = __GUARD__; window.__ADJREADY = !window.__GUARD;   // the automatic framing guard (zooms out to keep labels in frame) fights authored close-ups, so it is off unless cfg guard:true
  function stIdx(x) { for (let i = 0; i < STN.length; i++) if (x < STN[i].b) return i; return STN.length - 1; }
  function mp(x, y, z) { if (!STN.length) return [x, y, z]; const k = stIdx(x), L = LAYOUT[k] || [0, -30 * k]; return [x - STN[k].c + L[0], y, z + L[1]]; }
  const CAM_KEYS = [];
  const K = (t, L, d, yaw, pit, fov, type, leave, opt) => { const F = mp(L[0], L[1], L[2]); opt = opt || {}; CAM_KEYS.push({ t, type: type || 'ease', leave, curve: opt.curve || 'io', roll: opt.roll || 0, p: [F[0], F[1], F[2], d, yaw, pit, fov, opt.roll || 0] }); };
__KEYS__
  const cl01 = u => Math.max(0, Math.min(1, u));
  const CURVE = { io: u => u * u * u * (u * (u * 6 - 15) + 10), in: u => u * u * u, out: u => 1 - Math.pow(1 - u, 3), snap: u => { u = cl01(u); return u < 0.5 ? 8 * u * u * u * u : 1 - Math.pow(-2 * u + 2, 4) / 2; } };
  let _roll = 0, _whip = 0;
  function camParams(t) {                         // returns [lx, ly, lz, dist, yaw, pitch, fov, roll] at time t (before punches / drift)
    const Ks = CAM_KEYS; _whip = 0; if (t <= Ks[0].t) return Ks[0].p.slice(); if (t >= Ks[Ks.length - 1].t) return Ks[Ks.length - 1].p.slice();
    let i = 0; while (i < Ks.length - 2 && t > Ks[i + 1].t) i++;
    const a = Ks[i], b = Ks[i + 1], dt = b.t - a.t; let u, cv = CURVE[b.curve] || CURVE.io;
    if (b.type === 'cut') u = 0;
    else if (b.type === 'fly' || b.type === 'whip') { const s0 = b.leave !== undefined ? b.leave : b.t - (b.type === 'whip' ? 0.5 : 0.9); u = (t - s0) / Math.max(0.15, b.t - s0); if (b.type === 'whip') { cv = CURVE.snap; _whip = u > 0 && u < 1 ? 1 : 0; } }
    else u = (t - a.t) / dt;
    const e = cv(cl01(u)); return a.p.map((x, c) => x + (b.p[c] - x) * e);
  }
  window.__camKeys = () => CAM_KEYS;
  window.__camRoll = t => _roll;
  function evalCam(t) {
    const q = camParams(t), whip = _whip;
    // living drift: a slow sway around the look point + breathing distance, so no hold is ever locked off (amplitude is small on purpose)
    q[4] += 0.03 * Math.sin(t * 0.55) + 0.012 * Math.sin(t * 1.3 + 1); q[3] *= 1 + 0.012 * Math.sin(t * 0.4 + 0.5); q[1] += 0.07 * Math.sin(t * 0.7 + 0.8);
    let fk = 0, dk = 0, sh = 0; PUNCH.forEach(p => { const u = t - p[0]; if (u >= 0 && u < 1.2) { const e = Math.exp(-u * 9); fk += (p[1] || 0) * e; dk += (p[2] || 0) * e; sh += (p[3] || 0) * Math.exp(-u * 11); } });
    q[6] -= fk; q[3] *= 1 - dk; _roll = q[7];
    const cp = Math.cos(q[5]), v = [q[0] + q[3] * Math.sin(q[4]) * cp, q[1] + q[3] * Math.sin(q[5]), q[2] + q[3] * Math.cos(q[4]) * cp, q[0], q[1], q[2], q[6]];
    if (sh) { v[0] += Math.sin(t * 91) * sh; v[1] += Math.cos(t * 77) * sh * 0.8; }
    window.__faceW = 0; window.__camWhip = whip;
    if (window.__ADJ && window.__GUARD) { const A = window.__ADJ, x = Math.max(0, Math.min(A.length - 1.001, t / 0.25)), i0 = Math.floor(x), fa = A[i0] + (A[i0 + 1] - A[i0]) * (x - i0); v[0] = v[3] + (v[0] - v[3]) * fa; v[1] = v[4] + (v[1] - v[4]) * fa; v[2] = v[5] + (v[2] - v[5]) * fa; }
    return v;
  }
  window.__evalCam = evalCam;
