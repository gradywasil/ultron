"use strict";
/* ==========================================================================
   The Ultron Initiative — motion system (task B5, THOR lane)
   --------------------------------------------------------------------------
   ONE orchestrated system, not scattered effects (surface brief: "count-up
   and glow are the two registered effects"). Everything here animates via
   textContent / class flips + CSS transitions on transform / box-shadow /
   color properties only — NEVER a layout property (no width / height /
   margin / top / left animation anywhere; the motion budget is enforced in
   css/styles.css section 7 and audited by the B5 harness).

   1. COUNT-UP (the memorable moment). On first view of the counter band,
      the numeric monumental numerals — the [data-count] hooks A3 left on
      exactly the numeric counters — count 0 -> N once, 1.1s, cubic
      ease-out (decelerate). "∞" carries no hook and renders verbatim: it
      does not count. Values change via textContent only; .stat cells are
      fixed 1fr grid tracks, so no reflow, no shift.

   2. GLOW IGNITION (one-time, scroll-orchestrated, never looped):
      - frieze nodes (.milestone) take .is-lit in lineage order as they
        enter the viewport, staggered 60ms per step (B4's marker);
      - the roster band takes .is-ignited once when it first enters view,
        raising the lit mode diamonds' glow (B4's marker) with a 60ms
        step between the two lit chips (css transition-delay).
      Plate hover glow + footer-link underline/glow are pure CSS
      transitions (section 7) — they need no JS and fire only on intent.

   PROGRESSIVE ENHANCEMENT — hard rules:
   - NO content is hidden awaiting JS. A3 renders counter values FINAL at
     DOMContentLoaded; this module only replays them. Frieze nodes and
     mode chips are fully readable before ignition. With JS disabled the
     page is static and complete; hover glow still works (CSS only).
   - Motion runs only when IntersectionObserver exists AND the user has
     not asked for reduced motion. prefers-reduced-motion is checked live:
     counters are never touched (final values stand), every ignition class
     is applied synchronously (final static glow state, no transitions —
     styles.css section 7 also kills the transition declarations), and a
     mid-animation switch settles everything instantly.
   - Runs once per load. No animation library: rAF + IntersectionObserver
     + class flips only. No scroll-jacking, no parallax, no reveals —
     nothing is ever hidden behind an entrance animation.

   LOADING: index.html loads this file (defer) AFTER js/render.js. Defer
   preserves execution order, so the counters exist by the time this
   module's DOMContentLoaded listener runs (same dispatch as the render).
   ========================================================================== */

