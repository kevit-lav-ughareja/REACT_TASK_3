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
