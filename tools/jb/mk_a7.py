import json, pathlib
H = pathlib.Path(__file__).resolve().parent
c = {'assets': True, 'dmin': 22, 'dmax': 36}
SRC = 'Episode script (Act 7 SRT)'
c.update({
 'audio': 'Act 7', 'out': 'act7_the_verdict-3d.html', 'title': 'Act 7 — The Verdict (3D)', 'dur': 60.36,
 'rail': [0, 2.9, 21.6, 33.1, 43.1, 60.36], 'stn': [[13, 0], [39, 26], [65, 52], [91, 78], [1000000000, 104]], 'layout': [[0, 0], [40, -22], [82, -36], [104, -76], [62, -100]],
 'fixes': {'Nvidia': 'NVIDIA', 'terafab': 'Terafab', 'sell -off': 'sell-off', '$44 billion dollar': '$44 billion'},
 'keycol': {'11': 'amberHi', 'replaceable': 'coral', 'revolt': 'coral', 'sell-off': 'coral', 'musk': 'amberHi', 'texas': 'amberHi', 'president': 'cyanHi', 'november': 'amberHi', 'founder': 'sageHi',
            'geopolitical': 'cyanHi', 'asset': 'cyanHi', 'fail': 'coral', 'fire': 'coral', 'washington': 'cyanHi', 'security': 'cyanHi', '$119': 'amberHi', '$44': 'amberHi', 'terafab': 'sageHi', 'debt': 'coral', 'click': 'amberHi'},
 'mood': [[0, 'tense'], [2.9, 'day'], [21.6, 'warm'], [33.1, 'day'], [43.1, 'dusk']], 'sets': ['office', 'campus', 'campus', 'mall', 'plaza'],
 'faces': [[18.8, 20.8, [26, 2.7, 3.2], 1], [31.4, 33.0, [52, 2.7, 4.0], -1], [36.0, 38.4, [78, 2.9, 4.0], 1]],
 'ledger': [
  ['0.0-2.26', 'Let’s come back to where we started', 'scripted narration', SRC, 'Boardroom with Jensen outside'],
  ['3.4-20.64', '11 days ago the board thought Jensen was replaceable; it took an employee revolt, a market sell-off, Musk poaching him for Texas and the President’s intervention to put him back in his chair', 'scripted narration', SRC, 'Four pressure blocks stack up, packets, chair, BACK IN HIS CHAIR'],
  ['21.78-32.66', 'Jensen walked out of Santa Clara on November 12 as a Silicon Valley founder and back in on November 23 as something entirely different', 'scripted narration', SRC, 'Santa Clara HQ, NOV 12 and NOV 23 counters, walk out and back'],
  ['33.22-42.12', 'A geopolitical asset, too big to fail, too critical to fire, permanently tied to Washington’s national security apparatus', 'scripted narration', SRC, 'Two towers, leash to the White House'],
  ['43.06-60.08', 'For the full breakdown of Musk’s $119 billion Texas Terafab gamble and the $44 billion GPU debt trap, click the video on your screen', 'scripted narration', SRC, 'Video screen, two counters, call to action']],
 'cues': [[7.6, 'stamp_impact', 'Revolt'], [10.2, 'stamp_impact', 'Sell-off'], [13.2, 'laser_trace', 'Musk'], [17.0, 'stamp_impact', 'President'], [18.6, 'mega_boom', 'Back in chair'], [31.2, 'mega_boom', 'Entirely different'], [45.0, 'swell_boom', 'Click']]})
(H / 'cfg_a7.json').write_text(json.dumps(c, indent=1), encoding='utf8')
print('ok')
