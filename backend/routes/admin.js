const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const db = require("../db");
const bcrypt = require("bcrypt");

const JWT_SECRET = process.env.JWT_SECRET || "your-fallback-secret";

// ===================== Public Routes =====================

// Admin login route
router.post("/login", (req, res) => {
  const { username, password } = req.body;
  console.log('Login attempt:', { username }); // Added logging
  if (!username || !password)
    return res.status(400).json({ message: "Username and password required." });

  db.get("SELECT * FROM admins WHERE username = ?", [username], (err, admin) => {
    if (err) {
      console.error('Database error:', err.message);
      return res.status(500).json({ error: err.message });
    }
    if (!admin) {
      console.log('No admin found for username:', username);
      return res.status(401).json({ message: "Invalid credentials." });
    }

    bcrypt.compare(password, admin.password, (err, match) => {
      if (err) {
        console.error('Bcrypt error:', err.message);
        return res.status(500).json({ error: err.message });
      }
      if (!match) {
        console.log('Password mismatch for username:', username);
        return res.status(401).json({ message: "Invalid credentials." });
      }

      const token = jwt.sign(
        { username: admin.username, id: admin.id, role: "admin" }, // Added role: "admin"
        JWT_SECRET,
        { expiresIn: "1h" }
      );

      console.log('Login successful for username:', username);
      return res.json({ message: "Login successful", token });
    });
  });
});

// Route to create a new admin
router.post("/add", async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password)
    return res.status(400).json({ message: "Username and password required." });

  const hashedPassword = await bcrypt.hash(password, 10);

  db.run(
    "INSERT INTO admins (username, password) VALUES (?, ?)",
    [username, hashedPassword],
    function (err) {
      if (err) {
        if (err.message.includes("UNIQUE")) {
          return res.status(409).json({ message: "Username already exists." });
        }
        return res.status(500).json({ error: err.message });
      }

      // System notification
      db.run(
        `INSERT INTO notifications (type, title, message, createdAt) VALUES (?, ?, ?, datetime('now'))`,
        ["system", "New Admin Added", `Admin account created: ${username}`],
        (notifErr) => {
          if (notifErr) console.error("Notification insert error:", notifErr);
        }
      );

      res.status(201).json({ message: "Admin created", id: this.lastID });
    }
  );
});

// ===================== JWT Middleware =====================

router.use((req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "No token provided" });

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ message: "Invalid token" });

    req.admin = decoded;
    next();
  });
});

// ===================== Protected Routes =====================

// Reset password route
router.post("/reset-password", async (req, res) => {
  const { newPassword } = req.body;
  const decoded = req.admin;

  if (!newPassword) {
    return res.status(400).json({ message: "New password required." });
  }

  try {
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    db.run(
      "UPDATE admins SET password = ? WHERE id = ?",
      [hashedPassword, decoded.id],
      function (err) {
        if (err) return res.status(500).json({ error: err.message });
        if (this.changes === 0) {
          return res.status(404).json({ message: "Admin not found." });
        }

        // System notification
        db.run(
          `INSERT INTO notifications (type, title, message, createdAt) VALUES (?, ?, ?, datetime('now'))`,
          ["system", "Password Reset", `Admin ${decoded.username} reset their password.`],
          (notifErr) => {
            if (notifErr) console.error("Notification insert error:", notifErr);
          }
        );

        res.json({ message: "Password updated successfully." });
      }
    );
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating password." });
  }
});

// Route to check admin login status
router.get("/status", (req, res) => {
  return res.json({ user: req.admin });
});

// Example protected route
router.get("/dashboard", (req, res) => {
  res.json({ message: "Protected admin dashboard data", user: req.admin });
});

module.exports = router;