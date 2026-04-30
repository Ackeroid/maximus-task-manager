import React from "react";
import { Link } from "react-router-dom";

// Top navigation bar with page links and logout
function Navbar({ setToken }) {
  // Clears token from storage and state, returning user to login
  function logout() {
    localStorage.removeItem("token");
    setToken(null);
  }

  return (
    <div className="navbar">
      <h2>Maximus Task Manager</h2>

      <div>
        <Link to="/home">Home</Link>
        <Link to="/list">Tasks</Link>
        <Link to="/add">Add Task</Link>
        <button onClick={logout}>Logout</button>
      </div>
    </div>
  );
}

export default Navbar;