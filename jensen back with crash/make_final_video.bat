@echo off
rem Double-click: starts a local server in this folder and opens the final recorder (Chrome or Edge, GPU computer, keep the tab in front).
cd /d "%~dp0"
start "" http://localhost:8765/final_recorder.html
python -m http.server 8765
