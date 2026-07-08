const db = require("./database");
const bcrypt = require("bcrypt");

const existing = db.prepare("SELECT COUNT(*) as count FROM users").get();
if (existing.count === 0) {
  const alexPassword = bcrypt.hashSync("password123", 10);
  const adminPassword = bcrypt.hashSync("admin123", 10);

  db.prepare(
    "INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)"
  ).run("alex", "alex@example.com", alexPassword, "user");
  db.prepare(
    "INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)"
  ).run("admin", "admin@example.com", adminPassword, "admin");

  db.prepare(
    "INSERT INTO tasks (title, description, user_id) VALUES (?, ?, ?)"
  ).run("Buy groceries", "Milk, eggs, bread", 1);
  db.prepare(
    "INSERT INTO tasks (title, description, user_id) VALUES (?, ?, ?)"
  ).run("Fix login bug", "The login form crashes on invalid email", 1);
  db.prepare(
    "INSERT INTO tasks (title, description, user_id) VALUES (?, ?, ?)"
  ).run("Write report", "Q3 financial report", 2);

  console.log("Seed data inserted");
} else {
  console.log("Database already has data, skipping seed");
}
