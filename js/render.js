"use strict";
/* ==========================================================================
   The Ultron Initiative — render pipeline (task A3)
   --------------------------------------------------------------------------
   Fills the five content mounts (#stats, #wall, #roster, #frieze, #footer)
   from data alone — no content hardcoded in markup. #hero is NOT touched
   here: the first viewport is B2's build.

   LOADING: index.html loads this file (defer) AFTER js/main.js. Defer
   preserves execution order, so by the time this runs, main.js's loader has
   validated the raw globals and stashed the clean view on
   window.ULTRON_DATA. This file renders ONLY from window.ULTRON_DATA —
   never the raw ULTRON_BUILDS / ULTRON_TIMELINE / ULTRON_STATS globals.
   Both files register a DOMContentLoaded listener; listeners fire in
   registration order, so validation always completes before rendering.

   DATA-DRIVEN MOUNTS (empty/invalid array -> .empty-state, never blank):
   - #stats   <- ULTRON_DATA.stats    (4 counter strings)
   - #wall    <- ULTRON_DATA.builds   (one article.plate per valid build)
   - #frieze  <- ULTRON_DATA.timeline (lineage order; date "" -> ordinal)

   CONSTANT-DRIVEN MOUNTS (documented A3 choice): #roster and #footer render
   from the ROSTER / FOOTER constants below. These are static structural
   content about the product family itself — they ship WITH the renderer,
   which the task defines as satisfying "renders from data alone" (no
   content hardcoded in markup). Deliberate consequence: blanking the data
   files empties stats/wall/frieze into styled empty states, but the roster
   and footer always stand — a data edit can never blank the monument's
   dedication band. Roster roles mirror the roster facts in
   docs/ultron/launch-content.md (the real SKILL.md wording — Professor X's
   audit source; keep the two in sync if either changes).

   HOOKS FOR LATER TASKS (structure now, behavior/styling later):
   - B5 count-up: numeric counter values carry data-count="<digits>"
     ("∞" is not numeric — no data-count, renders verbatim).
   - B4/B5 styling + motion: data-mode on dedications, data-ordinal /
     data-milestone on frieze items, data-build + id="plate-<id>" on plates.
   - C1/D1: every degraded mount renders <p class="empty-state" role="status">
     with a one-line message naming problem and recovery.
   - D1 heading system (D1's build): every data-driven section opens with a
     visually-hidden h2 (class "section-heading visually-hidden"; css section
     9 keeps it invisible) — see sectionHeading() below. The h2 text is
     structural copy in the monument's own words; it ships with the renderer
     under the same rule as ROSTER/FOOTER. Item titles (plates, dedications,
     milestones) are h3 under their section h2 — D1's heading-hierarchy call,
     resolving A3 deviation #5 ("h2 pending D1's pass").
   - Re-render/test hook: window.ULTRON_RENDER() re-runs the whole pipeline
     from the current window.ULTRON_DATA (idempotent; used by the disposable
     validation harness, harmless in production).

   Rendering is semantic and token-only: this file adds NO styles. All
   classes (plate-*, stat-*, dedication-*, milestone-*, footer-*) are stable
   hooks for B2-B5. All data-derived text is set via textContent — never
   innerHTML — so a hostile data file cannot inject markup.
   ========================================================================== */

