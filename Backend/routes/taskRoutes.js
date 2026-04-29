const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  getTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask
} = require("../controllers/taskController");

router.get("/", protect, getTasks);
router.get("/:id", protect, getTask);
router.post("/", protect, createTask);
router.put("/:id", protect, updateTask);
router.delete("/:id", protect, deleteTask);

module.exports = router;