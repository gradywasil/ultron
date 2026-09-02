"use strict";
/* ==========================================================================
   The Ultron Initiative — archive console enhancer (V3 THE ARCHIVE, task
   S3 attempt 2; V3-R ARCHIVE IGNITION, task R1 — the aliveness layer).
   The archive page's progressive-enhancement layer.

   --------------------------------------------------------------------------
   LOADING (skills.html, the S3 contract): after the S2 pipeline —

   <script src="data/skills.js" defer></script>
   <script src="js/skills-loader.js" defer></script>
   <script src="js/skills.js" defer></script>
   <script src="js/skills-console.js" defer></script>   (this file, LAST)

   Defer preserves execution order, so by the time this file's DOMContentLoaded
   listener fires (registered after js/skills.js's render listener), the three
   mounts hold the FULL stacked document. This file then TRANSFORMS that
   document into the console — and only then:

   - builds the INDEX RAIL from the rendered entries: one rail group per
     S2 mount, each holding the section h2 (MOVED, kept in the heading
     outline — a raw heading is not a legal tablist child, so it seats
     OUTSIDE the tab) and one div[role=tablist] of button[role=tab]s
     (label = the entry's own h3 text; family tabs carry the entry's
     data-mode so the graded autonomy diamond renders on the chip);
     aria-orientation vertical on desktop / horizontal on the mobile chip
     row, updated at the breakpoint;
   - promotes each entry into the DETAIL STAGE as a fresh WRAPPER
     div[role=tabpanel] (aria-labelledby its tab, tabindex=0 so Tab exits
     the rail into the panel then the footer — no traps) holding the entry
     itself. The wrapper exists because the S2 entries are <article>/<li>,
     whose HTML-ARIA allowed-role tables do not admit tabpanel — a plain
     div admits every role, and the entry keeps its own id (the deep-link
     anchor) untouched inside. Exactly one panel shows at a time;
   - owns SELECTION: clicks and group buttons write the entry's existing
     S2 anchor via location.hash (#skill-<id> / #hero-<id> — history
     entries, so back/forward traverse selections through one hashchange
     handler); the arrow/Home/End walk is selection-follows-focus over a
     roving tabindex (one tabbable tab: the selected one — shared across
     all three tablists) and uses history.replaceState so walking never
     spams history; R4 adds the TYPEAHEAD accelerator (WAI-ARIA Tabs
     practice) — typing a printable prefix jumps selection to the next
     entry whose name begins with it, wrapping the index, the buffer
     retiring after 600ms; deep links select on load; with no hash the
     first family entry is selected. The keydown handler lives on the
     rail, so arrows cross group boundaries freely.

   DEGRADATION (the house pattern, cf. V4 arming): the arming class
   html.console-armed is added ONLY on success. No console file, a script
   error, a missing S2 mount, or zero rendered entries -> the class never
   lands and css/skills.css keeps the complete stacked document. This
   file is silent on the happy path (no console output), idempotent, and
   leaks nothing: one hashchange listener is bound once for the page's
   life; rail listeners ride their own elements and are removed with them.

   RE-RENDER HOOK: js/skills.js exposes window.ULTRON_SKILLS_RENDER() for
   the disposable validation harness. This file wraps it (once) to tear
   the console down and re-arm over the freshly rendered mounts, so the
   test hook cannot strand a stale rail or duplicate panels.

   An EMPTY group (S2's .empty-state) rides the rail as a non-tab note
   under its group label; if NO entries render at all, the console does
   not arm — the stacked document with its three styled empty-states is
   the honest full view.

   --------------------------------------------------------------------------
   V3-R ARCHIVE IGNITION (task R1) — THE ALIVENESS LAYER. The owner's
   verdict: the archive stays documentation, but the wing must carry the
   front page's living energy and the panel must stop reading as a wall
   of stacked label rows. This file now also owns the console's motion,
   in the front page's grammar:

   - THE OPENING (once per load, at arm): the census numeral counts
     0 -> N (motion.js's count-up grammar, archive-local: rAF +
     textContent only, 1.1s cubic ease-out; final text restored
     byte-exact) while js/skills-field.js ignites its ONE power-on sweep
     (guarded call — the field lights only when the console armed, and
     dispatches on "ultron:archivearmed"; since refinement R1 the pass
     hands off to the field's own heartbeat cycle — the console still
     owns only this opening). One moment, then quiet: the
     idle rail shimmer (.console-live, css/skills.css) arms only after
     the opening has fully settled (~1.9s).
   - PER SELECTION (each genuine winner change): ONE power-on — the
     incoming panel takes .is-powering; css/skills.css runs the spec
     sheet's scan sweep (one pass, paint/transform only) while THIS file
     lands the panel's rows in the house cadence (.is-landed staggered
     ~60ms in DOM order: name -> mode/lens -> body fields -> signature
     last, the signature carving in with a glow settle via
     .is-carving). The winning rail tab takes a transient .is-arriving
     flare settling to its sustained lit seat. A GROUP CHANGE also sends
     one traveling pulse down the new group's tabs (.is-pulse, 60ms
     steps — the frieze sweep's kin). Pre-entry offsets exist ONLY
     under .is-powering, added in the same synchronous task that
     reveals the panel — no-JS, script-error, and pre-arming paints
     never show hidden content.
   - REDUCED MOTION (checked live): no choreography class is ever
     struck — the console swaps with the plain 120ms-era opacity fade
     killed by the sheet, the census stands final, the field paints its
     one still — and a live switch strips any in-flight classes and
     settles everything instantly (getAnimations() === 0 floor).
   All choreography channels are transform/opacity/paint only; every
   timer is tracked and cleared on teardown and on the live switch.
   ========================================================================== */
