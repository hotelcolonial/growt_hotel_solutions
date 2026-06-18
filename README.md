# Growth Hotel Solutions — Marketing Site

Static, self-contained build of the Claude Design handoff. No build step or server-side
code is required to host it — it is plain HTML + JS + assets.

## Contents

```
index.html        Page shell: styles, loader/cursor/curtain, fonts, <div id="root">
app.js            The full React app (Header, Footer, all pages) — precompiled from JSX
vendor/           React 18.3.1 + ReactDOM (production, minified)
*.ttf             HelveticaNeueCyr display fonts
logo-growth-transparente.png   Logo / favicon
```

Photography is loaded from Unsplash/Pexels CDNs (as in the original design); the rest is local.

## Run locally

Any static file server works (opening `index.html` via `file://` will not — browsers block
local module/font loading). For example:

```
npx serve .          # or: python -m http.server 8000
```

Then open the printed URL.

## Deploy

Upload the whole `site/` folder to any static host (Netlify, Vercel, Cloudflare Pages,
GitHub Pages, S3, or plain shared hosting). `index.html` is the entry point.

## How it was built

The handoff shipped a single self-contained `Hotel Adviser.html` that compiled its JSX in the
browser via a ~3 MB copy of Babel on every load. This build is byte-for-byte the same design,
but the five JSX source blocks were precompiled once (using the project's own bundled Babel,
`preset: react`) into `app.js`, and React/ReactDOM were swapped from development to production
builds. Result: identical look, sections, and content — just dropped from ~4.5 MB to ~0.4 MB
and no runtime compilation.
