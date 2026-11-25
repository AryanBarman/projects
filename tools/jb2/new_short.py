"""SCAFFOLD a new short as a STORY FILE:   python new_short.py "<path to .srt>" <id> [--title "Title"]      (the .wav with the same base name is copied too)
Cuts the SRT into beats (sentences), maps each to recipes with recipes_map.json and writes ONE data file  stories/<id>.story.json  (schema: docs/STORY_SPEC.md), then compiles it.
Next: edit the TODO texts and wrong matches in the story file, then   python check_short.py <id>   (see docs/SHORT_RECIPE.md)."""
import sys, re, json, shutil, pathlib, subprocess
H = pathlib.Path(__file__).resolve().parent; P = H.parent.parent
srt = pathlib.Path(sys.argv[1]); pid = sys.argv[2]; title = sys.argv[sys.argv.index('--title') + 1] if '--title' in sys.argv else srt.stem
rules = json.load(open(H / 'recipes_map.json', encoding='utf8'))['rules']
tsec = lambda x: (lambda h, m, r: int(h) * 3600 + int(m) * 60 + int(r.split(',')[0]) + int(r.split(',')[1]) / 1000)(*x.split(':'))
cues = []
for b in re.split(r'\n\s*\n', srt.read_text(encoding='utf8').replace('\r', '').strip()):
    L = b.split('\n')
    if len(L) >= 3: a, c = L[1].split(' --> '); cues.append([tsec(a), tsec(c), re.sub(r'(\w) -(\w)', r'\1-\2', ' '.join(L[2:]).strip())])
beats = []
for c in cues:      # a beat ends at a sentence end
    if beats and not beats[-1]['done']: beats[-1]['end'] = c[1]; beats[-1]['text'] += ' ' + c[2]
    else: beats.append({'start': c[0], 'end': c[1], 'text': c[2], 'done': False})
    if re.search(r'[.?!]["\u201d]?$', c[2].strip()): beats[-1]['done'] = True
dur = round(cues[-1][1] + 0.2, 2)
aud = P / 'shorts2' / 'audio'; aud.mkdir(parents=True, exist_ok=True); shutil.copy(srt, aud / (pid + '.srt'))
if srt.with_suffix('.wav').exists(): shutil.copy(srt.with_suffix('.wav'), aud / (pid + '.wav'))
else: print('WARNING: copy the wav to', aud / (pid + '.wav'))
def sub(v, x, t0, t1):      # fill {x}/{t0}/{t1}; evaluate numeric expressions
    if isinstance(v, str) and '{' in v: return round(eval(v.format(x=x, t0=t0, t1=t1)), 2)
    if isinstance(v, list): return [sub(i, x, t0, t1) for i in v]
    if isinstance(v, dict): return {k: sub(i, x, t0, t1) for k, i in v.items()}
    return v
story = {'title': title, 'audio': pid, 'dur': dur, 'hook': {'t': [0, 2.3], 'text': 'TODO HOOK LINE ONE|TODO HOOK LINE TWO', 'sub': 'TODO one-line subtitle', 'accent': 'coral'}, 'mood': [[0, 'day'], [round(beats[len(beats) // 2]['start'], 1), 'tense']], 'beats': [], 'cam': []}
for i, b in enumerate(beats):
    t0 = round(b['start'], 2); t1 = round(b['end'], 2); x = 14 * i; t = b['text'].lower()
    r = next((r for r in rules if r['words'] and any(w in ' ' + t for w in r['words'])), rules[-1]); do = [sub(s, x, t0, t1) for s in r['setup']]
    for k in range(r.get('crowd', 1)): do.append(['Act', r['role'], round(x + r['dx'] + k * 1.8, 1), 3.2, 3.0, r['acting'], round(t0 + 0.1 * k, 2), round(t1 + 0.4, 2), {'phase': round(i * 1.7 + k, 1)}])
    story['beats'].append({'name': r['name'], 't': [t0, t1], 'do': do, '_say': b['text'][:80]})
    prev_end = beats[i - 1]['end'] if i else 0; leave = round(prev_end + 0.05, 2); arr = round(max(t0 - 0.05, leave + 0.45), 2); mid = round((t0 + t1) / 2 + 0.2, 2); cam = r['camera']
    story['cam'].append([0, [x, 3.4, 3], 20, 0.12, 0.12, 50] if i == 0 else [arr, [x, 3.4, 3], 17, 0, 0.14, 50, 'whip' if i % 2 == 0 else 'fly', leave])
    a2 = round(max(arr + 0.6, mid), 2)
    story['cam'].append({'face': [round(max(arr + 0.4, mid - 0.4), 2), [round(x + r['dx'], 1), 3.5, 3], 7.6, 0.12, 0.08, 42, 'ease', None, {'roll': 0.04}], 'crane': [a2, [x + 2, 8, 3], 24, 0, 0.08, 50, 'ease'], 'orbit': [a2, [x + 1, 3, 3], 12.5, 0.35, 0.14, 48, 'ease']}.get(cam, [a2, [x + 1, 3.2, 3], 11.5, -0.1, 0.1, 46, 'ease']))
    story['cam'].append([round(max(t1, mid + 0.3), 2), [x + 1, 3.2, 3], 12.5, 0.06, 0.1, 46, 'ease'])
story['cam'].append([dur, [14 * (len(beats) - 1) + 1, 3.2, 3], 12, 0.08, 0.1, 46, 'ease'])
story['cam'].sort(key=lambda k: k[0])
(H / 'stories').mkdir(exist_ok=True); out = H / 'stories' / (pid + '.story.json')
out.write_text(json.dumps(story, indent=1, ensure_ascii=False), encoding='utf8')
print('beats:'); [print('  %2d %5.1f-%5.1f  %-10s %s' % (i + 1, b['t'][0], b['t'][1], b['name'], b['_say'][:60])) for i, b in enumerate(story['beats'])]
print(subprocess.run([sys.executable, str(H / 'compile_story.py'), pid], capture_output=True, text=True).stdout.strip()); print('wrote', out, '\nnext: edit the TODOs, then  python check_short.py', pid)
