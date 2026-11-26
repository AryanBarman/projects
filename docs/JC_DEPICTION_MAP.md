# JC DEPICTION MAP: show the VERB, not a label (rule from review 2026-11-26)
An idea is shown by people DOING it with props. Text (stamp/counter/tag) is only allowed for a NUMBER or a NAME that has no visual (e.g. "$118 BILLION", "APRIL 2032"); it never carries the idea. Building labels (BANK, NVIDIA) are fine.
Helpers (tools\jc\assets_jb.js): `courier(role, path, carry, t, opts)` walks a character along keys and shows what they carry; `item(kind,...)` = bag (money) | crate (chips) | paper (contract); `bankHouse`, `rackRow`, `umbrella`, `podium`, `hqTower`.

| narration verb / idea | what the audience SEES |
|---|---|
| buy / purchase | the buyer hands over a money bag, the seller hands over a crate of chips; the buyer walks away carrying the crate |
| sell | seller gives crate, receives bag (same exchange, seen from the seller) |
| borrow / loan | borrower walks to the bank, banker hands a bag over the counter, borrower signs / holds a paper, walks out with the bag |
| lend / guarantee | a second party SIGNS a paper and hands it to the banker BEFORE the banker releases the bag; a shield / umbrella held over the borrower |
| invest | investor hands a bag to the company, receives a paper (share) in return |
| partner / closest partner | two characters walk to the middle and shake hands; a continuous carrier traffic between their buildings |
| unused / reserved capacity | a row of racks, dark; a buyer walks along and each rack lights green as it is reserved |
| earnings call / reveal | a speaker at a podium with a mic, audience taking notes; the news reaction is the audience (hands to head, leaning in) |
| backing $X of projects | a large umbrella / dome held over a row of data centers, the figure written ON the dome |
| rises / falls (price, debt) | the paper chart (see JC_MOTION_RULES) PLUS a character reacting on the same word |
| warning sign / unpaid | stack of invoices piling up in front of a worried person; a tower with a red light |
| pressure closing in | blocks / walls physically sliding toward the character |
| loop / circular dependence | the same bag and crate travel round NVIDIA -> bank -> partner -> NVIDIA with a courier each |

Checklist per beat before building: (1) what is the VERB? (2) who does it to whom? (3) what do they carry? (4) which spoken word is the hand-over moment? (5) which single number/name (if any) needs text?

## 2D BOARD vs 3D SCENE (review 2026-11-26: "buying, selling and investment in 3D was very off")
Use the PATH that explains best, not always 3D.
- TRANSACTIONS (buy/sell, borrow/lend, invest, guarantee, any loop of money / chips / papers between parties) -> 2D BOARD: `boardDiagram` in tools\jc\assets_jb.js, shown as a `Card kind:'paint'` (21 x 13.7) with a presenter character beside it. Nodes (icons: bank, company, nvidia, cloud, chip, bag, coin, paper, racks, cal, shield, hand, eye), arrows that draw on at a spoken-word time, tokens (bag / coin / chip / paper) that travel along them, labels (BORROW, PAY, CHIPS, INVESTS, BUYS, GUARANTEE, LOAN) and number badges ($2 BILLION). Label placement: `lab` +-1.3..1.9 moves the pill off the line; two-way flows use `off` (+) so the two lines separate.
- NUMBERS over time -> paper chart (JC_MOTION_RULES). PLACES / PEOPLE reacting / a speaker / a physical threat (blocks closing in, an umbrella over racks) -> 3D scene.
- No image generator is available in this environment: all 2D icons are drawn procedurally in the canvas (vector, always crisp, free). If real artwork is wanted later, drop PNGs in `characters\` or a new `icons\` folder and draw them with drawImage inside bdIcon.
Spec example (Act 3 part 1, S1): nodes bank / AI companies / NVIDIA; links bank->companies bag "BORROW" at the word "borrowing", companies->NVIDIA coin "PAY" and NVIDIA->companies chip "CHIPS" at "buy".

## CASH ART (2026-11-26: "what are those oval things? cash should look like cash; use 2D art with a 3D look")
Never use the cylinder `itemBag` for money in new work. `cashArt(g, pw, ph, items, t)` in tools\jc\assets_jb.js draws shaded 2D objects on a `Card kind:'paint'`: `cashStack` (bundle of bills with front, side and top faces, band and $), `cashBag` (sack with tie and $), `cashBill` (single note, used for flying bills), `cashFlame` (3-layer flicker + embers). Item options: `k:'stack'|'bag'`, `x,y` (baseline, fractions), `s` size, `n` layers, `t0` pop-in, `burn:[t0,t1]` (flames, pile blackens and shrinks to ash), `out`, `sx` squeeze. Use the same recipe for other 2D-with-depth props (a drawn rack, plant, gold bar): draw the front face, a darker side face and a lighter top face, add a soft shadow, then place it in the scene on a Card.
MOBILE (9:16) SIZES: camera `[C, 5.2, 28]` and cfg `dmin 22 / dmax 40`; characters `hW` 3.1-3.8; cards at most 13 units wide and centred at y 6-8 (safe band y 470-1230 px); props must be readable at 270 px wide thumbnails.
2D-with-depth props added the same way: `rackArt` (server rack, lights switch on with `lit` 0..1) and `plantArt` (power plant: two cooling towers rise with `prog`, a crane, smoke when finished). The short's "tens of billions" scene is a large phone-readable 2D card (building -> thick arrow with money bags -> racks) and "weeks vs years" is a 2D card (rack slides in and lights up in about 1 s; the plant and crane rise slowly while calendar ticks appear).
