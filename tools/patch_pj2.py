import re
d = 'C:/Users/Aryan Barman/personal/new_projects/projects/'
s = open(d + 'act1_part2_jensen_elon_3d-hybrid.html', encoding='utf8', newline='').read().replace('\r\n', '\n')
def rep(a, b):
    global s
    assert s.count(a) == 1, (s.count(a), a[:80])
    s = s.replace(a, b)

rep('src="Act 1 part 2.wav"', 'src="audio/Act 1 part 2.wav"')
rep("const s = fitSize(g, text, size || Math.round(h * 0.55), w * 0.9);", "const s = fitSize(g, text, size || Math.round(h * 0.55), w * 0.8);")
s = s.replace('const k = clamp((vel - 5) / 18, 0, 0.36);', 'const k = clamp((vel - 7) / 22, 0, 0.2);')

# ---- audio-anchored captions (speech onsets/offsets measured from the WAV)
rep("{ start: 0.020, end: 2.880,", "{ start: 0.400, end: 2.880,")
rep("{ start: 2.880, end: 4.220,", "{ start: 2.880, end: 4.120,")
rep("{ start: 6.580, end: 10.720,", "{ start: 6.620, end: 10.760,")
rep("{ start: 11.600, end: 15.160,", "{ start: 11.380, end: 15.160,")
rep("{ start: 22.660, end: 25.480,", "{ start: 22.660, end: 25.580,")
rep("{ start: 26.060, end: 29.500,", "{ start: 26.260, end: 29.500,")
rep("{ start: 33.400, end: 36.500,", "{ start: 33.400, end: 36.860,")
rep("{ t: 8.11, name: 'chip_ignite'", "{ t: 9.00, name: 'chip_ignite'")
rep("{ t: 20.96, name: 'whip_pan'", "{ t: 21.34, name: 'whip_pan'")
rep("{ t: 27.36, name: 'gold_stack'", "{ t: 27.70, name: 'gold_stack'")
rep("{ t: 32.24, name: 'oven_drop'", "{ t: 32.18, name: 'oven_drop'")
rep("{ t: 34.37, name: 'chip_ignite'", "{ t: 34.60, name: 'chip_ignite'")
rep("t0: 31.33 }", "t0: 32.18 }")
rep("t0: 34.37 }", "t0: 34.60 }")
rep("[[8.11, 8, 0.10], [13.72, 8, 0.12], [27.36, 8, 0.12], [34.37, 8, 0.12]]", "[[9.00, 8, 0.10], [13.72, 8, 0.12], [27.70, 8, 0.12], [34.60, 8, 0.12]]")
rep("smooth(11.0, 11.9, t) + smooth(20.4, 21.3, t)", "smooth(11.1, 11.8, t) + smooth(20.5, 21.4, t)")
rep("[0.02, 11.20, 'Two men quietly", "[0.40, 11.20, 'Two men quietly")
rep("[11.60, 20.50, 'NVIDIA became", "[11.38, 20.50, 'NVIDIA became")
rep("hitFx(x, y, t, 8.11,", "hitFx(x, y, t, 9.00,")
rep("hitFx(x, y, t, 34.37,", "hitFx(x, y, t, 34.60,")

