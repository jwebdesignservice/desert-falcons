# CURRENT.md — Live Project State
Last updated: 2026-03-31 04:00 GMT (Synthesis Agent — Morning Handover)

---

## ClauseKit
**Status:** Active development — live at https://clausekit-lemon.vercel.app
**Repo:** github.com/jwebdesignservice/Clause-Kit
**Local:** C:\Users\Jack\Desktop\AI Website\htdocs\Websites\clausekit
**Branch:** main (HEAD: 0557830)

**Open items:**
- File-based JSON stores (contract-store, payment-store) won't scale to multi-instance — future fix
- `lib/contractTypes.ts` orphaned dead code — candidate for deletion
- `/api/payment/webhook` is unsigned stub — Stripe should point to `/api/webhooks/stripe`

---

## Primrose Ever Care
**Status:** Live — https://www.primroseevercare.co.uk
**Repo:** github.com/jwebdesignservice/Primrose-evercare
**Local:** C:\Users\Jack\Desktop\AI Website\htdocs\Websites\primrose-ever-care
**Branch:** main

**Pending branches (awaiting operator review):**
- `nightly/2026-03-30` — JSON-LD LocalBusiness schema added
- `nightly/2026-03-31` — Performance optimisation (preconnect/dns-prefetch hints)

**Tonight's task:** Code quality audit — final polish pass (build warnings, lint, console.log cleanup, link verification)

**⚠️ Action required:**
- RESEND_API_KEY not added to Vercel — emails won't send until added (Settings → Environment Variables)
- Merge queue: `merge nightly/2026-03-30` → then `merge nightly/2026-03-31`

---

## Desert Falcons
**Status:** Live — https://desert-falcons.vercel.app
**Repo:** jwebdesignservice/desert-falcons
**Local:** C:\Users\Jack\Desktop\AI Website\htdocs\Websites\desert-falcons
**Branch:** main

**Pending branches (awaiting operator review):**
- `nightly/2026-03-28` — 5th audit pass, DEV-IN-PROGRESS.md updated
- `nightly/2026-03-29` — M8 (tuwaiq bg image), H1 (portal nav link on 9 public pages), M6 (noindex on 11 portal pages)
- `nightly/2026-03-30` — M7 (portal meta desc), M2 (canonical links), M3 (join form field visibility)
- `nightly/2026-03-31` — M4 (Arabic success state), L1 (robots.txt + sitemap.xml), M5 (i18n load order)

**Tonight's task:** M1 (OG hero images), PM1 (discussion maxlength), L8 (join button aria-label)

**⚠️ Action required:**
- Merge queue: `merge nightly/2026-03-28` → `nightly/2026-03-29` → `nightly/2026-03-30` → `nightly/2026-03-31`
- Encoding: public pages are UTF-16 LE, portal pages are UTF-8 — nightly agent briefed

**Open items (from DEV-IN-PROGRESS.md):**
- M1: OG images use square logo not hero image — tonight's task
- PM1: Discussion thread inputs missing maxlength — tonight's task
- L8: Join submit button missing aria-label — tonight's task
- L2-L7: Low priority polish items

---

## Nightly Crons
- Primrose: 379c10e8 — 2am GMT
- Desert Falcons: 0a760b2a — 2:30am GMT
- ClauseKit audit: 1dd14aa5 — 3am GMT
- Synthesis: 4bfaf407 — 4am GMT

---

## Paperclip
**URL:** http://127.0.0.1:3100
**Company ID:** c5c50fe7-618c-453f-923b-fcfa7baf6f64

---

## Known Issues
- Dev agent (f93dc400) heartbeat returning "Agent not found" — recurring, uninvestigated
- Nightly backup cron (0352286c) — last run status: error (message delivery issue) — monitor tonight
