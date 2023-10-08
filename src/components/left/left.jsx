import React, { useState } from "react";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { fileToBase64 } from "react-file-base64";

//replica
import Replicate from "replicate";


// Control Room
import ControlRoom from "../controlroom/controlroom";

//css
import "./left.scss";
import ModelViewerWrapper from "../ModelViewer/ModelViewer";
import { useSelector } from "react-redux";

export default function Left() {
  const modelName = useSelector((state) => state.model.name);
  const [alignment, setAlignment] = useState("SpaceShip");
  const [image, setImage] = useState(null);
  const [prediction, setPrediction] = useState(null);

  const replicate = new Replicate({
    auth: "r8_KNCO2lvcg3TKg6JvcZLKICQxa2oNPXW4H2wOM",
  });

  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    fileToBase64(file).then((base64) => {
      setImage(base64);
    });
  };

  const upscaler = async () => {
    const prediction = await replicate.predictions.create({
      version:
        "660d922d33153019e8c263a3bba265de882e7f4f70396546b6c9c8f9d47a021a",
      input: {
        image: image,
      },
      webhook: "https://example.com/your-webhook",
      webhook_events_filter: ["completed"],
    });
    setPrediction(prediction);
  };

  return (
    <>
      {/* <ToggleButtonGroup
        value={alignment}
        exclusive
        onChange={handleChange}
        aria-label="Platform"
        sx={{
          height: "50px",
          backgroundColor: "#5616f7",
          borderRadius: "10px",
          position: "absolute",
          right: "0px",
        }}
      >
        <ToggleButton
          value="Upscaler"
          sx={{
            color: "white",
            fontSize: "20px",
            fontWeight: "bold",
            fontFamily: "monospace",
          }}
        >
          Upscaler
        </ToggleButton>
        <ToggleButton
          value="SpaceShip"
          sx={{
            color: "white",
            fontSize: "20px",
            fontWeight: "bold",
            fontFamily: "monospace",
          }}
        >
          SpaceShip
        </ToggleButton>
      </ToggleButtonGroup> */}
      {/* {alignment === "Upscaler" ? (
        <div className="Upscaler">
          <h1>Upscaler</h1>
          <p>Upscaler is a tool that uses AI to upscale images.</p>

          <input type="file" onChange={handleImageUpload} />

          <button onClick={upscaler}> Upscale </button>

          {prediction && (
            <img src={prediction.output.image} alt="Upscaled image" />
          )}
        </div>
      ) : ( */}
      <ControlRoom />
      <div className="SpaceShip">
        <h1>SpaceShip</h1>
        <p
          style={{
            color: modelName === "model" ? "green" : "red",
          }}
        >
          Error In Part: {modelName === "model" ? "None" : modelName}
        </p>
        <ModelViewerWrapper color="red" />
      </div>
      {/* )} */}
    </>
  );
}
