import React, { useState } from "react";
import "./SupportCenter.css";
import { useNavigate } from "react-router-dom";

// Support Center component for contacting support
const SupportCenter = () => {
  // State variables for the message form
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your logic to handle message submission (e.g., send it to your backend server)
    console.log("Message submitted:", { name, email, message });
    // Clear form fields after submission
    setName("");
    setEmail("");
    setMessage("");
    // Show success message
    alert("Message sent successfully!");
    // Redirect to home page
    navigate("/");
  };

  return (
    <div className="support-container">
      {/* Support Center title */}
      <h1 className="support-title">Support Center</h1>
      {/* Contact information section */}
      <h2>Contact Information</h2>
      <p>For assistance,</p>
      <p>you can reach us at the following numbers:</p>
      <ul>
        <br />
        <br />
        <li>Support: 123-456-7890</li>
        <li>Technical Support: 987-654-3210</li>
        <br />
        <br />
      </ul>
      {/* Message form section */}
      <h2>Send a Message</h2>
      <form onSubmit={handleSubmit}>
        {/* Input field for name */}
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <br />
        {/* Input field for email */}
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <br />
        {/* Input field for message */}
        <label>
          Message:
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </label>
        <br />
        {/* Button to submit the form */}
        <button type="submit">Send Message</button>
        <br />
        {/* Button to navigate to home */}
        <button onClick={() => navigate("/")}>Exit</button>
      </form>
    </div>
  );
};

export default SupportCenter;
