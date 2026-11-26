"""Build one jen_back part as a finished real-3D page (no intermediate -v2 step).
usage: python build_jb.py <name> [--no-rig]        e.g. python build_jb.py a1p1
Inputs : tools/jb/cfg_<name>.json  (audio, out, title, dur, rail, stn, dmin, dmax, fixes, keycol, ledger, cues)
         tools/jb/<name>_keys.js   (camera K(t,[pos],[look],fov[,cut]) lines)
         tools/jb/<name>_scene.js  (HEADS + renderShots; same skeleton as tools/scenes/a7_scene.js)
Base   : act7_full_conclusion-3d.html (a finished page = Three.js template + shim + captions/ledger/HUD/recorder). Its camera block and
         world/scene block are swapped for the new ones; SUBS (from the SRT), LEDGER, CUE_SHEET, KEYCOL, duration, rail, audio, title are rewritten.
Output : jensen back with crash/<out>  (audio is read from jen_back/audio/<audio>.wav next to it). Then RigKit is embedded (tools/charkit/patch_rig.py).
"""
import re, json, sys, pathlib, subprocess
T = pathlib.Path(__file__).resolve().parent.parent; P = T.parent; J = P / 'jensen back with crash'; H = pathlib.Path(__file__).resolve().parent
name = sys.argv[1]; cfg = json.load(open(H / ('cfg_%s.json' % name), encoding='utf8'))
INF = 1e9
CORR = json.load(open(H / 'corrections.json', encoding='utf8'))
s = open(P / 'act7_full_conclusion-3d.html', encoding='utf8', newline='').read().replace('\r\n', '\n')
OLD = '88.40'

def cut(txt, a, b): return txt[:a] + txt[b:]
def blk(start, end):
    global s
    a = s.index(start); b = s.index(end, a) + len(end); return a, b
def tsec(x):
    h, m, r = x.split(':'); sec, ms = r.split(','); return int(h) * 3600 + int(m) * 60 + int(sec) + int(ms) / 1000

# ---- 1. captions from the SRT
raw = open(J / 'audio' / (cfg['audio'] + '.srt'), encoding='utf8').read().replace('\r', '')
subs = []
for b in re.split(r'\n\s*\n', raw.strip()):
    L = b.split('\n')
    if len(L) < 3: continue
    a1, b1 = L[1].split(' --> '); txt = ' '.join(L[2:]).strip()
    txt = re.sub(r'(\w) -(\w)', r'\1-\2', txt); txt = re.sub(r'\s+\.', '.', txt)
    for k, v in cfg.get('fixes', {}).items(): txt = txt.replace(k, v)
    for pat, rep in CORR: txt = re.sub(pat, rep, txt)   # spelling corrections shared with the series (corrections.json)
    if subs and re.match(r'\.\d', txt) and re.search(r'\d$', subs[-1][2]):      # '... a huge 31' + '.5 % relief ...' -> keep the number whole: move it to the next caption
        m0 = re.search(r'(\d+)$', subs[-1][2]); subs[-1] = (subs[-1][0], subs[-1][1], subs[-1][2][:m0.start()].rstrip()); txt = m0.group(1) + txt
    subs.append((tsec(a1), tsec(b1), txt))
gen = {
 "  const SUBS = [": ("\n  ];\n", "  const SUBS = [\n" + ",\n".join("    { start: %.3f, end: %.3f, text: %s }" % (a, b, json.dumps(t)) for a, b, t in subs) + "\n  ];\n"),
 "  const LEDGER = [": ("\n  ];\n", "  const LEDGER = [\n" + ",\n".join("    { id: 'L%d', cue: %s, claim: %s, status: %s, source: %s, date: '2026', treatment: %s }" % (i + 1, json.dumps(x[0]), json.dumps(x[1]), json.dumps(x[2]), json.dumps(x[3]), json.dumps(x[4])) for i, x in enumerate(cfg['ledger'])) + "\n  ];\n"),
 "  const CUE_SHEET = [": ("\n  ];\n", "  const CUE_SHEET = [\n" + ",\n".join("    { t: %.2f, name: %s, desc: %s }" % (x[0], json.dumps(x[1]), json.dumps(x[2])) for x in cfg['cues']) + "\n  ];\n"),
 "  const KEYCOL = {": ("\n  };\n", "  const KEYCOL = {\n    " + ",\n    ".join("%s: PAL.%s" % (json.dumps(k), v) for k, v in cfg['keycol'].items()) + "\n  };\n"),
}
for start, (end, new) in gen.items():
    a, b = blk(start, end); s = s[:a] + new + s[b:]

