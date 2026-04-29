import React, { useState } from "react";

function Login({ setToken, goToRegister }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function login(e) {
    e.preventDefault();

    if (!email || !password) {
      alert("Fill all fields");
      return;
    }

    fetch("http://localhost:5050/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password })
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.token) {
          localStorage.setItem("token", data.token);
          setToken(data.token);
        } else {
          alert(data.message);
        }
      });
  }

  return (
    <div className="page">
      <h2>Login</h2>

      <form className="form" onSubmit={login}>
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

        <button>Login</button>
      </form>

      <p>
        No account?{" "}
        <button onClick={goToRegister}>Create Account</button>
      </p>
    </div>
  );
}

export default Login;