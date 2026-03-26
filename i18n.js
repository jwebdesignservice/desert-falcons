/* ============================================
   Desert Falcons Collective — i18n Engine
   Switches between English (LTR) and Arabic (RTL)
   ============================================ */

(function () {
  'use strict';

  const STORAGE_KEY = 'dfc-lang';
  const DEFAULT_LANG = 'en';

  // ── Utility ──────────────────────────────────────
  function getLang() {
    return localStorage.getItem(STORAGE_KEY) || DEFAULT_LANG;
  }
  function setLang(lang) {
    localStorage.setItem(STORAGE_KEY, lang);
  }

  // ── Apply language ───────────────────────────────
  function applyLanguage(lang) {
    const html = document.documentElement;
    html.setAttribute('lang', lang);
    // Set text direction: RTL for Arabic, LTR for English
    html.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');

    // Swap text content
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var key = el.getAttribute('data-i18n');
      if (!key) return;

      // Store original English text on first run
      if (!el.hasAttribute('data-i18n-en')) {
        el.setAttribute('data-i18n-en', el.innerHTML);
      }

      if (lang === 'ar' && el.hasAttribute('data-i18n-ar')) {
        el.innerHTML = el.getAttribute('data-i18n-ar');
      } else {
        el.innerHTML = el.getAttribute('data-i18n-en');
      }
    });

    // Swap placeholders
    document.querySelectorAll('[data-i18n-ph-ar]').forEach(function (el) {
      if (!el.hasAttribute('data-i18n-ph-en')) {
        el.setAttribute('data-i18n-ph-en', el.getAttribute('placeholder') || '');
      }
      if (lang === 'ar') {
        el.setAttribute('placeholder', el.getAttribute('data-i18n-ph-ar'));
      } else {
        el.setAttribute('placeholder', el.getAttribute('data-i18n-ph-en'));
      }
    });

    // Swap aria-labels
    document.querySelectorAll('[data-i18n-aria-ar]').forEach(function (el) {
      if (!el.hasAttribute('data-i18n-aria-en')) {
        el.setAttribute('data-i18n-aria-en', el.getAttribute('aria-label') || '');
      }
      el.setAttribute('aria-label', lang === 'ar'
        ? el.getAttribute('data-i18n-aria-ar')
        : el.getAttribute('data-i18n-aria-en'));
    });

    // Swap alt attributes
    document.querySelectorAll('[data-i18n-alt-ar]').forEach(function (el) {
      if (!el.hasAttribute('data-i18n-alt-en')) {
        el.setAttribute('data-i18n-alt-en', el.getAttribute('alt') || '');
      }
      el.setAttribute('alt', lang === 'ar'
        ? el.getAttribute('data-i18n-alt-ar')
        : el.getAttribute('data-i18n-alt-en'));
    });

    // Swap select option text
    document.querySelectorAll('option[data-i18n-ar]').forEach(function (el) {
      if (!el.hasAttribute('data-i18n-en')) {
        el.setAttribute('data-i18n-en', el.textContent);
      }
      if (lang === 'ar') {
        el.textContent = el.getAttribute('data-i18n-ar');
      } else {
        el.textContent = el.getAttribute('data-i18n-en');
      }
    });

    // Update toggle button text
    document.querySelectorAll('.lang-toggle-btn').forEach(function (btn) {
      btn.textContent = lang === 'ar' ? 'EN' : 'عربي';
      btn.setAttribute('aria-label', lang === 'ar' ? 'Switch to English' : 'التبديل إلى العربية');
    });

    setLang(lang);
  }

  // ── Toggle ───────────────────────────────────────
  function toggleLanguage() {
    var current = getLang();
    applyLanguage(current === 'en' ? 'ar' : 'en');
  }

  // ── Init ─────────────────────────────────────────
  function init() {
    // Apply stored language on load
    applyLanguage(getLang());

    // Bind all toggle buttons
    document.querySelectorAll('.lang-toggle-btn').forEach(function (btn) {
      btn.addEventListener('click', toggleLanguage);
    });
  }

  // Run after DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Expose for manual use
  window.DFC_i18n = { applyLanguage: applyLanguage, toggleLanguage: toggleLanguage, getLang: getLang };
})();
