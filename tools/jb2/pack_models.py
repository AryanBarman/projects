"""Pack GLB files into one JS file of base64 strings so a page can embed them (no network, no file:// fetch).
usage: python pack_models.py <out.js> <name=path.glb> [<name=path.glb> ...]      ->  window.MODELS_B64 = { name: 'base64...' }
The packed models are CC0 (see docs/ASSETS_3D.md for sources); do not run anything that came from a download, this only reads the bytes."""
import sys, base64, pathlib, json
out = pathlib.Path(sys.argv[1]); d = {}
for a in sys.argv[2:]:
    k, p = a.split('=', 1); d[k] = base64.b64encode(pathlib.Path(p).read_bytes()).decode()
out.write_text('window.MODELS_B64 = ' + json.dumps(d) + ';\n', encoding='utf8'); print(out.name, len(d), 'models', out.stat().st_size // 1024, 'KB')
