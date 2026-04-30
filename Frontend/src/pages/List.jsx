import React, { useState } from "react";
import ItemCard from "../components/ItemCard";

function List({ tasks, setTasks }) {
  const [editId, setEditId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");

  function deleteTask(id) {
    const token = localStorage.getItem("token");

    fetch(`https://maximus-task-manager.onrender.com/api/tasks/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + token
      }
    }).then(() => {
      setTasks(tasks.filter((task) => task.id !== id));
    });
  }

  function toggleComplete(id) {
    const task = tasks.find((task) => task.id === id);
    const token = localStorage.getItem("token");

    fetch(`https://maximus-task-manager.onrender.com/api/tasks/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token
      },
      body: JSON.stringify({
        completed: !task.completed
      })
    })
      .then((res) => res.json())
      .then((updatedTask) => {
        setTasks(tasks.map((task) =>
          task.id === updatedTask.id ? updatedTask : task
        ));
      });
  }

  function startEdit(task) {
    setEditId(task.id);
    setEditTitle(task.title);
    setEditDescription(task.description);
  }

  function saveEdit() {
    const token = localStorage.getItem("token");

    fetch(`https://maximus-task-manager.onrender.com/api/tasks/${editId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token
      },
      body: JSON.stringify({
        title: editTitle,
        description: editDescription
      })
    })
      .then((res) => res.json())
      .then((updatedTask) => {
        setTasks(tasks.map((task) =>
          task.id === updatedTask.id ? updatedTask : task
        ));
        setEditId(null);
      });
  }

  return (
    <div className="page">
      <h1>Task List</h1>

      {tasks.length === 0 && <p>No tasks added yet.</p>}

      {tasks.map((task) =>
        editId === task.id ? (
          <div className="card" key={task.id}>
            <h3>Edit Task</h3>

            <input
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
            />

            <textarea
              value={editDescription}
              onChange={(e) => setEditDescription(e.target.value)}
            ></textarea>

            <button onClick={saveEdit}>Save</button>
            <button onClick={() => setEditId(null)}>Cancel</button>
          </div>
        ) : (
          <ItemCard
            key={task.id}
            task={task}
            deleteTask={deleteTask}
            toggleComplete={toggleComplete}
            startEdit={startEdit}
          />
        )
      )}
    </div>
  );
}

export default List;