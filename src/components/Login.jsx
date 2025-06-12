/* import React, { useState } from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const [login, setLogin] = useState(false);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const [password, setPassword] = useState("");
  const handleInput = (e) => {
    let value = e.target.value;
    let name = e.target.name;

    if ("email" == name) {
      setEmail(value);
    }
    if ("password" == name) {
      setPassword(value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let userDetails = JSON.parse(localStorage.getItem("user"));

    userDetails.map((item) => {
      let storeEmail = item.email;
      let storePassword = item.password;

      if (storeEmail === email && storePassword === password) {
        alert("Login Succefully");
        navigate("/products");
        setLogin(true);
      } else {
        return setMsg("Invalid Credantaials");
      }
    });
  };

  return (
    <>
      <p>{msg}</p>
      <div className="auth-wrapper">
        <div className="auth-container">
          <h2>Login</h2>
          <form className="form-container" onSubmit={handleSubmit}>
            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={handleInput}
            />  
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleInput}
            />
            <button type="submit">Login</button>
            <p>
              No account yet? Sign up now! <Link to="/signup">Sign Up</Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
 */

import React, { useState } from "react";
import axios from "axios";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function () {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [userNameError, setUserNameError] = useState(false);
  const [usePassworError, setUsePassworError] = useState(false);

  const credentials = { username: username, password: password };

  const onSubmitHandler = (e) => {
    e.preventDefault();

    let isValid = true;

    if (username === "") {
      setUserNameError(true);
      isValid = false;
    }
    if (password === "") {
      setUsePassworError(true);
      isValid = false;
    }

    if (!isValid) return;

    axios
      .post("https://fakestoreapi.com/auth/login", credentials)
      .then((response) => {
        toast.success("Login successfully");
        localStorage.setItem("Mytoken", response.data.token);
        navigate("/products");
      })
      .catch(() => {
        toast.error("Login failed");
      });
  };

  return (
    <>
      <div className="auth-wrapper">
        <div className="auth-container">
          <h2>Login</h2>
          <form className="form-container">
            <input
              type="username"
              name="username"
              setUsePassworError
              placeholder="username"
              onChange={(e) => {
                setUsername(e.target.value), setUserNameError(false);
              }}
              className={userNameError ? "input-error" : ""}
            />
            {userNameError && (
              <span style={{ color: "red" }}>UserName is Required</span>
            )}
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={(e) => {
                setPassword(e.target.value), setUsePassworError(false);
              }}
              className={usePassworError ? "input-error" : ""}
            />
            {usePassworError && (
              <span style={{ color: "red" }}>Password is Required</span>
            )}
            <button type="submit" onClick={onSubmitHandler}>
              Login
            </button>
            <p>
              No account yet? Sign up now! <Link to="/signup">Sign Up</Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}