# ---- camera: always moving, never closer than ~9 so signs never crop
a = s.index("  K(0.02, [-2.4, 4.4, 13.4]"); b = s.index("  (function buildTangents()")
s = s[:a] + """  // Storyboard: A boardroom table + 3-year bars + globe (0-11.4) -> B NVIDIA juggernaut, graph, LED wall, brain (11.4-21) -> C Elon feeds NVIDIA, then xAI / Tesla / SpaceX (21-39)
  K(0.02, [-9.0, 3.2, 12.0], [0.0, 2.6, 0.0], 48);
  K(2.50, [-4.0, 4.0, 11.0], [0.0, 2.6, 0.0], 42);
  K(4.78, [3.0, 5.2, 10.5], [0.0, 2.8, 0.0], 40);
  K(7.00, [8.0, 4.0, 10.0], [0.0, 2.6, 0.0], 40);
  K(9.00, [3.0, 3.4, 9.5], [0.0, 2.7, 0.0], 36);
  K(10.80, [-2.0, 4.4, 6.0], [3.0, 2.8, -8.0], 42);
  K(11.60, [2.5, 3.8, -6.5], [6.0, 2.8, -20.0], 42);
  K(13.70, [-2.0, 4.0, -9.0], [6.0, 3.0, -20.0], 40);
  K(16.40, [13.0, 4.8, -7.5], [6.6, 2.8, -20.0], 37);
  K(18.90, [11.0, 3.8, -12.0], [6.6, 2.8, -20.0], 35);
  K(20.96, [16.5, 4.2, -13.0], [21.0, 2.7, -28.0], 43);
  K(23.58, [19.0, 3.8, -17.0], [20.0, 2.6, -28.0], 37);
  K(27.30, [16.5, 4.4, -15.5], [22.0, 2.7, -28.0], 38);
  K(29.83, [20.5, 3.6, -17.6], [22.0, 2.6, -28.0], 37);
  K(32.24, [25.5, 3.6, -17.6], [24.0, 2.6, -28.0], 37);
  K(34.60, [27.5, 4.6, -15.5], [25.5, 2.8, -28.0], 40);
  K(37.16, [24.2, 5.2, -13.2], [24.2, 2.6, -28.0], 44);
  K(39.20, [24.2, 5.6, -11.0], [24.2, 2.6, -28.0], 46);

""" + s[b:]

# ---- coins to the pillars only once the money is "poured"
rep("X.cardSpendC.position.set(19.2, 4.3, -27.2);", "X.cardSpendC.position.set(17.6, 4.5, -27.2);")
rep("X.cardSpendC.visible = on && t >= 26.06;", "X.cardSpendC.visible = on && t >= 26.06 && t < 29.3;")
rep("c.m.visible = on && t >= 22.66;", "c.m.visible = on && t >= 26.26;")
rep("lerp(18.5, 21.5 + (c.i % 3) * 2.7, u)", "lerp(19.8, 21.5 + (c.i % 3) * 2.7, u)")

