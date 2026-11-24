import re
d = 'C:/Users/Aryan Barman/personal/new_projects/projects/'
s = open(d + 'act1_part1_jensen_elon_3d-hybrid.html', encoding='utf8', newline='').read().replace('\r\n', '\n')
def rep(a, b):
    global s
    assert s.count(a) == 1, (s.count(a), a[:70])
    s = s.replace(a, b)

# ---- text fit margin (labels were clipping at the sign edge)
rep("const s = fitSize(g, text, size || Math.round(h * 0.55), w * 0.9);", "const s = fitSize(g, text, size || Math.round(h * 0.55), w * 0.8);")

# ---- 1. camera: always moving, distances kept >= 10 so signs never crop
a = s.index("  K(0.00, [-2.6, 4.2, 13.2]"); b = s.index("  (function buildTangents()")
s = s[:a] + """  // Storyboard: A ousted (0-3.4) -> flight -> B Elon lands + the $119B plant + the key (3.4-10.5) -> flight -> C unstoppable pair (11-19) -> trap (19-25)
  K(0.00, [-6.5, 2.8, 13.5], [-0.5, 2.8, 0.0], 46);
  K(1.56, [-3.0, 3.6, 12.5], [-0.2, 3.4, 0.0], 40);
  K(2.90, [4.5, 4.4, 6.0], [2.5, 2.8, -7.0], 42);
  K(3.46, [3.0, 3.8, -4.8], [4.5, 2.8, -18.0], 42);
  K(4.70, [11.5, 4.8, -6.0], [5.0, 2.6, -17.0], 42);
  K(5.80, [10.5, 3.8, -7.4], [4.5, 2.6, -17.0], 38);
  K(7.60, [1.5, 4.0, -7.0], [4.5, 2.8, -17.5], 40);
  K(9.24, [-1.5, 4.6, -5.5], [4.5, 2.8, -18.0], 42);
  K(10.50, [4.5, 5.0, -4.5], [4.5, 3.0, -18.0], 46);
  K(11.18, [13.5, 4.2, -14.0], [20.0, 2.8, -28.0], 44);
  K(13.00, [28.5, 4.0, -17.5], [20.0, 3.0, -28.0], 41);
  K(15.00, [26.0, 5.4, -14.5], [20.0, 3.2, -28.0], 43);
  K(16.80, [13.5, 4.6, -16.0], [20.0, 3.0, -28.0], 41);
  K(18.66, [15.0, 3.6, -14.0], [20.0, 2.8, -28.0], 40);
  K(19.18, [20.2, 3.6, -12.5], [20.4, 2.6, -27.6], 38);
  K(20.60, [23.5, 3.2, -14.0], [20.4, 2.4, -27.6], 36);
  K(22.48, [18.0, 4.4, -11.0], [20.4, 2.6, -27.6], 42);
  K(25.00, [20.0, 6.2, -6.0], [20.4, 2.4, -27.6], 48);

""" + s[b:]

# ---- 2. fix: the ousted plate gets a larger sign
rep("X.ceoPlate = tag('CEO • JENSEN HUANG • OUSTED', 3.4, 0.58, PAL.coral, PAL.ivory, 44);", "X.ceoPlate = tag('CEO • JENSEN HUANG • OUSTED', 4.6, 0.62, PAL.coral, PAL.ivory, 44);")
rep("X.ceoPlate.position.set(0, 2.8, 1.1); scene.add(X.ceoPlate);", "X.ceoPlate.position.set(0, 2.8, 1.1); scene.add(X.ceoPlate);\n    X.ceoPlate.visible = false;")

