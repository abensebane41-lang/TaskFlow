const express = require("express");
const router = express.Router();
const tasksController = require("../controllers/tasksController");
const { requireLogin } = require("../middleware/auth");
const upload = require("../middleware/upload");

router.get("/tasks", requireLogin, tasksController.index);
router.get("/tasks/new", requireLogin, tasksController.new);
router.post("/tasks", requireLogin, upload.single("file"), tasksController.create);
router.get("/tasks/:id/edit", requireLogin, tasksController.edit);
router.post("/tasks/:id/update", requireLogin, upload.single("file"), tasksController.update);
router.post("/tasks/:id/delete", requireLogin, tasksController.destroy);

module.exports = router;