(function () {
  var GROUPS = [
    { key: "family", mountId: "skills-family", selector: ".family-member" },
    { key: "pipeline", mountId: "skills-pipeline", selector: ".pipeline-stage" },
    { key: "heroes", mountId: "skills-heroes", selector: "article.hero" }
  ];
  var GROUP_NAMES = ["Family", "Pipeline", "Heroes"];

  var state = null;
  var hashBound = false;
  var compactMql = window.matchMedia("(max-width: 1023.98px)");

  /* --- V3-R: preference + timer machinery (motion.js's, archive-local) ----- */

  var reduceMQ = typeof window.matchMedia === "function"
    ? window.matchMedia("(prefers-reduced-motion: reduce)")
    : null;

  /* Safest default for an unknown engine: static (motion.js's rule). */
  function prefersReducedMotion() {
    return reduceMQ ? reduceMQ.matches : true;
  }

  var pendingTimers = [];
  function later(fn, ms) {
    var id = setTimeout(fn, ms);
    pendingTimers.push(id);
    return id;
  }
  function clearPending() {
    while (pendingTimers.length) clearTimeout(pendingTimers.pop());
  }

  /* --- V3-R: the choreography ------------------------------------------------
     ONE power-on per genuine winner change. The panel takes .is-powering
     (css/skills.css: the spec-sheet scan sweep + the rows' pre-entry
     offsets) in the SAME task that reveals it; the rows then land in the
     house cadence. The winning tab flares once; a group change adds the
     rail's traveling pulse. All guarded by state (a torn-down console
     fires nothing) and skipped entirely under reduced motion. */

  var TAB_FLARE_MS = 480;    /* the arrival flash's class lifetime        */
  var PULSE_HOLD_MS = 460;   /* each rail pulse node's flare lifetime     */
  var ROW_STEP_MS = 60;      /* the house cadence (frieze kin)            */
  var SIGNATURE_BEAT_MS = 90;/* the carve's extra beat after the last row */
  var SWEEP_CLEAR_MS = 980;  /* .is-powering lifetime (0.25s delay + the
                                0.65s pass, + margin — retiring the class
                                removes the pseudo at the pass's end)     */

  function winnerChanged(id) {
    return state.currentId !== id;
  }

  function powerOn(winner) {
    if (!state) return;
    var panel = winner.panel;
    var entry = panel.firstElementChild;
    if (!entry) return;

    /* Fresh strike: clear any stale landing classes, arm the pre-entry
       offsets, force ONE reflow so the offsets exist before the first
       row lands (never a flash of the end state). */
    var rows = Array.prototype.slice.call(entry.children);
    for (var i = 0; i < rows.length; i++) {
      rows[i].classList.remove("is-landed");
      rows[i].classList.remove("is-carving");
    }
    panel.classList.add("is-powering");
    void panel.offsetHeight;
    /* The sweep crosses the WHOLE spec sheet: hand the CSS its measured
       height (css/skills.css keyframes consume --sweep-h). */
    panel.style.setProperty("--sweep-h", panel.offsetHeight + "px");

    /* The rows land in DOM order at the house cadence — which IS the
       specified order (name -> mode/lens -> fields -> signature last). */
    var signature = null;
    for (var j = 0; j < rows.length; j++) {
      if (rows[j].classList.contains("hero-signature")) signature = rows[j];
    }
    var t = 0;
    for (var k = 0; k < rows.length; k++) {
      (function (row, isLast) {
        later(function () {
          if (!state) return;
          row.classList.add("is-landed");
          if (isLast && signature === row) row.classList.add("is-carving");
        }, t);
      })(rows[k], signature === rows[k]);
      t += ROW_STEP_MS;
    }
    /* The signature carves in with its own beat after the last row. */
    if (signature) {
      later(function () {
        if (!state) return;
        signature.classList.add("is-carving");
      }, t + SIGNATURE_BEAT_MS);
    }
    /* The sweep is over: retire the arming class (every row has landed;
       retiring clears the pre-entry offsets for good — nothing can re-run
       without a fresh strike). */
    later(function () {
      if (!state) return;
      panel.classList.remove("is-powering");
    }, Math.max(SWEEP_CLEAR_MS, t + 420));
  }

  function flareTab(tab) {
    if (!state) return;
    tab.classList.add("is-arriving");
    later(function () {
      if (!state) return;
      tab.classList.remove("is-arriving");
    }, TAB_FLARE_MS);
  }

  /* One traveling pulse down the new group's rail (the frieze sweep's
     kin): each tab flares in order at 60ms steps, settling to its lit
     state. Fired ONLY on a group change, never on every selection. */
  function pulseGroup(groupIndex) {
    if (!state) return;
    var groupTabs = state.tabs.filter(function (tab) {
      return Number(tab.getAttribute("data-group")) === groupIndex;
    });
    for (var i = 0; i < groupTabs.length; i++) {
      (function (tab, delay) {
        later(function () {
          if (!state) return;
          tab.classList.add("is-pulse");
          later(function () {
            if (!state) return;
            tab.classList.remove("is-pulse");
          }, PULSE_HOLD_MS);
        }, delay);
      })(groupTabs[i], i * ROW_STEP_MS);
    }
  }

  /* --- V3-R: the census count-up (the opening moment, once per load) --------
     motion.js's grammar, archive-local: rAF + textContent only, 1.1s cubic
     ease-out, the final text restored byte-exact. Skipped under reduced
     motion (the engraved value stands) and on tiers where the census is
     display:none (mobile — the category line already carries the counts);
     the field's power-on ignites either way. */

  var COUNT_DURATION_MS = 1100;

  function easeOutCubic(t) {
    return 1 - (1 - t) * (1 - t) * (1 - t);
  }

  function runCensusCountUp() {
    if (window.ULTRON_ARCHIVE_FIELD &&
        typeof window.ULTRON_ARCHIVE_FIELD.ignite === "function") {
      window.ULTRON_ARCHIVE_FIELD.ignite();
    }
    var census = document.querySelector(".archive-census");
    if (!census || census.offsetParent === null) return; /* hidden tier */
    var target = state ? state.tabs.length : 0;
    if (target <= 0) return;
    var finalText = census.textContent;
    var prefix = finalText.replace(/^\d+/, "");
    var start = 0;
    function frame(now) {
      if (start === 0) start = now;
      var t = (now - start) / COUNT_DURATION_MS;
      if (t >= 1 || prefersReducedMotion()) {
        census.textContent = finalText; /* byte-exact restoration */
        return;
      }
      census.textContent = String(Math.round(easeOutCubic(t) * target)) + prefix;
      window.requestAnimationFrame(frame);
    }
    window.requestAnimationFrame(frame);
  }

  /* --- V3-R: the live reduced-motion switch ----------------------------------
     Everything in flight settles instantly: choreography classes stripped
     (content fully visible at final state), pending timers cleared, the
     idle shimmer's arming class removed. Once per load — no replay. */

  function onReduceChange() {
    if (!prefersReducedMotion()) return;
    clearPending();
    document.documentElement.classList.remove("console-live");
    if (!state) return;
    state.tabs.forEach(function (tab) {
      tab.classList.remove("is-arriving");
      tab.classList.remove("is-pulse");
    });
    state.panels.forEach(function (panel) {
      panel.classList.remove("is-powering");
      var rows = panel.querySelectorAll(".is-landed, .is-carving");
      for (var i = 0; i < rows.length; i++) {
        rows[i].classList.remove("is-landed");
        rows[i].classList.remove("is-carving");
      }
    });
  }
  if (reduceMQ) {
    if (typeof reduceMQ.addEventListener === "function") {
      reduceMQ.addEventListener("change", onReduceChange);
    } else if (typeof reduceMQ.addListener === "function") {
      reduceMQ.addListener(onReduceChange); /* older engines */
    }
  }

  function qsa(root, selector) {
    return Array.prototype.slice.call(root.querySelectorAll(selector));
  }

  /* The S2 DOM contract: #archive-main + the three mounts with their
     documented entry hooks. Anything missing -> null -> silent stacked. */
  function collect() {
    var groups = [];
    var total = 0;
    for (var i = 0; i < GROUPS.length; i++) {
      var mount = document.getElementById(GROUPS[i].mountId);
      if (!mount) return null;
      groups.push({
        key: GROUPS[i].key,
        index: i,
        mount: mount,
        entries: qsa(mount, GROUPS[i].selector),
        heading: mount.querySelector("h2.section-heading")
      });
      total += groups[i].entries.length;
    }
    return { groups: groups, total: total };
  }

  function hashEntryId() {
    var hash = window.location.hash || "";
    if (hash.charAt(0) === "#") hash = hash.slice(1);
    return hash;
  }

  /* The one selection primitive: every path funnels here (initial load,
     hashchange, arrow walk). Updates aria-selected, the roving tabindex,
     the panel visibility, and the mobile group/chip tiers. V3-R: a
     GENUINE winner change also strikes the aliveness — the panel's one
     power-on, the winning tab's arrival flare, and (on a group change)
     the rail's traveling pulse — all skipped under reduced motion. */
  function select(id) {
    if (!state || !state.byId[id]) return false;
    var winner = state.byId[id];
    var changed = winnerChanged(id);
    var prevGroup = state.currentId && state.byId[state.currentId]
      ? state.byId[state.currentId].group
      : null;
    state.tabs.forEach(function (tab) {
      var on = tab === winner.tab;
      tab.setAttribute("aria-selected", on ? "true" : "false");
      tab.setAttribute("tabindex", on ? "0" : "-1");
      tab.classList.toggle("is-selected", on);
    });
    state.panels.forEach(function (panel) {
      panel.hidden = panel !== winner.panel;
    });
    qsa(state.rail, ".rail-group").forEach(function (wrap) {
      wrap.classList.toggle(
        "is-active",
        wrap.getAttribute("data-group-index") === String(winner.group)
      );
    });
    qsa(state.groupBar, ".console-group-button").forEach(function (button) {
      button.setAttribute(
        "aria-pressed",
        Number(button.getAttribute("data-group")) === winner.group ? "true" : "false"
      );
    });
    state.currentId = id;
    if (changed && !prefersReducedMotion()) {
      powerOn(winner);
      flareTab(winner.tab);
      if (prevGroup !== null && prevGroup !== winner.group) {
        pulseGroup(winner.group);
      }
    }
    return true;
  }

  function onHashChange() {
    /* Clicks, group buttons, back/forward — one handler. Back/forward
       must reseat the console view, so the page returns to its top; the
       panel itself is swapped in place (no page scroll exists at
       desktop, and at mobile this keeps the header + controls in view). */
    if (select(hashEntryId())) {
      window.scrollTo(0, 0);
    }
  }

  /* --- R4: the typeahead accelerator (WAI-ARIA Tabs practice) ----------------
     27 records is a lot of arrow taps. Typing a printable character
     jumps selection to the next entry whose name begins with the typed
     prefix, wrapping the whole index; repeating a character walks the
     entries sharing that head. The buffer retires after 600ms, so each
     fresh burst starts a new search (a multi-letter prefix refines
     within one burst). Same rules as the arrow walk: selection follows
     focus, replaceState — never a history entry per keystroke. */

  var TYPEAHEAD_RESET_MS = 600;
  var typeaheadBuffer = "";
  var typeaheadAt = 0;

  function onTypeahead(event, visible) {
    var now = Date.now();
    if (now - typeaheadAt > TYPEAHEAD_RESET_MS) typeaheadBuffer = "";
    typeaheadAt = now;
    typeaheadBuffer += event.key;
    var query = typeaheadBuffer.toLowerCase();
    var current = visible.indexOf(document.activeElement);
    if (current === -1 && state.currentId && state.byId[state.currentId]) {
      current = visible.indexOf(state.byId[state.currentId].tab);
    }
    var n = visible.length;
    for (var step = 1; step <= n; step++) {
      var candidate = visible[(current + step + n) % n];
      if (candidate.textContent.trim().toLowerCase().indexOf(query) === 0) {
        return candidate;
      }
    }
    return null; /* no match: focus stays put (the APG behavior) */
  }

  function onRailKeydown(event) {
    if (!state) return;
    var forward = event.key === "ArrowDown" || event.key === "ArrowRight";
    var backward = event.key === "ArrowUp" || event.key === "ArrowLeft";
    var home = event.key === "Home";
    var end = event.key === "End";
    if (event.key === "Escape") {
      typeaheadBuffer = ""; /* a mistyped prefix dies quietly */
      return;
    }
    var printable = event.key.length === 1 &&
      !event.ctrlKey && !event.metaKey && !event.altKey;
    if (!forward && !backward && !home && !end && !printable) return;
    /* Only the tabs that actually render walk (mobile hides the inactive
       groups' chips; offsetParent is null for display:none). */
    var visible = state.tabs.filter(function (tab) {
      return tab.offsetParent !== null;
    });
    if (visible.length === 0) return;
    if (printable) {
      /* The accelerator owns printable strokes while the rail is focused
         (no Firefox quick-find, no space-scroll). */
      event.preventDefault();
      var hit = onTypeahead(event, visible);
      if (hit) {
        var hitId = hit.getAttribute("data-entry");
        select(hitId);
        hit.focus();
        window.history.replaceState(null, "", "#" + hitId);
      }
      return;
    }
    event.preventDefault();
    var current = visible.indexOf(document.activeElement);
    if (current === -1 && state.currentId && state.byId[state.currentId]) {
      current = visible.indexOf(state.byId[state.currentId].tab);
    }
    var target;
    if (home) {
      target = visible[0];
    } else if (end) {
      target = visible[visible.length - 1];
    } else if (current === -1) {
      target = visible[0];
    } else {
      target = visible[(current + (forward ? 1 : -1) + visible.length) % visible.length];
    }
    var id = target.getAttribute("data-entry");
    select(id); /* selection follows focus */
    target.focus();
    /* Walking records where you are (shareable URL) without stacking a
       history entry per keystroke — real selections come from clicks. */
    window.history.replaceState(null, "", "#" + id);
  }

  function onRailClick(event) {
    if (!state) return;
    var tab = event.target.closest ? event.target.closest(".rail-tab") : null;
    if (!tab) return;
    var id = tab.getAttribute("data-entry");
    if (!id || state.currentId === id) return;
    /* The hash IS the selection: it pushes a history entry and the
       hashchange handler completes the swap. */
    window.location.hash = id;
  }

  function onGroupClick(event) {
    if (!state) return;
    var button = event.target.closest
      ? event.target.closest(".console-group-button")
      : null;
    if (!button || button.disabled) return;
    var groupIndex = Number(button.getAttribute("data-group"));
    var first = null;
    for (var i = 0; i < state.tabs.length; i++) {
      if (Number(state.tabs[i].getAttribute("data-group")) === groupIndex) {
        first = state.tabs[i];
        break;
      }
    }
    if (!first) return;
    var id = first.getAttribute("data-entry");
    if (state.currentId !== id) {
      window.location.hash = id; /* pushes; hashchange re-selects */
      select(id); /* select now, so the chip is visible before focus */
    }
    first.focus();
  }

  function setOrientations() {
    var value = compactMql.matches ? "horizontal" : "vertical";
    qsa(state.rail, "[role=tablist]").forEach(function (list) {
      list.setAttribute("aria-orientation", value);
    });
  }

  function onCompactChange() {
    if (state) setOrientations();
  }

  function teardown() {
    if (!state) return;
    /* V3-R: no timer may fire into a torn-down console. */
    clearPending();
    state.rail.removeEventListener("keydown", onRailKeydown);
    state.rail.removeEventListener("click", onRailClick);
    state.groupBar.removeEventListener("click", onGroupClick);
    compactMql.removeEventListener("change", onCompactChange);
    if (state.groupBar.parentNode) state.groupBar.parentNode.removeChild(state.groupBar);
    if (state.rail.parentNode) state.rail.parentNode.removeChild(state.rail);
    if (state.stage.parentNode) state.stage.parentNode.removeChild(state.stage);
    document.documentElement.classList.remove("console-armed");
    document.documentElement.classList.remove("console-live");
    state = null;
  }

  function arm() {
    if (state) return; /* idempotent: armed already */
    var main = document.getElementById("archive-main");
    var doc = main ? collect() : null;
    if (!doc || doc.total === 0) return; /* silent degrade: stacked stays */

    /* The two-tier mobile control's tier one: three group buttons. On
       desktop this bar is display:none — the rail shows every group. */
    var groupBar = document.createElement("div");
    groupBar.className = "console-groupbar";

    /* The rail: a labelled group of per-family tablists (the h2 labels
       seat outside the tablists — raw headings are not legal tablist
       children, and outside them they stay real headings). */
    var rail = document.createElement("div");
    rail.className = "console-rail";
    rail.setAttribute("role", "group");
    rail.setAttribute("aria-label", "Archive index — every record");

    var stage = document.createElement("div");
    stage.className = "console-stage";

    var tabs = [];
    var panels = [];
    var byId = {};

    doc.groups.forEach(function (group) {
      var button = document.createElement("button");
      button.type = "button";
      button.className = "console-group-button";
      button.setAttribute("data-group", String(group.index));
      button.setAttribute("aria-pressed", "false");
      button.setAttribute("aria-controls", "rail-group-" + group.index);
      if (group.entries.length === 0) button.disabled = true;
      button.textContent = GROUP_NAMES[group.index] + " \u00b7 " + group.entries.length;
      groupBar.appendChild(button);
    });

    doc.groups.forEach(function (group) {
      var wrap = document.createElement("div");
      wrap.className =
        "rail-group rail-group-" + group.key +
        (group.entries.length === 0 ? " rail-group-empty" : "");
      wrap.id = "rail-group-" + group.index;
      wrap.setAttribute("data-group-index", String(group.index));

      /* The h2 MOVES (never copied): the heading outline h1 -> h2 -> h3
         holds in console mode, the label reading as the group's
         wall-plate inscription above its tablist. */
      if (group.heading) wrap.appendChild(group.heading);

      if (group.entries.length === 0) {
        /* The machine's bounded state rides the index (compact note),
           not a hidden section. */
        var note = group.mount.querySelector(".empty-state");
        if (note) wrap.appendChild(note);
        rail.appendChild(wrap);
        return;
      }

      var list = document.createElement("div");
      list.className = "rail-tabs";
      list.setAttribute("role", "tablist");
      list.setAttribute("aria-label", group.heading ? group.heading.textContent : GROUP_NAMES[group.index]);
      group.entries.forEach(function (entry) {
        if (!entry.id) return;
        var name = entry.querySelector("h3");

        var tab = document.createElement("button");
        tab.type = "button";
        tab.className = "rail-tab";
        tab.id = "tab-" + entry.id;
        tab.setAttribute("role", "tab");
        tab.setAttribute("aria-selected", "false");
        tab.setAttribute("aria-controls", "panel-" + entry.id);
        tab.setAttribute("data-entry", entry.id);
        tab.setAttribute("data-group", String(group.index));
        tab.setAttribute("tabindex", "-1");
        tab.textContent = name ? name.textContent : entry.id;
        /* The graded autonomy diamond on family chips: a styling hook
           copied from the entry's own mode chip. */
        var mode = entry.querySelector(".family-mode");
        if (mode && mode.getAttribute("data-mode")) {
          tab.setAttribute("data-mode", mode.getAttribute("data-mode"));
        }
        list.appendChild(tab);
        tabs.push(tab);

        /* The promotion: a fresh tabpanel wrapper holds the entry (the
           entry itself is <article>/<li>, which HTML-ARIA does not allow
           to carry role=tabpanel; the wrapper div admits every role).
           The entry keeps its own id — the deep-link anchor — untouched
           inside, unmarked by console attributes. */
        var panel = document.createElement("div");
        panel.id = "panel-" + entry.id;
        panel.setAttribute("role", "tabpanel");
        panel.setAttribute("aria-labelledby", tab.id);
        panel.setAttribute("tabindex", "0");
        panel.hidden = true;
        panel.appendChild(entry);
        stage.appendChild(panel);
        panels.push(panel);

        byId[entry.id] = { tab: tab, panel: panel, group: group.index };
      });
      wrap.appendChild(list);
      rail.appendChild(wrap);
    });

    main.appendChild(groupBar);
    main.appendChild(rail);
    main.appendChild(stage);
    document.documentElement.classList.add("console-armed");
    /* V3-R: the field lights with the console (the stacked degradation
       never paints a mote). Event first (a listener that is already
       armed), pull second (js/skills-field.js boots after this file and
       checks the class itself — order-robust both ways). */
    if (typeof CustomEvent === "function") {
      document.dispatchEvent(new CustomEvent("ultron:archivearmed"));
    }

    state = {
      main: main,
      groupBar: groupBar,
      rail: rail,
      stage: stage,
      tabs: tabs,
      panels: panels,
      byId: byId,
      currentId: null
    };

    rail.addEventListener("keydown", onRailKeydown);
    rail.addEventListener("click", onRailClick);
    groupBar.addEventListener("click", onGroupClick);
    compactMql.addEventListener("change", onCompactChange);
    if (!hashBound) {
      window.addEventListener("hashchange", onHashChange);
      hashBound = true; /* one listener for the page's life — never re-bound */
    }
    setOrientations();

    /* Initial selection: the deep link if it names an entry, else the
       first family entry. Neutralize any anchor jump the static document
       may have triggered before the console took over. */
    var initial = hashEntryId();
    if (!initial || !select(initial)) {
      select(tabs[0].getAttribute("data-entry"));
    }
    window.scrollTo(0, 0);

    /* V3-R — THE OPENING: the census counts and the field's one power-on
       sweep light together (the initial select() above already struck the
       first panel's landing choreography). The idle rail shimmer arms
       only once the opening has fully settled — one moment at a time. */
    if (!prefersReducedMotion()) {
      runCensusCountUp();
      later(function () {
        document.documentElement.classList.add("console-live");
      }, COUNT_DURATION_MS + 800);
    }
  }

  /* Keep js/skills.js's test hook honest: a re-render rebuilds the
     stacked mounts, so the console must rebuild over them (the old rail,
     stage, and moved nodes are discarded with the elements that own
     them). Wrapped once, flagged so double-loading this file cannot
     stack wrappers. */
  var superRender = window.ULTRON_SKILLS_RENDER;
  if (typeof superRender === "function" && !superRender.__ultronConsoleWrapped) {
    var wrapped = function () {
      superRender();
      teardown();
      arm();
    };
    wrapped.__ultronConsoleWrapped = true;
    window.ULTRON_SKILLS_RENDER = wrapped;
  }

  if (document.readyState === "loading") {
    /* Registered after js/skills.js's render listener -> the stacked
       document is complete when arm() runs. */
    document.addEventListener("DOMContentLoaded", arm);
  } else {
    arm();
  }
})();
