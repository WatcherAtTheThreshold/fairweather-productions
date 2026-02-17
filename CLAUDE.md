# Fairweather Productions - Claude Code Guide

## Project Overview

Fairweather Productions is a multi-site creative portfolio for **Jessop & Shannon Hunt**, a husband-and-wife art studio. The site is a constellation of three interconnected brands, all served from one GitHub Pages repository under `www.fairweatherproductions.com`.

**This is a business website. Changes should be careful, tested, and intentional.**

## Core Rules

- Always read files before editing them. Never edit based on assumptions about file contents.
- Verify exact filenames (including case) before referencing assets. Paths are case-sensitive in production on GitHub Pages.
- Before making multi-file changes, read all affected files first. Summarize current state, then propose a plan before editing.
- Do not create new files unless explicitly asked. Prefer editing existing files.
- Do not add comments, docstrings, or type annotations to code you didn't change.

## Architecture

### Three Sites, One Repo

| Site | Directory | Purpose | Aesthetic |
|------|-----------|---------|-----------|
| **Fairweather Studios** | `/` (root) | Main studio site, prints, gallery | Deep blue + gold, warm & trustworthy |
| **The Gentle Machine** | `/gentle-machine/` | Jessop's creative space: games, music, writing, tools | Dark slate + cream, mystical & atmospheric |
| **The Second Gaze** | `/second-gaze/` | Shannon's art: gallery, cards, words | Light cream + gold, gallery-like & warm |

Each sub-site maintains its own images, styles, and navigation. They link to each other via relative paths in footers and offering cards.

### Tech Stack

- **Vanilla HTML, CSS, JavaScript** - no frameworks, no build steps, no bundlers
- **GitHub Pages** deployment from `main` branch, root folder
- **CNAME**: `www.fairweatherproductions.com`
- **FormSubmit.co** for contact forms (no backend)
- **Google Fonts**: Cormorant Garamond, Source Sans Pro (Gentle Machine); Georgia/Times New Roman fallback (Fairweather core)

## Navigation

### Fairweather Studios (main site)
```
Home | Gallery | Prints | Connect
```
All main pages link to: `index.html`, `gallery.html`, `prints.html`, `about.html`

The nav label says "Connect" but the page is `about.html` - this is intentional. The page combines About + Contact into one page.

`contact.html` is a redirect to `about.html#reach-out` for backwards compatibility.

### The Gentle Machine
```
Home | Gallery | Games | Music | Writing | About | Contact
```
Internal navigation within `/gentle-machine/`.

### The Second Gaze
```
Home | Gallery | Cards | About | Contact
```
Internal navigation within `/second-gaze/`.

## Color Palette

### Fairweather Studios
- **Background**: Deep blue gradient `rgba(25, 35, 70)` to `rgba(10, 20, 50)`
- **Primary accent**: `#deb887` (tan/burlap)
- **Light accent**: `#f4e4bc` (cream gold)
- **Button gradient**: `#8B4513` / `#A0522D` / `#CD853F` (saddle brown to peru)
- **Text**: `#e8e8e8` (body), `#c9c9c9` (secondary)

### The Gentle Machine
- **Background**: `#1a1f2e` (dark slate)
- **Text**: `#e8e6e1` (warm cream)
- **Mist overlays** with `hue-rotate` and layered opacity

### The Second Gaze
- **Background**: `#f1ebe6` (warm cream)
- **Text**: `#2e2b29` (dark brown)
- **Accent**: `#d8b26e` (gold)

## CSS & Styling

- CSS is embedded in each HTML file (not external stylesheets), except Second Gaze which uses `css/styles.css`
- No CSS custom properties in `:root` currently - colors are hardcoded per page
- Gradient text titles use `-webkit-background-clip: text` with `-webkit-text-fill-color: transparent`
- Fixed nav with `backdrop-filter: blur(15px)` and `z-index: 100`
- Prefer simple CSS (opacity, color) over transform-based effects when layering with existing animations
- Before implementing CSS animations, check for `animation-fill-mode: forwards`, inline styles, and specificity conflicts

### Z-index Strategy
- Navigation: `z-index: 100`
- Content sections: `z-index: 5`
- Particles/sparkles: `z-index: 2-3`
- Mist overlays: `z-index: -1` to `-3`

