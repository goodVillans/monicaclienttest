import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./BlogScreen.css";
import image from "../../images/wo.png";

const BlogScreen = () => {
  const navigate = useNavigate();
  // Function to navigate to User Control Panel
  const navigateToControlPanel = () => {
    navigate("/UserControlPanel");
  };
  // Get user role from local storage
  const userRole = localStorage.getItem("userRole");
  return (
    <div className="blog-container">
      {/* Title */}
      <h1>Countries</h1>
      {/* Display an image related to countries */}
      <div className="image-container">
        <img src={image} alt="img" className="img" />
      </div>
      {/* Prompt the user to log in or sign up */}
      <h2 className="log-message">Log in or sign up</h2>
      {/* Render the list of countries, country input form, and logout button */}
      <Countries />
      <CountryInput />
      {/* MANAGE USER ROLES */}
      <div>
        {userRole === "admin" && (
          <button
            onClick={navigateToControlPanel}
            className="admin-panel-button"
          >
            User Control Panel
          </button>
        )}
      </div>
      <br />
      <LogoutButton />
    </div>
  );
};

// Component to display the list of countries
const Countries = () => {
  const [countries, setCountries] = useState([]);
  const navigate = useNavigate();

  // Function to fetch countries from the backend
  const getCountries = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/countries/");
      if (response.status !== 200) {
        throw new Error("Failed to get all countries");
      }
      setCountries(response.data);
    } catch (error) {
      console.error("Error getting countries", error);
      alert("Failed to get countries");
    }
  };

  // Fetch countries when the component mounts
  useEffect(() => {
    getCountries();
  }, []);

  // Function to delete a country
  const deleteCountry = async (countryId) => {
    if (localStorage.getItem("userRole") === "normal") {
      alert("You don't have permission to delete");
    }
    try {
      const token = localStorage.getItem("token");
      const response = await axios.delete(
        `http://localhost:8000/api/countries/${countryId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status !== 200) {
        throw new Error(`Failed to delete`);
      }
      // Update the state to reflect the deletion
      setCountries((prevCountries) =>
        prevCountries.filter((country) => country._id !== countryId)
      );
    } catch (error) {
      console.error(`Error deleting country`, error);
    }
  };

  // Render the list of countries
  if (!countries || countries.length === 0) {
    return <p>No Countries</p>;
  }

  // Function to handle click on a country, navigates to single country view
  const handleCountryClick = (countryId) => {
    navigate(`/SingleCountry/${countryId}`);
  };

  return (
    <ul>
      {/* Map through countries and render list items */}
      {countries.map((country) => (
        <li key={country._id} className="country-info">
          {/* Display country name and make it clickable to view details */}
          <span onClick={() => handleCountryClick(country._id)}>
            {country.name}
          </span>
          {localStorage.getItem("userRole") === "admin" && (
            <>
              {" "}
              {/* Link to edit country */}
              <Link to={`/EditCountry/${country._id}`}>
                <button className="edit-link">Edit</button>
              </Link>
              {/* Button to delete country */}
              <button
                onClick={() => deleteCountry(country._id)}
                className="delete-link"
              >
                Delete
              </button>
            </>
          )}
        </li>
      ))}
    </ul>
  );
};

// Component to render country input form
const CountryInput = () => {
  const navigate = useNavigate();

  // Function to navigate to Add Country page
  const handleClick = () => {
    navigate("/addCountry");
  };

  return (
    <div className="country-input-container">
      {/* Button to add country */}
      <button className="add-link" onClick={handleClick}>
        ADD COUNTRY
      </button>
    </div>
  );
};

// Component for logout button
const LogoutButton = () => {
  const navigate = useNavigate();

  // Function to handle logout
  const handleLogout = () => {
    // Redirect to login page after logout
    navigate("/loginForm");
  };

  return (
    <div>
      <br />
      {/* Button to log out */}
      <button className="out-button" onClick={handleLogout}>
        LOGOUT
      </button>
    </div>
  );
};

export default BlogScreen;
