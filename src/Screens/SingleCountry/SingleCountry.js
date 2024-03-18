import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import "./SingleCountry.css";

const SingleCountry = () => {
  const { countryId } = useParams();
  const [country, setCountry] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCountryDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/countries/${countryId}`
        );
        setCountry(response.data);
      } catch (error) {
        if (error.response && error.response.status === 404) {
          setError("Country not found");
        } else {
          setError("Error fetching country details");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchCountryDetails();
  }, [countryId]);

  let content;
  if (loading) {
    content = <div>Loading...</div>;
  } else if (error) {
    content = <div>{error}</div>;
  } else if (!country) {
    content = <div>No data available</div>;
  } else {
    content = (
      <div className="single-country-container">
        <h1 className="single-country">{country.name}</h1>
        <div className="description-container">
          <h2>Description</h2>
          <h3>{country.description}</h3>
        </div>
        <div className="date">
          <h2>Date</h2>
          <p>{new Date(country.date).toLocaleDateString()}</p>
        </div>
        <Link to="/blogScreen" className="back-button">
          Home
        </Link>
      </div>
    );
  }

  return <div>{content}</div>;
};

export default SingleCountry;