NEW = r"""
    // =====================================================================
    // v2 STORYBOARD ASSETS
    // =====================================================================
    X.rep = (m, t) => { const u = m.userData; if (!m.visible) return; u.g.clearRect(0, 0, u.w, u.h); u.paint(u.g, t, u.w, u.h); u.tex.needsUpdate = true; };
    X.pulse = (t, t0, dur) => Math.sin(seg(t, t0, t0 + dur) * Math.PI);
    // ---- A: three growing year bars, city pins that light up on the globe, a "reshaped" sign
    X.bars = [['2024', 0.6, 0x45b8ac], ['2025', 1.1, 0xebc16b], ['2026', 1.7, 0x76b900]].map(([yr, h, col], i) => {
      const m = bx(0.7, 1, 0.7, col, col, 0.3); m.material.emissiveIntensity = 0.4; m.position.set(-1.7 + i * 1.7, 1.25, 1.0); m.userData = { h, i }; m.visible = false; scene.add(m); return m; });
    X.pins = []; for (let i = 0; i < 12; i++) {
      const la = (hash(i * 7 + 1) - 0.5) * 2.2, lo = hash(i * 13 + 5) * 6.28, r = 1.17; const p = new THREE.Mesh(new THREE.SphereGeometry(0.075, 8, 6), new THREE.MeshBasicMaterial({ color: i % 2 ? 0xebc16b : 0x9be01b }));
      p.position.set(Math.cos(la) * Math.cos(lo) * r, Math.sin(la) * r, Math.cos(la) * Math.sin(lo) * r); p.visible = false; X.globeA.add(p); X.pins.push(p); }
    X.reshaped = tag('RESHAPED THE ECONOMY', 4.6, 0.6, PAL.ink, PAL.amberHi, 56); X.reshaped.position.set(0, 5.0, -0.3); X.reshaped.visible = false; scene.add(X.reshaped);
    // ---- B: market-cap graph, LED wall of GPU racks, orbiting data nodes around the brain
    X.graph = panel(3.6, 2.0, 720, 400, (g, t, w, h) => {
      g.fillStyle = '#0B191E'; g.fillRect(0, 0, w, h); g.strokeStyle = '#9BE01B'; g.lineWidth = 8; g.strokeRect(4, 4, w - 8, h - 8);
      g.fillStyle = '#F4F1EA'; g.font = '800 34px system-ui,sans-serif'; g.textAlign = 'left'; g.fillText('NVIDIA VALUE', 30, 56);
      const u = seg(t, 11.9, 15.0); g.strokeStyle = '#9BE01B'; g.lineWidth = 10; g.lineJoin = 'round'; g.beginPath();
      for (let i = 0; i <= 20; i++) { if (i / 20 > u) break; const x = 30 + i * 33, y = 350 - Math.pow(i / 20, 2.2) * 250 - Math.sin(i * 1.7) * 6; i ? g.lineTo(x, y) : g.moveTo(x, y); } g.stroke();
          });
    X.graph.position.set(0.9, 4.5, -19.2); X.graph.rotation.y = 0.35; X.graph.visible = false; scene.add(X.graph);
    X.ledWall = panel(5.0, 2.4, 800, 384, (g, t, w, h) => {
      g.fillStyle = '#0B191E'; g.fillRect(0, 0, w, h);
      for (let r = 0; r < 12; r++) for (let c = 0; c < 25; c++) { const v = hash2(c * 3.1 + Math.floor(t * 6 + r) * 0.7, r * 5.3); g.fillStyle = v > 0.72 ? '#9BE01B' : v > 0.4 ? '#2E5261' : '#16303a'; g.fillRect(14 + c * 31, 14 + r * 30, 22, 20); }
    });
    X.ledWall.position.set(5.2, 2.0, -22.6); X.ledWall.visible = false; scene.add(X.ledWall);
    X.nodes = []; for (let i = 0; i < 6; i++) { const n = new THREE.Mesh(new THREE.SphereGeometry(0.11, 10, 8), new THREE.MeshBasicMaterial({ color: i % 2 ? 0x9be01b : 0x45b8ac })); n.visible = false; scene.add(n); X.nodes.push({ m: n, i }); }
    // ---- C: a small NVIDIA tower being fed by Elon's coins, xAI LED rack face, a Tesla that drives, a SpaceX satellite on an orbit ring
    X.miniNv = new THREE.Group(); X.miniNv.position.set(15.6, 0, -27.4);
    { const b = bx(1.6, 2.4, 1.2, 0x76b900, 0x2e4a00, 0.3, 0.5); b.position.y = 1.2; const lb = tag('NVIDIA', 1.7, 0.42, PAL.ink, PAL.sageHi, 54); lb.position.set(0, 2.75, 0.2); X.miniNv.add(b, lb); }
    X.miniNv.visible = false; scene.add(X.miniNv);
    X.feed = []; for (let i = 0; i < 10; i++) { const c = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.2, 0.05, 14), new THREE.MeshStandardMaterial({ color: 0xebc16b, emissive: 0x6b4a00, metalness: 0.75 })); c.visible = false; scene.add(c); X.feed.push({ m: c, i }); }
    X.xaiLeds = panel(1.5, 2.6, 300, 520, (g, t, w, h) => {
      g.fillStyle = '#0B191E'; g.fillRect(0, 0, w, h);
      for (let r = 0; r < 14; r++) for (let c = 0; c < 6; c++) { const v = hash2(c * 2.3 + Math.floor(t * 8 + r) * 0.9, r * 4.1); g.fillStyle = v > 0.6 ? '#45B8AC' : '#16303a'; g.fillRect(12 + c * 46, 12 + r * 36, 36, 26); }
    });
    X.xaiLeds.position.set(21.5, 1.7, -27.28); X.xaiLeds.visible = false; scene.add(X.xaiLeds);
    X.car = new THREE.Group();
    { const body = bx(1.5, 0.4, 0.75, 0xd94e43, 0x4d1410, 0.3, 0.5); body.position.y = 0.45; const cab = bx(0.8, 0.35, 0.65, 0xf4f1ea, 0x222222, 0.2); cab.position.set(-0.1, 0.8, 0); X.car.add(body, cab);
      X.wheels = [[-0.5, 0.36], [0.5, 0.36], [-0.5, -0.36], [0.5, -0.36]].map(([x, z]) => { const w = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.18, 0.12, 14), new THREE.MeshStandardMaterial({ color: 0x1a1a1a })); w.rotation.x = Math.PI / 2; w.position.set(x, 0.18, z); X.car.add(w); return w; }); }
    X.car.visible = false; scene.add(X.car);
    X.orbit = new THREE.Mesh(new THREE.TorusGeometry(1.7, 0.035, 8, 60), new THREE.MeshBasicMaterial({ color: 0xebc16b })); X.orbit.rotation.x = 1.25; X.orbit.position.set(27.0, 5.3, -28); X.orbit.visible = false; scene.add(X.orbit);
    X.sat = new THREE.Group(); { const b = bx(0.35, 0.35, 0.35, 0xcfd6da, 0x222222, 0.3, 0.8); const p1 = bx(0.7, 0.05, 0.3, 0x3a78b8, 0x0a2a4a), p2 = p1.clone(); p1.position.x = -0.55; p2.position.x = 0.55; X.sat.add(b, p1, p2); X.sat.scale.setScalar(1.9); }
    X.sat.visible = false; scene.add(X.sat);
"""
rep("    const TP = [[-6, 0.14, 2.2]", NEW + "\n    const TP = [[-6, 0.14, 2.2]")

