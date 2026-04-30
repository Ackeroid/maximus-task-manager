import React, { useState } from "react";

const API_URL = "https://maximus-task-manager.onrender.com";

function Register({ goToLogin }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function register(e) {
    e.preventDefault();

    if (!name || !email || !password) {
      alert("Fill all fields");
      return;
    }

    fetch(`${API_URL}/api/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name, email, password })
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Register response:", data);

        alert(data.message || "Register request finished");

        if (data.message === "Account created") {
          goToLogin();
        }
      })
      .catch((error) => {
        console.log("Register error:", error);
        alert("Could not connect to backend");
      });
  }

  return (
    <div className="page">
      <h2>Create Account</h2>

      <form className="form" onSubmit={register}>
        <input
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Create Account</button>
      </form>

      <p>
        Already have an account?{" "}
        <button type="button" onClick={goToLogin}>
          Login
        </button>
      </p>
    </div>
  );
}

export default Register;