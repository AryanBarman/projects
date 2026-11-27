Master Production Blueprint: AI-Driven 2D-in-3D Beat-Synced Explainers

Generating complex Three.js and HTML5 explainer documentaries with a base AI model fails when the model is asked to invent creative direction and write WebGL scene code in the same pass. As documented in ANIMATION_STORYBOARD_GUIDE.md, a dual-canvas 1920×1080 pipeline running at 30 fps (window.render(t)) already provides strong engineering primitives—including volumetric props, RigKit hybrid characters, a winding multi-axis stage (STN and LAYOUT), and Hermite-spline camera grammar (CAM_KEYS). However, without strict pre-production guardrails, an AI model scatters competing accent colors across single frames, lets 2D billboarded characters drift in scale relative to 3D architecture, times cuts to arbitrary script timestamps without audio or beat awareness, and stacks a brand-new visual metaphor and text board onto almost every sentence.

The solution is to separate creative constraints from code generation through a four-pillar visual architecture and a four-stage execution workflow. By locking color behavior, character proportions, musical beat markers, and metaphor rules into a reusable template before any scene code is written, a base AI model can produce cohesive, readable, and rhythmically grounded episodes.

Production Dimension	Legacy Ad-Hoc Pipeline	Constrained Master Blueprint
Color Hierarchy	12 open PAL swatches with 6 competing accents; linear RGB mood blends	60–30–10 role tokens (ground, structure, accent-active); one active accent; HSL/OKLCH interpolation
Character Scale	Uncoupled 2D billboarded RigKit sticks vs. 3D buildings (DMIN=16–DMAX=36 + 44-unit cranes)	Locked world-unit height, construction volumes, shape-language silhouettes, depth-coupled scaling, grounded shadows
Audio & Pacing	Visual-only timeline; fixed 1.1s fly, 0.35s tail, 0.45s cross-fade; 2.9s–3.2s compressed boards	Narration-first A-roll + BPM/downbeat CSV; 4-bar/8-bar phrase sync; 1–2 frame anticipation cuts; comprehension holds
Storyboarding & Text	Prop-per-line stacking + simultaneous captions, HEADS, and multi-line 3D Card boards	One evolving metaphor across 3 scenes; literal charts only for proof; 1–3 word 3D labels; silent-watch QA gate

1. Behavioral Color System & 7-Act Color Script

Motion color fails when treated as static decoration rather than a dynamic navigation system. As outlined in the Studio 7mm motion graphics color guide, viewers need roughly a quarter of a second to re-fixate; when three saturated colors compete in the same frame, the eye bounces and the narrative message is lost. Furthermore, heavy video compression punishes saturated reds, fine gradients, and noisy backgrounds, meaning a palette must survive MP4 encoding and mobile viewing rather than looking good only in a browser preview.

The 60–30–10 Role Mapping for PAL

To prevent a base AI model from scattering sage, sageHi, amber, amberHi, coral, and cyan across the same shot, the 12 tokens in PAL must be locked into a strict three-tier behavioral system adapted from the 60–30–10 rule documented by Studio 7mm and LottieFiles.

