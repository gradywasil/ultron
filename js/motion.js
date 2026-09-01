"use strict";
/* ==========================================================================
   The Ultron Initiative — motion system (task B5; V4 scroll expansion, THOR)
   --------------------------------------------------------------------------
   ONE orchestrated system, not scattered effects (surface brief: "count-up
   and glow are the two registered effects"; V2 contract: "orchestrated
   grammar (canvas field, count-up, staggered plate ignition on scroll,
   frieze sweep, glow states)"). Everything here animates via textContent /
   class flips + CSS transitions on transform-family / opacity / paint
   properties only — NEVER a layout property (no width / height / margin /
   top / left animation anywhere; the motion budget is enforced in
   css/styles.css sections 7 and 12 and audited by the V4 harness).

   1. COUNT-UP (B5, the first registered moment). On first view of the
      counter band, the numeric monumental numerals — the [data-count]
      hooks A3 left on exactly the numeric counters — count 0 -> N once,
      1.1s, cubic ease-out (decelerate). "∞" carries no hook and renders
      verbatim: it does not count. Values change via textContent only;
      .stat cells are fixed 1fr grid tracks, so no reflow, no shift.

   2. WALL IGNITION (V4 — the second registered moment: "thirteen real
      screens lighting up in sequence as you scroll, the proof made
      visible"). As plates enter the viewport they RISE once —
      translate 0 12px -> none + opacity 0 -> 1 over --dur-rise on
      --ease-ignite — staggered 55ms per plate in DOM (= grid) order.
      A single drain queue keeps the wave continuous: plates entering
      while a drain runs join its tail, so a slow scroll cascades row by
      row and a fast scroll plays the whole power-on at once. Each plate
      is unobserved the moment it fires: once each, ever.

   3. FRIEZE SWEEP (V4 enhancement of B5's node ignition). The lineage
      nodes still take .is-lit in lineage order at 60ms steps as they
      enter view — now each ignition also flares (.is-pulse: the 9px
      diamond briefly scales and its crimson glow blooms) then settles
      to the lit state ~460ms later. Successive flares read as one
      crimson pulse traveling the spine. Paint + transform only.

   4. SECTION REVEALS (V4). The roster band and the footer plate each
      take ONE quiet rise on first view (translate 0 16px -> none +
      opacity, --dur-rise-band — the plates' grammar, larger and
      slower). The roster's rise and its B5 chip-glow ignition
      (.is-ignited) fire as one observer/one moment. The counter band
      and hero already own the power-on — untouched.

   V3 ORCHESTRATION (the one hook into the sibling hero-field system,
   js/field.js): when the count-up ignites, this module ALSO fires the
   field's power-on sweep (window.ULTRON_FIELD.ignite()) so scan and
   counters light as ONE moment. At DOMContentLoaded this module arms
   the wall + section reveals FIRST (see PROGRESSIVE ENHANCEMENT), so
   the page's opening reads as one continuous power-on: field sweep +
   counting numerals, then the first plates rising at the fold.

   PROGRESSIVE ENHANCEMENT — hard rules:
   - NO content is hidden awaiting CSS by default. The pre-rise offsets
     live ONLY under two arming classes this module adds — .wall-armed
     on the wall grid and body.motion-armed — applied immediately
     before their observers start (same DOMContentLoaded task as the
     render, before first paint): no-JS, no-IO, reduced-motion, and
     slow devices never see a flash of hidden content, and the no-JS /
     no-IO page renders every plate, the roster and the footer fully
     visible. Screen readers are never gated either (opacity offsets
     only, no display/visibility).
   - Motion runs only when IntersectionObserver exists AND the user has
     not asked for reduced motion. prefers-reduced-motion is checked live:
     counters are never touched (final values stand), every ignition
     class is applied synchronously (final static glow state, no
     transitions — styles.css sections 7/10/12 also kill the transition
     declarations), the arming classes are REMOVED (any mid-rise offset
     vanishes), and a mid-animation switch settles everything instantly.
   - Runs once per load. No animation library: rAF + IntersectionObserver
     + class flips only. No scroll listeners at all (IO carries every
     scroll behavior), no scroll-jacking, no parallax on text, no
     infinite loops (the hero canvas's breathing field is the one
     exception, and it is V3's, not this file's).

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
    /* V3: the hero field's power-on sweep ignites WITH the count-up — one
       orchestrated moment (see header). Guarded: field module absent ->
       natural timer; reduced motion -> ignite() no-ops itself. */
    if (window.ULTRON_FIELD && typeof window.ULTRON_FIELD.ignite === "function") {
      window.ULTRON_FIELD.ignite();
    }
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

  /* --- 2. WALL IGNITION (V4) ----------------------------------------------- */

  var PLATE_STAGGER_MS = 55;  /* rise step per plate, DOM order (40-70ms band) */
  var plateIO = null;
  var plateQueue = [];        /* pending rises, always kept in DOM order */
  var plateDraining = false;

  /* IO entry order is not guaranteed — restore document order. */
  function domOrder(a, b) {
    return a.compareDocumentPosition(b) & 4 ? -1 : 1; /* a before b */
  }

  /* One continuous wave: drain the queue at PLATE_STAGGER_MS steps; plates
     enqueued while a drain runs join its tail (the wave never restarts,
     never gaps). Timers run through later() so a live reduced-motion
     switch can stop the wave cold. */
  function drainPlates() {
    plateDraining = true;
    var next = plateQueue.shift();
    if (!next) {
      plateDraining = false;
      return;
    }
    next.classList.add("is-risen");
    later(drainPlates, PLATE_STAGGER_MS);
  }

  function initWallIgnition() {
    var grid = document.querySelector(".wall-grid");
    if (!grid) return;
    var plates = grid.querySelectorAll(".plate");
    if (plates.length === 0) return;

    /* ARM — the only moment any content is offset. Applied HERE, in the
       same DOMContentLoaded task as the render and immediately before the
       observer exists, so a paint can never show risen-then-hidden plates
       (css section 12: the offsets live only under .wall-armed). */
    grid.classList.add("wall-armed");

    plateIO = new IntersectionObserver(function (entries) {
      var batch = [];
      for (var i = 0; i < entries.length; i++) {
        if (!entries[i].isIntersecting) continue;
        plateIO.unobserve(entries[i].target); /* once per plate, ever */
        batch.push(entries[i].target);
      }
      if (batch.length === 0) return;
      batch.sort(domOrder);
      for (var j = 0; j < batch.length; j++) plateQueue.push(batch[j]);
      if (!plateDraining) drainPlates();
    }, { threshold: 0.15 });

    for (var k = 0; k < plates.length; k++) plateIO.observe(plates[k]);
  }

  /* --- 3. FRIEZE SWEEP (B5 ignition, V4 pulse) ------------------------------ */

  var STAGGER_MS = 60;   /* lineage-order step between frieze nodes */
  var PULSE_MS = 460;    /* how long each node's flare holds before settling */
  var igniteIO = null;

  /* Light one node AND flare it (.is-pulse: the diamond scales + its glow
     blooms), then settle to the lit state — successive flares 60ms apart
     read as a crimson pulse traveling the spine. */
  function igniteMilestone(node) {
    node.classList.add("is-pulse");
    node.classList.add("is-lit");
    later(function () {
      node.classList.remove("is-pulse");
    }, PULSE_MS);
  }

  function initFriezeSweep() {
    var milestones = document.querySelectorAll("#frieze .milestone");
    if (milestones.length === 0) return;

    /* Nodes light in lineage order, 60ms steps, once each; the pulse rides
       the same stagger. */
    igniteIO = new IntersectionObserver(function (entries) {
      var batch = [];
      for (var i = 0; i < entries.length; i++) {
        if (!entries[i].isIntersecting) continue;
        igniteIO.unobserve(entries[i].target);
        batch.push(entries[i].target);
      }
      if (batch.length === 0) return;
      batch.sort(domOrder);
      for (var j = 0; j < batch.length; j++) {
        later(igniteMilestone.bind(null, batch[j]), j * STAGGER_MS);
      }
    }, { threshold: 0.5 });

    for (var k = 0; k < milestones.length; k++) {
      igniteIO.observe(milestones[k]);
    }
  }

  /* --- 4. SECTION REVEALS (V4) ----------------------------------------------- */

  var revealIO = null;

  function initSectionReveals() {
    var band = document.querySelector(".roster-band");
    var foot = document.querySelector(".footer-plate");
    if (!band && !foot) return;

    /* ARM (same rule as the wall: offsets exist only under this class,
       added here — immediately before the observers start). */
    document.body.classList.add("motion-armed");

    revealIO = new IntersectionObserver(function (entries) {
      for (var i = 0; i < entries.length; i++) {
        if (!entries[i].isIntersecting) continue;
        var target = entries[i].target;
        revealIO.unobserve(target); /* once each, ever */
        target.classList.add("is-risen");
        /* The roster's rise and its B5 chip-glow ignition are ONE moment. */
        if (target === band) target.classList.add("is-ignited");
      }
    }, { threshold: 0.2 });

    if (band) revealIO.observe(band);
    if (foot) revealIO.observe(foot);
  }

  /* --- REDUCED MOTION / ANCIENT ENGINES --------------------------------------- */

  /* Remove the arming classes so every pre-rise offset vanishes (the
     reduced-motion media query has already killed the transitions). */
  function disarmIgnition() {
    document.body.classList.remove("motion-armed");
    var grid = document.querySelector(".wall-grid");
    if (grid) grid.classList.remove("wall-armed");
    plateQueue.length = 0;
    plateDraining = false;
  }

  function igniteAllInstantly() {
    /* Final static state, no timers, no observers, no offsets. */
    clearPending();
    disarmIgnition();
    var plates = document.querySelectorAll("#wall .plate");
    for (var p = 0; p < plates.length; p++) {
      plates[p].classList.add("is-risen");
    }
    var band = document.querySelector(".roster-band");
    if (band) {
      band.classList.add("is-ignited");
      band.classList.add("is-risen");
    }
    var foot = document.querySelector(".footer-plate");
    if (foot) foot.classList.add("is-risen");
    var milestones = document.querySelectorAll("#frieze .milestone");
    for (var i = 0; i < milestones.length; i++) {
      milestones[i].classList.remove("is-pulse");
      milestones[i].classList.add("is-lit");
    }
  }

  /* --- REDUCED-MOTION LIVE SWITCH ------------------------------------------- */

  function onReduceChange() {
    if (!prefersReducedMotion()) return; /* once per load — no replay */
    finalizeCounters(); /* counters snap to their final engraved values */
    igniteAllInstantly();
    if (igniteIO) igniteIO.disconnect();
    if (plateIO) plateIO.disconnect();
    if (revealIO) revealIO.disconnect();
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
    /* Reduced motion / no IO: touch nothing that hides — A3's final values
       already stand, the static glow states are the end state, no arming
       class is ever added; apply the finals now, instantly. */
    if (prefersReducedMotion() || !("IntersectionObserver" in window)) {
      igniteAllInstantly();
      return;
    }
    watchCounterBand();
    initFriezeSweep();
    initWallIgnition();
    initSectionReveals();
  }

  if (document.readyState === "loading") {
    /* Registered after main.js + render.js -> data, then render, then motion. */
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
