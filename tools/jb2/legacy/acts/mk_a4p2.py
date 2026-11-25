import json, pathlib
H = pathlib.Path(__file__).resolve().parent
base = json.loads((H / 'cfg_a2p2.json').read_text(encoding='utf8'))
c = {k: base[k] for k in ('dmin', 'dmax', 'assets')}
SRC = 'Episode script (Act 4 part 2 SRT)'
c.update({
 'audio': 'Act 4 part 2', 'out': 'act4_part2_new_normal-3d.html', 'title': 'Act 4 Part 2 — The New Normal (3D)', 'dur': 32.2,
 'rail': [0, 5.6, 10.4, 20.6, 27.7, 32.2],
 'stn': [[13, 0], [39, 26], [65, 52], [91, 78], [1000000000, 104]],
 'layout': [[0, 0], [40, -22], [82, -36], [104, -76], [62, -100]],
 'fixes': {'Nvidia': 'NVIDIA', 'Jensen Wang': 'Jensen Huang'},
 'keycol': {'33': 'amberHi', 'years': 'amberHi', 'autonomy': 'sageHi', 'billions': 'amberHi', 'wafers': 'sageHi', 'taiwan': 'cyanHi', 'singapore': 'cyanHi', 'lightning': 'sageHi',
            'export': 'cyanHi', 'license': 'cyanHi', 'partnership': 'cyanHi', 'geopolitical': 'coral', 'compliance': 'coral', 'washington': 'coral', 'shoulder': 'coral'},
 'mood': [[0, 'tense'], [5.6, 'day'], [10.4, 'warm'], [20.6, 'tense'], [27.7, 'dusk']],
 'sets': ['office', 'campus', 'plaza', 'office', 'mall'],
 'ledger': [
  ['0.00-4.94', 'What that actually means for how NVIDIA operates from this day forward', 'scripted narration', SRC, 'Cage frame goes up around Jensen'],
  ['5.76-9.0', 'For 33 years Jensen Huang ran NVIDIA with unmatched founder autonomy', 'scripted narration', SRC, '33-year counter, rising bars'],
  ['10.02-20.6', 'Moving billions of dollars of wafers across Taiwan, Singapore and global data centers at lightning speed', 'scripted narration', SRC, 'Three sites, wafers flying between them'],
  ['20.6-30.0', 'Every major export license, sensitive partnership and geopolitical call runs through a board-mandated compliance apparatus', 'scripted narration', SRC, 'Three items funnel through the compliance gate'],
  ['27.7-31.68', 'With Washington looking straight over his shoulder', 'scripted narration', SRC, 'White House, Trump behind Jensen']],
 'cues': [[6.2, 'laser_trace', '33 years'], [11.0, 'laser_trace', 'Wafers'], [21.0, 'stamp_impact', 'Compliance gate'], [25.8, 'mega_boom', 'Everything runs through it'], [30.0, 'stamp_impact', 'Over his shoulder']]})
(H / 'cfg_a4p2.json').write_text(json.dumps(c, indent=1), encoding='utf8')
print('ok')
