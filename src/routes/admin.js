const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const { requireAdmin } = require("../middleware/auth");

router.get("/admin", requireAdmin, adminController.dashboard);
router.get("/admin/users", requireAdmin, adminController.users);
router.post("/admin/users/:id/delete", requireAdmin, adminController.deleteUser);
router.get("/admin/tasks", requireAdmin, adminController.allTasks);
router.post("/admin/tasks/:id/delete", requireAdmin, adminController.deleteTask);

module.exports = router;
