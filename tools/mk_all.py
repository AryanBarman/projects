import build_short as b
S={'act5_part2_legal_wall':1,'act5_part1_financial_web':1,'act6_full_strategy':1,'act7_full_conclusion':1,'act3_part1_terrafab_10m_cut':1}
for n in S: b.build(n+'-3d.html', n+'-short.html'); print('built', n+'-short.html')
b.build('act1_part1_jensen_elon_3d-hybrid-v2.html','act1_part1_jensen_elon-short.html'); print('built act1_part1_jensen_elon-short.html')
