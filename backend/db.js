const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./database.sqlite");  // Ensure correct path

// Create tables if not exist
db.serialize(() => {
  // Create jobs table with questions column
  db.run(`
    CREATE TABLE IF NOT EXISTS jobs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      description TEXT NOT NULL,
      questions TEXT,  -- New column for questions (stored as JSON string)
      expiresAt TEXT NOT NULL
    )
  `);

  // Create submissions table
  db.run(`
    CREATE TABLE IF NOT EXISTS submissions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      jobId INTEGER NOT NULL,
      name TEXT NOT NULL,
      nationalId TEXT NOT NULL,
      answers TEXT NOT NULL,
      documents TEXT,
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

  // Insert mock admin user if not already in the table
  db.get("SELECT * FROM admins WHERE username = 'admin'", (err, row) => {
    if (!row) {
      db.run("INSERT INTO admins (username, password) VALUES (?, ?)", ["admin", "admin"]);
    }
  });
});

module.exports = db;
