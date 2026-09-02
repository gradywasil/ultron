"use strict";
/* ==========================================================================
   The Ultron Initiative — the archive's living ground (V3-R ARCHIVE
   IGNITION, task R1; the front page's js/field.js, archive-voiced.
   REFINEMENT R1, 2026-09-02: RAISED TO THE MAIN REGISTER — the critique
   read the original calm tier (~64 motes, one quiet pass) as "faint
   sensor noise," and the owner ruled: one machine, one heartbeat — the
   archive is the same living machine as the monument. This is a
   CALIBRATION to js/field.js's parameters (pool, density, energy,
   heartbeat cadence, restraint discipline), not a rewrite: the archive's
   own architecture below is unchanged.)
   --------------------------------------------------------------------------
   THE READING ROOM'S EMBER FIELD, AT THE MONUMENT'S REGISTER. The front
   page (V4) breathes behind every stage through one persistent canvas;
   the archive now beats with it — an archive-scoped canvas (js/field.js
   itself is read-only and front-page-owned; this is its sibling, written
   for this wing):

     1. THE FIELD — the pooled particle system at field.js's own density
        and energy: crimson embers rising with a sinusoidal sway and a
        per-mote twinkle, plus a minority of faint chrome motes, the
        bright-anchor spread included (a minority of larger, brighter,
        slower embers riding among dim motes — the spread that reads
        ALIVE, not as sensor noise). Every color an rgba alpha of the
        two pins (crimson 229,56,59 / chrome 201,211,221) — the
        Metal-Only Rule holds inside the canvas. Pointer parallax
        (±9/±5px, depth-scaled) matches the console exactly.
     2. THE HEARTBEAT — the same cycle class as the monument (field.js
        V2-1): one full sweep pass (~3.2s), a short dark rest, ONE
        quieter echo pass over the same path (~3.4s, 0.60 gain — a
        second breath of the same scanner, never a second voice), a
        short dark rest, every ~10.5s. The FIRST pass is the archive's
        orchestrated POWER-ON (1.45 boost), lit at first arm together
        with the census count-up: by the console's guarded call when it
        can see this module, else by this module's own boot pull (the
        defer order seats this file LAST, so the console normally arms
        first — the pull closes the gap). An exactly-once latch makes
        the two paths ONE power-on; no path can restart the boost. After
        it, the heartbeat simply runs — the wing never goes quiet again.
        Selections own their OWN power-on (the panel scan,
        css/skills.css) — one moment at a time.

   RESTRAINT IS MEASURED, NOT HOPED (the V3 hero-field precedent, at the
   main sweep grade and a deeper MOTE shade): the header band's text
   lines (wordmark / category / census) sit on ground that shows the
   canvas through the lintel wash, so their measured y-bands carry
   alpha/size multipliers (bright anchors AND chrome motes dim hardest,
   0.24; dim embers 0.32 — the header's lines are 11px micro type, so
   the zones grade deeper than the monument's 66px-wordmark 0.4/0.28)
   and the sweep's gain is reduced to 0.7 across the whole header rect
   (the counter band's own BAND_SWEEP_GAIN grade) — the darkest
   compositing cases (a mote core on the sweep's peak row behind a
   census numeral) stay under the contrast floors (measured on
   composited pixels by the R1 refinement harness; see the production
   log entry). Panel text never touches the canvas at all: the spec
   sheet is an opaque plate above the field, and the rail and footer
   band are opaque chrome — only the header lintel wash shows the
   canvas through.

   ARMING (the archive's own degradation contract): the loop starts ONLY
   when the console is armed — js/skills-console.js adds html.console-
   armed and dispatches "ultron:archivearmed"; this module also pulls the
   class at boot (order-robust, the motion.js pattern). A stacked
   degradation (no-JS, script error, console file absent) never lights a
   single mote: the canvas element ships EMPTY in skills.html and this
   module is its only painter.

   PERFORMANCE (Thor's budget): ONE delta-timed rAF loop (clamped at
   50ms), ZERO per-frame allocations (fixed 170-slot pool, prebuilt
   sprites — the same budget the monument's field holds at 0.17ms avg
   per frame), DPR capped at 2, and the loop stops on document.hidden —
   the console is page-locked, so visibility is the only pause condition.

   REDUCED MOTION — NO rAF LOOP AT ALL: one static painted still (motes
   at their initial positions, mid-twinkle, no sweep, no parallax) and
   never a frame request; a live preference switch repaints the still or
   starts the loop. The census count-up and the panel power-on live in
   js/skills-console.js and carry their own preference gates.
   ========================================================================== */

