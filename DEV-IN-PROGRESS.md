# DEV-IN-PROGRESS.md — Desert Falcons Audit
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

**M1 — All OG share images use logo (512×512) instead of a hero image** *(still outstanding)*
- Every public page uses `images/dfc-logo.png` as the OG/Twitter card image
- Social shares (WhatsApp, Twitter, LinkedIn) show a square logo rather than a compelling hero
- **Fix:** Create a 1200×630px hero image, or switch to one of the existing hero images (e.g. `images/saudi sunset hero bg.jpg`)

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

**L8 — `join.html` submit button: no `aria-label` attribute**
- `<button type="submit" class="join-submit-btn">` has visible text via inner span (accessible)
- **Fix (low):** Add explicit `aria-label="Join the Collective"` for robustness

---

## PORTAL — Prioritised Findings

### URGENT

*(None)*

---

### HIGH

**PH1 — All 11 portal pages missing `<meta name="robots" content="noindex">` and meta descriptions** *(see M6/M7 above)*

---

### MEDIUM

**PM1 — `discussions.html` thread title and body inputs have no `maxlength`** *(still outstanding)*
- `<input id="threadTitle">` and `<textarea id="threadBody">` have no `maxlength`
- **Fix:** Add `maxlength="200"` to `#threadTitle` and `maxlength="5000"` to `#threadBody`

**PM2 — `settings.html` avatar upload — Supabase storage bucket setup**
- `supabase-avatars-setup.sql` exists in the portal directory
- **Action:** Operators must verify this SQL has been run against the Supabase instance

**PM3 — Dashboard `activity_feed` no styled empty state**
- Activity feed shows "Loading…" but no visual spinner; empty state is plain text
- **Fix (medium):** Add an icon for the no-activity empty state

**PM4 — Portal mobile menu has no focus trap**
- Keyboard focus can escape behind the overlay when sidebar opens on mobile
- **Fix:** Add basic focus trap when mobile sidebar is open (WCAG 2.4.3)

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

1. **Wire `jebel-tuwaiq.jpg` into `.tuwaiq-bg` in `vision.css`** (M8) — 2-line CSS fix, confirmed image exists
2. **Add portal link to all 9 public nav menus** (H1) — find-replace friendly, 9 files
3. **Add `<meta name="robots" content="noindex, nofollow">` to all 11 portal pages** (M6) — bulk find-replace
4. **Add meta description to `portal/index.html` login page** (M7 priority) — single file, 1-line fix
5. **Add canonical links to all 9 public pages** (M2) — bulk insert, know the Vercel URL
6. **Fix join form field show/hide logic** (M3) — add `change` listener on `#interest` in `join-form.js`
7. **Fix Arabic success state in `join-form.js`** (M4) — uses `window.DFC_i18n` or inline check
8. **Add `robots.txt` and basic `sitemap.xml`** (L1) — new files, short
9. **Swap `i18n.js` to load before `script.js` on all 9 public pages** (M5) — preventative
10. **Add `maxlength` to discussion thread title/body inputs** (PM1)
11. **Add `aria-label` to join submit button** (L8)
