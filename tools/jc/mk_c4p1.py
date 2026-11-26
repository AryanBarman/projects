"""Make cfg_c4p1.json (Act 4 part 1, Jensen-back-with-crash series, old jb way). Usage: python mk_c4p1.py"""
import json, re, pathlib
H = pathlib.Path(__file__).resolve().parent; P = H.parent.parent
AUD = 'Act 4 part 1'; SRC = 'Episode script (Act 4 part 1 SRT)'
corr = json.load(open(H / 'corrections.json', encoding='utf8'))
tsec = lambda x: (lambda h, m, r: int(h) * 3600 + int(m) * 60 + int(r.split(',')[0]) + int(r.split(',')[1]) / 1000)(*x.split(':'))
rows, cur = [], None
for b in re.split(r'\n\s*\n', (P / 'jensen back with crash' / 'audio' / (AUD + '.srt')).read_bytes().decode('utf-8-sig').replace('\r', '').strip()):
    L = b.split('\n'); a, z = L[1].split(' --> '); tx = ' '.join(L[2:]).strip()
    for pat, rep in corr: tx = re.sub(pat, rep, tx)
    cur = [tsec(a), tsec(z), tx] if cur is None else [cur[0], tsec(z), cur[2] + ' ' + tx]
    if re.search(r'[.?!]$', tx): rows.append(cur); cur = None
if cur: rows.append(cur)
dur = 41.7
c = {'dmin': 16, 'dmax': 28, 'assets': True, 'audio': AUD, 'out': 'act4_part1_the_promise_hit-3d.html', 'title': 'Act 4 Part 1 - The Promise Takes a Hit (3D)', 'dur': dur,
 'rail': [0, 1.8, 11.4, 18.0, 35.1, dur], 'stn': [[-13, -26], [13, 0], [39, 26], [65, 52], [1000000000, 78]], 'layout': [[-40, 20], [0, 0], [40, -22], [82, -36], [104, -76]], 'fixes': {},
 'keycol': {'promise': 'amberHi', 'falling': 'sageHi', 'cheap': 'sageHi', 'billions': 'amberHi', 'data': 'cyanHi', 'november': 'amberHi', 'hit': 'coral', 'inflation': 'coral', '3.8': 'coral', 'core': 'amberHi', '3.3': 'amberHi', 'highest': 'coral', '4.3': 'sageHi', 'survey': 'cyanHi', 'climbing': 'coral'},
 'mood': [[0, 'tense'], [1.8, 'day'], [11.4, 'dusk'], [18.0, 'tense'], [35.1, 'dusk']], 'sets': ['office', 'campus', 'office', 'market', 'plaza'],
 'ledger': [['%.2f-%.2f' % (a, z), tx, 'scripted narration', SRC, ''] for a, z, tx in rows],
 'cues': [[0.9, 'whoosh', 'Back three years'], [8.41, 'stamp_impact', 'Cheap billions'], [14.07, 'stamp_impact', 'Nov 25'], [17.3, 'mega_boom', 'The hit'], [22.93, 'stamp_impact', '3.8'], [27.02, 'stamp_impact', '3.3'], [33.62, 'stamp_impact', '4.3'], [40.63, 'stamp_impact', 'Climbing']],
 'faces': [], 'dress': []}
(H / 'cfg_c4p1.json').write_text(json.dumps(c, indent=1, ensure_ascii=False), encoding='utf8'); print('ok', len(rows), 'ledger rows')
