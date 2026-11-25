import json, pathlib
H = pathlib.Path(__file__).resolve().parent
base = json.loads((H / 'cfg_a2p2.json').read_text(encoding='utf8'))
c = {'assets': base['assets'], 'dmin': 22, 'dmax': 34}
SRC = 'Episode script (Act 5 part 1 SRT)'
c.update({
 'audio': 'Act 5 part 1', 'out': 'act5_part1_the_44b_deal-3d.html', 'title': 'Act 5 Part 1 — The $44B Deal (3D)', 'dur': 39.0,
 'rail': [0, 8.7, 16.9, 25.5, 33.1, 39.0], 'stn': [[13, 0], [39, 26], [65, 52], [91, 78], [1000000000, 104]],
 'layout': [[0, 0], [40, -22], [82, -36], [104, -76], [62, -100]],
 'fixes': {'Nvidia': 'NVIDIA'},
 'keycol': {'monday': 'amberHi', 'breaking': 'coral', 'elon': 'amberHi', 'musk': 'amberHi', 'spacex': 'cyanHi', 'apollo': 'amberHi', 'goldman': 'amberHi', '44': 'amberHi', 'billion': 'amberHi',
            'largest': 'coral', 'gpu': 'sageHi', 'vera': 'sageHi', 'rubin': 'sageHi', 'ambition': 'coral', 'wall': 'cyanHi', 'street': 'cyanHi', 'earth': 'sageHi', 'satellites': 'cyanHi'},
 'mood': [[0, 'tense'], [8.7, 'day'], [16.9, 'warm'], [25.5, 'tense'], [33.1, 'night']], 'sets': ['campus', 'office', 'plaza', 'market', 'plaza'],
 'ledger': [
  ['0.00-7.92', 'As Jensen walked back into NVIDIA on Monday, a massive financial story broke involving Elon Musk and SpaceX', 'scripted narration', SRC, 'HQ, breaking-news screen, Elon, SpaceX rocket'],
  ['8.88-16.66', 'Apollo Global Management and Goldman Sachs priced roughly $44 billion in debt and lease financing', 'scripted narration', SRC, 'Two banks, money flowing, $44B counter, debt and lease tags'],
  ['17.0-24.82', 'The largest GPU financing deal in history so SpaceX can buy tens of thousands of Vera Rubin chips', 'scripted narration', SRC, 'Stamp, SpaceX rocket, chips stacking up'],
  ['25.51-32.72', 'On paper, pure Musk ambition: raise tens of billions on Wall Street, lock down next-generation silicon', 'scripted narration', SRC, 'Elon, rising bars, lock'],
  ['33.14-38.5', 'Power massive AI data centers on Earth and aboard SpaceX orbital satellites', 'scripted narration', SRC, 'Data centers on Earth, satellites rise into orbit']],
 'cues': [[3.4, 'mega_boom', 'Breaking'], [12.0, 'laser_trace', '$44B'], [17.4, 'stamp_impact', 'Largest ever'], [31.4, 'stamp_impact', 'Lock down'], [37.0, 'swell_boom', 'Powering AI']]})
(H / 'cfg_a5p1.json').write_text(json.dumps(c, indent=1), encoding='utf8')
print('ok')
