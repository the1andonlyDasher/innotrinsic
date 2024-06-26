/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.16 public/shakeHands.glb --types --output src/ShakeHands.tsx 
*/

import * as THREE from 'three'
import React, { useEffect, useRef } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    shakehands: THREE.SkinnedMesh
    mixamorigHips: THREE.Bone
  }
  materials: {}
  animations: GLTFAction[]
}

type ActionName = 'Armature|mixamo.com|Layer0'
interface GLTFAction extends THREE.AnimationClip {
  name: ActionName
}
type ContextType = Record<string, React.ForwardRefExoticComponent<JSX.IntrinsicElements['skinnedMesh'] | JSX.IntrinsicElements['bone']>>

export function ShakeHands(props: JSX.IntrinsicElements['group']) {
  const group = useRef<THREE.Group | any>()
  const { nodes, materials, animations } = useGLTF('/shakeHands.glb') as GLTFResult
  const { actions } = useAnimations(animations, nodes.mixamorigHips)
  useEffect(() => {
    actions['Armature|mixamo.com|Layer0']?.play();
    // console.log(nodes)
  }, [])
  return (
    <group scale={0.05} ref={group}  {...props} dispose={null}>
      <group name="Scene">
        <group name="ShakeHands" rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
          <primitive object={nodes.mixamorigHips} position={[0, 0, 0]} />
          <skinnedMesh name="shakehands" geometry={nodes.shakehands.geometry} skeleton={nodes.shakehands.skeleton}>
            <meshLambertMaterial color="white" />
          </skinnedMesh>
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('/shakeHands.glb')
