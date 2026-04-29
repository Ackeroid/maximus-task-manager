import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddItem({ setTasks }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Medium");

  const navigate = useNavigate();

  function addTask(e) {
    e.preventDefault();

    if (!title || !description) {
      alert("Fill all fields");
      return;
    }

    const token = localStorage.getItem("token");

    fetch("http://localhost:5050/api/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token
      },
      body: JSON.stringify({
        title,
        description,
        priority
      })
    })
      .then((res) => res.json())
      .then((newTask) => {
        setTasks((oldTasks) => [...oldTasks, newTask]);

        setTitle("");
        setDescription("");
        setPriority("Medium");

        alert("Task added!");
        navigate("/list");
      });
  }

  return (
    <div className="page">
      <h1>Add Task</h1>

      <form className="form" onSubmit={addTask}>
        <label>Task Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label>Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>

        <label>Priority</label>
        <select value={priority} onChange={(e) => setPriority(e.target.value)}>
          <option>High</option>
          <option>Medium</option>
          <option>Low</option>
        </select>

        <button type="submit">Add Task</button>
      </form>
    </div>
  );
}

export default AddItem;