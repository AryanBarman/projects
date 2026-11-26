# DESIGN: "Jensen back with crash" (landscape 1920x1080, jb2 story files)
Audio: `jensen back with crash\audio\Act N part M.wav/.srt` (13 clips, 533 s). Frozen: `tools\jb`, `jen_back`, old acts. New work = `tools\jb2\stories\jc_*.story.json` only.

## Rules (this series)
- Landscape 16:9, `portrait:false`. One-line low captions (default style). Max 3 text cards per file; every beat has a character.
- An idea is shown by assets, scene and movement (cards only for one key number). Idea-container rules: pending the user's training, not assumed.
- Facts stay as narrated (script is not corrected). Spelling is corrected in captions via `corrections` (original SRT never edited):
  Wong/Hwang -> Huang; Corweave -> CoreWeave; Nvidia -> NVIDIA; "31 .5 %" / "31.5 %" -> 31.5%; "x %" -> x%; "fast -growing" etc. -> "fast-growing"; U.S. kept on one caption; broken char in Act 4p1 -> em dash.
- Palette: day scenes keep the premium grade (vignette); NVIDIA green `#76B900` only on chips/logo-less GPU props; loss = coral `#D94E43`, gain = mint `#6EE7A8`, money = gold `#E2B857`, ink `#0B191E`.
- Characters: stickman v2 roles. Lead `jensen`; investors `trader`/`bondholder`/`analyst`; board `board`; lawyer `compliance`; lawmakers `reed`.

## Act 1 (part 1 + part 2 in ONE file, 79.4 s) beats and assets
| Time | Narration idea | Scene | Assets (H = have, B = build, F = free pack) |
|---|---|---|---|
| 0-6 | Jensen back to save the $4T empire | office/stage | Jensen H, gold-crowned chip tower B (Stack + crown) |
| 6-14 | Monday +31.5% jump, Wed tens of billions vanish | trading | stock line up-spike then fall B, coins flying away H(Coins) |
| 14-24 | Rehire can't fix debt crisis, Dec rate hike, investigation | office | chained moneybag B-small(H moneybag+lock), rate dial B, magnifier B |
| 25-36 | 11 days in Nov 2026, falling apart after founder steps down | hallway (door) | calendar page-flip B, Jensen leaves through door H(Room hallway) |
| 36-50 | Mon Nov 23 board brings him back, +31.5%, nearly a trillion back | boardroom | board table B, board chars H, gold rise H(goldbars) |
| 50-64 | "Unstoppable", then Tue -6%, Wed -4%, tens of billions gone | trading | two-step down chart B (same chart prop), coins H |
| 64-79 | Why cheer Monday then sell? follow the money, Monday-morning math | trading/street | investor chars H, dashed money trail H(Dashed) |

New procedural models to build ONCE in `shim_env_jb.js` PROC (reusable for Acts 2-7): `stockline` (animated up/down polyline, params), `calendar`, `dial` (rate gauge), `magnifier`, `boardtable`, `crown`. Everything else exists.

## Free 3D assets
- Downloaded: `assets3d\kenney_furniture_pack\pack.zip` (Kenney Furniture Pack 1.0, CC0, from OpenGameArt). NOT used: OBJ/FBX only (our loader is GLB) and it is home furniture (beds, bath) not finance/office. Kept for reference.
- Already used: Quaternius Ultimate Space Kit (CC0). kenney.nl itself blocks automated download (returns a stub page).
- Conclusion: Act 1 needs no external models; procedural props are cheaper and match the stickman style.

