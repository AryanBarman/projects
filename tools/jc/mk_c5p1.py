"""Make cfg_c5p1.json (Act 5 part 1, Jensen-back-with-crash series, old jb way). Usage: python mk_c5p1.py"""
import json, re, pathlib
H = pathlib.Path(__file__).resolve().parent; P = H.parent.parent
AUD = 'Act 5 part 1'; SRC = 'Episode script (Act 5 part 1 SRT)'
corr = json.load(open(H / 'corrections.json', encoding='utf8'))
tsec = lambda x: (lambda h, m, r: int(h) * 3600 + int(m) * 60 + int(r.split(',')[0]) + int(r.split(',')[1]) / 1000)(*x.split(':'))
rows, cur = [], None
for b in re.split(r'\n\s*\n', (P / 'jensen back with crash' / 'audio' / (AUD + '.srt')).read_bytes().decode('utf-8-sig').replace('\r', '').strip()):
    L = b.split('\n'); a, z = L[1].split(' --> '); tx = ' '.join(L[2:]).strip()
    for pat, rep in corr: tx = re.sub(pat, rep, tx)
    cur = [tsec(a), tsec(z), tx] if cur is None else [cur[0], tsec(z), cur[2] + ' ' + tx]
    if re.search(r'[.?!]$', tx): rows.append(cur); cur = None
if cur: rows.append(cur)
dur = 29.5
c = {'dmin': 16, 'dmax': 28, 'assets': True, 'audio': AUD, 'out': 'act5_part1_washington_questions-3d.html', 'title': 'Act 5 Part 1 - Washington Has Questions (3D)', 'dur': dur,
 'rail': [0, 2.7, 8.0, 16.0, 19.4, dur], 'stn': [[-13, -26], [13, 0], [39, 26], [65, 52], [1000000000, 78]], 'layout': [[-40, 20], [0, 0], [40, -22], [82, -36], [104, -76]], 'fixes': {},
 'keycol': {'lawmakers': 'coral', 'washington': 'coral', 'questions': 'coral', 'board': 'sageHi', 'political': 'amberHi', 'wrong': 'coral', 'hours': 'coral', 'committees': 'coral', 'foreign': 'cyanHi', 'intelligence': 'cyanHi', 'china': 'coral', 'warned': 'coral', 'security': 'coral'},
 'mood': [[0, 'dusk'], [2.7, 'tense'], [8.0, 'warm'], [16.0, 'tense'], [19.4, 'dusk']], 'sets': ['office', 'plaza', 'office', 'office', 'plaza'],
 'ledger': [['%.2f-%.2f' % (a, z), tx, 'scripted narration', SRC, ''] for a, z, tx in rows],
 'cues': [[3.44, 'whoosh', 'Lawmakers'], [6.01, 'stamp_impact', 'Questions'], [8.37, 'stamp_impact', 'Board brought him back'], [13.8, 'stamp_impact', 'Over'], [15.5, 'mega_boom', 'Wrong'], [17.66, 'stamp_impact', 'Announcement'], [21.86, 'stamp_impact', 'Foreign affairs'], [23.74, 'stamp_impact', 'China'], [24.8, 'stamp_impact', 'Warning']],
 'faces': [], 'dress': []}
(H / 'cfg_c5p1.json').write_text(json.dumps(c, indent=1, ensure_ascii=False), encoding='utf8'); print('ok', len(rows), 'ledger rows')
