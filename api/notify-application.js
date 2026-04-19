// Desert Falcons Collective — Application notification endpoint
//
// Called by Supabase Database Webhook after an INSERT into
// public.collective_applications. Sends two emails via Resend:
//   1. Confirmation to the applicant
//   2. New-application summary to the admin inbox

import { Resend } from 'resend'

const ADMIN_EMAIL = 'contact@desertfalconscollective.com'
const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || 'Desert Falcons <onboarding@resend.dev>'
const SHARED_SECRET = process.env.WEBHOOK_SECRET

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'method_not_allowed' })
  }

  // Lightweight shared-secret check. Supabase webhook is configured to send
  // this in a custom header; if WEBHOOK_SECRET is unset, skip the check
  // (useful while wiring things up, but set it in prod).
  if (SHARED_SECRET) {
    const provided = req.headers['x-webhook-secret']
    if (provided !== SHARED_SECRET) {
      return res.status(401).json({ error: 'unauthorized' })
    }
  }

  if (!process.env.RESEND_API_KEY) {
    return res.status(500).json({ error: 'resend_api_key_not_configured' })
  }

  const body = req.body || {}
  const record = body.record || body

  if (!record?.email) {
    return res.status(400).json({ error: 'missing_record_email' })
  }

  const resend = new Resend(process.env.RESEND_API_KEY)

  const summary = formatApplicationSummary(record)
  const interestLabel = formatInterest(record.interest)

  const adminResult = await resend.emails.send({
    from: FROM_EMAIL,
    to: ADMIN_EMAIL,
    subject: `New application — ${record.full_name || 'Unknown'} (${interestLabel})`,
    html: buildAdminHtml(record, summary),
    reply_to: record.email,
  })

  const applicantResult = await resend.emails.send({
    from: FROM_EMAIL,
    to: record.email,
    subject: 'We received your application — Desert Falcons Collective',
    html: buildApplicantHtml(record),
  })

  return res.status(200).json({
    ok: true,
    admin_id: adminResult?.data?.id || null,
    applicant_id: applicantResult?.data?.id || null,
    admin_error: adminResult?.error || null,
    applicant_error: applicantResult?.error || null,
  })
}

function formatInterest(interest) {
  const map = {
    engineer: 'Engineer',
    designer: 'Designer',
    investor: 'Investor',
    general: 'General Interest',
  }
  return map[interest] || 'Unknown'
}

function formatApplicationSummary(r) {
  const rows = [
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
  return rows
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
          <h1 style="margin:0;font-family:'Cormorant Garamond',Georgia,serif;font-size:26px;font-weight:500;color:#ffffff;">${esc(record.full_name || 'Unknown applicant')}</h1>
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
