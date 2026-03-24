# DEV-IN-PROGRESS.md — Desert Falcons Audit
**Audit Date:** 2026-03-24
**Branch:** nightly/2026-03-24
**Agent:** Nightly Audit Agent

---

## SUMMARY

Full site audit covering 9 public marketing pages + 11 portal pages. No broken 404s found. No missing assets. Auth flow structurally correct. Key issues are missing portal nav link on public site, exposed Supabase key in JS, image placeholders not upgraded, missing portal login meta, and accessibility gaps.

---

## PUBLIC SITE — Prioritised Findings

### URGENT

*(None — no 404s, no missing JS/CSS, no broken auth)*

### HIGH

**H1 — No "Portal / Member Login" link in public navigation**
- All 9 public pages have identical nav menus with no link to `portal/index.html`
- `styles.css` contains a `.nav-portal` class styled for this purpose (gold border, mono font) — but it's never rendered in any HTML
- Members who receive their login credentials have no way to find the portal via the site
- **Fix:** Add `<li><a href="portal/index.html" class="nav-link nav-portal">Member Portal</a></li>` to the nav on all 9 pages
- **Files affected:** `index.html`, `founders-story.html`, `vision.html`, `engineers.html`, `designers.html`, `investors.html`, `join.html`, `privacy-policy.html`, `terms-of-use.html`

**H2 — Supabase anon key hardcoded in public-facing JS**
- `join-form.js` contains the Supabase anon key as a plaintext string constant
- Note: Supabase anon keys are designed to be semi-public (RLS enforces access control), but it is still best practice to keep them out of plain JS files where possible
- `portal/portal.js` also has the same key — unavoidable for auth-gated pages, acceptable
- **Risk level:** Medium-Low (anon key + RLS = acceptable, but worth noting for security review)
- **Fix:** Consider moving the key to a config file or env injection at build time if the project ever adds a build step

**H3 — `legal.html` referenced in AGENT-BRIEF key files list but does not exist**
- AGENT-BRIEF.md lists `legal.html` as a key file but the file is absent from the project
- Privacy Policy and Terms of Use exist as separate pages (`privacy-policy.html`, `terms-of-use.html`)
- No internal links reference `legal.html` — but AGENT-BRIEF should be updated to remove/correct this entry
- **Fix:** Remove `legal.html` from AGENT-BRIEF.md key files list, or create a redirect/stub if the combined legal page was intended

