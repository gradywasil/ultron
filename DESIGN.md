---
name: The Ultron Initiative
description: A monument to shipped work — engraved gunmetal plates on near-black ground, lit by a single crimson accent.
colors:
  ground: "#0b0d10" # "Vault Black" — page ground (color name simulated (auto mode): PRODUCT.md classic-Ultron aesthetic)
  plate: "#1d232b" # "Gunmetal Plate" — plate fields (color name simulated (auto mode): PRODUCT.md)
  well: "#12161c" # "Recessed Well" — recessed fields inside plates (color name simulated (auto mode): PRODUCT.md)
  chrome: "#c9d3dd" # "Engraved Chrome" — primary type (color name simulated (auto mode): PRODUCT.md)
  chrome-dim: "#8b97a5" # "Dim Chrome" — secondary type (color name simulated (auto mode): PRODUCT.md)
  crimson: "#e5383b" # "Ultron Crimson" — the single active accent (color name simulated (auto mode): PRODUCT.md)
  rule-strong: "rgba(201, 211, 221, 0.30)"
  rule-soft: "rgba(201, 211, 221, 0.14)"
  rule-on-plate: "rgba(201, 211, 221, 0.20)"
typography:
  counter:
    fontFamily: "Cinzel, 'Times New Roman', serif"
    fontSize: "clamp(3.5rem, 5.5vw + 2rem, 9rem)"
    fontWeight: 900
    lineHeight: 0.95
    letterSpacing: "normal"
    fontFeature: "'lnum' 'tnum'"
  wordmark:
    fontFamily: "Cinzel, 'Times New Roman', serif"
    fontSize: "clamp(2.25rem, 3.5vw + 1rem, 4.5rem)"
    fontWeight: 700
    lineHeight: 1.15
    letterSpacing: "0.14em"
  title:
    fontFamily: "Cinzel, 'Times New Roman', serif"
    fontSize: "clamp(1.3125rem, 9cqi - 0.28125rem, 1.875rem)"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "0.08em"
  body:
    fontFamily: "EB Garamond, Georgia, serif"
    fontSize: "clamp(1.0625rem, 1rem + 0.3vw, 1.1875rem)"
    fontWeight: 500
    lineHeight: 1.65
    letterSpacing: "normal"
  readout:
    fontFamily: "Martian Mono, ui-monospace, 'Courier New', monospace"
    fontSize: "0.8125rem"
    fontWeight: 400
    lineHeight: 1.4
    letterSpacing: "0.14em"
  tag:
    fontFamily: "Martian Mono, ui-monospace, 'Courier New', monospace"
    fontSize: "0.75rem"
    fontWeight: 400
    lineHeight: 1.4
    letterSpacing: "0.06em"
  micro:
    fontFamily: "Martian Mono, ui-monospace, 'Courier New', monospace"
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
    padding: "1.5rem"
  plate-tag:
    backgroundColor: "{colors.well}"
    textColor: "{colors.chrome-dim}"
    padding: "0.125rem 0.5rem"
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

