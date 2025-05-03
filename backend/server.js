require("dotenv").config();
const express = require("express");
const session = require("express-session");
const cors = require("cors");
const multer = require("multer");
const nodemailer = require("nodemailer");
const path = require("path");

const app = express();
const db = require("./db");

const adminRouter = require("./routes/admin");
const jobsRouter = require("./routes/jobs");
const submissionsRouter = require("./routes/submissions");
const emailSettingsRouter = require("./routes/emailSettings");
const notificationsRouter = require("./routes/notifications"); // ✅ NEW

const allowedOrigin = "https://certified-collectibles-confident-translated.trycloudflare.com";
app.use(cors({
  origin: allowedOrigin,
  credentials: true
}));

// localhost
//app.use(cors({
//   origin: "http://localhost:5173",
//   credentials: true
//}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session management
app.use(session({
  secret: process.env.SESSION_SECRET || 'your-secret-key',
  resave: false,
  saveUninitialized: true
}));

// Routes
app.use("/api/admin", adminRouter);
app.use("/api/jobs", jobsRouter);
app.use("/api/submissions", submissionsRouter);
app.use("/api/email-settings", emailSettingsRouter);
app.use("/api/notifications", notificationsRouter); // ✅ NEW

// Serve uploaded files
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// File upload config
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

// Upload endpoint
app.post("/api/upload", upload.any(), (req, res) => {
  const fileData = req.files.map((f) => ({
    original: f.originalname,
    stored: f.filename,
  }));
  res.json({ uploaded: fileData });
});

// Admin session check
app.get("/api/admin/status", (req, res) => {
  res.json({ admin: !!req.session.admin });
});

// Admin login
app.post("/api/admin/login", (req, res) => {
  const { username, password } = req.body;
  if (username === "admin" && password === "admin") {
    req.session.admin = true;
    return res.json({ message: "Login successful" });
  } else {
    return res.status(401).json({ error: "Invalid credentials" });
  }
});

// 📧 Contact form handler
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

// Health check route
app.get("/api/ping", (req, res) => {
  res.send("pong");
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ Backend running on port ${PORT}`);
});
