// db.js
const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./database.sqlite");  // Ensure correct path

// Create tables if not exist
db.serialize(() => {
  // Create jobs table
  db.run(`
    CREATE TABLE IF NOT EXISTS jobs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      description TEXT NOT NULL,
      questions TEXT,  -- Questions stored as JSON string
      expiresAt TEXT NOT NULL
    )
  `);

  // Create submissions table (with nationalId and createdAt)
  db.run(`
    CREATE TABLE IF NOT EXISTS submissions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      jobId INTEGER NOT NULL,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      phoneNumber TEXT,
      nationalId TEXT NOT NULL,
      answers TEXT NOT NULL,
      resumePath TEXT,
      certificatesPath TEXT,
      idCardPath TEXT,
      policeReportPath TEXT,
      additionalDocumentsPath TEXT,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY(jobId) REFERENCES jobs(id)
    )
  `);

  // Create admins table
  db.run(`
    CREATE TABLE IF NOT EXISTS admins (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT NOT NULL,
      password TEXT NOT NULL
    )
  `);

  // Create email_settings table
  db.run(`
    CREATE TABLE IF NOT EXISTS email_settings (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
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

  // Insert default admin user if not already in the table
  db.get("SELECT * FROM admins WHERE username = 'admin'", (err, row) => {
    if (!row) {
      db.run("INSERT INTO admins (username, password) VALUES (?, ?)", ["admin", "admin"]);
    }
  });

  // Insert default email settings if not exist
  db.get("SELECT * FROM email_settings WHERE id = 1", (err, row) => {
    if (!row) {
      db.run(`
        INSERT INTO email_settings
        (smtp_host, smtp_port, smtp_username, smtp_password, sender_email, sender_name, email_subject, email_body)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `, [
        'smtp.example.com', 
        587, 
        'user@example.com', 
        'password123', 
        'noreply@example.com', 
        'Midgard HR Team',
        'Application Received!',
        'Dear [LAST_NAME],\n\nThank you for applying for [JOB_TITLE]! We have received your application and will get back to you shortly.\n\nBest regards,\nMidgard Team ❤️'
      ]);
    }
  });

});

module.exports = db;
