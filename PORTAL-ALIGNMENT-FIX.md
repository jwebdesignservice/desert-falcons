# Portal RTL Alignment Fix

**File modified:** `portal/portal.css`

---

## Root Cause

The section labelled `/* ── Global RTL text alignment ── */` contained a
wildcard selector:

```css
html.ar .portal-content,
html.ar .portal-content * {
  text-align: right;
}
```

The `html.ar .portal-content *` rule has specificity `0,2,1`, which is higher
than any single-class LTR rule (e.g. `.loading-text { text-align: center }`
has specificity `0,1,0`). This meant every element inside `.portal-content`
was forced to `text-align: right`, regardless of its LTR value.

---

## The Rule Applied

| LTR alignment | RTL alignment |
|---|---|
| left-aligned (default) | right-aligned (auto via `direction: rtl`) |
| center-aligned | center-aligned (unchanged) |
| right-aligned | left-aligned |

---

## Change Made

### 1. Removed `text-align` from the wildcard

**Before:**
```css
html.ar .portal-content,
html.ar .portal-content * {
  text-align: right;
}
```

**After:**
```css
html.ar .portal-content {
  direction: rtl;
}
```

The `*` selector has been removed entirely. `direction: rtl` is redundant
(already set on `html.ar`) but kept for clarity. Left-aligned elements
naturally become right-aligned in RTL because the CSS default `text-align`
is `start`, and `start` equals `right` when `direction: rtl` is active.

---

### 2. Added explicit centre-preservation overrides

The following classes have `text-align: center` in LTR CSS and previously
had that value crushed by the wildcard. Explicit `html.ar` overrides now
restore their centre alignment:

| Class | Location | Notes |
|---|---|---|
| `.loading-text` | All pages | Empty-state / loading indicators |
| `.btn-download` | resources.html | Download button in resource cards |
| `.resource-icon` | resources.html | Emoji icon column in resource cards |
| `.founder-card-type-icon` | founders-updates.html | Emoji icon in founder cards |
| `.dash-resource-icon` | dashboard.html | Emoji icon in dashboard resource rows |
| `.login-logo` | index.html (login) | Logo block above the login form |

These join the pre-existing centre-preservation rules that were already
correct:

| Class | Status |
|---|---|
| `.member-card, .member-card *` | Already had `text-align: center` override |
| `.analytics-stat, .analytics-stat-value` | Already had `text-align: center` override |
| `.founder-page-header` | Already had `text-align: center` override |
| `.login-title, .login-sub, .login-footer` | Already had `text-align: center` override |

---

## Elements Verified as Correctly Right-Aligned in RTL

These elements are left-aligned in LTR (no explicit `text-align`). They
become right-aligned naturally via `html.ar { direction: rtl }` and/or
already have explicit `html.ar { text-align: right }` overrides in the file:

- `.page-header`, `.page-title`, `.page-subtitle`
- `.form-label`
- `.announcement-title`, `.announcement-preview`, `.announcement-body`
- `.update-title`, `.update-meta`, `.update-body`
- `.thread-title`, `.thread-preview`
- `.founder-card-title`, `.founder-card-date`, `.founder-card-body`
- `.event-title`, `.event-desc`
- `.resource-title`, `.resource-meta`
- `.dash-announce-title`, `.dash-announce-body`
- `.dash-mini-info`, `.dash-event-info`, `.dash-resource-info`
- `.activity-content`, `.activity-desc`, `.activity-time`
- `.notif-title`, `.notif-desc`
- `.modal-title`, `.modal-subtitle`
- `.step-content`, `.step-title`, `.step-desc`
- `.sidebar-member-name`, `.sidebar-member-role`, `.logo-tag`
- `.app-name`, `.app-email`, `.app-field`, `.notes-label`
- `.settings-card-header`

---

## No HTML Changes

All fixes are CSS-only. No HTML content or translations were modified.
