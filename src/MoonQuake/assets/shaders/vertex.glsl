import { Shaders, Node, GLSL } from "gl-react";

void main() {
    gl_position =vec4()[1,0,0,1]; //x,y,z,translate
}

const vertextShader = Shaders.create({
  color: {
    frag: GLSL`
precision highp float;
varying vec2 uv;
uniform float blue;
void main() {
    gl_position =vec4()[1,0,0,1]; 
}`
  }
});