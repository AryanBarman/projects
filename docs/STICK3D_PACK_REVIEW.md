# REVIEW: Stick3D-Pack-v4 (2026-11-25) — what to take, what to leave
Location reviewed: `C:\Users\Aryan Barman\Documents\learning and creating new flows\Stick3D-Pack-v4\Stick3D-Pack` (56 files). Read fully (docs, engine source, tools); NOT executed (no npm install, no render). Quality judged from its one sample video `examples/nvidia-demo/BENCHMARK-quality-v3.mp4` (22 s, 720x1280, 30 fps, h264+aac; frames extracted with a temporary ffmpeg). The v4 video itself is not in the pack, only its code.

## What it is
A Remotion + react-three-fiber "video factory": 9:16 stick-figure puppets (2D canvas drawn onto billboards, same idea as our stickman) in a 3D toon world. One master prompt tells Claude to do everything from a script + voiceover. Pieces: `engine/src/style/` (puppet.ts, toon.tsx, kit.tsx, props.tsx, extra.tsx = about 60 components: floors, door walls, shelves, windows, desks, monitors, building, street props, throne, crown, dominoes, globe, mug, press cameras ...), `tools/` (forced word alignment with pocketsphinx, SFX synthesiser + ducked mixer, still/contact-sheet/motion/scene-cut/palette tools), rules (anti-template ledger, quality checklist), a 5-scene reference video (`NvidiaV4.tsx`).

## Measured / seen
- Output look: very polished: saturated colour grade, textured floors and walls, 15-20 props per scene, real door openings, readable signs, big 1-2 word captions, expressive faces (sweat, shock mouth, worry).
- Cost per video: the scene file is hand-written TSX. `NvidiaV4.tsx` = 43 KB (about 10.8k tokens by bytes/4) for 22 s, about 490 tokens per second of video. Our story file `s44c.story.json` = 62 lines (about 3.5k tokens) for 42 s, about 80 per second.
- Render: its own doc says 25-35 frames/min on 4 CPU cores at 720x1280 (22 s = about 20-26 min). Not measured by me. Our pages play live in a browser; we have no mp4 export yet.
- Pipeline strengths we lack: forced word alignment (10 ms words.json, so key visuals land on spoken words), SFX synth + sidechain-ducked mix (`mix_sfx.py`), ffmpeg mux, QA tools run on the finished mp4, deterministic frame-exact rendering.
- Weaknesses vs ours: no data layer (every video = new TSX), characters are one generic bean design (5 outfits, 8 moods; no per-person hair/glasses/beard traits, no expression tracks), 720x1280 only, Linux-first setup (bash, bc, /opt paths), "3 ideas per scene" ritual is token-heavy, no camera-motivation/budget checks, no loop/story spec.

## Verdict
As a replacement: no (more tokens per video, loses story files and character identity). As a parts bin: yes. Ranked by value / effort:
1. Delivery pipeline (biggest gap): mp4 export of our pages (frame capture + ffmpeg), their SFX synth + `mix_sfx` ducking driven by our `cues`, mux. Also run their QA tools (contact_sheets, motion_stats, scene_cuts, palette) on the final file.
2. Word-level timing: Whisper word timestamps (or their aligner) -> exact caption sync and event anchoring; add their big 1-2 word caption style as an option next to our one-line style.
3. Room kits as recipes: port their props in groups into our `PROC`/`recipes_jb.js` so a story entry like `["Room","hallway"]` or `["Room","trading-floor"]` gives a 15-prop environment for almost no tokens (one-time port; this is where their visual richness is cheap to get).
4. Acting helpers: IK hands (armR/armL targets), held props that stay in the hand, throw arc, domino chain, door open-and-walk-through as recipes; add IK to our stickman.
5. Do NOT adopt: hand-written TSX per video, the 3-ideas ritual, Remotion as our renderer (only as an optional second backend later).

## Unverified
Their engine, setup script on Windows (pocketsphinx wheels, bc, bash), render speed, and v4 output quality were not tested. A temporary ffmpeg (imageio-ffmpeg in a venv under the session scratch folder) was installed only for frame extraction; the system has no ffmpeg.
