import pathlib
P = pathlib.Path(__file__).resolve().parent.parent.parent; H = pathlib.Path(__file__).resolve().parent
s = (H / '_master_old.html').read_text(encoding='utf8')
acts = """const ACTS = [
    { n: 1, title: 'THE COMEBACK', sub: 'Jensen is back, but is NVIDIA safe?', col: '#EBC16B', parts: ['act1_part1_the_comeback_crash-3d.html', 'act1_part2_eleven_days-3d.html'] },
    { n: 2, title: 'THE BASIC MATH', sub: 'Why a 31.5% bounce was not enough.', col: '#9BE01B', parts: ['act2_part1_the_basic_math-3d.html', 'act2_part2_the_first_warning-3d.html'] },
    { n: 3, title: 'FOLLOW THE MONEY', sub: 'CoreWeave, $118 billion in guarantees and 18% interest.', col: '#45B8AC', parts: ['act3_part1_meet_coreweave-3d.html', 'act3_part2_the_price_of_borrowing-3d.html'] },
    { n: 4, title: 'THE BROKEN PROMISE', sub: 'Inflation, and the Fed that may raise rates.', col: '#D94E43', parts: ['act4_part1_the_promise_hit-3d.html', 'act4_part2_the_rate_hike-3d.html'] },
    { n: 5, title: 'WASHINGTON ASKS QUESTIONS', sub: 'House committees, hearings and an SEC review.', col: '#EBC16B', parts: ['act5_part1_washington_questions-3d.html', 'act5_part2_the_schedule-3d.html'] },
    { n: 6, title: 'THE MONEY SYSTEM', sub: 'Demand is massive. The financing is what changed.', col: '#45B8AC', parts: ['act6_the_money_system-3d.html'] },
    { n: 7, title: 'THE VERDICT', sub: 'The captain is back, but the storm is not over.', col: '#9BE01B', parts: ['act7_the_verdict-3d.html'] }
  ];"""
a = s.index("const ACTS = ["); b = s.index("];", a) + 2
s = s[:a] + acts + s[b:]
s = s.replace("<title>Master recorder — all acts</title>", "<title>Jensen back with crash — final video recorder</title>").replace("Master recorder: all acts in one video", "Jensen back with crash: all 7 acts in one video").replace("http://localhost:8765/master.html", "http://localhost:8765/final_recorder.html")
D = P / 'jensen back with crash'
(D / 'final_recorder.html').write_text(s, encoding='utf8')
(D / 'make_final_video.bat').write_text('@echo off\r\nrem Double-click: starts a local server in this folder and opens the final recorder (Chrome or Edge, GPU computer, keep the tab in front).\r\ncd /d "%~dp0"\r\nstart "" http://localhost:8765/final_recorder.html\r\npython -m http.server 8765\r\n', encoding='utf8')
(D / 'join_final.bat').write_text('@echo off\r\nrem After the recorder downloaded act1.webm ... act7.webm into this folder, this joins them into full.webm and full.mp4 (needs ffmpeg on PATH).\r\ncd /d "%~dp0"\r\npython ..\join_acts.py . --mp4\r\npause\r\n', encoding='utf8')
print('ok', s.count('-3d.html'))
