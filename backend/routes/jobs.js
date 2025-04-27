const express = require("express");
const router = express.Router();
const db = require("../db");

// Get all jobs
router.get("/", (req, res) => {
  db.all("SELECT * FROM jobs", (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

// Add a new job
router.post("/", (req, res) => {
  const { title, description, questions, expiresAt } = req.body;

  const query = "INSERT INTO jobs (title, description, questions, expiresAt) VALUES (?, ?, ?, ?)";
  const params = [title, description, JSON.stringify(questions), expiresAt];

  db.run(query, params, function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({
      id: this.lastID,
      title,
      description,
      questions,
      expiresAt,
    });
  });
});

// Update an existing job
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { title, description, questions, expiresAt } = req.body;

  const query = "UPDATE jobs SET title = ?, description = ?, questions = ?, expiresAt = ? WHERE id = ?";
  const params = [title, description, JSON.stringify(questions), expiresAt, id];

  db.run(query, params, function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Job updated successfully" });
  });
});

// Delete a job
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const query = "DELETE FROM jobs WHERE id = ?";

  db.run(query, [id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json({ message: "Job deleted successfully" });
  });
});

module.exports = router;
