import { Mask, PivotControls, shaderMaterial, useGLTF, useMask, useTexture } from "@react-three/drei";
import { extend, Canvas, useFrame } from "@react-three/fiber";
import React, { FC, useRef, Suspense } from "react";
import { Color, DoubleSide } from "three";
import * as geometry from 'maath/geometry';

const CircularMask = (props: any) => {
    const { nodes }: any = useGLTF("/neuron.glb");
    return (
        <group {...props}>
            <PivotControls offset={[0, 0, 1]} activeAxes={[true, true, false]} disableRotations depthTest={false}>
                <Mask scale={2} geometry={nodes.Icosphere.geometry} id={1} position={[0, 0, 0.95]}>
                </Mask>
            </PivotControls>
        </group>)
}


export const Neuron: FC = () => {
    const texture = useTexture("/images/benefits_cover.png");
    const neuron_uniforms = {
        texture1: { value: texture }
    }

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

    const PlaneShaderMaterial = <shaderMaterial
        uniforms={plane_uniforms}
        fragmentShader={plane_fragment}
        vertexShader={plane_vertex}
    />

    useFrame(() => {
        neuron_uniforms.texture1.value = texture;
        plane_uniforms.texture1.value = texture;
    });

    const Plane = () => {
        const stencil = useMask(1, false)
        return (
            <mesh position={[-10, -2, 0]}>
                <planeGeometry args={[20, 20]} />
                <meshPhongMaterial color="#33BBFF" {...stencil} />
            </mesh>

        )
    }

    return (
        <>
            {/* Plane with texture */}
            <Plane />
            <CircularMask position={[-10, -2, 1]} />
        </>
    );
};

