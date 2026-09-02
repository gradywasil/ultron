"use strict";
/* ==========================================================================
   The Ultron Initiative — archive console enhancer (V3 THE ARCHIVE, task
   S3 attempt 2). The archive page's progressive-enhancement layer.

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
     spams history; deep links select on load; with no hash the first
     family entry is selected. The keydown handler lives on the rail, so
     arrows cross group boundaries freely.

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
     the panel visibility, and the mobile group/chip tiers. */
  function select(id) {
    if (!state || !state.byId[id]) return false;
    var winner = state.byId[id];
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

  function onRailKeydown(event) {
    if (!state) return;
    var forward = event.key === "ArrowDown" || event.key === "ArrowRight";
    var backward = event.key === "ArrowUp" || event.key === "ArrowLeft";
    var home = event.key === "Home";
    var end = event.key === "End";
    if (!forward && !backward && !home && !end) return;
    /* Only the tabs that actually render walk (mobile hides the inactive
       groups' chips; offsetParent is null for display:none). */
    var visible = state.tabs.filter(function (tab) {
      return tab.offsetParent !== null;
    });
    if (visible.length === 0) return;
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
    state.rail.removeEventListener("keydown", onRailKeydown);
    state.rail.removeEventListener("click", onRailClick);
    state.groupBar.removeEventListener("click", onGroupClick);
    compactMql.removeEventListener("change", onCompactChange);
    if (state.groupBar.parentNode) state.groupBar.parentNode.removeChild(state.groupBar);
    if (state.rail.parentNode) state.rail.parentNode.removeChild(state.rail);
    if (state.stage.parentNode) state.stage.parentNode.removeChild(state.stage);
    document.documentElement.classList.remove("console-armed");
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
