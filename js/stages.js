"use strict";
/* ==========================================================================
   The Ultron Initiative — the stage console (task W1, IRON MAN)
   --------------------------------------------------------------------------
   The V4 orientation system. css/styles.css section 14 + index.html make the
   root scroller a mandatory-snap console of stages; THIS module is its
   instrument panel:

     1. THE HUD SPINE — a fixed <nav class="spine"> at the end of <body>
        (content-first tab order; the skip link stays the first focusable
        element): one real <button> per stage ("Go to HERO", "Go to WALL 1",
        ...), 44px targets, scrolling the console to the stage on
        activation. The active stage's tick is lit + elongated with its mono
        label beside it. No-JS: never built (the noscript page scrolls as a
        plain document).

     2. ACTIVE-STAGE TRACKING (W2: SETTLE-KEYED) — a passive scroll
        listener, rAF-throttled, watches the console and commits the active
        stage ONLY AT REST: after the last scroll event (+140ms debounce,
        or the native scrollend event where it exists) AND only when the
        winning stage is actually aligned with the viewport. The active id
        is exposed (window.ULTRON_STAGES.getActiveId) and every committed
        change is announced as a document CustomEvent "ultron:stagechange"
        — js/field.js re-measures its restraint zones from the ACTIVE
        stage's text blocks (the machine dims around whatever stage is on).
        W2 adds two choreography events on the same beat: "ultron:stagedepart"
        (the settled stage's alignment has genuinely broken — its release
        may begin while it is still visible) and "ultron:stagesettle"
        (a commit — the entering stage's assembly and the spine tick land
        in the same task, so label and content can never desync). The
        settle keying is the fix for the W1 nuance: a synthetic flick
        crossing two snap points (logged at 1440x700) can no longer commit
        the INTERMEDIATE stage — only the stage the snap actually lands on
        is ever committed, and the origin stage departs once, visibly.

     3. HASH DEEP-LINKS — stage ids are semantic and stable (#hero, #wall,
        #wall-2, #wall-3, #roster, #frieze, #footer). The console navigates
        on hashchange AND after load; a #wall-N link beyond the live page
        count clamps to the last wall page (old anchors never break — the
        tier decides how many pages exist). Spine activations update the
        hash via history.replaceState (URL in sync, no navigation loop).

   LOADING: index.html loads this file (defer) AFTER js/render.js (the spine
   is built from the RENDERED wall pages at this module's DOMContentLoaded
   boot) and BEFORE js/field.js (whose boot — later in the same dispatch —
   measures zones against the already-tracked active stage). render.js
   re-paginates the wall on tier changes and dispatches "ultron:wallpages";
   this module rebuilds the spine on that event and re-syncs the active
   stage. Motion discipline (W1 adds no transitions): spine ticks carry no
   animated properties — states swap instantly under every preference.
   ========================================================================== */

