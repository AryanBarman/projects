"""Make cfg_c27.json (Short 2027, Jensen-back-with-crash series, old jb way). Usage: python mk_c27.py"""
import json, re, pathlib
H = pathlib.Path(__file__).resolve().parent; P = H.parent.parent
AUD = 's2027'; SRC = 'Episode script (Short 2027 SRT)'
corr = json.load(open(H / 'corrections.json', encoding='utf8'))
tsec = lambda x: (lambda h, m, r: int(h) * 3600 + int(m) * 60 + int(r.split(',')[0]) + int(r.split(',')[1]) / 1000)(*x.split(':'))
rows, cur = [], None
for b in re.split(r'\n\s*\n', (P / 'shorts2' / 'audio' / (AUD + '.srt')).read_bytes().decode('utf-8-sig').replace('\r', '').strip()):
    L = b.split('\n'); a, z = L[1].split(' --> '); tx = ' '.join(L[2:]).strip()
    for pat, rep in corr: tx = re.sub(pat, rep, tx)
    cur = [tsec(a), tsec(z), tx] if cur is None else [cur[0], tsec(z), cur[2] + ' ' + tx]
    if re.search(r'[.?!]$', tx): rows.append(cur); cur = None
if cur: rows.append(cur)
dur = 39.32
c = {'dmin': 22, 'dmax': 40, 'assets': True, 'audio': AUD, 'out': 'short_2027_cash_crunch_v2.html', 'out_dir': 'shorts2', 'portrait': True, 'title': 'The 2027 AI Cash Crunch (short)', 'dur': dur,
 'rail': [0, 6.7, 11.9, 17.2, 22.0, 31.2, dur], 'stn': [[13, 0], [39, 26], [65, 52], [91, 78], [117, 104], [1000000000, 130]], 'layout': [[0, 0], [40, -22], [82, -36], [104, -76], [62, -100], [18, -84]], 'fixes': {},
 'keycol': {'crunch': 'coral', '2027': 'amberHi', 'bottleneck': 'amberHi', 'backwards': 'coral', 'billions': 'amberHi', 'weeks': 'sageHi', 'years': 'coral', 'dark': 'coral', 'burning': 'coral', 'zero': 'coral', 'revenue': 'coral', 'hundreds': 'amberHi', 'capital': 'cyanHi'},
 'mood': [[0, 'tense'], [6.7, 'day'], [11.9, 'warm'], [17.2, 'day'], [22.0, 'night'], [31.2, 'dusk'], [38.3, 'tense']], 'sets': ['office', 'plaza', 'office', 'plaza', 'market', 'office'],
 'ledger': [['%.2f-%.2f' % (a, z), tx, 'scripted narration', SRC, ''] for a, z, tx in rows],
 'cues': [[0.9, 'whoosh', 'Warning'], [5.0, 'mega_boom', 'Crunch'], [10.45, 'stamp_impact', 'Backwards'], [13.16, 'stamp_impact', 'Tens of billions'], [17.92, 'stamp_impact', 'Weeks'], [20.87, 'stamp_impact', 'Years'], [27.66, 'stamp_impact', 'Zero revenue'], [33.86, 'mega_boom', 'Hundreds of billions']],
 'faces': [], 'dress': []}
(H / 'cfg_c27.json').write_text(json.dumps(c, indent=1, ensure_ascii=False), encoding='utf8'); print('ok', len(rows), 'ledger rows')
