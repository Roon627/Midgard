const express = require("express");
const multer = require("multer");
const path = require("path");
const db = require("../db");
const nodemailer = require("nodemailer");

const router = express.Router();

// Setup multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Ensure uploads/ folder exists
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage: storage });

// Handle form submission with file uploads
router.post("/", upload.fields([
  { name: "resume", maxCount: 1 },
  { name: "certificates", maxCount: 1 },
  { name: "id_card", maxCount: 1 },
  { name: "police_report", maxCount: 1 },
  { name: "additional_documents", maxCount: 1 }
]), (req, res) => {
  try {
    const { jobId, name, nationalId, answers, email, phoneNumber } = req.body;
    const files = req.files;

    if (!jobId || !name || !answers) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    db.run(`
      INSERT INTO submissions
      (jobId, name, email, phoneNumber, nationalId, answers, resumePath, certificatesPath, idCardPath, policeReportPath, additionalDocumentsPath)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        jobId,
        name,
        email || '',
        phoneNumber || '',
        nationalId || '',
        answers,
        files?.resume?.[0]?.path || '',
        files?.certificates?.[0]?.path || '',
        files?.id_card?.[0]?.path || '',
        files?.police_report?.[0]?.path || '',
        files?.additional_documents?.[0]?.path || ''
      ],
      function (err) {
        if (err) {
          console.error("Database error during insert:", err);
          return res.status(500).json({ error: err.message });
        }
        console.log("New submission inserted with ID:", this.lastID);

        // Fetch email settings
        db.get("SELECT * FROM email_settings WHERE id = 1", [], (err, settings) => {
          if (err || !settings) {
            console.error("Failed to fetch email settings:", err);
            return;
          }

          // Fetch job title based on jobId
          db.get("SELECT title FROM jobs WHERE id = ?", [jobId], async (jobErr, jobRow) => {
            if (jobErr || !jobRow) {
              console.error("Failed to fetch job title:", jobErr);
              return;
            }

            try {
              const transporter = nodemailer.createTransport({
                host: settings.smtp_host,
                port: settings.smtp_port,
                secure: settings.smtp_port === 465, // true for 465, false otherwise
                auth: {
                  user: settings.smtp_username,
                  pass: settings.smtp_password,
                },
              });

              const lastName = name.split(" ").slice(-1)[0]; // Get last name safely
              let emailBody = settings.email_body
                .replace("[LAST_NAME]", lastName)
                .replace("[JOB_TITLE]", jobRow.title);

              let emailSubject = settings.email_subject.replace("[JOB_TITLE]", jobRow.title);

              await transporter.sendMail({
                from: `"${settings.sender_name}" <${settings.sender_email}>`,
                to: email,
                subject: emailSubject,
                text: emailBody,
              });

              console.log("Confirmation email sent to:", email);
            } catch (error) {
              console.error("Error sending confirmation email:", error);
            }
          });
        });

        res.json({ id: this.lastID });
      }
    );
  } catch (error) {
    console.error("Server error during submission:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// Get all submissions
router.get("/", (req, res) => {
  db.all("SELECT * FROM submissions", [], (err, rows) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ error: err.message });
    }
    res.json(
      rows.map((row) => ({
        ...row,
        answers: JSON.parse(row.answers || '[]'), // Safely parse answers JSON
      }))
    );
  });
});

module.exports = router;
