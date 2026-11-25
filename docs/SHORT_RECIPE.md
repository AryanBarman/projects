# SHORT RECIPE — make a 9:16 short cheaply (read this page and STORY_SPEC.md only)

A short is ONE data file: `tools\jb2\stories\<id>.story.json` (see `docs\STORY_SPEC.md`). Everything else is the shared engine, written once.

## The commands (run in `tools\jb2`)
1. `python new_short.py "<path>\My Script.srt" s_id --title "My Title"`  -> copies the srt + wav, cuts beats, maps phrases to recipes (`recipes_map.json`), writes `stories/s_id.story.json`, compiles it. It prints the beat list: read it, fix wrong matches.
2. Edit the story file: the `TODO` hook text and document lines, wrong recipes, camera keys, `cues`/`punch` on the real impacts.
3. `python check_short.py s_id`  -> compile + build + camera/text/colour checks + stills + ONE contact sheet (prints the path; open it with the Read tool). Stills at chosen times: `python check_short.py s_id 8.5,22.3`. No render: `--noshots`.
4. repeat 2-3. Output page: `shorts2\<out>.html` (open in Chrome: centred 9:16 column). Audio: `shorts2\audio\<audio>.wav`.

## Rules (the checks look at some of them)
- TEXT IS THE LAST RESORT: show ideas with people and props. Allowed text: the hook headline, up to 2 big numbers, one document. Captions are automatic (one ~22-character line, low on screen).
- A person per idea with an acting preset, face visible, a face close-up on emotional lines; expressions change with `ex` tracks (presets do it).
- Camera: a move every 2-4 s, one per beat, arrive before the beat's first asset, leave after the line ended; punches on impacts. Whip between ideas, orbit round a hero object, crane for vertical stories.
- The last asset of a beat travels with the camera (a `tracks` value) or is cleared before the flight. Stage: beat i at x = 14*i. Loop: `again` on the first beat + last camera key = first.
- A stamp or card placed over a document needs `nonudge` (the Doc/Counter recipes already set it).

## Adding something new (once, then free forever)
New prop: a function in `PROC` (`shim_env_jb.js`) or a GLB (`ASSETS_3D.md`) + a `Set...` helper in `recipes_jb.js` + a wrapper in `Story.REG` (`story_rt.js`) + a rule in `recipes_map.json` + one line in `STORY_SPEC.md` / `SCENE_MAP.md`. New feeling: an expression in `stickman.js` `EX` and a preset in `ACTING` (`recipes_jb.js`). Always leave the helper behind, not only prose.

## Where things are
Engine (written once): `shim_env_jb.js` (world, models, cards), `shim_cam_port.js` (camera), `stickman.js` (characters), `portrait_over.js` + `portrait_build.py` (9:16, captions), `recipes_jb.js` + `assets_jb.js` + `story_rt.js` (recipes, runtime), `build_jb.py`, `compile_story.py`. Tools: `new_short.py`, `check_short.py`, `motivation.py`, `budget.py`, `lint_colors.py`, `tools\cdp_p.js`, `tools\cdp_eval.js`. Archive (not used): `legacy\` (old acts, one-off patch scripts, hand-coded examples). Docs: MOTION_PLAYBOOK, SCENE_MAP, ASSETS_3D, STORY_SPEC, SYSTEM_V2.

## Known limits
Playback and audio sync are never checked by these tools (stills and numbers only); video export needs ffmpeg (not installed); script facts are not verified; the keyword map is crude (read the beat list).
