# Card Gallery Plan — V2

## Goal

Create `card-gallery.html` in `/gentle-machine`, based on the interactive flip-card system from `second-gaze/cards.html`. This will be a gallery-style card experience showcasing artwork from `/images` (in fairweather-productions root), with original card-back text written in the site's mystical, contemplative tone. The page will live inside The Gentle Machine and match its dark, purple-accented aesthetic — header, footer, navigation, and all.

---

## Source Reference

* **Card mechanic template:** `second-gaze/cards.html` — interactive flip cards with 3D perspective transform, click-to-flip
* **Site shell & aesthetic:** `gentle-machine/index.html` — dark (#0a0a0a) background, purple accents (rgba(138,43,226,...)), Cormorant Garamond + Source Sans Pro, glassmorphism nav, particle system, inline CSS
* **Tone:** Intimate, mythic, poetic. Short oracle-style meditations. *"quietly relentless"*, *"made of quiet fire"*, *"rooted in beauty, crowned in nature's gentle wisdom"*

---

## Image Selection

### Excluded (36 images)

| Category | Files |
| -------- | ----- |
| Favicons & sized PNGs (16) | `brush_favicon.ico`, `brush_16x16.png`, `brush_32x32.png`, `brush_48x48.png`, `brush_64x64.png`, `brush_128x128.png`, `brush_256x256.png`, `brush_apple_touch_180x180.png`, `eye_favicon.ico`, `eye_16x16.png`, `eye_32x32.png`, `eye_48x48.png`, `eye_64x64.png`, `eye_128x128.png`, `eye_256x256.png`, `eye_apple_touch_180x180.png` |
| Sigils (17) | `sigil1.png` through `sigil17.png` |
| Mockups (1) | `mockup-stacked-wrap.jpg` |
| Background/overlay assets (2) | `mist-overlay.png`, `mist-tile.png` |

### Included (62 images)

These are the artwork files that will become cards. Image paths will be `../images/FILENAME` (relative from gentle-machine).

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

**Nature & Landscape Works (26)**

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
37. `IMG-3868.png`
38. `IMG-3869.png`
39. `IMG-3870.png`

**Mythological & Mystical Works (10)**

40. `Ellie and the Cosmic Swaddle.png`
41. `astraea-star-maiden.webp`
42. `oshun.webp`
43. `oracle-at-delphi.webp`
44. `hypatia.webp`
45. `lyras-weaver.webp`
46. `PotniaTheron.webp`
47. `under-the-aegis-of-inanna.webp`
48. `under-the-aegis-of-ishtarr.webp`
49. `hypolimnus-anomala.webp`

**Additional Works (13)**

50. `Apple Blossom.webp`
51. `BarnOwlandSnowMoon.webp`
52. `bookmarks.webp`
53. `FlowerPot.webp`
54. `ForestDweller.webp`
55. `forget.webp`
56. `GazingBall.webp`
57. `MinervasWisdom.webp`
58. `Moonlit Silence.webp`
59. `nest.webp`
60. `Scurry.webp`
61. `Stand.webp`
62. `The Dreamer.webp`
63. `TheGirlFromIpanema.webp`
64. `TheSoundofFallingSnow.webp`
65. `UglyMug.webp`
66. `ValentineFoxs.webp`
67. `Way Home.webp`
68. `IMG_0131.png`

---

## Page Design

### Layout Differences from `cards.html`

* **Gallery display** — all cards visible at once in a responsive grid (not random draw mode)
* **No toggle buttons** — no 1-card / 3-card draw mechanic
* **Scroll-through experience** — browse the full collection
* **Same flip interaction** — click any card to flip and read its message
* **No filtering/categorization** — all cards in a single flat grid

### Aesthetic: Gentle Machine Dark Theme

The page will match the Gentle Machine site, **not** the Second Gaze cream palette:

* **Background:** #0a0a0a with mist overlay
* **Text:** #f2f2f2 (off-white)
* **Accent:** purple `rgba(138, 43, 226, ...)` at various opacities
* **Fonts:** Cormorant Garamond (headings) + Source Sans Pro (body/nav)
* **Effects:** Glassmorphism nav, floating particles, backdrop-filter blur
* **Card backs:** Adapted to work on the dark theme — possibly a dark parchment or dark glassmorphic panel with purple/gold accents instead of the cream from Second Gaze

### Structure

```
gentle-machine/card-gallery.html
├── Head
│   ├── Meta, viewport
│   ├── Favicons (quill_favicon.ico, quill_32x32, etc.)
│   ├── Google Fonts (Cormorant Garamond + Source Sans Pro)
│   └── Inline CSS (Gentle Machine base + card gallery grid + flip-card mechanics)
├── Nav (Gentle Machine standard)
│   ├── Mobile hamburger menu
│   └── Links: Home | Gallery | Games | Music | Writing | About | Contact | ⟁ Shadows
├── Main
│   ├── Title section (e.g. "The Card Gallery")
│   ├── Intro text (brief poetic invitation, matching GM tone)
│   ├── Card grid (CSS Grid, responsive)
│   │   └── 62 flip cards
│   │       ├── Front: artwork image (background-image from ../images/)
│   │       └── Back: card title + poetic message (dark-themed panel)
│   └── Back-to-top button
├── Footer
│   └── © 2025 The Gentle Machine | In collaboration with The Second Gaze & Fairweather - quietly relentless.
├── Particles (JS-generated floating elements)
└── Script
    ├── Flip logic (click toggles .flipped class)
    ├── Mobile menu toggle
    ├── Particle generation
    ├── Scroll-to-top behavior
    └── Card data array (62 entries with image, title, message)
```

### CSS Approach

* **Flip-card mechanics** adapted from `cards.html` (3D perspective, transform-style: preserve-3d, backface-visibility)
* **Gallery grid:** `display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 2rem;`
* **Card back redesign:** Dark background with subtle purple radial gradients, golden accent text, glassmorphic feel — keeping the oracle message aesthetic but fitting the dark theme
* **All CSS inline** in `<style>` tag (matching Gentle Machine convention — no external stylesheets)
* **Responsive:** Single column ≤480px, 2 columns ≤768px, auto-fill grid above

### Card Back Text

Each card gets:
* **Title** — human-readable name derived from filename
* **Poetic message** — original, 1-3 sentences, second-person, oracle/meditation style

The tone bridges the Gentle Machine's *"quietly relentless"* energy with the Second Gaze's divination warmth. Messages should feel like intimate whispered truths — mythic, rooted in nature, and gently fierce.

---

## Implementation Steps

1. **Create `gentle-machine/card-gallery.html`** with full HTML shell (head, nav, footer, particles — matching existing GM pages)
2. **Build the card data array** — 62 entries with image filename, display title, and poetic message
3. **Write original card-back text** for all 62 artworks (oracle-style, matching tone)
4. **Implement flip-card CSS** — adapted from cards.html but restyled for dark theme
5. **Implement gallery grid CSS** — responsive auto-fill layout
6. **Implement JavaScript** — card rendering, flip interaction, mobile menu, particles, scroll-to-top
7. **Test and refine** across breakpoints

---

## Resolved Questions

* **Navigation link?** — Not linked from main Fairweather nav for now. Page has Gentle Machine's own nav and footer.
* **Filtering/categories?** — No, flat grid for now.
* **Theme?** — Gentle Machine dark theme with purple accents.
* **IMG photos?** — They are artwork. IMG-3868/3869/3870 added to Nature & Landscape; IMG_0131 added to Additional Works.
* **Excluded images?** — None beyond favicons, sigils, mockup, and mist overlays.
