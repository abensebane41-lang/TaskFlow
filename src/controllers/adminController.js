const db = require("../models/database");

exports.dashboard = (req, res) => {
  const userCount = db.prepare("SELECT COUNT(*) as count FROM users").get();
  const taskCount = db.prepare("SELECT COUNT(*) as count FROM tasks").get();
  res.render("pages/admin/dashboard", { title: "Admin Panel", userCount: userCount.count, taskCount: taskCount.count });
};

exports.users = (req, res) => {
  const users = db.prepare("SELECT id, username, email, role, created_at FROM users").all();
  res.render("pages/admin/users", { title: "Manage Users", users });
};

exports.deleteUser = (req, res) => {
  db.prepare("DELETE FROM users WHERE id = ? AND role != 'admin'").run(req.params.id);
  res.redirect("/admin/users");
};

exports.allTasks = (req, res) => {
  const tasks = db.prepare(`
    SELECT tasks.*, users.username
    FROM tasks
    JOIN users ON tasks.user_id = users.id
    ORDER BY tasks.created_at DESC
  `).all();
  res.render("pages/admin/tasks", { title: "All Tasks", tasks });
};

exports.deleteTask = (req, res) => {
  db.prepare("DELETE FROM tasks WHERE id = ?").run(req.params.id);
  res.redirect("/admin/tasks");
};
