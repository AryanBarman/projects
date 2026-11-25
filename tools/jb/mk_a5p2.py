import json, pathlib
H = pathlib.Path(__file__).resolve().parent
base = json.loads((H / 'cfg_a2p2.json').read_text(encoding='utf8'))
c = {'assets': base['assets'], 'dmin': 19, 'dmax': 30}
SRC = 'Episode script (Act 5 part 2 SRT)'
c.update({
 'audio': 'Act 5 part 2', 'out': 'act5_part2_the_wall-3d.html', 'title': 'Act 5 Part 2 — The Wall (3D)', 'dur': 53.6,
 'rail': [0, 6.9, 22.9, 38.9, 53.6], 'stn': [[13, 0], [39, 26], [65, 52], [1000000000, 78]],
 'layout': [[0, 0], [40, -22], [82, -36], [104, -76]],
 'fixes': {'Nvidia': 'NVIDIA', 'Vero Rubin': 'Vera Rubin', '8.36 %': '8.36%', '$40 -plus': '$40-plus', 'low -Earth': 'low-Earth'},
 'keycol': {'wall': 'coral', 'interest': 'amberHi', 'rates': 'amberHi', 'subordinated': 'coral', 'yields': 'amberHi', '8.36%': 'coral', 'gpus': 'sageHi', 'depreciate': 'coral', 'brutally': 'coral',
            'loophole': 'coral', 'terrifying': 'coral', 'orbital': 'cyanHi', 'orbit': 'cyanHi', 'vera': 'sageHi', 'rubin': 'sageHi', 'bondholders': 'cyanHi', 'defaults': 'coral', 'repossess': 'coral', '340': 'amberHi'},
 'mood': [[0, 'tense'], [6.9, 'day'], [22.9, 'dusk'], [38.9, 'night']], 'sets': ['plaza', 'market', 'plaza', 'plaza'],
 'ledger': [
  ['0.00-6.94', 'Here is where the math and the lenders hit a wall', 'scripted narration', SRC, 'Brick wall rises between SpaceX and the lenders'],
  ['6.94-21.64', 'Lenders forced SpaceX to pay yields as high as 8.36% on subordinated tranches because GPUs depreciate fast with every newer NVIDIA chip', 'scripted narration', SRC, 'Tranche stack, yield counter to 8.36%, chips losing value'],
  ['22.88-38.9', 'Lenders noticed a loophole: the orbital data center pitch relies on launching Vera Rubin chips into low-Earth orbit', 'scripted narration', SRC, 'Elon, rocket and satellites rising'],
  ['38.9-53.14', 'If SpaceX defaults on a $40-plus billion loan, how do you repossess a GPU floating 340 miles above the Earth?', 'scripted narration', SRC, 'Bondholder, default stamp, hook too short, question mark']],
 'cues': [[3.4, 'mega_boom', 'A wall'], [11.0, 'laser_trace', 'Yields'], [14.6, 'stamp_impact', '8.36%'], [23.2, 'stamp_impact', 'Loophole'], [43.4, 'stamp_impact', 'Default'], [49.2, 'swell_boom', 'Repossess']]})
(H / 'cfg_a5p2.json').write_text(json.dumps(c, indent=1), encoding='utf8')
print('ok')
