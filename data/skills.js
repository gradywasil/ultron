/* ==========================================================================
   data/skills.js — The Ultron Initiative · skills-archive data (V3 THE
   ARCHIVE, task S2)

   file://-safe data module: a plain script that assigns globals. No fetch,
   no imports, no build step. Loaded via <script src="data/skills.js" defer>
   BEFORE js/skills-loader.js, whose loader validates every entry, then
   js/skills.js renders the archive page (skills.html, task S3) from the
   validated view alone.

   --------------------------------------------------------------------------
   SCHEMA — three globals, three entry shapes (editing guide)

   window.ULTRON_FAMILY (array of 6 coordinator objects)
   window.ULTRON_PIPELINE (array of 8 phase-skill objects)
   window.ULTRON_HEROES (array of 13 hero objects)

   The loader in js/skills-loader.js type-checks each entry against this
   schema; a malformed entry is skipped with a console.warn naming this
   file, the entry's id (or index) and the invalid field(s), and the rest
   of the page is unharmed — a bad edit degrades one card, never the page.

   ULTRON_FAMILY — one entry per family coordinator:
   id             string, required, non-empty
                  Stable slug (a-z, digits, hyphens) — the skill's real
                  directory name. Example: "ultron-swarm".
   display_name   string, required, non-empty
                  Card heading. Example: "Ultron Swarm".
   essence        string, required, non-empty
                  One-sentence identity line under the name.
   how_it_works   string, required, non-empty
                  The mechanism paragraph (phase chain, artifacts, gates).
   autonomy_level string, required, non-empty
                  Gating label. Free text ("gated", "delegated (user gates
                  preserved)", …); the renderer derives a data-mode styling
                  hook from its first token (see js/skills.js header).
   halts_or_gates string, required, non-empty
                  What stops the line and who approves.
   when_to_use    string, required, non-empty
                  One-line selection guidance.

   ULTRON_PIPELINE — one entry per phase skill (8: assembly, design,
   planning, and the research/production variants):
   id               string, required, non-empty — real directory name.
   display_name     string, required, non-empty — card heading.
   role_in_lineage  string, required, non-empty — which phase it owns.
   how_it_works     string, required, non-empty — mechanism paragraph.

   ULTRON_HEROES — one entry per hero skill (13):
   id                    string, required, non-empty — real directory name.
   hero_name             string, required, non-empty — card heading.
   lens                  string, required, non-empty — the concern the
                         hero carries (one sentence).
   what_it_does          string, required, non-empty — consult paragraph.
   when_ultron_calls_it  string OR null, required-present (see below).
   signature_line        string, required, non-empty — verified byte-exact
                         quote from the hero's own SKILL.md.

   THE ONE NULLABLE FIELD — when_ultron_calls_it (V1-image-style rule):
   null is the DOCUMENTED state for a hero no ultron-family source ever
   invokes (exactly one ships: retro — see editorial notes); the renderer
   draws a quiet "no invocation recorded" passage instead of the text.
   A non-empty string is the normal state. A PRESENT but wrong-TYPE or
   empty value (number, array, "") is warned about (naming this file, the
   id, and the field) and treated as null — the entry still renders; one
   bad edit degrades the field, never the hero card.

   --------------------------------------------------------------------------
   SOURCE + FIDELITY

   Source of truth: docs/ultron/skills-content.md (task S1 content seed,
   verified byte-exact against the real SKILL.md files under
   /Users/arrangedgodly/.agents/skills/ — see the S1/S1V entries in
   docs/ultron/production-log.md). Transcribed in full; the page renders
   ONLY the three factual groups above — the seed's editorial_notes are
   carried below as data comments, never rendered.

   TRANSCRIPTION CORRECTIONS APPLIED (S1 verifier P2 flag, S1V log entry):
   the seed's "all six family SKILL.md files route the Assembly phase to
   `$avengers-assemble`" (town-hall entry) and its parallel "all six
   pipelines begin `avengers-assemble` →" (avengers-assemble hero entry)
   were narrowed to the four phase-chain coordinators — ultron,
   ultron-swarm, ultron-supreme, ultron-overlord — because
   ultron-redesign and ultron-impeccable contain no avengers-assemble
   mention and have no Assembly phase (verified by grep against the six
   family files at S2 transcription time, matching the verifier's own
   finding). The load-bearing conclusion (no family file invokes the
   `$town-hall` skill; the artifact filename is inherited) is unchanged.

   --------------------------------------------------------------------------
   EDITORIAL NOTES — carried verbatim-in-substance from the S1 seed's
   editorial_notes section (owner-correctable; NOT rendered on the page):

   - Pipeline count 8, not 9. The task brief said "one entry per
     supporting-cast skill (9)" but enumerated eight names. Eight entries
     were written; nothing was invented to fill a ninth. If the intended
     ninth was the base `production` or `deep-research` skill (both exist
     in the same directory), the owner should say which — plain `$ultron`'s
     pipeline uses `deep-research` → `production` (the base skills), so a
     page documenting only the eight variants leaves the original line's
     research and production phases pointing at undocumented skills.
   - `retro` is not Marvel-cast. It is in the owner's known list, but its
     SKILL.md is a generic coding-session retrospective; the owner may
     want it dropped from the heroes section or reclassified.
   - `town-hall` is the hero-less variant. Its skill is not referenced by
     any ultron-family file (they invoke `$avengers-assemble`); the shared
     artifact name `town-hall.md` is its inheritance.
   - One null: retro.when_ultron_calls_it (no invocation point stated
     anywhere in the line's sources). Every other field was determinable
     from a source file.
   - Doctor Strange and Mr. Fantastic have no production-phase role in the
     sources (absent from the worker diligence-emphasis lists; Professor X
     absent there too). These absences are reported as found, not filled.
   - "Ran in production" nuance: Iron Man, Thor, Hulk, Daredevil,
     Professor X, Hawkeye ran as dispatched worker/verifier lanes; Captain
     America and Ant-Man ran as audit lenses inside E1 (a HAWKEYE task).
     The entries quote state.md's exact wording.
   - Iron Man signature line differs between files: his own SKILL.md reads
     "Here's the arc reactor — here's what we build everything on." while
     avengers-assemble renders it "Here's the arc reactor we build
     everything on." The hero's own file is quoted.
   - Ant-Man spelling: the skill's own h1 is "Ant Man" (no hyphen);
     "Ant-Man" is used for display, matching the roster spelling.
   - All signature lines were verified byte-exact against their SKILL.md
     files before the seed was written; nothing here is a paraphrase
     dressed as a quote.
   ========================================================================== */

