import { isConfigured, parseContact, sendContactEmail } from "../server/mail.js";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  if (!isConfigured()) {
    return res.status(503).json({ error: "Contact form is not configured yet." });
  }

  const parsed = parseContact(req.body);
  if (parsed.error) {
    return res.status(400).json({ error: parsed.error });
  }

  try {
    await sendContactEmail(parsed.data);
    return res.status(200).json({ ok: true });
  } catch (error) {
    console.error("Failed to send contact email:", error.message);

    if (error.code === "EAUTH") {
      return res.status(500).json({
        error: "Gmail rejected the login. Check SMTP_USER and the app password.",
      });
    }

    return res.status(500).json({ error: "The message could not be sent. Please try again." });
  }
}
