import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth/AuthContext";
import swal from "sweetalert";
import "./login.css";

const Login = () => {
  const [user, setUser] = useState({
    password: "",
    email: "",
  });
  const navigate = useNavigate();
  const { setUserId, setUserName } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "https://premium-app-vha0.onrender.com/api/user/login",
        user
      );
      localStorage.setItem("userId", res.data.user._id);
      localStorage.setItem("username", res.data.user.username);
      // console.log(res.data)
      setUserId(res.data.user._id);
      setUserName(res.data.user.username);
      swal({
        title: "Login Succesfully",
        icon: "success",
        buttons: false,
        timer: 1000,
      });
      setTimeout(() => {
        navigate("/");
      }, 1500);
    } catch (error) {
      swal({
        title: "Email or password is invalid!",
        icon: "error",
        buttons: false,
        timer: 2000,
      });
    }
  };
  return (
    <div className="outer-div">
      <div className="login-form">
        <form>
          <div className="title">Login to your account</div>
          <div className="input-container">
            <label>Email </label>
            <input
              type="email"
              name="email"
              onChange={(e) => handleChange(e)}
              required
            />
          </div>
          <div className="input-container">
            <label>Password </label>
            <input
              type="password"
              name="password"
              onChange={(e) => handleChange(e)}
              required
            />
          </div>
          <div className="check-box">
            <input type="checkbox" value="lsRememberMe" id="rememberMe" />{" "}
            <label for="rememberMe">Remember me</label>
          </div>
          <div className="button-container">
            <input
              onClick={(e) => {
                handleLogin(e);
              }}
              type="submit"
            />
          </div>
          <p className="bottom-para">
            New to MyApp? <a href="/">Sign Up</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
