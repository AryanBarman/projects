# Jensen Story ("Jensen Back With Crash") — Animation, Storyboard & Visual Sequencing Guide

This document details the visual architecture, animation engine, camera grammar, character rigging, and complete 7-act storyboard/visual sequencing used across the **Jensen Back With Crash** documentary series (`1920×1080`, `30 fps`, deterministic `window.render(t)` pipeline).

> **Scope:** Purely visual production, animation, staging, camera choreography, and scene-to-scene visual sequencing (excluding audio/SFX).

---

## 1. Visual & Rendering Architecture

Every part (`act1_part1` through `act7`) is a self-contained HTML5/WebGL application built on a **dual-canvas 1920×1080 compositing pipeline** driven by a single deterministic time function `window.render(t)`:

1. **Bottom Layer (`<canvas id="gl" width="1920" height="1080">`):**
   * **Three.js (`v0.128.0`) WebGLRenderer** with `PCFSoftShadowMap`, `sRGBEncoding`, `antialias: true`, and `preserveDrawingBuffer: true`.
   * Renders the 3D world: procedural sky dome (`X.sky`), repeating tiled grid floor (`X.floorD` parchment day / `X.floorN` dark night), volumetric/3D props (`Box`, `Cyl`, `RoundedBoxGeometry` with toon ink-edge outlines), 3D line connectors (`Line3`), floating world-space textured cards (`Card` with `CanvasTexture`), and 3D-projected characters.
   * **Mood & Lighting System (`applyMood(t)` / `moodAt(t)`):** Smoothly interpolates fog (`THREE.Fog(col, 45, 135)`), hemisphere light, directional key light, and cyan rim light (`#45b8ac`) between editorial parchment daylight and high-tension dark slate/night scenes.
2. **Top Layer (`<canvas id="c" width="1920" height="1080">`):**
   * **2D Canvas HUD & FX Overlay** composited directly over `#gl`:
     * **Smear / Motion Pass (`smearPass(t)`):** Directional motion trail/smear during fast `fly` camera transitions.
     * **Radial Vignette:** Subtle dark framing (`rgba(11,25,30,0)` to `rgba(11,25,30,0.2)`).
     * **2D Ground & Overlays (`GROUND`, `OVER`):** `hitFx` impact starbursts (expanding ring + radial rays + white flash core projected from 3D world coords via `S(x,y,z)`).
     * **12 fps Procedural Film Grain (`grainPat`):** Deterministic `hash()`-shifted 256×256 tile updated at 12 Hz.
     * **Top-Right Act Progress Rail (`drawRail`):** Segmented amber progress bar (`x: 1560..1824, y: 54`) showing scene progression within the current part.
     * **Chapter Header Banner (`HEADS`):** Top-left editorial title + subtitle card animated via `env(t, start, end)` with colored accent bar.
     * **Bottom Word-Level Captions (`drawCaptions`):** Centered safe-zone subtitle box (`y: 875..1045`, `maxW: 1460`) with per-word highlight coloring (`KEYCOL`).

---

## 2. Editorial Color Palette (`PAL`)

| Token | Hex | Visual Role |
| :--- | :--- | :--- |
| `ivory` / `archivalIvory` | `#F4F1EA` | Primary light text, paper cards, clean highlights |
| `parchment` / `warmParchment` | `#E7E1D3` | Daytime 3D sky, fog, and editorial backdrop |
| `floor` / `editorialFloor` | `#DDD5C5` | Daytime ground plane |
| `ink` / `petrolInk` | `#0B191E` | Deep petrol-ink outlines, dark backdrops, title card base |
| `slate` / `slateWall` | `#12262E` | Nighttime/tension backgrounds, dark card fills |
| `steel` / `steelPanel` | `#1B3540` | Secondary structural panels, server/tower bodies |
| `sage` / `nvidiaSage` | `#76B900` | NVIDIA brand green, positive growth bars, umbrellas |
| `sageHi` / `nvidiaLight` | `#9BE01B` | High-contrast green highlights, rally arrows |
| `amber` / `gildedAmber` | `#D99B26` | Progress rail, money/warning accents |
| `amberHi` / `amberHighlight` | `#EBC16B` | Headline callouts, gold coins, impact flashes |
| `coral` / `terracottaCoral` | `#D94E43` | Drops, debt/rate risk, cracks, red alerts, locked doors |
| `cyan` / `seafoamCyan` | `#45B8AC` | Rim lighting, investigation/government/cloud accents |

