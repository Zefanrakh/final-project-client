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
  const [input, setInput] = useState({
    username: "",
    password: "",
    profilePicture: "",
    name: "",
    address: "",
    phoneNumber: 0,
  });
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

  const uploadImage = () => {
    const myWidget = window.cloudinary.createUploadWidget(
      {
        cloudName: "dfz3v4x49",
        uploadPreset: "jxnt73cg",
      },
      (error, result) => {
        if (!error && result && result.event === "success") {
          let tempInput = { ...input };
          tempInput.profilePicture = result.info.url;
          setInput(tempInput);
        }
      }
    );
    myWidget.open();
  };

  const handleInputExceptPassword = (value, inputType) => {
    value = value.replace(/\s\s+/g, " ");
    let tempInput = { ...input };
    tempInput[inputType] = value;
    setInput(tempInput);
  };

  const handlePasswordChange = (e) => {
    let tempInput = { ...input };
    tempInput.password = e.target.value;
    setInput(tempInput);
  };

  const handlePhoneNumberChange = (e) => {
    let tempInput = { ...input };
    tempInput.phoneNumber = Number(String(e.target.value).slice(0, 12));
    console.log(String(input.phoneNumber).length);
    setInput(tempInput);
  };

  const handleSubmit = async (e) => {
    try {
      const {
        name,
        username,
        password,
        profilePicture,
        address,
        phoneNumber,
      } = input;
      e.preventDefault();
      const email = localStorage.emailForRegistration;
      console.log(input, email);
      // return;
      if (
        !username ||
        !password ||
        !email ||
        !profilePicture ||
        !name ||
        !address ||
        !phoneNumber
      ) {
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
                name,
                email,
                username,
                password,
                phoneNumber,
                address,
                profilePicture,
              },
            }
          );

          if (resultUser.data.user) {
            // console.log(resultUser.data.user);
            const access_token = resultUser.data.access_token;
            localStorage.setItem("access_token", access_token);
            dispatch(setUser(resultUser.data.user));
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
    }
  };

  return (
    <div id="container-form__verify">
      <div className="form-container">
        <form id="form-user-login" autoComplete="off" onSubmit={handleSubmit}>
          <div className="label">Please Input Your Username and Password</div>
          <input
            id="input-name"
            type="text"
            // readOnly
            // onFocus="this.removeAttribute('readonly');"
            placeholder="Input your name"
            autoComplete="off"
            onChange={(e) => {
              handleInputExceptPassword(e.target.value, "name");
            }}
            value={input.name}
          />
          <input
            id="input-username"
            type="text"
            // readOnly
            // onFocus="this.removeAttribute('readonly');"
            placeholder="Input your username"
            autoComplete="off"
            onChange={(e) => {
              handleInputExceptPassword(e.target.value, "username");
            }}
            value={input.username}
          />
          <input
            id="input-password"
            type="password"
            // readOnly
            // onFocus="this.removeAttribute('readonly');"
            placeholder="Input your password min 6 characters"
            autoComplete="off"
            onChange={handlePasswordChange}
            value={input.password}
          />

          <input
            id="input-address"
            type="text"
            // onFocus="this.removeAttribute('readonly');"
            placeholder="Input your address"
            autoComplete="off"
            onChange={(e) => {
              handleInputExceptPassword(e.target.value, "address");
            }}
            value={input.address}
          />
          <input
            id="input-phoneNumber"
            type="number"
            // onFocus="this.removeAttribute('readonly');"
            placeholder="082246335747"
            autoComplete="off"
            onChange={handlePhoneNumberChange}
            value={input.phoneNumber !== 0 && input.phoneNumber}
          />
          <label>Image Profile</label>
          <div className="image-container">
            {input.profilePicture && (
              <img
                alt="profile"
                src={input.profilePicture}
                className="image-profile"
              />
            )}
            <button type="button" class="button-upload" onClick={uploadImage}>
              {input.profilePicture ? (
                <i class="fas fa-redo icon-redo"></i>
              ) : (
                "+"
              )}
            </button>
          </div>
          {/* <input
            id="input-profilePicture"
            type="text"
            readOnly
            // onFocus="this.removeAttribute('readonly');"
            placeholder="Your profile image url"
            autoComplete="off"
            value={input.profilePicture}
          />
          <button
            onClick={uploadImage}
            style={{ width: "320px" }}
            type="button"
          >
            Upload your profile image
          </button> */}
          <button
            id="login-button"
            className="login-form"
            disabled={input.password.length < 6}
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
