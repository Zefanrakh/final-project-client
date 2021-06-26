import "./styles.scss";
import { useHistory } from "react-router-dom";
const Login = () => {
  const history = useHistory();
  const changePageHandler = (e) => {
    e.preventDefault();
    history.push("/register");
  };
  return (
    <div id="container-form">
      <img
        alt="container-login"
        src="https://image.freepik.com/free-vector/group-young-people-posing-photo_52683-18823.jpg"
      />
      <div class="form-container">
        <form id="form-user-login" autocomplete="off">
          <h4 class="login-form">LOGIN</h4>
          <label>Email</label>
          <input
            id="input-email"
            type="text"
            readonly
            onfocus="this.removeAttribute('readonly');"
            placeholder="Input your email"
            autocomplete="off"
          />

          <label>Password</label>
          <input
            id="input-password"
            type="password"
            readonly
            placeholder="Input your password"
            autocomplete="off"
          />
          <button id="login-button" class="login-form">
            Login
          </button>
        </form>

        <div class="sign-up login-form">
          <p>Doesn't have an account?</p>
          <p class="sign-up-title" onClick={changePageHandler}>
            Register
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