---

## 3. Winding 3D Stage & Camera Grammar

### Winding Station Layout (`STN` + `LAYOUT`)
Rather than placing scenes along a straight 1D line, each part uses a **winding multi-axis path** (`mp(x, y, z)`):
* Logical scene stations are spaced every `26` units along X (`c = -26, 0, 26, 52, 78, 104, ...`).
* `LAYOUT` maps each station `k` to an `[ox, oz]` world offset (e.g., `[[0,0], [40,-22], [82,-36], [104,-76], [62,-100], ...]`), causing the camera to turn, bank, and travel diagonally across the 3D floor between scenes.
* Station `-26` (`S0`) is reserved in Parts 2+ as a **Visual Continuity Bridge**, recreating the final visual composition of the previous part before flying into Station `0` (`S1`).

### Shot Grammar (`CAM_KEYS` via `K(t, pos, look, fov, type)`)
Every camera transition uses a Hermite spline with a **Framing Guard** (`DMIN=16`, `DMAX=36`, `YAWMAX=1.05`, `PMIN=0.04`, `PMAX=0.58`) and automatic angle cycling (`ORB_YAW`, `ORB_PIT`, `ORB_DST`) so consecutive shots never repeat identical framing:

* **`fly`**: Fast ~1.1s whip-reposition along the winding path to a new station/topic, triggering `smearPass(t)` motion blur.
* **`hold`**: Locked framing with subtle micro-drift so charts, boards, and text remain crisp and readable.
* **`push`**: Slow zoom/dolly IN (`Dh * 0.6`, `fov - 9`) to emphasize a key number, face, or crisis moment.
* **`pull`**: Slow zoom/dolly OUT (`Dh * 1.7`, `fov + 6`) to reveal broader context, crowds, or systemic scale.
* **`arc`**: Gentle lateral orbit (`yaw ± 0.34 rad`) around a subject during long narrative holds.
* **`FACES`**: Dedicated close-up overrides (`[t0, t1, [x, y, z], side]`) that pull in on a hero character's head/expression.

---

## 4. Hybrid Character System (`RigKit`)

Characters combine **high-detail 2D/3D sprite heads** (`heads_atlas.webp` / `RigKit.loadExtra` / `loadHQ` / `loadPub`) with **procedural capsule-outlined stickman bodies** (2D billboarded into 3D space via `castToScene(t)` or built as `R3` 3D articulated meshes):

* **Cast & Outfits (`OUT`):** Distinct silhouettes and color-coded attire for `jensen` (black leather zip jacket + green NV logo), `elon`, `trump`, `vance`, `cheung`, `reed`, `kress`, `compliance`, `board`, `banker`, `bondholder`, `engineer`, `employee`, `factory`, `supply`, `journalist`, `trader`, `fed`, and `lawmaker`.
* **4 Head Views:** `front`, `q` (3/4), `side`, `back`.
* **7 Expressions (`EXI`):** `neutral`, `talk` (mouth alternates open/closed on beat), `concerned`, `think`, `happy`, `angry`, `shock`.
* **16 Procedural Poses (`POSE`):** `idle`, `talk`, `point`, `think`, `cross`, `cheer`, `wave`, `clap`, `panic`, `hold`, `phone`, `shrug`, `present`, `sit`, `walk`, `run`.
* **Pose Blending (`RigKit.track(t, keys)`):** Smoothly interpolates joint angles (`aR, eR, aL, eL, tR, kR, tL, kL, bob, lean, tilt, sit`) using `backOut` overshoot easing. Also supports HQ sprite overrides (`spr:explain`, `spr:present`, `spr:think`, `spr:overwhelmed`, etc.).
* **Props:** `paper`, `phone`, `laptop`, `mic`, `camera`, `case`, `folder`, `clipboard`, `gavel`, `flag`, `sign`, `coffee`.

