exports.requireLogin = (req, res, next) => {
  if (!req.session.userId) return res.redirect("/login");
  next();
};

exports.requireAdmin = (req, res, next) => {
  if (!req.session.userId) return res.redirect("/login");
  if (req.session.userRole !== "admin") return res.send("Access denied: admins only");
  next();
};
