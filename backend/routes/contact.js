import express from "express";
import nodemailer from "nodemailer";

const router = express.Router();

// POST /api/contact
router.post("/contact", async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: "All fields are required." });
  }

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.gmail.com",
      port: parseInt(process.env.SMTP_PORT) || 587,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Midgard Contact" <${process.env.SMTP_USER}>`, // use the Gmail app password user
      to: process.env.CONTACT_RECEIVER || process.env.SMTP_USER,
      subject: "📬 New Contact Form Submission",
      html: `
        <h2>New Contact Request</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong><br/>${message.replace(/\n/g, "<br>")}</p>
        <hr />
        <p style="font-size: 12px; color: #999;">This message was sent from the Midgard contact form.</p>
      `,
    });

    console.log("✅ Contact form email sent successfully.");
    res.json({ message: "Message sent successfully!" });
  } catch (err) {
    console.error("❌ Email send error:", err.message);
    res.status(500).json({ error: "Failed to send email. Try again later." });
  }
});

export default router;
