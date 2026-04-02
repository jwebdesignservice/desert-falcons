# DEV-IN-PROGRESS.md — Desert Falcons Audit
---

## RESOLVED — 2026-04-02 (nightly/2026-04-02)

- **PM4 — RESOLVED 2026-04-02**: Added focus trap to portal mobile sidebar in `portal/portal.js`. Tab/Shift+Tab now cycles within the sidebar when open, Escape key closes it, and focus returns to the hamburger button that opened it. (WCAG 2.4.3)
- **PM3 — RESOLVED 2026-04-02**: Added styled empty state to dashboard activity feed. New `.activity-empty` CSS with clock icon SVG and styled "No activity yet" text. Updated `renderActivity()` in `portal/dashboard.html` to use the new component.

---

## RESOLVED — 2026-04-01 (nightly/2026-04-01)

- **M1 — RESOLVED 2026-04-01**: Updated `og:image` on all 9 public pages to use hero image `images/saudi%20sunset%20hero%20bg.jpg` (1200×630). Changed `og:image:width` to 1200, `og:image:height` to 630, and `twitter:card` from `summary` to `summary_large_image` for better social previews.
- **PM1 — RESOLVED 2026-04-01**: Added `maxlength="200"` to `#threadTitle` input and `maxlength="5000"` to `#threadBody` textarea in `portal/discussions.html`.
- **L8 — RESOLVED 2026-04-01**: Added `aria-label="Join the Collective"` to submit button in `join.html`.

---

## RESOLVED — 2026-03-30 (nightly/2026-03-30)

- **M7 — RESOLVED 2026-03-30**: Added `<meta name="description" content="Member login for Desert Falcons Collective — the inner circle portal.">` to `portal/index.html`
- **M2 — RESOLVED 2026-03-30**: Added `<link rel="canonical">` to all 9 public pages using base URL `https://desert-falcons.vercel.app/`
- **M3 — RESOLVED 2026-03-30**: Added `updateFieldVisibility()` function and `change` listener on `#interest` select in `join-form.js`. On `engineer`: shows `fieldSpecialization`, hides others. On `designer`: shows `fieldDesignDiscipline`, hides others. On `investor`: shows `investorFields`, hides others. On `general`/empty: hides all three. Also fires on page load to set initial state.

---

## RESOLVED — 2026-03-29 (nightly/2026-03-29)

- **M8 — RESOLVED 2026-03-29**: Wired jebel-tuwaiq.jpg into .tuwaiq-bg in ision.css (added ackground-image, ackground-size, ackground-position properties)
- **H1 — RESOLVED 2026-03-29**: Added <li><a href="portal/index.html" class="nav-link nav-portal">Member Portal</a></li> to all 9 public pages (index.html, founders-story.html, vision.html, engineers.html, designers.html, investors.html, join.html, privacy-policy.html, terms-of-use.html)
- **M6 — RESOLVED 2026-03-29**: Added <meta name="robots" content="noindex, nofollow"> inside <head> of all 11 portal pages (index.html, dashboard.html, settings.html, applications.html, announcements.html, discussions.html, directory.html, resources.html, events.html, founders-updates.html, updates.html)

---
**Audit Date:** 2026-03-26 (third pass — delta audit + i18n key sweep)
**Branch:** nightly/2026-03-26
**Agent:** Nightly Audit Agent

---

## CHANGES MADE THIS NIGHT (2026-03-26)

### Bug Fix: Missing i18n translation keys for status badges
- **`portal/portal-i18n.js`**: Added `'approved': 'مقبول'` and `'rejected': 'مرفوض'`
- These are used in `applications.html` via `_t(statusClass)` to localise the application status badge text
- `'pending'` was already present; `'approved'` and `'rejected'` were silently falling back to English

### Committed Uncommitted Working-Tree Changes (19 files)
All 19 uncommitted files from the 2026-03-25 session have been committed to this branch. These are clean i18n improvements — no regressions. Summary:
- `i18n.js`: Added `data-i18n-aria-ar` and `data-i18n-alt-ar` attribute swap support
- `portal/portal-i18n.js`: Added new translation keys (`Write a reply…`, `Edit Event`, `Edit Update`, `Add notes…`, `Upload failed: `, `✓ Password change link sent to`)
- `portal/applications.html`: All hardcoded English field labels, action buttons, and status strings wrapped in `_t()`
- `portal/discussions.html`: i18n applied to `Loading replies…`, `Failed to delete reply:`, `Posting…` strings; key mismatch with `'Loading replies…'` confirmed FIXED
- `portal/resources.html`: `Upload Resource`, `Edit Resource`, `Save Changes`, `Saving…/Uploading…` wrapped in `_t()`
- `portal/settings.html`: All button labels, feedback strings, and status messages wrapped in `_t()`
- `portal/events.html`, `announcements.html`, `founders-updates.html`, `updates.html`: Button state text (`Saving…`, `Posting…`, `Creating…`) wrapped in `_t()`
- Public pages (9): Added `data-i18n-aria-ar` on all nav-toggle buttons
- `IDENTITY.md`: Updated with agent identity for Desert Falcons

