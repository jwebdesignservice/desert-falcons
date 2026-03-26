# FINAL TRANSLATION AUDIT — PASS 1: Root HTML Files

**Date:** 2026-03-24
**Scope:** index.html, designers.html, engineers.html, investors.html, founders-story.html, vision.html, join.html, privacy-policy.html, terms-of-use.html
**Auditor:** Claude (automated sweep)

---

## Engine Changes

### `i18n.js`
Added two new attribute swap handlers to `applyLanguage()`:
- **`data-i18n-aria-ar`** — swaps `aria-label` attribute value on language toggle (saves English as `data-i18n-aria-en` on first run)
- **`data-i18n-alt-ar`** — swaps `alt` attribute value on language toggle (saves English as `data-i18n-alt-en` on first run)

> Note: `.lang-toggle-btn` aria-label was already handled programmatically in i18n.js (line 71) — no change needed there.

---

## File-by-File Changes

### `index.html`
| Type | Element | Fix |
|------|---------|-----|
| aria-label | `#navToggle` button | Added `data-i18n-aria-ar="تبديل التنقل"` |

### `designers.html`
| Type | Element | Fix |
|------|---------|-----|
| aria-label | `#navToggle` button | Added `data-i18n-aria-ar="تبديل التنقل"` |

### `engineers.html`
| Type | Element | Fix |
|------|---------|-----|
| aria-label | `#navToggle` button | Added `data-i18n-aria-ar="تبديل التنقل"` |

### `investors.html`
| Type | Element | Fix |
|------|---------|-----|
| aria-label | `#navToggle` button | Added `data-i18n-aria-ar="تبديل التنقل"` |

### `join.html`
| Type | Element | Fix |
|------|---------|-----|
| aria-label | `#navToggle` button | Added `data-i18n-aria-ar="تبديل التنقل"` |

### `privacy-policy.html`
| Type | Element | Fix |
|------|---------|-----|
| aria-label | `#navToggle` button | Added `data-i18n-aria-ar="تبديل التنقل"` |

### `terms-of-use.html`
| Type | Element | Fix |
|------|---------|-----|
| aria-label | `#navToggle` button | Added `data-i18n-aria-ar="تبديل التنقل"` |

### `founders-story.html`
| Type | Element | English | Arabic |
|------|---------|---------|--------|
| aria-label | `#navToggle` button | Toggle navigation | `data-i18n-aria-ar="تبديل التنقل"` |
| alt | `khalaf-althobaiti.png` | Khalaf Althobaiti — Founder, Desert Falcons Collective | `data-i18n-alt-ar="خلف الثبيتي — مؤسس صقور الصحراء التجمّع"` |
| alt | `woodern-car.jpeg` (chapter img) | Wooden Car 1982 | `data-i18n-alt-ar="السيارة الخشبية ١٩٨٢"` |
| SVG aria-label | Flag — United States | United States | `data-i18n-aria-ar="الولايات المتحدة"` |
| SVG aria-label | Flag — United Kingdom | United Kingdom | `data-i18n-aria-ar="المملكة المتحدة"` |
| SVG aria-label | Flag — Japan | Japan | `data-i18n-aria-ar="اليابان"` |
| SVG aria-label | Flag — Germany | Germany | `data-i18n-aria-ar="ألمانيا"` |
| alt | `woodern-car.jpeg` (timeline img) | A child's wooden dream | `data-i18n-alt-ar="حلم طفل خشبي"` |
| alt | `coming-soon-car.jpg` | Saudi's first luxury car | `data-i18n-alt-ar="أول سيارة سعودية فاخرة"` |
| hardcoded text | `.placeholder-text` span | The Collective | Added `data-i18n="fs.placeholder.collective" data-i18n-ar="التجمّع"` |
| hardcoded text | `.timeline-year` div | Coming Soon | Added `data-i18n="fs.tl.coming" data-i18n-ar="قريبًا"` |

### `vision.html`
| Type | Element | English | Arabic |
|------|---------|---------|--------|
| aria-label | `#navToggle` button | Toggle navigation | `data-i18n-aria-ar="تبديل التنقل"` |
| alt | `saif concept.jpeg` | SAIF Concept Car | `data-i18n-alt-ar="سيارة سيف المفهومية"` |
| alt | `ev-charging.jpg` | Electric vehicle charging | `data-i18n-alt-ar="شحن السيارة الكهربائية"` |
| alt | `vision-city.jpg` | Vision 2030 city | `data-i18n-alt-ar="مدينة رؤية ٢٠٣٠"` |
| alt | `arabic-architecture.jpg` | Arabic architecture | `data-i18n-alt-ar="العمارة العربية"` |

---

## Summary

