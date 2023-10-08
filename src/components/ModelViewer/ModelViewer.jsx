import React, { useEffect, useRef } from "react";
import { Canvas, extend, useFrame } from "@react-three/fiber";
import { Html, OrbitControls } from "@react-three/drei"; // Import Html component
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import * as THREE from "three";
import { useDispatch, useSelector } from "react-redux";
import { addError, setAddedErrors } from "../../redux/reducers/modelSlice";
import { useNavigate } from "react-router-dom";

extend({ OrbitControls });

function ModelViewer() {
  const navigate = useNavigate();
  const modelName = useSelector((state) => state.model.name);
  const AddedErrors = useSelector((state) => state.model.addedErrors);
  const dispatch = useDispatch();
  // Use useSelector to access the modelName from the Redux store
  // const modelName = useSelector((state) => state.model.modelName);
  const gltfRef = useRef();
  const partRef = useRef();

  useEffect(() => {
    const loader = new GLTFLoader();
    loader.load("/model/model.glb", (gltf) => {
      gltf.scene.scale.set(0.4, 0.4, 0.4);
      gltf.scene.position.set(0, 0, 0);
      gltf.scene.rotation.set(0, 0, 0);

      // Change the color here
      const redColor = new THREE.Color(1, 0, 0);

      gltf.scene.traverse((child) => {
        if (!AddedErrors) {
          dispatch(addError(child.name));
        }

        if (modelName !== "model") {
          if (child.type === "Mesh" && child.name === modelName) {
            // Choose your component here
            if (child.material) {
              child.material.color = redColor;
              // const { x, y, z } = child.position;
              // gltf.scene.position.set(x, y, z - 1);
            }
            partRef.current = child;
          }
        }
      });
      gltfRef.current = gltf.scene;
      dispatch(setAddedErrors(true));
    });
  }, [modelName]);

  return (
    <>
      <ambientLight intensity={0.8} />
      <directionalLight color={0xffffff} intensity={2} position={[1, 2, 2]} />
      {gltfRef.current && <primitive object={gltfRef.current} />}
      <OrbitControls
        enableDamping
        dampingFactor={0.05}
        rotateSpeed={0.5}
        enableZoom={false}
        enablePan={false}
      />

      <mesh
        position={[6, 3, 0]}
        onClick={() => {
          navigate("/moon");
        }}
      >
        <sphereGeometry args={[0.6, 34, 34]} />
        <meshBasicMaterial
          map={new THREE.TextureLoader().load("/model/moon.jpg")}
        />
        <pointLight position={[10, 10, 10]} />
      </mesh>

      {Array(100)
        .fill()
        .map((_, i) => (
          <mesh
            key={i}
            position={[
              Math.random() * 100 - 50,
              Math.random() * 100 - 50,
              Math.random() * 100 - 50,
            ]}
          >
            <sphereGeometry args={[0.1, 32, 32]} />
            <meshBasicMaterial color={0xffffff} />
          </mesh>
        ))}
    </>
  );
}

export default function ModelViewerWrapper() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5.5] }}
      style={{
        height: "500px",
      }}
    >
      <ModelViewer />
    </Canvas>
  );
}