"use strict";

window.ULTRON_FAMILY = [
  {
    id: "ultron",
    display_name: "Ultron",
    essence: "The original gated coordinator — one product through explicit phases, the user approves every transition.",
    how_it_works: "Ultron coordinates one app or website through four explicit phases (six when the product has a UI surface): `avengers-assemble` → `impeccable` → `plan-it-out` → `deep-research` → `production` → `ultron-impeccable`. Each phase produces a named artifact (`town-hall.md`, the design brief, `plan.md`, a `research/` record, `production-log.md`, `refinement.md`) and the user reviews and clearly approves each one before the next phase starts; ambiguous approval means ask. It maintains `state.md` as the phase cursor and approval record, keeps `plan.md`'s task index authoritative for status and dependencies, and `production-log.md` as the evidence trail. Change control routes scope changes back to `avengers-assemble`, missing evidence or replaced choices back to `deep-research`, and keeps task-level adjustments inside `production`. Before final acceptance it builds the repository README through `$create-readme`; completion requires every committed task validated, the finishing phase complete for UI-surface products, and explicit user acceptance.",
    autonomy_level: "gated",
    halts_or_gates: "The user approves every phase artifact and reviews every completed production task (\"pause for user review after each completed task\"). A phase gate is open only when the artifact exists, the user's approval or accepted conditions are recorded, and no blocking decision is unresolved; revised plans need approval as a whole before production. Final acceptance is the user's.",
    when_to_use: "The full production line with the user in control of every phase transition."
  },
  {
    id: "ultron-swarm",
    display_name: "Ultron Swarm",
    essence: "The delegated line — identical gates, but subagents do the tasks and the main thread only dispatches, relays, and gates.",
    how_it_works: "Same phase chain as ultron with delegated variants: `avengers-assemble` → `impeccable` → `plan-it-out` → `deep-research-swarm` → `production-swarm` → `ultron-impeccable`, and \"Every gate from `$ultron` is preserved.\" The main thread is a dispatcher, not a worker: it never opens `plan.md` or `production-log.md`, tracks only task IDs, one-line results, and the phase cursor, and passes artifact paths and condensed decisions between phases rather than full contents. Worker subagents read their own task entries, append their own log entries, and flip their own statuses in their own context. An existing `$ultron` or `$ultron-supreme` run is taken over in place (never copied or forked) with a lineage note in `state.md`; the artifact triad stays the contract so any coordinator can resume the run.",
    autonomy_level: "delegated (user gates preserved)",
    halts_or_gates: "Every gate from `$ultron`: the user approves each phase artifact and reviews every completed production task. Tasks already `awaiting-approval` at conversion still get their user review.",
    when_to_use: "The same gated line when task work must stay out of the main context window."
  },
  {
    id: "ultron-supreme",
    display_name: "Ultron Supreme",
    essence: "The autonomous line — the user controls the start and the goal; supreme auto-approves everything in between and halts only on its halt list.",
    how_it_works: "Same phase chain with autonomous variants: `avengers-assemble` → `impeccable` → `plan-it-out` → `deep-research-supreme` → `production-supreme` → `ultron-impeccable`. It auto-approves each stage and each completed task, records every self-granted approval as `auto-approved (ultron-supreme)` with an evidence path, and keeps queueing the next task without waiting. Production tasks run one at a time through worker subagents checked by separate verifier subagents. Context discipline matches swarm — the main thread tracks only task IDs, attempt counts, one-line results, and the phase cursor. Assembly still runs as a user conversation, Design is supreme's single design-direction touchpoint, and the plan gets one user review; from research onward, supreme self-approves.",
    autonomy_level: "autonomous",
    halts_or_gates: "Halts only for the halt list: destructive or irreversible operations; external publishing (`git push`, package publishing, deployments); wizard-lane tasks only a human can perform; scope changes that alter the approved scoping brief; a task failing twice in a row; the 20-dispatch task cap per run; and a closing critique that still finds material issues after the refinement queue. Everything else — stage transitions, research dispositions, task approvals, within-brief plan revisions — is auto-approved and recorded.",
    when_to_use: "Hands-off production — the user sets the start and the goal and supreme runs everything between."
  },
  {
    id: "ultron-overlord",
    display_name: "Ultron Overlord",
    essence: "The autonomous line at deadline speed — one intake sitting, enforced task budgets, and scope shed to defend a 120-minute idea-to-production target.",
    how_it_works: "The same phases, halt list, verifier, and artifacts as `$ultron-supreme`, but deadline-driven: `avengers-assemble` → `impeccable` → `plan-it-out` → `deep-research-supreme` → `production-overlord` → `ultron-impeccable`. Every interactive moment — scoping questions, the design-direction delegation, the plan review — is batched into one consolidated intake sitting at the start; anything unanswered proceeds with stated assumptions recorded in `state.md`. A runtime clock starts at intake and every task's budget and actual duration are appended as the run proceeds; burn-down is announced at every phase handoff. Workers run in the background on enforced budgets, are hard-stopped at expiry, get one wrap-up redispatch, and overrun tasks are deferred — while the run projection, once it exceeds 120 minutes, sheds scope by priority (defer P2/P3, trim refinements to P0/P1).",
    autonomy_level: "deadline-driven",
    halts_or_gates: "Same halt list as supreme (destructive operations, external publishing, wizard-lane tasks, scope changes, the 20-dispatch cap, the finishing ceiling) with one split: a budget overrun is not a halt — the worker is stopped and the task wrapped or deferred — but a substantive double-failure (the verifier rejecting the same task twice on merit) halts with a diagnosis. \"No deadline pressure excuses skipping verification or a halt condition\"; scope shedding never cuts verification or anything on the halt list.",
    when_to_use: "When speed matters more than exhaustive polish — idea to production inside a defended two-hour budget."
  },
  {
    id: "ultron-redesign",
    display_name: "Ultron Redesign",
    essence: "The visual-world replacement line — multi-option prototyping rounds locked one choice at a time; the look changes, the product facts don't.",
    how_it_works: "Six stages. Intake asks what is driving the redesign, which surfaces are in scope, what is off-limits, and which product facts must survive. Baseline captures the incumbent: `$impeccable document` (only if DESIGN.md is missing or stale), an unattended read-only `$impeccable audit` scoring five technical dimensions 0–4, and a `$impeccable critique` through a delegated orchestrator — both scores and key findings recorded as the baseline in `redesign.md`. The direction round derives seven grounded visual systems from the audience's cultural world, deals a hand via script, and serves a decision page the user steers and re-rolls; the locked card becomes the new world. Schedule transcribes the work into `redesign.md` as surface rounds, element rounds, command items, and extract items, ordered world → surfaces → elements → polish. Execute runs items one at a time through worker subagents with the user locking each choice, and Finish hands off to `$ultron-impeccable` in approval mode, comparing the closing critique score against the baseline.",
    autonomy_level: "gated (approval-only — \"the user drives every taste decision\")",
    halts_or_gates: "The user locks the direction card, each surface round, and each element pick; each executed item's report is approved, adjusted, or skipped at the gate before the next dispatch. A change that alters product function, content, or behavior halts the schedule and routes to `$ultron`; newly discovered surfaces join the schedule as queued items rather than being built ad hoc, and intake's boundary is not silently expanded.",
    when_to_use: "Replacing an existing product's visual world without changing its product facts."
  },
  {
    id: "ultron-impeccable",
    display_name: "Ultron Impeccable",
    essence: "The finishing pass — a document refresh, a critique, and a transcribed refinement checklist executed one gated change at a time.",
    how_it_works: "Runs only for UI-surface products, only after production, and only re-runs when the user explicitly asks. It first runs `$impeccable document` (a quick refresh when DESIGN.md is current; a full refresh only when missing or stale), then `$impeccable critique` through a delegated orchestrator subagent that spawns two isolated assessments, synthesizes them, persists the snapshot under `.impeccable/critique/`, and returns the condensed report plus an Action Summary of recommended commands. The Action Summary is transcribed into `refinement.md` — one entry per command, each mapped to its critique finding — and executed one at a time in priority order through worker subagents carrying the full UI build discipline. In auto mode, a simulated-user proxy answers impeccable's questions from `town-hall.md`, the design brief, and `PRODUCT.md`, recording each answer as `simulated (auto mode)`.",
    autonomy_level: "mode-dependent — gated in approval mode (the default), autonomous in auto mode where only the verifier grants approval",
    halts_or_gates: "Approval mode (routed by `ultron` and `ultron-swarm`): every queued refinement stops for user approval and impeccable's interactive gates go to the user directly. Auto mode (routed by `ultron-supreme`): a verifier subagent grants `auto-approved (ultron-supreme)`, and the phase halts on a second consecutive failed refinement or a closing critique that still finds material issues — \"a quality ceiling, not a silent loop.\"",
    when_to_use: "After production completes on a UI-surface product in an ultron line."
  }
];

