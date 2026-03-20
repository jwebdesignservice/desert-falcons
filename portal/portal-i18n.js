/* ============================================================
   Desert Falcons Collective — Portal i18n (Arabic / English)
   ============================================================ */

(function () {
  'use strict';

  var AR = {
    // Generic
    'Loading…': 'جارٍ التحميل…',
    'Save Changes': 'حفظ التغييرات',
    'Edit': 'تعديل',
    'Delete': 'حذف',
    'Cancel': 'إلغاء',
    'Coming Soon': 'قريباً',
    'No data yet.': 'لا توجد بيانات بعد.',
    'Posting…': 'جارٍ النشر…',
    'Saving…': 'جارٍ الحفظ…',
    'Uploading…': 'جارٍ الرفع…',
    'Sending…': 'جارٍ الإرسال…',
    'Creating…': 'جارٍ الإنشاء…',

    // Topbar
    'Welcome back,': 'مرحباً بعودتك،',
    'Member since': 'عضو منذ',

    // Sidebar nav
    'Dashboard': 'لوحة التحكم',
    'Announcements': 'الإعلانات',
    'Project Updates': 'تحديثات المشروع',
    'Discussions': 'النقاشات',
    'Resources': 'الموارد',
    'Member Directory': 'دليل الأعضاء',
    'Events': 'الفعاليات',
    "Founder's Updates": 'تحديثات المؤسس',
    'Settings': 'الإعدادات',
    'Applications': 'الطلبات',
    'Sign Out': 'تسجيل الخروج',
    'Member Portal': 'بوابة الأعضاء',
    'Navigation': 'التنقل',

    // Roles
    'core_board': 'المجلس التأسيسي',
    'working_group': 'فريق العمل',
    'advisor': 'مستشار',
    'investor': 'مستثمر',
    'designer': 'مصمم',
    'general': 'عضو عام',
    'admin': 'مدير',

    // Status badges
    '✅ Complete': '✅ مكتمل',
    '🔄 In Progress': '🔄 قيد التنفيذ',
    '⏳ Pending': '⏳ معلّق',
    'complete': 'مكتمل',
    'in_progress': 'قيد التنفيذ',
    'pending': 'معلّق',

    // Dashboard
    'Your inner circle overview': 'نظرة عامة على الدائرة الداخلية',
    'Latest Announcement': 'آخر إعلان',
    'Upcoming Events': 'الفعاليات القادمة',
    'Live Activity': 'النشاط المباشر',
    'Quick Links': 'روابط سريعة',
    'Recent Resources': 'الموارد الأخيرة',
    'View all →': 'عرض الكل ←',
    'RSVP →': 'تأكيد الحضور ←',
    'No announcements yet.': 'لا توجد إعلانات بعد.',
    'No upcoming events.': 'لا توجد فعاليات قادمة.',
    'No activity yet.': 'لا يوجد نشاط بعد.',
    'No resources yet.': 'لا توجد موارد بعد.',
    '📊 Engagement Analytics': '📊 تحليلات التفاعل',
    'Last 30 days': 'آخر 30 يومًا',
    'Total Members': 'إجمالي الأعضاء',
    'Active This Week': 'نشطون هذا الأسبوع',
    'Page Views (30d)': 'مشاهدات الصفحة (30 يومًا)',
    'Total Discussions': 'إجمالي النقاشات',
    'Downloads (30d)': 'التنزيلات (30 يومًا)',
    'Event RSVPs': 'تأكيدات الحضور',
    'Top Pages (30d)': 'أكثر الصفحات زيارة (30 يومًا)',
    'Top Downloads (30d)': 'أكثر التنزيلات (30 يومًا)',
    '📌 Pinned': '📌 مثبّت',
    'Engineering Docs': 'مستندات هندسية',
    'Engineering Specs': 'مواصفات هندسية',
    'Engineering Updates': 'تحديثات هندسية',
    'Design Briefs': 'ملخصات التصميم',
    'Brand Assets': 'أصول العلامة التجارية',
    'Design Updates': 'تحديثات التصميم',
    'Investor Materials': 'مواد المستثمرين',
    'Fundraising Updates': 'تحديثات جمع التمويل',
    'Resource Library': 'مكتبة الموارد',

    // Announcements
    'News and updates from the collective': 'أخبار وتحديثات من المجموعة',
    '+ New Announcement': '+ إعلان جديد',
    'All Announcements': 'جميع الإعلانات',
    'No pinned announcements.': 'لا توجد إعلانات مثبتة.',
    'Read more →': 'اقرأ المزيد ←',
    'This will be visible to all portal members': 'سيكون مرئياً لجميع أعضاء البوابة',
    '📌 Pin this announcement to the top': '📌 تثبيت هذا الإعلان في الأعلى',
    'Post Announcement': 'نشر الإعلان',
    'Pin': 'تثبيت',
    'Unpin': 'إلغاء التثبيت',
    'New Announcement': 'إعلان جديد',
    'Edit Announcement': 'تعديل الإعلان',

    // Updates
    'Project Progress': 'تقدم المشروع',
    'Live status across all SAIF workstreams': 'الحالة المباشرة لجميع مسارات عمل سيف',
    '+ Post Update': '+ نشر تحديث',
    'No updates in this category yet.': 'لا توجد تحديثات في هذه الفئة بعد.',
    'Post Project Update': 'نشر تحديث المشروع',
    'Share progress on a SAIF workstream': 'شارك تقدمك في مسار عمل سيف',
    'Post Update': 'نشر التحديث',
    'Change Status': 'تغيير الحالة',
    'Category': 'الفئة',
    'Status': 'الحالة',
    'All': 'الكل',
    'Design': 'التصميم',
    'Engineering': 'الهندسة',
    'Partnerships': 'الشراكات',
    'Fundraising': 'جمع التمويل',

    // Discussions
    'Collective conversations': 'محادثات جماعية',
    '+ New Thread': '+ موضوع جديد',
    'Categories': 'الفئات',
    'General': 'عام',
    'Investment & Strategy': 'الاستثمار والاستراتيجية',
    'Introductions': 'التعريفات',
    'No threads yet. Start one!': 'لا توجد مواضيع بعد. ابدأ موضوعاً!',
    'Loading replies…': 'جارٍ تحميل الردود…',
    'No replies yet.': 'لا توجد ردود بعد.',
    'Post Reply': 'نشر الرد',
    'Delete Thread': 'حذف الموضوع',
    'Start a collective discussion': 'ابدأ نقاشاً جماعياً',
    'Post Thread': 'نشر الموضوع',
    'New Thread': 'موضوع جديد',
    'reply': 'رد',
    'replies': 'ردود',
    'Delete this thread and all its replies? This cannot be undone.': 'حذف هذا الموضوع وجميع ردوده؟ لا يمكن التراجع عن هذا الإجراء.',
    'Delete this reply?': 'حذف هذا الرد؟',
    'Failed to delete thread: ': 'فشل حذف الموضوع: ',
    'Failed to delete reply: ': 'فشل حذف الرد: ',

    // Resources
    'Documents, briefs, and assets for the collective': 'المستندات والملخصات والأصول للمجموعة',
    '+ Upload Resource': '+ رفع مورد',
    'No resources in this category yet.': 'لا توجد موارد في هذه الفئة بعد.',
    'Download': 'تنزيل',
    'Upload Resource': 'رفع مورد',
    'Add a document, brief, or asset to the library': 'أضف مستنداً أو ملخصاً أو أصلاً إلى المكتبة',
    'Or paste URL': 'أو الصق رابطاً',
    'Meeting Notes': 'ملاحظات الاجتماعات',
    'Design Brief': 'ملخص تصميم',
    'Investor': 'مستثمر',
    'Delete this resource? This cannot be undone.': 'حذف هذا المورد؟ لا يمكن التراجع عن هذا الإجراء.',

    // Directory
    'The people building SAIF': 'الأشخاص الذين يبنون سيف',
    'No members found.': 'لم يتم العثور على أعضاء.',
    'Joined': 'انضم',
    'Core Board': 'المجلس التأسيسي',
    'Working Group': 'فريق العمل',
    'Advisor': 'مستشار',

    // Events
    'Events & Deadlines': 'الفعاليات والمواعيد',
    'Upcoming sessions, reviews, and briefings': 'الجلسات والمراجعات والإحاطات القادمة',
    '+ New Event': '+ فعالية جديدة',
    'No upcoming events. Check back soon.': 'لا توجد فعاليات قادمة. تحقق لاحقاً.',
    'RSVP': 'تأكيد الحضور',
    'Going ✓': 'حاضر ✓',
    '🔗 Join Meeting': '🔗 انضم إلى الاجتماع',
    'Team Call': 'مكالمة الفريق',
    'Design Review': 'مراجعة التصميم',
    'Engineering Workshop': 'ورشة هندسية',
    'Investor Briefing': 'إحاطة المستثمرين',
    'Create Event': 'إنشاء فعالية',
    'Schedule a session, review, or briefing for the collective': 'جدوِل جلسة أو مراجعة أو إحاطة للمجموعة',
    'Event Type': 'نوع الفعالية',
    'Date & Time': 'التاريخ والوقت',
    'Description': 'الوصف',
    'Meeting Link': 'رابط الاجتماع',
    'Delete this event? This cannot be undone.': 'حذف هذه الفعالية؟ لا يمكن التراجع عن هذا الإجراء.',

    // Founder's Updates
    "From Khalaf's Desk": 'من مكتب خلف',
    'Personal updates, reflections, and guidance from the founder': 'تحديثات شخصية وتأملات وإرشادات من المؤسس',
    '+ New Update': '+ تحديث جديد',
    'No updates yet. Check back soon.': 'لا توجد تحديثات بعد. تحقق لاحقاً.',
    '▶ Watch': '▶ مشاهدة',
    '🎧 Listen': '🎧 استماع',
    '📖 Read more': '📖 اقرأ المزيد',
    'written': 'مكتوب',
    'video': 'فيديو',
    'audio': 'صوتي',
    "Post Founder's Update": 'نشر تحديث المؤسس',
    "Edit Founder's Update": 'تعديل تحديث المؤسس',
    'Content URL': 'رابط المحتوى',

    // Settings
    'Manage your profile and preferences': 'إدارة ملفك الشخصي وتفضيلاتك',
    'Profile Photo': 'صورة الملف الشخصي',
    'Upload a photo to personalise your portal presence': 'ارفع صورة لتخصيص حضورك في البوابة',
    'Choose Photo': 'اختر صورة',
    'JPG, PNG or WebP · Max 2MB': 'JPG أو PNG أو WebP · الحد الأقصى 2 ميغابايت',
    'Upload Photo': 'رفع الصورة',
    'Update your display name, location, and bio': 'تحديث اسمك ونبذتك وموقعك',
    'Full Name': 'الاسم الكامل',
    'Location': 'الموقع',
    'Bio': 'نبذة شخصية',
    'Role': 'الدور',
    'Role is set by admins — contact Khalaf to update.': 'يتم تعيين الدور من قِبل المسؤولين — تواصل مع خلف للتحديث.',
    'Save Profile': 'حفظ الملف الشخصي',
    'Email Notifications': 'إشعارات البريد الإلكتروني',
    'Choose what you want to be notified about': 'اختر ما تريد أن تُخطَر به',
    'New Discussions': 'نقاشات جديدة',
    'Email me when a new thread is posted in any forum': 'أرسل لي بريداً إلكترونياً عند نشر موضوع جديد في أي منتدى',
    'Replies to My Threads': 'ردود على مواضيعي',
    "Email me when someone replies to a thread I'm subscribed to": 'أرسل لي بريداً إلكترونياً عند رد شخص ما على موضوع اشتركت فيه',
    'Email me when a new announcement is posted from Khalaf': 'أرسل لي بريداً إلكترونياً عند نشر إعلان جديد من خلف',
    'Save Preferences': 'حفظ التفضيلات',
    'Account': 'الحساب',
    'Password and account management': 'إدارة كلمة المرور والحساب',
    'Password': 'كلمة المرور',
    "We'll email you a secure link to set a new password": 'سنرسل لك رابطاً آمناً لتعيين كلمة مرور جديدة',
    'Change Password': 'تغيير كلمة المرور',
    'Email Address': 'عنوان البريد الإلكتروني',
    '✓ Profile updated successfully.': '✓ تم تحديث الملف الشخصي بنجاح.',
    '✓ Notification preferences saved.': '✓ تم حفظ تفضيلات الإشعارات.',
    '✓ Profile photo updated.': '✓ تم تحديث صورة الملف الشخصي.',
    'Failed to save preferences. Please try again.': 'فشل حفظ التفضيلات. يرجى المحاولة مرة أخرى.',
    'Send Reset Link': 'إرسال رابط إعادة التعيين',
    'File too large. Maximum size is 2MB.': 'حجم الملف كبير جداً. الحد الأقصى 2 ميغابايت.',
    'Please fill in all required fields.': 'يرجى ملء جميع الحقول المطلوبة.',

    // Applications
    'Review and manage collective applications': 'مراجعة وإدارة طلبات الانضمام',
    'Total': 'الإجمالي',
    'Pending': 'معلّق',
    'Approved': 'مقبول',
    'Rejected': 'مرفوض',
    'No applications.': 'لا توجد طلبات.',
    'Admin notes': 'ملاحظات المسؤول',
    '✓ Approve': '✓ قبول',
    '✕ Reject': '✕ رفض',
    '↩ Reset': '↩ إعادة تعيين',
    'Save Notes': 'حفظ الملاحظات',
    'Saved ✓': 'تم الحفظ ✓',
    'Engineer': 'مهندس',
    'Designer': 'مصمم',
    'Phone': 'الهاتف',
    'Specialization': 'التخصص',
    'Design Discipline': 'تخصص التصميم',
    'Experience': 'الخبرة',
    'Investment Range': 'نطاق الاستثمار',
    'Investor Type': 'نوع المستثمر',
    'Portfolio': 'المحفظة',
    'Heard about us': 'كيف سمعت عنا',
    '⛔ This page is restricted to Core Board and Admin members.': '⛔ هذه الصفحة مقيدة لأعضاء المجلس التأسيسي والمسؤولين.',
    'Loading applications…': 'جارٍ تحميل الطلبات…',

    // Login
    'Inner Circle Access': 'وصول الدائرة الداخلية',
    'Remember me': 'تذكرني',
    'Forgot password?': 'نسيت كلمة المرور؟',
    'Enter the Portal': 'ادخل البوابة',
    'Not a member?': 'لست عضوًا؟',
    'Join the Collective →': 'انضم إلى المجموعة ←',
    'Reset Password': 'إعادة تعيين كلمة المرور',
    "We'll send a recovery link to your email": 'سنرسل رابط استعادة إلى بريدك الإلكتروني',
    'Send Recovery Link': 'إرسال رابط الاستعادة',
    'Back to Login': 'العودة إلى تسجيل الدخول',
    'Recovery link sent — check your email.': 'تم إرسال رابط الاستعادة — تحقق من بريدك الإلكتروني.',
    'Signing in…': 'جارٍ تسجيل الدخول…',

    // Modals / Forms
    'Title': 'العنوان',
    'Body': 'المحتوى',
    'Type': 'النوع',
    'optional': 'اختياري',

    // Delete confirm dialogs
    'Delete this announcement? This cannot be undone.': 'حذف هذا الإعلان؟ لا يمكن التراجع عن هذا الإجراء.',
    'Delete this update? This cannot be undone.': 'حذف هذا التحديث؟ لا يمكن التراجع عن هذا الإجراء.',
    'Delete this resource? This cannot be undone.': 'حذف هذا المورد؟ لا يمكن التراجع عن هذا الإجراء.',
  };

  // ── Detect and store language ──────────────────────────────
  function getLang() {
    var params = new URLSearchParams(window.location.search);
    var param = params.get('lang');
    if (param === 'ar' || param === 'en') {
      localStorage.setItem('dfc_lang', param);
      return param;
    }
    return localStorage.getItem('dfc_lang') || 'en';
  }

  var lang = getLang();
  var isAr = lang === 'ar';

  // Apply immediately (before DOMContentLoaded) to prevent flash
  if (isAr) {
    document.documentElement.lang = 'ar';
    document.documentElement.dir = 'rtl';
    document.documentElement.classList.add('ar');
  } else {
    document.documentElement.lang = 'en';
    document.documentElement.dir = 'ltr';
    document.documentElement.classList.remove('ar');
  }

  // ── Apply data-ar attributes on DOM ready ──────────────────
  function applyTranslations() {
    if (!isAr) return;

    // 1. Explicit data-ar attributes
    document.querySelectorAll('[data-ar]').forEach(function (el) {
      el.textContent = el.getAttribute('data-ar');
    });
    document.querySelectorAll('[data-ar-placeholder]').forEach(function (el) {
      el.placeholder = el.getAttribute('data-ar-placeholder');
    });
    document.querySelectorAll('[data-ar-html]').forEach(function (el) {
      el.innerHTML = el.getAttribute('data-ar-html');
    });

    // 2. Auto-translate sidebar nav links (text node after SVG)
    document.querySelectorAll('.sidebar-nav .sidebar-link, .sidebar-nav .category-link').forEach(function (el) {
      el.childNodes.forEach(function (node) {
        if (node.nodeType === 3) { // text node
          var t = node.textContent.trim();
          if (t && AR[t]) node.textContent = ' ' + AR[t];
        }
      });
    });

    // 3. Auto-translate sidebar section headings and common section titles
    document.querySelectorAll('.sidebar-section, .dashboard-section-title, .page-title, .page-subtitle').forEach(function (el) {
      var t = el.textContent.trim();
      if (AR[t]) el.textContent = AR[t];
    });

    // 4. Auto-translate filter tabs
    document.querySelectorAll('.filter-tab, .category-link').forEach(function (el) {
      var t = el.textContent.trim();
      if (AR[t]) el.textContent = AR[t];
    });

    // 5. Auto-translate buttons that have no data-ar
    document.querySelectorAll('button, .btn-primary, .btn-secondary, .btn-create-thread').forEach(function (el) {
      if (el.getAttribute('data-ar')) return; // already handled
      var t = el.textContent.trim();
      if (AR[t]) el.textContent = AR[t];
    });

    // 6. Auto-translate form labels
    document.querySelectorAll('.form-label, .settings-card-title, .settings-card-sub, label').forEach(function (el) {
      if (el.getAttribute('data-ar')) return;
      var t = el.textContent.trim();
      if (AR[t]) el.textContent = AR[t];
    });

    // 7. Auto-translate modal titles and subtitles
    document.querySelectorAll('.modal-title, .modal-subtitle').forEach(function (el) {
      var t = el.textContent.trim();
      if (AR[t]) el.textContent = AR[t];
    });

    // 8. Sign Out button (contains SVG + text)
    document.querySelectorAll('.btn-logout').forEach(function (el) {
      el.childNodes.forEach(function (node) {
        if (node.nodeType === 3) {
          var t = node.textContent.trim();
          if (t && AR[t]) node.textContent = ' ' + AR[t];
        }
      });
    });

    // 9. Update login lang button text if present
    var loginBtn = document.getElementById('loginLangBtn');
    if (loginBtn) loginBtn.textContent = 'EN';

    // 10. portal topbar "Member Portal" logo tag
    document.querySelectorAll('.logo-tag').forEach(function(el) {
      var t = el.textContent.trim();
      if (AR[t]) el.textContent = AR[t];
    });
  }

  // ── Inject lang toggle into topbar (portal pages) ──────────
  function injectI18nToggle() {
    // Portal pages: inject into .topbar-right
    var topbarRight = document.querySelector('.topbar-right');
    if (topbarRight && !document.getElementById('langToggleBtn')) {
      var btn = document.createElement('button');
      btn.id = 'langToggleBtn';
      btn.className = 'lang-toggle';
      btn.setAttribute('aria-label', 'Toggle language / تبديل اللغة');
      btn.textContent = isAr ? 'EN' : 'AR';
      btn.addEventListener('click', function () { window.toggleLang(); });
      topbarRight.appendChild(btn);
    }
    // Login page: update the hardcoded loginLangBtn text
    var loginBtn = document.getElementById('loginLangBtn');
    if (loginBtn) {
      loginBtn.textContent = isAr ? 'EN' : 'AR';
    }
  }

  function onReady() {
    applyTranslations();
    injectI18nToggle();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', onReady);
  } else {
    onReady();
  }

  // ── Toggle language (preserves current page + other params) ─
  window.toggleLang = function () {
    var next = isAr ? 'en' : 'ar';
    var url = new URL(window.location.href);
    url.searchParams.set('lang', next);
    window.location.href = url.toString();
  };

  // ── Public API ─────────────────────────────────────────────
  window.dfc_i18n = {
    lang: lang,
    isAr: isAr,
    /** Translate a string key, returns key unchanged if no translation */
    t: function (key) {
      return (isAr && AR[key] !== undefined) ? AR[key] : key;
    },
    /** Translated confirm dialog */
    confirm: function (key) {
      return window.confirm(this.t(key));
    },
    /** Translate role name */
    role: function (r) {
      if (!isAr) return r;
      return AR[r] || r;
    },
    /** Translate event type */
    eventType: function (type) {
      var map = {
        design_review: this.t('Design Review'),
        engineering_workshop: this.t('Engineering Workshop'),
        investor_briefing: this.t('Investor Briefing'),
        team_call: this.t('Team Call'),
      };
      return map[type] || type;
    },
    /** Translate resource category label */
    resCategory: function (cat) {
      var map = {
        design_briefs: this.t('Design Briefs'),
        engineering_specs: this.t('Engineering Specs'),
        investor_materials: this.t('Investor Materials'),
        meeting_notes: this.t('Meeting Notes'),
        brand_assets: this.t('Brand Assets'),
      };
      return map[cat] || cat;
    },
    /** Translate status badge */
    status: function (s) {
      var map = {
        complete:    this.t('✅ Complete'),
        in_progress: this.t('🔄 In Progress'),
        pending:     this.t('⏳ Pending'),
      };
      return map[s] || s;
    },
  };
})();