---

## 5. Reusable 3D & 2D-in-3D Visual Modules

* **Data & Cash Visualizations:**
  * `cashChart` / `stepChart`: Paper-styled line/step chart inside a 3D `Card` paired with a live-height `cashStack` (`n` layers rising/falling with the chart value), `cashBag`s, `cashBurst` flying bills, and red/green `pill` stamps.
  * `cashArt`: Stackable 3D-shaded bill bundles and money bags with `burn` (animated 3-layer flame + ash pile) and `out` states.
* **Architectural & Institutional Sets:**
  * `hqTower`: Dark steel NVIDIA skyscraper with green band, lit window grid, and `NVIDIA` rooftop label.
  * `brokenTower`: 8-floor NVIDIA tower that receives progressive red jagged cracks (`Line3`), then collapses floor-by-floor from top to bottom with tilting and debris cubes.
  * `fabSite`: Chip manufacturing complex with yellow construction crane.
  * `rackArt` & `plantArt`: 3D-shaded server racks with animated green LEDs and cooling-tower power plants with rising steam.
  * `capitol` & `whiteHouse`: Modular 3D Washington landmarks with columns, dome, and flag.
  * `boardWall` + `table` + `seats`: Corporate boardroom with `NVIDIA BOARD` header.
* **Metaphor & Risk Props:**
  * `door` + `doorCard`: Locked wooden doors paired with floating icon cards (`debt` = chained money bag, `rate` = needle gauge, `probe` = magnifier over document).
  * `network`: Star topology of green/red nodes connected by `Line3` links that snap and drift outward on `breakAt`.
  * `ship`, `waves`, `rain`, `stormCloud`: 3D metaphor set for the Act 7 storm-at-sea sequence.

---

## 6. Master Assembly & Inter-Act Transitions (`final_recorder.html`)

When assembling all 12 parts into `act1.mp4`–`act7.mp4` and `full_video.mp4`, `final_recorder.html` enforces a uniform visual rhythm:

* **Part Tail Hold (`TAIL = 0.35s`):** Each part continues rendering subtle motion for `0.35s` past its end timestamp so cuts never land on a dead frozen frame.
* **Intra-Act Transitions (`XFADE = 0.45s`):** Between Part 1 and Part 2 of the same act, the compositor cross-fades (`ease(t / 0.45)`) from the frozen snapshot of Part 1's `S_last` directly into Part 2's `S0` (which mirrors the exact same scene), creating a seamless continuous camera handoff.
* **Inter-Act Transitions (`0.5s` Fade + `2.4s` Title Card):**
  1. Last frame of the finishing act fades to `#0B191E` over `0.5s`.
  2. **Act Title Card (`CARD = 2.4s`):** Radial slate-to-ink glow, animated horizontal accent bar (`760px` wide) in the act's signature color, `ACT N` eyebrow sliding up, bold `ACT TITLE` (`84px`), and subtitle (`32px`), fading out at `p = 0.82..1.0`.
  3. First frame of the next act fades in from `#0B191E` over `0.5s`.

---

## 7. Complete Storyboard & Visual Sequencing (Acts 1–7)

### ACT 1 — *THE COMEBACK* (`#EBC16B`)

