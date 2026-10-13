# AGENCYNAME — Award-Level Creative & Tech Agency Website

A premium, award-winning marketing & tech agency website engineered with Next.js (App Router), JavaScript, Tailwind CSS, GSAP ScrollTrigger, Lenis Smooth Scroll, Framer Motion, and React Three Fiber.

---

## ⚡ Quick Start

### 1. Installation
Install project dependencies:
```bash
npm install
```

### 2. Development Server
Start the Next.js development server:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Production Build
Verify and build for production:
```bash
npm run build
npm run start
```

---

## 📁 Project Structure

```
├── src/
│   ├── app/
│   │   ├── layout.js              # Root layout (fonts, metadata, smooth scroll, cursor, preloader)
│   │   ├── page.js                # Home page (all 10 animated sections)
│   │   ├── globals.css            # Tailwind theme variables, CSS noise overlay, Lenis styles
│   │   ├── about/page.js          # About placeholder route
│   │   ├── services/page.js       # Services placeholder route
│   │   ├── reviews/page.js        # Reviews placeholder route
│   │   ├── portfolio/page.js      # Portfolio placeholder route
│   │   └── contact/page.js        # Contact placeholder route
│   │
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Cursor.jsx         # Custom spring cursor (dot + follower ring + "VIEW" badge)
│   │   │   ├── Footer.jsx         # Global footer with live NYC clock & giant wordmark
│   │   │   ├── Navbar.jsx         # Smart directional navbar & fullscreen mobile menu
│   │   │   ├── PageTransition.jsx # Route entrance animations
│   │   │   ├── Preloader.jsx      # 0–100 animated counter & curtain wipe reveal
│   │   │   └── SmoothScroll.jsx   # Lenis smooth scroll synced with GSAP ScrollTrigger
│   │   │
│   │   ├── home/
│   │   │   ├── Hero.jsx           # Split-text headline, magnetic buttons, scroll indicator
│   │   │   ├── HeroCanvas.jsx     # Lightweight 3D particle constellation (R3F, lazy loaded)
│   │   │   ├── MarqueeSection.jsx # Dual-track infinite scrolling tickers
│   │   │   ├── AboutTeaser.jsx    # Progressive scrub text reveal & clip-path parallax card
│   │   │   ├── Services.jsx       # 3D interactive tilt cards with expandable deliverables
│   │   │   ├── Stats.jsx          # Animated numbers counter on scroll
│   │   │   ├── FeaturedWork.jsx   # Horizontal pinned-scroll gallery (GSAP ScrollTrigger)
│   │   │   ├── Process.jsx        # Vertical drawing SVG timeline
│   │   │   ├── Testimonials.jsx   # Draggable slider with reviews and ratings
│   │   │   └── CTA.jsx            # Spotlight glow hero with magnetic action button
│   │   │
│   │   └── ui/
│   │       ├── Counter.jsx        # Smooth easeOutExpo number counter
│   │       ├── MagneticButton.jsx # Spring physics magnetic button with hover flare
│   │       ├── Marquee.jsx        # Infinite looping ticker component
│   │       ├── Reveal.jsx         # Mask and curtain reveal wrapper
│   │       └── SplitText.jsx      # Words & characters staggered reveal
│   │
│   ├── data/
│   │   ├── site.js                # Agency brand name, navigation, clients, and socials
│   │   ├── services.js            # Services list, tags, and deliverables
│   │   ├── projects.js            # Featured portfolio case studies
│   │   ├── reviews.js             # Testimonials, authors, and client metrics
│   │   ├── stats.js               # Numbers & statistics for the counter section
│   │   └── process.js             # 4-stage execution process steps
│   │
│   └── lib/
│       ├── easing.js              # Bezier curves and easing presets
│       ├── gsap.js                # GSAP + ScrollTrigger registration
│       └── utils.js               # Utility functions (cn, lerp, clamp)
│
├── jsconfig.json                  # Path alias `@/*` configuration
└── package.json                   # Scripts and dependencies
```

---

## 🎨 Where to Edit Content & Brand

All website content is completely separated into the `src/data/` directory:

| What to change | File to edit |
|---|---|
| **Brand Name ("AGENCYNAME"), Links, Socials** | [`src/data/site.js`](file:///d:/Web%20Development/grow%20elite/src/data/site.js) |
| **Colors, CSS Variables, Background Palette** | [`src/app/globals.css`](file:///d:/Web%20Development/grow%20elite/src/app/globals.css) |
| **Services, Tags, Deliverables** | [`src/data/services.js`](file:///d:/Web%20Development/grow%20elite/src/data/services.js) |
| **Featured Case Studies & Work Showcase** | [`src/data/projects.js`](file:///d:/Web%20Development/grow%20elite/src/data/projects.js) |
| **Client Testimonials & Quotes** | [`src/data/reviews.js`](file:///d:/Web%20Development/grow%20elite/src/data/reviews.js) |
| **Animated Stats & Key Metrics** | [`src/data/stats.js`](file:///d:/Web%20Development/grow%20elite/src/data/stats.js) |
| **Execution Steps & Timeline** | [`src/data/process.js`](file:///d:/Web%20Development/grow%20elite/src/data/process.js) |

---

## 🚀 Key Architectural Highlights

1. **JavaScript Only**: 100% clean `.js` and `.jsx` architecture without TypeScript.
2. **Synchronized Lenis & GSAP**: Scroll events pipe directly into GSAP's RAF ticker for unified, stutter-free performance.
3. **Lazy 3D Element**: React Three Fiber Canvas is dynamically imported with `ssr: false` to ensure instant initial page load.
4. **Adaptive Performance**: Honors `prefers-reduced-motion` and disables fine cursor listeners on touch devices.
