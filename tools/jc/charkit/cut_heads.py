"""Cut the head sheet into a transparent atlas: per character 6 views + 6 expressions.
Usage: python cut_heads.py   -> writes heads_atlas.png, heads_atlas.json, heads_contact.png (check image)
Source: P/jen_back/characters/heads/Documentary Character Head Turn Sheets.png (1536x1024)
"""
import json, pathlib
from PIL import Image
from collections import deque

HERE = pathlib.Path(__file__).parent
SRC = HERE.parent.parent / 'jen_back/characters/heads/Documentary Character Head Turn Sheets.png'
CHARS = [['jensen', 'elon', 'trump', 'vance'], ['cheung', 'reed', 'kress', 'compliance'],
         ['board', 'banker', 'bondholder', 'engineer'], ['factory', 'supply', 'journalist', 'trader']]
BX = [5, 388, 772, 1157]            # block left edges
HEAD_Y = [148, 392, 620, 860]       # y centre of the 6 view heads per block row
EXPR_Y = [240, 483, 712, 957]       # y centre of the 6 expression heads
VIEWS = ['front', 'q_left', 'left', 'back', 'right', 'q_right']
CELL_W, CELL_H = 58, 66
OUT = 128                           # each head is scaled to fit OUT x OUT in the atlas

im = Image.open(SRC).convert('RGB')


CORNER = (230, 220, 200)


def is_bg(p):
    r, g, b = p
    if min(r, g, b) > 150 and (max(r, g, b) - min(r, g, b)) < 55: return True
    return abs(r - CORNER[0]) + abs(g - CORNER[1]) + abs(b - CORNER[2]) < 80


def cut(cx, cy):
    x0, y0 = int(cx - CELL_W / 2), int(cy - CELL_H / 2)
    c = im.crop((x0, y0, x0 + CELL_W, y0 + CELL_H))
    w, h = c.size
    px = c.load()
    global CORNER
    border = [px[x, 0] for x in range(c.size[0])] + [px[x, c.size[1] - 1] for x in range(c.size[0])] + [px[0, y] for y in range(c.size[1])] + [px[c.size[0] - 1, y] for y in range(c.size[1])]
    CORNER = tuple(sorted(p[i] for p in border)[len(border) // 2] for i in range(3))
    bg = [[False] * w for _ in range(h)]
    q = deque()
    for x in range(w):
        for y in (0, h - 1):
            if is_bg(px[x, y]): bg[y][x] = True; q.append((x, y))
    for y in range(h):
        for x in (0, w - 1):
            if (is_bg(px[x, y]) or sum(px[x, y]) > 330) and not bg[y][x]: bg[y][x] = True; q.append((x, y))
    while q:
        x, y = q.popleft()
        for dx, dy in ((1, 0), (-1, 0), (0, 1), (0, -1)):
            nx, ny = x + dx, y + dy
            if 0 <= nx < w and 0 <= ny < h and not bg[ny][nx]:
                a, b = px[x, y], px[nx, ny]
                if is_bg(b) or (sum(b) > 330 and max(b) - min(b) < 80 and sum(abs(a[i] - b[i]) for i in range(3)) < 34):
                    bg[ny][nx] = True; q.append((nx, ny))
    rgba = Image.new('RGBA', (w, h))
    rp = rgba.load()
    for y in range(h):
        for x in range(w):
            r, g, b = px[x, y]
            rp[x, y] = (r, g, b, 0 if bg[y][x] else 255)
    # drop small components (label text residue)
    seen = [[False] * w for _ in range(h)]; comps = []
    for y in range(h):
        for x in range(w):
            if bg[y][x] or seen[y][x]: continue
            st = [(x, y)]; seen[y][x] = True; cm = []
            while st:
                a, b2 = st.pop(); cm.append((a, b2))
                for dx in (-2, -1, 0, 1, 2):
                    for dy in (-2, -1, 0, 1, 2):
                        nx, ny = a + dx, b2 + dy
                        if 0 <= nx < w and 0 <= ny < h and not bg[ny][nx] and not seen[ny][nx]:
                            seen[ny][nx] = True; st.append((nx, ny))
            comps.append(cm)
    if comps:
        big = max(len(c) for c in comps)
        for cm in comps:
            if len(cm) < big * 0.25:
                for a, b2 in cm: rp[a, b2] = (0, 0, 0, 0)
    bb = rgba.getbbox()
    if not bb: return rgba.resize((OUT, OUT))
    rgba = rgba.crop(bb)
    s = min((OUT - 4) / rgba.width, (OUT - 4) / rgba.height)
    rgba = rgba.resize((max(1, round(rgba.width * s)), max(1, round(rgba.height * s))), Image.LANCZOS)
    cell = Image.new('RGBA', (OUT, OUT), (0, 0, 0, 0))
    cell.paste(rgba, ((OUT - rgba.width) // 2, OUT - rgba.height - 2), rgba)   # bottom-aligned so the chin sits at one line
    return cell


names = [n for row in CHARS for n in row]
COLS = 12
atlas = Image.new('RGBA', (COLS * OUT, len(names) * 2 * OUT // 2 * 1), (0, 0, 0, 0))
atlas = Image.new('RGBA', (COLS * OUT, len(names) * OUT), (0, 0, 0, 0))
meta = {'cell': OUT, 'cols': COLS, 'chars': {}}
for r, row in enumerate(CHARS):
    for c, name in enumerate(row):
        idx = names.index(name)
        for i in range(6):
            cx = BX[c] + 42 + i * 58.5
            atlas.paste(cut(cx, HEAD_Y[r]), (i * OUT, idx * OUT))
            atlas.paste(cut(cx, EXPR_Y[r]), ((6 + i) * OUT, idx * OUT))
        meta['chars'][name] = {'row': idx}
meta['views'] = VIEWS
atlas.save(HERE / 'heads_atlas.png', optimize=True)
(HERE / 'heads_atlas.json').write_text(json.dumps(meta))

# contact sheet for checking
sc = Image.new('RGB', (COLS * 64, len(names) * 64), (200, 190, 170))
small = atlas.resize((COLS * 64, len(names) * 64), Image.LANCZOS)
sc.paste(small, (0, 0), small)
sc.save(HERE / 'heads_contact.png')
print('atlas', atlas.size, 'chars', len(names))
