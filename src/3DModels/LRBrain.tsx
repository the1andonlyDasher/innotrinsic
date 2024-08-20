import React, { MutableRefObject, useEffect, useMemo, useRef, useState } from 'react'
import { useGLTF } from '@react-three/drei'
import { AdditiveBlending, MathUtils, Mesh, MultiplyBlending, Points } from 'three'
import { useFrame } from '@react-three/fiber'
import { lerp } from 'three/src/math/MathUtils.js'
import { useRouter } from 'next/router'
import { motion } from 'framer-motion-3d'
import { active } from 'd3'
import { useAnimation } from 'framer-motion'
import { transition } from '@/ts/utils'

type GLTFResult = {
  nodes: {
    cerebellum: Mesh
  }
  materials: {}
}

type LRBrainProps = {
  scroll: MutableRefObject<number>;
  props?: JSX.IntrinsicElements["group"];
};

const variants = {
  initial: { scale: 0 },
  enter: { scale: 1 },
  exit: { scale: 0 }
}

export function LRBrain(props: LRBrainProps) {
  const { nodes, materials }: any = useGLTF('/lowrez_brain.glb')

  const router = useRouter()

  const pointsRef: any = useRef<Points>(null);


  const particleCount = 200;
  const particlePositions = useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    const originalVertices = nodes.cerebellum.geometry.attributes.position.array;

    for (let i = 0; i < particleCount; i++) {
      const originalVertexIndex = Math.floor(Math.random() * (originalVertices.length / 3));
      const ox = originalVertices[originalVertexIndex * 3];
      const oy = originalVertices[originalVertexIndex * 3 + 1];
      const oz = originalVertices[originalVertexIndex * 3 + 2];

      // Partikel zufällig um Vertices verteilen
      positions[i * 3] = ox + MathUtils.randFloatSpread(0.1);
      positions[i * 3 + 1] = oy + MathUtils.randFloatSpread(0.1);
      positions[i * 3 + 2] = oz + MathUtils.randFloatSpread(0.1);
    }

    return positions;
  }, [nodes]);

  const uniforms = useMemo(() => ({
    uTime: { value: 0.0 },
    uRadius: { value: 2.0 }
  }), []);

  useFrame((state) => {
    if (pointsRef.current && !disposed) {
      uniforms.uRadius.value = lerp(uniforms.uRadius.value, router.pathname === "/business/brainbackgrounds" ? 2.0 : 1.0, 0.15)
      pointsRef.current.material.uniforms.uTime.value = state.clock.elapsedTime;
    }
  });


  const [disposed, setDisposed] = useState(true)
  const [inPage, setInPage] = useState(false)
  const controls = useAnimation()


  useEffect(() => {
    if (router.pathname === "/business/brainbackgrounds") {
      if (props.scroll.current > 0.015) {
        setInPage(false)
        controls.start("exit").then(() => setDisposed(true))

      } else {
        setDisposed(false), setInPage(true)
      }
    } else {
      setInPage(false)
      controls.start("exit").then(() => setDisposed(true))
    }
  }, [router.pathname, props.scroll.current]);

  useEffect(() => {
    if (inPage) {
      controls.start("enter")
    }
  }, [inPage])


  return (<>

    <motion.points
      visible={!disposed}
      variants={variants}
      initial="initial"
      animate={controls}
      transition={transition({ delay: 0 })}
      renderOrder={1} rotation={[0, -Math.PI / 0.85, 0]}
      position={[0.075, 1.09, 0.075]} ref={pointsRef} >
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={particlePositions}
          itemSize={3}
        />
      </bufferGeometry>
      <motion.shaderMaterial
        initial={{ opacity: 0 }}
        animate={inPage ? { opacity: 1 } : { opacity: 0 }}
        transition={transition({ delay: 0 })}
        vertexShader={`
          uniform float uTime;
          uniform float uRadius;

          varying float vDistance;

                  // Random function using a hash-like approach
        float rand(float n){ return fract(sin(n) * 43758.5453123); }
        float rand(vec2 n) { 
          return fract(sin(dot(n, vec2(12.9898, 4.1414))) * 43758.5453);
        }

          mat3 rotation3dY(float angle) {
            float s = sin(angle);
            float c = cos(angle);
            return mat3(
              c, 0.0, -s ,
              0.0, 1.0, 0.0,
              s, 0.0, c 
            );
          }

          void main() {
            float distanceFactor = pow(uRadius - distance(position, vec3(0.0)), 1.5);
            float size = distanceFactor * 10.0 + 10.0;

      
          // Random factors based on initial positions
          float randomFactor = rand(position.xy);
          float phase = rand(position.z) * 2.0 * 3.14159;

          // Adding a phase shift and varying frequencies
          vec3 floatOffset = vec3(
            sin(position.x * 0.02 + (uTime * 0.25) + phase) * 0.05,
            cos(position.y * 0.02 + (uTime * 0.25) * (1.0 + randomFactor)) * 0.05,
            sin(position.z * 0.02 + (uTime * 0.25) * 0.5) * 0.05
          );

          vec3 particlePosition = position + floatOffset;
         

            vDistance = distanceFactor;

            vec4 modelPosition = modelMatrix * vec4(particlePosition, 1.0);
            vec4 viewPosition = viewMatrix * modelPosition;
            vec4 projectedPosition = projectionMatrix * viewPosition;

            gl_Position = projectedPosition;

            gl_PointSize = size;
            gl_PointSize *= (5.0 / - viewPosition.z);
          }
        `}
        fragmentShader={`
          varying float vDistance;

          void main() {
            vec3 color = vec3(0.34, 0.53, 0.96);
            float strength = distance(gl_PointCoord, vec2(0.5));
            strength = 1.0 - strength;
            strength = pow(strength, 3.0);

            color = mix(color, vec3(0.97, 0.70, 0.45), vDistance * 0.5);
            color = mix(vec3(0.0), color, strength);
            gl_FragColor = vec4(color, strength);
          }
        `}
        uniforms={uniforms}
        depthWrite={true}
        depthTest={true}
        transparent
        blending={AdditiveBlending}

      />
    </motion.points>
  </>
  )
}

useGLTF.preload('/lowrez_brain.glb')
