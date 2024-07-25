/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.16 public/head_three.glb --types --output src/HeadThree.tsx 
*/
import { Mesh } from 'three/src/objects/Mesh.js'
import { SkinnedMesh } from 'three/src/objects/SkinnedMesh.js'
import { Bone } from 'three/src/objects/Bone.js'
import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    Cube: Mesh
    female_head001: Mesh
  }
  materials: {}
  animations: any[]
}

type ContextType = Record<string, React.ForwardRefExoticComponent<JSX.IntrinsicElements['mesh']>>

export function Model(props: JSX.IntrinsicElements['group']) {
  const { nodes, materials } = useGLTF('/head_three.glb') as GLTFResult
  return (
    <group {...props} dispose={null}>
      <mesh geometry={nodes.Cube.geometry} material={nodes.Cube.material} position={[0.082, 3.899, 0]} />
      <mesh geometry={nodes.female_head001.geometry} material={nodes.female_head001.material} position={[-0.084, 2.648, -0.004]} />
    </group>
  )
}

// useGLTF.preload('/head_three.glb')