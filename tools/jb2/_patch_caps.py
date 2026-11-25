import pathlib
H = pathlib.Path(__file__).resolve().parent
def sub(p, a, b, n=1):
    t = p.read_text(encoding='utf8'); assert t.count(a) == n, (p.name, t.count(a), a[:60]); p.write_text(t.replace(a, b), encoding='utf8')
o = H / 'portrait_over.js'
sub(o, "  const _capChunks = new Map();", "  const CAPBIG = __CAPBIG__;   // cfg caption_style 'big': 1-2 words, 96 px, white with a black stroke, no box (the Stick3D-pack caption style); default = one ~22-character line in a box\n  const _capChunks = new Map();")
sub(o, "if (cur.length && len + 1 + w.w.length > 22) {", "if (cur.length && (CAPBIG ? (cur.length >= 2 || len + 1 + w.w.length > 17) : len + 1 + w.w.length > 22)) {")
sub(o, "    ctx.save(); ctx.font = '900 70px' + fam;", """    if (CAPBIG) {
      ctx.save(); ctx.font = '900 100px' + fam; const sp = ctx.measureText(' ').width, wd = words.map(w => ctx.measureText(w.w).width), tw = wd.reduce((a, b) => a + b, 0) + sp * (words.length - 1), k = easeOut(seg(time, t0c, t0c + 0.12)), sc = 0.8 + 0.2 * k;
      ctx.globalAlpha = Math.min(seg(time, t0c, t0c + 0.06), cue.fades ? 1 - seg(time, cue.end, cue.end + 0.12) : 1); ctx.translate(540, 1320); ctx.scale(sc, sc); ctx.textAlign = 'left'; ctx.textBaseline = 'middle'; ctx.lineJoin = 'round'; ctx.lineWidth = 18; let cx = -tw / 2;
      words.forEach((w, i) => { const hot = w.col && time >= w.t0; ctx.strokeStyle = '#000'; ctx.strokeText(w.w, cx, 0); ctx.fillStyle = hot ? w.col : '#fff'; ctx.fillText(w.w, cx, 0); cx += wd[i] + sp; }); ctx.restore(); return;
    }
    ctx.save(); ctx.font = '900 70px' + fam;""")
sub(H / 'portrait_build.py', "def to_portrait(s):", "def to_portrait(s, cfg=None):")
sub(H / 'portrait_build.py', "over = (H / 'portrait_over.js').read_text(encoding='utf8')", "over = (H / 'portrait_over.js').read_text(encoding='utf8').replace('__CAPBIG__', 'true' if (cfg or {}).get('caption_style') == 'big' else 'false')")
sub(H / 'build_jb.py', "s, _plog = to_portrait(s)", "s, _plog = to_portrait(s, cfg)")
sub(H / 'compile_story.py', "cfg.update(S.get('cfg', {}))", "cfg['caption_style'] = S.get('caption_style', 'line')\ncfg.update(S.get('cfg', {}))")
# hallway: more contrast
r = H / 'recipes_jb.js'
sub(r, "hallway: { floor: ['tile', '#F2F2F7', '#C9CBD6'], wall: ['plain', '#E9ECF4', '#D5D9E8'], trim: '#2C5BA8', door: [0, '#1F4FD8'], rug: '#C8232D', glow: '#FFF3B0'", "hallway: { floor: ['tile', '#DDE3F0', '#A9B5CF'], wall: ['plain', '#B7C6E6', '#9DB0D8'], trim: '#2C5BA8', door: [0, '#1F4FD8'], rug: '#C8232D', glow: '#FFD36B'")
print('patched')
