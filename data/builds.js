/* ==========================================================================
   data/builds.js — The Ultron Initiative · build-wall + stats data (task A2)

   file://-safe data module: a plain script that assigns globals. No fetch,
   no imports, no build step. Loaded via <script src="data/builds.js" defer>
   BEFORE js/main.js, whose loader validates every entry.

   --------------------------------------------------------------------------
   SCHEMA — window.ULTRON_BUILDS (array of build objects; editing guide)

   Each entry needs every REQUIRED field below. The loader in js/main.js
   type-checks each one; a malformed entry is skipped with a console.warn and
   the rest of the page is unharmed — a bad edit degrades one plate, never
   the site.

   id          string, required, non-empty
               Stable slug (a-z, digits, hyphens). Used by the renderer as a
               key/anchor. Example: "thread-art".
   title       string, required, non-empty
               Nameplate heading. Example: "Thread Art".
   description string, required, non-empty
               One-liner shown under the title. Example: "Turn an image into
               a field of woven thread."
   tags        array, required; 1+ items, each a non-empty string
               Readout tags on the plate. Example: ["Generative", "Browser tool"].
   url         string, required, must match /^https?:\/\//i
               Live site, absolute. Example: "https://thread.graydonwasil.com/".
   sourceUrl   string, required, must match /^https?:\/\//i
               Source repository, absolute. Example: "https://github.com/arrangedgodly/thread-art".
   created     string, required, ISO date "YYYY-MM-DD"
               Ship date; drives the lineage frieze ordering. Example: "2026-08-28".
   builtWith   string, required, non-empty
               Pipeline credit. Launch value is the generic "Ultron pipeline"
               for every entry; owner refines per-project anytime via edit.

   --------------------------------------------------------------------------
   OPTIONAL IMAGE FIELDS (task V1) — the screenshot window

   image       string, optional; non-empty when present
               Repo-relative path to the experiment's vendored screenshot,
               "assets/shots/<id>.png". All 13 shots are the owner's own
               artwork fetched from graydonwasil.com on 2026-09-01 (bundle
               map in /tmp/gw-bundle.js), PNG 1312x820, byte-identical to
               the live site's files — provenance + payload decision logged
               under task V1 in docs/ultron/production-log.md. Karaoke is
               excluded by owner decision and ships nowhere.
               Omit the field (or null) for a plate without an image window
               — the renderer's documented fallback. A PRESENT but wrong-TYPE
               or empty value (number, array, "") is treated as absent with
               a console.warn naming file + id + field; the entry still
               renders — less destructive than skipping the plate (V1
               decision, logged).
   imageWidth  number, optional; positive integer — intrinsic pixel width of
               `image`. The renderer copies it to the <img> width attribute
               so the browser reserves layout space before the bytes arrive
               (no CLS) without reading files at runtime. Ship it whenever
               `image` is present; omit both otherwise.
   imageHeight number, optional; positive integer — intrinsic pixel height
               of `image` (renderer <img> height attribute). All current
               shots are 1312x820.

   --------------------------------------------------------------------------
   ALSO EXPORTED HERE — window.ULTRON_STATS (array of counter-band strings)

   Exactly four non-empty strings, in order: coordinators, production lines,
   builds shipped, manual work eliminated.

   ACCURACY NOTE — logged deviation (docs/ultron/production-log.md, task A2):
   the locked direction contract's illustrative counter "4 AUTONOMOUS MODES"
   is superseded here by "4 PRODUCTION LINES". Only ultron-supreme and
   ultron-overlord are autonomous; the family's four autonomous-capable lines
   are ultron, ultron-swarm, ultron-supreme, ultron-overlord. Counter band
   composition (four counters, monumental placement) is unchanged; the
   contract comment in index.html is left verbatim per A1 handoff.

   Source of truth: docs/ultron/launch-content.md (canonical 13-experiment
   seed; flagship projects excluded by owner decision — they appear nowhere
   in this data).
   ========================================================================== */

"use strict";