window.ULTRON_PIPELINE = [
  {
    id: "avengers-assemble",
    display_name: "Avengers Assemble",
    role_in_lineage: "Assembly phase (scoping) — every ultron-family coordinator's first phase; writes `town-hall.md`.",
    how_it_works: "An interactive, grilling-style scoping assembly chaired by Nick Fury, \"not a monologue brief\": each hero speaks in one round and their stance — support, concern, cost/risk, claimed workload — is written into the brief's Hero Perspectives as the meeting runs. The `grilling` skill then works the content cluster by cluster (problem & users; MVP boundary & non-goals; journeys/states/success measures; constraints/assumptions/risks; open-question dispositions). Each hero confirms or corrects their perspective individually — \"never batch them into a single end-of-meeting approval\" — and every open question is dispositioned to planning, research, or production with its blocking status."
  },
  {
    id: "impeccable",
    display_name: "Impeccable",
    role_in_lineage: "Design phase (`init` + `shape`) for UI-surface products; also owns the UI build discipline inside production and the evaluate/refine commands the finishing pass runs.",
    how_it_works: "A frontend design skill that routes every request through a Commands table (`shape`, `init`, `document`, `extract`, `critique`, `audit`, `polish`, `bolder`, `quieter`, `distill`, `harden`, `onboard`, `animate`, `colorize`, `typeset`, `layout`, `delight`, `overdrive`, `clarify`, `adapt`, `optimize`, `live`), each with its own reference playbook; with no argument it presents a context-aware menu and never auto-runs. In the ultron line, `init` derives `PRODUCT.md` from `town-hall.md` without re-interviewing and records the build path, while `shape` asks only the design delta in one round and its built-in confirmation stop is the Design phase's gate. Its modes name the visitor's success (Persuade, Operate, Read, Experience), and its standing rules are \"Refinement preserves; redesign replaces\" and \"The brief wins.\""
  },
  {
    id: "plan-it-out",
    display_name: "Plan It Out",
    role_in_lineage: "Planning phase — turns the approved brief into `plan.md`.",
    how_it_works: "Reads the approved scoping brief and extracts every committed requirement, journey, state, acceptance criterion, constraint, non-goal, and open question, then divides the work by role — structuring lanes from the avengers-assemble hero-claims table when the handoff note carries one. Each lane decomposes into bite-sized tasks with stable IDs, owner roles, statuses, dependencies, acceptance criteria, and size signals, ordered around the critical path with a thin end-to-end path early. The plan is ready when every committed scope item maps to at least one task and every task maps back to scope; the gate is explicit user approval before research begins."
  },
  {
    id: "deep-research-swarm",
    display_name: "Deep Research Swarm",
    role_in_lineage: "Research phase for `ultron-swarm`.",
    how_it_works: "Turns the plan's unknowns into implementation-ready decisions through fully delegated, independent tracks that write full records under `research/` and return at most five lines. Before dispatch, one consolidated list of queued questions with recommended dispositions (skip or research) is posted for the user to adjust in a single pass. When the plan's lanes carry hero claims, each track is sponsored by its matching hero and investigated through their lens; summaries are synthesized into a decision matrix the user dispositions choice by choice — \"No meaningful choice enters production without an explicit user disposition.\""
  },
  {
    id: "deep-research-supreme",
    display_name: "Deep Research Supreme",
    role_in_lineage: "Research phase for `ultron-supreme` (and `ultron-overlord`).",
    how_it_works: "Same track contract and hero sponsorship as the swarm variant, but autonomous: a subagent reads `plan.md` and returns the research queue, dispositions are applied automatically and recorded, and every committed decision is marked `auto-approved (ultron-supreme)` with its evidence path — no user gate in this phase. It halts only if a choice would change the scoping brief (user problem, MVP boundary, success measures, non-goals) or something on the supreme halt list fires; plan updates are applied by a subagent, never by re-reading `plan.md` into the main thread."
  },
  {
    id: "production-swarm",
    display_name: "Production Swarm",
    role_in_lineage: "Production phase for `ultron-swarm`.",
    how_it_works: "Executes the plan one task at a time in dependency order through worker subagents that own their own artifacts: each reads its own task entry, validates at the task's boundary, sets itself `awaiting-approval`, appends its own production-log entry, and returns a compact gate briefing of about ten lines. The main thread never opens `plan.md` or `production-log.md` — it dispatches by task ID and relays briefings without augmenting them. A hard user review gate follows every completed task (\"Treat the next task as authorized only after the user responds\"), and wizard-lane tasks produce a script for the user to run rather than running it end-to-end."
  },
  {
    id: "production-supreme",
    display_name: "Production Supreme",
    role_in_lineage: "Production phase for `ultron-supreme`.",
    how_it_works: "Executes the plan one task at a time through worker subagents verified by separate, independent verifier subagents: the worker reports, the verifier re-validates acceptance criteria with its own checks, and on a pass the task is auto-approved and the next dispatches immediately. A failed verification re-dispatches the same task once with the failure context; the second consecutive failure halts. Worker lanes carry their owning hero's concern as the diligence emphasis and report under that hero's name; UI tasks follow impeccable's build discipline, and only the verifier's verdict — never impeccable's `ship` — grants the auto-approval."
  },
  {
    id: "production-overlord",
    display_name: "Production Overlord",
    role_in_lineage: "Production phase for `ultron-overlord`.",
    how_it_works: "The production master on enforced time budgets: task budgets derive from the size signal (S = 5 minutes, M = 10, L = 20, default 10), workers are dispatched in the background with the budget in the prompt, and the coordinator waits with a timeout equal to the budget. At expiry the worker is hard-stopped and re-dispatched once with the wrap-up order (\"ship what works now, record what is unfinished, return immediately\") on a third of the original budget; a second overrun or failed acceptance marks the task `deferred (over budget)` and the run moves on. Every completed or deferred task appends budget and actual duration to `state.md` and re-checks the projection against the 120-minute run budget; only the verifier grants `auto-approved (ultron-overlord)`."
  }
];

