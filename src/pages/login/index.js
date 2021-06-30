import "./styles.scss";
import { useHistory } from "react-router-dom";
import { useState, useEffect, Suspense } from "react";
import { useDispatch } from "react-redux";
import * as THREE from "three";
import {
  Canvas,
  useFrame,
  extend,
  useThree,
  useLoader,
} from "react-three-fiber";

import axios from "axios";
import setUser from "../../store/action/setUser";
import Swal from "sweetalert2";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
extend({ OrbitControls });

const Orbit = () => {
  const { camera, gl } = useThree();
  return <orbitControls args={[camera, gl.domElement]} />;
};

const Background = () => {
  const texture = useLoader(THREE.TextureLoader, "/autoshop.jpg");

  const { gl } = useThree();
  const formatted = new THREE.WebGLCubeRenderTarget(
    texture.image.height
  ).fromEquirectangularTexture(gl, texture);

  return <primitive attach="background" object={formatted}></primitive>;
};

const mainCanvas = () => {
  return (
    <Canvas>
      <Orbit />
      <Suspense fallback={null}>
        <Background />
      </Suspense>
    </Canvas>
  );
};

const Login = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (localStorage.access_token) {
      history.push("/");
    }
  }, []);

  const changePageHandler = (e) => {
    e.preventDefault();
    history.push("/register");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios("http://localhost:3001" + "/user/login", {
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
    <div>
      <div id="container-form">
        <img
          alt="container-login"
          src="https://image.freepik.com/free-vector/group-young-people-posing-photo_52683-18823.jpg"
        />
        <div className="form-container">
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
