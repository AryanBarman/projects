# HANDOFF — Jensen / Elon explainer videos (read this first in a new session)

Full documentation is in `docs\`: `README.md` (index), `RUNBOOK.md` (step-by-step commands and new-device setup), `LEARNINGS.md` (rules, mistakes, costs), `SHORTS_GUIDE.md` (shorts design and mobile rules). Read those after this file.

Working folder: `C:\Users\Aryan Barman\personal\new_projects\projects\` (call it `P`). Method notes from earlier work live in `C:\Users\Aryan Barman\Projects\learning\improvement.txt`; the storyboard method is in `P\storyboard.txt`.


## 0. NEWEST WORK (2026-11-25): the `jen_back` series
A second 15-part series (Jensen's comeback, Acts 1-7) was built after this file was written. Everything about it is in `docs\JEN_BACK_STATUS.md` (parts, what is correct, what needs fixing, how to continue), with commands in `docs\RUNBOOK.md` sections 9 to 9h. Files: `jen_back\*.html`, `jen_backudio\`, sources in `tools\jb\`. Never run: playback, audio sync, video export, shorts for this series.

## 1. What this project is
Animated explainers (HTML canvas + Three.js, stickman sprites, voice-over WAV + SRT). 7 acts, 25 parts. Goal: a long 16:9 video (about 19:50) and several 9:16 shorts. Originals are never edited; every improvement is a new file.

## 2. Folder map (all in P)
- `audio\` — `Act N part M.wav/.srt` (Acts 1-5 per part, Act 6 and 7 are also joined as `Act 6 all.*`, `Act 7 all.*`). SRT is the only timing source.
- `characters\` and `characters\sprites\` — user's stickman sheets and cut sprites (embedded into each HTML as data URIs).
- Versions of each part (pick the newest for each):
  - Acts 1, 2, 4: `*-v2.html` (originals `*-hybrid.html`, `*_offline.html` untouched).
  - Acts 3, 5, 6, 7: `*-v2.html` (2D canvas engine) and `*-3d.html` (real Three.js, rounded boxes, sky/clouds/skyline environment). Use `-3d` for the final video. Act 6 and Act 7 are single files each (parts joined).
  - `act5_part1_financial_web-threejs-trial.html` = early trial, superseded by `-3d`.
- `*-short.html` — portrait 1080x1920 builds (see section 5).
- `newsomething.html` — user's Three.js template with RoundedBoxGeometry and a `KIT` asset library. The `-3d` files are built from it.
- `master.html` — recorder for the long video. `shorts.html` — recorder for shorts. `join_acts.py` / `.bat` — ffmpeg joiner.
- `tools\` — all build scripts, scene sources and configs (copied here so they survive). `tools\scenes\` = per-part scene/camera JS. `tools\configs\` = per-part JSON (captions fixes, ledger, cues, rail).

## 3. Engines (important, the files are NOT one family)
1. Acts 1-2: Three.js hybrid template (CAM_KEYS Hermite camera, `drawCast` sprites).
2. Act 4: custom canvas software 3D renderer (`T3`), separate builders were written per file (scripts not kept in tools).
3. Acts 3 (all), 5, 6, 7 `-v2`: 2D canvas 3D (Cam3D projection). Built by `tools\patch_a3gen.py` from a config + `scenes\*_scene.js` (+ `*_keys.js`).
4. `-3d` files: `tools\build3.py` takes each `-v2` scene source and runs it on the Three.js template through a shim (`shim_cam.js` framing + station mapping, `shim_env.js` environment and the Box/Cyl/Label/Panel/Char API drawn as real 3D).

## 4. Pipelines (all scripts hardcode paths; in a new session set `SC` / scratchpad references to `P\tools\`)
- Build a 2D part: `python run_a3.py cfg_<part>.json <prefix> t1,t2,... [norebuild]` (builds, syntax checks, renders stills with `cdp.js`, makes 2x2 sheets; needs env `SCR` = folder for PNGs).
- Build 3D: `python render3.py <a3p1|a3p2|a3p3|a3p4|a5p1|a5p2|a5p3|a6|a7> <prefix> t1,t2,...` (uses `build3.py` FILES table: station maps and camera distance limits per part).
- Add camera layer + brighter palette to a `-v2`: `postfx.py` (already applied to Acts 3,5,6,7 v2).
- Stills harness `cdp.js`: needs `SCR` env var, loads a file from `myenv-test\` over file://. Copy the HTML into `Projects\learning\myenv-test\pv_*.html` first, delete after. `cdp_p.js` does the same for portrait canvases.
- Sprites: `patch_sprites.py <file>` embeds sprite data and routes `drawCast` through `drawSpriteChar`.

## 5. Shorts (9:16)
- `tools\build_short.py` turns a `-3d` (or the Act 1 v2) file into a true portrait file: 1080x1920 canvases, portrait camera (min distance `DPORT = 31`, fov 50), larger signs, portrait headline/captions/progress overrides from `portrait_over.js`. `tools\mk_all.py` rebuilds all six `-short.html` files.
- `shorts.html` records them. Each short has: hook card at 0-3 s, a mid "re-hook" band at a chosen source time, the voice-over picks (editable JSON in the page), and a 3.2 s end card with a question + CTA. Picks: Act 1 p1 (offer), Act 5 p1 ($44B loan), Act 5 p2 (legal wall), Act 6 (three wins), Act 7 (moat), Act 3 p1 (sealed court filings).
- STATUS: UNTESTED recorder. Portrait rendering and camera were checked with stills only. Known issues: some beats have empty floor/sky and the subject small; hook/re-hook/end-card positions were set by guess; Act 1 short is dark with tiny characters. NEXT STEP: a per-beat framing pass on the six picked sections (one hero object per beat, closer, focus on it), then watch the shorts in a real browser and fix text positions. Also consider shorts that are self-contained arcs written for the short (own SRT-based mini script) instead of cutting existing parts.

## 5b. Mobile status (honest)
Shorts are native 1080x1920 with large captions, but NOT yet tuned for platform UI safe zones (captions end near y=1640, inside the area apps cover; headline near the top icons), in-scene labels are small, and some beats have empty floor. The long video is 16:9 and not restructured for phones. To-do list: `docs/SHORTS_GUIDE.md` section 5 (do step 1 first: move captions/headline into safe zones).

## 6. Recording the long video
Copy P (with `audio`) to a machine with GPU + internet. In P run `python -m http.server 8765`, open `http://localhost:8765/master.html`. Options: one file per act (`act1.webm`..), "also save full joined video", video offset (ms). A 2.4 s act title card plus fades are drawn by the page; inaudible noise keeps the audio track continuous (fixes the earlier title-card audio shift). Join act files with `python join_acts.py [--fix-cards] [--av=+/-ms] [--mp4]` (`--fix-cards` only for files recorded BEFORE the noise fix). Planned timeline: total about 19:52; act starts 0:00, 2:01, 5:16, 8:56, 12:27, 15:51, 18:20.
- STATUS: `master.html` and `join_acts.py` were never run by the assistant (no ffmpeg, and starting a local web server in the sandbox was denied). The user saw a small audio offset before the title-card fix. Test one act first.

