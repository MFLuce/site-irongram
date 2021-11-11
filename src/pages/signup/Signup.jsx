import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signup } from "../../service/auth/auth.service";
import { setAccessToken } from "../../utils/consts";
import * as PATHS from "../../utils/paths";
// username: string

// password: string
// following: User[]

export default function Signup(props) {
  //   const [username, setUsername] = useState("");
  //   const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  function updateInput(event) {
    const obj = { ...form };
    obj[event.target.name] = event.target.value;
    setForm({
      ...form, // make a copy of the previous object
      [event.target.name]: event.target.value, // override only the keys that you want
    });
  }

  function onSubmit(event) {
    event.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);
    signup(form).then((response) => {
      if (!response.success) {
        return setError(response.data);
      }

      setAccessToken(response.data.accessToken);

      props.authenticate(response.data.user);
      console.log("Hurray");
      setLoading(false);
      setSuccess(true);
      setTimeout(() => {
        navigate(PATHS.FEED_PAGE);
      }, 3000);
    });
  }
  //   function updatePassword(event) {
  //     setPassword(event.target.value);
  //   }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <form method="POST" action="/home" onSubmit={onSubmit}>
      {success ? (
        <h1 style={{ color: "green" }}>
          Your account was created, congratulations
        </h1>
      ) : null}
      {error ? <div style={{ color: "red" }}>{error}</div> : null}
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
      <button>Create account</button>
    </form>
  );
}
