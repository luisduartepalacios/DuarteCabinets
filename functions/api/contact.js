/**
 * Cloudflare Pages Function — POST /api/contact
 *
 * Handles the website contact form:
 *   1. Sends a lead-notification email to the studio.
 *   2. Sends a branded confirmation email back to the person who submitted.
 *
 * Email is sent via Resend (https://resend.com).
 * Requires an environment variable set in Cloudflare Pages:
 *   RESEND_API_KEY  (Settings → Variables and Secrets → add as a Secret, for Production)
 *
 * The sending domain (duartecabinets.com) must be verified in Resend.
 */

const STUDIO_EMAIL = 'contact@duartecabinets.com';
const STUDIO_NAME = 'Duarte Cabinets & Design';
const SITE_URL = 'https://www.duartecabinets.com';
// Internal notifications come from noreply@; the customer-facing reply comes from contact@.
const FROM_NOTIFY = 'Duarte Website <noreply@duartecabinets.com>';
const FROM_STUDIO = 'Duarte Cabinets & Design <contact@duartecabinets.com>';

// ---- Brand colors (for the email HTML) ----
const C = {
  forest: '#1e2d29',
  rust: '#dc5026',
  cream: '#f3ede1',
  sand: '#cfbd9e',
  ink: '#20302b',
  muted: '#5a6660',
};

const json = (data, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });

const esc = (s = '') =>
  String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

async function sendEmail(apiKey, payload) {
  return fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });
}

// ---- Email templates ----

function leadEmail(d) {
  const row = (label, value) => `
    <tr>
      <td style="padding:10px 0;border-bottom:1px solid #e5ddcd;font:600 12px/1.4 Arial,sans-serif;letter-spacing:1px;text-transform:uppercase;color:${C.muted};width:150px;vertical-align:top;">${label}</td>
      <td style="padding:10px 0;border-bottom:1px solid #e5ddcd;font:400 15px/1.6 Arial,sans-serif;color:${C.ink};">${value}</td>
    </tr>`;
  return `
  <div style="background:${C.cream};padding:32px;">
    <div style="max-width:560px;margin:0 auto;background:#fff;border-radius:4px;overflow:hidden;border:1px solid #e5ddcd;">
      <div style="background:${C.forest};padding:22px 28px;">
        <p style="margin:0;font:600 13px/1 Arial,sans-serif;letter-spacing:2px;text-transform:uppercase;color:${C.sand};">New project inquiry</p>
      </div>
      <div style="padding:28px;">
        <table style="width:100%;border-collapse:collapse;">
          ${row('Name', d.name)}
          ${row('Email', `<a href="mailto:${d.email}" style="color:${C.rust};text-decoration:none;">${d.email}</a>`)}
          ${row('Phone', d.phone)}
          ${row('Service', d.service)}
          ${row('Message', d.message)}
        </table>
        <p style="margin:24px 0 0;font:400 13px/1.5 Arial,sans-serif;color:${C.muted};">Reply directly to this email to respond to ${d.name}.</p>
      </div>
    </div>
  </div>`;
}