(function () {
  var reduceMQ = typeof window.matchMedia === "function"
    ? window.matchMedia("(prefers-reduced-motion: reduce)")
    : null;

  /* Safest default for an unknown engine: static. */
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

  /* --- 1. COUNT-UP --------------------------------------------------------- */

  var COUNT_DURATION_MS = 1100; /* budget: <= 1.2s, once per load */
  var counters = [];            /* { node, target, finalText } */

  function collectCounters() {
    var nodes = document.querySelectorAll("#stats .stat-value[data-count]");
    for (var i = 0; i < nodes.length; i++) {
      var n = nodes[i];
      counters.push({
        node: n,
        target: parseInt(n.getAttribute("data-count"), 10) || 0,
        finalText: n.textContent
      });
    }
  }

  /* Decelerate: cubic ease-out — fast ignition, long settle. */
  function easeOutCubic(t) {
    return 1 - (1 - t) * (1 - t) * (1 - t);
  }

  function runCountUp() {
    var start = 0;
    function frame(now) {
      if (start === 0) start = now;
      var t = (now - start) / COUNT_DURATION_MS;
      if (t >= 1 || prefersReducedMotion()) {
        finalizeCounters();
        return;
      }
      var eased = easeOutCubic(t);
      for (var i = 0; i < counters.length; i++) {
        var c = counters[i];
        c.node.textContent = String(Math.round(eased * c.target));
      }
      window.requestAnimationFrame(frame);
    }
    window.requestAnimationFrame(frame);
  }

  function finalizeCounters() {
    for (var i = 0; i < counters.length; i++) {
      counters[i].node.textContent = counters[i].finalText;
    }
  }

  function watchCounterBand() {
    var band = document.querySelector("#stats .stats-band");
    if (!band || counters.length === 0) return; /* nothing to count */
    if (!("IntersectionObserver" in window)) {
      runCountUp(); /* ancient engine: the band is first-viewport anyway */
      return;
    }
    var countIO = new IntersectionObserver(function (entries) {
      for (var i = 0; i < entries.length; i++) {
        if (!entries[i].isIntersecting) continue;
        countIO.disconnect();
        /* Re-check the live preference at ignition time. */
        if (prefersReducedMotion()) { finalizeCounters(); return; }
        runCountUp();
        return;
      }
    }, { threshold: 0.5 });
    countIO.observe(band);
  }

  /* --- 2. ONE-TIME SCROLL IGNITION ----------------------------------------- */

  var STAGGER_MS = 60; /* lineage-order step between frieze nodes */
  var igniteIO = null;

  function igniteAllInstantly() {
    /* Final static state, no timers, no observers. */
    clearPending();
    var band = document.querySelector(".roster-band");
    if (band) band.classList.add("is-ignited");
    var milestones = document.querySelectorAll("#frieze .milestone");
    for (var i = 0; i < milestones.length; i++) {
      milestones[i].classList.add("is-lit");
    }
  }

  function initIgnition() {
    var milestones = document.querySelectorAll("#frieze .milestone");
    var band = document.querySelector(".roster-band");

    if (prefersReducedMotion() || !("IntersectionObserver" in window)) {
      igniteAllInstantly();
      return;
    }

    /* Frieze nodes: ignite in lineage order, 60ms steps, once each. */
    igniteIO = new IntersectionObserver(function (entries) {
      var batch = [];
      for (var i = 0; i < entries.length; i++) {
        if (!entries[i].isIntersecting) continue;
        igniteIO.unobserve(entries[i].target);
        batch.push(entries[i].target);
      }
      if (batch.length === 0) return;
      /* IO entry order is not guaranteed — restore lineage order. */
      batch.sort(function (a, b) {
        return a.compareDocumentPosition(b) & 4 ? -1 : 1; /* a before b */
      });
      for (var j = 0; j < batch.length; j++) {
        later(batch[j].classList.add.bind(batch[j].classList, "is-lit"), j * STAGGER_MS);
      }
    }, { threshold: 0.5 });

    for (var k = 0; k < milestones.length; k++) {
      igniteIO.observe(milestones[k]);
    }

    /* Roster band: one ignition class; CSS raises the lit diamonds
       (60ms step between the two lit chips via transition-delay). */
    if (band) {
      var bandIO = new IntersectionObserver(function (entries) {
        for (var i = 0; i < entries.length; i++) {
          if (!entries[i].isIntersecting) continue;
          bandIO.disconnect();
          band.classList.add("is-ignited");
          return;
        }
      }, { threshold: 0.35 });
      bandIO.observe(band);
    }
  }

  /* --- REDUCED-MOTION LIVE SWITCH ------------------------------------------- */

  function onReduceChange() {
    if (!prefersReducedMotion()) return; /* once per load — no replay */
    finalizeCounters(); /* counters snap to their final engraved values */
    igniteAllInstantly();
    if (igniteIO) igniteIO.disconnect();
  }
  if (reduceMQ) {
    if (typeof reduceMQ.addEventListener === "function") {
      reduceMQ.addEventListener("change", onReduceChange);
    } else if (typeof reduceMQ.addListener === "function") {
      reduceMQ.addListener(onReduceChange); /* older engines */
    }
  }

  /* --- BOOT ------------------------------------------------------------------ */

  function init() {
    collectCounters();
    /* Reduced motion: touch nothing — A3's final values already stand and
       the static glow states are the end state; apply it now, instantly. */
    if (prefersReducedMotion()) {
      igniteAllInstantly();
      return;
    }
    watchCounterBand();
    initIgnition();
  }

  if (document.readyState === "loading") {
    /* Registered after main.js + render.js -> data, then render, then motion. */
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
