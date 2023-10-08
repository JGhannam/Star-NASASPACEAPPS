import React, { Suspense } from "react";
import { OrbitControls, OrthographicCamera, Preload } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import Moon from "../components/mappedMoon";
import Stars from "../components/stars";
import Marks from "../components/marks";
import { useNavigate } from "react-router-dom";

export default function Canvas_moon() {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1); // Navigate back to the previous page
  };

  return (
    <div style={{ width: "100%", height: "100%", margin: 0, padding: 0 }}>
      {/* Back Button */}
      <button
        onClick={handleBackClick}
        style={{
          position: "absolute",
          top: "10px",
          left: "10px",
          zIndex: 1000,
        }}
      >
        <i
          class="fas fa-arrow-left"
          style={{
            color: "white",
            fontSize: "16px",
            marginRight: "10px",
          }}
        ></i>
        Back
      </button>
      {/* Canvas */}
      <Canvas
        className=""
        style={{
          height: "100vh", // Full viewport height
          width: "100vw", // Full viewport width
          display: "block", // Remove any default inline styles
        }}
      >
        <Suspense>
          <OrthographicCamera position={[0, 0, 0]} rotation={[0, 10, 0]}>
            <Suspense>
              <OrbitControls
                autoRotate={true}
                enableZoom={false}
                autoRotateSpeed={0.6}
                minPolarAngle={Math.PI / 1.8}
                maxPolarAngle={Math.PI / 1.8}
              />
              <ambientLight
                intensity="0.06"
                enableShadow={true}
                dropShadows={true}
              />
              <directionalLight position={[190, 80, 10]} intensity={0.6} />
              <Moon />
              <Stars />
              <Marks />
              <Preload all />
            </Suspense>
          </OrthographicCamera>
        </Suspense>
      </Canvas>
    </div>
  );
}
