"""Make cfg_c3p2.json (Act 3 part 2, Jensen-back-with-crash series, old jb way). Usage: python mk_c3p2.py"""
import json, re, pathlib
H = pathlib.Path(__file__).resolve().parent; P = H.parent.parent
AUD = 'Act 3 part 2'; SRC = 'Episode script (Act 3 part 2 SRT)'
corr = json.load(open(H / 'corrections.json', encoding='utf8'))
tsec = lambda x: (lambda h, m, r: int(h) * 3600 + int(m) * 60 + int(r.split(',')[0]) + int(r.split(',')[1]) / 1000)(*x.split(':'))
rows, cur = [], None
for b in re.split(r'\n\s*\n', (P / 'jensen back with crash' / 'audio' / (AUD + '.srt')).read_bytes().decode('utf-8-sig').replace('\r', '').strip()):
    L = b.split('\n'); a, z = L[1].split(' --> '); tx = ' '.join(L[2:]).strip()
    for pat, rep in corr: tx = re.sub(pat, rep, tx)
    cur = [tsec(a), tsec(z), tx] if cur is None else [cur[0], tsec(z), cur[2] + ' ' + tx]
    if re.search(r'[.?!]$', tx): rows.append(cur); cur = None
if cur: rows.append(cur)
dur = 77.9
c = {'dmin': 16, 'dmax': 28, 'assets': True, 'audio': AUD, 'out': 'act3_part2_the_price_of_borrowing-3d.html', 'title': 'Act 3 Part 2 - The Price of Borrowing (3D)', 'dur': dur,
 'rail': [0, 5.0, 18.2, 26.0, 35.1, 45.2, 52.1, 62.0, 68.9, dur], 'stn': [[-13, -26], [13, 0], [39, 26], [65, 52], [91, 78], [117, 104], [143, 130], [169, 156], [1000000000, 182]],
 'layout': [[-40, 20], [0, 0], [40, -22], [82, -36], [104, -76], [62, -100], [18, -84], [-22, -110], [-60, -90]], 'fixes': {},
 'keycol': {'debt': 'coral', 'dumped': 'coral', 'record': 'coral', 'cents': 'coral', '2031': 'amberHi', '18': 'coral', 'percent': 'coral', 'safe': 'sageHi', 'government': 'cyanHi', 'worried': 'coral', '$5': 'amberHi', '2027': 'amberHi',
            'borrowing': 'coral', 'buying': 'amberHi', '$118': 'coral', 'guarantees': 'coral', 'inflation': 'amberHi', 'expensive': 'coral'},
 'mood': [[0, 'day'], [5.0, 'tense'], [18.2, 'day'], [26.0, 'warm'], [35.1, 'tense'], [45.2, 'day'], [52.1, 'tense'], [62.0, 'dusk'], [68.9, 'tense']], 'sets': ['office', 'market', 'office', 'plaza', 'campus', 'office', 'plaza', 'market', 'office'],
 'ledger': [['%.2f-%.2f' % (a, z), tx, 'scripted narration', SRC, ''] for a, z, tx in rows],
 'cues': [[5.81, 'whoosh', 'Rally'], [12.46, 'mega_boom', 'Lenders dump'], [22.4, 'stamp_impact', 'Rate up'], [26.7, 'stamp_impact', '18 percent'], [33.83, 'stamp_impact', '4 percent'], [43.1, 'stamp_impact', 'Shouting'], [48.44, 'stamp_impact', '$5 billion'],
          [58.38, 'stamp_impact', 'Buying'], [65.86, 'stamp_impact', '$118 billion'], [67.84, 'mega_boom', 'Short on cash'], [74.12, 'stamp_impact', 'Inflation report']],
 'faces': [], 'dress': []}
(H / 'cfg_c3p2.json').write_text(json.dumps(c, indent=1, ensure_ascii=False), encoding='utf8'); print('ok', len(rows), 'ledger rows')
