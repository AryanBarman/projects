  // ---- station mapping with a WINDING layout: each station sits at its own (x,z) spot on a path that turns, so the camera travels
  //      forward, sideways and back, not only into depth. LAYOUT[k] = [ox, oz] offset of station k (station-local x is re-centred on c).
  const STN = __STN__;            // [{ b: upper x bound, c: station centre x }]
  const LAYOUT = __LAYOUT__;      // [[ox, oz], ...] one per station
  const DMIN = __DMIN__, DMAX = __DMAX__, YAWMAX = 1.05, PMIN = 0.04, PMAX = 0.58;
  function stIdx(x) { for (let i = 0; i < STN.length; i++) if (x < STN[i].b) return i; return STN.length - 1; }
  function mp(x, y, z) { if (!STN.length) return [x, y, z]; const k = stIdx(x), L = LAYOUT[k] || [0, -30 * k]; return [x - STN[k].c + L[0], y, z + L[1]]; }
  const FACES = __FACES__;   // [[t0, t1, [x, y, z] head point in scene coords, side(+1/-1)], ...] face close-ups
  const CAM_KEYS = [];
  // K(t, pos, look, fov [, true=cut | 'fly'|'hold'|'push'|'pull']). Shot grammar (see docs/CAMERA_GRAMMAR.md):
  //   fly  = fast reposition (~1.1 s) to a NEW place / idea, new angle;  hold = same framing, almost still;  push = slow zoom IN on one point (same angle);
  //   pull = slow zoom OUT to reveal context / scale / consequence (same angle);  arc = slow orbit around the subject (same distance), for long holds;  no flag = legacy blended move.
  const K = (t, p, l, fov, x) => CAM_KEYS.push({ t, v: [p[0], p[1], p[2], l[0], l[1], l[2], fov], cut: x === true, type: typeof x === 'string' ? x : 'auto' });