**H4 — Jebel Tuwaiq image exists but vision page uses CSS placeholder**
- `images/jebel-tuwaiq.jpg` is present in the repo but `vision.html` shows a CSS SVG placeholder div for the Tuwaiq section
- The image asset is ready; the placeholder just hasn't been wired in
- **Fix:** In `vision.css`, set `background-image: url('../images/jebel-tuwaiq.jpg')` on `.tuwaiq-bg`, and set `.tuwaiq-image-placeholder { display: none; }` (it's already hidden — just add the background to `.tuwaiq-bg`)

**H5 — Vision page pillar sections use empty placeholder divs**
- Three `<div class="pillar-image-placeholder">` elements in `vision.html` have no images and no content — they render as blank styled boxes
- **Fix:** Either add placeholder images (e.g. from `/images/`) or collapse them to `display: none` until real assets are ready

**H6 — Founders Story page has "image placeholder" comment div for team photo**
- `founders-story.html` has `<div class="call-image" data-placeholder="Desert Falcons Collective Team">` — a placeholder for a team/collective photo that has never been populated
- **Fix:** Add a real collective image or remove the placeholder block

---

### MEDIUM

**M1 — `join.html` submit button missing `aria-label`**
- `<button type="submit" class="join-submit-btn">` has no `aria-label` attribute
- The button does contain a visible text `<span>` inside it, which provides accessible name — acceptable but worth formalising
- **Fix:** Add `aria-label="Join the Collective"` to the submit button for explicit accessibility

**M2 — All OG share images use logo (512×512) instead of a hero image**
- Every public page uses `images/dfc-logo.png` (square logo) as the OG/Twitter card image
- Social shares (WhatsApp, Twitter, LinkedIn) will show the logo rather than a compelling visual
- The hero background `images/saudi sunset hero bg.jpg` or `images/founders-hero.jpg` would be more engaging
- **Fix:** Create a 1200×630px hero image for OG tags, or switch to one of the existing hero images. Update `og:image:width` and `og:image:height` accordingly on all pages

**M3 — No canonical links on any public pages**
- None of the public pages include `<link rel="canonical" href="...">` meta tag
- Important for SEO to prevent duplicate content issues (especially if the site is deployed to multiple domains/subdomains)
- **Fix:** Add canonical links to each public page pointing to the primary vercel URL

**M4 — Portal login page (`portal/index.html`) has no meta description**
- The login page has no `<meta name="description">` or OG tags
- While auth-gated pages don't need rich OG, the login page IS publicly accessible and indexed
- **Fix:** Add `<meta name="description" content="Member login for Desert Falcons Collective — the inner circle portal for engineers, designers, and investors.">` to `portal/index.html`

**M5 — All portal pages missing meta descriptions**
- 10 of 11 portal pages (all except the login) have no `<meta name="description">` tags
- These pages are auth-gated and won't appear in search results normally, so lower priority
- **Fix:** Add noindex meta + basic descriptions as a best practice for when users share portal links

**M6 — `founders-story.html` "Coming Soon" timeline entry**
- The current/future timeline point shows `<div class="timeline-year">Coming Soon</div>` — intentional, but the label lacks context
- Could read as a UI bug to first-time visitors
- **Fix:** Change to a more intentional label like "2026" or "The Next Chapter" rather than "Coming Soon" to feel more deliberate

**M7 — `vision.html` Tuwaiq section has inner HTML placeholder text visible**
- The `<span>Jebel Tuwaiq Mountains</span>` label inside `.tuwaiq-image-placeholder` is hidden via `display:none` on the wrapper CSS, so it doesn't render
- However, the HTML comment `SECTION 3: The Spirit of Tuwaiq - Full Width Quote` is visible in source — minor but worth cleaning
- **Fix:** Remove the inline HTML comments in production builds (cosmetic)

**M8 — `join.html` form: `fieldSpecialization` select options not updated when interest changes to "designer" or "investor"**
- The specialization dropdown has engineering options hardcoded (Powertrain, Chassis, Battery, Software, Materials, Testing)
- When a user selects "designer" or "investor" as their interest, the specialization dropdown still shows engineering terms
- `join-form.js` has no logic to swap select options based on role selection (though role pills exist on the left for context)
- **Fix:** Add JS in `join-form.js` to hide/show `#fieldSpecialization` vs `#fieldDesignDiscipline` based on the selected interest, and grey out irrelevant fields

**M9 — Script load order: `i18n.js` loaded AFTER `script.js` on public pages**
- On all 9 public pages, `script.js` loads before `i18n.js`
- `script.js` doesn't depend on `i18n.js` so this is not currently a bug — but if `script.js` ever reads `window.DFC_i18n`, it would fail
- **Fix (preventative):** Swap order to load `i18n.js` before `script.js` on all pages

---

### LOW

**L1 — No favicon for portal pages using the correct relative path**
- Portal pages use `href="../favicon-dfc.png"` — correct relative path, file exists. ✅ Fine.
- However, no `favicon.svg` link on portal pages (public pages have it). Minor inconsistency.

**L2 — Custom cursor only hides on mobile via CSS (`display:none`) but cursor DOM elements still render**
- On mobile, the 5 cursor divs are hidden via CSS but still present in the DOM — negligible performance impact
- **Fix (nice-to-have):** Could be JS-skipped if `window.innerWidth < 1024` before appending

**L3 — Loading screen fallback has two independent timers**
- Some pages have both the `script.js` `setTimeout` (2300ms) AND an inline fallback `setTimeout` (2500ms) at the bottom of the body
- This means the loader-hide logic fires twice — harmless but redundant
- **Fix:** Remove the inline fallback `setTimeout` from all pages that also load `script.js`, since `script.js` already handles this

**L4 — `privacy-policy.html` and `terms-of-use.html` missing `<meta name="keywords">`**
- Other public pages have keywords meta; the legal pages don't
- Lower priority — keywords meta has negligible SEO value in 2026

**L5 — No `robots.txt` or `sitemap.xml` in project root**
- No robots.txt present — portal pages could be crawled unless the portal's server-side auth prevents it
- No sitemap.xml to help search engines discover public pages
- **Fix:** Add `robots.txt` disallowing `/portal/` and a basic `sitemap.xml` for the 9 public pages

**L6 — Contact email `contact@desertfalconscollective.com` used in footer across all pages**
- Email is present in footer on all public pages — no indication this mailbox is active
- Worth confirming with operators that the email is monitored

**L7 — Social media links absent from footer**
- Footer "Connect" column has only "Join Us" and "Contact" — no social links (LinkedIn, Twitter/X, Instagram)
- Likely intentional at this stage but worth noting for future

**L8 — `join-form.js` success state text is hardcoded English only**
- `showSuccessState()` renders hardcoded English HTML: "You're in the Collective." etc.
- When a user has the site in Arabic mode, the success state is displayed in English
- **Fix:** Add Arabic translations to the success state strings, or use `window.DFC_i18n` to translate them

---

## PORTAL — Prioritised Findings

### URGENT

*(None — auth flow correct, Supabase integration structurally sound, all 11 pages load required dependencies)*

### HIGH

**PH1 — `portal/index.html` (login page) has no meta description**
- The login page is publicly accessible, crawlable, and has no `<meta name="description">`
- This is the entry point for potential members — it should describe the portal
- **Fix:** Add meta description and basic OG tags (see M4 above)

**PH2 — `applications.html` shows 0 `_supabase` references inline but sidebar uses it**
- `applications.html` has `portal.js` loaded (which defines `_supabase`) and doesn't reference it inline — the page logic runs entirely through portal.js functions
- All functions (`requireAuth`, `initTopbar`, etc.) rely on `_supabase` being defined in portal.js ✅
- However, if portal.js fails to load (CDN outage), ALL portal pages break silently with no error message
- **Fix:** Add a fallback `<noscript>` or error banner for when JS fails to load entirely

**PH3 — Portal sidebar does not have "Founder's Updates" translated link text in sidebar i18n**
- `dashboard.html` sidebar has `Founder's Updates` as plain text (not wrapped in `data-ar`) in the nav
- When portal is switched to Arabic, "Founder's Updates" stays in English in the sidebar
- **Fix:** Wrap sidebar nav labels with `data-ar` attributes matching portal-i18n.js keys (the i18n system supports `data-ar` attribute on elements)

### MEDIUM

**PM1 — All authenticated portal pages lack `<meta name="robots" content="noindex">`**
- Portal pages are auth-gated but not explicitly disallowed from indexing via meta tag
- If someone shares a portal URL publicly, Google could try to crawl it
- **Fix:** Add `<meta name="robots" content="noindex, nofollow">` to all portal pages

**PM2 — Dashboard `activity_feed` table — no graceful empty state styling**
- The activity feed shows "Loading…" as a div with class `loading-text` but no visual spinner or skeleton
- On a new deployment with no data, the dashboard could show "No activity yet." without clear styling
- **Fix:** Add a proper empty-state component with an icon and message

**PM3 — `portal-i18n.js` has garbled Arabic strings (encoding issue in current read)**
- The portal-i18n.js file was read and showed garbled Arabic strings (e.g., `'O-U?O,'` instead of Arabic script)
- This may be a PowerShell/console encoding issue in the audit tool, NOT an actual file corruption
- **Action:** Operators should verify the file renders correctly in a browser to confirm it's not a file encoding issue

**PM4 — `discussions.html` new thread form — no max character limit on title/body inputs**
- Discussions can create threads but there's no `maxlength` attribute visible on thread title/body inputs
- Without DB-side length constraints in Supabase schema, very long posts could break UI
- **Fix:** Add `maxlength="200"` to thread title and `maxlength="5000"` to thread body

**PM5 — Portal mobile menu — no focus trap**
- When the sidebar opens on mobile, keyboard focus can escape behind the overlay
- **Fix:** Add a basic focus trap when the mobile sidebar is open (WCAG 2.4.3 compliance)

**PM6 — `settings.html` — avatar upload implementation**
- Settings page has avatar upload functionality — ensure the Supabase storage bucket is configured correctly
- `supabase-avatars-setup.sql` exists in the portal directory (good)
- **Action:** Verify this SQL has been run against the Supabase instance before marketing the settings page to members

**PM7 — Portal pages: `founders-updates.html` link shows in sidebar as "Founder's Updates" (apostrophe)**
- The apostrophe in `Founder's Updates` renders fine in HTML but the text content in portal-i18n.js key uses a different form
- Minor — verify no JS key mismatch between `"Founder's Updates"` as rendered text and the i18n lookup key

### LOW

**PL1 — Portal login page background image (`founders-hero.jpg`) is a large file**
- The login page background uses `images/founders-hero.jpg` as a full-bleed background
- No `<img>` with `loading="lazy"` — this fires immediately as a CSS background
- Verify image is compressed (the file exists but size not checked)

**PL2 — No `favicon.svg` on portal pages**
- Portal pages use `favicon-dfc.png` only; public pages also have `favicon.svg` as a fallback
- Minor inconsistency

**PL3 — Analytics widget (dashboard) only visible to `core_board` / `admin` roles via `data-role`**
- The analytics block has `style="display:none"` and relies on `showRoleUI()` to reveal it
- If `showRoleUI()` fails or the role doesn't match exactly, admins won't see analytics
- **Fix:** Add logging or a fallback if the analytics block remains hidden for admin users

**PL4 — No keyboard shortcut or quick search in portal**
- The portal has no global search or keyboard shortcuts (e.g. `Cmd+K`)
- As content grows, discoverability will suffer
- **Fix (future):** Consider a simple search overlay across announcements, resources, and discussions

---

## FILES CONFIRMED CLEAN / NO ISSUES

- All public page image assets: ✅ Present — no 404s
- All CSS files (`styles.css`, `designers.css`, `engineers.css`, `investors.css`, `vision.css`, `founders-story.css`, `join.css`, `legal.css`): ✅ Linked and exist
- Script load order on portal pages: ✅ Correct (portal-i18n.js → Supabase CDN → portal.js → inline)
- Supabase client init in portal: ✅ `_supabase` defined before any inline usage
- Mobile nav hamburger on all portal pages: ✅ Present on all authenticated pages
- Mobile breakpoints: ✅ All CSS files have `@media (max-width:...)` rules
- i18n.js loaded on all public pages: ✅ Confirmed
- Supabase CDN loaded before portal.js: ✅ Confirmed all portal pages
- Terms of Use and Privacy Policy pages: ✅ Exist and linked correctly
- Join form Supabase integration: ✅ Structurally correct (table `collective_applications`, error handling present)
- Portal auth redirect (login → dashboard): ✅ `requireAuth()` used on all authenticated pages
- Portal sign-out: ✅ `.btn-logout` bound globally in portal.js
- All portal pages have viewport meta: ✅ Confirmed

---

## QUICK WIN PRIORITY ORDER (for next nightly agent)

1. Add portal link to all public nav menus (H1) — 9 files, find-replace friendly
2. Add `<meta name="robots" content="noindex, nofollow">` to all 11 portal pages (PM1)
3. Add meta description to `portal/index.html` (PH1/M4)
4. Add canonical links to all 9 public pages (M3)
5. Wire `jebel-tuwaiq.jpg` into vision.html tuwaiq section background (H4)
6. Fix join form specialization/discipline dropdown swap logic (M8)
7. Fix Arabic success state in join-form.js (L8)
8. Fix dual loader timer on pages that include both script.js and inline setTimeout (L3)
9. Add `robots.txt` and basic `sitemap.xml` (L5)
10. Add `aria-label` to join submit button (M1)
