import "./styles.scss";
import { useHistory } from "react-router-dom";

const Verify = () => {
  const history = useHistory();
  const goToLogin = (e) => {
    e.preventDefault();
    history.push("/login");
  };
  return (
    <div id="container-form__verify">
      <div class="form-container">
        <form id="form-user-login" autocomplete="off">
          <div className="label">Please Input Your Password</div>
          <input
            id="input-email"
            type="text"
            readonly
            onfocus="this.removeAttribute('readonly');"
            placeholder="Input your password"
            autocomplete="off"
          />

          <button id="login-button" class="login-form">
            Register
          </button>
        </form>

        <div class="sign-up login-form">
          <p>Have an account?</p>
          <p class="sign-up-title" onClick={goToLogin}>
            Login
          </p>
        </div>
      </div>
    </div>
  );
};

export default Verify;
