<p align="center">
  <img src="public/icon.svg" alt="Cottus" width="120">
</p>

# cottus-ai.github.io

The Cottus AI website: Offprint, Cottus, akernl, Cottus Runtime, argus and the project index.

```sh
npm install
npm run dev      # http://localhost:5173
npm run build    # static site in dist/, deployed by .github/workflows/deploy.yml on push to main
```

## Layout

| Path | Contents |
|---|---|
| `index.html` | Home: the Cottus product page |
| `offprint/`, `akernl/`, `cottus-runtime/`, `argus/`, `projects/` | One page each |
| `docs/`, `agent-kernl/` | Redirects from old URLs |
| `src/site.css`, `src/site.js` | Shared styles and the small amount of script |
| `src/partials/` | Nav, footer and icons, inserted where a page says `<!-- @name -->` (see `vite.config.js`) |
| `public/art/` | Illustrations, exported as WebP |
| `brand/illustrations/` | The code that draws the illustrations |

## Illustrations

Each picture is drawn by a script in `brand/illustrations/` with the print kit from the `new-horizon-style` skill, then exported:

```sh
node ~/.claude/skills/new-horizon-style/scripts/render.mjs header.js header.png 3840 1060
node ~/.claude/skills/new-horizon-style/scripts/render.mjs spot-akernl.js,plants.js spot-akernl.png 1600 1600
magick spot-akernl.png -resize 800x -quality 82 -define webp:alpha-quality=100 ../../public/art/spot-akernl-800.webp
```
