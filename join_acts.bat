@echo off
rem Double-click this in the folder that holds act1.webm ... act7.webm.
rem Joins them into full.webm (no re-encode) and also makes full.mp4.
cd /d "%~dp0"
python join_acts.py . --mp4
pause
