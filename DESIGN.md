---
name: The Ultron Initiative
description: A monument to shipped work — engraved gunmetal plates carrying real lit screens at three monumental columns, on near-black ground that breathes a crimson field under a crimson atmosphere, lit by a single active accent and speaking through the glitch it was approved with on day one.
colors:
  ground: "#0b0d10" # "Vault Black" — page ground (color name simulated (auto mode): PRODUCT.md classic-Ultron aesthetic)
  plate: "#1d232b" # "Gunmetal Plate" — plate fields (color name simulated (auto mode): PRODUCT.md)
  well: "#12161c" # "Recessed Well" — recessed fields inside plates; also the screens' unlit glass (color name simulated (auto mode): PRODUCT.md)
  chrome: "#c9d3dd" # "Engraved Chrome" — primary type (color name simulated (auto mode): PRODUCT.md)
  chrome-dim: "#8b97a5" # "Dim Chrome" — secondary type (color name simulated (auto mode): PRODUCT.md)
  crimson: "#e5383b" # "Ultron Crimson" — the single active accent (color name simulated (auto mode): PRODUCT.md)
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
    fontSize: "clamp(1.3125rem, 9cqi - 0.28125rem, 1.875rem)"
    fontWeight: 700
    lineHeight: 1.2
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
  plate-screen:
    backgroundColor: "{colors.well}"
    padding: "0"
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

