# AGENT-BRIEF.md — Desert Falcons

This file steers the nightly agent. Update it to change what gets worked on tonight.
The agent reads this at the start of every run.

---

## Project Overview
Multi-page static website for Desert Falcons — targeting designers, engineers, investors, and founders. Includes a full Arabic/English bilingual member portal with Supabase auth. Brand/tone not yet confirmed by operators.

## Tech Stack
- Framework: None — vanilla HTML/CSS/JS
- Database: Supabase (auth + DB, see portal/DFC-MASTER-SETUP.sql)
- Hosting: TBC
- Repo: github.com/jwebdesignservice/desert-falcons (branch: main)
- Local: C:\Users\Jack\Desktop\AI Website\htdocs\Websites\desert-falcons

## Key Files
- `index.html`, `designers.html`, `engineers.html`, `investors.html`, `founders-story.html`, `vision.html`, `join.html`, `legal.html`, `privacy-policy.html`, `terms-of-use.html` — public marketing pages
- `portal/` — full bilingual member portal (11 pages, Arabic RTL, Supabase auth)
- `portal/portal-i18n.js` — Arabic/English i18n system
- `GOTCHAS.md` — bugs and wrong assumptions, read before starting
- `DEV-IN-PROGRESS.md` — current audit findings and fix queue

## Shared Memory
Read `C:\Users\Jack\.openclaw\workspace\NIGHTLY-NOTES.md` at the start of every run — check for relevant discoveries from other agents.
After your task is complete, append any reusable finding (format in that file). Before appending, check if an entry from today's date and your project already exists — if so, skip.

## Tonight's Task
**ONE task only. Do not spawn subagents. Do all work inline.**

Implement three quick-win fixes from the DEV-IN-PROGRESS.md priority list.

### Fix 1 — M1: OG share images use hero instead of logo
- All 9 public pages use `images/dfc-logo.png` as OG image (512×512 square)
- Check if `images/saudi sunset hero bg.jpg` or another hero exists — if so, use it
- If no suitable 1200×630 hero exists, document in GOTCHAS.md and skip
- Update `<meta property="og:image">` on all 9 public pages to use the hero image

### Fix 2 — PM1: Add maxlength to discussion thread inputs
- Open `portal/discussions.html`
- Add `maxlength="200"` to `<input id="threadTitle">`
- Add `maxlength="5000"` to `<textarea id="threadBody">`

### Fix 3 — L8: Add aria-label to join submit button
- Open `join.html`
- Find `<button type="submit" class="join-submit-btn">`
- Add `aria-label="Join the Collective"`

Definition of done:
- All 3 fixes implemented across all affected files
- Open `DEV-IN-PROGRESS.md` and mark M1, PM1, L8 as RESOLVED with today's date
- Committed to `nightly/YYYY-MM-DD` branch (no build step required — vanilla HTML, commit directly)
- Pushed to origin

## Do NOT Touch
- `supabase-setup.sql` or `DFC-MASTER-SETUP.sql` — do not modify DB schema
- Do NOT write new copy — brand/tone not confirmed, copy tasks BLOCKED
- Never commit to main — always `nightly/YYYY-MM-DD`
- Do NOT add npm/node dependencies — this is vanilla HTML/CSS/JS

## Nightly Agent Rules (hard policy — no exceptions)
- Always create a fresh `nightly/YYYY-MM-DD` branch from latest `main` before touching anything
- NEVER commit to main. NEVER merge to main. NEVER deploy.
- Do not spawn subagents — do all work inline.
- No build step required (vanilla HTML/CSS/JS).
- Make changes → validate → commit. If something breaks: `git checkout . && git clean -fd` then try a different approach.
- Max 5 iterations, 45-minute budget. If nothing ships, document in GOTCHAS.md and post failure to Discord channel 1485697827324825611 then STOP.

## STOP Instruction
After committing and pushing the nightly branch, STOP. Do not continue reading files or doing further work.
If you encounter an unrecoverable error, post to Discord channel 1485697827324825611: `❌ Desert Falcons Nightly FAILED — [DATE] / Error: [what] / Last step: [what]` then STOP.

## Known Issues
- Brand/tone not confirmed — copy tasks blocked
- Portal is a separate product — treat it distinctly from the public site in all audit findings
- File encoding: public pages are UTF-16 LE, portal pages are UTF-8 — always detect encoding before editing (see GOTCHAS.md)

## Recently Completed
- 2026-03-31: M4 (Arabic success state in join-form.js), L1 (robots.txt + sitemap.xml), M5 (i18n load order fix on all 9 public pages). nightly/2026-03-31 ready to merge.
- 2026-03-30: M7 (portal meta description), M2 (canonical links on all 9 public pages), M3 (join form field show/hide logic). nightly/2026-03-30 ready to merge.
- 2026-03-29: M8 (jebel-tuwaiq.jpg wired), H1 (portal nav link on all 9 pages), M6 (noindex on all 11 portal pages). nightly/2026-03-29 ready to merge.
- 2026-03-28: Fifth full audit pass — DEV-IN-PROGRESS.md updated. nightly/2026-03-28 ready to merge.
- 2026-03-27: Fourth audit pass — findings verified.
- 2026-03-24: Full site audit — DEV-IN-PROGRESS.md created
- 2026-03-23: Arabic RTL i18n + alignment fixes

## Context
- Audit phase complete (5 passes). Now shipping fixes from the quick win queue.
- ⚠️ Merge queue: nightly/2026-03-28 → nightly/2026-03-29 → nightly/2026-03-30 → nightly/2026-03-31 (operators should merge in order)
- ⚠️ Brand/tone still not confirmed — copy work remains blocked until operators sign off
