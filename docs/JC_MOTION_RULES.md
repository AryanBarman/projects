# JC MOTION RULES (crash series; from the motion-art-direction + manim skills, tuned to our system)
1. CHARTS LIVE ON PAPER: every graph/bar chart is a graph-paper sheet Card (`kind:'paint'`, `rot` +-0.02) drawn by `stepChart` (line) or `paperBars` (bars) in tools\jc\assets_jb.js. Axes + labelled ticks + one dashed reference line; values pop as dark pills. No floating 3D bars for data.
2. ONE coordinate mapping per chart (Manim rule): keys are [[time, value, ramp]]; a move STARTS on the spoken word (wt.py times) and ramps 0.3-0.5 s (fast drop) or 1-3 s (slow slide).
3. One hero per frame: the paper chart is the hero; characters react (pose change on the same word); stamps/counters support; nothing else moves loudly.
4. No overshoot on financial numbers: stamps pop with 1.35x settle only (was 1.9x); no bounce on pills beyond 0.7->1.0.
5. Hold discipline: after each hit, hold ~0.4 s before the next move; camera push ends on the word, pull begins after it.
6. Transitions: only connection-by-same-picture (next part opens on the previous part's last picture) and fly/whip along the station line.
7. No impact ring on top of a chart (it hides the pills); rings only on stamps.