#### Part 1: `act1_part1_the_comeback_crash-3d.html` (`24.68s`)
* **S1 (`0.00–7.00s`) — The Comeback:**
  * *Camera:* `fly` to `[0, 6, 26]` → `push` on Jensen → `pull` to reveal tower.
  * *Visuals:* `hqTower` rises (`0.4–2.0s`). Jensen (`-7.4, 3.4`) stands left in `spr:explain` → `spr:present`; engineer & employee cheer on the right. Tag `SUPPOSED TO SAVE NVIDIA` (`1.4–4.4s`), then gold counter card `$4 TRILLION` pops at `4.7s` with an amber `hitFx` burst (`4.78s`).
* **S2 (`7.10–15.10s`) — The Bounce & Slide:**
  * *Camera:* `fly` to Station `26`, `push` on chart peak, `pull` on slide.
  * *Visuals:* Wide `cashChart` (`NVIDIA STOCK`) animates up to `+31.5%` (`8.3–9.4s`) while two traders `cheer` and Jensen explains. At `11.0s`, chart drops, bills burst out (`cashBurst`), traders switch to `panic`, Jensen switches to `spr:think`, and red pill `BILLIONS GONE` stamps at `13.83s`.
* **S3 (`15.20–24.68s`) — Three Locked Doors:**
  * *Camera:* `fly` to Station `52`, `hold` wide.
  * *Visuals:* Wall with three locked doors (`43.4`, `52`, `60.6`). Jensen stands center (`spr:explain` → `spr:overwhelmed` → `spr:think`), flanked by `bondholder` (`cross` → `panic`) and `lawmaker` (`cross` → `point`). Three `doorCard` icons pop sequentially with `hitFx`: `DEBT` (`19.58s`), `RATE HIKE` (`21.77s`), `INVESTIGATION` (`23.24s`).

#### Part 2: `act1_part2_eleven_days-3d.html` (`54.72s`)
* **S0 (`0.00–3.90s`) — Continuity Bridge (`-26`):** Holds the 3-locked-doors & Jensen tableau from Part 1 S3, then `pull`s back before flying.
* **S1 (`3.90–11.90s`) — 11 Days of Chaos (`0`):** `brokenTower` cracks and crumbles floor-by-floor as NVIDIA's founder steps down; `push` + `arc` around the collapsing tower.
* **S2 (`12.00–29.20s`) — The Board Brings Him Back (`26`):** Boardroom set (`boardWall`, `table`, `seats`). Jensen returns (`+31.5%` rally graphic, nearly `$1T` restored); camera alternates `push` on the board/chart and `pull` to the cheering room.
* **S3 (`29.50–40.40s`) — Then the Fall (`52`):** Chart reverses across two days: `-6%` Tuesday, `-4%` Wednesday; tens of billions wiped out with red `hitFx` and `pull`/`push` beats.
* **S4 (`40.40–46.80s`) — Why Sell? (`78`):** `arc` + `push` on institutional investors cheering Monday then selling two days later.
* **S5 (`47.00–54.72s`) — Follow the Money (`104`):** `fly` to final station; money trail leads into a `THE SIMPLE MATH` visual bridge.

---

### ACT 2 — *THE BASIC MATH* (`#9BE01B`)

#### Part 1: `act2_part1_the_basic_math-3d.html` (`45.30s`)
* **S0 (`0.00–5.30s`) — Continuity Bridge (`-26`):** Holds the Act 1 Part 2 money-trail-to-math visual.
* **S1 (`5.30–15.50s`) — The 47% Drop (`0`):** October high to November exit; chart drops `>47%` (nearly cut in half) with `push` on the drop and `pull` on the full scale.
* **S2 (`15.50–23.80s`) — Still 30% Down (`26`):** Even after Monday's `+31.5%` bounce, a reference line shows the stock still `>30%` below its record high.
* **S3 (`24.00–36.00s`) — The $100 → $53 → $70 Math (`52`):** Interactive `cashChart`/bar comparison: `$100` drops to `$53`; a `+31%` bounce only reaches `~$70` (`push` on `$53`, `pull`, then `push` on `$70`).
* **S4 (`36.00–45.30s`) — Beat Expectations, Still Fell (`78`):** Sales and profit beat bars stand tall, yet the stock line fails to hold its gain.

