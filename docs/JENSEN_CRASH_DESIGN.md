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

## STATUS: Act 2 part 1 (`c2p1`) -> `act2_part1_the_basic_math-3d.html` (45.3 s)
S0 continues the last picture of Act 1 part 2 (money trail into "THE SIMPLE MATH") -> October high vs November exit (-47%, cut in half) -> +31.5% but still 30%+ below the record -> $100 / $53 / $70 bars with "STILL BELOW" -> sales and profit beat, stock still fell. All triggers on spoken-word times (wt.py). Stills only; next: Act 2 part 2 (`c2p2`).

## STATUS: Act 2 part 2 (`c2p2`) -> `act2_part2_the_first_warning-3d.html` (34.1 s)
Opens on the last picture of Act 2 part 1 (paper bars: sales/profit BEAT, stock STILL FELL) -> worth trillions, selling chips not enough (paper bars) + TUESDAY MORNING -> leadership fixed, then DEBT / RATES / GOVERNMENT blocks close in on an overwhelmed Jensen -> calm stock chart on paper vs a stack of UNPAID BILLS and the CLOSEST PARTNER tower (hands off to Act 3 part 1, CoreWeave). Stills only.

## STATUS: Act 3 part 1 (`c3p1`) -> `act3_part1_meet_coreweave-3d.html` (48 s)
Opens on the last picture of Act 2 part 2 (calm paper chart + UNPAID BILLS + partner tower) -> don't just watch NVIDIA, watch the borrowers (coins/chips flow) -> Meet CoreWeave (FAST-GROWING AI CLOUD, CLOSEST PARTNER, chips flow) -> $2 BILLION invested + AGREEMENT doc (unused computing power through April 2032) -> EARNINGS CALL, $118 BILLION guarantees, AI DATA CENTERS -> the LOOP (NVIDIA -> GUARANTEE -> BANK LOAN -> PARTNER -> chips -> NVIDIA). Stills only. webgl-animation-skills fetched (threejs-animation: instancing, disposal, verify) - nothing needed yet; could instance the coins/racks if frame rate becomes an issue.
Known weak: hqTower assets look big and crop at the close pushes; BANK node is a plain box; the money-flow items are small.

## REVISION: Act 3 part 1 rebuilt as ACTION (2026-11-26) - see JC_DEPICTION_MAP.md
Review said "using just text to show an idea feels bad". Rebuilt `c3p1`: borrowers walk analyst -> BANK (banker hands a bag) -> NVIDIA (hand over the bag, get a crate of chips); CoreWeave building grows; Jensen and the CoreWeave executive walk to the middle and shake hands, crate carriers keep arriving; Jensen hands a money bag and receives a paper (invest), then walks along a rack row that lights green (unused capacity reserved), April 2032 is the only date tag; CFO at a podium with analysts reacting, an umbrella over the data-center racks with the $118 BILLION on it; the loop = NVIDIA rep signs and carries a guarantee paper to the bank, banker hands a bag to the partner, partner carries the bag to NVIDIA and walks off with a crate. New helpers in tools\jc\assets_jb.js: courier, pathAt, item(bag|crate|paper), bankHouse, rackRow, umbrella, podium. Held items sit at chest height (hW*0.72).
Known: props are small at wide camera, bank/towers still dominate close pushes; stills only. Housekeeping: tools\cdp*.js now delete old headless-Chrome profiles (they filled the C: drive once; I deleted 2.6 GB of my own scratch with permission).
RULE going forward: write a depiction storyboard (verb -> action) per part, show it, then build.

## REVISION 2: Act 3 part 1 CLEAN STAGING (2026-11-26, after "camera angles, assets colliding, not showing things before moving")
Causes found and fixed: (1) hqTower is 10 units wide whatever its height, so towers swallowed the people next to them -> new `miniTower` (5 wide) and `bankHouse(x,z,u,scale)`; buildings now sit at the sides and BEHIND (z -4..-5), people in front lanes (z 2.8-4.4); (2) camera keys of type push / pull / arc dolly in and roll the picture, which crushed the scene -> this part uses ONLY `fly` (arrival at a station) and `hold` (no mid-scene camera moves); (3) action started the moment the station appeared -> every set and cast now stands still ~1.5-2.5 s before anything moves (first movement at 5.4 s, 17.0 s, 22.6 s, 41.0+ s).
RULES (also for Act 3 part 2): stage = centre +-12 and one composition per idea; max 3-4 moving people; carried items at chest height; no push/pull/arc unless the framing is checked; show -> pause -> act on the spoken word. Still visible: a slight tilt from the living-camera roll in some frames (stills only; not played).

