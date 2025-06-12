import React, { useState } from "react";
import "./Signup.css";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Signup() {
  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passworError, setPassworError] = useState(false);

  const navigate = useNavigate();
  const userDetails = {
    name: "",
    email: "",
    password: "",
  };
  const [data, setData] = useState(userDetails);
  const handleInput = (e) => {
    const value = e.target.value;
    const name = e.target.name;

    setData({ ...data, [name]: value });
  };

  const handleSubmit = (e) => {
    let isValid = true;
    e.preventDefault();
    if (data.name.trim() === "") {
      setNameError(true);
      isValid = false;
    }
    if (data.email.trim() === "") {
      setEmailError(true);
      isValid = false;
    }
    if (data.password.trim() === "") {
      setPassworError(true);
      isValid = false;
    }

    if (!isValid) return;

    const getData = JSON.parse(localStorage.getItem("user") || "[]");
    const arr = [...getData, data];
    localStorage.setItem("user", JSON.stringify(arr));
    toast.success("Sign Up Successfully");
    navigate("/login");
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-container">
        <h2>Sign Up</h2>
        <form className="form-container" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            onChange={(e) => {
              setNameError(false);
              handleInput(e);
            }}
            className={nameError ? "input-error" : ""}
          />
          {nameError && (
            <span style={{ color: "red" }}>UserName is Required</span>
          )}
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={(e) => {
              setEmailError(false);
              handleInput(e);
            }}
            className={emailError ? "input-error" : ""}
          />
          {emailError && (
            <span style={{ color: "red" }}>email is Required</span>
          )}
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={(e) => {
              setPassworError(false);
              handleInput(e);
            }}
            className={passworError ? "input-error" : ""}
          />
          {passworError && (
            <span style={{ color: "red" }}>Password is Required</span>
          )}
          <button type="submit" onClick={handleSubmit}>
            Sign Up
          </button>
          <p>
            Already have an accout ? <Link to="/login">Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Signup;
