import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

import express from "express";
import nodemailer from "nodemailer";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const envPath = path.join(root, ".env");

function loadEnvFile(filePath) {
  if (!fs.existsSync(filePath)) return;

  const lines = fs.readFileSync(filePath, "utf8").replace(/^\uFEFF/, "").split(/\r?\n/);

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;

    const separator = trimmed.indexOf("=");
    if (separator === -1) continue;

    const key = trimmed.slice(0, separator).trim();
    let value = trimmed.slice(separator + 1).trim();

    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }

    process.env[key] = value;
  }
}

function smtpPass() {
  return (process.env.SMTP_PASS || "").replaceAll(" ", "");
}

function isConfigured() {
  return Boolean(
    process.env.SMTP_HOST &&
    process.env.SMTP_USER &&
    smtpPass() &&
    process.env.CONTACT_TO
  );
}

loadEnvFile(envPath);

const app = express();
const port = Number(process.env.PORT || 3001);

app.use(express.json({ limit: "20kb" }));

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const hits = new Map();

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function tooManyRequests(ip) {
  const now = Date.now();
  const windowMs = 15 * 60 * 1000;
  const recent = (hits.get(ip) || []).filter((time) => now - time < windowMs);

  if (recent.length >= 5) {
    hits.set(ip, recent);
    return true;
  }

  recent.push(now);
  hits.set(ip, recent);
  return false;
}

function readField(value, maxLength) {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, maxLength);
}

app.post("/api/contact", async (req, res) => {
  loadEnvFile(envPath);

  if (!isConfigured()) {
    return res.status(503).json({ error: "Contact form is not configured yet." });
  }

  const ip = req.ip || req.socket.remoteAddress || "unknown";
  if (tooManyRequests(ip)) {
    return res.status(429).json({ error: "Too many messages. Please try again later." });
  }

  const firstName = readField(req.body?.firstName, 80);
  const lastName = readField(req.body?.lastName, 80);
  const email = readField(req.body?.email, 120);
  const subject = readField(req.body?.subject, 200);
  const message = readField(req.body?.message, 5000);

  if (!firstName || !email || !subject || !message) {
    return res.status(400).json({ error: "Please fill in all required fields." });
  }

  if (!emailPattern.test(email)) {
    return res.status(400).json({ error: "Please enter a valid email address." });
  }

  const fullName = [firstName, lastName].filter(Boolean).join(" ");

  try {
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

    return res.json({ ok: true });
  } catch (error) {
    console.error("Failed to send contact email:", error.message);

    if (error.code === "EAUTH") {
      return res.status(500).json({
        error: "Gmail rejected the login. Check SMTP_USER and the app password.",
      });
    }

    return res.status(500).json({ error: "The message could not be sent. Please try again." });
  }
});

const dist = path.join(root, "dist");
if (fs.existsSync(dist)) {
  app.use(express.static(dist));
  app.get(/^(?!\/api).*/, (_req, res) => {
    res.sendFile(path.join(dist, "index.html"));
  });
}

app.listen(port, () => {
  console.log(`Contact API listening on http://localhost:${port}`);
  if (isConfigured()) {
    console.log("SMTP is configured.");
  } else {
    console.warn("SMTP is not configured. Copy .env.example to .env and fill in your credentials.");
  }
});
