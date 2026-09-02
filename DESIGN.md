---
name: The Ultron Initiative
description: A monument to shipped work delivered as ONE staged console — mandatory-snap 100svh stages (hero, paginated image-led wall, roster, frieze, footer) over a persistent full-viewport crimson field, oriented by a crimson HUD spine of stage ticks, and speaking through the glitch it was approved with on day one.
colors:
  ground: "#0b0d10" # "Vault Black" — page ground (color name simulated (auto mode): PRODUCT.md classic-Ultron aesthetic)
  plate: "#1d232b" # "Gunmetal Plate" — plate fields (color name simulated (auto mode): PRODUCT.md)
  well: "#12161c" # "Recessed Well" — recessed fields inside plates; also the screens' unlit glass and the pager pages' backing (color name simulated (auto mode): PRODUCT.md)
  chrome: "#c9d3dd" # "Engraved Chrome" — primary type (color name simulated (auto mode): PRODUCT.md)
  chrome-dim: "#8b97a5" # "Dim Chrome" — secondary type, resting spine ticks, wall readouts (color name simulated (auto mode): PRODUCT.md)
  crimson: "#e5383b" # "Ultron Crimson" — the single active accent, including the lit spine tick (color name simulated (auto mode): PRODUCT.md)
  rule-strong: "rgba(201, 211, 221, 0.30)"
  rule-soft: "rgba(201, 211, 221, 0.14)"
  rule-on-plate: "rgba(201, 211, 221, 0.20)"
typography:
  counter:
    fontFamily: "Cinzel, 'Cinzel Fallback', 'Times New Roman', serif"
    fontSize: "clamp(3.5rem, 5.5vw + 2rem, 9rem)"
    fontWeight: 900
    lineHeight: 0.95
    letterSpacing: "normal"
    fontFeature: "'lnum' 'tnum'"
  wordmark:
    fontFamily: "Cinzel, 'Cinzel Fallback', 'Times New Roman', serif"
    fontSize: "clamp(2.25rem, 3.5vw + 1rem, 4.5rem)"
    fontWeight: 700
    lineHeight: 1.15
    letterSpacing: "0.14em"
  title:
    fontFamily: "Cinzel, 'Cinzel Fallback', 'Times New Roman', serif"
    fontSize: "clamp(1rem, 5.4cqi + 0.2rem, 1.375rem)"
    fontWeight: 700
    lineHeight: 1.25
    letterSpacing: "0.08em"
  body:
    fontFamily: "EB Garamond, 'EB Garamond Fallback', Georgia, serif"
    fontSize: "clamp(1.0625rem, 1rem + 0.3vw, 1.1875rem)"
    fontWeight: 500
    lineHeight: 1.65
    letterSpacing: "normal"
  readout:
    fontFamily: "Martian Mono, 'Martian Mono Fallback', ui-monospace, 'Courier New', monospace"
    fontSize: "0.8125rem"
    fontWeight: 400
    lineHeight: 1.4
    letterSpacing: "0.14em"
  tag:
    fontFamily: "Martian Mono, 'Martian Mono Fallback', ui-monospace, 'Courier New', monospace"
    fontSize: "0.75rem"
    fontWeight: 400
    lineHeight: 1.4
    letterSpacing: "0.06em"
  micro:
    fontFamily: "Martian Mono, 'Martian Mono Fallback', ui-monospace, 'Courier New', monospace"
    fontSize: "0.6875rem"
    fontWeight: 400
    lineHeight: 1.4
    letterSpacing: "0.14em"
rounded:
  chamfer: "12px" # cut-plaque corner, applied via clip-path polygon — never border-radius
spacing:
  3xs: "0.25rem"
  2xs: "0.5rem"
  xs: "0.75rem"
  sm: "1rem"
  md: "1.5rem"
  lg: "2rem"
  xl: "3rem"
  gutter: "clamp(1.25rem, 4vw, 3rem)"
  stage-pad: "clamp(0.75rem, 2svh, 2.5rem)"
  section-gap: "clamp(4rem, 9vw + 1rem, 9rem)"
components:
  counter-band:
    backgroundColor: "{colors.plate}"
    textColor: "{colors.chrome}"
    rounded: "{rounded.chamfer}"
    padding: "1.5rem 1rem 2rem"
  nameplate:
    backgroundColor: "{colors.plate}"
    textColor: "{colors.chrome}"
    padding: "0 0.75rem 0.75rem"
  plate-screen:
    backgroundColor: "{colors.well}"
    padding: "0"
  plate-tag:
    backgroundColor: "{colors.well}"
    textColor: "{colors.chrome-dim}"
    typography: "{typography.micro}"
  wall-readout:
    textColor: "{colors.chrome-dim}"
    typography: "{typography.micro}"
  spine-tick:
    textColor: "{colors.chrome}"
    height: "44px"
    width: "44px"
  wall-chevron:
    backgroundColor: "{colors.plate}"
    textColor: "{colors.chrome}"
    height: "44px"
    width: "44px"
  mode-chip-lit:
    backgroundColor: "{colors.well}"
    textColor: "{colors.chrome}"
    padding: "0.25rem 0.625rem"
  mode-chip-marked:
    backgroundColor: "{colors.well}"
    textColor: "{colors.chrome}"
    padding: "0.25rem 0.625rem"
  mode-chip-dim:
    backgroundColor: "{colors.well}"
    textColor: "{colors.chrome-dim}"
    padding: "0.25rem 0.625rem"
  plate-link-live:
    textColor: "{colors.chrome}"
    height: "44px"
  plate-link-source:
    textColor: "{colors.chrome-dim}"
    height: "44px"
  footer-plate:
    backgroundColor: "{colors.plate}"
    textColor: "{colors.chrome}"
    rounded: "{rounded.chamfer}"
    padding: "3rem clamp(1.25rem, 4vw, 3rem) 2rem"
---

# Design System: The Ultron Initiative

## Overview

