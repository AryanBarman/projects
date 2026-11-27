@echo off
cd /d "%~dp0"
start "" http://localhost:8765/final_recorder.html
python -m http.server 8765
