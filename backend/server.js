require("dotenv").config();
const express = require("express");
const session = require("express-session");
const cors = require("cors");
const multer = require("multer");
const nodemailer = require("nodemailer");
const path = require("path");
const fs = require("fs");

const app = express();
const db = require("./db");

// Routers
const adminRouter = require("./routes/admin");
const jobsRouter = require("./routes/jobs");
const submissionsRouter = require("./routes/submissions");
const emailSettingsRouter = require("./routes/emailSettings");
const notificationsRouter = require("./routes/notifications");

// ====== CORS Setup ======
const allowedOrigin = process.env.FRONTEND_URL;

app.use(cors({
  origin: allowedOrigin,
  credentials: true,
}));


// ====== Middleware ======
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
  secret: process.env.SESSION_SECRET || "your-session-secret",
  resave: false,
  saveUninitialized: true,
}));

// ====== Routes ======
app.use("/api/admin", adminRouter);
app.use("/api/jobs", jobsRouter);
app.use("/api/submissions", submissionsRouter);
app.use("/api/email-settings", emailSettingsRouter);
app.use("/api/notifications", notificationsRouter);

// ====== Ensure Upload Folder ======
if (!fs.existsSync("uploads")) {
  fs.mkdirSync("uploads");
}

// ====== Static uploads ======
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ====== File Upload ======
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

app.post("/api/upload", upload.any(), (req, res) => {
  const fileData = req.files.map((f) => ({
    original: f.originalname,
    stored: f.filename,
  }));
  res.json({ uploaded: fileData });
});

// ====== Contact Form ======
app.post("/api/contact", async (req, res) => {
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
      from: `"Contact Form" <${process.env.SMTP_USER}>`,
      to: process.env.CONTACT_RECEIVER || process.env.SMTP_USER,
      subject: "New Contact Form Submission",
      html: `
        <h3>New Message</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong><br/>${message.replace(/\n/g, "<br>")}</p>
      `,
    });

    res.json({ success: true, message: "Message sent successfully." });
  } catch (err) {
    console.error("Failed to send contact form email:", err);
    res.status(500).json({ error: "Failed to send message." });
  }
});

// ====== Health Check ======
app.get("/api/ping", (req, res) => {
  res.send("pong");
});

// ====== Start Server ======
const PORT = process.env.PORT || 5000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`✅ Backend running on http://localhost:${PORT}`);
});

