# Far Shore

A calm, first-person stone-skipping game. You flick a stone out over the water, and every place it touches becomes a ripple you can hop to. Walk out from a lake shore, across an open ocean, to a far shore, then turn back and do it again.

It is a single web page: `index.html`. There is no build step.

## Play

Open `index.html` in a browser. It needs an internet connection the first time, because it loads three.js (r128) from cdnjs and two fonts from Google Fonts.

- **Throw:** touch the stone at the bottom of the screen, drag, and flick upward. Let go while your finger is still moving.
  - Flick speed is the stone's speed.
  - Releasing lower on the screen throws flatter. Releasing higher lofts it farther.
  - A curve at the end of the flick adds spin, which keeps the stone stable and hooks its path.
- **Hop:** tap anywhere off the stone to hop to the next ripple. A slower, gentler press glides. Long gaps are crossed in a run of skims.
- **Look:** drag sideways anywhere off the stone.
- **Rest:** land a stone on a boat or island, or tap when one is close, to step onto it.
- **Just skip:** the "Hopping on" button switches to "Just skipping", where stones leave no ripples to walk on and you get a skip count.
- **Keyboard:** Space throws or hops, Arrow Up always throws, Enter steps onto something close.

You can throw at any time, even mid-hop. Each throw clears the ripples still ahead of you.

## What is in it

- **Skipping physics** modelled on the published stone-skipping experiments: a stone rebounds only above a minimum speed, that speed is lowest when the stone's face is tilted about 20 degrees to the water, it never rebounds past about 45 degrees, and spin is what holds the tilt steady.
- **Wind waves** that run downwind with long crests, longer waves moving faster, and fine ripples only where a gust touches down. The stone meets the same waves you see.
- **An ocean swell** that lifts the water, the boats and you as it passes.
- **A crossing** with bare islands in the shallows near each shore, and skiffs, sloops and lit fishing boats out at sea.
- **Weather and time:** dawn, day, dusk and night cycle as you go, with rain squalls and far-off thunder at points along the way.
- **Company:** fish, birds, dolphins that run alongside, and now and then a whale.
- **Sound** synthesised in the page: chimes for each skip and landing, splashes, wind, rain, and whale song.

## Tuning

Everything is in the one script inside `index.html`. The numbers most worth changing:

| Name | Where | What it does |
| --- | --- | --- |
| `CROSS` | near the water setup | Distance between the two shores, in metres. 4000 is roughly a 30 to 45 minute crossing. |
| `MAXHOP` | near `EYE` | Longest single hop, in metres, before a gap becomes a run of skims. |
| `KEYS` | palette section | Sky, water and light colours for dawn, day, dusk and night. |
| `SW` | swell section | Wavelength, direction and weight of the two ocean swell trains. |
| `WAVES` | wind wave section | The short wind-driven waves. |
| `contact()` | physics section | The skip model: speed loss, restitution, tilt wobble and spin hook. |

## Status

This is a prototype. The ocean crossing is a first pass: the stages, boats, weather and animals exist, but there is one of each kind of event and they repeat. The physics constants for speed loss per skip and wave strength are hand-tuned, not measured.
