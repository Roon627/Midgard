// routes/submissions.js
const express = require("express");
const router = express.Router();
const db = require("../db");

// Get all submissions
router.get("/", (req, res) => {
  db.all("SELECT * FROM submissions", [], (err, rows) => {
    if (err) {
      console.error("Database error:", err); // Log the actual database error
      return res.status(500).json({ error: err.message });
    }
    res.json(
      rows.map((r) => ({
        ...r,
        answers: JSON.parse(r.answers),
        documents: JSON.parse(r.documents),
      }))
    );
  });
});

// Add a new submission
router.post("/", (req, res) => {
  const {
    jobId,
    firstName,
    lastName,
    nationality,
    currentlyWorking,
    email,
    phone,
    answers,
    documents
  } = req.body;

  // Validate input data
  if (!jobId || !firstName || !lastName || !nationality || !currentlyWorking || !email || !answers || !documents) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  // Log the data being received to debug
  console.log("Received submission data:", { jobId, firstName, lastName, nationality, currentlyWorking, email, phone, answers, documents });

  // Insert the new submission into the database
  db.run(
    "INSERT INTO submissions (jobId, firstName, lastName, nationality, currentlyWorking, email, phone, answers, documents) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
    [jobId, firstName, lastName, nationality, currentlyWorking, email, phone, JSON.stringify(answers), JSON.stringify(documents)],
    function (err) {
      if (err) {
        console.error("Database error during insert:", err);
        return res.status(500).json({ error: err.message });
      }
      console.log("New submission inserted with ID:", this.lastID);
      res.json({ id: this.lastID });
    }
  );
});

module.exports = router;