---

## CONFIRMED CLEAN — 2026-03-26 CHECK

- All i18n keys used in uncommitted changes: ✅ All verified present in `portal-i18n.js` (node check run)
- `'approved'` and `'rejected'` status badge keys: ✅ FIXED — added to `portal-i18n.js`
- `'Creating…'` and `'Saving…'` keys (events.html): ✅ Present (earlier Select-String showed garbled output due to encoding — node verification confirmed both keys exist)
- All public page assets (CSS, JS, images): ✅ No missing files
- All portal page dependencies: ✅ All exist
- Portal script load order: ✅ `portal-i18n.js` → Supabase CDN → `portal.js` — correct on all 11 pages
- Supabase CDN loads before `join-form.js` on `join.html`: ✅ Confirmed

---

## PUBLIC SITE — Prioritised Findings

### URGENT

*(None)*

---

### HIGH

**H1 — No "Portal / Member Login" link in public navigation** *(still outstanding)*
- All 9 public pages have identical nav menus with no link to `portal/index.html`
- `styles.css` contains a `.nav-portal` class styled for this purpose (gold border, mono font) — never rendered in HTML
- Members who receive login credentials have no way to find the portal via the public site
- **Fix:** Add `<li><a href="portal/index.html" class="nav-link nav-portal">Member Portal</a></li>` to the nav on all 9 pages
- **Files affected:** `index.html`, `founders-story.html`, `vision.html`, `engineers.html`, `designers.html`, `investors.html`, `join.html`, `privacy-policy.html`, `terms-of-use.html`

---

### MEDIUM

**M2 — No canonical links on any public pages** *(still outstanding)*
- None of the 9 public pages include `<link rel="canonical" href="...">`
- **Fix:** Add canonical links to each public page pointing to the primary Vercel URL

**M3 — `join.html` form: specialization dropdown doesn't change for designer/investor roles** *(still outstanding)*
- The engineering specialization dropdown shows regardless of whether user selects "designer" or "investor"
- `join-form.js` has no `#interest` change listener to show/hide `#fieldSpecialization` vs `#fieldDesignDiscipline`
- Both fields are in the HTML but no JS toggles visibility based on role selection
- **Fix:** Add `change` event listener on `#interest` select in `join-form.js` to show/hide the relevant fields:
  - `engineer` → show `#fieldSpecialization`, hide `#fieldDesignDiscipline`, hide `#investorFields`
  - `designer` → hide `#fieldSpecialization`, show `#fieldDesignDiscipline`, hide `#investorFields`
  - `investor` → hide `#fieldSpecialization`, hide `#fieldDesignDiscipline`, show `#investorFields`
  - `general` → hide all three

**M4 — `join-form.js` success state is hardcoded English only** *(still outstanding)*
- `showSuccessState()` renders hardcoded English HTML: `"You're in the Collective."` etc.
- Arabic mode shows the success screen in English
- **Fix:** Add i18n support to success state strings using `window.DFC_i18n` or `i18n.js` approach

**M5 — Script load order: `i18n.js` loaded AFTER `script.js` on all 9 public pages** *(still outstanding)*
- All pages load: `script.js` → `join-form.js` (join only) → [inline timeout] → `i18n.js`
- `script.js` doesn't currently depend on `i18n.js`, so not a current bug, but preventatively risky
- All pages also have a 2500ms inline `setTimeout` for loader fallback — double-timer pattern
- **Fix (preventative):** Move `i18n.js` to load before `script.js`

**M6 — Missing `<meta name="robots" content="noindex, nofollow">` on all 11 portal pages** *(still outstanding)*
- Portal pages are auth-gated in JS but not blocked from search engine crawling via meta tags
- **Fix:** Add `<meta name="robots" content="noindex, nofollow">` to all 11 portal pages

**M7 — No meta description on any portal page, including the public login page** *(still outstanding)*
- `portal/index.html` (publicly accessible login page) has no `<meta name="description">`
- All 11 portal pages confirmed without meta description
- **Fix (priority):** Add `<meta name="description" content="Member login for Desert Falcons Collective — the inner circle portal.">` to `portal/index.html`

