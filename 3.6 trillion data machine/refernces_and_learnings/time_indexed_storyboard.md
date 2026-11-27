Time-Indexed Storyboard: The $31.6 Trillion AI Compute Trap
This storyboard converts all ten recorded audio parts---from the cold
open through Act 4 Part 2---plus the written script's High-Note Binge
Outro into a frame-ready production sequence.

Because subtitle files could not be uploaded directly, every scene uses
estimated relative timestamps calibrated at 150 words per minute (2.5
words per second), starting at 0.00s for each audio file. Each scene
is paired with a verbatim spoken anchor phrase so a downstream timing
agent can snap every cut, camera move, and hitFx burst directly to the
exact .srt cue boundaries and musical downbeats.
1. Timing Calibration & Downstream Agent Mapping Rules
Each audio file is indexed independently from t = 0.00s so it maps
cleanly to a modular window.render(t) HTML/Three.js part file,
matching the multi-part assembly architecture used in
ANIMATION_STORYBOARD_GUIDE.md.

Before generating animation code, the timing-matching agent should
execute a four-step alignment pass over the local .srt files and music
beat map.
1. Snap cut points to spoken anchors: Locate the verbatim SRT
   Anchor Phrase in the local .srt file and set each scene's t0 to
   the start of that subtitle cue rather than relying on the 150 WPM
   estimate.
2. Quantize to musical downbeats with anticipation: Shift major fly
   transitions, hitFx bursts, and accent handoffs to the nearest bar
   downbeat (beats 1 and 3) or snare hit (beats 2 and 4), firing the
   visual cut 1--2 frames (approximately 0.03s–0.07s at 30 fps) early
   so visual processing aligns with perceived audio impact.
3. Preserve intra-act continuity bridges (S0): In Parts 2 and 3 of
   each act, reserve the opening 2.0s–3.5s (S0 at station -26) to
   mirror the exact final composition of the preceding part before
   executing a fly transition into station 0, bridged by a 0.45s
   eased cross-fade (XFADE).
4. Protect deliberate silence drops: Maintain the exact 1.5s
   complete musical silence before "five percent" in Act 2 Part 1 and
   the 1.0s silence before "electricity" in Act 4 Part 1, freezing
   camera motion into a locked hold during the silence.
2. Global Visual Engine Guardrails
Every scene in this storyboard inherits the locked four-pillar rules
from the Master Production Blueprint so a base AI model cannot introduce
color noise, character scale drift, or competing text layers.
  System Pillar                       Enforced Rule for Every Scene
  60--30--10 Color Hierarchy      Allocate 60--70% to ground_day