# ---- 3. new assets
NEW = r"""
    // =====================================================================
    // v2 STORYBOARD ASSETS
    // =====================================================================
    const rp = m => { const u = m.userData; if (!m.visible) return; return u; };
    X.rep = (m, t) => { const u = m.userData; if (!m.visible) return; u.g.clearRect(0, 0, u.w, u.h); u.paint(u.g, t, u.w, u.h); u.tex.needsUpdate = true; };
    X.pulse = (t, t0, dur) => Math.sin(seg(t, t0, t0 + dur) * Math.PI);
    // ---- A: stock ticker falling, OUSTED stamp, termination papers, a guard rope
    X.ticker = panel(2.8, 1.7, 720, 440, (g, t, w, h) => {
      g.fillStyle = '#0B191E'; g.fillRect(0, 0, w, h); g.strokeStyle = '#D94E43'; g.lineWidth = 10; g.strokeRect(5, 5, w - 10, h - 10);
      g.fillStyle = '#F4F1EA'; g.textAlign = 'left'; g.font = '900 80px "Arial Black",sans-serif'; g.fillText('NVDA', 40, 120); g.fillStyle = '#D94E43'; g.fillText('▼', 330, 120);
      const u = seg(t, 1.56, 3.4); g.strokeStyle = '#D94E43'; g.lineWidth = 10; g.beginPath();
      for (let i = 0; i <= 12; i++) { if (i / 12 > 0.15 + u * 0.85) break; const x = 40 + i * 52, y = 170 + (i < 3 ? i * 8 : i * 22) + Math.sin(i * 2.4) * 8; i ? g.lineTo(x, y) : g.moveTo(x, y); } g.stroke();
      g.fillStyle = '#F09A92'; g.font = '800 34px monospace'; g.fillText('-9% after hours', 40, 410);
    });
    X.ticker.position.set(3.6, 4.4, 0.4); X.ticker.visible = false; scene.add(X.ticker);
    X.oustStamp = tag('OUSTED', 3.0, 1.0, PAL.coral, PAL.ivory, 110);
    X.oustStamp.position.set(0.2, 3.9, 1.0); X.oustStamp.rotation.z = -0.14; X.oustStamp.visible = false; scene.add(X.oustStamp);
    X.papers = [];
    for (let i = 0; i < 14; i++) { const p = new THREE.Mesh(new THREE.PlaneGeometry(0.45, 0.6), new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.DoubleSide })); p.visible = false; scene.add(p); X.papers.push({ m: p, i }); }
    // ---- B: Elon's Starship lands; the plant gets a crane, smoke, a chip conveyor, a $119B counter and a door that opens
    X.ship = new THREE.Group();
    { const body = new THREE.Mesh(new THREE.CylinderGeometry(0.5, 0.5, 3.2, 20), new THREE.MeshStandardMaterial({ color: 0xcfd6da, metalness: 0.85, roughness: 0.2 })); body.position.y = 1.9;
      const nose = new THREE.Mesh(new THREE.ConeGeometry(0.5, 1.0, 20), new THREE.MeshStandardMaterial({ color: 0xcfd6da, metalness: 0.85, roughness: 0.2 })); nose.position.y = 4.0;
      X.shipFire = new THREE.Mesh(new THREE.ConeGeometry(0.5, 1.6, 12), new THREE.MeshBasicMaterial({ color: 0xffb340 })); X.shipFire.rotation.x = Math.PI; X.shipFire.position.y = -0.2;
      for (let k = 0; k < 3; k++) { const l = bx(0.12, 0.9, 0.5, 0x3a3f4a); l.position.set(Math.cos(k * 2.1) * 0.6, 0.45, Math.sin(k * 2.1) * 0.6); l.rotation.y = -k * 2.1; X.ship.add(l); }
      X.ship.add(body, nose, X.shipFire); }
    X.ship.visible = false; scene.add(X.ship);
    X.landRing = new THREE.Mesh(new THREE.RingGeometry(0.8, 0.95, 40), new THREE.MeshBasicMaterial({ color: 0xebc16b, transparent: true, opacity: 0, side: THREE.DoubleSide })); X.landRing.rotation.x = -Math.PI / 2; X.landRing.position.set(8.2, 0.06, -17.6); scene.add(X.landRing);
    X.crane = new THREE.Group(); X.crane.position.set(7.6, 0, -19.4);
    { const mast = bx(0.2, 6.0, 0.2, 0xd99b26, 0x4d3400); mast.position.y = 3.0; const jib = bx(4.4, 0.18, 0.18, 0xd99b26, 0x4d3400); jib.position.set(-1.6, 6.0, 0); X.craneHook = bx(0.14, 1.4, 0.14, 0x9aa7ae); X.craneHook.position.set(-3.2, 5.2, 0); const blk = bx(0.7, 0.5, 0.5, 0x76b900, 0x2e4a00); blk.position.set(0, -0.9, 0); X.craneHook.add(blk); X.crane.add(mast, jib, X.craneHook); }
    X.crane.visible = false; scene.add(X.crane);
    X.smoke = []; for (let i = 0; i < 18; i++) { const p = new THREE.Mesh(new THREE.SphereGeometry(0.45, 10, 8), new THREE.MeshBasicMaterial({ color: 0xdfe9ee, transparent: true, opacity: 0.3 })); p.visible = false; scene.add(p); X.smoke.push({ m: p, i }); }
    X.belt = bx(8.6, 0.16, 0.9, 0x2e5261, 0x0b2a30); X.belt.position.set(4.5, 0.18, -14.9); X.belt.visible = false; scene.add(X.belt);
    X.beltChips = []; for (let i = 0; i < 7; i++) { const c = bx(0.55, 0.12, 0.55, i % 2 ? 0x45b8ac : 0x76b900, 0x1a3a36); c.visible = false; scene.add(c); X.beltChips.push({ m: c, i }); }
    X.cash = panel(3.4, 1.5, 680, 300, (g, t, w, h) => {
      g.fillStyle = '#0B191E'; g.fillRect(0, 0, w, h); g.strokeStyle = '#EBC16B'; g.lineWidth = 10; g.strokeRect(5, 5, w - 10, h - 10);
      const u = easeOutCubic(seg(t, 5.8, 9.24)), v = u >= 0.999 ? '$119B' : '$' + Math.floor(u * 119) + 'B';
      g.textAlign = 'center'; g.fillStyle = '#EBC16B'; g.font = '900 140px system-ui,sans-serif'; g.fillText(v, w / 2, 190); g.fillStyle = '#F4F1EA'; g.font = '700 30px system-ui,sans-serif'; g.fillText('investment • Texas chip plant', w / 2, 262);
    });
    X.cash.position.set(10.6, 2.6, -16.4); X.cash.rotation.y = -0.5; X.cash.visible = false; scene.add(X.cash);
    X.plantDoor = bx(1.5, 2.2, 0.12, 0x76b900, 0x4a8000, 0.3); X.plantDoor.position.set(4.5, 1.1, -16.44); X.plantDoor.visible = false; scene.add(X.plantDoor);
    X.doorGlow = new THREE.Mesh(new THREE.PlaneGeometry(1.6, 2.3), new THREE.MeshBasicMaterial({ color: 0xfff1c9, transparent: true, opacity: 0, blending: THREE.AdditiveBlending, depthWrite: false })); X.doorGlow.position.set(4.5, 1.15, -16.4); scene.add(X.doorGlow);
    X.offerTag = tag('THE OFFER', 2.6, 0.55, PAL.amber, PAL.ink, 70); X.offerTag.position.set(1.0, 3.9, -15.4); X.offerTag.visible = false; scene.add(X.offerTag);
    // ---- C: three power columns that make the pair look "unstoppable", a halo around rocket+chip, then the trap's lock, chains, floor ring
    X.pillars = [['AI CHIPS', 0x76b900, 22.8], ['ROCKETS', 0xcfd6da, 24.0], ['CAPITAL', 0xd99b26, 25.2]].map(([nm, col, x], i) => {
      const g = new THREE.Group(); g.position.set(x, 0, -29.6); const body = bx(0.9, 1, 0.9, col, 0x1a1a1a, 0.3); body.position.y = 0.5; const lb = tag(nm, 1.5, 0.4, PAL.ink, PAL.ivory, 54); lb.position.set(0, 0.5, 0.52); g.add(body, lb); g.userData = { body, lb, i };
      g.visible = false; scene.add(g); return g; });
    X.halo = new THREE.Mesh(new THREE.TorusGeometry(2.6, 0.06, 8, 60), new THREE.MeshBasicMaterial({ color: 0x9be01b, transparent: true, opacity: 0.0 })); X.halo.rotation.x = Math.PI / 2; X.halo.position.set(20.4, 2.4, -27.4); scene.add(X.halo);
    X.onPaper = tag('UNSTOPPABLE — on paper', 4.4, 0.6, PAL.sage, PAL.ink, 60); X.onPaper.position.set(20.4, 6.6, -26.8); X.onPaper.visible = false; scene.add(X.onPaper);
    X.lock = new THREE.Group(); X.lock.position.set(20.4, 2.0, -25.9);
    { const body = bx(1.1, 0.9, 0.5, 0xd99b26, 0x4d3400, 0.3, 0.7); const sh = new THREE.Mesh(new THREE.TorusGeometry(0.34, 0.09, 8, 20, Math.PI), new THREE.MeshStandardMaterial({ color: 0x9aa7ae, metalness: 0.8 })); sh.position.y = 0.6; X.lock.add(body, sh); }
    X.lock.visible = false; scene.add(X.lock);
    X.chains = []; for (let i = 0; i < 2; i++) { const c = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.07, 1, 6), new THREE.MeshBasicMaterial({ color: 0x9aa7ae })); c.visible = false; scene.add(c); X.chains.push(c); }
    X.noExit = tag('NO EXIT', 2.6, 0.7, PAL.ink, PAL.coral, 100); X.noExit.position.set(20.4, 0.9, -25.4); X.noExit.visible = false; scene.add(X.noExit);
    X.trapRing = new THREE.Mesh(new THREE.RingGeometry(2.4, 2.55, 48), new THREE.MeshBasicMaterial({ color: 0xd94e43, transparent: true, opacity: 0, side: THREE.DoubleSide })); X.trapRing.rotation.x = -Math.PI / 2; X.trapRing.position.set(20.4, 0.07, -27.6); scene.add(X.trapRing);
    X.neither = tag('neither can escape', 4.0, 0.55, PAL.coral, PAL.ivory, 56); X.neither.position.set(20.4, 6.0, -26.6); X.neither.visible = false; scene.add(X.neither);
"""
rep("    // Connected Golden Through-Line Spline", NEW + "\n    // Connected Golden Through-Line Spline")

