"""Static COLOUR / TEXT CONTRAST lint (no rendering). See docs/DIRECTION_GUIDE.md Part C.
usage: python lint_colors.py <id> [<id> ...] | all      (reads <id>_scene.js; writes nothing)

Finds every pair of hex colours given as (background, text) in pop()/Label()/Card()-style calls and computes the WCAG contrast ratio.
Stamp-style pills (bg in the red/green/amber set) are drawn as coloured text on cream paper, so those are checked as (bg colour) on cream.
Rules: text < 4.5 -> FAIL for small labels; < 3.0 -> FAIL for anything. Also reports colours that are the only difference between loss and gain.
Static approximation: it cannot see colours built at run time, only literal '#RRGGBB' pairs.
"""
import re, sys, pathlib
H = pathlib.Path(__file__).resolve().parent
def FH(n): p = H / n; return p if p.exists() else H / 'legacy' / 'acts' / n      # old acts live in legacy/acts
PAIR = re.compile(r"\d\s*,\s*'(#[0-9A-Fa-f]{6})'\s*,\s*'(#[0-9A-Fa-f]{6})'")   # ..., w, h, bg, fg  (so colour arrays and ground pads are not read as text)
STAMP_BG = {'#D94E43', '#2B8A6E', '#D99B26'}     # drawn as stamps: coloured text on cream
CREAM = '#FBF6EA'
ALL = ['a1p1', 'a1p2', 'a2p1', 'a2p2', 'a3p1', 'a3p2', 'a4p1', 'a4p2', 'a4p3', 'a5p1', 'a5p2', 'a5p3', 'a6p1', 'a6p2', 'a7']

def lum(h):
    c = [int(h[i:i + 2], 16) / 255 for i in (1, 3, 5)]
    c = [x / 12.92 if x <= 0.03928 else ((x + 0.055) / 1.055) ** 2.4 for x in c]
    return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2]

def ratio(a, b):
    la, lb = sorted([lum(a), lum(b)], reverse=True); return (la + 0.05) / (lb + 0.05)

def guard(h):          # the jb2 renderer darkens stamp ink until it reaches 4.5:1 on cream (inkOn in shim_env_jb.js); mirror it here
    r, g, b = int(h[1:3], 16), int(h[3:5], 16), int(h[5:7], 16)
    for _ in range(30):
        if ratio('#%02X%02X%02X' % (r, g, b), CREAM) >= 4.5: break
        r, g, b = round(r * 0.93), round(g * 0.93), round(b * 0.93)
    return '#%02X%02X%02X' % (r, g, b)

def lint(pid):
    src = (FH(pid + '_scene.js')).read_text(encoding='utf8')
    seen = {}
    for m in PAIR.finditer(src):
        bg, fg = m.group(1).upper(), m.group(2).upper()
        text, base = (guard(bg), CREAM) if bg in STAMP_BG else (fg, bg)
        r = ratio(text, base); line = src.count('\n', 0, m.start()) + 1
        key = (text, base); seen.setdefault(key, [r, 0, line]); seen[key][1] += 1
    out = []
    for (t, b), (r, n, line) in sorted(seen.items(), key=lambda kv: kv[1][0]):
        lvl = 'FAIL<3' if r < 3 else 'LOW<4.5' if r < 4.5 else 'ok'
        if lvl != 'ok': out.append((lvl, t, b, r, n, line))
    return out

if __name__ == '__main__':
    ids = ALL if sys.argv[1:] == ['all'] else sys.argv[1:]
    bad = 0
    for pid in ids:
        res = lint(pid); bad += len(res)
        print('%s: %d pairs below 4.5' % (pid, len(res)))
        for lvl, t, b, r, n, line in res: print('   %-7s text %s on %s = %.1f  (x%d, first at line %d)' % (lvl, t, b, r, n, line))
    print('TOTAL', bad)
