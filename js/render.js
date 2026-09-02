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

   V4 W1 — THE WALL PAGINATES INTO STAGES (this file's structural change):
   #wall is the FIRST wall page; this pipeline chunks the validated builds
   into PAGE stages at the live viewport tier (>=1280px: 3x2 pages of six;
   640-1279: 2x2) and inserts the later pages (#wall-2, #wall-3, ...) as
   .stage.stage-wall siblings after #wall inside <main>. A final page
   holding exactly one screen becomes the FEATURED FINALE (the newest
   build alone on a full stage). Old #wall anchors keep working; a tier
   change on resize re-paginates in place, keeps the visitor on the same
   page index, and dispatches document event "ultron:wallpages" (stages.js
   rebuilds the spine, motion.js re-arms ignition, field.js re-measures).
   V4 W2 — PHONE TIERS (<640px): the wall is ONE stage holding a
   horizontal scroll-snap pager (one plate per x-page, "SCREEN 04 / 13"
   readout, chevron buttons); page settles dispatch "ultron:wallpage"
   (motion.js ignites that page) and window.ULTRON_WALL exposes
   current()/goto() to the console (stages.js deep-links #wall-N).

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
     data/timeline.js (same source: launch-content.md). `doc` is the
     dedication's line to its archive record — skills.html's console
     selects the entry on load from the hash (V4R2 owner callout: the
     further documentation dive). */
  var ROSTER = [
    {
      id: "ultron",
      name: "Ultron",
      mode: "GATED",
      doc: "#skill-ultron",
      role: "The original gated multi-phase coordinator — the user approves each phase and task."
    },
    {
      id: "ultron-swarm",
      name: "Ultron Swarm",
      mode: "DELEGATED",
      doc: "#skill-ultron-swarm",
      role: "The delegated line — subagents do the task work while the user still gates every phase."
    },
    {
      id: "ultron-supreme",
      name: "Ultron Supreme",
      mode: "AUTONOMOUS",
      doc: "#skill-ultron-supreme",
      role: "Fully autonomous — auto-approves its own work and halts only on the halt list."
    },
    {
      id: "ultron-overlord",
      name: "Ultron Overlord",
      mode: "DEADLINE",
      doc: "#skill-ultron-overlord",
      role: "Autonomy at deadline speed — a 120-minute idea-to-production target."
    },
    {
      id: "ultron-redesign",
      name: "Ultron Redesign",
      mode: "REDESIGN",
      doc: "#skill-ultron-redesign",
      role: "Replaces an existing product's visual world via locked prototyping rounds."
    },
    {
      id: "ultron-impeccable",
      name: "Ultron Impeccable",
      mode: "FINISHING",
      doc: "#skill-ultron-impeccable",
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
     plate. Built as elements with .src — never innerHTML.
     V4 W1: the wrapper also carries the shot's aspect-ratio inline (from
     the same data dims, the universal 1312/820 grammar when absent) — in
     the staged wall (styles.css section 14a) the screen is the plate's
     flexible element, so its box ratio must come from data for the
     natural-height plate to reserve the exact box. */
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
    var w = dim(build.imageWidth) ? build.imageWidth : 1312;
    var h = dim(build.imageHeight) ? build.imageHeight : 820;
    img.setAttribute("width", String(w));
    img.setAttribute("height", String(h));
    var screen = el("div", "plate-screen");
    screen.style.aspectRatio = w + " / " + h;
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
  function buildPlate(build) {
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
    return plate;
  }

  /* --- V4 W1: wall PAGINATION into stage pages ------------------------------ */

  /* The pagination tier from the live viewport (styles.css section 14a owns
     the anatomy that makes any of these tracks fit one stage). The desktop
     tier is the committed shape: 3 columns x 2 rows = six screens per page,
     13 screens -> 6 / 6 / 1, the 1 a FEATURED FINALE. The tiers below it
     are computed by the same rule (any count, any viewport): 2x2 mid. V4 W2
     replaces W1's interim phone tier (1x2 vertical pages) with THE HORIZONTAL
     PAGER: below 640px the wall is ONE stage holding a scroll-snap x-pager
     of one plate per page (measured judgment: a plate stands ~330-374px at
     390 and ~310px at 320 — two per page only fits the very tallest phones
     with no breathing room and never the 320x568 floor; ONE per page keeps
     every phone height the same interface — consistency > density). */
  function wallTier() {
    var w = window.innerWidth || document.documentElement.clientWidth || 0;
    if (w >= 1280) return { cols: 3, rows: 2 };
    if (w >= 640) return { cols: 2, rows: 2 };
    return { pager: true, cols: 1, rows: 1 };
  }

  function chunkPages(items, per) {
    var pages = [];
    for (var i = 0; i < items.length; i += per) {
      pages.push(items.slice(i, i + per));
    }
    return pages;
  }

  function wallPageId(pageIndex) {
    return pageIndex === 0 ? "wall" : "wall-" + (pageIndex + 1);
  }

  /* "SCREENS 01–06 / 13" — the page's mono orientation band (styles.css
     14a). Screen numbers are 1-based against the validated total. */
  function wallReadout(first, last, total, page, pageCount, featured) {
    var range = first === last
      ? "SCREEN " + pad2(first) + " / " + total
      : "SCREENS " + pad2(first) + "–" + pad2(last) + " / " + total;
    var pageLine = "PAGE " + pad2(page) + " / " + pad2(pageCount) +
      (featured ? " · FEATURED" : "");
    var p = el("p", "wall-readout");
    p.appendChild(el("span", null, range));
    p.appendChild(el("span", null, pageLine));
    return p;
  }

  function removeStaleWallPages(pageCount) {
    /* Index 0 is the static #wall mount itself — never stale; stale pages
       begin at index max(1, pageCount). */
    for (var i = Math.max(1, pageCount); ; i++) {
      var stale = document.getElementById(wallPageId(i));
      if (!stale) break;
      stale.parentNode.removeChild(stale); /* tier shrank: page is gone */
    }
  }

  function dispatchWallPages() {
    if (typeof CustomEvent === "function") {
      document.dispatchEvent(new CustomEvent("ultron:wallpages"));
    }
  }

  /* --- V4 W2: the phone WALL PAGER (horizontal swipe pages) ------------------- */

  /* One stage, one viewport, thirteen x-pages: a scroll-snap-type:x
     mandatory scroller of single-plate pages, a mono readout ("SCREEN
     04 / 13", aria-live so the number speaks on settle) and two real
     chevron buttons (44px, aria-labeled) that page it. Vertical gestures
     pass through to the console (the y-mandatory root scroller): the
     pager only ever scrolls x, so a vertical pan chains straight up —
     the two snap axes coexist without conflict (css section 14d carries
     the touch-action/overscroll rules). Page changes settle-keyed: the
     readout, the chevron disabled states, and the document event
     "ultron:wallpage" (js/motion.js ignites that page's plates on it)
     all land at rest, never mid-swipe. */

  var lastPagerIndex = 0; /* survives a same-tier re-render (rotation) */

  function reducedMotionNow() {
    var mq = typeof window.matchMedia === "function"
      ? window.matchMedia("(prefers-reduced-motion: reduce)")
      : null;
    return mq ? mq.matches : true;
  }

  function buildWallPager(firstMount, builds) {
    firstMount.className = "stage stage-wall stage-wall-pager";
    firstMount.textContent = "";
    firstMount.appendChild(sectionHeading("The nameplate wall"));

    var head = el("div", "wall-pager-head");
    var readout = el("p", "wall-readout");
    var readoutSpan = el("span", null, "");
    readoutSpan.setAttribute("aria-live", "polite");
    readout.appendChild(readoutSpan);
    var nav = el("div", "wall-pager-nav");
    var prev = el("button", "wall-chevron wall-chevron-prev");
    prev.type = "button";
    prev.setAttribute("aria-label", "Previous screen");
    var next = el("button", "wall-chevron wall-chevron-next");
    next.type = "button";
    next.setAttribute("aria-label", "Next screen");
    nav.appendChild(prev);
    nav.appendChild(next);
    head.appendChild(readout);
    head.appendChild(nav);
    firstMount.appendChild(head);

    var pager = el("div", "wall-pager");
    pager.setAttribute("role", "region");
    pager.setAttribute(
      "aria-label",
      "The thirteen experiment screens — swipe horizontally or use the buttons");
    var pages = [];
    for (var i = 0; i < builds.length; i++) {
      var page = el("div", "wall-pager-page");
      page.appendChild(buildPlate(builds[i]));
      pager.appendChild(page);
      pages.push(page);
    }
    firstMount.appendChild(pager);
    wireWallPager(pager, readoutSpan, prev, next, pages, builds.length);
  }

  function wireWallPager(pager, readoutSpan, prev, next, pages, total) {
    var index = Math.max(0, Math.min(lastPagerIndex, total - 1));
    var settleTimer = 0;

    function pageWidth() {
      /* The stride between pages (border-box widths, no gaps): exact even
         if a future tier adds padding/gap to the scroller itself. */
      if (pages.length > 1) return Math.max(1, pages[1].offsetLeft - pages[0].offsetLeft);
      return pager.clientWidth || 1;
    }
    function currentIndex() {
      var i = Math.round(pager.scrollLeft / pageWidth());
      return Math.max(0, Math.min(total - 1, i));
    }
    function update() {
      var i = currentIndex();
      var changed = i !== index;
      index = i;
      lastPagerIndex = i;
      readoutSpan.textContent = "SCREEN " + pad2(i + 1) + " / " + total;
      prev.disabled = i === 0;
      next.disabled = i === total - 1;
      if (changed && typeof CustomEvent === "function") {
        document.dispatchEvent(
          new CustomEvent("ultron:wallpage", { detail: { index: i } }));
      }
    }
    function goTo(i, smooth) {
      i = Math.max(0, Math.min(total - 1, i));
      var behavior = (!smooth || reducedMotionNow()) ? "auto" : "smooth";
      try {
        pager.scrollTo({ left: i * pageWidth(), behavior: behavior });
      } catch (e) {
        pager.scrollLeft = i * pageWidth(); /* ancient engines: direct set */
      }
    }
    function settle() {
      if (settleTimer) clearTimeout(settleTimer);
      settleTimer = setTimeout(function () {
        settleTimer = 0;
        update();
      }, 120);
    }

    prev.addEventListener("click", function () { goTo(index - 1, true); });
    next.addEventListener("click", function () { goTo(index + 1, true); });
    /* The scroll listener only manages the settle timer — zero reads on
       the scroll hot path; the reads happen in the settle callback. */
    pager.addEventListener("scroll", settle, { passive: true });
    if ("onscrollend" in window) {
      pager.addEventListener("scrollend", function () {
        if (settleTimer) {
          clearTimeout(settleTimer);
          settleTimer = 0;
        }
        update();
      });
    }

    /* Seat the restored page instantly, then paint the readout. */
    if (index > 0 && pager.scrollLeft < pageWidth() * 0.5) goTo(index, false);
    update();

    /* The console-facing surface: stages.js reads current() when the wall
       stage assembles (ignite the screen the visitor is ON) and drives
       goto() from #wall-N deep links. Desktop tiers null it (guarded). */
    window.ULTRON_WALL = {
      current: function () { return currentIndex(); },
      goto: function (screenNumber) {
        goTo((parseInt(screenNumber, 10) || 1) - 1, false);
      }
    };
  }

  /* Renders every wall page stage (or, on phone tiers, the ONE pager
     stage). Idempotent: pages are reused in place, extras removed. The
     visitor's current wall page survives a re-render (same page index,
     clamped) so a mid-session tier change — rotation, window resize —
     never throws them off the wall. */
  function renderWallPages(builds) {
    var firstMount = mount("wall");
    if (!firstMount) return;

    /* Continuity: remember the active wall page before rebuilding. At the
       initial render ULTRON_STAGES has no active stage yet — no scroll. */
    var previousIndex = -1;
    if (window.ULTRON_STAGES && typeof window.ULTRON_STAGES.getActiveId === "function") {
      var activeId = window.ULTRON_STAGES.getActiveId();
      if (activeId && activeId.indexOf("wall") === 0) {
        var n = parseInt(activeId.split("-")[1], 10);
        previousIndex = isNaN(n) ? 0 : n - 1;
      }
    }

    var empty = !Array.isArray(builds) || builds.length === 0;
    removeStaleWallPages(0);
    firstMount.className = "stage stage-wall";
    firstMount.textContent = "";
    firstMount.appendChild(sectionHeading("The nameplate wall"));
    if (empty) {
      firstMount.appendChild(emptyState(
        /* R3 ($impeccable polish): sentence case, machine voice — file and
           schema hints preserved (owner recovery). */
        "The wall stands empty — data/builds.js holds no valid builds. Add an entry that satisfies the schema at the top of that file, and it rises."
      ));
      dispatchWallPages();
      return;
    }

    var tier = wallTier();
    lastTierKey = tier.pager ? "pager" : tier.cols + "x" + tier.rows;
    if (tier.pager) {
      /* V4 W2: phone tiers — one wall stage, the horizontal pager. */
      buildWallPager(firstMount, builds);
      dispatchWallPages();
      return;
    }
    window.ULTRON_WALL = null; /* desktop/mid tiers: no pager surface */
    var per = tier.cols * tier.rows;
    var pages = chunkPages(builds, per);
    /* The finale: a last page holding exactly one screen — featured only
       when the tier's pages hold more than one (a 1-plate-per-page tier
       would otherwise crown every page). */
    var featuredIndex = (pages.length > 1 && per > 1 && pages[pages.length - 1].length === 1)
      ? pages.length - 1
      : -1;

    var section = null;
    var consumed = 0;
    for (var i = 0; i < pages.length; i++) {
      var page = pages[i];
      var isFeatured = i === featuredIndex;
      if (i === 0) {
        section = firstMount;
      } else {
        var existing = document.getElementById(wallPageId(i));
        if (!existing) {
          existing = document.createElement("section");
          existing.id = wallPageId(i);
          section.parentNode.insertBefore(existing, section.nextSibling);
        }
        section = existing;
      }
      section.className = "stage stage-wall" + (isFeatured ? " stage-wall-featured" : "");

      section.textContent = "";
      section.appendChild(sectionHeading(isFeatured
        ? "The nameplate wall, page " + (i + 1) + " of " + pages.length + " — the featured finale"
        : (i === 0
          ? "The nameplate wall"
          : "The nameplate wall, page " + (i + 1) + " of " + pages.length)));

      section.appendChild(wallReadout(
        consumed + 1, consumed + page.length, builds.length,
        i + 1, pages.length, isFeatured));

      var grid = el("div", "wall-grid wall-page");
      /* The finale page is ONE plate on ONE stage: a single cell, whatever
         the tier's page shape is (a lone plate in a 3-col track measured
         339px wide — the featured screen must own the stage). */
      var cols = isFeatured ? 1 : tier.cols;
      var rows = isFeatured ? 1 : tier.rows;
      grid.style.gridTemplateColumns = "repeat(" + cols + ", minmax(0, 1fr))";
      grid.style.gridTemplateRows = "repeat(" + rows + ", minmax(0, 1fr))";
      for (var p = 0; p < page.length; p++) {
        grid.appendChild(buildPlate(page[p]));
      }
      section.appendChild(grid);
      consumed += page.length;
    }
    removeStaleWallPages(pages.length);

    if (previousIndex >= 0) {
      var keep = document.getElementById(
        wallPageId(Math.min(previousIndex, pages.length - 1)));
      if (keep && typeof keep.scrollIntoView === "function") {
        keep.scrollIntoView({ block: "start" }); /* instant; snap realigns */
      }
    }
    dispatchWallPages();
  }

  /* Tier changes on resize re-paginate the wall in place (debounced; the
     pages themselves are cheap DOM). Everything else is resize-stable. */
  var lastTierKey = "";
  var tierResizeTimer = 0;
  window.addEventListener("resize", function () {
    if (tierResizeTimer) clearTimeout(tierResizeTimer);
    tierResizeTimer = setTimeout(function () {
      tierResizeTimer = 0;
      var data = window.ULTRON_DATA;
      if (!data || !Array.isArray(data.builds) || data.builds.length === 0) return;
      var tier = wallTier();
      var key = tier.pager ? "pager" : tier.cols + "x" + tier.rows;
      if (key === lastTierKey) return;
      renderWallPages(data.builds);
    }, 150);
  });

  /* #roster — the six dedications (constant-driven; see header). V4R2: each
     dedication carries its DOSSIER line — a real same-origin <a> to its
     archive record (skills.html#skill-<id>; the console there selects the
     record on load). The mode chip + the dossier link share one meta row
     (44px floor — the link's tap target; they wrap on narrow cells), so
     the band's height budget survives the phone stages. The dedication
     STAYS a card, not a whole-card link: role text stays selectable and
     future links keep their own seats. */
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
      var meta = el("div", "dedication-meta");
      var mode = el("p", "dedication-mode", member.mode);
      mode.setAttribute("data-mode", member.mode.toLowerCase());
      meta.appendChild(mode);
      var doc = el("a", "dedication-dossier", "DOSSIER");
      doc.href = "skills.html" + member.doc;
      doc.setAttribute("aria-label", member.name + " — full dossier");
      meta.appendChild(doc);
      item.appendChild(meta);
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

  /* #footer — attribution + sign-off (constant-driven; see header).
     V4 W1: the mount may carry FOREIGN, non-render children (the S3
     archive anchor — the page's last inscription — lives in this footer
     stage's markup). The renderer preserves every element child that is
     not its own .footer-plate across the clear, re-appending them AFTER
     the plate in their original order: a re-render (test hook, future
     pipelines) must never delete content it does not own. */
  function renderFooter(mountNode) {
    var foreign = [];
    for (var f = mountNode.firstElementChild; f; f = f.nextElementSibling) {
      if (!(f.classList.contains("footer-plate"))) foreign.push(f);
    }
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
    for (var k = 0; k < foreign.length; k++) mountNode.appendChild(foreign[k]);
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
    renderWallPages(data.builds); /* V4 W1: pages + siblings (own mount) */
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
