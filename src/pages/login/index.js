import "./styles.scss";
import { useHistory } from "react-router-dom";
import { useEffect } from "react";
import MainCanvas from "../../components/threejsbackground/index.js";
import LoginForm from "../../components/LoginForm/index.js";

const Login = () => {
  const history = useHistory();

  useEffect(() => {
    if (localStorage.access_token) {
      history.push("/");
    }
  }, []);

  const changePageHandler = (e) => {
    e.preventDefault();
    history.push("/register");
  };

  return (
    <div style={{ position: "relative" }}>
      <MainCanvas />
      <div id="container-form">
        <img src="smdc3.png" alt="" />
        <div className="form-container">
          <LoginForm />
          <div className="sign-up login-form">
            <p>Doesn't have an account?</p>
            <p className="sign-up-title" onClick={changePageHandler}>
              Register
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
