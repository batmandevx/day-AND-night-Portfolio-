# Ayush Upadhyay — Portfolio

Personal portfolio of Ayush Upadhyay — AI & full-stack engineer.

A dual-mode experience:

- **Light mode** — a 3D scroll journey (React Three Fiber), adapted from [Mohit Virli's portfolio](https://github.com/mohitvirli/mohitvirli.github.io).
- **Dark mode** — a cinematic particle constellation (vanilla Three.js + GLSL + GSAP), adapted from [Kamil Nowak's portfolio](https://github.com/nowakkamil/nowakkamil.github.io).

The theme toggle switches between the two experiences (the choice is persisted in `localStorage` and the page reloads into the selected mode).

## Run

```bash
npm install
npm run dev    # http://localhost:3000
npm run build  # static export to out/
```

## Tech Stack

- Next.js (static export)
- React Three Fiber + Drei (light mode)
- Three.js + custom GLSL shaders + GSAP ScrollSmoother (dark mode)
- Zustand, Tailwind CSS v4, SCSS
