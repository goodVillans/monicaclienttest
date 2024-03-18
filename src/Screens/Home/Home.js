import React from "react";
import { Link } from "react-router-dom";
// Import CSS styles for the Home component
import "./Home.css";
// Import image for page
import image from "../../images/destination.jpeg";
import planeImage from "../../images/plane.png";

const Home = () => {
  return (
    <div className="app-container">
      <div className="welcome-container">
        {/* Display a welcoming title */}
        <h1 className="welcome-title">Travel-Experience</h1>
        {/* Display an image related to tasks */}
        <div className="image-container">
          <img src={image} alt="img" className="world" />
        </div>
        <br />
        {/* Prompt the user to log in or sign up */}
        <h2 className="log-message">Log in or sign up</h2>
        <img src={planeImage} alt="img" className="plane" />
        {/* Provide options to log in or sign up */}
        <br />
        <div className="welcome-options">
          {/* Link to navigate to the login form */}
          <Link to="/LoginForm" className="welcome-link">
            {/* Button to navigate to login form */}
            <button className="welcome-button">Login</button>
          </Link>
          {/* Link to navigate to the registration form */}
          <Link to="/RegistrationForm" className="welcome-link">
            {/* Button to navigate to registration form */}
            <button className="welcome-button">Sign Up</button>
          </Link>
        </div>
        {/* Message for user support */}
        <h4>
          If you need any assistance or have any questions,
          <br />
          feel free to contact our support team
        </h4>
        {/* Add the link to the support page */}
        <Link to="/SupportCenter" className="welcome-link">
          <button className="support-link">Support</button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
