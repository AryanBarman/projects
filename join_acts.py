#!/usr/bin/env python3
"""Join act1.webm ... act7.webm (downloaded from master.html) into one video.

Usage (put this file in the folder with the downloaded files, or pass the folder):
    python join_acts.py                 # joins ./act*.webm  -> full.webm  (fast, no re-encode)
    python join_acts.py D:/Downloads    # use another folder
    python join_acts.py --mp4           # also make full.mp4 (re-encode, H.264 + AAC)
    python join_acts.py --av=+150       # fix a constant sync error: audio 150 ms later (use -150 for earlier)
Needs ffmpeg on PATH.
"""
import re, shutil, subprocess, sys
from pathlib import Path

args = [a for a in sys.argv[1:] if not a.startswith('--')]
want_mp4 = '--mp4' in sys.argv
folder = Path(args[0]) if args else Path('.')
if not shutil.which('ffmpeg'):
    sys.exit('ffmpeg was not found on PATH. Install it or add it to PATH, then run this again.')

def key(p):
    m = re.search(r'act\s*(\d+)', p.stem, re.I)
    return int(m.group(1)) if m else 999
files = sorted([p for p in folder.glob('act*.webm') if re.search(r'act\s*\d+', p.stem, re.I) and not p.stem.endswith('_fixed')], key=key)
# browsers rename repeated downloads ("act1 (1).webm"); keep the newest file per act number
latest = {}
for p in files:
    k = key(p)
    if k not in latest or p.stat().st_mtime > latest[k].stat().st_mtime:
        latest[k] = p
files = [latest[k] for k in sorted(latest)]
if not files:
    sys.exit('No act*.webm files found in %s' % folder.resolve())
missing = [n for n in range(1, max(latest) + 1) if n not in latest]
if missing:
    print('WARNING: missing acts', missing, '(joining what exists)')
print('Joining:'); [print('  ', f.name) for f in files]

# repair for files recorded before the recorder fix: the voice started at the beginning of the file while the picture was on the
# 2.4 s act title card. --fix-cards delays each act's audio by 2.4 s (video is copied; only audio is re-encoded).
fc = [a for a in sys.argv if a.startswith('--fix-cards')]
if fc:
    delay = float(fc[0].split('=')[1]) if '=' in fc[0] else 2.4
    fixed = []
    for f in files:
        o = f.with_name(f.stem + '_fixed.webm')
        r = subprocess.run(['ffmpeg', '-y', '-hide_banner', '-loglevel', 'error', '-i', str(f), '-map', '0:v', '-map', '0:a', '-c:v', 'copy', '-af', 'adelay=%d:all=1' % round(delay * 1000), '-c:a', 'libopus', '-b:a', '192k', str(o)])
        if r.returncode:
            sys.exit('card fix failed on ' + f.name)
        fixed.append(o); print('fixed', o.name)
    files = fixed

lst = folder / 'list.txt'
lst.write_text(''.join("file '%s'\n" % f.resolve().as_posix().replace("'", r"'\''") for f in files), encoding='utf8')
out = folder / 'full.webm'

# 1) fast path: copy streams, regenerate timestamps (recorded WebM files have no duration header)
r = subprocess.run(['ffmpeg', '-y', '-hide_banner', '-loglevel', 'error', '-fflags', '+genpts', '-f', 'concat', '-safe', '0', '-i', str(lst), '-c', 'copy', str(out)])
if r.returncode == 0:
    print('Wrote', out.resolve(), '(no re-encode)')
else:
    # 2) fallback: re-encode (slower, always works)
    print('Stream copy failed; re-encoding to WebM (VP9 + Opus)...')
    r = subprocess.run(['ffmpeg', '-y', '-hide_banner', '-f', 'concat', '-safe', '0', '-i', str(lst), '-c:v', 'libvpx-vp9', '-b:v', '0', '-crf', '30', '-row-mt', '1', '-c:a', 'libopus', '-b:a', '160k', str(out)])
    if r.returncode:
        sys.exit('ffmpeg failed.')
    print('Wrote', out.resolve())

# optional audio/video sync fix, no re-encode: --av=+120 delays the audio by 120 ms, --av=-120 makes the audio earlier
av = [a for a in sys.argv if a.startswith('--av=')]
if av:
    ms = float(av[0][5:]); sec = ms / 1000.0
    synced = folder / 'full_synced.webm'
    r = subprocess.run(['ffmpeg', '-y', '-hide_banner', '-loglevel', 'error', '-i', str(out), '-itsoffset', '%.3f' % sec, '-i', str(out), '-map', '0:v', '-map', '1:a', '-c', 'copy', str(synced)])
    if r.returncode == 0:
        out = synced; print('Wrote', synced.resolve(), '(audio shifted %+d ms)' % ms)
    else:
        print('Sync shift failed; keeping the unshifted file.')

if want_mp4:
    mp4 = folder / 'full.mp4'
    print('Making MP4 (re-encode)...')
    r = subprocess.run(['ffmpeg', '-y', '-hide_banner', '-loglevel', 'error', '-stats', '-i', str(out), '-c:v', 'libx264', '-preset', 'medium', '-crf', '20', '-pix_fmt', 'yuv420p', '-c:a', 'aac', '-b:a', '192k', '-movflags', '+faststart', str(mp4)])
    print('Wrote', mp4.resolve() if r.returncode == 0 else 'MP4 FAILED')
