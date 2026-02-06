# Card Gallery Plan

## Goal
Create `card-gallery.html` in the Fairweather Productions root, based on the interactive flip-card system from `second-gaze/cards.html`. This will be a gallery-style card experience using artwork from `/images`, with original card-back text written to match the site's mystical, contemplative tone.

---

## Source Reference
- **Template:** `second-gaze/cards.html` — interactive flip cards with 3D perspective transform, cream/gold aesthetic, mystical text on backs
- **Tone:** Intimate, mythic, poetic. Short oracle-style meditations. Phrases like *"made of quiet fire"*, *"rooted in beauty, crowned in nature's gentle wisdom"*

---

## Image Selection

### Excluded (39 images)
| Category | Files |
|----------|-------|
| Favicons & sized PNGs | `brush_favicon.ico`, `brush_16x16.png`, `brush_32x32.png`, `brush_48x48.png`, `brush_64x64.png`, `brush_128x128.png`, `brush_256x256.png`, `brush_apple_touch_180x180.png`, `eye_favicon.ico`, `eye_16x16.png`, `eye_32x32.png`, `eye_48x48.png`, `eye_64x64.png`, `eye_128x128.png`, `eye_256x256.png`, `eye_apple_touch_180x180.png` |
| Sigils | `sigil1.png` through `sigil17.png` |
| Mockups | `mockup-stacked-wrap.jpg` |
| Background/overlay assets | `mist-overlay.png`, `mist-tile.png` |
| Photo documentation (not artwork) | `IMG_0131.png`, `IMG-3868.png`, `IMG-3869.png`, `IMG-3870.png` |

### Included (59 images)
These are the artwork files that will become cards:

**Portraits & Character Works (13)**
1. `AlexandraPortrait.png`
2. `FeePortrait.png`
3. `JenAndTerry.png`
4. `JessopPortrait.png`
5. `RowanPortrait.png`
6. `SaraQuinn.png`
7. `ShanPortrait.png`
8. `Shan-Crabby.png`
9. `Shan-Ego-Ink22.png`
10. `Shan-Flame.png`
11. `Shan-Forget-Ink22.png`
12. `Shan-Trip-Ink22-ForWeb.png`
13. `MrBinnSmallerFile.png`

**Nature & Landscape Works (23)**
14. `Atrium2.png`
15. `Birch.png`
16. `BirchesWc.png`
17. `BirchMeadow.png`
18. `BlueLandscape.png`
19. `Chickadee.png`
20. `Flowers.png`
21. `GoldenInvitation.png`
22. `LaPuertaAzul.png`
23. `MoonGarden-CC.png`
24. `MoonlightDoctrine.png`
25. `MorningPrayer.png`
26. `NerudaAoede-CC.png`
27. `Nuthatch.png`
28. `PaintedLady.png`
29. `ShadowoftheMountain.png`
30. `Solitude.png`
31. `SummerStroll.png`
32. `SunriseDoctrine.png`
33. `ThePaintedLady.png`
34. `TwoChickadees.png`
35. `WizardScreen.png`
36. `YellowLandscape.png`

**Mythological & Mystical Works (10)**
37. `Ellie and the Cosmic Swaddle.png`
38. `astraea-star-maiden.webp`
39. `oshun.webp`
40. `oracle-at-delphi.webp`
41. `hypatia.webp`
42. `lyras-weaver.webp`
43. `PotniaTheron.webp`
44. `under-the-aegis-of-inanna.webp`
45. `under-the-aegis-of-ishtarr.webp`
46. `hypolimnus-anomala.webp`

**Additional WebP Works (20)**
47. `Apple Blossom.webp`
48. `BarnOwlandSnowMoon.webp`
49. `bookmarks.webp`
50. `FlowerPot.webp`
51. `ForestDweller.webp`
52. `forget.webp`
53. `GazingBall.webp`
54. `MinervasWisdom.webp`
55. `Moonlit Silence.webp`
56. `nest.webp`
57. `Scurry.webp`
58. `Stand.webp`
59. `The Dreamer.webp`
60. `TheGirlFromIpanema.webp`
61. `TheSoundofFallingSnow.webp`
62. `UglyMug.webp`
63. `ValentineFoxs.webp`
64. `Way Home.webp`

---

## Page Design

### Layout Differences from `cards.html`
- **Gallery display** — all cards visible at once in a responsive grid (not random draw mode)
- **No toggle buttons** — no 1-card / 3-card draw mechanic
- **Scroll-through experience** — browse the full collection
- **Same flip interaction** — click any card to flip and read its message
- **Same aesthetic** — cream/beige gradient, Crimson Text font, golden accents, warm color palette

### Structure
```
card-gallery.html
├── Head (meta, favicons using brush_*, fonts, inline CSS)
├── Header (Fairweather nav: Home | Gallery | Prints | Card Gallery | Connect)
├── Main
│   ├── Title section ("The Card Gallery" or similar)
│   ├── Intro text (brief poetic invitation)
│   ├── Card grid (responsive CSS grid/flexbox)
│   │   └── 59 flip cards (front: artwork image, back: title + message)
│   └── Back-to-top button
├── Footer (matching main site footer style)
└── Script (flip logic, scroll behavior)
```

### CSS Approach
- Adapt the flip-card CSS from `cards.html` (3D transform, backface-visibility, etc.)
- Use CSS Grid for the gallery layout: `repeat(auto-fill, minmax(280px, 1fr))`
- Match the Fairweather main site navigation and header style
- Keep the warm cream/gold/brown palette from `cards.html`
- Responsive breakpoints for mobile (single column) and tablet (2 columns)

### Card Back Text
Each card gets a title (derived from the filename, human-readable) and an original poetic message written in the site's oracle/meditation style — short, second-person, evocative, rooted in myth and nature. Examples from the existing cards:
- *"Insight is not given, it is earned."*
- *"What grows in the dark will bloom under moonlight."*
- *"Your duality is your strength."*

---

## Implementation Steps

1. **Create `card-gallery.html`** with the full HTML structure
2. **Adapt CSS** from `cards.html` for gallery grid layout
3. **Build the card data array** — all 59 images with titles and messages
4. **Write original card-back text** for each of the 59 artworks
5. **Implement flip interaction** via JavaScript (click to toggle `.flipped` class)
6. **Add back-to-top button** and scroll behavior
7. **Test responsiveness** across breakpoints
8. **Add navigation link** to card gallery from other pages (optional, confirm with user)

---

## Open Questions
- Should the card gallery be linked from the main site navigation?
- Should there be any filtering or categorization (portraits, landscapes, mythological)?
- Should the page use the Fairweather dark blue theme or the Second Gaze cream theme?
- Are there any images in the included list that should actually be excluded?
- Should any of the `IMG_*.png` photos actually be included (they appear to be photos rather than artwork)?
