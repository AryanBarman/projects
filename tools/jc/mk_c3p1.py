"""Make cfg_c3p1.json (Act 3 part 1, Jensen-back-with-crash series, old jb way). Usage: python mk_c3p1.py"""
import json, re, pathlib
H = pathlib.Path(__file__).resolve().parent; P = H.parent.parent
AUD = 'Act 3 part 1'; SRC = 'Episode script (Act 3 part 1 SRT)'
corr = json.load(open(H / 'corrections.json', encoding='utf8'))
tsec = lambda x: (lambda h, m, r: int(h) * 3600 + int(m) * 60 + int(r.split(',')[0]) + int(r.split(',')[1]) / 1000)(*x.split(':'))
rows, cur = [], None
for b in re.split(r'\n\s*\n', (P / 'jensen back with crash' / 'audio' / (AUD + '.srt')).read_bytes().decode('utf-8-sig').replace('\r', '').strip()):
    L = b.split('\n'); a, z = L[1].split(' --> '); tx = ' '.join(L[2:]).strip()
    for pat, rep in corr: tx = re.sub(pat, rep, tx)
    cur = [tsec(a), tsec(z), tx] if cur is None else [cur[0], tsec(z), cur[2] + ' ' + tx]
    if re.search(r'[.?!]$', tx): rows.append(cur); cur = None
if cur: rows.append(cur)
dur = 48.0
c = {'dmin': 16, 'dmax': 28, 'assets': True, 'audio': AUD, 'out': 'act3_part1_meet_coreweave-3d.html', 'title': 'Act 3 Part 1 - Meet CoreWeave (3D)', 'dur': dur,
 'rail': [0, 3.9, 11.1, 21.8, 31.2, 41.1, dur], 'stn': [[-13, -26], [13, 0], [39, 26], [65, 52], [91, 78], [1000000000, 104]], 'layout': [[-40, 20], [0, 0], [40, -22], [82, -36], [104, -76], [62, -100]], 'fixes': {},
 'keycol': {'healthy': 'sageHi', 'nvidia': 'sageHi', 'borrowing': 'coral', 'billions': 'coral', 'coreweave': 'cyanHi', 'fastest-growing': 'sageHi', 'closest': 'amberHi', 'partners': 'amberHi', 'invested': 'sageHi', '$2': 'amberHi',
            'unused': 'amberHi', '2032': 'amberHi', 'earnings': 'cyanHi', '$118': 'coral', 'guarantees': 'coral', 'guarantee': 'coral', 'loans': 'coral'},
 'mood': [[0, 'dusk'], [3.9, 'day'], [11.1, 'day'], [21.8, 'warm'], [31.2, 'tense'], [41.1, 'dusk']], 'sets': ['office', 'plaza', 'campus', 'office', 'market', 'office'],
 'ledger': [['%.2f-%.2f' % (a, z), tx, 'scripted narration', SRC, ''] for a, z, tx in rows],
 'cues': [[3.51, 'stamp_impact', 'Not just NVIDIA'], [6.98, 'stamp_impact', 'Borrowing billions'], [11.54, 'whoosh', 'Meet CoreWeave'], [17.33, 'stamp_impact', 'Closest partner'], [23.18, 'stamp_impact', '$2 billion'], [29.9, 'stamp_impact', 'April 2032'],
          [35.42, 'mega_boom', '$118 billion'], [39.62, 'stamp_impact', 'Data centers'], [43.77, 'stamp_impact', 'Guarantee'], [46.1, 'laser_trace', 'The loop']],
 'faces': [], 'dress': []}
(H / 'cfg_c3p1.json').write_text(json.dumps(c, indent=1, ensure_ascii=False), encoding='utf8'); print('ok', len(rows), 'ledger rows')
