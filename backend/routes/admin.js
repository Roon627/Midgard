const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const db = require("../db");

// Secret key for JWT (store this in .env in production)
const JWT_SECRET = 'your-secret-key';

// Admin login route (skipping password check for now)
router.post("/login", (req, res) => {
  const { username } = req.body; // Only get username, no password validation

  db.get("SELECT * FROM admins WHERE username = ?", [username], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Generate JWT token without validating password
    const token = jwt.sign({ username: row.username, id: row.id }, JWT_SECRET, {
      expiresIn: '1h', // Token expires in 1 hour
    });

    // Send the token to the frontend
    res.json({ message: "Login successful", token });
  });
});

// Verify JWT token (for protected routes)
router.get("/status", (req, res) => {
  const token = req.headers['authorization']?.split(" ")[1]; // Get token from headers
  if (!token) {
    return res.status(401).json({ admin: false });
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ admin: false });
    }
    res.json({ admin: true, user: decoded });
  });
});

module.exports = router;