#### Part 2: `act2_part2_the_first_warning-3d.html` (`34.10s`)
* **S0 (`0.00–3.90s`) — Continuity Bridge (`-26`):** Holds the sales/profit beat vs. falling stock tableau from Part 1 S4.
* **S1 (`3.90–13.40s`) — Worth Trillions (`0`):** Trillion-dollar scale visual showing chip sales alone are no longer enough; Tuesday morning investor realization.
* **S2 (`13.70–24.40s`) — The Leadership Fix (`26`):** Jensen's return solves the leadership box, while three giant money/government problem blocks close in around it (`pull` → `push`).
* **S3 (`24.60–34.10s`) — The First Warning Sign (`52`):** `arc` + `push` from the calm stock chart over to a stack of `UNPAID BILLS` beside a partner's tower.

---

### ACT 3 — *FOLLOW THE MONEY* (`#45B8AC`)

#### Part 1: `act3_part1_meet_coreweave-3d.html` (`48.00s`)
* **S0 (`0.00–3.40s`) — Continuity Bridge (`-26`):** Calm paper chart, `UNPAID BILLS` stack, and partner tower from Act 2 Part 2.
* **S1 (`3.40–10.80s`) — Watch the Borrowers (`0`):** Flow board: `BANK` lends to `AI COMPANIES` → cash flows to `NVIDIA` → chips flow back.
* **S2 (`11.00–21.60s`) — Meet CoreWeave (`26`):** CoreWeave node appears and scales up; a handshake emblem locks between CoreWeave and NVIDIA as chip shipments connect them.
* **S3 (`21.70–31.00s`) — More Than a Customer (`52`):** Board diagram: `$2 BILLION` NVIDIA equity stake into CoreWeave + commitment to buy unused compute through `April 2032`.
* **S4 (`31.00–40.60s`) — The $118B Backstop (`78`):** 3D podium speaker + seated analysts; a giant green umbrella opens over `rackArt` server racks, and the rack LEDs illuminate sequentially.
* **S5 (`41.00–48.00s`) — The Guarantee Loop (`104`):** Circular board: NVIDIA `GUARANTEE` → `BANK LENDS` → `PARTNER PAYS NVIDIA` → `CHIPS`.

#### Part 2: `act3_part2_the_price_of_borrowing-3d.html` (`77.90s`)
* **S0 (`0.00–5.00s`) — Continuity Bridge (`-26`):** Act 3 Part 1 guarantee loop board, now explicitly labeled `CoreWeave`.
* **S1 (`5.00–17.90s`) — Bond Dump (`0`):** `cashChart` tracks CoreWeave debt: rises Monday with NVIDIA, then lenders dump it Tuesday/Wednesday to record lows (`75–77 cents` on the dollar).
* **S2 (`18.20–25.70s`) — 18% Yield (`26`):** 2031 bond document drives an interest-rate needle/counter up to `~18%`.
* **S3 (`26.00–34.90s`) — 18% vs. 4% (`52`):** Paper bar comparison contrasting `~18%` CoreWeave borrowing cost against `~4%` safe U.S. government Treasuries.
* **S4 (`35.00–44.90s`) — Lenders Are Worried (`78`):** 3D lenders demand `18%`; even as the green NVIDIA umbrella opens over CoreWeave, lenders remain in `panic`/shouting poses.
* **S5 (`45.00–51.90s`) — $5B Cash Need (`104`):** 3D `cashBag`s stack one-by-one beside CoreWeave's tower up to `$5 BILLION`, stamped with a `2027` calendar tag.
* **S6 (`52.00–61.80s`) — The Big Question (`130`):** Board flow questioning how debt-heavy AI buyers sustain tens of billions in chip purchases at `18%` interest.
* **S7 (`62.00–68.60s`) — The $118B Risk (`156`):** 3D green `$118B` umbrella over `rackArt` racks folds shut when partner cash runs out, exposing the racks to rain.
* **S8 (`69.00–77.90s`) — The Inflation Report (`182`):** Board diagram: Government → `INFLATION REPORT` → `BORROWING COST` gauge spikes higher.

