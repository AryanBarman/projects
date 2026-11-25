import json, pathlib
H = pathlib.Path(__file__).resolve().parent
base = json.loads((H / 'cfg_a2p2.json').read_text(encoding='utf8'))
c = {k: base[k] for k in ('dmin', 'dmax', 'assets')}
c.update({
 'audio': 'Act 3 part 1', 'out': 'act3_part1_enter_washington-3d.html', 'title': 'Act 3 Part 1 — Enter Washington (3D)', 'dur': 42.24,
 'rail': [0, 5.0, 12.4, 23.0, 34.0, 42.24],
 'stn': [[13, 0], [39, 26], [65, 52], [91, 78], [1000000000, 104]],
 'layout': [[0, 0], [40, -22], [82, -36], [104, -76], [62, -100]],
 'fixes': {'Nvidia': 'NVIDIA', 'Stephen Chang': 'Steven Cheung', 'Stephen Cheung': 'Steven Cheung'},
 'keycol': {'washington': 'cyanHi', 'national': 'coral', 'security': 'coral', 'emergency': 'coral', 'trump': 'amberHi', 'vance': 'amberHi', '72': 'amberHi', 'pressure': 'coral',
            'asset': 'sageHi', 'jensen': 'cyanHi', 'china': 'coral', 'involved': 'amberHi', 'protect': 'sageHi', 'geniuses': 'sageHi', 'cripple': 'coral'},
 'mood': [[0, 'day'], [5.0, 'tense'], [12.4, 'warm'], [23.0, 'day'], [34.0, 'dusk']],
 'sets': ['mall', 'office', 'mall', 'campus', 'office'],
 'ledger': [
  ['0.00-4.90', 'Enter Washington, D.C. Over the weekend before Monday’s reversal', 'scripted narration', 'Episode script (Act 3 part 1 SRT)', 'Capitol and White House rise, WASHINGTON D.C. tag'],
  ['5.44-11.88', 'The crisis stopped being a boardroom fight and became a national security emergency', 'scripted narration', 'Episode script (Act 3 part 1 SRT)', 'Board argues, sirens, NATIONAL SECURITY EMERGENCY stamp'],
  ['13.08-25.18', 'White House officials: Trump called key stakeholders; Vance led a 72-hour pressure campaign on NVIDIA’s board', 'scripted narration', 'Episode script (Act 3 part 1 SRT)', 'Trump calls four stakeholders, Vance and the board, 72-hour counter'],
  ['25.18-33.40', 'Jensen Huang was a national asset; America could not cripple its leading AI chipmaker while racing China', 'scripted narration', 'Episode script (Act 3 part 1 SRT)', 'NATIONAL ASSET stamp, chip tower cracks, USA vs China race'],
  ['34.42-41.68', 'Steven Cheung: Trump was totally involved; we have to protect our geniuses', 'scripted narration', 'Episode script (Act 3 part 1 SRT)', 'Cheung quote card, Jensen behind a shield, PROTECT stamp']],
 'cues': [[8.9, 'mega_boom', 'National security emergency'], [15.4, 'laser_trace', 'Trump called'], [19.6, 'ratchet_rise', '72 hours'], [25.9, 'stamp_impact', 'National asset'],
          [31.2, 'laser_trace', 'Cripple'], [40.4, 'stamp_impact', 'Protect our geniuses']]})
(H / 'cfg_a3p1.json').write_text(json.dumps(c, indent=1), encoding='utf8')
print('ok')
