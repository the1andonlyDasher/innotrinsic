import React, { useRef, useMemo, useLayoutEffect, FC, useState, ReactNode, MutableRefObject } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { motion as motion3d } from "framer-motion-3d";
import * as THREE from "three";
import BubbleShader from "./BubbleShader";
import { size } from "../utils";
import { lerp } from "three/src/math/MathUtils.js";

interface MorphingMeshProps {
    textureUrl: string;
    count: number;
    clicked: boolean;
    inactive: boolean;
    focused: boolean;
    position: [number, number, number]

}

const MorphingMesh: FC<MorphingMeshProps> = ({
    count,
    clicked,
    position,
    textureUrl,
    inactive,
    focused

}) => {


    const { viewport } = useThree();

    const planeGeom = useMemo(() => {
        const geom = new THREE.PlaneGeometry(size(1, viewport.width / 5, 2), size(1, viewport.width / 5, 2) * 0.666, 64, 64);
        geom.morphAttributes.position = [];

        const sphereFormation: number[] = [];
        const uvs = geom.attributes.uv as THREE.BufferAttribute;
        const uv = new THREE.Vector2();
        const V = new THREE.Vector3();
        for (let i = 0; i < uvs.count; i++) {
            uv.fromBufferAttribute(uvs, i);
            V.setFromSphericalCoords(
                0.35,
                Math.PI * (1 - uv.y),
                Math.PI * (uv.x - 0.5) * 2
            );
            sphereFormation.push(V.x, V.y, V.z);
        }
        geom.morphAttributes.position[0] = new THREE.Float32BufferAttribute(
            sphereFormation,
            3
        );
        return geom;
    }, []);




    const meshRefs = useRef<any>([]);

    useLayoutEffect(() => {
        meshRefs.current.forEach((mesh: any) => {
            if (mesh) {
                mesh.updateMorphTargets();
            }
        });
    }, [planeGeom]);

    useFrame(() => {
        if (meshRefs.current) {
            meshRefs.current.renderOrder = clicked ? 3 : 0;
            meshRefs.current.forEach((mesh: any) => {
                if (mesh) {
                    const influences = mesh.morphTargetInfluences!;
                    influences[0] = THREE.MathUtils.lerp(
                        influences[0],
                        clicked ? 0 : 1,
                        0.05
                    );
                }
            });
        }
    });

    const positions = useMemo(() => {
        const pos: [number, number, number][] = [];
        for (let i = 0; i < count; i++) {
            const angle = (i / count) * Math.PI * 2;
            pos.push([Math.cos(angle) * 10, 0, Math.sin(angle) * 10]);
        }
        return pos;
    }, [count]);

    return (
        <group position={position}>
            {positions.map((pos, i) => (
                <motion3d.mesh

                    key={i}
                    ref={(el: any) => (meshRefs.current[i] = el)}
                    geometry={planeGeom}

                    position={[0, 0, 0]}
                // position={pos}
                >
                    <BubbleShader
                        textureUrl={textureUrl}
                        clicked={clicked}
                        focused={focused}
                        inactive={inactive}
                    />
                </motion3d.mesh>
            ))}
        </group>
    );
};

export default MorphingMesh;
