"""JOIN narration clips into ONE audio + SRT, applying spelling corrections (originals untouched).
usage: python join_audio.py <audio_dir> <out_dir> <out_name> "<clip 1>" "<clip 2>" ...      (clip = file name without .wav/.srt)
 e.g.  python join_audio.py "jensen back with crash/audio" "jensen back with crash/out" jc_a1 "Act 1 part 1" "Act 1 part 2"
- WAVs are concatenated (same format required); each SRT is shifted by the summed length of the clips before it.
- corrections.json (next to this file) = [[regex, replacement], ...] applied to every caption line. Facts are never changed, only spelling/format.
Prints the clip offsets (use them for beat times in the story file) and every correction that fired."""
import sys, re, json, wave, pathlib
H = pathlib.Path(__file__).resolve().parent; P = H.parent.parent
adir, odir, name, clips = P / sys.argv[1], P / sys.argv[2], sys.argv[3], sys.argv[4:]; odir.mkdir(parents=True, exist_ok=True)
fix = json.load(open(H / 'corrections.json', encoding='utf8'))
ts = lambda x: (lambda h, m, r: int(h) * 3600 + int(m) * 60 + int(r.split(',')[0]) + int(r.split(',')[1]) / 1000)(*x.split(':'))
def fmt(s): s = max(0, s); h, r = divmod(round(s * 1000), 3600000); m, r = divmod(r, 60000); return '%02d:%02d:%02d,%03d' % (h, m, r // 1000, r % 1000)
out = wave.open(str(odir / (name + '.wav')), 'wb'); off = 0.0; blocks = []; fired = {}; offs = []
for c in clips:
    w = wave.open(str(adir / (c + '.wav')))
    if not off: out.setparams(w.getparams())
    out.writeframes(w.readframes(w.getnframes())); dur = w.getnframes() / w.getframerate(); w.close(); offs.append((c, round(off, 3), round(dur, 3)))
    for b in re.split(r'\n\s*\n', (adir / (c + '.srt')).read_bytes().decode('utf-8-sig').replace('\r', '').strip()):
        L = b.split('\n')
        if len(L) < 3: continue
        a, z = L[1].split(' --> '); tx = ' '.join(L[2:]).strip()
        for pat, rep in fix:
            n = re.sub(pat, rep, tx)
            if n != tx: fired[pat] = fired.get(pat, 0) + 1; tx = n
        blocks.append((ts(a) + off, ts(z) + off, tx))
    off += dur
out.close()
(odir / (name + '.srt')).write_text('\n\n'.join('%d\n%s --> %s\n%s' % (i + 1, fmt(a), fmt(z), tx) for i, (a, z, tx) in enumerate(blocks)) + '\n', encoding='utf-8')
print('joined %d clips, %.2f s ->' % (len(clips), off), odir / (name + '.wav')); [print('  offset %7.3f  len %7.3f  %s' % (o, d, c)) for c, o, d in offs]
print('corrections fired:', fired)
