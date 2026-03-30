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

Implement three quick-win fixes from the DEV-IN-PROGRESS.md priority list.
Audit is complete after 5 passes. Time to ship fixes.

### Fix 1 — M8: Wire jebel-tuwaiq.jpg into vision.css (2-line fix)
- Open `vision.css`
- Find `.tuwaiq-bg { position: absolute; inset: 0; }`
- Add: `background-image: url('../images/jebel-tuwaiq.jpg'); background-size: cover; background-position: center;`
- Verify `images/jebel-tuwaiq.jpg` exists — it does (confirmed in prior audit)

### Fix 2 — H1: Add portal nav link to all 9 public pages
- Add `<li><a href="portal/index.html" class="nav-link nav-portal">Member Portal</a></li>` to the `<ul>` nav list on:
  `index.html`, `founders-story.html`, `vision.html`, `engineers.html`, `designers.html`, `investors.html`, `join.html`, `privacy-policy.html`, `terms-of-use.html`
- The `.nav-portal` CSS class already exists in `styles.css` — just wire the HTML
- Place it as the last `<li>` in the nav list on each page

### Fix 3 — M6: Add noindex to all 11 portal pages
- Add `<meta name="robots" content="noindex, nofollow">` inside `<head>` of every portal page:
  `portal/index.html`, `portal/dashboard.html`, `portal/profile.html`, `portal/settings.html`, `portal/applications.html`, `portal/announcements.html`, `portal/discussions.html`, `portal/directory.html`, `portal/resources.html`, `portal/events.html`, `portal/updates.html`
  (Check directory for exact filenames — adjust if any differ)

Definition of done:
- All 3 fixes implemented across all affected files
- Open `DEV-IN-PROGRESS.md` and mark M8, H1/M6 as RESOLVED with today's date
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

## Recently Completed
- 2026-03-30: M7 (portal meta description), M2 (canonical links on all 9 public pages), M3 (join form field show/hide logic — #interest change listener). nightly/2026-03-30 ready to merge.
- 2026-03-29: Three quick-win fixes shipped — M8 (jebel-tuwaiq.jpg wired into vision.css), H1 (portal nav link on all 9 public pages), M6 (noindex on all 11 portal pages). nightly/2026-03-29 ready to merge.
- 2026-03-28: Fifth full audit pass — DEV-IN-PROGRESS.md updated, new finding L10 (legal.html missing), all prior findings re-verified. nightly/2026-03-28 ready to merge.
- 2026-03-27: Fourth audit pass — DEV-IN-PROGRESS.md refreshed, all findings verified, quick win order documented.
- 2026-03-24: Full site audit — DEV-IN-PROGRESS.md created (258-line prioritised fix list, both public + portal)
- 2026-03-23: Arabic RTL i18n + alignment fixes across all pages and portal
EV-IN-PROGRESS.md updated, new finding L10 (legal.html missing), all prior findings re-verified. nightly/2026-03-28 pushed.
- 2026-03-27: Fourth audit pass — DEV-IN-PROGRESS.md refreshed, all findings verified, quick win order documented.
- 2026-03-24: Full site audit — DEV-IN-PROGRESS.md created (258-line prioritised fix list, both public + portal)
- 2026-03-23: Arabic RTL i18n + alignment fixes across all pages and portal
