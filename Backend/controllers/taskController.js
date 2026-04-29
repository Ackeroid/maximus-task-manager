const db = require("../db");

function getTasks(req, res) {
  db.all(
    "SELECT * FROM tasks WHERE user_id = ?",
    [req.user.id],
    function (err, tasks) {
      res.json(tasks);
    }
  );
}

function getTask(req, res) {
  db.get(
    "SELECT * FROM tasks WHERE id = ? AND user_id = ?",
    [req.params.id, req.user.id],
    function (err, task) {
      if (!task) {
        return res.status(404).json({ message: "Task not found" });
      }

      res.json(task);
    }
  );
}

function createTask(req, res) {
  const { title, description, priority } = req.body;

  if (!title || !description) {
    return res.status(400).json({ message: "Fill all fields" });
  }

  const sql = `
    INSERT INTO tasks (title, description, priority, user_id)
    VALUES (?, ?, ?, ?)
  `;

  db.run(sql, [title, description, priority || "Medium", req.user.id], function (err) {
    if (err) {
      return res.status(500).json({ message: "Task not created" });
    }

    res.status(201).json({
      id: this.lastID,
      title,
      description,
      priority: priority || "Medium",
      completed: 0,
      user_id: req.user.id
    });
  });
}

function updateTask(req, res) {
  const { title, description, priority, completed } = req.body;

  db.get(
    "SELECT * FROM tasks WHERE id = ? AND user_id = ?",
    [req.params.id, req.user.id],
    function (err, task) {
      if (!task) {
        return res.status(404).json({ message: "Task not found" });
      }

      const newTitle = title || task.title;
      const newDescription = description || task.description;
      const newPriority = priority || task.priority;
      const newCompleted =
        completed !== undefined ? (completed ? 1 : 0) : task.completed;

      db.run(
        `UPDATE tasks
         SET title = ?, description = ?, priority = ?, completed = ?
         WHERE id = ? AND user_id = ?`,
        [
          newTitle,
          newDescription,
          newPriority,
          newCompleted,
          req.params.id,
          req.user.id
        ],
        function () {
          res.json({
            id: Number(req.params.id),
            title: newTitle,
            description: newDescription,
            priority: newPriority,
            completed: newCompleted,
            user_id: req.user.id
          });
        }
      );
    }
  );
}

function deleteTask(req, res) {
  db.run(
    "DELETE FROM tasks WHERE id = ? AND user_id = ?",
    [req.params.id, req.user.id],
    function () {
      if (this.changes === 0) {
        return res.status(404).json({ message: "Task not found" });
      }

      res.json({ message: "Task deleted" });
    }
  );
}

module.exports = {
  getTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask
};