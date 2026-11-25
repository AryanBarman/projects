"""Patch shim_env_jb.js: Card 'hlWord' (marker on one word) and 'tear' (the document rips in two and falls); Avatar() cards from the old
people sprites; and patch shim_cam_jb.js: 'arc' shot type + livelier holds."""
import pathlib
H = pathlib.Path(__file__).resolve().parent
# ---------------- env
p = H / 'shim_env_jb.js'; s = p.read_text(encoding='utf8')
def R(a, b):
    global s
    assert s.count(a) == 1, (s.count(a), a[:80])
    s = s.replace(a, b, 1)
R("if (isH) { const hh = Math.max(0, Math.min(1, (u - (o.hlAt || 0.7)) / 0.35)), e = 1 - Math.pow(1 - hh, 3); g.fillStyle = dark ? 'rgba(217,155,38,0.5)' : 'rgba(255,214,10,0.72)'; rrect(g, X0 - 6, ly - ps * 0.95, (lw + 12) * e, ps * 1.25, ps * 0.2); g.fill(); }",
  "if (isH) { const hh = Math.max(0, Math.min(1, (u - (o.hlAt || 0.7)) / 0.35)), e = 1 - Math.pow(1 - hh, 3); if (o.hlWord && ln.indexOf(o.hlWord) >= 0) { const wi = ln.indexOf(o.hlWord), wx = g.measureText(ln.slice(0, wi)).width, ww = g.measureText(o.hlWord).width; g.fillStyle = 'rgba(217,78,67,0.6)'; rrect(g, X0 + wx - 5, ly - ps * 0.98, (ww + 10) * e, ps * 1.3, ps * 0.2); g.fill(); g.strokeStyle = '#D94E43'; g.lineWidth = ps * 0.09; g.beginPath(); g.moveTo(X0 + wx - 5, ly + ps * 0.34); g.lineTo(X0 + wx - 5 + (ww + 10) * e, ly + ps * 0.34); g.stroke(); } else { g.fillStyle = dark ? 'rgba(217,155,38,0.5)' : 'rgba(255,214,10,0.72)'; rrect(g, X0 - 6, ly - ps * 0.95, (lw + 12) * e, ps * 1.25, ps * 0.2); g.fill(); } }")
# tear: replace the final Panel call
R("    Panel(x, y + bob, z, w, h, paint, { sx: sc * (1 + pul), sy: sc * (1 + pul), a, rot, cw: (kind === 'doc' || kind === 'paint') ? 1024 : 768 });",
  """    const CW = (kind === 'doc' || kind === 'paint') ? 1024 : 768;
    if (o.tear && t >= o.tear) {        // the document rips along a jagged line; both halves swing apart and fall
      const k = t - o.tear, fall = 1.4 * k * k + 0.4 * k, aa = a * Math.max(0, 1 - Math.max(0, k - 1.0) / 0.5);
      if (aa > 0.01) [-1, 1].forEach(sd => {
        const part = (g, pw, ph) => { g.save(); g.beginPath(); const cx = pw * 0.5; if (sd < 0) { g.moveTo(0, 0); g.lineTo(cx, 0); } else { g.moveTo(pw, 0); g.lineTo(cx, 0); }
          for (let i = 1; i <= 10; i++) g.lineTo(cx + (i % 2 ? 1 : -1) * pw * 0.035 * (0.6 + hash(i * 5 + 1)), ph * i / 10); g.lineTo(sd < 0 ? 0 : pw, ph); g.closePath(); g.clip(); paint(g, pw, ph); g.restore(); };
        Panel(x + sd * (0.12 + 1.5 * k), y + bob - fall * 2.2, z, w, h, part, { sx: sc, sy: sc, a: aa, rot: rot + sd * (0.12 + 0.7 * k * k), cw: CW });
      });
      return;
    }
    Panel(x, y + bob, z, w, h, paint, { sx: sc * (1 + pul), sy: sc * (1 + pul), a, rot, cw: CW });""")
