"use strict";
/* The Ultron Initiative — entry point (task A2: data contracts + loader).
   data/builds.js + data/timeline.js (defer, loaded before this file) assign
   the raw globals ULTRON_BUILDS / ULTRON_TIMELINE / ULTRON_STATS. This file
   validates every entry, console.warn-skips malformed ones, and stashes the
   validated results on window.ULTRON_DATA for A3's render pipeline (which
   fills #hero/#stats/#wall/#roster/#frieze/#footer from data alone).
   B5 registers motion. No fetch anywhere — file://-safe globals only.
   C1 (resilience): every skip-warn names the owning data FILE as well as
   the entry's id (or index) and the invalid field(s), so a bad edit is
   findable from the console alone. */
(function () {
  /* Absolute http(s) URL shape check for `url` / `sourceUrl`. */
  var ISO_DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

  function isHttpUrl(value) {
    return typeof value === "string" && /^https?:\/\/\S+$/i.test(value);
  }

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

  /* Validates one ULTRON_BUILDS entry against the schema documented at the
     top of data/builds.js. Returns the entry when valid, null otherwise. */
  function validateBuild(entry, index) {
    var problems = [];
    if (!isPlainObject(entry)) {
      console.warn('[ultron data] skipped build entry ' + entryLabel(entry, index) +
        ' in data/builds.js: not an object');
      return null;
    }
    if (!isNonEmptyString(entry.id)) problems.push("id");
    if (!isNonEmptyString(entry.title)) problems.push("title");
    if (!isNonEmptyString(entry.description)) problems.push("description");
    if (!Array.isArray(entry.tags) || entry.tags.length < 1 || !entry.tags.every(isNonEmptyString)) {
      problems.push("tags");
    }
    if (!isHttpUrl(entry.url)) problems.push("url");
    if (!isHttpUrl(entry.sourceUrl)) problems.push("sourceUrl");
    if (typeof entry.created !== "string" || !ISO_DATE_RE.test(entry.created)) problems.push("created");
    if (!isNonEmptyString(entry.builtWith)) problems.push("builtWith");
    if (problems.length > 0) {
      console.warn('[ultron data] skipped build entry ' + entryLabel(entry, index) +
        ' in data/builds.js — invalid field(s): ' + problems.join(", "));
      return null;
    }
    return entry;
  }

  /* Validates one ULTRON_TIMELINE milestone against the schema documented
     at the top of data/timeline.js. `date` may be "" (no invented dates —
     the renderer falls back to an ordinal label). */
  function validateMilestone(entry, index) {
    var problems = [];
    if (!isPlainObject(entry)) {
      console.warn('[ultron data] skipped milestone entry ' + entryLabel(entry, index) +
        ' in data/timeline.js: not an object');
      return null;
    }
    if (!isNonEmptyString(entry.id)) problems.push("id");
    if (!isNonEmptyString(entry.title)) problems.push("title");
    if (!isNonEmptyString(entry.line)) problems.push("line");
    if (typeof entry.date !== "string") problems.push("date");
    if (problems.length > 0) {
      console.warn('[ultron data] skipped milestone entry ' + entryLabel(entry, index) +
        ' in data/timeline.js — invalid field(s): ' + problems.join(", "));
      return null;
    }
    return entry;
  }

  /* Validates the stats strip: an array of exactly four non-empty strings. */
  function validateStats(raw) {
    if (!Array.isArray(raw) || raw.length !== 4 || !raw.every(isNonEmptyString)) {
      console.warn("[ultron data] ULTRON_STATS invalid in data/builds.js " +
        "(expected 4 non-empty strings) — the stats band will render its empty state");
      return [];
    }
    return raw;
  }

  /* Runs `validateEntry` over a raw global and returns only valid entries,
     warning once when the global itself is missing/malformed (e.g. a blank
     or 404'd data file) so the page degrades to an empty state, not an
     error. `file` names the owning data file in the warn. */
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
    /* A3 reads window.ULTRON_DATA — the validated view. The raw globals are
       left untouched for debugging. Rendering itself is A3: nothing is
       rendered here yet (no-op by design). */
    window.ULTRON_DATA = {
      builds: validateArray(window.ULTRON_BUILDS, validateBuild, "ULTRON_BUILDS", "data/builds.js"),
      timeline: validateArray(window.ULTRON_TIMELINE, validateMilestone, "ULTRON_TIMELINE", "data/timeline.js"),
      stats: validateStats(window.ULTRON_STATS)
    };
  }

  if (document.readyState === "loading") {
    window.addEventListener("DOMContentLoaded", boot);
  } else {
    /* Fallback for non-deferred execution after the DOM is already parsed. */
    boot();
  }
})();
