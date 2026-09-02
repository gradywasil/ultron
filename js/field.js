"use strict";
/* ==========================================================================
   The Ultron Initiative — the living field (task V3, IRON MAN + THOR;
   V4 W1: the PERSISTENT full-viewport backdrop)
   --------------------------------------------------------------------------
   THE CONSOLE'S GROUND, ALIVE (surface brief V2 contract, FIRST VIEWPORT
   block: "crimson particle field breathing behind the chrome wordmark
   (canvas, subtle, never obscuring)"; OWN-WORLD: "a canvas-driven crimson
   particle/scan field that lives behind the hero without upstaging the
   wordmark"). Since V4 W1 the canvas is POSITION:FIXED and spans the
   VIEWPORT for the whole document (css/styles.css section 14) — behind
   every stage's content, above the ground: the machine stays on while
   stages swap; that continuity is the "no scrolling" illusion. The same
   two registered layers paint as before:

     1. THE FIELD — a pooled particle system: crimson embers rising slowly
        with a sinusoidal sway and a per-mote twinkle, plus a minority of
        faint chrome motes. Palette discipline holds: every color is an
        rgba alpha of the pinned crimson (229,56,59) or chrome
        (201,211,221) — no off-world hue. Slight parallax: the pointer
        eases a depth-scaled few-pixel offset per mote.
     2. THE SWEEP — one horizontal luminance band traversing the viewport
        every ~10.5s heartbeat cycle (pass, dark, quieter echo pass,
        dark), as before. Since the canvas sits BEHIND all stage content,
        the sweep reads only in the open ground between/around stages'
        opaque plates — it can never tint a letterform now; the zone
        multipliers below stay as authored restraint for the hero.

   RESTRAINT IS STAGE-AWARE (V4 W1, pluggable): a zone RESOLVER maps the
   ACTIVE stage (js/stages.js tracking, event "ultron:stagechange") to the
   canvas's density zones. The default: while HERO is the active stage the
   measured wordmark/category/band y-bands carry their V3 alpha/size
   multipliers exactly; on every other stage the field stands CALM — a
   global low-density multiplier (dimmer, slightly smaller motes) so the
   content stages keep the ground breathing without competing. W2's
   choreography can replace the map via window.ULTRON_FIELD.
   setZoneResolver(fn) without touching this module's loop.

   PERFORMANCE (Thor's budget): ONE delta-timed rAF loop (clamped at
   50ms), ZERO per-frame allocations (fixed 170-slot pool, prebuilt
   sprites), DPR capped at 2. PAUSE RULES (V4 W1): the loop stops on
   document.hidden — and no longer on "hero scrolled out of view",
   because the canvas never scrolls anywhere now; it is always on screen,
   so visibility is the only stop.

   REDUCED MOTION — NO rAF LOOP AT ALL: the module paints ONE static
   frame — full viewport since V4 — motes at their initial positions,
   mid-twinkle, no sweep, no parallax, and never requests an animation
   frame. A live preference switch repaints the still (or starts the
   loop, if the preference lifts).

   PROGRESSIVE ENHANCEMENT: the canvas is declared in markup and NEVER
   initializes without JS — an empty canvas renders nothing, so no-JS
   keeps the static page (the noscript notice carries the messaging).

   LOADING: index.html loads this file (defer) AFTER js/stages.js, whose
   DOMContentLoaded boot runs BEFORE this module's — so the active stage
   is already tracked when the first measure() reads the zone resolver.
   js/motion.js's count-up still calls window.ULTRON_FIELD.ignite() for
   the one orchestrated power-on sweep (guarded, order-independent).
   ========================================================================== */

