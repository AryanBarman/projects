import re, json, sys
D = 'C:/Users/Aryan Barman/personal/new_projects/projects/'
SC = 'C:/Users/ARYANB~1/AppData/Local/Temp/claude/6f15eacba9bd00b7/d07cfa11-dd41-4120-a57e-d60d4324f744/scratchpad/'
INF = 1e9
FILES = {
 'a3p1': dict(src='act3_part1_terrafab_10m_cut-v2.html', out='act3_part1_terrafab_10m_cut-3d.html', keys='a3p1_scene.js', scene='a3p1_scene.js', stn=[], dmin=15, dmax=34),
 'a3p2': dict(src='act3_part2_driver_seat_economics-v2.html', out='act3_part2_driver_seat_economics-3d.html', keys='a3p2_scene.js', scene='a3p2_world.js', stn=[], dmin=16, dmax=34),
 'a3p3': dict(src='act3_part3_orbit_vertical_stack-v2.html', out='act3_part3_orbit_vertical_stack-3d.html', keys='a3p3_world.js', scene='a3p3_scene.js', stn=[], dmin=22, dmax=40),
 'a3p4': dict(src='act3_part4_reality_check-v2.html', out='act3_part4_reality_check-3d.html', keys='a3p4_keys.js', scene='a3p4_scene.js', stn=[[15, 3], [48, 31], [62, 54], [90, 75], [104, 97], [INF, 120]], dmin=25, dmax=38),
 'a5p1': dict(src='act5_part1_financial_web-v2.html', out='act5_part1_financial_web-3d.html', keys='a5p1_keys.js', scene='a5p1_scene.js', stn=[[28, 5], [62, 40], [82, 71], [INF, 100]], dmin=25, dmax=38),
 'a5p2': dict(src='act5_part2_legal_wall-v2.html', out='act5_part2_legal_wall-3d.html', keys='a5p2_keys.js', scene='a5p2_scene.js', stn=[[40, 10], [72, 57], [92, 82], [132, 110], [INF, 146]], dmin=25, dmax=38),
 'a5p3': dict(src='act5_part3_washington-v2.html', out='act5_part3_washington-3d.html', keys='a5p3_keys.js', scene='a5p3_scene.js', stn=[[42, 16], [72, 56], [112, 92], [141, 127], [INF, 156]], dmin=25, dmax=38),
 'a6': dict(src='act6_full_strategy-v2.html', out='act6_full_strategy-3d.html', keys='a6_keys.js', scene='a6_scene.js', stn=[[32, 20], [76, 56], [104, 90], [140, 120], [168, 154], [182, 170], [200, 190], [226, 206], [252, 238], [282, 266], [300, 290], [INF, 306]], dmin=25, dmax=38),
 'a7': dict(src='act7_full_conclusion-v2.html', out='act7_full_conclusion-3d.html', keys='a7_keys.js', scene='a7_scene.js', stn=[[44, 18], [96, 70], [150, 124], [228, 196], [280, 250], [INF, 292]], dmin=25, dmax=38),
}