window.ULTRON_BUILDS = [
  {
    id: "thread-art",
    title: "Thread Art",
    description: "Turn an image into a field of woven thread.",
    tags: ["Generative", "Browser tool"],
    url: "https://thread.graydonwasil.com/",
    sourceUrl: "https://github.com/arrangedgodly/thread-art",
    created: "2026-08-28",
    builtWith: "Ultron pipeline",
    image: "assets/shots/thread-art.png",
    imageWidth: 1312,
    imageHeight: 820
  },
  {
    id: "biome-generator",
    title: "Biome Generator",
    description: "Explore procedural terrain shaped by elevation and moisture.",
    tags: ["Generative", "Interactive"],
    url: "https://biome.graydonwasil.com/",
    sourceUrl: "https://github.com/arrangedgodly/biome-generator",
    created: "2026-08-28",
    builtWith: "Ultron pipeline",
    image: "assets/shots/biome-generator.png",
    imageWidth: 1312,
    imageHeight: 820
  },
  {
    id: "loom",
    title: "LOOM",
    description: "Turn cellular automata into an audiovisual loom.",
    tags: ["Generative", "Audio"],
    url: "https://loom.arrangedgodly.com/",
    sourceUrl: "https://github.com/arrangedgodly/loom",
    created: "2026-08-28",
    builtWith: "Ultron pipeline",
    image: "assets/shots/loom.png",
    imageWidth: 1312,
    imageHeight: 820
  },
  {
    id: "traffic",
    title: "Traffic",
    description: "Tune a traffic signal and watch the intersection respond.",
    tags: ["Simulation", "Interactive"],
    url: "https://traffic.graydonwasil.com/",
    sourceUrl: "https://github.com/arrangedgodly/traffic",
    created: "2026-08-28",
    builtWith: "Ultron pipeline",
    image: "assets/shots/traffic.png",
    imageWidth: 1312,
    imageHeight: 820
  },
  {
    id: "terrarium",
    title: "Terrarium",
    description: "Set growing conditions and generate a digital terrarium.",
    tags: ["Simulation", "Procedural"],
    url: "https://terrarium.arrangedgodly.com/",
    sourceUrl: "https://github.com/arrangedgodly/terrarium",
    created: "2026-08-29",
    builtWith: "Ultron pipeline",
    image: "assets/shots/terrarium.png",
    imageWidth: 1312,
    imageHeight: 820
  },
  {
    id: "blind-test",
    title: "Blind Test",
    description: "Judge font pairings before you know their names.",
    tags: ["Typography", "Interactive"],
    url: "https://font.graydonwasil.com/",
    sourceUrl: "https://github.com/Arrangedgodly/typography-matcher",
    created: "2026-08-29",
    builtWith: "Ultron pipeline",
    image: "assets/shots/blind-test.png",
    imageWidth: 1312,
    imageHeight: 820
  },
  {
    id: "how-votes-flow",
    title: "How Votes Flow",
    description: "Watch ranked-choice voting play out, round by round.",
    tags: ["Civic Tech", "Simulation"],
    url: "https://vote.graydonwasil.com/",
    sourceUrl: "https://github.com/Arrangedgodly/how-votes-flow",
    created: "2026-08-29",
    builtWith: "Ultron pipeline",
    image: "assets/shots/how-votes-flow.png",
    imageWidth: 1312,
    imageHeight: 820
  },
  {
    id: "the-disappearing-draft",
    title: "The Disappearing Draft",
    description: "Keep writing before your idle draft disappears for good.",
    tags: ["Writing", "Timer"],
    url: "https://draft.graydonwasil.com/",
    sourceUrl: "https://github.com/Arrangedgodly/writers-block",
    created: "2026-08-29",
    builtWith: "Ultron pipeline",
    image: "assets/shots/the-disappearing-draft.png",
    imageWidth: 1312,
    imageHeight: 820
  },
  {
    id: "reading-pacer",
    title: "Reading Pacer",
    description: "Turn a reading goal into a sustainable daily pace.",
    tags: ["Reading", "Planner"],
    url: "https://pacer.graydonwasil.com/",
    sourceUrl: "https://github.com/Arrangedgodly/read-pacer",
    created: "2026-08-29",
    builtWith: "Ultron pipeline",
    image: "assets/shots/reading-pacer.png",
    imageWidth: 1312,
    imageHeight: 820
  },
  {
    id: "bc-codes",
    title: "bc-codes",
    description: "Give each verified fan one fair Bandcamp download code.",
    tags: ["Music", "Fan tools"],
    url: "https://codes.arrangedgodly.com/",
    sourceUrl: "https://github.com/Arrangedgodly/bc-codes",
    created: "2026-08-29",
    builtWith: "Ultron pipeline",
    image: "assets/shots/bc-codes.png",
    imageWidth: 1312,
    imageHeight: 820
  },
  {
    id: "the-register",
    title: "The Register",
    description: "Turn a message into Morse code for light, screen, and tone.",
    tags: ["Morse code", "Browser tool"],
    url: "https://morsecode.graydonwasil.com/",
    sourceUrl: "https://github.com/Arrangedgodly/morse-code",
    created: "2026-08-29",
    builtWith: "Ultron pipeline",
    image: "assets/shots/the-register.png",
    imageWidth: 1312,
    imageHeight: 820
  },
  {
    id: "interlocking-gear-animator",
    title: "The Interlocking Gear Animator",
    description: "Build a chain of interlocking gears and watch motion travel through it.",
    tags: ["Simulation", "Interactive"],
    url: "https://gears.graydonwasil.com/",
    sourceUrl: "https://github.com/Arrangedgodly/gears",
    created: "2026-08-30",
    builtWith: "Ultron pipeline",
    image: "assets/shots/interlocking-gear-animator.png",
    imageWidth: 1312,
    imageHeight: 820
  },
  {
    id: "digital-harmonograph",
    title: "The Digital Harmonograph",
    description: "Tune a set of pendulums and draw the harmonics they create.",
    tags: ["Generative", "Simulation"],
    url: "https://harmonograph.arrangedgodly.com/",
    sourceUrl: "https://github.com/Arrangedgodly/harmonograph",
    created: "2026-08-31",
    builtWith: "Ultron pipeline",
    image: "assets/shots/digital-harmonograph.png",
    imageWidth: 1312,
    imageHeight: 820
  }
];

window.ULTRON_STATS = [
  "6 COORDINATORS",
  "4 PRODUCTION LINES",
  "13 BUILDS SHIPPED",
  "∞ MANUAL WORK ELIMINATED"
];
