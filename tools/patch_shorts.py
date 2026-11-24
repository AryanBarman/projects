import re
p = 'C:/Users/Aryan Barman/personal/new_projects/projects/shorts.html'
s = open(p, encoding='utf8').read()

NEW_DEFAULT = '''const DEFAULT = [
    { id: 'short1_offer', hook: 'ELON JUST OFFERED JENSEN THE KEYS TO A $119 BILLION CHIP PLANT', tag: 'THE OFFER', col: '#EBC16B',
      rehook: { seg: 0, t: 11.2, text: 'BUT THERE IS A CATCH', sub: 'On paper it looks unstoppable' },
      cta: { q: 'IS IT A TRAP NEITHER CAN ESCAPE?', line: 'FOLLOW FOR PART 2' },
      segs: [{ file: 'act1_part1_jensen_elon-short.html', from: 0, to: 22.9 }] },
    { id: 'short2_44b', hook: 'THE $44 BILLION LOAN NOBODY CAN REPO', tag: 'THE WEB OF OBSTACLES', col: '#45B8AC',
      rehook: { seg: 1, t: 48.98, text: 'EVEN MORE INTERESTING', sub: 'The lenders are watching orbit' },
      cta: { q: "WHO REALLY OWNS SPACEX'S AI CHIPS?", line: 'FOLLOW FOR THE FULL STORY' },
      segs: [{ file: 'act5_part1_financial_web-short.html', from: 25.4, to: 46.5 }, { file: 'act5_part1_financial_web-short.html', from: 48.98, to: 67.3 }] },
    { id: 'short3_legal', hook: 'WHY JENSEN CANNOT JUST BUILD A NEW NVIDIA', tag: 'THE LEGAL WALL', col: '#D94E43',
      rehook: { seg: 1, t: 66.95, text: 'AND IT GETS WORSE', sub: 'He would start from zero' },
      cta: { q: 'CAN ANYONE BEAT THE CUDA MOAT?', line: 'FOLLOW FOR THE FULL STORY' },
      segs: [{ file: 'act5_part2_legal_wall-short.html', from: 27.4, to: 48.4 }, { file: 'act5_part2_legal_wall-short.html', from: 66.95, to: 80.6 }] },
    { id: 'short4_three_wins', hook: 'ELON GOT 3 WINS WITHOUT SIGNING ANYTHING', tag: 'THE REAL GAME', col: '#9BE01B',
      rehook: { seg: 0, t: 81.5, text: 'WIN NUMBER TWO', sub: 'The talent magnet' },
      cta: { q: 'WHAT IS THE THIRD WIN?', line: 'FOLLOW FOR THE FULL STORY' },
      segs: [{ file: 'act6_full_strategy-short.html', from: 46.6, to: 107.2 }] },
    { id: 'short5_moat', hook: "NVIDIA'S BIGGEST MOAT JUST CRACKED", tag: 'THE VERDICT', col: '#EBC16B',
      rehook: { seg: 0, t: 63.0, text: 'ONE THING IS CERTAIN', sub: 'Sign or not, the damage is done' },
      cta: { q: 'WHAT HAPPENED IN THAT BOARDROOM?', line: 'WATCH THE FULL STORY' },
      segs: [{ file: 'act7_full_conclusion-short.html', from: 43.0, to: 73.6 }] },
    { id: 'short6_sealed', hook: 'SPACEX WENT TO COURT TO HIDE THE COST OF A $119B CHIP FACTORY', tag: 'THE BEST-CASE SCENARIO', col: '#D94E43',
      rehook: { seg: 0, t: 55.25, text: 'IN FACT', sub: 'The filings are that sensitive' },
      cta: { q: 'WHAT ARE THEY HIDING?', line: 'FOLLOW FOR THE FULL STORY' },
      segs: [{ file: 'act3_part1_terrafab_10m_cut-short.html', from: 44.35, to: 66.8 }] }
  ];
  '''
s2 = re.sub(r"const DEFAULT = \[.*?\n  \];\n  ", lambda m: NEW_DEFAULT, s, count=1, flags=re.S)
assert s2 != s; s = s2

