import React, { MutableRefObject, useMemo, useRef, useState } from 'react';
import { Float, useGLTF } from '@react-three/drei';
import { GLTF } from 'three-stdlib';
import { Mesh } from 'three/src/objects/Mesh.js'
import { ShaderMaterial } from 'three';
import { useFrame } from '@react-three/fiber';
import { lerp } from 'three/src/math/MathUtils.js';
import { useAtom } from 'jotai';
import { glReady } from './ts/atoms';
import { Vector3 } from './ts/threeExport/math/Vector3';

type GLTFResult = GLTF & {
  nodes: {
    Shape_IndexedFaceSet001: Mesh;
  };
  materials: {};
  animations: any[];
};

// Shaders
const vertexShader = `
varying vec3 vPosition;
varying vec3 vNormal;

void main() {
    vNormal = normal;
    vPosition = position;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const fragmentShader = `
uniform float opacity; // Uniform for controlling the opacity of the mask
uniform vec3 uCameraPosition; // Uniform for camera position
uniform vec3 uLightDirection1; // Uniform for the first light direction
uniform vec3 uLightDirection2; // Uniform for the second light direction

varying vec3 vPosition;
varying vec3 vNormal;

void main() {
    // Calculate the view direction from the camera to the fragment
    vec3 viewDir = normalize(uCameraPosition - vPosition);

    // Calculate the diffuse lighting intensity based on the first light direction
    float diffuse1 = dot(normalize(vNormal), -uLightDirection1);
    diffuse1 = clamp(diffuse1, 0.0, 1.0); // Clamp to ensure it's within valid range

    // Calculate the diffuse lighting intensity based on the second light direction
    float diffuse2 = dot(normalize(vNormal), -uLightDirection2);
    diffuse2 = clamp(diffuse2, 0.0, 0.5); // Fainter light, adjust the range as necessary

    // Combine the two diffuse lighting intensities
    float diffuse = max(diffuse1, diffuse2); // Use max to combine the lighting effects

    // Define the center and radius of the spherical mask (adjust as needed)
    vec3 sphereCenter = vec3(0.7, 0.0, -1.4); // Center the sphere at the origin
    float sphereRadius = 1.6; // Adjust the radius as necessary
    float sphereFalloff = 0.3; // Adjust the falloff for a smoother transition

    // Calculate the distance from the current fragment to the sphere center
    float distance = length(vPosition - sphereCenter);

    // Apply the spherical mask with smooth falloff
    float sphereFade = smoothstep(sphereRadius - sphereFalloff, sphereRadius + sphereFalloff, distance);

    // Invert the mask
    float invertedMask = 1.0 - sphereFade;

    // Calculate the outline based on the view direction and diffuse lighting
    float rim = dot(normalize(vNormal), viewDir);
    rim = clamp(1.0 - abs(rim), 0.0, 1.0); // Adjust the Fresnel effect for outlining

    // Combine the outline effect with the inverted spherical mask and diffuse lighting
    float alpha = rim * invertedMask * diffuse * opacity;

    // Set the color directly without using colorFactor
    vec3 color = vec3(0.918, 1.0, 0.714); // Fixed color

    // Output the color with the computed alpha
    gl_FragColor = vec4(color, alpha);
}
`;


type HandProps = {
  scroll: MutableRefObject<number>;
  props?: JSX.IntrinsicElements['group'];
};

export function Model(props: HandProps) {
  const { nodes, materials } = useGLTF('/ghostHand.glb') as GLTFResult;
  const shaderRef = useRef<ShaderMaterial>(null);
  const [shaderCompiled, setShaderCompiled] = useAtom(glReady);
  const [opacity, setOpacity] = useState(1); // State to manage opacity

  const handleShaderCompiled = () => {
    setTimeout(() => {
      setShaderCompiled(true);
    }, 500);
  };

  const uniforms = useMemo(() => ({
    opacity: { value: 0.0 },
    uCameraPosition: { value: new Vector3(0, 1.5, 30) },
    uLightDirection1: { value: new Vector3(-20, 5, -15) },
    uLightDirection2: { value: new Vector3(-18, -20, 15) }
  }), [])

  useFrame(() => {
    if (shaderRef.current) {
      const targetOpacity = props.scroll.current > 0.015 ? 0 : 1;
      uniforms.opacity.value = lerp(uniforms.opacity.value, targetOpacity, 0.1);
      shaderRef.current.needsUpdate = true; // Ensure the shader material knows it needs updating
      shaderRef.current.uniformsNeedUpdate = true; // Ensure the shader material knows it needs updating
    }
  });

  return (
    <Float rotationIntensity={0.1} floatIntensity={0.1}>
      <group {...props} dispose={null}>
        <mesh geometry={nodes.Shape_IndexedFaceSet001.geometry} position={[0.65, 0.65, 0.038]} rotation={[2.3, 1.35, Math.PI / 4]}>
          {/* <boxGeometry args={[1, 1, 1]} /> */}
          <shaderMaterial
            attach="material"
            ref={shaderRef}
            uniforms={uniforms} // Pass opacity as a uniform
            fragmentShader={fragmentShader}
            vertexShader={vertexShader}
            transparent
            needsUpdate
            uniformsNeedUpdate
            onBuild={handleShaderCompiled}
          />
        </mesh>
      </group>
    </Float>
  );
}

useGLTF.preload('/ghostHand.glb');
