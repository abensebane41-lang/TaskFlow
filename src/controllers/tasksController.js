const db = require("../models/database");

exports.index = (req, res) => {
  const tasks = db.prepare(`
    SELECT tasks.*, users.username
    FROM tasks
    JOIN users ON tasks.user_id = users.id
    WHERE tasks.user_id = ?
  `).all(req.session.userId);

  res.render("pages/tasks", { title: "Tasks", tasks });
};

exports.new = (req, res) => {
  res.render("pages/new-task", { title: "New Task" });
};

exports.create = (req, res) => {
  const { title, description } = req.body;

  if (!title || title.trim().length === 0) {
    return res.send("Title is required");
  }

  const file = req.file ? req.file.filename : null;

  db.prepare(
    "INSERT INTO tasks (title, description, file, user_id) VALUES (?, ?, ?, ?)"
  ).run(title.trim(), description || "", file, req.session.userId);

  res.redirect("/tasks");
};

exports.edit = (req, res) => {
  const task = db.prepare("SELECT * FROM tasks WHERE id = ? AND user_id = ?").get(req.params.id, req.session.userId);
  if (!task) return res.status(404).send("Task not found");

  res.render("pages/edit-task", { title: "Edit Task", task });
};

exports.update = (req, res) => {
  const { title, description } = req.body;

  if (!title || title.trim().length === 0) {
    return res.send("Title is required");
  }

  let sql = "UPDATE tasks SET title = ?, description = ?";
  const params = [title.trim(), description || ""];

  if (req.file) {
    sql += ", file = ?";
    params.push(req.file.filename);
  }

  sql += " WHERE id = ? AND user_id = ?";
  params.push(req.params.id, req.session.userId);

  db.prepare(sql).run(...params);
  res.redirect("/tasks");
};

exports.destroy = (req, res) => {
  db.prepare("DELETE FROM tasks WHERE id = ? AND user_id = ?").run(req.params.id, req.session.userId);
  res.redirect("/tasks");
};
