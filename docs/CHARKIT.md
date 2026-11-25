# CHARKIT — hybrid character kit for the jen_back series (Acts 1-7 "Jensen comes back")

Files in `tools\charkit\`: `cut_heads.py` (head sheet -> `heads_atlas.webp/.json`), `rigkit.js` (the rig), `patch_rig.py` (embeds rig + atlas into a built page), `demo.html` (test sheet: `chrome --headless=new --allow-file-access-from-files --screenshot=... demo.html?t=2.1`).
Sources: `jen_back\characters\heads\...Head Turn Sheets.png` (heads only are cut; low-res 1536x1024), `full body` and `clothes` sheets were used as the palette/outfit reference (procedural bodies, not cut).

## How it works
- HEAD = sprite from the atlas: 16 characters x (6 views: front, 3/4 L, L, back, R, 3/4 R) + (6 expressions). Expressions map to names: neutral talk concerned think happy angry shock (table `EX` in rigkit.js).
- BODY = procedural stickman (torso, 2-segment arms, 2-segment legs, hands, shoes) with outline, outfit per role (suit+tie, leather jacket+logo, hi-vis vest, lanyard badge, pinstripe...). Colours from the clothing sheet.
- Same API as the old cast: `Char(role, x, z, hW, opts, t0, t1, t)` in scene files. Old opts still work (`walkAmt` -> walk, `armAngleR<-1.2` -> point, `browTension>0.7` -> think/concerned, `talk>0.5` -> talk + mouth swap).
- New opts: `pose` (idle talk point think cross cheer clap panic hold phone shrug present sit walk run wave), `from`+`blend` (0..1, smooth pose-to-pose blend), `expr`, `view` (front|q|side|back), `prop` (paper phone laptop mic camera case folder clipboard gavel flag sign; `propText` for sign), `hand:'L'`, `jacket` (colour override for crowd variety), `shadow:0`, `alpha`, `sit`, `headScale`.
- Roles: jensen elon trump vance cheung reed kress compliance board banker bondholder engineer employee spacex factory supply journalist trader; aliases analyst host lawyer public cfo senator president vp staff official investor worker reporter. `RigKit.crowdRole(i)` cycles a crowd mix.

## Individual sheets (added) — `cut_individual.py`
From `jen_back\characters\individual character sheets` (8 characters: jensen kress trump elon vance reed board cheung):
- `heads_expr10.webp` — 10 detailed expression heads each (front view). Used automatically for these 8 when `view` is front; names: neutral confident thinking concerned surprised speaking determined ... (per character in `sprites_meta.json`). `expr:'talk'|'happy'|'angry'|'think'|'shock'|'concerned'` are mapped to the nearest real expression; or pass the exact name (`expr:'smirk'`).
- `poses_atlas.webp` — 58 hand-drawn key-pose sprites (native size). Use `pose:'spr:point'` (names: podium explain point think cross walk present tablet document rally negotiate discuss raised statement call meeting; each character has its own subset: `RigKit.sprPoses(role)`). Sprites get breathing/bob/walk-bounce and facing flip. They look better than the drawn bodies, so use them for hero shots of the 8 main characters; the drawn rig stays for everything else (crowds, generic roles, poses without a sprite: cheer, panic, phone, sit...). Not auto-switched, to avoid visible pops when a character changes between sprite and rig; blend by cutting on a camera move.
- Missing/failed cuts: Kress `present` (chart board touches the panel frame) and Board `tablet`/`present` were not detected; `cut_individual.py --expr-only` reruns just the expressions (the full pose sweep takes ~5 min).
- `patch_rig.py` now embeds both atlases (page grows about 1.3 MB).

## Use
`python tools\charkit\patch_rig.py <new_page.html>` (new files only). It is idempotent and hooks `drawSpriteChar` (or `drawCast`). Verified on a copy of `act7_full_conclusion-3d.html`: rig drawn inside the 3D scene, old opts mapped, no console errors.

## Known limits (honest)
- Heads are cut from a 1536x1024 sheet (about 55 px each, upscaled): slightly soft at close range. Higher-res head sheets would drop in by re-running `cut_heads.py` (grid constants at its top).
- Expression sprites exist for the front view only; 3/4 and side views have no mouth movement. Default view is front, side while walking.
- Front-view arms/legs are drawn in the screen plane (no foreshortening). Walk looks right in side view only.
- Heads/views not cut for: Employee, SpaceX engineer (they reuse the engineer / supply head).
- Not tested: live playback, GPU speed; only stills.
