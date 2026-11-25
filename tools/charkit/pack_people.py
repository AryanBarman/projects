"""Pack the old 'normal people' sprites (projects/characters/sprites: pub_* = one student with 10 poses, var_* = 8 head-and-shoulder busts)
into people_atlas.webp + people_meta.json (native size, shelf packed), and patch rigkit.js with the 'student' role + RigKit.bust()."""
import json, pathlib, glob
from PIL import Image
H = pathlib.Path(__file__).parent; SRC = H.parent.parent / 'characters' / 'sprites'
fs = sorted(glob.glob(str(SRC / 'pub_*.png')) + glob.glob(str(SRC / 'var_*.png')))
W = 1024; x = y = rh = 0; atlas = Image.new('RGBA', (W, 700), (0, 0, 0, 0)); meta = {}
for f in fs:
    im = Image.open(f).convert('RGBA'); n = pathlib.Path(f).stem
    if x + im.width > W: x = 0; y += rh + 2; rh = 0
    atlas.paste(im, (x, y)); meta[n] = [x, y, im.width, im.height]; x += im.width + 2; rh = max(rh, im.height)
atlas = atlas.crop((0, 0, W, y + rh + 2)); atlas.save(H / 'people_atlas.webp', quality=90, method=6); (H / 'people_meta.json').write_text(json.dumps(meta))
print('people atlas', atlas.size, len(meta))

p = H / 'rigkit.js'; s = p.read_text(encoding='utf8')
if 'drawStudent' not in s:
    s = s.replace("  const specOf = r =>", "  OUT.student = Object.assign({}, OUT.employee);\n  const specOf = r =>", 1)
    s = s.replace("  function draw1(c, role, x, y, sc, o, t) {\n    o = o || {}; t = t || 0;", """  // the old 'normal people' sprites: role 'student' = one casual person with 10 poses; RigKit.bust() draws the 8 head-and-shoulder variants
  const STU = { idle: 'stand', stand: 'stand', talk: 'explain', explain: 'explain', point: 'point', think: 'think', panic: 'worried', worried: 'worried', cheer: 'cheer', crowd: 'crowd', phone: 'phone', hold: 'phone', sit: 'laptop', laptop: 'laptop', shrug: 'react', react: 'react', walk: 'stand', wave: 'cheer', cross: 'stand', present: 'explain' };
  function drawStudent(c, x, y, sc, o, t) {
    const d = K.pubMeta; let nm = (o.pose || '').replace('spr:', '');
    if (!nm) nm = (o.walkAmt || 0) > 0.3 ? 'walk' : (o.armAngleR || 0) < -1.2 ? 'point' : (o.browTension || 0) > 0.7 ? 'worried' : (o.talk || 0) > 0.5 ? 'talk' : 'idle';
    const r = d['pub_' + (STU[nm] || 'stand')]; if (!r) return false;
    const ph = o.phase || 0, k = 258 * 0.9 / 171 * sc * K.sizeMul * (o.sprScale || 1), fx = o.facing < 0 ? -1 : 1, walk = nm === 'walk';
    const bob = walk ? Math.abs(Math.sin(t * 9 + ph)) * 5 : Math.sin(t * 2.1 + ph) * 1.2, minH = K.crowdMinPx * 0.9; let kk = k; if (r[3] * kk < minH) kk = minH / r[3];
    if (o.alpha !== undefined) c.globalAlpha = o.alpha;
    c.save(); c.translate(x, y); if (o.shadow !== 0) { c.fillStyle = 'rgba(0,0,0,.22)'; c.beginPath(); c.ellipse(0, 2, r[2] * kk * 0.35, 7 * sc, 0, 0, 7); c.fill(); }
    c.translate(0, -bob * sc); c.rotate(walk ? Math.sin(t * 9 + ph) * 0.03 : 0); c.scale(fx, 1); c.imageSmoothingQuality = 'high';
    c.drawImage(K.pub, r[0], r[1], r[2], r[3], -r[2] * kk / 2, -r[3] * kk, r[2] * kk, r[3] * kk); c.restore(); return true;
  }
  function draw1(c, role, x, y, sc, o, t) {
    o = o || {}; t = t || 0;
    if (role === 'student' && K.pub && K.pubMeta && drawStudent(c, x, y, sc, o, t)) return;""", 1)
    s = s.replace("const isS = n => typeof n === 'string' && n.indexOf('spr:') === 0;", "const isS = n => typeof n === 'string' && n.indexOf('spr:') === 0 || role === 'student';", 1)
    s = s.replace("    crowdRole(i)", """    loadPub(src, meta, cb) { const im = new Image(); im.onload = () => { K.pub = im; K.pubMeta = meta; cb && cb(); }; im.src = src; },
    bust(g, name, x, y, w, h) { const r = K.pubMeta && K.pubMeta['var_' + name]; if (!r || !K.pub) return; const k = Math.min(w / r[2], h / r[3]); g.drawImage(K.pub, r[0], r[1], r[2], r[3], x + (w - r[2] * k) / 2, y + h - r[3] * k, r[2] * k, r[3] * k); },
    busts: ['man', 'woman', 'office', 'senior', 'srwoman', 'student', 'midwoman', 'young'],
    crowdRole(i)""", 1)
    p.write_text(s, encoding='utf8'); print('rigkit: student role + bust added')

# patch_rig.py: embed the people atlas
q = H / 'patch_rig.py'; t = q.read_text(encoding='utf8')
if 'people_atlas' not in t:
    t = t.replace("inj = '<script>", "if (H / 'people_atlas.webp').exists():\n    extra += \"RigKit.loadPub('data:image/webp;base64,\" + b64('people_atlas.webp') + \"',\" + (H / 'people_meta.json').read_text() + \");\" + NL\ninj = '<script>", 1)
    q.write_text(t, encoding='utf8'); print('patch_rig updated')
