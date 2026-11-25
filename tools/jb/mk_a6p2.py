import json, pathlib
H = pathlib.Path(__file__).resolve().parent
c = {'assets': True, 'dmin': 22, 'dmax': 36}
SRC = 'Episode script (Act 6 part 2 SRT)'
c.update({
 'audio': 'Act 6 part 2', 'out': 'act6_part2_the_chokepoint-3d.html', 'title': 'Act 6 Part 2 — The Chokepoint (3D)', 'dur': 57.56,
 'rail': [0, 17.8, 23.3, 37.3, 57.56], 'stn': [[13, 0], [39, 26], [65, 52], [1000000000, 78]], 'layout': [[0, 0], [40, -22], [82, -36], [104, -76]],
 'fixes': {'Nvidia': 'NVIDIA', 'terafab': 'Terafab', 'SK -Hynix': 'SK Hynix', 'SK-Hynix': 'SK Hynix', '75 %': '75%', 'razor -thin': 'razor-thin', 'leading -edge': 'leading-edge', 'multi -gigawatt': 'multi-gigawatt', 'paste onto': 'paste onto'},
 'keycol': {'chokepoint': 'coral', 'tsmc': 'cyanHi', 'taiwan': 'cyanHi', 'asml': 'cyanHi', 'netherlands': 'cyanHi', 'hynix': 'amberHi', 'memory': 'amberHi', 'grids': 'amberHi', 'copy': 'coral', 'software': 'coral',
            'hyperscalers': 'cyanHi', 'google': 'cyanHi', 'amazon': 'amberHi', 'broadcom': 'coral', 'terafab': 'sageHi', 'billions': 'amberHi', '75%': 'coral', 'margins': 'coral', 'jensen': 'cyanHi',
            'fragile': 'coral', 'moat': 'cyanHi', 'leash': 'coral', 'compliance': 'coral', 'rivals': 'coral'},
 'mood': [[0, 'day'], [17.8, 'tense'], [23.3, 'warm'], [37.3, 'dusk']], 'sets': ['campus', 'office', 'plaza', 'mall'],
 'faces': [[8.4, 10.4, [-2.2, 2.6, 2.0], 1], [47.4, 49.8, [78, 2.8, 4.2], -1]],
 'ledger': [
  ['0.0-17.42', 'Modern AI runs on a razor-thin physical chokepoint: TSMC foundries in Taiwan, ASML EUV machines in the Netherlands, SK Hynix memory stacks and multi-gigawatt grids', 'scripted narration', SRC, 'AI platform on four pillars, each labelled as named'],
  ['17.98-22.72', 'Those relationships are not software code you can copy-paste onto a new CEO’s laptop', 'scripted narration', SRC, 'Laptop, code card, CANNOT COPY-PASTE stamp'],
  ['23.32-36.28', 'Hyperscalers like Google, Amazon and Broadcom, plus Musk’s Texas Terafab, are spending tens of billions trying to break free from NVIDIA’s 75% margins', 'scripted narration', SRC, 'NVIDIA tower surrounded by rival towers, 75% MARGINS counter'],
  ['37.4-56.86', 'Jensen won his job back because he is the only one who can hold the fragile supply chain together while defending the moat; his second act has a permanent compliance leash in Washington and a wall of custom chip rivals closing in', 'scripted narration', SRC, 'Jensen, chain nodes, leash to the White House, rivals closing in']],
 'cues': [[5.0, 'laser_trace', 'TSMC'], [8.0, 'laser_trace', 'ASML'], [16.6, 'stamp_impact', 'Razor thin'], [21.0, 'stamp_impact', 'Cannot copy-paste'], [30.6, 'swell_boom', '75% margins'], [51.4, 'ratchet_rise', 'Leash'], [53.0, 'mega_boom', 'Rivals']]})
(H / 'cfg_a6p2.json').write_text(json.dumps(c, indent=1), encoding='utf8')
print('ok')
