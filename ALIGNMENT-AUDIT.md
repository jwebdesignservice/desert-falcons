# RTL Alignment Audit — Desert Falcons Collective
**Date:** 2026-03-23
**Auditor:** Automated RTL CSS Audit
**Trigger:** `html[dir='rtl']` (public pages) / `html.ar` (portal pages)

---

## Summary

All nine CSS files were read in full and audited for left/right directional properties missing RTL counterparts. Overrides were added at the end of each file under `/* RTL Overrides — auto-generated */`.

---

## styles.css

### Already Present (existing RTL block starting line ~1758)
- `html[dir="rtl"] body { text-align: right; }`
- `html[dir="rtl"] p, li, h1–h6, span, label { direction: rtl; text-align: right; }`
- `html[dir="rtl"] nav, .navbar, .nav-inner { direction: rtl; }`
- `html[dir="rtl"] .nav-links { flex-direction: row-reverse; }`
- `html[dir="rtl"] .lang-toggle-li { margin-left: 0; margin-right: 0.5rem; }`
- `html[dir="rtl"] .hero-content, .section-intro, .chapter-intro { direction: rtl; text-align: right; }`
- `html[dir="rtl"] .hero-title, .section-title, .chapter-title, .chapter-title-large { text-align: center; }`
- `html[dir="rtl"] .card, .pillar-card, etc. { direction: rtl; text-align: right; }`
- `html[dir="rtl"] ul, ol { padding-right: 1.5rem; padding-left: 0; }`
- `html[dir="rtl"] .footer-inner, .footer-nav, .footer-links { direction: rtl; text-align: right; }`
- `html[dir="rtl"] input, textarea, select { direction: rtl; text-align: right; }`
- `html[dir="rtl"] .fi-editorial, .two-col, .split-row { flex-direction: row-reverse; }`

### Added
| Selector | Property Changed |
|---|---|
| `html[dir="rtl"] .nav-menu` | `right:auto; left:-100%` (mobile slide from right in RTL) |
| `html[dir="rtl"] .nav-menu.active` | `left:0; right:auto` |
| `html[dir="rtl"] .nav-menu` | `border-left:none; border-right:1px solid var(--border-color)` |
| `html[dir="rtl"] .footer-brand` | `align-items:flex-end; text-align:right` |
| `html[dir="rtl"] .footer-logo` | `align-items:flex-end` |
| `html[dir="rtl"] .footer-logo-text` | `text-align:right` |
| `html[dir="rtl"] .nav-logo-text` | `text-align:right` |
| `html[dir="rtl"] .list-item:hover .list-number` | `padding-left:0; padding-right:var(--space-sm)` |
| `html[dir="rtl"] .list-number::before` | `left:auto; right:0` |
| `html[dir="rtl"] .btn::before` (shine) | `left:auto; right:-100%` |
| `html[dir="rtl"] .btn:hover::before` | `right:100%; left:auto` |
| `html[dir="rtl"] .btn:hover .btn-arrow` | `transform:translateX(-5px)` |
| `html[dir="rtl"] .text-link:hover svg` | `transform:translateX(-4px)` |
| `html[dir="rtl"] .footer-bottom` | `flex-direction:row-reverse` |

---

## designers.css

### Added
| Selector | Property Changed |
|---|---|
| `html[dir="rtl"] .dhc-tl` | `left:auto; right:2rem; border-width:1px 1px 0 0` |
| `html[dir="rtl"] .dhc-tr` | `right:auto; left:2rem; border-width:1px 0 0 1px` |
| `html[dir="rtl"] .dhc-bl` | `left:auto; right:2rem; border-width:0 1px 1px 0` |
| `html[dir="rtl"] .dhc-br` | `right:auto; left:2rem; border-width:0 0 1px 1px` |
| `html[dir="rtl"] .skg-arc-2` | `left:auto; right:5%` |
| `html[dir="rtl"] .des-clar-body` | `padding-left:0; padding-right:calc(48px + 2rem)` |
| `html[dir="rtl"] .des-disc-areas li` | `padding-left:0; padding-right:1rem` |
| `html[dir="rtl"] .des-disc-areas li::before` | `left:auto; right:0` |
| `html[dir="rtl"] .des-disc-num-col` | `padding-left:0; padding-right:1rem` |
| `html[dir="rtl"] .des-phil-quote` | `border-left:none; border-right:2px solid rgba(184,145,90,0.25)` |
| `html[dir="rtl"] .des-phil-image-tag` | `left:auto; right:2.5rem` |
| `html[dir="rtl"] .des-phil-content-panel` | `border-left:none; border-right:1px solid rgba(184,145,90,0.08)` |
| `html[dir="rtl"] .des-qual-card--cta` | `border-left:none; border-right:2px solid rgba(184,145,90,0.2)` |
| `html[dir="rtl"] .des-qual-card::after` | `left:auto; right:0; gradient direction flipped` |

