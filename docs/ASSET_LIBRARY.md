# ASSET LIBRARY + PART TEMPLATE (jen_back) — build a new part fast

New part = 3 small files in `tools\jb\` (copy `cfg_a2p2.json`, `a2p2_keys.js`, `a2p2_scene.js`) then `python build_jb.py <id>`. Set `"assets": true` in the cfg to get `tools\jb\assets_jb.js` automatically (old parts a1p1/a1p2/a2p1 define their own helpers and do not use it).

## Steps (about 6 tool calls per part)
1. Beats from the SRT -> stations (one per idea, 30+ units apart) -> `layout` (winding offsets) + `stn` (x bounds/centres).
2. Per station choose: assets (below), cards (below), cast, camera types (CAMERA_GRAMMAR.md), mood.
3. Build, render 8-16 stills at beat times, fix overlaps (labels over the headline, cropped characters), build again.

## Narration phrase -> asset / card / camera
| narration idea | asset or card | camera |
|---|---|---|
| boardroom, board votes, board refuses | `table`, `boardWall`, `seats` + `Char('board')`, `trk([[0,'sit'],[t,'cross'|'panic']])` | hold/arc wide, push on the vote |
| White House / Washington / pressure | `whiteHouse(cx,z,u)`, `capitol(x,z,s,u)`, Trump/Vance sprites `spr:point`, `spr:explain` | fly arrive, hold |
| NVIDIA HQ, employees, revolt | `hqTower(cx,z,u,label)`, `Char('employee'|'engineer')` pose `panic`->`cheer` with `prop:'sign'` | fly, arc, pull to show crowd |
| rival / TerraFab / factory / construction | `fabSite(cx,z,u)` (crane + blocks), `pad` slabs | push on the number, pull to reveal |
| network, ecosystem, handshake, supply chain | `network(cx,cz,t,grow,breakAt,N,R)` links, breaks and drifts | push on the centre, pull when it breaks |
| normal company vs this one | `orgChart(ox,oz,scale,u)` | hold |
| a number / money / % / days | `Card kind:'counter'` (+ `scramble`, `pulse:[times]`), bars `barsRow` falling, `steps` | push on the number |
| a document, quote, petition, memo | `Card kind:'doc'` (`typeHead`, `type`, `lineAt` synced to narration, `hlWord` marker, `tear` to rip it) | hold or slow push while typing |
| a verdict word (FORCED OUT, NO, REFUSED) | `pop(...)` red/green/amber background = ink stamp (slam + shake) + `hit(...)` | hold, tiny push |
| a name / place / label | `pop(...)` dark tag, `Label` | none |
| a concept chart | `Card kind:'paint', paint:(g,pw,ph,u)=>...` (see playbook / stockChart in a2p1_scene.js) | hold |
| doors / secrets / who has the key | `door(x,z,locked)`, glowing `Cyl` ring, `?` stamp | push on the unknown door |
| victory / celebration | crowd `cheer`, confetti boxes (rndA loop), `trophy`, `ball` | pull |
| "normal people" / signers / shareholders | `Avatar(name,x,y,z,w,{t0,t1,frame,label})` portraits; `Char('student', ...)` poses idle talk point think panic cheer phone sit shrug | pull |
| something breaks | `crack(pts,t,t0)`, `tear` on a doc, network `breakAt`, bars turning red | pull |

## Characters
- Leads: Jensen, Elon, Trump, Vance, Kress, Reed, Cheung, board member: hand-drawn poses `pose:'spr:point'` etc. (`RigKit.sprPoses(role)`), 10 expressions.
- Generic roles (drawn rig): engineer, employee, trader, journalist, factory, supply, banker, bondholder, compliance, spacex. Poses: idle talk point think cross cheer clap panic hold phone shrug present sit walk run wave.
- Old casual people (from `projects\characters`): `Char('student', ...)` = one person with 10 sprite poses; `Avatar(name)` / `RigKit.bust` = 8 portraits: man woman office senior srwoman student midwoman young.
- Pose changes: always `trk([[0,'sit'],[t,'cross']], dur)` (spring blend, pure function of time).

## Other useful things already in `tools\`
`tools\scenes\*` (older scenes: coins, satellites, rings, capitol, bubbles, paper), `tools\charkit\` (character kit), `tools\export_video.js` (frame-exact video), `tools\cdp.js` (stills). Camera presets by span (`K2` in `scenes\a5p1_three_keys.js`) are not needed now: the grammar types replace them.
