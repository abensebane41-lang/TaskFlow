require("dotenv").config();

const express = require("express");
const path = require("path");
const session = require("express-session");
const helmet = require("helmet");

if (!process.env.SESSION_SECRET) {
  console.error("FATAL: SESSION_SECRET environment variable is required");
  process.exit(1);
}

require("./src/models/schema");
require("./src/models/seed");

const app = express();
const PORT = process.env.PORT || 3000;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "src", "views"));

app.use(helmet({ contentSecurityPolicy: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use("/uploads", express.static(path.join(__dirname, "public", "uploads")));
app.use(express.urlencoded({ extended: false }));

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}));

app.use((req, res, next) => {
  res.locals.user = req.session.userId ? { id: req.session.userId, role: req.session.userRole, name: req.session.userName } : null;
  res.locals.error = null;
  next();
});

app.use("/", require("./src/routes/home"));
app.use("/", require("./src/routes/auth"));
app.use("/", require("./src/routes/tasks"));
app.use("/", require("./src/routes/admin"));

app.use((req, res) => {
  res.status(404).render("pages/404", { title: "Not Found" });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).render("pages/500", { title: "Server Error" });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
