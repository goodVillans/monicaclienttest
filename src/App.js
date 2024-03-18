// App.js
import React from "react";
import Navigator from "./Navigator/Navigator";
import AudioPlayer from "./components/Audio/AudioPlayer";
import Copyright from "./components/footer/footer";
const App = () => {
  return (
    <div>
      {/* Title */}
      <div className="title-app">
        Discover the Travel App! It's your gateway to easy adventure. Track your
        trips effortlessly and plan new ones in a breeze. Your next journey is
        just a tap away!
      </div>
      <br />
      {/* Navigation */}
      <Navigator />
      <br />
      <br />
      {/* Audio Player */}
      <AudioPlayer />
      <br />
      {/* Footer */}
      <Copyright />
    </div>
  );
};

export default App;
