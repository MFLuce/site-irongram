import { useState } from "react";
import { useNavigate } from "react-router";
import { login } from "../../service/auth/auth.service";
import { setAccessToken } from "../../utils/consts";
import * as PATHS from "../../utils/paths";

function LoginPage(props) {
  console.log("props:", props);
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  // const [success, setSuccess] = useState(false);

  function updateInput(event) {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  }

  function onSubmit(event) {
    event.preventDefault();
    setLoading(true);
    setError("");
    login(form).then((response) => {
      setLoading(false);
      if (!response.success) {
        return setError(response.data);
      }
      setAccessToken(response.data.accessToken);
      console.log("response.data:", response.data);
      props.authenticate(response.data.user);
      navigate(PATHS.HOME_PAGE);
    });
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Login Page</h1>
      {error && <div style={{ color: "red" }}>{error}</div>}
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
