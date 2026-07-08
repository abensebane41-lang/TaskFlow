const db = require("../models/database");
const bcrypt = require("bcrypt");

exports.showRegister = (req, res) => {
  res.render("pages/register", { title: "Register" });
};

exports.register = (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) return res.send("All fields are required");
  if (password.length < 6) return res.send("Password must be at least 6 characters");
  if (!email.includes("@")) return res.send("Invalid email address");

  const existing = db.prepare("SELECT id FROM users WHERE email = ?").get(email);
  if (existing) return res.send("Email already registered");

  const hashedPassword = bcrypt.hashSync(password, 10);
  console.log("REGISTER DEBUG:", { email, passwordLength: password?.length, hashLength: hashedPassword?.length, hashPrefix: hashedPassword?.substring(0, 10) });

  db.prepare(
    "INSERT INTO users (username, email, password) VALUES (?, ?, ?)"
  ).run(username, email, hashedPassword);

  res.redirect("/login");
};

exports.showLogin = (req, res) => {
  res.render("pages/login", { title: "Login" });
};

exports.login = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) return res.send("All fields are required");

  const user = db.prepare("SELECT * FROM users WHERE email = ?").get(email);
  if (!user) return res.send("User not found");

  console.log("LOGIN DEBUG:", { email, passwordLength: password?.length, hashLength: user?.password?.length, hashPrefix: user?.password?.substring(0, 10) });

  const match = bcrypt.compareSync(password, user.password);
  console.log("LOGIN MATCH:", match);
  if (!match) return res.send("Wrong password");

  req.session.userId = user.id;
  req.session.userRole = user.role;
  req.session.userName = user.username;

  res.redirect("/tasks");
};

exports.logout = (req, res) => {
  req.session.destroy();
  res.redirect("/");
};
