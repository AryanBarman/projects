"""Cut the 8 individual character sheets (jen_back/characters/individual character sheets):
  - 10 expression heads per character  -> heads_expr10.png/.json  (rows = characters, 10 cols, 96px cells... stored at 128 then webp)
  - 7-8 key-pose full-body sprites     -> poses_atlas.png/.json   (native pixel size, shelf packed)
Segmentation is automatic (flood the cream panel background, keep big connected blobs, sort by position), so the exact
panel coordinates only need to be roughly right.   Usage: python cut_individual.py [--debug]
"""
import json, pathlib, sys
from collections import deque
from PIL import Image

HERE = pathlib.Path(__file__).parent
SRC = HERE.parent.parent / 'jen_back/characters/individual character sheets'
SHEETS = {  # role -> (file, expression names row1+row2, pose names in order)
    'jensen': ('Jensen Huang NVIDIA Character Sheet.png', 'neutral confident thinking concerned surprised speaking determined smiling serious focused', 'present explain point think podium walk tablet'),
    'kress': ('Colette Kress NVIDIA Character Sheet.png', 'neutral confident thinking concerned surprised speaking determined calm skeptical focused', 'podium explain point think tablet walk present'),
    'trump': ('Donald Trump Character Sheet_ Patriotic Comic Infographic.png', 'neutral confident smirk angry speaking surprised thinking skeptical determined satisfied', 'podium explain point negotiate think cross walk rally'),
    'elon': ('Elon Musk Tech Character Sheet.png', 'neutral confident smirk focused amused angry speaking surprised thinking determined', 'podium present point think cross walk explain rally'),
    'vance': ('JD Vance Character Sheet.png', 'neutral confident serious concerned angry speaking emphatic thinking skeptical determined', 'podium explain point discuss think cross walk raised'),
    'reed': ('Jack Reed Character Sheet.png', 'neutral serious concerned thinking skeptical speaking assertive angry determined firm', 'podium explain point think cross walk document'),
    'board': ('NVIDIA Board Member Character Sheet.png', 'neutral confident thinking concerned surprised skeptical disagreeing explaining determined worried', 'meeting explain point think cross walk tablet present'),
    'cheung': ('Steven Cheung Character Sheet Poster.png', 'neutral confident serious angry speaking dismissive defensive focused thinking smirking', 'podium explain point think cross walk statement call'),
}
EXPR_BOX = (1030, 92, 1536, 352)      # x0,y0,x1,y1 expression panel (generous)
POSE_BOX = (340, 392, 1536, 695)      # key poses panel (generous)
CELL = 128


def is_bg(p):  # cream panel paper
    r, g, b = p
    return r > 205 and g > 198 and b > 175 and (max(r, g, b) - min(r, g, b)) < 60


def blobs(im, box, min_w, min_h, max_w=9999, max_h=9999, dil=2):
    c = im.crop(box).convert('RGB'); w, h = c.size; px = c.load()
    bg = [[is_bg(px[x, y]) for x in range(w)] for y in range(h)]
    # blobs = connected non-bg pixels (dilated by `dil` so detached hair/hands join the figure)
    seen = [[False] * w for _ in range(h)]; out = []
    for y in range(h):
        for x in range(w):
            if bg[y][x] or seen[y][x]: continue
            st = [(x, y)]; seen[y][x] = True; pts = []
            while st:
                a, b = st.pop(); pts.append((a, b))
                for dx in range(-dil, dil + 1):
                    for dy in range(-dil, dil + 1):
                        nx, ny = a + dx, b + dy
                        if 0 <= nx < w and 0 <= ny < h and not bg[ny][nx] and not seen[ny][nx]:
                            seen[ny][nx] = True; st.append((nx, ny))
            xs = [p[0] for p in pts]; ys = [p[1] for p in pts]
            bw, bh = max(xs) - min(xs) + 1, max(ys) - min(ys) + 1
            if bw >= min_w and bh >= min_h and bw <= max_w and bh <= max_h and min(xs) > 1 and min(ys) > 1 and max(xs) < w - 2 and max(ys) < h - 2:
                out.append({'box': (min(xs), min(ys), max(xs) + 1, max(ys) + 1), 'pts': pts})
    return c, bg, out


def sprite(c, bg, blob):
    x0, y0, x1, y1 = blob['box']
    spr = Image.new('RGBA', (x1 - x0, y1 - y0), (0, 0, 0, 0)); sp = spr.load(); cp = c.load()
    keep = set(blob['pts'])
    # flood the paper that is *outside* the figure from the blob border so inner paper (e.g. between legs) is also removed
    for (a, b) in blob['pts']:
        if x0 <= a < x1 and y0 <= b < y1: sp[a - x0, b - y0] = cp[a, b] + (255,)
    return spr


