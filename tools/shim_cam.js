  // ---- station mapping: canvas scenes lay stations along x; here each station is moved into its own depth slot (z) so the camera flies forward
  const STN = __STN__;            // [{ b: upper x bound, c: station centre x }]
  const ZSTEP = 30, DMIN = __DMIN__, DMAX = __DMAX__, YAWMAX = 0.32, PMIN = 0.12, PMAX = 0.30;
  function stIdx(x) { for (let i = 0; i < STN.length; i++) if (x < STN[i].b) return i; return STN.length - 1; }
  function mp(x, y, z) { if (!STN.length) return [x, y, z]; const k = stIdx(x); return [x - STN[k].c, y, z - ZSTEP * k]; }
  const CAM_KEYS = [];
  const K = (t, p, l, fov, cut) => CAM_KEYS.push({ t, v: [p[0], p[1], p[2], l[0], l[1], l[2], fov], cut: !!cut });
__KEYS__
  // ---- framing guard: every key keeps its focus point but gets a safe distance, a capped sideways angle and a gentle downward pitch
  (function mapKeys() {
    CAM_KEYS.forEach(k => {
      const v = k.v, F = mp(v[3], v[4], v[5]);
      const ox = v[0] - v[3], oy = v[1] - v[4], oz = v[2] - v[5];
      let Dh = Math.hypot(ox, oz) || 1, yaw = Math.atan2(ox, oz);
      if (Math.abs(yaw) > YAWMAX) yaw = Math.sign(yaw) * YAWMAX;
      const pitch = Math.max(PMIN, Math.min(PMAX, Math.atan2(oy, Dh)));
      Dh = Math.max(DMIN, Math.min(DMAX, Dh));
      k.v = [F[0] + Dh * Math.sin(yaw), F[1] + Dh * Math.tan(pitch), F[2] + Dh * Math.cos(yaw), F[0], F[1], F[2], Math.max(38, Math.min(52, v[6]))];
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
  function evalCam(t) {
    const Ks = CAM_KEYS;
    if (t <= Ks[0].t) return Ks[0].v;
    if (t >= Ks[Ks.length - 1].t) return Ks[Ks.length - 1].v;
    let i = 0;
    while (i < Ks.length - 2 && t > Ks[i + 1].t) i++;
    const a = Ks[i], b = Ks[i + 1];
    if (b.cut) return a.v;
    const dt = b.t - a.t, u = (t - a.t) / dt, u2 = u * u, u3 = u2 * u;
    return a.v.map((_, c) => (2 * u3 - 3 * u2 + 1) * a.v[c] + (u3 - 2 * u2 + u) * dt * a.m[c] + (-2 * u3 + 3 * u2) * b.v[c] + (u3 - u2) * dt * b.m[c]);
  }

