# Birthday Card (Mock Login → Book Reveal)

Lightweight Vite project that runs a playful four-step “are you really Ayesha?” flow. After finishing, it redirects to a standalone flip-book page with a gentle confetti greeting.

## Getting started
- Install deps: `npm install`
- Dev server: `npm run dev` (open the URL Vite prints)
- Production build: `npm run build`

## Flow overview
- `src/js/main.js` renders the mock login steps and handles Yes/No branching. Final Yes shows a small book image then redirects to `public/book.html`. Final No shows a small “no” image.
- `src/styles/style.css` covers the glassmorphism card and step layout; `public/styles/book.css` styles the book page.
- `public/book.html` hosts the flip-book content and triggers a one-time, subtle `canvas-confetti` burst on load.

## Assets
- Response thumbnails: `public/assets/images/book.jpg`, `public/assets/images/no.jpg`
- Book cover: `public/images/ayesha.svg`

## Notes
- Confetti uses CDN `canvas-confetti` and respects reduced motion.
- No loops; animations are kept minimal to avoid blocking the book flip transitions.