(function () {
  var reduceMQ = typeof window.matchMedia === "function"
    ? window.matchMedia("(prefers-reduced-motion: reduce)")
    : null;

  /* Safest default for an unknown engine: static (same rule as the
     console enhancer). */
  function prefersReducedMotion() {
    return reduceMQ ? reduceMQ.matches : true;
  }

  var canvas = document.getElementById("archive-field");
  if (!canvas) return; /* markup changed under us: nothing to run */
  var ctx = canvas.getContext && canvas.getContext("2d");
  if (!ctx) return; /* no 2D drawing: leave the empty (invisible) canvas */

  /* --- Constants (R1: the MAIN register — every value aligned to
     js/field.js, the reference implementation; only the zone constants
     keep archive-specific names because the archive's restraint zone is
     one header rect instead of the hero's wordmark/category/band set) --- */
  var MAX_PARTICLES = 170;       /* field.js's own pool ceiling              */
  var MIN_PARTICLES = 64;        /* (was the calm tier's MAX)                */
  var AREA_PER_PARTICLE = 2800;  /* css px^2 per mote — field.js's own area  */
  var DPR_CAP = 2;
  /* The heartbeat cycle (field.js V2-1, verbatim in class): full pass,
     short dark, ONE quiet echo pass, short dark, every ~10.5s. */
  var SWEEP_TRAVERSE_MS = 3200;  /* one top -> bottom pass                   */
  var SWEEP_PERIOD_MS = 10500;   /* full cycle: pass + echo + both rests     */
  var ECHO_AT_MS = 5000;         /* echo starts 1.8s after the full pass     */
  var ECHO_TRAVERSE_MS = 3400;   /* the echo drifts lazier than the pass     */
  var ECHO_GAIN = 0.60;          /* a real breath (field.js V3-B)            */
  var POWER_BOOST = 1.45;        /* the ONE orchestrated power-on pass       */
  var SWEEP_BAND = 190;          /* css px tall luminance band               */
  var SWEEP_LINE = "rgba(229, 56, 59, 0.46)"; /* the 1px scanner hairline   */
  var NATURAL_DELAY_MS = 1600;   /* first pass delay when un-orchestrated    */
  /* Wash stops at field.js's V3-B grades (0.08 shoulders / 0.215 peak);
     the header rect's restraint (HEADER_SWEEP_GAIN, the counter band's
     own 0.7 grade) keeps the darkest compositing case — the census line
     mid-pass — at its measured floor on composited pixels. */
  var HEADER_SWEEP_GAIN = 0.7;   /* sweep restraint across the header rect
                                     (the counter band's own grade)        */
  /* The header's text bands are MICRO type (11px readouts, small-text
     4.5:1) — not the monument's 66px wordmark (large-text 3:1) — so the
     mote zones shade DEEPER than field.js's 0.4/0.28 wordmark grades:
     the stacked worst case (a mote core on the sweep band's peak row
     behind a glyph) was measured at 4.41:1 with the monument's grades
     and holds >= 4.5 only below ~0.33. Chrome motes share the anchor
     grade — they are the brightest per-pixel class. The field's
     open-ground register (what reads alive) is untouched. */
  var ZONE_TEXT_ALPHA = 0.32;    /* header text-band alpha mult, dim embers  */
  var ZONE_TEXT_BRIGHT = 0.24;   /* anchors + chrome motes vanish in-band    */
  var ZONE_TEXT_SIZE = 0.7;
  var ZONE_PAD = 10;             /* px grown around measured text zones      */
  var BRIGHT_SHARE = 0.18;       /* embers that are the visible anchors      */
  var CHROME_SHARE = 0.26;       /* faint chrome motes (field.js's share)    */
  var PARALLAX_X = 9;            /* the console's own parallax reach         */
  var PARALLAX_Y = 5;

  /* --- State ---------------------------------------------------------------- */
  var cssW = 0, cssH = 0, dpr = 1;
  var zones = [];            /* measured header text bands: [{top,bot}]     */
  var headTop = -1, headBot = -1; /* the header rect (sweep restraint)      */
  var count = 0;
  var raf = 0, last = 0;
  var armed = false;
  var ignited = false;       /* the power-on's exactly-once latch           */
  var powered = false;       /* the first pass carries the power-on boost   */
  var sweepEpoch = -1;       /* < 0: never; else the heartbeat's epoch      */
  var ptrX = 0, ptrY = 0, ptrTX = 0, ptrTY = 0; /* eased / target, -1..1     */

  /* --- Sprites (built once; the frame only issues drawImage calls) --------- */

  function radialSprite(size, stops) {
    var c = document.createElement("canvas");
    c.width = size;
    c.height = size;
    var g = c.getContext("2d");
    var grad = g.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
    for (var i = 0; i < stops.length; i += 2) grad.addColorStop(stops[i], stops[i + 1]);
    g.fillStyle = grad;
    g.fillRect(0, 0, size, size);
    return c;
  }

  var emberSprite = radialSprite(64, [
    0, "rgba(229, 56, 59, 0.95)",
    0.3, "rgba(229, 56, 59, 0.34)",
    1, "rgba(229, 56, 59, 0)"
  ]);
  var moteSprite = radialSprite(32, [
    0, "rgba(201, 211, 221, 0.95)",
    0.35, "rgba(201, 211, 221, 0.2)",
    1, "rgba(201, 211, 221, 0)"
  ]);
  var sweepSprite = null; /* rebuilt at measure() — its height follows dpr */

  function buildSweepSprite() {
    var h = Math.max(2, Math.round(SWEEP_BAND * dpr));
    var c = document.createElement("canvas");
    c.width = 2;
    c.height = h;
    var g = c.getContext("2d");
    var grad = g.createLinearGradient(0, 0, 0, h);
    /* field.js's V3-B stops (brighter trail), verbatim. */
    grad.addColorStop(0, "rgba(229, 56, 59, 0)");
    grad.addColorStop(0.4, "rgba(229, 56, 59, 0.08)");
    grad.addColorStop(0.5, "rgba(229, 56, 59, 0.215)");
    grad.addColorStop(0.6, "rgba(229, 56, 59, 0.08)");
    grad.addColorStop(1, "rgba(229, 56, 59, 0)");
    g.fillStyle = grad;
    g.fillRect(0, 0, 2, h);
    sweepSprite = c;
  }

  /* --- Particle pool (fixed 170 slots, reused forever) ----------------------- */

  var pool = [];
  (function seedSlots() {
    for (var i = 0; i < MAX_PARTICLES; i++) {
      pool.push({
        x: 0, y: 0, rise: 0, drift: 0, r: 0, base: 0, bright: 0,
        swA: 0, swF: 0, swP: 0, twF: 0, twP: 0, depth: 0, chrome: 0
      });
    }
  })();

  function reset(slot, spread) {
    var chrome = Math.random() < CHROME_SHARE;
    /* Brightness spread at field.js's own grades: a minority of embers
       are the VISIBLE ANCHORS — larger, brighter, slower — riding among
       dim motes (the spread that reads ALIVE, not sensor noise). Inside
       the header's text bands the anchors dim hardest
       (ZONE_TEXT_BRIGHT): the wing's wordmark stays king. */
    var bright = !chrome && Math.random() < BRIGHT_SHARE;
    slot.chrome = chrome;
    slot.bright = bright;
    slot.x = Math.random() * cssW;
    /* spread: initial fill scatters over the region; recycle re-enters at
       the foot so embers keep drifting UP through the ground. */
    slot.y = spread ? Math.random() * cssH : cssH + 8 + Math.random() * 24;
    if (chrome) {
      slot.rise = 2.5 + Math.random() * 5;
      slot.r = 1.8 + Math.random() * 3;
      slot.base = 0.26 + Math.random() * 0.29;
    } else if (bright) {
      slot.rise = 4 + Math.random() * 4;
      slot.r = 7.5 + Math.random() * 5;
      slot.base = 0.5 + Math.random() * 0.18;
    } else {
      slot.rise = 7 + Math.random() * 12;
      slot.r = 4 + Math.random() * 4;
      slot.base = 0.26 + Math.random() * 0.27;
    }
    slot.drift = (Math.random() - 0.5) * (chrome ? 4 : 6);
    slot.swA = 6 + Math.random() * (bright ? 17 : 13);    /* sway amp, px   */
    slot.swF = (0.05 + Math.random() * 0.1) * Math.PI * 2; /* sway rad/s   */
    slot.swP = Math.random() * Math.PI * 2;
    slot.twF = (0.25 + Math.random() * 0.85) * Math.PI * 2; /* twinkle     */
    slot.twP = Math.random() * Math.PI * 2;
    slot.depth = 0.25 + Math.random() * 0.75;
  }

  function seedPool() {
    for (var i = 0; i < count; i++) reset(pool[i], true);
  }

  /* --- Geometry (measured at resize / arm) -----------------------------------
     Viewport-relative: the console is page-locked (body overflow hidden),
     so getBoundingClientRect() needs no scroll math anywhere. The zones
     are the header band's own text lines; the header rect itself carries
     the sweep's restraint band. */

  function measure() {
    var oldW = cssW, oldH = cssH;
    cssW = Math.max(1, Math.round(
      window.innerWidth || document.documentElement.clientWidth || 0));
    cssH = Math.max(1, Math.round(
      window.innerHeight || document.documentElement.clientHeight || 0));

    dpr = Math.min(window.devicePixelRatio || 1, DPR_CAP);
    canvas.width = Math.round(cssW * dpr);
    canvas.height = Math.round(cssH * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0); /* draw in css px everywhere */

    zones = [];
    headTop = headBot = -1;
    var head = document.getElementById("archive-head");
    if (head) {
      var hr = head.getBoundingClientRect();
      headTop = Math.max(0, hr.top - ZONE_PAD);
      headBot = hr.top + hr.height + ZONE_PAD;
      var lines = [
        head.querySelector(".archive-wordmark"),
        head.querySelector(".archive-category"),
        head.querySelector(".archive-census")
      ];
      for (var i = 0; i < lines.length; i++) {
        if (!lines[i]) continue;
        var r = lines[i].getBoundingClientRect();
        if (r.height < 1) continue; /* display:none tier (census on mobile) */
        zones.push({
          top: Math.max(0, r.top - ZONE_PAD),
          bot: r.top + r.height + ZONE_PAD
        });
      }
    }

    count = Math.round(cssW * cssH / AREA_PER_PARTICLE);
    if (count < MIN_PARTICLES) count = MIN_PARTICLES;
    if (count > MAX_PARTICLES) count = MAX_PARTICLES;

    if (oldW > 0 && oldH > 0) {
      /* Resize, not boot: keep the arrangement, rescaled. */
      var rx = cssW / oldW, ry = cssH / oldH;
      for (var p = 0; p < MAX_PARTICLES; p++) {
        pool[p].x *= rx;
        pool[p].y *= ry;
      }
      for (var j = count; j < MAX_PARTICLES; j++) reset(pool[j], true);
    }

    buildSweepSprite();
  }

  function inZone(y) {
    for (var i = 0; i < zones.length; i++) {
      if (y >= zones[i].top && y <= zones[i].bot) return true;
    }
    return false;
  }

  /* --- Sweep ----------------------------------------------------------------- */

  /* The heartbeat resolver (field.js's own cycle, same class): fills
     swY (band center) + swEcho for this instant, or parks swY off-canvas
     during the two dark rests. Module-scratch only — the frame stays
     allocation-free. */
  var swY = 1e9, swEcho = false;
  function sweepPhase(now) {
    swY = 1e9;
    swEcho = false;
    if (sweepEpoch < 0) return; /* never started: no sweep */
    var t = (now - sweepEpoch) % SWEEP_PERIOD_MS;
    var dur;
    if (t < SWEEP_TRAVERSE_MS) {
      dur = SWEEP_TRAVERSE_MS; /* the full pass */
    } else if (t >= ECHO_AT_MS && t < ECHO_AT_MS + ECHO_TRAVERSE_MS) {
      dur = ECHO_TRAVERSE_MS;  /* the quiet echo, mid-cycle */
      t -= ECHO_AT_MS;
      swEcho = true;
    } else {
      return; /* dark rest */
    }
    swY = -SWEEP_BAND * 0.5 + (t / dur) * (cssH + SWEEP_BAND);
  }

  /* The orchestration hook: js/skills-console.js calls this with the
     census count-up at first arm, and the boot pull below calls it when
     the console armed BEFORE this module evaluated. Exactly-once latch:
     whichever path arrives first spends the page's one POWER-ON — every
     later call (the other path arriving late, a re-render re-arm) is a
     no-op, so the boost can never double-fire or restart. The latch
     guards the BOOST only: after it, the heartbeat runs on its own
     epoch forever (one machine, one heartbeat). Reduced motion: no-op
     (the still never sweeps). */
  function ignite() {
    if (ignited || prefersReducedMotion() || !armed) return;
    ignited = true;
    powered = true;
    sweepEpoch = (window.performance && performance.now) ? performance.now() : Date.now();
  }

  /* --- Frame ------------------------------------------------------------------ */

  function update(dt, tSec) {
    for (var i = 0; i < count; i++) {
      var p = pool[i];
      p.y -= p.rise * dt;
      /* Sway as velocity: the integral keeps POSITION amplitude at swA. */
      p.x += (p.drift + Math.cos(tSec * p.swF + p.swP) * p.swA * p.swF) * dt;
      if (p.y < -12) {
        reset(p, false); /* recycled at the foot, re-rolled — no alloc */
        continue;
      }
      if (p.x < -14) p.x += cssW + 28;
      else if (p.x > cssW + 14) p.x -= cssW + 28;
    }
  }

  function render(now, live) {
    ctx.clearRect(0, 0, cssW, cssH);
    ctx.globalCompositeOperation = "lighter"; /* luminous on near-black */

    if (live) {
      sweepPhase(now);
      if (swY > -SWEEP_BAND && swY < cssH + SWEEP_BAND) {
        /* Echo passes breathe at ECHO_GAIN; only the orchestrated power-on
           pass carries the boost (and the >1 cap holds both to sprite max).
           The header restraint shapes every pass, full or echo — the same
           grade as the monument's counter band (BAND_SWEEP_GAIN). */
        var gain = swEcho ? ECHO_GAIN : (powered ? POWER_BOOST : 1);
        if (headTop >= 0 && swY >= headTop && swY <= headBot) {
          gain *= HEADER_SWEEP_GAIN; /* the header's text holds its floors */
        }
        if (gain > 1) gain = 1;
        ctx.globalAlpha = gain;
        ctx.drawImage(sweepSprite, 0, swY - SWEEP_BAND * 0.5, cssW, SWEEP_BAND);
        ctx.globalAlpha = Math.min(1, gain * 1.0);
        ctx.fillStyle = SWEEP_LINE;
        ctx.fillRect(0, Math.max(0, swY - 0.5), cssW, 1);
      }
      if (sweepEpoch >= 0 &&
          ((now - sweepEpoch) % SWEEP_PERIOD_MS) >= SWEEP_TRAVERSE_MS) {
        powered = false; /* the power-on pass is over: back to the heartbeat */
      }
    }

    var tSec = now / 1000;
    for (var i = 0; i < count; i++) {
      var p = pool[i];
      var mult = 1, smult = 1;
      if (inZone(p.y)) {
        /* The header's lines stay king: bright anchors and chrome motes
           (the brightest per-pixel classes) all but vanish inside the
           text bands; dim embers shade deep — see the constants block
         for why the archive's micro type grades below field.js. */
        mult = (p.bright || p.chrome) ? ZONE_TEXT_BRIGHT : ZONE_TEXT_ALPHA;
        smult = ZONE_TEXT_SIZE;
      }
      var a = p.base * (0.64 + 0.36 * Math.sin(tSec * p.twF + p.twP)) * mult;
      if (a < 0.02) continue;
      var s = p.r * smult;
      var dx = p.x + ptrX * p.depth * PARALLAX_X;
      var dy = p.y + ptrY * p.depth * PARALLAX_Y;
      ctx.globalAlpha = a;
      ctx.drawImage(p.chrome ? moteSprite : emberSprite, dx - s, dy - s, s * 2, s * 2);
    }

    ctx.globalAlpha = 1;
    ctx.globalCompositeOperation = "source-over";
  }

  function frame(now) {
    raf = window.requestAnimationFrame(frame);
    var dt = last === 0 ? 0.016 : Math.min(0.05, (now - last) / 1000);
    last = now;
    ptrX += (ptrTX - ptrX) * Math.min(1, dt * 3);
    ptrY += (ptrTY - ptrY) * Math.min(1, dt * 3);
    update(dt, now / 1000);
    render(now, true);
  }

  function start() {
    if (!armed || prefersReducedMotion() || document.hidden) return;
    if (raf === 0) {
      last = 0;
      raf = window.requestAnimationFrame(frame);
    }
  }

  function stop() {
    if (raf !== 0) {
      window.cancelAnimationFrame(raf);
      raf = 0;
    }
  }

  /* The reduced-motion render: ONE painted still, no loop, ever. */
  function renderStatic() {
    render((window.performance && performance.now) ? performance.now() : Date.now(), false);
  }

  /* --- Arming (the console owns the switch) ----------------------------------
     Pull at boot AND listen for the event — whichever module evaluates
     first, the field lights exactly when the console arms, never on the
     stacked degradation. */

  function lightUp() {
    if (armed) return;
    armed = true;
    measure();
    seedPool();
    if (prefersReducedMotion()) {
      renderStatic(); /* the still: complete ground, zero animation frames */
      return;
    }
    /* Natural (un-orchestrated) heartbeat: if the console's ignite()
       never arrives, the cycle still starts after a short settle (the
       field.js pattern). On the normal path the boot pull below calls
       ignite() in the same tick, which restarts the epoch with the
       power-on boost — one pass, then the plain heartbeat. */
    sweepEpoch = ((window.performance && performance.now) ? performance.now() : Date.now())
      + NATURAL_DELAY_MS;
    start();
  }

  document.addEventListener("ultron:archivearmed", lightUp);

  /* --- Lifetime wiring --------------------------------------------------------- */

  /* PAUSE RULES: tab-hidden stops the loop, returning restarts it (the
     console is page-locked; visibility is the only pause condition). */
  document.addEventListener("visibilitychange", function () {
    if (document.hidden) stop();
    else start();
  });

  function onPointer(e) {
    if (cssW < 1 || cssH < 1) return;
    ptrTX = Math.max(-1, Math.min(1, (e.clientX / cssW) * 2 - 1));
    ptrTY = Math.max(-1, Math.min(1, (e.clientY / cssH) * 2 - 1));
  }
  if ("PointerEvent" in window) {
    window.addEventListener("pointermove", onPointer, { passive: true });
  } else {
    window.addEventListener("mousemove", onPointer, { passive: true });
  }

  var resizeTimer = 0;
  window.addEventListener("resize", function () {
    if (!armed) return;
    if (resizeTimer) clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () {
      resizeTimer = 0;
      measure();
      if (prefersReducedMotion()) renderStatic();
    }, 120);
  });

  if (document.fonts && document.fonts.ready &&
      typeof document.fonts.ready.then === "function") {
    /* Font swap re-wraps the header lines: re-measure the zones once the
       real faces have settled. */
    document.fonts.ready.then(function () {
      if (!armed) return;
      measure();
      if (prefersReducedMotion()) renderStatic();
    });
  }

  function onReduceChange() {
    if (!armed) return;
    if (prefersReducedMotion()) {
      stop();
      renderStatic();
    } else {
      start();
    }
  }
  if (reduceMQ) {
    if (typeof reduceMQ.addEventListener === "function") {
      reduceMQ.addEventListener("change", onReduceChange);
    } else if (typeof reduceMQ.addListener === "function") {
      reduceMQ.addListener(onReduceChange); /* older engines */
    }
  }

  /* --- Boot --------------------------------------------------------------------- */

  /* Order-robust pull: if the console enhancer already armed (its
     DOMContentLoaded listener ran first), light up now; otherwise the
     "ultron:archivearmed" event carries the word. The public surface is
     read by the console's opening moment (guarded there). */
  window.ULTRON_ARCHIVE_FIELD = { ignite: ignite };

  function init() {
    if (document.documentElement.classList.contains("console-armed")) {
      /* The console is defer #4, this file #5: it armed during its own
         defer execution, so its synchronized ignite() call read a
         property that did not exist yet and its "ultron:archivearmed"
         event is long gone. Light up on the class pull and self-trigger
         the SAME pass — a fraction of a script tick behind the census
         count-up that began at arm, which is the synchronization the
         console intended. */
      lightUp();
      ignite();
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
