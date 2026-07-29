import nodemailer from "nodemailer";

interface InquiryEmailData {
  name: string;
  company?: string;
  phone: string;
  email: string;
  message: string;
  sourcePage: string;
}

let transporter: nodemailer.Transporter | null = null;

function getTransporter() {
  if (transporter) return transporter;
  transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: Number(process.env.EMAIL_PORT) || 465,
    secure: Number(process.env.EMAIL_PORT) === 465,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
  return transporter;
}

const LOGO_URL = "https://res.cloudinary.com/ijn0usib/image/upload/brand/logo.png";

/** Form fields are free text from the public — escape before interpolating into HTML. */
function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function row(label: string, valueHtml: string, isLast = false) {
  return `
    <tr>
      <td style="padding:11px 0;${isLast ? "" : "border-bottom:1px solid #eeeeee;"}color:#8a8a8a;font-size:12px;font-weight:bold;text-transform:uppercase;letter-spacing:0.4px;width:110px;vertical-align:top;">${label}</td>
      <td style="padding:11px 0;${isLast ? "" : "border-bottom:1px solid #eeeeee;"}color:#1a1a1a;font-size:14px;vertical-align:top;">${valueHtml}</td>
    </tr>`;
}

/** Sends a new-inquiry notification to the sales inbox. Never throws — a failed
 * email should not stop the inquiry from being saved/acknowledged. */
export async function sendInquiryNotification(data: InquiryEmailData) {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.warn("sendInquiryNotification: EMAIL_USER/EMAIL_PASS not configured, skipping email.");
    return;
  }

  const name = escapeHtml(data.name);
  const company = data.company ? escapeHtml(data.company) : "";
  const phone = escapeHtml(data.phone);
  const email = escapeHtml(data.email);
  const sourcePage = escapeHtml(data.sourcePage);
  const message = escapeHtml(data.message);

  try {
    await getTransporter().sendMail({
      from: `"Arihant Cables Website" <${process.env.EMAIL_FROM}>`,
      to: process.env.EMAIL_TO,
      replyTo: data.email,
      subject: `New Enquiry from ${data.name}${data.company ? ` (${data.company})` : ""}`,
      text: [
        `Name: ${data.name}`,
        data.company ? `Company: ${data.company}` : null,
        `Phone: ${data.phone}`,
        `Email: ${data.email}`,
        `Source Page: ${data.sourcePage}`,
        "",
        "Message:",
        data.message,
      ]
        .filter(Boolean)
        .join("\n"),
      html: `
<div style="background-color:#f2f2f4;padding:32px 16px;font-family:Arial,Helvetica,sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;margin:0 auto;background-color:#ffffff;border-radius:14px;overflow:hidden;">
    <tr>
      <td style="background-color:#141414;padding:22px 32px;">
        <img src="${LOGO_URL}" width="150" alt="Arihant Cables" style="display:block;border:0;" />
      </td>
    </tr>
    <tr>
      <td style="background-color:#fc6601;height:4px;line-height:4px;font-size:0;">&nbsp;</td>
    </tr>
    <tr>
      <td style="padding:28px 32px 4px 32px;">
        <p style="margin:0;color:#fc6601;font-size:12px;font-weight:bold;letter-spacing:1px;text-transform:uppercase;">New Website Enquiry</p>
        <h1 style="margin:6px 0 0 0;color:#141414;font-size:21px;font-family:Arial,Helvetica,sans-serif;">${name}${company ? ` <span style="color:#8a8a8a;font-weight:normal;font-size:15px;">— ${company}</span>` : ""}</h1>
      </td>
    </tr>
    <tr>
      <td style="padding:18px 32px 6px 32px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
          ${row("Phone", `<a href="tel:${phone}" style="color:#1a1a1a;text-decoration:none;">${phone}</a>`)}
          ${row("Email", `<a href="mailto:${email}" style="color:#1a1a1a;text-decoration:none;">${email}</a>`)}
          ${row("Source", sourcePage, true)}
        </table>
      </td>
    </tr>
    <tr>
      <td style="padding:22px 32px 8px 32px;">
        <p style="margin:0 0 8px 0;color:#8a8a8a;font-size:12px;font-weight:bold;text-transform:uppercase;letter-spacing:0.4px;">Message</p>
        <div style="background-color:#f7f7f8;border-radius:10px;padding:16px 18px;color:#333333;font-size:14px;line-height:1.6;white-space:pre-wrap;">${message}</div>
      </td>
    </tr>
    <tr>
      <td style="padding:10px 32px 32px 32px;">
        <a href="mailto:${email}" style="display:inline-block;background-color:#fc6601;color:#ffffff;text-decoration:none;font-size:14px;font-weight:bold;padding:12px 26px;border-radius:8px;">Reply to ${name}</a>
      </td>
    </tr>
    <tr>
      <td style="background-color:#f7f7f8;padding:20px 32px;text-align:center;border-top:1px solid #eeeeee;">
        <p style="margin:0;color:#999999;font-size:12px;">Arihant Cables — Authorised Distributors of Polycab Wires &amp; Cables</p>
        <p style="margin:4px 0 0 0;color:#bbbbbb;font-size:11px;">Sent automatically from the enquiry form on arihantcables.com</p>
      </td>
    </tr>
  </table>
</div>`,
    });
  } catch (error) {
    console.error("sendInquiryNotification error:", error);
  }
}
