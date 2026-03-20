/* ============================================
   Desert Falcons Collective — Portal Shared JS
   ============================================ */

/* -------------------- Analytics Tracking -------------------- */

/**
 * Track an event in analytics_events. Fire-and-forget — never blocks UI.
 * @param {string} eventType - page_view | resource_download | thread_created | event_rsvp | login
 * @param {string} [page]    - page filename, auto-detected if omitted
 * @param {object} [meta]    - extra metadata (title, id, etc.)
 */
async function trackEvent(eventType, page, meta = {}) {
  try {
    const { data: { session } } = await _supabase.auth.getSession();
    if (!session) return;
    const resolvedPage = page || window.location.pathname.split('/').pop() || 'index.html';
    await _supabase.from('analytics_events').insert({
      member_id: session.user.id,
      event_type: eventType,
      page: resolvedPage,
      metadata: meta,
    });
  } catch (_) { /* silent — analytics should never break the app */ }
}

// Auto page-view tracking on every portal page load
document.addEventListener('DOMContentLoaded', () => {
  const page = window.location.pathname.split('/').pop() || 'index.html';
  if (page !== 'index.html') {
    // Delay slightly so requireAuth + initTopbar resolve first (user must be authed)
    setTimeout(() => trackEvent('page_view', page), 800);
  }
});

const SUPABASE_URL = 'https://ehcvjxggkfsdhzraucbz.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVoY3ZqeGdna2ZzZGh6cmF1Y2J6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI2MjA0MTgsImV4cCI6MjA4ODE5NjQxOH0.VvjiIrgVOONN_UOmwB0Q6hL_0aOjLlmfdVibKd627O8';

// Initialise Supabase client
const _supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

/* -------------------- Auth Helpers -------------------- */

/**
 * Require authentication. Redirects to index.html if no session.
 * Returns the session object.
 */
async function requireAuth() {
  const { data: { session } } = await _supabase.auth.getSession();
  if (!session) {
    window.location.href = 'index.html';
    return null;
  }
  return session;
}

/**
 * Fetch the current member's profile from the members table.
 */
async function getProfile(userId) {
  const { data, error } = await _supabase
    .from('members')
    .select('*')
    .eq('id', userId)
    .single();
  if (error) console.error('Profile fetch error:', error);
  return data;
}

/**
 * Sign the user out and redirect to login.
 */
async function signOut() {
  await _supabase.auth.signOut();
  window.location.href = 'index.html';
}

/**
 * Show/hide elements based on data-role attribute matching the user's role.
 * Elements with data-role="engineer" are shown only to engineers, etc.
 */
function showRoleUI(role) {
  if (!role) return;
  const r = role.toLowerCase();
  document.querySelectorAll('[data-role]').forEach(el => {
    const allowed = el.getAttribute('data-role').toLowerCase().split(',').map(s => s.trim());
    if (allowed.includes(r) || allowed.includes('all')) {
      el.style.display = '';
    } else {
      el.style.display = 'none';
    }
  });
}

/* -------------------- Sidebar / Mobile -------------------- */

function initSidebar() {
  const hamburger = document.getElementById('hamburgerBtn');
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('sidebarOverlay');

  if (!hamburger || !sidebar) return;

  hamburger.addEventListener('click', () => {
    sidebar.classList.toggle('open');
    overlay.classList.toggle('open');
  });
  overlay?.addEventListener('click', () => {
    sidebar.classList.remove('open');
    overlay.classList.remove('open');
  });
}

/* -------------------- Topbar Setup -------------------- */

async function initTopbar(session) {
  const profile = await getProfile(session.user.id);
  if (!profile) return profile;

  const _t = k => window.dfc_i18n ? window.dfc_i18n.t(k) : k;
  const isAr = window.dfc_i18n?.isAr;
  const locale = isAr ? 'ar-SA' : 'en-US';

  const welcomeEl = document.getElementById('topbarWelcome');
  if (welcomeEl) welcomeEl.textContent = `${_t('Welcome back,')} ${profile.full_name} 👋`;

  const roleEl = document.getElementById('topbarRole');
  if (roleEl) {
    const r = (profile.role || 'member').toLowerCase();
    roleEl.textContent = window.dfc_i18n ? window.dfc_i18n.role(profile.role) : profile.role;
    roleEl.className = `role-badge ${r}`;
  }

  const sinceEl = document.getElementById('topbarSince');
  if (sinceEl) {
    const d = new Date(profile.created_at);
    sinceEl.textContent = `${_t('Member since')} ${d.toLocaleDateString(locale, { month: 'short', year: 'numeric' })}`;
  }

  // Sidebar member info
  const sidebarName = document.getElementById('sidebarMemberName');
  if (sidebarName) sidebarName.textContent = profile.full_name;

  const sidebarRole = document.getElementById('sidebarMemberRole');
  if (sidebarRole) sidebarRole.textContent = profile.role;

  const sidebarAvatar = document.getElementById('sidebarAvatar');
  if (sidebarAvatar) {
    if (profile.avatar_url) {
      sidebarAvatar.innerHTML = `<img src="${escapeHtml(profile.avatar_url)}" alt="${escapeHtml(profile.full_name || '')}" style="width:100%;height:100%;object-fit:cover;border-radius:50%;display:block;">`;
    } else {
      sidebarAvatar.textContent = getInitials(profile.full_name);
      const r = (profile.role || '').toLowerCase();
      if (r === 'designer') sidebarAvatar.classList.add('gold');
      else if (r === 'investor') sidebarAvatar.classList.add('silver');
    }
  }

  showRoleUI(profile.role);
  injectApplicationsLink(profile.role);
  injectLangToggle();
  return profile;
}