---

### ACT 4 — *THE BROKEN PROMISE* (`#D94E43`)

#### Part 1: `act4_part1_the_promise_hit-3d.html` (`41.70s`)
* **S0 (`0.00–1.80s`) — Continuity Bridge (`-26`):** Holds Act 3 Part 2's inflation-to-borrowing-cost board; the gauge needle swings back down to illustrate 3 years of cheap money.
* **S1 (`1.60–11.30s`) — The Promise Behind the Boom (`0`):** Paper chart shows 3 years of falling rates + dashed "promise" projection; a `cashBag` drops and giant data centers (`rackArt`/`plantArt`) rise.
* **S2 (`11.30–17.90s`) — Wednesday, Nov 25, 2026 (`26`):** Calendar locks onto `Nov 25, 2026`; the "Rates Keep Falling" promise document tears in half (`17.30s`).
* **S3 (`18.00–34.90s`) — The New Numbers (`52`):** Three bold metric tiles animate in: Overall Inflation `3.8%`, Core Inflation `3.3%` (3-year high), Economy Growth `4.3%`.
* **S4 (`35.00–41.70s`) — Fed Business Survey (`78`):** 3D retail/business shelf where price tags physically climb upward alongside a Federal Reserve survey card.

#### Part 2: `act4_part2_the_rate_hike-3d.html` (`38.10s`)
* **S0 (`0.00–1.60s`) — Continuity Bridge (`-26`):** Fed survey + climbing price-tag shelf + worried business owners from Part 1 S4.
* **S1 (`1.60–15.00s`) — Rate Cut → Rate Hike (`0`):** Green "Rate Cut" arrow for tech stocks is crossed out; a red "Rate Hike" arrow grows instead; December calendar circles `Dec 8` and `Dec 9`.
* **S2 (`15.00–31.80s`) — Chain Reaction (`26`):** Step-by-step board arrows: Central Bank Raises Rates → Borrowing More Expensive → Squeezes CoreWeave → Raises Big Tech Costs → Tech Stocks Less Attractive.
* **S3 (`32.00–38.10s`) — A Bigger December Problem (`52`):** December calendar + Jensen thinking; a locked door with a red alert badge slides in (`35.16s`).

---

### ACT 5 — *WASHINGTON ASKS QUESTIONS* (`#EBC16B`)

#### Part 1: `act5_part1_washington_questions-3d.html` (`29.50s`)
* **S0 (`0.00–2.60s`) — Continuity Bridge (`-26`):** December calendar, red-alert locked door, and Jensen thinking from Act 4 Part 2.
* **S1 (`2.60–8.00s`) — Meanwhile in Washington (`0`):** 3D `capitol` dome rises; three `lawmaker` characters walk in, line up, and question marks pop above each head.
* **S2 (`8.00–16.00s`) — Many Assumed It Was Over (`26`):** Jensen walks in and the board cheers; a storm cloud clears to a green checkmark (`13.80s`), then the checkmark is struck out and the storm cloud returns (`15.50s`).
* **S3 (`16.00–19.20s`) — Hours Later (`52`):** Spinning clock face transitions into an official press-release document.
* **S4 (`19.30–29.50s`) — Three House Committees (`78`):** Leaders of `FOREIGN AFFAIRS`, `INTELLIGENCE`, and `CHINA` committees appear sequentially behind desks as a warning letter types out on screen.

