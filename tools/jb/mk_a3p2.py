import json, pathlib
H = pathlib.Path(__file__).resolve().parent
base = json.loads((H / 'cfg_a2p2.json').read_text(encoding='utf8'))
c = {k: base[k] for k in ('dmin', 'dmax', 'assets')}
SRC = 'Episode script (Act 3 part 2 SRT)'
c.update({
 'audio': 'Act 3 part 2', 'out': 'act3_part2_the_backlash-3d.html', 'title': 'Act 3 Part 2 — The Peak and the Backlash (3D)', 'dur': 73.72,
 'rail': [0, 7.0, 14.1, 21.4, 26.8, 33.9, 44.2, 52.4, 66.9, 73.72],
 'stn': [[13, 0], [39, 26], [65, 52], [91, 78], [117, 104], [143, 130], [169, 156], [195, 182], [1000000000, 208]],
 'layout': [[0, 0], [40, -22], [82, -36], [104, -76], [62, -100], [18, -84], [-22, -110], [24, -140], [70, -160]],
 'fixes': {'Nvidia': 'NVIDIA'},
 'keycol': {'peak': 'amberHi', 'dam': 'coral', 'pressure': 'coral', 'unanimously': 'sageHi', 'caved': 'coral', 'president': 'amberHi', 'ceo': 'amberHi', 'director': 'amberHi',
            'erupted': 'sageHi', 'second': 'sageHi', 'coming': 'sageHi', 'better': 'sageHi', 'markets': 'sageHi', 'exploded': 'sageHi', 'trillion': 'amberHi',
            'backlash': 'coral', 'democrats': 'cyanHi', 'republican': 'coral', 'investigations': 'cyanHi', 'corruption': 'coral', 'interference': 'coral',
            'smuggling': 'coral', 'chinese': 'coral', 'intelligence': 'coral', 'scrutiny': 'amberHi', 'fine': 'amberHi', 'print': 'amberHi', 'job': 'coral'},
 'mood': [[0, 'day'], [3.7, 'tense'], [7.0, 'warm'], [14.1, 'day'], [21.4, 'warm'], [26.8, 'day'], [33.9, 'tense'], [44.2, 'tense'], [52.4, 'dusk'], [66.9, 'night']],
 'sets': ['campus', 'office', 'campus', 'plaza', 'market', 'mall', 'plaza', 'mall', 'office'],
 'ledger': [
  ['0.00-6.44', 'The peak of Jensen’s comeback; by Monday morning the pressure broke the dam', 'scripted narration', SRC, 'Steps to a peak, pressure arrows, dam cracks and floods'],
  ['7.12-13.42', 'The board caved unanimously, reinstating Jensen as president, CEO and board director', 'scripted narration', SRC, 'Board shrugs, UNANIMOUS stamp, typed reinstatement card'],
  ['14.14-21.16', 'Huang walked back into HQ; employees erupted like a rock concert, calling it his second coming', 'scripted narration', SRC, 'HQ tower, walk-in, cheering crowd, spotlights, confetti, SECOND COMING stamp'],
  ['21.44-26.06', 'Jensen promised: I’m going to be a better CEO the second time around', 'scripted narration', SRC, 'Podium, typed quote card'],
  ['26.84-32.44', 'Markets exploded upward, adding nearly a trillion dollars in a single day', 'scripted narration', SRC, 'Rising bars, NEARLY $1 TRILLION counter'],
  ['33.94-43.22', 'The political backlash nobody priced in; Washington blew up from both sides of the aisle', 'scripted narration', SRC, 'Capitol, aisle line, blue and red bursts'],
  ['44.26-51.54', 'Top Democrats demanded investigations into potential corruption and improper political interference in a public company', 'scripted narration', SRC, 'Democrat figure, typed demand card'],
  ['52.46-66.92', 'Republican lawmakers broke with the White House, blasting the reinstatement of a CEO under scrutiny over alleged chip smuggling and Chinese intelligence ties', 'scripted narration', SRC, 'Split from the White House, ALLEGED tags'],
  ['66.92-73.26', 'The fine print of the official reinstatement filing: Jensen did not walk back into the same job he left', 'scripted narration', SRC, 'Filing card, NOT THE SAME JOB stamp']],
 'cues': [[4.4, 'mega_boom', 'Broke the dam'], [8.0, 'stamp_impact', 'Unanimously'], [19.8, 'swell_boom', 'Second coming'], [27.2, 'swell_boom', 'Markets exploded'],
          [36.0, 'stamp_impact', 'Nobody priced in'], [40.2, 'mega_boom', 'Both sides'], [55.6, 'stamp_impact', 'Broke with the White House'], [71.4, 'stamp_impact', 'Not the same job']]})
(H / 'cfg_a3p2.json').write_text(json.dumps(c, indent=1), encoding='utf8')
print('ok')