| File | Issues Fixed |
|------|-------------|
| index.html | 1 |
| designers.html | 1 |
| engineers.html | 1 |
| investors.html | 1 |
| join.html | 1 |
| privacy-policy.html | 1 |
| terms-of-use.html | 1 |
| founders-story.html | 11 |
| vision.html | 5 |
| i18n.js | +2 new attribute handlers |
| **Total** | **23 fixes** |

## Notes
- No empty `data-i18n-ar=""` attributes found across all files
- All main visible text with `data-i18n` already had `data-i18n-ar` — main content was clean
- Fixes were primarily accessibility attributes (aria-label, alt) and two hardcoded visible strings in founders-story.html
- The `aria-label="Switch language"` on `.lang-toggle-btn` was already handled dynamically in i18n.js and required no HTML changes

---

# FINAL TRANSLATION AUDIT — PASS 2: Portal HTML Files

**Date:** 2026-03-24
**Scope:** portal/index.html, portal/dashboard.html, portal/announcements.html, portal/applications.html, portal/directory.html, portal/discussions.html, portal/events.html, portal/founders-updates.html, portal/resources.html, portal/settings.html, portal/updates.html, portal/portal-i18n.js, portal/portal.js
**Auditor:** Claude (automated sweep)

---

## Engine Changes

### `portal/portal-i18n.js`

Six new entries added to the AR dictionary:

| Key | Arabic |
|-----|--------|
| `'Write a reply…'` | `'اكتب رداً…'` |
| `'Edit Event'` | `'تعديل الفعالية'` |
| `'Edit Update'` | `'تعديل التحديث'` |
| `'Add notes…'` | `'أضف ملاحظات…'` |
| `'Upload failed: '` | `'فشل الرفع: '` |
| `'✓ Password change link sent to'` | `'✓ تم إرسال رابط تغيير كلمة المرور إلى'` |

---

## File-by-File Changes

### `portal/discussions.html`
| Type | Location | Issue | Fix |
|------|----------|-------|-----|
| JS template — hardcoded | Reply list initial HTML | `Loading replies…` not translated | Wrapped in `_t('Loading replies…')` |
| JS alert — hardcoded | `deleteReply()` error | `'Failed to delete reply: '` called raw | Wrapped in `_t('Failed to delete reply: ')` |
| JS button state — hardcoded | Thread form submit | `'Posting…'` set without `_t()` | Replaced with `_t('Posting…')` |

### `portal/announcements.html`
| Type | Location | Issue | Fix |
|------|----------|-------|-----|
| JS button state — hardcoded | Announcement form submit | `'Saving…' / 'Posting…'` without `_t()` | Replaced with `_t('Saving…') / _t('Posting…')` |

### `portal/applications.html`
| Type | Location | Issue | Fix |
|------|----------|-------|-----|
| JS-rendered label | `renderApplications()` — `interestLabel()` | Map values hardcoded English | Wrapped all 5 values in `_t()` |
| JS-rendered label | `renderApplications()` — field list | 8 `<strong>Label:</strong>` hardcoded | All labels wrapped in `_t()` |
| JS-rendered text | Notes section | `'Admin notes'` label hardcoded | Wrapped in `_t('Admin notes')` |
| JS template placeholder | Notes textarea | `placeholder="Add notes…"` hardcoded | Replaced with `_t('Add notes…')` |
| JS-rendered badge | Status badge | `${statusClass}` raw English value | Replaced with `_t(statusClass)` |
| JS-rendered buttons | Action buttons | `✓ Approve / ✕ Reject / ↩ Reset` hardcoded | All 3 wrapped in `_t()` |
| JS-rendered button | Save Notes button | `Save Notes` hardcoded | Wrapped in `_t('Save Notes')` |
| JS empty state | `renderApplications()` | `No ... applications.` hardcoded | Replaced with `_t('No applications.')` |
| JS button feedback | `saveNotes()` | `'Saved ✓'` hardcoded | Replaced with `_t('Saved ✓')` |

### `portal/events.html`
| Type | Location | Issue | Fix |
|------|----------|-------|-----|
| JS button state — hardcoded | Event form submit | `'Saving…' / 'Creating…'` without `_t()` | Replaced with `_t('Saving…') / _t('Creating…')` |

### `portal/founders-updates.html`
| Type | Location | Issue | Fix |
|------|----------|-------|-----|
| JS button state — hardcoded | Founder update form submit | `'Saving…' / 'Posting…'` without `_t()` | Replaced with `_t('Saving…') / _t('Posting…')` |

