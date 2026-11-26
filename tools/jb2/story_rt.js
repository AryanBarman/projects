  // =========================================================================
  // STORY RUNTIME (jb2): plays a declarative story (stories/<id>.story.json, embedded by compile_story.py). A video = DATA, no per-video JavaScript. Schema: docs/STORY_SPEC.md
  //   beat = { t:[from,to], again:[from,to]?, space:[from,to]?, pad:[before,after]?, do:[ ["Recipe", args...] | { do:["Recipe", args...], in:[from,to] } ] }
  //   args: numbers, strings, objects; a string starting with "=" is an expression (variables: t, t0, t1 = the beat range, every track by name, lerp, seg, easeInOut, easeOut, easeIn, hand, Math).
  //   tracks = { name: [[time, value], ...] } eased values over time (e.g. the x of an object that travels with the camera).
  // =========================================================================
  const Story = (function () {
    const cache = {}, HELP = { lerp, seg, easeInOut, easeOut, easeIn, hand, Math };
    const fn = src => cache[src] || (cache[src] = new Function('t', 't0', 't1', 'V', 'H', 'with (H) with (V) { return (' + src + '); }'));
    const ev = (v, c) => typeof v === 'string' && v[0] === '=' ? fn(v.slice(1))(c.t, c.t0, c.t1, c.V, HELP) : Array.isArray(v) ? v.map(x => ev(x, c)) : (v && typeof v === 'object') ? Object.keys(v).reduce((o, k) => (o[k] = ev(v[k], c), o), {}) : v;
    const track = (kf, t) => { if (t <= kf[0][0]) return kf[0][1]; for (let i = 0; i < kf.length - 1; i++) if (t < kf[i + 1][0]) return lerp(kf[i][1], kf[i + 1][1], easeInOut(seg(t, kf[i][0], kf[i + 1][0]))); return kf[kf.length - 1][1]; };
    const d0 = (v, d) => v == null ? d : v;
    const REG = {
      SetBank: (a, t) => SetBank(a[0], a[1], t, d0(a[2], -1)), SetVault: (a, t, t0) => SetVault(a[0], a[1], t, d0(a[2], t0)), SetCart: (a, t, t0) => SetCart(a[0], a[1], t, d0(a[2], t0), a[3] || 4),
      SetLock: (a, t) => SetLock(a[0], a[1], t, a[2]), SetLaunch: (a, t) => SetLaunch(a[0], a[1], t, a[2], a[3], a[4]), SetOrbit: (a, t) => SetOrbit(a[0], a[1], t, d0(a[2], t * 0.18)),
      Station: (a) => Station(a[0], a[1], a[2], d0(a[3], 1.1)), SetRepo: (a, t, t0) => SetRepo(a[0], a[1], t, d0(a[2], t0)),
      Act: (a, t, t0, t1) => Act(a[0], a[1], a[2], a[3], a[4], d0(a[5], t0), d0(a[6], t1 + 0.4), t, a[7]),
      Room: (a, t, t0) => SetRoom(a[0], a[1], d0(a[2], 0), t, d0(a[3], t0)), Hold: (a, t) => Hold(a[0], a[1], a[2], a[3], a[4], a[5], t, a[6]), Throw: (a, t) => Throw(a[0], a[1], a[2], a[3], a[4], a[5], t, a[6]),
      Stockline: (a, t) => Stockline(a[0], a[1], a[2], a[3], a[4], a[5], t, a[6]), Panel: (a, t) => ControlPanel(a[0], a[1], a[2], a[3], a[4], t, a[5]), Magnifier: (a, t) => Magnifier(a[0], a[1], a[2], a[3], t, a[4]),
      CeoChair: (a) => CeoChair(a[0], a[1], a[2]), Ledger: (a, t, t0) => Ledger(a[0], a[1], a[2], a[3], t, d0(a[4], t0)), Crown: (a) => Crown(a[0], a[1], a[2], a[3]), Calendar: (a, t, t0, t1) => Calendar(a[0], a[1], a[2], a[3], t, d0(a[4], t0), d0(a[5], t1)), BoardTable: (a) => BoardTable(a[0], a[1], a[2]),
      Stack: (a) => gpuStack(a[0], a[1], a[2] || 6, d0(a[3], 1), 1, a[4]), Dashed: (a) => dashed(a[0], a[1], a[2] || 10, a[3] || '#E2B857', a[4] || 8), RedX: (a, t) => redX(a[0], a[1], a[2], a[3], t, a[4]),
      Model: (a) => Model(a[0], a[1], a[2], a[3], a[4], a[5]), Card: (a, t) => Card(a[0], a[1], a[2], a[3], a[4], a[5], t),
      Counter: (a, t) => { const o = a[0]; Card(o.x, o.y, d0(o.z, 2.5), o.w, o.h, { kind: 'counter', text: o.text, sub: o.sub, fg: '#F2D58F', accent: '#E2B857', t0: o.t0, t1: o.t1 || 0, scramble: 0 }, t); },
      Doc: (a, t) => { const o = a[0]; Card(o.x, o.y, d0(o.z, 2.6), d0(o.w, 5.6), d0(o.h, 4.4), { kind: 'doc', tag: o.tag, head: o.head, lines: o.lines, hl: o.hl, hlWord: o.hlWord, type: true, cps: 22, accent: '#D94E43', t0: o.t0, t1: o.t1 || 0, nonudge: 1 }, t); },
      Coins: (a, t) => { const n = a[2] || 4; for (let k = 0; k < n; k++) { const q = (t * d0(a[3], 0.9) + k / n) % 1; coin(lerp(a[0][0], a[1][0], q), a[0][1] + Math.sin(q * Math.PI) * 1.7, a[0][2], 1); } },
      DashedGrow: (a, t) => { const dl = easeInOut(seg(t, a[5], a[6])); if (dl > 0.02) dashed(a[0], [lerp(a[0][0], a[1][0], dl), lerp(a[0][1], a[1][1], dl), lerp(a[0][2], a[1][2], dl)], a[2] || 10, a[3] || '#E2B857', a[4] || 8); },
      Band: (a, t) => { const [txt, t0, t1] = a; if (t < t0 || t >= t1) return; OVER.push(() => { const u = seg(t, t0, t0 + 0.4), o = 1 - seg(t, t1 - 0.4, t1), x = lerp(-1100, 0, easeOut(u)), fl = Math.max(0, 1 - (t - t0) / 0.2);
        ctx.save(); ctx.globalAlpha = o; ctx.fillStyle = '#D94E43'; ctx.fillRect(x, 560, 1080, 150); ctx.fillStyle = '#0B191E'; ctx.fillRect(x, 554, 1080, 8); ctx.fillRect(x, 710, 1080, 8);
        ctx.fillStyle = '#F4F1EA'; ctx.font = '900 56px system-ui, "Segoe UI", sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(txt, 540 + x, 636);
        if (fl > 0) { ctx.globalAlpha = fl * 0.7; ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, 1080, 1920); } ctx.restore(); }); }
    };
    function run(t, S) {
      const V = {}; Object.keys(S.tracks || {}).forEach(k => V[k] = track(S.tracks[k], t)); let space = false;
      S.beats.forEach(b => {
        const rs = [{ a: b.t[0], z: b.t[1] }]; if (b.again) rs.push({ a: b.again[0], z: b.again[1] });
        rs.forEach(r => {
          const pad = b.pad || [0.4, 0.5]; if (t < r.a - pad[0] || t >= r.z + pad[1]) return; if (b.space && t >= b.space[0] && t < b.space[1]) space = true;
          const c = { t, t0: r.a, t1: r.z, V };
          (b.do || []).forEach(d => { const e = Array.isArray(d) ? { do: d } : d; if (e.in && (t < e.in[0] || t >= e.in[1])) return; const f = REG[e.do[0]]; if (!f) { console.warn('story: unknown recipe', e.do[0]); return; } f(ev(e.do.slice(1), c), t, r.a, r.z); });
        });
      });
      SpaceMode(space);
    }
    return { run, REG };
  })();