# ---- 2. camera block
cam = open(H / 'shim_cam_jb.js', encoding='utf8').read()
keys = open(H / (name + '_keys.js'), encoding='utf8').read()
klines = [l for l in keys.split('\n') if re.match(r'^\s*K\(.*\);\s*$', l)]
stn = [{'b': b, 'c': c} for b, c in cfg['stn']]
cam = cam.replace('__STN__', json.dumps(stn)).replace('__LAYOUT__', json.dumps(cfg.get('layout', [[0, -30 * k] for k in range(len(cfg['stn']))]))).replace('__DMIN__', str(cfg['dmin'])).replace('__DMAX__', str(cfg['dmax'])).replace('__FACES__', json.dumps(cfg.get('faces', []))).replace('__KEYS__', '\n'.join(klines))
a = s.index("  // ---- station mapping"); m = s.index("  // 4. DUAL-CANVAS"); b = s.rfind("  // ====", 0, m)
s = s[:a] + cam + s[b:]

# ---- 3. world/scene block (shim_env + scene)
env = open(H / 'shim_env_jb.js', encoding='utf8').read().replace('__MOOD__', json.dumps(cfg.get('mood', [[0, 'day']]))).replace('__SETS__', json.dumps(cfg.get('sets', []))).replace('__DRESS__', json.dumps(cfg.get('dress', []))).replace('__RIG3D__', json.dumps(cfg.get('rig3d', []))).replace('__DUR__', str(cfg['dur']))
scene = open(H / (name + '_scene.js'), encoding='utf8').read()
scene = scene[scene.index("  const HEADS = ["):]
if cfg.get('assets'): scene = open(H / 'assets_jb.js', encoding='utf8').read() + scene   # shared asset library (new parts only)
pat1 = r"    const cv = evalCam\(t\);\n    Cam3D\.set\([^\n]*\n    GROUND = \[\]; ITEMS = \[\]; OVER = \[\];"
scene, n1 = re.subn(pat1, "    beginFrame(t);", scene)
pat2 = r"    drawBG\([^\n]*\n    GROUND\.forEach[^\n]*\n    ITEMS\.sort[^\n]*\n    OVER\.forEach[^\n]*\n    HEADS\.forEach\([^\n]*\n  \}"
scene, n2 = re.subn(pat2, "    endFrame(t);\n  }", scene)
assert n1 == 1 and n2 == 1, ('scene skeleton lines missing', n1, n2)
a = s.index(env[:120]); b = s.index("  function renderModelSheet(t) {")
s = s[:a] + env + scene + "\n  function renderScene(t) { if (!HAS_THREE) return; if (!window.__ADJREADY) buildAdj(); renderShots(t); }\n\n" + s[b:]

