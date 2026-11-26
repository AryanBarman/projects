"""WORD TIMES from an SRT (no aligner needed): inside each caption chunk the words are spread by character count between the chunk start and end (speech is roughly even inside 2-4 s chunks, error ~0.15 s).
usage: python wt.py "Act 1 part 1" word1 word2 ...      -> onset (start) of the FIRST occurrence of each word/phrase (case-insensitive, punctuation ignored); add #2 for the 2nd occurrence, e.g.  jump#2
       python wt.py "Act 1 part 1"                        -> prints every word with its onset (long)
Use these numbers for the trigger times in the scene files so a stamp / counter / chart step lands ON the spoken word."""
import sys, re, json, pathlib
H = pathlib.Path(__file__).resolve().parent; P = H.parent.parent
corr = json.load(open(H / 'corrections.json', encoding='utf8'))
tsec = lambda x: (lambda h, m, r: int(h) * 3600 + int(m) * 60 + int(r.split(',')[0]) + int(r.split(',')[1]) / 1000)(*x.split(':'))
def words(clip):
    out = []
    for b in re.split(r'\n\s*\n', (P / __import__('os').environ.get('WT_DIR', 'jensen back with crash/audio') / (clip + '.srt')).read_bytes().decode('utf-8-sig').replace('\r', '').strip()):
        L = b.split('\n'); a, z = (tsec(x) for x in L[1].split(' --> ')); tx = ' '.join(L[2:]).strip()
        for pat, rep in corr: tx = re.sub(pat, rep, tx)
        ws = tx.split(); n = sum(len(w) + 1 for w in ws); c = 0
        for w in ws: out.append((re.sub(r"[^\w%$.']", '', w).strip('.').lower(), a + (z - a) * c / n, a + (z - a) * (c + len(w)) / n)); c += len(w) + 1
    return out
if __name__ == '__main__':
    W = words(sys.argv[1]); q = sys.argv[2:]
    if not q: print(' '.join('%s@%.2f' % (w, a) for w, a, z in W))
    for k in q:
        k, _, nth = k.partition('#'); nth = int(nth or 1); seq = k.lower().split(); hits = [i for i in range(len(W) - len(seq) + 1) if all(W[i + j][0] == seq[j] for j in range(len(seq)))]
        print('%-14s %s' % (k, '%.2f' % W[hits[nth - 1]][1] if len(hits) >= nth else 'NOT FOUND'))
