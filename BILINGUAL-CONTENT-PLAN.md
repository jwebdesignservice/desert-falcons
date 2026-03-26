# Bilingual Content Plan — Desert Falcons Portal

## Overview

The DFC portal supports dual-language content (English + Arabic). Language detection uses `window.dfc_i18n?.isAr` (set by `portal-i18n.js`) and/or `document.documentElement.classList.contains('ar')`.

When Arabic mode is active, content fields fall back gracefully: if an Arabic value exists it is shown; otherwise the English value is displayed.

---

## Database Columns Added (`supabase-i18n-content.sql`)

| Table | New Columns |
|-------|-------------|
| `announcements` | `title_ar`, `body_ar` |
| `events` | `title_ar` |
| `resources` | `title_ar` |
| `project_updates` | `title_ar`, `content_ar` |
| `founders_updates` | `title_ar`, `content_ar` |
| `discussion_threads` | `title_ar` |

---

## Pages Implemented

### announcements.html ✅
- Render: `(isAr && a.title_ar) ? a.title_ar : a.title` and `(isAr && a.body_ar) ? a.body_ar : a.body`
- Modal: Arabic title (`newAnnTitleAr`) + Arabic body (`newAnnBodyAr`) under `.form-lang-divider`
- Payload: `title_ar`, `body_ar`

### events.html ✅
- Render: `(isAr && ev.title_ar) ? ev.title_ar : ev.title`
- Modal: Arabic title (`evTitleAr`) under `.form-lang-divider`
- Payload: `title_ar`

### resources.html ✅
- Render: `(isAr && r.title_ar) ? r.title_ar : r.title`
- Modal: Arabic title (`resTitleAr`) under `.form-lang-divider`
- Payload: `title_ar`

### updates.html ✅
- Render: `title_ar` for title, `content_ar` for body
- Modal: Arabic title (`upTitleAr`) + Arabic body (`upContentAr`) under `.form-lang-divider`
- Payload: `title_ar`, `content_ar`

### founders-updates.html ✅
- Render: `title_ar` for title, `content_ar` for body
- Modal: Arabic title (`fuTitleAr`) + Arabic body (`fuContentAr`) under `.form-lang-divider`
- Payload: `title_ar`, `content_ar`

### discussions.html ✅
- Render: `(isAr && t.title_ar) ? t.title_ar : t.title`
- Modal: Arabic title (`threadTitleAr`) under `.form-lang-divider`
- Payload: `title_ar`

### dashboard.html ✅
- Mini announcement card: `title_ar` fallback on title
- Mini event cards (column 1 + strip): `title_ar` fallback on title
- Recent resources strip: `title_ar` fallback on title

---

## Pattern Reference

### Render (JavaScript)
```js
const isAr = window.dfc_i18n?.isAr;
// Title
escapeHtml((isAr && item.title_ar) ? item.title_ar : item.title)
// Body / content
escapeHtml((isAr && item.content_ar) ? item.content_ar : (item.body || ''))
```

### Modal HTML
```html
<div class="form-lang-divider"><span>Arabic Version (اختياري)</span></div>
<div class="form-group">
  <label class="form-label">العنوان (Arabic Title)</label>
  <input type="text" class="form-input" id="…Ar" placeholder="…بالعربية">
</div>
```

### Payload (JavaScript)
```js
const payload = {
  title:    document.getElementById('…Title').value.trim(),
  title_ar: document.getElementById('…TitleAr').value.trim() || null,
  // body fields where applicable:
  content_ar: document.getElementById('…ContentAr').value.trim() || null,
};
```

---

## Notes

- Arabic fields are always optional (`|| null`). English remains required.
- `portal-i18n.js` drives the `isAr` flag; the CSS class `html.ar` is the DOM signal.
- `portal.css` `.form-lang-divider` styles the section break as a gold mono-spaced rule.
- Do **not** touch `DFC-MASTER-SETUP.sql` or `supabase-setup.sql` — schema additions live only in `supabase-i18n-content.sql`.