(#E7E1D3 / #DDD5C5) or
ground_night (#12262E /
#0B191E), 25--30% to structure
(Ivory cards #F4F1EA, Steel
panels #1B3540, Ink outlines
#0B191E), and 5--10% to a single
accent_active. Swap Ground only
on hard cuts at act breaks,
interpolate moods in HSL/OKLCH, and
apply 12 fps grainPat (1--2%
grain).

  Accent Handoff Discipline       Never display two bright accents
simultaneously. When a new accent
activates (for example, coral
#D94E43 replacing sage
#76B900), demote the previous
accent to steel (#1B3540) on the
exact same transition frame.

  RigKit Scale & 2D-in-3D         Lock standard adult character
height to 1.8 world units with
foot-sole pivot at y = 0, dynamic
perspective scaling coupled to
camera depth (DMIN=16 to
DMAX=36), grounded directional
contact shadows, and Triangle
(Jensen, traders), Square (bankers,
lawmakers, Fed), or Circle
(engineers, developers) shape
silhouettes.
Text & Metaphor Discipline      Restrict 3D world-space labels to
1--3 word keywords or simple
directional arrows so they never
compete with bottom drawCaptions
or top-left HEADS banners. Use one
evolving metaphor per act across
three scenes (Introduce, Develop,
Resolve), switching to cashChart
or stepChart only when citing
hard numerical proof.
3. Master Runtime & Audio Part Overview
The ten recorded audio files total approximately 1,349 spoken words,
yielding an estimated 9 minutes 00 seconds of recorded narration before
adding the 25-second High-Note Binge Outro from the written production
script and inter-act title cards (2.4s each).
  Audio Part        Spoken Words        Estimated Tempo & Audio   Ground & Active
Duration (150 Mood            Accent Arc
WPM)                 
  Cold open                ~134 0:00--0:54 (54s) 110 BPM pulsing ground_night
shorter                                         synth → 75 BPM  (#12262E) /
version.wav                                     analytical drop amber → coral

  Act 1 part                ~99 0:00--0:40 (40s) 75 BPM          ground_day
1.wav                                           analytical      (#E7E1D3) /
bed +           amber → sage
paper-rustle
SFX             

  Act 1 part               ~142 0:00--0:57 (57s) 90 BPM chapter  ground_day →
2.wav                                           bump +          ground_night /
mechanical      sage → coral
clock tick      

  Act 2 part               ~104 0:00--0:42 (42s) 1.5s complete   ground_night
1.wav                                           silence → 105   (#12262E) /
BPM             cyan (#45B8AC)
investigative
groove          

  Act 2 part               ~140 0:00--0:56 (56s) 105 BPM         ground_night
2.wav                                           groove + sharp  (#12262E) /
UI pop SFX      cyan → coral

  Act 2 part               ~170 0:00--1:08 (68s) 110 BPM         ground_night
3.wav                                           rhythmic        (#12262E) /
pulse +         cyan → amber
metallic ping   

  Act 3 part               ~143 0:00--0:57 (57s) 70 BPM lone     ground_night
1.wav                                           tense piano     (#0B191E) /
motif           coral → amber

  Act 3 part               ~137 0:00--0:55 (55s) 100 BPM         ground_night
2.wav                                           rebuild +       (#12262E) /
digital         sage → cyan
lock-click SFX  

  Act 4 part               ~116 0:00--0:46 (46s) 1.0s complete   ground_night
1.wav                                           silence → deep  (#0B191E) /
electrical hum  amber
(#D99B26)

  Act 4 part               ~164 0:00--1:06 (66s) 115 BPM         ground_night
2.wav                                           cinematic       (#0B191E) /
percussion +    coral → sage
sustained       echo
strings         
Outro (Script             ~57 0:00--0:25 (25s) 110 BPM steady  ground_night
Only)                                           hold → clean    (#12262E) /
hard cut        amber
4. Cold Open: The Armored Car & The $31.6 Trillion Bill
Source audio: Cold open shorter version.wav (~134 words,
estimated 54.0s at 150 WPM).

Core visual metaphor: The Armored Vault Truck---establishing
high-security physical scarcity before revealing that the vault's cargo
triggers an endless financial trap.

Before the viewer hears a single statistic, the cold open must confirm
the click within five seconds using tactile 3D staging, then transition
cleanly from physical silicon scarcity into the overarching $31.6
trillion question.
  Scene & Estimated SRT Anchor     Visual Job &  Action, Metaphor &  Color State &    Audio, Beat-Sync
Time              Phrase         Framing       RigKit (1.8 units)  Accent Handoff   & Max 3-Word
Label
  S1              "Look at what  Context /     Armored 3D box      ground_night   110 BPM low
0.00--11.50s    is inside this Hook --- CU   truck doors swing   (#12262E),     pulsing synth;
armored        on truck      open on y = 0     steel truck,     sharp metallic
truck..."      latch → pull  dark grid,          amberHi        latch click at
to Med on     revealing glowing   (#EBC16B)      0.10s (1-frame
open vault    server rack         interior rack    anticipation);
doors         (rackArt) inside  glow.            hitFx on "not
instead of gold                      cash". Label:
bars. Two                            ARMORED GPU
Square-silhouette                    TRANSIT.
guards flank the
truck (idle).                        

  S2              "In Palo Alto, Character     RigKit Triangle     ground_night   Subtle riser +
11.50--25.00s   Oracle's Larry Context ---   Jensen (jensen,   (#12262E);     soft restaurant
Ellison and    fly to        1.8u, q view,       amberHi demotes  clatter SFX
Tesla's Elon   Station 26 →  spr:explain) sits to steel; sage   tucked under VO;
Musk..."       Med 3-shot →  at a minimalist     (#76B900)      snap FACES cut
FACES         steel table while   lights the chip  to a bar
close-up on   Square Ellison and  icon.            downbeat. Label:
Jensen        Triangle Musk (lean                  CHIP
forward, talk                        ALLOCATION.
expression) gesture
toward a single
H100 chip icon.                      

  S3              "That scarcity Proof / Turn  cashChart +       Sage demotes to  Deep bass swell
25.00--39.00s   has triggered  --- pull to   cashStack climb   steel on "But    peaks on $31.6
the largest    Wide → push   rapidly to          unlike"; coral   trillion;
capital        on rising     $31.6T; as "trap  (#D94E43)      hitFx +
buildout..."   cashStack   that never stops    activates on the metallic clamp
counter       charging" hits, a   clamp and crack. SFX on "trap".
mechanical                           Label: $31.6T
padlock/clamp snaps                  TRAP.
onto the stack and
a red crack
(Line3) splits
the base.                            
S4              "By the end of Retention     Hyperscale data     Coral demotes to Music drops to
39.00--54.00s   this video,    Bridge ---    center campus       steel; amber     crisp 75 BPM
you will see   fly to        (rackArt rows)    (#D99B26)      analytical pulse
why 99%..."    Station 52    sits 99% fenced off highlights the   on "By the end";
(Wide crane   while 95% of rack   lone power pylon 0.5s fade to
shot)         LEDs stay dark;     on "outside the  #0B191E + 2.4s
camera pushes past  server rack".    Act 1 Title
the dark racks                       Card. Label:
toward a lone                        OUTSIDE THE
glowing power pylon                  RACK.
(plantArt)
outside the fence.
5. Act 1: The Perpetual Upgrade Trap
Source audio: Act 1 part 1.wav (~99 words) and Act 1 part 2.wav
(~142 words).

Act metaphor (3-scene rule): The Replaceable Engine Shell---a
concrete data center shell that stays fixed while its glowing internal
silicon core must be gutted and replaced every two years.

Act 1 shifts to ground_day (#E7E1D3 Warm Parchment, #DDD5C5 floor)
to establish historical clarity before introducing the two-year
depreciation cycle that breaks traditional infrastructure economics.
Act 1 Part 1 --- Act 1 part 1.wav (Estimated 40.0s)
  Scene & Estimated SRT Anchor       Visual Job &  Action, Metaphor &  Color State &  Audio,
Time              Phrase           Framing       RigKit (1.8 units)  Accent Handoff Beat-Sync &
Max 3-Word
Label
  S1              "Think about how Context ---   Line3 steel       ground_day   75 BPM
0.00--13.50s    every major      Wide locked   railroad tracks     (#E7E1D3),   analytical
infrastructure   hold          extend across the   structure      bed; subtle
boom..."                       left floor plane    #1B3540      rail-clank SFX
and lock flat;      tracks and     on track lock;
Circle-silhouette   Ivory card     cut on 4-bar
19th-century        (#F4F1EA),   downbeat.
factory workers     amber          Label: 1800S
(1.8u, y = 0)     (#D99B26)    RAILROADS.
step back as        initial capex
spending bar drops  bar.
to zero.                           

  S2              "In the late     Context       Fiber-optic conduit Amber holds on Soft
13.50--25.00s   1990s, telecom   (Compare) --- trench fills        the flatline   paper-rustle
giants           arc (yaw 0.34 cleanly on the      reference;     SFX on chart
buried..."       rad) to right right; traditional  steel          reveal; hold
side of stage capex stepChart   (#1B3540)    steady for 2
spikes once then    holds          seconds to let
flatlines alongside completed      flatline
the railroad curve. trench.        register.
Label: 1990S
FIBER.
S3              "But AI          Proof --- fly On "breaks that     Amber demotes  Crisp chapter
25.00--40.00s   infrastructure   to Station 26 law", an            to steel on    chime; tempo
breaks that law  → push on     upward-sloping      "breaks that   bumps to 90
completely..."   cashChart   cashChart rockets law"; sage     BPM; hitFx
past the flatlines: (#76B900)    on $1.8
$800B (2026)      lights the     trillion.
climbing to         accelerating   Label:
$1.8T/YR (2050)   AI curve.      $800B TO
without tapering.                  $1.8T.
Act 1 Part 2 --- Act 1 part 2.wav (Estimated 57.0s)
  Scene & Estimated SRT Anchor     Visual Job &      Action, Metaphor Color State &  Audio,
Time              Phrase         Framing           & RigKit (1.8    Accent Handoff Beat-Sync &
units)                          Max 3-Word
Label
  S0              (Continuity   Bridge --- hold   Mirrors the      ground_day   90 BPM bed
0.00--3.00s     bridge from    at Station -26    $800B to       (#E7E1D3),   carries
Part 1 S3)                      $1.8T          sage curve     seamlessly
accelerating     active during  across the
cashChart,     0.45s XFADE.   part boundary.
then executes a                 Label:
fly transition                  None.
into the
concrete shell
stage.                          

  S1              "Why? Because  Metaphor          Cutaway concrete Sage demotes   Mechanical
3.00--17.00s    a data center  (Introduce) ---   shell (steel     to steel;      clock-tick SFX
shell is just  Med on cutaway    frame, copper    coral          synced to 90
concrete..."   hqTower/shell   pipes) stays     (#D94E43)    BPM quarter
static while the pulses on the  notes. Label:
glowing internal aging silicon  2-YEAR
rackArt        core.          SILICON ROT.
silicon core
dims and turns
brittle on a
2-YEAR CLOCK
dial.                           

  S2              "Therefore,    Metaphor          Cranes pull the  Coral old      Heavy
17.00--31.00s   you cannot     (Develop) ---     dead coral racks racks clear    mechanical
build an AI    push into shell   out of the exact out; amber     winch SFX +
data center    interior          same concrete    (#D99B26)    hitFx on
once..."                         shell and drop   highlights the 93%. Label:
fresh racks in;  70% → 93%      70% → 93%
cashStack      replacement    CHIPS.
beside the shell cost stack.
grows from 70%
to 93% ICT
share.                          

  S3              "Roughly half  Proof --- fly to  Clean 3D map     Amber demotes  Low whoosh on
31.00--43.00s   of that $31.6 Station 52 → Wide card splits      to steel; cyan map zoom;
trillion..."   world map board   global           (#45B8AC)    subtle tension
allocation: US:  highlights the chord on
$15.1T and     US $15.1T    $15.1T.
APAC: $8.2T    block.         Label: US
(led by China                   $15.1T
and India), with                (48%).
Circle engineer
(1.8u) gesturing
to the US block.                
S4              "But if tech   Metaphor (Resolve Camera pushes    Cyan demotes   Music drops to
43.00--57.00s   giants are     / Open Loop #2)   into a dark      to steel;      low pulse;
spending $800 --- push to CU on rackArt server   coral          0.5s fade to
billion a      dark server aisle room (moodAt(t)  (#D94E43)    #0B191E +
year..."                         shifts smoothly  flashes on the 2.4s Act 2
in HSL toward    broken         Title Card.
ground_night   utilization    Label: 100%
at cut); a 100%  gauge.         CAPACITY?.
gauge flashes
then drops to a
blinking red
question mark on
"breaks down
immediately".
6. Act 2: 99% Full, 5% Used --- How Compute Became the New Oil
Source audio: Act 2 part 1.wav (~104 words), Act 2 part 2.wav
(~140 words), and Act 2 part 3.wav (~170 words).

Act metaphor (3-scene rule): The Overbooked Dark Warehouse---an
endless aisle of locked server cages (99% reserved) where only a tiny
corner (5%) actually lights up, evolving into a financialized trading
floor trapped inside regional borders.

Act 2 opens in ground_night (#12262E Slate Night) with cyan
(#45B8AC) as the primary investigative accent, anchoring the 1.5s
silence shock and Wall Street financialization.
Act 2 Part 1 --- Act 2 part 1.wav (Estimated 42.0s)
  Scene & Estimated SRT Anchor   Visual Job &  Action, Metaphor &       Color State &    Audio,
Time              Phrase       Framing       RigKit (1.8 units)       Accent Handoff   Beat-Sync & Max
3-Word Label
  S1              "According   Metaphor      100 server cages stretch ground_night   105 BPM
0.00--14.50s    to Boston    (Introduce)   across floorN; 92% of  (#12262E),     investigative
Consulting   --- Wide      new capacity is          steel cages,     groove builds
Group's July aisle of      pre-committed and 99     cyan (#45B8AC) tension under
2026..."     rackArt     cages lock shut (1%      lock icons on    the tight
server cages  VACANCY) while Square    the              real-estate
corporate buyers (1.8u,  pre-committed    claim. Label:
y = 0) hoard keys.     cages.           1% VACANCY.

  S2              "But here is Proof         Music cuts to complete   Cyan demotes to  1.5s COMPLETE
14.50--25.00s   the          (Silence      silence for 1.5s before  steel during     SILENCE before
number... as Shock) ---    "5%". All 99 cages dim   silence; coral   "5%"; 105 BPM
low as 5%."  hold locked   to dead steel except 5   (#D94E43)      groove drops
Med → sharp   tiny rack LEDs (citing   snaps onto the   back in on
FACES / CU    Cast.AI logs); a giant   5% USED readout. "Ninety-nine
snap          99% LEASED / 5% USED                    percent" with
counter stamps on                         hitFx. Label:
screen.                                   5% USED.
S3              "How is that Metaphor      Square corporate         Coral demotes to 105 BPM groove;
25.00--42.00s   possible?    (Develop) --- executives (1.8u, hold   steel; cyan      rhythmic
Because AI   pull to Wide  prop folder contracts)   (#45B8AC)      padlocks
labs..."     → arc around  stand in front of dark,  illuminates the  clicking shut
hoarding      silent racks, paying     bilateral        on beats 2 and
buyers        cashBags into          contract Line3 4. Label:
padlocked cages to       links.           CAPACITY
insure against missing                    HOARDING.
out.
Act 2 Part 2 --- Act 2 part 2.wav (Estimated 56.0s)
  Scene & Estimated SRT Anchor     Visual Job &   Action,         Color State &    Audio, Beat-Sync
Time              Phrase         Framing        Metaphor &      Accent Handoff   & Max 3-Word
RigKit (1.8                      Label
units)                           
  S0              (Continuity   Bridge ---     Mirrors the     ground_night   105 BPM groove
0.00--3.00s     bridge from    hold at        padlocked       (#12262E),     continues
Part 1 S3)    Station -26    server cages    cyan contract    seamlessly.
and cashBags, links active     Label: None.
then executes a during 0.45s
fly to Station  XFADE.
0.                               

  S1              "Meanwhile,    Proof          Clean timeline  Cyan demotes to  Sharp UI
3.00--27.00s    the bill is    (Timeline) --- card pops four  steel; amber     pop/click SFX on
quietly        hold on Med    company badges  (#D99B26)      each of the 4
shifting..."   4-step         sequentially on lights each      badges (1-frame
stepChart    downbeats:      badge            anticipation
WINDSURF (MAR), sequentially as  cut). Label:
OPENAI CODEX    it pops, then    SPRING 2026
(APR), GITHUB   settles to       METERING.
CAPS, ANTHROPIC steel.
$20+TOKENS.                    

  S2              "BCG projects  Proof (Chart)  cashChart     Amber demotes to Tempo nudges to
27.00--42.00s   the total      --- fly to     surges from     steel; sage      110 BPM; hitFx
market...      Station 26 →   $360B (2025)  (#76B900)      on $2.3
$360B to      push on        to $2.3T      lights the       trillion. Label:
$2.3T..."     cashChart    (2030) while    $2.3T growth   $360B →
Triangle trader curve.           $2.3T.
characters
(1.8u, y = 0)
enter
frame-right
(point pose).                    
S3              "And when a    Proof          Price needle    Sage demotes to  Metallic
42.00--56.00s   market hits    (Volatility)   swings          steel on         bell/ticker ping
$2.3T with    --- push to CU violently:      "crashed"; coral on $1.96 and
wild price     on H100 price  $8.00/HR      (#D94E43)      $2.64; hold
swings..."     curve          (2024) crashes  flashes on       1.5s on $2.64
to $1.96      $1.96 crash    for
(2025) then     then hands off   comprehension.
snaps back to   to amber on      Label: $8 →
$2.64 (APR    $2.64.         $1.96 →
2026) as Square                  $2.64.
Wall Street
banker steps
onto the floor.
Act 2 Part 3 --- Act 2 part 3.wav (Estimated 68.0s)
  Scene & Estimated SRT Anchor     Visual Job &  Action, Metaphor &      Color State &    Audio,
Time              Phrase         Framing       RigKit (1.8 units)      Accent Handoff   Beat-Sync &
Max 3-Word
Label
  S0              (Continuity   Bridge ---    Mirrors the H100        ground_night   110 BPM
0.00--3.00s     bridge from    hold at       volatility chart and    (#12262E),     rhythmic
Part 2 S3)    Station -26   banker, then executes a amber active     pulse
fly to Station 0.       during 0.45s     continues.
XFADE.           Label:
None.

  S1              "Independent   Proof ---     Three divergent index   Amber demotes to 110 BPM
3.00--18.00s    benchmarks,    hold on Med   lines (Ornn, Silicon    steel; cyan      pulse; subtle
including the  3-line        Data, Compute Desk) fan (#45B8AC)      terminal
Ornn H100      Bloomberg     apart by 41% over 19    highlights the   keystroke SFX
Index..."      terminal card MONTHS, showing         41% divergence   on the 3
unstandardized chaos.   gap.             index lines.
Label: 41%
INDEX GAP.

  S2              "BCG estimates Proof         cashStack unlocks     Cyan demotes to  Metallic
18.00--39.00s   that turning   (Exhibit) --- $140B/YR DARK VALUE   steel; amberHi coin/bell
opaque GPU     fly to        ($66B–$97B            (#EBC16B)      ping on $140
rentals..."    Station 26 →  arbitrage + $26B/YR   lights the       billion; hold
push on       interest savings; 6.43% $140B          steady 3.0s
cashStack   → 4.75% rate drop on a  dark-value       so viewers
$3.6T buildout).      stack.           can read
6.43% →
4.75%. Label:
$140B DARK
VALUE.

  S3              "But here is   Metaphor      Oil tanker glides       amberHi        hitFx + low
39.00--57.00s   the catch that (Resolve) --- freely between Houston  demotes to       thud on
breaks the AI  fly to        & Rotterdam (Line3    steel; coral     "cannot move
is the new     Station 52 →  open bridge); beside    (#D94E43)      like oil";
oil..."        Wide 3-column it, a rackArt GPU     lights the       cut on
stage         cluster in Virginia is  geographic wall  downbeat.
trapped inside a        between Virginia Label:
glowing Line3         and Frankfurt.   GEOGRAPHY
geographic fence,                        TRAP.
unable to reach
Frankfurt.                               
S4              "Which raises  Transition    Camera pushes tight on  Coral holds on   Music strips
57.00--68.00s   an obvious     (Open Loop    a server rack slot; an  the locked chip  down toward
question: if   #3) --- push  alternate chip tries to slot as scene    70 BPM piano
compute is     to CU on      slide in and bounces    fades 0.5s to    motif for Act
turning..."    rackArt chip  off a glowing lock      #0B191E + 2.4s 3. Label:
slot          icon.                   Act 3 Title      WHY NOT
Card.            SWAP?.
7. Act 3: The 20-Year Trap --- Why Nobody Can Break the 80% Grip
Source audio: Act 3 part 1.wav (~143 words) and
Act 3 part 2.wav (~137 words).

Act metaphor (3-scene rule): The Software Tollbooth---a solitary
stone gate built in silence (2006) that grows into an 80%-wide highway
tollbooth capturing half of every vehicle's cargo before rivals chip at
its edges.

Act 3 shifts into deep ink (#0B191E) for the 2006 flashback, opening
with a lone tense 70 BPM piano motif before rebuilding to 100 BPM as
CUDA scales to a $5 trillion monopoly.
Act 3 Part 1 --- Act 3 part 1.wav (Estimated 57.0s)
  Scene & Estimated SRT Anchor      Visual Job &  Action, Metaphor Color State &    Audio,
Time              Phrase          Framing       & RigKit (1.8    Accent Handoff   Beat-Sync & Max
units)                            3-Word Label
  S1              "To understand  Metaphor      Triangle Jensen  ground_night   Lone tense
0.00--17.00s    why nobody can  (Introduce)   (jensen, 1.8u, (#0B191E),     piano motif at
simply swap     --- Med →     y = 0,         steel seats,     70 BPM; ambient
chips..."       FACES         spr:present)   cyan (#45B8AC) room silence
close-up on   stands at a dark spotlight on the under "complete
Jensen (2006) podium unveiling lone CUDA gate.  silence".
a single CUDA                     Label: 2006:
tollbooth gate                    CUDA LAUNCH.
(doubling
hardware cost);
empty steel
auditorium seats
sit silent in
front of him.                     

  S2              "Nobody wanted  Proof ---     cashChart      Cyan demotes to  hitFx on
17.00--32.00s   it... Nvidia's  pull to Wide  plunges from     steel; coral     "collapsed";
valuation       → push on     $12B down to   (#D94E43)      piano holds low
collapsed..."   cashChart   $2B–$3B;       lights the       minor chord.
drop          Jensen           $12B → $2B   Label: $12B
(concerned →     collapse line.   → $2B--$3B.
think pose)
holds ground
beside the small
gate as paper
bills fall
around him.                       
S3              "But Huang      Proof (Stack  Three vertical   Coral demotes to Subtle digital
32.00--57.00s   endured the     Value) ---    stack bars (PC:  steel; amber     lock-click SFX
silence...      fly to        20--30%, MOBILE: (#D99B26)      on 40--50%;
McKinsey..."    Station 26 →  10--20%, AI      highlights the   hold 2.0s for
Med 3-bar     STACK: 40--50%)  40--50% AI value comparison
comparison    rise             capture bar.     read. Label:
sequentially;                     40--50% STACK
the AI STACK bar                  VALUE.
snaps lock-rings
around the
software layer.
Act 3 Part 2 --- Act 3 part 2.wav (Estimated 55.0s)
  Scene & Estimated SRT Anchor       Visual Job &   Action, Metaphor & Color State &      Audio, Beat-Sync
Time              Phrase           Framing        RigKit (1.8 units) Accent Handoff     & Max 3-Word
Label
  S0              (Continuity     Bridge ---     Mirrors the        ground_night     Beat rebuilds
0.00--3.00s     bridge from Part hold at        40--50% stack bar, (#12262E), amber smoothly to 100
1 S3)           Station -26    then executes a    active during      BPM. Label:
fly into the 2024  0.45s XFADE.       None.
tollbooth stage.                      

  S1              "By 2024, CUDA   Metaphor       The small 2006     Amber demotes to   100 BPM groove;
3.00--17.50s    had locked in 5  (Develop) ---  gate expands into  steel; sage        crisp hitFx on
million          Wide           a massive          (#76B900) lights $5 trillion
developers..."   tollbooth +    tollbooth spanning the 5M developer   (1-frame
developer      >80% of the GPU   tollbooth and      anticipation).
crowd          highway (5M Circle $5T tower.       Label: 5M
developers queued,                    DEVS.
>75% TOP500
supercomputers);
cashStack vaults
from a tiny $5M
SEGA brick up to a
$5T tower
($215.9B rev).                      

  S2              "Therefore,      Metaphor       Left (steel): CUDA Sage demotes to    100 BPM rhythmic
17.50--39.50s   rivals have      (Resolve) ---  tollbooth. Right:  steel on           hits synced to
realized they    fly to Station Circle/Triangle    "Therefore"; cyan  each rival
cannot beat      26 → Med       rival engineers    (#45B8AC) lights deployment
Nvidia..."       split-screen   (1.8u) wheel AMD   the rival          (Azure, Oracle).
siege          MI300 / ROCm and   open-source/ASIC   Label: ROCM &
GOOGLE TPU (ASIC)  lanes.             ASICS.
battering rams
into the inference
lane (Azure &
Oracle tags).                         
S3              "But even if     Transition     Even as the        Cyan demotes to    Music builds
39.50--55.00s   AMD, custom      (Open Loop)    tollbooth cracks   steel; amber       tension, then
silicon... one   --- pull to    open, a massive    (#D99B26) rims   cuts cleanly
wall nobody can  Wide → camera  dark concrete wall the looming power  toward silence
code..."         hits solid     (plantArt        wall before 0.5s   for Act 4.
wall           transmission       fade to            Label: THE
silhouette) slams  #0B191E + 2.4s   HARD WALL.
down behind it,    Act 4 Title Card.
blocking all code
lines (Line3).
8. Act 4: The Physical Ceiling --- Megawatts & Borders + Binge Outro
Source audio: Act 4 part 1.wav (~116 words), Act 4 part 2.wav
(~164 words), plus the written script's High-Note Binge Outro
(11:00--11:25, 25.0s, not yet recorded in Act 4 part 2.wav).

Act metaphor (3-scene rule): The Physical Ceiling & Border Gate---a
megawatt power ceiling that cannot be flown across oceans, capped by a
geopolitical border wall that slices the $31.6T buildout by $6T,
closing back on the opening armored truck.

Act 4 delivers the primary payoff of the entire investigation
(Electricity as the #1 bottleneck) using a 1.0s silence drop, then
resolves with a 115 BPM percussion build and an echo of sage (#76B900)
on the final thesis.
Act 4 Part 1 --- Act 4 part 1.wav (Estimated 46.0s)
  Scene & Estimated SRT Anchor      Visual Job &  Action, Metaphor Color State &     Audio, Beat-Sync
Time              Phrase          Framing       & RigKit (1.8    Accent Handoff    & Max 3-Word
units)                             Label
  S1              "PwC's 2026     Proof         Five ranking     ground_night    1.0s COMPLETE
0.00--14.50s    outlook ranked  (Silence      bars appear      (#0B191E),      SILENCE before
the five        Payoff #1)    (Connectivity,   steel rows 2--5,  "electricity";
forces...       --- hold Med  Security,        amber (#D99B26) deep electrical
number one was  5-rank card → Community, GPUs, flashes onto #1   hum SFX +
electricity."   push on #1    #1 POWER). Music ELECTRICITY.      hitFx on
cuts to 1.0s                       payoff. Label:
complete silence                   #1:
before                             ELECTRICITY.
"electricity",
then #1
ELECTRICITY
lights up.                         

  S2              "Affordable,    Metaphor      Small chip crate Amber holds on    Whoosh SFX on
14.50--29.50s   reliable,       (Introduce)   flies            the bolted power  24-hr chip
low-carbon      --- fly to    effortlessly     plant; steel for  flight; heavy
power... fly a  Station 26 →  across an ocean  the flying chip   bass thud on the
chip in         Wide split    arc (Line3) in arc.              bolted power
Taiwan..."      map           24 HOURS; beside                   plant. Label:
it, a massive                      CANNOT FLY
plantArt                         POWER.
gigawatt power
plant sits
bolted to the
ground, too
heavy to lift.                     
S3              "That is why in Metaphor      rackArt data   Amber demotes to  105 BPM
29.50--46.00s   October 2025,   (Develop) --- center and       steel; cyan       analytical
Nvidia, EPRI,   Med on        plantArt power (#45B8AC)       pulse;
and PJM..."     Virginia      grid connect via lights the        electrical
Aurora grid   a live throttle  real-time AURORA  relay-click SFX
station       gauge (Aurora,   grid-throttling   on throttle
Virginia); as    valve.            engagement.
demand spikes,                     Label: AURORA
throttle                           VIRGINIA.
software dials
down rack LEDs
so the local
grid stays
stable.
Act 4 Part 2 --- Act 4 part 2.wav (Estimated 66.0s)
  Scene & Estimated SRT Anchor      Visual Job &      Action, Metaphor  Color State &    Audio,
Time              Phrase          Framing           & RigKit (1.8     Accent Handoff   Beat-Sync & Max
units)                             3-Word Label
  S0              (Continuity    Bridge --- hold   Mirrors the       ground_night   115 BPM
0.00--3.00s     bridge from     at Station -26    Aurora            (#0B191E),     cinematic
Part 1 S3)                       grid-throttling   cyan active      percussion
gauge, then       during 0.45s     begins
executes a fly    XFADE.           building.
into the                           Label:
geopolitical                       None.
border wall.                       

  S1              "And layered    Metaphor          A tall steel      Cyan demotes to  115 BPM
3.00--17.00s    directly on top (Resolve) ---     geopolitical wall steel; coral     percussion
of the power    Wide border       slams directly on (#D94E43)      build; heavy
grid is a       wall + Square     top of the power  lights the       gate-slam SFX
geopolitical    regulators        grid; Square      border barrier   on "border
border wall..."                   regulators (1.8u, and red block    wall". Label:
y = 0) block    stamp.           SEPT 2025
chip shipments                     BAN.
marked ByteDance
/ Alibaba (Sept
2025).                             

  S2              "PwC modeled    Proof (Bar        cashStack       Coral            hitFx on -$6
17.00--37.00s   what happens    Fracture) --- fly stands at         (#D94E43)      trillion; hold
next... wiping  to Station 26 →   $31.6T; as      highlights the   2.5s so the
out $6         push on           "tighter export   -$6 TRILLION   $31.6T →
trillion..."    cashStack       controls" hits, a sheared block;   $25.5T drop
coral shear       remaining        reads clearly.
slices $6T off  $25.5T stays   Label: -$6T
the top, dropping steel.           TO $25.5T.
the total down to
$25.5T.                          
S3              "So look again  Synthesis (Echo)  Pulls back to the Coral demotes to 115 BPM
37.00--66.00s   at that armored --- pull to Wide  Cold Open's       steel; sage      sustained
truck from the  crane shot        armored           (#76B900)      strings peak
beginning..."   ([26, 7, 44])   truck---now       echoes back onto cleanly on
revealing four    the truck and    "chokepoint of
colossal pillars  power grid on    the AI
looming behind    "controls the    economy".
it: 2-YR ROT, chokepoint".     Label: POWER
$2.3T                           = CHOKEPOINT.
MARKET, CUDA
MOAT, and
POWER &
BORDERS
(plantArt grid
towers).
High-Note Binge Outro --- Script Only (25.0s)
Important: Act 4 Part 2 audio ends at "chokepoint of the AI
economy" and does not include the 11:00--11:25 High-Note Binge Outro
from the written production script. If you record those closing lines
("But if electricity is the true chokepoint... break down in this
video right here."), append this single 25.0s closing card with zero
wind-down or fade-out.

  Scene &          SRT Anchor      Visual Job  Action,         Color State &    Audio,
Estimated Time   Phrase          & Framing   Metaphor &      Accent Handoff   Beat-Sync & Max
RigKit (1.8                      3-Word Label
units)                           
  S4 (Outro)     "But if         Curiosity   Left end-screen ground_night   Music holds
0.00--25.00s   electricity is  Bridge ---  card highlights (#12262E),     steady at 110
the true        locked hold the next        ivory card frame BPM; clean hard
chokepoint...   on 2-card   investigation   (#F4F1EA),     cut at
this video      End Screen  thumbnail       amber            25.00s---zero
right here."                (glowing power  (#D99B26)      fade-out.
substation      highlight on the Label: WHO
vs. city        left end-screen  OWNS POWER?.
skyline grid    card.
map); Triangle
host/pointer
arrow directs
attention
cleanly to the
left card.                       
9. Pre-Render QA Gate for Your Downstream Agent
Before rendering final MP4 files from the Three.js scenes, have your
downstream agent verify every part against four non-negotiable checks
from the Master Production Blueprint.
1. Grayscale contrast check: Desaturate one representative frame
   per act---every cashChart, RigKit character, and 3-word label must
   remain clearly separated from ground_day or ground_night by
   light-versus-dark value alone.
2. RigKit silhouette & scale check: Verify that all 1.8-unit
   characters sit anchored at y = 0 with grounded directional contact
   shadows and distinct Triangle, Square, or Circle silhouettes across
   Wide and FACES shots.
3. Silent-watch narrative check: Play the rendered sequence
   muted---every cut must visibly advance the story or present
   numerical proof without relying on multi-line 3D text paragraphs.
4. Mobile 50% brightness check: Review the compressed MP4 export on
   a phone at 50% brightness to confirm no gradient banding occurs and
   that coral, amber, cyan, and sage accents remain legible without
   blooming.