**Creative North Star: "The Crimson Monument, Ignited — and Loud"** — *(North Star name simulated (auto mode): evolved at V3-B (the owner's "I still want the site louder", 2026-09-01) from the v1 "The Crimson Monument" / V2 "The Crimson Monument, Ignited". THESIS unchanged in kind — "the monument ignites … the refusal now has a pulse" — with the volume turned up inside the same world: the glitch the owner approved on day one (PRODUCT.md assembly ledger: "scanline/glitch texture") finally ships on the wordmark, the hero ground carries a visible crimson atmosphere, the counter band takes a dark-crimson plate, and the wall's screens double in area. Sources: PRODUCT.md brand commitments + the V2 direction contract in `.impeccable/surfaces/index-html.md` (user-locked 2026-09-01) + plan.md V3-B.)*

The page is not a website with metal styling; it is a monument that happens to be browsable — and since V2, switched on; since V3-B, loud about it. Every surface is one of three metals — near-black ground, gunmetal plate, recessed well — and every word is engraved into that metal: chrome capitals seated with a 1px dark lip (`text-shadow: 0 1px 0 rgba(0, 0, 0, 0.45)`), never printed on top. The single chromatic voice is crimson (`#e5383b`), spent only where the machine acts or breathes: a LIVE diamond, a lit mode chip, a keyboard focus ring, an energized rule, a screen frame answering presence, the ember field and the atmospheric wash rising behind the wordmark. The mood is confident, precise, and a little menacing — the machine carved its own honor roll, left the lights LOW BUT LIT, and left the power on.

The proof became visible in V2 and became the dominant surface in V3-B: the wall is image-led at three monumental columns (≥1280px — plates ~384-443px at 1280-1440, screens at roughly 2× their 4-column area). Every plate leads with the real screenshot of the build it honors, framed as a lit screen in the dark — a hairline chrome frame let into the plate's face, recessed unlit glass behind the lazy bytes, faint emission off the glass, crimson ignition on intent. All thirteen vendored shots are dark-toned real apps, so the lit-ness is carried entirely by the frame, never by faked image brightness. Behind the lintel, a canvas field of pooled crimson embers and one amplified scan sweep (V3-B: echo gain 0.60, brighter trail) breathes under the wordmark — over a deep crimson radial wash that makes the ground itself read lit, never near-void.

The system is monolithic and wall-to-wall. Content blocks are courses of a wall — plates separated by 1px hairline rules over a shared recessed backing field, monumental bands chamfered like cut plaques, a lineage frieze carved directly into open ground on an energized crimson spine. Density is high inside components (tight 0.25rem mounting joints, compact mono tags) and generous between them (`clamp(4rem, 9vw + 1rem, 9rem)` section gaps), so each block reads as one carved unit. Type never floats either: metric-matched local fallback faces sit between each display face and its generic fallback, so the font swap lands without moving a single glyph (zero-swap CLS; the pre-V5 swap moved the wordmark 8px and the counters 14px).

Motion is one orchestrated power-on, not scattered effects: the field's scan sweep and the counter band's count-up ignite as one moment; the first plates rise at the fold; as you scroll, plates rise in a staggered 55ms wave — a deeper 24px carry with a crimson arrival flash, thirteen real screens lighting up in sequence — the frieze sweeps with a traveling crimson pulse flaring each node to 1.6×, and the roster and footer each take one quiet rise. Glow answers intent only, and the wall never fully rests: every LIVE diamond breathes on a slow 2.7s crimson pulse. Only after the power-on settles does the wordmark speak: "THE ULTRON INITIATIVE" glitches — two aberration copies (crimson-shifted, chrome-shifted) slicing jump-cuts for ~320ms every 7-10s, and on hover — the day-one-approved glitch, arrived. Every entrance runs once, rides transform-family, opacity, and paint properties only, and is armed exclusively by JS-added classes so no content is ever hidden awaiting CSS. The field's breathing and the LIVE markers' pulse are the two sanctioned idle loops (canvas rAF paused when hidden or off-screen; the diamond pulse CSS-gated behind the wall's arming class); `prefers-reduced-motion` never arms any of it — the hero is painted as a single static frame, counters stand final, ignitions land as static states, the glitch never fires, and the loudness that remains is color/scale/texture: the wash, the energized rules, the tinted band, the numeral cores, the 0.28 scanlines. The confirmed anti-references (from the locked direction contract): no stacked marketing bands, no card-grid-with-hero, no soft cards, no drop-shadow card chrome, no gradient text, no off-world color.

**Key Characteristics:**
- Engraved-metal tonal triad (ground / plate / well) with chrome type and exactly one accent color.
- Plate / well / frieze component language — everything is mounted, carved, or bolted on; nothing floats.
- Image-led wall at three monumental desktop columns: real screenshots in lit-screen framing (chrome frame + unlit well glass + emission + crimson ignition on intent), with a `:has()`-gated unlit-screen emblem as the image-less fallback.
- A canvas hero field — pooled crimson embers, chrome motes, and one amplified scan sweep — breathing behind the wordmark over a deep crimson atmospheric wash, without upstaging it.
- THE WORDMARK GLITCH: RGB-split aberration copies with clip-path slice jump-cuts (periodic ~7-10s pulse + hover, armed only after the power-on, empty-alt pseudo-content so the accessible name never changes).
- Chamfered (12px cut-corner) monumental bands framed by a 1px rule-color hairline; the counter band wears the dark-crimson plate variant under a crimson frame.
- Energized structural rules: the lintel's double rules and the frieze's spine are crimson-alpha energy lines with faint emission (the lintel's carry a traveling shimmer).
- A fixed static scanline overlay (1px dark line every 3px at 0.28 ink) as machine texture, crossing the screens too.
- A graded crimson accent system: crimson intensity grades how much the machine acts (lit / marked / dim).
- Three-face type system — Cinzel inscriptional caps, Martian Mono readouts, EB Garamond body — on metric-matched zero-swap local fallbacks.
- One orchestrated motion grammar: power-on (sweep + count-up), staggered plate ignition (~55ms, 24px rise + arrival flash), frieze sweep with 1.6× pulse, quiet section rises, LIVE diamond idle pulse, wordmark glitch after the power-on; armed entrances only; reduced-motion renders static finals — loudly.

## Colors

One family of metal and one drop of blood: five cool neutrals from near-black to pale chrome, plus a single crimson accent that carries every "active" state on the page. The screenshots' own colors are content imagery (all thirteen measured dark-toned real apps), not palette; no text is ever set on or over imagery. Since V3-B the crimson also carries ATMOSPHERE — the hero wash, the band tint, the energized rules — always as alpha of the same pin, so the accent count stays one.

### Primary
- **Ultron Crimson** (`#e5383b`): The only chromatic color. Marks the live/active state wherever it appears — LIVE link diamonds (with `box-shadow: 0 0 6px rgba(229, 56, 59, 0.65)`, breathing on the V3-B idle pulse), lit autonomous/deadline mode chips, the plate hover glow, the screen frame's hover tint (`rgba(229, 56, 59, 0.6)` — decorative; the interactive state stays carried by the links' solid diamond and the focus ring), hover underlines (`text-decoration-color: var(--crimson)`), the global focus ring (`outline: 2px solid`, offset 3px), text selection (`background: rgba(229, 56, 59, 0.35)`), the static crimson ember pooled at each plate's base (`inset 0 -20px 30px -22px rgba(229, 56, 59, 0.55)`), ignited frieze nodes and their 1.6× pulse flare, the hero field's embers and scan hairline — and since V3-B the atmosphere: the hero's radial wash (`rgba(229, 56, 59, 0.13)` rising from the hero foot), the counter band's dark-crimson plate (`rgba(229, 56, 59, 0.12)` over gunmetal ≈ `rgb(55, 38, 45)`) and its `rgba(229, 56, 59, 0.42)` frame, the numeral cores' emission (`0 0 16px 0.55 / 0 0 48px 0.32`), the energized lintel rules (`rgba(229, 56, 59, 0.52)` + shimmer) and frieze spine (`rgba(229, 56, 59, 0.4)` + glow), the glitch layers' crimson-shifted copy, and the arrival flash — all rgba alphas of the same crimson (the machine's light, not a second hue). Contrast: 4.60:1 on ground, 3.74:1 on plate — body-size text only on ground; on plate it is reserved for non-text markers and large text.

### Neutral
- **Vault Black** (`#0b0d10`): The page ground. Everything sits on it or hangs from it; overscroll and `html` are pinned to it so nothing flashes white. Frieze titles read 12.83:1 on it (7.00:1 rendered under the V3-B wash for the category line — recomputed).
- **Gunmetal Plate** (`#1d232b`): The plate field — the surface of every nameplate, band, chip, and the footer. Primary chrome text reads 10.43:1 on it. The counter band and the noscript band lay the dark-crimson wash layer over it (≈ `rgb(55, 38, 45)`: chrome ≈ 11.85:1 rendered, near-chrome labels ≈ 9.7:1).
- **Recessed Well** (`#12161c`): Recessed interior fields — the wall's shared backing field, tag and chip fills, and since V2 the screens' unlit glass behind the lazy image bytes. Reads as "sunk below the plate." Dim chrome reads 6.11:1 on it.
- **Engraved Chrome** (`#c9d3dd`): Primary type, the light pole of the metal, and the base of the minority chrome motes in the hero field — and the cool channel of the glitch aberration pair.
- **Dim Chrome** (`#8b97a5`): Secondary voice — descriptions, labels, dates, SOURCE links, sign-offs, the category line. 6.55:1 on ground, 5.32:1 on plate, 6.11:1 on well. NOT used on the counter band since V3-B: its labels step up to near-full chrome at 0.92 alpha (≈ `rgb(189, 196, 206)` — tinted warm by the crimson field beneath per the craft-floor colored-surface rule; dim chrome measured ~4.4:1 on the tinted band, under the body floor at wash residence).
- **Hairline rules** (`rgba(201, 211, 221, 0.30)` strong / `0.14` soft / `0.20` on-plate): 1px chrome-alpha rules that serve as dividers, plate borders, frames, seams — and the resting screen frame, which deliberately reuses the strong rule's alpha class. The page's two STRUCTURAL spines — the lintel's strong rules and the frieze spine — are no longer chrome-alpha: they are energized crimson energy lines (see Primary). Alpha (not solid hex) so one value serves ground and plate alike.
- **Scanline ink** (`rgba(0, 0, 0, 0.28)`, raised from 0.22 at V3-B): the machine texture's dark rows; darker shaded rows only raise light-text contrast (duty-averaged worst pair 5.81:1, recomputed).

### Named Rules
**The One Active Accent Rule.** Crimson is the page's only chromatic color, and it is spent where the machine acts or breathes — never as decoration, never as a second brand color. If a new element glows crimson, that element is live (or the field is breathing).

**The Graded Accent Rule.** Crimson intensity grades machine agency, mirroring the wall's link language across the mode chips: **lit** (filled crimson diamond + glow + crimson frame + full-chrome bold text) for autonomous/deadline lines; **marked** (hollow crimson diamond, faint crimson frame `rgba(229, 56, 59, 0.35)`, chrome text) for bounded passes; **dim** (no diamond, plain well chip, dim chrome) where the human holds the gate.

**The Metal-Only Rule.** All colors derive from the pinned palette; glow, rule, field, and sweep colors are alpha variants of chrome or crimson only. No gradient text, no off-world hue, no second accent — including inside the canvas, where every sprite color is an rgba of crimson (229, 56, 59) or chrome (201, 211, 221).

## Typography

**Display Font:** Cinzel (fallbacks: "Cinzel Fallback" — the local Times New Roman re-metricized to Cinzel's advances and box metrics, size-adjust 110.15% at 700 / 117.2% at 900 — then Times New Roman, serif) — self-hosted latin woff2 at weights 700 and 900 only.
**Body Font:** EB Garamond (fallbacks: "EB Garamond Fallback" — local Georgia at size-adjust 89.33% — then Georgia, serif) — self-hosted latin woff2 at weight 500 only.
**Label/Mono Font:** Martian Mono (fallbacks: "Martian Mono Fallback" — local Courier New at size-adjust 116.65% — then ui-monospace, Courier New, monospace) — self-hosted latin woff2 at weights 400 and 700.

**Character:** Inscriptional Roman capitals carved for a monument, tempered by a machine's readout type and an old-style serif for prose. Cinzel speaks titles and numerals, Martian Mono speaks data and machine state, Garamond speaks to the visitor. All three are OFL, latin-subset, zero external requests. The metric-matched fallback layer (V5) makes the `font-display: swap` moment invisible: each fallback is the same local face the stack already fell back to, re-metricized to the vendored face's own advance widths and ascent/descent box, so wraps, centered widths, and baseline seats hold through the swap (zero-swap CLS, measured; pre-V5 the swap cost up to ~0.011 CLS). `local()` loads synchronously, so the fallback itself never swaps; engines without override descriptors ignore them and get the previous behavior; unicode-ranges mirror the real faces so glyph routing (∞ falls through the family) is unchanged.

### Hierarchy
- **Counter** (Cinzel 900, clamp(3.5rem, 5.5vw + 2rem, 9rem), line-height 0.95, lining tabular numerals): The monumental counter band numerals — deliberately beyond a generic display cap. Never below weight 900.
- **Wordmark** (Cinzel 700, clamp(2.25rem, 3.5vw + 1rem, 4.5rem), line-height 1.15, 0.14em tracking, uppercase): The page's single h1, stamped between double hairlines with a lit-chrome text-shadow (`0 1px 0 rgba(0,0,0,0.55), 0 0 28px rgba(201,211,221,0.14)`).
- **Title** (Cinzel 700, container-relative: plates clamp(1.3125rem, 9cqi − 0.28125rem, 1.875rem), dedications clamp(1.125rem, 5.6cqi + 0.225rem, 1.625rem), milestones clamp(1.0625rem, 11cqi − 0.28125rem, 1.25rem), 0.08em tracking, uppercase, balanced wrap): Nameplate, dedication, and milestone names — sized against their own container, not the viewport.
- **Body** (EB Garamond 500, clamp(1.0625rem, 1rem + 0.3vw, 1.1875rem), line-height 1.65): Descriptions, roles, milestone lines, sign-off. Measure token `--measure: 68ch` (applied to degraded-state copy).
- **Readout** (Martian Mono 400, 0.8125rem, 0.14em tracking, uppercase): Counter labels, the hero category line, LIVE/SOURCE links, footer links, skip link. The noscript and empty-state messages share the readout's face, size, and 0.06em tracking but set sentence-case — see the Inscriptional Caps Rule's sole exception.
- **Tag** (Martian Mono 400, 0.75rem, 0.06em tracking, uppercase): Plate tags and mode-chip words.
- **Micro** (Martian Mono 400, 0.6875rem, 0.14em tracking, uppercase): Frieze ordinal/date line only.

### Named Rules
**The Inscriptional Caps Rule.** All display and mono text is uppercase with positive tracking (0.06–0.14em). Never negative tracking on Cinzel — it is a carved-capital face. Sole exception (the critique's all-caps-body finding): the degraded-state messages — the noscript notice and the empty states — set sentence-case; a long failure passage in caps reads as shouting, and the rule stays with every short label.

**The Weight-On-Black Rule.** Thin strokes die on near-black: Cinzel never below 700 (900 for counter numerals), EB Garamond never 400 on this palette (500 is the floor), mono emphasis takes 700. There is no light weight anywhere in the system.

**The Tabular Counters Rule.** Counter numerals carry `lining-nums tabular-nums` so the count-up changes digits without a single pixel of jitter.

## Layout

A single scrolling monument in six courses, read top to bottom: wordmark lintel (with its living field) → counter band → image-led nameplate wall → dedication band → lineage frieze → footer plate. Two spatial registers alternate. **Full-bleed chamfered bands** (counter band, roster, footer) run wall-to-wall and are framed by the chamfer/hairline technique (see Shapes). **Gutter-fenced sections** (wall, frieze) sit inside `--gutter: clamp(1.25rem, 4vw, 3rem)` side margins. Sections breathe apart on `--section-gap: clamp(4rem, 9vw + 1rem, 9rem)`; interior rhythm uses the 4px-base spacing scale (frontmatter), which the built page exercises from 0.25rem to 3rem.

The **hero field's canvas spans the hero region only** — document top to the counter band's foot, never the page — positioned absolute and pointer-inert behind the lintel. Stacking is part of the layout contract: the canvas sits above the chamfer-clipped counter band (clip-path makes the band an atomic stacking unit that paints below any positive z-index, so the sweep is allowed to cross it visibly), while the wordmark and category lettering paint above the canvas (`z-index: 3` vs the canvas's 2) and the skip link above everything (4).

The **wall** packs continuously below 1280px with no breakpoints: `grid-template-columns: repeat(auto-fill, minmax(min(100%, 320px), 1fr))`, repacking 4 → 2 → 1 columns as the viewport narrows, edge-to-edge, zero masonry gaps. At ≥1280px (V3-B) it commits to **three monumental columns** — `repeat(3, minmax(0, 1fr))`: plates ~384px at 1280, ~438px at 1440, ~598px at 1920, the screenshots the dominant surface at roughly 2× their 4-column area (441×275 vs 325×203 at 1440; deterministic rather than another auto-fill floor, which would drop to 2 columns through the 1280-1350 laptop band and drift back to 4 at ultrawide). 13 being prime, the final row leaves bare backing wall visible — an honor roll with room to grow. Plate titles use container queries (`container: plate / inline-size`) so type scales with the track, not with the viewport (longest title verified fitting at every width; clamp ceiling unchanged).

Bands **repack by breakpoint with seams that follow the geometry**: the counter band runs 4-across, stacks 2×2 at 900px (hairline seams redrawn per cell), and compacts padding/labels at 480px — where V2R2 widened the pass into a phone-fold compaction of the whole hero column (lintel spacing, wordmark at 1.875rem so the stamp holds two lines even at 320, numerals at 3rem — scaled, never amputated), with one further spacing step at 360px so the first screen clears the wall's rise threshold on 320-class phones; the dedication band runs 3×2, 2×3 at 900px, one course at 560px — every seam is a scoped hairline reset so rules always match the live grid. The **frieze** uses one strategy per range: at ≥1180px a horizontal frieze (six equal courses hung from a full-width hairline rail, nodes seated on the rail); below 1180px the same content stands up into a vertical stele (per-course rail segments down the left edge). No scroll traps, no horizontal page overflow at any width.

The first viewport is contracted, not accidental: the crimson field breathing behind the chrome wordmark, the category line, the monumental counter band counting up beneath them, and the first image-led plates glinting at the fold line — at every width: on phones the compacted hero (480px tier, one step more at 360px) holds the same contract proportionally, so the first lit screen glints in the initial viewport at 390 and 320 too, while the field re-measures its restraint zones from the live geometry.

## Elevation & Depth

Depth is engraved, not stacked. There are **no drop shadows on any component** — no floating cards exist. Depth comes from three instruments working together: (1) **tonal layering**, well sunk below plate, both raised off the ground — including the screens' recessed glass; (2) **inset bevels**, a 1px dark lip on the top edge and a faint chrome catch on the bottom (`--plate-edge` grammar: `inset 0 1px 0 rgba(0,0,0,0.5–0.55)` + `inset 0 -1px 0 rgba(201,211,221,0.06–0.08)`), with lettering seated by `--engrave-text: 0 1px 0 rgba(0,0,0,0.45)`; and (3) **emitted light**, which since V2 has two registers — crimson glows that mark live/active states (never depth cues), and the hero field's ambient crimson breath (the machine is on). Light is never a shadow stand-in; nothing hangs in air.

### Shadow Vocabulary
- **Plate bevel (rest)** (`inset 0 1px 0 rgba(201,211,221,0.08), inset 0 -1px 0 rgba(0,0,0,0.5), inset 0 0 0 1px var(--rule-soft), inset 0 -20px 30px -22px rgba(229,56,59,0.55)`): Raised nameplate with hairline rule and the static base ember.
- **Plate hover/focus** (`... inset 0 0 0 1px rgba(229,56,59,0.5), inset 0 -28px 44px -26px rgba(229,56,59,0.62), var(--glow-crimson-strong)`): The rule turns crimson, the ember deepens, the outer glow lifts — plus `translateY(-2px) scale(1.02)` (V3-B: the scale lands at the top of the sanctioned 1.01-1.02 band — 1.012 read timid at the new plate size, harness-judged) and `z-index: 1` so the glow reads over neighbors.
- **Unlit screen glass** (`inset 0 1px 0 rgba(0,0,0,0.55), inset 0 -1px 0 rgba(201,211,221,0.07), inset 0 0 22px rgba(0,0,0,0.35), 0 0 16px rgba(201,211,221,0.05)`): The screen's designed "off" state — recessed well glass with a shaded top lip (the engraved dark-lip convention read as glass), an inset shade, and a faint chrome emission so the window reads ON before the lazy bytes land. Never a blank hole. The same stack (minus the outer emission) backs the `:has()` fallback emblem.
- **Ignited screen** (frame `border-color: rgba(229,56,59,0.6)`; `inset 0 1px 0 rgba(0,0,0,0.55), inset 0 -1px 0 rgba(201,211,221,0.07), inset 0 0 22px rgba(229,56,59,0.1), 0 0 22px rgba(229,56,59,0.3)`): Hover/focus-within intent — the screen answers the same presence that raises the plate's ember.
- **Glow tokens** (`--glow-crimson-soft: 0 0 18px rgba(229,56,59,0.22)`; `--glow-crimson-strong: 0 0 30px rgba(229,56,59,0.38), 0 0 6px rgba(229,56,59,0.55)`): the built system fires only the strong token, on plate hover/focus.
- **Band inner bevel** (`inset 0 1px 0 rgba(201,211,221,0.06), inset 0 -1px 0 rgba(0,0,0,0.5)`): the counter/roster/footer plates' engraved interior.
- **Wordmark stamp** (`0 1px 0 rgba(0,0,0,0.55), 0 0 28px rgba(201,211,221,0.14)`): chrome reads lit, not flat.
- **Diamond glints** (`0 0 6px rgba(229,56,59,0.65)` lit diamonds; raised once at ignition to `0 0 10px rgba(229,56,59,0.8)`; footer-link hover bloom `0 0 10px rgba(229,56,59,0.4)`).
- **Frieze pulse flare** (`0 0 22px rgba(229,56,59,1), 0 0 6px rgba(229,56,59,0.9)` with the 9px diamond scaling to 1.6 — raised from 1.45 at V3-B — settling to the lit state ~460ms later): the traveling crimson pulse along the now-energized spine.
- **Numeral cores** (V3-B; `0 1px 0 rgba(0,0,0,0.45), 0 0 16px rgba(229,56,59,0.55), 0 0 48px rgba(229,56,59,0.32)`): the counter band's chrome numerals burn crimson from behind — the glyphs stay full chrome (11.85:1 rendered on the tinted band), the emission adds separation, never eats it.
- **Arrival flash** (V3-B; `.plate::after` ignition glow — `inset 0 0 0 1px rgba(229,56,59,0.5)` + deepened ember + `--glow-crimson-strong` at 0.85 opacity, fading over 0.55s): each plate lands its 24px rise with one crimson flash, opacity-only.
- **Wordmark glitch layers** (V3-B; ::before crimson-shifted `rgba(229,56,59,0.92)` + `0 0 14px rgba(229,56,59,0.5)`, ::after chrome-shifted `rgba(201,211,221,0.88)` + matching chrome glow): the aberration pair, transparent at rest, jump-cut by clip-path slices during a ~320ms burst; the base stamp flares `0 0 30px rgba(229,56,59,0.38)` for the burst's life.
- **Field emission** (canvas; ember sprites `rgba(229,56,59,…)` radial stops, chrome motes `rgba(201,211,221,…)`, sweep band peaking `rgba(229,56,59,0.215)` with a `rgba(229,56,59,0.46)` 1px hairline at 0.60 echo gain, composited `lighter`): luminance on near-black — light, not shadow, and background texture, never content.

### The scanline overlay
A fixed, non-interactive machine texture on `body::after`: `position: fixed; inset: 0; z-index: 9999; pointer-events: none` painting a 1px line of `rgba(0,0,0,0.28)` (raised from 0.22 at V3-B so the texture reads at a glance) every 3px (`repeating-linear-gradient(to bottom, ...)`). Visible as faint texture on gunmetal plates, near-invisible on the ground, never obscuring content. It crosses the plate screens too, so the imagery sits under the same machine texture. It is **static by design** — it animates nothing, so `prefers-reduced-motion` leaves it untouched. (Contrast duty-cycle math recomputed at the new ink: darker shaded rows only RAISE light-text contrast — worst pair 5.81:1 duty-averaged, 6.28:1 even on the darkest single shaded row.)

### Named Rules
**The Engraved-Not-Elevated Rule.** Depth is cut into metal (inset bevels, seated type, tonal recess); light is emitted by live states and by the field's breath (crimson/chrome glow). A drop shadow under a component would break the world — nothing hangs in air.

**The Lit-Screen Rule.** A screenshot's lit-ness is carried by the frame — hairline chrome rule, recessed well glass, faint emission, crimson ignition on intent — never by faked image brightness. All thirteen vendored shots are dark-toned real apps and stay as shot: no filters, no brightness fills, no text over imagery.

## Shapes

Zero border-radius anywhere; the system's corner language is the **cut-plaque chamfer**: a 12px 45° cut at each corner via `clip-path: polygon(...)` (`--corner-chamfer`). Because clip-path clips borders, the three monumental bands (counter band, roster, footer) get their hairline frame from a two-element technique: the outer element is painted in the rule color and clipped, and the inner plate sits 1px inside with its own clip — the visible result is a 1px chrome hairline that follows the cut corners. Nameplates themselves are square-cornered, relying on their inset 1px rule.

The V2 signature shape is the **lit-screen window**: a panel let full-bleed into the plate's top and side edges (negative margins cancel the plate's padding on three sides, so the frame's hairline becomes the plate's visible edge up there), dominating the plate's upper mass while title / one-liner / tags / links settle below with more space above the title than below it. The universal shot ratio **1312:820 is the wall's screen grammar** — every current shot is exactly that, and the image-less fallback emblem block claims the same aspect so a link between image and emblem plates never shifts the anatomy. That fallback is a `:has()`-gated pseudo-element: the well block plus one centered hollow crimson diamond drawn as an inline-SVG data-URI background (drawn geometry, zero requests); engines without `:has()` simply keep the v1 typographic anatomy.

The recurring marker geometry is the **diamond**: a square rotated 45°, drawn as a pseudo-element — 7px for link and chip markers (filled crimson with glint for LIVE/lit — the LIVE diamond breathing on its 2.7s idle pulse since V3-B; hollow dim chrome for SOURCE/attribution; hollow crimson for marked), 9px for frieze nodes (hollow chrome-dim, ground-filled to mask the rail behind it, igniting to filled crimson, flaring to 1.6 scale in the pulse). Hairlines are 1px everywhere. The wordmark lintel is a double rule: a 7px stack of 1px energized crimson rule + 5px gap + 1px soft rule, above and below the stamp, the strong lines carrying a 240px traveling shimmer segment every ~5.6s. Plaque furniture includes a short 3rem centered rule above the footer sign-off.

## Components

### Hero lintel + the living field + the glitch (header)
The page banner: the Cinzel 700 chrome wordmark stamped between energized double hairlines, and beneath it the one plain-language category line in the readout voice (mono caps, dim chrome; its measure capped at 55ch in the mono's own advance so the caption always sets as a balanced two-line group centered on the lintel's axis — a caption, never one long passage line) — both static branding the render pipeline never touches. The lintel ground carries the V3-B **crimson atmosphere**: a deep radial wash (`rgba(229,56,59,0.13)` at the hero's foot, fading to nothing at 72%) rising behind the wordmark and the field — static color, so the loudness survives reduced-motion and no-JS intact. Behind the lettering, declared in markup, the **living field**: an `aria-hidden`, pointer-inert `<canvas>` spanning document top to the counter band's foot. It paints exactly two registered layers — (1) **pooled crimson embers** rising slowly with a sinusoidal sway and per-mote twinkle (a fixed 170-slot pool, zero per-frame allocations; ~26% faint chrome motes; ~18% bright slow anchors among dim motes for the visibility spread) with a slight depth-scaled pointer parallax, and (2) **one scan sweep**: a 190px luminance band (V3-B stops: peak wash 0.215, shoulders 0.08) with a 1px crimson hairline at 0.46 traversing top→bottom every ~10.5s in the V2-1 heartbeat cycle — 3.2s pass, 1.8s dark, one echo pass over the same path at 0.60× gain (raised from 0.42 at V3-B; lazier 3.4s traverse, band restraint inherited, never the power-on boost), 2.1s dark, so the darkest rest is ~2.1s and the steady state never goes still. Restraint is enforced, not hoped: the lettering paints above the canvas; measured full-width y-bands carry per-zone alpha/size multipliers (wordmark/category band 0.4×/0.7×; counter-band region 0.6×/0.85× with bright anchors at 0.35×; the sweep's gain over the band at 0.7×) — at the amplified settings the worst measured residences on composited pixels are numerals 11.72:1 / labels 9.07:1 (echo) and 11.74 / 7.85 (full pass) against the ~11.85:1 rest baseline. Performance is a budget: one delta-timed rAF loop (clamped at 50ms), DPR capped at 2, density one mote per 2800 css px² clamped 64–170 (V3-B, louder; frame cost re-measured avg 0.26ms / p95 0.40ms), and the loop stops on `document.hidden` and when the hero scrolls out of view. Without scripting the canvas never initializes — an empty canvas renders nothing.

**The wordmark glitch (V3-B):** two aberration copies of the stamp — ::before crimson-shifted (`rgba(229,56,59,0.92)` + crimson glow), ::after chrome-shifted (`rgba(201,211,221,0.88)` + chrome glow) — drawn from `attr(data-text)` with EMPTY ALT (`content: attr(data-text) / ""`), so the accessible name stays the one real text node and engines without the alt syntax drop the declaration entirely (no copies, no glitch — graceful static). At rest both are transparent; a burst (~320ms, `steps(1)` jump-cuts between five clip-path slice bands per layer at displaced offsets, layer B opening with one full-frame aberration echo) fires every 7-10s — js/motion.js owns the cadence, randomizing both the interval and each layer's entry phase (negative animation-delay) so no two pulses cut alike — and the armed wordmark glitches on hover too. The base text never moves (transform/clip-path/opacity only; layout provably stable mid-burst); the stamp flares crimson for the burst's life. The wordmark arms only after the count-up's power-on settles (~2.3s in) — one moment at a time. Reduced-motion: never arms, and the CSS kill block renders the copies permanently transparent.

### Counter band (signature component)
One full-bleed chamfered plate on the V3-B **dark-crimson variant**: a `rgba(229,56,59,0.12)` wash over the gunmetal field (≈ `rgb(55,38,45)`) inside a `rgba(229,56,59,0.42)` energized frame — four equal `1fr` cells divided by hairline seams. Each cell: a monumental Cinzel 900 numeral (up to 9rem) burning a crimson core behind full chrome (16px + 48px layered emission) over a Martian Mono readout label in near-chrome caps (0.92-alpha chrome, tinted warm by the crimson field — dim chrome measured under the body floor on the tinted band). On first view the numeric counters count 0 → N once over 1.1s with cubic ease-out, digits changing via `textContent` only (tabular numerals, fixed tracks — zero reflow); "∞" is not numeric and renders verbatim, never counting. The same moment fires the field's power-on: `motion.js` calls `window.ULTRON_FIELD.ignite()`, restarting the sweep from the top at 1.45× gain — scan and counters light as one ignition, after which the field only breathes.

### Nameplates (the image-led wall)
The proof surface — one per shipped build, and since V2 every plate leads with the real face of that build, at V3-B's three monumental desktop columns (~2× the screen area). Anatomy top to bottom: the **lit screen** first (`div.plate-screen` > `img.plate-shot`), full-bleed into the plate's face; then the Cinzel 700 uppercase title (container-sized, balanced), the Garamond one-liner in dim chrome, mono uppercase tags in well-filled hairline boxes, and a links row pinned to the plate foot (`margin-top: auto`) under a hairline base rule so every plate in a row shares one datum line. The shots are the owner's real experiment screenshots, vendored PNG 1312×820, lazy-loaded with async decoding below the fold — and promoted to `loading="eager"` + `fetchpriority="high"` when their top edge is already in the initial viewport, so the first row never lazy-pops. Intrinsic width/height attributes reserve the exact box before the bytes arrive: image load costs zero layout (CLS 0, measured). Hover/focus-within raises the whole plate: crimson rule, deepened ember, strong outer glow, 2px lift + 1.02 scale (transform only) — and the screen's own frame ignites (crimson tint + emission) on the same intent. Each plate lands its rise with one crimson arrival flash. LIVE carries the lit crimson diamond, breathing on its 2.7s idle pulse (10.43:1 chrome text); SOURCE the hollow dim-chrome marker (dim text by design — 5.32:1 — waking to chrome on hover). A build without a usable image renders the unlit-screen emblem (`:has()`-gated; see Shapes); link-less plates simply end at their tags — the links row is omitted, not left hollow.

### Mode chips (graded)
Inline-flex mono caps chips on a well fill with a hairline frame, 7px diamond drawn before the word — in three grades per the Graded Accent Rule: lit (autonomous/deadline: filled glowing crimson diamond, `rgba(229,56,59,0.6)` frame, chrome bold text), marked (redesign/finishing: hollow crimson diamond, `rgba(229,56,59,0.35)` frame, chrome text), dim (gated/delegated: no diamond, plain well chip, dim chrome). When the roster band first enters view it rises once and ignites in the same moment: the two lit diamonds raise their glow to `0 0 10px rgba(229,56,59,0.8)`, 60ms apart.

### Lineage frieze
The timeline cut into open ground — no plate around it; the V3-B **energized crimson spine** (a `rgba(229,56,59,0.4)` hairline with faint emission, matching the lintel's energy lines) is the band. Each course: micro mono ordinal/date above the rail, hollow 9px node seated on the rail, Cinzel title and Garamond line hung below. On first view the nodes sweep: each ignites in lineage order (hollow chrome-dim → filled crimson, 0.35s ease-out, 60ms stagger) and simultaneously flares — the diamond scales to 1.6 and its glow blooms (`0 0 22px rgba(229,56,59,1)` + tight 6px core) — settling to the lit state ~460ms later, so successive flares read as one crimson pulse traveling the spine. Below 1180px the same anatomy stands up as a vertical stele with per-course energized rail segments.

### Footer plate
Full-bleed chamfered plate bookending the counter band. Two attribution links in the wall's link anatomy (mono caps, hollow dim-chrome diamonds — these links leave the monument, so not the active accent — 44px targets); hover draws a crimson underline and a soft glow bloom. Sign-off in dim chrome under a short centered rule. The page ends anchored on engraved metal, after one quiet 16px rise on first view.

### The motion grammar (cross-component)
One orchestrated power-on, not scattered effects. Order of ignition: field sweep + count-up (one moment, first view of the counter band) → plates rising at the fold → staggered plate ignition down the wall as scrolling continues → roster rise + chip ignition (one moment) → frieze sweep → footer rise → only then, ~2.3s after the count-up settles, the wordmark arms and begins its glitch pulse. **Plate ignition:** each plate rises once — `translate: 0 24px → none` (V3-B: deepened from 12px; the wave now visibly carries each plate in) + `opacity: 0 → 1` over 0.6s on the single exponential-class ease-out `--ease-ignite: cubic-bezier(0.22, 1, 0.36, 1)` — staggered ~55ms per plate in DOM/grid order by a single drain queue, so a slow scroll cascades row by row and a fast scroll plays the whole wave at once; each landing strikes one crimson **arrival flash** (`.plate::after`, opacity-only, peaking as the rise settles). Each plate is unobserved the moment it fires. **Section reveals:** the roster band and footer plate take one quiet rise each (16px over 0.8s). **Frieze sweep:** nodes ignite in lineage order at 60ms steps, each flaring to 1.6× with a 22px bloom, settling ~460ms later. **Idle loops (two, sanctioned):** the field's breathing (canvas rAF, paused hidden/off-screen) and every LIVE diamond's slow crimson pulse (2.7s, scale 1→1.18 + glow 6→13px, CSS-only behind the wall's arming class) — the wall never fully rests. **Wordmark glitch:** after the power-on, a ~320ms burst every 7-10s (randomized interval AND randomized entry phase via per-layer negative animation-delay — every pulse cuts different slices) plus glitch-on-hover on the armed wordmark; transform/clip-path/opacity only, layout never shifts. **Channel discipline:** the rises use the individual `translate` property so hover keeps `transform` (the two compose; no timing conflict); `translate`/`transform`, opacity, and paint properties (box/border/text-decoration/text-shadow colors, background-position for the lintel shimmer, clip-path for the glitch) are the only animated channels — zero layout properties anywhere. **Arming:** pre-rise offsets exist ONLY under two JS-added classes (`.wall-armed`, `body.motion-armed`), applied in the same DOMContentLoaded task as the render, immediately before the observers start — no-JS, no-IntersectionObserver, reduced-motion, and slow devices never see hidden content or a flash; screen readers are never gated (opacity offsets only). **`prefers-reduced-motion`:** the system never arms under the preference (and disarms on a live switch, settling everything instantly); counters stand final, ignitions land as static states, the field is painted as one still, the glitch never arms, the pulses and shimmer stop, and CSS transitions/animations are killed as the backstop — the page stays LOUD by color/scale/texture (wash, energized rules, tinted band, numeral cores, 0.28 scanlines, 3-column wall), never by motion alone.

### Failure states (empty mounts, noscript)
The machine speaks when it cannot run, in the same language — and since V3-B, in the same crimson light: `.empty-state` is a quiet plate — hairline rule, raised bevel, sentence-case readout type in dim chrome (caps are for short labels; these long passages read as shouting in caps), hollow crimson marker above the line (the "marked" grade — a bounded state, reported); `.noscript-notice` is a full-width band on the counter band's own dark-crimson plate variant under a crimson-alpha border, in full chrome, also sentence-case (it is the whole page when it shows). Inside the counter band the empty state re-clips to the band's chamfer, spans full width, and wears the band's tint + near-chrome label voice — the energized frame must never show a lit gap beside a narrow plate.

### Keyboard presence
One crimson focus ring everywhere (`outline: 2px solid var(--crimson); outline-offset: 3px`). The skip link is the first focusable element, hidden until focused, then a small ground plate of chrome mono caps that jumps to the wall — and it paints above the hero field (z-index 4). `#wall` takes programmatic focus (`tabindex="-1"`) with its section ring suppressed.

## Do's and Don'ts

### Do:
- **Do** keep crimson (`#e5383b`) the only chromatic color, and spend it only where the machine acts, breathes, or burns: LIVE diamonds, lit chips, focus ring, hover rules, selection, screen ignition, sweep and pulse — and, since V3-B, the atmosphere (hero wash, band tint, energized lintel/frieze rules, numeral cores, glitch layer, arrival flash), always as alphas of the same pin.
- **Do** build containers as engraved metal: plate field + inset bevel stack + `--engrave-text` seated lettering + 1px rule-color hairlines as borders and seams.
- **Do** lead every plate with the real screenshot in lit-screen framing — full-bleed window, chrome hairline frame, unlit well glass — reserving the box with intrinsic width/height attributes (zero CLS) and promoting above-fold screens to eager/high priority.
- **Do** frame full-bleed bands with the 12px chamfer + outer rule-color fill / inner 1px-inset plate technique so the hairline follows the cut corners.
- **Do** size type that packs into changing grids against its container (cqi clamps with a px fallback declaration first, e.g. `clamp(1.3125rem, 9cqi - 0.28125rem, 1.875rem)`).
- **Do** animate only transform-family (`translate`/`transform`), opacity, and paint properties (incl. clip-path and background-position); change counters via `textContent` on fixed tracks; run each entrance exactly once, on one orchestrated grammar (`--ease-ignite`).
- **Do** arm entrance offsets exclusively via JS-added classes applied with the render (`.wall-armed`, `body.motion-armed`) — never hide content in CSS awaiting a class.
- **Do** honor `prefers-reduced-motion` by rendering final values, static glow states, and one painted field still — with CSS transitions/animations killed as the backstop, a live preference switch settling instantly, and the loudness carried by color/scale/texture that renders statically.
- **Do** draw every marker as a rotated-45° square (7px links/chips, 9px frieze nodes) and keep interactive link rows at 44px minimum height.
- **Do** draw glitch copies as empty-alt pseudo-content (`content: attr(data-text) / ""`) so decoration never changes an accessible name, and never let a burst shift layout (transform/clip-path/opacity only).

### Don't:
- **Don't** use soft cards, drop-shadow card chrome, or border-radius — plates are separated by hairline rules over a shared backing field, never floating.
- **Don't** introduce a second accent, a gradient fill, or any color outside the pinned palette's alpha family (canvas included — embers and sweep are crimson/chrome alphas only; the glitch pair, wash, tint, and every energized rule are alphas of the same two pins).
- **Don't** fake a screenshot's lit-ness (filters, brightness fills) or set text on/over the imagery — the frame carries the light (The Lit-Screen Rule).
- **Don't** animate a layout property (width, height, margin, top/left, padding, font-size), parallax text, or hide content behind an entrance reveal that is not JS-armed.
- **Don't** set Cinzel below 700 (counters are 900), EB Garamond at 400, or negative tracking on the display face.
- **Don't** let a rule-color background peek beside a plate (the "lit gap" failure) — joints stay 0.25rem on the well field, and band states span the full band.
- **Don't** let the field, the atmosphere, or the glitch upstage the monument — the wordmark and category paint above the canvas, density zones dim motes around the lettering, the sweep's wash must never breach the contrast floors, and the glitch never fires during the power-on or under reduced-motion.
- **Don't** fabricate data the monument displays — empty or invalid mounts degrade to the styled empty-state plate, never to blank space or invented content.

---

*Simulated decisions (auto mode) — qualitative calls document.md's flow would put to the user, answered here from PRODUCT.md and the surface brief:*
1. *Creative North Star name "The Crimson Monument" — simulated (auto mode), source: PRODUCT.md Brand Commitments (classic Ultron: near-black, gunmetal, glowing crimson, scanline) + `.impeccable/surfaces/index-html.md` Honor-Roll Wall contract.*
2. *Overview voice and confirmed anti-references (no soft cards / drop-shadow chrome / marketing bands / gradient text) — simulated (auto mode), source: surface brief THESIS + OWN-WORLD blocks and PRODUCT.md voice ("confident, a little menacing, never self-deprecating").*
3. *Color character names (Vault Black, Gunmetal Plate, Recessed Well, Engraved Chrome, Dim Chrome, Ultron Crimson) — simulated (auto mode), source: PRODUCT.md aesthetic direction; hex values are extracted, not simulated.*
4. *Elevation philosophy ("engraved, not elevated" — tonal/inset depth, glow as emission) — simulated (auto mode), source: surface brief OWN-WORLD ("no soft cards, no drop-shadow card chrome") + built inset-shadow vocabulary.*
5. *Component philosophy ("engraved hardware — everything is mounted, carved, or bolted on; nothing floats") — simulated (auto mode), source: surface brief OWN-WORLD + THESIS blocks.*
6. *North Star evolved to "The Crimson Monument, Ignited" — simulated (auto mode), source: V2 direction contract THESIS ("the monument ignites … the refusal now has a pulse", user-locked 2026-09-01).*
7. *Lit-screen framing doctrine (the frame carries the lit-ness, never faked image brightness) — simulated (auto mode), source: V2's measured finding that all 13 vendored shots are dark-toned + OWN-WORLD "framed as lit screens in the dark".*
8. *Field restraint language ("background texture, never content; the wordmark stays king") — simulated (auto mode), source: V2 contract FIRST VIEWPORT ("subtle, never obscuring") + the V3 harness's density-zoning measurements.*
9. *Motion-grammar naming (one "orchestrated power-on" — sweep + count-up + staggered plate rise as a continuous sequence; the field's breathing as the one sanctioned loop) — simulated (auto mode), source: V2 contract "orchestrated grammar" + js/motion.js's registered-moments header.*
10. *V3-B amplification scope (glitch on the wordmark, crimson atmosphere, dark-crimson counter band, 3-column wall, motion amplitude, 0.28 scanlines) — simulated (auto mode), source: plan.md V3-B row + the owner's standing asks ("louder") + PRODUCT.md's day-one approved aesthetic ("scanline/glitch texture"); everything implemented stays inside the locked world (one accent, alpha family, engraved language), and the declines are logged in the production log.*
