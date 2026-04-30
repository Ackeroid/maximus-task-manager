import React from "react";
import { useParams, useNavigate } from "react-router-dom";

// Shows full details of a single task looked up by URL id param
function Details({ tasks }) {
  const { id } = useParams();
  const navigate = useNavigate();

  // Matches string param to numeric task id
  const task = tasks.find((task) => task.id === Number(id));

  if (!task) {
    return (
      <div className="page">
        <h2>Task not found</h2>
      </div>
    );
  }

  return (
    <div className="page">
      <div className="card">
        <h1>{task.title}</h1>
        <p>{task.description}</p>
        <p>Priority: {task.priority}</p>
        <p>Status: {task.completed ? "Completed" : "Pending"}</p>
        <button onClick={() => navigate("/list")}>Back to Tasks</button>
      </div>
    </div>
  );
}

export default Details;