import os, io, base64, json
from PIL import Image, ImageFilter
d = 'C:/Users/Aryan Barman/personal/new_projects/projects/'
sp = d + 'characters/sprites/'
keys = [f'{c}_{p}' for c in ('jensen', 'elon') for p in ('idle', 'explain', 'point', 'think', 'present', 'arms', 'emph', 'hold', 'walk')] + ['pub_' + p for p in ('stand', 'explain', 'point', 'think', 'react', 'worried', 'phone')]
data = {}
for k in keys:
    im = Image.open(sp + k + '.png').convert('RGBA')
    im = im.resize((im.width * 2, im.height * 2), Image.LANCZOS).filter(ImageFilter.UnsharpMask(radius=1.2, percent=60, threshold=2))
    b = io.BytesIO(); im.save(b, 'PNG', optimize=True); data[k] = 'data:image/png;base64,' + base64.b64encode(b.getvalue()).decode()
print('sprites', len(data), sum(len(v) for v in data.values()) // 1024, 'KB')
import sys
f = sys.argv[1]
s = open(f, encoding='utf8', newline='').read()
JS = """  // ---- STICKMAN SPRITES (cut from the user's character sheets, embedded so canvas export is never tainted) ----
  const SPRITE_DATA = %s;
  const SPR = {}, SPR_LOAD = [];
  Object.keys(SPRITE_DATA).forEach(k => { const im = new Image(); im.src = SPRITE_DATA[k]; SPR[k] = im; SPR_LOAD.push(im.decode ? im.decode().catch(() => {}) : Promise.resolve()); });
  function pickPose(c, t) {
    const o = c.o || {}, main = c.role === 'jensen' || c.role === 'elon';
    if (o.pose) return o.pose;
    if ((o.walkAmt || 0) > 0.3) return 'walk';
    if (o.armAngleR < -1.9 && o.armAngleL > 1.7) return main ? 'emph' : 'react';
    if (o.armAngleR < -1.9 && !main) return 'worried';
    if (o.armAngleR < -1.2) return 'point';
    if (o.talk > 0.5) return 'explain';
    if (o.browTension > 0.7) return main ? 'think' : 'worried';
    return main ? 'arms' : 'stand';
  }
  function drawSpriteChar(c, p, sc, t) {
    const o = c.o || {}, main = c.role === 'jensen' || c.role === 'elon', pre = c.role === 'jensen' ? 'jensen_' : c.role === 'elon' ? 'elon_' : 'pub_';
    let pose = pickPose(c, t);
    if (pose === 'walk' && Math.floor(t * 5 + (o.phase || 0)) %% 2) pose = main ? 'idle' : 'stand';
    let img = SPR[pre + pose] || SPR[pre + (main ? 'idle' : 'stand')];
    if (!img || !img.complete || !img.naturalWidth) return false;
    const base = main ? 406 : 346, H = sc * 258.4 * (img.naturalHeight / base) * (main ? 1.0 : 0.95), W = H * img.naturalWidth / img.naturalHeight;
    const walking = (o.walkAmt || 0) > 0.3, ph = (o.phase || 0);
    const bob = walking ? Math.abs(Math.sin(t * 10 + ph)) * 0.035 * H : (o.talk > 0.5 ? Math.abs(Math.sin(t * 7 + ph)) * 0.008 * H : 0);
    const breathe = 1 + Math.sin(t * 2.2 + ph) * 0.006, tilt = walking ? Math.sin(t * 10 + ph) * 0.035 : 0;
    ctx.save(); ctx.translate(p.x, p.y);
    ctx.fillStyle = 'rgba(11,25,30,0.22)'; ctx.beginPath(); ctx.ellipse(0, 0, W * 0.34, H * 0.035, 0, 0, TAU); ctx.fill();
    ctx.translate(0, -bob); ctx.rotate(tilt); if ((o.facing || 1) < 0) ctx.scale(-1, 1);
    ctx.imageSmoothingEnabled = true; ctx.imageSmoothingQuality = 'high';
    ctx.drawImage(img, -W / 2, -H * breathe, W, H * breathe);
    ctx.restore(); return true;
  }

""" % json.dumps(data)
a = "  function drawCast(t, cast) {" if "  function drawCast(t, cast) {" in s else "  function renderShots(t) {"
assert s.count(a) == 1
s = s.replace(a, JS + a)
b = "      drawCharacter(p.x, p.y, sc, Object.assign({ role: c.role, t }, c.o));\n    });\n  }"
if s.count(b) == 1:
  s = s.replace(b, "      if (!drawSpriteChar(c, p, sc, t)) drawCharacter(p.x, p.y, sc, Object.assign({ role: c.role, t }, c.o));\n    });\n  }")
c = "  document.fonts.ready.then(() => {"
assert s.count(c) == 1
s = s.replace(c, "  Promise.all([document.fonts.ready].concat(SPR_LOAD)).then(() => {")
open(f, 'w', encoding='utf8', newline='\n').write(s)
print('written', len(s) // 1024, 'KB')
