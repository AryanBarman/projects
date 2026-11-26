"""One-off patch of rigkit.js: spring-overshoot pose blends, pose tracks (pure function of t), sprite<->rig crossfade, per-character
frequency jitter, irregular talk cadence, rim highlight on limbs."""
import pathlib
p = pathlib.Path(__file__).parent / 'rigkit.js'; s = p.read_text(encoding='utf8')
def R(a, b):
    global s
    assert a in s, a[:70]
    s = s.replace(a, b, 1)

# 1. spring blend + frequency jitter
R("      const Q = (POSE[o.from] || POSE.idle)(t, ph, o), u = sm(o.blend);", "      const Q = (POSE[o.from] || POSE.idle)(tt, ph, o), u = Math.min(1.3, backOut(o.blend));")
R("    const P = (POSE[name] || POSE.idle)(t, ph, o);", "    const tt = t * (1 + ((ph * 0.37) % 0.17)), P = (POSE[name] || POSE.idle)(tt, ph, o);   // each character gets its own tempo")
R("  const PKEYS =", "  const backOut = (u, s) => { s = s || 1.25; u = Math.max(0, Math.min(1, u)); return 1 + (s + 1) * Math.pow(u - 1, 3) + s * Math.pow(u - 1, 2); };\n  const PKEYS =")

# 2. irregular talk cadence instead of a 3 Hz metronome
R("    const talkOff = Math.floor(t * 6 + ph * 3) % 2 === 1;", "    const sy = Math.sin(t * 1.3 + ph * 2.1) + Math.sin(t * 0.53 + ph), talkOff = !(sy > -0.4 && Math.sin(t * (22 + (ph % 1.3) * 9)) > -0.2);   // bursts and breath pauses, different per character")

# 3. rim highlight on limbs
R("    c.strokeStyle = col; c.lineWidth = w; c.beginPath(); c.moveTo(pts[0][0], pts[0][1]); for (let i = 1; i < pts.length; i++) c.lineTo(pts[i][0], pts[i][1]); c.stroke();",
  "    c.strokeStyle = col; c.lineWidth = w; c.beginPath(); c.moveTo(pts[0][0], pts[0][1]); for (let i = 1; i < pts.length; i++) c.lineTo(pts[i][0], pts[i][1]); c.stroke();\n    c.save(); c.translate(-w * 0.2, -w * 0.16); c.strokeStyle = 'rgba(255,255,255,0.16)'; c.lineWidth = Math.max(1.5, w * 0.24); c.beginPath(); c.moveTo(pts[0][0], pts[0][1]); for (let i = 1; i < pts.length; i++) c.lineTo(pts[i][0], pts[i][1]); c.stroke(); c.restore();   // rim light")

# 4. crossfade when a sprite pose and another pose are blended; rename draw -> draw1
R("  function draw(c, role, x, y, sc, o, t) {\n    o = o || {}; t = t || 0;", "  function draw(c, role, x, y, sc, o, t) {\n    o = o || {};\n    const isS = n => typeof n === 'string' && n.indexOf('spr:') === 0;\n    if (o.from && o.blend !== undefined && o.blend < 1 && (isS(o.from) || isS(o.pose))) {          // sprite poses cannot bend: crossfade instead\n      const u = Math.max(0, Math.min(1, o.blend)), al = o.alpha === undefined ? 1 : o.alpha;\n      draw1(c, role, x, y, sc, Object.assign({}, o, { pose: o.from, from: undefined, blend: undefined, alpha: al * (1 - u) }), t);\n      draw1(c, role, x, y, sc, Object.assign({}, o, { from: undefined, blend: undefined, alpha: al * u }), t); return;\n    }\n    draw1(c, role, x, y, sc, o, t);\n  }\n  function draw1(c, role, x, y, sc, o, t) {\n    o = o || {}; t = t || 0;")

# 5. pose track helper (pure function of time, so scrubbing and parallel export stay exact)
R("    crowdRole(i)", "    track(t, keys, dur) { dur = dur || 0.4; let i = 0; while (i < keys.length - 1 && t >= keys[i + 1][0]) i++; const cur = keys[i][1]; if (i === 0) return { pose: cur }; const u = (t - keys[i][0]) / dur; return u >= 1 ? { pose: cur } : { pose: cur, from: keys[i - 1][1], blend: u }; },\n    crowdRole(i)")
p.write_text(s, encoding='utf8'); print('rigkit patched')
