# SYSTEM V2 (`tools\jb2`) — the improved pipeline for the NEXT batch

Created 2026-11-25. Rule: **`tools\jb` and `jen_back\` are frozen** (the 15 parts are exported). New work happens only in `tools\jb2` and builds to `jen_back2\` (audio folder is a junction to `jen_back\audio`; `build_jb.py` in jb2 reads audio from `jen_back` and writes ONLY to `jen_back2`).

## What jb2 is
A copy of `tools\jb` (scene helpers, camera shim, env shim, checks) with these differences:
| change | where | status |
|---|---|---|
| Output folder `jen_back2\`, never `jen_back\` | `jb2\build_jb.py` | built, smoke-tested (a7 builds, SYNTAX_OK, `jen_back` file hash unchanged) |
| Text padding: label pills keep 0.5 x height each side; tag text clears the accent bar; stamps/counters keep inner padding | `jb2\shim_env_jb.js` (labelTex, Card) | edited, builds; **not yet looked at in a render** |
| Stamp ink guard: stamp text darkened until it reaches 4.5:1 on the cream (coral 3.8 to 4.84, sage 3.9 to 5.02, amber 2.2 to 4.91) | `inkOn()` in `jb2\shim_env_jb.js` | edited, builds; colours verified by calculation, **not yet looked at in a render** |
| `motivation.py`: static camera-motivation check | `jb2\motivation.py` | built; run on all 15 old parts (read-only) |
| `lint_colors.py`: static contrast lint of every bg/text pair in the scene sources | `jb2\lint_colors.py` | built; run on all 15 old parts (read-only) |

## How to use (new part)
1. Write the idea list first (see DIRECTION_GUIDE Part A rule 1): one line per beat, `idea | asset | landing second`.
2. Write `<id>_scene.js`, `<id>_keys.js`, `cfg_<id>.json` in `tools\jb2` (copy the pattern of an existing part).
3. `cd tools\jb2 ; python motivation.py <id> ; python lint_colors.py <id>` (instant, no rendering). Fix flags, rebuild.
4. `python build_jb.py <id>` -> `jen_back2\<out>.html`.
5. Render 12 stills with `tools\cdp.js` (copy the page next to the test folder first), look at greyscale and quarter size, run `fitcheck.js` for crops.

## What the new checks found on the 15 existing parts (read-only, nothing changed)
Camera (`python motivation.py all`): 104 flags. Hold share is 0 to 29 percent per part (target 40 to 60). Typical flags: 3 to 5 s `arc` orbits with no reason, push/pull that end 1 to 4 s away from any landing, and moves in seconds where no asset lands. Worst: a2p2 13, a7 13, a2p1 10, a3p2 10, a6p2 8.
Caveat: `a1p1` (2 keys) and `a1p2` (0 keys) use an older keys format, so they show 0 flags only because they could not be read. The "event" list is cues + the start times of cards/pills found by pattern, so a few flags may be false alarms; treat the list as a prompt to look, not proof.
Colour (`python lint_colors.py all`): 39 pairs below 4.5. Systematic: coral stamp text on cream (15 uses, 3.8), sage stamp text on cream (9 uses, 3.9), amber stamp text on cream (13 uses, 2.2). Also a few one-off pairs such as `#2C6C9A` on `#4C96C9` (1.8) in a2p2 and `#8A7B66` on `#D9C7A0` (2.5). The stamp ones are fixed in jb2 by the ink guard.

## Planned next (not built)
1. Camera key generator from the idea list (derive push/pull end times from the landing seconds; a `hold` by default), so keys are no longer hand-timed.
2. Pixel contrast check in `fitcheck.js` (sample behind each label) and a greyscale thumbnail export per key moment.
3. Character pass in `rigkit.js` copy: per-character blink/breath phase, eased pose blends, no teleport entrances, crowd variety (DIRECTION_GUIDE Part B).
4. Palette roles locked in one `PAL` file shared by all scenes; coral text on dark uses `#F09A92`.
5. Sound-effect synthesis for `cues` (ideas from the stickman-story-reels skill; none installed).
6. Frame-exact video export check (needs ffmpeg).

