import { Sphere } from "@react-three/drei";
import { TextureLoader } from "three/src/loaders/TextureLoader";
import React from "react";
import galaxyTexture from "../assets/img/galaxy_4k.png";
import { useLoader } from "@react-three/fiber";
import { BackSide } from "three";

export default function MappedMoon() {
  const colorMap = useLoader(TextureLoader, galaxyTexture);
  return (
    <>
      <mesh layers={1}>
        <Sphere args={[80, 64, 64]}>
          <meshBasicMaterial
            map={colorMap}
            side={BackSide}
            transparent={true}
          />
        </Sphere>
      </mesh>
    </>
  );
}
