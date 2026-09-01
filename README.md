# The Ultron Initiative

A one-page showcase for the ultron skill family — six agent-coordination skills that build and ship software, and the 13 real builds they shipped as proof. Built with the thing it advertises.

## What this is

One scrolling page, rendered entirely in the browser from two data files:

- **The build wall** — 13 shipped builds, each led by its real screenshot, with a live link and its source
- **The roster** — the six skills: `ultron`, `ultron-swarm`, `ultron-supreme`, `ultron-overlord`, `ultron-redesign`, `ultron-impeccable`
- **The lineage frieze** — the family's growth, milestone by milestone

Plain HTML, CSS, and vanilla JavaScript. No framework, no package manager, no build step, no tooling to install.

## View it

Open `index.html` in a browser. The site is `file://`-safe — everything resolves locally.

To publish it, put the folder on any static host. There is nothing to build or configure.

## Maintain it

All content lives in two files. The comment block at the top of each file is the editing guide — it documents every field and its validation rules. Edit, save, refresh.

### Add a build

Append an entry to `window.ULTRON_BUILDS` in `data/builds.js`:

```js
{
  id: "my-build",                       // stable slug: a-z, digits, hyphens
  title: "My Build",
  description: "One-liner shown on the nameplate.",
  tags: ["Tag One", "Tag Two"],
  url: "https://example.com/",          // live site, absolute
  sourceUrl: "https://github.com/you/my-build",
  created: "2026-08-31",                // drives frieze ordering
  builtWith: "Ultron pipeline"
}
```

Optional image fields: drop a screenshot into `assets/shots/` and add `image` (`"assets/shots/<id>.png"`), `imageWidth`, and `imageHeight` — the plate gets its lit screen. Omit them and the plate renders a styled fallback instead.

### Add a milestone

Append an entry to `window.ULTRON_TIMELINE` in `data/timeline.js`, in lineage order. Four fields: `id`, `title`, `line` (one sentence on what this milestone changed about the family), and `date` — `"YYYY-MM-DD"` when known, otherwise `""` (the renderer falls back to an ordinal label; no date is ever invented).

> [!NOTE]
> Entries are validated on load. A malformed entry is skipped with a `console.warn` — a bad edit costs one nameplate, never the page.

## Under the hood

- **Zero build** — content updates are a data-file edit and a browser refresh
- **Real screenshots** — 13 experiment screens vendored in `assets/shots/` (~3.6 MiB total), framed as lit screens and lazy-loaded below the fold
- **A living hero** — a canvas particle field of crimson embers and a scanner sweep behind the wordmark (`js/field.js`)
- **Scroll ignition** — the counters count up, plates rise in sequence, the frieze sweeps (`js/motion.js`)
- **Self-hosted fonts** — Cinzel, Martian Mono, and EB Garamond as local woff2 files, under the SIL Open Font License (`assets/fonts/licenses/`)
- **No external requests** — no CDNs, no analytics, no trackers
- **Respects `prefers-reduced-motion`** — the field, count-up, and ignition switch off for visitors who ask for stillness
- **Degrades honestly** — a `<noscript>` notice explains the empty page without JavaScript

## Links

- [graydonwasil.com](https://graydonwasil.com/)
- [github.com/arrangedgodly](https://github.com/arrangedgodly)
