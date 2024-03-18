import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../Screens/Home/Home";
import LoginForm from "../Screens/LoginForm/LoginForm";
import RegistrationForm from "../Screens/RegistrationForm/RegistrationForm";
import BlogScreen from "../Screens/BlogScreen/BlogScreen";
import EditCountry from "../Screens/EditCountry/EditCountry";
import SupportCenter from "../Screens/SupportCenter/SupportCenter";
import AddCountry from "../Screens/AddCountry/AddCountry";
import SingleCountry from "../Screens/SingleCountry/SingleCountry";
import UserControlPanel from "../Screens/UserControlPanel/UserControlPanel";

const Navigator = () => {
  return (
    <Router>
      <div>
        <Routes>
          {/* Route for the Home screen */}
          <Route path="/" element={<Home />} />

          {/* Route for the Login Form */}
          <Route path="/LoginForm" element={<LoginForm />} />

          {/* Route for the Registration Form */}
          <Route path="/RegistrationForm" element={<RegistrationForm />} />

          {/* Route for a Single Country */}
          <Route path="/SingleCountry/:countryId" element={<SingleCountry />} />

          {/* Route for the Blog Screen */}
          <Route path="/BlogScreen" element={<BlogScreen />} />

          {/* Route for Edit Country */}
          <Route path="/EditCountry/:countryId" element={<EditCountry />} />

          {/* Route for Add Country */}
          <Route path="/AddCountry" element={<AddCountry />} />

          {/* Route for Support Center */}
          <Route path="/SupportCenter" element={<SupportCenter />} />
          {/* Route for control panel*/}
          <Route path="/UserControlPanel" element={<UserControlPanel />} />
        </Routes>
      </div>
    </Router>
  );
};

export default Navigator;
