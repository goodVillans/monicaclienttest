import React, { useState } from "react";
import { Alert, Button, Form } from "react-bootstrap";
import "./AddCountry.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AddCountry = () => {
  // States to manage country data
  // State for country name
  const [countryName, setCountryName] = useState("");
  // State for country description
  const [countryDescription, setCountryDescription] = useState("");
  // State for selected date
  const [selectedDate, setSelectedDate] = useState("");
  // State for alert message
  const [alertMessage, setAlertMessage] = useState("");
  // State for alert type
  const [alertType, setAlertType] = useState("success");

  // Use navigate from react-router-dom to navigate to different pages
  const navigate = useNavigate();

  // Function to handle adding the country
  const handleAddCountry = async () => {
    // Validate country name, description, date, and image
    if (!countryName || !countryDescription || !selectedDate) {
      // Set alert message
      setAlertMessage("Please fill in all fields.");
      // Set alert type
      setAlertType("danger");
      return;
    }
    // Extract data from states
    const name = countryName;
    const description = countryDescription;
    const date = selectedDate;
    // Add logic to save country data to backend or state
    try {
      //logic to save country data to backend or state
      await axios.post("http://localhost:8000/api/countries/", {
        name: name,
        description: description,
        date: date,
      });
      // Show success message
      alert("Country added successfully");
      navigate("/blogScreen");
      // Redirect to blog screen
    } catch (error) {
      console.error("Error add country", error);
      // Show error message
      alert("Failed to add country");
    }
  };

  return (
    <div className="add-country-container">
      <h1>Add Country</h1>
      {/* Display an alert if there is a message */}
      {alertMessage && (
        <Alert
          variant={alertType}
          onClose={() => setAlertMessage("")}
          dismissible
        >
          {alertMessage}
        </Alert>
      )}

      {/* Country Form */}
      <Form>
        <Form.Group controlId="countryName">
          <Form.Label>Country Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter country name"
            value={countryName}
            onChange={(e) => setCountryName(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="countryDescription">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Enter country description"
            value={countryDescription}
            onChange={(e) => setCountryDescription(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="selectedDate">
          <Form.Label>Date</Form.Label>
          <Form.Control
            type="date"
            placeholder="Select date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          />
        </Form.Group>
        {/* Button to add country */}
        <Button variant="success" onClick={handleAddCountry}>
          Add
        </Button>
      </Form>
    </div>
  );
};

export default AddCountry;
