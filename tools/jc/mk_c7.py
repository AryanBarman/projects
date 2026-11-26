"""Make cfg_c7.json (Act 7, Jensen-back-with-crash series, old jb way). Usage: python mk_c7.py"""
import json, re, pathlib
H = pathlib.Path(__file__).resolve().parent; P = H.parent.parent
AUD = 'Act 7'; SRC = 'Episode script (Act 7 SRT)'
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
c = {'dmin': 16, 'dmax': 28, 'assets': True, 'audio': AUD, 'out': 'act7_the_verdict-3d.html', 'title': 'Act 7 - The Verdict (3D)', 'dur': dur,
 'rail': [0, 2.0, 12.0, 27.6, dur], 'stn': [[-13, -26], [13, 0], [39, 26], [1000000000, 52]], 'layout': [[-40, 20], [0, 0], [40, -22], [82, -36]], 'fixes': {},
 'keycol': {'jensen': 'sageHi', 'relief': 'sageHi', 'rally': 'sageHi', 'founder': 'amberHi', 'disaster': 'coral', 'captain': 'amberHi', 'storm': 'coral', 'december': 'amberHi', 'washington': 'coral', 'coreweave': 'cyanHi', 'federal': 'cyanHi', 'expensive': 'coral', 'tighter': 'coral', 'boom': 'amberHi', 'growing': 'sageHi'},
 'mood': [[0, 'dusk'], [2.0, 'warm'], [12.0, 'night'], [27.6, 'dusk']], 'sets': ['market', 'plaza', 'plaza', 'office'],
 'ledger': [['%.2f-%.2f' % (a, z), tx, 'scripted narration', SRC, ''] for a, z, tx in rows],
 'cues': [[2.98, 'whoosh', 'Jensen back'], [7.12, 'stamp_impact', 'Rally'], [11.68, 'mega_boom', 'Disaster'], [15.9, 'mega_boom', 'Storm'], [19.24, 'stamp_impact', 'Dec 1 and 3'], [22.16, 'stamp_impact', 'CoreWeave'], [24.56, 'stamp_impact', 'Fed'], [29.6, 'stamp_impact', 'The boom?'], [31.91, 'stamp_impact', 'Expensive'], [33.21, 'stamp_impact', 'Tighter']],
 'faces': [], 'dress': []}
(H / 'cfg_c7.json').write_text(json.dumps(c, indent=1, ensure_ascii=False), encoding='utf8'); print('ok', len(rows), 'ledger rows')
