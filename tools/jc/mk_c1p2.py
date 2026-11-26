"""Make cfg_c1p2.json (Act 1 part 2 of the Jensen-back-with-crash series, old jb way). Ledger rows come from the corrected SRT sentences. Usage: python mk_c1p2.py"""
import json, re, pathlib
H = pathlib.Path(__file__).resolve().parent; P = H.parent.parent
AUD = 'Act 1 part 2'; SRC = 'Episode script (Act 1 part 2 SRT)'
corr = json.load(open(H / 'corrections.json', encoding='utf8'))
tsec = lambda x: (lambda h, m, r: int(h) * 3600 + int(m) * 60 + int(r.split(',')[0]) + int(r.split(',')[1]) / 1000)(*x.split(':'))
rows, cur = [], None
for b in re.split(r'\n\s*\n', (P / 'jensen back with crash' / 'audio' / (AUD + '.srt')).read_bytes().decode('utf-8-sig').replace('\r', '').strip()):
    L = b.split('\n'); a, z = L[1].split(' --> '); tx = ' '.join(L[2:]).strip()
    for pat, rep in corr: tx = re.sub(pat, rep, tx)
    cur = [tsec(a), tsec(z), tx] if cur is None else [cur[0], tsec(z), cur[2] + ' ' + tx]
    if re.search(r'[.?!]$', tx): rows.append(cur); cur = None
if cur: rows.append(cur)
c = {'dmin': 16, 'dmax': 28, 'assets': True, 'audio': AUD, 'out': 'act1_part2_eleven_days-3d.html', 'title': 'Act 1 Part 2 - Eleven Days (3D)', 'dur': 54.72,
 'rail': [0, 3.9, 12.0, 29.4, 40.4, 47.0, 54.72], 'stn': [[-13, -26], [13, 0], [39, 26], [65, 52], [91, 78], [1000000000, 104]], 'layout': [[-40, 20], [0, 0], [40, -22], [82, -36], [104, -76], [62, -100]], 'fixes': {},
 'keycol': {'11': 'amberHi', 'days': 'amberHi', 'november': 'amberHi', 'falling': 'coral', 'stepped': 'coral', 'down': 'coral', 'monday': 'amberHi', 'board': 'sageHi', 'brought': 'sageHi', '31.5%': 'sageHi', 'trillion': 'amberHi', 'unstoppable': 'sageHi',
            'tuesday': 'coral', 'wednesday': 'coral', '6%': 'coral', '4%': 'coral', 'billions': 'coral', 'investors': 'amberHi', 'cheer': 'sageHi', 'sell': 'coral', 'money': 'cyanHi', 'math': 'cyanHi'},
 'mood': [[0, 'tense'], [3.9, 'tense'], [12.0, 'warm'], [29.4, 'dusk'], [40.4, 'day'], [47.0, 'day']], 'sets': ['office', 'office', 'office', 'market', 'plaza', 'office'],
 'ledger': [['%.2f-%.2f' % (a, z), tx, 'scripted narration', SRC, ''] for a, z, tx in rows],
 'cues': [[3.8, 'whoosh', 'Fly to the 11 days'], [4.0, 'stamp_impact', 'Day counter'], [10.83, 'stamp_impact', 'Founder stepped down'], [18.17, 'stamp_impact', '+31.5%'], [22.16, 'stamp_impact', 'Trillion'], [28.38, 'stamp_impact', 'Unstoppable'],
          [33.7, 'stamp_impact', 'Minus 6'], [35.46, 'stamp_impact', 'Minus 4'], [38.39, 'mega_boom', 'Billions gone'], [44.75, 'stamp_impact', 'Sell'], [50.47, 'laser_trace', 'Follow the money']],
 'faces': [[12.6, 15.0, [26.4, 2.9, 3.4], 1]], 'dress': []}
(H / 'cfg_c1p2.json').write_text(json.dumps(c, indent=1, ensure_ascii=False), encoding='utf8'); print('ok', len(rows), 'ledger rows')
