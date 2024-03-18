import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./RegistrationForm.css";
import axios from "axios";

// RegistrationForm component to handle user registration
const RegistrationForm = () => {
  // State variables to hold the input values
  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");
  const [surname, setSurname] = useState("");
  const [address, setAddress] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(""); // State for showing password
  const [showConfirmPassword, setShowConfirmPassword] = useState(""); // State for showing confirm password
  const navigate = useNavigate(); // Hook for navigation

  // Function to handle registration process
  const handleRegistration = async (event) => {
    event.preventDefault();
    // Create user object with input values
    const user = {
      username,
      password,
      email,
      fullName,
      surname,
      address,
      dateOfBirth,
      phone,
    };
    try {
      // Send registration request to the server using axios
      const response = await axios.post(
        "http://localhost:8000/api/user/register",
        user
      );
      // Check if response data contains a token
      if (!response.data) {
        // Alert if no data received
        alert("No date fetched");
      }
      // Alert on successful registration
      alert("Registration successful");
      // Set token and user role in local storage
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("userRole", response.data.userRole);
      // Redirect to login form after successful registration
      navigate("/LoginForm");
    } catch (error) {
      // Alert if registration fails
      alert("Registration failed", error.message);
    }
  };

  // JSX structure for registration form
  return (
    <div className="registration-form-container">
      {/* Display registration form */}
      <h1 className="registration-title">Registration Form</h1>
      <form className="registration-form">
        {/* Input field for username */}
        <label>
          Username:{" "}
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <br />
        {/* Input field for full name */}
        <label>
          Name:{" "}
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
        </label>
        <br />
        {/* Input field for surname */}
        <label>
          Surname:{" "}
          <input
            type="text"
            id="surname"
            name="surname"
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
          />
        </label>
        <br />
        {/* Input field for address */}
        <label>
          Address:{" "}
          <input
            type="text"
            id="address"
            name="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </label>
        <br />
        {/* Input field for date of birth */}
        <label>
          Date of Birth:{" "}
          <input
            type="date"
            id="dateOfBirth"
            name="dateOfBirth"
            value={dateOfBirth}
            onChange={(e) => setDateOfBirth(e.target.value)}
          />
        </label>
        <br />
        {/* Input field for phone */}
        <label>
          Phone:{" "}
          <input
            type="tel"
            id="phone"
            name="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </label>
        <br />
        {/* Input field for email */}
        <label>
          Email:{" "}
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <br />
        {/* Input field for confirming email */}
        <label>
          Confirm Email:{" "}
          <input
            type="email"
            id="confirmEmail"
            name="confirmEmail"
            value={confirmEmail}
            onChange={(e) => setConfirmEmail(e.target.value)}
          />
        </label>
        <br />
        {/* Input field for password */}
        <label>
          Password:{" "}
          <input
            type={showPassword ? "text" : "password"} // Toggle input type based on showPassword state
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {/* Eye icon to toggle password visibility */}
          <span
            onClick={() => setShowPassword(!showPassword)}
            style={{ cursor: "pointer", marginLeft: "5px" }}
          >
            {showPassword ? "👁️" : "👁️‍🗨️"}
          </span>
        </label>
        <br />
        {/* Input field for confirming password */}
        <label>
          Confirm Password:{" "}
          <input
            type={showConfirmPassword ? "text" : "password"} // Toggle input type based on showConfirmPassword state
            id="confirmPassword"
            name="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          {/* Eye icon to toggle password visibility */}
          <span
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            style={{ cursor: "pointer", marginLeft: "5px" }}
          >
            {showConfirmPassword ? "👁️" : "👁️‍🗨️"}
          </span>
        </label>
        <br />
        {/* Button to trigger the registration process */}
        <button
          type="button"
          className="welcome-button"
          onClick={handleRegistration}
        >
          Register
        </button>
        {/* Support message */}
        <h2 className="support-message">
          If you need any assistance or have any questions, feel free to contact
          our support team
        </h2>
        {/* Button to navigate to the support center */}
        <button
          type="button"
          className="welcome-button"
          onClick={() => navigate("/SupportCenter")}
        >
          Support
        </button>
      </form>
    </div>
  );
};

export default RegistrationForm;
