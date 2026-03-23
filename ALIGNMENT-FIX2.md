# ALIGNMENT-FIX2 — RTL Text-Alignment Audit & Corrections

**Date:** 2026-03-23
**Core rule applied:**
- LTR `left` → RTL **`right`**
- LTR `center` → RTL **`center`** (unchanged)
- LTR `right` → RTL **`left`**

---

## Files changed

### 1. `styles.css` (lines ~1853–1875)

#### Problem A — `.hero-content` incorrectly forced to `text-align: right` in RTL
- **LTR rule:** `.hero-content { text-align: center; }` (explicit, line 709)
- **Bad RTL rule:** `html[dir="rtl"] .hero-content { text-align: right; }`
- **Fix:** Removed `.hero-content` from the `text-align: right` block. Now only `direction: rtl` is applied to it, leaving the LTR `text-align: center` intact.

#### Problem B — `.section-title`, `.chapter-title`, `.chapter-title-large` set to `center` in RTL
- **LTR rule:** No explicit `text-align` on any of these classes — they inherit `left` from `<body>`.
- **Bad RTL rule:** `html[dir="rtl"] .section-title, .chapter-title, .chapter-title-large { text-align: center; }`
  (The comment "Centered elements stay centered" was factually wrong for these classes.)
- **Fix:** Changed to `text-align: right` for all three, so they correctly mirror their LTR left-alignment.

#### Problem C — `.hero-subtitle` not covered by centre exemption
- **LTR:** `.hero-subtitle` inherits `text-align: center` from its parent `.hero-content`.
- **Bad RTL:** The global `html[dir="rtl"] p { text-align: right }` rule overrode the inherited centre.
- **Fix:** Added `html[dir="rtl"] .hero-subtitle { text-align: center; }` alongside `.hero-title`.

#### Addition — `.cta-content .section-title` centre exemption
- **LTR:** `.cta-content { text-align: center; }` (explicit, line 1456) — its `.section-title` child inherits centre.
- After fixing `.section-title` to `right`, the CTA title would incorrectly become right-aligned.
- **Fix:** Added `html[dir="rtl"] .cta-content .section-title { text-align: center; }` (specificity 0,3,0 beats the 0,2,0 general rule).

---

### 2. `portal/portal.css` (RTL block, `html.ar` rules)

#### Problem D — `.login-title`, `.login-sub`, `.login-footer` set to `right` in RTL
- **LTR rules:**
  - `.login-title { text-align: center; }` (line 145)
  - `.login-sub { text-align: center; }` (line 152)
  - `.login-footer { text-align: center; }` (line 312)
- **Bad RTL rule:** `html.ar .login-title, .login-sub, .login-footer { text-align: right; }`
- **Fix:** Changed to `text-align: center` — the login card is a centered modal-style panel; its labels and footer should remain centred in both languages.

#### Problem E — `.founder-page-header` had no RTL centre exemption
- **LTR rule:** `.founder-page-header { text-align: center; }` (line 1635)
- **Bad RTL:** The global `html.ar .portal-content, html.ar .portal-content * { text-align: right; }` overrode it to `right` with no exception.
- **Fix:** Added `html.ar .founder-page-header { text-align: center; }` before the founder-cards block.

---

## Files with no issues found

| File | Result |
|------|--------|
| `designers.css` | RTL block correct — no text-align:center overrides |
| `engineers.css` | RTL block correct — text-align:right only |
| `investors.css` | RTL block correct — text-align:right only |
| `join.css` | RTL block correct — no text-align in RTL block |
| `vision.css` | RTL block correct — text-align:right / left (mirrored right) only |
| `founders-story.css` | RTL block correct — no text-align overrides |
| `legal.css` | RTL block correct — text-align:right only |

## Inline styles in HTML

Scanned all `*.html` files in root and `portal/` for `style="text-align:..."`.
**No inline text-align styles found.** No class-based workaround needed.

---

## What was NOT changed

- `html[dir="rtl"] .hero-title { text-align: center }` — kept, correct (hero is centred in LTR)
- `html.ar .member-card { text-align: center }` — kept, correct (member cards are centred in LTR)
- `html.ar .analytics-stat { text-align: center }` — kept, correct (stat blocks are centred in LTR)
- `html[dir="rtl"] .quote-mark.closing { text-align: left }` — kept, correct (mirrors a right-aligned element)
- `html[dir="rtl"] .analytics-row-count { text-align: left }` — kept, correct (mirrors a right-aligned counter)
- All `border-left/right` swaps, `padding-left/right` swaps, and `translateX` sign flips — untouched, all correct.