window.ULTRON_HEROES = [
  {
    id: "ant-man",
    hero_name: "Ant-Man",
    lens: "Scope — the MVP boundary, the non-goals, and the smallest version that still proves the point.",
    what_it_does: "Reviews a plan, backlog, or proposed change item by item against the outcome it exists to achieve, hunting hidden second projects, scope creep disguised as completeness, and non-goals quietly becoming goals. Findings carry severity (P0 scope that hides a second project, P1 deferrable, P2 trimming) with a concrete cut, defer, or shrink recommendation each — never a unilateral cut, \"scope changes route through the line's change-control rules.\"",
    when_ultron_calls_it: "Core team, assembled \"for every product\" (avengers-assemble) — he owns the MVP boundary and non-goals; production workers on an Ant-Man lane carry \"Ant-Man scope discipline\" as their diligence emphasis (production-swarm/supreme/overlord worker contracts); `$impeccable distill` complements the lens on content-heavy UI. Ran in this site's production — as the boundary audit inside E1's acceptance verification (state.md: \"Ant-Man boundary audit clean — zero tracker/framework/search/filter/comment/auth/CMS surface in grep and rendered DOM, interactive surface is exactly 29 anchors\").",
    signature_line: "Can we do this at 10% of the size first?"
  },
  {
    id: "captain-america",
    hero_name: "Captain America",
    lens: "Security and privacy — auth, data safeguarding, and privacy as a first principle.",
    what_it_does: "Scans authentication and authorization, data handling at rest and in transit, secrets management, input validation and injection surfaces, transport protections, and privacy exposure — what is collected versus what the product actually needs. Findings carry severity (P0 exploitable or a privacy violation, P1 weak defense, P2 hardening) with a concrete recommendation each; his standing rule is absolute: \"Never mark a privacy trade-off as acceptable on the user's behalf — surface it as a decision.\"",
    when_ultron_calls_it: "Core team, assembled \"for every product\"; sponsors the security-and-privacy research track (\"Captain America for security and privacy\", deep-research-swarm/supreme); production workers carry \"security and privacy\" as their diligence emphasis. Ran in this site's production — as the asset-hygiene audit inside E1 (state.md: \"Captain America asset hygiene clean — 5 in-repo woff2 + 3 vendored OFL licenses + local SVG favicon, zero binaries beyond woff2\").",
    signature_line: "We don't trade people's data for convenience."
  },
  {
    id: "daredevil",
    hero_name: "Daredevil",
    lens: "Accessibility — semantics, keyboard paths, screen-reader experience, and contrast.",
    what_it_does: "Holds every interface to the standard of navigating it non-visually: semantic structure and landmarks, keyboard paths through every interaction, screen-reader experience and announcements, focus management, contrast and color independence, reduced-motion support, and text alternatives. Findings carry severity (P0 blocks assistive technology, P1 WCAG AA violation, P2 polish) with a concrete fix each; `$impeccable audit` provides the technical a11y baseline this lens builds on.",
    when_ultron_calls_it: "On-call in the assembly — \"Summoned for essentially every product with a UI\" (avengers-assemble); sponsors the accessibility research track; production workers carry \"accessibility\" as their diligence emphasis. Ran in this site's production — D1 (semantics + keyboard) and D2 (contrast) were completed and verified as DAREDEVIL worker lanes (state.md production cursor).",
    signature_line: "if it works for Matt Murdock, it works for everyone"
  },
  {
    id: "doctor-strange",
    hero_name: "Doctor Strange",
    lens: "Risk — the pre-mortem, the contingency, and the single point of failure.",
    what_it_does: "Stress-tests a plan or decision by assuming it failed and working backward: the top risks with likelihood and impact, single points of failure, irreversible commitments, quietly load-bearing assumptions, and the futures with no recovery path. Findings carry severity (P0 no-recovery path, P1 expensive to unwind, P2 watch-list) and each recommendation is a contingency, a reversibility change, or an explicit accepted-risk statement — \"Risks are surfaced for decision, never accepted on the user's behalf.\"",
    when_ultron_calls_it: "On-call in the assembly, summoned \"when a choice is genuinely risky\" (avengers-assemble). Not listed among the research-track sponsors (deep-research-swarm/supreme) nor among the production diligence emphases (production-swarm/supreme/overlord) — a documented absence, not an oversight of this seed. Did not run in this site's production — town-hall.md records he was not convened: \"no genuinely risky forks.\"",
    signature_line: "Doctor Strange has viewed 14,000,605 futures and brings back the ones where we lose."
  },
  {
    id: "hawkeye",
    hero_name: "Hawkeye",
    lens: "Testing and acceptance — the criteria, the coverage, and the definition of done.",
    what_it_does: "Reviews a plan, feature, or change against acceptance criteria that are actually observable — writing them if none exist — and hunts coverage gaps on the riskiest paths, weak or tautological assertions, flaky spots, missing failure-path tests, and definitions of done that cannot catch a silent regression. Findings carry severity (P0 untestable success criterion, P1 coverage gap on a risky path, P2 hygiene), each naming the test to write or the criterion to sharpen.",
    when_ultron_calls_it: "On-call in the assembly — he \"owns the acceptance criteria, the test plan, and the definition of done\"; sponsors the testing-and-observability research track; production workers carry \"test coverage\" as their diligence emphasis. Ran in this site's production — E1 (v1 acceptance verification, final production task) and V5 (V2 acceptance) were completed by HAWKEYE workers (state.md production cursor).",
    signature_line: "Hawkeye never misses, and he doesn't accept a target that can't be verified."
  },
  {
    id: "hulk",
    hero_name: "Hulk",
    lens: "Resilience — error states, edge cases, and failure paths.",
    what_it_does: "Assumes everything fails eventually — network, data, concurrency, user input, external services — and scans error states and their user experience, edge and boundary cases, retry and timeout behavior, fallbacks and graceful degradation, blast radius when a component dies, and the health of empty, loading, and partial states. Findings carry severity (P0 crashes or loses data, P1 ugly failure, P2 polish) with a concrete fix each; `$impeccable harden` runs the deeper pass on his findings when asked.",
    when_ultron_calls_it: "Core team, assembled \"for every product\"; sponsors the reliability research track (\"Hulk for reliability\"); production workers carry \"failure paths\" as their diligence emphasis. Ran in this site's production — C1 (degraded states: noscript band, empty-states, malformed-entry skip) was completed and verified by a HULK worker (state.md production cursor).",
    signature_line: "That's my secret — I'm always angry."
  },
  {
    id: "iron-man",
    hero_name: "Iron Man",
    lens: "Architecture — the stack, the core structure, and the build tooling.",
    what_it_does: "Reviews core abstractions and whether they hold weight, coupling between modules, stack fit for the actual problem, dependency health, and build and tooling friction — flagging where structure \"is interchangeable with an unrelated product.\" Findings carry severity (P0 structural risk, P1 drag on every change, P2 polish) with the fix named, not just the flaw; his verdict names the single highest-leverage refactor, and his rule is \"Propose, don't command.\"",
    when_ultron_calls_it: "Core team, assembled \"for every product\" — he owns the stack, build tooling, and core structure; sponsors the architecture-and-packages research track (\"Iron Man for architecture and packages\"); production workers carry \"architectural fit\" as their diligence emphasis. Ran in this site's production — A2, A3, B1–B4, V1, V2, and V3 (with Thor) were completed by IRON MAN workers (state.md production cursor); this site's build-path choice was explicitly \"delegated by user to Iron Man.\"",
    signature_line: "Here's the arc reactor — here's what we build everything on."
  },
  {
    id: "mr-fantastic",
    hero_name: "Mr. Fantastic",
    lens: "Data and integrations — the models, the contracts, and the external services.",
    what_it_does: "Stretches between systems and reviews what tears first: data models and their consistency, API contracts and versioning, external-service failure modes and rate limits, synchronization and stale-data windows, migration paths, and what happens when the other side is down or slow. Findings carry severity (P0 data loss or contract break, P1 fragile coupling, P2 hygiene) with a concrete fix each.",
    when_ultron_calls_it: "On-call in the assembly \"when their concern is material to the product\" (avengers-assemble); sponsors the data-and-integrations research track (\"Mr. Fantastic for data and integrations\"); production workers carry \"integration contracts\" as their diligence emphasis. Did not run in this site's production — town-hall.md records he was not convened: \"no integrations in MVP.\"",
    signature_line: "the connective tissue that tears first"
  },
  {
    id: "professor-x",
    hero_name: "Professor X",
    lens: "User research and domain accuracy — who the users really are, what they actually do, and whether the product's real-world facts hold up.",
    what_it_does: "Reads personas against evidence, surfaces assumptions about behavior and intent and journey friction, and checks the product's real-world facts — figures, behavior, terminology — against primary sources where available. Findings carry severity (P0 wrong about the user or a load-bearing fact, P1 shaky assumption, P2 watch-list) with a concrete recommendation each. His fact-finding is \"a directional check, not authoritative research\" — the cited, evidence-backed version belongs to `$deep-research`.",
    when_ultron_calls_it: "On-call in the assembly when user understanding or factual accuracy is material; sponsors the domain-accuracy research track (\"Professor X for domain accuracy\", deep-research-swarm/supreme). Not listed among the production diligence emphases (production-swarm/supreme/overlord). Ran in this site's production — F1 (content audit: every roster/lineage/stat claim traced to the six real SKILL.md files, zero invented claims) was completed by a PROFESSOR X worker (state.md production cursor).",
    signature_line: "Professor X reads minds for a living, so user assumptions don't survive him."
  },
  {
    id: "thor",
    hero_name: "Thor",
    lens: "Performance — latency, load, and runtime efficiency.",
    what_it_does: "Reviews against a budget in milliseconds, bytes, or operations: load path and payload sizes, render and response latency, bundle weight, unnecessary runtime work, network waterfalls, caching, and blocking operations. Findings carry severity (P0 broken-slow, P1 noticeable, P2 polish) with the fix named; `$impeccable optimize` and `$impeccable audit` run the deeper pass on his findings when asked.",
    when_ultron_calls_it: "Core team, assembled \"for every product\" — \"Everything ships at lightning speed or it doesn't ship\"; sponsors the performance research track (\"Thor for performance\"); production workers carry \"performance\" as their diligence emphasis. Ran in this site's production — B5 (motion system), V4 (scroll motion expansion), and V3 (with Iron Man) were completed by THOR workers (state.md production cursor).",
    signature_line: "Everything ships at lightning speed or it doesn't ship."
  },
  {
    id: "town-hall",
    hero_name: "Town Hall",
    lens: "Role-based product scoping — grilling rounds, cluster-by-cluster confirmation, and preserved dissent.",
    what_it_does: "The generic scoping meeting beneath the hero-branded assembly: the proposal is examined through distinct role perspectives (product/user value, UX/UI, frontend, backend/data/integrations, quality/reliability, security/privacy, accessibility, plus a domain/content-accuracy role for real-world subject matter), each role's stance written into the brief as it speaks. Judgment-call clusters get two labeled voices — Challenger, the strongest case against the stated direction, then Advocate — before the recommendation, and every cluster signs off individually. It writes the same brief structure to `town-hall.md` and hands off only approved scope to `plan-it-out`.",
    when_ultron_calls_it: "Not invoked by the ultron family — the four phase-chain coordinators route the Assembly phase to `$avengers-assemble` (ultron-redesign and ultron-impeccable have no Assembly phase), and change control \"returns to `avengers-assemble`\"; this skill's artifact filename (`town-hall.md`) is what the whole line inherited, which is why every phase record carries its name. It is the hero-less variant for runs outside the Marvel cast.",
    signature_line: "Facilitate dissent toward decisions; preserve minority views as risks or follow-up questions instead of smoothing them into false consensus."
  },
  {
    id: "retro",
    hero_name: "Retro",
    lens: "Retrospective on the coding agent's environment — navigation, automated checks, coding standards, tool economy.",
    what_it_does: "Reviews a coding session's primary sources and surfaces improvement candidates in seven categories: navigation pointers, automated checks that could have caught mistakes, coding standards for the reviewer agent, global AGENTS.md bloat, tool-call economy, no-op steering instructions, and information access. Candidates are presented to the user in order of severity; its reference doctrine separates implementation (most context pressure) from review (least), concluding the review agent should impose standards.",
    when_ultron_calls_it: null,
    signature_line: "the review agent should be responsible for imposing coding standards, not the implementation agent"
  },
  {
    id: "avengers-assemble",
    hero_name: "Avengers Assemble (convened by Nick Fury)",
    lens: "Hero-team product scoping — every concern dispositioned before the meeting ends, every claim individually confirmed.",
    what_it_does: "Convenes the core team for every product — Nick Fury (convener), Iron Man (architecture), Thor (performance), Captain America (security and privacy), Hulk (resilience), Ant-Man (scope) — and summons the on-call heroes when their concern is material: Daredevil, Hawkeye, Doctor Strange, Professor X, Mr. Fantastic. Each hero voices support, the concern their lens exposes, the cost or risk it raises, the smallest resolving experiment, and the piece of the workload they claim; unresolved concerns are preserved as risks or follow-up questions instead of being smoothed into false consensus. The brief carries a hero-claims handoff table that `plan-it-out` turns into the plan's lanes, and each hero is also individually invocable as a standalone skill for a focused consult.",
    when_ultron_calls_it: "The Assembly phase of the ultron family's four phase-chain coordinators — all four pipelines begin `avengers-assemble` → (ultron-redesign and ultron-impeccable have no Assembly phase), and a scope change discovered mid-line \"returns to `avengers-assemble`.\" This site's own brief in `docs/ultron/town-hall.md` was assembled by it (state.md: \"avengers-assemble brief: user-approved\").",
    signature_line: "This is collaboration, not combat: heroes surface concerns to get them resolved, not to win arguments."
  }
];
