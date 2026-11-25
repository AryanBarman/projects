import json, pathlib
H = pathlib.Path(__file__).resolve().parent
c = {
 "assets": True,
 "dmin": 20,
 "dmax": 42,
 "portrait": True,
 "clean": True,
 "stick": True,
 "audio_dir": "shorts2/audio",
 "out_dir": "shorts2",
 "audio": "s2027",
 "out": "s2027.html",
 "title": "The 2027 AI Cash Crunch Warning",
 "dur": 39.5,
 "rail": [
  0.0,
  6.9,
  11.94,
  21.96,
  33.86,
  39.5
 ],
 "stn": [
  [
   1000000000,
   0
  ]
 ],
 "layout": [
  [
   0,
   0
  ]
 ],
 "sets": [
  "plaza"
 ],
 "fixes": {},
 "keycol": {
  "2027": "amberHi",
  "gpu": "amberHi"
 },
 "mood": [
  [
   0,
   "day"
  ],
  [
   11.9,
   "tense"
  ]
 ],
 "faces": [],
 "dress": [],
 "models": {},
 "punch": [
  [
   0.05,
   4,
   0.05,
   0.12
  ],
  [
   6.95,
   4,
   0.05,
   0.12
  ],
  [
   11.99,
   4,
   0.05,
   0.12
  ],
  [
   22.01,
   4,
   0.05,
   0.12
  ],
  [
   33.91,
   4,
   0.05,
   0.12
  ]
 ],
 "ledger": [
  [
   "0.00-6.04",
   "Elon Musk just warned that AI companies are heading straight into a massive cash crunch in 2027.",
   "scripted narration (unverified)",
   "Short script (The 2027 AI Cash Crunch Warning)",
   "recipe: panic"
  ],
  [
   "6.90-11.06",
   "Everyone thinks the bottleneck in AI is getting enough Nvidia chips, but that's backwards.",
   "scripted narration (unverified)",
   "Short script (The 2027 AI Cash Crunch Warning)",
   "recipe: chips"
  ],
  [
   "11.94-21.36",
   "Tech giants are paying tens of billions up front for GPU clusters today, but you can ship a server rack in weeks while building the power plants to run it takes years.",
   "scripted narration (unverified)",
   "Short script (The 2027 AI Cash Crunch Warning)",
   "recipe: chips"
  ],
  [
   "21.96-32.58",
   "Therefore, billion-dollar data centers end up sitting dark, burning cash every single month while generating zero revenue. And here's how much cash Elon says that delay will cost.",
   "scripted narration (unverified)",
   "Short script (The 2027 AI Cash Crunch Warning)",
   "recipe: panic"
  ],
  [
   "33.86-39.30",
   "Hundreds of billions of dollars in working capital, which is why Elon Musk just warned that AI companies...",
   "scripted narration (unverified)",
   "Short script (The 2027 AI Cash Crunch Warning)",
   "recipe: clause"
  ]
 ],
 "cues": [
  [
   0.0,
   "stamp_impact",
   "panic"
  ],
  [
   6.9,
   "stamp_impact",
   "chips"
  ],
  [
   11.94,
   "stamp_impact",
   "chips"
  ],
  [
   21.96,
   "stamp_impact",
   "panic"
  ],
  [
   33.86,
   "stamp_impact",
   "clause"
  ]
 ]
}
(H / 'cfg_s2027.json').write_text(json.dumps(c, indent=1), encoding='utf8')
print('ok')
