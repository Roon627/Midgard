const express = require("express");
const router = express.Router();
const db = require("../db");
const nodemailer = require("nodemailer");

// GET all notifications
router.get("/", (req, res) => {
  db.all("SELECT * FROM notifications ORDER BY createdAt DESC", [], (err, rows) => {
    if (err) {
      console.error("Error fetching notifications:", err);
      return res.status(500).json({ error: "Database error" });
    }
    res.json(rows);
  });
});

// POST a new notification (and send admin email)
router.post("/", async (req, res) => {
  const { type, message } = req.body;
  const createdAt = new Date().toISOString();

  db.run(
    `INSERT INTO notifications (type, message, createdAt) VALUES (?, ?, ?)`,
    [type, message, createdAt],
    async function (err) {
      if (err) {
        console.error("Failed to insert notification:", err);
        return res.status(500).json({ error: "Failed to save notification" });
      }

      // Fetch email settings including admin_notification_email
      db.get("SELECT * FROM email_settings WHERE id = 1", [], async (err, settings) => {
        if (err || !settings) {
          console.error("Email settings not found:", err);
          return res.json({ success: true, id: this.lastID });
        }

        try {
          const transporter = nodemailer.createTransport({
            host: settings.smtp_host,
            port: settings.smtp_port,
            secure: settings.smtp_port === 465,
            auth: {
              user: settings.smtp_username,
              pass: settings.smtp_password,
            },
          });

          await transporter.sendMail({
            from: `"${settings.sender_name}" <${settings.sender_email}>`,
            to: settings.admin_notification_email?.trim() || "runharun627@gmail.com",
            subject: `New Admin Notification (${type})`,
            text: message,
          });

          console.log("Notification email sent to:", settings.admin_notification_email);
        } catch (emailErr) {
          console.error("Error sending notification email:", emailErr);
        }

        res.json({ success: true, id: this.lastID });
      });
    }
  );
});

module.exports = router;
