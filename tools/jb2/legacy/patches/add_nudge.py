"""Automatic label layout: every Label / Panel (cards, counters, avatars) is nudged in screen space so it stays clear of the headline block and the caption box,
inside the frame, and off other labels. The shift is a continuous function of the overlap, so labels glide instead of popping. Disable with window.__NONUDGE = true."""
import pathlib
H = pathlib.Path(__file__).resolve().parent
p = H / 'shim_env_jb.js'; s = p.read_text(encoding='utf8')
if 'function nudge(' in s:
    print('already'); raise SystemExit
code = r"""  // ---- automatic label layout (see tools/jb/add_nudge.py)
  const _NR = [], NZ_HEAD = { x0: 0, x1: 670, y0: 0, y1: 205 }, NZ_CAP = { x0: 330, x1: 1590, y0: 875, y1: 1045 }, _nr1 = new THREE.Vector3(), _nu1 = new THREE.Vector3();
  function nudge(m) {
    if (window.__NONUDGE) return; camera.updateMatrixWorld(); _nr1.setFromMatrixColumn(camera.matrixWorld, 0); _nu1.setFromMatrixColumn(camera.matrixWorld, 1);
    const hw = m.scale.x / 2, hh = m.scale.y / 2, c = m.position, xs = [], ys = []; let behind = false;
    [[-1, -1], [1, -1], [1, 1], [-1, 1]].forEach(q => { const r = fitProj(c.x + _nr1.x * hw * q[0] + _nu1.x * hh * q[1], c.y + _nr1.y * hw * q[0] + _nu1.y * hh * q[1], c.z + _nr1.z * hw * q[0] + _nu1.z * hh * q[1]); if (r[2] > 1) behind = true; xs.push(r[0]); ys.push(r[1]); });
    if (behind) return; let x0 = Math.min(...xs), x1 = Math.max(...xs), y0 = Math.min(...ys), y1 = Math.max(...ys); const w = x1 - x0, h = y1 - y0; if (w > 1800 || h > 1000) return;
    if (x1 < -200 || x0 > 2120 || y1 < -200 || y0 > 1280) return;                         // far off screen: not on screen, leave alone
    let dx = 0, dy = 0; const ov = (a, b) => [Math.min(a.x1, b.x1) - Math.max(a.x0, b.x0), Math.min(a.y1, b.y1) - Math.max(a.y0, b.y0)];
    let R = { x0, x1, y0, y1 }, [ox, oy] = ov(R, NZ_HEAD);                                // headline block: move down or right, whichever is shorter
    if (ox > 0 && oy > 0) { const dn = oy + 8, rt = ox + 8; if (dn <= rt * 1.3) dy += dn; else dx += rt; }
    R = { x0: x0 + dx, x1: x1 + dx, y0: y0 + dy, y1: y1 + dy }; [ox, oy] = ov(R, NZ_CAP);   // caption box: move up
    if (ox > 0 && oy > 0) dy -= (R.y1 - NZ_CAP.y0) + 8;
    R = { x0: x0 + dx, x1: x1 + dx, y0: y0 + dy, y1: y1 + dy };                           // keep inside the frame
    if (R.x0 < 30) dx += 30 - R.x0; if (R.x1 > 1890) dx -= R.x1 - 1890; if (R.y0 < 24) dy += 24 - R.y0; if (R.y1 > 1056) dy -= R.y1 - 1056;
    R = { x0: x0 + dx, x1: x1 + dx, y0: y0 + dy, y1: y1 + dy };
    _NR.forEach(o => { [ox, oy] = ov(R, o); if (ox > 6 && oy > 6) { const small = Math.min(w * h, (o.x1 - o.x0) * (o.y1 - o.y0)); if (ox * oy / small > 0.22) { const up = (R.y0 + R.y1) / 2 < (o.y0 + o.y1) / 2; const sh = (up ? -1 : 1) * (oy + 6); dy += sh; R = { x0: x0 + dx, x1: x1 + dx, y0: y0 + dy, y1: y1 + dy }; } } });
    dx = Math.max(-320, Math.min(320, dx)); dy = Math.max(-320, Math.min(320, dy));
    if (dx || dy) { const dist = camera.position.distanceTo(m.position), ppu = 540 / (dist * Math.tan(camera.fov * Math.PI / 360)); m.position.addScaledVector(_nr1, dx / ppu); m.position.addScaledVector(_nu1, -dy / ppu); }
    _NR.push({ x0: x0 + dx, x1: x1 + dx, y0: y0 + dy, y1: y1 + dy });
  }
"""
a = "  function Label(text, x, y, z, w, h, bg, fg, o) {"
assert a in s
# fitProj must exist before nudge: it is defined with the fit hook just above Label; insert nudge right before Label (after fitRec)
s = s.replace(a, code + a, 1)
b = "billboard(e.m, o.rot); fitRec(text, 'label', e.m);"
assert b in s; s = s.replace(b, "billboard(e.m, o.rot); nudge(e.m); fitRec(text, 'label', e.m);", 1)
c = "billboard(e.m, o.rot); fitRec(window.__fitName || 'panel', 'panel', e.m);"
assert c in s; s = s.replace(c, "billboard(e.m, o.rot); nudge(e.m); fitRec(window.__fitName || 'panel', 'panel', e.m);", 1)
d = "    window.__FIT = [];\n"
assert d in s; s = s.replace(d, d + "    _NR.length = 0;\n", 1)
p.write_text(s, encoding='utf8'); print('nudge added')
