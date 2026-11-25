import json, pathlib
H = pathlib.Path(__file__).resolve().parent
c = {'assets': True, 'dmin': 22, 'dmax': 34}
SRC = 'Episode script (Act 6 part 1 SRT)'
c.update({
 'audio': 'Act 6 part 1', 'out': 'act6_part1_the_illusion-3d.html', 'title': 'Act 6 Part 1 — The Illusion (3D)', 'dur': 38.32,
 'rail': [0, 9.5, 24.4, 38.32], 'stn': [[13, 0], [39, 26], [1000000000, 52]], 'layout': [[0, 0], [40, -22], [82, -36]],
 'fixes': {'Nvidia': 'NVIDIA'},
 'keycol': {'headlines': 'cyanHi', 'controls': 'amberHi', 'revolution': 'amberHi', '11': 'amberHi', 'wall': 'cyanHi', 'street': 'cyanHi', 'fire': 'coral', 'firing': 'coral', 'trillion': 'amberHi',
            'illusion': 'coral', 'physical': 'amberHi', 'supply': 'amberHi', 'chain': 'amberHi', 'musk': 'amberHi', 'board': 'cyanHi', 'white': 'cyanHi', 'house': 'cyanHi', 'afford': 'coral'},
 'mood': [[0, 'day'], [9.5, 'tense'], [24.4, 'warm']], 'sets': ['plaza', 'market', 'campus'],
 'faces': [[17.4, 19.8, [26, 2.8, 4.0], 1], [36.4, 38.0, [52, 2.8, 5.8], -1]],
 'ledger': [
  ['0.08-8.68', 'Step back from the headlines, the White House phone calls and the stock rallies, and look at what actually controls the AI revolution', 'scripted narration', SRC, 'Three news panes slide away, a chip platform rises'],
  ['9.68-23.8', 'For 11 days Wall Street acted as if firing one executive could erase NVIDIA’s value and rehiring him could create a trillion dollars overnight: the illusion of the surface news', 'scripted narration', SRC, 'Value bar falls then climbs, +$1.00 trillion counter, THE ILLUSION stamp'],
  ['24.58-37.84', 'One layer deeper, in the physical supply chain, nobody (not the board, Elon Musk or the White House) could afford to let Jensen walk away', 'scripted narration', SRC, 'Surface lifts, fab / chips / supply with moving packets, three parties around Jensen']],
 'cues': [[1.0, 'laser_trace', 'Headlines'], [6.2, 'stamp_impact', 'What controls'], [11.2, 'stamp_impact', 'Fired'], [17.0, 'swell_boom', 'Trillion'], [21.8, 'mega_boom', 'Illusion'], [36.2, 'mega_boom', 'Could not afford']]})
(H / 'cfg_a6p1.json').write_text(json.dumps(c, indent=1), encoding='utf8')
print('ok')
