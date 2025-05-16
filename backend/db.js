const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./database.sqlite");

db.serialize(() => {
  // =========================
  // Jobs Table
  // =========================
  db.run(`
    CREATE TABLE IF NOT EXISTS jobs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      description TEXT NOT NULL,
      questions TEXT, -- JSON string
      expiresAt TEXT NOT NULL,
      responsibilities TEXT,
      requirements TEXT,
      qualifications TEXT,
      experience TEXT,
      salaryRange TEXT,
      location TEXT,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // =========================
  // Submissions Table
  // =========================
  db.run(`
    CREATE TABLE IF NOT EXISTS submissions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      jobId INTEGER NOT NULL,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      phoneNumber TEXT,
      nationalId TEXT,
      passport TEXT,
      answers TEXT NOT NULL,           
      traitScores TEXT,  
      scoreCategory TEXT,              
      personalityScore TEXT,           
      scoreCategory TEXT,              
      resumePath TEXT,
      certificatesPath TEXT,
      idCardPath TEXT,
      policeReportPath TEXT,
      additionalDocumentsPath TEXT,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY(jobId) REFERENCES jobs(id)
    )
  `);

  // =========================
  // Admins Table
  // =========================
  db.run(`
    CREATE TABLE IF NOT EXISTS admins (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // =========================
  // Email Settings Table
  // =========================
  db.run(`
    CREATE TABLE IF NOT EXISTS email_settings (
      id INTEGER PRIMARY KEY CHECK (id = 1),
      smtp_host TEXT NOT NULL,
      smtp_port INTEGER NOT NULL,
      smtp_username TEXT NOT NULL,
      smtp_password TEXT NOT NULL,
      sender_email TEXT NOT NULL,
      sender_name TEXT NOT NULL,
      email_subject TEXT NOT NULL,
      email_body TEXT NOT NULL
    )
  `);

  // =========================
  // Notifications Table
  // =========================
  db.run(`
    CREATE TABLE IF NOT EXISTS notifications (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      type TEXT NOT NULL,
      message TEXT NOT NULL,
      read INTEGER DEFAULT 0,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // =========================
  // Seed Default Admin
  // =========================
  db.get("SELECT * FROM admins WHERE username = 'admin'", (err, row) => {
    if (err) return console.error("Admin check failed:", err);
    if (!row) {
      db.run(
        "INSERT INTO admins (username, password) VALUES (?, ?)",
        ["admin", "admin"]
      );
    }
  });

  // =========================
  // Seed Default Email Settings
  // =========================
  db.get("SELECT * FROM email_settings WHERE id = 1", (err, row) => {
    if (err) return console.error("Email settings check failed:", err);
    if (!row) {
      db.run(
        `
        INSERT INTO email_settings (
          id,
          smtp_host,
          smtp_port,
          smtp_username,
          smtp_password,
          sender_email,
          sender_name,
          email_subject,
          email_body
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        `,
        [
          1,
          'smtp.example.com',
          587,
          'user@example.com',
          'password123',
          'noreply@example.com',
          'Midgard HR Team',
          'Application Received!',
          'Dear [LAST_NAME],\n\nThank you for applying for [JOB_TITLE]! We have received your application and will get back to you shortly.\n\nBest regards,\nMidgard Team ❤️'
        ]
      );
    }
  });
});

module.exports = db;