## REVISION 3: Act 3 part 1 uses 2D BOARDS for transactions (2026-11-26)
S1 (borrow + buy), S2 (CoreWeave: growth, handshake, chips), S3 ($2B invested, unused power bought, April 2032) and S5 (guarantee -> loan -> pay / chips loop) are now board diagrams with a presenter; S0 (connection) and S4 (podium + umbrella over data centers) stay 3D. Stills only. Weak: link labels still crowd the nodes in a few frames; the presenter is small at the left edge; node icons are simple vector shapes.

## STATUS: Act 3 part 2 (`c3p2`) -> `act3_part2_the_price_of_borrowing-3d.html` (77.9 s, 9 stations)
Path chosen per idea (rule: decide the best path, keep what works): S0 connection = last board of part 1 (partner now named COREWEAVE); S1 PAPER CHART bond price (rally Monday, dump on "dumped", record low, 75-77 cents); S2 BOARD bond paper -> interest-rate GAUGE (needle to nearly 18%); S3 PAPER BARS 18% vs 4% (safe US government loans); S4 3D lenders shouting at CoreWeave under NVIDIA's umbrella; S5 BOARD $5 billion fresh cash needed through 2027; S6 BOARD debt-heavy companies buying chips ("?" node); S7 BOARD $118 billion guarantees shield cracks as the partner's CASH gauge empties; S8 BOARD government -> inflation report -> borrowing-cost gauge up (hands off to Act 4). New board icons: gauge (needle keys), q, gov; node options needle, crack; labels wrap to two lines. Stills only; known weak: link labels still tight on 3-node rows; paper-chart tags small; the S4 speech bubbles are text.

## STATUS: Act 4 part 1 (`c4p1`) -> `act4_part1_the_promise_hit-3d.html` (41.7 s)
Built part by part with the toolbox (docs/JC_TOOLBOX.md): S0 connection (last board; the borrowing-cost needle swings DOWN on "three years"); S1 paper chart of interest rates falling with a dashed "would keep falling" projection + 3D bag drop + racks (cheap billions for giant data centers); S2 calendar sheet (NOVEMBER 25, WEDNESDAY 2026) + the PROMISE document that TEARS on "hit"; S3 METRIC TILES (thermometers fill, numbers count up: 3.8%, 3.3% + badge, 4.3% + badge); S4 Fed survey document + 3D shelf whose price tags climb on "climbing". New tools: `metricTiles`, `stepChart` options `proj` (dashed projection) and `col`. Stills only.

## STATUS: Act 5 part 1 (`c5p1`) -> `act5_part1_washington_questions-3d.html` (29.5 s)
S0 connection (December calendar + locked door + Jensen thinking); S1 3D Capitol, three lawmakers walk in and line up, question marks pop one by one; S2 board returns Jensen (3D walk-in, board cheers), then a "POLITICAL TROUBLE" paper: cloud fades + green check ("over"), then the check is struck out and the storm returns ("wrong"); S3 spinning clock + the announcement press release typing; S4 three committee leaders (FOREIGN AFFAIRS, INTELLIGENCE, CHINA) appear one by one behind desks, then the WARNING letter types ("has not answered our national security concerns"). Focus rule followed (one hero at a time). Stills only. Weak: committee leaders small; Capitol is a plain white model; S3 floor is empty around two small cards.

## STATUS: Act 5 part 2 (`c5p2`) -> `act5_part2_the_schedule-3d.html` (50.9 s, 7 stations)
S0 connection (committee desks + warning letter); S1 PLANNER paper built row by row (DEC 1 closed-door questioning / three House committees; DEC 2 NVIDIA's top lawyer; DEC 3 live-streamed hearing / Senate Banking Committee) with Jensen seated and reacting after each row; S2 board (U.S. export rules PROTECT America's AI lead); S3 board (NVIDIA -> ? -> CHINA "allegedly" -> MILITARY USE) with two lawmakers; S4 board (SEC reviews NVIDIA accounting, magnifier eye); S5 3D board members + "?" + arrow card JENSEN OUT -> JENSEN BACK + 11 DAYS tag; S6 paper chart of Monday's jump with investors walking away. New: icons door, live, case, flag, helmet; `plannerPaint`. Stills only.

