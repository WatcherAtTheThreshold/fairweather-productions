# Gentle Machine — Design Guide

Reference aesthetic for continued site revision. Based on the music.html revamp (Feb 2026).

---

## Philosophy

Sleek, modern, and understated. The site should feel like looking through frosted glass on a quiet, overcast day — layered depth without visual noise. Cool blues and warm greys, earthy but not heavy. Let the content breathe.

---

## Color Palette

### Backgrounds

| Token | Value | Usage |
|-------|-------|-------|
| Base | `#1a1f2e` | Body / page background |
| Surface | `rgba(26, 31, 46, 0.4)` | Nav buttons (non-active), general containers |
| Surface raised | `rgba(30, 36, 52, 0.5)` | Intro sections, content boxes |
| Card | `rgba(30, 36, 52, 0.65)` | Track cards, content cards |
| Card active | `rgba(35, 42, 62, 0.7)` | Active/playing state cards |
| Fixed bar | `rgba(20, 25, 38, 0.95)` | Now-playing bar, sticky elements |
| Header/Footer | `rgba(26, 31, 46, 0.3)` | Header and footer overlays |

### Text

| Token | Value | Usage |
|-------|-------|-------|
| Primary | `#e8e6e1` | Headings, primary body text |
| Secondary | `rgba(200, 196, 188, 0.85)` | Paragraphs, descriptions |
| Tertiary | `rgba(200, 196, 188, 0.7)` | Subtle labels, metadata |
| Dimmed | `rgba(160, 155, 145, 0.6)` | Timestamps, least important text |

### Accent (Steel Blue)

The primary interactive color. Used at varying opacities.

| Token | Value | Usage |
|-------|-------|-------|
| Blue primary | `rgba(100, 140, 180, _)` | Borders, progress fills, accents |
| Blue light | `rgba(120, 160, 200, _)` | Hover states, emphasis |
| Blue bright | `rgba(140, 175, 210, _)` | Highlights, active indicators |
| Blue muted | `rgba(130, 165, 200, _)` | Gradient endpoints |

Typical opacity range: `0.1` (tints) through `0.5` (borders) to `0.7` (fills).

### Borders

| Token | Value | Usage |
|-------|-------|-------|
| Subtle | `rgba(120, 130, 150, 0.15)` | Container borders at rest |
| Default | `rgba(120, 130, 150, 0.25)` | Standard borders |
| Hover | `rgba(140, 160, 185, 0.4)` | Borders on hover |
| Accent | `rgba(100, 140, 180, 0.5)` | Active/highlighted borders |

---

## Typography

### Fonts

| Role | Family | Weights |
|------|--------|---------|
| Headings | `'Cormorant Garamond', serif` | 400, 500, 700 |
| Body | `'Source Sans Pro', sans-serif` | 300, 400 |
| Monospace | `monospace` | — (times, durations, code) |

### Scale

- Page title (h1): `3.5rem`, Cormorant Garamond
- Section headers: `1.4rem`
- Body text: `1.1rem`
- Small/meta text: `0.85rem`

---

## Glassmorphism

The core visual pattern. Semi-transparent backgrounds + backdrop blur create depth without opacity walls.

| Element type | Background opacity | Blur |
|---|---|---|
| Header / Footer | `0.3` | `5px` |
| Content sections | `0.5` | `10px` |
| Cards | `0.65` | `10px` |
| Fixed bars | `0.95` | `20px` |

Always pair `backdrop-filter: blur()` with a semi-transparent `rgba()` background.

---

## Mist Overlay

Three layered instances of the mist texture, each at different opacity, z-index, speed, and drift direction. Creates a flowing atmospheric depth effect.

| Layer | Opacity | Z-index | Animation | Speed | Direction |
|-------|---------|---------|-----------|-------|-----------|
| 1 (deepest) | `0.65` | `-3` | `mistDrift1` | `140s` | down-left |
| 2 (middle) | `0.45` | `-2` | `mistDrift2` | `100s` | up-right |
| 3 (closest) | `0.25` | `-1` | `mistDrift3` | `80s` | down-right |

