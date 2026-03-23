# Arabic / RTL Audit — Desert Falcons Collective
**Date:** 2026-03-23
**Scope:** Second pass — all remaining files not covered by the previous pass.

---

## Summary

The previous pass already fixed: designers.html, engineers.html, i18n.js, join.html, privacy-policy.html, terms-of-use.html.

This pass covered the four main-site pages and all eleven portal pages, plus three page-specific CSS files.

---

## Main Site HTML

### index.html
**Status: No changes required.**
All `data-i18n` elements already have matching `data-i18n-ar` attributes. The `<html>` tag has `lang="en" dir="ltr"` — correct.

### vision.html
**Status: No changes required.**
All `data-i18n` elements already have `data-i18n-ar` pairs. `<html lang="en" dir="ltr">` — correct.

### investors.html
**Status: No changes required.**
Full Arabic coverage on all translatable elements. `<html lang="en" dir="ltr">` — correct.

### founders-story.html
**Status: No changes required.**
All `data-i18n` elements have `data-i18n-ar` pairs. `<html lang="en" dir="ltr">` — correct.

---

## Portal HTML

All eleven portal pages had `<html lang="en">` with no `dir` attribute. The `portal-i18n.js` sets `dir` dynamically on language switch, but the initial HTML should declare `dir="ltr"` explicitly for progressive enhancement.

### portal/index.html
- Added `dir="ltr"` to `<html>` tag.
- Added `data-ar="صقور الصحراء"` to `<span class="logo-text">DESERT FALCONS</span>` (brand name in login logo).

### portal/dashboard.html
- Added `dir="ltr"` to `<html>` tag.
- All content labels already carry `data-ar` attributes. Sidebar nav text nodes and the "Navigation" heading are handled by `portal-i18n.js` auto-translation.

### portal/applications.html
- Added `dir="ltr"` to `<html>` tag.
- Added `data-ar="جارٍ تحميل الطلبات…"` to the initial loading text div (`id="applicationsList" .loading-text`).
- Added `data-ar="⛔ هذه الصفحة مقيدة لأعضاء المجلس التأسيسي والمسؤولين."` to the access-denied message div.

### portal/announcements.html
- Added `dir="ltr"` to `<html>` tag.
- All `data-ar` attributes already present on visible static elements.

### portal/directory.html
- Added `dir="ltr"` to `<html>` tag.
- Added `data-ar="جارٍ تحميل الأعضاء…"` to the initial loading text div in `#directoryGrid`.

### portal/discussions.html
- Added `dir="ltr"` to `<html>` tag.
- Added `data-ar="جارٍ التحميل…"` to the initial loading text div in `#threadList`.

### portal/events.html
- Added `dir="ltr"` to `<html>` tag.
- Added `data-ar="جارٍ تحميل الفعاليات…"` to the initial loading text div in `#eventsList`.

### portal/founders-updates.html
- Added `dir="ltr"` to `<html>` tag.
- Added `data-ar="جارٍ تحميل التحديثات…"` to the initial loading text div in `#foundersList`.

### portal/resources.html
- Added `dir="ltr"` to `<html>` tag.
- Added `data-ar="جارٍ تحميل الموارد…"` to the initial loading text div in `#resourcesGrid`.
- **Upload Resource modal** — all form fields were missing Arabic attributes:
  - `<label>Title</label>` → added `data-ar="العنوان"`
  - `<label>Category</label>` → added `data-ar="الفئة"`
  - `<label>File Type</label>` → added `data-ar="نوع الملف"`
  - `<label>Upload File</label>` → added `data-ar="رفع الملف"`
  - `<label>Or paste URL</label>` → added `data-ar="أو الصق رابطاً"`
  - `(optional)` span → added `data-ar="(اختياري)"`
  - `#resTitle` input → added `data-ar-placeholder="عنوان المورد…"`
  - `#resourceSubmit` button → added `data-ar="رفع مورد"`
  - All `#resCategory` `<option>` elements → added `data-ar` with Arabic category names.
  - All `#resFileType` `<option>` elements → added `data-ar` with Arabic file type names.

### portal/settings.html
- Added `dir="ltr"` to `<html>` tag.
- All `data-ar` and `data-ar-placeholder` attributes already present on visible static elements.

### portal/updates.html
- Added `dir="ltr"` to `<html>` tag.
- Added `data-ar="جارٍ التحميل…"` to the initial loading text div in `#updatesList`.

---

## CSS Files

### vision.css
Added `/* Arabic / RTL Overrides */` section at end of file:
- `html[dir="rtl"] .side-features` — changed `text-align` from `left` to `right`.
- `html[dir="rtl"] .image-frame-accent` — flipped decorative corner accent: `right: -15px` → `left: -15px`; `border-right` → `border-left`.

### investors.css
Added `/* Arabic / RTL Overrides */` section at end of file:
- `html[dir="rtl"] .inv-section-header--left` — `text-align: left` → `text-align: right`.
- `html[dir="rtl"] .idb-suitability` — flipped `border-left` → `border-right`; `padding-left` → `padding-right`.
- `html[dir="rtl"] .ifaq-a p` — flipped `border-left` → `border-right`; `padding-left` → `padding-right`.

### founders-story.css
Added `/* Arabic / RTL Overrides */` section at end of file:
- `html[dir="rtl"] .inline-quote` — flipped `border-left` → `border-right`; `padding-left` → `padding-right`.
- `html[dir="rtl"] .fi-editorial-left` — flipped `border-right` → `border-left`; `padding-right` → `padding-left`.

### styles.css
No changes — already contains comprehensive `html[dir="rtl"]` rules (added in previous pass).

### portal/portal.css
No changes — already contains a full `html.ar` RTL override section (sidebar flip, topbar reverse, modal alignment, dashboard grid, etc.).

---

## portal/portal-i18n.js
Added missing translation keys to the `AR` dictionary so `_t()` calls in JS-rendered content are covered:

- `'Loading applications…'` → `'جارٍ تحميل الطلبات…'`
- `'Loading members…'` → `'جارٍ تحميل الأعضاء…'`
- `'Loading events…'` → `'جارٍ تحميل الفعاليات…'`
- `'Loading updates…'` → `'جارٍ تحميل التحديثات…'`
- `'Loading resources…'` → `'جارٍ تحميل الموارد…'`
- `'File Type'` → `'نوع الملف'`
- `'Upload File'` → `'رفع الملف'`
- `'Resource title…'` → `'عنوان المورد…'`
- `'Edit Resource'` → `'تعديل المورد'`

---

## Files with No Changes Required

| File | Reason |
|------|--------|
| `index.html` | All `data-i18n-ar` present; `dir="ltr"` set |
| `vision.html` | All `data-i18n-ar` present; `dir="ltr"` set |
| `investors.html` | All `data-i18n-ar` present; `dir="ltr"` set |
| `founders-story.html` | All `data-i18n-ar` present; `dir="ltr"` set |
| `portal/portal.css` | RTL `html.ar` section already comprehensive |
| `styles.css` | RTL `html[dir="rtl"]` section already comprehensive |