## DECISION 2026-11-26: use the OLD jb way for this series (the jb2 story-file attempt, `jc_a1`, was judged bad: assets, camera flow, characters)
- Pipeline copy: `tools\jc\` (build_jc.py = tools\jb\build_jb.py with output + audio folder `jensen back with crash\`, plus `corrections.json` regex spelling fixes applied to captions). `tools\jb` and `jen_back` are untouched.
- One part = 3 files in `tools\jc\`: `mk_<id>.py` (cfg + ledger from the SRT), `<id>_keys.js` (K(t, eye, target, fov, fly|push|pull|arc|hold)), `<id>_scene.js` (stations 26 apart, Char sprites incl. real Jensen, `pop`/Card/doc cards, assets_jb.js props). Build: `python build_jc.py <id>` -> `jensen back with crash\<out>.html`; audio plays from `jensen back with crash\audio\<clip>.wav`.
- Done: `c1p1` (Act 1 part 1) -> `act1_part1_the_comeback_crash-3d.html`. Next parts follow the same recipe.
- The jb2 pages (`jensen back with crash\out\*`) are kept only as a reference. Their voice failed because the page looks for `audio\<name>.wav` next to itself; the wav was beside it, not in an `audio` subfolder (copied there for that page).

## HQ characters (2026-11-26) - new high-res sets replace the old sprites in the crash series
- Sources: `characters\jensen` (14 poses: 7 singles on green + the 7-pose "Key Action Poses" strip), `characters\elon` (6, on black), `characters\wall steet trader`, `characters\federal reserve chair`, `characters\Congressional Committee Lawmaker  Subpoena Chair` (6 each, transparent).
- Build: `python tools\jc\charkit\build_hq.py` -> `poses_hq.webp` (4096x930, ~1.2 MB) + `sprites_hq_meta.json` (chroma-key / outline-wall key, watermark removed, one scale per character, standing pose = 440 px). `patch_rig.py` (in `tools\jc\charkit`) embeds it; build_jc.py uses that copy. The shared `tools\charkit` and all old acts are unchanged.
- Roles: `jensen`, `elon`, `trader`, `fed` (alias fedchair), `lawmaker` (aliases chair, congressman). HQ roles are sprite-only: any generic pose name in a scene (cheer, panic, think, explain, cross, walk, sit ...) is mapped to the nearest real pose (ALT table in rigkit.js).
- Poses: jensen cross panic point run shrug sit thumbs charge cheer overwhelmed walk(2-frame) chair think(investigate) why; elon cross explain think cheer point shrug; trader cross hold think shout tablet shrug; fed cross podium think sign paper stop; lawmaker cross podium subpoena point paper plead.
- Not verified: facing direction of every pose (only Jensen's point/thumbs/walk are mirrored), Elon/fed/lawmaker/trader in-scene beyond c1p1, strip-derived Jensen poses are lower resolution than the singles.

## STATUS (old jb way, HQ characters)
- `c1p1` Act 1 part 1 -> `act1_part1_the_comeback_crash-3d.html` (3 stations).
- `c1p2` Act 1 part 2 -> `act1_part2_eleven_days-3d.html` (5 stations: 11 days / board returns +31.5% ~$1T / -6% -4% / why cheer then sell / follow the money). Files: `tools\jc\{mk_c1p2.py, c1p2_keys.js, c1p2_scene.js}`; build `python tools\jc\build_jc.py c1p2`.
- Seen on stills only (no playback, no audio check). Known: characters sit low behind the caption bar in S3/S4; S4 cast mixes rig + HQ roles; Jensen's seated pose in S2 is small; the doc card dominates the S5 end frame.

## FIXES after review 1 (2026-11-26) - timing, containers, chart, connection
- Word timing: `python tools\jc\wt.py "Act 1 part 2" tuesday "6%" ...` prints the onset of each spoken word (estimated inside each SRT chunk by character count, error about 0.15 s; no aligner installed). Scenes now trigger stamps/counters/chart steps on those times (the comment at the top of each scene lists them). For exact times install an aligner (faster-whisper) and replace `words()` in wt.py.
- Containers (tools\jc only): stamps = solid colour block, white text, shadow, no outline, bigger padding; counters = no outline, accent underline; tags = no hairline; the top-left headline = one rounded padded card (build_jc.py replaces drawHeadline). The old jb/jen_back are untouched.
- Chart: `stepChart` in tools\jc\assets_jb.js (Card kind:'paint'): keys [[time, y, ramp]] so a drop STARTS on the word; smooth thick line (green up / red down), area fill, glowing head, percent pills at the head; impact ring + bars step down on the same times.
- Part 1 -> part 2 connection: part 2 opens (0-3.9 s) on the SAME three-doors picture, same cast and same camera as the last frame of part 1, then pulls back and flies to the 11-day station. Part 1's chart/doors were retimed to the words (debt 19.58, hike 21.77, investigation 23.24).
