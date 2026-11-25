"""Patch shim_env_jb.js Card(): typing effect (heads and lines, synced via lineAt), custom 'paint' cards, scale pulses on impacts,
digit scramble for counters, serif/quote cards."""
import pathlib
H = pathlib.Path(__file__).resolve().parent
p = H / 'shim_env_jb.js'; s = p.read_text(encoding='utf8')
def R(a, b):
    global s
    assert s.count(a) == 1, (s.count(a), a[:80])
    s = s.replace(a, b, 1)

# typed headline
R("hy = by + bh * 0.07 + fs * 2.6;", "hy = by + bh * 0.07 + fs * 2.6, cps = o.cps || 26, hn = Math.floor(Math.max(0, u - 0.15) * cps), headTxt = o.typeHead ? (o.head || '').slice(0, hn) + ((hn < (o.head || '').length || u < 0.15 + (o.head || '').length / cps + 0.9) && Math.floor(u * 3) % 2 === 0 ? '\\u258C' : '') : (o.head || '');")
R("const hp = Math.max(0, Math.min(1, (u - 0.12) / 0.4)),", "const hp = o.typeHead ? 1 : Math.max(0, Math.min(1, (u - 0.12) / 0.4)),")
R("g.fillText(o.head || '', X0, hy); g.restore();", "g.fillText(headTxt, X0, hy); g.restore();")
# typed lines
R("const ly = hy + fs * 1.6 + i * fs * 1.45, la = Math.max(0, Math.min(1, (u - 0.3 - i * 0.12) / 0.3)), isH = i === o.hl, ps = fitPx(g, ln, isH ? '800' : '500', FAM, tw - 12, fs * 0.95);",
  "const LFAM = o.serif ? ' ' + SERIF : FAM, ly = hy + fs * 1.6 + i * fs * 1.45, st = o.lineAt ? o.lineAt[i] - t0 : 0.3 + i * 0.12, la = o.type ? (u >= st ? 1 : 0) : Math.max(0, Math.min(1, (u - st) / 0.3)), isH = i === o.hl, ps = fitPx(g, ln, isH ? '800' : '500', LFAM, tw - 12, fs * 0.95), nn = Math.floor(Math.max(0, u - st) * cps), last = i === (o.lines || []).length - 1, caret = o.type && u >= st && (nn < ln.length || (last && u - st - ln.length / cps < 1.4)) && Math.floor(u * 3) % 2 === 0;")
R("g.save(); g.globalAlpha = la; g.font = (isH ? '800 ' : '500 ') + ps + 'px' + FAM; const lw = g.measureText(ln).width;", "g.save(); g.globalAlpha = la; g.font = (isH ? '800 ' : '500 ') + ps + 'px' + LFAM; const lw = g.measureText(ln).width;")
R("g.textAlign = 'left'; g.textBaseline = 'alphabetic'; g.fillText(ln, X0, ly); g.restore();", "g.textAlign = 'left'; g.textBaseline = 'alphabetic'; g.fillText(o.type ? ln.slice(0, nn) + (caret ? '\\u258C' : '') : ln, X0, ly); g.restore();")
# quote glyph
R("const pad = bw * 0.06, X0 = bx + pad, tw = bw - 2 * pad, fs = bh * 0.1;", "if (o.quote) { g.fillStyle = 'rgba(217,155,38,0.38)'; g.font = '900 ' + bh * 0.6 + 'px ' + SERIF; g.textAlign = 'left'; g.textBaseline = 'alphabetic'; g.fillText('\\u201C', bx + bw * 0.03, by + bh * 0.52); }\n        const pad = bw * 0.06, X0 = bx + pad, tw = bw - 2 * pad, fs = bh * 0.1;")
# paint kind
R("      } else if (kind === 'stamp') {", "      } else if (kind === 'paint') { o.paint(g, pw, ph, u, t);\n      } else if (kind === 'stamp') {")
# pulse
R("const a = Math.min(1, u / (slam ? 0.08 : 0.15)) * out;", "const a = Math.min(1, u / (slam ? 0.08 : 0.15)) * out, pul = (o.pulse || []).reduce((q, pt) => t >= pt ? q + 0.12 * Math.exp(-(t - pt) * 9) : q, 0);")
R("{ sx: sc, sy: sc, a, rot, cw: kind === 'doc' ? 1024 : 768 }", "{ sx: sc * (1 + pul), sy: sc * (1 + pul), a, rot, cw: (kind === 'doc' || kind === 'paint') ? 1024 : 768 }")
# counter scramble
R("g.fillStyle = o.fg || '#E2B857'; g.textAlign = 'center'; g.textBaseline = 'middle'; const hasSub = !!o.sub, px = fitPx(g, o.text,", "const ctxt = (o.scramble && u < o.scramble) ? o.text.replace(/\\d/g, (d, k) => String(Math.floor(hash(Math.floor(u * 40) * 7 + k * 13) * 10))) : o.text;\n        g.fillStyle = o.fg || '#E2B857'; g.textAlign = 'center'; g.textBaseline = 'middle'; const hasSub = !!o.sub, px = fitPx(g, ctxt,")
R("g.fillText(o.text, pw / 2, ph * (hasSub ? 0.43 : 0.52));", "g.fillText(ctxt, pw / 2, ph * (hasSub ? 0.43 : 0.52));")
p.write_text(s, encoding='utf8'); print('card engine upgraded')
