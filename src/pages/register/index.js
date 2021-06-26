import "./styles.scss";
import { useHistory } from "react-router-dom";

const Register = () => {
  const history = useHistory();

  const changePageHandler = (e) => {
    history.push("/verify");
  };

  const goToLogin = (e) => {
    history.push("/login");
  };
  return (
    <div id="container-form__register">
      <div class="form-container">
        <form onSubmit={changePageHandler}>
          <div className="label">Please Input Your Email</div>
          <input
            id="input-email"
            type="text"
            readonly
            onfocus="this.removeAttribute('readonly');"
            placeholder="Input your email"
            autocomplete="off"
          />

          <button id="login-button" class="login-form">
            <div></div> Next <i class="fas fa-arrow-right"></i>
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

export default Register;
