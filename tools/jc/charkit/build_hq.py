"""Cut the HIGH-RES character sets in projects/characters/<name>/ into ONE atlas (poses_hq.webp) + meta (sprites_hq_meta.json) for the crash series.
usage: python build_hq.py            (writes the two files next to this script; also a contact sheet hq_contact.png to look at)
Sources: jensen/ = 15 single PNGs on a GREEN screen (chroma-keyed, corner watermark removed); elon/ = one sheet of 6 on BLACK (background found by flood from the border);
trader / federal reserve chair / lawmaker = sheets of 6 with transparency (split by empty columns).
Every character is scaled by ONE factor (its neutral standing pose = STAND px tall), so poses keep their relative size (podium, chair ...). meta[head] = {pose: [x,y,w,h], _ref: STAND, _flip: 1 if the art faces LEFT}."""
import json, pathlib, sys
import numpy as np
from PIL import Image
from scipy import ndimage as ndi
H = pathlib.Path(__file__).resolve().parent; CH = H.parent.parent.parent / 'characters'; STAND = 440; PAD = 4

def keep_big(a, lo=10):                       # keep the largest connected blob of the alpha mask
    lab, n = ndi.label(a > lo)
    if n <= 1: return a
    sizes = ndi.sum(np.ones_like(lab), lab, range(1, n + 1)); big = 1 + int(np.argmax(sizes))
    return np.where(lab == big, a, 0).astype(a.dtype)

def key_green(im, keep=True):
    a = np.asarray(im.convert('RGBA')).astype(np.int16); r, g, b = a[..., 0], a[..., 1], a[..., 2]
    green = (g > 120) & (g > r * 1.35) & (g > b * 1.35)
    alpha = np.where(green, 0, 255).astype(np.uint8)
    alpha = ndi.binary_opening(alpha > 0, iterations=1).astype(np.uint8) * 255                # drop speckles
    edge = ndi.binary_dilation(alpha == 0, iterations=2) & (alpha > 0)                          # despill the green fringe
    g2 = np.where(edge, np.minimum(g, np.maximum(r, b)), g)
    out = np.dstack([r, g2, b, alpha]).astype(np.uint8); h, w = alpha.shape
    out[int(h * 0.80):, int(w * 0.82):, 3] = 0                                                  # corner watermark (sparkle)
    if keep: out[..., 3] = keep_big(out[..., 3])
    return Image.fromarray(out, 'RGBA')

def key_black(im, thin=4):
    """background = pure black connected to the border; the sticker outline (>= thin) walls it off, so the black jacket inside stays."""
    a = np.asarray(im.convert('RGB')).astype(np.int16); wall = a.max(axis=2) >= thin; wd = ndi.binary_dilation(wall, iterations=3)
    lab, n = ndi.label(~wd); edge = set(np.unique(np.concatenate([lab[0], lab[-1], lab[:, 0], lab[:, -1]]))) - {0}
    bg = ndi.binary_dilation(np.isin(lab, list(edge)), iterations=3) & ~wall; alpha = np.where(bg, 0, 255).astype(np.uint8)
    alpha = ndi.binary_opening(alpha > 0, iterations=1).astype(np.uint8) * 255
    return Image.fromarray(np.dstack([a.astype(np.uint8), alpha]), 'RGBA')

def split_sheet(im, n=6, thr=100):
    a = np.asarray(im.convert('RGBA'))[..., 3]; m = a > thr; col = m.sum(axis=0).astype(float); W = len(col); step = W / n
    cuts = [0]
    for i in range(1, n):                                    # the emptiest column near each 1/6 boundary (gestures can overlap neighbours, so no strict gap is assumed)
        lo, hi = int(i * step - step * 0.35), int(i * step + step * 0.35); cuts.append(lo + int(np.argmin(col[lo:hi])))
    cuts.append(W); out = []
    for x0, x1 in zip(cuts[:-1], cuts[1:]):
        sub = im.crop((x0, 0, x1, im.size[1])).convert('RGBA'); arr = np.array(sub); arr[..., 3] = np.where(arr[..., 3] > thr, 255, 0)
        arr[..., 3] = keep_big(arr[..., 3]); out.append(Image.fromarray(arr, 'RGBA'))
    return out

def trim(im):
    bb = im.getchannel('A').point(lambda v: 255 if v > 8 else 0).getbbox(); return im.crop(bb)

