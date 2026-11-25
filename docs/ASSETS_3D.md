# 3D ASSETS (jb2, 2026-11-25): free models we use, models we build, and how to add more

## Used now
| name in cfg | file | where it comes from | used for |
|---|---|---|---|
| `earth` | `Planet-B7xd3SZq0z.glb` | Quaternius Ultimate Space Kit (CC0) | the Earth limb under the orbiting data center |
| `connector` | `Connector.glb` | same kit | the module of the orbital data center |
| `dish` | `Roof_Radar.glb` | same kit | the satellite dish |
| `rover` | `Rover.glb` | same kit | the repo truck (a six-wheeled lunar truck; tinted off-white) |
| (`Solar_Panel.glb`) | same kit | not used: it is a ground-mounted panel (edge-on it looks like a frame), so the wings are built from boxes |
| `rocket` | built in code | ours (`PROC.rocket` in `shim_env_jb.js`) | the launch: lathe body, nose, bands, window, 3 fins, nozzle, animated flame |
Source and licence: https://opengameart.org/content/ultimate-space-kit-by-quaternius (licence field "CC0"; direct file https://opengameart.org/sites/default/files/ultimate_space_kit-glb.zip). Downloaded to `assets3d\quaternius_ultimate_space_kit\` (zip + 32 extracted GLBs, data only, nothing executed). CC0 needs no credit, but the author is Quaternius. Note: a Sketchfab mirror of the same kit lists "Attribution" in its licence field, so keep using the OpenGameArt copy and re-check before commercial release.
Also in that kit (seen on a contact sheet, not yet used): astronauts (animal heads), geodesic dome, base, planets (7 more), crates, spaceships (fighters, not rockets), solar structures, antenna. Viewer: `tools\jb2\model_viewer.html` + `pack_models.py` (renders every packed model on one sheet).

## How to use a model in a scene
1. Cfg (`mk_<id>.py`): `'models': {'name': 'assets3d/<pack>/glb/<File>.glb'}`. The build embeds the files (base64) and the GLTFLoader (three r128 from unpkg) and the page waits for them before READY.
2. Scene: `Model('name', x, y, z, size, {ry, rx, rz, tint:'#hex', a, emis, flame})`. `size` = largest dimension in world units, origin = BOTTOM-centre (so `y` is the bottom, not the centre: a sphere of size 26 centred at y=0 needs y=-13). It returns the instance (null while loading) and is pooled per frame like boxes.
3. Procedural models: add a function to `PROC` in `shim_env_jb.js` returning `{ obj, size, raw:true }`.
4. Space beats: `X.sets.forEach(g => g.visible = false); X.ground.visible = false; X.env.visible = false; X.stars.visible = true;` (the scene does this per frame, see `s44_scene.js`), plus the `night` mood.

## Honest limits and what to look for next
- Tested on one short; models look right in stills (Earth, station, rover, rocket). Not played. Page size grew from about 150 KB to about 1.1 MB (embedded GLBs).
- Models are flat-shaded low poly, no outline (the stage props have one); they sit well with the flat look, but a hull outline could be added.
- No ready-made rocket in the kit; no truck as GLB: the CC0 trucks found on OpenGameArt (`18 Wheeler`, `FSTruck-001`, `Space Truck`) are `.blend` files and need Blender to convert (not installed). Kenney's site blocked scripted downloads (HTTP 403); Poly Pizza licences are mixed (CC-BY and CC0 per model): check each model page.
- Next candidates if needed: server racks / data center, bank building, tow truck, gavel, document stack. Search CC0 packs first (Quaternius, Kenney via OpenGameArt), then build with `PROC` (lathe, extrude, cylinders).