ANIM = r"""
    // ================= v2 animation =================
    {
      const P = X.pulse;
      // A: year bars grow with the years, pins light up across the globe, rings lock
      X.bars.forEach(m => { const u = easeOutBack(seg(t, 4.9 + m.userData.i * 0.55, 5.6 + m.userData.i * 0.55)); m.visible = t < 12.0 && t >= 4.9 + m.userData.i * 0.55; m.scale.y = Math.max(0.01, m.userData.h * u); m.position.y = 1.22 + m.scale.y * 0.5; });
      X.pins.forEach((p, i) => { const t0 = 6.62 + i * 0.22; p.visible = t >= t0 && t < 12.0; p.scale.setScalar(Math.max(0.01, easeOutBack(seg(t, t0, t0 + 0.3))) * (1 + 0.35 * Math.sin(t * 6 + i))); });
      X.reshaped.visible = t >= 7.4 && t < 11.0; X.reshaped.scale.setScalar(Math.max(0.01, easeOutBack(seg(t, 7.4, 7.9))));
      X.globeRingA.scale.setScalar(1 + 0.12 * P(t, 9.0, 0.6));
      // B: graph draws, LED wall flickers, data nodes orbit the brain
      X.graph.visible = t >= 11.9 && t < 21.0; X.graph.scale.setScalar(Math.max(0.01, easeOutBack(seg(t, 11.9, 12.5)))); X.rep(X.graph, t);
      X.ledWall.visible = t >= 14.2 && t < 21.0; X.ledWall.scale.setScalar(Math.max(0.01, easeOutBack(seg(t, 14.2, 14.9)))); X.rep(X.ledWall, t);
      X.nodes.forEach(n => { const on = t >= 17.0 && t < 21.0, a = t * 2.4 + n.i * 1.047; n.m.visible = on; n.m.position.set(8.2 + Math.cos(a) * 1.7, 2.5 + Math.sin(a * 1.3) * 0.7, -19.2 + Math.sin(a) * 1.7); n.m.scale.setScalar(Math.max(0.01, easeOutBack(seg(t, 17.0, 17.5)))); });
      // C: coins feed the mini NVIDIA tower, xAI racks blink, Tesla drives, SpaceX satellite circles its ring
      X.miniNv.visible = t >= 21.34 && t < 26.6; X.miniNv.scale.y = Math.max(0.01, easeOutBack(seg(t, 21.34, 22.0)));
      X.feed.forEach(f => { const on = t >= 22.66 && t < 26.4, u = ((t * 0.7 + f.i / 10) % 1); f.m.visible = on; f.m.position.set(lerp(19.2, 16.6, u), 1.4 + Math.sin(u * Math.PI) * 1.4, -27.4); f.m.rotation.set(t * 5 + f.i, 0, t * 4); });
      X.xaiLeds.visible = t >= 29.8; X.rep(X.xaiLeds, t);
      { const on = t >= 32.4, u = (t - 32.4) * 0.5; X.car.visible = on; X.car.position.set(24.2 + Math.sin(u * 2) * 1.4, 0, -26.1); X.car.rotation.y = Math.cos(u * 2) > 0 ? 0 : Math.PI; X.wheels.forEach(w => { w.rotation.y = t * 12; }); }
      X.orbit.visible = t >= 34.6; X.orbit.rotation.z = t * 0.2; X.orbit.scale.setScalar(Math.max(0.01, easeOutBack(seg(t, 34.6, 35.2)))); X.orbit.position.y = 5.3 + 0.1 * Math.sin(t * 2);
      { const a = t * 1.8; X.sat.visible = t >= 34.9; X.sat.position.set(27.0 + Math.cos(a) * 1.7, 5.3 + Math.sin(a) * 1.7 * Math.sin(1.25) * 0.98, -28 + Math.sin(a) * 1.7 * Math.cos(1.25)); X.sat.rotation.y = a; }
    }
"""
rep("    renderer.render(scene, camera);\n\n    smearPass(t);", ANIM + "\n    renderer.render(scene, camera);\n\n    smearPass(t);")

