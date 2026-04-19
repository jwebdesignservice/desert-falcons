// Desert Falcons Collective — Application submission endpoint
//
// Called directly by join-form.js on submit. Does three things:
//   1. Appends a row to the Google Sheet (via Apps Script web app)
//   2. Sends a new-application summary to the admin inbox
//   3. Sends a confirmation email to the applicant

import { Resend } from 'resend'

const ADMIN_EMAIL = 'contact@desertfalconscollective.com'
const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || 'Desert Falcons <onboarding@resend.dev>'
const GSHEET_WEBAPP_URL = process.env.GSHEET_WEBAPP_URL

const ALLOWED_ORIGINS = [
  'https://desert-falcons.vercel.app',
  'https://desertfalconscollective.com',
  'https://www.desertfalconscollective.com',
]

function setCors(req, res) {
  const origin = req.headers.origin
  const allow = ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0]
  res.setHeader('Access-Control-Allow-Origin', allow)
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  res.setHeader('Vary', 'Origin')
}

export default async function handler(req, res) {
  setCors(req, res)

  if (req.method === 'OPTIONS') {
    return res.status(204).end()
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'method_not_allowed' })
  }

  if (!process.env.RESEND_API_KEY) {
    return res.status(500).json({ error: 'resend_api_key_not_configured' })
  }

  const record = normalizeRecord(req.body || {})

  if (!record.email || !isValidEmail(record.email)) {
    return res.status(400).json({ error: 'invalid_email' })
  }
  if (!record.full_name) {
    return res.status(400).json({ error: 'missing_name' })
  }
  if (!record.interest) {
    return res.status(400).json({ error: 'missing_interest' })
  }

  const resend = new Resend(process.env.RESEND_API_KEY)
  const summary = formatApplicationSummary(record)
  const interestLabel = formatInterest(record.interest)

  // Fan out: Sheets (optional) + admin email + applicant email in parallel.
  const [sheetResult, adminResult, applicantResult] = await Promise.allSettled([
    appendToSheet(record),
    resend.emails.send({
      from: FROM_EMAIL,
      to: ADMIN_EMAIL,
      subject: `New application — ${record.full_name} (${interestLabel})`,
      html: buildAdminHtml(record, summary),
      reply_to: record.email,
    }),
    resend.emails.send({
      from: FROM_EMAIL,
      to: record.email,
      subject: 'We received your application — Desert Falcons Collective',
      html: buildApplicantHtml(record),
    }),
  ])

  // Consider the submission successful as long as the admin gets their email.
  // Sheet failure shouldn't block — we still have the inbox record.
  const adminOk = adminResult.status === 'fulfilled' && !adminResult.value?.error

  if (!adminOk) {
    console.error('admin email failed', adminResult)
    return res.status(502).json({ error: 'email_send_failed' })
  }

  return res.status(200).json({
    ok: true,
    sheet: sheetResult.status === 'fulfilled',
    applicant_sent: applicantResult.status === 'fulfilled' && !applicantResult.value?.error,
  })
}

function normalizeRecord(body) {
  const pick = (k) => (typeof body[k] === 'string' ? body[k].trim() : body[k] ?? null)
  return {
    full_name: pick('full_name') || pick('fullName'),
    email: pick('email'),
    phone: pick('phone'),
    interest: pick('interest'),
    specialization: pick('specialization'),
    experience: pick('experience'),
    design_discipline: pick('design_discipline') || pick('designDiscipline'),
    portfolio_url: pick('portfolio_url') || pick('portfolio'),
    investment_range: pick('investment_range') || pick('investmentRange'),
    investor_type: pick('investor_type') || pick('investorType'),
    hear_about: pick('hear_about') || pick('hearAbout'),
    terms_agreed: Boolean(body.terms_agreed ?? body.termsAgreed),
    submitted_at: new Date().toISOString(),
  }
}

function isValidEmail(e) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e)
}

async function appendToSheet(record) {
  if (!GSHEET_WEBAPP_URL) return { skipped: true }
  const res = await fetch(GSHEET_WEBAPP_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(record),
  })
  if (!res.ok) throw new Error(`sheet append failed: ${res.status}`)
  return { ok: true }
}

function formatInterest(interest) {
  const map = {
    engineer: 'Engineer',
    designer: 'Designer',
    investor: 'Investor',
    general: 'General Interest',
  }
  return map[interest] || interest || 'Unknown'
}

function formatApplicationSummary(r) {
  return [
    ['Name', r.full_name],
    ['Email', r.email],
    ['Phone', r.phone],
    ['Interest', formatInterest(r.interest)],
    ['Specialization', r.specialization],
    ['Experience', r.experience],
    ['Design discipline', r.design_discipline],
    ['Portfolio', r.portfolio_url],
    ['Investment range', r.investment_range],
    ['Investor type', r.investor_type],
    ['How they heard', r.hear_about],
  ].filter(([, v]) => v)
}

