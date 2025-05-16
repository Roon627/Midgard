const express = require("express");
const router = express.Router();
const db = require("../db");
const jwt = require("jsonwebtoken");
const verifyAdminToken = require("../middleware/verifyAdminToken");

// GET all jobs (admin if ?all=true with valid token)
router.get("/", (req, res) => {
  const includeAll = req.query.all === "true";

  let query = "SELECT * FROM jobs WHERE visible = 1";

  if (includeAll) {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) return res.status(401).json({ error: "Unauthorized: Token missing" });

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      if (decoded.role !== "admin") {
        return res.status(403).json({ error: "Forbidden: Admin access required" });
      }
      query = "SELECT * FROM jobs";
    } catch (err) {
      return res.status(403).json({ error: "Invalid token" });
    }
  }

  db.all(query, (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// GET job by ID
router.get("/:id", (req, res) => {
  const jobId = parseInt(req.params.id);
  if (isNaN(jobId)) return res.status(400).json({ error: "Invalid job ID" });

  db.get("SELECT * FROM jobs WHERE id = ?", [jobId], (err, row) => {
    if (err) return res.status(500).json({ error: "Internal server error" });
    if (!row) return res.status(404).json({ error: "Job not found" });
    res.json(row);
  });
});

// POST add job (admin only)
router.post("/", verifyAdminToken, (req, res) => {
  const {
    title,
    description,
    questions = [],
    expiresAt,
    responsibilities = "",
    requirements = "",
    qualifications = "",
    experience = "",
    salaryRange = "",
    location = ""
  } = req.body;

  if (!title || !description || !expiresAt) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const query = `
    INSERT INTO jobs
    (title, description, questions, expiresAt, responsibilities, requirements, qualifications, experience, salaryRange, location, visible)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 1)
  `;
  const params = [
    title,
    description,
    JSON.stringify(questions),
    expiresAt,
    responsibilities,
    requirements,
    qualifications,
    experience,
    salaryRange,
    location
  ];

  db.run(query, params, function (err) {
    if (err) {
      console.error("Insert error:", err.message);
      return res.status(500).json({ error: "Database error" });
    }

    const createdAt = new Date().toISOString();
    db.run(
      `INSERT INTO notifications (type, message, createdAt) VALUES (?, ?, ?)`,
      ["job", `New job \"${title}\" has been posted.`, createdAt]
    );

    res.status(201).json({
      id: this.lastID,
      title,
      description,
      questions,
      expiresAt,
      responsibilities,
      requirements,
      qualifications,
      experience,
      salaryRange,
      location,
      visible: 1
    });
  });
});

// PUT update job (admin only)
router.put("/:id", verifyAdminToken, (req, res) => {
  const { id } = req.params;
  const {
    title,
    description,
    questions = [],
    expiresAt,
    responsibilities = "",
    requirements = "",
    qualifications = "",
    experience = "",
    salaryRange = "",
    location = ""
  } = req.body;

  const query = `
    UPDATE jobs SET
      title = ?,
      description = ?,
      questions = ?,
      expiresAt = ?,
      responsibilities = ?,
      requirements = ?,
      qualifications = ?,
      experience = ?,
      salaryRange = ?,
      location = ?
    WHERE id = ?
  `;
  const params = [
    title,
    description,
    JSON.stringify(questions),
    expiresAt,
    responsibilities,
    requirements,
    qualifications,
    experience,
    salaryRange,
    location,
    id
  ];

  db.run(query, params, function (err) {
    if (err) return res.status(500).json({ error: err.message });

    const createdAt = new Date().toISOString();
    db.run(
      `INSERT INTO notifications (type, message, createdAt) VALUES (?, ?, ?)`,
      ["job", `Job \"${title}\" has been updated.`, createdAt]
    );

    res.json({ message: "Job updated successfully" });
  });
});

// PATCH toggle visibility (admin only)
router.patch("/:id/visibility", verifyAdminToken, (req, res) => {
  const { id } = req.params;
  const { visible } = req.body;

  db.run("UPDATE jobs SET visible = ? WHERE id = ?", [visible ? 1 : 0, id], function (err) {
    if (err) return res.status(500).json({ error: err.message });

    const msg = visible ? "made visible" : "hidden from careers";
    const createdAt = new Date().toISOString();

    db.get("SELECT title FROM jobs WHERE id = ?", [id], (err, row) => {
      const jobTitle = row ? row.title : "Job";
      db.run(
        `INSERT INTO notifications (type, message, createdAt) VALUES (?, ?, ?)`,
        ["job", `Job \"${jobTitle}\" was ${msg}.`, createdAt]
      );
    });

    res.json({ message: `Job visibility updated: ${visible ? "Visible" : "Hidden"}` });
  });
});

// DELETE job (admin only)
router.delete("/:id", verifyAdminToken, (req, res) => {
  const { id } = req.params;

  db.get("SELECT title FROM jobs WHERE id = ?", [id], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });

    const jobTitle = row ? row.title : "Unknown Job";

    db.run("DELETE FROM jobs WHERE id = ?", [id], function (err) {
      if (err) return res.status(500).json({ error: err.message });

      const createdAt = new Date().toISOString();
      db.run(
        `INSERT INTO notifications (type, message, createdAt) VALUES (?, ?, ?)`,
        ["job", `Job \"${jobTitle}\" has been deleted.`, createdAt]
      );

      res.status(200).json({ message: "Job deleted successfully" });
    });
  });
});

module.exports = router;