**Creative North Star: "The Crimson Monument"** — *(North Star name simulated (auto mode): derived from PRODUCT.md's user-approved "classic Ultron" aesthetic direction — near-black, gunmetal chrome, glowing crimson, scanline texture — and the locked Honor-Roll Wall direction contract in `.impeccable/surfaces/index-html.md`.)*

The page is not a website with metal styling; it is a monument that happens to be browsable. Every surface is one of three metals — near-black ground, gunmetal plate, recessed well — and every word is engraved into that metal: chrome capitals seated with a 1px dark lip (`text-shadow: 0 1px 0 rgba(0, 0, 0, 0.45)`), never printed on top. The single chromatic voice is crimson (`#e5383b`), and it is spent only where the machine acts: a LIVE diamond, a lit mode chip, a keyboard focus ring, a hover rule. The mood is confident, precise, and a little menacing — the machine carved its own honor roll and left the lights low.

The system is monolithic and wall-to-wall. Content blocks are not floating cards on a background; they are courses of a wall — plates separated by 1px hairline rules over a shared recessed backing field, monumental bands chamfered like cut plaques, a lineage frieze carved directly into open ground. Density is high inside components (tight 0.25rem mounting joints, compact mono tags) and generous between them (`clamp(4rem, 9vw + 1rem, 9rem)` section gaps), so each block reads as one carved unit.

Motion follows the same discipline: one memorable count-up, one-time scroll ignitions, intent-only glow. Nothing loops, nothing is hidden behind an entrance animation, and every transition rides transform or paint properties only. `prefers-reduced-motion` snaps the page to its final, fully readable state. The confirmed anti-references (from the locked direction contract): no stacked marketing bands, no card-grid-with-hero, no soft cards, no drop-shadow card chrome, no gradient text, no off-world color.

**Key Characteristics:**
- Engraved-metal tonal triad (ground / plate / well) with chrome type and exactly one accent color.
- Plate / well / frieze component language — everything is mounted, carved, or bolted on; nothing floats.
- Chamfered (12px cut-corner) monumental bands framed by a 1px rule-color hairline.
- A fixed static scanline overlay (1px dark line every 3px) as machine texture.
- A graded crimson accent system: crimson intensity grades how much the machine acts (lit / marked / dim).
- Three-face type system: Cinzel inscriptional caps, Martian Mono readouts, EB Garamond body.
- Motion budget: count-up once, ignitions once, glow on intent; transform/paint only; reduced-motion renders final states.

## Colors

One family of metal and one drop of blood: five cool neutrals from near-black to pale chrome, plus a single crimson accent that carries every "active" state on the page.

### Primary
- **Ultron Crimson** (`#e5383b`): The only chromatic color. Marks the live/active state wherever it appears — LIVE link diamonds (with `box-shadow: 0 0 6px rgba(229, 56, 59, 0.65)`), lit autonomous/deadline mode chips, the plate hover glow, hover underlines (`text-decoration-color: var(--crimson)`), the global focus ring (`outline: 2px solid`, offset 3px), text selection (`background: rgba(229, 56, 59, 0.35)`), the static crimson ember pooled at each plate's base (`inset 0 -20px 30px -22px rgba(229, 56, 59, 0.55)`), and frieze nodes once ignited. Contrast: 4.60:1 on ground, 3.74:1 on plate — body-size text only on ground; on plate it is reserved for non-text markers and large text.

### Neutral
- **Vault Black** (`#0b0d10`): The page ground. Everything sits on it or hangs from it; overscroll and `html` are pinned to it so nothing flashes white. Frieze titles read 12.83:1 on it.
- **Gunmetal Plate** (`#1d232b`): The plate field — the surface of every nameplate, band, chip, and the footer. Primary chrome text reads 10.43:1 on it.
- **Recessed Well** (`#12161c`): Recessed interior fields — the wall's shared backing field, tag and chip fills. Reads as "sunk below the plate." Dim chrome reads 6.11:1 on it.
- **Engraved Chrome** (`#c9d3dd`): Primary type and the light pole of the metal. Also the base of all hairline rules (below).
- **Dim Chrome** (`#8b97a5`): Secondary voice — descriptions, labels, dates, SOURCE links, sign-offs. 6.55:1 on ground, 5.32:1 on plate, 6.11:1 on well.
- **Hairline rules** (`rgba(201, 211, 221, 0.30)` strong / `0.14` soft / `0.20` on-plate): 1px chrome-alpha rules that serve as every divider, plate border, frame, and seam. Alpha (not solid hex) so one value serves ground and plate alike.

### Named Rules
**The One Active Accent Rule.** Crimson is the page's only chromatic color, and it is spent where the machine acts — never as decoration, never as a second brand color. If a new element glows crimson, that element is live.

**The Graded Accent Rule.** Crimson intensity grades machine agency, mirroring the wall's link language across the mode chips: **lit** (filled crimson diamond + glow + crimson frame + full-chrome bold text) for autonomous/deadline lines; **marked** (hollow crimson diamond, faint crimson frame `rgba(229, 56, 59, 0.35)`, chrome text) for bounded passes; **dim** (no diamond, plain well chip, dim chrome) where the human holds the gate.

**The Metal-Only Rule.** All colors derive from the pinned palette; glow and rule colors are alpha variants of chrome or crimson only. No gradient text, no off-world hue, no second accent.

## Typography

**Display Font:** Cinzel (fallback: Times New Roman, serif) — self-hosted latin woff2 at weights 700 and 900 only.
**Body Font:** EB Garamond (fallback: Georgia, serif) — self-hosted latin woff2 at weight 500 only.
**Label/Mono Font:** Martian Mono (fallback: ui-monospace, Courier New, monospace) — self-hosted latin woff2 at weights 400 and 700.

**Character:** Inscriptional Roman capitals carved for a monument, tempered by a machine's readout type and an old-style serif for prose. Cinzel speaks titles and numerals, Martian Mono speaks data and machine state, Garamond speaks to the visitor. All three are OFL, latin-subset, zero external requests.

### Hierarchy
- **Counter** (Cinzel 900, clamp(3.5rem, 5.5vw + 2rem, 9rem), line-height 0.95, lining tabular numerals): The monumental counter band numerals — deliberately beyond a generic display cap. Never below weight 900.
- **Wordmark** (Cinzel 700, clamp(2.25rem, 3.5vw + 1rem, 4.5rem), line-height 1.15, 0.14em tracking, uppercase): The page's single h1, stamped between double hairlines with a lit-chrome text-shadow (`0 1px 0 rgba(0,0,0,0.55), 0 0 28px rgba(201,211,221,0.14)`).
- **Title** (Cinzel 700, container-relative: plates clamp(1.3125rem, 9cqi − 0.28125rem, 1.875rem), dedications clamp(1.125rem, 5.6cqi + 0.225rem, 1.625rem), milestones clamp(1.0625rem, 11cqi − 0.28125rem, 1.25rem), 0.08em tracking, uppercase, balanced wrap): Nameplate, dedication, and milestone names — sized against their own container, not the viewport.
- **Body** (EB Garamond 500, clamp(1.0625rem, 1rem + 0.3vw, 1.1875rem), line-height 1.65): Descriptions, roles, milestone lines, sign-off. Measure token `--measure: 68ch` (applied to degraded-state copy).
- **Readout** (Martian Mono 400, 0.8125rem, 0.14em tracking, uppercase): Counter labels, LIVE/SOURCE links, footer links, skip link. The noscript and empty-state messages share the readout's face, size, and 0.06em tracking but set sentence-case — see the Inscriptional Caps Rule's sole exception.
- **Tag** (Martian Mono 400, 0.75rem, 0.06em tracking, uppercase): Plate tags and mode-chip words.
- **Micro** (Martian Mono 400, 0.6875rem, 0.14em tracking, uppercase): Frieze ordinal/date line only.

### Named Rules
**The Inscriptional Caps Rule.** All display and mono text is uppercase with positive tracking (0.06–0.14em). Never negative tracking on Cinzel — it is a carved-capital face. Sole exception (refinement R3, the critique's all-caps-body finding): the degraded-state messages — the noscript notice and the empty states — set sentence-case; a long failure passage in caps reads as shouting, and the rule stays with every short label.

**The Weight-On-Black Rule.** Thin strokes die on near-black: Cinzel never below 700 (900 for counter numerals), EB Garamond never 400 on this palette (500 is the floor), mono emphasis takes 700. There is no light weight anywhere in the system.

**The Tabular Counters Rule.** Counter numerals carry `lining-nums tabular-nums` so the count-up changes digits without a single pixel of jitter.

## Layout

A single scrolling monument in six courses, read top to bottom: wordmark lintel → counter band → nameplate wall → dedication band → lineage frieze → footer plate. Two spatial registers alternate. **Full-bleed chamfered bands** (counter band, roster, footer) run wall-to-wall and are framed by the chamfer/hairline technique (see Shapes). **Gutter-fenced sections** (wall, frieze) sit inside `--gutter: clamp(1.25rem, 4vw, 3rem)` side margins. Sections breathe apart on `--section-gap: clamp(4rem, 9vw + 1rem, 9rem)`; interior rhythm uses the 4px-base spacing scale (frontmatter), which the built page exercises from 0.25rem to 3rem.

The **wall** packs continuously with no breakpoints: `grid-template-columns: repeat(auto-fill, minmax(min(100%, 280px), 1fr))` on a shared `--well` backing field with 0.25rem mounting joints. It repacks 4 → 2 → 1 columns as the viewport narrows, edge-to-edge, zero masonry gaps; 13 being prime, the final row leaves bare backing wall visible — an honor roll with room to grow. Plate titles use container queries (`container: plate / inline-size`) so type shrinks with the track, not with the viewport.

Bands **repack by breakpoint with seams that follow the geometry**: the counter band runs 4-across, stacks 2×2 at 900px (hairline seams redrawn per cell), and compacts padding/labels at 480px; the dedication band runs 3×2, 2×3 at 900px, one course at 560px — every seam is a scoped hairline reset so rules always match the live grid. The **frieze** uses one strategy per range: at ≥1180px a horizontal frieze (six equal courses hung from a full-width hairline rail, nodes seated on the rail); below 1180px the same content stands up into a vertical stele (per-course rail segments down the left edge). No scroll traps, no horizontal page overflow at any width.

The first viewport is contracted, not accidental: the chrome wordmark stamped between double hairlines, the monumental counter band beneath it, and the first crimson-embered nameplates glinting at the fold line.

## Elevation & Depth

Depth is engraved, not stacked. There are **no drop shadows on any component** — no floating cards exist. Instead depth comes from three instruments working together: (1) **tonal layering**, well sunk below plate, both raised off the ground; (2) **inset bevels**, a 1px dark lip on the top edge and a faint chrome catch on the bottom (`--plate-edge` grammar: `inset 0 1px 0 rgba(0,0,0,0.5–0.55)` + `inset 0 -1px 0 rgba(201,211,221,0.06–0.08)`), with lettering seated by `--engrave-text: 0 1px 0 rgba(0,0,0,0.45)`; and (3) **crimson light**, which is emission, not shadow — glows mark live/active states and never act as depth cues.

### Shadow Vocabulary
- **Plate bevel (rest)** (`inset 0 1px 0 rgba(201,211,221,0.08), inset 0 -1px 0 rgba(0,0,0,0.5), inset 0 0 0 1px var(--rule-soft), inset 0 -20px 30px -22px rgba(229,56,59,0.55)`): Raised nameplate with hairline rule and the static base ember.
- **Plate hover/focus** (`... inset 0 0 0 1px rgba(229,56,59,0.5), inset 0 -28px 44px -26px rgba(229,56,59,0.62), var(--glow-crimson-strong)`): The rule turns crimson, the ember deepens, the outer glow lifts — plus `translateY(-1px)` and `z-index: 1` so the glow reads over neighbors.
- **Glow tokens** (`--glow-crimson-soft: 0 0 18px rgba(229,56,59,0.22)`; `--glow-crimson-strong: 0 0 30px rgba(229,56,59,0.38), 0 0 6px rgba(229,56,59,0.55)`): the built system fires only the strong token, on plate hover/focus.
- **Band inner bevel** (`inset 0 1px 0 rgba(201,211,221,0.06), inset 0 -1px 0 rgba(0,0,0,0.5)`): the counter/roster/footer plates' engraved interior.
- **Wordmark stamp** (`0 1px 0 rgba(0,0,0,0.55), 0 0 28px rgba(201,211,221,0.14)`): chrome reads lit, not flat.
- **Diamond glints** (`0 0 6px rgba(229,56,59,0.65)` lit diamonds; raised once at ignition to `0 0 10px rgba(229,56,59,0.8)`; footer-link hover bloom `0 0 10px rgba(229,56,59,0.4)`).

### The scanline overlay
A fixed, non-interactive machine texture on `body::after`: `position: fixed; inset: 0; z-index: 9999; pointer-events: none` painting a 1px line of `rgba(0,0,0,0.22)` every 3px (`repeating-linear-gradient(to bottom, ...)`). Visible as faint texture on gunmetal plates, near-invisible on the ground, never obscuring content. It is **static by design** — it animates nothing, so `prefers-reduced-motion` leaves it untouched.

### Named Rules
**The Engraved-Not-Elevated Rule.** Depth is cut into metal (inset bevels, seated type, tonal recess); light is emitted by live states (crimson glow). A drop shadow under a component would break the world — nothing hangs in air.

## Shapes

Zero border-radius anywhere; the system's corner language is the **cut-plaque chamfer**: a 12px 45° cut at each corner via `clip-path: polygon(...)` (`--corner-chamfer`). Because clip-path clips borders, the three monumental bands (counter band, roster, footer) get their hairline frame from a two-element technique: the outer element is painted in the rule color and clipped, and the inner plate sits 1px inside with its own clip — the visible result is a 1px chrome hairline that follows the cut corners. Nameplates themselves are square-cornered, relying on their inset 1px rule.

The recurring marker geometry is the **diamond**: a square rotated 45°, drawn as a pseudo-element — 7px for link and chip markers (filled crimson with glint for LIVE/lit; hollow dim chrome for SOURCE/attribution; hollow crimson for marked), 9px for frieze nodes (hollow chrome-dim, ground-filled to mask the rail behind it, igniting to filled crimson). Hairlines are 1px everywhere. The wordmark lintel is a double rule: a 5px stack of 1px strong rule + 3px gap + 1px soft rule, above and below the stamp. Plaque furniture includes a short 3rem centered rule above the footer sign-off.

## Components

### Wordmark lintel (header)
The page banner. Cinzel 700 uppercase chrome with wide 0.14em tracking, `text-wrap: balance`, stamped between engraved double hairlines, centered. It is static branding — the only markup the render pipeline never touches.

### Counter band (signature component)
One full-bleed chamfered gunmetal plate, four equal `1fr` cells divided by hairline seams. Each cell: a monumental Cinzel 900 numeral (up to 9rem) over a Martian Mono readout label in dim chrome caps. On first view the numeric counters count 0 → N once over 1.1s with cubic ease-out, digits changing via `textContent` only (tabular numerals, fixed tracks — zero reflow); "∞" is not numeric and renders verbatim, never counting.

### Nameplates (the wall)
The proof surface — one per shipped build. Anatomy top to bottom: Cinzel 700 uppercase title (container-sized, balanced), Garamond one-liner in dim chrome, mono uppercase tags in well-filled hairline boxes, then a links row pinned to the plate foot (`margin-top: auto`) under a hairline base rule so every plate in a row shares one datum line. LIVE carries the lit crimson diamond (10.43:1 chrome text); SOURCE the hollow dim-chrome marker (dim text by design — 5.32:1 — waking to chrome on hover). Hover/focus-within raises the glow: crimson rule, deepened ember, strong outer glow, 1px lift (translate only, never scale). Link-less plates simply end at their tags — the links row is omitted, not left hollow.

### Mode chips (graded)
Inline-flex mono caps chips on a well fill with a hairline frame, 7px diamond drawn before the word — in three grades per the Graded Accent Rule: lit (autonomous/deadline: filled glowing crimson diamond, `rgba(229,56,59,0.6)` frame, chrome bold text), marked (redesign/finishing: hollow crimson diamond, `rgba(229,56,59,0.35)` frame, chrome text), dim (gated/delegated: no diamond, plain well chip, dim chrome). When the roster band first enters view it ignites once: the two lit diamonds raise their glow to `0 0 10px rgba(229,56,59,0.8)`, 60ms apart.

### Lineage frieze
The timeline carved into open ground — no plate around it; the hairline rail is the band. Each course: micro mono ordinal/date above the rail, hollow 9px node seated on the rail, Cinzel title and Garamond line hung below. On first view nodes ignite in lineage order (hollow chrome-dim → filled crimson, 0.35s ease-out, 60ms stagger). Below 1180px the same anatomy stands up as a vertical stele with per-course rail segments.

### Footer plate
Full-bleed chamfered plate bookending the counter band. Two attribution links in the wall's link anatomy (mono caps, hollow dim-chrome diamonds — these links leave the monument, so not the active accent — 44px targets); hover draws a crimson underline and a soft glow bloom. Sign-off in dim chrome under a short centered rule. The page ends anchored on engraved metal.

### Failure states (empty mounts, noscript)
The machine speaks when it cannot run, in the same language: `.empty-state` is a quiet plate — hairline rule, raised bevel, sentence-case readout type in dim chrome (caps are for short labels; these long passages read as shouting in caps), hollow crimson marker above the line (the "marked" grade — a bounded state, reported); `.noscript-notice` is a full-width gunmetal band in full chrome, also sentence-case (it is the whole page when it shows). Inside the counter band the empty state re-clips to the band's chamfer and spans full width — the rule-color frame must never show a lit gap beside a narrow plate.

### Keyboard presence
One crimson focus ring everywhere (`outline: 2px solid var(--crimson); outline-offset: 3px`). The skip link is the first focusable element, hidden until focused, then a small ground plate of chrome mono caps that jumps to the wall. `#wall` takes programmatic focus (`tabindex="-1"`) with its section ring suppressed.

## Do's and Don'ts

### Do:
- **Do** keep crimson (`#e5383b`) the only chromatic color, and spend it only on live/active states — LIVE diamonds, lit chips, focus ring, hover rules, selection.
- **Do** build containers as engraved metal: plate field + inset bevel stack + `--engrave-text` seated lettering + 1px rule-color hairlines as borders and seams.
- **Do** frame full-bleed bands with the 12px chamfer + outer rule-color fill / inner 1px-inset plate technique so the hairline follows the cut corners.
- **Do** size type that packs into changing grids against its container (cqi clamps with a px fallback declaration first, e.g. `clamp(1.3125rem, 9cqi - 0.28125rem, 1.875rem)`).
- **Do** animate only transform and paint properties (transform, box-shadow, background/border/text-decoration color, text-shadow); change counters via `textContent` on fixed tracks; run count-ups and ignitions exactly once.
- **Do** honor `prefers-reduced-motion` by rendering final values and final glow states statically, with CSS transitions killed as the backstop.
- **Do** draw every marker as a rotated-45° square (7px links/chips, 9px frieze nodes) and keep interactive link rows at 44px minimum height.

### Don't:
- **Don't** use soft cards, drop-shadow card chrome, or border-radius — plates are separated by hairline rules over a shared backing field, never floating.
- **Don't** introduce a second accent, a gradient fill, or any color outside the pinned palette's alpha family.
- **Don't** animate a layout property (width, height, margin, top/left, padding, font-size), loop an ambient animation, parallax, or hide content behind an entrance reveal.
- **Don't** set Cinzel below 700 (counters are 900), EB Garamond at 400, or negative tracking on the display face.
- **Don't** let a rule-color background peek beside a plate (the "lit gap" failure) — joints stay 0.25rem on the well field, and band states span the full band.
- **Don't** fabricate data the monument displays — empty or invalid mounts degrade to the styled empty-state plate, never to blank space or invented content.

---

*Simulated decisions (auto mode) — qualitative calls document.md's flow would put to the user, answered here from PRODUCT.md and the surface brief:*
1. *Creative North Star name "The Crimson Monument" — simulated (auto mode), source: PRODUCT.md Brand Commitments (classic Ultron: near-black, gunmetal, glowing crimson, scanline) + `.impeccable/surfaces/index-html.md` Honor-Roll Wall contract.*
2. *Overview voice and confirmed anti-references (no soft cards / drop-shadow chrome / marketing bands / gradient text) — simulated (auto mode), source: surface brief THESIS + OWN-WORLD blocks and PRODUCT.md voice ("confident, a little menacing, never self-deprecating").*
3. *Color character names (Vault Black, Gunmetal Plate, Recessed Well, Engraved Chrome, Dim Chrome, Ultron Crimson) — simulated (auto mode), source: PRODUCT.md aesthetic direction; hex values are extracted, not simulated.*
4. *Elevation philosophy ("engraved, not elevated" — tonal/inset depth, glow as emission) — simulated (auto mode), source: surface brief OWN-WORLD ("no soft cards, no drop-shadow card chrome") + built inset-shadow vocabulary.*
5. *Component philosophy ("engraved hardware — everything is mounted, carved, or bolted on; nothing floats") — simulated (auto mode), source: surface brief OWN-WORLD + THESIS blocks.*
