"""Turn an assembled jb2 page (1920x1080) into a 9:16 page (1080x1920). Every replacement is asserted: a missing pattern stops the build.
Used by build_jb.py when cfg has "portrait": true.  Safe zones: headline y 232-390, scene labels y 470-1230, captions end y 1440, bottom 450 px and right 150 px are platform UI."""
import re, pathlib
H = pathlib.Path(__file__).resolve().parent

def to_portrait(s, cfg=None):
    log = []
    def lit(a, b, n=None):
        nonlocal s
        c = s.count(a); assert c >= 1 and (n is None or c == n), ('portrait: pattern count', c, a[:70]); s = s.replace(a, b); log.append((a[:40], c))
    def rx(p, b, n=None):
        nonlocal s
        s, c = re.subn(p, b, s); assert c >= 1 and (n is None or c == n), ('portrait: regex count', c, p[:70]); log.append((p[:40], c))
    lit('<canvas id="gl" width="1920" height="1080">', '<canvas id="gl" width="1080" height="1920">', 1)
    lit('<canvas id="c"  width="1920" height="1080"', '<canvas id="c"  width="1080" height="1920"', 1)
    lit('width: min(100vw, calc(100vh * 16 / 9));', 'width: min(100vw, calc(100vh * 9 / 16));', 1)          # the page wrapper must be 9:16 too, or the canvas is squeezed into a wide box
    lit('height: min(100vh, calc(100vw * 9 / 16));', 'height: min(100vh, calc(100vw * 16 / 9));', 1)
    lit('renderer.setSize(1920, 1080, false);', 'renderer.setSize(1080, 1920, false);', 1)
    lit('new THREE.PerspectiveCamera(44, 1920 / 1080,', 'new THREE.PerspectiveCamera(50, 1080 / 1920,', 1)
    rx(r'\b540 / \(dist', '960 / (dist')                                                       # pixels per world unit: half the frame HEIGHT
    lit('[960 + wx * 115, 860 - wy * 115]', '[540 + wx * 70, 1500 - wy * 70]', 1)
    rx(r'(\.x \* 0\.5 \+ 0\.5\) \* )1920', r'\g<1>1080')                                      # projected x scales by the frame WIDTH
    rx(r'(\.y \* 0\.5 \+ 0\.5\) \* )1080', r'\g<1>1920')
    lit('-dir * 55 * k, vy * 35 * k, 1920, 1080)', '-dir * 70 * k, vy * 150 * k, 1080, 1920)', 1)      # directional blur: stronger and mostly along the vertical for portrait
    lit('-dir * 115 * k, vy * 70 * k, 1920, 1080)', '-dir * 150 * k, vy * 280 * k, 1080, 1920)', 1)
    lit('clamp((vel - 18) / 34, 0, 0.12)', 'clamp((vel - 16) / 40, 0, 0.26)', 1)               # blur appears at lower speeds and gets stronger (whip pans, cranes)
    rx(r'\b0, 0, 1920, 1080\)', '0, 0, 1080, 1920)')                                          # fillRect / clearRect of the full frame
    lit('comp.width = 1920; comp.height = 1080;', 'comp.width = 1080; comp.height = 1920;', 1)
    lit('createRadialGradient(960, 540, 420, 960, 540, 1180)', 'createRadialGradient(540, 960, 300, 540, 960, 1250)', 1)
    # framing guard (buildAdj): safe rectangle centre (540, 850), 880 x 760
    lit('Math.abs(cx - 960) > 1.9 * 900 || Math.abs(cy - 490) > 1.9 * 390', 'Math.abs(cx - 540) > 1.9 * 440 || Math.abs(cy - 850) > 1.9 * 380', 1)
    lit('need = Math.max(need, w / 1640, h / 740, Math.max(Math.abs(o.x0 - 960), Math.abs(o.x1 - 960)) / 900, Math.max(Math.abs(o.y0 - 490), Math.abs(o.y1 - 490)) / 390);',
        'need = Math.max(need, w / 880, h / 760, Math.max(Math.abs(o.x0 - 540), Math.abs(o.x1 - 540)) / 440, Math.max(Math.abs(o.y0 - 850), Math.abs(o.y1 - 850)) / 380);', 1)
    lit('if (w > 3500 || h > 2500 ||', 'if (w > 2500 || h > 3500 ||', 1)
    # label auto-layout (nudge): head zone = headline band, caption zone = captions + platform UI, frame clamp = safe band
    lit('NZ_HEAD = { x0: 0, x1: 670, y0: 0, y1: 205 }, NZ_CAP = { x0: 330, x1: 1590, y0: 875, y1: 1045 }', 'NZ_HEAD = { x0: 0, x1: 1080, y0: 0, y1: 440 }, NZ_CAP = { x0: 0, x1: 1080, y0: 1230, y1: 1920 }', 1)
    lit('if (x1 < -200 || x0 > 2120 || y1 < -200 || y0 > 1280) return;', 'if (x1 < -200 || x0 > 1280 || y1 < -200 || y0 > 2120) return;', 1)
    lit('if (w > 1800 || h > 1000) return;', 'if (w > 1000 || h > 1800) return;', 1)
    lit('if (R.x0 < 30) dx += 30 - R.x0; if (R.x1 > 1890) dx -= R.x1 - 1890; if (R.y0 < 24) dy += 24 - R.y0; if (R.y1 > 1056) dy -= R.y1 - 1056;',
        'if (R.x0 < 40) dx += 40 - R.x0; if (R.x1 > 1040) dx -= R.x1 - 1040; if (R.y0 < 470) dy += 470 - R.y0; if (R.y1 > 1230) dy -= R.y1 - 1230;', 1)
    over = (H / 'portrait_over.js').read_text(encoding='utf8').replace('__CAPBIG__', 'true' if (cfg or {}).get('caption_style') == 'big' else 'false')
    lit('  window.DUR = DUR;', over + '\n  window.DUR = DUR;', 1)
    return s, log