### Responsive Breakpoints
- `1024px` - Tablet landscape
- `768px` - Tablet portrait / large mobile
- `650px` - Small tablet (hides "Home" nav link)
- `480px` - Mobile

## JavaScript Patterns

### Particle System
All Fairweather core pages use a floating particle system:
- 80 particles with random positions and staggered animation delays
- Radial gradient dots in `rgba(222, 184, 135)` (tan)
- `twinkle` animation: 4s infinite ease-in-out

### Sparkle System
- Generated dynamically on hover or at intervals (`setInterval(addRandomSparkles, 4000)`)
- Auto-removed after 2 seconds
- Golden color `#ffd700` with drop-shadow

### Mist Overlay (Gentle Machine)
- 3-layer PNG tile system animating at different speeds (140s, 100s, 80s)
- Uses `hue-rotate` and `saturate` filters
- Each layer at different opacity (0.65, 0.45, 0.25)

### Form Handling
- FormSubmit.co with honeypot spam prevention
- Hidden fields: `_template`, `_next`, `_captcha`, `_autoresponse`
- Redirect to `thank-you.html` on submission
- Button disables and shows "Sending..." on submit

### Back-to-Top Button
- Shows after scrolling past 300px
- Opacity toggle via `.show` class
- Smooth scroll via `window.scrollTo({ behavior: 'smooth' })`

## File Organization

```
fairweather-productions/
  index.html              Main homepage
  gallery.html            Full gallery
  prints.html             Prints catalog
  about.html              Combined About + Contact ("Connect")
  contact.html            Redirect to about.html#reach-out
  sales.html              Legacy sales page
  thank-you.html          Form success page
  CNAME                   Domain config
  images/                 Fairweather artwork and assets
  docs/                   Planning documents
  gentle-machine/
    index.html            Gentle Machine home
    gallery.html          Jessop's gallery
    card-gallery.html     Legacy/archive gallery
    music.html            Music player
    chess.html            Chess game
    games.html            Games hub
    writing.html          Stories and writing
    about.html            About Jessop
    contact.html          Contact form
    sigil-oracle.html     Oracle tool
    beep.html             Beep chatbot (speech recognition + LED face)
    images/               Gentle Machine assets
    js/                   Chess and game scripts
  second-gaze/
    index.html            Second Gaze home
    gallery.html          Shannon's gallery
    cards.html            Tarot card pulls
    about.html            About Shannon
    contact.html          Contact form
    words.html            Writing/poetry
    thank-you.html        Form success
    css/styles.css        Shared styles
    images/               Second Gaze assets
    audio/                Audio gallery variant
    back-up6-3-25/        Backup files (do not modify)
```

## Image Conventions

- Artwork: `.webp` format preferred for optimization
- Favicons: `.ico` + `.png` at 32x32, 64x64, 128x128
- Apple touch icons: 180x180 PNG
- Portraits and special assets: `.png`
- Filenames: PascalCase for paintings (e.g., `MinervasWisdom.webp`), kebab-case for others (e.g., `astraea-star-maiden.webp`)

## External Services

- **FormSubmit.co**: Contact forms on all three sites (email: monahanhunt@gmail.com)
- **Sigil Oracle Server**: `sigil-oracle-server.onrender.com` - AI oracle API
- **Google Fonts**: Font loading via stylesheet link

## Content Guidelines

- No emojis in page content
- No em dashes - use regular dashes instead
- Maintain the warm, intentional, human tone across all copy
- Each sub-site has its own voice: Fairweather is warm and inviting, Gentle Machine is contemplative and quiet, Second Gaze is artistic and mythic

## Debugging

- When fixing bugs, check BOTH the symptom location AND the root cause upstream
- Don't fix just the surface symptom - trace data flow from creation to display
- After every 3-4 changes in an iterative session, pause and verify state/rendering dependencies
- Test across all three sites if changing shared patterns (like navigation)

## Workflow

- Use TodoWrite for phased implementation plans on any non-trivial feature
- Each phase should be independently testable
- Prioritize getting to a working state quickly over perfection on first pass
- Keep solutions simple and avoid over-engineering
