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

/** Sends a new-inquiry notification to the sales inbox. Never throws — a failed
 * email should not stop the inquiry from being saved/acknowledged. */
export async function sendInquiryNotification(data: InquiryEmailData) {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.warn("sendInquiryNotification: EMAIL_USER/EMAIL_PASS not configured, skipping email.");
    return;
  }

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
        <div style="font-family: sans-serif; max-width: 500px;">
          <h2 style="color: #fc6601;">New Enquiry — Arihant Cables Website</h2>
          <table cellpadding="6" style="border-collapse: collapse;">
            <tr><td><strong>Name</strong></td><td>${data.name}</td></tr>
            ${data.company ? `<tr><td><strong>Company</strong></td><td>${data.company}</td></tr>` : ""}
            <tr><td><strong>Phone</strong></td><td><a href="tel:${data.phone}">${data.phone}</a></td></tr>
            <tr><td><strong>Email</strong></td><td><a href="mailto:${data.email}">${data.email}</a></td></tr>
            <tr><td><strong>Source Page</strong></td><td>${data.sourcePage}</td></tr>
          </table>
          <p style="white-space: pre-wrap; border-top: 1px solid #eee; padding-top: 12px; margin-top: 12px;">${data.message}</p>
        </div>
      `,
    });
  } catch (error) {
    console.error("sendInquiryNotification error:", error);
  }
}
