"""Make cfg_c1p1.json (Jensen-back-with-crash series, old jb way). Ledger rows come from the (corrected) SRT sentences. Usage: python mk_c1p1.py"""
import json, re, pathlib
H = pathlib.Path(__file__).resolve().parent; P = H.parent.parent
AUD = 'Act 1 part 1'; SRC = 'Episode script (Act 1 part 1 SRT)'
corr = json.load(open(H / 'corrections.json', encoding='utf8'))
tsec = lambda x: (lambda h, m, r: int(h) * 3600 + int(m) * 60 + int(r.split(',')[0]) + int(r.split(',')[1]) / 1000)(*x.split(':'))
rows, cur = [], None
for b in re.split(r'\n\s*\n', (P / 'jensen back with crash' / 'audio' / (AUD + '.srt')).read_bytes().decode('utf-8-sig').replace('\r', '').strip()):
    L = b.split('\n'); a, z = L[1].split(' --> '); tx = ' '.join(L[2:]).strip()
    for pat, rep in corr: tx = re.sub(pat, rep, tx)
    cur = [tsec(a), tsec(z), tx] if cur is None else [cur[0], tsec(z), cur[2] + ' ' + tx]
    if re.search(r'[.?!]$', tx): rows.append(cur); cur = None
if cur: rows.append(cur)
c = {'dmin': 16, 'dmax': 28, 'assets': True, 'audio': AUD, 'out': 'act1_part1_the_comeback_crash-3d.html', 'title': 'Act 1 Part 1 - The Comeback (3D)', 'dur': 24.68,
 'rail': [0, 7.0, 15.1, 24.68], 'stn': [[13, 0], [39, 26], [1000000000, 52]], 'layout': [[0, 0], [40, -22], [82, -36]], 'fixes': {},
 'keycol': {'jensen': 'sageHi', 'back': 'sageHi', 'save': 'sageHi', 'trillion': 'amberHi', 'empire': 'amberHi', 'monday': 'amberHi', '31.5%': 'sageHi', 'jump': 'sageHi', 'proof': 'sageHi', 'wednesday': 'coral', 'billions': 'coral', 'vanished': 'coral',
            'debt': 'coral', 'crisis': 'coral', 'interest': 'coral', 'rate': 'coral', 'hike': 'coral', 'investigation': 'coral', 'government': 'cyanHi', 'ceo': 'amberHi'},
 'mood': [[0, 'warm'], [7.0, 'day'], [15.1, 'tense']], 'sets': ['plaza', 'market', 'office'],
 'ledger': [['%.2f-%.2f' % (a, z), tx, 'scripted narration', SRC, ''] for a, z, tx in rows],
 'cues': [[1.4, 'whoosh', 'Tower rises'], [3.9, 'stamp_impact', '$4 trillion'], [8.8, 'stamp_impact', 'Monday jump'], [11.8, 'stamp_impact', 'Wednesday'], [16.4, 'stamp_impact', 'Debt'], [19.4, 'stamp_impact', 'Rate hike'], [22.2, 'stamp_impact', 'Investigation']],
 'faces': [[0.8, 3.3, [-7.4, 2.9, 3.4], 1]], 'dress': []}
(H / 'cfg_c1p1.json').write_text(json.dumps(c, indent=1, ensure_ascii=False), encoding='utf8'); print('ok', len(rows), 'ledger rows')
