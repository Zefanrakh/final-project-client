import "./styles.scss";
import { useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { auth } from "../../firebase";

const Register = () => {
  const history = useHistory();
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (localStorage.access_token) {
      history.push("/");
    }
  }, []);

  const goToLogin = (e) => {
    history.push("/login");
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const config = {
        url: "http://localhost:3001/verify",
        handleCodeInApp: true,
      };

      const result = await axios("http://localhost:3000/user/checkexistemail", {
        method: "POST",
        data: {
          email,
        },
      });

      if (!result.data.user) {
        await auth.sendSignInLinkToEmail(email, config);
        localStorage.setItem("emailForRegistration", email);
        setEmail("");
        Swal.fire({
          position: "top-end",
          text: "We've sent an verification link to your email count",
          showConfirmButton: false,
          timer: 1500,
          timerProgressBar: true,
        });
      } else {
        Swal.fire({
          position: "top-end",
          html: `<p style="color:'red';">This email is refer to an existing account</p>`,
          showConfirmButton: false,
          timer: 1500,
          timerProgressBar: true,
        });
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div id="container-form__register">
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <div className="label">Please Input Your Email</div>
          <input
            id="input-email"
            type="text"
            // readOnly
            // onFocus="this.removeAttribute('readonly');"
            placeholder="Input your email"
            autoComplete="off"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            value={email}
          />

          <button id="login-button" className="login-form">
            <div></div> Next <i className="fas fa-arrow-right"></i>
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

export default Register;
