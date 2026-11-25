"""ONE COMMAND from story to finished MP4 (video + voice + quiet sound effects):
   python make_video.py <id> [--workers 2] [--gpu 1|0] [--max N] [--mix-only] [--skip-build]
 1. compile (if a story file exists) + build the page         (build_jb.py)
 2. sound effects: synthesise the library once (audio/make_sfx.py, no downloads), then MIX voice + cfg['sfx'] with the pack's rules:
    effects -14 dB under the voice, sidechain ducking while the voice speaks, limiter, voice always dominant   -> <audio_dir>/<audio>_mix.wav
 3. frame-exact export of the page (tools/export_video.js; real GPU by default, --gpu 0 = SwiftShader) muxed with the mix  -> <out_dir>/<out>.mp4
 4. verify (duration, streams) and write a 1-frame-per-2-seconds contact sheet of the FINAL file; print its path (look at it with the Read tool)
ffmpeg comes from tools/.ffvenv (imageio-ffmpeg) or PATH or $FFMPEG. See docs/VIDEO_EXPORT.md."""
import sys, os, re, json, wave, subprocess, pathlib
H = pathlib.Path(__file__).resolve().parent; P = H.parent.parent
def ffmpeg_exe():
    if os.environ.get('FFMPEG'): return os.environ['FFMPEG']
    d = P / 'tools' / '.ffvenv' / 'Lib' / 'site-packages' / 'imageio_ffmpeg' / 'binaries'
    if d.exists():
        for f in d.iterdir():
            if f.name.startswith('ffmpeg') and f.suffix in ('.exe', ''): return str(f)
    return 'ffmpeg'
FF = ffmpeg_exe(); pid = sys.argv[1]
def opt(k, d=None): return sys.argv[sys.argv.index('--' + k) + 1] if '--' + k in sys.argv else d
run = lambda *a: subprocess.run(list(map(str, a)), capture_output=True, text=True)
if '--skip-build' not in sys.argv:
    if (H / 'stories' / (pid + '.story.json')).exists(): print(run(sys.executable, H / 'compile_story.py', pid).stdout.strip())
    r = run(sys.executable, H / 'build_jb.py', pid); print((r.stdout.strip().split('\n') or [''])[-1])
    if 'SYNTAX_OK' not in r.stdout: print(r.stdout[-500:], r.stderr[-500:]); sys.exit(1)
cfg = json.load(open(H / ('cfg_%s.json' % pid), encoding='utf8')); adir = P / cfg.get('audio_dir', 'jen_back/audio'); voice = adir / (cfg['audio'] + '.wav'); mix = adir / (cfg['audio'] + '_mix.wav')
# ---- sound effects
sfx = H / 'audio' / 'sfx'
if not (sfx / 'impact.wav').exists(): print(run(sys.executable, H / 'audio' / 'make_sfx.py', sfx).stdout.strip())
w = wave.open(str(voice)); dur = w.getnframes() / w.getframerate(); w.close(); ev = [e for e in cfg.get('sfx', []) if (sfx / (e['sfx'] + '.wav')).exists() and e['t'] < dur - 0.2]
ins = ['-i', str(voice)]; fl = []; lab = []
for i, e in enumerate(ev, 1):
    ms = int(e['t'] * 1000); ins += ['-i', str(sfx / (e['sfx'] + '.wav'))]; fl.append('[%d:a]volume=%ddB,adelay=%d|%d[s%d]' % (i, e.get('db', -4) - 14, ms, ms, i)); lab.append('[s%d]' % i)
fl.append('[0:a]asplit=2[v][vk]')
if lab:
    fl += [''.join(lab) + 'amix=inputs=%d:normalize=0,apad=whole_dur=%.3f[sx]' % (len(lab), dur), '[sx][vk]sidechaincompress=threshold=0.02:ratio=8:attack=5:release=250[sd]', '[v][sd]amix=inputs=2:normalize=0,alimiter=limit=0.95[a]']
else: fl.append('[v]anull[a]')
r = run(FF, '-y', '-v', 'error', *ins, '-filter_complex', ';'.join(fl), '-map', '[a]', '-t', '%.3f' % dur, '-ar', '48000', mix)
print('audio mix: %d effects over %.1f s (%.1f per 20 s) -> %s %s' % (len(ev), dur, len(ev) * 20 / dur, mix.name, r.stderr.strip()[:200]))
if '--mix-only' in sys.argv: sys.exit(0)
# ---- export
port = bool(cfg.get('portrait')); Wd, Hd = (1080, 1920) if port else (1920, 1080)
page = P / cfg.get('out_dir', 'jen_back2') / cfg['out']; outp = page.with_suffix('.mp4')
cmd = ['node', str(P / 'tools' / 'export_video.js'), str(page), str(outp), '--dur', '%.3f' % dur, '--wav', str(mix), '--w', str(Wd), '--h', str(Hd), '--workers', opt('workers', '2'), '--gpu', opt('gpu', '1'), '--crf', opt('crf', '23')]
if opt('max'): cmd += ['--max', opt('max')]
print('exporting', outp.name, '...'); r = subprocess.run(cmd, capture_output=True, text=True, timeout=7200); print('\n'.join(r.stdout.strip().split('\n')[-4:]), r.stderr.strip()[-300:])
# ---- verify the final file
if outp.exists():
    info = run(FF, '-i', outp).stderr; m = re.search(r'Duration: (\S+),', info); print('FINAL:', outp, '| duration', m.group(1) if m else '?', '|', ' / '.join(re.findall(r'Stream #\S+: (Video: \w+|Audio: \w+)', info)), '|', (re.search(r'(\d{3,4}x\d{3,4})', info) or [None, ''])[1], '| %.1f MB' % (outp.stat().st_size / 1e6))
    sd = H / '_scratch'; sd.mkdir(exist_ok=True); fr = sd / ('final_%s' % pid); fr.mkdir(exist_ok=True)
    for f in fr.glob('*.png'): f.unlink()
    run(FF, '-y', '-v', 'error', '-i', outp, '-vf', 'fps=0.5,scale=216:384' if port else 'fps=0.5,scale=384:216', fr / 'f_%03d.png')
    from PIL import Image, ImageDraw
    fs = sorted(fr.glob('f_*.png')); tw, th = Image.open(fs[0]).size; cols = 10; rows = -(-len(fs) // cols); sh = Image.new('RGB', (tw * cols, th * rows), 'white')
    for i, f in enumerate(fs): im = Image.open(f).convert('RGB'); ImageDraw.Draw(im).text((4, 3), '%ds' % (i * 2), fill=(255, 0, 0)); sh.paste(im, ((i % cols) * tw, (i // cols) * th))
    sp = sd / ('final_sheet_%s.png' % pid); sh.save(sp); print('FINAL CONTACT SHEET:', sp)
else: print('NO OUTPUT FILE - see the export lines above')
