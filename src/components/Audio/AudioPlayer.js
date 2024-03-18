import React from "react";

// Functional component for the audio player
const AudioPlayer = () => {
  return (
    <div className="audio-container">
      {/* Title */}
      <div className="title-music">Play music</div>
      <br />
      {/* Audio element with controls */}
      <audio controls>
        {/* Source of the audio file */}
        <source src="/summer.mp3" type="audio/mp3" />
        {/* Message displayed if the browser doesn't support audio */}
        Your browser does not support the audio element.
      </audio>
    </div>
  );
};

export default AudioPlayer; // Exporting the component
