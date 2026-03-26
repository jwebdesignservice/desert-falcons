# CURRENT.md — Live State

Last updated: 2026-03-25

---

## Active Projects

### Primrose Ever Care
- **Status:** Live at https://primrose-ever-care.vercel.app
- **Done:** All pages ✅ Contact form (Resend integration) ✅ SEO metadata pass ✅
- **Remaining:** Accessibility/performance audit pass → project near-complete
- **Repo:** github.com/jwebdesignservice/Primrose-evercare (main is up to date)
- **Pending operator action:** Add `RESEND_API_KEY` to Vercel env vars (Settings → Environment Variables) — emails won't send at runtime without it
- **Contract:** Signed with Aminah Carew — project live and paid
- **Nightly branch ready to merge:** nightly/2026-03-25 ✅ (SEO pass — CLEAN, build passed)

### Desert Falcons
- **Status:** Active — main branch live
- **Repo:** jwebdesignservice/desert-falcons
- **Done:** Full site built, Arabic RTL i18n, full audit (DEV-IN-PROGRESS.md refreshed with delta findings)
- **Remaining:** Commit 19 stranded i18n working-tree files → HIGH-priority fixes (nav portal link, wire jebel-tuwaiq.jpg, portal noindex, fix discussions.html i18n key mismatch) → copy pass (BLOCKED on brand sign-off)
- **Nightly branch:** nightly/2026-03-25 pushed (audit-only, DEV-IN-PROGRESS.md updated)
- **⚠️ Operator decision required:** 19 uncommitted i18n files sitting in working tree on nightly/2026-03-25. Must be committed or discarded before next agent run.

---

## System State

- Paperclip: Running on port 3100 ✅
- Paperclip startup VBS: installed in Windows startup folder ✅
- Heartbeat scheduler: cron f6bb708a — fires every 30 min ✅
- Review watcher: Active, every 2 min, port 3100 ✅
- Oracle: claude-sonnet-4-6, session clean ✅
- All crons: Healthy ✅
- Nightly policy: Isolation + autoresearch iteration loop locked in ✅
- OPENCLAW_TOKEN: persistent user env var ✅

---

## Blocked / Pending Operator Decision

- **Desert Falcons — 19 uncommitted i18n files:** Stranded in working tree on nightly/2026-03-25. Operators decide: (a) commit to nightly/2026-03-25 before merge, or (b) discard. Do not leave dirty tree for tonight's agent.
- Desert Falcons brand/tone — copy and SEO tasks blocked until confirmed
- Primrose RESEND_API_KEY — must be added to Vercel env vars before emails work in production
- Paperclip daemon auto-restart — VBS only, no restart on crash (Task Scheduler needs elevated perms)

---

## Done Last Night (2026-03-25 nightly)

- **Primrose:** SEO metadata pass complete — OG tags, canonical links, title template pattern, metadataBase added across all 9 pages. Build passed (14/14 static pages). nightly/2026-03-25 pushed, CLEAN, ready to merge.
- **Desert Falcons:** Second-pass audit completed — DEV-IN-PROGRESS.md refreshed. New finding: M8 i18n key mismatch in discussions.html. 19 uncommitted i18n working-tree changes flagged. nightly/2026-03-25 pushed. ⚠️ Operator action needed before tonight.
- **Debug agent:** Primrose CLEAN. Desert Falcons ISSUES FOUND (uncommitted working tree only — not a code regression).
