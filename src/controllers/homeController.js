const db = require("../models/database");

exports.index = (req, res) => {
  res.render("pages/home", { title: "TaskFlow" });
};

exports.testDb = (req, res) => {
  const userCount = db.prepare("SELECT COUNT(*) as count FROM users").get();
  const taskCount = db.prepare("SELECT COUNT(*) as count FROM tasks").get();
  res.send(`Users: ${userCount.count}, Tasks: ${taskCount.count}`);
};
