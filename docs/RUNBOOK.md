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