**Creative North Star: "The Crimson Monument, Ignited — One Interface"** — *(North Star name simulated (auto mode): evolved at V4 THE ONE INTERFACE (2026-09-01) from the V3-B "The Crimson Monument, Ignited — and Loud". THESIS unchanged — engraved metal, real lit screens, one crimson accent, loud since V3-B — with the delivery inverted: the owner asked for "the illusion that there is no scrolling", and the answer is one console. Sources: the V4 amendment (STORY/FORM) in `.impeccable/surfaces/index-html.md` + the owner's standing ask + PRODUCT.md brand commitments.)*

The page is not a website with metal styling; it is a monument that happens to be browsable — switched on since V2, loud since V3-B, and since V4 delivered as **one staged console**. Every surface is one of three metals — near-black ground, gunmetal plate, recessed well — and every word is engraved into that metal: chrome capitals seated with a 1px dark lip (`text-shadow: 0 1px 0 rgba(0, 0, 0, 0.45)`), never printed on top. The single chromatic voice is crimson (`#e5383b`), spent only where the machine acts, breathes, or IS: a LIVE diamond, a lit mode chip, a keyboard focus ring, an energized rule, a screen frame answering presence — and now the lit tick of the HUD spine, marking the stage the machine is on. The mood is confident, precise, and a little menacing — the machine carved its own honor roll, left the lights LOW BUT LIT, and left the power on.

The console contract (V4): **real scrolling stays the input** — native gestures, keyboard, find-in-page, screen readers, and deep links all keep working — but the root scroller is a **mandatory snap console** and every section is exactly one stage: HERO (wordmark lintel + category + the counter band — the power-on stage) → WALL PAGES → ROSTER → FRIEZE → FOOTER. Each stage is `100svh` (a `100vh` line first for pre-svh engines), `scroll-snap-align: start`, `scroll-snap-stop: always` — **one gesture is one stage** — with its course centered in the viewport on `--stage-pad: clamp(0.75rem, 2svh, 2.5rem)`, scaled to the stable small viewport height so short laptops condense and tall screens open up without a media-query ladder. The whole architecture is gated on `html.staged`, added by one inline `<head>` script BEFORE first paint: without scripting the class never lands and the page degrades to the plain stacked auto-height document that scrolls normally (the documented no-JS contract — no snap, no spine, no pager; the canvas never initializes either, so an empty canvas renders nothing).

The illusion is carried by two persistent systems. First, the **living field is now a full-viewport fixed canvas** behind every stage, over the ground: the machine stays on while stages swap — that continuity is what sells "nothing scrolls away." Its restraint is stage-aware through a **pluggable zone resolver**: while HERO is active the measured wordmark/category/band y-bands carry their authored dimming; on every other stage the field stands CALM (a global 0.55-alpha / 0.9-size register — breathing ground, never competition), and `window.ULTRON_FIELD.setZoneResolver(fn)` can replace the map without touching the loop. Second, the **stage choreography**: when the settled stage's alignment genuinely breaks, its content RELEASES — receding to opacity 0.2, scale 0.98, a 1.5px blur over ~300ms while still on screen — and when a stage SETTLES as active, its content ASSEMBLES on the established ignite grammar (plates on the 55ms drain, dedications at 70ms, frieze nodes sweeping at 60ms, hero and footer groups at 90ms). Both beats are **settle-keyed**, never raw-scroll: a flick across two snap points can never commit the intermediate stage. Off-stage content NEVER leaves the accessibility tree (opacity/transform/filter only — all 13 plates verified present post-transition), and the resting recessive state is the pre-entry state (opacity 0 under JS arming classes), never a computable mid-dim — the transient `.is-departing` recede exists only in flight, because a resting opacity-0.2 text fails contrast audit while an armed pre-entry offset never does. The wordmark glitch now holds a 900ms suppression window across every swap — one moment at a time, still hero-only.

The proof surface paginates. The wall is no longer one long scroll of plates: **js/render.js chunks the validated builds into wall PAGE stages at the live viewport tier** — ≥1280px: 3×2 pages of six (13 screens → 6 / 6 / 1, the 13th a full-stage FEATURED FINALE — the newest build alone on one viewport at monument scale); 640–1279px: 2×2 pages of four (4 / 4 / 4 / 1, same featured finale); below 640px: ONE wall stage holding a **horizontal snap pager** of one screen per page with a mono readout ("SCREEN 04 / 13") and two chevron buttons. Every page opens with the machine's own orientation line ("SCREENS 01–06 / 13" / "PAGE 01 / 03"), a crimson HUD spine at the right edge ticks one bar per stage (the active tick lit, elongated, and labeled), and stable hash deep-links (`#hero`, `#wall`, `#wall-2`, …, `#footer`) survive re-pagination by clamping. Rotated phones and squat windows get **height-keyed repacks** — same anatomy, denser packing — so every stage stays exactly one viewport with nothing hidden. `prefers-reduced-motion` never arms any of it: the console swaps by instant snap with the full page complete at all times, the field is one painted still, and the loudness that remains is color/scale/texture. The confirmed anti-references (from the locked direction contract): no stacked marketing bands, no card-grid-with-hero, no soft cards, no drop-shadow card chrome, no gradient text, no off-world color.

**Key Characteristics:**
- One staged console: mandatory-snap `100svh` stages (HERO / WALL pages / ROSTER / FRIEZE / FOOTER), `scroll-snap-stop: always` (one gesture = one stage), `html.staged`-gated before first paint, degrading without JS to the plain stacked document.
- A persistent full-viewport fixed canvas field — pooled crimson embers, chrome motes, one amplified scan sweep — breathing behind EVERY stage over the crimson atmosphere, with a pluggable stage-aware zone resolver (hero restraint vs calm register).
- Settle-keyed stage choreography: the depart recede (opacity 0.2 / scale 0.98 / 1.5px blur, ~300ms, visible in flight) vs the settle assembly (established ignite grammar per stage); off-stage content stays in the accessibility tree; the resting state is pre-entry, never mid-dim.
- A crimson HUD spine of real 44px tick buttons at the right edge — the active stage lit, elongated (transform-only, CLS-safe), and labeled in mono caps — appended at the end of `<body>` so tab order stays content-first.
- Tiered wall pagination: ≥1280px 3×2 pages of six → 6/6/1 with a full-stage featured finale; 640–1279px 2×2 → 4/4/4/1; phone tiers one stage with a horizontal snap pager (one screen per page, readout + chevrons, gesture-routed so vertical swipes still change stages).
- Engraved-metal tonal triad (ground / plate / well) with chrome type and exactly one accent color; image-led plates in lit-screen framing (chrome frame + unlit well glass + emission + crimson ignition on intent), `:has()`-gated unlit-screen emblem fallback.
- THE WORDMARK GLITCH: RGB-split aberration copies with clip-path slice jump-cuts (periodic ~7-10s pulse + hover, armed only after the power-on and suppressed for 900ms across every stage swap, empty-alt pseudo-content so the accessible name never changes).
- Chamfered (12px cut-corner) monumental bands framed by a 1px rule-color hairline; the counter band wears the dark-crimson plate variant under a crimson frame; the lintel's double rules and the frieze's spine are energized crimson energy lines.
- A fixed static scanline overlay (1px dark line every 3px at 0.28 ink) as machine texture, crossing the screens too.
- A graded crimson accent system: crimson intensity grades how much the machine acts (lit / marked / dim).
- Three-face type system — Cinzel inscriptional caps, Martian Mono readouts, EB Garamond body — on metric-matched zero-swap local fallbacks.
- Height-keyed rotated-phone repacks (roster 3×2, frieze stele cut to two columns, condensed hero) so the one-viewport-per-stage floor holds at every orientation without hiding anything.

## Colors

One family of metal and one drop of blood: five cool neutrals from near-black to pale chrome, plus a single crimson accent that carries every "active" state on the page — and since V4, the console's own orientation instruments. The screenshots' own colors are content imagery (all thirteen measured dark-toned real apps), not palette; no text is ever set on or over imagery. The crimson also carries ATMOSPHERE — the hero wash, the band tint, the energized rules — always as alpha of the same pin, so the accent count stays one.

### Primary
- **Ultron Crimson** (`#e5383b`): The only chromatic color. Marks the live/active state wherever it appears — LIVE link diamonds (with `box-shadow: 0 0 6px rgba(229, 56, 59, 0.65)`, breathing on the 2.7s idle pulse), lit autonomous/deadline mode chips, the plate hover glow, the screen frame's hover tint (`rgba(229, 56, 59, 0.6)` — decorative; the interactive state stays carried by the links' solid diamond and the focus ring), hover underlines (`text-decoration-color: var(--crimson)`), the global focus ring (`outline: 2px solid`, offset 3px), text selection (`background: rgba(229, 56, 59, 0.35)`), the static crimson ember pooled at each plate's base (`inset 0 -20px 30px -22px rgba(229, 56, 59, 0.55)`), ignited frieze nodes and their 1.6× pulse flare, the hero field's embers and scan hairline, the atmosphere (the hero's radial wash `rgba(229, 56, 59, 0.13)`, the counter band's dark-crimson plate `rgba(229, 56, 59, 0.12)` over gunmetal ≈ `rgb(55, 38, 45)` and its `rgba(229, 56, 59, 0.42)` frame, the numeral cores' emission `0 0 16px 0.55 / 0 0 48px 0.32`, the energized lintel rules `rgba(229, 56, 59, 0.52)` + shimmer and frieze spine `rgba(229, 56, 59, 0.4)` + glow, the glitch layers' crimson-shifted copy, the arrival flash) — and since V4 the console instruments: the spine's active tick bar (4.60:1 on ground, non-text) with its `0 0 8px rgba(229, 56, 59, 0.55)` lit-state glint and the active label chip's `rgba(229, 56, 59, 0.42)` underline, plus the chevrons' hover arrow tint (`3.74:1` on plate, non-text, decorative — the buttons carry the global ring). All rgba alphas of the same crimson. Contrast: 4.60:1 on ground, 3.74:1 on plate — body-size text only on ground; on plate it is reserved for non-text markers and large text.

