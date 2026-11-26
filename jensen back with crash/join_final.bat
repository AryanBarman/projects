@echo off
rem After the recorder downloaded act1.webm ... act7.webm into this folder, this joins them into full.webm and full.mp4 (needs ffmpeg on PATH).
cd /d "%~dp0"
python ..\join_acts.py . --mp4
pause
