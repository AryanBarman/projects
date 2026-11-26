"""Make cfg_c2p1.json (Act 2 part 1 of the Jensen-back-with-crash series, old jb way). Ledger rows come from the corrected SRT sentences. Usage: python mk_c2p1.py"""
import json, re, pathlib
H = pathlib.Path(__file__).resolve().parent; P = H.parent.parent
AUD = 'Act 2 part 1'; SRC = 'Episode script (Act 2 part 1 SRT)'
corr = json.load(open(H / 'corrections.json', encoding='utf8'))
tsec = lambda x: (lambda h, m, r: int(h) * 3600 + int(m) * 60 + int(r.split(',')[0]) + int(r.split(',')[1]) / 1000)(*x.split(':'))
rows, cur = [], None
for b in re.split(r'\n\s*\n', (P / 'jensen back with crash' / 'audio' / (AUD + '.srt')).read_bytes().decode('utf-8-sig').replace('\r', '').strip()):
    L = b.split('\n'); a, z = L[1].split(' --> '); tx = ' '.join(L[2:]).strip()
    for pat, rep in corr: tx = re.sub(pat, rep, tx)
    cur = [tsec(a), tsec(z), tx] if cur is None else [cur[0], tsec(z), cur[2] + ' ' + tx]
    if re.search(r'[.?!]$', tx): rows.append(cur); cur = None
if cur: rows.append(cur)
dur = 45.3
c = {'dmin': 16, 'dmax': 28, 'assets': True, 'audio': AUD, 'out': 'act2_part1_the_basic_math-3d.html', 'title': 'Act 2 Part 1 - The Basic Math (3D)', 'dur': dur,
 'rail': [0, 5.4, 15.5, 24.0, 36.0, dur], 'stn': [[-13, -26], [13, 0], [39, 26], [65, 52], [1000000000, 78]], 'layout': [[-40, 20], [0, 0], [40, -22], [82, -36], [104, -76]], 'fixes': {},
 'keycol': {'math': 'cyanHi', 'october': 'amberHi', 'high': 'amberHi', 'exit': 'coral', 'fallen': 'coral', '47%': 'coral', 'half': 'coral', '31.5%': 'sageHi', '30%': 'coral', 'record': 'amberHi', '$100': 'amberHi', '$53': 'coral',
            '31%': 'sageHi', '$70': 'sageHi', 'below': 'coral', 'sales': 'sageHi', 'profit': 'sageHi', 'beaten': 'sageHi', 'expectations': 'sageHi', 'stay': 'coral', 'up': 'coral'},
 'mood': [[0, 'day'], [5.4, 'tense'], [15.5, 'day'], [24.0, 'warm'], [36.0, 'dusk']], 'sets': ['office', 'office', 'market', 'office', 'plaza'],
 'ledger': [['%.2f-%.2f' % (a, z), tx, 'scripted narration', SRC, ''] for a, z, tx in rows],
 'cues': [[3.63, 'stamp_impact', 'The math'], [5.4, 'whoosh', 'October high'], [13.16, 'stamp_impact', 'Minus 47'], [14.67, 'stamp_impact', 'Cut in half'], [17.79, 'whoosh', 'Plus 31.5'], [22.17, 'stamp_impact', 'Minus 30'],
          [25.97, 'stamp_impact', '$100'], [28.61, 'stamp_impact', '$53'], [33.11, 'stamp_impact', '$70'], [34.1, 'stamp_impact', 'Still below'], [38.8, 'stamp_impact', 'Sales'], [43.87, 'mega_boom', 'Still fell']],
 'faces': [], 'dress': []}
(H / 'cfg_c2p1.json').write_text(json.dumps(c, indent=1, ensure_ascii=False), encoding='utf8'); print('ok', len(rows), 'ledger rows')
