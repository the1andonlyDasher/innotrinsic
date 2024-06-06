/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.16 public/newHead.glb --types --output src/NewHead.tsx 
*/

import * as THREE from 'three'
import React, { MutableRefObject, useEffect, useRef, useState } from 'react'
import { Float, MeshTransmissionMaterial, Outlines, useAspect, useGLTF } from '@react-three/drei'
import { GLTF } from 'three-stdlib'
import { motion as motion3d } from "framer-motion-3d"
import { useThree } from '@react-three/fiber'
import { useAtom } from 'jotai'
import { productViewer, globalTarget, orbitTarget, loc } from './ts/atoms'
import { size as s } from './ts/utils';
import { useRouter } from 'next/router'
import IdeaCloud from './ts/landingGL/IdeaCloud'
import { delay, useAnimation } from 'framer-motion'
import { useSearchParams } from 'next/navigation'


type GLTFResult = GLTF & {
  nodes: {
    Shape_IndexedFaceSet001: THREE.SkinnedMesh
    base: THREE.Mesh
    right_hemisphere: THREE.Mesh
    left_hemisphere: THREE.Mesh
    head: THREE.Mesh
    cerebellum: THREE.Mesh
    stem: THREE.Mesh
    Bone001: THREE.Bone
    Bone002: THREE.Bone
    Bone004: THREE.Bone
    Bone008: THREE.Bone
    Bone014: THREE.Bone
    Bone018: THREE.Bone
  }
  materials: {}
  animations: any[]
}

