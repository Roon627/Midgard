const express = require("express");
const nodemailer = require("nodemailer");
const db = require("../db");

const router = express.Router();

// Get current email settings
router.get("/", (req, res) => {
  db.get("SELECT * FROM email_settings WHERE id = 1", [], (err, row) => {
    if (err) {
      console.error("Database error getting email settings:", err);
      return res.status(500).json({ error: err.message });
    }
    res.json(row);
  });
});

// Update email settings
router.post("/", (req, res) => {
  const { smtp_host, smtp_port, smtp_username, smtp_password, sender_email, sender_name, email_subject, email_body } = req.body;

  db.run(`
    UPDATE email_settings SET
    smtp_host = ?,
    smtp_port = ?,
    smtp_username = ?,
    smtp_password = ?,
    sender_email = ?,
    sender_name = ?,
    email_subject = ?,
    email_body = ?
    WHERE id = 1
  `, [
    smtp_host, smtp_port, smtp_username, smtp_password, sender_email, sender_name, email_subject, email_body
  ], function (err) {
    if (err) {
      console.error("Database error updating email settings:", err);
      return res.status(500).json({ error: err.message });
    }
    res.json({ success: true });
  });
});

// ✅ NEW: Send a test email
router.post("/test", (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: "Test email address is required" });
  }

  db.get("SELECT * FROM email_settings WHERE id = 1", async (err, settings) => {
    if (err || !settings) {
      console.error("Error fetching settings for test email:", err);
      return res.status(500).json({ error: "Failed to fetch email settings" });
    }

    try {
      const transporter = nodemailer.createTransport({
        host: settings.smtp_host,
        port: settings.smtp_port,
        secure: settings.smtp_port == 465, // true for 465, false for others
        auth: {
          user: settings.smtp_username,
          pass: settings.smtp_password,
        },
      });

      await transporter.sendMail({
        from: `"${settings.sender_name}" <${settings.sender_email}>`,
        to: email,
        subject: "Test Email from Midgard Admin Panel",
        text: "This is a test email sent from your Midgard Admin Panel setup.\n\nIt confirms your SMTP settings are working properly!",
      });

      console.log(`✅ Test email successfully sent to: ${email}`);
      res.json({ success: true });
    } catch (error) {
      console.error("❌ Error sending test email:", error);
      res.status(500).json({ error: "Failed to send test email." });
    }
  });
});

module.exports = router;
