import React from "react"
import model from "../assets/modal/rocket.glb"


export default function Model() {
    return (
        <div className="model_div">
            <model-viewer
                camera-orbit="-30deg auto auto" max-camera-orbit="auto 100deg auto" shadow-intensity="1" camera-controls touch-action="pan-y" disable-zoom 
                src={model}
                auto-rotate
                style={{ width: "600px", height: "600px"}}
            >
            </model-viewer>
        </div>
    )
}