function esc(s) {
  if (s == null) return ''
  return String(s).replace(/[&<>"']/g, (c) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  }[c]))
}

function buildAdminHtml(record, summary) {
  const rowsHtml = summary
    .map(
      ([label, value]) => `
        <tr>
          <td style="padding:10px 14px;border-bottom:1px solid #1f1f1f;color:#B8915A;font-family:monospace;font-size:11px;letter-spacing:0.1em;text-transform:uppercase;width:170px;vertical-align:top;">${esc(label)}</td>
          <td style="padding:10px 14px;border-bottom:1px solid #1f1f1f;color:#ffffff;font-family:Inter,Arial,sans-serif;font-size:14px;vertical-align:top;">${esc(value)}</td>
        </tr>`
    )
    .join('')

  return `<!doctype html>
<html><body style="margin:0;padding:0;background:#0A0A0A;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#0A0A0A;padding:32px 16px;">
    <tr><td align="center">
      <table role="presentation" width="620" cellpadding="0" cellspacing="0" style="max-width:620px;background:#111111;border:1px solid #1f1f1f;">
        <tr><td style="padding:32px 40px 8px;">
          <p style="margin:0 0 4px;font-family:monospace;font-size:11px;letter-spacing:0.25em;text-transform:uppercase;color:#B8915A;">New Application</p>
          <h1 style="margin:0;font-family:'Cormorant Garamond',Georgia,serif;font-size:26px;font-weight:500;color:#ffffff;">${esc(record.full_name)}</h1>
          <p style="margin:6px 0 0;font-family:Inter,Arial,sans-serif;font-size:14px;color:rgba(255,255,255,0.5);">${esc(formatInterest(record.interest))} · ${esc(record.email)}</p>
        </td></tr>
        <tr><td style="padding:16px 40px 32px;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-top:1px solid #1f1f1f;">
            ${rowsHtml}
          </table>
        </td></tr>
        <tr><td style="padding:16px 40px 32px;border-top:1px solid #1f1f1f;">
          <p style="margin:0;font-family:Inter,Arial,sans-serif;font-size:12px;color:rgba(255,255,255,0.3);">Reply directly to this email to contact the applicant.</p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body></html>`
}

function buildApplicantHtml(record) {
  const firstName = (record.full_name || '').trim().split(/\s+/)[0] || 'there'
  return `<!doctype html>
<html><body style="margin:0;padding:0;background:#0A0A0A;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#0A0A0A;padding:32px 16px;">
    <tr><td align="center">
      <table role="presentation" width="580" cellpadding="0" cellspacing="0" style="max-width:580px;background:#111111;border:1px solid #1f1f1f;">
        <tr><td style="padding:40px 40px 16px;">
          <p style="margin:0 0 8px;font-family:monospace;font-size:11px;letter-spacing:0.25em;text-transform:uppercase;color:#B8915A;">Desert Falcons Collective</p>
          <h1 style="margin:0 0 20px;font-family:'Cormorant Garamond',Georgia,serif;font-size:30px;font-weight:500;color:#ffffff;line-height:1.2;">You're in the Collective.</h1>
          <p style="margin:0 0 16px;font-family:Inter,Arial,sans-serif;font-size:15px;line-height:1.7;color:rgba(255,255,255,0.75);">${esc(firstName)}, thank you for registering your interest with Desert Falcons Collective.</p>
          <p style="margin:0 0 16px;font-family:Inter,Arial,sans-serif;font-size:15px;line-height:1.7;color:rgba(255,255,255,0.75);">We've received your application and will be in touch when the time is right. In the meantime, we're assembling the nation's finest minds to build SAIF — the Kingdom's first luxury automotive icon.</p>
        </td></tr>
        <tr><td style="padding:0 40px 32px;">
          <div style="border-left:2px solid #1E4A3B;padding:8px 0 8px 20px;">
            <p style="margin:0 0 8px;font-family:'Cormorant Garamond',Georgia,serif;font-style:italic;font-size:17px;color:rgba(255,255,255,0.7);line-height:1.5;">"We are not job seekers. We are believers."</p>
            <p style="margin:0;font-family:monospace;font-size:10px;letter-spacing:0.15em;color:rgba(255,255,255,0.3);">— Khalaf Althobaiti, Founder</p>
          </div>
        </td></tr>
        <tr><td style="padding:20px 40px;border-top:1px solid #1f1f1f;">
          <p style="margin:0;font-family:Inter,Arial,sans-serif;font-size:12px;color:rgba(255,255,255,0.3);">Desert Falcons Collective · A Vision 2030 Initiative</p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body></html>`
}
