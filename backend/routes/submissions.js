const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const db = require("../db");
const nodemailer = require("nodemailer");

const router = express.Router();

// Multer storage setup
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const { name, nationalId, passport } = req.body;
    const identifier = nationalId || passport || "unknown";
    const safeName = name ? name.replace(/[^a-z0-9]/gi, "_").toLowerCase() : "anonymous";
    const dir = path.join("uploads", `${safeName}_${identifier}`);

    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    cb(null, dir);
  },
  filename: function (req, file, cb) {
    const sanitizedFilename = path.basename(file.originalname).replace(/[^a-zA-Z0-9._-]/g, '_');
    cb(null, Date.now() + '-' + sanitizedFilename);
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
    const {
      jobId,
      name,
      nationalId,
      passport,
      questionAnswers,
      email,
      phoneNumber,
      personalityScore,
      scoreCategory,
      traitScores
    } = req.body;
    const files = req.files;

    if (!jobId || !name || !questionAnswers) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    let parsedQuestionAnswers;
    try {
      parsedQuestionAnswers = JSON.parse(questionAnswers);
      if (!Array.isArray(parsedQuestionAnswers)) {
        return res.status(400).json({ error: "Invalid questionAnswers format" });
      }
    } catch (err) {
      return res.status(400).json({ error: "Failed to parse questionAnswers" });
    }

    let parsedTraitScores = {};
    try {
      parsedTraitScores = traitScores ? JSON.parse(traitScores) : {};
    } catch (err) {
      return res.status(400).json({ error: "Failed to parse traitScores" });
    }

    const identifier = nationalId || passport || '';
    const idField = nationalId ? 'nationalId' : 'passport';

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
      (jobId, name, email, phoneNumber, nationalId, passport, answers,
       resumePath, certificatesPath, idCardPath, policeReportPath, additionalDocumentsPath,
       personalityScore, scoreCategory, traitScores, createdAt)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
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
        personalityScore || null,
        scoreCategory || '',
        JSON.stringify(parsedTraitScores),
        createdAt
      ],
      function (err) {
        if (err) {
          console.error("Database error during insert:", err);
          return res.status(500).json({ error: err.message });
        }

        const submissionId = this.lastID;
        console.log("New submission inserted with ID:", submissionId);

        const noteMessage = `New application received from ${name}.`;
        db.run(
          `INSERT INTO notifications (type, message, createdAt) VALUES (?, ?, ?)`,
          ["application", noteMessage, createdAt],
          (err) => {
            if (err) console.error("Failed to log notification:", err);
          }
        );

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

              await transporter.sendMail({
                from: `"${settings.sender_name}" <${settings.sender_email}>`,
                to: email,
                subject: emailSubject,
                text: emailBody,
              });

              await transporter.sendMail({
                from: `"${settings.sender_name}" <${settings.sender_email}>`,
                to: "runharun627@gmail.com",
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
        traitScores: row.traitScores ? JSON.parse(row.traitScores) : undefined
      }))
    );
  });
});

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

// Return document file list for a submission
router.get("/:id/documents", (req, res) => {
  const submissionId = parseInt(req.params.id);
  if (isNaN(submissionId)) {
    return res.status(400).json({ error: "Invalid submission ID" });
  }

  db.get("SELECT name, nationalId, passport FROM submissions WHERE id = ?", [submissionId], (err, row) => {
    if (err || !row) {
      console.error("Submission not found:", err);
      return res.status(404).json({ error: "Submission not found" });
    }

    const identifier = row.nationalId || row.passport;
    const safeName = row.name ? row.name.replace(/[^a-z0-9]/gi, "_").toLowerCase() : "anonymous";
    const folderPath = path.join("uploads", `${safeName}_${identifier}`);
    const baseUrl = process.env.BACKEND_PUBLIC_URL || `http://localhost:${process.env.PORT || 5000}`;

    if (!fs.existsSync(folderPath)) {
      return res.json([]);
    }

    try {
      const files = fs.readdirSync(folderPath);
      const fileUrls = files
        .filter(filename => {
          const filePath = path.join(folderPath, filename);
          const exists = fs.existsSync(filePath);
          if (!exists) {
            console.warn(`File listed but not found on server: ${filePath}`);
          }
          return exists; // Only include files that exist
        })
        .map(filename => {
          const stats = fs.statSync(path.join(folderPath, filename));
          return {
            name: filename,
            url: `${baseUrl}/uploads/${safeName}_${identifier}/${filename}`,
            size: stats.size,
            uploadedAt: stats.ctime
          };
        });

      console.log(`Returning ${fileUrls.length} documents for submission ${submissionId}`);
      res.json(fileUrls);
    } catch (fsErr) {
      console.error("Error reading directory:", fsErr);
      res.status(500).json({ error: "Failed to retrieve documents" });
    }
  });
});

module.exports = router;