import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

import express from "express";

import { isConfigured, parseContact, sendContactEmail } from "./mail.js";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const envPath = path.join(root, ".env");

function loadEnvFile(filePath, { override = false } = {}) {
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

    if (!override && process.env[key] !== undefined) continue;
    process.env[key] = value;
  }
}

loadEnvFile(envPath);

const app = express();
const port = Number(process.env.PORT || 3001);

app.use(express.json({ limit: "20kb" }));

const hits = new Map();

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

app.post("/api/contact", async (req, res) => {
  if (process.env.NODE_ENV !== "production") {
    loadEnvFile(envPath, { override: true });
  }

  if (!isConfigured()) {
    return res.status(503).json({ error: "Contact form is not configured yet." });
  }

  const ip = req.ip || req.socket.remoteAddress || "unknown";
  if (tooManyRequests(ip)) {
    return res.status(429).json({ error: "Too many messages. Please try again later." });
  }

  const parsed = parseContact(req.body);
  if (parsed.error) {
    return res.status(400).json({ error: parsed.error });
  }

  try {
    await sendContactEmail(parsed.data);
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

app.listen(port, "0.0.0.0", () => {
  console.log(`Contact API listening on http://localhost:${port}`);
  if (isConfigured()) {
    console.log("SMTP is configured.");
  } else {
    console.warn("SMTP is not configured. Copy .env.example to .env and fill in your credentials.");
  }
});