#### Part 2: `act5_part2_the_schedule-3d.html` (`50.90s`)
* **S0 (`0.00–1.40s`) — Continuity Bridge (`-26`):** Three committee leaders behind desks + warning letter from Part 1 S4.
* **S1 (`1.40–19.00s`) — First Week of December (`0`):** Interactive planner populates row-by-row: `Dec 1` closed-door House committee questioning → `Dec 2` NVIDIA's top lawyer → `Dec 3` live-streamed Senate Banking Committee public hearing.
* **S2 (`19.40–25.30s`) — Export Rules (`26`):** Board highlighting U.S. export rules and protecting America's AI lead.
* **S3 (`25.70–34.90s`) — Bipartisan Chip-Routing Probe (`52`):** Board showing bipartisan lawmakers tracing how advanced chips allegedly reached China and military applications.
* **S4 (`35.00–37.90s`) — SEC Accounting Review (`78`):** Board callout for a reported SEC review of NVIDIA's accounting.
* **S5 (`38.00–44.90s`) — Board Independence (`104`):** 3D + arrow card (`OUT → BACK`) with an `11 DAYS` counter questioning board independence.
* **S6 (`45.00–50.90s`) — Refusing to Chase (`130`):** Paper chart of Monday's `+31.5%` spike while big institutional investors physically turn and walk away from the chart.

---

### ACT 6 — *THE MONEY SYSTEM* (`#45B8AC`)

#### Single Part: `act6_the_money_system-3d.html` (`54.40s`)
* **S0 (`0.00–1.80s`) — Continuity Bridge (`-26`):** Act 5 Part 2's Monday jump chart with investors walking away.
* **S1 (`1.80–12.00s`) — Real Demand Still Massive (`0`):** 3D `fabSite` stands center while a long queue of buyers holding `cashBag`s grows one-by-one.
* **S2 (`12.00–18.30s`) — Fundamentals Intact (`26`):** Three tall paper bars (`SALES`, `PROFITS`, `TECH LEAD`) rise sequentially and hold steady.
* **S3 (`18.40–27.60s`) — The Money System (`52`):** Board diagram (`Lenders → AI Buyers → NVIDIA`) paired with a climbing rocket showing 2 years of unstoppable investor sentiment.
* **S4 (`27.60–45.60s`) — Three Roadblocks at Once (`78`):** Three simultaneous obstacles converge: `18%` Lenders, `Dec 8` Central Bank rate hike, and `Congress` public export spotlight.
* **S5 (`45.60–54.40s`) — Priced for Perfection (`104`):** Paper chart held at peak altitude; a small crack appears in credit/rules (`50.37s`), triggering a sharp vertical sell-off (`53.13s`) as investors panic.

---

### ACT 7 — *THE VERDICT* (`#9BE01B`)

#### Single Part: `act7_the_verdict-3d.html` (`34.10s`)
* **S0 (`0.00–1.80s`) — Continuity Bridge (`-26`):** Act 6's priced-for-perfection crack, fast selling, and panicking investors.
* **S1 (`2.00–12.00s`) — Where We Started (`0`):** Jensen walks back into NVIDIA's `hqTower` while engineers cheer and a green `+31.5%` rally arrow rises (`7.12s`); quick "what if" contrast shows the tower crumbling without its founder (`10.43s`).
* **S2 (`12.20–27.50s`) — Captain at the Wheel (`26`):** 3D ocean metaphor (`waves`, `ship`, `rain`, `stormCloud`) at wide crane distance (`[26, 7, 44]`). Jensen stands at the ship's wheel while three labeled storm clouds roll in sequentially:
  1. `Dec 1 & 3` Washington Questioning (`19.24s`)
  2. `CoreWeave` Loan Troubles (`22.16s`)
  3. `Dec 8` Fed Rate Decision (`24.56s`)
* **S3 (`27.60–34.10s`) — The Next Two Weeks (`52`):** Dual-path forecast chart splits into a green growth curve and a red downturn curve; as money gets expensive (`31.91s`) and rules get tighter (`33.21s`), two 3D walls slide inward to frame the final verdict.