### `portal/resources.html`
| Type | Location | Issue | Fix |
|------|----------|-------|-----|
| JS modal title — hardcoded | `newResourceBtn` click handler | `'Upload Resource'` set without `_t()` | Wrapped in `_t('Upload Resource')` |
| JS submit text — hardcoded | `newResourceBtn` click handler | `'Upload Resource'` set without `_t()` | Wrapped in `_t('Upload Resource')` |
| JS modal title — hardcoded | `openEditResource()` | `'Edit Resource'` set without `_t()` | Wrapped in `_t('Edit Resource')` |
| JS submit text — hardcoded | `openEditResource()` | `'Save Changes'` set without `_t()` | Wrapped in `_t('Save Changes')` |
| JS button state — hardcoded | Resource form submit | `'Saving…' / 'Uploading…'` without `_t()` | Replaced with `_t()` versions |
| JS button state — hardcoded | Upload error recovery | `'Upload Resource'` without `_t()` | Replaced with `_t('Upload Resource')` |
| JS button state — hardcoded | Post-submit reset | `'Save Changes' / 'Upload Resource'` | Replaced with `_t()` versions |

### `portal/settings.html`
| Type | Location | Issue | Fix |
|------|----------|-------|-----|
| JS button state — hardcoded | Avatar upload — in-progress | `'Uploading…'` without `_t()` | Replaced with `_t('Uploading…')` |
| JS error message — hardcoded | Avatar upload error | `'Upload failed: '` without `_t()` | Replaced with `_t('Upload failed: ')` |
| JS button reset — hardcoded | Avatar upload error recovery | `'Upload Photo'` without `_t()` | Replaced with `_t('Upload Photo')` |
| JS success message — hardcoded | Avatar save success | `'✓ Profile photo updated.'` raw | Replaced with `_t('✓ Profile photo updated.')` |
| JS button reset — hardcoded | Avatar save complete | `'Upload Photo'` without `_t()` | Replaced with `_t('Upload Photo')` |
| JS button state — hardcoded | Profile form submit | `'Saving…'` without `_t()` | Replaced with `_t('Saving…')` |
| JS success message — hardcoded | Profile save success | `'✓ Profile updated successfully.'` raw | Replaced with `_t('✓ Profile updated successfully.')` |
| JS button reset — hardcoded | Profile save complete | `'Save Profile'` without `_t()` | Replaced with `_t('Save Profile')` |
| JS button state — hardcoded | Notification prefs save | `'Saving…'` without `_t()` | Replaced with `_t('Saving…')` |
| JS success message — hardcoded | Notif prefs saved | `'✓ Notification preferences saved.'` raw | Replaced with `_t('✓ Notification preferences saved.')` |
| JS error message — hardcoded | Notif prefs error | `'Failed to save preferences…'` raw | Replaced with `_t('Failed to save preferences…')` |
| JS button reset — hardcoded | Notif prefs complete | `'Save Preferences'` without `_t()` | Replaced with `_t('Save Preferences')` |
| JS button state — hardcoded | Password reset click | `'Sending…'` without `_t()` | Replaced with `_t('Sending…')` |
| JS success message — hardcoded | Password reset success | `'✓ Password change link sent to ' + email` | Split: `_t('✓ Password change link sent to') + ' ' + email` |
| JS button reset — hardcoded | Password reset complete | `'Send Reset Link'` without `_t()` | Replaced with `_t('Send Reset Link')` |

### `portal/updates.html`
| Type | Location | Issue | Fix |
|------|----------|-------|-----|
| JS button state — hardcoded | Update form submit | `'Saving…' / 'Posting…'` without `_t()` | Replaced with `_t('Saving…') / _t('Posting…')` |

---

## Files with No Changes Required (Pass 2)

| File | Status |
|------|--------|
| `portal/index.html` | Clean — all visible text already has `data-ar` |
| `portal/dashboard.html` | Clean — HTML `data-ar` complete; JS uses `_t()` throughout |
| `portal/directory.html` | Clean — HTML `data-ar` complete; JS uses `_t()` throughout |

---

## Summary

| File | Issues Fixed |
|------|-------------|
| portal-i18n.js | +6 new AR dictionary entries |
| discussions.html | 3 |
| announcements.html | 1 |
| applications.html | 9 |
| events.html | 1 |
| founders-updates.html | 1 |
| resources.html | 7 |
| settings.html | 15 |
| updates.html | 1 |
| **Total** | **44 fixes** |

## Notes
- No `data-ar` attributes with empty or English values found across portal HTML files — existing `data-ar` markup was clean
- All portal HTML static content (headings, labels, buttons, filter tabs, modal titles) already had `data-ar` or was auto-translated via portal-i18n.js selector rules
- Issues were concentrated in JS-rendered dynamic content (card renders, modal state changes, feedback alerts) that bypassed the `data-ar` attribute system
- `portal.js` shared library was clean — all badge/date/role renderers already used `window.dfc_i18n` checks
- `portal/index.html` (login page) was clean — all form elements had `data-ar` and `data-ar-placeholder` attributes
