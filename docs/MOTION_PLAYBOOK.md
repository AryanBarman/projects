# MOTION PLAYBOOK — camera, characters, expressions (jb2, written 2026-11-25 after the first short looked static)

User feedback that triggered this: "camera movements are low, character movements are low, the stickmans are not moving or showing expression". Everything below is implemented in `tools\jb2` (`shim_cam_port.js`, `stickman.js`, `shim_env_jb.js`) and used by `s44_scene.js` / `s44_keys.js`.

## 1. What the research gave (sources are secondary articles and skill listings; read via search snippets or a fetch agent)
- Vertical editing numbers ([vidio.ai on vertical pacing](https://www.vidio.ai/blog/article/what-is-vertical-pacing-and-how-should-editors-adapt-cuts-and-motion-for-916-videos)): 1-2 s shots for B-roll, a jump cut or zoom every 3-5 s for talking heads, punch-in scale 10-30 percent over 8-12 frames (0.27-0.4 s), directional blur angle 90 degrees amount 10-20, vertical slide transitions 6-8 frames, action in the centre vertical third and reveals in the top third.
- Retention ([Opus Clip](https://www.opus.pro/blog/ideal-youtube-shorts-length-format-retention), figures partly from the article's own summary): a cut or move every 2-4 s, story beat every 5-7 s, hook inside 3 s, burned-in captions 15-25 percent higher retention. Other vertical advice: push INTO the frame (vertical) rather than dolly sideways ([Cartney, via search snippet](https://dev.to/cartney/vertical-video-composition-for-drama-the-2026-guide-567l)); pattern interrupts (sudden zoom, camera move) ([CapCut guide](https://www.capcut.com/resource/vertical-videos-for-youtube-shorts)).
- Camera vocabulary and the rule "One Movement Per Beat" ([ClaudSkills camera-movements](https://claudskills.com/skills/camera-movements/)): dolly in/out, pan, tilt, zoom, arc, crane, whip pan, dutch angle, snorricam. No numbers there.
- Cartoon faces ([AnimSchool](https://blog.animschool.edu/tag/facial-expressions/), [Envato Tuts+](https://design.tutsplus.com/articles/cartoon-fundamentals-create-emotions-from-simple-changes-in-the-face--vector-16278)): brows and mouth carry the emotion; the eye mask stretches or squashes as a unit (surprise = eyes and brows both go up); exaggerate and keep asymmetry; do not copy real faces.
- Stick-figure skill `stix` ([bassimeledath/stix](https://github.com/bassimeledath/stix), library files read through a fetch agent): 9 expressions (happy sad neutral surprised determined angry laughing crying smirk) defined as literal face geometry, 16 poses, 11 transitions (emotion_shift, head_drop, sweat_drops ...). We took the expression list and the effects idea (sweat, tears), not the code.

## 2. Skills: what was done (honest)
None of the stickman/film skills (kaomei/stickman-video-director, krishnagoswami52/stickman-skill, QuantumCoderSys/stickman-story-reels, stix, lemo-opuscar) were installed. They are generators with their own renderers, dependency downloads (Kokoro model, HyperFrames, ElevenLabs) and in one case promotional prompts; running them would replace our pipeline. Their useful content was read and CONVERTED into our format: the expression set and effects (stickman.js `EX`, `fxMarks`), the camera move names and the one-move-per-beat rule (shim_cam_port.js types), and the numeric pacing rules above (section 3). Nothing from them runs here.

## 3. Camera grammar (shim_cam_port.js)
`K(t, look[x,y,z], dist, yaw, pitch, fov, type, leaveAt, {curve, roll})`: the camera ARRIVES at t. All shots are interpolated in orbit space, so changing `yaw` between two keys is a real orbit and changing `look.y` plus `dist` is a crane.
| move | how | use it for |
|---|---|---|
| push / pull | `ease`, smaller / larger `dist` | emphasis on a face or number; reveal of scale (the 340 miles) |
| orbit | `ease`, `yaw` changes 0.4-0.6 rad over 2-3 s | a hero object that needs depth (the collateral stack, the orbiting data center) |
| crane | `ease`, `look.y` and `pitch` change | following a rocket; vertical stories |
| fly | `fly`, leaves at `leaveAt`, 0.9 s | idea to idea; the previous idea is held until its line ended |
| whip | `whip`, 0.5 s, strong ease, blur on | swish transition or a vertical drop to a reaction (blur is automatic from the camera speed; portrait blur is stronger) |
| dutch | `{roll: 0.04-0.06}` | tension in a close-up |
| punch | cfg `"punch": [[t, fovKick, dollyKick, shake]]` | zoom kick + shake on a stamp or impact (3-7 degrees, 3-8 percent, 0.1-0.3 shake) |
| drift | automatic: slow sway, breathing distance, 0.07 vertical bob | no hold is ever locked off |
Rules: one movement per beat; a move every 2-4 s (never longer than 3 s without one); hold-like shots still push or sway slightly; the first move lands in the first 2 s; moves end on the word they emphasise; a face close-up on an emotion line, then pull back so labels fit; keep labels smaller than the frame when the camera is close (a 5.6-unit pill fills a 6-unit wide close-up); the old automatic framing guard is OFF in portrait (it zooms out and kills close-ups); set cfg `"guard": true` only if wanted.
Measured on the short (from the camera function itself, per second): camera in motion in 38 of 42 seconds (speed above 0.8 units/s); whips 30-75 units/s; dead spots found and fixed (14-15 s, 23 s, 29 s, 31 s, 38-39 s). Checked with `tools\cdp_eval.js` and `tools\jb2\_cam_probe.js`.

## 4. Characters (stickman.js)
- 17 expressions: the original 8 plus sad, laughing, smirk, scared, panic, crying, determined, proud, annoyed (and synonyms such as terrified, furious, laugh). Brows, brow angle, eye openness, mouth curve and openness, gaze, asymmetry (smirk), exaggeration 1.25x on brows and 1.15x on the mouth. Face effects: sweat drops (scared, panic), anger vein, shock lines, tears.
- Expression TRACKS: `ex: [[t0,'proud'],[8.2,'concerned'],[8.45,'panic']]`; every change blends over 0.24 s with a small overshoot (snap, then settle). Static `expr` still works.
- Pick poses that keep the FACE visible on expression beats (shrug, cross, hold); `panic` and `cheer` put hands over or beside the head.
- Acting layer (`act`): gestures 1.3x bigger, weight shift (5 px), head follows a moment behind, impact RECOIL on every time in `hit: [t,...]` (lean back, arms fly, squash), expression-driven tremble (scared, panic, crying) and bounce (laughing, happy, proud), an emphasis gesture about every 1.7 s, wandering arms and nod so a held pose is never frozen.
- Measured (pixels changing per frame at 15 fps, 2 s window): held scared pose 0.47 percent to 2.1 percent (mean change 0.45 to 3.7); calm held poses roughly doubled (0.34 to 0.6 percent); talk 0.75 to 0.98. Calm poses move slowly by design (a few pixels of sway per second), so the per-frame number stays small.
- Close-ups: heads are vectors, so a face close-up is sharp (the banker at 8.5 s fills 40 percent of the frame width).

## 5. Checklist for a vertical beat
[ ] one idea, hero asset big and in the middle band [ ] a camera move tied to the key word, ending on it [ ] punch on the impact [ ] face close-up on the emotional line with the expression changing (use `ex` tracks and `hit`) [ ] pose keeps the face visible [ ] label size fits the shot [ ] no landing inside a flight (`motivation.py`) [ ] look at 12 stills AND the per-second camera numbers.
