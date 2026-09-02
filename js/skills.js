"use strict";
/* ==========================================================================
   The Ultron Initiative — skills-archive render pipeline (V3 THE ARCHIVE,
   task S2). The archive page's mirror of js/render.js.

   --------------------------------------------------------------------------
   LOADING (skills.html, task S3's build — the S3 CONTRACT)

   <link rel="stylesheet" href="css/tokens.css">
   <link rel="stylesheet" href="css/skills.css">        (S3's own sheet)
   <script src="data/skills.js" defer></script>
   <script src="js/skills-loader.js" defer></script>
   <!-- S2 render pipeline: defer keeps order data -> loader -> renderer. -->
   <script src="js/skills.js" defer></script>

   Defer preserves execution order: data/skills.js assigns the raw globals,
   js/skills-loader.js validates them and stashes the clean view on
   window.ULTRON_SKILLS_DATA, then this file renders ONLY from that view —
   never the raw ULTRON_FAMILY / ULTRON_PIPELINE / ULTRON_HEROES globals.
   Both JS files register a DOMContentLoaded listener; listeners fire in
   registration order, so validation always completes before rendering.
   The page never loads js/main.js / js/render.js — this pair is their
   page-scoped twin (S2 rule: additive new files, no shared-file edits).

   --------------------------------------------------------------------------
   MOUNTS + CLASS HOOKS (what S3 must provide and may style)

   DATA-DRIVEN MOUNTS (empty/invalid group -> .empty-state, never blank):
   - #skills-family   <- ULTRON_SKILLS_DATA.family   (6, one
     article.family-member per coordinator; id="skill-<id>" +
     data-skill="<id>")
   - #skills-pipeline <- ULTRON_SKILLS_DATA.pipeline (8, one
     li.pipeline-stage per phase skill; id="skill-<id>" +
     data-skill="<id>")
   - #skills-heroes   <- ULTRON_SKILLS_DATA.heroes   (13, one
     article.hero per hero; id="hero-<id>" + data-hero="<id>")
   NOTE the prefix split: "avengers-assemble" exists in BOTH the pipeline
   and heroes groups, so entry anchors are prefixed ("skill-" / "hero-")
   to stay unique. Lists: family/heroes -> div.family-grid /
   div.heroes-grid; pipeline -> ol.pipeline-line (phase order reads as a
   sequence).

   Element anatomy per entry (all stable styling hooks for S3's sheet):
   family-member: h3.family-name, p.family-mode (autonomy_level;
     carries data-mode="<first token, lowercased>" — gated / delegated /
     autonomous / deadline-driven / mode-dependent — a styling hook ONLY,
     the full label stays the text), p.family-essence, then labeled
     blocks div.field.field-how / .field-gates / .field-when, each
     holding h4.field-heading + p.field-text.
   pipeline-stage: h3.pipeline-name, p.pipeline-role (standfirst),
     div.field.field-how (h4.field-heading + p.field-text).
   hero: h3.hero-name, p.hero-lens (standfirst), div.field.field-what
     and div.field.field-calls (h4.field-heading + p.field-text), then
     blockquote.hero-signature (the verified quote). When
     when_ultron_calls_it is null (retro), field-calls renders
     p.field-text.hero-calls-none with the quiet NO_INVOCATION constant.

   CONSTANT-DRIVEN COPY (the js/render.js ROSTER/FOOTER rule): section
   headings (SECTION_HEADINGS) and field labels (FIELD_LABELS) are static
   structural copy that ships with the renderer — the data files carry
   only the factual groups. UNLIKE render.js this h2.section-heading is
   meant to be VISIBLE (a documentation page names its parts): S3's sheet
   styles it; render.js's "visually-hidden" class is deliberately NOT
   baked in, and S3 may add its own hiding rule if the design wants it.
   Heading hierarchy for D1 bars: h2 (section) -> h3 (entry) -> h4
   (labeled field blocks) — a clean outline at every mount.

   HOOKS FOR LATER TASKS:
   - C1/D1: every degraded mount renders <p class="empty-state"
     role="status"> naming problem and recovery (S3 styles the plate).
   - Re-render/test hook: window.ULTRON_SKILLS_RENDER() re-runs the whole
     pipeline from the current window.ULTRON_SKILLS_DATA (idempotent;
     used by the disposable validation harness, harmless in production).

   Rendering is semantic and token-only: this file adds NO styles and NO
   content beyond the documented constants. All data-derived text is set
   via textContent — never innerHTML — so a hostile data file cannot
   inject markup.
   ========================================================================== */