---

## engineers.css

### Added
| Selector | Property Changed |
|---|---|
| `html[dir="rtl"] .hc-tl` | `left:auto; right:0; border-width:1px 1px 0 0` |
| `html[dir="rtl"] .hc-tr` | `right:auto; left:0; border-width:1px 0 0 1px` |
| `html[dir="rtl"] .hc-bl` | `left:auto; right:0; border-width:0 1px 1px 0` |
| `html[dir="rtl"] .hc-br` | `right:auto; left:0; border-width:0 0 1px 1px` |
| `html[dir="rtl"] .bpg-cross-1` | `left:auto; right:20%` |
| `html[dir="rtl"] .bpg-cross-2` | `left:auto; right:80%` |
| `html[dir="rtl"] .bpg-cross::after` | `left:auto; right:0` |
| `html[dir="rtl"] .eng-disc-areas li` | `padding-left:0; padding-right:0.85rem` |
| `html[dir="rtl"] .eng-disc-areas li::before` | `left:auto; right:0` |
| `html[dir="rtl"] .eng-disc-num-col` | `padding-right:0; padding-left:2rem` |
| `html[dir="rtl"] .eng-disc-icon-col` | `margin-right:0; margin-left:2.5rem` |
| `html[dir="rtl"] .eng-disc-content` | `padding:2.5rem 0 2.5rem 2.5rem` |
| `html[dir="rtl"] .eng-disc-bar` | `right:auto; left:0` |
| `html[dir="rtl"] .eng-clar-body` | `padding-left:0; padding-right:4rem` |
| `html[dir="rtl"] .eng-clar-split` | `margin-left:0; margin-right:4rem` |
| `html[dir="rtl"] .eng-kc-challenges` | `text-align:right` |
| `html[dir="rtl"] .eng-kc-item` | `border-right:1px solid; border-left:none` (RTL border-right flip) |
| `html[dir="rtl"] .ipl-item:hover` | `transform:translateX(-6px)` |

---

## investors.css

### Already Present (confirmed)
- `html[dir="rtl"] .inv-section-header--left { text-align: right; }`
- `html[dir="rtl"] .idb-suitability { border-left:none; border-right:2px solid …; padding-left:0; padding-right:var(--space-sm); }`
- `html[dir="rtl"] .ifaq-a p { border-left:none; border-right:2px solid var(--royal-green); padding-left:0; padding-right:var(--space-sm); }`

### Added
| Selector | Property Changed |
|---|---|
| `html[dir="rtl"] .ihc-tl` | `left:auto; right:0; border-width:1px 1px 0 0` |
| `html[dir="rtl"] .ihc-tr` | `right:auto; left:0; border-width:1px 0 0 1px` |
| `html[dir="rtl"] .ihc-bl` | `left:auto; right:0; border-width:0 1px 1px 0` |
| `html[dir="rtl"] .ihc-br` | `right:auto; left:0; border-width:0 0 1px 1px` |
| `html[dir="rtl"] .inv-hero-glow-1` | `left:auto; right:-100px` |
| `html[dir="rtl"] .inv-hero-glow-2` | `right:auto; left:-80px` |
| `html[dir="rtl"] .profile-bg-glow` | `right:auto; left:-200px` |
| `html[dir="rtl"] .itc-num` | `right:auto; left:var(--space-md)` |
| `html[dir="rtl"] .itt-term` | `border-right:none; border-left:1px solid var(--border-color)` |
| `html[dir="rtl"] .ipl-item:hover` | `transform:translateX(-6px)` |

**Note:** `.idb-arabic` block already has `text-align: right` — intentional for the Arabic text block, left unchanged per instructions.

