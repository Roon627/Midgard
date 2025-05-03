const express = require("express");
const multer = require("multer");
const path = require("path");
const db = require("../db");
const nodemailer = require("nodemailer");

const router = express.Router();

// Setup multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  },
});
const upload = multer({ storage: storage });

router.post("/", upload.fields([
  { name: "resume", maxCount: 1 },
  { name: "certificates", maxCount: 1 },
  { name: "id_card", maxCount: 1 },
  { name: "police_report", maxCount: 1 },
  { name: "reference_documents", maxCount: 1 }
]), async (req, res) => {
  try {
    const { jobId, name, nationalId, passport, questionAnswers, email, phoneNumber } = req.body;
    const files = req.files;

    if (!jobId || !name || !questionAnswers) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Parse and validate answers
    let parsedQuestionAnswers;
    try {
      parsedQuestionAnswers = JSON.parse(questionAnswers);
      if (!Array.isArray(parsedQuestionAnswers) || !parsedQuestionAnswers.every(item =>
        typeof item === 'object' &&
        'question' in item &&
        'answer' in item &&
        'score' in item
      )) {
        return res.status(400).json({ error: "Invalid questionAnswers format" });
      }
    } catch (error) {
      return res.status(400).json({ error: "Failed to parse questionAnswers" });
    }

    const identifier = nationalId || passport || '';
    const idField = nationalId ? 'nationalId' : 'passport';

    // Check for duplicate submission
    const existing = await new Promise((resolve, reject) => {
      db.get(
        `SELECT id FROM submissions WHERE jobId = ? AND ${idField} = ?`,
        [jobId, identifier],
        (err, row) => err ? reject(err) : resolve(row)
      );
    });

    if (existing) {
      return res.status(400).json({ error: "You have already applied for this job using this ID or passport." });
    }

    const createdAt = new Date().toISOString();

    db.run(`
      INSERT INTO submissions
      (jobId, name, email, phoneNumber, nationalId, passport, answers, resumePath, certificatesPath, idCardPath, policeReportPath, additionalDocumentsPath, createdAt)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        jobId,
        name,
        email || '',
        phoneNumber || '',
        nationalId || '',
        passport || '',
        JSON.stringify(parsedQuestionAnswers),
        files?.resume?.[0]?.path || '',
        files?.certificates?.[0]?.path || '',
        files?.id_card?.[0]?.path || '',
        files?.police_report?.[0]?.path || '',
        files?.reference_documents?.[0]?.path || '',
        createdAt
      ],
      function (err) {
        if (err) {
          console.error("Database error during insert:", err);
          return res.status(500).json({ error: err.message });
        }

        const submissionId = this.lastID;
        console.log("New submission inserted with ID:", submissionId);

        // Add to notification table
        const noteMessage = `New application received from ${name}.`;
        db.run(
          `INSERT INTO notifications (type, message, createdAt) VALUES (?, ?, ?)`,
          ["application", noteMessage, createdAt],
          (err) => {
            if (err) console.error("Failed to log notification:", err);
          }
        );

        // Send email to applicant
        db.get("SELECT * FROM email_settings WHERE id = 1", [], (err, settings) => {
          if (err || !settings) {
            console.error("Failed to fetch email settings:", err);
            return;
          }

          db.get("SELECT title FROM jobs WHERE id = ?", [jobId], async (jobErr, jobRow) => {
            if (jobErr || !jobRow) {
              console.error("Failed to fetch job title:", jobErr);
              return;
            }

            try {
              const transporter = nodemailer.createTransport({
                host: settings.smtp_host,
                port: settings.smtp_port,
                secure: settings.smtp_port === 465,
                auth: {
                  user: settings.smtp_username,
                  pass: settings.smtp_password,
                },
              });

              const lastName = name.split(" ").slice(-1)[0];
              const emailBody = settings.email_body
                .replace("[LAST_NAME]", lastName)
                .replace("[JOB_TITLE]", jobRow.title);
              const emailSubject = settings.email_subject.replace("[JOB_TITLE]", jobRow.title);

              // Send to applicant
              await transporter.sendMail({
                from: `"${settings.sender_name}" <${settings.sender_email}>`,
                to: email,
                subject: emailSubject,
                text: emailBody,
              });

              // Send to admin
              await transporter.sendMail({
                from: `"${settings.sender_name}" <${settings.sender_email}>`,
                to: "hr@midgard.com", // or make this configurable
                subject: "New Job Application Received",
                text: `A new application has been submitted by ${name} for ${jobRow.title}.`,
              });

              console.log("Emails sent to user and admin.");
            } catch (error) {
              console.error("Error sending email:", error);
            }
          });
        });

        res.json({ id: submissionId });
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
        answers: JSON.parse(row.answers || '[]'),
      }))
    );
  });
});

// Check for existing application
router.post("/check-application", (req, res) => {
  const { jobId, identifierType, identifierValue } = req.body;

  if (!jobId || !identifierType || !identifierValue) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const column = identifierType === "passport" ? "passport" : "nationalId";

  db.get(
    `SELECT id FROM submissions WHERE jobId = ? AND ${column} = ?`,
    [jobId, identifierValue],
    (err, row) => {
      if (err) {
        console.error("Error checking application:", err);
        return res.status(500).json({ error: "Internal server error" });
      }
      return res.json({ exists: !!row });
    }
  );
});

module.exports = router;