(function () {
  /* --- Static structural copy (see header: CONSTANT-DRIVEN COPY) --------- */

  var SECTION_HEADINGS = {
    family: "The coordinators",
    pipeline: "The pipeline",
    heroes: "The heroes"
  };

  var FIELD_LABELS = {
    how: "How it works",
    gates: "Halts and gates",
    when: "When to reach for it",
    what: "What it does",
    calls: "When ultron calls it"
  };

  /* The quiet passage for the one nullable field: a hero no family source
     invokes. States the absence as recorded fact — never a guess. */
  var NO_INVOCATION =
    "No invocation point recorded — absent in every ultron-family source, kept as a null rather than guessed.";

  /* --- Small helpers (render.js's, mirrored) ------------------------------ */

  /* createElement + class + text in one call. Text ALWAYS via textContent. */
  function el(tag, className, text) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined && text !== null) node.textContent = String(text);
    return node;
  }

  /* Degraded-mount element: one line, names problem + recovery. Styling is
     S3's job; the class + role are the contract (render.js's emptyState). */
  function emptyState(message) {
    var p = el("p", "empty-state", message);
    p.setAttribute("role", "status");
    return p;
  }

  /* Section heading per mount — prepended BEFORE the empty-state check so a
     degraded section still has its outline entry (D1). Visible by design on
     this surface; see header. */
  function sectionHeading(text) {
    return el("h2", "section-heading", text);
  }

  /* One labeled field block: div.field(.modifier) > h4.field-heading +
     p.field-text. The modifiers (field-how / field-gates / field-when /
     field-what / field-calls) are S3's per-block styling hooks. */
  function fieldBlock(modifier, label, text, textClass) {
    var block = el("div", "field " + modifier);
    block.appendChild(el("h4", "field-heading", label));
    block.appendChild(el("p", textClass || "field-text", text));
    return block;
  }

  /* data-mode styling hook: the autonomy label's first whitespace-delimited
     token, lowercased ("gated", "delegated", "autonomous", "deadline-
     driven", "mode-dependent"). Hook only — the full label is the text. */
  function modeHook(autonomyLevel) {
    var first = String(autonomyLevel).split(/\s+/)[0];
    return first ? first.toLowerCase() : "";
  }

  function mount(id) {
    var node = document.getElementById(id);
    if (!node) {
      console.warn("[ultron skills] mount #" + id + " not found — section skipped");
    }
    return node;
  }

  /* --- Section renderers --------------------------------------------------- */

  /* #skills-family — one article.family-member per valid coordinator, in
     data order (the lineage order of data/skills.js). */
  function renderFamily(mountNode, family) {
    mountNode.textContent = "";
    mountNode.appendChild(sectionHeading(SECTION_HEADINGS.family));
    if (!Array.isArray(family) || family.length === 0) {
      mountNode.appendChild(emptyState(
        "The family wing stands empty — data/skills.js holds no valid family entries. Add an entry that satisfies the schema at the top of that file, and the coordinators take the wall."
      ));
      return;
    }
    var grid = el("div", "family-grid");
    for (var i = 0; i < family.length; i++) {
      var member = family[i];
      var card = el("article", "family-member");
      card.id = "skill-" + member.id;
      card.setAttribute("data-skill", member.id);

      card.appendChild(el("h3", "family-name", member.display_name));
      var mode = el("p", "family-mode", member.autonomy_level);
      mode.setAttribute("data-mode", modeHook(member.autonomy_level));
      card.appendChild(mode);
      card.appendChild(el("p", "family-essence", member.essence));
      card.appendChild(fieldBlock("field-how", FIELD_LABELS.how, member.how_it_works));
      card.appendChild(fieldBlock("field-gates", FIELD_LABELS.gates, member.halts_or_gates));
      card.appendChild(fieldBlock("field-when", FIELD_LABELS.when, member.when_to_use));
      grid.appendChild(card);
    }
    mountNode.appendChild(grid);
  }

  /* #skills-pipeline — one li.pipeline-stage per valid phase skill, in data
     order (assembly -> design -> planning -> research variants -> production
     variants). An ordered list: the sequence is the meaning. */
  function renderPipeline(mountNode, pipeline) {
    mountNode.textContent = "";
    mountNode.appendChild(sectionHeading(SECTION_HEADINGS.pipeline));
    if (!Array.isArray(pipeline) || pipeline.length === 0) {
      mountNode.appendChild(emptyState(
        "The pipeline deck is dark — data/skills.js holds no valid pipeline entries. Add an entry that satisfies the schema at the top of that file, and the line lights up."
      ));
      return;
    }
    var line = el("ol", "pipeline-line");
    for (var i = 0; i < pipeline.length; i++) {
      var stage = pipeline[i];
      var item = el("li", "pipeline-stage");
      item.id = "skill-" + stage.id;
      item.setAttribute("data-skill", stage.id);

      item.appendChild(el("h3", "pipeline-name", stage.display_name));
      item.appendChild(el("p", "pipeline-role", stage.role_in_lineage));
      item.appendChild(fieldBlock("field-how", FIELD_LABELS.how, stage.how_it_works));
      line.appendChild(item);
    }
    mountNode.appendChild(line);
  }

  /* #skills-heroes — one article.hero per valid hero, in data order. A null
     when_ultron_calls_it renders the quiet NO_INVOCATION passage (class
     hero-calls-none) instead of the text; the loader already degraded
     wrong-type values to null. */
  function renderHeroes(mountNode, heroes) {
    mountNode.textContent = "";
    mountNode.appendChild(sectionHeading(SECTION_HEADINGS.heroes));
    if (!Array.isArray(heroes) || heroes.length === 0) {
      mountNode.appendChild(emptyState(
        "The heroes hall stands empty — data/skills.js holds no valid hero entries. Add an entry that satisfies the schema at the top of that file, and the roster assembles."
      ));
      return;
    }
    var grid = el("div", "heroes-grid");
    for (var i = 0; i < heroes.length; i++) {
      var hero = heroes[i];
      var card = el("article", "hero");
      card.id = "hero-" + hero.id;
      card.setAttribute("data-hero", hero.id);

      card.appendChild(el("h3", "hero-name", hero.hero_name));
      card.appendChild(el("p", "hero-lens", hero.lens));
      card.appendChild(fieldBlock("field-what", FIELD_LABELS.what, hero.what_it_does));
      if (hero.when_ultron_calls_it === null || hero.when_ultron_calls_it === undefined) {
        card.appendChild(fieldBlock("field-calls", FIELD_LABELS.calls, NO_INVOCATION,
          "field-text hero-calls-none"));
      } else {
        card.appendChild(fieldBlock("field-calls", FIELD_LABELS.calls, hero.when_ultron_calls_it));
      }
      card.appendChild(el("blockquote", "hero-signature", hero.signature_line));
      grid.appendChild(card);
    }
    mountNode.appendChild(grid);
  }

  /* --- Pipeline ------------------------------------------------------------ */

  /* Full render from the current window.ULTRON_SKILLS_DATA. Idempotent:
     every mount is cleared before filling, so re-running never duplicates. */
  function renderAll() {
    var data = window.ULTRON_SKILLS_DATA;
    if (!data) {
      /* Loader never ran (skills-loader.js missing/renamed): degrade to
         empty states instead of throwing, and say why in the console. */
      console.warn("[ultron skills] window.ULTRON_SKILLS_DATA missing — loader did not run; rendering empty states.");
      data = { family: [], pipeline: [], heroes: [] };
    }
    var familyMount = mount("skills-family");
    var pipelineMount = mount("skills-pipeline");
    var heroesMount = mount("skills-heroes");

    if (familyMount) renderFamily(familyMount, data.family);
    if (pipelineMount) renderPipeline(pipelineMount, data.pipeline);
    if (heroesMount) renderHeroes(heroesMount, data.heroes);
  }

  /* Test/re-render hook (see header). */
  window.ULTRON_SKILLS_RENDER = renderAll;

  if (document.readyState === "loading") {
    /* Registered after the loader's boot listener -> validation runs first. */
    document.addEventListener("DOMContentLoaded", renderAll);
  } else {
    /* Fallback for non-deferred execution after the DOM is already parsed
       (mirrors skills-loader.js; ULTRON_SKILLS_DATA is already set in that
       path). */
    renderAll();
  }
})();
