import { Link } from "react-router-dom";

// Renders a single task card with status, details link, and action buttons
function ItemCard({ task, deleteTask, toggleComplete, startEdit }) {
  return (
    <div className="card">
      {/* Status badge and details link row */}
      <div className="card-top">
        <span className={task.completed ? "status done" : "status pending"}>
          {task.completed ? "Completed" : "Pending"}
        </span>

        <Link className="details-link" to={`/details/${task.id}`}>
          View Details
        </Link>
      </div>

      {/* Task title and description */}
      <div className="card-body">
        <h3>{task.title}</h3>
        <p>{task.description}</p>
      </div>

      {/* Edit, complete/undo, and delete actions */}
      <div className="card-bottom">
        <button onClick={() => startEdit(task)}>Edit Task</button>

        <button className="complete-btn" onClick={() => toggleComplete(task.id)}>
          {task.completed ? "Undo Task" : "Complete Task"}
        </button>

        <button className="delete-btn" onClick={() => deleteTask(task.id)}>
          Delete Task
        </button>
      </div>
    </div>
  );
}

export default ItemCard;