# ---- 4. per-frame animation
ANIM = r"""
    // ================= v2 animation =================
    {
      const P = X.pulse;
      // A: OUSTED stamp slams, the ticker falls, termination papers flutter out of the tower, plate flies off
      X.oustStamp.visible = t >= 1.56 && t < 4.2; X.oustStamp.scale.setScalar(Math.max(0.01, easeOutBack(seg(t, 1.56, 1.9))) * (1 + 0.05 * P(t, 1.56, 0.4)));
      X.ticker.visible = t >= 0.4 && t < 4.4; X.ticker.scale.setScalar(Math.max(0.01, easeOutBack(seg(t, 0.4, 0.95)))); X.rep(X.ticker, t); X.ticker.position.y = 4.4 - easeInCubic(seg(t, 3.0, 4.2)) * 3.6;
      X.papers.forEach(p => { const st = t - (1.56 + p.i * 0.09), on = st > 0 && st < 2.8; p.m.visible = on; if (on) { p.m.position.set(0 + Math.sin(p.i * 2.1) * st * 1.6, 2.6 + st * 0.9 - st * st * 0.7, 1.2 + Math.cos(p.i * 1.7) * st); p.m.rotation.set(st * 4 + p.i, st * 3, st * 5); } });
      // B: the ship streaks in on the thread and lands with a ring; crane lifts a block; smoke, belt, counter, door
      { const u = easeInOutCubic(seg(t, 3.46, 4.7)); X.ship.visible = t >= 3.46 && t < 11.6; X.ship.position.set(lerp(-8, 8.2, u), lerp(14, 0.1, u), lerp(-9, -17.6, u)); X.ship.rotation.z = (1 - u) * 0.9; X.shipFire.visible = u < 1; X.shipFire.scale.set(1, 0.6 + 0.6 * Math.abs(Math.sin(t * 30)), 1);
        X.landRing.visible = t >= 4.65 && t < 5.9; const lu = seg(t, 4.65, 5.9); X.landRing.scale.setScalar(1 + lu * 5); X.landRing.material.opacity = (1 - lu) * 0.8; }
      X.crane.visible = t >= 3.9 && t < 11.6; X.crane.scale.y = Math.max(0.01, easeOutBack(seg(t, 3.9, 4.8))); X.craneHook.position.y = 5.2 - 1.2 * Math.abs(Math.sin(t * 0.8)); X.craneHook.position.x = -3.2 + Math.sin(t * 0.7) * 0.5;
      X.smoke.forEach(sm => { const on = t >= 4.2 && t < 11.6, u = ((t * 0.3 + sm.i / 18) % 1); sm.m.visible = on; if (on) { const sx = [2.7, 4.5, 6.3][sm.i % 3]; sm.m.position.set(sx + Math.sin(u * 6 + sm.i) * 0.3, 4.6 + u * 4.4, -18.6); sm.m.scale.setScalar(0.5 + u * 1.6); sm.m.material.opacity = 0.32 * (1 - u); } });
      X.belt.visible = t >= 6.6 && t < 11.6; X.beltChips.forEach(c => { const on = t >= 6.8 && t < 11.6, u = ((t * 0.25 + c.i / 7) % 1); c.m.visible = on; c.m.position.set(lerp(0.4, 8.6, u), 0.34, -14.9); c.m.rotation.y = u * 6; });
      X.cash.visible = t >= 5.8 && t < 11.6; X.rep(X.cash, t); X.cash.scale.setScalar(Math.max(0.01, easeOutBack(seg(t, 5.8, 6.4))));
      X.offerTag.visible = t >= 5.9 && t < 9.5; X.offerTag.scale.setScalar(Math.max(0.01, easeOutBack(seg(t, 5.9, 6.4))));
      { const o = easeOutBack(seg(t, 9.24, 10.2)); X.plantDoor.visible = t >= 3.6 && t < 11.6; X.plantDoor.position.x = 4.5 + o * 1.4; X.plantDoor.scale.x = Math.max(0.05, 1 - o * 0.6); X.doorGlow.visible = t >= 9.24 && t < 11.6; X.doorGlow.material.opacity = 0.55 * smooth(9.24, 10.0, t) * (0.8 + 0.2 * Math.sin(t * 9)); }
      // the key now travels: Elon's hand -> hovers in front of the plant -> into the door slot
      { const k0 = new THREE.Vector3(2.6, 1.9, -15.6), k1 = new THREE.Vector3(4.5, 2.6, -15.4), k2 = new THREE.Vector3(4.5, 1.2, -16.2); const u1 = easeInOutCubic(seg(t, 5.8, 7.2)), u2 = easeInOutCubic(seg(t, 8.6, 9.24)); const pos = k0.clone().lerp(k1, u1).lerp(k2, u2); X.goldKey.position.copy(pos); X.goldKey.scale.setScalar(Math.max(0.01, easeOutBack(seg(t, 5.8, 6.4))) * (1 - 0.5 * u2)); X.goldKey.visible = t >= 5.8 && t < 9.9; }
      // C: power columns grow, halo ring pulses, trap lock drops, chains tighten, floor ring + NO EXIT pulse
      X.pillars.forEach(g => { const i = g.userData.i, u = easeOutBack(seg(t, 14.84 + i * 0.7, 15.7 + i * 0.7)), h = 2.6 + i * 0.9; g.visible = t >= 14.8 && t < 19.4; g.userData.body.scale.y = Math.max(0.01, h * u); g.userData.body.position.y = h * u * 0.5; g.userData.lb.position.y = h * u + 0.4; });
      X.halo.material.opacity = 0.7 * smooth(13.0, 14.0, t) * (t < 19.18 ? (0.7 + 0.3 * Math.sin(t * 6)) : 0); X.halo.rotation.z = t * 1.2; X.halo.scale.setScalar(1 + 0.05 * Math.sin(t * 4));
      X.onPaper.visible = t >= 14.84 && t < 19.0; X.onPaper.scale.setScalar(Math.max(0.01, easeOutBack(seg(t, 14.84, 15.4))));
      { const d = easeOutBounce(seg(t, 20.0, 20.7)); X.lock.visible = t >= 20.0 && t < 25.5; X.lock.position.y = lerp(7.5, 2.0, d); X.lock.rotation.z = t >= 20.7 ? 0.1 * Math.sin(seg(t, 20.7, 21.4) * Math.PI * 4) : 0; }
      X.chains.forEach((c, i) => { c.visible = t >= 20.6 && t < 25.5; const a = new THREE.Vector3(i ? 22.4 : 18.4, 0.5, -27.2), b = new THREE.Vector3(20.4, 2.0, -25.9); cordBetween(c, a, b); });
      X.noExit.visible = t >= 20.7 && t < 25.5 && Math.sin(t * 7) > -0.6; X.noExit.scale.setScalar(Math.max(0.01, easeOutBack(seg(t, 20.7, 21.1))));
      { const ru = seg(t, 19.18, 22.0); X.trapRing.visible = t >= 19.18; X.trapRing.scale.setScalar(1 + (t * 0.8) % 1 * 0.5); X.trapRing.material.opacity = 0.8 * Math.min(1, ru * 3) * (0.5 + 0.5 * Math.sin(t * 6)); }
      X.neither.visible = t >= 21.9 && t < 25.5; X.neither.scale.setScalar(Math.max(0.01, easeOutBack(seg(t, 21.9, 22.5))));
      X.spacexGroup.children[0].visible = true;
    }
"""
rep("    renderer.render(scene, camera);\n\n    smearPass(t);", ANIM + "\n    renderer.render(scene, camera);\n\n    smearPass(t);")
rep("const easeOutBounce = t => {", "const easeInCubic = u => u * u * u;\n  const easeOutBounce = t => {")

