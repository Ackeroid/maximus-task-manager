import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import List from "./pages/List";
import AddItem from "./pages/AddItem";
import Details from "./pages/Details";
import Login from "./pages/Login";
import Register from "./pages/Register";

// Root component — owns auth state and fetches tasks once token is available
function App() {
  const [tasks, setTasks] = useState([]);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [showRegister, setShowRegister] = useState(false);

  // Fetches all tasks for the logged-in user; clears token if the response isn't an array
  useEffect(() => {
    if (!token) return;

    fetch("https://maximus-task-manager.onrender.com/api/tasks", {
      headers: { Authorization: "Bearer " + token }
    })
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setTasks(data);
        } else {
          localStorage.removeItem("token");
          setToken(null);
          setTasks([]);
        }
      });
  }, [token]);

  // Show auth screens before the router so unauthenticated users never reach protected routes
  if (!token && showRegister) return <Register goToLogin={() => setShowRegister(false)} />;
  if (!token) return <Login setToken={setToken} goToRegister={() => setShowRegister(true)} />;

  return (
    <BrowserRouter>
      <Navbar setToken={setToken} />

      {/* Both / and /home render Home so the default route isn't a dead end */}
      <Routes>
        <Route path="/" element={<Home tasks={tasks} />} />
        <Route path="/home" element={<Home tasks={tasks} />} />
        <Route path="/list" element={<List tasks={tasks} setTasks={setTasks} />} />
        <Route path="/add" element={<AddItem setTasks={setTasks} />} />
        <Route path="/details/:id" element={<Details tasks={tasks} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;