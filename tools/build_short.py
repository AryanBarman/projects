import re, sys
D = 'C:/Users/Aryan Barman/personal/new_projects/projects/'
SC = 'C:/Users/ARYANB~1/AppData/Local/Temp/claude/6f15eacba9bd00b7/d07cfa11-dd41-4120-a57e-d60d4324f744/scratchpad/'
DPORT = 31   # minimum camera distance so ~16 world units fit across a 9:16 frame
def build(src, out):
    s = open(D + src, encoding='utf8', newline='').read().replace('\r\n', '\n')
    log = []
    def sub(a, b, must=True):
        nonlocal s
        n = s.count(a)
        if n == 0 and must: raise SystemExit('missing: ' + a[:60])
        s = s.replace(a, b); log.append((a[:36], n))
    sub('<canvas id="gl" width="1920" height="1080">', '<canvas id="gl" width="1080" height="1920">')
    s = re.sub(r'<canvas id="c"  width="1920" height="1080"', '<canvas id="c"  width="1080" height="1920"', s)
    sub('renderer.setSize(1920, 1080, false);', 'renderer.setSize(1080, 1920, false);')
    s = re.sub(r'new THREE\.PerspectiveCamera\(44, 1920 / 1080,', 'new THREE.PerspectiveCamera(50, 1080 / 1920,', s)
    sub('const ppu = 540 /', 'const ppu = 960 /')
    sub('return [960 + wx * 115, 860 - wy * 115];', 'return [540 + wx * 70, 1500 - wy * 70];')
    sub('return [(v.x * 0.5 + 0.5) * 1920, (-v.y * 0.5 + 0.5) * 1080];', 'return [(v.x * 0.5 + 0.5) * 1080, (-v.y * 0.5 + 0.5) * 1920];')
    sub('ctx.drawImage(glCanvas, -dir * 55 * k, vy * 35 * k, 1920, 1080);', 'ctx.drawImage(glCanvas, -dir * 40 * k, vy * 55 * k, 1080, 1920);')
    sub('ctx.drawImage(glCanvas, -dir * 115 * k, vy * 70 * k, 1920, 1080);', 'ctx.drawImage(glCanvas, -dir * 85 * k, vy * 110 * k, 1080, 1920);')
    sub('ctx.clearRect(0, 0, 1920, 1080);', 'ctx.clearRect(0, 0, 1080, 1920);', must=False)
    sub('ctx.fillStyle = grainPat; ctx.fillRect(0, 0, 1920, 1080);', 'ctx.fillStyle = grainPat; ctx.fillRect(0, 0, 1080, 1920);')
    # camera: keep each key's focus point, pull back to a distance that fits a narrow frame, tilt down a little more
    if 'ZSTEP' in s:
        s = re.sub(r'DMIN = [\d.]+, DMAX = [\d.]+, YAWMAX = ([\d.]+), PMIN = ([\d.]+), PMAX = ([\d.]+)', 'DMIN = %d, DMAX = %d, YAWMAX = 0.24, PMIN = 0.20, PMAX = 0.40' % (DPORT, DPORT + 14), s)
        sub('Math.max(38, Math.min(52, v[6]))', '50')
        sub('e.m.scale.set(w * sc, h * sc, 1); billboard(e.m, o.rot);', 'e.m.scale.set(w * sc * 1.3, h * sc * 1.3, 1); billboard(e.m, o.rot);')
    else:   # older Three.js engine: wrap the camera evaluator
        sub('function evalCam(t) {', 'function evalCamL(t) {')
        wrap = ('  function evalCam(t) {\n    const v = evalCamL(t).slice(); let dx = v[0] - v[3], dy = v[1] - v[4], dz = v[2] - v[5]; const d = Math.hypot(dx, dy, dz) || 1, k = Math.max(1, %d / d);\n'
                '    v[0] = v[3] + dx * k; v[1] = v[4] + dy * k + 1.2; v[2] = v[5] + dz * k; v[6] = 50; return v;\n  }\n' % DPORT)
        a = s.index('  // =========', s.index('function evalCamL(t) {')); s = s[:a] + wrap + s[a:]
    # portrait overrides (headline, captions, progress)
    over = open(SC + 'portrait_over.js', encoding='utf8').read()
    sub('  window.DUR = DUR;', over + '  window.DUR = DUR;')
    open(D + out, 'w', encoding='utf8', newline='\n').write(s)
    return log
if __name__ == '__main__':
    print(build(sys.argv[1], sys.argv[2]))