(function () {
  var reduceMQ = typeof window.matchMedia === "function"
    ? window.matchMedia("(prefers-reduced-motion: reduce)")
    : null;

  /* Safest default for an unknown engine: static (same rule as motion.js). */
  function prefersReducedMotion() {
    return reduceMQ ? reduceMQ.matches : true;
  }

  var canvas = document.getElementById("hero-field");
  var hero = document.getElementById("hero");
  var stats = document.getElementById("stats");
  if (!canvas || !hero || !stats || canvas.parentElement !== hero) {
    return; /* markup changed under us: nothing to run, page stays v1-hero */
  }
  var ctx = canvas.getContext && canvas.getContext("2d");
  if (!ctx) return; /* no 2D drawing: leave the empty (invisible) canvas */

  /* --- Constants (all tuning lives here) ----------------------------------- */
  var MAX_PARTICLES = 170;
  var MIN_PARTICLES = 64;
  var AREA_PER_PARTICLE = 2800;   /* css px^2 per mote at mid widths        */
  var DPR_CAP = 2;
  var SWEEP_TRAVERSE_MS = 3200;   /* one top -> bottom pass                */
  /* V2-1 heartbeat cycle (was 7300ms dead rest -> near-still ground):
     full pass, short dark, ONE quiet echo pass, short dark. The full pass
     keeps its authority (still one event per ~10.5s); the echo cuts the
     darkest silence 7300 -> 2100ms. V3-B (bolder) raises the echo's gain
     0.42 -> 0.60 — the echo now reads as a visible second breath of the
     same scanner, not a ghost of it (still no second voice: same path,
     same restraint, lazier traverse). */
  var SWEEP_PERIOD_MS = 10500;    /* full cycle: pass + echo + both rests  */
  var ECHO_AT_MS = 5000;          /* echo starts 1.8s after the full pass  */
  var ECHO_TRAVERSE_MS = 3400;    /* the echo drifts lazier than the pass  */
  var ECHO_GAIN = 0.60;           /* a real breath (was 0.42)              */
  /* V3-B: the sweep band is taller (170 -> 190) and the sprite stops
     brighter — the full pass carries a brighter trail (peak wash alpha
     0.16 -> 0.215, shoulders 0.055 -> 0.08, hairline 0.36 -> 0.46).
     Contrast at the counter band was RE-MEASURED on composited pixels
     with the new band tint + these stops (V3-B harness): numerals and
     labels hold their floors at every residence — see production log. */
  var SWEEP_BAND = 190;           /* css px tall luminance band             */
  var SWEEP_LINE = "rgba(229, 56, 59, 0.46)"; /* the 1px scanner hairline  */
  var NATURAL_DELAY_MS = 1600;    /* first pass delay when un-orchestrated  */
  var POWER_BOOST = 1.45;         /* the ONE orchestrated power-on pass     */
  var BAND_SWEEP_GAIN = 0.7;      /* sweep restraint over the counter band  */
  var ZONE_TEXT_ALPHA = 0.4;      /* wordmark/category y-band alpha mult    */
  var ZONE_TEXT_SIZE = 0.7;
  var ZONE_BAND_ALPHA = 0.6;      /* counter-band region, dim motes         */
  var ZONE_BAND_BRIGHT = 0.35;    /* counter-band region, bright anchors    */
  var ZONE_BAND_SIZE = 0.85;
  var ZONE_PAD = 10;              /* px grown around measured text zones    */
  var BRIGHT_SHARE = 0.18;        /* embers that are the visible anchors    */
  /* V4 W1 — the calm register for non-hero stages: the field keeps
     breathing behind the content stages, dimmer and slightly smaller —
     continuity without competition. W2's choreography owns any richer
     per-stage map (setZoneResolver below). */
  var CALM_ALPHA = 0.55;
  var CALM_SIZE = 0.9;

  /* --- State ---------------------------------------------------------------- */
  var cssW = 0, cssH = 0, dpr = 1;
  var wmTop = -1, wmBot = -1, catTop = -1, catBot = -1, bandTop = -1;
  var calmAlpha = 1, calmSize = 1;
  var count = 0;
  var raf = 0, last = 0;
  var sweepEpoch = -1, powered = false;
  var ptrX = 0, ptrY = 0, ptrTX = 0, ptrTY = 0; /* eased / target, -1..1 */
  /* Pluggable zone source (V4 W1): maps the active stage element to the
     canvas's density zones. Default below; replaceable via
     window.ULTRON_FIELD.setZoneResolver — the frame loop never changes. */
  var zoneResolver = defaultZoneResolver;

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
    /* V3-B stops (brighter trail — see the constants block). */
    grad.addColorStop(0, "rgba(229, 56, 59, 0)");
    grad.addColorStop(0.4, "rgba(229, 56, 59, 0.08)");
    grad.addColorStop(0.5, "rgba(229, 56, 59, 0.215)");
    grad.addColorStop(0.6, "rgba(229, 56, 59, 0.08)");
    grad.addColorStop(1, "rgba(229, 56, 59, 0)");
    g.fillStyle = grad;
    g.fillRect(0, 0, 2, h);
    sweepSprite = c;
  }

  /* --- Particle pool (fixed 170 slots, reused forever) ---------------------- */

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
    var chrome = Math.random() < 0.26 ? 1 : 0;
    /* Brightness spread (the field reads ALIVE, not as sensor noise): a
       minority of embers are the VISIBLE ANCHORS — larger, brighter, slower
       — riding among dim motes. Over the counter band the anchors dim
       hardest (ZONE_BAND_BRIGHT): the monument's numerals stay king. */
    var bright = !chrome && Math.random() < BRIGHT_SHARE;
    slot.chrome = chrome;
    slot.bright = bright;
    slot.x = Math.random() * cssW;
    /* spread: initial fill scatters over the region; recycle re-enters at
       the foot so embers keep RISING through the field. */
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
      /* V3-B: dim motes brighten a shade (0.24+0.26 -> 0.26+0.27) — the
         embers now swim in the hero's visible crimson light (css section
         1's wash) and carry enough presence to read against it. Peaks of
         the dim class stay under the bright anchors' floor. */
      slot.r = 4 + Math.random() * 4;
      slot.base = 0.26 + Math.random() * 0.27;
    }
    slot.drift = (Math.random() - 0.5) * (chrome ? 4 : 6);
    /* V2-1: floor +1px, ceilings +2 — the drift breathes a shade deeper
       at rest. Amplitude only: rise/recycle speeds untouched, so the
       field's calibrated calm (how fast the ground renews) is unchanged. */
    slot.swA = 6 + Math.random() * (bright ? 17 : 13);   /* sway amp, px   */
    slot.swF = (0.05 + Math.random() * 0.1) * Math.PI * 2; /* sway rad/s   */
    slot.swP = Math.random() * Math.PI * 2;
    slot.twF = (0.25 + Math.random() * 0.85) * Math.PI * 2; /* twinkle rad/s */
    slot.twP = Math.random() * Math.PI * 2;
    slot.depth = 0.25 + Math.random() * 0.75;
  }

  function seedPool() {
    for (var i = 0; i < count; i++) reset(pool[i], true);
  }

  /* --- Geometry (measured at resize / stage change) -------------------------- */

  /* The default zone map (V4 W1's "simplest correct" source, pluggable):
     HERO active -> the measured wordmark/category/band y-bands carry the
     authored V3 restraint; any other stage (or an unknown tracker) -> the
     calm register, one global multiplier. Coordinates are VIEWPORT-relative
     because the canvas is fixed — no scroll offsets anywhere. */
  function defaultZoneResolver(active) {
    if (active && active.id !== "hero") {
      return { calm: true };
    }
    return {
      wm: rectOf(document.querySelector(".hero-wordmark")),
      cat: rectOf(document.querySelector(".hero-category")),
      band: rectOf(document.querySelector(".stats-band") || document.getElementById("stats"))
    };
  }

  function rectOf(node) {
    if (!node) return null;
    var r = node.getBoundingClientRect();
    return { top: r.top, h: r.height };
  }

  function applyZones(z) {
    wmTop = wmBot = catTop = catBot = bandTop = -1;
    calmAlpha = 1;
    calmSize = 1;
    if (!z) return;
    if (z.calm) {
      calmAlpha = CALM_ALPHA;
      calmSize = CALM_SIZE;
      return;
    }
    if (z.wm) {
      wmTop = Math.max(0, z.wm.top - ZONE_PAD);
      wmBot = z.wm.top + z.wm.h + ZONE_PAD;
    }
    if (z.cat) {
      catTop = Math.max(0, z.cat.top - ZONE_PAD);
      catBot = z.cat.top + z.cat.h + ZONE_PAD;
    }
    if (z.band) {
      bandTop = Math.max(0, z.band.top - ZONE_PAD);
    }
  }

  function activeStageEl() {
    if (window.ULTRON_STAGES && typeof window.ULTRON_STAGES.getActive === "function") {
      return window.ULTRON_STAGES.getActive();
    }
    return null;
  }

  /* The canvas covers the viewport, permanently: sizing follows the window,
    and the zones follow the ACTIVE stage (js/stages.js). */
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

    applyZones(zoneResolver(activeStageEl()));

    count = Math.round(cssW * cssH / AREA_PER_PARTICLE);
    if (count < MIN_PARTICLES) count = MIN_PARTICLES;
    if (count > MAX_PARTICLES) count = MAX_PARTICLES;

    if (oldW > 0 && oldH > 0) {
      /* Resize, not boot: keep the field's arrangement, rescaled. */
      var rx = cssW / oldW, ry = cssH / oldH;
      for (var i = 0; i < MAX_PARTICLES; i++) {
        pool[i].x *= rx;
        pool[i].y *= ry;
      }
      for (var j = count; j < MAX_PARTICLES; j++) reset(pool[j], true);
    }

    buildSweepSprite();
  }

  /* --- Sweep ----------------------------------------------------------------- */

  /* The heartbeat resolver: fills swY (band center) + swEcho for this
     instant, or parks swY off-canvas during the two dark rests. Fills
     module-scratch only — the frame stays allocation-free. */
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

  /* The orchestration hook: motion.js calls this exactly once, when the
     count-up ignites. Reduced motion: no-op (the still never sweeps). */
  function ignite() {
    if (prefersReducedMotion()) return;
    sweepEpoch = (window.performance && performance.now) ? performance.now() : Date.now();
    powered = true;
  }

  /* --- Frame ------------------------------------------------------------------ */

  function update(dt, tSec) {
    for (var i = 0; i < count; i++) {
      var p = pool[i];
      p.y -= p.rise * dt;
      /* Sway as velocity: integral keeps the POSITION amplitude at swA. */
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
           The band restraint shapes every pass, full or echo. */
        var gain = swEcho ? ECHO_GAIN : (powered ? POWER_BOOST : 1);
        if (bandTop >= 0 && swY >= bandTop) gain *= BAND_SWEEP_GAIN;
        if (gain > 1) gain = 1;
        ctx.globalAlpha = gain;
        ctx.drawImage(sweepSprite, 0, swY - SWEEP_BAND * 0.5, cssW, SWEEP_BAND);
        ctx.globalAlpha = Math.min(1, gain * 1.0);
        ctx.fillStyle = SWEEP_LINE;
        ctx.fillRect(0, Math.max(0, swY - 0.5), cssW, 1);
      }
      if (((now - sweepEpoch) % SWEEP_PERIOD_MS) >= SWEEP_TRAVERSE_MS) {
        powered = false; /* the power-on pass is over: back to quiet */
      }
    }

    var tSec = now / 1000;
    for (var i = 0; i < count; i++) {
      var p = pool[i];
      var mult = 1, smult = 1;
      if ((wmTop >= 0 && p.y >= wmTop && p.y <= wmBot) ||
          (catTop >= 0 && p.y >= catTop && p.y <= catBot)) {
        /* The wordmark stays king: bright anchors all but vanish inside
           the text bands (they re-emerge in the open ground above/below). */
        mult = p.bright ? 0.28 : ZONE_TEXT_ALPHA;
        smult = ZONE_TEXT_SIZE;
      } else if (bandTop >= 0 && p.y >= bandTop) {
        /* Bright anchors dim hardest crossing the monument's band. */
        mult = p.bright ? ZONE_BAND_BRIGHT : ZONE_BAND_ALPHA;
        smult = ZONE_BAND_SIZE;
      }
      /* V2-1: 0.64 ± 0.36 (was 0.68 ± 0.32) — deeper twinkle troughs make
         the rest read alive; the modulation PEAK stays exactly 1.0, so
         per-mote peak brightness (and every contrast ceiling) is
         unchanged — only the dark phase of each breath deepened. */
      var a = p.base * (0.64 + 0.36 * Math.sin(tSec * p.twF + p.twP)) * mult * calmAlpha;
      if (a < 0.02) continue;
      var s = p.r * smult * calmSize;
      var dx = p.x + ptrX * p.depth * 9;
      var dy = p.y + ptrY * p.depth * 5;
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
    ptrX += (ptrTX - ptrX) * Math.min(1, dt * 3.5);
    ptrY += (ptrTY - ptrY) * Math.min(1, dt * 3.5);
    update(dt, now / 1000);
    render(now, true);
  }

  function start() {
    /* V4 W1: no off-screen stop — the canvas is fixed and always on screen;
       document.hidden is the only pause condition left (see wiring below). */
    if (prefersReducedMotion() || document.hidden) return;
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

  /* --- Lifetime wiring --------------------------------------------------------- */

  /* PAUSE RULES (V4 W1): tab-hidden stops the loop, returning restarts it.
     The V3 hero-offscreen IntersectionObserver is GONE — the canvas is a
     fixed full-viewport backdrop and never scrolls out of view. */
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
    if (resizeTimer) clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () {
      resizeTimer = 0;
      measure();
      if (prefersReducedMotion()) renderStatic();
    }, 120);
  });

  /* V4 W1: the zone source follows the console — a stage change re-measures
     (the active stage's text blocks moved), and a wall re-pagination
     (render.js tier change) re-measures too. Cheap: a few rects, no
     allocations, and under reduced motion the still is simply repainted. */
  document.addEventListener("ultron:stagechange", function () {
    measure();
    if (prefersReducedMotion()) renderStatic();
  });
  document.addEventListener("ultron:wallpages", function () {
    measure();
    if (prefersReducedMotion()) renderStatic();
  });

  if (document.fonts && document.fonts.ready &&
      typeof document.fonts.ready.then === "function") {
    /* Font swap re-wraps the wordmark: re-measure the text zones once the
       real faces have settled (resize math keeps the field's arrangement). */
    document.fonts.ready.then(function () {
      measure();
      if (prefersReducedMotion()) renderStatic();
    });
  }

  function onReduceChange() {
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

  function init() {
    measure();
    seedPool();
    if (prefersReducedMotion()) {
      renderStatic(); /* the still: complete hero, zero animation frames */
      return;
    }
    /* Natural (un-orchestrated) cycle starts after a short settle; if
       motion.js ignites the power-on first, ignite() restarts the epoch. */
    sweepEpoch = ((window.performance && performance.now) ? performance.now() : Date.now())
      + NATURAL_DELAY_MS;
    start();
  }

  /* The orchestration surfaces (see header; motion.js guards existence).
     setZoneResolver (V4 W1): the pluggable restraint map — fn(activeElement)
     returns either { calm: true } or { wm, cat, band } rect specs
     ({ top, h }, viewport coordinates). W2's choreography can install a
     richer per-stage map without touching the loop. */
  window.ULTRON_FIELD = {
    ignite: ignite,
    setZoneResolver: function (fn) {
      if (typeof fn === "function") zoneResolver = fn;
      else zoneResolver = defaultZoneResolver;
      measure();
      if (prefersReducedMotion()) renderStatic();
    }
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
