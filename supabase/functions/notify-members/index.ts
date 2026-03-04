// ============================================================
// Desert Falcons Collective — Email Notification Edge Function
// Triggered by Supabase Database Webhooks on INSERT events
// Sends emails via Resend API
//
// Deploy: supabase functions deploy notify-members
// Secrets needed:
//   RESEND_API_KEY     - your Resend API key
//   FROM_EMAIL         - sender address (e.g. portal@yourdomain.com)
//   PORTAL_URL         - base URL of portal (e.g. https://yourdomain.com/portal)
// ============================================================

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const RESEND_API_KEY  = Deno.env.get('RESEND_API_KEY')!
const FROM_EMAIL      = Deno.env.get('FROM_EMAIL') ?? 'portal@desertfalconscollective.com'
const PORTAL_URL      = Deno.env.get('PORTAL_URL') ?? 'https://desertfalconscollective.com/portal'
const SUPABASE_URL    = Deno.env.get('SUPABASE_URL')!
const SUPABASE_KEY    = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!

// Supabase admin client (bypasses RLS to fetch member emails)
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)

// ────────────────────────────────────────────────────────────
// Types
// ────────────────────────────────────────────────────────────

interface WebhookPayload {
  type: 'INSERT' | 'UPDATE' | 'DELETE'
  table: string
  record: Record<string, unknown>
  schema: string
  old_record: Record<string, unknown> | null
}

interface Member {
  id: string
  full_name: string
  email: string
}

// ────────────────────────────────────────────────────────────
// Email sender
// ────────────────────────────────────────────────────────────

async function sendEmail(to: string, subject: string, html: string) {
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ from: FROM_EMAIL, to, subject, html }),
  })
  if (!res.ok) {
    const err = await res.text()
    console.error(`Resend error for ${to}:`, err)
  }
}

// ────────────────────────────────────────────────────────────
// Email templates
// ────────────────────────────────────────────────────────────