## Honest status
- No rendered frame of the jb2 changes has been viewed yet (earlier render attempts failed with "NOT READY"; one was cancelled by the user).
- Earlier today I edited the padding into `tools\jb\shim_env_jb.js` and rebuilt the 15 `jen_back` pages by mistake, before it was agreed that the exported series stays untouched. I reverted the four edits in the jb shim and rebuilt the 15 pages again. A string check shows the padding code is gone from them, but the original exported HTML files had already been overwritten by that first rebuild, so I cannot prove the pages are byte-identical to the ones used for the videos (the build is deterministic from the same sources, and the patches are all present, so they should be equivalent).

## Character / world prototype (jb2, 2026-11-25) — switch `PROTO` in `tools\jb2\shim_env_jb.js`
Built and rendered on Act 7 (frames 5, 13, 19.5, 34 s, before vs after, `PROTO` true/false; stills in the session scratch folder only). What it does:
- Props (Box/Cyl) get a dark inverted-hull outline instead of the thin edge lines, so the world is inked like the characters.
- Sprites: graded toward the set mood, a faint key light from the left (alpha 0.13), a soft shade at the feet, breathing with a per-character phase, an anticipation dip plus overshoot when the pose changes, a small lean when walking, and key cast up to 10 percent larger in wide shots only (distance 22 to 42 units).
Seen result: the outlines are clearly visible on blocks and chairs; the sprite changes are subtle (slightly bigger Jensen in wide shots, leaning walkers, slightly better grounded). It does NOT fix the main problems: characters are still small in wide shots, look pasted-on, and the same walker sprite repeats. The big gains need new art (walk cycle, 512 px+ heads, more poses; see the ideas list).
Not covered by the outline: trees (cones/spheres), buildings and other non-Box/Cyl meshes. Motion polish (dip, breathing, lean) is only visible in video, I only checked stills.
Mistakes found and fixed while testing: a 1.1x hero scale cropped Jensen's head more in the close-up (now wide shots only); a 0.30 key light washed out the jacket (now 0.13).
Problems seen in the frames that exist in the old parts too (candidates for the next checks):
- Tag pills are very thin (aspect about 9:1) so their text is tiny: "MARKET SELL-OFF", "EMPLOYEE REVOLT", "GEOPOLITICAL ASSET" are barely readable. Rule for new work: minimum pill height for the text size, aspect at most 6:1.
- The "HIS CHAIR" pill covers Jensen's head in the 19.5 s close-up. Rule: labels must not overlap a character's head box (add to fitcheck).
- Walker sprites at the back repeat the same figure.