---

## join.css

### Added
| Selector | Property Changed |
|---|---|
| `html[dir="rtl"] .jhc-tl` | `left:auto; right:0; border-width:1px 1px 0 0` |
| `html[dir="rtl"] .jhc-tr` | `right:auto; left:0; border-width:1px 0 0 1px` |
| `html[dir="rtl"] .jhc-bl` | `left:auto; right:0; border-width:0 1px 1px 0` |
| `html[dir="rtl"] .jhc-br` | `right:auto; left:0; border-width:0 0 1px 1px` |
| `html[dir="rtl"] .select-chevron` | `right:auto; left:1rem` |
| `html[dir="rtl"] .form-select` | `padding:0.875rem 1.25rem 0.875rem 3rem` |
| `html[dir="rtl"] .join-context-quote` | `border-left:none; border-right:2px solid #1E4A3B; padding-left:0; padding-right:1.5rem` |
| `html[dir="rtl"] .form-investor-disclaimer` | `border-left:none; border-right:3px solid #1E4A3B` |
| `html[dir="rtl"] .form-checkbox:checked + .form-checkbox-custom::after` | `left:auto; right:3px; border-left:none; border-right:1.5px solid #0A0A0A` |
| `html[dir="rtl"] .join-submit-btn:hover svg` | `transform:translateX(-4px)` |

---

## vision.css

### Already Present
- `html[dir="rtl"] .side-features { text-align: right; }`
- `html[dir="rtl"] .image-frame-accent { right:auto; left:-15px; border-right:none; border-left:2px solid #B8915A; }`

### Added
| Selector | Property Changed |
|---|---|
| `html[dir="rtl"] .hero-glow-1` | `right:auto; left:-100px` |
| `html[dir="rtl"] .hero-glow-2` | `left:auto; right:-100px` |
| `html[dir="rtl"] .image-tag` | `left:auto; right:1.5rem` |
| `html[dir="rtl"] .pillar-card-horizontal:hover` | `transform:translateX(-10px)` |
| `html[dir="rtl"] .quote-mark.closing` | `text-align:left` |
| `html[dir="rtl"] .timeline-track-horizontal` | `background: gradient to left` |
| `html[dir="rtl"] .analytics-row-count` | `text-align:left` |

---

## founders-story.css

### Already Present
- `html[dir="rtl"] .inline-quote { border-left:none; border-right:3px solid #B8915A; padding-left:0; padding-right:2rem; }`
- `html[dir="rtl"] .fi-editorial-left { border-right:none; border-left:1px solid rgba(184,145,90,0.18); padding-right:0; padding-left:2rem; }`

### Added
| Selector | Property Changed |
|---|---|
| `html[dir="rtl"] .deco-corner-tl` | `left:auto; right:0; border-right/top instead of border-left/top` |
| `html[dir="rtl"] .deco-corner-br` | `right:auto; left:0; border-left/bottom instead of border-right/bottom` |
| `html[dir="rtl"] .deco-line-1` | `left:auto; right:0` |
| `html[dir="rtl"] .deco-line-2` | `right:auto; left:0` |
| `html[dir="rtl"] .frame-corner.frame-tl` | `left:auto; right:0; border-right instead of border-left` |
| `html[dir="rtl"] .frame-corner.frame-br` | `right:auto; left:0; border-left instead of border-right` |
| `html[dir="rtl"] .quote-image-badge` | `right:auto; left:-20px` |
| `html[dir="rtl"] .realization-decoration` | `left:auto; right:2rem` |
| `html[dir="rtl"] .fi-title-divider` | `background: gradient 270deg (right→left)` |
| `html[dir="rtl"] .chapter-year-badge` | `right:auto; left:-40px; transform-origin:bottom left` |

---

## legal.css

