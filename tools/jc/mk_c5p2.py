"""Make cfg_c5p2.json (Act 5 part 2, Jensen-back-with-crash series, old jb way). Usage: python mk_c5p2.py"""
import json, re, pathlib
H = pathlib.Path(__file__).resolve().parent; P = H.parent.parent
AUD = 'Act 5 part 2'; SRC = 'Episode script (Act 5 part 2 SRT)'
corr = json.load(open(H / 'corrections.json', encoding='utf8'))
tsec = lambda x: (lambda h, m, r: int(h) * 3600 + int(m) * 60 + int(r.split(',')[0]) + int(r.split(',')[1]) / 1000)(*x.split(':'))
rows, cur = [], None
for b in re.split(r'\n\s*\n', (P / 'jensen back with crash' / 'audio' / (AUD + '.srt')).read_bytes().decode('utf-8-sig').replace('\r', '').strip()):
    L = b.split('\n'); a, z = L[1].split(' --> '); tx = ' '.join(L[2:]).strip()
    for pat, rep in corr: tx = re.sub(pat, rep, tx)
    cur = [tsec(a), tsec(z), tx] if cur is None else [cur[0], tsec(z), cur[2] + ' ' + tx]
    if re.search(r'[.?!]$', tx): rows.append(cur); cur = None
if cur: rows.append(cur)
dur = 50.9
c = {'dmin': 16, 'dmax': 28, 'assets': True, 'audio': AUD, 'out': 'act5_part2_the_schedule-3d.html', 'title': 'Act 5 Part 2 - The Schedule (3D)', 'dur': dur,
 'rail': [0, 1.6, 19.4, 25.6, 35.0, 38.1, 45.0, dur], 'stn': [[-13, -26], [13, 0], [39, 26], [65, 52], [91, 78], [117, 104], [1000000000, 130]], 'layout': [[-40, 20], [0, 0], [40, -22], [82, -36], [104, -76], [62, -100], [18, -84]], 'fixes': {},
 'keycol': {'schedule': 'amberHi', 'december': 'amberHi', 'closed': 'coral', 'questioning': 'coral', 'lawyer': 'cyanHi', 'live': 'coral', 'senate': 'cyanHi', 'export': 'amberHi', 'lead': 'sageHi', 'china': 'coral', 'military': 'coral', 'sec': 'coral', 'accounting': 'coral', 'independent': 'amberHi', 'reversing': 'coral', 'investors': 'amberHi', 'chase': 'coral'},
 'mood': [[0, 'dusk'], [1.6, 'tense'], [19.4, 'day'], [25.6, 'tense'], [35.0, 'dusk'], [38.1, 'tense'], [45.0, 'day']], 'sets': ['plaza', 'office', 'office', 'plaza', 'office', 'office', 'market'],
 'ledger': [['%.2f-%.2f' % (a, z), tx, 'scripted narration', SRC, ''] for a, z, tx in rows],
 'cues': [[4.7, 'stamp_impact', 'Dec 1'], [12.56, 'stamp_impact', 'Dec 2'], [14.72, 'stamp_impact', 'Dec 3'], [23.0, 'stamp_impact', 'Protects'], [31.21, 'mega_boom', 'China'], [32.95, 'stamp_impact', 'Military'], [36.55, 'stamp_impact', 'SEC review'], [42.03, 'stamp_impact', 'Reversed'], [44.0, 'stamp_impact', '11 days'], [49.4, 'stamp_impact', '31.5']],
 'faces': [], 'dress': []}
(H / 'cfg_c5p2.json').write_text(json.dumps(c, indent=1, ensure_ascii=False), encoding='utf8'); print('ok', len(rows), 'ledger rows')
