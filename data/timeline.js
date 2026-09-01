/* ==========================================================================
   data/timeline.js — The Ultron Initiative · lineage frieze data (task A2)

   file://-safe data module: a plain script that assigns a global. No fetch,
   no imports, no build step. Loaded via <script src="data/timeline.js" defer>
   BEFORE js/main.js, whose loader validates every entry.

   --------------------------------------------------------------------------
   SCHEMA — window.ULTRON_TIMELINE (array of milestone objects, in lineage
   order: ultron → ultron-swarm → ultron-supreme → ultron-overlord →
   ultron-redesign → ultron-impeccable)

   id     string, required, non-empty
          Skill identifier as it actually exists on disk (e.g. "ultron-swarm").
          Doubles as the roster/mode indicator key for the renderer.
   title  string, required, non-empty
          Display name on the frieze. Example: "Ultron Swarm".
   line   string, required, non-empty
          One-sentence GROWTH DELTA — what this addition changed about the
          family, so the frieze reads as a progression rather than rerunning
          the roster's plain role sentences (those live in js/render.js's
          ROSTER band). Accurate to the real SKILL.md files; the voice may
          menace, the facts may not be wrong.
   date   string, required — MAY be empty ("")
          When a real date is known, "YYYY-MM-DD". NO invented dates: ship
          with "" and the renderer falls back to an ordinal label
          (e.g. "01"–"06") so the frieze never displays a fabricated date.

   Copy source: each line distills its skill's own SKILL.md facts (the
   roster facts in docs/ultron/launch-content.md — Professor X's audit
   source) into a delta: ultron founds the gated line; swarm delegates the
   task work while the user keeps every approval; supreme takes approval
   over and halts only on its halt list; overlord puts autonomy on the
   120-minute clock, shedding scope to hold it; redesign turns the line
   onto existing products — the look replaced, the facts kept; impeccable
   teaches the family to finish its own work.
   ========================================================================== */

"use strict";

window.ULTRON_TIMELINE = [
  {
    id: "ultron",
    title: "Ultron",
    line: "The family begins — a production line where nothing moves without approval.",
    date: ""
  },
  {
    id: "ultron-swarm",
    title: "Ultron Swarm",
    line: "Delegation arrives — the task work leaves the main thread; the user keeps every key.",
    date: ""
  },
  {
    id: "ultron-supreme",
    title: "Ultron Supreme",
    line: "The user lets go of approval — the machine halts only where its list commands.",
    date: ""
  },
  {
    id: "ultron-overlord",
    title: "Ultron Overlord",
    line: "Autonomy gains a clock — 120 minutes, and scope sheds to keep it.",
    date: ""
  },
  {
    id: "ultron-redesign",
    title: "Ultron Redesign",
    line: "The line turns onto existing work — the look is replaced; the facts are not.",
    date: ""
  },
  {
    id: "ultron-impeccable",
    title: "Ultron Impeccable",
    line: "The family learns to finish — it critiques its own work and refines what it finds.",
    date: ""
  }
];