# ---- 5. cast: guards, Elon walks out of the ship, Jensen walks in and gets caged with Elon; analysts react
a = s.index("    add('jensen', -3.6, 0, 1.4, 2.35, 0.2, 4.2,")
b = s.index("    drawCast(t, cast);")
CAST = r"""    // A: Jensen is escorted out by two guards while an analyst watches the ticker
    { const u = easeOutCubic(seg(t, 0.2, 1.5)); add('jensen', lerp(-1.2, -3.6, u), 0, 1.4, 2.35, 0.2, 4.4, { facing: -1, phase: 1, walk: t * 8, walkAmt: u < 1 ? 1 : 0, propR: 'case', armAngleR: -0.4, armAngleL: 0.3, browTension: 0.65 }); }
    [[-5.2, 1.6, 0.5], [-2.2, 1.9, 0.7]].forEach(([x, z, d], i) => { const u = easeOutCubic(seg(t, 0.5 + d * 0.3, 1.8 + d * 0.3)); add('board', lerp(x + 5, x, u), 0, z, 2.3, 0.5 + d * 0.3, 4.4, { facing: 1, phase: 5 + i, walk: t * 8, walkAmt: u < 1 ? 1 : 0, armAngleR: t >= 1.56 ? -1.6 : -0.3, armAngleL: 0.3, browTension: 0.6 }); });
    add('analyst', 3.4, 0, 3.0, 2.3, 0.8, 4.4, { facing: -1, phase: 8, armAngleR: -2.4, armAngleL: 2.3, browTension: 0.9, talk: 0.8 });
    // B: Elon steps out of the ship and holds the key
    { const u = easeInOutCubic(seg(t, 4.7, 5.8)); add('elon', lerp(7.6, 2.2, u), 0, -15.6, 2.38, 4.7, 11.8, { facing: u < 1 ? -1 : 1, phase: 2, walk: t * 8, walkAmt: u > 0 && u < 1 ? 1 : 0, propR: t < 7.2 ? 'key' : null, armAngleR: t < 7.2 ? -1.65 : -1.0, armAngleL: 0.3, browTension: -0.25, talk: 0.7 }); }
    // C: Jensen walks across to the pair, then both are caged
    { const u = easeInOutCubic(seg(t, 11.5, 13.6)); add('jensen', t < 19.18 ? lerp(11.0, 16.4, u) : lerp(16.4, 19.0, easeOutCubic(seg(t, 19.2, 20.0))), 0, t < 19.18 ? -25.8 : lerp(-25.8, -27.0, easeOutCubic(seg(t, 19.2, 20.0))), 2.35, 11.5, undefined, { facing: 1, phase: 3, walk: t * 8, walkAmt: u > 0 && u < 1 ? 1 : 0, armAngleR: t >= 19.18 ? -2.2 : -0.5, armAngleL: t >= 19.18 ? 2.1 : 0.3, browTension: t >= 19.18 ? 0.9 : -0.2 }); }
    add('elon', t < 19.18 ? 23.2 : lerp(23.2, 21.9, easeOutCubic(seg(t, 19.2, 20.0))), 0, t < 19.18 ? -26.8 : lerp(-26.8, -27.0, easeOutCubic(seg(t, 19.2, 20.0))), 2.38, 12.6, undefined, { facing: -1, phase: 12, armAngleR: t >= 19.18 ? -2.3 : -0.5, armAngleL: t >= 19.18 ? 2.0 : 0.3, browTension: t >= 19.18 ? 0.9 : -0.2 });
"""
s = s[:a] + CAST + s[b:]
rep("    { const [x, y] = wb(0, 2.8, 1.1); hitFx(x, y, t, 1.56, { color: PAL.coral, r: 260, rays: 14 }); }",
    "    { const [x, y] = wb(0, 3.6, 1.1); hitFx(x, y, t, 1.56, { color: PAL.coral, r: 300, rays: 16 }); }\n    { const [x, y] = wb(8.2, 0.6, -17.6); hitFx(x, y, t, 4.65, { color: PAL.amberHi, r: 300, rays: 16, core: false }); }\n    { const [x, y] = wb(4.5, 1.2, -16.2); hitFx(x, y, t, 9.24, { color: PAL.amberHi, r: 340, rays: 18 }); }\n    { const [x, y] = wb(20.4, 3.4, -27.4); hitFx(x, y, t, 13.0, { color: PAL.sageHi, r: 300, rays: 16, core: false }); hitFx(x, y, t, 20.7, { color: PAL.coral, r: 320, rays: 18 }); }")

s = s.replace('const k = clamp((vel - 5) / 18, 0, 0.36);', 'const k = clamp((vel - 7) / 22, 0, 0.2);')
open(d + 'act1_part1_jensen_elon_3d-hybrid-v2.html', 'w', encoding='utf8', newline='\n').write(s)
print('ok', s.count('\n'))
