# GOTCHAS.md — Desert Falcons

Read this before touching anything. Format: [YYYY-MM-DD] What I tried → what went wrong → what actually works

---

- [2026-03-23] No package.json — this is vanilla HTML/CSS/JS. No build step, no npm. Do not attempt to run npm install or create a package.json unless explicitly instructed.
- [2026-03-23] Supabase integration present (supabase-setup.sql) — do not modify DB schema without operator approval.
- [2026-03-23] Brand/tone not yet confirmed — do not write new copy until BRAND.md is updated with confirmed details.

- [2026-03-23] This repo contains TWO separate things: (1) the public marketing site (index.html, designers, engineers, investors etc) AND (2) a /portal/ directory � a full Arabic/English bilingual member portal with Supabase auth, dashboard, announcements, applications, directory. The portal is a complete product in its own right. Do NOT treat them as the same thing. The audit must cover both separately and report on each.
- [2026-03-23] Portal stack: vanilla JS, Supabase auth + DB (see portal/DFC-MASTER-SETUP.sql), Arabic RTL support with i18n system (portal-i18n.js). 11 portal pages.

## [2026-03-24] CSS utility classes can exist in stylesheets but never be wired to HTML
**Tried:** Assuming all CSS classes are in use.
**Problem:** `.nav-portal` was fully styled in styles.css (gold border, mono font) but referenced in no HTML file — the portal nav link was never actually added to any page's markup.
**Fix:** When auditing or adding features, grep the CSS class name across all HTML files to confirm it's used. In vanilla HTML projects with separate CSS/HTML editing sessions, orphaned classes are common. Cross-check both ways: CSS → HTML, and HTML → CSS.

## [2026-03-26] Status string i18n: dynamic keys must be in translation dict
**Tried:** Using `_t(statusClass)` where `statusClass` is a raw DB value like `'approved'` or `'rejected'`
**Problem:** `portal-i18n.js` had `'pending'` → `'معلّق'` but `'approved'` and `'rejected'` were absent. The `_t()` function returns the key unchanged when no translation is found — so Arabic users saw raw English status strings. Status values come directly from the DB, so they must be added to the i18n dict explicitly.
**Fix:** Added `'approved': 'مقبول'` and `'rejected': 'مرفوض'` to `portal-i18n.js`. Rule: whenever `_t()` is called with a dynamic value derived from DB data, enumerate all possible values and add them to the dict. Don't assume only some status states need translation.

## [2026-03-25] i18n key mismatch silently fails — check exact character encoding
**Tried:** Using `_t('Loading replies…')` with Unicode ellipsis (U+2026) in discussions.html
**Problem:** portal-i18n.js has the key as `'Loading replies.'` (plain period) — character-level mismatch. `_t()` returns the key string unchanged instead of the Arabic translation. No error is thrown; it silently falls back to English.
**Fix:** Always verify exact character-level key matching when adding new i18n entries. Establish a consistent encoding convention: either always use Unicode ellipsis (…) or always use three dots (...) — never mix them. When adding a new `_t()` call, copy the key string directly from portal-i18n.js rather than typing it.