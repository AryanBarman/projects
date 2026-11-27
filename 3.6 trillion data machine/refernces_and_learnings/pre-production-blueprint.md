Pre-Production Blueprint: The $31.6 Trillion AI Compute Trap

Translating The $31.6 Trillion AI Compute Trap from a spoken documentary script into a deterministic, AI-generated 1920×1080 animation requires separating creative architecture from code generation. Left to improvise from raw script cues alone, a base AI model scatters competing accent colors across dark backgrounds, drifts character proportions across camera distances, invents disconnected props for every sentence, and forces dense on-screen sentences to fight bottom word-level captions. This blueprint applies the four-pillar production system—behavioral color hierarchy, standardized RigKit character scaling, audio-first beat synchronization, and evolving three-scene visual metaphors—directly to the script's 11-minute-25-second runtime.

1. Script-to-Pipeline Diagnostic: Four Friction Points to Resolve First

While the script establishes a strong causal spine, three open loops, and explicit musical tempo shifts, several of its inline production cues conflict with the visual discipline required for a clean 2D-in-3D explainer. Addressing these structural friction points before generating scene code prevents visual clutter and cognitive overload.

The table below maps the raw script cues that create visual friction against the corrective production rule that replaces them.

Script Cue Pattern	Why It Breaks Visual Clarity	Pipeline Correction Applied Below
Long TEXT ON SCREEN sentences (e.g., "THOSE GPUS ARRIVE BY ARMORED CAR.", "SILICON? SOFTWARE? OR SOMETHING ELSE?")	Competes directly with bottom word-level captions (drawCaptions) and top-left chapter banners (HEADS), forcing viewers to read two text layers while listening.	Restrict all 3D world-space labels to 1–3 word keywords or arrows used only when an object might be misread; let captions carry full sentences.
Prop-per-beat jumps (e.g., armored truck → sushi restaurant → H100 schematic → railroads → fiber trenches → world map)	Introduces a new visual rule on almost every beat, causing viewer fatigue instead of building cumulative understanding.	Anchor each act on one evolving metaphor (Introduce → Develop → Resolve) while switching cleanly to charts or exhibits when citing hard proof.
Sub-second cold-open montage (0:00–0:05)	Rapidly cutting across four unrelated subjects in five seconds leaves insufficient comprehension time unless anchored to a single beat pulse.	Lock the 4-cut montage strictly to the 110 BPM beat grid with a 1–2 frame anticipation offset and a unified color ground.
Dense multi-figure exhibits (5:00–6:15 arbitrage/interest breakdown; 3:55–5:00 four-company pricing timeline)	Compressing multiple indices, dollar figures, and rate shifts into moving camera pans makes numbers unreadable on mobile screens.	Enforce locked hold camera shots on data exhibits and demote prior accents on the exact frame a new figure highlights.

With these four guardrails in place, the production pipeline can lock the palette, character cast, audio grid, and scene-by-scene storyboard before any rendering code is written.

2. Pillar 1: 60–30–10 Color Architecture and One-Line Color Script

Rather than treating the PAL palette as twelve interchangeable swatches, every frame in The $31.6 Trillion AI Compute Trap must operate as a three-tier behavioral system. By dedicating 60–70% of the screen to a calm ground, 25–30% to structural panels, typography, and toon ink outlines, and 5–10% to a single active accent, the viewer's eye always knows where to land without fighting simultaneous neon highlights.

Behavioral Token Mapping

