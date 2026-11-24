import sys, re, json
# usage: python postfx.py <file.html> <rails-json>   -> adds depth/arc/crane camera motion layer + brighter palette (idempotent)
f = sys.argv[1]; rails = json.loads(sys.argv[2])
s = open(f, encoding='utf8', newline='').read()
if 'evalCamBase' in s: print('already', f); sys.exit(0)
a = "  function evalCam(t) {"
assert s.count(a) == 1, f
s = s.replace(a, "  function evalCamBase(t) {")
# boundaries: split beats longer than 11s
B = [rails[0]]
for x0, x1 in zip(rails, rails[1:]):
    n = max(1, -(-int((x1 - x0) * 100) // 1100))
    for k in range(1, n + 1): B.append(x0 + (x1 - x0) * k / n)
W = """  const MOT = %s;
  function evalCam(t) {
    const v = evalCamBase(t).slice();
    let i = 0; while (i < MOT.length - 2 && t >= MOT[i + 1]) i++;
    const u0 = clamp((t - MOT[i]) / Math.max(0.01, MOT[i + 1] - MOT[i]), 0, 1), u = u0 * u0 * (3 - 2 * u0), sg = (i %% 2) ? -1 : 1, w = sg * (1 - 2 * u);
    let dx = v[0] - v[3], dy = v[1] - v[4], dz = v[2] - v[5];
    const d = Math.hypot(dx, dy, dz) || 1; let sc = 1 + 0.2 * w; sc = Math.max(sc, Math.min(1, 9.5 / d));
    const ang = 0.3 * w, c = Math.cos(ang), sn = Math.sin(ang), nx = dx * c + dz * sn, nz = -dx * sn + dz * c;
    v[0] = v[3] + nx * sc; v[2] = v[5] + nz * sc; v[1] = Math.max(1.8, v[4] + dy * sc + w * 1.8);
    return v;
  }
""" % json.dumps([round(x, 3) for x in B])
b = "  // ---- camera-space helpers"
assert s.count(b) == 1
s = s.replace(b, W + b)
# brighter palette
for old, new in [("sky.addColorStop(0, shade('#0C1C26', d)); sky.addColorStop(1, shade('#2A5468', d));", "sky.addColorStop(0, shade('#1E4A60', d)); sky.addColorStop(1, shade('#5C9DB4', d));"),
                 ("flr.addColorStop(0, shade('#1C3C4A', d)); flr.addColorStop(1, shade('#0B1A22', d));", "flr.addColorStop(0, shade('#3A7186', d)); flr.addColorStop(1, shade('#1F4555', d));"),
                 ("if (fill) { ctx.fillStyle = fill; ctx.fill(); } if (stroke) { ctx.strokeStyle = stroke; ctx.lineWidth = lw || 2;", "if (fill) { ctx.fillStyle = (typeof fill === 'string' && fill[0] === '#') ? shade(fill, 1.5, 0.08) : fill; ctx.fill(); } if (stroke) { ctx.strokeStyle = stroke; ctx.lineWidth = lw || 2;")]:
    assert s.count(old) == 1, old[:50]; s = s.replace(old, new)
open(f, 'w', encoding='utf8', newline='\n').write(s); print('ok', f)
