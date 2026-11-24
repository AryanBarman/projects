# LEARNINGS — everything learned in the first (very long) session

## 1. Working rules (follow these first)
1. Lean process (user instruction): use the SRT only for timing; do not analyse WAV audio; embed sprites once with `patch_sprites.py`; verify with 1-2 render rounds of stills; do not spawn many agents.
2. Plan on paper before coding: beats from the SRT, one through-line object, stations, assets triggered on spoken words, camera key table, cast (see `storyboard.txt`). A planned build took about 8-20 tool calls; fixing an existing file by agent took 30-50 calls and 200-325k tokens per file. Starting from the SRT with the shared engine is cheaper than fixing old files.
3. Never overwrite an original; write a new `-v2`, `-3d`, `-short` file.
4. Report honestly what was NOT verified (live playback, audio sync, motion smoothness, GPU performance). Stills cannot prove those.
5. Do not invent facts that are not in the narration (no extra stats, no football-field comparisons).
6. Visual rules: ideas through assets rather than talking characters; the camera is a continuous flight with push-in, pull-out, arcs and depth flights between stations, never only sideways; no sign or character cropped by the frame; signs fully readable; keep the scene bright; keep camera at least about 9 units from signs.
7. The user wants everything reusable and documented; update `HANDOFF.md` and these docs when things change.

## 2. Content and style decisions
- Characters are stickmen cut from the user's sheets (Jensen, Elon, general public, engineers). Roles that exist: `jensen`, `elon`, `board`, `analyst` (the last two use public sprites; 'lawyer' and 'host' also map to public sprites). Many scenes reuse the same student sprite for different jobs; known limitation.
- Cast pose drivers: `walkAmt>0.3` walk; `armAngleR<-1.2` point; `talk>0.5` explain; `browTension>0.7` think/worried; both arms up = emphatic.
- Whisper transcription slips fixed in captions: Wong/Hwang -> Huang, Vero -> Vera, Starmine -> Star Mind, Terafab/"terra fab" -> TerraFab, Dealbook -> DealBook, "star shield" -> Starshield, "terafabs" -> TerraFab's, "to the video" -> to NVIDIA, "75 %" -> 75%, "co -engineered" -> co-engineered. Unresolved: Act 5 part 3 "personal contact" may be "personal conduct".
- Act titles used in the full video: 1 THE OFFER, 2 HOW NVIDIA REALLY WORKS, 3 THE BEST-CASE SCENARIO, 4 THE HARD PART OF BUILDING CHIPS, 5 THE WEB OF OBSTACLES, 6 THE REAL GAME, 7 THE VERDICT.
- Audio durations (s): Act1 p1-4 22.9/37.2/29.8/27.4; Act2 47.2/46.2/45.6/51.4; Act3 66.8/38.0/61.8/49.3; Act4 49.1/53.7/73.8/29.9; Act5 67.6/81.3/51.5; Act6 all 146.1 (46.6+61.1+38.4); Act7 all 88.4 (22.3+66.1).

## 3. Engines and why things broke
- The files are not one family: Acts 1-2 Three.js hybrid; Act 4 a custom canvas software 3D renderer; Act 3 original a 2D canvas Cam3D engine; the user's `newsomething.html` is a newer Three.js template with RoundedBoxGeometry and a KIT library. The generic builders only cover the Act 3/5/6/7 2D engine and the Three.js `-3d` shim.
- Several original files had flattened one-line scripts (a `//` comment hid the whole script). Recovery was done with a string-aware parser. Always check for a blank page when a file loads nothing.
- Splicing code with Python string edits repeatedly produced real newlines inside string literals. Use the Write/Edit tool or `chr(10)`.
- Apostrophes inside JS strings generated from Python (`driver's`, `'nvidia's'`) caused syntax errors; build JS strings with `json.dumps`.
- The 2D engine painter's algorithm sorts by face centre; steep yaw can mis-sort; sprites always draw above the 3D layer.
- Labels in the 2D engine are drawn with fit-to-width text (`tag()` uses 0.8 of the canvas width). In the 3D shim, labels are planes that always face the camera and are drawn on top (`depthTest:false`).

## 4. Camera lessons (the user flagged these twice)
- Raw hand-picked camera positions produced crops and unreadable text. Define keys by focus + the world width that must fit; compute distance from that (`K2` pattern: `d = span / (2 tan(fov/2) * aspect) * 1.1`), cap the sideways angle, look slightly downward.
- A row of stations along x with a constant depth made the camera slide sideways only. Fix: station-to-depth mapping (each station in its own z slot) plus a camera layer that alternates push-in/pull-out per beat, arcs around the focus, and cranes a little (`postfx.py`).
- Fast flights between stations show motion smear and briefly empty frames; acceptable but note it.
- For portrait, subjects fit only when the camera is far, so subjects get small. Plan vertical composition on purpose (hero object, closer camera).

## 5. Look and colour lessons
- Dark teal sky/floor made scenes too dark; use a bright sky gradient, light ground and clouds. Pale pastels can wash out props; translucent shapes nearly vanish on a pale ground (Act 3 part 4); darken or add outlines.
- Rounded boxes with soft shadows look clearly better than flat canvas boxes (this was the main gain of the Three.js kit). WebGL line outlines are 1 px; a back-face hull outline would match toon strokes better.
- The old template's skyline, gantry, pipes and light shafts blocked the new scenes: they are removed in the builds.

## 6. Recording lessons
- Real-time recording of a canvas with `MediaRecorder` needs the page in the foreground on a GPU machine; frame rate depends on the machine. The picture is driven by the audio clock, so sync holds when frames drop, but a fixed offset can still appear (hence the video-offset box and `--av`).
- Cause of the early-voice problem: the recorder dropped the silent title-card audio, so the voice started at the beginning of each act file. Fix: keep an inaudible noise source connected to the recorder, or delay audio 2.4 s in post (`join_acts.py --fix-cards`). Do not apply both.
- Per-act files are safer than one huge file (a crash loses only one act); the recorder can also write the full video in parallel (two recorders on one stream).
- Joining recorded WebM files with ffmpeg concat needs `-fflags +genpts` because recorded files have no duration header; fall back to re-encode if copy fails.
- The sandbox denied starting a local web server in the background. The user must run `python -m http.server 8765` themselves. Do not work around permission denials.

## 7. Mobile lessons
- The shorts are native portrait but not yet tuned to platform UI safe zones (see `SHORTS_GUIDE.md` section 5). The long video is 16:9 and not restructured for phones.
- Shorts need their own story arc (hook, re-hook, payoff, CTA), not a clipped excerpt; the user rejected both letterboxing and plain cuts.

## 8. Costs and process facts
- Ten agent builds of Acts 1-4 cost about 200-325k tokens each; the direct builder for Acts 3 parts 2-4, 5, 6, 7 cost about 20 tool calls each (one part around 40k tokens). Subagents hit the account usage limit once; they resume when sent a message after the reset.
- The temporary scratchpad is deleted between sessions; everything needed is copied to `tools\`.
- Chrome headless with SwiftShader renders about 1 frame per second; never plan frame-by-frame video export on the sandbox. Real-time recording on the user's machine is the way, or a WebCodecs frame-by-frame exporter (not built; would give exact sync regardless of machine speed).

## 9. Possible future work (ideas the assistant raised)
- A WebCodecs/offline exporter for exact A/V sync and no real-time dependence.
- Per-beat hand-tuned cameras for the `-3d` files; a back-face outline for toon edges; offline (no internet) Three.js; Act 2 and Act 4 `-3d` ports and shorts; sound effects from the cue sheets in the recording; a larger-caption long video for phones.
