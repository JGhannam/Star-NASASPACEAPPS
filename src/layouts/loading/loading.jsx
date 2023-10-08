import React from "react";

//css
import "./loading.scss";

//lottie
import { Player } from "@lottiefiles/react-lottie-player";

function Loading() {
  return (
    <div className="loadingContainer">
      <Player
        src="https://lottie.host/5b366e33-2a1b-44d9-b91a-1be61c8770b1/4MBNxP9naB.json"
        background="transparent"
        className="Animation"
        speed="1"
        loop
        autoplay
        style={{ height: "500px", width: "500px" }}
      />
      <h1>Loading</h1>
    </div>
  );
}

export default Loading;