## SCOPE RULE (user, 2026-11-25)
We do NOT design anything new or fix anything inside the acts (no new hero assets, no rebuilt scenes, no Act 7 rework). Only SHARED, mapped parts may be improved: shared code in `tools\jb2\shim_*.js`, the shared library `tools\jb2\assets_jb.js`, the checks, and the docs. Assets that live inside a single act's scene file (rocket, gate, balance scale, closing video screen) are out of scope.
- Shared fix done: tag pills are never thinner than 5.5:1 (`Card` in `shim_env_jb.js`), so text is readable. Rendered on a test build of Act 7 (13 s): "MARKET SELL-OFF" and "EMPLOYEE REVOLT" are now legible with padding. Output went to `jen_back2\` only.
- Weak shared asset left as is: `sat` (satellite, a box with panels). Not changed.
- The `hand()` / `outA()` helpers are available for NEW parts only.

---

# STICKMAN V2 (2026-11-25, user direction: stickmen, best possible, with physical assets: clothes, hair, eyes)
File: `tools\jb2\stickman.js` (self-contained, same call as `RigKit.draw`). Built into every jb2 page by `build_jb.py` (cfg `"stick": false` keeps the old sprite rig). Contact sheets: `tools\jb2\stick_demo.html` (copy it and `stickman.js` next to `cdp.js`'s test folder; `?sheet=roles|expr|poses|close`, edit the default in the file).

## What a character is
A fully drawn vector figure, no sprites, so it is sharp at any zoom (the old heads were about 55 px and went soft in close-ups). Every person has a TRAIT sheet in `T` (top of the file): skin, hair style and colour (swept, swoop, short, side, crop, wavy, baldsides, slick, none), eyes (brows, pupils that look around), glasses (rect/round), beard (full, stubble, mustache), clothes (jacket, suit with lapels and white cuffs, polo, hi-vis vest, hard hat), tie, belt, logo (NVIDIA, Tesla, trader), badge and lanyard. 18 roles: jensen elon trump vance cheung reed kress compliance board banker bondholder engineer factory supply journalist trader employee spacex, plus the old aliases (analyst host lawyer public cfo senator president vp staff official investor worker reporter student).
Physical assets: podium with the speaker's logo and microphone (pose `spr:podium` or `podium:1`), props paper/phone/laptop/mic/camera/case/folder/clipboard/gavel/flag/sign/coffee/tablet; `spr:document|tablet|call|laptop` add the matching prop automatically.
Crowds: generic roles (employee, spacex, supply, trader, engineer, journalist, banker, factory, student) draw skin, hair, glasses and shirt colour from `phase` (or `variant`), so extras never match (rule "no repeated sprite"). Overrides: `jacket`, `skin`, `hair`.
Life: blink every 3.6 to 5.8 s (own phase per character), breathing, pupils drift or follow `look:[x,y]` / `lookX`, head lags the body (follow-through), pose blends with an overshoot (`from`+`blend`), 8 expressions (neutral talk concerned think happy angry shock serious plus the old synonyms such as speaking, smiling, determined, surprised), mouth flaps while talking with breath pauses.
Pose names are the same as the old rig (idle talk point think cross cheer clap panic hold phone shrug present sit walk run wave); `spr:<name>` sprite names are mapped (explain to talk, podium to present, and so on). Walk and run switch to a side view.
Colours: one ink colour (`#0B191E`), flat fills, one soft shade side and one rim light, clothes from the series palette (60-30-10 rule); extras use a muted clothing set so the hero stays the highest-contrast figure.

## Verified (stills only)
- Contact sheets of all 18 roles, 8 expressions x 3 characters, all 16 poses, and a 3.2x close-up of five heroes: faces, hair, glasses, logos and clothes read clearly; hairline, eye size, glasses weight and stubble were tuned after the first render.
- Act 7 test build (`jen_back2` only) at 13, 19.5, 34, 37 and 50 s: Jensen with glasses, silver hair, NVIDIA mark and podium with microphone; Elon with Tesla mark. Props correctly hide them (depth-tested planes).
## NOT verified / known limits
- Motion (blink, breathing, head lag, pose blends) was never played; I only looked at stills. Stateless per frame: no smoothing of expression changes (they cut).
- Likeness is stylised by traits (hair, glasses, beard, clothes), not faces. The 8 main characters are recognisable by those traits only.
- Views: front and side only (no back view). `sit` has no chair, the scene must supply one. Hands are simple mitts. Hero scale/min size logic still lives in `castToScene`.
- Only Act 7 was built with it, and only as a test in `jen_back2`. Performance over a full video was not measured (about 1 to 2 ms per figure in the stills).

# COLOUR FIX FOUND WHILE TESTING (shared code, jb2 only)
The page sets `renderer.outputEncoding = sRGBEncoding`, but the canvas textures (label/card pills, character planes) were never flagged as sRGB, so every authored 2D colour was brightened on output: `#0B1A22` rendered as slate (about 60,85,100) and black jackets as mid-grey. This is very likely the cause of the repeated "pale / dull" complaints. Fix in `tools\jb2\shim_env_jb.js`: `encoding = THREE.sRGBEncoding` on the label, card and character textures. Result: pills and counters now render as dark as authored, characters have true blacks. Not changed: lit 3D materials (floors, props, sky), which were tuned over many passes with the lift in place; re-tuning them without the lift is a separate job. The old `jen_back` pages still have the lift (frozen).

