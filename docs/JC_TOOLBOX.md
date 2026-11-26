# JC TOOLBOX: which tool for which idea (cost vs payoff). Read this BEFORE a storyboard.
Goal: the best picture for the least tokens, never flat. Decide per idea, mix at most 2 tools in one station, and BUILD IT PART BY PART on the spoken words (nothing is shown finished before it is said).

| idea type | best tool | why / cost | how it avoids being flat |
|---|---|---|---|
| a number moving over time (price, rate, rally, drop) | PAPER CHART `stepChart` (dashed `proj` for "would keep falling") | cheap (~10 lines), exact | line draws on the word; a character reacts; colour flips at the drop |
| comparing 2-3 values | PAPER BARS `paperBars` | cheap | bars grow one at a time; value pills pop on the number |
| several statistics announced one after another | METRIC TILES `metricTiles` (thermometer fills, number counts up) | cheap, very readable | each tile pops on its word; badge after the key phrase |
| a transaction / loan / guarantee / loop between parties | 2D BOARD `boardDiagram` | cheap per board, explains best | nodes appear in order, arrows draw on the word, bags/chips/papers travel |
| a place, a crowd, a person reacting, a speaker | 3D SCENE + characters (`Char`, `courier`) | medium | people move/emote; props (racks, shelf, umbrella) build on the word |
| a physical threat / pressure / protection | 3D props (blocks sliding in, umbrella over racks, shelf with rising price tags) | medium | motion IS the idea |
| a document / rule / quote | `Card kind:'doc'` (typed lines, `tear` to rip it) | cheap | typing on the word, tear on the verdict |
| a date / name / number with no visual | a small tag, calendar sheet | cheapest | only when nothing else shows it |
| a map / route (later: exports to China) | map-animation skill (see _skills_src) | high | draw the route on the word |
| a brand-new object | build ONLY if it will be reused (put it in assets_jb.js) | most expensive | - |

Rules: (1) never a finished diagram at the start of a beat; (2) one hero per frame; (3) every beat has ONE action by a person or object (reaction, walk, tear, fill, count-up); (4) the continuing picture connects parts (open on the last picture of the previous part); (5) camera: arrive with `fly`, then `hold` (no push/pull/arc unless framing is checked); (6) text only for numbers, dates and names.
Cost guide per part (about): story file ~30-40 lines per station with the helpers above; a new helper once (~40 lines) pays back across acts.

## FOCUS RULE (review 2026-11-26: "motions intersect or overlap, so the focus cannot be in one place")
Decision: ONE thing moves at a time. Implemented in the tools, not by hand:
- `boardDiagram`: only the ACTIVE link (the latest one that has started) is bright and has travelling tokens; earlier links stay drawn but dimmed and still; nodes not in the active link dim to 50% once introduced (a node stays bright for 1.6 s after it appears, or inside its `hero:[t0,t1]` window, e.g. a gauge needle that is the point).
- Scenes: sequence the beats on the spoken words (A, then B, then C), never two heroes at once; a character reacts only AFTER the hero lands; one impact ring per beat; a previous element that is finished is crossed out / faded (arrowCard) instead of staying next to the new one.
- New small tools: `monthSheet` (calendar page with circled dates), `arrowCard` (big cut/hike arrow with cross-out), icon `trend`.

## MIX RULE (review 2026-11-26: "why always paper? use a mix; chars, locations, movements of assets, graphs ... in the right proportion")
Per PART aim for 3-4 different families, never one template for the whole part. Families: (A) 3D location + characters acting (courier/Char, walk-ins, cheers, reactions); (B) PHYSICAL METAPHOR scenes (ship in a storm: `ship`, `waves`, `rain`, `stormCloud`, lightning `flash`; umbrella over racks; barriers sliding in; a tower crumbling); (C) moving assets (rising arrow, falling blocks, walls squeezing, bags/chips travelling); (D) paper chart / bars / tiles / planner for NUMBERS only; (E) 2D board for TRANSACTIONS; (F) documents that type / tear; (G) icon cards that pop with a word. Proportion guide: about 40% A/B/C (people and things moving), 30% D/E (data), 30% F/G + connection frames. A metaphor beats a chart when the idea is a feeling (storm, squeeze, weight, race).
Act 7 is the reference mix: S1 location + characters + rising arrow + crumbling tower; S2 ship-in-a-storm metaphor with icon cards on dark clouds; S3 graph that forks + two walls sliding in.
