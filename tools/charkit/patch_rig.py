"""Embed RigKit (rigkit.js + heads atlas) into a built page and route Char() sprites through it.
Usage: python patch_rig.py <page.html>   (idempotent; patches in place - run on the NEW file only, never an original)
Roles known to RigKit (jensen elon trump vance cheung reed kress compliance board banker bondholder engineer employee
spacex factory supply journalist trader + aliases analyst host lawyer public ...) are drawn with the hybrid rig;
any other role keeps the old path. Hooks drawSpriteChar (patch_sprites.py) or, if absent, drawCast's drawCharacter call.
"""
import sys, base64, pathlib
H = pathlib.Path(__file__).parent
f = pathlib.Path(sys.argv[1]); s = f.read_text(encoding='utf8')
if 'RIGKIT_EMBED' in s: print('already patched'); sys.exit(0)
js = (H / 'rigkit.js').read_text(encoding='utf8')
atlas = base64.b64encode((H / 'heads_atlas.webp').read_bytes()).decode()
NL = chr(10)
import json
b64 = lambda n: base64.b64encode((H / n).read_bytes()).decode()
extra = ''
if (H / 'poses_atlas.webp').exists():
    extra = ("RigKit.loadExtra('data:image/webp;base64," + b64('heads_expr10.webp') + "','data:image/webp;base64," + b64('poses_atlas.webp') + "'," + (H / 'sprites_meta.json').read_text() + ");" + NL)
if (H / 'people_atlas.webp').exists():
    extra += "RigKit.loadPub('data:image/webp;base64," + b64('people_atlas.webp') + "'," + (H / 'people_meta.json').read_text() + ");" + NL
inj = '<script>/*RIGKIT_EMBED*/' + NL + js + NL + "RigKit.load('data:image/webp;base64," + atlas + "',{cell:96});" + NL + extra + '</script>' + NL
# rigDraw must live in the same scope as `ctx` (inside the page's main script), so it is spliced next to the hook
RIGFN = ('function rigDraw(c,p,sc,t){ if(!window.RigKit||!RigKit.specOf||RigKit.roles.indexOf(c.role)<0) return false; '
         'RigKit.draw(ctx,c.role,p.x,p.y,sc,c.o||{},t); return true; }' + NL)
i = s.rfind('<script>')
assert i >= 0, 'no <script> found'
s = s[:i] + inj + s[i:]
a = 'function drawSpriteChar(c, p, sc, t) {'
if a in s:
    s = s.replace(a, RIGFN + a + NL + '    if (rigDraw(c, p, sc, t)) return true;', 1)
else:
    b = 'drawCharacter(p.x, p.y, sc, Object.assign({ role: c.role, t }, c.o));'
    assert b in s, 'no hook found'
    s = s.replace(b, 'if (!rigDraw(c, p, sc, t)) ' + b, 1)
    s = s.replace('function drawCast(t, cast) {', RIGFN + 'function drawCast(t, cast) {', 1)
f.write_text(s, encoding='utf8', newline=NL); print('patched', f.name, len(s) // 1024, 'KB')
