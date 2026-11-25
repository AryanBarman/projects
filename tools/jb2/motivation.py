"""Camera MOTIVATION check (static, no rendering). See docs/DIRECTION_GUIDE.md Part A.
usage: python motivation.py <id> [<id> ...] | all      (reads <id>_keys.js, <id>_scene.js, cfg_<id>.json from this folder; writes nothing)

A key K(t, pos, look, fov, type) describes the segment that ENDS at t (see shim_cam_jb.js).
Events = cfg cues + the t0 of every pop()/Card() in the scene (the seconds when an asset lands).
Flags:
  PUSH/PULL   an emphasis move whose end is not within 0.8 s of an event (the idea does not land with it)
  FLY         a fly that does not end within 1.2 s after a station change (cfg 'rail')
  ARC         an orbit longer than 3.0 s (move with no reason; use hold, the living drift is automatic)
  CUT/DEAD/LAND  transitions: the camera leaves before the line ends / waits too long / an asset lands inside the flight (cfg ledger gives the line ends)
  FLYING-OVER a push/pull/arc that STARTS before the assets it should show have landed: starts earlier than 1.0 s before every nearby event
Also prints the share of seconds that are holds (target 40 to 60 percent).
"""
import re, sys, json, pathlib
H = pathlib.Path(__file__).resolve().parent
def FH(n): p = H / n; return p if p.exists() else H / 'legacy' / 'acts' / n      # old acts live in legacy/acts
KEY = re.compile(r"K\(\s*([\d.]+)\s*,\s*\[[^\]]*\]\s*,\s*\[[^\]]*\]\s*,\s*[\d.]+\s*,\s*'(\w+)'\s*\)")
KEYP = re.compile(r"^\s*K\(\s*([\d.]+)\s*,\s*\[[^\]]*\]\s*,\s*[\d.]+\s*,\s*[-\d.]+\s*,\s*[-\d.]+\s*,\s*[\d.]+\s*(?:,\s*'(\w+)')?(?:,\s*([\d.]+|undefined))?(?:,\s*\{[^}]*\})?\s*\)", re.M)
POP = re.compile(r"'#[0-9A-Fa-f]{6}'\s*,\s*'#[0-9A-Fa-f]{6}'\s*,\s*(\d+(?:\.\d+)?)")
T0 = re.compile(r"\bt0:\s*(\d+(?:\.\d+)?)")
ALL = ['a1p1', 'a1p2', 'a2p1', 'a2p2', 'a3p1', 'a3p2', 'a4p1', 'a4p2', 'a4p3', 'a5p1', 'a5p2', 'a5p3', 'a6p1', 'a6p2', 'a7']

def check(pid):
    cfg = json.loads((FH('cfg_%s.json' % pid)).read_text(encoding='utf8'))
    ksrc = (FH(pid + '_keys.js')).read_text(encoding='utf8'); keys = [(float(t), ty) for t, ty in KEY.findall(ksrc)]; leave = {}
    if not keys:        # portrait format (shorts): the camera arrives at t; a 'fly' leaves at its 8th argument, so the previous idea is held until then
        for m in KEYP.finditer(ksrc): keys.append((float(m.group(1)), m.group(2) or 'ease')); leave[len(keys) - 1] = float(m.group(3)) if m.group(3) and m.group(3) != 'undefined' else None
    sc = (FH(pid + '_scene.js')).read_text(encoding='utf8')
    ev = sorted(set([float(c[0]) for c in cfg.get('cues', [])] + [float(x) for x in cfg.get('events', [])] + [float(x) for x in POP.findall(sc)] + [float(x) for x in T0.findall(sc)]))
    ev = [e for e in ev if e > 0.05]
    rail = [float(x) for x in cfg.get('rail', [])][1:-1]
    flags, hold_s, tot = [], 0.0, 0.0
    for i in range(1, len(keys)):
        a, (b, ty) = keys[i - 1][0], keys[i]
        d = b - a; tot += d
        if ty == 'hold': hold_s += d
        near = min((abs(e - b) for e in ev), default=99)
        if ty in ('push', 'pull') and near > 0.8:
            flags.append((a, b, ty.upper(), 'ends %.1f s from the nearest landing/cue (want <= 0.8)' % near))
        if ty in ('push', 'pull', 'arc') and not any(a - 0.2 <= e <= b + 0.8 for e in ev):
            flags.append((a, b, 'EMPTY', 'no asset lands during or just after this move'))
        if ty == 'fly' and not any(-0.3 <= b - r <= 1.2 for r in rail):
            flags.append((a, b, 'FLY', 'does not end within 1.2 s after a station change'))
        if ty == 'arc' and d > 3.0:
            flags.append((a, b, 'ARC', 'orbit of %.1f s with no reason (use hold)' % d))
    # ---- transitions (docs/DIRECTION_GUIDE.md Part D): the end line must land, then the camera leaves; nothing may land inside the flight
    ends = []
    for row in cfg.get('ledger', []):
        m = re.match(r'([\d.]+)-([\d.]+)', str(row[0]))
        if m: ends.append(float(m.group(2)))
    for i in range(1, len(keys)):
        a0, (b0, ty) = (leave.get(i) if leave.get(i) is not None else keys[i - 1][0]), keys[i]
        if ty not in ('fly', 'whip'): continue
        prev_end = max([e for e in ends if e <= b0 + 0.3], default=None)
        if prev_end is not None and a0 < prev_end - 0.25:
            flags.append((a0, b0, 'CUT', 'camera leaves %.1f s before the line ends (%.1f): the end of the idea is not shown' % (prev_end - a0, prev_end)))
        if prev_end is not None and a0 - prev_end > 1.2:
            flags.append((a0, b0, 'DEAD', '%.1f s of nothing new between the line end and the flight' % (a0 - prev_end)))
        inside = [e for e in ev if a0 - 0.3 < e < b0]
        if inside:
            flags.append((a0, b0, 'LAND', 'asset lands at %.1f s, inside the transition (settle it >= 0.3 s before the flight or carry it with hand())' % inside[0]))
    return dict(id=pid, n=len(keys), dur=tot, hold=100 * hold_s / tot if tot else 0, flags=flags, events=len(ev))

if __name__ == '__main__':
    ids = ALL if sys.argv[1:] == ['all'] else sys.argv[1:]
    tot = 0
    for pid in ids:
        r = check(pid); tot += len(r['flags'])
        print('%s: %d keys, %d events, holds %.0f%%, %d flags' % (pid, r['n'], r['events'], r['hold'], len(r['flags'])))
        for a, b, k, m in r['flags']: print('   %6.1f-%-6.1f %-6s %s' % (a, b, k, m))
    print('TOTAL flags', tot)
