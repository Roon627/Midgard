require("dotenv").config();
const express = require("express");
const session = require("express-session");
const cors = require("cors");
const multer = require("multer");
const nodemailer = require("nodemailer");
const path = require("path");
const fs = require("fs");
const jwt = require("jsonwebtoken");
const mime = require("mime-types");

const app = express();
const db = require("./db");

// ====== Routers ======
const adminRouter = require("./routes/admin");
const jobsRouter = require("./routes/jobs");
const submissionsRouter = require("./routes/submissions");
const emailSettingsRouter = require("./routes/emailSettings");
const notificationsRouter = require("./routes/notifications");

// ====== CORS Setup ======
const allowedOrigins = [
  process.env.FRONTEND_URL,
  process.env.FRONTEND_LOCAL || "http://localhost:5173",
  "https://observed-relief-metals-diagram.trycloudflare.com" // ✅ Explicitly allow this frontend
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.warn("❌ CORS blocked for origin:", origin);
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
}));

// ====== Middleware ======
app.use(express.json({ limit: "25mb" }));
app.use(express.urlencoded({ extended: true, limit: "25mb" }));

app.use(session({
  secret: process.env.SESSION_SECRET || "your-session-secret",
  resave: false,
  saveUninitialized: true,
}));

// ====== Ensure Upload Folder ======
const uploadsDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

// ====== Admin Authentication Middleware ======
function isAdminAuthenticated(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      if (decoded?.role === "admin") return next();
    } catch (err) {
      console.error("JWT auth error:", err.message);
    }
  }
  return res.status(401).send("Unauthorized upload access.");
}

// ====== Serve /uploads with JWT auth ======
app.get('/uploads/:folder/:filename', isAdminAuthenticated, (req, res) => {
  const { folder, filename } = req.params;
  const filePath = path.join(uploadsDir, folder, filename);

  if (!fs.existsSync(filePath)) {
    return res.status(404).send("File not found.");
  }

  const mimeType = mime.lookup(filePath) || "application/octet-stream";

  if (req.headers["x-no-download"] === "true") {
    res.setHeader("Content-Type", mimeType);
    res.sendFile(filePath);
  } else {
    res.setHeader("Content-Disposition", `attachment; filename="${filename}"`);
    res.setHeader("Content-Type", mimeType);
    fs.createReadStream(filePath).pipe(res);
  }
});

// ====== API Routes ======
app.use("/api/admin", adminRouter);
app.use("/api/jobs", jobsRouter);
app.use("/api/submissions", submissionsRouter);
app.use("/api/email-settings", emailSettingsRouter);
app.use("/api/notifications", notificationsRouter);

// ====== File Upload Endpoint ======
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const { name, nationalId, passport } = req.body;
    const identifier = nationalId || passport || "unknown";
    const safeName = name ? name.replace(/[^a-z0-9]/gi, "_").toLowerCase() : "anonymous";
    const dir = path.join(uploadsDir, `${safeName}_${identifier}`);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    cb(null, dir);
  },
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

// ====== Contact Form Email Endpoint ======
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

// ====== Test Route for File Serving ======
app.get("/test-download", (req, res) => {
  const testFile = path.join(uploadsDir, "ahmed__harun_A277661", "1746832762996-Mandhu.pdf");
  if (!fs.existsSync(testFile)) {
    return res.status(404).send("Test PDF not found.");
  }
  res.download(testFile);
});

// ====== React Frontend Fallback ======
const frontendPath = path.join(__dirname, "frontend", "dist");
if (fs.existsSync(frontendPath)) {
  app.use(express.static(frontendPath));
  app.get("*", (req, res) => {
    res.sendFile(path.join(frontendPath, "index.html"));
  });
}

// ====== Start Server ======
const PORT = process.env.PORT || 5000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`✅ Backend running on http://localhost:${PORT}`);
});