**M8 — Jebel Tuwaiq section shows placeholder, not real image** *(still outstanding)*
- `vision.html` section 3 (Spirit of Tuwaiq) uses `.tuwaiq-bg` with an empty div — the placeholder is shown
- `jebel-tuwaiq.jpg` exists in `images/` directory
- `vision.css` has `.tuwaiq-bg { position: absolute; inset: 0; }` with no background-image set
- **Fix:** Add `background-image: url('../images/jebel-tuwaiq.jpg'); background-size: cover; background-position: center;` to `.tuwaiq-bg` in `vision.css`
- Hide `.tuwaiq-image-placeholder` once the real image is wired: `.tuwaiq-image-placeholder { display: none; }` (already set ✅)

---

### LOW

**L1 — No `robots.txt` or `sitemap.xml` in project root** *(still outstanding)*
- No `robots.txt` — portal pages could be crawled
- No `sitemap.xml` for the 9 public pages
- **Fix:** Add `robots.txt` disallowing `/portal/` and a basic `sitemap.xml`

**L2 — `founders-story.html` "Coming Soon" timeline label**
- Current/future timeline point uses `"Coming Soon"` — could feel unpolished
- **Fix (low):** Change to "2026 →" or "The Next Chapter" — awaiting operator brand confirmation

**L3 — `founders-story.html` has placeholder div for team photo** *(unchanged)*
- `<div class="call-image" data-placeholder="Desert Falcons Collective Team">` renders a placeholder
- Intentional until real photo is available — safe to leave as-is

**L4 — Custom cursor DOM elements always rendered on mobile**
- 5 cursor divs hidden via CSS on mobile, but still in DOM
- Negligible impact

**L5 — Loading screen: dual timer pattern on all 9 public pages**
- All pages load `script.js` (hides loader at ~2300ms) AND have an inline `setTimeout` at 2500ms
- Harmless but redundant
- **Fix (low):** Remove inline `setTimeout` from pages that load `script.js`

**L6 — Social media links absent from footer** *(unchanged)*
- Footer "Connect" column: only "Join Us" and "Contact" — no social links
- Likely intentional at this stage

**L7 — Contact email in footer — operational status unknown**
- `contact@desertfalconscollective.com` present in footer across all pages
- Operators should confirm this mailbox is active

---

## PORTAL — Prioritised Findings

### URGENT

*(None)*

---

### HIGH

**PH1 — All 11 portal pages missing `<meta name="robots" content="noindex">` and meta descriptions** *(see M6/M7 above)*

---

### MEDIUM

**PM2 — `settings.html` avatar upload — Supabase storage bucket setup**
- `supabase-avatars-setup.sql` exists in the portal directory
- **Action:** Operators must verify this SQL has been run against the Supabase instance

**PM3 — RESOLVED 2026-04-02** *(see RESOLVED section above)*

**PM4 — RESOLVED 2026-04-02** *(see RESOLVED section above)*

---

### LOW

**PL1 — Portal login page background image not lazy-loaded**
- `founders-hero.jpg` as CSS background fires immediately
- Consider compressing the image if load times are slow on mobile

**PL2 — No `favicon.svg` on portal pages** *(minor inconsistency)*
- Portal pages: `favicon-dfc.png` only; public pages also have `favicon.svg`
- Cosmetic only

**PL3 — Analytics widget (dashboard) relies on `showRoleUI()` — silent failure risk**
- If role string doesn't match exactly (e.g. `'Admin'` vs `'admin'`), block stays hidden
- `portal.js` normalises to lowercase ✅
- **Action:** Verify in production that admin users see analytics block

---

## RESOLVED SINCE LAST AUDIT

- **M8 (2026-03-24 H4 — vision pillar placeholders)**: ✅ FIXED — all 3 pillar placeholders now have real images
- **i18n `Loading replies…` key mismatch**: ✅ FIXED — `discussions.html` now uses `_t('Loading replies…')` matching key in `portal-i18n.js`
- **`'approved'` and `'rejected'` missing i18n keys**: ✅ FIXED (2026-03-26) — added to `portal-i18n.js`
- **i18n: aria-label and alt attribute swapping**: ✅ Added to `i18n.js` via `data-i18n-aria-ar` / `data-i18n-alt-ar`
- **portal: many hardcoded English strings**: ✅ Wrapped in `_t()` across applications, discussions, resources, settings, events, announcements, updates, founders-updates

---

## QUICK WIN PRIORITY ORDER (for next nightly agent)

1. **Verify Supabase storage bucket setup for avatar upload** (PM2) — operators action
2. **Compress portal login background image** (PL1) — optional performance improvement
