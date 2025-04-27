require("dotenv").config();
const express = require("express");
const session = require("express-session");  // Import express-session here
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const app = express();
const db = require("./db");
const adminRouter = require("./routes/admin");
const jobsRouter = require("./routes/jobs");
const submissionsRouter = require("./routes/submissions");

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session management
app.use(session({
  secret: process.env.SESSION_SECRET || 'your-secret-key',  // Use an environment variable for secret
  resave: false,
  saveUninitialized: true
}));

// Routes
app.use("/api/admin", adminRouter);  // Admin routes
app.use("/api/jobs", jobsRouter);    // Job routes
app.use("/api/submissions", submissionsRouter);  // Submissions routes

// Serve uploaded files (CVs, certificates, etc.)
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// File upload configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

// Upload files (CV, certificates, etc.)
app.post("/api/upload", upload.any(), (req, res) => {
  const fileData = req.files.map((f) => ({
    original: f.originalname,
    stored: f.filename,
  }));
  res.json({ uploaded: fileData });
});

// Admin status route (check if logged in)
app.get("/api/admin/status", (req, res) => {
  if (req.session.admin) {
    res.json({ admin: true });
  } else {
    res.json({ admin: false });
  }
});

// Admin login route (for testing, remove for production)
app.post("/api/admin/login", (req, res) => {
  const { username, password } = req.body;
  // Dummy validation (replace with your own logic)
  if (username === "admin" && password === "admin") {
    req.session.admin = true; // Set session for the admin
    return res.json({ message: "Login successful" });
  } else {
    return res.status(401).json({ error: "Invalid credentials" });
  }
});

// Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
