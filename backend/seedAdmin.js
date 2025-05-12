const bcrypt = require("bcrypt");
const db = require("./db");

const admins = [
  { username: "admin", plainPassword: "admin123" },
  { username: "midgard", plainPassword: "midgard" },
];

admins.forEach(({ username, plainPassword }) => {
  bcrypt.hash(plainPassword, 10, (err, hashedPassword) => {
    if (err) {
      console.error("❌ Hashing failed:", err);
      process.exit(1);
    }

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

        db.get("SELECT * FROM admins WHERE username = ?", [username], (selectErr, row) => {
          if (selectErr) {
            console.error("❌ DB read error:", selectErr.message);
            process.exit(1);
          }

          if (row) {
            db.run(
              "UPDATE admins SET password = ? WHERE username = ?",
              [hashedPassword, username],
              function (updateErr) {
                if (updateErr) {
                  console.error("❌ Update error:", updateErr.message);
                } else {
                  console.log(`🔄 ${username} password updated.`);
                }
              }
            );
          } else {
            db.run(
              "INSERT INTO admins (username, password) VALUES (?, ?)",
              [username, hashedPassword],
              function (insertErr) {
                if (insertErr) {
                  console.error("❌ Insert error:", insertErr.message);
                } else {
                  console.log(`✅ ${username} created with ID:`, this.lastID);
                }
              }
            );
          }
        });
      }
    );
  });
});

// Exit after all operations (simplified, assumes sequential execution)
setTimeout(() => process.exit(0), 1000);