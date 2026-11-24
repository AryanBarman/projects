import re, json, sys
# usage: python patch_a3gen.py <config.json>   (builds an Act 3 part from the Act 3 part 1 v2 engine; captions come straight from the SRT)
cfg = json.load(open(sys.argv[1], encoding='utf8'))
d = 'C:/Users/Aryan Barman/personal/new_projects/projects/'
SC = 'C:/Users/ARYANB~1/AppData/Local/Temp/claude/6f15eacba9bd00b7/d07cfa11-dd41-4120-a57e-d60d4324f744/scratchpad/'
s = open(d + 'act3_part1_terrafab_10m_cut-v2.html', encoding='utf8', newline='').read()
def rep(a, b):
    global s
    assert s.count(a) == 1, (s.count(a), a[:70]); s = s.replace(a, b)
def block(start, end='\n  ];\n'):
    a = s.index(start); b = s.index(end, a) + len(end); return a, b
def tsec(x):
    h, m, r = x.split(':'); sec, ms = r.split(','); return int(h) * 3600 + int(m) * 60 + int(sec) + int(ms) / 1000
# --- captions straight from the SRT
AUD = cfg.get('audio', 'Act 3 part %d' % cfg['part'])
raw = open(d + 'audio/' + AUD + '.srt', encoding='utf8').read().replace('\r', '')
subs = []
for blk in re.split(r'\n\s*\n', raw.strip()):
    L = blk.split('\n')
    if len(L) < 3: continue
    a, b = L[1].split(' --> '); txt = ' '.join(L[2:]).strip()
    txt = re.sub(r'(\w) -(\w)', r'\1-\2', txt)
    for k, v in cfg.get('fixes', {}).items(): txt = txt.replace(k, v)
    subs.append((tsec(a), tsec(b), txt))
SUBS = "  const SUBS = [\n" + ",\n".join("    { start: %.3f, end: %.3f, text: %s }" % (a, b, json.dumps(t)) for a, b, t in subs) + "\n  ];\n"
a, b = block("  const SUBS = ["); s = s[:a] + SUBS + s[b:]
led = "  const LEDGER = [\n" + ",\n".join("    { id: 'L%d', cue: %s, claim: %s, status: %s, source: %s, date: '2026', treatment: %s }" % (i + 1, json.dumps(x[0]), json.dumps(x[1]), json.dumps(x[2]), json.dumps(x[3]), json.dumps(x[4])) for i, x in enumerate(cfg['ledger'])) + "\n  ];\n"
a, b = block("  const LEDGER = ["); s = s[:a] + led + s[b:]
cue = "  const CUE_SHEET = [\n" + ",\n".join("    { t: %.2f, name: %s, desc: %s }" % (x[0], json.dumps(x[1]), json.dumps(x[2])) for x in cfg['cues']) + "\n  ];\n"
a, b = block("  const CUE_SHEET = ["); s = s[:a] + cue + s[b:]
a = s.index("  const KEYCOL = {"); b = s.index("\n  };\n", a) + 6
kc = (",\n    ").join("%s: PAL.%s" % (json.dumps(k), v) for k, v in cfg['keycol'].items())
s = s[:a] + "  const KEYCOL = {\n    " + kc + "\n  };\n" + s[b:]
# --- scene world: helpers from part 1, new keys + HEADS + renderShots
A = open(SC + 'a3p1_scene.js', encoding='utf8').read()
head = A[:A.index("  K(0.11,")]
mid = A[A.index("  function evalCam(t) {"):A.index("  const HEADS = [")]
new = head + open(SC + cfg['keys'], encoding='utf8').read() + mid + open(SC + cfg['scene'], encoding='utf8').read()
spr = s[s.index('  // ---- STICKMAN SPRITES'):s.index('  function renderShots(t) {')]
assert new.count('  function renderShots(t) {') == 1
new = new.replace('  function renderShots(t) {', spr + '  function renderShots(t) {')
a = s.index("  // =========================================================================\n  // v2 WORLD"); b = s.index("  function renderModelSheet(t) {")
s = s[:a] + new + s[b:]
# --- duration, rail, audio, titles
dur = '%.2f' % cfg['dur']
rep("Exact WAV duration = 66.80s (SRT ends at 66.29s)", "Exact WAV duration = %ss" % dur)
rep("const DUR = 66.80;", "const DUR = %s;" % dur); rep("const WAV_DUR = 66.80;", "const WAV_DUR = %s;" % dur)
rep('max="66.80"', 'max="%s"' % dur); rep("00.00 / 66.80s", "00.00 / %ss" % dur)
rail = cfg['rail']
rep("const S = [0, 15.65, 31.41, 44.35, 58.85, 66.80];", "const S = [%s];" % ", ".join("%.2f" % x for x in rail))
rep("const SCENE_STARTS = [0.00, 15.65, 31.41, 44.35, 58.85];", "const SCENE_STARTS = [%s];" % ", ".join("%.2f" % x for x in rail[:-1]))
rep('<datalist id="scenes"><option value="0.00"></option><option value="15.65"></option><option value="31.41"></option><option value="44.35"></option>', '<datalist id="scenes">' + ''.join('<option value="%.2f"></option>' % x for x in rail[:-1]))
rep('src="audio/Act 3 part 1.wav"', 'src="audio/' + AUD + '.wav"')
rep("<title>Act 3 Part 1 — Best-Case Scenario: TerraFab $119B Megacomplex &amp; Sealed Texas Filings</title>", "<title>%s</title>" % cfg['title'])
s = re.sub(r'aria-label="Act 3 Part 1 [^"]*"', 'aria-label="%s"' % cfg['title'].replace('"', ''), s, count=1)
base = cfg['out'].replace('-v2.html', ''); rep("act3_part1_10m_mixed_audio.wav", base + "_mixed_audio.wav"); rep("act3_part1_10m_terrafab.webm", base + ".webm")
open(d + cfg['out'], 'w', encoding='utf8', newline='\n').write(s)
print('ok', cfg['out'], len(s) // 1024, 'KB', len(subs), 'captions')
