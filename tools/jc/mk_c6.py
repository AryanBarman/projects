"""Make cfg_c6.json (Act 6, Jensen-back-with-crash series, old jb way). Usage: python mk_c6.py"""
import json, re, pathlib
H = pathlib.Path(__file__).resolve().parent; P = H.parent.parent
AUD = 'Act 6'; SRC = 'Episode script (Act 6 SRT)'
corr = json.load(open(H / 'corrections.json', encoding='utf8'))
tsec = lambda x: (lambda h, m, r: int(h) * 3600 + int(m) * 60 + int(r.split(',')[0]) + int(r.split(',')[1]) / 1000)(*x.split(':'))
rows, cur = [], None
for b in re.split(r'\n\s*\n', (P / 'jensen back with crash' / 'audio' / (AUD + '.srt')).read_bytes().decode('utf-8-sig').replace('\r', '').strip()):
    L = b.split('\n'); a, z = L[1].split(' --> '); tx = ' '.join(L[2:]).strip()
    for pat, rep in corr: tx = re.sub(pat, rep, tx)
    cur = [tsec(a), tsec(z), tx] if cur is None else [cur[0], tsec(z), cur[2] + ' ' + tx]
    if re.search(r'[.?!]$', tx): rows.append(cur); cur = None
if cur: rows.append(cur)
dur = 54.4
c = {'dmin': 16, 'dmax': 28, 'assets': True, 'audio': AUD, 'out': 'act6_the_money_system-3d.html', 'title': 'Act 6 - The Money System (3D)', 'dur': dur,
 'rail': [0, 1.8, 12.0, 18.4, 27.6, 45.6, dur], 'stn': [[-13, -26], [13, 0], [39, 26], [65, 52], [91, 78], [1000000000, 104]], 'layout': [[-40, 20], [0, 0], [40, -22], [82, -36], [104, -76], [62, -100]], 'fixes': {},
 'keycol': {'demand': 'sageHi', 'massive': 'sageHi', 'sales': 'sageHi', 'profits': 'sageHi', 'technology': 'sageHi', 'changed': 'amberHi', 'money': 'amberHi', 'system': 'amberHi', 'investors': 'cyanHi', 'three': 'coral', 'roadblocks': 'coral', 'lenders': 'coral', 'central': 'coral', 'congress': 'coral', 'priced': 'amberHi', 'crack': 'coral', 'selling': 'coral'},
 'mood': [[0, 'day'], [1.8, 'day'], [12.0, 'warm'], [18.4, 'day'], [27.6, 'tense'], [45.6, 'dusk']], 'sets': ['market', 'campus', 'office', 'office', 'plaza', 'market'],
 'ledger': [['%.2f-%.2f' % (a, z), tx, 'scripted narration', SRC, ''] for a, z, tx in rows],
 'cues': [[0.4, 'whoosh', 'Step back'], [9.44, 'stamp_impact', 'Demand'], [13.26, 'stamp_impact', 'Strengths'], [19.62, 'stamp_impact', 'Money system'], [33.36, 'stamp_impact', 'Roadblock one'], [37.75, 'stamp_impact', 'Roadblock two'], [41.55, 'stamp_impact', 'Roadblock three'], [50.37, 'mega_boom', 'Crack'], [53.13, 'stamp_impact', 'Selling']],
 'faces': [], 'dress': []}
(H / 'cfg_c6.json').write_text(json.dumps(c, indent=1, ensure_ascii=False), encoding='utf8'); print('ok', len(rows), 'ledger rows')
