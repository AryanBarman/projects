    // ---- environment: sky dome, soft sun, drifting clouds, distant skyline and hills, pale gridded ground; all follow the camera
    X.floorN.visible = false; X.floorD.visible = false;
    camera.far = 1400; camera.updateProjectionMatrix();
    scene.fog = new THREE.Fog(0xBFE0F2, 320, 1000); scene.background = new THREE.Color(0xC4E3F1);
    hemiLight.color.set(0xffffff); hemiLight.groundColor.set(0xB9CDD6); hemiLight.intensity = 1.0; dirLight.intensity = 0.9; rimLight.intensity = 0.5;
    X.env = new THREE.Group(); scene.add(X.env);
    { // sky dome
      const c = document.createElement('canvas'); c.width = 4; c.height = 256; const g = c.getContext('2d'), gr = g.createLinearGradient(0, 0, 0, 256);
      gr.addColorStop(0, '#1B5FA3'); gr.addColorStop(0.35, '#3F9AD6'); gr.addColorStop(0.55, '#8FCBEA'); gr.addColorStop(0.62, '#C4E3F1'); gr.addColorStop(1, '#C4E3F1'); g.fillStyle = gr; g.fillRect(0, 0, 4, 256);
      X.sky = new THREE.Mesh(new THREE.SphereGeometry(1200, 24, 16), new THREE.MeshBasicMaterial({ map: new THREE.CanvasTexture(c), side: THREE.BackSide, fog: false, depthWrite: false }));
      X.sky.renderOrder = -10; scene.add(X.sky);
    }
    { // richer ground: speckled plaza tiles (6 units per tile so the camera-follow snap never shows)
      const c = document.createElement('canvas'); c.width = c.height = 256; const g = c.getContext('2d');
      g.fillStyle = '#9DB7C1'; g.fillRect(0, 0, 256, 256);
      for (let i = 0; i < 900; i++) { const v = 150 + Math.floor(hash(i * 3 + 7) * 60); g.fillStyle = 'rgba(' + (v - 8) + ',' + v + ',' + (v + 6) + ',0.35)'; g.fillRect(hash(i * 5 + 1) * 256, hash(i * 7 + 2) * 256, 2 + hash(i * 11) * 5, 2 + hash(i * 13) * 5); }
      g.strokeStyle = 'rgba(30,80,100,0.30)'; g.lineWidth = 3; g.strokeRect(1.5, 1.5, 253, 253);
      g.strokeStyle = 'rgba(255,255,255,0.35)'; g.lineWidth = 2; g.strokeRect(5, 5, 246, 246);
      const tex = new THREE.CanvasTexture(c); tex.wrapS = tex.wrapT = THREE.RepeatWrapping; tex.repeat.set(250, 250); tex.anisotropy = 8;
      X.ground = new THREE.Mesh(new THREE.PlaneGeometry(1500, 1500), new THREE.MeshStandardMaterial({ map: tex, roughness: 0.95 }));
      X.ground.rotation.x = -Math.PI / 2; X.ground.receiveShadow = true; scene.add(X.ground);
    }
    { // distant skyline, hills, clouds, sun
      const sk = new THREE.Group(), mk = (w, h, d, col, ang, rad) => { const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), new THREE.MeshBasicMaterial({ color: col })); m.position.set(Math.cos(ang) * rad, h / 2, Math.sin(ang) * rad); m.rotation.y = -ang; sk.add(m); };
      X.bMats = [];
      const winTex = (base, win, cols, rows) => { const wc = document.createElement('canvas'); wc.width = 16 * cols; wc.height = 16 * rows; const wg = wc.getContext('2d'); wg.fillStyle = base; wg.fillRect(0, 0, wc.width, wc.height); for (let r = 0; r < rows; r++) for (let q = 0; q < cols; q++) { wg.fillStyle = hash(r * 31 + q * 17 + cols) > 0.28 ? win : base; wg.fillRect(q * 16 + 4, r * 16 + 4, 8, 9); } const tx = new THREE.CanvasTexture(wc); tx.magFilter = THREE.NearestFilter; return tx; };
      const rings = [{ n: 70, r0: 190, r1: 240, base: '#5C84A0', win: '#BFE0EC', hmax: 46 }, { n: 90, r0: 300, r1: 380, base: '#7497AE', win: '#CFE6EF', hmax: 80 }, { n: 90, r0: 450, r1: 540, base: '#8FB0C3', win: '#DDEEF4', hmax: 110 }];
      rings.forEach((R, ri) => { const tx = winTex(R.base, R.win, 4, 10); for (let i = 0; i < R.n; i++) { const a = i / R.n * TAU + hash(i * 3 + ri) * 0.05, r = R.r0 + hash(i * 7 + 2 + ri) * (R.r1 - R.r0), h = 10 + hash(i * 11 + 3 + ri) * R.hmax * (0.35 + 0.65 * hash(i * 13 + 5 + ri)), w = 9 + hash(i * 5 + 4 + ri) * 16, d = 9 + hash(i * 17 + 5 + ri) * 12;
        const t2 = tx.clone(); t2.needsUpdate = true; t2.wrapS = t2.wrapT = THREE.RepeatWrapping; t2.repeat.set(Math.max(1, Math.round(w / 6)) / 4, Math.max(1, Math.round(h / 7)) / 10);
        const mat = new THREE.MeshBasicMaterial({ map: t2 }); X.bMats.push(mat);
        const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat); m.position.set(Math.cos(a) * r, h / 2, Math.sin(a) * r); m.rotation.y = -a; sk.add(m);
        if (hash(i * 19 + ri) > 0.8) { const sp = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 1.2, 14, 6), new THREE.MeshBasicMaterial({ color: 0x6F8FA0 })); sp.position.set(Math.cos(a) * r, h + 7, Math.sin(a) * r); sk.add(sp); } } });
      for (let i = 0; i < 14; i++) { const a = (i / 14) * TAU + 0.2, m = new THREE.Mesh(new THREE.ConeGeometry(70 + hash(i * 17) * 60, 60 + hash(i * 19) * 70, 5), new THREE.MeshBasicMaterial({ color: 0xA9C6D2 })); m.position.set(Math.cos(a) * 520, 25, Math.sin(a) * 520); sk.add(m); }
      X.sky2 = sk; X.env.add(sk);
      const cc = document.createElement('canvas'); cc.width = cc.height = 128; const cg = cc.getContext('2d'), cr = cg.createRadialGradient(64, 64, 4, 64, 64, 62); cr.addColorStop(0, 'rgba(255,255,255,0.95)'); cr.addColorStop(1, 'rgba(255,255,255,0)'); cg.fillStyle = cr; cg.fillRect(0, 0, 128, 128);
      const ct = new THREE.CanvasTexture(cc); X.clouds = [];
      for (let i = 0; i < 14; i++) { const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: ct, transparent: true, opacity: 0.55 + 0.3 * hash(i * 23), fog: false, depthWrite: false })); const w = 150 + hash(i * 29) * 160; s.scale.set(w, w * 0.32, 1); s.userData = { a: hash(i * 31) * TAU, r: 260 + hash(i * 37) * 340, y: 130 + hash(i * 41) * 120, sp: 0.01 + hash(i * 43) * 0.02 }; X.env.add(s); X.clouds.push(s); }
      const sc2 = document.createElement('canvas'); sc2.width = sc2.height = 128; const sg = sc2.getContext('2d'), sr = sg.createRadialGradient(64, 64, 2, 64, 64, 62); sr.addColorStop(0, 'rgba(255,250,225,1)'); sr.addColorStop(0.25, 'rgba(255,240,190,0.55)'); sr.addColorStop(1, 'rgba(255,240,190,0)'); sg.fillStyle = sr; sg.fillRect(0, 0, 128, 128);
      X.sun = new THREE.Sprite(new THREE.SpriteMaterial({ map: new THREE.CanvasTexture(sc2), transparent: true, fog: false, depthWrite: false })); X.sun.scale.set(330, 330, 1); X.env.add(X.sun);
    }
    { // trees scattered around the winding path, kept clear of every station (static: gives parallax as the camera travels)
      const N = 700, tr = new THREE.InstancedMesh(new THREE.ConeGeometry(2.3, 6.5, 7), new THREE.MeshStandardMaterial({ color: 0x3A8758, roughness: 0.9 }), N), tk = new THREE.InstancedMesh(new THREE.CylinderGeometry(0.35, 0.45, 2.4, 6), new THREE.MeshStandardMaterial({ color: 0x7A5B3F }), N), d = new THREE.Object3D();
      let n = 0;
      for (let i = 0; i < 4000 && n < N; i++) { const x = -150 + hash(i * 3 + 9) * 440, z = 110 - hash(i * 5 + 1) * 380, sc = 0.8 + hash(i * 11 + 2) * 0.9; let ok = true; for (let k = 0; k < LAYOUT.length; k++) { if (Math.hypot(x - LAYOUT[k][0], z - LAYOUT[k][1]) < 34) { ok = false; break; } } if (!ok) continue;
        d.position.set(x, 1.2 * sc + 3.25 * sc, z); d.scale.set(sc, sc, sc); d.updateMatrix(); tr.setMatrixAt(n, d.matrix); d.position.set(x, 1.2 * sc, z); d.updateMatrix(); tk.setMatrixAt(n, d.matrix); n++; }
      tr.count = n; tk.count = n; X.trees = tr; X.trunks = tk; scene.add(tr); scene.add(tk);
    }
    { // ---- per-station SETTINGS: each station gets its own backdrop (office, Washington mall, NVIDIA campus, Texas desert, trading floor) ----
      const SETS = __SETS__; X.setKinds = SETS; X.sets = []; X.setMats = [];
      const ctex = (fn, rep) => { const c = document.createElement('canvas'); c.width = c.height = 256; const g = c.getContext('2d'); fn(g); const t = new THREE.CanvasTexture(c); t.wrapS = t.wrapT = THREE.RepeatWrapping; t.repeat.set(rep, rep); t.anisotropy = 4; return t; };
      const SM = (col, o) => { const m = new THREE.MeshStandardMaterial(Object.assign({ color: col, roughness: 0.9 }, o || {})); X.setMats.push({ m, base: new THREE.Color(m.color) }); return m; };
      const floor = (G, w, d, mat) => { const m = new THREE.Mesh(new THREE.PlaneGeometry(w, d), mat); m.rotation.x = -Math.PI / 2; m.position.set(0, 0.003, 0); m.receiveShadow = true; G.add(m); return m; };
      const B = (G, w, h, d, x, y, z, mat) => { const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat); m.position.set(x, y + h / 2, z); m.castShadow = true; G.add(m); return m; };
      const basic = col => new THREE.MeshBasicMaterial({ color: col });
      const planks = ctex(g => { g.fillStyle = '#B98F62'; g.fillRect(0, 0, 256, 256); for (let i = 0; i < 8; i++) { g.fillStyle = 'rgba(' + (90 + hash(i * 3) * 40) + ',60,30,0.25)'; g.fillRect(0, i * 32, 256, 32); g.fillStyle = 'rgba(40,20,5,0.45)'; g.fillRect(0, i * 32, 256, 2); } }, 14);
      const grass = ctex(g => { g.fillStyle = '#9CCB7E'; g.fillRect(0, 0, 256, 256); for (let i = 0; i < 700; i++) { g.fillStyle = hash(i) > 0.5 ? 'rgba(120,175,90,0.5)' : 'rgba(190,225,150,0.5)'; g.fillRect(hash(i * 3) * 256, hash(i * 7) * 256, 3, 6); } }, 20);
      const sand = ctex(g => { g.fillStyle = '#E3C690'; g.fillRect(0, 0, 256, 256); for (let i = 0; i < 600; i++) { g.fillStyle = hash(i) > 0.5 ? 'rgba(200,160,100,0.45)' : 'rgba(245,225,175,0.5)'; g.fillRect(hash(i * 3) * 256, hash(i * 7) * 256, 2 + hash(i * 11) * 5, 2); } }, 16);
      const grid = ctex(g => { g.fillStyle = '#233650'; g.fillRect(0, 0, 256, 256); g.strokeStyle = 'rgba(120,190,255,0.35)'; g.lineWidth = 3; g.strokeRect(1, 1, 254, 254); g.strokeStyle = 'rgba(120,190,255,0.12)'; g.strokeRect(128, 0, 1, 256); g.strokeRect(0, 128, 256, 1); }, 12);
      const plaza = ctex(g => { g.fillStyle = '#C9CCCB'; g.fillRect(0, 0, 256, 256); g.strokeStyle = 'rgba(80,90,95,0.4)'; g.lineWidth = 3; g.strokeRect(1, 1, 254, 254); }, 14);
      const tree = (G, x, z, s, col) => { B(G, 0.8 * s, 3 * s, 0.8 * s, x, 0, z, SM('#7A5B3F')); const m = new THREE.Mesh(new THREE.SphereGeometry(2.6 * s, 10, 8), SM(col || '#6FB36A')); m.position.set(x, 4.6 * s, z); m.castShadow = true; G.add(m); };
      const winBand = (G, w, h, x, y, z, cols, rows, base, lit) => { B(G, w, h, 0.9, x, y, z, SM(base)); for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) { const m = new THREE.Mesh(new THREE.PlaneGeometry(w / cols * 0.62, h / rows * 0.5), basic(hash(r * 7 + c * 3 + x) > 0.25 ? lit : base)); m.position.set(x - w / 2 + (c + 0.5) * w / cols, y + (r + 0.55) * h / rows, z + 0.5); G.add(m); } };
      const plazaTex2 = ctex(g => { g.fillStyle = '#8FAAB7'; g.fillRect(0, 0, 256, 256); g.fillStyle = 'rgba(255,255,255,0.10)'; g.fillRect(0, 0, 128, 128); g.fillRect(128, 128, 128, 128); g.strokeStyle = 'rgba(30,60,75,0.35)'; g.lineWidth = 3; g.strokeRect(1, 1, 254, 254); }, 10);
      const kinds = {
        plaza: G => { floor(G, 120, 90, SM('#D2D2D2', { map: plazaTex2 })).position.z = 0; const ring = new THREE.Mesh(new THREE.RingGeometry(15, 17.5, 48), SM('#E2B857')); ring.rotation.x = -Math.PI / 2; ring.position.set(0, 0.01, 0); G.add(ring);
          const ring2 = new THREE.Mesh(new THREE.RingGeometry(8, 8.6, 48), SM('#76B900')); ring2.rotation.x = -Math.PI / 2; ring2.position.set(0, 0.011, 0); G.add(ring2);
          [-30, 30].forEach(x => [-14, 14].forEach(z => { B(G, 0.4, 9, 0.4, x, 0, z, SM('#4A5A66')); const l = new THREE.Mesh(new THREE.SphereGeometry(0.9, 10, 8), basic('#FFF1B8')); l.position.set(x, 9.6, z); G.add(l); }));
          [-22, 0, 22].forEach(x => { B(G, 6, 0.7, 1.6, x, 0.9, -20, SM('#8A6A4A')); B(G, 6, 1.6, 0.4, x, 1.6, -20.8, SM('#8A6A4A')); B(G, 0.4, 0.9, 1.4, x - 2.7, 0, -20, SM('#4A5A66')); B(G, 0.4, 0.9, 1.4, x + 2.7, 0, -20, SM('#4A5A66')); });
          [-36, -11, 11, 36].forEach(x => { B(G, 2.4, 1.6, 2.4, x, 0, -14, SM('#C98B5A')); const m = new THREE.Mesh(new THREE.SphereGeometry(2, 10, 8), SM('#4FA36A')); m.position.set(x, 3.6, -14); G.add(m); }); },
        office: G => { floor(G, 90, 60, SM('#D2D2D2', { map: planks })).position.z = 6; B(G, 64, 7, 0.8, 0, 0, -22, SM('#8A6A4A')); B(G, 64, 13, 0.8, 0, 7, -22, SM('#E4D8C2'));
          for (let i = -2; i <= 2; i++) { B(G, 9, 8, 0.4, i * 15, 8, -21.4, basic('#BFE3F2')); B(G, 9.6, 0.5, 0.6, i * 15, 7.7, -21.2, SM('#F4F1EA')); B(G, 0.5, 8.6, 0.6, i * 15 + 7.5, 7.8, -21.2, SM('#F4F1EA')); }
          B(G, 64, 0.5, 0.9, 0, 19.6, -21.8, SM('#76B900')); B(G, 36, 0.06, 18, 0, 0, 2, SM('#6B7F8F')); [-40, 40].forEach(x => { B(G, 1.6, 1.4, 1.6, x, 0, -18, SM('#C9A27A')); const m = new THREE.Mesh(new THREE.SphereGeometry(1.7, 10, 8), SM('#5FA86A')); m.position.set(x, 3.2, -18); G.add(m); }); },
        mall: G => { floor(G, 140, 100, SM('#D2D2D2', { map: grass })).position.z = -6; B(G, 70, 0.06, 6, 0, 0, 6, SM('#E7E2D2')); B(G, 120, 0.05, 7, 0, 0, -17, basic('#8FCBE6')); B(G, 120, 0.4, 1, 0, 0, -20.7, SM('#E7E2D2'));
          B(G, 4, 46, 4, 0, 0, -48, SM('#F2EFE6')); const pyr = new THREE.Mesh(new THREE.ConeGeometry(3.4, 6, 4), SM('#F2EFE6')); pyr.position.set(0, 49, -48); pyr.rotation.y = Math.PI / 4; G.add(pyr);
          for (let i = -4; i <= 4; i++) { if (i === 0) continue; tree(G, i * 11, -26, 1.1, i % 2 ? '#F0A9BE' : '#EDBBC8'); }
          [-34, 34].forEach(x => { B(G, 0.3, 9, 0.3, x, 0, 4, SM('#B8BDC2')); B(G, 3, 1.8, 0.1, x + 1.6, 7, 4, SM('#2C5BA8')); B(G, 3, 0.4, 0.12, x + 1.6, 6.2, 4, SM('#D94E43')); }); },
        campus: G => { floor(G, 130, 90, SM('#D2D2D2', { map: plaza })).position.z = 0; B(G, 130, 0.06, 18, 0, 0, 16, SM('#9CCB7E')); B(G, 130, 0.06, 20, 0, 0, -30, SM('#9CCB7E'));
          winBand(G, 22, 20, -26, 0, -16, 5, 5, '#86B7C2', '#D5F2F6'); winBand(G, 26, 30, 0, 0, -20, 6, 7, '#6FA3B0', '#D5F2F6'); winBand(G, 20, 16, 28, 0, -16, 4, 4, '#86B7C2', '#D5F2F6');
          B(G, 26.4, 1, 1, 0, 30, -19.4, SM('#76B900')); B(G, 22.2, 0.8, 1, -26, 20, -15.4, SM('#76B900')); for (let i = -5; i <= 5; i++) tree(G, i * 12, -34, 0.9, '#6FB36A'); },
        texas: G => { floor(G, 160, 120, SM('#D2D2D2', { map: sand })).position.z = -6; [[-40, 26, 12], [-8, 34, 16], [30, 22, 10], [60, 30, 14]].forEach(([x, h, w], i) => { B(G, w * 2, h, 10, x, 0, -50 - i * 3, SM('#C98B5A')); B(G, w * 2 + 1, 2.4, 11, x, h * 0.45, -50 - i * 3, SM('#E0A26E')); B(G, w * 1.6, 2, 9, x, h, -50 - i * 3, SM('#D8955F')); });
          for (let i = 0; i < 9; i++) { const x = -42 + i * 11 + hash(i) * 4, z = -26 - hash(i * 3) * 8; B(G, 0.9, 5, 0.9, x, 0, z, SM('#6E9B5A')); B(G, 2.2, 0.8, 0.8, x - 1.4, 2.4, z, SM('#6E9B5A')); B(G, 0.8, 2, 0.8, x - 2.4, 2.4, z, SM('#6E9B5A')); }
          for (let i = 0; i < 6; i++) { const x = -50 + i * 20; B(G, 0.4, 16, 0.4, x, 0, -46, SM('#6B5238')); B(G, 6, 0.3, 0.3, x, 14, -46, SM('#6B5238')); } },
        market: G => { floor(G, 100, 70, SM('#D2D2D2', { map: grid })).position.z = 4; B(G, 64, 20, 0.8, 0, 0, -22, SM('#16212E'));
          for (let r = 0; r < 2; r++) for (let c = 0; c < 4; c++) { const x = -27 + c * 18, y = 2 + r * 9; B(G, 15, 8, 0.3, x, y, -21.4, basic('#0B141D')); for (let k = 0; k < 9; k++) { const v = hash(r * 50 + c * 9 + k) - 0.45, hh0 = 0.5 + Math.abs(v) * 4.5, bm = B(G, 0.8, hh0, 0.2, x - 6.4 + k * 1.5, y + 0.8, -21.2, basic(v > 0 ? '#3FD08B' : '#F0604F')); (X.anim = X.anim || []).push({ m: bm, h: hh0, y0: y + 0.8, ph: r * 3 + c * 1.7 + k * 0.9, sp: 1.2 + 0.3 * (k % 3) }); } } }
      };
      LAYOUT.forEach((L, k) => { const kind = SETS[k] || 'plaza', G = new THREE.Group(); if (kinds[kind]) kinds[kind](G); G.position.set(L[0], 0, L[1]); scene.add(G); X.sets.push(G); });
      X.animate = function (t) { (X.anim || []).forEach(o => { const hh = o.h * (0.55 + 0.55 * Math.abs(Math.sin(t * o.sp + o.ph))); o.m.scale.y = hh / o.h; o.m.position.y = o.y0 + hh / 2; }); };
      const WALK = { office: ['employee', 'banker', 'compliance'], mall: ['employee', 'journalist', 'employee'], campus: ['employee', 'engineer', 'employee', 'engineer'], market: ['trader', 'trader', 'banker'], texas: ['factory', 'supply', 'factory'], plaza: ['employee', 'journalist', 'banker'] };
      X.curSet = 0;
      X.ambientCast = function (t) {
        const kind = SETS[X.curSet] || 'plaza', L = LAYOUT[X.curSet] || [0, 0], roles = WALK[kind] || WALK.plaza;
        roles.forEach((role, k) => { const sp = 2.1 + 0.5 * (k % 3), span = 70, u = ((t * sp + k * 23.0) % span), dir = k % 2 ? -1 : 1, lx = dir > 0 ? -35 + u : 35 - u, lz = -14.5 - 1.6 * k;
          CAST.push({ role, wx: L[0] + lx, wy: 0, wz: L[1] + lz, h: 2.2, t0: 0, t1: 1e9, o: { pose: 'walk', facing: dir, phase: k * 1.3, walkAmt: 1 } }); });
      };
      X.applySets = function (m) { let bi = 0, bd = 1e9; const dr = camera.getWorldDirection(new THREE.Vector3()), fx = camera.position.x + dr.x * 22, fz = camera.position.z + dr.z * 22; LAYOUT.forEach((L, k) => { const d = Math.hypot(fx - L[0], fz - L[1]); if (d < bd) { bd = d; bi = k; } }); X.sets.forEach((g, k) => g.visible = k === bi);
        X.curSet = bi; const kind = SETS[bi] || 'plaza'; X.trees.visible = X.trunks.visible = (kind === 'plaza' || kind === 'mall' || kind === 'campus'); X.sky2.visible = !(kind === 'office' || kind === 'market' || kind === 'texas');
        X.setMats.forEach(s => { s.m.color.setRGB(s.base.r * m.t[0], s.base.g * m.t[1], s.base.b * m.t[2]); if (!s.sat) { s.sat = 1; satBoost(s.base, 1.35); } }); };
    }
    // ---- world layer: pooled meshes driven each frame by the scene code
    X.world = new THREE.Group(); scene.add(X.world);
    X.uBox = THREE.RoundedBoxGeometry ? new THREE.RoundedBoxGeometry(1, 1, 1, 3, 0.09) : new THREE.BoxGeometry(1, 1, 1);
    X.uEdge = new THREE.EdgesGeometry(new THREE.BoxGeometry(1, 1, 1)); X.uCyl = new THREE.CylinderGeometry(1, 1, 1, 18); X.uPlane = new THREE.PlaneGeometry(1, 1);
  }

  // =========================================================================
  // WORLD SHIM: the canvas scene API (Box / Cyl / Label / Panel / Char / groundPoly / groundPath / Line3) drawn as real 3D
  // =========================================================================
  const eBack = u => { const c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * Math.pow(u - 1, 3) + c1 * Math.pow(u - 1, 2); };
  const eIn = u => u * u * u;
  let GROUND = [], ITEMS = [], OVER = [], CAST = [];
  const POOL = { box: [], cyl: [], label: [], panel: [], poly: [], seg: [] }, CNT = { box: 0, cyl: 0, label: 0, panel: 0, poly: 0, seg: 0 };
  const LBL = new Map(), NEARCULL = 9;
  function grab(type, make) { const p = POOL[type]; let o = p[CNT[type]]; if (!o) { o = make(); X.world.add(o.m); p.push(o); } CNT[type]++; o.m.visible = true; return o; }
  function setCol(mat, col, em, a) { mat.color.set(col); if (mat.emissive) { mat.emissive.set(col); mat.emissiveIntensity = (em || 0) * 0.8; } const tr = a < 1; mat.opacity = a; if (mat.transparent !== tr) { mat.transparent = tr; mat.depthWrite = !tr; mat.needsUpdate = true; } }
  function paleCol(c) { const n = parseInt(String(c).replace('#', ''), 16) || 0, r = n >> 16 & 255, g = n >> 8 & 255, b = n & 255; if (r + g + b > 330) return c; const f = 0.3; return 'rgb(' + Math.round(r + (255 - r) * f) + ',' + Math.round(g + (255 - g) * f) + ',' + Math.round(b + (255 - b) * f) + ')'; }
  function Box(x, y0, z, w, h, d, col, o) {
    o = o || {}; if (h <= 0.001 || (o.a !== undefined && o.a <= 0.02)) return; const P = mp(x, y0 + h / 2, z), a = o.a === undefined ? 1 : o.a;
    const e = grab('box', () => { const m = new THREE.Mesh(X.uBox, new THREE.MeshStandardMaterial({ roughness: 0.5, metalness: 0.15 })); m.castShadow = true; m.receiveShadow = true; const l = new THREE.LineSegments(X.uEdge, new THREE.LineBasicMaterial({ color: 0x071318, transparent: true, opacity: 0.55 })); m.add(l); return { m, l }; });
    e.m.position.set(P[0], P[1], P[2]); e.m.scale.set(w, h, d); setCol(e.m.material, col, o.emis, a); e.l.visible = o.lw !== 0;
    if (e.m.position.distanceTo(camera.position) < NEARCULL) e.m.visible = false;
  }
  function Cyl(x, y0, z, r, h, col, o) {
    o = o || {}; if (h <= 0.001 || (o.a !== undefined && o.a <= 0.02)) return; const P = mp(x, y0 + h / 2, z), a = o.a === undefined ? 1 : o.a;
    const e = grab('cyl', () => { const m = new THREE.Mesh(X.uCyl, new THREE.MeshStandardMaterial({ roughness: 0.45, metalness: 0.25 })); m.castShadow = true; m.receiveShadow = true; return { m }; });
    e.m.position.set(P[0], P[1], P[2]); e.m.scale.set(r, h, r); setCol(e.m.material, col, o.emis, a);
    if (e.m.position.distanceTo(camera.position) < NEARCULL) e.m.visible = false;
  }
  function labelTex(text, w, h, bg, fg, line) {
    const key = text + '|' + w + '|' + h + '|' + bg + '|' + fg + '|' + line; let t = LBL.get(key); if (t) return t;
    const cw = Math.max(256, Math.min(1024, Math.round(w * 120))), ch = Math.max(64, Math.round(cw * h / w)), c = document.createElement('canvas'); c.width = cw; c.height = ch; const g = c.getContext('2d');
    if (bg) { g.fillStyle = bg; g.strokeStyle = line || '#0B161C'; g.lineWidth = Math.max(2, ch * 0.06); g.beginPath(); g.roundRect(g.lineWidth / 2, g.lineWidth / 2, cw - g.lineWidth, ch - g.lineWidth, ch * 0.18); g.fill(); g.stroke(); }
    g.fillStyle = fg; g.textAlign = 'center'; g.textBaseline = 'middle'; let sz = ch * 0.62; const fam = ' system-ui, "Segoe UI", sans-serif'; g.font = '900 ' + sz + 'px' + fam; while (g.measureText(text).width > cw * 0.86 && sz > 8) { sz *= 0.93; g.font = '900 ' + sz + 'px' + fam; }
    g.fillText(text, cw / 2, ch / 2 + ch * 0.03); t = new THREE.CanvasTexture(c); t.anisotropy = 4; LBL.set(key, t); return t;
  }
  function billboard(m, rot) { m.quaternion.copy(camera.quaternion); if (rot) m.rotateZ(-rot); }
  // ---- frame-fit log (read by tools/jb/fitcheck.js): screen rect of every label / panel / character this frame
  const _fv = new THREE.Vector3(), _fr = new THREE.Vector3(), _fu = new THREE.Vector3();
  function fitProj(x, y, z) { _fv.set(x, y, z).project(camera); return [(_fv.x * 0.5 + 0.5) * 1920, (-_fv.y * 0.5 + 0.5) * 1080, _fv.z]; }
  function fitRec(name, kind, m) {
    if (!window.__FITON || m.material.opacity < 0.3) return; camera.updateMatrixWorld();
    _fr.setFromMatrixColumn(camera.matrixWorld, 0); _fu.setFromMatrixColumn(camera.matrixWorld, 1);
    const hw = m.scale.x / 2, hh = m.scale.y / 2, c = m.position, xs = [], ys = []; let behind = false;
    [[-1, -1], [1, -1], [1, 1], [-1, 1]].forEach(q => { const px = c.x + _fr.x * hw * q[0] + _fu.x * hh * q[1], py = c.y + _fr.y * hw * q[0] + _fu.y * hh * q[1], pz = c.z + _fr.z * hw * q[0] + _fu.z * hh * q[1], r = fitProj(px, py, pz); if (r[2] > 1) behind = true; xs.push(r[0]); ys.push(r[1]); });
    if (behind) return; (window.__FIT = window.__FIT || []).push({ name: String(name || kind).slice(0, 40), kind, x0: Math.min(...xs), x1: Math.max(...xs), y0: Math.min(...ys), y1: Math.max(...ys) });
  }
  // ---- automatic label layout (see tools/jb/add_nudge.py)
  const _NR = [], NZ_HEAD = { x0: 0, x1: 670, y0: 0, y1: 205 }, NZ_CAP = { x0: 330, x1: 1590, y0: 875, y1: 1045 }, _nr1 = new THREE.Vector3(), _nu1 = new THREE.Vector3();
  function nudge(m) {
    if (window.__NONUDGE) return; camera.updateMatrixWorld(); _nr1.setFromMatrixColumn(camera.matrixWorld, 0); _nu1.setFromMatrixColumn(camera.matrixWorld, 1);
    const hw = m.scale.x / 2, hh = m.scale.y / 2, c = m.position, xs = [], ys = []; let behind = false;
    [[-1, -1], [1, -1], [1, 1], [-1, 1]].forEach(q => { const r = fitProj(c.x + _nr1.x * hw * q[0] + _nu1.x * hh * q[1], c.y + _nr1.y * hw * q[0] + _nu1.y * hh * q[1], c.z + _nr1.z * hw * q[0] + _nu1.z * hh * q[1]); if (r[2] > 1) behind = true; xs.push(r[0]); ys.push(r[1]); });
    if (behind) return; let x0 = Math.min(...xs), x1 = Math.max(...xs), y0 = Math.min(...ys), y1 = Math.max(...ys); const w = x1 - x0, h = y1 - y0; if (w > 1800 || h > 1000) return;
    if (x1 < -200 || x0 > 2120 || y1 < -200 || y0 > 1280) return;                         // far off screen: not on screen, leave alone
    let dx = 0, dy = 0; const ov = (a, b) => [Math.min(a.x1, b.x1) - Math.max(a.x0, b.x0), Math.min(a.y1, b.y1) - Math.max(a.y0, b.y0)];
    const rc = () => ({ x0: x0 + dx, x1: x1 + dx, y0: y0 + dy, y1: y1 + dy });
    for (let pass = 0; pass < 3; pass++) {                                                  // label-on-label first, then the fixed zones (so zones always win)
      let R = rc(), ox, oy;
      _NR.forEach(o => { [ox, oy] = ov(R, o); if (ox > 6 && oy > 6) { const small = Math.min(w * h, (o.x1 - o.x0) * (o.y1 - o.y0)); if (ox * oy / small > 0.22) { const up = (R.y0 + R.y1) / 2 < (o.y0 + o.y1) / 2; dy += (up ? -1 : 1) * (oy + 6); R = rc(); } } });
      [ox, oy] = ov(R, NZ_HEAD); if (ox > 0 && oy > 0) { const dn = oy + 10, rt = ox + 10; if (dn <= rt * 1.6) dy += dn; else dx += rt; R = rc(); }
      [ox, oy] = ov(R, NZ_CAP); if (ox > 0 && oy > 0) { dy -= (R.y1 - NZ_CAP.y0) + 10; R = rc(); }
      if (R.x0 < 30) dx += 30 - R.x0; if (R.x1 > 1890) dx -= R.x1 - 1890; if (R.y0 < 24) dy += 24 - R.y0; if (R.y1 > 1056) dy -= R.y1 - 1056;
    }
    dx = Math.max(-520, Math.min(520, dx)); dy = Math.max(-520, Math.min(520, dy));
    if (dx || dy) { const dist = camera.position.distanceTo(m.position), ppu = 540 / (dist * Math.tan(camera.fov * Math.PI / 360)); m.position.addScaledVector(_nr1, dx / ppu); m.position.addScaledVector(_nu1, -dy / ppu); }
    _NR.push({ x0: x0 + dx, x1: x1 + dx, y0: y0 + dy, y1: y1 + dy });
  }
  function Label(text, x, y, z, w, h, bg, fg, o) {
    o = o || {}; const sc = o.sc === undefined ? 1 : o.sc; if (sc <= 0.02 || (o.a !== undefined && o.a <= 0.02)) return; const P = mp(x, y, z);
    const e = grab('label', () => { const m = new THREE.Mesh(X.uPlane, new THREE.MeshBasicMaterial({ transparent: true, depthTest: false, fog: false, toneMapped: false })); m.renderOrder = 20; return { m }; });
    e.m.material.map = labelTex(text, w, h, bg, fg, o.line); e.m.material.opacity = o.a === undefined ? 1 : o.a; e.m.position.set(P[0], P[1], P[2]); e.m.scale.set(w * sc, h * sc, 1); billboard(e.m, o.rot); nudge(e.m); fitRec(text, 'label', e.m);
  }
  function Panel(x, y, z, w, h, paint, o) {
    o = o || {}; const sx = o.sx === undefined ? 1 : o.sx, sy = o.sy === undefined ? 1 : o.sy; if (sx <= 0.02 || sy <= 0.02) return; const P = mp(x, y, z);
    const cw = o.cw || 512, ch = Math.max(64, Math.min(1024, Math.round(cw * h / w)));
    const e = grab('panel', () => { const c = document.createElement('canvas'); const tex = new THREE.CanvasTexture(c); const m = new THREE.Mesh(X.uPlane, new THREE.MeshBasicMaterial({ map: tex, transparent: true, depthTest: false, fog: false, toneMapped: false })); m.renderOrder = 19; return { m, c, tex }; });
    if (e.c.width !== cw || e.c.height !== ch) { e.c.width = cw; e.c.height = ch; } const g = e.c.getContext('2d'); g.clearRect(0, 0, cw, ch); g.save(); paint(g, cw, ch); g.restore(); e.tex.needsUpdate = true;
    e.m.material.opacity = o.a === undefined ? 1 : o.a; e.m.position.set(P[0], P[1], P[2]); e.m.scale.set(w * sx, h * sy, 1); billboard(e.m, o.rot); nudge(e.m); fitRec(window.__fitName || 'panel', 'panel', e.m); window.__fitName = null;
  }
  function satBoost(c, k) { const h = {}; c.getHSL(h); c.setHSL(h.h, Math.min(1, h.s * k), h.l); return c; }
  const STAGE = { plaza: '#4C86B8', office: '#4468A8', mall: '#D6B97A', campus: '#4F94AE', texas: '#D6954F', market: '#27518A' };
  function stageCol(fill, pts) { const k = new THREE.Color(paleCol(fill)), h = {}; k.getHSL(h); if (h.s < 0.3 && h.l > 0.45 && X.setKinds) return new THREE.Color(STAGE[X.setKinds[stIdx(pts[0][0])]] || STAGE.plaza); return deepCol(paleCol(fill)); }
  function deepCol(c) { const k = new THREE.Color(c), h = {}; k.getHSL(h); k.setHSL(h.h, Math.min(1, h.s * 1.35 + 0.04), Math.max(0.2, h.l * 0.86)); return k; }
  function groundPoly(pts, y, fill, stroke, lw, a) {
    if (!pts.length) return; const P0 = mp(pts[0][0], y, pts[0][1]), c = STN.length ? STN[stIdx(pts[0][0])].c : 0, zo = P0[2] - pts[0][1], ox = P0[0] - pts[0][0] + c; a = a === undefined ? 1 : a; if (a <= 0.02) return;
    const key = JSON.stringify(pts) + y;
    const e = grab('poly', () => { const g = new THREE.Group(); return { m: g, key: '' }; });
    if (e.key !== key) {
      while (e.m.children.length) { const ch = e.m.children[0]; e.m.remove(ch); if (ch.geometry) ch.geometry.dispose(); }
      const sh = new THREE.Shape(); pts.forEach((p, i) => i ? sh.lineTo(p[0] - c + ox, -(p[1] + zo)) : sh.moveTo(p[0] - c + ox, -(p[1] + zo)));
      const f = new THREE.Mesh(new THREE.ShapeGeometry(sh), new THREE.MeshBasicMaterial({ transparent: true, side: THREE.DoubleSide })); f.rotation.x = -Math.PI / 2; f.position.y = y + 0.02; f.receiveShadow = false; e.m.add(f);
      const ln = new THREE.LineLoop(new THREE.BufferGeometry().setFromPoints(pts.map(p => new THREE.Vector3(p[0] - c + ox, y + 0.05, p[1] + zo))), new THREE.LineBasicMaterial({ transparent: true })); e.m.add(ln); e.key = key;
    }
    const f = e.m.children[0], ln = e.m.children[1]; f.visible = !!fill; if (fill) { f.material.color.set(stageCol(fill, pts)); f.material.opacity = Math.min(1, a); } ln.visible = !!stroke; if (stroke) { ln.material.color.set(stroke); ln.material.opacity = Math.min(1, a); }
  }
  function segMesh() { return grab('seg', () => ({ m: new THREE.Mesh(X.uBox, new THREE.MeshBasicMaterial()) })); }
  function groundPath(pts, y, stroke, lw, frac) {
    let total = 0; const L = []; for (let i = 0; i < pts.length - 1; i++) { const d = Math.hypot(pts[i + 1][0] - pts[i][0], pts[i + 1][1] - pts[i][1]); L.push(d); total += d; } let left = total * frac;
    for (let i = 0; i < pts.length - 1 && left > 0; i++) {
      const u = Math.min(1, left / L[i]); left -= L[i]; const A = mp(pts[i][0], y, pts[i][1]), B = mp(pts[i][0] + (pts[i + 1][0] - pts[i][0]) * u, y, pts[i][1] + (pts[i + 1][1] - pts[i][1]) * u);
      const dx = B[0] - A[0], dz = B[2] - A[2], len = Math.hypot(dx, dz); if (len < 0.01 || len > 500) continue;
      const e = segMesh(); e.m.position.set((A[0] + B[0]) / 2, y + 0.06, (A[2] + B[2]) / 2); e.m.scale.set(len, 0.08, Math.max(0.12, lw * 0.045)); e.m.rotation.set(0, -Math.atan2(dz, dx), 0); e.m.material.color.set(stroke);
    }
  }
  function Line3(a, b, col, lw, al) {
    const A = mp(a[0], a[1], a[2]), B = mp(b[0], b[1], b[2]), dx = B[0] - A[0], dy = B[1] - A[1], dz = B[2] - A[2], len = Math.hypot(dx, dy, dz); if (len < 0.01) return;
    const e = grab('seg', () => ({ m: new THREE.Mesh(X.uBox, new THREE.MeshBasicMaterial()) })); e.m.position.set((A[0] + B[0]) / 2, (A[1] + B[1]) / 2, (A[2] + B[2]) / 2);
    e.m.quaternion.setFromUnitVectors(new THREE.Vector3(1, 0, 0), new THREE.Vector3(dx, dy, dz).normalize()); const th = Math.max(0.06, lw * 0.022); e.m.scale.set(len, th, th); e.m.material.color.set(col);
  }

  // =========================================================================
  // CARDS: world-anchored documents, stamps, tags and counters painted into Panel textures (paper grain, spring entrance,
  // masked headline reveal, highlighter sweep, ink-stamp slam). Same call style as Label: all timing is a pure function of t.
  const PAPER = (() => { const c = document.createElement('canvas'); c.width = c.height = 96; const g = c.getContext('2d'), d = g.createImageData(96, 96); for (let i = 0; i < d.data.length; i += 4) { const v = 215 + hash(i * 7 + 3) * 40 | 0; d.data[i] = v; d.data[i + 1] = v - 5; d.data[i + 2] = v - 16; d.data[i + 3] = 46; } g.putImageData(d, 0, 0); return c; })();
  const springOut = u => { u = Math.max(0, Math.min(1, u)); return 1 + 2.2 * Math.pow(u - 1, 3) + 1.2 * Math.pow(u - 1, 2); };
  const FAM = ' system-ui, "Segoe UI", Arial, sans-serif', SERIF = 'Georgia, "Times New Roman", serif';
  function fitPx(g, text, weight, fam, maxW, px) { g.font = weight + ' ' + px + 'px' + fam; const w = g.measureText(text).width; return w > maxW ? Math.max(8, px * maxW / w) : px; }
  function rrect(g, x, y, w, h, r) { g.beginPath(); g.moveTo(x + r, y); g.arcTo(x + w, y, x + w, y + h, r); g.arcTo(x + w, y + h, x, y + h, r); g.arcTo(x, y + h, x, y, r); g.arcTo(x, y, x + w, y, r); g.closePath(); }
  // o: kind 'doc' | 'stamp' | 'tag' | 'counter'; t0 (appear), t1 (fade out, 0 = stay); doc: tag, head, lines[], hl (line index), dark;
  //    stamp/tag/counter: text, bg, fg, accent; counter: sub; rot (deg)
  function Card(x, y, z, w, h, o, t) {
    window.__fitName = (o.text || o.head || o.tag || o.kind || 'card');
    const t0 = o.t0 || 0, u = t - t0; if (u < 0) return; const t1 = o.t1 || 0, out = t1 ? 1 - Math.max(0, Math.min(1, (t - t1) / 0.35)) : 1; if (out <= 0.01) return;
    const kind = o.kind || 'tag', slam = kind === 'stamp', en = slam ? 1 + 0.35 * Math.pow(Math.max(0, 1 - u / 0.16), 2) : springOut(u / 0.45), sc = slam ? en : Math.max(0.05, en);
    const shake = slam && u < 0.3 ? Math.sin(u * 90) * 0.012 * (1 - u / 0.3) : 0, bob = kind === 'doc' ? Math.sin(u * 1.5) * 0.07 : 0, rot = ((o.rot !== undefined ? o.rot : slam ? -4 : 0) * Math.PI) / 180 + shake;
    const a = Math.min(1, u / (slam ? 0.08 : 0.15)) * out, pul = (o.pulse || []).reduce((q, pt) => t >= pt ? q + 0.12 * Math.exp(-(t - pt) * 9) : q, 0);
    const paint = (g, pw, ph) => {
      const m = pw * 0.035;
      if (kind === 'doc') {
        const dark = !!o.dark, bx = m, by = m, bw = pw - 2 * m, bh = ph - 2 * m;
        g.save(); g.shadowColor = 'rgba(11,25,30,0.38)'; g.shadowBlur = pw * 0.03; g.shadowOffsetX = pw * 0.008; g.shadowOffsetY = pw * 0.016; rrect(g, bx, by, bw, bh, pw * 0.016); g.fillStyle = dark ? '#16262D' : '#FAF7F0'; g.fill(); g.restore();
        rrect(g, bx, by, bw, bh, pw * 0.016); g.save(); g.clip(); g.fillStyle = g.createPattern(PAPER, 'repeat'); g.globalAlpha = dark ? 0.35 : 1; g.fillRect(bx, by, bw, bh); g.restore();
        g.lineWidth = pw * 0.004; g.strokeStyle = dark ? 'rgba(235,193,107,0.4)' : 'rgba(21,25,29,0.22)'; rrect(g, bx, by, bw, bh, pw * 0.016); g.stroke();
        if (o.quote) { g.fillStyle = 'rgba(217,155,38,0.38)'; g.font = '900 ' + bh * 0.6 + 'px ' + SERIF; g.textAlign = 'left'; g.textBaseline = 'alphabetic'; g.fillText('\u201C', bx + bw * 0.03, by + bh * 0.52); }
        const pad = bw * 0.06, X0 = bx + pad, tw = bw - 2 * pad, fs = bh * 0.1;
        if (o.tag) { g.font = '800 ' + fs * 0.62 + 'px' + FAM; const tgw = g.measureText(o.tag.toUpperCase()).width + fs * 0.9; g.fillStyle = o.accent || '#D11F2A'; rrect(g, X0, by + bh * 0.07, tgw, fs * 0.95, fs * 0.2); g.fill(); g.fillStyle = '#FAF7F0'; g.textAlign = 'left'; g.textBaseline = 'middle'; g.fillText(o.tag.toUpperCase(), X0 + fs * 0.45, by + bh * 0.07 + fs * 0.5); }
        g.strokeStyle = dark ? 'rgba(244,241,234,0.2)' : 'rgba(21,25,29,0.16)'; g.lineWidth = pw * 0.003; g.beginPath(); g.moveTo(X0, by + bh * 0.07 + fs * 1.25); g.lineTo(X0 + tw, by + bh * 0.07 + fs * 1.25); g.stroke();
        const hp = o.typeHead ? 1 : Math.max(0, Math.min(1, (u - 0.12) / 0.4)), hs = fitPx(g, o.head || '', '900', ' ' + SERIF.replace(/^/, ''), tw, fs * 1.55), hy = by + bh * 0.07 + fs * 2.6, cps = o.cps || 26, hn = Math.floor(Math.max(0, u - 0.15) * cps), headTxt = o.typeHead ? (o.head || '').slice(0, hn) + ((hn < (o.head || '').length || u < 0.15 + (o.head || '').length / cps + 0.9) && Math.floor(u * 3) % 2 === 0 ? '\u258C' : '') : (o.head || '');
        g.save(); g.beginPath(); g.rect(X0 - 4, hy - hs, (tw + 8) * hp, hs * 1.4); g.clip(); g.fillStyle = dark ? '#F4F1EA' : '#15191D'; g.font = '900 ' + hs + 'px ' + SERIF; g.textAlign = 'left'; g.textBaseline = 'alphabetic'; g.fillText(headTxt, X0, hy); g.restore();
        (o.lines || []).forEach((ln, i) => {
          const LFAM = o.serif ? ' ' + SERIF : FAM, ly = hy + fs * 1.6 + i * fs * 1.45, st = o.lineAt ? o.lineAt[i] - t0 : 0.3 + i * 0.12, la = o.type ? (u >= st ? 1 : 0) : Math.max(0, Math.min(1, (u - st) / 0.3)), isH = i === o.hl, ps = fitPx(g, ln, isH ? '800' : '500', LFAM, tw - 12, fs * 0.95), nn = Math.floor(Math.max(0, u - st) * cps), last = i === (o.lines || []).length - 1, caret = o.type && u >= st && (nn < ln.length || (last && u - st - ln.length / cps < 1.4)) && Math.floor(u * 3) % 2 === 0;
          g.save(); g.globalAlpha = la; g.font = (isH ? '800 ' : '500 ') + ps + 'px' + LFAM; const lw = g.measureText(ln).width;
          if (isH) { const hh = Math.max(0, Math.min(1, (u - (o.hlAt || 0.7)) / 0.35)), e = 1 - Math.pow(1 - hh, 3); if (o.hlWord && ln.indexOf(o.hlWord) >= 0) { const wi = ln.indexOf(o.hlWord), wx = g.measureText(ln.slice(0, wi)).width, ww = g.measureText(o.hlWord).width; g.fillStyle = 'rgba(217,78,67,0.6)'; rrect(g, X0 + wx - 5, ly - ps * 0.98, (ww + 10) * e, ps * 1.3, ps * 0.2); g.fill(); g.strokeStyle = '#D94E43'; g.lineWidth = ps * 0.09; g.beginPath(); g.moveTo(X0 + wx - 5, ly + ps * 0.34); g.lineTo(X0 + wx - 5 + (ww + 10) * e, ly + ps * 0.34); g.stroke(); } else { g.fillStyle = dark ? 'rgba(217,155,38,0.5)' : 'rgba(255,214,10,0.72)'; rrect(g, X0 - 6, ly - ps * 0.95, (lw + 12) * e, ps * 1.25, ps * 0.2); g.fill(); } }
          g.fillStyle = isH ? (dark ? '#FFF3D1' : '#0B191E') : (dark ? 'rgba(244,241,234,0.78)' : 'rgba(21,25,29,0.78)'); g.textAlign = 'left'; g.textBaseline = 'alphabetic'; g.fillText(o.type ? ln.slice(0, nn) + (caret ? '\u258C' : '') : ln, X0, ly); g.restore();
        });
      } else if (kind === 'paint') { o.paint(g, pw, ph, u, t);
      } else if (kind === 'stamp') {   // solid colour block, white text, soft shadow, NO hairline border, generous padding
        const col = o.bg || '#D94E43', bw = pw - 2 * m, bh = ph - 2 * m;
        g.save(); g.translate(pw / 2, ph / 2); g.shadowColor = 'rgba(11,25,30,0.4)'; g.shadowBlur = pw * 0.03; g.shadowOffsetY = pw * 0.012; rrect(g, -bw / 2, -bh / 2, bw, bh, ph * 0.2); g.fillStyle = col; g.fill(); g.shadowColor = 'transparent';
        g.fillStyle = o.fg || '#FFFFFF'; g.textAlign = 'center'; g.textBaseline = 'middle'; const px = fitPx(g, o.text, '900', FAM, bw * 0.68, ph * 0.44); g.font = '900 ' + px + 'px' + FAM; g.fillText(o.text, 0, ph * 0.02); g.restore();
      } else if (kind === 'counter') {
        const bw = pw - 2 * m, bh = ph - 2 * m; g.save(); g.shadowColor = 'rgba(11,25,30,0.4)'; g.shadowBlur = pw * 0.03; g.shadowOffsetY = pw * 0.012; rrect(g, m, m, bw, bh, ph * 0.18); g.fillStyle = o.bg || '#0B1A22'; g.fill(); g.restore();
        g.save(); rrect(g, m, m, bw, bh, ph * 0.18); g.clip(); g.fillStyle = o.accent || '#E2B857'; g.fillRect(m, bh + m - ph * 0.07, bw, ph * 0.07); g.restore();
        const ctxt = (o.scramble && u < o.scramble) ? o.text.replace(/\d/g, (d, k) => String(Math.floor(hash(Math.floor(u * 40) * 7 + k * 13) * 10))) : o.text;
        g.fillStyle = o.fg || '#E2B857'; g.textAlign = 'center'; g.textBaseline = 'middle'; const hasSub = !!o.sub, px = fitPx(g, ctxt, '900', ' ui-monospace, "Cascadia Mono", Consolas, monospace', bw * 0.76, ph * (hasSub ? 0.46 : 0.56)); g.font = '900 ' + px + 'px ui-monospace, "Cascadia Mono", Consolas, monospace'; g.fillText(ctxt, pw / 2, ph * (hasSub ? 0.43 : 0.52));
        if (hasSub) { g.fillStyle = '#F4F1EA'; g.font = '700 ' + ph * 0.15 + 'px' + FAM; g.fillText(o.sub.toUpperCase(), pw / 2, ph * 0.8); }
      } else {   // tag: dark pill with an accent bar and a soft drop shadow
        const bw = pw - 2 * m, bh = ph - 2 * m, bg = o.bg || '#0B1A22', fg = o.fg || '#F4F1EA';
        g.save(); g.shadowColor = 'rgba(11,25,30,0.38)'; g.shadowBlur = pw * 0.025; g.shadowOffsetY = pw * 0.012; rrect(g, m, m, bw, bh, ph * 0.22); g.fillStyle = bg; g.fill(); g.restore();
        g.save(); rrect(g, m, m, bw, bh, ph * 0.22); g.clip(); g.fillStyle = o.accent || fg; g.fillRect(m, m, ph * 0.12, bh); g.restore();
        g.fillStyle = fg; g.textAlign = 'center'; g.textBaseline = 'middle'; const px = fitPx(g, o.text, '900', FAM, bw * 0.7, ph * 0.46); g.font = '900 ' + px + 'px' + FAM; g.fillText(o.text, pw / 2 + ph * 0.06, ph * 0.52);
      }
    };
    const CW = (kind === 'doc' || kind === 'paint') ? 1024 : 768;
    if (o.tear && t >= o.tear) {        // the document rips along a jagged line; both halves swing apart and fall
      const k = t - o.tear, fall = 1.4 * k * k + 0.4 * k, aa = a * Math.max(0, 1 - Math.max(0, k - 1.0) / 0.5);
      if (aa > 0.01) [-1, 1].forEach(sd => {
        const part = (g, pw, ph) => { g.save(); g.beginPath(); const cx = pw * 0.5; if (sd < 0) { g.moveTo(0, 0); g.lineTo(cx, 0); } else { g.moveTo(pw, 0); g.lineTo(cx, 0); }
          for (let i = 1; i <= 10; i++) g.lineTo(cx + (i % 2 ? 1 : -1) * pw * 0.035 * (0.6 + hash(i * 5 + 1)), ph * i / 10); g.lineTo(sd < 0 ? 0 : pw, ph); g.closePath(); g.clip(); paint(g, pw, ph); g.restore(); };
        Panel(x + sd * (0.12 + 1.5 * k), y + bob - fall * 2.2, z, w, h, part, { sx: sc, sy: sc, a: aa, rot: rot + sd * (0.12 + 0.7 * k * k), cw: CW });
      });
      return;
    }
    Panel(x, y + bob, z, w, h, paint, { sx: sc * (1 + pul), sy: sc * (1 + pul), a, rot, cw: CW });
  }
  // Avatar(name, x, y, z, w, {t0,t1,frame,label}, t): a framed portrait of one of the old 'normal people' sprites (man, woman, office, senior, srwoman, student, midwoman, young)
  function Avatar(name, x, y, z, w, o, t) {
    o = o || {}; const t0 = o.t0 || 0, u = t - t0; if (u < 0) return; const out = o.t1 ? 1 - Math.max(0, Math.min(1, (t - o.t1) / 0.3)) : 1; if (out <= 0.01) return; const en = springOut(u / 0.4), h = w * 1.18;
    Panel(x, y + Math.sin(u * 1.6 + (o.ph || 0)) * 0.05, z, w, h, (g, pw, ph) => { const m = pw * 0.05; g.save(); g.shadowColor = 'rgba(11,25,30,0.4)'; g.shadowBlur = pw * 0.05; g.shadowOffsetY = pw * 0.025; rrect(g, m, m, pw - 2 * m, ph - 2 * m, pw * 0.1); g.fillStyle = o.bg || '#EFE8D8'; g.fill(); g.restore(); g.lineWidth = pw * 0.025; g.strokeStyle = o.frame || '#E2B857'; rrect(g, m, m, pw - 2 * m, ph - 2 * m, pw * 0.1); g.stroke();
      if (window.RigKit && RigKit.bust) RigKit.bust(g, name, m * 1.6, m * 1.6, pw - m * 3.2, ph - m * 3.2 - (o.label ? ph * 0.14 : 0));
      if (o.label) { g.fillStyle = '#15191D'; g.textAlign = 'center'; g.textBaseline = 'middle'; g.font = '800 ' + ph * 0.09 + 'px' + FAM; g.fillText(o.label, pw / 2, ph - m * 1.2 - ph * 0.06); } }, { sx: en, sy: en, a: out, cw: 384 });
  }
  // ---- 3D character rig (prototype): real 3D body (rounded parts + ink hull outline) driven by RigKit pose angles, hand-drawn head on a billboard plane ----
  const RIG3D = __RIG3D__;                         // roles drawn as 3D models (cfg 'rig3d'); everything else stays a sprite
  const R3 = { pool: {}, n: {}, ready: false };
  const R3_MAP = { explain: 'talk', podium: 'present', present: 'present', point: 'point', think: 'think', walk: 'walk', run: 'run', cross: 'cross', negotiate: 'talk', rally: 'cheer', discuss: 'talk', raised: 'cheer', statement: 'present', call: 'phone', tablet: 'hold', document: 'hold', stand: 'idle', idle: 'idle' };
  const R3_HULL = new THREE.MeshBasicMaterial({ color: 0x15191d, side: THREE.BackSide });
  function r3Ok(role) { const K = window.RigKit && RigKit.K; return RIG3D.indexOf(role) >= 0 && K && K.expr10 && K.smeta && K.smeta.exprRows.indexOf(RigKit.specOf(role).head) >= 0; }
  function r3Col(col, f) { const c = new THREE.Color(col); c.multiplyScalar(f); return c; }
  function r3Mesh(parent, geo, col, x, y, z, hull) {
    const sk = (col === '#f3c99a'), m = new THREE.Mesh(geo, new THREE.MeshStandardMaterial({ color: r3Col(col, sk ? 0.72 : 0.3), roughness: 0.6, metalness: 0.04, emissive: r3Col(col, sk ? 0.08 : 0.03) })); m.position.set(x, y, z); m.castShadow = true; m.receiveShadow = true; parent.add(m);
    if (hull !== 0) { const h = new THREE.Mesh(geo, R3_HULL); h.scale.setScalar(hull || 1.09); m.add(h); }
    return m;
  }
  function r3Build(role) {
    const spec = RigKit.specOf(role), SKIN = '#f3c99a', bulk = (spec.big || 1) * (spec.slim ? 0.9 : 1), sw = 24 * bulk, g = new THREE.Group(), body = new THREE.Group(); g.add(body);
    const RB = (w, h, d, r) => THREE.RoundedBoxGeometry ? new THREE.RoundedBoxGeometry(w, h, d, 3, r) : new THREE.BoxGeometry(w, h, d), CY = (r, h) => new THREE.CylinderGeometry(r, r * 0.92, h, 14), SP = r => new THREE.SphereGeometry(r, 14, 10);
    // torso, pelvis, neck
    r3Mesh(body, RB(sw * 2.45, 84, 36 * bulk, 11), spec.j, 0, 130, 0);
    r3Mesh(body, RB(sw * 2.0, 26, 32 * bulk, 8), spec.p, 0, 94, 0);
    r3Mesh(body, CY(9, 16), SKIN, 0, 170, 0, 1.12);
    if (spec.zip) r3Mesh(body, new THREE.BoxGeometry(3, 76, 1.5), '#8a909a', 0, 130, 19 * bulk, 0);
    if (spec.logo) r3Mesh(body, new THREE.BoxGeometry(15, 10, 1.2), '#76B900', sw * 0.7, 150, 19 * bulk, 0);
    if (spec.tie) r3Mesh(body, new THREE.BoxGeometry(8, 46, 1.6), spec.tie, 0, 140, 17.8 * bulk, 0);
    if (spec.suit) { r3Mesh(body, new THREE.BoxGeometry(sw * 0.7, 78, 1.2), spec.s, 0, 134, 17.4 * bulk, 0); r3Mesh(body, new THREE.BoxGeometry(5, 64, 2), spec.j2, -sw * 0.55, 136, 17.7 * bulk, 0); r3Mesh(body, new THREE.BoxGeometry(5, 64, 2), spec.j2, sw * 0.55, 136, 17.7 * bulk, 0); }
    // arms: pivot at the shoulder; upper arm + elbow + forearm + hand
    const arm = side => { const piv = new THREE.Group(); piv.position.set(side * (sw * 1.25 + 5), 160, 0); body.add(piv);
      r3Mesh(piv, SP(11), spec.j, 0, 0, 0); r3Mesh(piv, CY(10.5, 40), spec.j, 0, -20, 0);
      const el = new THREE.Group(); el.position.set(0, -40, 0); piv.add(el); r3Mesh(el, SP(9.6), spec.j, 0, 0, 0); r3Mesh(el, CY(9.4, 36), spec.j2 || spec.j, 0, -18, 0); r3Mesh(el, SP(9.2), SKIN, 0, -38, 0, 1.12);
      return { piv, el }; };
    const leg = side => { const piv = new THREE.Group(); piv.position.set(side * 12 * bulk, 94, 0); body.add(piv);
      r3Mesh(piv, CY(11, 48), spec.p, 0, -24, 0); const kn = new THREE.Group(); kn.position.set(0, -48, 0); piv.add(kn); r3Mesh(kn, SP(10.4), spec.p, 0, 0, 0); r3Mesh(kn, CY(9.6, 46), spec.p, 0, -23, 0);
      r3Mesh(kn, RB(18, 9, 30, 4), '#1b1d21', 0, -48, 7); return { piv, kn }; };
    const aR = arm(1), aL = arm(-1), lR = leg(1), lL = leg(-1);
    // head: billboard plane with the hand-drawn expression sheet
    const cv = document.createElement('canvas'); cv.width = cv.height = 128; const tex = new THREE.CanvasTexture(cv); tex.anisotropy = 4;
    const head = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), new THREE.MeshBasicMaterial({ map: tex, transparent: true, alphaTest: 0.12, side: THREE.DoubleSide, fog: false }));
    scene.add(head); scene.add(g);
    return { g, body, aR, aL, lR, lL, head, cv, tex, key: '', role };
  }
  function r3Expr(inst, names, want, ri) {
    let ni = names.indexOf(want); if (ni < 0) ni = 0; const key = ri + ':' + ni; if (inst.key === key) return; inst.key = key;
    const K = RigKit.K, E = K.smeta.exprCell, c2 = inst.cv.getContext('2d'); c2.clearRect(0, 0, 128, 128); c2.drawImage(K.expr10, ni * E, ri * E, E, E, 0, 0, 128, 128); inst.tex.needsUpdate = true;
  }
  function r3Begin() { Object.keys(R3.n).forEach(k => R3.n[k] = 0); }
  function r3End() { Object.keys(R3.pool).forEach(role => R3.pool[role].forEach((it, i) => { const on = i < (R3.n[role] || 0); it.g.visible = on; it.head.visible = on; })); }
  function r3Draw(role, P, hW, o, t) {
    const spec = RigKit.specOf(role), K = RigKit.K, list = R3.pool[role] = R3.pool[role] || [], idx = R3.n[role] = (R3.n[role] || 0) + 1, i = idx - 1;
    if (!list[i]) list[i] = r3Build(role); const it = list[i], fx = o.facing < 0 ? -1 : 1, ph = o.phase || 0;
    let nm = (o.pose || ((o.walkAmt || 0) > 0.3 ? 'walk' : (o.talk || 0) > 0.5 ? 'talk' : 'idle')).replace('spr:', ''); nm = R3_MAP[nm] || (RigKit.POSE[nm] ? nm : 'idle');
    const walking = nm === 'walk' || nm === 'run', tt = t * (1 + ((ph * 0.37) % 0.17));
    const P0 = (RigKit.POSE[nm] || RigKit.POSE.idle)(tt, ph, { _side: walking }); const PK = ['aR', 'eR', 'aL', 'eL', 'tR', 'kR', 'tL', 'kL', 'bob', 'lean', 'tilt', 'sit'];
    if (o.from && o.blend !== undefined && o.blend < 1) { let fn = (o.from + '').replace('spr:', ''); fn = R3_MAP[fn] || (RigKit.POSE[fn] ? fn : 'idle'); const Q = (RigKit.POSE[fn] || RigKit.POSE.idle)(tt, ph, { _side: walking }), u = Math.min(1.2, o.blend); PK.forEach(k => { P0[k] = Q[k] + (P0[k] - Q[k]) * u; }); }
    const kS = (hW * 1.2) / 278; it.g.position.set(P[0], P[1], P[2]); it.g.scale.setScalar(kS);
    const yawCam = Math.atan2(camera.position.x - P[0], camera.position.z - P[2]); it.g.rotation.y = walking ? (fx > 0 ? Math.PI / 2 : -Math.PI / 2) : yawCam * 0.65 + fx * 0.34;
    it.body.position.y = Math.abs(P0.bob) * 0.8; it.body.rotation.z = -fx * P0.lean;
    const side = walking, sg = side ? -1 : fx, ax = side ? 'x' : 'z';
    const setR = (obj, v) => { obj.rotation.set(0, 0, 0); obj.rotation[ax] = (side ? -1 : fx) * v; };
    setR(it.aR.piv, P0.aR); setR(it.aR.el, P0.eR); setR(it.aL.piv, P0.aL); setR(it.aL.el, P0.eL);
    setR(it.lR.piv, P0.tR); it.lR.kn.rotation.set(0, 0, 0); it.lR.kn.rotation[ax] = (side ? 1 : -fx) * P0.kR; setR(it.lL.piv, P0.tL); it.lL.kn.rotation.set(0, 0, 0); it.lL.kn.rotation[ax] = (side ? 1 : -fx) * P0.kL;
    // head
    const names = K.smeta.expr[spec.head], ri = K.smeta.exprRows.indexOf(spec.head); let want = o.expr || (nm === 'think' ? 'thinking' : (nm === 'talk' || nm === 'present' || (o.talk || 0) > 0.5) ? (Math.sin(t * 7 + ph) > -0.2 ? 'speaking' : 'neutral') : nm === 'cheer' ? 'smiling' : nm === 'panic' ? 'concerned' : 'neutral');
    r3Expr(it, names, want, ri);
    const S = 96 * K.headMul * (o.headScale || 1) * kS, up = (171 + 96 * K.headMul * 0.5) * kS + it.body.position.y * kS;
    it.head.position.set(P[0], P[1] + up, P[2]); it.head.position.x += (camera.position.x - P[0]) * 0.012; it.head.position.z += (camera.position.z - P[2]) * 0.012 + 0.02;
    it.head.scale.set(S, S, 1); it.head.quaternion.copy(camera.quaternion); it.head.rotateZ(-fx * P0.tilt);
  }
  function Char(role, x, z, hW, opts, t0, t1, t) { if (t < t0 || (t1 !== undefined && t >= t1)) return; const P = mp(x, 0, z); if (window.__FITON) { camera.updateMatrixWorld(); const f = fitProj(P[0], 0, P[2]), hd = fitProj(P[0], hW * 1.2, P[2]); if (f[2] < 1 && hd[2] < 1) { const hw = Math.abs(f[1] - hd[1]) * 0.25; (window.__FIT = window.__FIT || []).push({ name: 'char:' + role, kind: 'char', x0: f[0] - hw, x1: f[0] + hw, y0: Math.min(f[1], hd[1]), y1: Math.max(f[1], hd[1]) }); } } if (r3Ok(role)) { r3Draw(role, P, hW, opts || {}, t); return; } CAST.push({ role, wx: P[0], wy: 0, wz: P[2], h: hW * 1.2, t0, t1, o: opts }); }
  function S(x, y, z) { const P = mp(x, y, z), v = new THREE.Vector3(P[0], P[1], P[2]); const cz = v.clone().applyMatrix4(camera.matrixWorldInverse).z; if (cz > -0.5) return null; v.project(camera); const dist = camera.position.distanceTo(new THREE.Vector3(P[0], P[1], P[2])); return { x: (v.x * 0.5 + 0.5) * 1920, y: (-v.y * 0.5 + 0.5) * 1080, z: dist, k: 540 / (dist * Math.tan(camera.fov * Math.PI / 360)) }; }
  // ---- mood: tints sky, fog, ground, skyline and sun over time (day / warm / dusk / night / tense), lerped between track keys
  const MOODS = { day: { t: [1, 1, 1], f: 0xC4E3F1, h: 1.0, sun: 0xFFFFFF }, warm: { t: [1, 0.9, 0.76], f: 0xF2DFC4, h: 0.98, sun: 0xFFD9A0 }, dusk: { t: [1.0, 0.76, 0.74], f: 0xE6A9A0, h: 0.95, sun: 0xFF9A6A }, night: { t: [0.5, 0.56, 0.86], f: 0x2A3D6E, h: 0.8, sun: 0xA8B8F0 }, tense: { t: [0.9, 0.92, 1.0], f: 0xB4CEE0, h: 0.95, sun: 0xFFE8D0 } };
  const MOOD_TRACK = __MOOD__;
  const _mc1 = new THREE.Color(), _mc2 = new THREE.Color();
  function moodAt(t) { let i = 0; while (i < MOOD_TRACK.length - 1 && t >= MOOD_TRACK[i + 1][0]) i++; const cur = MOODS[MOOD_TRACK[i][1]], prev = MOODS[MOOD_TRACK[Math.max(0, i - 1)][1]], u = i === 0 ? 1 : Math.max(0, Math.min(1, (t - MOOD_TRACK[i][0]) / 1.4)), k = u * u * (3 - 2 * u); return { t: cur.t.map((v, c) => prev.t[c] + (v - prev.t[c]) * k), f: _mc1.set(prev.f).lerp(_mc2.set(cur.f), k).getHex(), h: prev.h + (cur.h - prev.h) * k, sun: _mc1.set(prev.sun).lerp(_mc2.set(cur.sun), k).getHex() }; }
  function applyMood(t) {
    const m = moodAt(t); scene.fog.color.setHex(m.f); scene.background.setHex(m.f);
    X.sky.material.color.setRGB(m.t[0], m.t[1], m.t[2]); X.ground.material.color.setRGB(m.t[0] * 0.86, m.t[1] * 0.88, m.t[2] * 0.92);
    X.bMats.forEach(b => b.color.setRGB(Math.min(1, m.t[0] * 1.05), Math.min(1, m.t[1] * 1.05), Math.min(1, m.t[2] * 1.05)));
    X.sun.material.color.setHex(m.sun); hemiLight.intensity = 0.82 * m.h; dirLight.intensity = 1.05 * m.h;
  }
  // ---- beat dressing (data from cfg 'dress', authored by tools/jb/dress.py): flows, orbits, growing stacks, pulses, beams, sparks
  const DRESS = __DRESS__;
  function dressFrame(t) {
    const rn = i => { const v = Math.sin(i * 127.1 + 311.7) * 43758.5453; return v - Math.floor(v); };
    DRESS.forEach((d, di) => {
      const type = d[0], t0 = d[1], t1 = d[2]; if (t < t0 || t > t1 + 0.4) return; const u = t - t0, fade = Math.min(1, u / 0.5) * Math.min(1, (t1 + 0.4 - t) / 0.4);
      if (type === 'flow') { const [a, b, n, col, sz] = [d[3], d[4], d[5], d[6], d[7] || 0.7]; for (let k = 0; k < n; k++) { const q = (u * 0.42 + k / n) % 1; Box(lerp(a[0], b[0], q) - sz / 2, lerp(a[1], b[1], q) + Math.sin(q * Math.PI) * 2.4, lerp(a[2], b[2], q), sz, sz * 0.62, sz, col, { lw: 0, emis: 0.45, a: fade }); } }
      else if (type === 'orbit') { const [c, r, n, col, dir] = [d[3], d[4], d[5], d[6], d[7] || 1]; for (let k = 0; k < n; k++) { const an = dir * (t * 0.9) + (k / n) * 6.2832; Box(c[0] + Math.cos(an) * r - 0.3, c[1] + Math.sin(t * 2 + k) * 0.35, c[2] + Math.sin(an) * r * 0.55, 0.6, 0.6, 0.6, col, { lw: 0, emis: 0.5, a: fade }); } }
      else if (type === 'rise') { const [pt, n, col, w] = [d[3], d[4], d[5], d[6] || 1]; for (let k = 0; k < n; k++) { const g = easeOut(seg(t, t0 + k * 0.28, t0 + k * 0.28 + 0.8)); if (g > 0.02) Box(pt[0] - w / 2, k * 0.62, pt[1], w, 0.55 * g, w, col, { a: fade }); } }
      else if (type === 'pulse') { const [pt, r, col] = [d[3], d[4], d[5]]; for (let i = 0; i < 2; i++) { const q = ((u * 0.38) + i * 0.5) % 1, pts = []; for (let k = 0; k < 40; k++) pts.push([pt[0] + Math.cos(k / 40 * 6.2832) * r * q, pt[1] + Math.sin(k / 40 * 6.2832) * r * q * 0.62]); groundPoly(pts, 0.05 + i * 0.002, null, col, 3, 0.7 * (1 - q) * fade); } }
      else if (type === 'beam') { const [pt, h, col] = [d[3], d[4], d[5]]; Cyl(pt[0], 0, pt[1], 0.55, h, col, { a: (0.2 + 0.12 * Math.sin(t * 3 + di)) * fade, emis: 0.7 }); }
      else if (type === 'sparks') { const [pt, spread, col, h] = [d[3], d[4], d[5], d[6] || 7]; for (let k = 0; k < 14; k++) { const ph = (t * 0.55 + rn(k + di * 7)) % 1; Box(pt[0] + (rn(k * 3 + di) - 0.5) * spread * 2, 0.4 + ph * h, pt[1] + (rn(k * 5 + 1) - 0.5) * 3, 0.26, 0.26, 0.26, col, { lw: 0, emis: 0.6, a: (1 - ph) * fade }); } }
    });
  }
  function beginFrame(t) {
    window.__FIT = [];
    _NR.length = 0;
    r3Begin();
    applyMood(t);
    CAST.length = 0; GROUND = []; ITEMS = []; OVER = []; Object.keys(CNT).forEach(k => CNT[k] = 0);
    applyCamera(t, [], null);
    camera.updateMatrixWorld(); X.applySets(moodAt(t));
    X.animate(t); X.ambientCast(t);
    dressFrame(t);
    X.env.position.set(camera.position.x, 0, camera.position.z); X.sky.position.copy(camera.position);
    X.ground.position.set(Math.round(camera.position.x / 6) * 6, 0, Math.round(camera.position.z / 6) * 6);
    X.clouds.forEach(s => { const u = s.userData, a = u.a + t * u.sp; s.position.set(Math.cos(a) * u.r, u.y, Math.sin(a) * u.r); });
    X.sun.position.set(-260, 150, -560);
  }
  // ---- characters as depth-tested planes inside the 3D scene (props hide them correctly), with a contact shadow
  const CS = { pool: [] }, CS_HERO = { jensen: 1, elon: 1, trump: 1, vance: 1, kress: 1, reed: 1, cheung: 1 };
  function csGet(i) {
    if (!CS.pool[i]) {
      const cv = document.createElement('canvas'); cv.width = 640; cv.height = 760; const tex = new THREE.CanvasTexture(cv); tex.anisotropy = 4;
      const m = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), new THREE.MeshBasicMaterial({ map: tex, alphaTest: 0.3, alphaToCoverage: true, side: THREE.DoubleSide, fog: false })); m.renderOrder = 2; scene.add(m);
      const sh = new THREE.Mesh(new THREE.CircleGeometry(1, 24), new THREE.MeshBasicMaterial({ color: 0x0b191e, transparent: true, opacity: 0.26, depthWrite: false, fog: false })); sh.rotation.x = -Math.PI / 2; sh.renderOrder = 1; scene.add(sh);
      CS.pool[i] = { cv, cx: cv.getContext('2d'), tex, m, sh };
    }
    return CS.pool[i];
  }
  function castToScene(t) {
    let n = 0; const K = RigKit.K; camera.updateMatrixWorld();
    CAST.forEach(c => {
      const v = new THREE.Vector3(c.wx, c.wy + c.h * 0.5, c.wz), dist = camera.position.distanceTo(v); if (v.clone().applyMatrix4(camera.matrixWorldInverse).z > -1.2) return;
      const fade = c.t1 === undefined ? 1 : 1 - easeInOutCubic(seg(t, c.t1 - 0.4, c.t1)), g = easeOutBack(seg(t, c.t0, c.t0 + 0.4)) * fade; if (g <= 0.02) return;
      const ppu = 540 / (dist * Math.tan(camera.fov * Math.PI / 360)), minH = (CS_HERO[c.role] ? K.heroMinPx : K.crowdMinPx) * ((c.o && c.o.minScale) || 1), f = Math.max(1, minH / (c.h * ppu * 1.15));
      const scd = Math.max(0.7, Math.min(1.5, c.h * ppu * f / 258 * 0.95)), wpp = c.h / (258 * scd), it = csGet(n++);
      it.cx.clearRect(0, 0, 640, 760); RigKit.draw(it.cx, c.role, 320, 720, scd, c.o || {}, t); it.tex.needsUpdate = true;
      const k = f * g; it.m.scale.set(640 * wpp * k, 760 * wpp * k, 1); it.m.position.set(c.wx, c.wy + 340 * wpp * k, c.wz); it.m.rotation.set(0, Math.atan2(camera.position.x - c.wx, camera.position.z - c.wz), 0); it.m.visible = true;
      it.sh.position.set(c.wx, c.wy + 0.03, c.wz); it.sh.scale.set(c.h * 0.36 * k, c.h * 0.13 * k, 1); it.sh.visible = true;
    });
    for (let i = n; i < CS.pool.length; i++) { CS.pool[i].m.visible = false; CS.pool[i].sh.visible = false; }
  }
  // ---- framing guard: dry-run the scene on a 0.25 s grid, measure how far labels / cards stick out of the safe area, and store a smoothed zoom-out table
  function buildAdj() {
    window.__ADJREADY = true; const dur = __DUR__, N = Math.ceil(dur / 0.25) + 2, raw = new Array(N).fill(1), prevFit = window.__FITON;
    window.__ADJ = null; window.__DRY = true; window.__FITON = true;
    try {
      for (let i = 0; i < N; i++) {
        const t = i * 0.25; renderShots(t); if ((window.__faceW || 0) > 0.25) continue; let need = 1;
        (window.__FIT || []).forEach(o => { if (o.kind === 'char') return; const w = o.x1 - o.x0, h = o.y1 - o.y0, cx = (o.x0 + o.x1) / 2, cy = (o.y0 + o.y1) / 2;
          if (w > 3500 || h > 2500 || Math.abs(cx - 960) > 1.9 * 900 || Math.abs(cy - 490) > 1.9 * 390) return;
          need = Math.max(need, w / 1640, h / 740, Math.max(Math.abs(o.x0 - 960), Math.abs(o.x1 - 960)) / 900, Math.max(Math.abs(o.y0 - 490), Math.abs(o.y1 - 490)) / 390); });
        raw[i] = Math.min(1.7, need);
      }
    } finally { window.__DRY = false; window.__FITON = prevFit; }
    const dil = raw.map((v, i) => { let m = 1; for (let j = Math.max(0, i - 3); j <= Math.min(N - 1, i + 3); j++) m = Math.max(m, raw[j]); return m; });
    window.__ADJ = dil.map((v, i) => { let a = 0, c = 0; for (let j = Math.max(0, i - 2); j <= Math.min(N - 1, i + 2); j++) { a += dil[j]; c++; } return a / c; });
  }
  function endFrame(t) {
    Object.keys(POOL).forEach(k => { for (let i = CNT[k]; i < POOL[k].length; i++) POOL[k][i].m.visible = false; });
    r3End();
    if (window.__DRY) return;
    castToScene(t);
    renderer.render(scene, camera);
    smearPass(t);
    { const vg = ctx.createRadialGradient(960, 540, 420, 960, 540, 1180); vg.addColorStop(0, 'rgba(11,25,30,0)'); vg.addColorStop(1, 'rgba(11,25,30,0.2)'); ctx.save(); ctx.fillStyle = vg; ctx.fillRect(0, 0, 1920, 1080); ctx.restore(); }
    GROUND.forEach(fn => fn()); OVER.forEach(fn => fn());
    HEADS.forEach(h => { const a = env(t, h[0], h[1], 0.3, 0.3); if (a > 0.01) drawHeadline(h[2], h[3], a, h[4], t, h[0]); });
  }