# RULES STILL IN FORCE FOR THE NEXT BATCH
Clean flow (Part D), camera motivation (Part A), colour roles and contrast (Part C), character rules (Part B), and the scope rule: acts are frozen; only shared code, the shared library and docs change. Run before building a part: `python motivation.py <id>`, `python budget.py <id>`, `python lint_colors.py <id>`.

---

# SHORTS IN JB2 (2026-11-25): first short "The $44B Space Repo Loophole" (9:16, 1080x1920)
Output: `shorts2\short44_space_repo_loophole-3d.html` (audio `shorts2\audio\short44.wav`, a COPY of `shorts\The $44B Space Repo Loophole.wav`; originals in `shorts\` untouched). Sources: `tools\jb2\s44_scene.js`, `s44_keys.js`, `mk_s44.py` (writes `cfg_s44.json`), build with `python build_jb.py s44`. Duration 42.2 s.

## Portrait mode (new, shared, reusable for every later short)
- `cfg "portrait": true` in `build_jb.py` -> `portrait_build.py` rewrites every size-dependent constant of the page for 1080x1920 (canvases, renderer, camera aspect and fov 50, projection, pixels-per-unit, smear, vignette, grain, recorder, framing guard, label auto-layout zones). Every replacement is asserted (21 of them), so a missing pattern stops the build instead of silently leaving a landscape number.
- `shim_cam_port.js`: a literal-key camera (no cycling or random angles). `K(t, look, dist, yaw, pitch, fov, type, leaveAt)`: the camera ARRIVES at t. `fly` leaves at `leaveAt` (so the previous idea is held until its line ends), `ease` glides across the whole segment (push, pull, crane). Tiny living drift only.
- `portrait_over.js`: headline at y 232-390 (two lines with `|`), captions 64 px bold, box ends at y 1440, no progress rail. Safe zones: top ~200 px, bottom ~450 px, right ~150 px are platform UI; scene labels are kept in y 470-1230 by the label layout.
- cfg options `audio_dir` and `out_dir` let a build read audio from, and write to, any folder (here `shorts2`).
- Rendering stills of a portrait page: use `tools\cdp_p.js` (not `cdp.js`, which stretches it).
- Vertical budget used for composition: headline 232-390 px, scene band about 400-1200 px, captions 1224-1440 px; at camera distance 20 one world unit is about 103 px, so one beat must fit in about 7.5 world units. Three-line captions shrink the band to about 400-1140.

## How the short applies the new rules
- One continuous stage, ideas laid out left to right 14 units apart (A loan, B lenders and collateral, C orbit and the repo truck, D the legal clause). One camera flight between ideas, held until the previous line ended.
- Clean flow: `clean` mode on (no walkers, particles, tree clutter), at most 3 labels visible at once, headline per idea.
- Handoff, not a cut: the GPU stack travels with the camera from the loan idea to the lenders idea (5.3-6.4 s) and on to the launch pad (16.3-17.3 s), rides the rocket, and ends up as the orbiting data center. It is the one object that carries the story.
- Vertical-native moves: the camera cranes up with the rocket and back down, then pulls out to show the 340 miles between the truck and the orbit (the distance is the idea).
- Structure from SHORTS_GUIDE: hook headline at 0 s, re-hook band "THE TERRIFYING LOOPHOLE" at 21.9 s (the real turn, 52 percent), payoff in the last line. NO end card: the script ends mid-sentence ("lends Elon Musk $44 billion to buy...") straight into its own first line, so the last frame is the first frame (loop). Final flight returns to the opening shot at 41.98 s.
- Stickman v2 characters (banker, Elon, bondholder), stamp ink guard, sRGB texture fix and padding rules all apply.
- Colour: lint shows 0 pairs below 4.5. Numbers are never scrambled (a first render showed "$87 BILLION" on frame one; scramble removed for both counters).

## Checks run
`motivation.py s44`: 1 flag, the loop-return flight 40.0-42.0 (expected, it is not a station change). An earlier run caught the "?" stamp landing at 30.9 s inside the C to D flight; timing fixed (flight now 30.0-30.8, stamp at 31.0). `budget.py s44`: blocks B and C are over only as static counts because each holds several sequenced ideas; never more than 3 labels are on screen together. `lint_colors.py s44`: 0. The motivation and budget checks now also read the portrait key format and the `// ===== A (` block comments.

## NOT verified
- Playback: only still frames at 20 or so moments were viewed (also the transitions and the loop seam). Motion, easing and the character animation were never watched. Audio sync was not checked against the picture (the line timings come from the SRT, picture events are placed on those times by hand).
- No video file exists: `tools\export_video.js` needs ffmpeg (`winget install Gyan.FFmpeg`), not installed.
- Facts come from the script only: "$44 billion", Apollo and Goldman Sachs as lenders, Vera Rubin GPUs as collateral, "340 miles", the existence of a legal clause. Not checked with web search for this short.
- No phone check of the safe zones (platform UI sizes change).
- The script ends mid-sentence in the SRT; the loop design depends on that being intended. If it is only a truncated file, an end card should be added.
- Limits seen in stills: characters are small (about 300 px tall) in the band; during the pull-out for the 340 miles the truck is tiny by design; the rocket bottom is partly under the caption box during the launch.

## Portrait wrapper fix (2026-11-25, after the user saw the short in a browser)
The page wrapper CSS (`#wrap`) was still 16:9, so the 9:16 canvas was squeezed into a wide box. `portrait_build.py` now also rewrites the wrapper to `width: min(100vw, 100vh*9/16)` and `height: min(100vh, 100vw*16/9)` (asserted), so a portrait page is a centred 9:16 column on desktop and fills a phone screen. Checked with a normal 1920x1080 browser screenshot (a 608x1080 column); not tried on a real phone. Lesson: always look at the page in a normal browser window, not only at canvas captures (`cdp_p.js`).
Also found in that view: the banker was cut off by the left frame edge in the push-in at 13.5 s (moved inward), and plaza lamp posts stood in the shot; clean mode now skips them (`__CLEAN__` in the plaza set of `shim_env_jb.js`).

---

## Short v2 (2026-11-25): camera, acting, expressions, 3D assets (after "camera and character movements are low, expressions are missing")
Read `docs\MOTION_PLAYBOOK.md` (camera grammar, expressions, acting, research and what was converted from skills) and `docs\ASSETS_3D.md` (free models, how to add them).
What changed in the shared system (`tools\jb2`, new work only):
- Camera: `shim_cam_port.js` v2 (orbit-space interpolation, `whip`, dutch roll, punch-in zoom plus shake from cfg `punch`, automatic drift). The old framing guard is OFF in portrait (cfg `guard`).
- Characters: `stickman.js` has 17 expressions with face effects (sweat, vein, tears, shock lines), expression tracks `ex` that blend with overshoot, impact recoil `hit`, expression-driven tremble and bounce, weight shift, emphasis gestures, wandering arms.
- 3D: `Model()` API, GLB loader and embedding (`cfg.models`), a procedural rocket, starfield for space beats, readiness gating. Downloaded the CC0 Quaternius Ultimate Space Kit to `assets3d\`.
- Shared fixes found on the way: `easeIn` helper (assets_jb.js), `nonudge` flag on cards (a stamp placed on a document is exempt from the label auto-layout), a `params` name clash, `tools\cdp_eval.js` (evaluate JS inside a loaded page: camera speed, character pixel motion), `motivation.py` reads the new key format and `whip`.
The short (`shorts2\short44_space_repo_loophole-3d.html`, rebuilt) now has: face close-ups with changing expressions (smirk to proud, concerned to panic with sweat, shock, scared), whip pans A to B and orbit to ground, a low-angle rocket launch that the camera follows into orbit, an orbit with Earth, stars and a station built from CC0 parts plus the GPU stack that travelled with the camera, a rover as the repo truck, the 340-mile crane, an orbit round the collateral, punches on 8 impacts.
Checks: `motivation.py s44` 1 flag (the loop-return flight, intended); colour lint 0; camera measured in motion for 38 of 42 s.
NOT verified: nothing has been played (all stills, plus numbers computed from the camera function and from drawing the character offscreen); audio sync not checked; no video file (ffmpeg missing); the facts in the script are unverified; the rover is a lunar rover used as a truck; calm held poses still move slowly; the per-frame motion measure for them stayed under 1 percent.

## Short v3 (2026-11-25) and the token lesson
User feedback on v2: too many text cards (clutter), use people in different setups (a bank to zoom into, a person who loves money), captions multi-line and too high, and the job cost too many tokens. Done in v3 (`shorts2\short44_space_repo_loophole-v3.html`, files `s44b_*`): about 4 text items in 42 s (was about 20): the hook headline, the $44B counter, the 340-miles counter, one document; people carry the story (greedy banker with dollar-sign eyes in a bank and vault, Elon pushing a trolley of GPUs, panic, three alarmed bondholders with "!", a repo man, a thinking banker with "?"); new built props (bank, vault, money bags, padlock, trolley, gold bars); captions are one ~22-character line at a time, box bottom at y 1470; motion blur only on real whips; richer bank colours.
To make the next short cheap: `docs\SHORT_RECIPE.md` (5 commands), `docs\SCENE_MAP.md` (phrase -> setup -> acting -> camera), `tools\jb2\new_short.py` (SRT -> skeleton, tested on a second script: builds with 0 camera flags and renders a character-led skeleton), `tools\jb2\check_short.py` (build + checks + one contact sheet), `recipes_jb.js` (Act presets and Set* setups), `recipes_map.json` (the mapping data). Rule for every future task: after finishing, add what was learnt to these helpers/maps, not only to prose.
Not verified (unchanged): nothing was played, audio sync unchecked, no video file, script facts unverified; the scaffold map is keyword-based and crude.

## Story files (2026-11-25): a video is data
After the user worried about writing thousands of lines: the reusable engine is about 1,700 lines written once; the hand-coded short v3 was 129 lines of per-video JS. Now a video is ONE JSON file (`tools\jb2\stories\<id>.story.json`, 61 lines for the 42 s short, no JavaScript) played by `story_rt.js` and compiled by `compile_story.py`; `new_short.py` writes a first story file from an SRT; `check_short.py` compiles, builds, checks and renders one contact sheet. Old acts, one-off patch scripts and hand-coded examples moved to `tools\jb2\legacy\` (99 files); the working folder is 36 items. See `docs\STORY_SPEC.md` and `docs\SHORT_RECIPE.md`. Verified: the ported short renders the same as the hand-coded one (contact sheet), the checks give the same flags (only the intended loop-return), and the scaffold built a second script it had never seen with 0 camera flags.

## Stick3D adoption (2026-11-25)
Adopted: room kits, IK hands, Hold/Throw, big-caption option, mp4+SFX pipeline (make_video.py, not run). Not adopted: per-video TSX, 3-ideas ritual, Remotion. Still open: word-level timing, room keyword rules in recipes_map.json, Hold mapping check. See STICK3D_PACK_REVIEW.md, VIDEO_EXPORT.md.

## Night fix + colour grade (2026-11-26)
- Night bug root cause: `groundPoly` cached by points only, so a floor first drawn during the 1.4 s mood fade kept its day colour. Colour is now in the cache key (shim_env_jb.js). Night sky tint darkened; rooms follow the mood (`SetRoom` tints hex colours by `moodAt`).
- Colour grade (portrait): `drawRail` in portrait_over.js now draws vignette (stronger at night), darker bottom for captions, faint warm top key. Automatic for every portrait short; no story data needed. Debug: `window.__moodAt(t)`.
- `budget.py` story mode: fails > 3 text cards per short or a beat with no character.
- Affects jb2 pages only (jb/jen_back untouched). Re-check old jb2 shorts (short44) if you rebuild them: their night/dusk will now be darker.
