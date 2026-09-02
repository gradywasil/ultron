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
      V4 W1: the wall is PAGINATED into stage pages (one .wall-grid per
      page); every grid is armed, and a tier-change re-pagination
      (document event "ultron:wallpages" from render.js) re-arms the new
      pages' plates — a rotated or resized console keeps its ignition.

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

   5. WORDMARK GLITCH PULSE (V3-B). "THE ULTRON INITIATIVE" takes the
      glitch the owner approved on day one (PRODUCT.md assembly ledger:
      "scanline/glitch texture") — css/styles.css section 13 carries the
      two aberration copies and the jump-cut keyframes; THIS module owns
      the orchestration: the wordmark arms (.glitch-live) only after the
      count-up's power-on has fully settled (one moment at a time), then
      fires a ~320ms burst (.is-glitch) every 7-10s — randomized
      interval AND randomized entry phase (negative animation-delay per
      layer via --gd-a/--gd-b, so every pulse cuts different slices);
      each burst self-clears ~360ms in. Hover glitches too (CSS-only on
      the armed class). Reduced motion: never arms, and a live switch
      clears the classes (the CSS kill block finishes the job). No-JS:
      neither class ever exists — the clean chrome stamp, forever.

   V3 ORCHESTRATION (the one hook into the sibling hero-field system,
   js/field.js): when the count-up ignites, this module ALSO fires the
   field's power-on sweep (window.ULTRON_FIELD.ignite()) so scan and
   counters light as ONE moment. At DOMContentLoaded this module arms
   the wall + section reveals FIRST (see PROGRESSIVE ENHANCEMENT), so
   the page's opening reads as one continuous power-on: field sweep +
   counting numerals, then the first plates rising at the fold.

   6. STAGE CHOREOGRAPHY (V4 W2 — THE DISAPPEAR/REAPPEAR ILLUSION). When
      js/stages.js is present, the IO-driven scroll ignition of items 2-4
      is REPLACED by stage-driven entry: every stage assembles when it
      SETTLES as the active stage (its plates rising on the same 55ms
      drain, its dedications at 70ms, its frieze nodes sweeping at 60ms —
      the established ignite grammar, staggered only where a sequence
      means something), and every other stage is held RECESSIVE (css
      styles.css section 15: opacity/scale/blur on the stage's content —
      transform/opacity/filter ONLY, never display/visibility, so
      off-stage content never leaves the accessibility tree; the
      persistent canvas field is structurally exempt and never
      transitions). The release BEGINS on "ultron:stagedepart" (visible
      while the old stage still fills the screen) and the assembly lands
      on "ultron:stagesettle" — the same task that flips the spine tick,
      so label and content share one beat. A contentLive flag keeps a
      brief pull-away-and-return from re-striking a stage that never
      left: it simply un-dims (the reappear without a flash). The wall
      PAGER (phone tiers, js/render.js) re-uses the same grammar per
      horizontal page via "ultron:wallpage". The wordmark glitch (item 5)
      holds a suppression window across every swap — one moment at a
      time, still hero-only.

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

   LOADING: index.html loads this file (defer) AFTER js/render.js and
   js/stages.js, BEFORE js/field.js. Defer preserves execution order, so
   the counters and the wall pages exist and the console is already
   tracking a stage by the time this module's init runs (and its
   stage-choreography boot PULLS the active stage rather than waiting for
   the event — see section 6 — so the boot is robust to either module
   evaluating first).
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
    /* V3-B: the wordmark glitch arms once the power-on has fully
       settled — the count-up (~1.1s) plus a beat, so the sweep-and-
       numerals moment stays ONE moment before the wordmark ever speaks.
       Degraded stats (no counters) fall back to init()'s later arm. */
    armWordmarkGlitch(COUNT_DURATION_MS + 1200);
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

  /* ARM the wall's pre-rise offsets — shared by the legacy IO path and the
     W2 stage path. The class exists only to gate the offsets (css section
     12), so re-arming a grid whose plates already rose is a no-op. V4 W2:
     the phone pager's x-pages arm identically (each carries its plates). */
  function armWallGrids() {
    var grids = document.querySelectorAll(".wall-grid, .wall-pager-page");
    for (var i = 0; i < grids.length; i++) grids[i].classList.add("wall-armed");
  }

  function initWallIgnition() {
    /* LEGACY path (js/stages.js absent): every page carries its own
        .wall-grid; arm them all and let the IO own the ignition. */
    var grids = document.querySelectorAll(".wall-grid");
    if (grids.length === 0) return;
    var plates = document.querySelectorAll(".wall-grid .plate");
    if (plates.length === 0) return;

    /* ARM — the only moment any content is offset. Applied HERE, in the
       same DOMContentLoaded task as the render and immediately before the
       observer exists, so a paint can never show risen-then-hidden plates
       (css section 12: the offsets live only under .wall-armed). */
    armWallGrids();

    if (plateIO) plateIO.disconnect();
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

  /* V4 W1: render.js re-paginates the wall on a tier change (resize) and
     announces it as "ultron:wallpages" — the new pages need their arming
     (+, on the stage path, the stage classes a fresh section needs) re-bound.
     The INITIAL dispatch fires from render's own DOMContentLoaded listener
     BEFORE this module's init has chosen its path — motionBooted gates it
     out (init arms everything itself, in the same dispatch, before paint).
     Reduced motion never arms (and if the preference arrives later, the
     live switch below settles everything). */
  var motionBooted = false;
  document.addEventListener("ultron:wallpages", function () {
    if (!motionBooted) return;
    if (prefersReducedMotion()) return;
    if (!("IntersectionObserver" in window)) return;
    if (stageChoreo) {
      armWallGrids();
      eachStage(function (stage) {
        if (stage.classList.contains("stage-armed")) return;
        stage.classList.add("stage-armed");
        stage.classList.add("is-left");
        contentLive[stage.id] = false;
      });
      /* The rebuilt wall DOM must re-assemble — and it must assemble even
         when the console's own wallpages listener (which re-commits the
         active stage and fires its settle) has ALREADY run: listener order
         between the two modules is registration order, not guaranteed
         against this one. PULL: strike the active wall stage now; the
         settle path is idempotent behind the same contentLive flag. */
      var id = window.ULTRON_STAGES && typeof window.ULTRON_STAGES.getActiveId === "function"
        ? window.ULTRON_STAGES.getActiveId()
        : null;
      if (id && isWallStageId(id)) {
        contentLive[id] = false;
        onStageSettle({ detail: { id: id } });
      }
      return;
    }
    initWallIgnition();
  });

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

  /* --- 5. WORDMARK GLITCH PULSE (V3-B) ---------------------------------------- */

  var GLITCH_MIN_MS = 7000;   /* pulse cadence band, randomized per pulse */
  var GLITCH_MAX_MS = 10000;
  var GLITCH_CLEAR_MS = 360;  /* burst class lifetime (~320ms + slack)     */
  var glitchArmed = false;
  var glitchClearTimer = 0;

  /* Fire one burst: re-randomize each layer's entry phase (a negative
     animation-delay inside the 0.32s keyframes — the same cuts land at
     different compositions every pulse), restart the CSS animation
     (class off, forced reflow, class on — one reflow per pulse is the
     whole cost), and self-clear so the base stamp's flare swaps back. */
  /* V4 W2: a stage swap owns the beat — the burst waits the window out and
     retries once the console is at rest (still hero-only by construction:
     the wordmark is only on screen while HERO is the active stage). */
  function fireGlitch(wm) {
    if (nowMs() < suppressGlitchUntil) {
      later(function () { fireGlitch(wm); }, 1200);
      return;
    }
    wm.style.setProperty("--gd-a", (-Math.random() * 0.26).toFixed(3) + "s");
    wm.style.setProperty("--gd-b", (-Math.random() * 0.26).toFixed(3) + "s");
    wm.classList.remove("is-glitch");
    void wm.offsetWidth; /* restart the keyframes                        */
    wm.classList.add("is-glitch");
    if (glitchClearTimer) clearTimeout(glitchClearTimer);
    glitchClearTimer = setTimeout(function () {
      glitchClearTimer = 0;
      wm.classList.remove("is-glitch");
    }, GLITCH_CLEAR_MS);
  }

  function scheduleGlitch(wm) {
    later(function () {
      fireGlitch(wm);
      scheduleGlitch(wm);
    }, GLITCH_MIN_MS + Math.floor(Math.random() * (GLITCH_MAX_MS - GLITCH_MIN_MS)));
  }

  /* Idempotent: the count-up's arm and init()'s degraded fallback race,
     the first one wins. Never arms under reduced motion (re-checked at
     arm time — a switch during the delay lands static). */
  function armWordmarkGlitch(delayMs) {
    if (glitchArmed) return;
    glitchArmed = true;
    var wm = document.querySelector(".hero-wordmark");
    if (!wm) return;
    later(function () {
      if (prefersReducedMotion()) return;
      wm.classList.add("glitch-live"); /* hover glitches from here on     */
      scheduleGlitch(wm);              /* first pulse +7-10s, then cadence */
    }, delayMs);
  }

  /* Reduced-motion switch: strip both classes and kill the pending
     clear (the CSS kill block renders the copies inert regardless).
     V4 W2: also clears a live burst when a stage swap takes the beat. */
  function disarmWordmarkGlitch() {
    var wm = document.querySelector(".hero-wordmark");
    if (wm) {
      wm.classList.remove("is-glitch");
      wm.classList.remove("glitch-live");
    }
    if (glitchClearTimer) {
      clearTimeout(glitchClearTimer);
      glitchClearTimer = 0;
    }
    glitchArmed = true; /* stays disarmed: once per load, no replay      */
  }

  function clearGlitchBurst() {
    var wm = document.querySelector(".hero-wordmark");
    if (wm) wm.classList.remove("is-glitch");
    if (glitchClearTimer) {
      clearTimeout(glitchClearTimer);
      glitchClearTimer = 0;
    }
  }

  /* --- 6. STAGE CHOREOGRAPHY (V4 W2 — the disappear/reappear illusion) ------ */

  var GLITCH_HOLD_MS = 900;   /* no wordmark burst inside a stage swap        */
  var suppressGlitchUntil = 0;
  var stageChoreo = false;    /* the stage-driven path is live                */
  var contentLive = {};       /* stage id -> its content is risen right now   */

  function nowMs() {
    return (window.performance && performance.now) ? performance.now() : Date.now();
  }

  function eachStage(fn) {
    var nodes = document.querySelectorAll(".stage");
    for (var i = 0; i < nodes.length; i++) fn(nodes[i]);
  }

  function isWallStageId(id) {
    return id === "wall" || /^wall-\d+$/.test(id);
  }

  /* The elements that RISE on entry, in strike order. Plates and frieze
     nodes are excluded — they own their staggers below. */
  function stageEnterables(stage) {
    var list = [];
    function push(node) { if (node) list.push(node); }
    if (stage.id === "hero") {
      push(stage.querySelector(".hero-lintel"));
      push(stage.querySelector("#stats"));
    } else if (isWallStageId(stage.id)) {
      push(stage.querySelector(".wall-readout"));
      push(stage.querySelector(".wall-pager-head"));
    } else if (stage.id === "roster") {
      var items = stage.querySelectorAll(".dedication");
      for (var i = 0; i < items.length; i++) push(items[i]);
    } else if (stage.id === "frieze") {
      push(stage.querySelector(".frieze-line"));
    } else if (stage.id === "footer") {
      push(stage.querySelector(".footer-plate"));
      push(stage.querySelector(".archive-anchor"));
    }
    return list;
  }

  function addRisen(node) { node.classList.add("is-risen"); }

  /* Re-strike a rise: strip the entered class, ONE forced reflow so the
     pre-entry offsets exist before the rise starts (never a flash of the
     end state), then land the class in staggered steps. */
  function strikeRise(nodes, stepMs) {
    var live = [];
    for (var i = 0; i < nodes.length; i++) {
      nodes[i].classList.remove("is-risen");
      live.push(nodes[i]);
    }
    if (live.length === 0) return;
    void live[0].offsetHeight;
    for (var j = 0; j < live.length; j++) {
      later(addRisen.bind(null, live[j]), stepMs * j);
    }
  }

  /* The plates' entrance rides the SAME continuous 55ms drain queue the
     legacy path uses — one wave per entering scope, DOM order. */
  function ignitePlates(scope) {
    if (!scope) return;
    var plates = scope.querySelectorAll(".plate");
    if (plates.length === 0) return;
    for (var i = 0; i < plates.length; i++) plates[i].classList.remove("is-risen");
    void plates[0].offsetHeight;
    for (var j = 0; j < plates.length; j++) plateQueue.push(plates[j]);
    if (!plateDraining) drainPlates();
  }

  /* The frieze sweep, re-fired per entry: nodes light in lineage order at
     60ms steps, each flaring (.is-pulse) then settling — one crimson pulse
     traveling the spine every time the frieze reappears. */
  function sweepFrieze(stage) {
    var milestones = stage.querySelectorAll(".milestone");
    if (milestones.length === 0) return;
    for (var i = 0; i < milestones.length; i++) {
      milestones[i].classList.remove("is-lit");
      milestones[i].classList.remove("is-pulse");
    }
    void milestones[0].offsetHeight;
    for (var j = 0; j < milestones.length; j++) {
      later(igniteMilestone.bind(null, milestones[j]), j * STAGGER_MS);
    }
  }

  /* Release an off-screen stage's content back to the pre-entry state
     (no reflow — it is never visible when this runs). */
  function stripStage(stage) {
    var risen = stage.querySelectorAll(".is-risen");
    for (var i = 0; i < risen.length; i++) risen[i].classList.remove("is-risen");
    var band = stage.querySelector(".roster-band.is-ignited");
    if (band) band.classList.remove("is-ignited");
    var lit = stage.querySelectorAll(".milestone.is-lit");
    for (var j = 0; j < lit.length; j++) {
      lit[j].classList.remove("is-lit");
      lit[j].classList.remove("is-pulse");
    }
  }

  /* Reduced motion: the entering stage's FINAL state, synchronously. */
  function forceFinalStage(stage) {
    var enterables = stageEnterables(stage);
    for (var e = 0; e < enterables.length; e++) enterables[e].classList.add("is-risen");
    var plates = stage.querySelectorAll(".plate");
    for (var p = 0; p < plates.length; p++) plates[p].classList.add("is-risen");
    var band = stage.querySelector(".roster-band");
    if (band) band.classList.add("is-ignited");
    var milestones = stage.querySelectorAll(".milestone");
    for (var m = 0; m < milestones.length; m++) milestones[m].classList.add("is-lit");
    contentLive[stage.id] = true;
  }

  function assembleStage(stage) {
    if (stage.id === "hero") {
      strikeRise(stageEnterables(stage), 90); /* lintel, then the counters */
    } else if (isWallStageId(stage.id)) {
      strikeRise(stageEnterables(stage), 0);  /* the readout band            */
      if (window.ULTRON_WALL && typeof window.ULTRON_WALL.current === "function") {
        /* Phone pager: only the screen the visitor is ON ignites. */
        var pages = stage.querySelectorAll(".wall-pager-page");
        var idx = window.ULTRON_WALL.current();
        if (pages.length) {
          ignitePlates(pages[Math.max(0, Math.min(idx, pages.length - 1))]);
        }
      } else {
        ignitePlates(stage);
      }
    } else if (stage.id === "roster") {
      var band = stage.querySelector(".roster-band");
      if (band) {
        band.classList.remove("is-ignited");
        void band.offsetHeight; /* the chip bloom re-strikes with the rise */
        band.classList.add("is-ignited");
      }
      strikeRise(stageEnterables(stage), 70); /* six dedications            */
    } else if (stage.id === "frieze") {
      strikeRise(stageEnterables(stage), 0);  /* the whole line, quietly    */
      sweepFrieze(stage);                     /* then the sweep             */
    } else if (stage.id === "footer") {
      strikeRise(stageEnterables(stage), 90); /* plate, then the archive line */
    }
  }

  function onStageDepart(evt) {
    if (prefersReducedMotion()) return;
    /* One moment at a time: a swap owns the beat — no wordmark burst. */
    suppressGlitchUntil = nowMs() + GLITCH_HOLD_MS;
    clearGlitchBurst();
    var el = document.getElementById(evt && evt.detail ? evt.detail.id : "");
    if (el && el.classList.contains("stage-armed")) {
      el.classList.add("is-left");
      /* W3: the RELEASE visuals (css section 15) ride this TRANSIENT class,
         removed at the following settle — a resting off-stage stage holds
         its pre-entry state (the axe-clean recessive rest), while the
         departing stage dims .2/scale/blur exactly as W2 shipped, while
         still visible. */
      el.classList.add("is-departing");
    }
  }

  function onStageSettle(evt) {
    var el = document.getElementById(evt && evt.detail ? evt.detail.id : "");
    if (!el || !el.classList.contains("stage-armed")) return;
    if (prefersReducedMotion()) {
      el.classList.remove("is-left");
      el.classList.remove("is-departing");
      el.classList.add("is-active");
      forceFinalStage(el);
      return;
    }
    suppressGlitchUntil = nowMs() + GLITCH_HOLD_MS;
    /* Every other stage recedes (and, if its content is still risen, is
       stripped — never visible: it is off-screen by now). */
    eachStage(function (other) {
      if (other === el || !other.classList.contains("stage-armed")) return;
      other.classList.add("is-left");
      other.classList.remove("is-active");
      other.classList.remove("is-departing");
      if (contentLive[other.id]) {
        stripStage(other);
        contentLive[other.id] = false;
      }
    });
    el.classList.remove("is-left");
    el.classList.remove("is-departing");
    el.classList.add("is-active");
    /* A brief pull-away that snapped home needs no re-assembly — the un-dim
       IS the reappear; a struck content set assembles in full grammar. */
    if (contentLive[el.id]) return;
    contentLive[el.id] = true;
    assembleStage(el);
  }

  /* The phone pager's inner page change: the same ignition grammar, scoped
     to the x-page that settled. */
  document.addEventListener("ultron:wallpage", function (evt) {
    if (!stageChoreo || prefersReducedMotion()) return;
    var idx = evt && evt.detail ? evt.detail.index : -1;
    var pages = document.querySelectorAll(".wall-pager-page");
    if (idx >= 0 && idx < pages.length) ignitePlates(pages[idx]);
  });

  function initStageChoreography() {
    stageChoreo = true;
    armWallGrids();
    eachStage(function (stage) {
      stage.classList.add("stage-armed");
      contentLive[stage.id] = false;
    });
    document.addEventListener("ultron:stagedepart", onStageDepart);
    document.addEventListener("ultron:stagesettle", onStageSettle);
    /* ORDER-ROBUST BOOT: with defer every module boots at its own
       evaluation, and stages.js may already have committed the boot stage
       (its initial settle fired before these listeners existed). PULL the
       tracked active stage instead of waiting to be told — whichever
       module evaluated first, the boot stage assembles exactly once. */
    var active = window.ULTRON_STAGES && typeof window.ULTRON_STAGES.getActiveId === "function"
      ? window.ULTRON_STAGES.getActiveId()
      : null;
    if (active) onStageSettle({ detail: { id: active } });
  }

  /* --- REDUCED MOTION / ANCIENT ENGINES --------------------------------------- */

  /* Remove the arming classes so every pre-rise offset vanishes (the
     reduced-motion media query has already killed the transitions).
     V4 W1: every wall PAGE grid, not one. V4 W2: the stage classes go too —
     under reduced motion nothing is ever dimmed, every stage is final, and
     the console swaps by instant snap alone. */
  function disarmIgnition() {
    document.body.classList.remove("motion-armed");
    var grids = document.querySelectorAll(".wall-grid, .wall-pager-page");
    for (var i = 0; i < grids.length; i++) grids[i].classList.remove("wall-armed");
    plateQueue.length = 0;
    plateDraining = false;
    eachStage(function (stage) {
      stage.classList.remove("stage-armed");
      stage.classList.remove("is-left");
      stage.classList.remove("is-departing");
      stage.classList.remove("is-active");
      contentLive[stage.id] = true;
    });
  }

  function igniteAllInstantly() {
    /* Final static state, no timers, no observers, no offsets. */
    clearPending();
    disarmIgnition();
    var plates = document.querySelectorAll(".wall-grid .plate, .wall-pager-page .plate");
    for (var p = 0; p < plates.length; p++) {
      plates[p].classList.add("is-risen");
    }
    var enterables = [];
    eachStage(function (stage) {
      var stageEnter = stageEnterables(stage);
      for (var e = 0; e < stageEnter.length; e++) enterables.push(stageEnter[e]);
    });
    for (var n = 0; n < enterables.length; n++) enterables[n].classList.add("is-risen");
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
    disarmWordmarkGlitch(); /* V3-B: the wordmark settles to its clean stamp */
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
    motionBooted = true;
    collectCounters();
    /* Reduced motion / no IO: touch nothing that hides — A3's final values
       already stand, the static glow states are the end state, no arming
       class is ever added; apply the finals now, instantly. */
    if (prefersReducedMotion() || !("IntersectionObserver" in window)) {
      igniteAllInstantly();
      return;
    }
    /* The count-up keeps its FIRST-VIEW contract under every path: it is
       the hero's power-on, once per load, IO-driven (a #frieze deep link
       still counts when the visitor scrolls home). */
    watchCounterBand();
    if (window.ULTRON_STAGES && typeof window.ULTRON_STAGES.list === "function") {
      /* V4 W2: the console owns the ignition — stages assemble on settle,
         recede on depart (section 6). The legacy IO systems below stay
         for the no-console fallback (stages.js missing: the stacked page). */
      initStageChoreography();
    } else {
      initFriezeSweep();
      initWallIgnition();
      initSectionReveals();
    }
    /* V3-B fallback arm: if the counter band never counts (degraded
       stats), the wordmark still learns to glitch — the power-on that
       gates it is the field's natural first pass (~1.6s + 3.2s), so
       2.6s clears it. Loses the race to runCountUp's arm whenever
       counters exist (arm is idempotent). */
    armWordmarkGlitch(2600);
  }

  if (document.readyState === "loading") {
    /* Registered after main.js + render.js -> data, then render, then motion. */
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
