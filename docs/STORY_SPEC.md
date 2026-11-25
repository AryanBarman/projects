# STORY SPEC — a video is ONE data file (`tools\jb2\stories\<id>.story.json`)

No per-video JavaScript. `compile_story.py` turns the file into the build inputs, `story_rt.js` (inside the page) plays it, recipes live in `recipes_jb.js`. Reference example: `stories/s44c.story.json` (a 42 s short, 61 lines, rebuilt identically to the 130-line hand-coded version that is archived in `legacy/examples`).

## Top level
| key | meaning |
|---|---|
| `title`, `audio`, `dur`, `out` | page title, audio base name (`shorts2/audio/<audio>.wav` + `.srt`, captions come from the SRT), duration (default = SRT end + 0.2), output file name |
| `hook` | `{t:[from,to], text:"LINE ONE|LINE TWO", sub:"one line", accent:"coral"}` the only headline |
| `mood` | `[[t,"day"|"warm"|"tense"|"dusk"|"night"], ...]` |
| `keycol`, `fixes` | caption word colours (`"orbit":"cyanHi"`), spelling fixes |
| `tracks` | `{name: [[t, value], ...]}` eased values over time, usable in expressions (an object that travels with the camera) |
| `punch` | `[[t, fovKick, dollyKick, shake], ...]` zoom kick on impacts; `cues`: `[[t, sfxName, label], ...]` |
| `beats` | the ideas, in order (below) |
| `cam` | the camera: `[t, [lookX,lookY,lookZ], dist, yaw, pitch, fov, type?, leaveAt?, {roll}?]`, types `ease fly whip cut` (see MOTION_PLAYBOOK.md) |

## Beat
`{ name, t:[from,to], again:[from,to]?, space:[from,to]?, pad:[before,after]?, do:[...] }`
`again` = the same beat is shown a second time (a loop: first scene at the end); `space` = space mode on in that range (no ground, stars); active from `from - 0.4` to `to + 0.5` unless `pad`.
`do` entries are `["Recipe", arg, ...]` or `{ "do": ["Recipe", ...], "in": [from, to] }` (only between those times). Times are absolute seconds. A string starting with `=` is an expression using `t`, `t0`, `t1` (the beat range), track names, `lerp seg easeInOut easeOut easeIn hand Math` (e.g. `"=t<19.9?stackX:undefined"`, `"=lerp(6,8.6,seg(t,27.6,28.8))"`). `null` = default.

## Recipes (the `Recipe` names; args in order)
`SetBank x z` · `SetVault x z` · `SetCart x z [from n]` · `SetLock x z tSnap` · `SetLaunch cx z tUp0 tUp1 [stackX]` · `SetOrbit cx z [spin]` · `Station x y z [spin]` · `SetRepo x z [from]` · `Act role x z hW preset [from to {extra}]` · `Stack x z [n u y0]` · `Coins [x,y,z] [x,y,z] [n speed]` · `Dashed a b [n col lw]` · `DashedGrow a b n col lw t0 t1` · `RedX x y z size tAppear` · `Model name x y z size [{opts}]` · `Counter {x,y,w,h,text,sub,t0,t1}` · `Doc {x,y,tag,head,lines[],hl,hlWord,t0,t1}` · `Band "TEXT" t0 t1` · `Card x y z w h {opts}`.
Acting presets, roles, expressions, props: `docs\SCENE_MAP.md`. New recipe = a function in `recipes_jb.js` + one wrapper line in `Story.REG` (story_rt.js) + a mention here.

## Commands
`python new_short.py "<srt>" <id>` writes a first story file from the script (beats + camera + acting by keyword) and compiles it · `python check_short.py <id>` compiles, builds, checks, renders one contact sheet · `python compile_story.py <id>` compile only. Generated files (`<id>_scene.js`, `<id>_keys.js`, `cfg_<id>.json`) are never edited by hand.
## Checks (what the numbers mean)
`motivation.py`: camera moves tied to events; flags CUT/DEAD/LAND/FLY (the loop-return flight is an expected flag). `budget.py`: per beat, text items / actors / other recipes, counted over the whole beat (sequential items add up, so "over budget" is a prompt to look, not an error). `lint_colors.py`: colour pairs in code (stories use fixed palette colours).

## Added from the Stick3D pack review (2026-11-25)
- `["Room", kind, x?]` kinds: office, hallway, trading, stage, street (15-prop environment, `ROOMS` in recipes_jb.js). Place the camera x near the room x.
- `["Hold", model, x, y, z, [hx,hy], size?]` keeps a prop in a hand target; `["Throw", model, [x,y,z] from, [x,y,z] to, t0, t1, size, {h}]` arcs a prop.
- Act opts `{ armR:[hx,hy], armRK:1 }` / `armL` = IK hand to a target (character-space, units of body height). Reach is clamped to arm length; behind-body targets cross the torso. Safe targets: [0.3,0.55], [0.15,1.0].
- Props added to PROC: plant, lamp, chair, cooler, cabinet, bookshelf, frame, monitor, desk.
- Story top-level `"caption_style": "big"` = 1-2 words, 100 px, white with black stroke at y~69% (pack style). Default stays one-line boxed.
- Unverified: Hold hand mapping (`HandWorld` factor) vs the real hand position; moneybag looked low in s_kit.
