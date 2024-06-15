import * as THREE from 'three';
import React, { MutableRefObject, useMemo, useRef, useState } from 'react';
import { Float, useGLTF } from '@react-three/drei';
import { GLTF } from 'three-stdlib';
import { shaderMaterial } from '@react-three/drei';
import { ShaderMaterial } from 'three';
import { useFrame } from '@react-three/fiber';
import { lerp } from 'three/src/math/MathUtils.js';
import { useAtom } from 'jotai';
import { glReady } from './ts/atoms';

type GLTFResult = GLTF & {
  nodes: {
    Shape_IndexedFaceSet001: THREE.Mesh;
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

varying vec3 vPosition;
varying vec3 vNormal;

void main() {
    // Calculate the Fresnel effect (inverted)
    float rim = dot(normalize(vNormal), normalize(vec3(0.0, -1.0, 0.0)));
    rim = pow(rim, 6.0); // Adjust the power for the Fresnel effect

    // Define the center and radius of the spherical mask
    vec3 sphereCenter = vec3(0.7, 0.0, -1.4); // Adjust the x-coordinate to move the sphere to the left side
    float sphereRadius = 1.5; // Adjust the radius as necessary
    float sphereFalloff = 0.5; // Adjust the falloff for a smoother transition

    // Calculate the distance from the current fragment to the sphere center
    float distance = length(vPosition - sphereCenter);

    // Apply the spherical mask with smooth falloff
    float sphereFade = smoothstep(sphereRadius - sphereFalloff, sphereRadius + sphereFalloff, distance);

    // Invert the mask
    float invertedMask = 1.0 - sphereFade;

    // Combine the Fresnel effect and the inverted spherical mask with the opacity uniform
    float alpha = rim * invertedMask * opacity;

    // Set the color directly without using colorFactor
    vec3 color = vec3(0.918, 1.0, 0.714); // Fixed color
    // Optionally, you can adjust color based on other conditions

    gl_FragColor = vec4(color, alpha); // Set the color with the computed alpha
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
    opacity: { value: 0.0 }
  }), [])

  useFrame(() => {
    if (shaderRef.current) {
      const targetOpacity = props.scroll.current > 0.025 ? 0 : 1;
      uniforms.opacity.value = lerp(uniforms.opacity.value, targetOpacity, 0.1);
      shaderRef.current.needsUpdate = true; // Ensure the shader material knows it needs updating
      shaderRef.current.uniformsNeedUpdate = true; // Ensure the shader material knows it needs updating
    }
  });

  return (
    <Float rotationIntensity={0.1} floatIntensity={0.1}>
      <group {...props} dispose={null}>
        <mesh geometry={nodes.Shape_IndexedFaceSet001.geometry} position={[0.65, 0.65, 0.038]} rotation={[1.4, 1.369, Math.PI / 1.9]}>
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