function emailWrapper(content: string) {
  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <style>
    body { font-family: 'Georgia', serif; background: #0A0A0A; color: #FFFFFF; margin: 0; padding: 0; }
    .wrap { max-width: 560px; margin: 0 auto; padding: 48px 24px; }
    .logo { text-align: center; margin-bottom: 40px; }
    .logo-text { font-size: 18px; letter-spacing: 4px; text-transform: uppercase; color: #FFFFFF; }
    .logo-sub { font-size: 9px; letter-spacing: 6px; color: #B8915A; text-transform: uppercase; margin-top: 4px; display: block; }
    .logo-line { width: 40px; height: 1px; background: #B8915A; margin: 12px auto; opacity: 0.5; }
    .card { background: #111111; border: 1px solid rgba(255,255,255,0.08); padding: 32px; }
    h2 { font-size: 22px; font-weight: 400; color: #FFFFFF; margin: 0 0 8px; }
    .meta { font-family: monospace; font-size: 10px; letter-spacing: 1px; color: #B8915A; text-transform: uppercase; margin-bottom: 16px; }
    p { font-size: 14px; line-height: 1.8; color: rgba(255,255,255,0.7); margin: 0 0 24px; }
    .btn { display: inline-block; background: #1E4A3B; color: #FFFFFF; padding: 12px 28px; font-family: monospace; font-size: 11px; letter-spacing: 2px; text-transform: uppercase; text-decoration: none; border: 1px solid rgba(255,255,255,0.15); }
    .footer { text-align: center; margin-top: 32px; font-family: monospace; font-size: 9px; letter-spacing: 1px; color: rgba(255,255,255,0.3); line-height: 1.8; }
    .divider { border: none; border-top: 1px solid rgba(255,255,255,0.06); margin: 24px 0; }
  </style>
</head>
<body>
<div class="wrap">
  <div class="logo">
    <div class="logo-text">Desert Falcons</div>
    <span class="logo-sub">Collective</span>
    <div class="logo-line"></div>
  </div>
  ${content}
  <div class="footer">
    You're receiving this because you're a member of the Desert Falcons Collective.<br>
    To manage notifications, visit <a href="${PORTAL_URL}/settings.html" style="color:#B8915A;">your portal settings</a>.
  </div>
</div>
</body>
</html>`
}

function newThreadEmail(memberName: string, threadTitle: string, category: string, threadId: string) {
  return emailWrapper(`
    <div class="card">
      <div class="meta">New Discussion · ${category}</div>
      <h2>${threadTitle}</h2>
      <hr class="divider">
      <p>A new thread has been started in the <strong>${category}</strong> forum. Join the conversation inside the portal.</p>
      <a href="${PORTAL_URL}/discussions.html" class="btn">Open Discussion →</a>
    </div>`)
}

function newReplyEmail(memberName: string, threadTitle: string, previewText: string) {
  return emailWrapper(`
    <div class="card">
      <div class="meta">New Reply to Your Thread</div>
      <h2>${threadTitle}</h2>
      <hr class="divider">
      <p>${previewText.length > 200 ? previewText.slice(0, 200) + '…' : previewText}</p>
      <a href="${PORTAL_URL}/discussions.html" class="btn">View Reply →</a>
    </div>`)
}

function newAnnouncementEmail(memberName: string, title: string, bodyPreview: string) {
  return emailWrapper(`
    <div class="card">
      <div class="meta">New Announcement from Khalaf</div>
      <h2>${title}</h2>
      <hr class="divider">
      <p>${bodyPreview.length > 300 ? bodyPreview.slice(0, 300) + '…' : bodyPreview}</p>
      <a href="${PORTAL_URL}/announcements.html" class="btn">Read Announcement →</a>
    </div>`)
}

// ────────────────────────────────────────────────────────────
// Fetch member emails with optional notification filter
// ────────────────────────────────────────────────────────────

async function getMembersWithPref(prefField: string): Promise<Member[]> {
  // Join members + notification_preferences to get emails of members who opted in
  const { data, error } = await supabase.rpc('get_notifiable_members', { pref_field: prefField })
  if (error || !data) {
    // Fallback: fetch all members (if RPC not available)
    const { data: members } = await supabase
      .from('members')
      .select('id, full_name')
    if (!members) return []

    const memberIds = members.map((m: { id: string }) => m.id)
    const { data: authUsers } = await supabase.auth.admin.listUsers()
    if (!authUsers) return []

    const emailMap = new Map(authUsers.users.map(u => [u.id, u.email ?? '']))
    return members.map((m: { id: string; full_name: string }) => ({
      id: m.id,
      full_name: m.full_name ?? 'Member',
      email: emailMap.get(m.id) ?? '',
    })).filter((m: Member) => m.email)
  }
  return data as Member[]
}

async function getThreadSubscribers(threadId: string): Promise<Member[]> {
  const { data: subs } = await supabase
    .from('thread_subscriptions')
    .select('member_id')
    .eq('thread_id', threadId)

  if (!subs || !subs.length) return []

  const memberIds = subs.map((s: { member_id: string }) => s.member_id)
  const { data: members } = await supabase
    .from('members')
    .select('id, full_name')
    .in('id', memberIds)

  if (!members) return []

  const { data: authUsers } = await supabase.auth.admin.listUsers()
  if (!authUsers) return []

  const emailMap = new Map(authUsers.users.map(u => [u.id, u.email ?? '']))

  // Filter by notification preference: new_replies must be true
  const { data: prefs } = await supabase
    .from('notification_preferences')
    .select('member_id, new_replies')
    .in('member_id', memberIds)

  const wantsReplies = new Set(
    (prefs || [])
      .filter((p: { member_id: string; new_replies: boolean }) => p.new_replies !== false)
      .map((p: { member_id: string }) => p.member_id)
  )

  return members
    .filter((m: { id: string }) => wantsReplies.has(m.id))
    .map((m: { id: string; full_name: string }) => ({
      id: m.id,
      full_name: m.full_name ?? 'Member',
      email: emailMap.get(m.id) ?? '',
    }))
    .filter((m: Member) => m.email)
}

// ────────────────────────────────────────────────────────────
// Handlers per table
// ────────────────────────────────────────────────────────────

async function handleNewThread(record: Record<string, unknown>) {
  const title    = String(record.title ?? 'New Thread')
  const category = String(record.category ?? 'General')
  const authorId = String(record.author_id ?? '')

  // Fetch all members who want new_thread notifications
  const { data: prefs } = await supabase
    .from('notification_preferences')
    .select('member_id')
    .eq('new_threads', true)
    .neq('member_id', authorId) // don't notify the person who posted

  if (!prefs || !prefs.length) return

  const memberIds = prefs.map((p: { member_id: string }) => p.member_id)
  const { data: members } = await supabase
    .from('members')
    .select('id, full_name')
    .in('id', memberIds)

  if (!members) return

  const { data: authUsers } = await supabase.auth.admin.listUsers()
  if (!authUsers) return

  const emailMap = new Map(authUsers.users.map(u => [u.id, u.email ?? '']))

  const sends = members.map((m: { id: string; full_name: string }) => {
    const email = emailMap.get(m.id)
    if (!email) return Promise.resolve()
    const html = newThreadEmail(m.full_name, title, category, String(record.id ?? ''))
    return sendEmail(email, `💬 New discussion: ${title}`, html)
  })

  await Promise.allSettled(sends)
  console.log(`Notified ${sends.length} members of new thread: ${title}`)
}

async function handleNewReply(record: Record<string, unknown>) {
  const threadId = String(record.thread_id ?? '')
  const replyBody = String(record.body ?? '')
  const authorId = String(record.author_id ?? '')

  // Fetch thread title
  const { data: thread } = await supabase
    .from('discussion_threads')
    .select('title')
    .eq('id', threadId)
    .single()

  const threadTitle = thread?.title ?? 'a discussion'

  // Get thread subscribers (minus the person who just replied)
  const subscribers = await getThreadSubscribers(threadId)
  const toNotify = subscribers.filter(m => m.id !== authorId)

  const sends = toNotify.map(m => {
    const html = newReplyEmail(m.full_name, threadTitle, replyBody)
    return sendEmail(m.email, `↩️ New reply in: ${threadTitle}`, html)
  })

  await Promise.allSettled(sends)
  console.log(`Notified ${sends.length} subscribers of reply in: ${threadTitle}`)
}

async function handleNewAnnouncement(record: Record<string, unknown>) {
  const title = String(record.title ?? 'New Announcement')
  const body  = String(record.body ?? '')

  // Fetch all members who want announcement notifications
  const { data: prefs } = await supabase
    .from('notification_preferences')
    .select('member_id')
    .eq('new_announcements', true)

  if (!prefs || !prefs.length) return

  const memberIds = prefs.map((p: { member_id: string }) => p.member_id)
  const { data: members } = await supabase
    .from('members')
    .select('id, full_name')
    .in('id', memberIds)

  if (!members) return

  const { data: authUsers } = await supabase.auth.admin.listUsers()
  if (!authUsers) return

  const emailMap = new Map(authUsers.users.map(u => [u.id, u.email ?? '']))

  const sends = members.map((m: { id: string; full_name: string }) => {
    const email = emailMap.get(m.id)
    if (!email) return Promise.resolve()
    const html = newAnnouncementEmail(m.full_name, title, body)
    return sendEmail(email, `📢 DFC Announcement: ${title}`, html)
  })

  await Promise.allSettled(sends)
  console.log(`Notified ${sends.length} members of announcement: ${title}`)
}

// ────────────────────────────────────────────────────────────
// Main handler
// ────────────────────────────────────────────────────────────

Deno.serve(async (req) => {
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 })
  }

  let payload: WebhookPayload
  try {
    payload = await req.json()
  } catch {
    return new Response('Invalid JSON', { status: 400 })
  }

  // Only process INSERTs
  if (payload.type !== 'INSERT') {
    return new Response('OK — skipped (not INSERT)', { status: 200 })
  }

  try {
    switch (payload.table) {
      case 'discussion_threads':
        await handleNewThread(payload.record)
        break
      case 'discussion_replies':
        await handleNewReply(payload.record)
        break
      case 'announcements':
        await handleNewAnnouncement(payload.record)
        break
      default:
        console.log('Unknown table:', payload.table)
    }
  } catch (err) {
    console.error('Notification error:', err)
    return new Response('Internal error', { status: 500 })
  }

  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  })
})