Every scene prompt must reference semantic role tokens rather than raw hex codes or hue names, ensuring that only one accent is active on screen at any moment. When a new metric or threat takes focus, the previous accent demotes immediately to a Structure color (steel #1B3540 or slate #12262E) on the same transition.

Tier	Screen Share	Locked Tokens & Hex Values	Motion & Scene Behavior
Ground	60–70%	Daylight Setup: parchment (#E7E1D3) sky/fog + floor (#DDD5C5)
Tension / Night: slate (#12262E) + ink (#0B191E)	Static or slow-moving; swaps only on hard cuts at act breaks, never mid-shot.
Structure	25–30%	Cards / Paper: ivory (#F4F1EA)
Panels / Outlines: steel (#1B3540), ink (#0B191E)	Carries chart frames, server shells, and character outlines; never steals focus.
Accent	5–10%	accent_active (one of: sage #76B900, cyan #45B8AC, amber #D99B26 / #EBC16B, or coral #D94E43)	One active accent per shot. Forbidden from backgrounds; hands off cleanly on beats.

To prevent muddy gray dips when transitioning between daylight and dark tension scenes, moodAt(t) must interpolate in HSL or OKLCH rather than linear RGB, while keeping the 12 fps grainPat overlay active to eliminate gradient banding after video compression.

Seven-Segment One-Line Color Script

The emotional arc of the documentary follows a deliberate progression: a neutral-to-warm high-stakes hook, a daylight historical baseline that turns urgent, a cool investigative deep-dive into ghost capacity and software lock-in, a sharp coral crisis at the physical megawatt wall, and a clean return to the opening cyan/amber tension at the binge outro.

Section & Runtime	Ground & Temperature	Saturation & Contrast	Active Accent (accent_active)	Accent Handoff Trigger
Cold Open (0:00–0:30)	ink (#0B191E) / Cool-Dark	High contrast, controlled	cyan (#45B8AC) → amberHi (#EBC16B)	cyan server/truck lock hands off to amberHi on \$31.6T counter reveal.
Act 1: Upgrade Trap (0:30–3:00)	parchment (#E7E1D3) / Neutral-Warm	Medium, moderate contrast	sage (#76B900) → coral (#D94E43)	sage traditional capex curve demotes to steel; coral marks 2-year silicon rot (70% → 93%).
Act 2: 99% Full, 5% Used (3:00–6:15)	slate (#12262E) / Cool	Low-to-medium, flat analytical	cyan (#45B8AC) → amber (#D99B26)	cyan tracks 1% vacancy / 5% usage; amber activates on \$140B dark value & pricing shifts.
Act 3: 20-Year Trap (6:15–8:45)	slate (#12262E) / Cool-Neutral	Ramping medium-to-high	coral (#D94E43) → sage (#76B900)	coral marks 2006 collapse (\$12B → \$2B–\$3B); sage takes over for 5M CUDA devs & \$5T cap.
Act 4: Physical Ceiling (8:45–11:00)	ink (#0B191E) / High-Tension Dark	High saturation & sharp contrast	amberHi (#EBC16B) → coral (#D94E43)	amberHi illuminates #1 Power bottleneck (Aurora); coral strikes -\$6T export-control fracture.
Binge Outro (11:00–11:25)	ink (#0B191E) / Echoed Dark	Clean, minimal	cyan (#45B8AC)	Echoes Cold Open cyan on the glowing power-substation end card.

3. Pillar 2: RigKit Cast Registry, Proportions, and 2D-in-3D Scaling

Although much of The $31.6 Trillion AI Compute Trap centers on data centers, chips, and power grids, key narrative beats feature human decision-makers—specifically Jensen Huang, Larry Ellison, Elon Musk, enterprise compute buyers, data center lenders, and software developers. Whenever 2D billboarded RigKit characters enter the 3D Three.js stage, they must obey standardized world-unit proportions and shape language so they never shrink, bloat, or visually detach from architectural props.

Cast Proportions and Shape Language

Rather than distinguishing characters by outfit colors alone, each cast role is assigned distinct primary shapes and recommended locked world-unit height targets so every figure passes both the silhouette test and the thumbnail test in wide shots.

Cast Role (RigKit ID)	Primary Script Appearances	Shape Language & Silhouette	Recommended Height Target	Value Separation Rule (PAL Tokens)
Jensen Huang (jensen)	Cold Open (Nobu Palo Alto), Act 3 (2006 CUDA launch)	Triangle / Angular: Upright posture, sharp shoulders, black leather zip jacket silhouette	1.85 world units	Light face value against dark hair and ink (#0B191E) jacket; subtle sage (#76B900) lapel accent only when active.
Larry Ellison & Elon Musk (elon, board)	Cold Open (0:05–0:18 Nobu allocation plea)	Square / Broad (board) & Angular (elon): Distinct height/shoulder contrast when flanking jensen	1.82 / 1.88 world units	Mid-tone steel (#1B3540) attire separated from ink (#0B191E) ground via cyan (#45B8AC) rim light.
Enterprise Buyers / Lenders (banker, trader)	Act 2 (3:00–6:15 hoarding & GPU hedging)	Square / Boxy: Broad torso, briefcase/ledger prop, grounded institutional stance	1.80 world units	High-value ivory (#F4F1EA) shirt collar/cuff accents against dark slate (#12262E) suit for grayscale clarity.
CUDA Developers / Rivals (engineer)	Act 3 (6:15–8:45 5M devs, AMD/ASIC challenge)	Circle / Compact: Rounder head/torso, slightly shorter stance, laptop/terminal prop	1.72 world units	Lighter floor (#DDD5C5) / ivory (#F4F1EA) workwear to separate clearly against slate (#12262E) server backgrounds.

Mandatory 2D-in-3D Integration Guardrails

To eliminate perspective drift during camera push, pull, and fly moves, every RigKit instance in the scene code must enforce four technical locks:

1. Floor-Plane Pivot Lock: Anchor character origins strictly at the soles of the feet (y = 0 on the stage floor), never at torso center, so characters remain planted during camera elevation changes.
2. Depth-Coupled Dynamic Scaling: Compute 2D billboard scale strictly from camera distance and field of view relative to the character's [x, 0, z] world anchor—never apply manual per-scene scale overrides.
3. Grounded Contact Shadows: Render a directional contact shadow on the 3D floor beneath every character, aligned with the scene's primary key light.
4. Unified Toon Line Weight: Match the 2D capsule limb outline thickness directly to the ink-edge outlines on surrounding 3D Box and Cyl props, accompanied by a #45B8AC rim highlight in night/tension scenes.

4. Pillar 3: Audio-First Beat-Sync and SFX Execution Map

The script already specifies clear musical tempos, two deliberate silence drops, and physical sound effects. In a narration-led documentary, spoken dialogue always takes priority over music sync—never cut on every quarter-note beat at 105–115 BPM, which fragments comprehension. Instead, lock major scene transitions to 4-bar and 8-bar phrases, snap visual impacts (hitFx, chart pops, accent handoffs) to downbeats (beats 1 and 3) or snare hits (beats 2 and 4), and fire cuts 1–2 frames early (anticipation cut) so visual changes feel physically locked to the audio.

The table below converts the script's audio cues into exact visual timing rules for the rendering timeline.

Section & Timestamp	Audio Bed & Tempo	Bar Duration (4/4)	Beat-Sync Visual Rule	Foley / SFX & Silence Discipline
Cold Open (0:00–0:05)	Low pulsing synth (110 BPM)	2.18s per bar (0.55s beat)	Snap the 4 sub-second montage cuts to every 2 beats (half-bar) (~1.09s / 0.55s pairs) with 1–2 frame anticipation.	Sharp metallic latch click at 0:00 to lock the opening frame.
Cold Open (0:05–0:30)	Riser → 75 BPM analytical pulse (0:18)	3.20s per bar (0.80s beat)	Trigger \$800B → \$31.6T counter surge on downbeat 1; hard cut to power substation at 0:18 on tempo drop.	Subtle restaurant clatter fading under bass swell; clean drop into 75 BPM.
Act 1 (0:30–3:00)	75 BPM → 90 BPM (1:30)	3.20s → 2.67s per bar	Hold traditional capex vs. AI curve across 4-bar phrases; fire 70% → 93% bar growth on 90 BPM downbeats.	Soft paper-rustle SFX on chart reveal; crisp chapter chime at 1:30; low whoosh on map zoom (2:15).
Act 2 (3:00–6:15)	1.5s SILENCE → 105 BPM → 110 BPM (5:00)	2.29s → 2.18s per bar	Freeze camera motion during the 1.5s silence before "5%"; fire coral hitFx burst on the 105 BPM drop.	Complete audio dropout before "five percent"; UI click/pop SFX on each Spring 2026 pricing badge; metallic coin ping on \$140B.
Act 3 (6:15–8:45)	Lone piano (70 BPM) → 100 BPM (7:30)	3.43s → 2.40s per bar	Use slow push and hold across 8-bar phrases during the 2006 story; snap 1M → 2M → 5M developer nodes to 100 BPM downbeats.	Minimal piano space for voiceover; subtle digital lock-click SFX when CUDA moat closes at 7:30.
Act 4 (8:45–11:00)	1.0s SILENCE → hum → 115 BPM (9:50)	2.09s per bar (9:50+)	Hold PwC 5-factor list during 1.0s silence; snap #1 Electricity highlight and -\$6T fracture bar to 115 BPM downbeats.	Deep electrical hum SFX; 1s silence before "Electricity"; sustained strings into final synthesis.
Binge Outro (11:00–11:25)	Steady 110 BPM	2.18s per bar	Hold end-screen cards steady across 4-bar phrases; hard cut at 11:25 on final downbeat—zero fade-out.	No wind-down SFX or music decay; maintain full energy to the final frame.

5. Pillar 4: Evolving Visual Metaphors and Six-Column Pre-Code Storyboard

To eliminate viewer fatigue and stop the AI from inventing a new visual metaphor for every sentence, each act is anchored to one core visual metaphor that passes the one-second, behavior, and growth tests. Each metaphor follows the Introduce → Develop → Resolve arc by keeping the physical object, camera world, and style constant while shifting one variable, switching to clean data exhibits only when real numbers require proof.

Act-by-Act Single Metaphor Architecture

Before reviewing the shot-by-shot table, the four act metaphors below establish the single continuous visual thread for each chapter.

1. Act 1 Metaphor — The Concrete Shell and Glowing Core (Introduce → Develop → Resolve): A static concrete data-center shell sits beside a single steel railroad track (Introduce: infrastructure that stays finished). Inside the exact same concrete shell, the internal server racks turn coral and swap out every two-year tick while the shell remains unchanged (Develop: silicon rot rising from 70% to 93%). Zooming out, that glowing shell replicates across the US (\$15.1T) and Asia Pacific (\$8.2T) (Resolve: perpetual global churn).
2. Act 2 Metaphor — The Locked Warehouse / Overbooked Grid: A row of server racks glows behind a 99% "RESERVED" barrier (Introduce: tightest real estate on Earth). Stepping inside the exact same aisle, only 5% of the rack LEDs actually blink active while the rest sit dark (Develop: ghost capacity). Those dark idle racks are then tagged with commodity price tickers (tracking the 41% divergence across the Ornn, Silicon Data, and Compute Desk indices, plus the 6.43% → 4.75% borrowing-rate drop on a \$3.6T buildout) and chained to geography (Resolve: trapped like wholesale power, not mobile like oil).
3. Act 3 Metaphor — The Software Tollbooth: A single glowing CUDA gate sits in front of a dark silicon wafer (Introduce: 2006 silence, isolated gate). Five million developer nodes plug into that same gate, turning it into a fortified 40%–50% tollbooth (Develop: ecosystem lock-in driving a \$5T cap and \$215.9B FY26 revenue). Alternate lanes (AMD ROCm at Azure/Oracle and Custom ASICs like Google TPUs) begin routing around the side of the same gate (Resolve: moat under siege).
4. Act 4 Metaphor — The Throttled Power Conduit: A high-voltage conduit feeds a glowing data-center cluster (Introduce: #1 bottleneck is electricity). The conduit dims and throttles in real time (Aurora Virginia) as grid demand spikes (Develop: physical megawatt ceiling). A border wall drops across the supply line—contrasting "sovereign AI" shifts that keep the global pie intact against China's September 2025 CAC ban (affecting ByteDance and Alibaba) and export controls that slice the \$31.6T beam down by \$6T to \$25.5T (Resolve: physical and geopolitical ceiling).

Six-Column Pre-Code Storyboard Blueprint

Feed the following complete blueprint directly to the scene-generation AI. Every 3D label is capped at three words maximum to prevent competition with bottom captions, and every dense chart is assigned a locked hold framing for comprehension.

Beat / Timestamp	Script Segment	Visual Job	Framing	Metaphor / Visual State & Single Changed Variable	On-Screen Label (Max 3 Words)
0:00–0:05	Cold Open: Armored truck delivery (Cisco CIO)	Context + Hook	CU → Med (4-cut, 110 BPM)	Armored truck doors swing open revealing dark server rack LEDs; ticker climbs to \$31.6T.	ARMORED DELIVERY
0:05–0:18	Nobu Palo Alto allocation plea (\$31.6T by 2050)	Character + Proof	Med (RigKit) → Wide	jensen flanked by elon & board at table; transitions to ivory counter \$800B → \$31.6T (amberHi accent).	\$31.6T BY 2050
0:18–0:30	99% leased / empty clusters / real chokepoint	Bridge	Wide → CU	Aerial data center campus hard-cuts to glowing power substation (cyan accent on substation).	REAL CHOKEPOINT
0:30–1:30	Act 1: Past booms (railroads, fiber) vs. AI curve	Metaphor + Proof	Wide → Med (hold)	Static railroad/fiber shell (left) vs. upward AI capex curve (right); sage accent on traditional flat line.	PERPETUAL UPGRADE
1:30–2:15	Ch. 1: The 2-Year Rot (\$800B → \$1.8T, 70% → 93%)	Metaphor (Develop) + Proof	Med (push) → CU (hold)	Same concrete shell: internal racks pulse coral and swap on 2-year clock; PwC bar chart holds 70% → 93%.	2-YEAR ROT
2:15–3:00	US (\$15.1T, 48%) & APAC (\$8.2T) + Loop #2	Context + Loop	Wide (pull)	Same glowing shell multiplies onto split US (48%) and APAC map nodes; coral accent on US share.	US: \$15.1T (48%)
3:00–3:55	Ch. 2: 1% vacancy, 92% precommitted, 5% used	Metaphor (Introduce → Develop)	Wide → CU (hold on silence)	99% locked barrier over server aisle (cyan); camera pushes inside showing only 5% LEDs lit (coral flash on 105 BPM drop).	5% UTILIZATION
3:55–5:00	Spring 2026 metered pricing & \$360B → \$2.3T	Proof	Med (hold)	Locked timeline card: Windsurf → Codex → Anthropic (\$20/seat) → Copilot; H100 rate line \$8 → \$1.96 → \$2.64.	\$360B → \$2.3T
5:00–6:15	\$140B dark value (41% index gap, 6.43% → 4.75%) & Oil vs. Power	Proof + Metaphor (Resolve)	Wide (hold)	BCG breakdown (\$66B–\$97B + \$116B interest); 3-column Oil/Power/Compute grid locks compute to geography (amber accent).	\$140B DARK VALUE
6:15–7:30	Ch. 3: 2006 CUDA silence (\$12B → \$2B–\$3B) & McKinsey	Character + Proof	Med (RigKit) → CU	jensen alone on dark slate stage (coral drop \$12B → \$2B–\$3B); McKinsey stack bar 20–30% / 10–20% / 40–50%.	2006: SILENCE
7:30–8:45	5M devs, >80% share, \$5T cap vs. AMD/ASICs	Metaphor (Develop → Resolve)	Wide → Med (push)	5M engineer nodes lock into CUDA tollbooth (sage accent); AMD ROCm & TPU bypass lanes carve around gate.	>80% MARKET SHARE
8:45–9:50	Ch. 4: PwC 5 Factors (#1 Electricity) & Aurora	Proof + Metaphor (Introduce → Develop)	Med (hold on silence) → Wide	Ranked 5-factor card highlights #1 POWER (amberHi); Aurora Virginia conduit dims and throttles grid load.	#1: ELECTRICITY
9:50–11:00	China CAC ban (-\$6T to \$25.5T) & Synthesis	Metaphor (Resolve) + Synthesis	Wide (pull) → Med	Border wall slices \$31.6T beam down by -\$6T (coral); pulls back to armored truck wired into power tower.	EXPORT CUT: -\$6T
11:00–11:25	High-Note Binge Outro: Who controls power?	Binge Bridge	Wide (hold)	End-screen dual cards; left card frames glowing power substation (cyan echo). Clean cut at 11:25.	WHO CONTROLS POWER?

With the scene blueprint locked, the final step before rendering is running the pre-publish quality checks and feeding the specification to your generation model one act at a time.

6. Pre-Publish QA Gate and Act-by-Act AI Execution

Before exporting the final MP4 from final_recorder.html, run every generated part through four verification checks to ensure the visual structure survives real-world viewing conditions:

1. Silent-Watch Comprehension Check: Scrub the entire 11-minute-25-second timeline with audio muted. Confirm that each scene visibly advances the argument or delivers proof on its own, and cut any decorative shot that repeats the same fact.
2. Grayscale Value Check: Apply a full desaturation pass across sample frames from Cold Open, Acts 1–4, and the Outro. Verify that sage, cyan, amber, and coral elements remain distinct from slate and parchment grounds by lightness value alone.
3. Thumbnail & Silhouette Check: Scale RigKit scenes (0:05–0:18 Nobu table, 6:15–7:30 2006 launch, 7:30–8:45 developer nodes) down to thumbnail size and fill characters solid black to confirm no two cast roles merge or drift in scale.
4. Mobile Brightness & Compression Check: Inspect the encoded MP4 on a phone screen at 50% brightness to verify that ivory (#F4F1EA) text, 3-word 3D labels, and 1–2% film grain hold cleanly without gradient banding or red/green vibration.

Act-by-Act AI Execution Order

To keep a base AI model (such as Claude Sonnet) from dropping constraints or drifting styles across an 11.5-minute video, generate the episode in six separate passes: Cold Open, Act 1, Act 2, Act 3, Act 4, and Binge Outro. For each pass, supply only the locked PAL and RigKit rules from Sections 2–3 alongside that specific act's rows from Sections 4–5, and require the silent-watch and grayscale checks before moving to the next act.