def build(name):
    cfg = FILES[name]
    s = open(D + 'newsomething.html', encoding='utf8', newline='').read().replace('\r\n', '\n')
    v2 = open(D + cfg['src'], encoding='utf8').read()
    def rep(a, b, n=1):
        nonlocal s
        assert s.count(a) == n, (name, s.count(a), a[:70]); s = s.replace(a, b)
    def blk(txt, start, end):
        a = txt.index(start); b = txt.index(end, a) + len(end); return txt[a:b]
    for start, end in [("  const SUBS = [", "\n  ];\n"), ("  const LEDGER = [", "\n  ];\n"), ("  const CUE_SHEET = [", "\n  ];\n"), ("  const KEYCOL = {", "\n  };\n")]:
        new = blk(v2, start, end); a = s.index(start); b = s.index(end, a) + len(end); s = s[:a] + new + s[b:]
    s = s.replace("  const SUBS = [", "  PAL.cyanHi = '#6FD6CB';\n  const SUBS = [", 1)
    dur = re.search(r"const DUR = ([\d.]+);", v2).group(1)
    rail = re.search(r"const S = \[([\d., ]+)\];", v2).group(1)
    title = re.search(r"<title>(.*?)</title>", v2).group(1)
    audio = re.search(r'<audio id="vo" src="([^"]+)"', v2).group(1)
    s = s.replace("38.00", dur)
    rep("drawRail(time, [0.00, 5.86, 19.26, 29.92, %s])" % dur, "drawRail(time, [%s])" % rail)
    starts = rail.rsplit(',', 1)[0]
    rep("const SCENE_STARTS = [0.0, 3.46, 11.18, 19.18];", "const SCENE_STARTS = [%s];" % starts)
    s = re.sub(r'<datalist id="scenes">.*?</datalist>', '<datalist id="scenes">' + ''.join('<option value="%s"></option>' % x.strip() for x in starts.split(',')) + '</datalist>', s, flags=re.S)
    rep('src="Act 3 part 2.wav"', 'src="%s"' % audio)
    s = s.replace("Act 3 Part 2 — Jensen in the Driver's Seat: Economics, Cybercabs, Optimus & xAI", title + " (3D)")
    base = cfg['out'].replace('.html', '')
    s = s.replace("act3_part2_mixed_audio.wav", base + "_mixed_audio.wav").replace("act3_part2_jensen_elon.webm", base + ".webm")
    rep("for (let i = 0; i < 18; i++) {" + chr(10) + "      const bxPos", "for (let i = 0; i < 0; i++) {" + chr(10) + "      const bxPos")
    rep("    scene.add(gantry);", "")
    rep("[-12, -26, -38].forEach((cz, idx) => {", "[].forEach((cz, idx) => {")
    rep("for (let i = 0; i < 8; i++) {" + chr(10) + "      const sh = new THREE.Mesh(", "for (let i = 0; i < 0; i++) {" + chr(10) + "      const sh = new THREE.Mesh(")
    a0 = v2.index("  const SPRITE_DATA = "); a1 = v2.index("\n", a0)
    rep("  const SPR = {}, SPR_LOAD = [];", v2[a0:a1] + "\n  const SPR = {}, SPR_LOAD = [];")
    keys_src = open(SC + cfg['keys'], encoding='utf8').read()
    klines = [l for l in keys_src.split('\n') if re.match(r'^\s*K\(.*\);\s*$', l)]
    cam = open(SC + 'shim_cam.js', encoding='utf8').read()
    cam = cam.replace('__STN__', json.dumps([{'b': b, 'c': c} for b, c in cfg['stn']])).replace('__DMIN__', str(cfg['dmin'])).replace('__DMAX__', str(cfg['dmax'])).replace('__KEYS__', '\n'.join(klines))
    a = s.index("  const CAM_KEYS = [];"); m = s.index("  // 4. DUAL-CANVAS"); b = s.rfind("  // ====", 0, m)
    s = s[:a] + cam + s[b:]
    scene_src = open(SC + cfg['scene'], encoding='utf8').read()
    scene_src = scene_src[scene_src.index("  const HEADS = ["):]
    scene_src = re.sub(r"\n  const Line3 = [^\n]*", "", scene_src)
    pat1 = r"    const cv = evalCam\(t\);\n    Cam3D\.set\([^\n]*\n    GROUND = \[\]; ITEMS = \[\]; OVER = \[\];"
    scene_src, n1 = re.subn(pat1, "    beginFrame(t);", scene_src)
    pat2 = r"    drawBG\([^\n]*\n    GROUND\.forEach[^\n]*\n    ITEMS\.sort[^\n]*\n    OVER\.forEach[^\n]*\n    HEADS\.forEach\([^\n]*\n  \}"
    scene_src, n2 = re.subn(pat2, "    endFrame(t);\n  }", scene_src)
    assert n1 == 1 and n2 == 1, (name, n1, n2)
    env = open(SC + 'shim_env.js', encoding='utf8').read()
    a = s.index("    // Through-line: Golden silicon conduit"); b = s.index("  function renderModelSheet(t) {")
    s = s[:a] + env + scene_src + "\n  function renderScene(t) { if (!HAS_THREE) return; renderShots(t); }\n\n" + s[b:]
    open(D + cfg['out'], 'w', encoding='utf8', newline='\n').write(s)
    return cfg['out'], len(s) // 1024

if __name__ == '__main__':
    for n in sys.argv[1:]:
        print(build(n))
