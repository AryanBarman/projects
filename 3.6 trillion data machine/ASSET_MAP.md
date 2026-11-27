# Asset & Character Mapping Registry (`3.6 trillion data machine`)

Central registry of all reusable 3D props, environment sets, character rigs, and helper functions so any part can retrieve them without duplication.

## 1. 3D Props & Hardware
| Asset ID | Location / Builder | Description |
| :--- | :--- | :--- |
| `armoredTruck(x, y, z, openU, boltU)` | `cold_open-3d.html` | Multi-part armored vault truck: chassis, cab, hood, grille, headlights, 4 dual wheels, side livery, roof AC, retracting locking bolts, swinging rear vault doors with lock wheel. |
| `goldBullionStack(x, y, z, a)` | `cold_open-3d.html` | Layered metallic gold ingots (`#EBC16B`) with bevelled trim + `GOLD` label card. |
| `cashBundleStack(x, y, z, a)` | `cold_open-3d.html` | Multi-tier banknote bundles with currency bands + `$100` / `CASH` label card. |
| `gpuModule(x, y, z, sc, t, dieCol, fanSpeed)` | `cold_open-3d.html` | NVIDIA AI GPU module: PCB, gold PCIe fingers, shroud, emissive silicon die, heatsink fins, spinning fan. |
| `dataCenterCampus(cx, cz, t, activeRatio)` | `cold_open-3d.html` | Full AI data center complex: main server halls, grounded `NVIDIA AI DATA CENTER` sign, 3D hyperbolic cooling towers with rising 3D steam puffs, perimeter fence, service truck & access road. |
| `Card(..., { strikeAt })` | `cold_open-3d.html` | Reusable cross-out template: paints animated `coral` (`#D94E43`) X-slash directly on top of any `tag`/`stamp` card at `t >= strikeAt`. |
| `sprite2D(img, x, y, z, w, h, t0, t1, t, facing)` | `cold_open-3d.html` | Depth-tested 3D billboard helper for high-res transparent character sprites anchored at `y = 0`. |
| `clockDial(x, y, z, sz, prog, label, t0, t1, t)` | `cold_open-3d.html` | Reusable animated clock micro-prop (`0° → 360°` sweep + bottom badge). |
| `sushiProp(x, y, z, nPlates)` | `cold_open-3d.html` | Reusable stacked sushi plates + nigiri + chopsticks micro-prop. |

## 2. Characters & Sprites
| Character ID | Type | Seed / Source |
| :--- | :--- | :--- |
| `officer` (Cisco CIO / Inspector) | High-res 2D transparent sprite (`384×512` WebP) | `characters/officer.png` (generated via `image-generator`, embedded as `OFFICER_IMG`) |
| `jensen`, `ellison`, `elon` | High-res 2D transparent sprites (`512px` WebP) | `characters/jensen.png`, `characters/ellison.png`, `characters/elon.png` (embedded as `JENSEN_IMG`, `ELLISON_IMG`, `ELON_IMG`) |
