import json, pathlib
H = pathlib.Path(__file__).resolve().parent
c = {'assets': True, 'dmin': 22, 'dmax': 34}
SRC = 'Episode script (Act 5 part 3 SRT)'
c.update({
 'audio': 'Act 5 part 3', 'out': 'act5_part3_same_trap-3d.html', 'title': 'Act 5 Part 3 — The Same Trap (3D)', 'dur': 33.12,
 'rail': [0, 9.5, 26.1, 33.12], 'stn': [[13, 0], [39, 26], [1000000000, 52]], 'layout': [[0, 0], [40, -22], [82, -36]],
 'fixes': {'Nvidia': 'NVIDIA', 'Jensen Hwang': 'Jensen Huang', 'Jensen Wang': 'Jensen Huang'},
 'keycol': {'lenders': 'cyanHi', 'ironclad': 'coral', 'guarantees': 'coral', 'bolted': 'coral', 'ground': 'coral', 'earth': 'sageHi', 'musk': 'amberHi', '2027': 'amberHi', 'crunch': 'coral',
            'gpus': 'sageHi', 'power': 'cyanHi', 'cooling': 'cyanHi', 'hundreds': 'amberHi', 'billions': 'amberHi', 'trapped': 'coral', 'structural': 'coral', 'reality': 'coral'},
 'mood': [[0, 'tense'], [9.5, 'dusk'], [26.1, 'night']], 'sets': ['plaza', 'office', 'plaza'],
 'faces': [[12.4, 14.6, [22.0, 2.7, 4.0], -1], [29.6, 31.6, [48.8, 2.8, 4.0], 1]],
 'ledger': [
  ['0.00-8.74', 'Lenders are scrambling to force ironclad guarantees that the financed NVIDIA chips stay bolted to the ground on Earth', 'scripted narration', SRC, 'Chips chained to a concrete pad, banker and bondholder, NOT LEAVING EARTH stamp'],
  ['9.68-25.6', 'Musk warned on X of a massive 2027 cash crunch: paying for GPUs months before power and cooling are ready creates hundreds of billions in working capital pain', 'scripted narration', SRC, 'Elon, X post card, GPU bar vs power bar with a red gap, HUNDREDS OF BILLIONS counter'],
  ['26.04-32.46', 'Jensen Huang and Elon Musk are trapped in the exact same structural reality', 'scripted narration', SRC, 'Both in one cage, linked by a bar']],
 'cues': [[3.0, 'ratchet_rise', 'Chained'], [7.0, 'stamp_impact', 'Stays on Earth'], [14.0, 'laser_trace', 'X post'], [22.4, 'mega_boom', 'Hundreds of billions'], [30.6, 'stamp_impact', 'Same reality']]})
(H / 'cfg_a5p3.json').write_text(json.dumps(c, indent=1), encoding='utf8')
print('ok')
