"use strict";
/* ==========================================================================
   The Ultron Initiative — the living hero field (task V3, IRON MAN + THOR)
   --------------------------------------------------------------------------
   THE FIRST VIEWPORT'S GROUND, ALIVE (surface brief V2 contract, FIRST
   VIEWPORT block: "crimson particle field breathing behind the chrome
   wordmark (canvas, subtle, never obscuring)"; OWN-WORLD: "a canvas-driven
   crimson particle/scan field that lives behind the hero without upstaging
   the wordmark"). One absolutely positioned <canvas id="hero-field">
   (declared in index.html, aria-hidden, pointer-events none) spans the hero
   REGION — document top to the counter band's foot, never the page — and
   paints exactly two registered layers:

     1. THE FIELD — a pooled particle system: crimson embers rising slowly
        with a sinusoidal sway and a per-mote twinkle, plus a minority of
        faint chrome motes. V2-1 deepened the sway amplitude and the
        twinkle depth a shade for the steady state (peaks unchanged; rise
        and recycle cadence untouched — the ground breathes deeper, not
        faster). Palette discipline holds: every color is an rgba
        alpha of the pinned crimson (229,56,59) or chrome (201,211,221) —
        no off-world hue. Slight parallax: the pointer eases a depth-scaled
        few-pixel offset per mote (one passive listener storing two numbers;
        the ease happens inside the existing frame — nothing extra runs).
     2. THE SWEEP — one horizontal luminance band (a prebuilt gradient
        sprite plus a 1px center hairline) traversing top -> bottom every
        ~10.5s (3.2s pass) — and since V2-1, joined mid-cycle by one quiet
        ECHO pass, the heartbeat that keeps the steady state alive: the
        cycle is 3.2s pass, 1.8s dark, a 3.4s echo over the same path at
        0.42x gain, 2.1s dark — darkest gap ~2.1s, so a lingering visitor
        never watches still ground. The echo repeats the SAME scanner
        weaker and lazier (never a second scanner, never a bounce: the
        machine's rhythm stays one voice), inherits the counter-band
        restraint, and never carries the power-on boost. RESTRAINT: one
        orchestrated power-on — js/motion.js calls
        window.ULTRON_FIELD.ignite() when the count-up fires, restarting
        the sweep from the top at 1.45x gain so scan and counters ignite
        as ONE moment; after that the field only breathes (pass + echo).
        Without the call (motion module absent) the sweep runs on its
        natural timer, 1.6s after boot.

   NEVER OBSCURES THE WORDMARK — enforced, not hoped:
   - The wordmark and category line paint ABOVE the canvas (css/styles.css
     section 11: .hero-wordmark/.hero-category z-index 3 over the canvas's
     2), so no particle and no sweep ever tints those letterforms; the field
     is visible in the open ground between and around them.
   - The counter band's clip-path chamfer makes it one atomic stacking unit
     BELOW the canvas, so the sweep is allowed to cross it visibly — the
     band's own numerals sit under the wash for those ~0.9s. Density zoning
     holds the line: full-width y-bands measured at resize carry per-zone
     alpha/size multipliers (wordmark/category band 0.4 / 0.7 — even the
     ground beside the letters stays quiet; counter-band region 0.6 / 0.85
     for dim motes and 0.35 for the bright anchors) and the sweep's gain
     over the band is 0.7 of its ground gain. Worst
     instantaneous case (the power-on wash at full gain under a numeral)
     still measures ~7.5:1 against the 10.43:1 chrome/plate baseline —
     recomputed from rendered canvas pixels in the V3 harness; the floors
     hold with margin. The field is background texture, never content.

   PERFORMANCE (Thor's budget — measured in the V3 harness, numbers logged):
   - ONE rAF loop, delta-time based, clamped at 50ms so a background tab
     cannot teleport the field.
   - ZERO per-frame allocations: a fixed 140-slot object pool, prebuilt
     sprites (ember glow, chrome mote, sweep gradient), number-only math in
     the frame — verified by flat JS heap across a 10s run.
   - The loop STOPS: document.hidden (visibilitychange) and hero scrolled
     out of view (IntersectionObserver on the canvas) each cancel it;
     either condition ending restarts it.
   - devicePixelRatio capped at 2; canvas sized to the hero region ONLY.
   - Adaptive density: 1 mote per 3400 css px^2, clamped to 60-140
     (140 at 1440-wide desktop, 60 at phone widths); ~18% of embers are
     bright slow anchors among dim motes (the visibility spread).

   REDUCED MOTION — NO rAF LOOP AT ALL (documented choice: painted still,
   not the CSS-gradient fallback): the module paints ONE static frame —
   motes at their initial positions, mid-twinkle, no sweep, no parallax —
   and never requests an animation frame; the hero looks complete and
   identical in kind without motion. A live preference switch repaints the
   still (or starts the loop, if the preference lifts).

   PROGRESSIVE ENHANCEMENT: the canvas is declared in markup and NEVER
   initializes without JS — an empty canvas renders nothing, so no-JS keeps
   the static hero (the noscript notice already carries the messaging).
   Log note: canvas exists in the DOM but stays inert when scripting is
   off (choice: markup declaration keeps sizing/CRS auditable in css
   section 11; an inert canvas is transparent).

   LOADING: index.html loads this file (defer) AFTER js/motion.js. The
   count-up's IntersectionObserver can only fire after every DOMContentLoaded
   listener has run, so window.ULTRON_FIELD exists before motion.js can call
   ignite(); the call is existence-guarded anyway.
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
  var MAX_PARTICLES = 140;
  var MIN_PARTICLES = 60;
  var AREA_PER_PARTICLE = 3400;   /* css px^2 per mote at mid widths        */
  var DPR_CAP = 2;
  var SWEEP_TRAVERSE_MS = 3200;   /* one top -> bottom pass                */
  /* V2-1 heartbeat cycle (was 7300ms dead rest -> near-still ground):
     full pass, short dark, ONE quiet echo pass, short dark. The full pass
     keeps its authority (still one event per ~10.5s); the echo cuts the
     darkest silence 7300 -> 2100ms. */
  var SWEEP_PERIOD_MS = 10500;    /* full cycle: pass + echo + both rests  */
  var ECHO_AT_MS = 5000;          /* echo starts 1.8s after the full pass  */
  var ECHO_TRAVERSE_MS = 3400;    /* the echo drifts lazier than the pass  */
  var ECHO_GAIN = 0.42;           /* a quiet breath, not a second scanner  */
  var SWEEP_BAND = 170;           /* css px tall luminance band             */
  var SWEEP_LINE = "rgba(229, 56, 59, 0.36)"; /* the 1px scanner hairline  */
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

  /* --- State ---------------------------------------------------------------- */
  var cssW = 0, cssH = 0, dpr = 1;
  var wmTop = -1, wmBot = -1, catTop = -1, catBot = -1, bandTop = -1;
  var count = 0;
  var raf = 0, last = 0, inView = true;
  var sweepEpoch = -1, powered = false;
  var ptrX = 0, ptrY = 0, ptrTX = 0, ptrTY = 0; /* eased / target, -1..1 */

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
    grad.addColorStop(0, "rgba(229, 56, 59, 0)");
    grad.addColorStop(0.4, "rgba(229, 56, 59, 0.055)");
    grad.addColorStop(0.5, "rgba(229, 56, 59, 0.16)");
    grad.addColorStop(0.6, "rgba(229, 56, 59, 0.055)");
    grad.addColorStop(1, "rgba(229, 56, 59, 0)");
    g.fillStyle = grad;
    g.fillRect(0, 0, 2, h);
    sweepSprite = c;
  }

  /* --- Particle pool (fixed 140 slots, reused forever) ---------------------- */

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
      slot.r = 4 + Math.random() * 4;
      slot.base = 0.24 + Math.random() * 0.26;
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

  /* --- Geometry (measured at resize; full-width y-bands only) --------------- */

  function docTop(node) {
    return node.getBoundingClientRect().top + (window.scrollY || 0);
  }

  function measure() {
    var heroRect = hero.getBoundingClientRect();
    var heroTop = heroRect.top + (window.scrollY || 0);
    var foot = docTop(stats) + stats.getBoundingClientRect().height;
    var heroFoot = heroTop + heroRect.height;
    if (foot < heroFoot) foot = heroFoot; /* degraded stats: stop at hero */

    var oldW = cssW, oldH = cssH;
    cssW = Math.max(1, Math.round(heroRect.width));
    cssH = Math.max(1, Math.round(foot - heroTop));

    /* Inline height extends the canvas past #hero's own box, down to the
       counter band's foot (CSS height:100% is the no-JS fallback). */
    canvas.style.height = cssH + "px";
    dpr = Math.min(window.devicePixelRatio || 1, DPR_CAP);
    canvas.width = Math.round(cssW * dpr);
    canvas.height = Math.round(cssH * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0); /* draw in css px everywhere */

    /* Text zones (canvas-relative y-bands, grown by ZONE_PAD). */
    var wm = document.querySelector(".hero-wordmark");
    var cat = document.querySelector(".hero-category");
    var band = document.querySelector(".stats-band") || stats;
    function bandOf(node) {
      if (!node) return null;
      var r = node.getBoundingClientRect();
      return { top: r.top + (window.scrollY || 0) - heroTop, h: r.height };
    }
    var z = bandOf(wm);
    wmTop = z ? Math.max(0, z.top - ZONE_PAD) : -1;
    wmBot = z ? z.top + z.h + ZONE_PAD : -1;
    z = bandOf(cat);
    catTop = z ? Math.max(0, z.top - ZONE_PAD) : -1;
    catBot = z ? z.top + z.h + ZONE_PAD : -1;
    z = bandOf(band);
    bandTop = z ? Math.max(0, z.top - ZONE_PAD) : -1;

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
      var a = p.base * (0.64 + 0.36 * Math.sin(tSec * p.twF + p.twP)) * mult;
      if (a < 0.02) continue;
      var s = p.r * smult;
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
    if (prefersReducedMotion() || document.hidden || !inView) return;
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

  document.addEventListener("visibilitychange", function () {
    if (document.hidden) stop();
    else start();
  });

  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      inView = entries[entries.length - 1].isIntersecting;
      if (inView) start();
      else stop();
    }, { rootMargin: "60px", threshold: 0 });
    io.observe(canvas);
  }
  /* No IntersectionObserver (ancient engine): inView stays true — the hero
     is the top of the page; the visibilitychange stop still applies. */

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

  /* The ONE orchestration surface (see header; motion.js guards existence). */
  window.ULTRON_FIELD = { ignite: ignite };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
