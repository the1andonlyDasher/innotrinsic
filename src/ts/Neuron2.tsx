import { shaderMaterial, useGLTF, useTexture } from "@react-three/drei";
import { extend, Canvas, useFrame } from "@react-three/fiber";
import React, { FC, useRef, Suspense } from "react";
import { Color, DoubleSide } from "three";

export const Neuron: FC = () => {
    const texture = useTexture("/images/benefits_cover.png");
    const neuron_uniforms = {
        edgeSmoothness: { value: 0.1 },
        stencilColor: { value: new Color(0xffffff) },
    }

    const neuron_vertex = `
  varying vec3 vWorldPosition;

  void main() {
    vWorldPosition = (modelMatrix * vec4(position, 1.0)).xyz;
    gl_Position = projectionMatrix * viewMatrix * vec4(vWorldPosition, 1.0);
  }
  `

    const neuron_fragment = `
  uniform vec3 stencilColor;
  uniform float edgeSmoothness;
  varying vec3 vWorldPosition;

  void main() {
    float distanceFromCenter = length(vWorldPosition.xy);
    float mask = smoothstep(0.5 - edgeSmoothness, 0.5 + edgeSmoothness, distanceFromCenter);

    if (mask < 0.5) discard;

    gl_FragColor = vec4(stencilColor, mask);
  }
  `


    const plane_uniforms = {
        texture1: { value: texture }
    }
    const plane_vertex = `
  varying vec2 vUv;

  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
  `
    const plane_fragment = `
  uniform sampler2D texture1;
  varying vec2 vUv;

  void main() {
    vec4 texColor = texture2D(texture1, vUv);
    gl_FragColor = texColor;
  }
`


    const NeuronShaderMaterial = <shaderMaterial
        uniforms={neuron_uniforms}
        fragmentShader={neuron_fragment}
        vertexShader={neuron_vertex}
        side={DoubleSide}
        transparent
    />

    const PlaneShaderMaterial = <shaderMaterial
        uniforms={plane_uniforms}
        fragmentShader={plane_fragment}
        vertexShader={plane_vertex}
    />

    useFrame(() => {
        plane_uniforms.texture1.value = texture;
    });

    const { nodes }: any = useGLTF("/neuron.glb");
    return (
        <>
            {/* Plane with texture */}
            <mesh position={[-10, -2, 0]}>
                {PlaneShaderMaterial}
                <planeGeometry args={[20, 20, 20]} />
            </mesh>

            {/* Sphere acting as a mask */}
            <mesh geometry={nodes.Icosphere.geometry} position={[-10, -2, 1]}
            >
                {NeuronShaderMaterial}
            </mesh>
        </>
    );
};