# ---- 3b. headline box: one rounded dark card (title + subtitle inside), padded, no hairlines (replaces the base drawHeadline)
i0 = s.index('  function drawHeadline('); i1 = s.index('  function applyCamera(')
s = s[:i0] + """  function drawHeadline(title, subTag, alpha, accent = PAL.amber, t = 1e9, t0 = 0) {
    if (alpha <= 0.01) return;
    ctx.save(); ctx.globalAlpha = alpha; const padX = 36, x = 80, y = 66, tf = '800 36px system-ui, sans-serif', sf = '600 22px system-ui, sans-serif';
    ctx.font = tf; const tw = ctx.measureText(title).width; ctx.font = sf; const sw = subTag ? ctx.measureText(subTag).width : 0, w = Math.max(tw, sw) + padX * 2 + 12, h = subTag ? 116 : 78;
    ctx.shadowColor = 'rgba(11,25,30,0.38)'; ctx.shadowBlur = 20; ctx.shadowOffsetY = 7; rrect(ctx, x, y, w, h, 16); ctx.fillStyle = PAL.ink; ctx.fill(); ctx.shadowColor = 'transparent';
    ctx.save(); rrect(ctx, x, y, w, h, 16); ctx.clip(); ctx.fillStyle = accent; ctx.fillRect(x, y, 10, h); ctx.restore();
    ctx.fillStyle = PAL.ivory; ctx.textAlign = 'left'; typeAt(title, x + padX + 6, y + (subTag ? 48 : 52), t, t0 + 0.25, 42, 'left', 36);
    if (subTag) { ctx.font = sf; ctx.globalAlpha = alpha * clamp((t - t0 - 0.25 - title.length / 42) / 0.3, 0, 1); ctx.fillStyle = 'rgba(244, 241, 234, 0.82)'; ctx.textAlign = 'left'; ctx.fillText(subTag, x + padX + 6, y + 90); }
    ctx.restore();
  }

""" + s[i1:]

# ---- 4. duration, rail, audio, title, names
dur = '%.2f' % cfg['dur']; rail = cfg['rail']
s = re.sub(r"drawRail\(time, \[[\d., ]+\]\);", "drawRail(time, [%s]);" % ", ".join("%.2f" % x for x in rail), s, count=1)
s = re.sub(r"SCENE_STARTS = \[[\d., ]+\];", "SCENE_STARTS = [%s];" % ", ".join("%.2f" % x for x in rail[:-1]), s, count=1)
s = re.sub(r'<datalist id="scenes">.*?</datalist>', '<datalist id="scenes">' + ''.join('<option value="%.2f"></option>' % x for x in rail[:-1]) + '</datalist>', s, count=1, flags=re.S)
assert s.count(OLD) == 4, ('duration occurrences', s.count(OLD)); s = s.replace(OLD, dur)
s = s.replace('src="audio/Act 7 all.wav"', 'src="audio/%s.wav"' % cfg['audio'], 1)
s = re.sub(r'aria-label="Act 7[^"]*"', 'aria-label="%s"' % cfg['title'].replace('"', ''), s, count=1)
s = re.sub(r"<title>.*?</title>", "<title>%s</title>" % cfg['title'].replace('\\', ''), s, count=1)
base = cfg['out'].replace('.html', '')
s = s.replace('act7_full_conclusion-3d', base)
# the old page carried ~2 MB of stickman sprite data; the new rig does not need it
assert 'clamp((vel - 7) / 22, 0, 0.2)' in s; s = s.replace('clamp((vel - 7) / 22, 0, 0.2)', 'clamp((vel - 18) / 34, 0, 0.12)')   # the living camera moves all the time: smear only on real flights
a = s.index('const SPRITE_DATA = '); b = s.index('\n', a); s = s[:a] + 'const SPRITE_DATA = {};' + s[b:]
out = J / cfg['out']; open(out, 'w', encoding='utf8', newline='\n').write(s)
print('built', out.name, len(s) // 1024, 'KB', len(subs), 'captions', len(klines), 'camera keys')
# ---- 5. rig
if '--no-rig' not in sys.argv: subprocess.run([sys.executable, str(T / 'jc' / 'charkit' / 'patch_rig.py'), str(out)], check=True)
# ---- 6. syntax check of the two big scripts
sc = re.findall(r'<script>(.*?)</script>', open(out, encoding='utf8').read(), re.S)
chk = H / '_chk.js'; chk.write_text(max(sc, key=len), encoding='utf8')
r = subprocess.run(['node', '--check', str(chk)], capture_output=True, text=True); print('SYNTAX_OK' if r.returncode == 0 else r.stderr[:600]); chk.unlink()