All layers use `filter: hue-rotate(200deg) saturate(0.3)` to shift the mist into the blue-grey palette. Each layer also scrolls at a different parallax rate (`-0.2x`, `-0.35x`, `-0.5x`) for depth on scroll.

**Rule:** Closest layers = lowest opacity, fastest animation. Deepest layers = highest opacity, slowest animation.

---

## Spacing

| Token | Value | Usage |
|-------|-------|-------|
| Section padding | `3rem 2rem` | Header, footer, major sections |
| Card padding | `1.5rem` | Cards, control areas |
| Standard | `1rem` | General spacing |
| Compact | `0.5rem` | Tight groupings |
| Grid gap | `1.5rem` | Card grids, nav grids |

---

## Border Radius

| Token | Value | Usage |
|-------|-------|-------|
| Large | `15px` | Intro sections, large containers |
| Medium | `12px` | Cards |
| Small | `8px` | Buttons, nav links, inputs |
| Tiny | `6px` | Small UI elements |
| Minimal | `2px` | Progress bars, waveform bars |
| Circle | `50%` | Play buttons, icon buttons |

---

## Interactive States

### Buttons & Links

- **Default:** Surface background with subtle border
- **Hover:** Slight upward lift (`translateY(-2px)`), border brightens, background tint increases
- **Active/Current page:** Darker, more subdued than siblings — the active state recedes while inactive pages are the lighter/brighter ones

### Transitions

- Standard: `all 0.25s ease`
- Cards: `all 0.3s ease`

### Hover patterns

- Increase border opacity by ~`0.15–0.2`
- Add slight elevation: `translateY(-2px)` or `translateY(-3px)`
- Subtle box-shadow: `0 5px 15px rgba(0, 0, 0, 0.2)`
- Optional shine sweep via `::before` pseudo-element

---

## Particles

Sparse and subtle. 40 particles in 3 types:

| Type | Color | Opacity range | Size range |
|------|-------|---------------|------------|
| Mist | `rgba(160, 175, 195, _)` | `0.1–0.5` | `2–6px` |
| Steel | `rgba(100, 140, 180, _)` | `0.1–0.4` | `1–4px` |
| Dust | `rgba(180, 175, 165, _)` | `0.08–0.35` | `1–3px` |

Animation: `floatGentle` keyframe, 30–40s duration, gentle vertical drift with slight horizontal sway (`±75px`). No glows or box-shadows.

---

## Animation Guidelines

- Keep animations slow and ambient (30s+ for background, 80s+ for mist)
- UI transitions should be quick: `0.25–0.3s`
- Card entrances use `fadeInUp` (0.6s) triggered by IntersectionObserver
- No pulsing, no glows, no starburst effects
- Parallax scrolling on mist layers only

---

## Navigation Pattern

- Grid layout: `repeat(auto-fit, minmax(120px, 1fr))`
- **Inactive pages:** Lighter blue tint background with visible blue border
- **Active page (`.current`):** Darker, subdued background with faint border — active state recedes
- **Special links (e.g., Shadows):** Distinct styling preserved, transparent background, muted text color
- Mobile: Hamburger menu with slide-down animation

---

## Key Principles

1. **Depth through transparency** — layer semi-transparent elements, not solid blocks
2. **Blue-grey palette only** — no purple, gold, or warm accent colors
3. **Subtle over flashy** — if an effect is noticeable on first glance, it's too strong
4. **Warm text on cool backgrounds** — cream/off-white text (`#e8e6e1`) contrasts gently against blue-grey surfaces
5. **Earthy, not clinical** — the dust particles and warm text tones keep it from feeling sterile
6. **Less is more** — minimal particles, gentle animations, clean spacing
