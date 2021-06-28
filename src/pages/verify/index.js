import "./styles.scss";
import { useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import setUser from "../../store/action/setUser";
import axios from "axios";
import { auth } from "../../firebase";
import Swal from "sweetalert2";

const Verify = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const goToLogin = (e) => {
    e.preventDefault();
    history.push("/login");
  };

  useEffect(() => {
    if (!history.location.search.includes("apiKey")) {
      history.push("/register");
    }
    if (!localStorage.emailForRegistration) {
      history.push("/register");
    }
  }, []);

  const handleUsernameChange = (e) => {
    let value = e.target.value;
    value = value.replace(/\s\s+/g, " ");
    setUsername(value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const email = localStorage.emailForRegistration;
      if (!username || !password || !email) {
        Swal.fire({
          icon: "error",
          title: "Please input all fields",
          timer: 2000,
          showConfirmButton: false,
        });
        return;
      }

      const resultCheckUsername = await axios(
        "http://localhost:3001/user/checkexistusername",
        {
          method: "POST",
          data: {
            username,
          },
        }
      );

      if (!resultCheckUsername.data.user) {
        const result = await auth.signInWithEmailLink(
          email,
          window.location.href
        );
        if (result.user.emailVerified) {
          const resultUser = await axios(
            "http://localhost:3001/user/register",
            {
              method: "POST",
              data: {
                email,
                username,
                password,
              },
            }
          );

          if (resultUser.data.user) {
            // console.log(resultUser.data.user);
            const access_token = resultUser.data.access_token;
            localStorage.setItem("access_token", access_token);
            dispatch(setUser(resultUser.data.user.User));
            history.push("/");
          }
          localStorage.removeItem("emailForRegistration");
        } else {
          Swal.fire({
            icon: "error",
            title: "Something error please go back to register page",
            timer: 2000,
            showConfirmButton: false,
          });
          history.push("/register");
        }
      } else {
        throw { message: "This username has already exist" };
      }
    } catch (err) {
      let message;
      if (err.response) {
        message = err.response.data.message;
      } else if (err.message) {
        message = err.message;
      }

      Swal.fire({
        icon: "error",
        title: message,
        timer: 2000,
        showConfirmButton: false,
      });
      if (err.message.toLowerCase().includes("token")) {
        history.push("/register");
      }
      // console.log(err.message);
      // console.log(err.response);
    }
  };

  return (
    <div id="container-form__verify">
      <div className="form-container">
        <form id="form-user-login" autoComplete="off" onSubmit={handleSubmit}>
          <div className="label">Please Input Your Username and Password</div>
          <input
            id="input-email"
            type="text"
            // readOnly
            // onFocus="this.removeAttribute('readonly');"
            placeholder="Input your username"
            autoComplete="off"
            onChange={handleUsernameChange}
            value={username}
          />
          <input
            id="input-password"
            type="password"
            // readOnly
            // onFocus="this.removeAttribute('readonly');"
            placeholder="Input your password min 6 characters"
            autoComplete="off"
            onChange={handlePasswordChange}
            value={password}
          />

          <button
            id="login-button"
            className="login-form"
            disabled={password.length < 6}
          >
            Register
          </button>
        </form>

        <div className="sign-up login-form">
          <p>Have an account?</p>
          <p className="sign-up-title" onClick={goToLogin}>
            Login
          </p>
        </div>
      </div>
    </div>
  );
};

export default Verify;
