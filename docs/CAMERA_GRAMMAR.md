# CAMERA GRAMMAR — when to move, when to hold, where to zoom (jen_back series)

Key syntax in `tools\jb\<id>_keys.js`: `K(t, [pos], [look], fov, 'fly'|'hold'|'push'|'pull')`. Position is derived from the look point; the type decides the move.

| type | motion | use it when |
|---|---|---|
| `fly` | fast (about 1.1 s) move to a new place, NEW angle, then settles | the story changes place or idea (station change). Never while a concept is being explained. |
| `hold` | same framing, almost still (tiny drift) | a concept, diagram, document or typed text is being read. The viewer should read, not chase the picture. |
| `push` | slow zoom IN, same angle, no orbit | ONE point matters: a number, a stamp, a name, a quote, the key word of the sentence. Start the push 1 s before the word, finish on it. |
| `pull` | slow zoom OUT, same angle | reveal scale, context or consequence: a network cracking, a crowd, the whole chart after the number, the end of a beat. |

| `arc` | slow orbit around the subject, same distance | a long hold (3 s or more) where a fully static frame would feel dead: diagrams being typed, a crowd, a network. |

Rules of thumb
1. One camera move per idea. A beat is: fly (arrive) -> hold (establish) -> push (the point) -> pull (the consequence) -> fly (next beat).
2. Zoom IN for: numbers, stamps/verdicts, quotes being typed, a face reacting, a single object that changes state.
3. Zoom OUT for: "the whole system", "everything fell apart", crowds, "in a single day", the last beat of a station.
4. While text is typing or a counter is rolling: `hold` or a very slow `push`. Never a fly.
5. Fast moves only between stations; slow moves inside them. Living-camera drift is automatically 0 during push/pull, tiny during hold.
6. Do not push and pull on the same second; leave at least 1.5 s of hold between a push and the next move.
