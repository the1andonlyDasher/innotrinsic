/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.16 public/mountain.glb --types --output src/Mountain.tsx 
*/
import React, { MutableRefObject, useEffect, useRef, useState } from 'react'
import { useGLTF, useAnimations, PerspectiveCamera } from '@react-three/drei'
import { GLTF } from 'three-stdlib'
import { useFrame, useThree } from '@react-three/fiber'
import { lerp } from './ts/threeExport/math/MathUtils'
import { motion as motion3d } from "framer-motion-3d"
import { AnimationClip } from "./ts/threeExport/animation/AnimationClip"
import { Mesh } from 'three/src/objects/Mesh.js'
import { size } from './ts/utils'
import { useAtom } from 'jotai'
import { loc } from './ts/atoms'
import { useRouter } from 'next/router'
import { useSearchParams } from 'next/navigation'
import { animate, useAnimation } from 'framer-motion';

const materialVariants = {
  initial: { opacity: 0 },
  enter: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { type: "spring", damping: 10, stiffness: 40, restDelta: 0.01 }
}

type ActionName = 'CubeAction' | 'EmptyAction' | 'Cylinder.003Action' | 'Circle.004_cell' | 'Circle.004_cell.002' | 'Circle.004_cell.005' | 'Circle.004_cell.009' | 'Circle.004_cell.012' | 'Circle.004_cell.014' | 'Circle.004_cell.023' | 'Circle.004_cell.028' | 'Circle.004_cell.034' | 'Circle.004_cell.037' | 'Circle.004_cell.045' | 'Circle.004_cell.046' | 'Circle.004_cell.049' | 'Circle.004_cell.052Action' | 'Circle.004_cell.057' | 'Circle.004_cell.062' | 'Circle.004_cell.065' | 'Circle.004_cell.069' | 'Circle.004_cell.082' | 'Circle.004_cell.086' | 'ConeAction'

interface GLTFAction extends AnimationClip {
  name: ActionName
}

type GLTFResult = GLTF & {
  nodes: {
    Cube: Mesh
    Cylinder003: Mesh
    Circle004_cell: Mesh
    Circle004_cell002: Mesh
    Circle004_cell005: Mesh
    Circle004_cell009: Mesh
    Circle004_cell012: Mesh
    Circle004_cell014: Mesh
    Circle004_cell023: Mesh
    Circle004_cell028: Mesh
    Circle004_cell034: Mesh
    Circle004_cell037: Mesh
    Circle004_cell045: Mesh
    Circle004_cell046: Mesh
    Circle004_cell049: Mesh
    Circle004_cell052: Mesh
    Circle004_cell057: Mesh
    Circle004_cell062: Mesh
    Circle004_cell065: Mesh
    Circle004_cell069: Mesh
    Circle004_cell082: Mesh
    Circle004_cell086: Mesh
    Cone: Mesh
  }
  materials: {},
  animations: GLTFAction[]
}

type MountainType = {
  props?: JSX.IntrinsicElements['group'];
  scroll: MutableRefObject<number>;
}

type ContextType = Record<string, React.ForwardRefExoticComponent<JSX.IntrinsicElements['mesh']>>

