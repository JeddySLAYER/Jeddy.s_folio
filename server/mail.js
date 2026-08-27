import nodemailer from "nodemailer";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function smtpPass() {
  return (process.env.SMTP_PASS || "").replaceAll(" ", "");
}

export function isConfigured() {
  return Boolean(
    process.env.SMTP_HOST &&
    process.env.SMTP_USER &&
    smtpPass() &&
    process.env.CONTACT_TO
  );
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function readField(value, maxLength) {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, maxLength);
}

export function parseContact(body) {
  const firstName = readField(body?.firstName, 80);
  const lastName = readField(body?.lastName, 80);
  const email = readField(body?.email, 120);
  const subject = readField(body?.subject, 200);
  const message = readField(body?.message, 5000);

  if (!firstName || !email || !subject || !message) {
    return { error: "Please fill in all required fields." };
  }

  if (!emailPattern.test(email)) {
    return { error: "Please enter a valid email address." };
  }

  return {
    data: {
      firstName,
      lastName,
      email,
      subject,
      message,
      fullName: [firstName, lastName].filter(Boolean).join(" "),
    },
  };
}

export async function sendContactEmail({ fullName, email, subject, message }) {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587),
    secure: process.env.SMTP_SECURE === "true",
    auth: {
      user: process.env.SMTP_USER,
      pass: smtpPass(),
    },
  });

  await transporter.sendMail({
    from: `"Portfolio" <${process.env.SMTP_USER}>`,
    to: process.env.CONTACT_TO,
    replyTo: email,
    subject: `[Portfolio] ${subject}`,
    text: [
      `Name: ${fullName}`,
      `Email: ${email}`,
      `Subject: ${subject}`,
      "",
      message,
    ].join("\n"),
    html: `
      <p><strong>Name:</strong> ${escapeHtml(fullName)}</p>
      <p><strong>Email:</strong> ${escapeHtml(email)}</p>
      <p><strong>Subject:</strong> ${escapeHtml(subject)}</p>
      <p>${escapeHtml(message).replaceAll("\n", "<br />")}</p>
    `,
  });
}