## 7. Known issues / open items
- All `-3d` files and `master.html` are lightly checked (stills only; no live playback, audio sync, or GPU performance test).
- `-3d` look: pale ground, some pastel props wash out, translucent objects nearly invisible (Act 3 part 4), camera keys not hand-tuned per beat except the Act 5 part 1 trial.
- Whisper slips fixed in captions: Wong/Hwang->Huang, Vero->Vera, Starmine->Star Mind, Terafab->TerraFab, Dealbook->DealBook, "star shield"->Starshield. One unresolved: Act 5 part 3 "personal contact" may be "personal conduct".
- Foley/sfx cues from each page's CUE_SHEET are not recorded (voice only).
- Three.js files load from unpkg.com (internet needed).
- Act 2 and Act 4 have no portrait/short version yet.

## 8. How the user wants the assistant to work (important)
- Keep the process lean: SRT-only timing, no WAV analysis, embed sprites once, 1-2 render rounds, few tool calls. Plan on paper (beats, assets, camera table) BEFORE writing code (`storyboard.txt`).
- Never overwrite originals; write new files. Report honestly what was NOT verified (live playback, audio sync, GPU speed).
- Prefer showing ideas through 3D assets over talking characters; camera must be a continuous flight with depth moves, never only sideways; signs must be fully readable and never cropped; keep brightness up.
- The user has ffmpeg on another device and will convert/join there; they asked for joined output scripts, not an editor workflow.
- Shorts must be complete in themselves: hook, mid re-hook, payoff, CTA; made natively for 9:16, not cut-down wide video.

## 9. Gotchas
- Shell heredocs/one-liners mangle `\n`, `\\` and quotes inside JS/Python strings. Write files with the Write/Edit tool (use `chr(10)` for newlines in Python edits).
- Starting a background local server from the sandbox was denied by the permission classifier. Do not retry or work around it; ask the user to run `python -m http.server 8765` themselves.
- Headless Chrome (SwiftShader) is slow: render about 10-16 stills per round in the background with long timeouts.
- `patch_sprites.py` fails harmlessly if sprites are already embedded.
