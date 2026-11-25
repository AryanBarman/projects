"""ONE COMMAND to build, check and LOOK at a part:   python check_short.py <id> [t1,t2,...] [--noshots]
 1. python build_jb.py <id>                      (build; prints SYNTAX_OK)
 2. motivation.py / budget.py / lint_colors.py   (camera, text budget, contrast; only the summary lines)
 3. renders stills with tools/cdp_p.js (portrait) or cdp.js and writes ONE contact sheet  ->  prints its path (open it with the Read tool: one image instead of many)
Default stills: the middle of every ledger beat plus 0.1 s and the last second. Needs Chrome and the myenv-test folder (see docs/SHORT_RECIPE.md)."""
import sys, os, json, shutil, subprocess, pathlib
H = pathlib.Path(__file__).resolve().parent; P = H.parent.parent
TEST = pathlib.Path('C:/Users/Aryan Barman/Projects/learning/myenv-test')
SCR = os.environ.get('SCR') or str(H / '_scratch'); os.makedirs(SCR, exist_ok=True)
pid = sys.argv[1]
if (H / 'stories' / (pid + '.story.json')).exists(): print(subprocess.run([sys.executable, str(H / 'compile_story.py'), pid], capture_output=True, text=True).stdout.strip())   # a story file is the only thing authored; compile it first
cfg = json.load(open(H / ('cfg_%s.json' % pid), encoding='utf8'))
run = lambda *a, **k: subprocess.run(list(map(str, a)), capture_output=True, text=True, **k)
r = run(sys.executable, H / 'build_jb.py', pid); print((r.stdout.strip().split('\n') or [''])[-1] or r.stderr[-400:])
if 'SYNTAX_OK' not in r.stdout: print(r.stdout[-600:], r.stderr[-600:]); sys.exit(1)
for tool in ('motivation.py', 'budget.py', 'lint_colors.py'):
    o = run(sys.executable, H / tool, pid).stdout.strip().split('\n'); print('%s: %s' % (tool, ' | '.join([l.strip() for l in o if 'TOTAL' in l or 'flags' in l and 'holds' in l][:2])))
    for l in o:
        if any(k in l for k in ('CUT', 'DEAD', 'LAND', 'FLY ', 'EMPTY', 'ARC', 'PUSH', 'PULL', 'FAIL<', 'LOW<')): print('   ' + l.strip())
if '--noshots' in sys.argv: sys.exit(0)
out = P / cfg.get('out_dir', 'jen_back2') / cfg['out']; shutil.copy(out, TEST / ('pv_%s.html' % pid))
arg = [a for a in sys.argv[2:] if not a.startswith('--')]
if arg: ts = [float(x) for x in arg[0].split(',')]
else:
    mids = []
    for row in cfg.get('ledger', []):
        a, b = row[0].split('-'); mids.append(round((float(a) + float(b)) / 2, 1))
    ts = sorted(set([0.1] + mids + [round(cfg['dur'] - 0.3, 1)]))
tool = 'cdp_p.js' if cfg.get('portrait') else 'cdp.js'
env = dict(os.environ, SCR=SCR); r = subprocess.run(['node', str(P / 'tools' / tool), 'pv_%s.html' % pid, ','.join(map(str, ts)), 'chk_' + pid], capture_output=True, text=True, env=env, timeout=900)
errs = [l for l in r.stdout.split('\n') if 'EXC' in l or 'NOT READY' in l]
if errs: print('RENDER PROBLEM:', errs[:3])
from PIL import Image, ImageDraw
port = bool(cfg.get('portrait')); W, Hh = (270, 480) if port else (480, 270); cols = min(len(ts), 8 if port else 4); rows = -(-len(ts) // cols)
sheet = Image.new('RGB', (W * cols, Hh * rows), 'white')
for i, t in enumerate(ts):
    f = pathlib.Path(SCR) / ('chk_%s_%s.png' % (pid, t if str(t) != '0.0' else 0))
    if not f.exists(): f = pathlib.Path(SCR) / ('chk_%s_%s.png' % (pid, int(t) if t == int(t) else t))
    if f.exists(): im = Image.open(f).convert('RGB').resize((W, Hh)); ImageDraw.Draw(im).text((5, 3), 't=%s' % t, fill=(255, 0, 0)); sheet.paste(im, ((i % cols) * W, (i // cols) * Hh))
sp = pathlib.Path(SCR) / ('sheet_%s.png' % pid); sheet.save(sp); print('CONTACT SHEET:', sp, sheet.size)
