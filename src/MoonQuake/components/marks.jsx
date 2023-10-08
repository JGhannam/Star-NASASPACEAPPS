import React, { useState } from "react";
import data from "../assets/data";
import Marker from "./marker";

export default function Marks(props) {
  const box = data.map((rocket) => {
    //code to convert 2d coordinates to 3d coordinates
    var lat = rocket.lat;
    var lon = rocket.lon;
    var phi = (90 - lat) * (Math.PI / 180);
    var theta = (lon + 180) * (Math.PI / 180);
    var x = -(Math.sin(phi) * Math.cos(theta));
    var z = Math.sin(phi) * Math.sin(theta);
    var y = Math.cos(phi);
    // passing names in props
    var name = rocket.name;

    return (
      <mesh visible position={[1.1 + x, y, z]} layers={0}>
        <group
          position={[-0.8 + x, y, z]}
          rotation={[0, 0, Math.PI]}
          layers={1}
        >
          <Marker rotation={[0, Math.PI / 2, Math.PI / 2]} castShadow={true}>
            <h1 onClick={props.onClick}>{name}</h1>
          </Marker>
        </group>
      </mesh>
    );
  });
  return (
    <>
      <group>{box}</group>
    </>
  );
}