export function Mountain(props: MountainType) {
  // router
  const router = useRouter()
  // search params
  const searchParams = useSearchParams();
  //atoms
  const [location, useLocation] = useAtom(loc)
  // mount states
  const [isInPage, setIsInPage] = useState(false);
  const [disposed, setDisposed] = useState(false);
  //refs
  const group = useRef<any>()
  //scene
  const { nodes, materials, animations }: any = useGLTF('/mountain.glb') as GLTFResult;
  //animations
  const { actions }: any = useAnimations(animations, group)
  // controls
  const controls = useAnimation();
  // materials
  const rope = (
    <motion3d.meshStandardMaterial
      color="#EDDFAB"
      transparent
      variants={materialVariants}
      initial="initial"
      animate={controls}
      // animate={location !== "landing" ? { opacity: 0 } : { opacity: 1 }}
      toneMapped
    />
  );

  const rock = (
    <motion3d.meshStandardMaterial
      color="#030e1f"
      transparent
      variants={materialVariants}
      initial="initial"
      animate={controls}
      // animate={location !== "landing" ? { opacity: 0 } : { opacity: 1 }}
      opacity={1}
      toneMapped
    />
  );

  const brain = (
    <motion3d.meshStandardMaterial
      color="#B0E431"
      transparent
      variants={materialVariants}
      initial="initial"
      // animate={location !== "landing" ? { opacity: 0 } : { opacity: 1 }}
      animate={controls}
      opacity={1}
      toneMapped
    />
  );

  const snow = (
    <motion3d.meshStandardMaterial
      color="#e6fffb"
      transparent
      variants={materialVariants}
      initial="initial"
      animate={controls}
      opacity={1}
      toneMapped
    />
  );
  //uef
  useEffect(() => {
    if (
      location === "landing" && router.pathname === "/" && searchParams.get("test") === null || false) {
      setDisposed(false), setIsInPage(true);
    } else {
      controls.start("exit").then(() => {
        setTimeout(() => {
          setDisposed(true),
            setIsInPage(false);
        }, 500)
      })
    }
  }, [router.pathname, searchParams, location])

  useEffect(() => {
    isInPage && controls.start("enter")
  }, [isInPage]);

  useEffect(() => {
    Object.values(actions).map((animation: any) => {
      animation.reset().fadeIn(0.5).play().paused = true
    })

  }, [])

  //render loop
  useFrame((state) => {
    group.current.position.z = lerp(group.current.position.z, props.scroll.current * 50, 0.02)
    group.current.rotation.y = lerp(group.current.rotation.y, -1.5 - props.scroll.current * 5, 0.02)
    Object.values(actions).map((animation: any) => {
      animation.time = lerp(animation.time, animation.getClip().duration * props.scroll.current * 5, 0.02)
    });
  });

  //helpers
  const { viewport } = useThree()


  //uefs
  useEffect(() => {
    console.log(viewport.width)
  }, [viewport.width])
  return (
    <group visible={!disposed} ref={group} rotation={[0, -1.5, 0]} scale={2} {...props} position={[size(0, viewport.width / 5, 10), -7, 0]} dispose={null}>
      <group name="Scene">
        <group name="Empty" position={[-6.21, 1.135, -0.845]} />
        <PerspectiveCamera name="Camera" makeDefault={false} far={1000} near={0.001} fov={44.959} position={[10.123, 6.476, -0.803]} rotation={[1.757, 1.225, -1.768]} />
        <mesh name="Cube" geometry={nodes.Cube.geometry} position={[-0.032, 5.334, 3.904]} >{brain}</mesh>
        <mesh name="Cylinder003" geometry={nodes.Cylinder003.geometry} position={[-0.011, 3.912, 1.495]} rotation={[-Math.PI, 0.215, -Math.PI]} scale={[-0.012, -1.257, -0.012]}>{rope}</mesh>
        <mesh name="Circle004_cell" geometry={nodes.Circle004_cell.geometry} position={[-1.357, 0.076, 1.545]} scale={2.027} >{rock}</mesh>
        <mesh name="Circle004_cell005" geometry={nodes.Circle004_cell005.geometry} position={[-1.466, 0.907, 0.753]} scale={2.027} >{rock}</mesh>
        <mesh name="Circle004_cell002" geometry={nodes.Circle004_cell002.geometry} position={[-1.693, 0.73, -0.393]} scale={2.027} >{rock}</mesh>
        <mesh name="Circle004_cell009" geometry={nodes.Circle004_cell009.geometry} position={[-0.924, 0.937, 1.146]} scale={2.027} >{rock}</mesh>
        <mesh name="Circle004_cell012" geometry={nodes.Circle004_cell012.geometry} position={[0.322, 1.291, 0.94]} scale={2.027} >{rock}</mesh>
        <mesh name="Circle004_cell014" geometry={nodes.Circle004_cell014.geometry} position={[-1.385, 1.222, -0.798]} scale={2.027} >{rock}</mesh>
        <mesh name="Circle004_cell023" geometry={nodes.Circle004_cell023.geometry} position={[-0.554, 1.164, -1.198]} scale={2.027} >{rock}</mesh>
        <mesh name="Circle004_cell028" geometry={nodes.Circle004_cell028.geometry} position={[-1.135, 0.478, -1.33]} scale={2.027} >{rock}</mesh>
        <mesh name="Circle004_cell034" geometry={nodes.Circle004_cell034.geometry} position={[-0.599, 0.335, 0.506]} scale={2.027} >{rock}</mesh>
        <mesh name="Circle004_cell037" geometry={nodes.Circle004_cell037.geometry} position={[-1.909, 0.484, 0.217]} scale={2.027} >{rock}</mesh>
        <mesh name="Circle004_cell045" geometry={nodes.Circle004_cell045.geometry} position={[-0.441, 1.203, 1.073]} scale={2.027} >{rock}</mesh>
        <mesh name="Circle004_cell046" geometry={nodes.Circle004_cell046.geometry} position={[0.984, 0.602, -0.644]} scale={2.027} >{rock}</mesh>
        <mesh name="Circle004_cell049" geometry={nodes.Circle004_cell049.geometry} position={[0.173, 0.549, 0.229]} scale={2.027} >{rock}</mesh>
        <mesh name="Circle004_cell052" geometry={nodes.Circle004_cell052.geometry} position={[-0.146, 2.715, -0.236]} scale={2.027} >{rock}</mesh>
        <mesh name="Circle004_cell057" geometry={nodes.Circle004_cell057.geometry} position={[0.767, 0.594, 1.166]} scale={2.027} >{rock}</mesh>
        <mesh name="Circle004_cell062" geometry={nodes.Circle004_cell062.geometry} position={[1.233, 1.01, 0.014]} scale={2.027} >{rock}</mesh>
        <mesh name="Circle004_cell065" geometry={nodes.Circle004_cell065.geometry} position={[0.454, 0.704, -1.165]} scale={2.027} >{rock}</mesh>
        <mesh name="Circle004_cell069" geometry={nodes.Circle004_cell069.geometry} position={[-0.458, 0.821, 1.361]} scale={2.027} >{rock}</mesh>
        <mesh name="Circle004_cell082" geometry={nodes.Circle004_cell082.geometry} position={[-1.29, 1.151, -0.194]} scale={2.027} >{rock}</mesh>
        <mesh name="Circle004_cell086" geometry={nodes.Circle004_cell086.geometry} position={[-0.048, 0.846, -1.602]} scale={2.027} >{rock}</mesh>
        <mesh name="Cone" geometry={nodes.Cone.geometry} position={[-0.233, 2.683, 0]} scale={[0.819, 0.821, 0.819]} >{snow}</mesh>
      </group>
    </group>
  )
}

useGLTF.preload('/mountain.glb')
