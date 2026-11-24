import sys, json, re, subprocess, os, shutil
# usage: python run_a3.py cfg.json prefix t1,t2,...   -> builds, sprite-patches, syntax-checks, renders, makes 2x2 sheets <prefix>_sheetN.png
cfg = json.load(open(sys.argv[1])); pre = sys.argv[2]; ts = sys.argv[3].split(',')
SC = os.getcwd(); d = 'C:/Users/Aryan Barman/personal/new_projects/projects/'
def run(*a, **k):
    r = subprocess.run(a, capture_output=True, text=True, **k); return r
if len(sys.argv) < 5 or sys.argv[4] != 'norebuild':
    r = run('python', 'patch_a3gen.py', sys.argv[1]); print(r.stdout.strip(), r.stderr.strip()[-600:])
    if r.returncode: sys.exit(1)
    r = run('python', 'patch_sprites.py', d + cfg['out']); print(r.stdout.strip().split('\n')[-1])
s = open(d + cfg['out'], encoding='utf8').read()
open('chk_gen.js', 'w', encoding='utf8').write(max(re.findall(r'<script>(.*?)</script>', s, re.S), key=len))
r = run('node', '--check', 'chk_gen.js')
if r.returncode: print('SYNTAX ERROR', r.stderr[:700]); sys.exit(1)
print('SYNTAX_OK')
pv = 'C:/Users/Aryan Barman/Projects/learning/myenv-test/pv_gen.html'; shutil.copy(d + cfg['out'], pv)
env = dict(os.environ, SCR=SC)
r = subprocess.run(['node', 'cdp.js', 'pv_gen.html', ','.join(ts), pre], capture_output=True, text=True, env=env, timeout=550)
print('\n'.join(l for l in r.stdout.split('\n') if 'shot' not in l)[:600]); os.remove(pv)
from PIL import Image
for k in range(0, len(ts), 4):
    W = Image.new('RGB', (1920, 1080))
    for i, t in enumerate(ts[k:k + 4]): W.paste(Image.open('%s_%s.png' % (pre, t)).resize((960, 540)), ((i % 2) * 960, (i // 2) * 540))
    W.save('%s_sheet%d.png' % (pre, k // 4))
print('sheets', (len(ts) + 3) // 4)
