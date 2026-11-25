# DIRECTION GUIDE — Part A camera, B characters, C colour, D clean flow (read before a new series)

Written 2026-11-25 after the first jen_back videos were exported. Extends CAMERA_GRAMMAR.md (which says WHAT each move is); this says WHEN a move is allowed.

## The problem seen in the exported videos
Keys files move the camera on a timer (an `arc` every 3 to 5 s, a `push`/`pull` pair in every station, e.g. `a7_keys.js`, `a6p2_keys.js`). The move is then not tied to anything the narrator says, so it sometimes drifts away from the asset that is about to land and the idea does not hit.

## Rule 0: a move must answer "which idea, and what does the viewer need to see"
Research summary (sources are secondary articles; I read search snippets only):
- Film craft: a camera move is justified when it responds to on-screen action or advances the story; unmotivated moves (e.g. a dolly-in on static characters) draw attention to themselves and should be rare. ([No Film School](https://nofilmschool.com/2018/06/key-good-camera-movement-motivation), [PremiumBeat](https://www.premiumbeat.com/blog/cinematography-tip-unmotivated-camera-movement))
- Zoom IN gives an object/detail importance; zoom OUT creates distance and reveals context; snap zooms act as punctuation. ([StudioBinder](https://www.studiobinder.com/blog/zoom-shot/))
- Staging (camera, composition, timing) exists to put the key message where the eye goes. ([StudioBinder, 12 principles](https://www.studiobinder.com/blog/what-are-the-12-principles-of-animation/)); anticipation = a small preparing motion before the main action ([LottieFiles](https://lottiefiles.com/blog/tips-and-tutorials/mastering-disney-12-principles-animation.md)).
- Visual-first explainers (Johnny Harris): the visual idea is chosen first and the script supports it; script and visuals are directed together. ([Medium summary](https://medium.com/@LMK_writing/how-johnny-harris-mastered-visual-storytelling-on-youtube-343ddf9160ec)). Kurzgesagt: visual metaphors that flow from scene to scene. ([Livecounts](https://livecounts.io/blog/youtube/kurzgesagts-existential-hook-optimistic-nihilism-as-a-branding-strategy))
- NOT found: a published "one idea per shot" rule or explainer-specific zoom pacing numbers. The rules below marked (ours) are my own conclusions from the problem above, not sourced.

## The rules (ours)
1. **Write the idea list first.** Per beat, one line: `idea | the asset that carries it | the word/second it lands`. Camera keys are written AFTER, from that list. A move with no row in the list is deleted.
2. **Three legal reasons to move**, and the key must be commented with which: (a) ARRIVE (new station/idea: fly), (b) EMPHASISE (one thing matters now: push toward it, landing on the landing second), (c) REVEAL (scale/consequence appears: pull, starting when the new thing appears, not before).
3. **Never move away from an asset that has not landed yet.** Camera starts a push/pull only after the asset is on screen and fully readable; keep the asset inside the central 60 percent of the frame for its whole life.
4. **Hold is the default.** If the asset is a card, counter, typed text or diagram: hold (tiny drift only). No `arc` just to avoid a static frame; use a living drift instead, it is already automatic.
5. **Anticipate:** start an emphasis push about 0.8 to 1.0 s before the word, end it on the word (hit/stamp second). A pull starts on the reveal second.
6. **Zoom to a target, not to the middle.** The look point of a push is the asset (or the face) being emphasised, not the station centre.
7. **Budget:** at most one emphasis move per sentence, and none in a sentence that has no single key word. Typical target: 40 to 60 percent of seconds are holds. (a7 and a6p2 currently have far fewer.)
8. **Faces:** a face close-up only on a line that carries emotion/decision (shock, fear, smirk), 1.5 to 2.5 s, then back out.
9. **Check the idea hit:** after building, render a still at each hit/stamp second; the key asset must be fully in frame, unobstructed and readable. If not, change the key, not the asset.

## Proposed automatic check (not built yet)
`camstat.js` already reads the camera. Add a "motivation" check: list every push/pull/arc/fly with its start and end, and the nearest cue/hit/card-appearance second from the scene (`cues` in the cfg, `pop(...)` t0 values). Flag any emphasis move that does not END within 0.4 s after a cue, and any move that starts while the asset it should show is not yet visible. Also flag arcs longer than 3 s that are not on a crowd/diagram.

## Text blocks: padding rule (also in code now)
Words must never touch the pill/border. Rules now in `tools\jb\shim_env_jb.js`: Label pill text width = pill width minus 1.0 x pill height (0.5 height each side), font 0.56 of height; tag text excludes the accent bar and keeps 0.4 x height each side; stamp text keeps 0.45 height inside the inner rule; counter keeps 0.35 height each side. Status: edited and rebuilt, but I could not render it (render attempts failed), so it is UNVERIFIED by eye. Look at one tag, one stamp, one counter and one long label first.
New series: apply this at the start, and make every pill taller or shorter-worded rather than shrinking padding.

## Skills / tools found (reviewed from landing pages and search snippets only; none installed)
- kaomei/stickman-video-director (MIT, 8.2k stars): 16 styles, storyboard + code-render modes; long rule-heavy skill, asks to add project credit/star prompts, README carries sponsor links; runs local scripts. Useful as a source of storyboard/shot ideas; our pipeline is a custom Three.js renderer, so it would not plug in.
- krishnagoswami52/stickman-skill (MIT, 30 stars, derivative): code-rendered MP4 + free Kokoro voice; its `doctor.py` pip-installs packages and downloads a 350 MB model. We already have voice-over, so little gain.
- QuantumCoderSys/stickman-story-reels (page shows owner sarthakrawool; ownership unclear): 9:16 reels with ElevenLabs and 19 synthesised sound effects; needs npx HyperFrames download. Only the sound-effect synth idea could help us (our `cues` have no SFX yet).
- "opuscar" = lemomo-ai/lemo-opuscar (about 20.8k stars; 99 film styles in code, WebGL/Three.js topics). Closest to our stack: worth reading for style/camera ideas, not installing blindly.
- Also seen in search: SallyRS/video-director (brief to render, HyperFrames), hoodini `director` (storyboard + shot list), video-shotcraft (152 shot recipe cards, Remotion), heygen-com/hyperframes motion-graphics skill. Shot-list/storyboard ones match our need for an idea list.
None were code-reviewed. They are generators with their own renderers; adopting one means swapping pipelines, so the safer use is to read them for ideas and fold the useful rules in here.

---

# PART B — CHARACTERS AND MOVEMENT (research 2026-11-25)

## What the sources say (secondary articles; search snippets only)
- Overlap and drag: the part that leads starts first, the rest follows; heavier parts lag more and stop later, light ones settle fast. Hold a strong pose during follow-through so the action reads. Overdone, it turns cartoonish. ([UIC](https://www.evl.uic.edu/ralph/508S99/follow.html), [GarageFarm](https://garagefarm.net/blog/follow-through-and-overlapping-action-in-animation), [Game Developer](https://www.gamedeveloper.com/production/the-12-principles-of-animation-in-video-games))
- Easing (slow in / slow out) is what makes tweened motion look weighted; it is the most neglected principle. ([Game Developer](https://www.gamedeveloper.com/production/the-12-principles-of-animation-in-video-games))
- Anticipation: a small opposite motion before the main action improves readability. ([LottieFiles](https://lottiefiles.com/blog/tips-and-tutorials/mastering-disney-12-principles-animation.md))
- Procedural characters (our case): breathing as a layer over other motion; blend between states with hysteresis (different enter/exit thresholds) or it flickers; blink at regular or randomised intervals with a short fixed duration. ([Three.js animation skill](https://tessl.io/registry/skills/github/CloudAI-X/threejs-skills/threejs-animation), [rig example](https://masterallarts.pages.dev/learn/threejs-from-zero/s3-10-full-character-rig/), [Adobe auto-blink](https://helpx.adobe.com/au/adobe-character-animator/desktop/behaviors/learn-more-about-behaviors/body--auto-animating-.html))
- NOT found: a stick-figure-specific guide, or Kurzgesagt silhouette/shading rules. Items marked (ours) are my conclusions.

## Rules for characters (ours, mapped to the rig in CHARKIT.md)
1. **Hero vs extras.** The 8 hand-drawn sprite characters carry every important line; the drawn rig is for crowds and generic roles only. Never mix sprite and rig for the same person in one shot (CHARKIT: cut on a camera move).
2. **Every move has anticipation, a leading part and a settle.** Pose changes via `from`+`blend` use ease-in-out, never linear; head/prop leads, torso follows 2 to 4 frames later; end with a 0.3 to 0.5 s hold.
3. **No teleports.** Characters walk in or are revealed behind an asset; entrance = ease-out with a small overshoot, about 0.4 s.
4. **Small idle life:** breathing (1 to 2 percent scale, 3 to 4 s period) and a blink every 3 to 6 s with random jitter, different phase per character so a crowd does not move in sync (`phase` option exists).
5. **Weight:** heavy roles (board, bondholder) move and settle slower than light ones (engineer, reporter). Props lag the hand.
6. **No state flicker:** front <-> side switching while walking needs hysteresis (side when speed > a, front only when speed < 0.5a).
7. **Contact:** contact shadow on every character, no floating, no foot sliding (travel speed = stride length x step rate).
8. **Crowds:** vary jacket colour, scale (0.92 to 1.08) and phase; repeat one sprite at most twice per frame (current videos repeat one sprite for every employee/board member).
9. **Readability at distance:** strong silhouette (arms away from torso on key poses), dark outline; test at quarter size.
10. **Resolution:** heads are about 55 px upscaled (CHARKIT limit). Face push-ins need higher-res heads; until then keep the zoom modest and short or faces go soft.

# PART C — CONTRAST AND COLOUR (premium look)

## What the sources say
- 60-30-10: about 60 percent dominant colour, 30 secondary, 10 accent; on a dark base the accent is the attention slot; if it vanishes in greyscale the hierarchy has failed. ([LottieFiles](https://lottiefiles.com/blog/tips-and-tutorials/color-theory-for-motion-design), [No Film School](https://nofilmschool.com/60-30-10-color-rule), [Inkbot](https://inkbotdesign.com/?p=332700))
- Style = systematic repetition of shapes, values and colours; a recurring bright palette with round shapes makes a channel recognisable. ([Game Developer](https://gamedeveloper.com/art/an-approach-to-understanding-art-styles), [Livecounts](https://livecounts.io/blog/youtube/kurzgesagts-existential-hook-optimistic-nihilism-as-a-branding-strategy))
- Text contrast: [WCAG 1.4.3](https://w3.org/WAI/WCAG21/Understanding/contrast-minimum.html) needs 4.5:1 (3:1 for large or bold text); graphics 3:1; never round a ratio up. For burned-in video text use the stricter 4.5:1.
- Never rely on colour alone (add icon, label or pattern); keep to about 4 distinguishable categories; avoid red-green pairs. ([Berkeley](https://dap.berkeley.edu/node/70), [Access*Ability](https://buttondown.com/access-ability/archive/accessible-color-choices-are-about-so-much-more/))
- NOT found: explainer-specific premium palette rules. "Premium" below is (ours).

## Measured on our palette (computed WCAG ratios from `PAL` in act7)
On the dark pill `#0B1A22`: ivory 15.7, amberHi 10.4, sageHi 11.0, amber 7.3, sage 7.3, cyan 7.3, muted 5.1 pass; **coral `#D94E43` is 4.3 (just under 4.5)**; steelRim 2.1 and steel 1.4 are not for text.
On ivory paper `#F4F1EA`: ink 15.9 and steel 11.4 pass; **amber 2.1, sage 2.1, cyan 2.1, amberHi 1.5, sageHi 1.4, coral 3.6 must never be text on light paper/stamps** (coral stamp text on cream is 3.6, acceptable only because stamp text is large).

## Rules for colour (ours)
1. **One palette per series, fixed roles.** Base (60): deep petrol ink/slate. Secondary (30): steel, ivory paper. Accent (10): ONE hot colour per beat (amber = money/attention, coral = danger/loss, sage = Nvidia/win, cyan = system/neutral). Two accents in one frame only for a contrast beat (gain vs loss).
2. **Meaning is constant** across all parts (coral is never used for something good).
3. **Text:** light text on dark pills only in the passing accents; on light paper use ink/steel letters and put the accent on a bar, underline or highlight. Use `#F09A92` (coralHighlight, already in PAL) for coral text on dark.
4. **Value hierarchy before hue:** the beat's subject is the highest-contrast thing in the frame; sets and floors stay mid-value, lower saturation. Greyscale thumbnail test: the idea asset must still pop.
5. **Premium = restraint + depth:** 3 to 4 colours per frame plus neutrals, soft shadow under every card, thin light rim on dark shapes, no pure black or white fills, no heavy gradients. The earlier "dull/pale" complaints were low value contrast, not low saturation.
6. **Colour-blind safety:** never coral vs sage as the only difference between loss and gain: add arrow, +/- sign, icon or label.
7. **Check to build:** extend `fitcheck.js` to sample the pixels behind each label and report contrast below 4.5 (labels) or 3 (large text/graphics), plus a greyscale thumbnail per key moment.

## First steps on the next series
1. Idea list + camera motivation (Part A at the top).
2. Lock the palette roles in `PAL` before drawing sets; apply the coral-on-dark fix.
3. Character pass: blink/breath phase per character, ease on every pose blend, no teleport entrances, crowd variety.
4. Render 12 stills, view greyscale and quarter size, then build.

---

# PART D — CLEAN FLOW (user direction 2026-11-25: premium, clean, not messy or fancy)

## The direction
- Showing an idea does not need many things. Moving from one idea to the next does not need many things either.
- At a transition the end line must be hit properly, and the last asset should move with the transition, so the cut looks clean.
- Goal: high-grade, premium, clean flow instead of fancy clutter.

## Rules (ours, implemented where noted)
1. **One idea = one hero asset.** The hero is big, centred, readable and has the highest contrast in the frame. Up to 2 supporting items, nothing else. Budget per idea: text items (pop/Card/Label) <= 3, characters <= 2, primitives <= 14. Checked by `tools\jb2\budget.py` (lower bound only).
2. **Negative space is premium.** No background walkers, no particle flows/orbits/sparks, no tree clutter by default. Built in as `clean` mode (default ON in jb2; `"clean": false` in a cfg turns it off). Dressing is allowed only when it IS the idea (money flowing = the idea of a payment).
3. **Land the end line, then leave.** Order at every transition: last word lands (asset hits) -> 0.3 to 0.5 s settle -> the idea clears or is handed off -> camera flies. The camera must not start the flight before the line ends (flag CUT), must not wait more than about 1.2 s after (flag DEAD), and nothing may land inside the flight (flag LAND). Checked by `motivation.py`.
4. **Two legal exits for the last asset:** (a) CLEAR it: `outA(t, tEnd, 0.35)` fades/scales it to 0 over the last 0.35 s before the flight; (b) HAND IT OFF: `hand(t, tA, tB, from, to)` moves the last asset along with the camera into the next station so it becomes the first asset of the next idea (a match cut: the stamp becomes the next idea's header, the stack becomes the next chart). Never leave the last asset behind to be flown past.
5. **Fewer, calmer moves:** one flight between ideas, hold inside the idea, at most one emphasis push (DIRECTION_GUIDE Part A). Flights are short (about 1.1 s) with an ease at both ends.
6. **Text:** one headline + at most one key label + the caption. Pills are tall enough for the text (aspect at most 6:1, not the 9:1 seen in jen_back).
7. **Same motion language everywhere:** one ease, one entrance (rise + small settle), one exit (fade/scale). No mixed styles within a series.

## Built in jb2
| item | file | status |
|---|---|---|
| `clean` mode (no dressing, walkers, trees) | `shim_env_jb.js` (`CLEAN`), `build_jb.py` | built; rendered on Act 7 at 9 s and 34 s, much calmer |
| `hand()` and `outA()` helpers | `assets_jb.js` | written, syntax-checked by the build, **not used in any scene yet** |
| transition flags CUT / DEAD / LAND | `motivation.py` | built; run on all 15 old parts |
| per-idea budget | `budget.py` | built; run on all 15 old parts |

## What the checks say about the old parts (read-only)
- Transitions: 27 flags (14 CUT: camera leaves before the line ends; 11 LAND: an asset lands inside the flight; 2 DEAD). Worst: a3p1 6, a4p1 3, a2p1 3, a3p2 3.
- Budget: 33 of 74 ideas are over (more than 3 text items, 2 characters or 14 primitives). Static lower bound.
- Seen in the clean render: with clutter removed, the hero assets are too weak to carry a beat alone (a grey chair plus a thin pill for "EMPLOYEE REVOLT"). Clean mode needs stronger hero assets: big, simple, one colour, labelled with a readable pill. That is the next job.
