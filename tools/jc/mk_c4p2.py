"""Make cfg_c4p2.json (Act 4 part 2, Jensen-back-with-crash series, old jb way). Usage: python mk_c4p2.py"""
import json, re, pathlib
H = pathlib.Path(__file__).resolve().parent; P = H.parent.parent
AUD = 'Act 4 part 2'; SRC = 'Episode script (Act 4 part 2 SRT)'
corr = json.load(open(H / 'corrections.json', encoding='utf8'))
tsec = lambda x: (lambda h, m, r: int(h) * 3600 + int(m) * 60 + int(r.split(',')[0]) + int(r.split(',')[1]) / 1000)(*x.split(':'))
rows, cur = [], None
for b in re.split(r'\n\s*\n', (P / 'jensen back with crash' / 'audio' / (AUD + '.srt')).read_bytes().decode('utf-8-sig').replace('\r', '').strip()):
    L = b.split('\n'); a, z = L[1].split(' --> '); tx = ' '.join(L[2:]).strip()
    for pat, rep in corr: tx = re.sub(pat, rep, tx)
    cur = [tsec(a), tsec(z), tx] if cur is None else [cur[0], tsec(z), cur[2] + ' ' + tx]
    if re.search(r'[.?!]$', tx): rows.append(cur); cur = None
if cur: rows.append(cur)
dur = 38.1
c = {'dmin': 16, 'dmax': 28, 'assets': True, 'audio': AUD, 'out': 'act4_part2_the_rate_hike-3d.html', 'title': 'Act 4 Part 2 - The Rate Hike (3D)', 'dur': dur,
 'rail': [0, 1.8, 15.0, 32.0, dur], 'stn': [[-13, -26], [13, 0], [39, 26], [1000000000, 52]], 'layout': [[-40, 20], [0, 0], [40, -22], [82, -36]], 'fixes': {},
 'keycol': {'nervous': 'coral', 'cutting': 'sageHi', 'raise': 'coral', 'december': 'amberHi', 'borrowing': 'coral', 'expensive': 'coral', 'squeezing': 'coral', 'coreweave': 'cyanHi', 'costs': 'coral', 'attractive': 'coral', 'overnight': 'coral', 'urgent': 'coral'},
 'mood': [[0, 'dusk'], [1.8, 'tense'], [15.0, 'day'], [32.0, 'dusk']], 'sets': ['plaza', 'market', 'office', 'office'],
 'ledger': [['%.2f-%.2f' % (a, z), tx, 'scripted narration', SRC, ''] for a, z, tx in rows],
 'cues': [[3.53, 'stamp_impact', 'Nervous'], [8.6, 'stamp_impact', 'Cut crossed out'], [10.71, 'stamp_impact', 'Hike'], [13.36, 'stamp_impact', 'Dec 8'], [18.3, 'stamp_impact', 'Raises rates'], [22.74, 'stamp_impact', 'Squeezed'], [29.96, 'stamp_impact', 'Less attractive'], [35.16, 'mega_boom', 'Bigger problem']],
 'faces': [], 'dress': []}
(H / 'cfg_c4p2.json').write_text(json.dumps(c, indent=1, ensure_ascii=False), encoding='utf8'); print('ok', len(rows), 'ledger rows')