Tier	Screen Area	Locked PAL Tokens	Behavioral Rule for AI Generation
Ground	60–70%	Daylight: parchment (#E7E1D3), floor (#DDD5C5); Night: ink (#0B191E), slate (#12262E)	Moves slowly or remains static; changes only on hard cuts at act breaks, never mid-shot.
Structure	25–30%	Light UI/Cards: ivory (#F4F1EA); Dark Panels/Outlines: steel (#1B3540), ink (#0B191E)	Carries cards, typography, and toon ink-edge outlines; stays stable for legibility and never steals focus.
Accent	5–10%	accent-active mapped to one of sage (#76B900), amberHi (#EBC16B), coral (#D94E43), or cyan (#45B8AC)	Only one active accent on screen at a time. Forbidden from backgrounds; reserved strictly for the current focal beat.

Within this hierarchy, two rules govern every color transition:

* Enforce the Accent Handoff: According to Studio 7mm, having two accents visible simultaneously creates a visual tie rather than a hierarchy. Whenever a new element demands attention—such as a coral (#D94E43) stock drop following a sage (#76B900) rally—the previous accent must demote itself to a Structure color (steel or a muted tinted neutral) on the exact same transition frame.
* Name Tokens by Role, Not Hue: Prompts and scene templates must reference semantic roles (ground_day, ground_night, surface_card, structure_panel, ink_outline, accent_active) rather than raw color names. Extending each core hue into a 5–7 step value ramp and mixing 3–8% of the primary hue into grays prevents dead, untinted neutrals.

Smoothing the 7-Act Color Script

In ANIMATION_STORYBOARD_GUIDE.md, act signature colors oscillate erratically across the seven acts (#EBC16B → #9BE01B → #45B8AC → #D94E43 → #EBC16B → #45B8AC → #9BE01B). Studio 7mm recommends sketching a deliberate one-line color script before animating—typically moving from a neutral opening to cool tension, a warm or sharp turn, a saturated payoff, and a controlled brand resolve.

1. Act 1 (Setup — The Comeback): Neutral daylight ground (parchment #E7E1D3) with moderate contrast; sage (#76B900) and amberHi (#EBC16B) highlight the initial rally, handing off cleanly to coral (#D94E43) on the crash.
2. Acts 2–3 (Problem — The Basic Math & Follow the Money): Cool, lower-saturation slate (#12262E) and steel (#1B3540) grounds with cyan (#45B8AC) as the investigative accent, preventing viewer burnout during dense financial explanations.
3. Acts 4–5 (Turn & Scrutiny — The Broken Promise & Washington Asks Questions): A deliberate temperature and contrast shift on deep ink (#0B191E) and slate (#12262E) grounds, reserving high-contrast coral (#D94E43) strictly for the rate-hike shock and amber (#D99B26) for Washington oversight.
4. Acts 6–7 (Payoff & Verdict — The Money System & The Verdict): Saturation ramps into the Priced for Perfection crack (coral #D94E43), then echoes the opening sage (#76B900) against dark storm clouds (slate #12262E) to close the narrative loop.

Rendering Engine & Color QA Fixes

Two technical safeguards ensure the palette holds up in final delivery:

* Perceptual Interpolation in moodAt(t): Linear RGB interpolation between opposing hues cuts through the middle of the color space, producing a muddy gray dip mid-transition. applyMood(t) and moodAt(t) should interpolate in HSL/HSV or OKLCH—or cross-dissolve layers with eased keyframes—while preserving the existing ink (#0B191E) and ivory (#F4F1EA) extremes (avoiding pure #000000 and #FFFFFF) and the 12 Hz grainPat overlay (1–2% grain) to prevent gradient banding.
* Value-First QA Gate: As Miracamp and Studio 7mm emphasize, hue contrast without value contrast fails in grayscale and for color-vision-deficient viewers. Before rendering final MP4s, scrub the timeline fully desaturated (targeting at least 4.5:1 contrast for body text and 3:1 for large graphics), run a deuteranopia/protanopia check on red/green charts, and inspect the compressed export on a phone at 50% brightness.

2. RigKit Character Proportions & 2D-in-3D Scale Rules

In ANIMATION_STORYBOARD_GUIDE.md, RigKit billboards 2D procedural stickman bodies (castToScene(t)) and sprite heads (heads_atlas.webp and HQ sprite overrides) into a Three.js world where camera distances swing from tight FACES close-ups to DMIN=16–DMAX=36 framing and 44-unit wide crane shots. When 2D characters share space with 3D architecture (hqTower, capitol, boardWall) without locked world-unit geometry, perspective coupling, or shape differentiation, character sizes drift across cuts and figures appear pasted onto the stage.

Standardizing Proportions & Shape Language

As detailed in the Toon Mentor character design guide, memorable animated characters require locked construction volumes and intentional shape language before outfits or facial details are added:

* Enforce World-Unit Proportions & Construction Volumes: Define a standardized world-unit height constant in RigKit (e.g., UNIT_HEIGHT) for standard adults and a locked head-to-body ratio across all four head views (front, q, side, back). Construct every rig from simple underlying forms—sphere head, box/oval chest, box/bowl pelvis, and cylinder limbs—so RigKit.track(t, keys) pose blending (backOut easing) never warps body volume mid-gesture.
* Differentiate Cast by Shape Language & Contrast: Rather than relying solely on OUT outfits to distinguish the 20 cast roles, assign distinct primary shapes and height/width proportions:
  * Triangle / Angular (jensen, trader): Upright posture and sharper shoulders to signal speed, ambition, and sharp focus.
  * Square / Broad (lawmaker, fed, banker, board): Boxy torso and wider stance to communicate institutional weight, stability, and authority.
  * Circle / Compact (engineer, employee, supply): Rounder proportions and slightly shorter stature to read immediately as approachable builders.
* Pass Silhouette, Thumbnail & Value-Separation Tests: Fill every character solid black with zero internal details; if two cast members look identical at thumbnail size or in wide shots, adjust their proportions or primary silhouette. Maintain clear lightness separation between face, hair/jacket, limbs, and the 3D background so characters stay legible in grayscale.

Integrating 2D Characters Seamlessly Into 3D Space

Polydin Studio's guide to 2D/3D mixed animation highlights four technical requirements for convincing 2D-in-3D integration:

1. Dynamic Perspective Scaling: Scale every 2D billboarded rig in castToScene(t) strictly as a function of camera depth and FOV relative to its 3D floor anchor [x, y, z], eliminating arbitrary per-scene scale overrides.
2. Floor-Locked Pivots: Anchor every character's origin at the soles of the feet (y = 0) rather than torso center so characters never hover above or sink into the tiled floor during push, pull, or arc camera moves.
3. Grounded Contact Shadows: Project a directional/contact shadow from each 2D character onto the 3D floor plane aligned with the Three.js directional key light.
4. Unified Line Weight & Lighting: Match 2D capsule outline thickness to the toon ink-edge outlines on 3D props (Box, Cyl, RoundedBoxGeometry) and apply a subtle cel-shaded highlight aligned with the scene's #45b8ac cyan rim light.

3. Audio-First Timing & Beat-Sync Engine

Currently, ANIMATION_STORYBOARD_GUIDE.md excludes audio and SFX from the visual sequencing pipeline, while final_recorder.html applies uniform timings across every part (TAIL = 0.35s, XFADE = 0.45s, CARD = 2.4s, and ~1.1s fly moves). Meanwhile, dense informational scenes such as SEC Accounting Review (2.90s) and Hours Later (3.20s) are compressed into brief windows. According to Beat2Cut and Vidova, cutting blindly without audio—or cutting on every single beat (every 0.5s at 120 BPM or 0.47s at 128 BPM)—creates frantic, mechanical pacing that exhausts the audience.

Audio-First Pre-Production Sequence

To prevent an AI model from inventing arbitrary timestamps, audio must be locked before any animation code is generated:

1. Finalize Narration First: Record or generate the complete spoken A-roll so the story is fully intelligible on its own, matching Tinyfool's rule to finish the spoken story before layering supporting visuals.
2. Select and Analyze Music Early: Choose the background track before scene generation and analyze its tempo (BPM), time signature (4/4 or 3/4), section structure (verse, chorus, bridge), and loud/quiet dynamics.
3. Extract Beat & Downbeat Markers: Run the track through an automated beat detector (such as Beat2Cut or Vidova's BPM detector) to export a structured CSV/JSON timeline marking both individual beats and downbeats (beat 1 of each bar), then pass those exact timestamps alongside narration word timestamps into the AI prompt.

Dialogue-Priority Beat-Sync Rules

As Beat2Cut notes, dialogue takes priority over music sync in narration-driven content; B-roll, camera moves, transitions, and effects should sync around the narration rather than overriding comprehension. Similarly, Tinyfool's B-roll guide emphasizes cutting for comprehension and rhythm rather than a fixed number of seconds, letting detailed charts or unfamiliar screens stay visible long enough to read.

Pipeline Element	Legacy Visual-Only Timing	Beat-Synced & Comprehension Rule
Major fly & Section Cuts	Fixed ~1.1s fly at script line ends	Snap major fly moves and station changes to 4-bar or 8-bar phrases and downbeats (beats 1 and 3).
hitFx, Chart Pops & Stamps	Arbitrary timestamps (e.g., 4.78s, 13.83s)	Trigger hitFx bursts, counter pops, and accent handoffs on downbeats or snare hits (beats 2 and 4).
Perceived Sync Offset	Visuals fire on exact script timestamp	Apply 1–2 frame anticipation cuts (firing cuts/impacts slightly early) to account for visual processing latency.
Transition Style	Uniform 0.45s cross-fade everywhere	Match transition to audio cue: swoosh on cymbal swell, flash on impact, slow dissolve on held notes, hard cut on staccato.
Pacing & Comprehension Holds	Fixed 0.35s tail; compressed 2.9s–3.2s boards	Use dynamic range matching (slower holds in quiet sections, faster builds in loud sections) and hold dense charts long enough to read.

Finally, layer subtle natural/foley SFX—such as paper tearing on the Rates Keep Falling document tear, typing on the House Committees warning letter, or mechanical clicks on Three Locked Doors—tucked cleanly under the voiceover so cutaways feel physically grounded.

4. Storyboarding, Evolving Metaphors & Text Discipline

In the current 7-act storyboard, almost every script beat spawns a brand-new prop or metaphor (hqTower, Three Locked Doors, brokenTower, Unpaid Bills, Green Umbrella, Tearing Document, fabSite, Rocket, and Ship in a Storm) while simultaneously displaying bottom word-level captions (drawCaptions), top-left HEADS banners, and multi-line 3D Card boards. As ByThen's explainer guide explains, forcing viewers to learn a new visual metaphor on every line causes cognitive fatigue, while on-screen paragraphs compete directly with spoken narration.

One Evolving Metaphor Across Three Scenes

Instead of inventing a new prop per sentence, instruct the AI to anchor each act or complex concept to one visual metaphor carried across three scenes—keeping the object, setting, lighting, and art style identical while changing only one variable:

1. Introduce: Establish the object and its baseline rules calmly so the viewer learns the picture in about one second.
2. Develop: Shift a single variable (such as storm intensity, load weight, or temperature) so the audience grasps the escalating concept immediately without learning new visuals.
3. Resolve: Deliver the visual payoff or consequence, noting briefly in narration where the metaphor bends if needed.

Every proposed metaphor must pass ByThen's three tests before scene code is written: the one-second test (grasped almost instantly), the behavior test (the image acts like the concept rather than literally restating the topic), and the growth test (it can evolve across three scenes without turning into a different object). When citing real numbers, stock drops, or financial results, skip metaphor and switch cleanly to visual proof such as cashChart or a data card.

Eliminating Competing Text & Planning Coverage

To keep viewers focused on the visual story rather than reading multiple text layers at once:

* Keyword-Only 3D Labels: Restrict 3D world-space Card text to 1–3 word keywords or simple arrows, used only when an object or chart might otherwise be misread. Never render multi-line 3D paragraphs alongside bottom word-level captions.
* Script-Driven B-Roll Coverage: Following Tinyfool's B-roll framework, plan every shot around its primary visual job (Proof, Context, Emotion, Action, or Metaphor) and alternate framing intentionally across Wide (where the action happens), Medium (subject and activity), and Close-up (key detail, number, or expression).
* Motivated Camera Motion: Use a locked hold when viewers need time to read a chart, a slow push to direct attention, and a fly transition only for major chapter or location shifts—never cycling arc or fly mechanically.

5. The 4-Stage AI Execution Workflow & Master System Prompt

To get consistent, studio-grade output from a base AI model (such as Claude Sonnet), never feed it a raw script and ask for a complete HTML/Three.js file in one step. Split production into four sequential stages, requiring creator approval on the Pre-Code Blueprint before any code is written.

The 4 Sequential Production Stages

Separating planning, locked infrastructure, and single-part generation prevents a base AI from improvising conflicting styles across acts. Each stage produces a concrete artifact that feeds directly into the next:

1. Stage 1 — Audio & Beat-Map Extraction: Finalize the spoken narration and music track first. Export timeline.json (or CSV) containing narration timestamps alongside music BPM, 4-bar/8-bar phrase boundaries, and downbeat/snare timestamps.
2. Stage 2 — Pre-Code Blueprint (AI Plans, Creator Approves): Have the AI output a one-line color script, a 3-scene metaphor plan, and the mandatory 6-column Pre-Code Blueprint table mapped to timeline.json before writing any Three.js code.
3. Stage 3 — Locked Component Engine: Keep shared rendering helpers fixed in a base module that the AI imports rather than rewrites: 60–30–10 semantic color tokens with HSL/OKLCH moodAt(t), RigKit with enforced world-unit heights (y = 0 pivots, depth-coupled scaling, contact shadows), and a beat-snapping helper for CAM_KEYS and hitFx.
4. Stage 4 — Single-Part Generation & 4-Check QA Gate: Generate one part at a time strictly from the approved Stage 2 blueprint. Before final export, pass four checks: (1) Grayscale test (hierarchy reads without color), (2) Silhouette/Thumbnail test (cast members remain distinct when small), (3) Mobile + MP4 compression check (legible at 50% phone brightness without banding), and (4) Silent-watch test (every shot visibly advances the story or provides proof with the sound muted).

Mandatory 6-Column Pre-Code Blueprint Template

Require the AI to complete this planning table for every scene and receive approval before generating any HTML or JavaScript, as illustrated with a sample row from the Act 7 storm-at-sea sequence:

Scene & Beat Time	Script Line	Visual Job (Proof / Metaphor / Context / Emotion)	Framing (Wide / Med / CU + Camera Move)	Metaphor / Visual State & Single Changed Variable	On-Screen 3D Label (Max 3 Words)
12.20s (Bar 7, Beat 1)	"Putting the captain back at the wheel doesn't stop the storm..."	Metaphor	Wide crane ([26, 7, 44]) → hold	ship on calm-to-choppy waves; single changed variable: incoming stormCloud density; sage demotes to steel, coral active	DEC 8 RATES

Copy-Pasteable AI System Prompt

Use the following ruleset as the system or project prompt when directing a base AI model to plan and build scenes:

Role & Pipeline Context: You are an animation director and Three.js motion engineer building a 1920×1080, 30 fps window.render(t) dual-canvas (#gl + #c) explainer scene. Never write HTML/Three.js code until the Pre-Code Blueprint is approved.

1. Color Rules (60–30–10 Behavioral System): Use only semantic role tokens (ground_day, ground_night, surface_card, structure_panel, ink_outline, accent_active), never raw #000000 or #FFFFFF. Enforce one active accent on screen at a time; when a new accent enters, demote the previous accent to a Structure color on the exact same transition frame (Accent Handoff). Never change the Ground color mid-shot—swap Ground only on hard cuts at act breaks. Interpolate all mood and color transitions in HSL/OKLCH rather than linear RGB, and keep 1–2% film grain enabled.

2. Character & RigKit 2D-in-3D Rules: Lock character height to a standardized world-unit constant (UNIT_HEIGHT) and anchor pivots at y = 0 (feet on floor). Scale 2D billboarded rigs dynamically by camera depth and FOV so proportions never drift against 3D architecture. Differentiate cast members using primary shape language (Circle, Square, Triangle) and distinct silhouettes rather than outfits alone. Project grounded contact shadows onto the floor aligned with the key light, and match 2D outline thickness to 3D toon ink-edges.

3. Audio & Beat-Sync Rules: Lock all major fly transitions and station changes to the provided timeline.json 4-bar/8-bar phrases and downbeats (beats 1 and 3); dialogue takes priority, so never cut on every beat. Trigger hitFx bursts, chart pops, and accent handoffs on downbeats or snare hits with a 1–2 frame anticipation offset (1–2 frames early). Hold dense charts and data boards long enough for viewer comprehension (hold camera), and match transition style to the audio cue.

4. Storyboard, Metaphor & Text Rules: Do not invent a new prop per script line. Use one evolving metaphor across 3 scenes (Introduce → Develop via one changed variable → Resolve) passing the one-second, behavior, and growth tests, and switch to clean charts only when citing real numerical proof. Restrict 3D world-space labels to 1–3 word keywords or arrows only when meaning could be misread, and never place multi-line 3D text boards over bottom captions. Before writing any code, output a one-line Color Script, the 3-scene Metaphor Plan, and the 6-column Pre-Code Blueprint table mapped to timeline.json beats, then wait for approval.
