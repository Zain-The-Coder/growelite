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

## 📧 Email Setup (Contact Form with Resend)

The contact form is powered by [Resend](https://resend.com) via Next.js App Router API Route (`src/app/api/contact/route.js`).

### 1. Environment Configuration
Create a `.env.local` file in your project root by copying `.env.example`:
```bash
cp .env.example .env.local
```

Fill in your Resend credentials:
```env
# Resend API Key from https://resend.com/api-keys
RESEND_API_KEY=re_your_api_key_here

# The recipient email where incoming inquiries should be sent
CONTACT_TO_EMAIL=hello@growelite.net

# Verified sender email in Resend
# For initial testing before domain verification, you can use:
# CONTACT_FROM_EMAIL=GrowElite <onboarding@resend.dev>
# For production once your domain is verified in Resend:
CONTACT_FROM_EMAIL=GrowElite <contact@yourdomain.com>

# Public site URL
NEXT_PUBLIC_SITE_URL=https://growelite.net
```

### 2. Domain Verification (Production)
1. Add your custom domain in the [Resend Domains Dashboard](https://resend.com/domains).
2. Configure the provided DNS records (DKIM, SPF, MX) at your DNS provider.
3. Once verified, update `CONTACT_FROM_EMAIL` to use your domain address (e.g. `GrowElite <hello@growelite.net>`).

### 3. Built-in Protections
- **Anti-Spam Honeypot**: Hidden `website_hp` field traps automated crawlers.
- **Bot Timing Detection**: Inquiries submitted faster than 3 seconds are rejected silently.
- **In-Memory Rate Limiting**: Maximum 5 submissions per IP address per 10-minute sliding window.
- **Dual Email Notification**: Instantly delivers a formatted inquiry to your team and sends a branded confirmation receipt to the visitor.

---

## 🎨 Where to Edit Content & Brand

All website content is completely separated into the `src/data/` directory:

| What to change | File to edit |
|---|---|
| **Brand Name, Links, Contact Info, Socials** | [`src/data/site.js`](file:///d:/Web%20Development/grow%20elite/src/data/site.js) |
| **Contact Form Copy & Budget Options** | [`src/data/contactForm.js`](file:///d:/Web%20Development/grow%20elite/src/data/contactForm.js) |
| **Colors, CSS Variables, Background Palette** | [`src/app/globals.css`](file:///d:/Web%20Development/grow%20elite/src/app/globals.css) |
| **Services, Tags, Deliverables** | [`src/data/services.js`](file:///d:/Web%20Development/grow%20elite/src/data/services.js) |
| **Portfolio & Verified Proofs** | [`src/data/proofs.js`](file:///d:/Web%20Development/grow%20elite/src/data/proofs.js) & [`src/data/portfolio.js`](file:///d:/Web%20Development/grow%20elite/src/data/portfolio.js) |
| **Client Reviews & Logos** | [`src/data/reviews.js`](file:///d:/Web%20Development/grow%20elite/src/data/reviews.js) & [`src/data/clients.js`](file:///d:/Web%20Development/grow%20elite/src/data/clients.js) |
| **CEO Story & Leadership** | [`src/data/ceo.js`](file:///d:/Web%20Development/grow%20elite/src/data/ceo.js) |
| **Core Values** | [`src/data/values.js`](file:///d:/Web%20Development/grow%20elite/src/data/values.js) |

---

## 🚀 Key Architectural Highlights

1. **JavaScript Only**: 100% clean `.js` and `.jsx` architecture without TypeScript.
2. **Synchronized Lenis & GSAP**: Scroll events pipe directly into GSAP's RAF ticker for unified, stutter-free performance.
3. **Lazy 3D Element**: React Three Fiber Canvas is dynamically imported with `ssr: false` to ensure instant initial page load.
4. **Adaptive Performance**: Honors `prefers-reduced-motion` and disables fine cursor listeners on touch devices.
5. **Robust Contact Pipeline**: Validated server-side & client-side with Resend email delivery.
