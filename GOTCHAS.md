# GOTCHAS.md — Desert Falcons

Read this before touching anything.

---

- [2026-03-23] No package.json — this is vanilla HTML/CSS/JS. No build step, no npm. Do not attempt to run npm install or create a package.json unless explicitly instructed.
- [2026-03-23] Supabase integration present (supabase-setup.sql) — do not modify DB schema without operator approval.
- [2026-03-23] Brand/tone not yet confirmed — do not write new copy until BRAND.md is updated with confirmed details.

- [2026-03-23] This repo contains TWO separate things: (1) the public marketing site (index.html, designers, engineers, investors etc) AND (2) a /portal/ directory � a full Arabic/English bilingual member portal with Supabase auth, dashboard, announcements, applications, directory. The portal is a complete product in its own right. Do NOT treat them as the same thing. The audit must cover both separately and report on each.
- [2026-03-23] Portal stack: vanilla JS, Supabase auth + DB (see portal/DFC-MASTER-SETUP.sql), Arabic RTL support with i18n system (portal-i18n.js). 11 portal pages.