__KEYS__
  // ---- framing guard + SHOT VARIETY: every key keeps its focus, but its angle / height / distance cycle through different setups
  //      (left 3/4, right 3/4, low hero angle, high crane, push-in, pull-out) so consecutive shots never look alike.
  const ORB_YAW = [-0.55, 0.5, -0.28, 0.62, -0.42, 0.34, -0.6, 0.22];
  const ORB_PIT = [0.12, 0.3, 0.07, 0.46, 0.16, 0.36, 0.1, 0.26];
  const ORB_DST = [0.35, 0.9, 0.15, 0.75, 0.55, 0.05, 0.85, 0.45];
  (function mapKeys() {
    let prev = null, fly = 0, arcN = 0;
    CAM_KEYS.forEach((k, i) => {
      const v = k.v, F = mp(v[3], v[4], v[5]), ty = k.type; F[1] -= 0.5;   // aim a little lower so characters sit above the caption box
      let yaw, pitch, Dh, fov;
      if ((ty === 'hold' || ty === 'push' || ty === 'pull' || ty === 'arc') && prev) {      // same angle as the previous shot; only distance / fov change
        yaw = ty === 'arc' ? Math.max(-YAWMAX, Math.min(YAWMAX, prev.yaw + (arcN++ % 2 ? -0.34 : 0.34))) : prev.yaw; pitch = ty === 'arc' ? Math.min(PMAX, prev.pitch + 0.05) : prev.pitch;
        Dh = (ty === 'hold' || ty === 'arc') ? prev.Dh : ty === 'push' ? Math.max(DMIN * 0.55, prev.Dh * 0.6) : Math.min(DMAX * 1.35, prev.Dh * 1.7);
        fov = (ty === 'hold' || ty === 'arc') ? prev.fov : ty === 'push' ? prev.fov - 9 : prev.fov + 6;
      } else {
        const j = (ty === 'auto' ? i : fly++) % ORB_YAW.length, ox = v[0] - v[3], oz = v[2] - v[5];
        yaw = Math.max(-YAWMAX, Math.min(YAWMAX, Math.atan2(ox, oz) * 0.35 + ORB_YAW[j])); pitch = Math.max(PMIN, Math.min(PMAX, ORB_PIT[j])); Dh = (DMIN + (DMAX - DMIN) * ORB_DST[j]) * 0.86;
        fov = v[6] + (j % 2 ? -3 : 2);
      }
      fov = Math.max(30, Math.min(58, fov)); prev = { yaw, pitch, Dh, fov };
      k.v = [F[0] + Dh * Math.sin(yaw), F[1] + Dh * Math.tan(pitch), F[2] + Dh * Math.cos(yaw), F[0], F[1], F[2], fov];
    });
  })();
  (function buildTangents() {
    const n = CAM_KEYS.length;
    CAM_KEYS.forEach((k, i) => {
      const nx = CAM_KEYS[i + 1];
      if (k.cut || (nx && nx.cut)) { k.m = k.v.map(() => 0); return; }
      const p = CAM_KEYS[Math.max(0, i - 1)], q = CAM_KEYS[Math.min(n - 1, i + 1)];
      k.m = k.v.map((_, c) => (q.v[c] - p.v[c]) / Math.max(1e-4, q.t - p.t));
    });
  })();
  function evalCam0(t) {
    const Ks = CAM_KEYS;
    if (t <= Ks[0].t) return Ks[0].v;
    if (t >= Ks[Ks.length - 1].t) return Ks[Ks.length - 1].v;
    let i = 0;
    while (i < Ks.length - 2 && t > Ks[i + 1].t) i++;
    const a = Ks[i], b = Ks[i + 1];
    if (b.cut) return a.v;
    const dt = b.t - a.t, u = (t - a.t) / dt, u2 = u * u, u3 = u2 * u;
    if (b.type !== 'auto') {                      // grammar segments: flies are quick then settle; push / pull are slow smootherstep
      const k = b.type === 'fly' ? Math.min(1, (t - a.t) / Math.min(1.5, dt * 0.7)) : u, e = k * k * k * (k * (k * 6 - 15) + 10), r = a.v.map((x, c) => x + (b.v[c] - x) * e);
      if (b.type === 'fly') { const dx = b.v[0] - a.v[0], dz = b.v[2] - a.v[2], L = Math.hypot(dx, dz) || 1, sg = (Math.round(b.t * 10) % 2) ? 1 : -1, bu = Math.sin(Math.PI * e) * Math.min(6, L * 0.15) * sg; r[0] += (-dz / L) * bu; r[2] += (dx / L) * bu; r[1] += Math.sin(Math.PI * e) * 2.6; r[6] += Math.sin(Math.PI * e) * 5; }
      return r;
    }
    return a.v.map((_, c) => (2 * u3 - 3 * u2 + 1) * a.v[c] + (u3 - 2 * u2 + u) * dt * a.m[c] + (-2 * u3 + 3 * u2) * b.v[c] + (u3 - u2) * dt * b.m[c]);
  }
  window.__camKeys = () => CAM_KEYS;
  // living-camera layer: a slow orbit around the focus plus a gentle crane, so no hold is ever a locked-off shot
  const AMP = { auto: 1, fly: 0.45, hold: 0.9, arc: 0.4, push: 0.35, pull: 0.35 };
  function evalCam(t) {
    const Ks = CAM_KEYS; let i = 0; while (i < Ks.length - 2 && t > Ks[i + 1].t) i++;
    const cur = Ks[Math.min(i + 1, Ks.length - 1)].type, pv = i > 0 ? Ks[i].type : cur, w = Math.max(0, Math.min(1, (t - Ks[i].t) / 0.6)), sw = w * w * (3 - 2 * w), amp = AMP[pv] + (AMP[cur] - AMP[pv]) * sw;
    const v = evalCam0(t).slice(), fx = v[3], fy = v[4], fz = v[5], dx = v[0] - fx, dz = v[2] - fz, a = amp * (0.16 * Math.sin(t * 0.37) + 0.06 * Math.sin(t * 0.91 + 1.3)), c = Math.cos(a), s = Math.sin(a);
    v[0] = fx + dx * c - dz * s; v[2] = fz + dx * s + dz * c; v[1] += amp * 0.55 * Math.sin(t * 0.52 + 0.8); v[6] += amp * 1.2 * Math.sin(t * 0.43);
    { const dl = Math.hypot(v[0] - fx, v[2] - fz) || 1, rx = (v[2] - fz) / dl, rz = -(v[0] - fx) / dl, sh = (0.2 + 0.6 * amp) * 1.1 * Math.sin(t * 0.45 + 0.4); v[0] += rx * sh; v[2] += rz * sh; }   // lateral dolly
    let wFace = 0;
    for (const f of FACES) {
      const w0 = (t - f[0]) / 0.7, w1 = (f[1] - t) / 0.7; if (w0 <= 0 || w1 <= 0) continue; const sm = q => { q = Math.max(0, Math.min(1, q)); return q * q * (3 - 2 * q); }, w = sm(w0) * sm(w1); wFace = Math.max(wFace, w); const P = mp(f[2][0], f[2][1], f[2][2]), side = f[3] || 1, yaw = 0.4 * side, D = 10.0 - 2.2 * ((t - f[0]) / (f[1] - f[0])), fc = [P[0] + D * Math.sin(yaw), P[1] + 0.35, P[2] + D * Math.cos(yaw), P[0], P[1] - 0.15, P[2], 33];
      for (let q = 0; q < 7; q++) v[q] = v[q] + (fc[q] - v[q]) * w;
    }
    window.__faceW = wFace;
    if (window.__ADJ && !window.__NOADJ) { const A = window.__ADJ, x = Math.max(0, Math.min(A.length - 1.001, t / 0.25)), i0 = Math.floor(x), fa = A[i0] + (A[i0 + 1] - A[i0]) * (x - i0), k = 1 + (fa - 1) * (1 - wFace); v[0] = v[3] + (v[0] - v[3]) * k; v[1] = v[4] + (v[1] - v[4]) * k; v[2] = v[5] + (v[2] - v[5]) * k; }
    return v;
  }
  window.__evalCam = evalCam;
