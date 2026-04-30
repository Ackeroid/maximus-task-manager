import React, { useState } from "react";

const API_URL = "https://maximus-task-manager.onrender.com";

// Login form — stores JWT token in localStorage on success
function Login({ setToken, goToRegister }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Posts credentials, saves token to storage and state, or shows error message
  function login(e) {
    e.preventDefault();

    if (!email || !password) {
      alert("Fill all fields");
      return;
    }

    fetch(`${API_URL}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Login response:", data);

        if (data.token) {
          localStorage.setItem("token", data.token);
          setToken(data.token);
        } else {
          alert(data.message || "Login failed");
        }
      })
      .catch((error) => {
        console.log("Login error:", error);
        alert("Could not connect to backend");
      });
  }

  return (
    <div className="page">
      <h2>Login</h2>

      <form className="form" onSubmit={login}>
        <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">Login</button>
      </form>

      {/* Switches to Register view without a route change */}
      <p>
        No account?{" "}
        <button type="button" onClick={goToRegister}>Create Account</button>
      </p>
    </div>
  );
}

export default Login;