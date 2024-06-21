import { shaderMaterial, useTexture } from "@react-three/drei";
import { extend, useFrame } from "@react-three/fiber";
import { FC, useMemo, useRef } from "react";
import { Color, Texture } from "three";



interface NeuronProps {

}




const vertex = `
varying vec2 vUv;
varying vec4 vWorldPosition;

void main() {
  vUv = uv;
  vWorldPosition = modelViewMatrix * vec4(position, 1.0);
  gl_Position = projectionMatrix * vWorldPosition;
}
`;

const fragment = `
uniform sampler2D texture1;
uniform vec3 outlineColor;
uniform float outlineThreshold;

varying vec2 vUv;
varying vec4 vWorldPosition;

void main() {
  // Calculate the edge factor for the outline
  float edgeFactor = length(fwidth(vWorldPosition.xyz));
  float outline = smoothstep(0.0, outlineThreshold, edgeFactor);

  // Sample the texture using UV coordinates
  vec4 texColor = texture2D(texture1, vUv);

  // Mix the outline color and texture color
  vec4 outlineMask = mix(vec4(outlineColor, 1.0), texColor, outline);

  // Discard fragments outside the model
  if (texColor.a < 0.1) discard;

  gl_FragColor = outlineMask;
}

    `;


const Neuron: FC<NeuronProps> = () => {
    const texture = useTexture("/images/landing_braincare.png")
    const uniforms = useMemo(() => ({
        texture1: { value: texture },
        outlineColor: { value: new Color(0.0, 0.0, 0.0) },
        outlineThreshold: { value: 0.1 },
    }), [])


    useFrame(() => {
        uniforms.texture1.value = texture;
    });

    const neuronMaterial = <shaderMaterial
        uniforms={uniforms}
        fragmentShader={fragment}
        vertexShader={vertex}
        needsUpdate
        transparent
    />

    return (<mesh position={[-10, -2, 0]}>
        <sphereGeometry args={[6, 30, 30]} />
        {/* <meshBasicMaterial color={"lime"} /> */}
        {neuronMaterial}
    </mesh>);
}

export default Neuron;