a = s.index("    add('jensen', -3.4, 0, 1.2, 2.35, 0.2, 11.6,")
b = s.index("    drawCast(t, cast);")
CAST = r"""    // A: the two men walk in and flank the table, gesturing at the bars and the globe
    { const u = easeOutCubic(seg(t, 0.4, 1.7)), w = u < 1 ? 1 : 0, pt = t >= 9.0;
      add('jensen', lerp(-8.5, -3.4, u), 0, 1.2, 2.35, 0.4, 11.6, { facing: 1, phase: 1, walk: t * 8, walkAmt: w, armAngleR: pt ? -1.5 : -0.4, armAngleL: 0.3, browTension: -0.2, talk: u >= 1 ? 0.6 : 0 });
      add('elon', lerp(8.5, 3.4, u), 0, 1.2, 2.38, 0.4, 11.6, { facing: -1, phase: 2, walk: t * 8, walkAmt: w, armAngleR: pt ? -1.5 : -0.4, armAngleL: 0.3, browTension: -0.2, talk: u >= 1 ? 0.6 : 0 }); }
    // B: Jensen strides to the NVIDIA tower; an engineer watches the LED wall
    { const u = easeInOutCubic(seg(t, 11.4, 12.9)); add('jensen', lerp(-1.0, 2.6, u), 0, lerp(-9.0, -18.2, u), 2.35, 11.4, 21.2, { facing: 1, phase: 3, walk: t * 8, walkAmt: u > 0 && u < 1 ? 1 : 0, armAngleR: u >= 1 ? -1.7 : -0.4, armAngleL: 0.3, browTension: -0.25, talk: u >= 1 ? 0.7 : 0 }); }
    add('analyst', 9.8, 0, -17.8, 2.3, 14.6, 21.2, { facing: -1, phase: 6, armAngleR: -1.7, armAngleL: 0.3, browTension: 0.2, talk: 0.5 });
    // C: Elon strides in, then stands by the hub; a worker looks up at the racks
    { const u = easeInOutCubic(seg(t, 20.7, 22.0)); add('elon', lerp(13.6, 19.6, u), 0, -25.8, 2.38, 20.7, undefined, { facing: 1, phase: 4, walk: t * 8, walkAmt: u > 0 && u < 1 ? 1 : 0, armAngleR: u >= 1 ? -1.65 : -0.4, armAngleL: 0.3, browTension: -0.25, talk: u >= 1 ? 0.7 : 0 }); }
    add('analyst', 29.6, 0, -25.2, 2.3, 29.5, undefined, { facing: -1, phase: 7, armAngleR: -2.4, armAngleL: 0.3, browTension: 0.1, talk: 0.4 });
"""
s = s[:a] + CAST + s[b:]
open(d + 'act1_part2_jensen_elon_3d-hybrid-v2.html', 'w', encoding='utf8', newline='\n').write(s)
print('ok', s.count('\n'))
