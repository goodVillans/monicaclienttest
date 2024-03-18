import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./LoginForm.css";

const LoginForm = () => {
  // State variables to manage username, password, and navigation
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // Initialize useNavigate hook for navigation
  const navigate = useNavigate();

  // Function to handle login process
  const handleLogin = async () => {
    try {
      // Sending login request to server using axios
      const response = await axios.post(
        "http://localhost:8000/api/user/login",
        {
          username,
          password,
        }
      );

      // Check if response data contains a token
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("userRole", response.data.userRole);
      // Navigate to BlogScreen if login is successful
      navigate("/BlogScreen");
    } catch (error) {
      // Logging error if unable to fetch response data
      console.error("Login Failed:", error);
      // Alert user if login fails
      alert("An error occurred during login. Please try again later.");
    }
  };

  return (
    <div className="login-form-container">
      {/* Title for the login form */}
      <h1 className="login-title">Login Form</h1>
      {/* Form for username, password, and login button */}
      <form className="login-form">
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="login-input"
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="login-input"
          />
        </label>
        <br />
        {/* Button to initiate login process */}
        <button type="button" onClick={handleLogin} className="login-button">
          Login
        </button>
        <br />
        {/* Link to navigate to the registration form */}
        <Link to="/RegistrationForm" className="registration-link">
          Don't have an account? Sign Up
        </Link>
      </form>
    </div>
  );
};

export default LoginForm;
