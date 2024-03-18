import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Form, Button, Alert } from "react-bootstrap";
// Importing CSS file for styling
import "./EditCountry.css";
// Importing image for illustration
import editImage from "../../images/pass.png";
import axios from "axios";

const EditCountry = () => {
  // Get the countryId from the URL params
  const { countryId } = useParams();
  // Navigation function
  const navigate = useNavigate();

  // State variables to manage country data and form inputs
  const [country, setCountry] = useState(null);
  const [editedCountryName, setEditedCountryName] = useState("");
  const [editedCountryDescription, setEditedCountryDescription] = useState("");
  const [editedDate, setEditedDate] = useState("");
  const [alertMessage, setAlertMessage] = useState(""); // State for alert message
  const [alertType, setAlertType] = useState("success"); // State for alert type

  // Fetch country data based on the countryId
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/countries/${countryId}`
        );
        console.log(response.data);
        // Update state with fetched country data
        setCountry(response.data);
        setEditedCountryName(response.data.name);
        setEditedCountryDescription(response.data.description);
        setEditedDate(
          new Date(response.data.date).toISOString().substring(0, 10)
        );
      } catch (error) {
        console.error("Error fetching country data:", error);
      }
    };
    // Fetch data when the countryId changes
    fetchData();
    // Fetch data when the countryId changes
  }, [countryId]);

  // Function to update country data
  const updateCountryData = async (updatedCountry) => {
    try {
      const token = localStorage.getItem("token");
      console.log(token);
      // Send PUT request to update country data
      await axios.put(
        `http://localhost:8000/api/countries/${countryId}`,
        updatedCountry,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // Set alert message for success
      setAlertMessage("Country updated successfully!");
      // Redirect to the country list page
      navigate("/blogScreen");
    } catch (error) {
      console.error("Error updating country data:", error);
      // Displaying an error message if update fails
      alert("An unexpected error occurred. Please try again later.");
      // Set alert type to 'danger' for error
      setAlertType("danger");
    }
  };

  // Handle saving changes to the country data
  const handleSaveChanges = () => {
    // Validate input fields
    if (!editedCountryName.trim() || !editedCountryDescription.trim()) {
      alert("Please fill in all fields.");
      // Set alert type to 'danger' for validation error
      setAlertType("danger");
      return;
    }

    // Create an updated country object with the new data
    const updatedCountry = {
      ...country,
      name: editedCountryName,
      description: editedCountryDescription,
      date: editedDate,
    };

    // Call the function to update country data
    updateCountryData(updatedCountry);

    // Redirect to the country list page using navigate
    navigate("/BlogScreen");

    // Display a success message
    alert("Country details updated successfully!");
  };

  // Render the component
  if (!country) {
    return <div>Loading...</div>; // Render a loading message if country data is not yet available
  }

  return (
    <div className="edit-country-container">
      {/* Title */}
      <h1 className="title">Edit Country</h1>
      <div>
        <img src={editImage} alt="img" className="edit-image" />
      </div>
      {/* Display alert message if available */}
      {alertMessage && (
        <Alert
          variant={alertType}
          onClose={() => setAlertMessage("")}
          dismissible
        >
          {alertMessage}
        </Alert>
      )}
      {/* Country form */}
      <Form>
        {/* Input field for country name */}
        <Form.Group controlId="editedCountryName">
          <Form.Label>Country Name</Form.Label>
          <Form.Control
            className="name-input"
            type="text"
            placeholder="Enter country name"
            value={editedCountryName}
            onChange={(e) => setEditedCountryName(e.target.value)}
          />
        </Form.Group>
        {/* Input field for country description */}
        <Form.Group controlId="editedCountryDescription">
          <Form.Label>Country Description</Form.Label>
          <Form.Control
            className="description-input"
            as="textarea"
            rows={3}
            placeholder="Enter country description"
            value={editedCountryDescription}
            onChange={(e) => setEditedCountryDescription(e.target.value)}
          />
        </Form.Group>
        {/* Input field for date */}
        <Form.Group controlId="selectedDate">
          <Form.Label>Date</Form.Label>
          <Form.Control
            className="date-input"
            type="date"
            placeholder="Select date"
            value={editedDate}
            onChange={(e) => setEditedDate(e.target.value)}
          />
        </Form.Group>
        {/* Button to save changes */}
        <Button variant="success" onClick={handleSaveChanges}>
          Save Changes
        </Button>
      </Form>
    </div>
  );
};

export default EditCountry;
