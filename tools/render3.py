import sys, os, re, subprocess, shutil
# usage: python render3.py <name> <prefix> t1,t2,...   (builds the -3d file, syntax-checks it, renders stills, makes 2x2 sheets)
sys.path.insert(0, os.getcwd())
import build3
name, pre, ts = sys.argv[1], sys.argv[2], sys.argv[3].split(',')
out, kb = build3.build(name); print('built', out, kb, 'KB')
D = build3.D
s = open(D + out, encoding='utf8').read()
open('chk3d.js', 'w', encoding='utf8').write(max(re.findall(r'<script>(.*?)</script>', s, re.S), key=len))
r = subprocess.run(['node', '--check', 'chk3d.js'], capture_output=True, text=True)
if r.returncode: print('SYNTAX ERROR', r.stderr[:800]); sys.exit(1)
print('SYNTAX_OK')
pv = 'C:/Users/Aryan Barman/Projects/learning/myenv-test/pv_gen.html'; shutil.copy(D + out, pv)
env = dict(os.environ, SCR=os.getcwd())
r = subprocess.run(['node', 'cdp.js', 'pv_gen.html', ','.join(ts), pre], capture_output=True, text=True, env=env, timeout=550)
print('\n'.join(l for l in r.stdout.split('\n') if 'shot' not in l)[:900]); os.remove(pv)
from PIL import Image
for k in range(0, len(ts), 4):
    W = Image.new('RGB', (1920, 1080))
    for i, t in enumerate(ts[k:k + 4]):
        f = '%s_%s.png' % (pre, t)
        if os.path.exists(f): W.paste(Image.open(f).resize((960, 540)), ((i % 2) * 960, (i // 2) * 540))
    W.save('%s_sheet%d.png' % (pre, k // 4))
print('sheets', (len(ts) + 3) // 4)
