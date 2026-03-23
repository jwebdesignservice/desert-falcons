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
- `DEV-IN-PROGRESS.md` — current audit findings and fix queue (if exists)

## Shared Memory
Read `C:\Users\Jack\.openclaw\workspace\NIGHTLY-NOTES.md` at the start of every run — check for relevant discoveries from other agents.
After your task is complete, append any reusable finding (format in that file). Before appending, check if an entry from today's date and your project already exists — if so, skip.

## Tonight's Task
**ONE task only. Do not spawn subagents. Do all work inline.**
Full site audit. Review BOTH the public marketing pages AND the portal separately.

For each section, check:
- Broken links or missing assets (images, CSS, JS files)
- Inconsistent styling or visual gaps
- Copy issues (placeholder text, wrong tone, missing content)
- Mobile responsiveness problems
- Missing or weak meta tags (title, description, OG)
- Console errors (check for obvious JS errors in the code)

Write all findings to `DEV-IN-PROGRESS.md` as a prioritised fix list:
- URGENT: broken functionality, 404s, auth failures
- HIGH: visible UI bugs, missing content
- MEDIUM: styling inconsistencies, missing meta tags
- LOW: nice-to-have improvements

Definition of done:
- `DEV-IN-PROGRESS.md` created with full prioritised findings
- Both public site AND portal covered separately
- Committed to `nightly/YYYY-MM-DD` branch (no build required — vanilla HTML, commit directly)
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
- Tonight is audit-only — no code changes. No build step required.
- For future nights with code changes: make changes → validate → pass=commit, fail=`git checkout . && git clean -fd` then try a different approach
- Max 5 iterations, 45-minute budget. If nothing ships, document in GOTCHAS.md and post failure to Discord channel 1485697827324825611 then STOP.

## STOP Instruction
After committing and pushing the nightly branch, STOP. Do not continue reading files or doing further work.
If you encounter an unrecoverable error, post to Discord channel 1485697827324825611: `❌ Desert Falcons Nightly FAILED — [DATE] / Error: [what] / Last step: [what]` then STOP.

## Known Issues
- Brand/tone not confirmed — copy tasks blocked
- Portal is a separate product — treat it distinctly from the public site in all audit findings

## Recently Completed
- 2026-03-23: Arabic RTL i18n + alignment fixes across all pages and portal