## STATUS: Act 6 (`c6`) -> `act6_the_money_system-3d.html` (54.4 s, 6 stations)
S0 connection (Monday's-jump paper chart, investors walking away: "step back from the chart"); S1 3D NVIDIA lab + fab and a queue of buyers with money bags that grows one by one (demand still massive); S2 paper bars: SALES / PROFITS / TECH LEAD stand tall (STRONG); S3 board: what changed = the money system (lenders -> AI buyers -> NVIDIA), then investors + a rocket "nothing could slow it"; S4 three roadblock cards (~18% gauge, central bank DEC 8, congress SPOTLIGHT) each with a striped barrier that slams in on its words, Jensen reacting; S5 paper chart "priced for perfection": high plateau, a crack, then FAST SELLING with the investors panicking. New: icon rocket, node `bob`. Stills only.

## STATUS: Act 7 (`c7`) -> `act7_the_verdict-3d.html` (34.1 s) - and the FIRST COMPLETE SEQUENCE (13 clips, 11 pages)
All pages (tools\jc, build `python tools\jc\build_jc.py <id>`): c1p1 c1p2 c2p1 c2p2 c3p1 c3p2 c4p1 c4p2 c5p1 c5p2 c6 c7 -> `jensen back with crash\*.html` (12 pages; Act 1 parts are 2 pages, so 12 pages for 13 clips minus none: 1p1,1p2,2p1,2p2,3p1,3p2,4p1,4p2,5p1,5p2,6,7). Each opens on the last picture of the previous one. Act 7 mix: S1 3D location (Jensen walks in, engineers cheer, a green rally arrow rises, the tower of "what if" crumbles on "disaster"); S2 METAPHOR scene (ship in a storm, Jensen at the wheel, rain, lightning flashes, three dark clouds roll in each carrying an icon card: Dec 1 and 3 questioning, CoreWeave loan troubles, Dec 8 rate decision); S3 graph that forks into growth vs not + two walls slide in (money expensive, rules tighter). New helpers: waves, rain, stormCloud, ship, flash; build_jc now keeps "31.5" whole across a caption break. Stills only. Nothing has been played; audio sync, final export and the earlier-mentioned weak spots remain.

## RE-MIX: Act 3 (2026-11-26, after the mix rule)
Act 3 part 2: S5 ($5B cash need) and S7 ($118B guarantees at risk) changed from boards to 3D + moving assets: five big money bags are stacked one by one beside the CoreWeave tower with a "through 2027" calendar tag; a green umbrella (the guarantees) stands over the partner's lit racks and FOLDS on "short on cash" while rain starts to fall on the racks and the banker panics. The transactional boards (borrow/buy/loan/invest/loop) in Act 3 part 1 and S2, S6, S8 of part 2 stay boards because they were explicitly approved; the data parts stay paper. Stills only; the umbrella reads weakly (thin dome) and the last two tweaks were not re-rendered.

## SHORT: The 2027 AI Cash Crunch, rebuilt in the crash style (2026-11-26) -> `shorts2\short_2027_cash_crunch_v2.html` (9:16, 39.3 s)
Your original `short_2027_cash_crunch.html` is untouched. Source: `tools\jc\c27_scene.js`, `c27_keys.js`, `mk_c27.py`; build `python tools\jc\build_jc.py c27` (build_jc now supports `"portrait": true` through jb2's portrait conversion, and `out_dir`; camera distance needs `dmin 28 / dmax 52` in portrait). Audio `shorts2\audio\s2027.wav/.srt` (corrections applied). Word times: `set WT_DIR=shorts2/audio` then `python tools\jc\wt.py s2027 <words>`.
Stations (mix): S1 3D + HQ Elon: warned, money bags SQUEEZED by two walls ("crunch"), 2027 calendar tag; S2 paper card: chips = bottleneck, red cross on "backwards", crowd shrugs; S3 2D board: BIG TECH -> bag "TENS OF BILLIONS" -> GPU CLUSTERS lit; S4 3D race: courier brings a rack in WEEKS, power plant rises slowly, YEARS tag; S5 night 3D: dark racks, money pile burning bag by bag, "$0 REVENUE"; S6 3D pile of bags grows, HUNDREDS OF BILLIONS + WORKING CAPITAL tags, Elon points; loops back to S1. Stills only (portrait). Weak: the power plant is two grey cylinders and a crane; props small in the middle band; nothing played with audio.

## SHORT v2 revision (cash art + mobile sizes)
`short_2027_cash_crunch_v2.html`: cash is now 2D shaded art (stacks, bags, flying bills, flames) shown on cards, see JC_DEPICTION_MAP.md "CASH ART". S1 crunch = two steel plates squeeze the stack and bills burst out; S5 three stacks burn one after another with real flames; S6 stacks build a pyramid. Camera closer (28), characters larger. Stills only; S3 board text is still small and the power plant is rough.

## SHORT v2 final polish (2026-11-26)
Crane thicker and inside the card, plant rises slowly (19.1 -> 24.2 s, about half height when "years" is spoken) with 10 calendar ticks, 2D cards raised (y 8.2), steel plates wider, the cost-of-delay scene starts with a stack and two bags at 31.4 s so it is never empty, loop checked (first frame 0.3 s and last 39.2 s are the same picture: Elon with the cash pile). Whole-short contact sheet reviewed (14 frames). Still stills only: not played, audio sync unchecked.
