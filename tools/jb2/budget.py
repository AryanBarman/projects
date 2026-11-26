"""Per-idea ASSET BUDGET (static). See docs/DIRECTION_GUIDE.md Part D.
usage: python budget.py <id> [<id> ...] | all
Splits <id>_scene.js at the '// ===== S<n>' comments (one block = one idea) and counts calls:
  text   = pop( + Card( + Label(          target <= 3 per idea (headline + one key label + one number/stamp)
  chars  = Char(                           target <= 2
  prims  = Box( + Cyl( + Line3( literals   target <= 14 (helpers like table()/hqTower() count as 1 each, so this under-counts)
Loops count once, so these are lower bounds; use it as a prompt to simplify, not as proof."""
import re, sys, json, pathlib
H = pathlib.Path(__file__).resolve().parent
def FH(n): p = H / n; return p if p.exists() else H / 'legacy' / 'acts' / n      # old acts live in legacy/acts
ALL = ['a1p1', 'a1p2', 'a2p1', 'a2p2', 'a3p1', 'a3p2', 'a4p1', 'a4p2', 'a4p3', 'a5p1', 'a5p2', 'a5p3', 'a6p1', 'a6p2', 'a7']
LIM = dict(text=3, chars=2, prims=14)

def story_blocks(pid):      # a story file: count per beat  text = Counter/Doc/Card/Band, chars = Act
    S = json.load(open(H / 'stories' / (pid + '.story.json'), encoding='utf8')); out = []
    for b in S['beats']:
        names = [(d['do'] if isinstance(d, dict) else d)[0] for d in b.get('do', [])]
        acts = {(str(e[1]), str(e[2])[:6]) for e in [(d['do'] if isinstance(d, dict) else d) for d in b.get('do', [])] if e[0] == 'Act'}      # one character = one role at one place (pose changes are extra Act rows)
        out.append((b.get('name', '?') + ' %s' % b['t'], dict(text=sum(n in ('Counter', 'Doc', 'Card', 'Band') for n in names), chars=len(acts), prims=len([n for n in names if n not in ('Act', 'Room', 'Hold', 'Counter', 'Doc', 'Card', 'Band')]))))
    return out

def blocks(pid):
    if (H / 'stories' / (pid + '.story.json')).exists(): return story_blocks(pid)
    src = (FH(pid + '_scene.js')).read_text(encoding='utf8')
    parts = re.split(r'\n\s*// =+ ([A-Z]\d* \([^\n]*|S\d+[^\n]*)', src)   # '// ===== S2 (3 - 21)' (long format) or '// ===== A (0 - 5.6)' (shorts)
    out = []
    for i in range(1, len(parts) - 1, 2):
        b = parts[i + 1]
        out.append((parts[i][:60], dict(text=len(re.findall(r'\b(?:pop|Card|Label)\(', b)), chars=len(re.findall(r'\bChar\(', b)), prims=len(re.findall(r'\b(?:Box|Cyl|Line3)\(', b)))))
    return out

if __name__ == '__main__':
    ids = ALL if sys.argv[1:] == ['all'] else sys.argv[1:]; over = tot = 0
    for pid in ids:
        bl = blocks(pid); LM = dict(LIM, chars=4) if (H / 'stories' / (pid + '.story.json')).exists() else LIM; bad = [(n, c) for n, c in bl if any(c[k] > LM[k] for k in LM)]   # story files: group scenes allowed up to 4 characters
        over += len(bad); tot += len(bl)
        print('%s: %d ideas, %d over budget' % (pid, len(bl), len(bad)))
        for n, c in bad: print('   %-48s text %d  chars %d  prims %d' % (n, c['text'], c['chars'], c['prims']))
    for pid in ids:
        if (H / 'stories' / (pid + '.story.json')).exists():
            bl = blocks(pid); nt = sum(c['text'] for _, c in bl); nc = [n for n, c in bl if c['chars'] == 0]
            if nt > 3: print('   CARDS %s: %d text cards in the whole short (cap 3, characters carry the idea)' % (pid, nt)); over += 1
            for n in nc: print('   NOCHAR %s: beat %s has no character' % (pid, n)); over += 1
    print('TOTAL %d of %d ideas over budget' % (over, tot))