### Neutral
- **Vault Black** (`#0b0d10`): The page ground — and the console's open ground between stages, where the persistent field shows through. Everything sits on it or hangs from it; overscroll and `html` are pinned to it so nothing flashes white. Frieze titles read 12.83:1 on it (7.00:1 rendered under the wash for the category line).
- **Gunmetal Plate** (`#1d232b`): The plate field — the surface of every nameplate, band, chip, the footer, and the pager chevrons. Primary chrome text reads 10.43:1 on it. The counter band and the noscript band lay the dark-crimson wash layer over it (≈ `rgb(55, 38, 45)`: chrome ≈ 11.85:1 rendered, near-chrome labels ≈ 9.7:1).
- **Recessed Well** (`#12161c`): Recessed interior fields — the wall pages' shared backing, the pager pages' single-screen backing field, tag and chip fills, and the screens' unlit glass behind the lazy image bytes. Reads as "sunk below the plate." Dim chrome reads 6.11:1 on it.
- **Engraved Chrome** (`#c9d3dd`): Primary type, the light pole of the metal, the base of the minority chrome motes in the field, the cool channel of the glitch aberration pair, and the chevrons' drawn arrow strokes (10.43:1 on plate).
- **Dim Chrome** (`#8b97a5`): Secondary voice — descriptions, labels, dates, SOURCE links, sign-offs, the category line — and since V4 the console's quieter instruments: the resting spine tick bars (6.55:1 on ground, non-text) and the wall page readouts (6.55:1 on ground). 6.55:1 on ground, 5.32:1 on plate, 6.11:1 on well. NOT used on the counter band: its labels step up to near-full chrome at 0.92 alpha (≈ `rgb(189, 196, 206)` — tinted warm by the crimson field beneath; dim chrome measured ~4.4:1 on the tinted band, under the body floor).
- **Hairline rules** (`rgba(201, 211, 221, 0.30)` strong / `0.14` soft / `0.20` on-plate): 1px chrome-alpha rules that serve as dividers, plate borders, frames, seams — and the resting screen frame and the chevrons' frames, which deliberately reuse the strong rule's alpha class. The page's two STRUCTURAL spines — the lintel's strong rules and the frieze spine — are energized crimson energy lines (see Primary). Alpha (not solid hex) so one value serves ground and plate alike.
- **Scanline ink** (`rgba(0, 0, 0, 0.28)`): the machine texture's dark rows; darker shaded rows only raise light-text contrast (duty-averaged worst pair 5.81:1).

### Named Rules
**The One Active Accent Rule.** Crimson is the page's only chromatic color, and it is spent where the machine acts, breathes, or IS — never as decoration, never as a second brand color. If a new element glows crimson, that element is live (or the field is breathing). The spine's lit tick qualifies: it marks where the machine IS.

**The Graded Accent Rule.** Crimson intensity grades machine agency, mirroring the wall's link language across the mode chips: **lit** (filled crimson diamond + glow + crimson frame + full-chrome bold text) for autonomous/deadline lines; **marked** (hollow crimson diamond, faint crimson frame `rgba(229, 56, 59, 0.35)`, chrome text) for bounded passes; **dim** (no diamond, plain well chip, dim chrome) where the human holds the gate.

**The Metal-Only Rule.** All colors derive from the pinned palette; glow, rule, field, and sweep colors are alpha variants of chrome or crimson only. No gradient text, no off-world hue, no second accent — including inside the canvas, where every sprite color is an rgba of crimson (229, 56, 59) or chrome (201, 211, 221).

## Typography

