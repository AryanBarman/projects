# RUNBOOK — how to do each task

`P` = the projects folder (contains `audio\`, `characters\`, `tools\`, `master.html`, `shorts.html`). `T` = `P\tools`. Commands are for Windows with Git Bash or PowerShell; Python 3.12, Node 22, Chrome installed.

## 0. Setting up on a new device / new session
1. Copy the whole `P` folder (with `audio\` and `characters\`). The HTML files embed the sprites, so they run alone, but the audio is loaded from `audio\`.
2. Tools hardcode three paths. Replace them once with this Python snippet (edit the three NEW values):
```python
import pathlib
OLD = {'C:/Users/Aryan Barman/personal/new_projects/projects/': 'NEW_P/',
       'C:/Users/ARYANB~1/AppData/Local/Temp/claude/6f15eacba9bd00b7/d07cfa11-dd41-4120-a57e-d60d4324f744/scratchpad/': 'NEW_T/',
       'C:/Users/Aryan Barman/Projects/learning/myenv-test/': 'NEW_TESTDIR/'}
for f in pathlib.Path('NEW_T').rglob('*'):
    if f.suffix in ('.py', '.js') :
        s = f.read_text(encoding='utf8'); 
        for a, b in OLD.items(): s = s.replace(a, b)
        f.write_text(s, encoding='utf8')
```
   `NEW_TESTDIR` is any folder Chrome can open files from (a folder named `myenv-test`); the stills harness copies a page there as `pv_*.html`.
3. Chrome path in `cdp.js` / `cdp_p.js`: `C:/Program Files/Google/Chrome/Application/chrome.exe`. Change it if different.
4. Environment variable `SCR` must point to the folder where stills are written (use `T`). In Git Bash: `export SCR="$PWD"` from `T`.
5. The 3D files load Three.js r128 + RoundedBoxGeometry from unpkg.com, so internet is needed to view or render them.

## 1. Rebuild a 2D (canvas) part (Acts 3, 5, 6, 7 `-v2.html`)
Inputs: `T\configs\cfg_<part>.json` (captions fixes, ledger, cue sheet, rail starts, keyword colours, audio name), `T\scenes\<part>_scene.js` (the storyboard: HEADS + `renderShots`), `T\scenes\<part>_keys.js` or `_world.js` (camera keys).
```
cd T ; export SCR="$PWD"
python patch_a3gen.py configs/cfg_a5p2.json          # writes the -v2 file next to the audio folder
python patch_sprites.py "P/act5_part2_legal_wall-v2.html"   # only if sprites are not already embedded
python postfx.py "P/act5_part2_legal_wall-v2.html" "[0,12.87,27.43,49.09,66.95,81.28]"   # camera push/arc layer + brighter palette (once)
python run_a3.py configs/cfg_a5p2.json s2 3,16,30,60 norebuild   # renders stills + 2x2 sheets s2_sheetN.png
```
Captions are read from `audio\<name>.srt` by `patch_a3gen.py`. Timing = SRT only.

## 2. Make the real-3D version (`-3d.html`)
```
python render3.py a5p2 s2 3,9,16,22,35,43,52,62      # builds act5_part2_legal_wall-3d.html, syntax-checks, renders stills
```
Names: `a3p1 a3p2 a3p3 a3p4 a5p1 a5p2 a5p3 a6 a7`. Per-part settings (station x-bounds -> depth slots, min/max camera distance) are in the `FILES` table in `build3.py`. Station mapping: scene code lays stations along x; the shim moves each station to its own z slot (30 units apart) so the camera flies forward.
What the shim does: `Box/Cyl` become rounded lit 3D boxes with edge lines; `Label/Panel` become camera-facing planes; `Char` goes through the sprite system; `groundPoly/groundPath/Line3` become flat meshes/bars; the environment (sky dome, sun, clouds, skyline, hills, ground) follows the camera.
Framing guard in every `-3d` file: each camera key keeps its focus, gets a safe distance (`DMIN..DMAX`), sideways angle capped (~18 degrees, `YAWMAX`), pitch 0.12-0.30, fov 38-52; any object within 9 units of the camera is hidden.

## 3. Render stills to check a file
```
cp "P/file.html" "TESTDIR/pv_x.html" ; export SCR="$PWD" ; node cdp.js pv_x.html 3,10,20 prefix     # landscape
node cdp_p.js pv_x.html 3,10,20 prefix                                                            # portrait (composites both canvases to 1080x1920)
```
Then montage with PIL (4 per sheet) and look. Headless SwiftShader is slow (about 1 s per frame, up to minutes per file load): run in the background with long timeouts, 10-16 frames per round, 2 rounds normally enough. Delete `pv_x.html` afterwards.

## 4. Check syntax of any HTML quickly
Extract the largest `<script>` body and run `node --check` (the build scripts already do this: they print `SYNTAX_OK`).

## 5. Record the long video (needs a GPU machine, Chrome/Edge, internet)
1. In `P`: `python -m http.server 8765`
2. Open `http://localhost:8765/master.html`. Options: from/to act, one file per act, "also save the full joined video", record on/off, hear audio, video offset (ms).
3. Buttons: green "Export ALL 7 acts as ONE video" (single `full_video`/`acts_*` file) or Start with options (per-act `act1.webm`..`act7.webm` plus `full_video.webm` if ticked). Keep the tab in the foreground. About 20 minutes real time.
4. Order and files per act are in the `ACTS` array at the top of the script in `master.html` (Acts 1,2,4 use `-v2`; Acts 3,5,6,7 use `-3d`).
5. Join per-act files: `python join_acts.py [--fix-cards] [--av=+120] [--mp4]` in the folder with the downloads. `--fix-cards` ONLY for files recorded before the audio keep-alive fix. `--av` shifts audio vs video by ms without re-encoding. ffmpeg must be on PATH.
Timeline of the full video (default settings): Act 1 0:00, Act 2 2:01, Act 3 5:16, Act 4 8:56, Act 5 12:27, Act 6 15:51, Act 7 18:20, total about 19:52 (2.4 s title card per act, 0.35 s tail per part, 0.5 s fade). With the "ALL as ONE" button each act from 2 on starts 0.5 s later.

## 6. Make the shorts (vertical 9:16)
```
cd T ; python mk_all.py                  # rebuilds the six *-short.html portrait files (uses build_short.py)
python build_short.py act5_part2_legal_wall-3d.html act5_part2_legal_wall-short.html   # one file
```
Record: serve `P`, open `http://localhost:8765/shorts.html`, press "Record all shorts below". The picks are an editable JSON in the page: `id, hook, tag, col, rehook{seg,t,text,sub}, cta{q,line}, segs[{file,from,to}]` (`from/to` are seconds of that file's own timeline; combined Act 6 and Act 7 files use the combined timeline). Each short downloads as its own WebM. Design rules: see `SHORTS_GUIDE.md`.

## 7. Add a brand-new part from an SRT (cheapest path, about 20 tool calls)
1. Read `audio\<part>.srt`; apply `../storyboard.txt` steps 1-7 on paper (beats, stations, assets with trigger words, camera keys, cast).
2. Write `<part>_keys.js` (camera `K(t,[pos],[look],fov[,cut])` lines) and `<part>_scene.js` (HEADS + `renderShots` using `Box/Cyl/Label/Panel/Char/groundPoly/groundPath/Line3`, `hit(...)`, `eBack`, `seg`). Copy a finished scene from `T\scenes\` as a template; keep the `beginFrame/endFrame`-compatible skeleton lines (the first `const cv = evalCam(t); Cam3D.set(...)` block and the final `drawBG/GROUND/ITEMS/OVER/HEADS` block are replaced by the 3D build via regex, so keep those exact shapes).
3. Add `cfg_<part>.json` (copy and edit `cfg_a5p2.json`).
4. Build 2D (section 1), add to `build3.py` FILES (section 2), render stills, fix, add to `master.html` ACTS.
Combine parts of the same act into one file when the user asks (Acts 6 and 7 did): join the WAVs and SRTs into `audio\Act N all.wav/.srt` with the Python snippet pattern used earlier (offset each SRT by the previous WAV duration).

## 8. Smooth, frame-exact video export (no lag, no dropped frames) — preferred over section 5 real-time recording
`tools\export_video.js` renders `window.render(t)` for every frame at a fixed fps (default 30) and pipes the frames into ffmpeg (x264, yuv420p, faststart), then muxes the part's WAV. Output is CFR, so motion is even and A/V sync is exact whatever the machine speed. Works on every page that has the `?capture=1` / `window.render` / `window.READY` hooks.
```
winget install Gyan.FFmpeg          # once; then reopen the terminal so ffmpeg is on PATH
cd T
node export_video.js "P/act1_part1.html" "P/out/act1_part1.mp4" --dur 22.9 --wav "P/jen_back/audio/Act 1 part 1.wav" --workers 3
node export_video.js "P/x-short.html" out.mp4 --dur 45 --w 1080 --h 1920 --workers 3 --wav voice.wav     # portrait short
```
Options: `--fps 60` smoother, `--crf 16` higher quality, `--workers N` parallel Chrome processes (about N x faster; 2-4 on a GPU PC), `--gpu 0` SwiftShader (very slow), `--offset ms` audio shift, `--max N` render only N frames to test, `--frames-only 1` write PNGs and print the ffmpeg command (also automatic if ffmpeg is missing). Needs internet for Three.js pages. Join parts afterwards with `join_acts.py` (re-encode only if needed).
Mobile upload preset is already the default (H.264, yuv420p, 30 fps CFR, AAC 192k, faststart). Status: frame capture and the worker split were tested here (ffmpeg is not installed on this machine, so the encode/mux step is untested).

## 9. jen_back series: build one part (new, direct to 3D, uses RigKit characters)
Files: `tools\jb\cfg_<id>.json` (audio name, out file, title, dur = WAV length, rail = scene start times, stn = station map, dmin/dmax camera distance, fixes, keycol, ledger, cues), `tools\jb\<id>_keys.js` (camera K lines), `tools\jb\<id>_scene.js` (HEADS + renderShots, same API as other scenes + `Char(role,...)` with RigKit poses/`spr:` sprites).
```
cd T\jb ; python build_jb.py a1p1        # writes jen_back\act1_part1_the_comeback-3d.html, embeds RigKit, syntax-checks
cd T ; export SCR=<scratch> ; cp jen_back\<out>.html <TESTDIR>/pv_x.html ; node cdp.js pv_x.html 1.5,3.3,... prefix     # stills (see section 3)
node export_video.js jen_back\<out>.html out.mp4 --dur <dur> --wav "jen_back\audio\<audio>.wav" --workers 3                  # final video (section 8)
```
`build_jb.py` takes `act7_full_conclusion-3d.html` as the base page (template + HUD + recorder) and swaps in the camera block, the world block, captions (from the SRT), ledger, cues, duration and audio. Captions come from `jen_back\audio\<audio>.srt`. Done so far: a1p1, a1p2, a2p1, a2p2. New-part template and asset map: docs\ASSET_LIBRARY.md. Camera shot types: see docsCAMERA_GRAMMAR.md. The world (plaza ground, windowed skyline rings, trees, mood tints) lives in `tools\jb\shim_env_jb.js`; set `"mood": [[t,'day'|'warm'|'dusk'|'night'|'tense'],...]` in the config to change the light per beat.

### 9b. jen_back upgrades after the review (cards, camera, rig)
- Camera: `tools\jb\shim_cam_jb.js`. Stations sit on a WINDING path (`"layout": [[ox,oz],...]` per station in the cfg), every camera key is re-angled from a cycle of 8 setups (left/right 3/4, low, crane, push-in, pull-out), plus a living orbit/crane layer so no hold is locked off. Smear only on real flights (the page's smear gain was lowered in build_jb.py).
- Cards (`tools\jb\shim_env_jb.js`): `Card(x,y,z,w,h,{kind:'doc'|'stamp'|'tag'|'counter',...},t)` = world-anchored paper doc (grain, masked headline reveal, highlighter sweep), ink stamp (slam + shake), tag, counter. In scenes `pop(...)` now maps to stamp/tag automatically (red/green/amber background = stamp). Use `Card(... kind:'doc' ...)` for documents and `kind:'counter'` for numbers.
- Rig: pose changes should use `RigKit.track(t, [[0,'sit'],[2.2,'cross']], 0.4)` (spring overshoot blend, pure function of t, sprite<->rig crossfade). Each character has its own tempo; mouth cadence is irregular; limbs have a rim light.
- Not adopted from the external review: Web Audio lip-sync (the page already calls createMediaElementSource on the VO, a second call throws; offline export has no audio element; the voice-over is narration, not the characters speaking), screen-space cards, whip-pan cuts (the camera never cuts). Already true: preserveDrawingBuffer. Fixed: stale aria-label.

### 9c. Per-station settings (backdrops)
Cfg key `"sets": [kind per station]` with kinds `office, mall, campus, texas, market, plaza` (default plaza = trees + skyline). Defined in `tools\jb\shim_env_jb.js` (block 'per-station SETTINGS', source copy `shim_sets.txt`). The visible set is the station nearest to the point 22 units ahead of the camera, chosen AFTER the camera is applied for the frame. Keep set props at the back (z <= -16 local) so the camera never sits behind them. Done for a1p1, a1p2, a2p1, a2p2.

Look pass (jen_back): lights 0.86 hemi / 1.15 sun, deeper default ground, scene ground pads run through deepCol() (more saturated, slightly darker), vignette 0.32, `plaza` setting is a dressed square (inlay rings, lamp posts, benches, planters). Empty abstract beats: add a small asset in the scene (example: red floor fracture at a2p1 15.5-18.3 s).
Stage + sky pass: near-grey ground pads become a coloured stage per setting (`STAGE` table in shim_env_jb.js, `stageCol()`); coloured pads keep their own colour. Sky gradient is deeper blue, fog starts at 190 (was 110), skyline and trees darker.

### 9d. Frame-fit check (run on every new jen_back part BEFORE reporting it done)
`tools\jbitcheck.js` renders the page on a time grid and lists labels, panels and characters that are cropped by the frame, sit under the caption box or the headline block, or overlap each other. Usage (Git Bash): `cp jen_back/<out>.html <TESTDIR>/pv_x.html ; cd tools/jb ; SCR=<scratch> node fitcheck.js pv_x.html <dur_seconds> 1` (step 1 s; 0.5 s is finer). It prints the list and writes `fit_pv_x.txt` in SCR. Fix by moving the label toward the station centre / lowering y, or moving the camera key. Rules of thumb it enforces: no element under 97 percent visible, nothing under the caption box (x 360-1560, y 885-1030) or the headline block (x 0-640, y 0-190). The hook is added to the page by `tools\jbdd_fit.py` (already applied in shim_env_jb.js; rebuild each part to include it). First run found real crops in act3_part2 and act4_part3 that stills sampling had missed.

### 9e. Camera and life upgrade (after the 2026-11-25 review: "few assets, few asset movements, almost no camera movement")
- Measure: `tools\jb\camstat.js <file> <dur>` prints camera speed, near-static seconds, distance and fov range and close-up seconds. Before the upgrade: 0 to 4 s of close-ups per part and distance 17-40 units. After: 4 to 32 s close-ups, distance 8-33, fov 33-53.
- Camera (shim_cam_jb.js): flights are now curved crane moves with a fov whoosh (~1.5 s); hold/arc/push/pull all carry a slow lateral dolly and orbit; push is deeper (x0.6, fov -9).
- Face close-ups: cfg key `"faces": [[t0, t1, [x, head_y, z], side(+1/-1)], ...]` (scene coordinates of the character; head_y about 1.05 x the Char height). The camera blends to a 33 degree fov head-and-shoulders shot (distance 10 -> 7.8) with a 0.7 s ease in and out. Use it on emotional lines (reaction, decision, quote). `tools\jb\cam_upgrade.py` holds the per-part windows; the `mk_<part>.py` generators rewrite cfg files without faces, so re-run `python cam_upgrade.py` after them (or add faces to the cfg by hand).
- Ambient life (shim_env_jb.js, `X.ambientCast`, `X.animate`): 3-4 background walkers per setting (employees, traders, engineers...) crossing at the back of each station, and the trading-floor screen bars animate. Walkers are sprites, so they draw above 3D props; keep them far back.
- Still to do per scene (content, not engine): 3+ moving assets per beat (flows, counters, growing stacks, characters changing pose). Parts 3-5 were built with about 1-2 per beat.

### 9f. Beat dressing (asset pass)
`tools\jb\dress.py` writes `cfg["dress"]` for every part from a BEATS table (time window, station centre, recipe: money / alarm / win / network / build / docs / watch). `add_dress.py` put the renderer (`dressFrame`) into shim_env_jb.js. Item types: flow (packets on an arc), orbit, rise (growing stack), pulse (ground rings), beam, sparks. Re-run `python dress.py` then rebuild after changing BEATS or after any mk_<part>.py. Full-set check on 2026-11-25 (after camera, face, ambient and dressing changes): fit issues per part 11-36 (about 219 in total; most are labels under the headline block and card crops caused by the closer camera and face shots). Order of work agreed: 3D characters first, then a fit-fix pass on all parts.

### 9g. In-scene characters, framing guard, 3D-rig verdict (2026-11-25)
- Characters are now depth-tested planes INSIDE the Three.js scene (`castToScene` in shim_env_jb.js): props hide them correctly, labels and cards draw over them, and each has a contact shadow. The old 2D `drawCast` overlay is no longer called. Source: `tools\jbdd_frame_guard.py` (re-runnable, idempotent).
- Framing guard (`buildAdj`, table `window.__ADJ`): on first render the page dry-runs the scene on a 0.25 s grid (no WebGL), measures how far labels and cards stick out of the safe area (x 60-1860, y 100-880) and stores a smoothed zoom-out factor (max 1.7x). The camera distance is multiplied by it, except during face close-ups. Needs cfg `dur`. Effect on act5_part2: fit issues 14 to 3.
- Camera calmer: lateral dolly and flight bulge reduced.
- 3D character rig prototype (`tools\jbig3d.js`, cfg `rig3d: [roles]`, applied by `add_rig3d.py`): works technically (real body from pose angles + hand-drawn head) but looked worse than the sprites, so it is switched off (`rig3d: []` in every cfg). Keep it only as a base if true 3D leads are wanted later (needs toon outline shader, jacket shape, hands, sharper head).
- `camstat.js`, `fitcheck.js`, `dress.py`, `cam_upgrade.py` are the checking and enrichment tools; run the full check at the end of the series.

### 9h. Full series check (2026-11-25, all 15 jen_back parts built: a1p1 a1p2 a2p1 a2p2 a3p1 a3p2 a4p1 a4p2 a4p3 a5p1 a5p2 a5p3 a6p1 a6p2 a7)
Run `bash tools/jb/fullcheck.sh` (about 12 minutes; edit the part list and durations inside). It writes full_report.txt (fit issues per part) and full_cam.txt. Result: fit issues per part 3-25 (total about 158): act2_part2 25, act3_part2 18, act6_part2 15, act1_part2 14, act3_part1 13, rest 3-8. Categories: 57 labels under the headline block, 34 cards/labels cropped, 30 characters cropped, 23 label overlaps. Severe crops (under 50 percent visible): act2_part2 6, act1_part2 2, one each in a1p1 a3p1 a3p2 a4p2 a6p1. Camera: 0-19 percent near-static seconds, close-up seconds 1-15 per part (act2_part1 only 1.0, act5_part1 2.5). Mix of Acts: Act 1-2 (4 parts) and Act 3 p1-2 were built first and are the weakest. Not yet done: playback, audio sync, video export.
