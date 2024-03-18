import React from "react";

// Functional component for displaying copyright information
const Copyright = () => {
  // Get the current year
  const currentYear = new Date().getFullYear();

  return (
    // Footer section for copyright
    <footer className="copyright">
      {/* Display copyright information */}
      <p>&copy; {currentYear} Travel App. Monica Carta. All rights reserved.</p>
    </footer>
  );
};

export default Copyright; // Exporting the component
