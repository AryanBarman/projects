import json, pathlib
H = pathlib.Path(__file__).resolve().parent
base = json.loads((H / 'cfg_a2p2.json').read_text(encoding='utf8'))
c = {k: base[k] for k in ('dmin', 'dmax', 'assets')}
SRC = 'Episode script (Act 4 part 1 SRT)'
c.update({
 'audio': 'Act 4 part 1', 'out': 'act4_part1_built_around_jensen-3d.html', 'title': 'Act 4 Part 1 — Built Around Jensen (3D)', 'dur': 48.6,
 'rail': [0, 8.4, 16.4, 23.0, 31.8, 38.9, 45.7, 48.6],
 'stn': [[13, 0], [39, 26], [65, 52], [91, 78], [117, 104], [143, 130], [1000000000, 156]],
 'layout': [[0, 0], [40, -22], [82, -36], [104, -76], [62, -100], [18, -84], [-22, -110]],
 'fixes': {'Nvidia': 'NVIDIA'},
 'keycol': {'quietly': 'coral', 'built': 'coral', 'keys': 'amberHi', 'title': 'sageHi', 'seat': 'sageHi', 'crowd': 'sageHi', 'two': 'amberHi', 'governance': 'cyanHi', 'mechanisms': 'amberHi',
            'locked': 'coral', '11': 'amberHi', 'november': 'amberHi', 'permanent': 'amberHi', 'national': 'cyanHi', 'security': 'cyanHi', 'export': 'cyanHi', 'oversight': 'cyanHi', 'committee': 'cyanHi',
            'independent': 'sageHi', 'compliance': 'sageHi', 'officer': 'sageHi', 'investigations': 'coral', 'ongoing': 'coral', 'first': 'amberHi', 'second': 'amberHi'},
 'mood': [[0, 'tense'], [8.4, 'day'], [16.4, 'dusk'], [23.0, 'day'], [31.8, 'warm'], [38.9, 'tense'], [45.7, 'dusk']],
 'sets': ['office', 'campus', 'plaza', 'office', 'campus', 'office', 'plaza'],
 'ledger': [
  ['0.00-7.54', 'Look closely at what NVIDIA’s board quietly built around Jensen Huang before handing him back the keys', 'scripted narration', SRC, 'Bars rise around Jensen, key slides back'],
  ['8.56-15.72', 'Jensen got his title, his board seat and his cheering crowd of engineers back', 'scripted narration', SRC, 'Checklist card, chair rises, engineers cheer'],
  ['16.54-22.30', 'Two new governance mechanisms locked into place during those 11 days', 'scripted narration', SRC, 'Gate with two padlocks, 11-day counter'],
  ['23.17-31.04', 'First, on November 17th, the board created a permanent national security and export control oversight committee', 'scripted narration', SRC, 'Committee table, typed list, PERMANENT stamp'],
  ['31.94-38.96', 'Second, in the press release announcing Jensen’s return, NVIDIA announced it is hiring an independent Chief Compliance Officer', 'scripted narration', SRC, 'Press-release card, compliance figure'],
  ['38.96-45.78', 'The Chief Compliance Officer reports directly to the board’s governance committee', 'scripted narration', SRC, 'Reporting line to the committee table'],
  ['45.78-48.06', 'Government investigations are still ongoing', 'scripted narration', SRC, 'Radar sweep, STILL ONGOING stamp']],
 'cues': [[4.6, 'laser_trace', 'The keys'], [10.0, 'stamp_impact', 'His title'], [17.9, 'stamp_impact', 'Lock one'], [20.7, 'stamp_impact', 'Lock two'], [26.4, 'stamp_impact', 'Permanent'],
          [37.9, 'stamp_impact', 'Independent'], [47.0, 'mega_boom', 'Still ongoing']]})
(H / 'cfg_a4p1.json').write_text(json.dumps(c, indent=1), encoding='utf8')
print('ok')
