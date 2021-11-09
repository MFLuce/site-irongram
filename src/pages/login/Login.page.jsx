import React, { useState } from "react";
import axios from "axios";
import { login } from "../../service/auth/auth.service";

function LoginPage() {
  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  function updateInput(event) {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  }

  function onSubmit(event) {
    event.preventDefault();
    setLoading("");
    setError("");
    login(form).then((response) => {
      if (!response.success) {
        return setError(response.data);
      }
      console.log("Hurray");
    });
  }

  return (
    <div>
      <h1>Login Page</h1>
      <form onSubmit={onSubmit}>
        <label>
          <input
            type="text"
            name="username"
            placeholder="Username"
            //   value={username}
            value={form.username}
            //   onChange={(e) => setUsername(e.target.value)}
            onChange={updateInput}
          />
        </label>
        <label>
          <input
            type="password"
            name="password"
            placeholder="password"
            //   value={password}
            value={form.password}
            //   onChange={updatePassword}
            onChange={updateInput}
          />
        </label>
        <br />
        <button>Login to your account</button>
      </form>
    </div>
  );
}

export default LoginPage;
