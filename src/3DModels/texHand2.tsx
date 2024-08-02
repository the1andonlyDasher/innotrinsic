import * as THREE from "three";
import React from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import { GLTF } from "three-stdlib";
import { useFrame } from "@react-three/fiber";
import { lerp } from "three/src/math/MathUtils.js";
import { useRouter } from "next/router";

type ActionName = "Shape_IndexedFaceSet002";

interface GLTFAction extends THREE.AnimationClip {
  name: ActionName;
}

type GLTFResult = GLTF & {
  nodes: {
    Shape_IndexedFaceSet001: THREE.Mesh;
  };
  materials: {
    Arms__Standard_: THREE.MeshStandardMaterial;
  };
  animations: GLTFAction[];
};

export function TexturedHand(props: JSX.IntrinsicElements["group"]) {
  const group = React.useRef<THREE.Group>(null);
  const mesh = React.useRef<THREE.Mesh>(null);
  const router = useRouter();
  const { nodes, materials, animations } = useGLTF(
    "/texturedHand2.glb"
  ) as GLTFResult;
  const { actions } = useAnimations(animations, group);
  const [disposed, setDisposed] = React.useState(true);

  React.useEffect(() => {
    router.pathname === "/einsatzgebiete"
      ? setDisposed(false)
      : setTimeout(() => {
        setDisposed(true);
      }, 200);
  }, [router.pathname]);

  React.useEffect(() => {
    // Ensure the material is set to transparent so opacity changes are visible
    if (materials && materials.Arms__Standard_) {
      materials.Arms__Standard_.transparent = true;
      materials.Arms__Standard_.needsUpdate = true;
    }
  }, [materials]);

  useFrame(() => {
    if (materials && materials.Arms__Standard_ && !disposed) {
      materials.Arms__Standard_.opacity = lerp(
        materials.Arms__Standard_.opacity,
        router.pathname === "/" ? 0 : 1,
        0.15
      );
      materials.Arms__Standard_.needsUpdate = true;
    }
  });

  return (
    <group
      visible={!disposed}
      ref={group}
      scale={1}
      position={[0.6, 0.6, 0.15]}
      rotation={[Math.PI / -0.99, 1.9, 0]}
      {...props}
      dispose={null}
    >
      <mesh
        ref={mesh}
        geometry={nodes.Shape_IndexedFaceSet001.geometry}
        material={materials.Arms__Standard_}
      />
    </group>
  );
}

useGLTF.preload("/texturedHand2.glb");
