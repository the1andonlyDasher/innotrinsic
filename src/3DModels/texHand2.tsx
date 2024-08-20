
import React, { useEffect, useRef, useState } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import { GLTF } from "three-stdlib";

import { useRouter } from "next/router";
import { AnimationClip, Color, Group, Mesh, MeshStandardMaterial } from "three";
import { motion } from "framer-motion-3d";
import { useAnimation } from "framer-motion";

type ActionName = "Shape_IndexedFaceSet002";

interface GLTFAction extends AnimationClip {
  name: ActionName;
}

type GLTFResult = GLTF & {
  nodes: {
    Shape_IndexedFaceSet001: Mesh;
  };
  materials: {
    Arms__Standard_: MeshStandardMaterial;
  };
  animations: GLTFAction[];
};

export function TexturedHand(props: JSX.IntrinsicElements["group"]) {
  const group = useRef<Group>(null);
  const mesh = useRef<Mesh>(null);
  const router = useRouter();
  const { nodes, materials, animations } = useGLTF(
    "/texturedHand2.glb"
  ) as GLTFResult;
  const { actions } = useAnimations(animations, group);
  const [disposed, setDisposed] = useState(true);
  const [isInPage, setIsInPage] = useState(false);
  const materialControls = useAnimation()

  useEffect(() => {
    console.log(materials)
    router.pathname === "/einsatzgebiete"
      ? setIsInPage(true)
      : setIsInPage(false);
  }, [router.pathname]);

  useEffect(() => {
    if (!isInPage) {
      materialControls.start({ opacity: 0 }).then(() => setDisposed(true))
    } else {
      materialControls.start({ opacity: 1 }).then(() => setDisposed(false))
    }
  }, [isInPage])



  return (
    <group
      visible={!disposed}
      ref={group}
      scale={1}
      position={[0.6, 0.7, 0.15]}
      rotation={[Math.PI / -0.99, 1.9, 0]}
      {...props}
      dispose={null}
    >
      <mesh
        ref={mesh}
        geometry={nodes.Shape_IndexedFaceSet001.geometry}
      // material={materials.Arms__Standard_}
      >
        <motion.meshStandardMaterial
          initial="initial"
          animate={materialControls}
          {...materials.Arms__Standard_}
          transparent
          needsUpdate
        />
      </mesh>
    </group>
  );
}

useGLTF.preload("/texturedHand2.glb");
