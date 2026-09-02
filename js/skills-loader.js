"use strict";
/* The Ultron Initiative — skills-archive loader (V3 THE ARCHIVE, task S2).
   The archive page's mirror of js/main.js: data/skills.js (defer, loaded
   before this file) assigns the raw globals ULTRON_FAMILY / ULTRON_PIPELINE
   / ULTRON_HEROES. This file validates every entry against the schema
   documented at the top of data/skills.js, console.warn-skips malformed
   ones, and stashes the validated view on window.ULTRON_SKILLS_DATA for
   js/skills.js's render pipeline (which fills #skills-family /
   #skills-pipeline / #skills-heroes from data alone). No fetch anywhere —
   file://-safe globals only. C1 discipline inherited verbatim: every
   skip-warn names the owning data FILE as well as the entry's id (or
   index) and the invalid field(s), so a bad edit is findable from the
   console alone. This page never loads js/main.js — the two loaders are
   page-scoped twins, deliberately not a shared file (S2 file-ownership
   rule: additive new files only). */
(function () {
  function isNonEmptyString(value) {
    return typeof value === "string" && value.trim().length > 0;
  }

  function isPlainObject(value) {
    return typeof value === "object" && value !== null && !Array.isArray(value);
  }

  /* Labels a rejected entry in the console.warn: its id when it has a
     usable one, otherwise its index in the raw array. */
  function entryLabel(entry, index) {
    if (isPlainObject(entry) && isNonEmptyString(entry.id)) {
      return '"' + entry.id + '" (index ' + index + ")";
    }
    return "index " + index;
  }

  /* The required-string check shared by every field of all three schemas
     (see data/skills.js). Collects ALL problems for one entry, then warns
     once — a bad edit reports everything it broke in a single line. */
  function stringProblems(entry, fields) {
    var problems = [];
    for (var i = 0; i < fields.length; i++) {
      if (!isNonEmptyString(entry[fields[i]])) problems.push(fields[i]);
    }
    return problems;
  }

  /* Validates one ULTRON_FAMILY entry (schema: data/skills.js header). */
  function validateFamilyEntry(entry, index) {
    if (!isPlainObject(entry)) {
      console.warn('[ultron data] skipped family entry ' + entryLabel(entry, index) +
        ' in data/skills.js: not an object');
      return null;
    }
    var problems = stringProblems(entry, [
      "id", "display_name", "essence", "how_it_works",
      "autonomy_level", "halts_or_gates", "when_to_use"
    ]);
    if (problems.length > 0) {
      console.warn('[ultron data] skipped family entry ' + entryLabel(entry, index) +
        ' in data/skills.js — invalid field(s): ' + problems.join(", "));
      return null;
    }
    return entry;
  }

  /* Validates one ULTRON_PIPELINE entry (schema: data/skills.js header). */
  function validatePipelineEntry(entry, index) {
    if (!isPlainObject(entry)) {
      console.warn('[ultron data] skipped pipeline entry ' + entryLabel(entry, index) +
        ' in data/skills.js: not an object');
      return null;
    }
    var problems = stringProblems(entry, [
      "id", "display_name", "role_in_lineage", "how_it_works"
    ]);
    if (problems.length > 0) {
      console.warn('[ultron data] skipped pipeline entry ' + entryLabel(entry, index) +
        ' in data/skills.js — invalid field(s): ' + problems.join(", "));
      return null;
    }
    return entry;
  }

  /* Validates one ULTRON_HEROES entry. `when_ultron_calls_it` is the one
     nullable field (the documented "no invocation recorded" state —
     retro ships it as null): null or a non-empty string is valid; a
     present-but-wrong-type or empty value is warned about and TREATED AS
     NULL on a shallow copy, never skipped — the V1 optional-image rule,
     applied so one bad edit degrades one passage, never the hero card.
     The raw global is never mutated (the copy is local to the validated
     view). */
  function validateHeroEntry(entry, index) {
    if (!isPlainObject(entry)) {
      console.warn('[ultron data] skipped hero entry ' + entryLabel(entry, index) +
        ' in data/skills.js: not an object');
      return null;
    }
    var problems = stringProblems(entry, [
      "id", "hero_name", "lens", "what_it_does", "signature_line"
    ]);
    if (problems.length > 0) {
      console.warn('[ultron data] skipped hero entry ' + entryLabel(entry, index) +
        ' in data/skills.js — invalid field(s): ' + problems.join(", "));
      return null;
    }
    var calls = entry.when_ultron_calls_it;
    if (calls === null || isNonEmptyString(calls)) return entry;
    /* Nullable-field degradation (see header): wrong-type or "" becomes
       the documented null state with its own warn naming the field — the
       entry itself still renders. */
    console.warn('[ultron data] hero entry ' + entryLabel(entry, index) +
      ' in data/skills.js — invalid optional field: when_ultron_calls_it (expected non-empty string or null, got ' +
      (Array.isArray(calls) ? "array" : typeof calls) +
      '); treating as null — the card renders its no-invocation passage');
    var validated = {};
    for (var key in entry) {
      if (Object.prototype.hasOwnProperty.call(entry, key) && key !== "when_ultron_calls_it") {
        validated[key] = entry[key];
      }
    }
    return validated;
  }

  /* Runs `validateEntry` over a raw global and returns only valid entries,
     warning once when the global itself is missing/malformed (e.g. a blank
     or 404'd data file) so the page degrades to an empty state, not an
     error. `file` names the owning data file in the warn. Same contract as
     js/main.js's validateArray. */
  function validateArray(raw, validateEntry, kind, file) {
    if (!Array.isArray(raw)) {
      console.warn("[ultron data] " + kind + " missing or not an array — expected " +
        "window." + kind + " from " + file + " (deleted, blank, or failed to load); " +
        "the section will render its empty state");
      return [];
    }
    var valid = [];
    for (var i = 0; i < raw.length; i++) {
      var entry = validateEntry(raw[i], i);
      if (entry !== null) valid.push(entry);
    }
    return valid;
  }

  function boot() {
    /* js/skills.js reads window.ULTRON_SKILLS_DATA — the validated view.
       The raw globals are left untouched for debugging. Rendering itself
       is js/skills.js's job: nothing is rendered here (no-op by design). */
    window.ULTRON_SKILLS_DATA = {
      family: validateArray(window.ULTRON_FAMILY, validateFamilyEntry, "ULTRON_FAMILY", "data/skills.js"),
      pipeline: validateArray(window.ULTRON_PIPELINE, validatePipelineEntry, "ULTRON_PIPELINE", "data/skills.js"),
      heroes: validateArray(window.ULTRON_HEROES, validateHeroEntry, "ULTRON_HEROES", "data/skills.js")
    };
  }

  if (document.readyState === "loading") {
    window.addEventListener("DOMContentLoaded", boot);
  } else {
    /* Fallback for non-deferred execution after the DOM is already parsed. */
    boot();
  }
})();
