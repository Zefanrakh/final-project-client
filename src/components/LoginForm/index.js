import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import axios from "axios";
import setUser from "../../store/action/setUser";
import Swal from "sweetalert2";

const LoginForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    axios("http://34.200.246.160:3001" + "/user/login", {
      method: "POST",
      data: {
        username,
        password,
      },
    })
      .then((res) => {
        const access_token = res.data.access_token;
        localStorage.setItem("access_token", access_token);
        dispatch(setUser(res.data.user));
        history.push("/");
      })
      .catch((err) => {
        Swal.fire({
          title: err.response.data.message,
          icon: "error",
        });
      });
  };
  return (
    <form id="form-user-login" autoComplete="off" onSubmit={handleSubmit}>
      <h4 className="login-form">LOGIN</h4>
      <label>Username</label>
      <input
        id="input-email"
        type="text"
        // readOnly
        // onFocus="this.removeAttribute('readonly');"
        placeholder="Input your username"
        autoComplete="off"
        value={username}
        onChange={(e) => {
          setUsername(e.target.value);
        }}
      />

      <label>Password</label>
      <input
        id="input-password"
        type="password"
        // readOnly
        placeholder="Input your password"
        autoComplete="off"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />
      <button id="login-button" className="login-form">
        Login
      </button>
    </form>
  );
};

export default LoginForm;
