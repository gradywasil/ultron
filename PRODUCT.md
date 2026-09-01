# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

delegated: zero-build static site — plain HTML/CSS/vanilla JS, no framework, no npm, no build step. Chosen by Iron Man under explicit user delegation ("You pick"); rationale: content updates must never require a rebuild, and the site must deploy to any static host or open locally.

## Users

- **Primary:** public visitors — agent-tool peers, potential skill adopters, recruiters, the curious. Job: understand within seconds what the ultron skill family is, see real work it shipped, and feel the brand (robotic, innovative, faintly menacing).
- **Owner (Graydon Wasil):** maintains the site by editing two data files (`projects.json`-style entries + `timeline.json`); treats the site as the canonical showcase of ultron-built work.

## Product Purpose

A promotional showcase site for the ultron skill family — six agent-coordination skills (ultron, ultron-swarm, ultron-supreme, ultron-overlord, ultron-redesign, ultron-impeccable). It exists because the family had no public face: work built with the skills was invisible, and the family's growth from one gated pipeline into an autonomous product line was unrecorded. Success: a visitor grasps the family, sees 13 real shipped builds, and the owner can add a project or milestone with a data-file edit alone, in under 2 minutes.

## Positioning

The only site that is simultaneously the advertisement and the proof: it showcases apps built by the very production line it advertises — "built with the thing it advertises." A neighboring portfolio could not truthfully copy the six-coordinator lineage (gated → delegated → autonomous → deadline-speed → redesign → finishing) as the organizing story of the work.

## Operating Context

- One scrolling page: hero → stats strip → skill roster (6 cards) → projects grid (13 experiment tiles) → growth timeline → footer.
- Owner workflow: duplicate the last entry in the data file, fill fields (title, tagline, description, url, sourceUrl, tags, date, builtWith), save, refresh. Same for timeline milestones.
- Deployed anywhere static; must also survive `file://` viewing without breaking content rendering.
- Content sources of truth: `docs/ultron/launch-content.md` (13 scraped experiments, owner-corrected) and the real SKILL.md files (roster copy audit source).

## Capabilities and Constraints

- Zero build step; no framework, no package manager, no trackers, no analytics.
- All fonts and assets self-hosted; zero third-party runtime requests.
- Data-driven content: malformed/missing entries skip with a console warning; empty grids and missing images degrade to styled fallbacks — the page never renders broken.
- `prefers-reduced-motion` disables glitch/particle/parallax; page fully readable without motion.
- Animations transform/opacity-only (GPU); fast first paint despite the flash.
- Body text contrast ≥ 4.5:1 on the dark palette; keyboard-reachable interactive elements; semantic landmarks.
- Explicit non-goals: CMS, admin UI, backend, auth, comments, search, tag filtering, blog, i18n.
- Explicitly undecided product facts: deployment host/domain (owner's wizard-lane action, post-completion); per-project `builtWith` refinement (owner, anytime).

## Brand Commitments

- Name: **The Ultron Initiative** (user-chosen over alternatives).
- Voice: public promo, Ultron-flavored — confident, a little menacing, never self-deprecating.
- Aesthetic direction (user-approved at assembly): classic Ultron — near-black, gunmetal chrome, glowing crimson accents, scanline/glitch texture. Robotic and innovative, per the inspiration bot.
- Attribution: footer links to graydonwasil.com and GitHub (github.com/arrangedgodly).

## Evidence on Hand

- 13 real experiments with live URLs, GitHub sources, tags, and creation dates — recorded in `docs/ultron/launch-content.md`. Karaoke excluded (owner); Rhymepage, Collectible Cars DB, Arranged Godly excluded (flagships, not experiments — owner).
- Six real SKILL.md files on disk as the roster/lineage audit source; install dates proved meaningless, so the growth timeline launches lineage-seeded (ultron → swarm → supreme → overlord → redesign → impeccable) with owner-editable dates.
- Absences future work must not fabricate: no testimonials, no usage metrics, no star counts, no deployment claims.

## Product Principles

1. **The proof is the product.** Every claim on the page is backed by a real shipped build one click away; promo voice never outruns verifiable facts.
2. **Flash must never cost speed or access.** The futuristic mood is earned through craft (type, motion discipline, contrast), not heavy assets; motion is always optional.
3. **The machine maintains itself.** Owner updates are data edits, never code edits; the page renders whatever truthful data it is given, gracefully.
4. **Accurate or silent.** Roster and timeline copy stays traceable to the real skills; the family's actual lineage is dramatic enough without embellishment.

## Accessibility & Inclusion

- WCAG AA body contrast (≥ 4.5:1) on the dark neon palette; interactive elements keyboard-reachable with visible focus.
- `prefers-reduced-motion` honored: glitch/scanline/particle effects disabled, full content still readable.
- Semantic landmarks and heading hierarchy throughout; grids collapse cleanly on mobile with no horizontal overflow.