NEW_FUNCS = '''  function overlays(sh, i, t) {
    const r = sh.rehook; if (!r || r.seg !== i) return; const e = t - r.t; if (e < 0 || e > 2.6) return;
    const a = Math.min(ease(clamp(e / 0.25, 0, 1)), 1 - ease(clamp((e - 2.2) / 0.4, 0, 1)));
    cx.save(); if (e < 0.18) { cx.fillStyle = 'rgba(255,255,255,' + (0.45 * (1 - e / 0.18)) + ')'; cx.fillRect(0, 0, W, H); }
    cx.globalAlpha = a; cx.translate((1 - ease(clamp(e / 0.3, 0, 1))) * 1080, 0); cx.fillStyle = sh.col; cx.fillRect(0, 760, W, 250); cx.fillStyle = '#0b191e'; cx.textAlign = 'center'; cx.textBaseline = 'middle';
    let sz = 92; cx.font = '900 ' + sz + 'px system-ui, "Segoe UI", sans-serif'; while (cx.measureText(r.text).width > 960 && sz > 48) { sz -= 6; cx.font = '900 ' + sz + 'px system-ui, "Segoe UI", sans-serif'; } cx.fillText(r.text, W / 2, 855);
    cx.font = '700 44px system-ui, "Segoe UI", sans-serif'; cx.fillText(r.sub || '', W / 2, 940); cx.restore();
  }
  function endCard(sh, p) {
    const c = sh.cta || { q: 'WANT THE FULL STORY?', line: 'FOLLOW FOR MORE' };
    cx.fillStyle = '#0b191e'; cx.fillRect(0, 0, W, H); const g = cx.createRadialGradient(540, 900, 80, 540, 900, 1000); g.addColorStop(0, 'rgba(46,82,97,0.7)'); g.addColorStop(1, 'rgba(11,25,30,0)'); cx.fillStyle = g; cx.fillRect(0, 0, W, H);
    cx.textAlign = 'center'; cx.textBaseline = 'middle'; const a1 = ease(clamp(p / 0.25, 0, 1)), a2 = ease(clamp((p - 0.3) / 0.25, 0, 1)), a3 = ease(clamp((p - 0.55) / 0.25, 0, 1));
    cx.globalAlpha = a1; cx.fillStyle = '#f4f1ea'; let sz = 96; cx.font = '900 ' + sz + 'px system-ui, "Segoe UI", sans-serif'; let ls = wrapLines(cx, c.q, 920); while (ls.length > 3 && sz > 50) { sz -= 6; cx.font = '900 ' + sz + 'px system-ui, "Segoe UI", sans-serif'; ls = wrapLines(cx, c.q, 920); }
    ls.forEach((l, i) => cx.fillText(l, W / 2, 700 + (i - (ls.length - 1) / 2) * sz * 1.12));
    cx.globalAlpha = a2; cx.fillStyle = sh.col; cx.fillRect(W / 2 - 280 * a2, 930, 560 * a2, 8);
    cx.globalAlpha = a3; cx.fillStyle = sh.col; cx.font = '900 66px system-ui, "Segoe UI", sans-serif'; cx.fillText(c.line, W / 2, 1040); cx.fillStyle = '#b8c2c7'; cx.font = '700 44px system-ui, "Segoe UI", sans-serif'; cx.fillText($('endtxt').value, W / 2, 1130); cx.globalAlpha = 1;
  }
'''
s2 = re.sub(r"  function endCard\(sh, p\) \{.*?\n", lambda m: NEW_FUNCS, s, count=1, flags=re.S)
assert s2 != s; s = s2
a = "compose(sh, part.w, t, (done + el) / total, hasSubs);"
assert s.count(a) == 1
s = s.replace(a, a + " overlays(sh, i, t);")
assert "await tween(1.4, p => endCard(sh, p));" in s
s = s.replace("await tween(1.4, p => endCard(sh, p));", "await tween(3.2, p => endCard(sh, p));")
s = s.replace('id="endtxt" value="Full story on the channel"', 'id="endtxt" value="Full story on the channel, link in bio"')
open(p, 'w', encoding='utf8').write(s)
print('ok')
