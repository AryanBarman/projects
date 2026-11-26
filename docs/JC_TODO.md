# JC TO-DO LIST: "Jensen back with crash" (12 pages, 7 acts) - what to fix, how, and where to look
Written 2026-11-26. Status of everything: built and checked on STILL FRAMES only. Nothing has been played with audio, and nothing has been exported. Priority: P1 = do before exporting, P2 = quality, P3 = nice to have.
Commands: build a page `python tools\jc\build_jc.py <id>` (ids: c1p1 c1p2 c2p1 c2p2 c3p1 c3p2 c4p1 c4p2 c5p1 c5p2 c6 c7). Stills: copy the built page from `jensen back with crash\` to `C:\Users\Aryan Barman\Projects\learning\myenv-test\pv_<id>.html`, then `set SCR=...\tools\jb2\_scratch` and `node tools\cdp.js pv_<id>.html t1,t2,t3 prefix` (see JC_TOOLBOX / RUNBOOK). Scene code: `tools\jc\<id>_scene.js`, camera: `<id>_keys.js`, config: `mk_<id>.py`, shared helpers: `tools\jc\assets_jb.js` (boards, charts, icons, couriers), card styles: `tools\jc\shim_env_jb.js`.

## P1 - before exporting
| # | To do | What to look for | How to fix | Reference |
|---|---|---|---|---|
| 1 | Play every page once in a browser with the voice | Voice loads (path `audio\Act N part M.wav`), starts with the picture, each trigger lands on its spoken word, nothing frozen | Open `jensen back with crash\<page>.html` (via the local server, see item 3). If the voice is late/early use the recorder field "video offset (ms)"; if one trigger is off, change its time in that part's scene (the comment at the top lists the word times) | `tools\jc\wt.py` prints word times: `python tools\jc\wt.py "Act 3 part 2" borrowing buying` |
| 2 | Make word timing exact (optional but best) | Estimated times are accurate to about 0.15 s (spread by character count inside each caption) | Install an aligner (`pip install faster-whisper`), then replace `words()` in `tools\jc\wt.py` to return real word times; re-read the times and update the trigger numbers in the scenes | `tools\jc\wt.py`; comments at the top of each `*_scene.js` |
| 3 | Test the final recorder (never run) | Title cards show, parts cross-fade, one `full_video.webm` downloads, audio continuous | Double-click `jensen back with crash\make_final_video.bat` (starts a local server on port 8765, opens `final_recorder.html`); use Chrome or Edge on a GPU machine, keep the tab in front. If a page times out, check the file name in the ACTS list | `jensen back with crash\final_recorder.html` (ACTS array), `join_final.bat` joins per-act files |
| 4 | Check the part-to-part opening frames | Each page opens on the last picture of the previous page; the recorder cross-fades between them | Render t = 0.3 of a page and t = last-0.3 of the previous one and compare; fix the "S0 connection" block at the top of the scene (copy the previous last picture) | S0 block in every `*_scene.js`; rule 4 in `JC_TOOLBOX.md` |
| 5 | Re-render frames changed after the last look | These edits were never re-rendered: Act 3 part 2 S5/S7 final layout, Act 4 part 1 tile labels, Act 4 part 2 CoreWeave label, Act 6 card spacing | Render the times named in each part's STATUS section in `JENSEN_CRASH_DESIGN.md` and fix anything cropped | STATUS sections in `docs\JENSEN_CRASH_DESIGN.md` |

## P2 - quality fixes by part (each is listed in that part's "weak" note)
| Part | Problem | Fix | Where |
|---|---|---|---|
| c1p1 / c1p2 | Characters low behind the caption bar; some tags crowd; part 2 end frame is a big card | Raise character z/y lanes (z 2.4-3.2), shrink the final doc card (`Card(... doc ...)` w/h) | `c1p1_scene.js`, `c1p2_scene.js` |
| c2p1 | Counter tags low-left of charts; sales/profit stamps tilt on wall | Move the counter `x,y` next to the chart; stamps are `pop(...)` calls | `c2p1_scene.js` |
| c2p2 | Last shot: partner tower cut on the right, UNPAID BILLS hides the stack | Move tower x/-z and the stamp; keep keys `[59,...]` | `c2p2_scene.js`, `c2p2_keys.js` |
| c3p1 | Link labels crowd boxes; presenter small at left; S1 backdrop is a plain park | Tune `lab` and `off` on links, widen nodes, enlarge presenter `hW`; use a room/set instead of the park (`'sets'` in `mk_c3p1.py`) | `c3p1_scene.js` board specs, `assets_jb.js` `boardDiagram` |
| c3p2 | Umbrella reads thin; money bags crowd; tags on the bond chart small; labels tight on 3-node boards; half-built board in some first/last frames | Make `umbrella()` canopy thicker (cylinder height 0.5 -> 1.2, add ring), space `itemBag` positions, raise tag font in `stepChart` tags, delay `t0` of nodes so a board never shows half-built at a cut | `assets_jb.js` (`umbrella`, `stepChart`), `c3p2_scene.js` |
| c4p1 | Fed survey doc partly behind the shelf; first frame shows the old clipped `PUSHES UP` | Move the doc left (`C - 7.6` -> `C - 9`), start the S0 board needle later | `c4p1_scene.js` |
| c4p2 | Star board arrows short, labels behind boxes; door is a flat rectangle; investors small | Increase board node spacing, give links `off`, replace `door()` with a taller prop or add frame; use `hW` 2.6 for traders | `c4p2_scene.js`, `assets_jb.js` |
| c5p1 | Committee leaders small behind desks; Capitol is a plain white model; empty floor in the clock station | Raise leaders `hW` to 3.0, scale the capitol (`capitol(x,z,s,u)` s 1.5 -> 2), add a second prop at the clock station | `c5p1_scene.js`, `assets_jb.js` `capitol` |
| c5p2 | MILITARY USE box on the paper edge; investors small; closing 3D shot plain | Adjust node `y` (0.17 / 0.84), larger investors, add a prop | `c5p2_scene.js` |
| c6 | Roadblock cards large; FAST SELLING tag clips; rocket label long | Narrow cards (`Card(... 7.6, 9.4 ...)`), shorten label to `SLOW IT`, move tag | `c6_scene.js` |
| c7 | Ship sail is a plain white panel, hull basic; end walls crowd the graph; night mood mild | Draw a sail with a second panel + flag in `ship()`; move walls to `C +- 15`; set mood `night` earlier and darker (`MOODS.night` in `shim_env_jb.js`) | `assets_jb.js` (`ship`), `c7_scene.js` |

## P2 - the mix (review: "a mix of all, not one template")
- Acts 1-3 are heavier on paper charts and boards than Acts 4-7. Act 3 part 2 was re-mixed (S5 money-bag stack, S7 umbrella and rain). Still to do: Act 1 part 2 S1 (11 days: use a falling-building scene or a calendar tearing page by page instead of the chart), Act 2 part 1 S1/S3 (bars -> a real tower of money halving), Act 2 part 2 S1 (bars -> investors weighing "chips" on a scale).
- How: use the families in `JC_TOOLBOX.md` (MIX RULE) and the helpers: `courier`, `item`, `rackRow`, `umbrella`, `ship`, `rain`, `stormCloud`, `barrier` (Act 6 scene), `miniTower`. Keep boards for transactions (approved) and paper for numbers.

## P3 - system and docs
| # | To do | How |
|---|---|---|
| 1 | Mark stale docs | Add "OUTDATED" to the top of `docs\JC_ACT1_STORYBOARD.md` (first jb2 attempt, rejected) and the jb2 story-file sections of `STORY_SPEC.md` / `SYSTEM_V2.md` as not used by the crash series |
| 2 | Reuse for the next series | Copy `tools\jc` (build, `assets_jb.js`, `shim_env_jb.js`, `charkit\`), the HQ characters build (`tools\jc\charkit\build_hq.py`), `join_audio.py`, `corrections.json`, the docs `JC_TOOLBOX / JC_DEPICTION_MAP / JC_MOTION_RULES` |
| 3 | HQ characters | Only jensen, elon, trader, fed, lawmaker have the new art. Facing of each pose is mirrored only for Jensen's point/thumbs/walk (`_flips` in `charkit\sprites_hq_meta.json`); check Elon, Fed chair, lawmaker poses before using them in more scenes. Elon and the Fed chair are used by few scenes |
| 4 | Free disk space | Claude's own temp folder was 12 GB (`AppData\Local\Temp\claude`); close Claude Code and empty it. `tools\cdp*.js` now delete old Chrome profiles themselves |
| 5 | Caption spelling | Corrections are in `tools\jc\corrections.json` (Huang, CoreWeave, NVIDIA, 31.5%, hyphens). Keep facts as narrated (you chose that). If a new wrong spelling appears in a caption, add a regex pair there and rebuild |
| 6 | `jb2` pages | `jensen back with crash\out\*` is the rejected first attempt; delete it when you are sure (it is only a reference) |

## Final export order
1. Fix P1 items 1-5. 2. Run `make_final_video.bat`, record, look at `full_video.webm` (or per-act files + `join_final.bat`). 3. Fix anything found with the table above, rebuild only the changed page, record again (the recorder can run one act with the From/To act fields).
