# SHORTS GUIDE — vertical 9:16 videos made for phones

A short must be complete in itself and made for a vertical screen from the start. Do not letterbox the wide video and do not just cut a clip out of the long one (the user rejected both).

## 1. Structure of every short (30-60 s)
1. HOOK (0-3 s): a bold claim or question that creates curiosity, shown as a big card over the picture while the voice-over starts. Specific and a little surprising, e.g. "ELON JUST OFFERED JENSEN THE KEYS TO A $119 BILLION CHIP PLANT".
2. BODY: 1-3 voice-over cuts from the long video, each ending on a full sentence. Keep only beats that advance the one idea.
3. RE-HOOK (about 40-60 % through): a re-engagement beat at a natural turn in the voice-over ("BUT THERE IS A CATCH", "AND IT GETS WORSE", "WIN NUMBER TWO"): colour band slides in with a white flash, 2.6 s.
4. PAYOFF: the last voice-over line resolves the claim from the hook.
5. END CARD (3.2 s): an open question that makes people want the rest ("WHAT IS THE THIRD WIN?") then a call to action ("FOLLOW FOR THE FULL STORY") and a line pointing to the long video. Make the CTA match what the viewer should do next.
6. Optional later: make the end flow back into the first frame so the loop feels continuous.
All of the above is data in `shorts.html` (`hook, rehook, cta, segs`).

## 2. Current six shorts (picked from the story beats; check them against taste)
1 `short1_offer` Act 1 p1 whole (23 s). 2 `short2_44b` Act 5 p1 25.4-46.5 + 48.98-67.3. 3 `short3_legal` Act 5 p2 27.4-48.4 + 66.95-80.6. 4 `short4_three_wins` Act 6 46.6-107.2 (combined timeline). 5 `short5_moat` Act 7 43-73.6 (combined timeline). 6 `short6_sealed` Act 3 p1 44.35-66.8. Acts 2 and 4 have no short yet.

## 3. Mobile rules (status: NOT fully applied yet; section 5 lists the work)
- Format 1080x1920, 30 fps, VP9+Opus WebM (convert to MP4 H.264/AAC with ffmpeg for upload).
- Safe zones (rule of thumb for YouTube Shorts / Reels / TikTok; platforms change this): keep important text out of the top ~180-250 px (status bar, search/camera icons) and the bottom ~350-450 px (title, channel, progress bar, buttons) and the right ~120-150 px (like/comment/share buttons). Center the action in the middle band, y roughly 300-1450.
- Text: captions 60-70 px bold with a dark box or outline, 2-3 lines max, high contrast, word highlight on the spoken word. Hook/headline text 70-95 px. Any in-scene label should be at least 60 px tall on screen; if it is smaller, scale it up or drop it.
- One idea, one hero object per beat, centred and large. Empty floor/sky loses viewers: crop in or fill the frame.
- Pace: a visual change roughly every 1.5-3 s; cut slow stretches; the first 3 s decide retention.
- Sound-off friendly: the captions carry the story.

## 4. How the portrait build works (so it can be modified)
`tools\build_short.py` takes a `-3d.html` (or the Act 1 `-v2` hybrid) and rewrites it to portrait: both canvases and renderer 1080x1920, camera `PerspectiveCamera(50, 1080/1920)`, `ppu`/`worldToScreen` constants, motion-smear offsets, grain fill. Camera: for shim files `DMIN = DPORT(31)`, `DMAX = DPORT + 14`, yaw cap 0.24, pitch 0.20-0.40, fov 50; for older Three.js files `evalCam` is wrapped to pull back to at least `DPORT` and raise slightly. Labels scale 1.3x. Overrides in `tools\portrait_over.js` redraw the headline (centered, y 150-340), word-by-word captions (66 px, box bottom at y 1640, width 1000) and a progress bar (y 70). The recorder `shorts.html` copies the page canvases (already portrait), then overlays hook, re-hook and end card. Rebuild all with `python mk_all.py`.
Known weakness: scenes were laid out wide, so the camera has to pull back to fit a narrow frame and the subject can end up small.

## 5. TODO for mobile (do next, cheapest first)
1. Move captions up (box bottom about y 1450 or higher) and the headline down to about y 220-420 so nothing sits in the platform UI zones; keep a 120 px right margin free; move the progress bar off the top edge.
2. Enlarge or remove tiny labels per beat; keep at most 2 labels on screen.
3. Per-beat framing pass on the six picks: a camera key per beat that centres one hero object and fills the frame (use `K2`-style distance-from-span keys as in `scenes\a5p1_three_keys.js`).
4. Dedicated short storyboards (written from the SRT for vertical, not reusing wide scenes) for the strongest stories; this gives true vertical composition (stack elements vertically, use tilt and crane moves).
5. Watch every short on a real phone; check safe zones, text size, and hook position; fix by-eye.
6. A larger-caption version of the long video if it will be posted for phones (captions are 40 px at 1920 wide now).

## 6. Shorts checklist before export
[ ] hook readable in 1 s [ ] re-hook lands on a real turn [ ] last line resolves the hook [ ] CTA matches the next action [ ] nothing in UI zones [ ] captions 60+ px, 2-3 lines [ ] subject large and centred [ ] no empty stretch over 2 s [ ] audio level and fades at cuts OK [ ] A/V sync checked (use the video-offset box) [ ] total 30-60 s.
