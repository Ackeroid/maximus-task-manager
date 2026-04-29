import React, { useState } from "react";

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

    fetch("http://localhost:5050/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name, email, password })
    })
      .then((res) => res.json())
      .then((data) => {
        alert(data.message);
        goToLogin();
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

        <button>Create Account</button>
      </form>

      <p>
        Already have an account?{" "}
        <button onClick={goToLogin}>Login</button>
      </p>
    </div>
  );
}

export default Register;