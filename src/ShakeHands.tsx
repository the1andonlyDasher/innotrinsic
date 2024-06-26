/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.16 public/shakeHands.glb --types --output src/ShakeHands.tsx 
*/

import * as THREE from 'three'
import React, { useRef } from 'react'
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

export function Model(props: JSX.IntrinsicElements['group']) {
  const group: any = useRef<THREE.Group>()
  const { nodes, materials, animations } = useGLTF('/shakeHands.glb') as GLTFResult
  const { actions } = useAnimations(animations, group)
  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <group name="ShakeHands" rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
          <primitive object={nodes.mixamorigHips} />
          <skinnedMesh name="shakehands" geometry={nodes.shakehands.geometry} material={nodes.shakehands.material} skeleton={nodes.shakehands.skeleton} />
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('/shakeHands.glb')
