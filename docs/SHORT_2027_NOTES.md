# Short: The 2027 AI Cash Crunch Warning (`shorts2\short_2027_cash_crunch.html`)

Written 2026-11-26. Built from `shorts\The 2027 AI Cash Crunch Warning.srt` + `.wav` (`39.32 s`, `1080x1920` 9:16 portrait) using `tools\jb\build_short_2027.py` on top of the `shorts2\short44_story.html` (`jb2`) 3D engine.

## 1. What Was Built & Upgraded Over `short44_story.html`
1. **Custom 3D Procedural Setups (added in `Story.REG`):**
   - `SetCrunch2027`: `2027` monolith with a pulsing red warning beacon.
   - `SetServerRack`: 3D server rack with animated cyan/blue LEDs paired with the `SetRepo` delivery truck arriving in **weeks**.
   - `SetPowerPlant`: Dual cooling towers + construction crane slowly rising to contrast **years** of build time.
   - `SetDataCenter`: Massive dark billion-dollar data center with blacked-out windows and a flickering red emergency strip.
   - `FireBurn`: Animated rising red/orange/amber ember cubes + `Coins` falling into the fire pit (`burning cash` / `$0 REVENUE`).
2. **Sentence-by-Sentence Emotional Acting (`ACTING` presets + `RigKit`):**
   - `0.0-6.4s`: Elon (`alarm` → `point`) + panicked engineer (`panic`) + shrinking cash/coins.
   - `6.5-11.4s`: Analyst (`think` → `alarm`) + greedy engineer (`greedy`) around 8-GPU stack → `RedX` + `"THAT'S BACKWARDS"` Band flash.
   - `11.5-17.2s`: Banker (`greedy`) + engineer (`cart`) + `SetBank` + `SetCart` + `Coins` arc (`TENS OF BILLIONS`).
   - `17.0-21.8s`: Split world (`WEEKS` server rack vs `YEARS` power plant) + `annoyed` engineer.
   - `21.6-31.3s`: `SetDataCenter` + `FireBurn` + `bondholder` (`panic`) + `analyst` (`worried`) + `$0 REVENUE` counter & `SITTING DARK` doc.
   - `31.0-39.32s`: `"THE COST OF DELAY"` Band flash + `SetVault` + Elon (`point`) + analyst (`alarm`) + `$100B+ COST` counter + `2027 CRUNCH` doc.
3. **Camera Choreography (Zoom-In / Zoom-Out / Whip / Fly / Loop):**
   - 23 `K(...)` keys alternating between wide world reveals (`dist = 19.5–22.0`), tight emotional close-ups (`dist = 8.8–9.5` with subtle Dutch `roll`), `whip` pans on beat turns, `fly` crane moves between stations, and a seamless loop back to `[0.4, 3.4, 3.0]` at `38.90–39.32s`.
4. **Mood & Lighting Shifts (`MOOD_TRACK`):**
   - `day` → `tense` (bottleneck) → `warm` (upfront billions) → `day` (weeks vs years) → `night` (dark data centers) → `dusk` (cost of delay) → `tense`.
5. **Monetization-Safe Audio Mix (`shorts2\audio\short_2027_mix.wav`):**
   - Narration `.wav` + 100% original synthesized D-minor BGM bed (`jen_back\sfx\bgm_bed.wav`, `volume=0.26`) + CC0 Openverse SFX (`mega_boom`, `stamp_impact`, `whoosh`, `gold_stack`, `industrial_beat`, `ratchet_rise`, `swell_boom`).

## 2. How to Rebuild / Re-Export
```powershell
cd "C:\Users\User\Documents\Content\What If Elon Musk Hires Jensen Huang\html\tools\jb"
python build_short_2027.py
cd ..
node export_video.js "..\shorts2\short_2027_cash_crunch.html" "..\shorts2\short_2027_cash_crunch.mp4" --dur 39.32 --w 1080 --h 1920 --wav "..\shorts2\audio\short_2027_mix.wav" --workers 2
```

## 3. What Worked & What to Watch For (Review Notes)
- **What worked:** Declarative `SPEC` + custom `Story.REG` procedural setups (`SetDataCenter`, `FireBurn`, `SetServerRack`, `SetPowerPlant`) let us match every SRT sentence with zero external GLB downloads.
- **What to check on playback:**
  - Verify `SetPowerPlant` vs `SetServerRack` framing at `17.5–21.2s` on a phone screen (check that `WEEKS` and `YEARS` counters don't overlap the top headline or bottom caption box).
  - Verify `FireBurn` particle density and `$0 REVENUE` / `SITTING DARK` card spacing at `22.8–28.4s`.
  - Note: `short_2027_cash_crunch.html` uses the existing `RigKit` hybrid characters (not the `hq_sheets` 4-frame Jensen sprite sheets yet).

## 2026-11-26 REPLACEMENT (story-file version)
The notes above describe a hand-built page that is not reproducible here (its build script and audio mix are not in the repo, and its recipe names differ from the file). The rebuildable version is `tools/jb2/stories/s2027.story.json` (6 beats, 3 text cards, characters in every beat, room kits: trading/office/street/hallway/trading/stage). Rebuild: `python tools/jb2/check_short.py s2027` -> `shorts2/s2027.html`; export: `python tools/jb2/make_video.py s2027` (not run).
Known: night section does not look dark (mood `night` barely affects room colours); motivation.py still prints 2 DEAD flags; end loop frame is a whip landing. No card-cap check or colour pass built yet.
