/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.16 public/neuron3.glb --types --output src/Neuron3.tsx 
*/

import * as THREE from 'three'
import React, { MutableRefObject, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { useGLTF, useAnimations, Float } from '@react-three/drei'
import { GLTF } from 'three-stdlib'
import { useThree, useFrame } from '@react-three/fiber'
import { useAnimation } from 'framer-motion'
import { useAtom } from 'jotai'
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/router'
import { lerp } from 'three/src/math/MathUtils.js'
import { loc } from './ts/atoms'
import { size } from './ts/utils'
import { motion as motion3d } from "framer-motion-3d"

type GLTFResult = GLTF & {
  nodes: {
    Icosphere: THREE.Mesh
  }
  materials: {}
  animations: GLTFAction[]
}

type ActionName = 'Icosphere' | 'KeyAction'
interface GLTFAction extends THREE.AnimationClip {
  name: ActionName
}
type ContextType = Record<string, React.ForwardRefExoticComponent<JSX.IntrinsicElements['mesh']>>

type NeuronsProps = {
  scroll: MutableRefObject<number>;
  props?: JSX.IntrinsicElements['group']
}

const materialVariants = {
  initial: { opacity: 0 },
  enter: {
    opacity: 1,
    transition: {
      type: "spring",
      damping: 10,
      stiffness: 50,
      restDelta: 0.1,
    }
  },
  exit: {
    opacity: 0, roughness: 1, transition: {
      type: "spring",
      damping: 10,
      stiffness: 50,
      restDelta: 0.1, delay: 0.25
    }
  },
};
export function Model(props: NeuronsProps) {

  const group: any = useRef<THREE.Group>()
  const { nodes, materials, animations, userData, scene }: any = useGLTF('/neuron3.glb') as GLTFResult
  const { actions }: any = useAnimations(animations, group)
  //atoms
  const [location, setLocation] = useAtom(loc)
  // controls
  const neuronMaterialControls = useAnimation();
  useEffect(() => {
    Object.values(actions).map((animation: any) => {
      animation.reset().fadeIn(0.5).play().paused = true
    })
    console.log(nodes, userData, scene)
  }, [])
  // router
  const router = useRouter()
  // search params
  const searchParams = useSearchParams();
  // mount states
  const [isInPage, setIsInPage] = useState(false);
  const [disposed, setDisposed] = useState(false);
  //helpers
  const { viewport } = useThree();

  //render loop
  useFrame((state) => {
    Object.values(actions).map((animation: any) => {
      animation.time = lerp(animation.time, animation.getClip().duration * props.scroll.current * 5, 0.02)
    });
  });

  //uef
  useEffect(() => {
    if (
      location === "science" && router.pathname === "/" && searchParams.get("test") === null || false) {
      setDisposed(false), setIsInPage(true);
    } else {
      neuronMaterialControls.start("exit").then(() => {
        setTimeout(() => {
          setDisposed(true),
            setIsInPage(false);
        }, 500)
      })
    }
  }, [router.pathname, searchParams, location])

  useEffect(() => {
    isInPage && neuronMaterialControls.start("enter")
  }, [isInPage]);

  // materials
  const neuron = <motion3d.meshStandardMaterial
    transparent
    color={"#ebf0d9"}
    initial="initial"
    animate={neuronMaterialControls}
    exit="exit"
    variants={materialVariants}
  />

  const ref: any = useRef();

  useLayoutEffect(() => {
    ref.current?.updateMorphTargets();
  }, []);

  return (
    <Float rotation={[0.535, 0.135, 0.5]} scale={size(0.8, viewport.width / 10, 2)} position={[-viewport.width / 2 + 3, viewport.height / 2 - size(0.8, viewport.width / 10, 2), 0]} visible={!disposed} rotationIntensity={0.1} floatIntensity={0.2} floatingRange={[-0.2, 0.2]}>
      <group visible={!disposed} ref={group}{...props} dispose={null}>
        <group name="Scene">
          <mesh ref={ref} name="Icosphere" geometry={nodes.Icosphere.geometry} material={nodes.Icosphere.material} />
        </group>
      </group>
    </Float>
  )
}

useGLTF.preload('/neuron3.glb')