SETS = {}
def jensen():
    d = CH / 'jensen'; files = {p.name: p for p in d.glob('*.png')}
    find = lambda k: next(p for n, p in sorted(files.items()) if n.startswith(k))
    M = {'cross': 'Cartoon_character_crossing', 'panic': 'Cartoon_character_looking_surprised', 'point': 'Cartoon_character_pointing', 'run': 'Cartoon_character_running',
         'shrug': 'Cartoon_character_shrugging', 'sit': 'Cartoon_character_sitting', 'thumbs': 'Character_giving_thumbs'}
    out = {k: trim(key_green(Image.open(find(v)))) for k, v in M.items()}
    st = key_green(Image.open(find('Character_looking_overwhelmed')), keep=False); arr = np.array(st); h = arr.shape[0]; arr[:int(h * 0.2), :, 3] = 0; arr[int(h * 0.80):, :, 3] = 0   # drop the title and the captions of the 7-pose strip
    st = Image.fromarray(arr, 'RGBA'); strip = split_sheet(st, 7, 100)
    sp = {k: trim(im) for k, im in zip(['charge', 'cheer', 'overwhelmed', 'walk', 'chair', 'think', 'why'], strip)}
    f = out['cross'].size[1] / sp['charge'].size[1]          # the strip is drawn smaller than the single poses: bring its standing figure to the same height
    for k, im in sp.items(): out[k] = im.resize((round(im.size[0] * f), round(im.size[1] * f)), Image.LANCZOS)
    return out
def sheet(folder, fname, names, key=None, thr=100):
    im = Image.open(CH / folder / fname); im = key(im) if key else im.convert('RGBA'); return dict(zip(names, [trim(p) for p in split_sheet(im, 6, thr)]))
CHAR = {
    'jensen': (jensen, 0, 'cross'),
    'elon': (lambda: sheet('elon', 'Six Cartoon Musk-Like Poses.png', ['cross', 'explain', 'think', 'cheer', 'point', 'shrug'], key_black), 0, 'cross'),
    'trader': (lambda: sheet('wall steet trader', 'Six Wall Street Trader Cartoon Poses.png', ['cross', 'hold', 'think', 'shout', 'tablet', 'shrug']), 0, 'cross'),
    'fed': (lambda: sheet('federal reserve chair', 'Federal Reserve Chair Sticker Poses.png', ['cross', 'podium', 'think', 'sign', 'paper', 'stop']), 0, 'cross'),
    'lawmaker': (lambda: sheet('Congressional Committee Lawmaker  Subpoena Chair', 'Congressional Chair Sticker Pose Set.png', ['cross', 'podium', 'subpoena', 'point', 'paper', 'plead'], thr=200), 0, 'cross'),
}
only = sys.argv[1:] or list(CHAR); packed, meta, items = [], {}, []
for name in only:
    fn, flip, ref = CHAR[name]; poses = fn(); s = STAND / poses[ref].size[1]; meta[name] = {'_ref': STAND, '_flip': flip}
    for k, im in poses.items(): items.append((name, k, im.resize((max(1, round(im.size[0] * s)), max(1, round(im.size[1] * s))), Image.LANCZOS)))
W = 4096; x = y = rowh = 0; place = []
for name, k, im in items:
    w, h = im.size
    if x + w + PAD > W: x, y, rowh = 0, y + rowh + PAD, 0
    place.append((name, k, im, x, y)); meta[name][k] = [x, y, w, h]; x += w + PAD; rowh = max(rowh, h)
atlas = Image.new('RGBA', (W, y + rowh + PAD), (0, 0, 0, 0))
for name, k, im, px, py in place: atlas.paste(im, (px, py))
atlas.save(H / 'poses_hq.png'); atlas.save(H / 'poses_hq.webp', quality=92, method=6); (H / 'sprites_hq_meta.json').write_text(json.dumps(meta), encoding='utf8')
sheet_im = Image.new('RGB', (W // 3, atlas.size[1] // 3), (120, 160, 200)); small = atlas.resize((W // 3, atlas.size[1] // 3)); sheet_im.paste(small, (0, 0), small); sheet_im.save(H / 'hq_contact.png')
print('atlas', atlas.size, 'poses', len(items), {n: len(v) - 2 for n, v in meta.items()}); (H / 'poses_hq.png').unlink()
