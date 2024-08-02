import React, { MutableRefObject, useEffect, useMemo, useRef, useState } from 'react';
import { Float, useGLTF } from '@react-three/drei';
import { GLTF } from 'three-stdlib';
import { Mesh } from 'three/src/objects/Mesh.js';
import { ShaderMaterial, TextureLoader } from 'three';
import { useFrame } from '@react-three/fiber';
import { lerp } from 'three/src/math/MathUtils.js';
import { useAtom } from 'jotai';
import { glReady } from '../ts/atoms';
import { Vector3 } from '../ts/threeExport/math/Vector3';
import { useRouter } from 'next/router';
import { People } from './BusinessPeople';
import { useSearchParams } from 'next/navigation';
import { motion as motion3d } from 'framer-motion-3d';
import { useAnimation } from 'framer-motion';

type GLTFResult = GLTF & {
  nodes: {
    Shape_IndexedFaceSet001: Mesh;
  };
  materials: {};
  animations: any[];
};

const t = {
  type: "spring",
  damping: 30,
  stiffness: 55,
  restDelta: 0.001
}

const handVariants = {
  initial: { scale: 0.5, y: -1 },
  focus: { scale: 0.9, y: 0.9 },
  enter: { scale: 1, y: 0.65 },
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
uniform float opacity;
uniform vec3 uCameraPosition;
uniform vec3 uLightDirection1;
uniform vec3 uLightDirection2;

varying vec3 vPosition;
varying vec3 vNormal;

void main() {
    vec3 viewDir = normalize(uCameraPosition - vPosition);

    float diffuse1 = dot(normalize(vNormal), -uLightDirection1);
    diffuse1 = clamp(diffuse1, 0.0, 1.0);

    float diffuse2 = dot(normalize(vNormal), -uLightDirection2);
    diffuse2 = clamp(diffuse2, 0.0, 0.5);

    float diffuse = max(diffuse1, diffuse2);

    vec3 sphereCenter = vec3(0.7, 0.0, -1.4);
    float sphereRadius = 1.6;
    float sphereFalloff = 0.3;
    float distance = length(vPosition - sphereCenter);
    float sphereFade = smoothstep(sphereRadius - sphereFalloff, sphereRadius + sphereFalloff, distance);
    float invertedMask = 1.0 - sphereFade;

    float rim = dot(normalize(vNormal), viewDir);
    rim = clamp(1.0 - abs(rim), 0.0, 1.0);

    // Always set alpha to 1.0 for depth testing, actual visual opacity will be determined by color.alpha
    float depthAlpha = 1.0;
    float visualAlpha = rim * invertedMask * diffuse * opacity;

    vec3 color = vec3(0.918, 1.0, 0.714);

    gl_FragColor = vec4(color, depthAlpha);
    gl_FragColor.a = visualAlpha;
}
`;

type HandProps = {
  scroll: MutableRefObject<number>;
  useCustomShader?: boolean;
  props?: JSX.IntrinsicElements['group'];
};

export function Model({ scroll, useCustomShader = true, ...props }: HandProps) {
  const { nodes } = useGLTF('/ghostHand.glb') as GLTFResult;
  const shaderRef = useRef<ShaderMaterial>(null);
  const [shaderCompiled, setShaderCompiled] = useAtom(glReady);
  const router = useRouter();
  const searchParams = useSearchParams();
  const [opacity, setOpacity] = useState(1);

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
  }), []);



  useFrame(() => {
    if (useCustomShader && shaderRef.current) {
      const targetOpacity = router.pathname === "/" ? (scroll.current > 0.015 ? 0 : 1) : router.pathname ===
        "/einsatzgebiete" && searchParams.get("focusGroup") ? 1 : 0;
      uniforms.opacity.value = lerp(uniforms.opacity.value, targetOpacity, 0.1);
      shaderRef.current.needsUpdate = true;
    }
  });

  const hand_controls = useAnimation();

  useEffect(() => {
    hand_controls.start(searchParams.get("focusGroup") ? "focus" : "enter");
  }, [searchParams]);

  return (
    <Float rotationIntensity={0.1} floatIntensity={0.1}>
      <group {...props} dispose={null}>
        <People />
        <motion3d.mesh
          transition={t}
          initial="initial"
          variants={handVariants}
          animate={hand_controls}
          geometry={nodes.Shape_IndexedFaceSet001.geometry}
          position={[0.65, 0.65, 0.038]}
          rotation={[2.3, 1.35, Math.PI / 4]}
        >
          {useCustomShader ? (
            <shaderMaterial
              attach="material"
              ref={shaderRef}
              uniforms={uniforms}
              fragmentShader={fragmentShader}
              vertexShader={vertexShader}
              transparent
              onBeforeCompile={handleShaderCompiled}
            />
          ) : (
            <meshStandardMaterial
              attach="material"

            />
          )}
        </motion3d.mesh>
      </group>
    </Float>
  );
}

// useGLTF.preload('/ghostHand.glb');
