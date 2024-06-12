/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.18 public/ghostHand.glb --types --output src/GhostHand.tsx 
*/

import * as THREE from 'three'
import React, { MutableRefObject, useRef, useState } from 'react'
import { Float, useGLTF } from '@react-three/drei'
import { GLTF } from 'three-stdlib'
import { shaderMaterial } from '@react-three/drei';
import { ShaderMaterial } from 'three';
import { useFrame } from '@react-three/fiber';
import { lerp } from 'three/src/math/MathUtils.js';
import { useAtom } from 'jotai';
import { glReady } from './ts/atoms';

type GLTFResult = GLTF & {
  nodes: {
    Shape_IndexedFaceSet001: THREE.Mesh
  }
  materials: {}
  animations: any[]
}


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
      rim = pow(rim, 5.0); // Adjust the power for the Fresnel effect

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

      gl_FragColor = vec4(0.918,1.,0.714, alpha); // Set the top color to opaque and the bottom color to transparent
  }



`;




const handMaterialVariants = {
  initial: { opacity: 0 },
  hidden: { opacity: 0 },
  hide: { opacity: 0.1 },
  enter: {
    opacity: 0.4,
    transition: {
      type: "spring",
      damping: 10,
      stiffness: 50,
      restDelta: 0.1,
      delay: 0.5
    },
  },
  exit: {
    opacity: 0,
    transition: {
      type: "spring",
      damping: 10,
      stiffness: 50,
      restDelta: 0.1,
      delay: 0.25,
    },
  },
};

type HandProps = {
  scroll: MutableRefObject<number>;
  props?: JSX.IntrinsicElements["group"];
};

type ContextType = Record<string, React.ForwardRefExoticComponent<JSX.IntrinsicElements['mesh']>>

export function Model(props: HandProps) {
  const { nodes, materials } = useGLTF('/ghostHand.glb') as GLTFResult
  // Define uniforms
  const uniforms = {
    time: { value: 0 },
    opacity: { value: 1 }
  };

  // Update uniform value every frame
  useFrame(() => {
    if (shaderRef.current) {
      shaderRef.current.uniforms.opacity.value = lerp(shaderRef.current.uniforms.opacity.value, props.scroll.current > 0.05 ? 2 : 0, 0.5);
    }
  });

  const shaderRef = useRef<ShaderMaterial>(null);
  const [shaderCompiled, setShaderCompiled] = useAtom(glReady);

  // Callback function to detect when the shader has compiled
  const handleShaderCompiled = () => {
    setTimeout(() => { setShaderCompiled(true) }, 500)
  };


  // Create shader material
  const MyShaderMaterial = (
    <shaderMaterial
      ref={shaderRef}
      uniforms={uniforms}
      fragmentShader={fragmentShader}
      vertexShader={vertexShader}
      transparent
      onBuild={handleShaderCompiled}
    />
  );



  return (
    <Float rotationIntensity={0.1} floatIntensity={0.1}>
      <group {...props} dispose={null}>
        <mesh geometry={nodes.Shape_IndexedFaceSet001.geometry} position={[0.65, 0.65, 0.038]} rotation={[1.3, 1.369, Math.PI / 1.8]} >
          {MyShaderMaterial}</mesh>
      </group>
    </Float>
  )
}

useGLTF.preload('/ghostHand.glb')
