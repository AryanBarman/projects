#!/bin/bash
# usage: bash fullcheck.sh  -> runs fitcheck + camstat on every jen_back part, writes SCR/full_report.txt
P="C:/Users/Aryan Barman/personal/new_projects/projects"; M="C:/Users/Aryan Barman/Projects/learning/myenv-test"; S="${SCR:-C:/Users/ARYANB~1/AppData/Local/Temp/claude/6f15eacba9bd00b7/d07cfa11-dd41-4120-a57e-d60d4324f744/scratchpad/aud}"
rm -f $S/full_report.txt $S/full_cam.txt; cd "$P/tools/jb"
for p in "act1_part1_the_comeback 23.9" "act1_part2_how_did_we_get_here 63.9" "act2_part1_one_man_empire 52.5" "act2_part2_musk_smells_blood 68.2" "act3_part1_enter_washington 42.3" "act3_part2_the_backlash 73.8" "act4_part1_built_around_jensen 48.6" "act4_part2_new_normal 32.2" "act4_part3_too_big_to_fail 33.1" "act5_part1_the_44b_deal 39" "act5_part2_the_wall 53.6" "act5_part3_same_trap 33.1" "act6_part1_the_illusion 38.3" "act6_part2_the_chokepoint 57.6" "act7_the_verdict 60.4"; do
  set -- $p; cp "$P/jen_back/$1-3d.html" "$M/pv_full.html"
  SCR=$S timeout 600 node fitcheck.js pv_full.html $2 1 > "$S/full_$1.txt" 2>&1
  SCR=$S timeout 150 node camstat.js pv_full.html $2 2>/dev/null | tail -1 | sed "s/pv_full.html/$1/" >> "$S/full_cam.txt"
  head -1 "$S/full_$1.txt" | sed "s/pv_full.html/$1/" >> "$S/full_report.txt"
done; rm -f "$M/pv_full.html"; echo DONE >> "$S/full_report.txt"
