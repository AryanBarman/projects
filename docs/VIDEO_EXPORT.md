# VIDEO EXPORT (not yet run end-to-end; run it yourself when ready)
One command: `python tools/jb2/make_video.py <id> [--workers 2] [--gpu 1|0] [--max N] [--mix-only] [--skip-build] [--crf 23]`
Steps: compile story + build page -> synth SFX once (audio/make_sfx.py) and mix with voice (SFX -14 dB, sidechain ducking, limiter) -> frame-exact export (tools/export_video.js) muxed with the mix -> verify + contact sheet of the final file.
Needs: node, ffmpeg (tools/.ffvenv imageio-ffmpeg, PATH, or $FFMPEG), Pillow. `--gpu 0` = SwiftShader fallback. `--mix-only` checks audio without rendering. `--max N` renders only N frames for a quick test.
Status: audio mix and export wiring written; full render NOT verified, audio sync NOT checked.