# Avatar: an 'ID card' with one of the old people busts
R("  function Char(role, x, z, hW, opts, t0, t1, t) {", """  // Avatar(name, x, y, z, w, {t0,t1,frame,label}, t): a framed portrait of one of the old 'normal people' sprites (man, woman, office, senior, srwoman, student, midwoman, young)
  function Avatar(name, x, y, z, w, o, t) {
    o = o || {}; const t0 = o.t0 || 0, u = t - t0; if (u < 0) return; const out = o.t1 ? 1 - Math.max(0, Math.min(1, (t - o.t1) / 0.3)) : 1; if (out <= 0.01) return; const en = springOut(u / 0.4), h = w * 1.18;
    Panel(x, y + Math.sin(u * 1.6 + (o.ph || 0)) * 0.05, z, w, h, (g, pw, ph) => { const m = pw * 0.05; g.save(); g.shadowColor = 'rgba(11,25,30,0.4)'; g.shadowBlur = pw * 0.05; g.shadowOffsetY = pw * 0.025; rrect(g, m, m, pw - 2 * m, ph - 2 * m, pw * 0.1); g.fillStyle = o.bg || '#EFE8D8'; g.fill(); g.restore(); g.lineWidth = pw * 0.025; g.strokeStyle = o.frame || '#E2B857'; rrect(g, m, m, pw - 2 * m, ph - 2 * m, pw * 0.1); g.stroke();
      if (window.RigKit && RigKit.bust) RigKit.bust(g, name, m * 1.6, m * 1.6, pw - m * 3.2, ph - m * 3.2 - (o.label ? ph * 0.14 : 0));
      if (o.label) { g.fillStyle = '#15191D'; g.textAlign = 'center'; g.textBaseline = 'middle'; g.font = '800 ' + ph * 0.09 + 'px' + FAM; g.fillText(o.label, pw / 2, ph - m * 1.2 - ph * 0.06); } }, { sx: en, sy: en, a: out, cw: 384 });
  }
  function Char(role, x, z, hW, opts, t0, t1, t) {""")
p.write_text(s, encoding='utf8')

# ---------------- camera
p = H / 'shim_cam_jb.js'; s = p.read_text(encoding='utf8')
R("if ((ty === 'hold' || ty === 'push' || ty === 'pull') && prev) {", "if ((ty === 'hold' || ty === 'push' || ty === 'pull' || ty === 'arc') && prev) {")
R("        yaw = prev.yaw; pitch = prev.pitch;\n", "        yaw = ty === 'arc' ? Math.max(-YAWMAX, Math.min(YAWMAX, prev.yaw + (arcN++ % 2 ? -0.34 : 0.34))) : prev.yaw; pitch = ty === 'arc' ? Math.min(PMAX, prev.pitch + 0.05) : prev.pitch;\n")
R("        Dh = ty === 'hold' ? prev.Dh : ty === 'push'", "        Dh = (ty === 'hold' || ty === 'arc') ? prev.Dh : ty === 'push'")
R("        fov = ty === 'hold' ? prev.fov : ty === 'push'", "        fov = (ty === 'hold' || ty === 'arc') ? prev.fov : ty === 'push'")
R("    let prev = null, fly = 0;", "    let prev = null, fly = 0, arcN = 0;")
R("const AMP = { auto: 1, fly: 0.45, hold: 0.12, push: 0, pull: 0 };", "const AMP = { auto: 1, fly: 0.45, hold: 0.3, arc: 0.1, push: 0, pull: 0 };")
R("//   pull = slow zoom OUT to reveal context / scale / consequence (same angle);  no flag = legacy blended move.", "//   pull = slow zoom OUT to reveal context / scale / consequence (same angle);  arc = slow orbit around the subject (same distance), for long holds;  no flag = legacy blended move.")
p.write_text(s, encoding='utf8'); print('env + cam patched')
