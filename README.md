# Nawal & Hassan — Wedding Invitation Microsite

A premium cinematic Islamic wedding invitation microsite. Velvet curtain hero, parallax Save the Date with mosque silhouette, glassmorphism event cards, one-tap call & WhatsApp, crescent-moon closing.

Built with **Next.js 14 (App Router) · Tailwind · Framer Motion · GSAP ScrollTrigger · Lenis**.

---

## Run locally

```bash
npm install
npm run dev
```

Open <http://localhost:3000>.

## Edit the wedding details

Open [lib/wedding.ts](lib/wedding.ts) — bride/groom names, three event dates, places, Google Maps URLs, and the bride/groom-side phone numbers all live in one file.

- **Phones** must include the country code (e.g. `+91XXXXXXXXXX`). The site uses `tel:+91...` which opens the iPhone dial pad directly, and `https://wa.me/91...` for WhatsApp.
- **Maps** use the universal Google Maps "search" URL. On iPhone Safari this opens with the option to use Apple Maps. Replace each `maps:` value with a precise venue URL when you have the actual location pin.

## Add background music

Drop an MP3 at `public/music.mp3`. The floating music toggle (bottom-right) picks it up automatically. If no file is present, the button is harmless — it just no-ops.

A few good fits: soft Arabic ney / oud, an instrumental Sufi piece, or a piano cinematic score (no vocals so it doesn't clash with the typography).

## Deploy to Vercel

1. `git init && git add . && git commit -m "initial"`
2. Push to a GitHub repo
3. Visit <https://vercel.com/new>, import the repo
4. Default Next.js settings — no environment variables required
5. Deploy. You'll get a `*.vercel.app` URL in ~60 seconds

The first invitation HTML (`invitation.html`) sitting in this folder is ignored by Next.js — it doesn't conflict with the deployment.

## What's where

```
app/
  layout.tsx          ← fonts (Cormorant Garamond, Cinzel, Amiri) + metadata
  page.tsx            ← composes the full reel
  globals.css         ← Tailwind + Lenis base styles + .glass utility
components/
  SmoothScroll.tsx    ← Lenis wrapper + GSAP ticker sync
  LoadingScreen.tsx   ← crescent + Bismillah, fades after 1.9s
  ParticlesBg.tsx     ← canvas gold particles + maroon backdrop
  GrainVignette.tsx   ← film grain + vignette overlays
  MusicToggle.tsx     ← floating bottom-right
  Curtain.tsx         ← velvet curtain hero, tap-to-open + scroll-to-open
  SaveDateSection.tsx ← GSAP ScrollTrigger parallax bg + ornament + names
  EventsSection.tsx   ← three glass event cards with Open Map buttons
  ContactSection.tsx  ← bride/groom contact rows with Call + WhatsApp
  ClosingSection.tsx  ← dua, crescent, names, Bismillah glyph
lib/
  wedding.ts          ← single source of truth for all wedding data
```

## Mobile / iPhone Safari notes

- 9:16 layouts use `dvh` and `min-h-screen` so they don't jump when Safari's address bar collapses
- `tel:` and `wa.me` links go through the native dial pad / WhatsApp handoff
- `touch-action: manipulation` on tap targets removes the 300ms iOS click delay
- `viewport-fit: cover` + `maximum-scale: 1` keeps the layout edge-to-edge with no pinch-zoom
- Lenis uses passive touch listeners so scrolling feels native

## Performance

- All fonts loaded via `next/font` (no CLS, self-hosted at build time)
- No images — every illustration is inline SVG (crescent moon, ornament, mosque silhouette, icons)
- Particles canvas caps at `devicePixelRatio` of 2 and ~150 particles
- One Framer Motion + one GSAP timeline; no heavy libs