**Display Font:** Cinzel (fallbacks: "Cinzel Fallback" — the local Times New Roman re-metricized to Cinzel's advances and box metrics, size-adjust 110.15% at 700 / 117.2% at 900 — then Times New Roman, serif) — self-hosted latin woff2 at weights 700 and 900 only.
**Body Font:** EB Garamond (fallbacks: "EB Garamond Fallback" — local Georgia at size-adjust 89.33% — then Georgia, serif) — self-hosted latin woff2 at weight 500 only.
**Label/Mono Font:** Martian Mono (fallbacks: "Martian Mono Fallback" — local Courier New at size-adjust 116.65% — then ui-monospace, Courier New, monospace) — self-hosted latin woff2 at weights 400 and 700.

**Character:** Inscriptional Roman capitals carved for a monument, tempered by a machine's readout type and an old-style serif for prose. Cinzel speaks titles and numerals, Martian Mono speaks data and machine state — including the console's own orientation lines (page readouts, spine labels, pager counts) — Garamond speaks to the visitor. All three are OFL, latin-subset, zero external requests. The metric-matched fallback layer (V5) makes the `font-display: swap` moment invisible: each fallback is the same local face the stack already fell back to, re-metricized to the vendored face's own advance widths and ascent/descent box, so wraps, centered widths, and baseline seats hold through the swap (zero-swap CLS, measured).

### Hierarchy
- **Counter** (Cinzel 900, clamp(3.5rem, 5.5vw + 2rem, 9rem), line-height 0.95, lining tabular numerals): The monumental counter band numerals inside the hero stage — deliberately beyond a generic display cap; 2.25rem in the condensed phone-landscape repack (scaled, never amputated). Never below weight 900.
- **Wordmark** (Cinzel 700, clamp(2.25rem, 3.5vw + 1rem, 4.5rem), line-height 1.15, 0.14em tracking, uppercase): The page's single h1, stamped between energized double hairlines with a lit-chrome text-shadow (`0 1px 0 rgba(0,0,0,0.55), 0 0 28px rgba(201,211,221,0.14)`).
- **Title** (Cinzel 700, container-relative: staged wall plates clamp(1rem, 5.4cqi + 0.2rem, 1.375rem), the featured finale clamp(1.375rem, 7cqi, 2.25rem), dedications clamp(1.125rem, 5.6cqi + 0.225rem, 1.625rem), milestones clamp(1.0625rem, 11cqi − 0.28125rem, 1.25rem), 0.08em tracking, uppercase, balanced wrap): Nameplate, dedication, and milestone names — sized against their own container, not the viewport. The staged wall steps the plate title down from the stacked wall's taller clamp (which survives as the no-JS fallback tier) so six monuments plus their anatomy stand inside one viewport; the featured finale steps it back up — one plate, one stage, monument scale.
- **Body** (EB Garamond 500, clamp(1.0625rem, 1rem + 0.3vw, 1.1875rem), line-height 1.65): Descriptions, roles, milestone lines, sign-off — 0.9375rem in the staged wall's compact anatomy, 1.0625rem in the featured finale. Measure token `--measure: 68ch` (applied to degraded-state copy).
- **Readout** (Martian Mono 400, 0.8125rem, 0.14em tracking, uppercase): Counter labels, the hero category line, LIVE/SOURCE links, footer links, skip link. The noscript and empty-state messages share the readout's face and 0.06em tracking but set sentence-case — see the Inscriptional Caps Rule's sole exception.
- **Tag** (Martian Mono 400, 0.75rem, 0.06em tracking, uppercase): Plate tags (featured finale) and mode-chip words.
- **Micro** (Martian Mono 400, 0.6875rem, 0.14em tracking, uppercase): The console's own voice — wall page readouts ("SCREENS 01–06 / 13" / "PAGE 01 / 03"), the phone pager readout ("SCREEN 04 / 13", aria-live), the spine's active stage label (700 weight), and the frieze ordinal/date line.

### Named Rules
**The Inscriptional Caps Rule.** All display and mono text is uppercase with positive tracking (0.06–0.14em). Never negative tracking on Cinzel — it is a carved-capital face. Sole exception (the critique's all-caps-body finding): the degraded-state messages — the noscript notice and the empty states — set sentence-case; a long failure passage in caps reads as shouting, and the rule stays with every short label.

**The Weight-On-Black Rule.** Thin strokes die on near-black: Cinzel never below 700 (900 for counter numerals), EB Garamond never 400 on this palette (500 is the floor), mono emphasis takes 700. There is no light weight anywhere in the system.

**The Tabular Counters Rule.** Counter numerals carry `lining-nums tabular-nums` so the count-up changes digits without a single pixel of jitter.

## Layout

**The console, not the scroll.** The root scroller IS the interface: `html.staged { scroll-snap-type: y mandatory }`, and every stage is exactly one viewport — `min-height: 100vh` then `100svh` (URL-bar-safe), `scroll-snap-align: start`, `scroll-snap-stop: always` — a flex column centering its course over `--stage-pad: clamp(0.75rem, 2svh, 2.5rem)` and the page gutter. The stage census, in document order: **HERO** (`#hero` — the lintel wrapper [wordmark + category between their double rules] plus the counter band `#stats` moved INTO the banner so the power-on stage owns field sweep + count-up in one viewport) → **WALL pages** (`#wall`, `#wall-2`, `#wall-3`, … — siblings inside `<main>`, inserted by js/render.js) → **ROSTER** → **FRIEZE** → **FOOTER** (the full-bleed bookend carrying the archive anchor visibly at its own rest position — an element after the last stage would sit below the console's final fold, reachable only by a deliberate extra gesture; measured at anchorTop 900 of a 900px viewport before the move). Everything is gated on the `html.staged` class added by one inline `<head>` script before first paint; with scripting disabled the page is the same stacked document as before — plain auto-height sections, the auto-fill wall (320px track floor, 3 columns at ≥1280px), the `--section-gap` rhythm, no spine, no pager.

**Wall pagination tiers.** js/render.js chunks the validated builds into page stages at the live tier: **≥1280px — 3 columns × 2 rows, six screens per page** (13 → 6 / 6 / 1, the last page the FEATURED FINALE: a single plate on a single-cell stage, its width cap HEIGHT-aware at `min(64rem, calc((100svh − 15rem) × 1.6))` because the 1312:820 screen grammar needs W/1.6 of height plus ~15rem of anatomy — tall viewports get the full monument, short laptops a narrower plate that still shows the shot un-cropped); **640–1279px — 2 × 2, four per page** (4 / 4 / 4 / 1, same finale rule); **below 640px — ONE wall stage holding the horizontal pager** (see Components). A wall page stage is EXACTLY one viewport tall (definite `100svh`, not min-height — measured without it, pages stood 1001–1056px on a 900px viewport): that definite height is what lets the flex chain give way. Grid tracks are `minmax(0, 1fr)` over it; plates fill their track (the row keeps its shared datum line), the SCREEN is the plate's giving element (`flex: 0 1 auto; min-height: 0`, box ratio from the data's inline `aspect-ratio`, `object-fit: cover` as the crop channel) — a generous track keeps the shot's own 1312:820 grammar, a tight track crops the screen and never the anatomy (title, one-liner, tags, 44px links, pinned to the foot by `margin-top: auto`). On short viewports (≤780px tall) the page grid narrows (`--wall-max: 62rem`) so two rows of three monuments keep honest proportions, centered on the persistent field — a lit panel in open ground. Each page opens with the **wall readout**: "SCREENS 01–06 / 13" left, "PAGE 01 / 03" right (the finale appends "· FEATURED"), micro mono in dim chrome — real text, information for everyone. A tier change on resize re-paginates in place (debounced), keeps the visitor's page index (clamped), and dispatches `ultron:wallpages` — the spine rebuilds, ignition re-arms, the field re-measures.

**Bands repack with seams that follow the geometry**: the counter band runs 4-across inside the hero stage, stacks 2×2 at 900px, and condenses (4-across, 2.25rem numerals, tightened lintel) under 560px of height at ≥480px wide — phone-landscape heights; the dedication band runs 3×2, 2×3 at 900px, 2-across at phone width, and — the rotated-phone repacks — stands 3×2 again under 520px of height at ≥480px wide (measured 466px of content on a 844×390 viewport before it). The **frieze** keeps one strategy per range: ≥1180px a horizontal frieze (six equal courses hung from the energized rail); below 1180px a vertical stele (per-course rail segments); and on short mid-width viewports (640–1179.98px wide and ≤700px tall, or phone width and ≤540px tall) the stele cuts to **two columns × three courses** — the rail never crosses a column break; the lineage reads down each column (measured: the single-column stele stood 698px where it needed ~720; scrollHeight misaligned 3659 vs 3120 before these repacks). The harshest course (≤639px wide AND ≤400px tall) takes one more compression step — smaller courses, same anatomy, nothing hidden.

**The HUD spine** (js/stages.js builds it once the stages exist): a fixed `<nav class="spine">` at the right edge, vertically centered — one real `<button>` per stage ("Go to HERO", "Go to WALL 1", …), 44×44px fixed boxes, scrolling the console to its stage on activation and updating the hash via `history.replaceState`. It is appended at the END of `<body>` so the DOM tab order stays content-first (the skip link remains the first focusable element) — the V4 stage-navigation landmark. Inactive ticks keep no visible label (aria-labels carry their names — the spine reads as an instrument, one line at a time).

**Stacking is part of the layout contract.** The persistent canvas is `position: fixed; inset: 0; z-index: 1` but LIVES inside `#hero`, which as a `.stage` carries position + `z-index: 2` and is therefore a stacking context: within the hero stage the canvas still paints above the counter band's clip-path-clipped plate (the sweep may cross the numerals) while the wordmark and category keep `z-index: 3` above it; later stages (also z 2, later in tree order) paint above the canvas everywhere, so their text can never be tinted by the field and their open ground lets the embers through. The spine sits at z 5, the scanline overlay above everything (9999), the skip link at 4.

**Hash deep-links** are semantic and stable (`#hero`, `#wall`, `#wall-2`, …, `#roster`, `#frieze`, `#footer`): the console navigates on hashchange and after load; a `#wall-N` beyond the live page count clamps to the last wall page (old anchors never break — the tier decides how many pages exist), and on phone tiers the raw `#wall-N` keeps its screen-level meaning by selecting pager page N. No scroll traps, no horizontal page overflow at any width.

### Named Rules
**The One Interface Rule.** Every stage is exactly one viewport, and real scrolling stays the input — native gestures, keyboard, find-in-page, screen readers, and deep links all keep working. One gesture is one stage (`scroll-snap-stop: always`), nothing sits below the last stage's final fold, and the whole architecture is `html.staged`-gated so the no-JS page is the plain stacked document.

**The Settle Rule.** The console commits only at rest: settle-keyed depart and commit beats behind an alignment gate, never raw scroll. A flick across two snap points commits only the stage the snap actually lands on; the origin stage departs once, visibly; the spine tick and the stage's assembly land in the same task.

**The Persistent Field Rule.** The living field is a fixed full-viewport backdrop that never scrolls, never transforms, never dims — it is structurally exempt from the stage choreography (a transformed ancestor would re-anchor it). The continuity of the field through every swap IS the "no scrolling" illusion; swap only stage content.

**The Resting State Rule.** An off-stage stage rests at its pre-entry state (opacity 0 under JS arming classes), never at a computable mid-dim — the opacity-0.2 / scale-0.98 / blur recede is a transient, in-flight state only, struck on genuine depart and removed at the following settle. What rests hidden from sight must never fail a contrast audit for text nobody is reading; better, it must never be dimmed at all.

## Elevation & Depth

Depth is engraved, not stacked. There are **no drop shadows on any component** — no floating cards exist. Depth comes from three instruments working together: (1) **tonal layering**, well sunk below plate, both raised off the ground — including the screens' recessed glass and the pager pages' well backing; (2) **inset bevels**, a 1px dark lip on the top edge and a faint chrome catch on the bottom (`--plate-edge` grammar), with lettering seated by `--engrave-text: 0 1px 0 rgba(0,0,0,0.45)`; and (3) **emitted light**, in two registers — crimson glows that mark live/active states (never depth cues), and the persistent field's ambient crimson breath (the machine is on). The V4 stage choreography's depart recede (opacity 0.2 / scale 0.98 / 1.5px blur) is a transient in-flight state, not a depth cue — off-stage stages hold their pre-entry state, never a resting dim. Light is never a shadow stand-in; nothing hangs in air.

### Shadow Vocabulary
- **Plate bevel (rest)** (`inset 0 1px 0 rgba(201,211,221,0.08), inset 0 -1px 0 rgba(0,0,0,0.5), inset 0 0 0 1px var(--rule-soft), inset 0 -20px 30px -22px rgba(229,56,59,0.55)`): Raised nameplate with hairline rule and the static base ember.
- **Plate hover/focus** (`... inset 0 0 0 1px rgba(229,56,59,0.5), inset 0 -28px 44px -26px rgba(229,56,59,0.62), var(--glow-crimson-strong)`) plus `translateY(-2px) scale(1.02)` and `z-index: 1`: the rule turns crimson, the ember deepens, the outer glow lifts over neighbors.
- **Unlit screen glass** (`inset 0 1px 0 rgba(0,0,0,0.55), inset 0 -1px 0 rgba(201,211,221,0.07), inset 0 0 22px rgba(0,0,0,0.35), 0 0 16px rgba(201,211,221,0.05)`): The screen's designed "off" state — recessed well glass with a shaded top lip, an inset shade, and a faint chrome emission so the window reads ON before the lazy bytes land. Never a blank hole. The same stack (minus the outer emission) backs the `:has()` fallback emblem.
- **Ignited screen** (frame `border-color: rgba(229,56,59,0.6)`; `inset 0 1px 0 rgba(0,0,0,0.55), inset 0 -1px 0 rgba(201,211,221,0.07), inset 0 0 22px rgba(229,56,59,0.1), 0 0 22px rgba(229,56,59,0.3)`): Hover/focus-within intent.
- **Glow tokens** (`--glow-crimson-soft: 0 0 18px rgba(229,56,59,0.22)`; `--glow-crimson-strong: 0 0 30px rgba(229,56,59,0.38), 0 0 6px rgba(229,56,59,0.55)`): the built system fires only the strong token, on plate hover/focus.
- **Band inner bevel** (`inset 0 1px 0 rgba(201,211,221,0.06), inset 0 -1px 0 rgba(0,0,0,0.5)`): the counter/roster/footer plates' engraved interior.
- **Wordmark stamp** (`0 1px 0 rgba(0,0,0,0.55), 0 0 28px rgba(201,211,221,0.14)`): chrome reads lit, not flat.
- **Diamond glints** (`0 0 6px rgba(229,56,59,0.65)` lit diamonds; raised once at ignition to `0 0 10px rgba(229,56,59,0.8)`; footer-link hover bloom `0 0 10px rgba(229,56,59,0.4)`).
- **Spine tick glint** (V4; `0 0 8px rgba(229,56,59,0.55)` under the active tick's crimson bar): the lit-state marker of the console's instrument — crimson spent exactly where the machine IS.
- **Frieze pulse flare** (`0 0 22px rgba(229,56,59,1), 0 0 6px rgba(229,56,59,0.9)` with the 9px diamond scaling to 1.6, settling to the lit state ~460ms later): the traveling crimson pulse along the energized spine.
- **Numeral cores** (`0 1px 0 rgba(0,0,0,0.45), 0 0 16px rgba(229,56,59,0.55), 0 0 48px rgba(229,56,59,0.32)`): the counter band's chrome numerals burn crimson from behind — the glyphs stay full chrome, the emission adds separation, never eats it.
- **Arrival flash** (`.plate::after` ignition glow — `inset 0 0 0 1px rgba(229,56,59,0.5)` + deepened ember + `--glow-crimson-strong` at 0.85 opacity, fading over 0.55s): each plate lands its rise with one crimson flash, opacity-only.
- **Wordmark glitch layers** (::before crimson-shifted `rgba(229,56,59,0.92)` + `0 0 14px rgba(229,56,59,0.5)`, ::after chrome-shifted `rgba(201,211,221,0.88)` + matching chrome glow): the aberration pair, transparent at rest, jump-cut by clip-path slices during a ~320ms burst; the base stamp flares `0 0 30px rgba(229,56,59,0.38)` for the burst's life.
- **Field emission** (canvas; ember sprites `rgba(229,56,59,…)` radial stops, chrome motes `rgba(201,211,221,…)`, sweep band peaking `rgba(229,56,59,0.215)` with a `rgba(229,56,59,0.46)` 1px hairline at 0.60 echo gain, composited `lighter`): luminance on near-black — light, not shadow, and background texture, never content.

### The scanline overlay
A fixed, non-interactive machine texture on `body::after`: `position: fixed; inset: 0; z-index: 9999; pointer-events: none` painting a 1px line of `rgba(0,0,0,0.28)` every 3px (`repeating-linear-gradient(to bottom, ...)`). Visible as faint texture on gunmetal plates, near-invisible on the ground, never obscuring content. It crosses the plate screens too, so the imagery sits under the same machine texture. It is **static by design** — it animates nothing, so `prefers-reduced-motion` leaves it untouched.

### Named Rules
**The Engraved-Not-Elevated Rule.** Depth is cut into metal (inset bevels, seated type, tonal recess); light is emitted by live states and by the field's breath (crimson/chrome glow). A drop shadow under a component would break the world — nothing hangs in air.

**The Lit-Screen Rule.** A screenshot's lit-ness is carried by the frame — hairline chrome rule, recessed well glass, faint emission, crimson ignition on intent — never by faked image brightness. All thirteen vendored shots are dark-toned real apps and stay as shot: no filters, no brightness fills, no text over imagery. In the staged wall the screen is also the plate's giving element — the crop channel (`object-fit: cover`) lives there and only there; the anatomy never clips.

## Shapes

Zero border-radius anywhere; the system's corner language is the **cut-plaque chamfer**: a 12px 45° cut at each corner via `clip-path: polygon(...)` (`--corner-chamfer`). Because clip-path clips borders, the three monumental bands (counter band, roster, footer) get their hairline frame from a two-element technique: the outer element is painted in the rule color and clipped, and the inner plate sits 1px inside with its own clip — the visible result is a 1px chrome hairline that follows the cut corners. Nameplates themselves are square-cornered, relying on their inset 1px rule.

The **lit-screen window** is the wall's signature shape: a panel let full-bleed into the plate's top and side edges (negative margins cancel the plate's padding on three sides, so the frame's hairline becomes the plate's visible edge up there), dominating the plate's upper mass while title / one-liner / tags / links settle below. The universal shot ratio **1312:820 is the wall's screen grammar** — every current shot is exactly that, carried as inline `aspect-ratio` from the data dims (per-entry if that ever changes), and the image-less fallback emblem block claims the same aspect so a link between image and emblem plates never shifts the anatomy. That fallback is a `:has()`-gated pseudo-element: the well block plus one centered hollow crimson diamond drawn as an inline-SVG data-URI background (drawn geometry, zero requests).

The recurring marker geometry is the **diamond**: a square rotated 45°, drawn as a pseudo-element — 7px for link and chip markers (filled crimson with glint for LIVE/lit — the LIVE diamond breathing on its 2.7s idle pulse; hollow dim chrome for SOURCE/attribution; hollow crimson for marked), 9px for frieze nodes (hollow chrome-dim, ground-filled to mask the rail behind it, igniting to filled crimson, flaring to 1.6 scale in the pulse). Hairlines are 1px everywhere. The wordmark lintel is a double rule: a 7px stack of 1px energized crimson rule + 5px gap + 1px soft rule, above and below the stamp, the strong lines carrying a 240px traveling shimmer segment every ~5.6s. Plaque furniture includes a short 3rem centered rule above the footer sign-off.

V4 adds two console instruments in the same drawn-line language. The **spine tick** is a 14×2px rule in dim chrome; the active tick elongates to ~26×3 via a right-anchored `transform: scale(1.86, 1.5)` — a transform, not a width change, so the lit state is exempt from layout-shift and the bar's box never moves (14 × 1.86 = 26, 2 × 1.5 = 3 — exact, glow and all); the active label is absolutely positioned out of the tick's flow (appearing or changing it moves no layout box anywhere) on a near-opaque ground chip with a crimson-alpha underline. The **pager chevrons** are drawn geometry: a 9px square with 2px chrome borders on two sides, rotated 45° / −135° into left/right arrows — no icon font, no raster; hover tints the strokes crimson (decorative; the frame's hover tint is the logged decorative class).

## Components

### The hero stage (banner: lintel + the living field + the counters)
The power-on stage, one viewport: the Cinzel 700 chrome wordmark stamped between energized double hairlines, the one plain-language category line beneath it in the readout voice (mono caps, dim chrome; measure capped at 55ch in the mono's own advance so the caption sets as a balanced two-line group), and — since V4 — the counter band as the stage's lower half (`#stats` moved into the banner; js/render.js fills it from data exactly as before). The lintel ground carries the **crimson atmosphere**: a deep radial wash (`rgba(229,56,59,0.13)` at the hero's foot, fading to nothing at 72%) — static color, so the loudness survives reduced-motion and no-JS. Behind everything, declared in markup, the **persistent living field**: an `aria-hidden`, pointer-inert `<canvas>` at `position: fixed; inset: 0; z-index: 1` — full viewport for the whole document, under every stage's content, over the ground. It paints exactly two registered layers — (1) **pooled crimson embers** rising slowly with sinusoidal sway and per-mote twinkle (a fixed 170-slot pool, zero per-frame allocations; ~26% faint chrome motes; ~18% bright slow anchors among dim motes) with a slight depth-scaled pointer parallax, and (2) **one scan sweep**: a 190px luminance band (peak wash 0.215, shoulders 0.08) with a 1px crimson hairline at 0.46 traversing top→bottom every ~10.5s in the heartbeat cycle — 3.2s pass, 1.8s dark, one echo pass over the same path at 0.60× gain, 2.1s dark. Restraint is stage-aware and enforced, not hoped: a **pluggable zone resolver** maps the ACTIVE stage to the canvas's density zones — HERO active carries the measured wordmark/category/band y-band multipliers (0.4×/0.7×; band 0.6×/0.85× with bright anchors at 0.35×; sweep gain over the band 0.7×); every other stage stands CALM (global 0.55 alpha / 0.9 size — continuity without competition); `window.ULTRON_FIELD.setZoneResolver(fn)` replaces the map without touching the loop. Because the canvas sits behind all stage content, the sweep reads only in the open ground between and around stages' opaque plates — it can never tint a letterform outside the hero. Performance is a budget: one delta-timed rAF loop (clamped 50ms), DPR capped at 2, density one mote per 2800 css px² clamped 64–170, and the loop stops ONLY on `document.hidden` — the canvas is fixed and never scrolls out of view. Without scripting the canvas never initializes — an empty canvas renders nothing.

**The wordmark glitch:** two aberration copies of the stamp — ::before crimson-shifted, ::after chrome-shifted — drawn from `attr(data-text)` with EMPTY ALT (`content: attr(data-text) / ""`), so the accessible name stays the one real text node and engines without the alt syntax drop the declaration entirely. At rest both are transparent; a burst (~320ms, `steps(1)` jump-cuts between five clip-path slice bands per layer at displaced offsets, layer B opening with one full-frame aberration echo) fires every 7-10s — js/motion.js randomizes both the interval and each layer's entry phase so no two pulses cut alike — and the armed wordmark glitches on hover. The base text never moves; the stamp flares crimson for the burst's life. The wordmark arms only after the count-up's power-on settles, and **V4 adds a suppression window: no burst inside 900ms of any stage swap** (a live burst is cleared on depart) — one moment at a time, still hero-only by construction (the wordmark is only on screen while HERO is active). Reduced-motion: never arms, and the CSS kill block renders the copies permanently transparent.

### The HUD spine (signature component)
The console's orientation system, built by js/stages.js once the rendered stages exist: a fixed nav at the right edge, vertically centered, one tick per stage in document order (HERO / WALL 1..N / ROSTER / FRIEZE / FOOTER). Each tick is a real `<button>` — keyboard-focusable, aria-labeled "Go to <stage>", a FIXED 44×44px box (the tap/focus floor; the box never resizes) — holding a 14×2px drawn rule (resting dim chrome; hover/focus chrome) and, for the active stage only, a mono caps label seated left of the bar on a near-opaque ground chip (chrome ≈ 12.5:1) under a crimson-alpha underline. The active bar goes crimson with its lit glint and elongates by right-anchored transform scale; inactive ticks keep no visible label. Activation scrolls the console to the stage (instant; snap aligns) and commits the active stage in the same task — the tick lights as the stage lands. The spine carries no animated properties: states swap instantly under every preference. It rebuilds on `ultron:wallpages` (re-pagination) and re-syncs the active stage. No-JS: never built.

### Active-stage tracking (the console's commit discipline)
A passive, rAF-throttled scroll listener watches the console and commits the active stage ONLY AT REST: after the last scroll event plus a 140ms debounce (or the native `scrollend` where it exists), and only when the winning stage's top edge is aligned within a quarter of the viewport (an alignment gate, retried at most 6 times before a forced commit so a retargeted gesture still lands). **The depart check rides the same tick**: once the settled stage's alignment genuinely breaks past 30% of the viewport, `ultron:stagedepart` fires — its release may begin while it is still visible. A commit is ONE place that flips the tracked id, the spine ticks, and the events (`ultron:stagechange` + `ultron:stagesettle`) — label and choreography share a task, never a desync. This settle keying is the fix for the flick nuance: a synthetic flick crossing two snap points can no longer commit the INTERMEDIATE stage — only the stage the snap actually lands on is ever committed, and the origin stage departs once, visibly. A pull-away that snaps back home simply re-settles (the content un-dims; no flash, no re-assembly).

### Counter band (inside the hero stage)
One full-bleed chamfered plate on the dark-crimson variant: a `rgba(229,56,59,0.12)` wash over the gunmetal field inside a `rgba(229,56,59,0.42)` energized frame — four equal `1fr` cells divided by hairline seams. Each cell: a monumental Cinzel 900 numeral (up to 9rem) burning a crimson core behind full chrome over a Martian Mono readout label in near-chrome caps. On first view the numeric counters count 0 → N once over 1.1s with cubic ease-out, digits changing via `textContent` only (tabular numerals, fixed tracks — zero reflow); "∞" is not numeric and renders verbatim, never counting. The same moment fires the field's power-on: `motion.js` calls `window.ULTRON_FIELD.ignite()`, restarting the sweep from the top at 1.45× gain — scan and counters light as one ignition, after which the field only breathes. Under 560px of viewport height the band returns to four-across with compacted numerals (2.25rem) and padding so the power-on reads in one glance at phone-landscape heights.

### Wall pages (the paginated proof surface)
Each wall page stage = one mono readout band + one grid of plates filling the rest of the viewport. The readout is the machine's own orientation line, real text for everyone; the grid's columns/rows come inline from the live tier (3×2 / 2×2 / the finale's single cell). Plates are the staged anatomy — screen first (full-bleed, the plate's giving element), then the Cinzel 700 uppercase title (container-sized, balanced), the Garamond one-liner in dim chrome (0.9375rem), mono uppercase tags in well-filled hairline boxes (micro size), and a links row pinned to the plate foot under a hairline base rule so every plate in a row shares one datum line. The shots are the owner's real experiment screenshots, vendored PNG 1312×820, lazy-loaded with async decoding below the fold — promoted to `loading="eager"` + `fetchpriority="high"` when their top edge is already in the initial viewport — with intrinsic width/height attributes and the inline data-derived `aspect-ratio` reserving the exact box before the bytes arrive: image load costs zero layout (CLS 0, measured). Hover/focus-within raises the whole plate: crimson rule, deepened ember, strong outer glow, 2px lift + 1.02 scale — and the screen's own frame ignites on the same intent. Each plate lands its rise with one crimson arrival flash. LIVE carries the lit crimson diamond, breathing on its 2.7s idle pulse; SOURCE the hollow dim-chrome marker. A build without a usable image renders the unlit-screen emblem (`:has()`-gated); link-less plates end at their tags. **The featured finale** is the same anatomy at monument scale — one plate, one stage, the title back up at clamp(1.375rem, 7cqi, 2.25rem), the screen at (nearly) its full natural ratio under the height-aware width cap.

### The phone wall pager (below 640px)
One console stage, thirteen horizontal x-pages: a `scroll-snap-type: x mandatory` scroller of single-plate pages (each page the well backing field with a 0.25rem mounting-joint frame, one plate centered, capped at 40rem wide), a mono readout ("SCREEN 04 / 13", `aria-live` so the number speaks on settle) and two real chevron buttons (44px targets, aria-labeled, drawn-geometry arrows in the line language, disabled at the wall's ends — the readout + disabled state carry the bounds). The two snap axes COEXIST by gesture routing: `touch-action: pan-x pan-y` — a horizontal-dominant pan locks to the pager (the only scroller that can move x), a vertical-dominant pan chains straight to the y-mandatory root console, so vertical swipes keep advancing stages and horizontal swipes keep paging screens; `overscroll-behavior-x: contain` stops an end-of-wall flick from becoming a history swipe. Page changes are settle-keyed too (120ms debounce / `scrollend`): the readout, the chevron states, and the `ultron:wallpage` event (motion.js ignites that page's plates on it) all land at rest, never mid-swipe. One plate per page is the density decision, measured and logged: a staged phone plate stands ~330-374px at 390 and ~310px at 320 — two per page fits only the tallest phones with no breathing room and never the 320×568 floor; ONE per page keeps every phone height the same interface (consistency > density). The scrollbar is hidden — the readout, the chevrons, and the snap itself carry the affordance; the spine still marks the stage. `window.ULTRON_WALL.current()/goto()` exposes the pager to the console (deep links, ignition).

### Mode chips (graded)
Inline-flex mono caps chips on a well fill with a hairline frame, 7px diamond drawn before the word — three grades per the Graded Accent Rule: lit (autonomous/deadline: filled glowing crimson diamond, `rgba(229,56,59,0.6)` frame, chrome bold text), marked (redesign/finishing: hollow crimson diamond, `rgba(229,56,59,0.35)` frame, chrome text), dim (gated/delegated: no diamond, plain well chip, dim chrome). When the roster stage assembles, the band's rise and its chip-glow ignition are one moment: the two lit diamonds raise their glow to `0 0 10px rgba(229,56,59,0.8)`, 60ms apart.

### Lineage frieze
The timeline cut into open ground — no plate around it; the energized crimson spine (a `rgba(229,56,59,0.4)` hairline with faint emission) is the band. Each course: micro mono ordinal/date above the rail, hollow 9px node seated on the rail, Cinzel title and Garamond line hung below. When the frieze stage settles, the nodes sweep: each ignites in lineage order (hollow chrome-dim → filled crimson, 60ms stagger) and flares — the diamond scales to 1.6 and its glow blooms — settling to the lit state ~460ms later, one crimson pulse traveling the spine on every re-entry. Below 1180px the same anatomy stands up as a vertical stele with per-course energized rail segments, cutting to two columns on short viewports (the rail never crosses a column break).

### Footer stage
The full-bleed chamfered plate bookending the counter band — attribution links in the wall's link anatomy (mono caps, hollow dim-chrome diamonds, 44px targets; hover draws a crimson underline and a soft glow bloom), sign-off in dim chrome under a short centered rule — plus the page's last inscription INSIDE the stage: the archive anchor, one carved line to the documentation wing (skills.html) on the plate field with a rule-on-plate top seam, preserved across re-renders. The page ends anchored on engraved metal, everything on the final stage visible at rest.

### The stage choreography (cross-component)
One grammar, keyed on the console's SETTLED commits — never raw scroll. **The release (disappear):** the instant the settled stage's alignment genuinely breaks (`ultron:stagedepart`), its content recedes — opacity 0.2, scale 0.98, 1.5px blur over ~300ms — while the old stage is still on screen; the state rides a TRANSIENT `.is-departing` class, removed at the following settle. **The assembly (reappear):** when a stage settles as active (`ultron:stagesettle` — the same task that flips the spine tick), its content re-enters on the established ignite grammar over `--dur-rise` (0.6s): pre-entry offsets (`translate: 0 18px`, opacity 0) exist ONLY under the JS-added `.stage-armed` class; hero groups rise at 90ms steps (lintel, then the counters), wall readouts land at once and the plates ride the SAME continuous 55ms drain queue (the phone pager ignites only the screen the visitor is ON), dedications at 70ms, frieze nodes sweep at 60ms, the footer's plate and archive line at 90ms. A `contentLive` flag keeps a brief pull-away-and-return from re-striking a stage that never left — it simply un-dims. **Channel discipline:** opacity / transform / filter ONLY — never a layout property, never display/visibility, so off-stage content NEVER leaves the accessibility tree (all 13 plates verified present post-transition); and the dim and the rises apply to the stage's CONTENT children — never to `.stage` itself and never to `#hero-field` (a transformed ancestor would re-anchor the fixed persistent canvas; the field stays continuous through every swap, structurally exempt from every rule here). **The a11y distinction that shaped the grammar:** the resting recessive state is the PRE-ENTRY state (opacity 0, the armed below-fold class), never a computable opacity-0.2 dim — a resting dim on off-stage text fails automated contrast audit (28 violations, measured), while the armed pre-entry offset is its known triage class; the .2/scale/blur recede itself is unchanged, alive only mid-flight. **Idle loops (two, sanctioned):** the field's breathing and every LIVE diamond's slow crimson pulse (2.7s, scale 1→1.18 + glow 6→13px, CSS-only behind the wall's arming class). **Wordmark glitch:** after the power-on, a ~320ms burst every 7-10s plus glitch-on-hover — suppressed for 900ms across every stage swap. **`prefers-reduced-motion`:** the choreography never arms (and a live switch strips every class, settling instantly); the console swaps by instant snap with the full page complete at all times; counters stand final, ignitions land as static states, the field is painted as one still, the glitch never arms — the page stays LOUD by color/scale/texture (wash, energized rules, tinted band, numeral cores, 0.28 scanlines, the staged wall), never by motion alone.

### Failure states (empty mounts, noscript)
The machine speaks when it cannot run, in the same language — and in the same crimson light: `.empty-state` is a quiet plate — hairline rule, raised bevel, sentence-case readout type in dim chrome, hollow crimson marker above the line (the "marked" grade); `.noscript-notice` is a full-width band on the counter band's own dark-crimson plate variant under a crimson-alpha border, in full chrome, sentence-case. With scripting disabled the `staged` class never lands, so the degraded page is the plain stacked document: auto-height sections that scroll normally, the auto-fill wall at its 320px floor (3 columns at ≥1280px), no spine, no pager — the documented no-JS contract.

### Keyboard presence
One crimson focus ring everywhere (`outline: 2px solid var(--crimson); outline-offset: 3px`). The skip link is the first focusable element, hidden until focused, then a small ground plate of chrome mono caps that jumps to the wall — the first wall PAGE. `#wall` takes programmatic focus (`tabindex="-1"`) with its section ring suppressed. The spine's ticks and the pager's chevrons are real buttons in the natural tab order (the spine's end-of-body placement keeps that order content-first).

## Do's and Don'ts

### Do:
- **Do** keep crimson (`#e5383b`) the only chromatic color, and spend it only where the machine acts, breathes, burns, or IS — LIVE diamonds, lit chips, focus ring, hover rules, selection, screen ignition, sweep and pulse, the atmosphere (wash, band tint, energized rules, numeral cores, glitch layer, arrival flash), and the console instruments (the spine's lit tick and label underline), always as alphas of the same pin.
- **Do** keep every stage exactly one viewport (100svh; a vh line first for pre-svh engines) with `scroll-snap-stop: always` — one gesture is one stage — and repack by height (roster 3×2, two-column stele, condensed hero) rather than clipping or hiding when a rotated phone squeezes the viewport.
- **Do** gate every staged rule on `html.staged` (added by the one inline head script before first paint) so the no-JS page degrades to the plain stacked document — and arm every entrance offset exclusively via JS-added classes applied with the render (`.stage-armed`, `.wall-armed`, `body.motion-armed`), never hidden in CSS awaiting a class.
- **Do** commit the console only at rest: settle-keyed depart/commit with the alignment gate, so a flick across two snap points commits only the stage the snap lands on — and fire the spine tick and the stage's assembly in the same task.
- **Do** keep the field continuous through every swap: never transform, dim, or transition `#hero-field` or its ancestors — the persistent canvas IS the illusion; swap only stage content, and keep the loop paused solely on `document.hidden`.
- **Do** keep off-stage content in the accessibility tree (opacity/transform/filter only, never display/visibility) and let the resting recessive state be the armed pre-entry state — the mid-dim recede is a transient, in-flight state only.
- **Do** build containers as engraved metal: plate field + inset bevel stack + `--engrave-text` seated lettering + 1px rule-color hairlines as borders and seams.
- **Do** lead every plate with the real screenshot in lit-screen framing — full-bleed window, chrome hairline frame, unlit well glass — reserving the box with intrinsic width/height attributes and the inline data-derived aspect-ratio (zero CLS), letting the SCREEN be the giving element on tight tracks (`object-fit: cover`), never the anatomy.
- **Do** give every console instrument fixed 44×44px boxes and make state changes transform-only or absolutely-positioned (the spine's scale-elongation and out-of-flow label; measured CLS-safe) — orientation chrome must never shift layout.
- **Do** size type that packs into changing grids against its container (cqi clamps with a px fallback declaration first).
- **Do** animate only transform-family (`translate`/`transform`), opacity, and paint properties (incl. clip-path and background-position); change counters via `textContent` on fixed tracks; keep the glitch suppressed for 900ms across every stage swap.
- **Do** honor `prefers-reduced-motion` by rendering final values, static glow states, and one painted field still — the console swaps by instant snap with the full page complete at all times, and the loudness is carried by color/scale/texture that renders statically.
- **Do** draw every marker as a rotated-45° square (7px links/chips, 9px frieze nodes), draw arrows as stroke geometry (no icon fonts), and keep interactive targets at 44px minimum.

### Don't:
- **Don't** use soft cards, drop-shadow card chrome, or border-radius — plates are separated by hairline rules over a shared backing field, never floating.
- **Don't** introduce a second accent, a gradient fill, or any color outside the pinned palette's alpha family (canvas included — embers and sweep are crimson/chrome alphas only; the glitch pair, wash, tint, and every energized rule are alphas of the same two pins).
- **Don't** fake a screenshot's lit-ness (filters, brightness fills) or set text on/over the imagery — the frame carries the light (The Lit-Screen Rule).
- **Don't** let a stage grow past one viewport, animate a layout property (width, height, margin, top/left, padding, font-size), parallax text, or hide content behind an entrance reveal that is not JS-armed.
- **Don't** dim the active stage, commit mid-flight, or leave an element past the last stage's final fold — the console's last stage carries the page's last inscription visibly at rest.
- **Don't** set Cinzel below 700 (counters are 900), EB Garamond at 400, or negative tracking on the display face.
- **Don't** let a rule-color background peek beside a plate (the "lit gap" failure) — joints stay 0.25rem on the well field, and band states span the full band.
- **Don't** let the field, the atmosphere, the choreography, or the glitch upstage the monument — lettering paints above the canvas, non-hero stages stand calm, the sweep's wash must never breach the contrast floors, and the glitch never fires during the power-on, inside a stage swap, or under reduced-motion.
- **Don't** fabricate data the monument displays — empty or invalid mounts degrade to the styled empty-state plate, never to blank space or invented content.

---

*Simulated decisions (auto mode) — qualitative calls document.md's flow would put to the user, answered here from PRODUCT.md, the surface brief, and the built code:*
1. *Creative North Star name "The Crimson Monument" — simulated (auto mode), source: PRODUCT.md Brand Commitments (classic Ultron: near-black, gunmetal, glowing crimson, scanline) + `.impeccable/surfaces/index-html.md` Honor-Roll Wall contract.*
2. *Overview voice and confirmed anti-references (no soft cards / drop-shadow chrome / marketing bands / gradient text) — simulated (auto mode), source: surface brief THESIS + OWN-WORLD blocks and PRODUCT.md voice ("confident, a little menacing, never self-deprecating").*
3. *Color character names (Vault Black, Gunmetal Plate, Recessed Well, Engraved Chrome, Dim Chrome, Ultron Crimson) — simulated (auto mode), source: PRODUCT.md aesthetic direction; hex values are extracted, not simulated.*
4. *Elevation philosophy ("engraved, not elevated" — tonal/inset depth, glow as emission) — simulated (auto mode), source: surface brief OWN-WORLD ("no soft cards, no drop-shadow card chrome") + built inset-shadow vocabulary.*
5. *Component philosophy ("engraved hardware — everything is mounted, carved, or bolted on; nothing floats") — simulated (auto mode), source: surface brief OWN-WORLD + THESIS blocks.*
6. *North Star evolved to "The Crimson Monument, Ignited" — simulated (auto mode), source: V2 direction contract THESIS ("the monument ignites … the refusal now has a pulse", user-locked 2026-09-01).*
7. *Lit-screen framing doctrine (the frame carries the lit-ness, never faked image brightness) — simulated (auto mode), source: V2's measured finding that all 13 vendored shots are dark-toned + OWN-WORLD "framed as lit screens in the dark".*
8. *Field restraint language ("background texture, never content; the wordmark stays king") — simulated (auto mode), source: V2 contract FIRST VIEWPORT ("subtle, never obscuring") + the V3/V4 harness's density-zoning measurements.*
9. *Motion-grammar naming (one "orchestrated power-on"; the field's breathing as a sanctioned loop) — simulated (auto mode), source: V2 contract "orchestrated grammar" + js/motion.js's registered-moments header.*
10. *V3-B amplification scope (glitch on the wordmark, crimson atmosphere, dark-crimson counter band, 3-column wall, motion amplitude, 0.28 scanlines) — simulated (auto mode), source: plan.md V3-B row + the owner's standing asks ("louder") + PRODUCT.md's day-one approved aesthetic ("scanline/glitch texture").*
11. *North Star evolved to "The Crimson Monument, Ignited — One Interface" — simulated (auto mode), source: the V4 amendment (STORY: "the monument becomes a single console — stages swap, the field persists") + the owner's ask for "the illusion that there is no scrolling"; the snap architecture, tiers, and events are extracted, not simulated.*
12. *Console vocabulary ("stages", "the console", "the machine stays on while stages swap", "the console's instrument") — simulated (auto mode), source: the V4 amendment's own words in the direction contract + css section 14 headers.*
13. *"The Settle Rule" naming (commit at rest, never mid-flight; depart once, visibly) — simulated (auto mode), source: js/stages.js's W2 settle machinery + the logged 1440×700 flick finding it fixes.*
14. *"The Resting State Rule" / the a11y distinction (pre-entry rest vs the transient departing dim) — simulated (auto mode), source: the W3 fix of record (the .is-left resting dim's 28 axe contrast violations) + css section 15's release-rule comment.*
15. *The spine's character ("the console's instrument, not decoration; crimson marks where the machine IS") — simulated (auto mode), source: css section 14b header + styles.css 14's new-pairs log.*
16. *The pager density call ("one plate per page — consistency > density") — simulated (auto mode), source: js/render.js wallTier's measured judgment (~330-374px plates at 390; the 320×568 floor).*
17. *The featured finale's character (the newest build alone on a full stage — the wall's closing monument) — simulated (auto mode), source: render.js/styles 14a featured-finale rules + the 6/6/1 tier shape.*
18. *"The Persistent Field Rule" naming (the canvas never scrolls, transforms, or dims — continuity is the illusion) — simulated (auto mode), source: js/field.js's V4 header + css section 15's structural-exemption note.*
