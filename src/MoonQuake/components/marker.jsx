import { useState } from "react";
import { Html } from "@react-three/drei";

export default function Marker({ children, ...props }) {
  const [occluded, occlude] = useState();
  return (
    <Html
      position={[0, 0, 0.3]}
      occlude
      onOcclude={occlude}
      distanceFactor={2.5}
      zIndexRange={[10, 0]}
      sprite={true}
      center
      style={{
        transition: "all 0.2s",
        opacity: occluded ? 0 : 1,
        transform: `scale(${occluded ? 0.05 : 1})`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "red", // Set the background color to red (you can change it)
        color: "white", // Set the text color to white (you can change it)
        borderRadius: "50%", // Make it a circle
        width: "30px", // Adjust the width and height as needed
        height: "30px",
        cursor: "pointer",
      }}
      {...props}
    >
      {children}
    </Html>
  );
}