(function () {
  /* --- Static structural content (see header: CONSTANT-DRIVEN MOUNTS) ---- */

  /* The six-coordinator dedication band. `mode` values are the launch mode
     indicators: gated / delegated / autonomous / deadline / redesign /
     finishing (launch-content.md roster facts). `role` lines mirror
     data/timeline.js (same source: launch-content.md). */
  var ROSTER = [
    {
      id: "ultron",
      name: "Ultron",
      mode: "GATED",
      role: "The original gated multi-phase coordinator — the user approves each phase and task."
    },
    {
      id: "ultron-swarm",
      name: "Ultron Swarm",
      mode: "DELEGATED",
      role: "The delegated line — subagents do the task work while the user still gates every phase."
    },
    {
      id: "ultron-supreme",
      name: "Ultron Supreme",
      mode: "AUTONOMOUS",
      role: "Fully autonomous — auto-approves its own work and halts only on the halt list."
    },
    {
      id: "ultron-overlord",
      name: "Ultron Overlord",
      mode: "DEADLINE",
      role: "Autonomy at deadline speed — a 120-minute idea-to-production target."
    },
    {
      id: "ultron-redesign",
      name: "Ultron Redesign",
      mode: "REDESIGN",
      role: "Replaces an existing product's visual world via locked prototyping rounds."
    },
    {
      id: "ultron-impeccable",
      name: "Ultron Impeccable",
      mode: "FINISHING",
      role: "The finishing pass — document refresh, critique, and a refinement checklist."
    }
  ];

  /* Footer plate: attribution + sign-off. Same constant rule as ROSTER. */
  var FOOTER = {
    links: [
      { href: "https://graydonwasil.com/", text: "graydonwasil.com" },
      { href: "https://github.com/arrangedgodly", text: "github.com/arrangedgodly" }
    ],
    line: "Built with the thing it advertises."
  };

  /* --- Small helpers ------------------------------------------------------ */

  /* createElement + class + text in one call. Text ALWAYS via textContent. */
  function el(tag, className, text) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined && text !== null) node.textContent = String(text);
    return node;
  }

  /* The loader's absolute-http(s) URL shape check, mirrored here so the
     renderer degrades per-plate even if handed an entry the loader let
     through with an unusable link (belt and braces; main.js's copy is
     private to its IIFE). */
  function isHttpUrl(value) {
    return typeof value === "string" && /^https?:\/\/\S+$/i.test(value);
  }

  /* V2 — the lit-screen window. Builds the plate's screen (a <div
     class="plate-screen"> wrapper holding the <img class="plate-shot">)
     from an entry's OPTIONAL image fields, or null when the entry has
     none (the loader strips wrong-type values; this guard also covers a
     renderer handed unvalidated data — ULTRON_RENDER re-runs, test
     copies, etc.). The wrapper is css/styles.css section 10's styling
     hook for the lit-screen framing (frame, unlit well, ignition); the
     img carries loading="lazy" + decoding="async" (below-fold screens
     never block) and the data-provided intrinsic width/height
     attributes so the browser reserves the box before the bytes arrive —
     no CLS, and no file reads at runtime. Only positive integers become
     attributes: a hand-edited bad dim loses its attr, never breaks the
     plate. Built as elements with .src — never innerHTML. */
  function plateShot(build) {
    if (typeof build.image !== "string" || build.image.trim() === "") return null;
    function dim(value) {
      return typeof value === "number" && isFinite(value) && value > 0 && Math.floor(value) === value;
    }
    var img = document.createElement("img");
    img.className = "plate-shot";
    img.src = build.image;
    img.alt = build.title + " — experiment screenshot";
    img.loading = "lazy";
    img.decoding = "async";
    if (dim(build.imageWidth)) img.setAttribute("width", String(build.imageWidth));
    if (dim(build.imageHeight)) img.setAttribute("height", String(build.imageHeight));
    var screen = el("div", "plate-screen");
    screen.appendChild(img);
    return screen;
  }

  /* V2 — above-fold promotion. Screens that sit in the INITIAL viewport
     must not lazy-defer into a visible pop: right after render (deferred
     script, before first paint settles) every shot whose top edge is
     already inside the viewport is promoted to loading="eager" +
     fetchpriority="high", so the first row decodes with the rest of the
     first paint. Everything below the fold keeps loading="lazy". Runs
     once, synchronously, at render time — no observers, no scroll
     handlers (V4 owns scroll behavior). The one forced layout is the
     whole cost. */
  function promoteAboveFoldShots() {
    var view = window.innerHeight || document.documentElement.clientHeight || 0;
    if (!view) return;
    var shots = document.querySelectorAll("img.plate-shot");
    for (var i = 0; i < shots.length; i++) {
      if (shots[i].getBoundingClientRect().top < view) {
        shots[i].setAttribute("loading", "eager");
        shots[i].setAttribute("fetchpriority", "high");
      }
    }
  }

  /* Degraded-mount element: one line, names problem + recovery. Styling is
     C1's job; the class + role are the contract. */
  function emptyState(message) {
    var p = el("p", "empty-state", message);
    p.setAttribute("role", "status");
    return p;
  }

  /* D1: one visually-hidden section heading per mount, prepended BEFORE the
     empty-state check so a degraded section still has its outline entry.
     Screen-reader/keyboard structure only — css/styles.css section 9
     (.visually-hidden) keeps it out of the visual world. The words are the
     monument's own names for its blocks (contract language), not invented
     marketing copy: "The counter band" / "The nameplate wall" / "The
     dedications" / "The lineage frieze". */
  function sectionHeading(text) {
    return el("h2", "section-heading visually-hidden", text);
  }

  function pad2(n) {
    return n < 10 ? "0" + n : String(n);
  }

  /* Frieze fallback label when a milestone has no real date (the data ships
     all dates as "" — no invented dates): "MILESTONE 01" style ordinal. */
  function ordinalLabel(index) {
    return "MILESTONE " + pad2(index + 1);
  }

  /* Counter strings are "VALUE LABEL" ("6 COORDINATORS", "∞ MANUAL WORK
     ELIMINATED"): the first whitespace-delimited token is the monumental
     value, the remainder the label. Only NUMERIC values get data-count
     (B5 count-up); "∞" gets the same value/label structure but no hook,
     so every counter in the band shares one anatomy. */
  var NUMERIC_RE = /^\d[\d,]*(?:\.\d+)?$/;

  function splitCounter(raw) {
    var gap = raw.search(/\s/);
    if (gap === -1) return { value: raw, label: null };
    return { value: raw.slice(0, gap), label: raw.slice(gap).replace(/^\s+/, "") };
  }

  function mount(id) {
    var node = document.getElementById(id);
    if (!node) {
      console.warn("[ultron render] mount #" + id + " not found — section skipped");
    }
    return node;
  }

  /* --- Section renderers --------------------------------------------------- */

  /* #stats — the monumental counter band. One <li> per counter string;
     numeric leading token becomes data-count (B5 count-up hook), the rest
     is the label. Non-numeric strings ("∞ …") render verbatim, no hook. */
  function renderStats(mountNode, stats) {
    mountNode.textContent = "";
    mountNode.appendChild(sectionHeading("The counter band"));
    if (!Array.isArray(stats) || stats.length === 0) {
      mountNode.appendChild(emptyState(
        /* R3 ($impeccable polish): sentence case, machine voice — problem
           (stats global empty/misshapen) + recovery (shape and file) kept. */
        "The counter band stands dark — ULTRON_STATS is empty or misshapen; four strings in data/builds.js would light it."
      ));
      return;
    }
    var band = el("ul", "stats-band");
    for (var i = 0; i < stats.length; i++) {
      var parts = splitCounter(String(stats[i]));
      var item = el("li", "stat");
      var value = el("span", "stat-value", parts.value);
      if (NUMERIC_RE.test(parts.value)) {
        value.setAttribute("data-count", parts.value.replace(/,/g, ""));
      }
      item.appendChild(value);
      if (parts.label) {
        item.appendChild(el("span", "stat-label", parts.label));
      }
      band.appendChild(item);
    }
    mountNode.appendChild(band);
  }

  /* One external link, named for screen readers per the A3 spec. */
  function externalLink(href, text, className, ariaLabel) {
    var a = el("a", className, text);
    a.href = href;
    a.rel = "noopener";
    a.setAttribute("aria-label", ariaLabel);
    return a;
  }

  /* #wall — one article.plate per valid build, in data order. A build with
     an unusable url/sourceUrl still renders its plate; only that link is
     omitted (the loader already rejects such entries — this is the
     per-plate safety net, so a plate can never lose its whole body). */
  function renderWall(mountNode, builds) {
    mountNode.textContent = "";
    mountNode.appendChild(sectionHeading("The nameplate wall"));
    if (!Array.isArray(builds) || builds.length === 0) {
      mountNode.appendChild(emptyState(
        /* R3 ($impeccable polish): sentence case, machine voice — file and
           schema hints preserved (owner recovery). */
        "The wall stands empty — data/builds.js holds no valid builds. Add an entry that satisfies the schema at the top of that file, and it rises."
      ));
      return;
    }
    var grid = el("div", "wall-grid");
    for (var i = 0; i < builds.length; i++) {
      var build = builds[i];
      var plate = el("article", "plate");
      plate.id = "plate-" + build.id;
      plate.setAttribute("data-build", build.id);

      /* V2: the lit screen, FIRST in the plate — the redesign reads
         image-first (css/styles.css section 10 frames it). plateShot()
         returns the wrapper; an entry without a usable image gets
         nothing here: the plate below is the styled fallback (css
         section 10's :has()-gated unlit-screen emblem; engines without
         :has() keep the v1 anatomy). */
      var shot = plateShot(build);
      if (shot !== null) {
        plate.appendChild(shot);
      }

      /* D1: the plate title is an h3 under the wall's h2 (heading system,
         see sectionHeading above; resolves A3 deviation #5). */
      plate.appendChild(el("h3", "plate-title", build.title));
      plate.appendChild(el("p", "plate-description", build.description));

      var tags = el("ul", "plate-tags");
      for (var t = 0; t < build.tags.length; t++) {
        tags.appendChild(el("li", "plate-tag", build.tags[t]));
      }
      plate.appendChild(tags);

      var links = el("p", "plate-links");
      if (isHttpUrl(build.url)) {
        links.appendChild(externalLink(
          build.url, "LIVE", "plate-link plate-link-live", "Open " + build.title + " live"
        ));
      }
      if (isHttpUrl(build.sourceUrl)) {
        links.appendChild(externalLink(
          build.sourceUrl, "SOURCE", "plate-link plate-link-source", build.title + " source on GitHub"
        ));
      }
      if (links.firstChild !== null) {
        plate.appendChild(links);
      }
      grid.appendChild(plate);
    }
    mountNode.appendChild(grid);
  }

  /* #roster — the six dedications (constant-driven; see header). */
  function renderRoster(mountNode) {
    mountNode.textContent = "";
    mountNode.appendChild(sectionHeading("The dedications"));
    var band = el("ul", "roster-band");
    for (var i = 0; i < ROSTER.length; i++) {
      var member = ROSTER[i];
      var item = el("li", "dedication");
      item.setAttribute("data-coordinator", member.id);
      item.appendChild(el("h3", "dedication-name", member.name)); /* D1: h3 */
      item.appendChild(el("p", "dedication-role", member.role));
      var mode = el("p", "dedication-mode", member.mode);
      mode.setAttribute("data-mode", member.mode.toLowerCase());
      item.appendChild(mode);
      band.appendChild(item);
    }
    mountNode.appendChild(band);
  }

  /* #frieze — the lineage walk, in data order. Real date -> <time>; empty
     date -> "MILESTONE 01" ordinal fallback (never a fabricated date). */
  function renderFrieze(mountNode, milestones) {
    mountNode.textContent = "";
    mountNode.appendChild(sectionHeading("The lineage frieze"));
    if (!Array.isArray(milestones) || milestones.length === 0) {
      mountNode.appendChild(emptyState(
        /* R3 ($impeccable polish): sentence case, machine voice — file hint
           preserved; "uncut" is the frieze's own word (carved stone). */
        "The lineage frieze is uncut — no milestones in data/timeline.js. Add one and the lineage walks."
      ));
      return;
    }
    var line = el("ol", "frieze-line");
    for (var i = 0; i < milestones.length; i++) {
      var milestone = milestones[i];
      var item = el("li", "milestone");
      item.setAttribute("data-milestone", milestone.id);

      var dateLabel;
      if (milestone.date !== "") {
        dateLabel = el("time", "milestone-date", milestone.date);
        dateLabel.setAttribute("datetime", milestone.date);
      } else {
        dateLabel = el("span", "milestone-date milestone-date-ordinal", ordinalLabel(i));
        dateLabel.setAttribute("data-ordinal", pad2(i + 1));
      }
      item.appendChild(dateLabel);

      item.appendChild(el("h3", "milestone-title", milestone.title)); /* D1: h3 */
      item.appendChild(el("p", "milestone-line", milestone.line));
      line.appendChild(item);
    }
    mountNode.appendChild(line);
  }

  /* #footer — attribution + sign-off (constant-driven; see header). */
  function renderFooter(mountNode) {
    mountNode.textContent = "";
    var plate = el("div", "footer-plate");

    var links = el("p", "footer-links");
    for (var i = 0; i < FOOTER.links.length; i++) {
      var link = el("a", "footer-link", FOOTER.links[i].text);
      link.href = FOOTER.links[i].href;
      link.rel = "noopener";
      links.appendChild(link);
    }
    plate.appendChild(links);

    plate.appendChild(el("p", "footer-line", FOOTER.line));
    mountNode.appendChild(plate);
  }

  /* --- Pipeline ------------------------------------------------------------ */

  /* Full render from the current window.ULTRON_DATA. Idempotent: every
     mount is cleared before filling, so re-running never duplicates. */
  function renderAll() {
    var data = window.ULTRON_DATA;
    if (!data) {
      /* Loader never ran (main.js missing/renamed): degrade to empty
         states instead of throwing, and say why in the console. */
      console.warn("[ultron render] window.ULTRON_DATA missing — loader did not run; rendering empty states.");
      data = { builds: [], timeline: [], stats: [] };
    }
    var statsMount = mount("stats");
    var wallMount = mount("wall");
    var rosterMount = mount("roster");
    var friezeMount = mount("frieze");
    var footerMount = mount("footer");

    if (statsMount) renderStats(statsMount, data.stats);
    if (wallMount) renderWall(wallMount, data.builds);
    if (rosterMount) renderRoster(rosterMount);
    if (friezeMount) renderFrieze(friezeMount, data.timeline);
    if (footerMount) renderFooter(footerMount);

    /* V2: the wall (when it rendered) promotes its above-fold screens to
       eager before the first paint settles — see promoteAboveFoldShots. */
    if (wallMount) promoteAboveFoldShots();
  }

  /* Test/re-render hook (see header). */
  window.ULTRON_RENDER = renderAll;

  if (document.readyState === "loading") {
    /* Registered after main.js's boot listener -> validation runs first. */
    document.addEventListener("DOMContentLoaded", renderAll);
  } else {
    /* Fallback for non-deferred execution after the DOM is already parsed
       (mirrors main.js; ULTRON_DATA is already set in that path). */
    renderAll();
  }
})();
