import json, pathlib
H = pathlib.Path(__file__).resolve().parent
base = json.loads((H / 'cfg_a2p2.json').read_text(encoding='utf8'))
c = {k: base[k] for k in ('dmin', 'dmax', 'assets')}
SRC = 'Episode script (Act 4 part 3 SRT)'
c.update({
 'audio': 'Act 4 part 3', 'out': 'act4_part3_too_big_to_fail-3d.html', 'title': 'Act 4 Part 3 — Too Big To Fail (3D)', 'dur': 33.08,
 'rail': [0, 10.4, 23.3, 33.08],
 'stn': [[13, 0], [39, 26], [1000000000, 52]],
 'layout': [[0, 0], [40, -22], [82, -36]],
 'fixes': {'Nvidia': 'NVIDIA'},
 'keycol': {'senator': 'cyanHi', 'reed': 'cyanHi', 'big': 'amberHi', 'fail': 'coral', 'powerful': 'coral', 'fire': 'coral', 'lesson': 'amberHi', 'unmistakable': 'amberHi', 'infrastructure': 'cyanHi',
            'independent': 'coral', 'earth': 'sageHi', 'customer': 'amberHi', '44': 'amberHi', 'billion': 'amberHi', 'space': 'cyanHi'},
 'mood': [[0, 'tense'], [10.4, 'dusk'], [23.3, 'night']],
 'sets': ['mall', 'campus', 'plaza'],
 'ledger': [
  ['0.00-9.72', 'Senator Jack Reed: after the White House intervened, is NVIDIA now too big to fail, or was Jensen Huang too powerful to fire?', 'scripted narration', SRC, 'Reed quote card, balance with two pans'],
  ['10.44-23.12', 'Either way, a company that becomes critical infrastructure for the US government has a CEO who is never truly independent again', 'scripted narration', SRC, 'NVIDIA tower tied to the White House, chain on Jensen'],
  ['23.12-32.5', 'While Jensen fought for control on Earth, his biggest customer was fighting a $44 billion battle to launch NVIDIA chips into space', 'scripted narration', SRC, 'Earth disc, Elon, $44B counter, rising satellites']],
 'cues': [[3.4, 'stamp_impact', 'Too big to fail'], [6.4, 'stamp_impact', 'Too powerful to fire'], [20.0, 'mega_boom', 'Never independent'], [29.8, 'swell_boom', '$44 billion']]})
(H / 'cfg_a4p3.json').write_text(json.dumps(c, indent=1), encoding='utf8')
print('ok')