function confirmEmail(d) {
  return `
  <div style="background:${C.cream};padding:32px;">
    <div style="max-width:560px;margin:0 auto;background:#fff;border-radius:4px;overflow:hidden;border:1px solid #e5ddcd;">
      <div style="background:${C.forest};padding:26px 28px;text-align:center;">
        <p style="margin:0;font:700 20px/1 Georgia,serif;letter-spacing:1px;text-transform:uppercase;color:${C.cream};">Duarte</p>
        <p style="margin:6px 0 0;font:400 11px/1 Arial,sans-serif;letter-spacing:3px;text-transform:uppercase;color:${C.sand};">cabinets &amp; design</p>
      </div>
      <div style="padding:32px 28px;">
        <p style="margin:0 0 16px;font:400 17px/1.6 Arial,sans-serif;color:${C.ink};">Hi ${d.name},</p>
        <p style="margin:0 0 16px;font:400 16px/1.7 Arial,sans-serif;color:${C.ink};">
          Thank you for reaching out to ${STUDIO_NAME}. We’ve received your inquiry and will get back to you within <strong>two business days</strong>.
        </p>
        <p style="margin:0 0 22px;font:400 16px/1.7 Arial,sans-serif;color:${C.ink};">
          Here’s a copy of what you sent us:
        </p>
        <div style="background:${C.cream};border-radius:4px;padding:18px 20px;margin-bottom:24px;">
          <p style="margin:0 0 8px;font:400 14px/1.6 Arial,sans-serif;color:${C.ink};"><strong style="color:${C.muted};">Service:</strong> ${d.service}</p>
          <p style="margin:0;font:400 14px/1.7 Arial,sans-serif;color:${C.ink};"><strong style="color:${C.muted};">Your message:</strong><br>${d.message}</p>
        </div>
        <p style="margin:0 0 4px;font:400 16px/1.7 Arial,sans-serif;color:${C.ink};">Warmly,</p>
        <p style="margin:0 0 2px;font:700 16px/1.4 Georgia,serif;color:${C.forest};">Itzel Duarte</p>
        <p style="margin:0 0 20px;font:400 13px/1.4 Arial,sans-serif;color:${C.muted};">${STUDIO_NAME}</p>
        <p style="margin:0;font:400 13px/1.6 Arial,sans-serif;color:${C.muted};">
          <a href="${SITE_URL}" style="color:${C.rust};text-decoration:none;">www.duartecabinets.com</a>
          &nbsp;·&nbsp; Smart spaces, made to measure.
        </p>
      </div>
    </div>
    <p style="max-width:560px;margin:16px auto 0;font:400 11px/1.5 Arial,sans-serif;color:${C.muted};text-align:center;">
      This is an automated confirmation. If you didn’t submit this request, you can ignore this email.
    </p>
  </div>`;
}

export async function onRequestPost({ request, env }) {
  let form;
  try {
    form = await request.formData();
  } catch {
    return json({ ok: false, error: 'Invalid submission.' }, 400);
  }

  const name = (form.get('name') || '').toString().trim();
  const email = (form.get('email') || '').toString().trim();
  const phone = (form.get('phone') || '').toString().trim();
  const service = (form.get('service') || '').toString().trim();
  const message = (form.get('message') || '').toString().trim();
  const honeypot = (form.get('_gotcha') || '').toString().trim();

  // Honeypot: a bot filled the hidden field — pretend success, send nothing.
  if (honeypot) return json({ ok: true });

  // Validation (mirrors the required fields on the form).
  if (!name || !email || !service || !message) {
    return json({ ok: false, error: 'Please fill in all required fields.' }, 400);
  }
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return json({ ok: false, error: 'Please enter a valid email address.' }, 400);
  }

  const apiKey = env.RESEND_API_KEY;
  if (!apiKey) {
    return json({ ok: false, error: 'Email service is not configured.' }, 500);
  }

  const d = {
    name: esc(name),
    email: esc(email),
    phone: esc(phone || '—'),
    service: esc(service),
    message: esc(message).replace(/\n/g, '<br>'),
  };

  // 1) Lead notification → studio (critical path).
  const leadRes = await sendEmail(apiKey, {
    from: FROM_NOTIFY,
    to: [STUDIO_EMAIL],
    reply_to: email,
    subject: `New project inquiry, ${name}`,
    html: leadEmail(d),
  });

  if (!leadRes.ok) {
    return json(
      { ok: false, error: `We couldn’t send your message. Please email us directly at ${STUDIO_EMAIL}.` },
      502
    );
  }

  // 2) Confirmation → submitter (best-effort; never fail the request over this).
  try {
    await sendEmail(apiKey, {
      from: FROM_STUDIO,
      to: [email],
      reply_to: STUDIO_EMAIL,
      subject: `We received your inquiry, ${STUDIO_NAME}`,
      html: confirmEmail(d),
    });
  } catch {
    // Lead already delivered; ignore confirmation failure.
  }

  return json({ ok: true });
}
