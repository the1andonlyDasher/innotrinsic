import * as THREE from "three";
import React, { useMemo, useState } from "react";
import {
  Instance,
  Instances,
  Outlines,
  QuadraticBezierLine,
  useCursor,
  useGLTF,
} from "@react-three/drei";
import { GLTF } from "three-stdlib";
import { motion as motion3d } from "framer-motion-3d";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import CustomBezierLine from "../ts/CustomLine";

type GLTFResult = GLTF & {
  nodes: {
    ["2__0"]: THREE.Mesh;
    ["7__0"]: THREE.Mesh;
    ["8__0"]: THREE.Mesh;
    brain: THREE.Mesh;
    brain_two: THREE.Mesh;
    brain_three: THREE.Mesh;
  };
  materials: {};
  animations: any[];
};

const Person = ({ value, index }: any) => {
  const [hovered, setHover] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  useCursor(hovered);

  const material = (
    <motion3d.meshStandardMaterial
      initial={{ opacity: 0 }}
      animate={
        searchParams.get("focusGroup")
          ? { opacity: 0.45, transition: { delay: 4.5 + index / 10 } }
          : { opacity: 0 }
      }
      transparent
      toneMapped

      color="#e8f8db"
    />
  );

  return (
    <mesh
      onPointerEnter={(e) => {
        e.stopPropagation();
        setHover(true);
      }}
      onPointerLeave={(e) => {
        e.stopPropagation();
        setHover(false);
      }}
      onClick={() => {
        router.replace(
          router.pathname + "?" + searchParams + "&panel=1",
          undefined,
          { shallow: true }
        );
      }}
      geometry={value.geometry}
      position={value.position.toArray()}
      rotation={value.rotation.toArray()}
      scale={value.scale.toArray()}
    >
      {material}
      {value.geometry && (
        <Outlines
          color={"#c2fdab"}
          scale={1}
          thickness={hovered ? 2 : 0}
          transparent
          opacity={1}
        />
      )}
    </mesh>
  );
};

export function People(props: JSX.IntrinsicElements["group"]) {
  const { nodes }: any = useGLTF("/business_people.glb") as GLTFResult;
  const searchParams = useSearchParams();

  const personKeys = ["2__0", "7__0", "8__0"];
  const brainKeys = ["brain", "brain_two", "brain_three"];
  const brainGeo = useMemo(() => nodes.brain.geometry, [nodes]);

  return (
    <motion3d.group
      initial={{ scale: 0 }}
      animate={
        searchParams.get("focusGroup") === "Business"
          ? {
            scale: 0.1,
            transition: {
              delay: 1.8,
              type: "spring",
              damping: 30,
              stiffness: 50,
              restDelta: 0.001,
            },
          }
          : { scale: 0 }
      }
      dispose={null}
      position={[0.075, 1.1, 0.075]}
    >
      {personKeys.map((key, index) => {
        const value = nodes[key];
        return <Person key={key} value={value} index={index + 1} />;
      })}

      {/* <Instances geometry={brainGeo}> */}
      {/* <meshStandardMaterial color="#e2ca41" metalness={1} roughness={0.1} /> */}
      {brainKeys.map((key, index) => {
        const brainNode = nodes[key];
        return (
          <motion3d.mesh
            position={brainNode.position.toArray()}
            rotation={brainNode.rotation.toArray()}
            scale={brainNode.scale.toArray()}
            key={key}
            geometry={brainGeo}
            initial={{ scale: 0.5, x: 0, y: brainNode.position.toArray()[1] - 0.5, z: 0 }}
            animate={
              searchParams.get("focusGroup")
                ? {
                  scale: [1.5, 1, 0.17],
                  x: [0, 0, brainNode.position.toArray()[0]],
                  y: [brainNode.position.toArray()[1] - 0.5, brainNode.position.toArray()[1] - 0.5, brainNode.position.toArray()[1]],
                  z: [0, 0, brainNode.position.toArray()[2]],
                  transition: { duration: 4, times: [0, 0.8, 1] }
                }
                : { scale: 0, x: 0, y: brainNode.position.toArray()[1], z: 0 }
            }

          >
            <motion3d.meshStandardMaterial
              initial={{ opacity: 0 }}
              animate={searchParams.get("focusGroup") ?
                {
                  opacity: 1, transition: {
                    delay: 0 + ((index + 1) / 10),
                    type: "spring",
                    damping: 30,
                    stiffness: 60
                  }
                } :
                { opacity: 0 }}
              color="#e2ca41"
              metalness={1}
              roughness={0.1}
              toneMapped

            />
          </motion3d.mesh>
        );
      })}
      {/* </Instances> */}

      <CustomBezierLine
        start={nodes.brain.position.toArray()}
        end={nodes.brain_two.position.toArray()}
        control={[
          (nodes.brain.position.x + nodes.brain_two.position.x) / 2,
          (nodes.brain.position.y + nodes.brain_two.position.y) / 2 + 0.5,
          (nodes.brain.position.z + nodes.brain_two.position.z) / 2,
        ]}
        index={1}
        color="#fcea7f"
      />
      <CustomBezierLine
        start={nodes.brain_two.position.toArray()}
        end={nodes.brain_three.position.toArray()}
        control={[
          (nodes.brain_two.position.x + nodes.brain_three.position.x) / 2,
          (nodes.brain_two.position.y + nodes.brain_three.position.y) / 2 + 0.5,
          (nodes.brain_two.position.z + nodes.brain_three.position.z) / 2,
        ]}
        index={2}
        color="#fcea7f"
      />
      <CustomBezierLine
        start={nodes.brain_three.position.toArray()}
        end={nodes.brain.position.toArray()}
        control={[
          (nodes.brain_three.position.x + nodes.brain.position.x) / 2,
          (nodes.brain_three.position.y + nodes.brain.position.y) / 2 + 0.5,
          (nodes.brain_three.position.z + nodes.brain.position.z) / 2,
        ]}
        index={3}
        color="#fcea7f"
      />
    </motion3d.group>
  );
}

// useGLTF.preload("/business_people.glb");