### Added
| Selector | Property Changed |
|---|---|
| `html[dir="rtl"] .legal-intro-block` | `border-left:none; border-right:3px solid #B8915A` |
| `html[dir="rtl"] .legal-list li` | `padding-left:0; padding-right:1.5rem` |
| `html[dir="rtl"] .legal-list li::before` | `left:auto; right:0` |
| `html[dir="rtl"] .legal-notice-box` | `border-left:none; border-right:3px solid #1E4A3B` |
| `html[dir="rtl"] .legal-notice-box--green` | `border-right-color:#2A6350` |
| `html[dir="rtl"] .legal-table th` | `text-align:right` |
| `html[dir="rtl"] .legal-hero-decoration .deco-corner-tl` | `left:auto; right:0; border-right/top swap` |
| `html[dir="rtl"] .legal-hero-decoration .deco-corner-br` | `right:auto; left:0; border-left/bottom swap` |

---

## portal/portal.css

### Already Present (extensive — html.ar class)
- Sidebar: `right:0; left:auto; border-right:none; border-left:1px solid var(--border)`
- `.portal-main { margin-left:0; margin-right:260px; }`
- `.sidebar-nav a { flex-direction:row-reverse; }`
- `.sidebar-member-info { flex-direction:row-reverse; }`
- `.btn-logout { flex-direction:row-reverse; }`
- `.topbar-left / .topbar-right { flex-direction:row-reverse; }`
- `.page-header { text-align:right; }`
- `.form-label { text-align:right; }`
- `.form-row-inline { flex-direction:row-reverse; }`
- `.modal { text-align:right; }`
- `.dashboard-grid { direction:rtl; }`
- `.dash-event-row / .dash-mini-event / .dash-resource-row { flex-direction:row-reverse; }`
- `.announcement-header / .thread-header / .reply-item { flex-direction:row-reverse; }`
- `.resource-card / .event-card / .founder-card { flex-direction:row-reverse; }`
- `.discussions-layout { flex-direction:row-reverse; }`
- `.update-header / .founder-card-header { flex-direction:row-reverse; }`
- `.settings-layout { direction:rtl; }`
- `.notif-row / .settings-account-row / .avatar-upload-row { flex-direction:row-reverse; }`
- All text-align:right overrides for titles, bodies, metas
- `.lang-toggle { margin-left:0; margin-right:0.75rem; }`
- Mobile RTL sidebar adjustments
- Login card direction/text overrides

### Added
| Selector | Property Changed |
|---|---|
| `html.ar .sidebar-link.active::before` | `left:auto; right:0` (active indicator flipped) |
| `html.ar .activity-item` | `border-left:none; border-right:2px solid var(--border)` |
| `html.ar .activity-item:hover` | `border-right-color:var(--desert-gold)` |
| `html.ar .announcement-item` | `border-left:none; border-right:3px solid transparent` |
| `html.ar .announcement-item.pinned` | `border-right-color:var(--desert-gold)` |
| `html.ar .dash-announcement` | `border-left:none; border-right:3px solid var(--desert-gold)` |
| `html.ar .category-link` | `border-left:none; border-right:2px solid transparent` |
| `html.ar .category-link.active` | `border-right-color:var(--desert-gold)` |
| `html.ar .unread-dot` | `right:auto; left:1.25rem` |
| `html.ar .modal-close` | `right:auto; left:1.5rem` |
| `html.ar select.form-input` | `background-position:left 0.85rem center; padding flipped` |
| `html.ar .login-corner--tl/tr/bl/br` | All corner positions swapped left↔right |
| `html.ar .avatar-upload-controls` | `align-items:flex-end` |

---

## Notes & Decisions

1. **Centered text** (`text-align: center`) was never overridden — correct per RTL rules.
2. **`writing-mode: vertical-rl` + `transform: rotate(180deg)`** on `.des-section-name`, `.section-name`, `.connector-years` — left unchanged as instructed, these are fine as-is.
3. **`.idb-arabic`** block in investors.css already has `text-align: right` — intentional Arabic text block, untouched.
4. **`.fi-portrait-name`** in founders-story.css already has `direction: rtl` hardcoded — intentional Arabic name display, left unchanged.
5. **Decorative background glows** (`hero-glow-1`, `hero-glow-2`, `profile-bg-glow`) positioned with `left`/`right` values were flipped for visual balance in RTL.
6. **Corner decorations** (`.dhc`, `.hc`, `.ihc`, `.jhc`) had their `left`/`right` positions AND border-widths swapped so the corner marks remain visually correct in RTL.
7. **`.split-reverse`** in styles.css uses `direction: rtl` on the element itself — this is a layout utility, not a language toggle, so it was left as-is.