(function () {
  var nav = null;          /* the <nav class="spine">                      */
  var stages = [];         /* [{ id, el, label, tick }] in document order  */
  var activeId = null;     /* the stage owning the viewport center         */
  var scrollRaf = 0;

  /* --- Stage census ---------------------------------------------------------- */

  /* Every stage carries class .stage (index.html markup + render.js's wall
     pages); document order is spine order. Labels are the console's own
     names: HERO / WALL 1..N / ROSTER / FRIEZE / FOOTER. */
  function stageLabel(el, index, wallIndex) {
    switch (el.id) {
      case "hero": return "HERO";
      case "roster": return "ROSTER";
      case "frieze": return "FRIEZE";
      case "footer": return "FOOTER";
      default:
        if (el.id === "wall" || /^wall-\d+$/.test(el.id)) {
          return "WALL " + (wallIndex + 1);
        }
        return null; /* an unknown .stage: not ours, not spined */
    }
  }

  function collectStages() {
    stages = [];
    var nodes = document.querySelectorAll(".stage");
    var wallIndex = 0;
    for (var i = 0; i < nodes.length; i++) {
      var node = nodes[i];
      var label = stageLabel(node, i, wallIndex);
      if (label === null) continue;
      if (node.id === "wall" || /^wall-\d+$/.test(node.id)) wallIndex++;
      stages.push({ id: node.id, el: node, label: label, tick: null });
    }
  }

  /* --- The spine --------------------------------------------------------------- */

  function buildSpine() {
    if (nav && nav.parentNode) nav.parentNode.removeChild(nav);
    nav = document.createElement("nav");
    nav.className = "spine";
    nav.setAttribute("aria-label", "Stages");
    for (var i = 0; i < stages.length; i++) {
      var stage = stages[i];
      var tick = document.createElement("button");
      tick.type = "button";
      tick.className = "spine-tick";
      tick.setAttribute("aria-label", "Go to " + stage.label);
      tick.appendChild(elSpan("spine-label", stage.label));
      tick.appendChild(elSpan("spine-bar", ""));
      stage.tick = tick;
      bindTick(tick, stage);
      nav.appendChild(tick);
    }
    document.body.appendChild(nav); /* end of body: content-first tab order */
  }

  function elSpan(className, text) {
    var s = document.createElement("span");
    s.className = className;
    if (text) s.textContent = text;
    return s;
  }

  function bindTick(tick, stage) {
    tick.addEventListener("click", function () {
      goToStage(stage);
    });
  }

  function goToStage(stage) {
    if (stage && stage.el && typeof stage.el.scrollIntoView === "function") {
      stage.el.scrollIntoView({ block: "start" }); /* instant; snap aligns */
    }
    if (stage) {
      /* Programmatic arrival is already at rest: commit now, not 140ms
         later — the tick lights as the stage lands. The pager keeps the
         visitor's current screen (a stage tick is a stage, not a screen). */
      commitActive(stage);
    }
    /* Keep the URL honest without triggering a hashchange loop. */
    if (stage && window.history && typeof history.replaceState === "function") {
      try {
        history.replaceState(null, "", "#" + stage.id);
      } catch (e) {
        /* file:// edge: the URL simply stays as-is; navigation happened. */
      }
    }
  }

  /* --- Active-stage tracking ----------------------------------------------------- */

  function resolveActive() {
    if (stages.length === 0) return null;
    var viewMid = (window.innerHeight || document.documentElement.clientHeight || 0) / 2;
    var best = null;
    var bestDistance = Infinity;
    for (var i = 0; i < stages.length; i++) {
      var rect = stages[i].el.getBoundingClientRect();
      var mid = rect.top + rect.height / 2;
      var distance = Math.abs(mid - viewMid);
      if (distance < bestDistance) {
        bestDistance = distance;
        best = stages[i];
      }
    }
    return best;
  }

  /* --- W2: the settle machinery -------------------------------------------------
     NOTHING commits mid-flight. A scroll stream keeps pushing the settle
     deadline out; the native scrollend event (where it exists) collects
     immediately; and every candidate must still pass an alignment gate
     (its top edge within a quarter of the viewport) before it may own the
     console. The depart check rides the same rAF-throttled scroll tick —
     reads happen inside the rAF only, never in the raw listener. */

  var SETTLE_MS = 140;      /* scroll silence that counts as rest            */
  var SETTLE_RETRIES = 6;   /* alignment-gate retries before a forced commit  */
  var DEPART_EPS = 0.3;     /* |top| past 30% of the viewport = genuine exit  */
  var SETTLED_EPS = 0.25;   /* |top| within 25% = aligned enough to commit    */
  var settleTimer = 0;
  var settleRetries = 0;
  var departed = false;     /* the settled stage has visibly broken alignment */

  function dispatchStage(name, id) {
    if (typeof CustomEvent === "function") {
      document.dispatchEvent(new CustomEvent(name, { detail: { id: id } }));
    }
  }

  function alignmentRatio(stage) {
    var vh = window.innerHeight || document.documentElement.clientHeight || 1;
    return Math.abs(stage.el.getBoundingClientRect().top) / vh;
  }

  function checkDeparture() {
    if (!activeId || departed) return;
    for (var i = 0; i < stages.length; i++) {
      if (stages[i].id !== activeId) continue;
      if (alignmentRatio(stages[i]) > DEPART_EPS) {
        departed = true;
        dispatchStage("ultron:stagedepart", activeId);
      }
      return;
    }
  }

  function scheduleSettle() {
    if (settleTimer) clearTimeout(settleTimer);
    settleTimer = setTimeout(function () {
      settleTimer = 0;
      trySettle();
    }, SETTLE_MS);
  }

  function trySettle() {
    var stage = resolveActive();
    if (!stage) return;
    if (alignmentRatio(stage) > SETTLED_EPS) {
      /* the snap animation is still carrying the console: keep waiting for
         it (its scroll events re-arm the timer), but never forever — a
         retargeted gesture must still land somewhere. */
      if (++settleRetries <= SETTLE_RETRIES) {
        scheduleSettle();
      } else {
        settleRetries = 0;
        commitActive(stage);
      }
      return;
    }
    settleRetries = 0;
    if (stage.id === activeId) {
      if (departed) {
        /* a pull-away that snapped back home: the stage re-settles where it
           already was — the choreography un-dims it, no stage change. */
        departed = false;
        dispatchStage("ultron:stagesettle", stage.id);
      }
      return;
    }
    commitActive(stage);
  }

  function syncActive(force) {
    var stage = resolveActive();
    if (!stage) return;
    if (!force && stage.id === activeId) return;
    commitActive(stage);
  }

  /* The commit: ONE place flips the tracked id, the spine ticks, and the
     events — label and choreography share a task, never a desync. */
  function commitActive(stage) {
    activeId = stage.id;
    departed = false;
    settleRetries = 0;
    for (var i = 0; i < stages.length; i++) {
      var s = stages[i];
      if (!s.tick) continue;
      if (s.id === activeId) {
        s.tick.classList.add("is-active");
        s.tick.setAttribute("aria-current", "true");
      } else {
        s.tick.classList.remove("is-active");
        s.tick.removeAttribute("aria-current");
      }
    }
    dispatchStage("ultron:stagechange", activeId);
    dispatchStage("ultron:stagesettle", activeId);
  }

  function onScroll() {
    if (scrollRaf) return;
    scrollRaf = window.requestAnimationFrame(function () {
      scrollRaf = 0;
      checkDeparture(); /* the one read, inside the rAF */
    });
    scheduleSettle();
  }

  /* --- Hash deep-links -------------------------------------------------------------- */

  /* Resolves a fragment to a stage: exact id first; a #wall-N beyond the
     live page count (the tier decides how many pages exist) clamps to the
     last wall page. Returns null for foreign fragments. */
  function stageFromHash(hash) {
    if (!hash || hash.charAt(0) !== "#") return null;
    var id = hash.slice(1);
    for (var i = 0; i < stages.length; i++) {
      if (stages[i].id === id) return stages[i];
    }
    if (id === "wall" || /^wall-\d+$/.test(id)) {
      var last = null;
      for (var j = 0; j < stages.length; j++) {
        if (stages[j].id === "wall" || /^wall-\d+$/.test(stages[j].id)) last = stages[j];
      }
      return last; /* clamp: old/deep anchors never break */
    }
    return null;
  }

  /* V4 W2: on phone tiers the wall is ONE stage whose screens live in a
     horizontal pager (js/render.js, window.ULTRON_WALL). A #wall-N deep
     link keeps its screen-level meaning there: N selects the pager page.
     Desktop tiers expose no ULTRON_WALL and the call is a no-op. */
  function syncWallPager(id) {
    if (!window.ULTRON_WALL || typeof window.ULTRON_WALL.goto !== "function") return;
    if (id !== "wall" && !/^wall-\d+$/.test(id)) return;
    var n = id === "wall" ? 1 : parseInt(id.slice(5), 10);
    if (!isNaN(n)) window.ULTRON_WALL.goto(n);
  }

  function navigateHash() {
    var stage = stageFromHash(location.hash);
    if (!stage) return;
    /* The RAW fragment keeps its screen-level meaning through the clamp:
       #wall-4 on a phone tier resolves to the one wall stage but still
       selects pager screen 4 (on desktop tiers there is no pager and the
       call is a no-op). */
    var raw = location.hash.charAt(0) === "#" ? location.hash.slice(1) : "";
    stage.el.scrollIntoView({ block: "start" });
    commitActive(stage);
    syncWallPager(raw || stage.id);
  }

  /* --- Boot + wiring ----------------------------------------------------------------- */

  function stageById(id) {
    for (var i = 0; i < stages.length; i++) {
      if (stages[i].id === id) return stages[i];
    }
    return null;
  }

  function lastWallStage() {
    for (var i = stages.length - 1; i >= 0; i--) {
      if (stages[i].id === "wall" || /^wall-\d+$/.test(stages[i].id)) return stages[i];
    }
    return null;
  }

  function rescan() {
    var keepId = activeId;
    collectStages();
    buildSpine();
    /* Re-pagination (tier change on resize) rebuilt the stage set: keep the
       visitor on their stage — the exact id first, a vanished #wall-N page
       clamping to the wall (the tier decides how many pages exist). The
       explicit re-seat matters: the browser's own post-resize snap
       realignment can otherwise land a stage away from the rebuilt set. */
    var keep = keepId ? stageById(keepId) : null;
    if (!keep && keepId && (keepId === "wall" || /^wall-\d+$/.test(keepId))) {
      keep = lastWallStage();
    }
    if (keep) {
      keep.el.scrollIntoView({ block: "start" });
      commitActive(keep);
    } else {
      syncActive(true);
    }
  }

  function boot() {
    rescan();
    /* A load-time deep link (the browser may or may not have scrolled the
       dynamically rendered page itself): land explicitly, stage-aligned. */
    navigateHash();
    window.addEventListener("scroll", onScroll, { passive: true });
    /* W2: where the engine offers scrollend, the settle collects the moment
       the snap animation finishes instead of waiting out the debounce. The
       event is not targeted at window for element scrollers (the wall pager
       runs its own), but the root scroller's scrollend reaches here. */
    if ("onscrollend" in window) {
      window.addEventListener("scrollend", function () {
        if (settleTimer) {
          clearTimeout(settleTimer);
          settleTimer = 0;
        }
        trySettle();
      });
    }
    window.addEventListener("hashchange", navigateHash);
    /* render.js re-paginated the wall (tier change on resize): rebuild the
       spine from the new page set and re-sync. */
    document.addEventListener("ultron:wallpages", rescan);
    /* Late reflow (fonts settling) can shift stage centers: re-sync once. */
    window.addEventListener("load", function () {
      syncActive(false);
    });
  }

  /* The console's public surface. Defined at SCRIPT EVALUATION time (defer
     runs before any DOMContentLoaded listener), so js/field.js — booting
     later in the same dispatch — can read the tracked stage immediately. */
  window.ULTRON_STAGES = {
    getActiveId: function () {
      return activeId;
    },
    getActive: function () {
      for (var i = 0; i < stages.length; i++) {
        if (stages[i].id === activeId) return stages[i].el;
      }
      return null;
    },
    list: function () {
      return stages.map(function (s) {
        return { id: s.id, label: s.label };
      });
    }
  };

  if (document.readyState === "loading") {
    /* Registered after main/render/motion -> the wall pages exist. */
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
