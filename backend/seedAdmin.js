const bcrypt = require("bcrypt");
const db = require("./db");

const username = "midgard";
const plainPassword = "midgard";

bcrypt.hash(plainPassword, 10, (err, hashedPassword) => {
  if (err) {
    console.error("❌ Hashing failed:", err);
    process.exit(1);
  }

  // Ensure table exists (optional, for safety)
  db.run(
    `CREATE TABLE IF NOT EXISTS admins (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL
    )`,
    (tableErr) => {
      if (tableErr) {
        console.error("❌ Failed to ensure table:", tableErr.message);
        process.exit(1);
      }

      // Upsert: update password if admin exists
      db.get("SELECT * FROM admins WHERE username = ?", [username], (selectErr, row) => {
        if (selectErr) {
          console.error("❌ DB read error:", selectErr.message);
          process.exit(1);
        }

        if (row) {
          // Admin exists, update password
          db.run(
            "UPDATE admins SET password = ? WHERE username = ?",
            [hashedPassword, username],
            function (updateErr) {
              if (updateErr) {
                console.error("❌ Update error:", updateErr.message);
              } else {
                console.log("🔄 Admin password updated.");
              }
              process.exit(0);
            }
          );
        } else {
          // Admin doesn't exist, insert new
          db.run(
            "INSERT INTO admins (username, password) VALUES (?, ?)",
            [username, hashedPassword],
            function (insertErr) {
              if (insertErr) {
                console.error("❌ Insert error:", insertErr.message);
              } else {
                console.log("✅ Admin created with ID:", this.lastID);
              }
              process.exit(0);
            }
          );
        }
      });
    }
  );
});