const materialVariants = {
  initial: { opacity: 0 },
  hide: { opacity: 0.1 },
  enter: {
    opacity: 0.5,
    transition: {
      type: "spring",
      damping: 10,
      stiffness: 50,
      restDelta: 0.1,
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

const material2Variants = {
  initial: { opacity: 0 },
  hidden: { opacity: 0 },
  hide: { opacity: 0.1 },
  enter: {
    opacity: 1,
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

type HeadHandsProps = {
  scroll: MutableRefObject<number>;
  props?: JSX.IntrinsicElements["group"];
};

type ContextType = Record<string, React.ForwardRefExoticComponent<JSX.IntrinsicElements['skinnedMesh'] | JSX.IntrinsicElements['mesh'] | JSX.IntrinsicElements['bone']>>

export function NewHead(props: HeadHandsProps) {
  const { nodes, materials } = useGLTF('/newHead.glb') as GLTFResult
  const [pvAtom, setPVAtom] = useAtom(productViewer);
  const [gTarget, setGTarget] = useAtom(globalTarget);
  const [target, setTarget] = useAtom(orbitTarget);
  const [app, setApp] = useAtom(loc);
  const [pos, setPos] = useState<any>([]);
  const [scl, setScale] = useState<any>([]);
  const { viewport, size } = useThree();
  const [w, h] = useAspect(size.width, size.height);
  const router = useRouter();

  //refs
  const group: any = useRef(!null);
  const [location, setLocation] = useAtom(loc);

  //searchParams
  const searchParams = useSearchParams();

  // refs
  const brain = useRef<any>(!null);

  // animation controls
  const controls = useAnimation();
  const hand1_controls = useAnimation();
  const brain_material_controls = useAnimation();


  // states

  const [brainDisposed, setBDisposed] = useState(false);
  const [headDisposed, setHDisposed] = useState(false);
  const [hand1Disposed, setH1Disposed] = useState(false);
  const [hand2Disposed, setH2Disposed] = useState(false);
  const [isInPage, setIsInPage] = useState(false);
  const [disposed, setDisposed] = useState(false);


  useEffect(() => {
    const scale: any = [
      (pvAtom?.width / window.innerWidth) * viewport?.width,
      (pvAtom?.height / window.innerHeight) * viewport?.height,
      1,
    ];
    const position: any = [
      ((pvAtom?.width / window.innerWidth) * viewport.width) / 2 -
      viewport.width / 2 +
      (pvAtom?.left / window.innerWidth) * viewport.width,
      -s(3, viewport.width, 10) -
      ((pvAtom?.height / window.innerHeight) * viewport.height) / 2 +
      viewport.height / 2 -
      (pvAtom?.top / window.innerHeight) * viewport.height,
      0,
    ];
    setPos(position);
    setScale(scale);
  }, [pvAtom]);

  const hand2Material = (
    <motion3d.meshStandardMaterial
      color="#dfa286"
      initial="initial"
      animate={controls}
      exit="exit"
      variants={material2Variants}

      transparent
      toneMapped
    />
  );

  const bmRef = useRef<any>(!null);
  const brain_material = (
    <motion3d.meshStandardMaterial
      ref={bmRef}
      initial="initial"
      animate={brain_material_controls}
      exit="exit"
      variants={material2Variants}


      color="#f5cb6e"
      metalness={1}
      roughness={0.1}
      toneMapped
    />
  );

  const glass_material = (
    <MeshTransmissionMaterial
      samples={8}
      reflectivity={0.85}
      sheenRoughness={0}
      opacity={0.4}
      iridescence={0.5}
      iridescenceIOR={0.95}
      resolution={1024 * 2}
      thickness={0}
      anisotropy={0.75}
      anisotropicBlur={0.75}
      clearcoat={1}
      clearcoatRoughness={0}
      transparent
      color="#caf1a8"
      roughness={0}
      chromaticAberration={0.65}
    />
  );


  useEffect(() => {
    if (router.pathname === "/") {
      if ((props.scroll.current > 0.05)) {
        brain_material_controls.start(
          "hidden");
        controls.start("exit").then(() => {
          setIsInPage(false), setDisposed(true)
        });
      } else {
        setDisposed(false)
        setIsInPage(true)
      }
    } else {
      brain_material_controls.start(
        "hidden");
      controls.start("exit").then(() => {
        setIsInPage(false), setDisposed(true)
      });
    }
  }, [router.pathname, props.scroll.current]);

  useEffect(() => {
    if (isInPage) {
      if ((props.scroll.current > 0.05)) {
        brain_material_controls.start(
          "hidden");
        controls.start("exit");
      } else {
        brain_material_controls.start("enter")
        controls.start("enter")
      }
    } else {
      brain_material_controls.start(
        "hidden");
      controls.start("exit");
    }
  }, [isInPage]);

  return (<>
    <group visible={!disposed} {...props} position={pos} dispose={null} scale={s(6, viewport.width / 5, 9.5)} rotation={[0, -Math.PI / 1.15, 0]}>
      <group position={[0.425, 0.749, -0.045]} rotation={[-Math.PI / 1.75, 0.2, Math.PI / 2.5]} scale={0.3}>
        <primitive object={nodes.Bone001} />
        <primitive object={nodes.Bone002} />
        <primitive object={nodes.Bone004} />
        <primitive object={nodes.Bone008} />
        <primitive object={nodes.Bone014} />
        <primitive object={nodes.Bone018} />
        <skinnedMesh geometry={nodes.Shape_IndexedFaceSet001.geometry} skeleton={nodes.Shape_IndexedFaceSet001.skeleton} >{hand2Material}</skinnedMesh>
      </group>
      <Float floatIntensity={0.1} rotationIntensity={0.3}>

        <group scale={1} rotation={[0, -Math.PI / 0.85, 0]} position={[0.125, -0.6, 0]}>
          <pointLight intensity={15} color={"#ffde5b"} position={[0.2, 1.5, 0]} />
          <mesh geometry={nodes.base.geometry} position={[0.137, 1.743, 0]} rotation={[Math.PI, 0, Math.PI]} scale={[0.337, 0.325, 0.308]} >{brain_material}</mesh>
          <mesh geometry={nodes.right_hemisphere.geometry} position={[0.137, 1.743, 0]} rotation={[Math.PI, 0, Math.PI]} scale={[0.337, 0.325, 0.308]} >{brain_material}</mesh>
          <mesh geometry={nodes.left_hemisphere.geometry} position={[0.137, 1.743, 0]} rotation={[-Math.PI, 0, 0]} scale={[-0.337, -0.325, -0.308]} >{brain_material}</mesh>
          {/* <mesh geometry={nodes.head.geometry} position={[0.184, 1.584, 0]} rotation={[Math.PI / 2, 0, -Math.PI / 2]} scale={[4.297, 4.297, 4.243]} >{glass_material}</mesh> */}
          <mesh geometry={nodes.cerebellum.geometry} position={[-0.066, 1.557, 0]} scale={[0.123, 0.075, 0.123]} >{brain_material}</mesh>
          <mesh geometry={nodes.stem.geometry} position={[0.071, 1.561, 0]} scale={[0.083, 0.206, 0.083]} >{brain_material}</mesh>
          <group position={[0.115, 1.9, 0]} scale={0.25}>
            <IdeaCloud scroll={props.scroll} centerPoint={[0, 0, 0]} />
          </group>
        </group>
      </Float>
    </group>
  </>
  )
}

useGLTF.preload('/newHead.glb')
