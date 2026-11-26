"""Make cfg_c2p2.json (Act 2 part 2, Jensen-back-with-crash series, old jb way). Usage: python mk_c2p2.py"""
import json, re, pathlib
H = pathlib.Path(__file__).resolve().parent; P = H.parent.parent
AUD = 'Act 2 part 2'; SRC = 'Episode script (Act 2 part 2 SRT)'
corr = json.load(open(H / 'corrections.json', encoding='utf8'))
tsec = lambda x: (lambda h, m, r: int(h) * 3600 + int(m) * 60 + int(r.split(',')[0]) + int(r.split(',')[1]) / 1000)(*x.split(':'))
rows, cur = [], None
for b in re.split(r'\n\s*\n', (P / 'jensen back with crash' / 'audio' / (AUD + '.srt')).read_bytes().decode('utf-8-sig').replace('\r', '').strip()):
    L = b.split('\n'); a, z = L[1].split(' --> '); tx = ' '.join(L[2:]).strip()
    for pat, rep in corr: tx = re.sub(pat, rep, tx)
    cur = [tsec(a), tsec(z), tx] if cur is None else [cur[0], tsec(z), cur[2] + ' ' + tx]
    if re.search(r'[.?!]$', tx): rows.append(cur); cur = None
if cur: rows.append(cur)
dur = 34.1
c = {'dmin': 16, 'dmax': 28, 'assets': True, 'audio': AUD, 'out': 'act2_part2_the_first_warning-3d.html', 'title': 'Act 2 Part 2 - The First Warning Sign (3D)', 'dur': dur,
 'rail': [0, 3.9, 13.7, 24.6, dur], 'stn': [[-13, -26], [13, 0], [39, 26], [1000000000, 52]], 'layout': [[-40, 20], [0, 0], [40, -22], [82, -36]], 'fixes': {},
 'keycol': {'trillions': 'amberHi', 'chips': 'amberHi', 'enough': 'coral', 'investors': 'amberHi', 'uncomfortable': 'coral', 'tuesday': 'coral', 'leadership': 'sageHi', 'fixed': 'sageHi', 'three': 'coral', 'money': 'coral', 'government': 'cyanHi',
            'first': 'amberHi', 'warning': 'coral', 'stock': 'cyanHi', 'unpaid': 'coral', 'bills': 'coral', 'closest': 'amberHi', 'partner': 'amberHi'},
 'mood': [[0, 'dusk'], [3.9, 'tense'], [13.7, 'warm'], [19.44, 'tense'], [24.6, 'dusk']], 'sets': ['plaza', 'office', 'market', 'office'],
 'ledger': [['%.2f-%.2f' % (a, z), tx, 'scripted narration', SRC, ''] for a, z, tx in rows],
 'cues': [[3.73, 'stamp_impact', 'Trillions'], [7.87, 'stamp_impact', 'Not enough'], [12.47, 'stamp_impact', 'Tuesday morning'], [15.67, 'stamp_impact', 'Leadership fixed'], [19.44, 'stamp_impact', 'Debt'], [20.3, 'stamp_impact', 'Rates'],
          [21.09, 'stamp_impact', 'Government'], [28.64, 'whoosh', 'Calm chart'], [30.76, 'stamp_impact', 'Unpaid'], [32.53, 'mega_boom', 'Closest partner']],
 'faces': [], 'dress': []}
(H / 'cfg_c2p2.json').write_text(json.dumps(c, indent=1, ensure_ascii=False), encoding='utf8'); print('ok', len(rows), 'ledger rows')
