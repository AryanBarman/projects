# SCENE MAP — what in a script becomes what on screen (jb2). Data: `tools\jb2\recipes_map.json` (used by `new_short.py`), code: `recipes_jb.js`, `stickman.js`, `shim_env_jb.js`

## Phrase -> setup -> acting -> camera (first matching row wins; add rows to the JSON, then here)
| words in the beat | setup (recipe) | acting preset | camera |
|---|---|---|---|
| bank, lent, lend, loan, lender, credit | `SetBank` (bank building + money bags), zoom to the door | `greedy` (rubs hands, dollar-sign eyes) | wide, then zoom in |
| panic, crash, collapse, fear, crunch, warning, default, terrif, exploded, crisis, burning, dark, idle, losing, sitting | none | `panic` (concerned then panic, sweat, recoil on the hit) | face close-up with dutch tilt, pull back |
| realiz, discover, shock, suddenly, loophole, trap | none | `alarm` (red "!" over the head; 3 people) | whip down to a close group shot |
| collateral, secure, backing, lock, pledge | `gpuStack` + `SetLock` (padlock snaps on) | `point` | orbit round it |
| chip, gpu, nvidia, hardware, data center, server | `SetCart` (trolley of GPUs) | `cart` (pushes it, smirks) | swing to it |
| rocket, orbit, space, launch, satellite, blast | `SetLaunch`, then `SpaceMode(true)` + `SetOrbit` (Earth, station, stars) | `explain` | low angle, crane up with it |
| repo, truck, tow, seize, repossess | `SetRepo` (rover drives in) + dashed line + `redX` | `annoyed` (repo man, hard hat) | crane up the line |
| clause, legal, contract, law, rule, agreement | one document `Card` (`nonudge:1`) | `point` | push in |
| how, why, ? | none | `think` (gold "?" over the head) | face |
| billion, cash, money, profit, revenue, invest | `SetVault` (vault door, gold, bags) | `greedy` | face |
| (anything else) | none | `explain` | push |

## Acting presets (`ACTING` in recipes_jb.js; times relative to the preset start): greedy smug love panic alarm think point explain celebrate cart worried annoyed
`Act(role, x, z, hW, preset|{pose,ex,hit,poses}, t0, t1, t, extra)`. Roles: analyst (banker), banker, elon, trump, vance, cheung, reed, kress, compliance, board, bondholder, engineer, factory (hard hat), supply, journalist, trader, employee, spacex.
Expressions (`stickman.js` EX): neutral talk concerned think happy angry shock serious sad laughing smirk scared panic crying determined proud annoyed greedy alarm. Effects: dollar eyes, sweat, tears, vein, shock lines, "?" and "!". Poses: idle talk point think cross cheer wave clap panic hold phone shrug present sit walk run rub carry.

## 3D props (Model(name,x,y,z,size,{ry,tint,emis})), bottom-centre origin
Built in code: bank, vault, moneybag, padlock, trolley, goldbars, rocket (flame option). CC0 GLB (cfg `models`): earth, connector, dish, rover (more in `assets3d`, see ASSETS_3D.md).
## Camera presets: see MOTION_PLAYBOOK.md (ease / fly / whip / roll / punch via cfg).
## Reminders that cost time before
`Card` text: one or two only. A stamp placed over a document needs `nonudge:1` or the label layout pushes it away. `easeIn` exists in assets_jb.js; the page has none. Render portrait stills with `check_short.py` (it uses cdp_p.js). Model `y` is the BOTTOM of the model.