def main(debug=False, expr_only=False):
    heads_rows, pose_items, meta = [], [], {'expr': {}, 'poses': {}}
    for role, (fn, ex, po) in SHEETS.items():
        im = Image.open(SRC / fn)
        # ---- expressions: 10 head blobs, 2 rows x 5
        c, bg, bl = blobs(im, EXPR_BOX, 40, 44, 140, 150, dil=2)
        bl = [b for b in bl if b['box'][3] - b['box'][1] > 44]
        bl.sort(key=lambda b: (b['box'][1] + b['box'][3]) / 2)
        top, bot = sorted(bl[:5], key=lambda b: b['box'][0]), sorted(bl[5:10], key=lambda b: b['box'][0])
        if len(bl) != 10: print('WARN', role, 'expression blobs:', len(bl))
        names = ex.split()
        row = Image.new('RGBA', (10 * CELL, CELL), (0, 0, 0, 0))
        allb = (top + bot)[:10]; hs = sorted(b['box'][3] - b['box'][1] for b in allb); med = hs[len(hs) // 2]
        for i, b in enumerate(allb):
            s = sprite(c, bg, b)
            if s.height > med * 1.12: s = s.crop((0, 0, s.width, med))      # drop the text label glued under a head
            k = min((CELL - 4) / s.width, (CELL - 4) / s.height)
            s = s.resize((max(1, round(s.width * k)), max(1, round(s.height * k))), Image.LANCZOS)
            row.paste(s, (i * CELL + (CELL - s.width) // 2, CELL - s.height - 2), s)
        heads_rows.append((role, row)); meta['expr'][role] = names
        # ---- poses
        if expr_only: continue
        pn = po.split(); best = None
        for y0 in (392, 380, 368, 356, 404, 344):
            for y1 in (690, 672, 656, 700):
                for dil in (3, 2, 4):
                    c, bg, bl = blobs(im, (POSE_BOX[0], y0, POSE_BOX[2], y1), 60, 130, 400, 330, dil=dil)
                    if best is None or abs(len(bl) - len(pn)) < abs(len(best[2]) - len(pn)): best = (c, bg, bl)
                    if len(bl) == len(pn): break
                if best and len(best[2]) == len(pn): break
            if best and len(best[2]) == len(pn): break
        c, bg, bl = best
        bl.sort(key=lambda b: b['box'][0])
        if len(bl) != len(pn): print('WARN', role, 'pose blobs', len(bl), 'expected', len(pn), [b['box'] for b in bl])
        for n, b in zip(pn, bl):
            pose_items.append((role, n, sprite(c, bg, b)))
        if debug:
            print(role, 'expr', len(top), len(bot), 'poses', [(b['box'][2] - b['box'][0], b['box'][3] - b['box'][1]) for b in bl])
    if expr_only:
        old = json.loads((HERE / 'sprites_meta.json').read_text()); old['expr'] = meta['expr']; meta = old
    # heads_expr10 atlas
    A = Image.new('RGBA', (10 * CELL, len(heads_rows) * CELL), (0, 0, 0, 0))
    for i, (role, row) in enumerate(heads_rows): A.paste(row, (0, i * CELL))
    A.save(HERE / 'heads_expr10.png'); meta['exprRows'] = [r for r, _ in heads_rows]; meta['exprCell'] = CELL
    if expr_only:
        A.save(HERE / 'heads_expr10.png'); meta['exprRows'] = [r for r, _ in heads_rows]; meta['exprCell'] = CELL
        (HERE / 'sprites_meta.json').write_text(json.dumps(meta)); print('expr only done'); return
    # poses atlas: shelf pack at native size
    W = 2048; x = y = rowh = 0; P = Image.new('RGBA', (W, 2400), (0, 0, 0, 0))
    for role, n, s in pose_items:
        if x + s.width > W: x = 0; y += rowh + 2; rowh = 0
        P.paste(s, (x, y)); meta['poses'].setdefault(role, {})[n] = [x, y, s.width, s.height]; x += s.width + 2; rowh = max(rowh, s.height)
    P = P.crop((0, 0, W, y + rowh + 2)); P.save(HERE / 'poses_atlas.png')
    # reference scale per character: median height of upright poses (excl. podium/meeting which include furniture)
    for role, d in meta['poses'].items():
        hs = sorted(v[3] for k, v in d.items() if k not in ('podium', 'meeting'))
        meta['poses'][role]['_ref'] = hs[len(hs) // 2]
    (HERE / 'sprites_meta.json').write_text(json.dumps(meta))
    # contact sheets for checking
    A2 = Image.new('RGB', A.size, (180, 200, 190)); A2.paste(A, (0, 0), A); A2.resize((A.width // 2, A.height // 2)).save(HERE / 'expr10_contact.png')
    P2 = Image.new('RGB', P.size, (180, 200, 190)); P2.paste(P, (0, 0), P); P2.save(HERE / 'poses_contact.png')
    print('poses', len(pose_items), 'atlas', P.size)


if __name__ == '__main__':
    main('--debug' in sys.argv, '--expr-only' in sys.argv)