/* -------------------- Utilities -------------------- */

function getInitials(name) {
  if (!name) return '?';
  return name.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase();
}

function formatDate(dateStr) {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' });
}

function timeAgo(dateStr) {
  if (!dateStr) return '';
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return 'just now';
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  if (days < 7) return `${days}d ago`;
  return formatDate(dateStr);
}

function escapeHtml(str) {
  if (!str) return '';
  return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

function roleBadgeHtml(role) {
  if (!role) return '';
  const r = role.toLowerCase();
  return `<span class="role-badge ${r}">${escapeHtml(role)}</span>`;
}

function statusBadgeHtml(status) {
  const map = {
    complete:    ['complete',    '✅ Complete'],
    in_progress: ['in-progress', '🔄 In Progress'],
    pending:     ['pending',     '⏳ Pending'],
  };
  const [cls, label] = map[status] || ['pending', status];
  return `<span class="status-badge ${cls}">${label}</span>`;
}

function typeBadgeHtml(type) {
  const t = (type || '').toLowerCase().replace(/\s+/g, '-');
  return `<span class="type-badge ${t}">${escapeHtml(type)}</span>`;
}

/* -------------------- Logout -------------------- */

/* -------------------- Notification Preferences -------------------- */

/**
 * Fetch notification preferences for the current user.
 * Returns an object with keys: new_threads, new_replies, new_announcements.
 * Defaults all to true if no row exists yet.
 */
async function getNotificationPrefs(userId) {
  const { data } = await _supabase
    .from('notification_preferences')
    .select('*')
    .eq('member_id', userId)
    .single();
  return data ?? { new_threads: true, new_replies: true, new_announcements: true };
}

/**
 * Save notification preferences for the current user.
 */
async function saveNotificationPrefs(userId, prefs) {
  const { error } = await _supabase
    .from('notification_preferences')
    .upsert({ member_id: userId, ...prefs, updated_at: new Date().toISOString() });
  return !error;
}

/* -------------------- Settings Link Injection -------------------- */

function injectSettingsLink() {
  const nav = document.querySelector('.sidebar-nav');
  if (!nav || document.querySelector('[href="settings.html"]')) return;

  const link = document.createElement('a');
  link.href = 'settings.html';
  link.className = 'sidebar-link';
  const currentPage = window.location.pathname.split('/').pop();
  if (currentPage === 'settings.html') link.classList.add('active');
  link.innerHTML = `
    <svg class="nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-width="1.5" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/>
      <circle cx="12" cy="12" r="3" stroke-width="1.5"/>
    </svg>
    Settings`;
  nav.appendChild(link);
}

/* -------------------- Applications Link Injection (admin only) ---- */

/**
 * Appends the "Applications" nav link for core_board / admin members.
 * Called after profile is loaded so we know the user's role.
 * @param {string} role - profile.role value
 */
function injectApplicationsLink(role) {
  if (!role) return;
  const r = role.toLowerCase();
  if (r !== 'core_board' && r !== 'admin') return;

  const nav = document.querySelector('.sidebar-nav');
  if (!nav || document.querySelector('[href="applications.html"]')) return;

  const link = document.createElement('a');
  link.href = 'applications.html';
  link.className = 'sidebar-link';
  const currentPage = window.location.pathname.split('/').pop();
  if (currentPage === 'applications.html') link.classList.add('active');

  link.innerHTML = `
    <svg class="nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-width="1.5" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"/>
    </svg>
    Applications`;

  // Insert before the sidebar-member footer, after existing nav items
  nav.appendChild(link);

  // Also load pending count badge asynchronously
  _supabase
    .from('collective_applications')
    .select('id', { count: 'exact', head: true })
    .eq('status', 'pending')
    .then(({ count }) => {
      if (count && count > 0) {
        const badge = document.createElement('span');
        badge.textContent = count;
        badge.style.cssText = 'background:var(--gold);color:#000;font-size:0.65rem;font-family:var(--font-mono);padding:0.1rem 0.35rem;border-radius:99px;margin-left:auto;';
        link.appendChild(badge);
      }
    });
}

/* -------------------- Language Toggle Injection ------------- */

function injectLangToggle() {
  // portal-i18n.js injects the button on DOMContentLoaded.
  // This is a safety fallback in case the topbar renders after i18n runs.
  const topbarRight = document.querySelector('.topbar-right');
  if (!topbarRight || document.getElementById('langToggleBtn')) return;
  const btn = document.createElement('button');
  btn.id = 'langToggleBtn';
  btn.className = 'lang-toggle';
  btn.setAttribute('aria-label', 'Toggle language / تبديل اللغة');
  const isAr = document.documentElement.classList.contains('ar');
  btn.textContent = isAr ? 'EN' : 'AR';
  btn.addEventListener('click', () => {
    if (typeof window.toggleLang === 'function') window.toggleLang();
  });
  topbarRight.appendChild(btn);
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.btn-logout').forEach(btn => {
    btn.addEventListener('click', signOut);
  });
  initSidebar();
  injectSettingsLink();
});
