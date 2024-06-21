import React, { useState, useEffect, FC, useRef } from 'react';
import { Canvas, Color, MeshProps, extend, useFrame, useThree } from '@react-three/fiber';
import { Html, Instances, Instance, useGLTF, useTexture, Svg, Decal } from '@react-three/drei';
import { motion } from 'framer-motion-3d';
import { AnimatePresence, MotionConfig, useAnimation } from 'framer-motion';
import { useAtom } from 'jotai';
import { globalModuleIndex, moduleSet, modulesViewer } from './atoms';
import { globalAgent } from 'http';
import { MeshStandardMaterial } from 'three/src/materials/MeshStandardMaterial.js';
import Image from 'next/image';
import { size } from './utils';
import { motion as motion3d } from "framer-motion-3d"
import { useRouter } from 'next/router';
import { Group } from 'three';
import { lerp } from './threeExport/math/MathUtils';


type PositionArray = [number, number, number];
type PositionEntry = [PositionArray, string];

interface Positions {
    neu: PositionEntry;
    letsGo: PositionEntry;
    neuroloyalPlanen: PositionEntry;
    focusMe: PositionEntry;
    focusOutside: PositionEntry;
    letsGoHowToGo: PositionEntry;
}

interface ModuleProps {
    position: [number, number, number];
    label: string;
    size: [number, number, number];
    svgSrc: string;
    color: string;
    UID: number;
}
interface CustomMeshProps extends MeshProps {
    color: Color | string | number;
    active: boolean;

}
extend({ MeshStandardMaterial });

const Mat: FC<CustomMeshProps> = ({ color, active, ...props }) => {
    return (<motion3d.meshStandardMaterial
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}

        roughness={0.3}
        transparent
        attach="material"
        color={color}
        toneMapped={false} />)
};

const Base: React.FC = () => {
    const { nodes }: any = useGLTF("/module_base.glb")
    const texture = useTexture("/images/HowToGo.png")
    // set ready state
    const [ready, setReady] = useState(false)
    // uef ready
    useEffect(() => {
        setTimeout(() => {
            setReady(true)
        }, 2000)
    }, []);
    //animation controls
    const controls = useAnimation();
    //animation trigger -> position
    useEffect(() => {
        ready && controls.start({
            x: 0, y: -5, z: 0, rotateX: 0,
            rotateY: 0,
            rotateZ: 0,
        })
    }, [ready])

    // animation trigger -> cleanUp from random
    return (
        <motion.mesh
            geometry={nodes.base.geometry}
            initial={{
                rotateX: Math.random(),
                rotateY: Math.random(),
                rotateZ: Math.random(),
                x: 0 - Math.random() * 10,
                y: -5 - Math.random() * 10,
                z: 0 + Math.random() * 10
            }} animate={controls} transition={{ type: "spring", damping: 20, stiffness: 75 }}>
            <Mat active={true} color="#e7bf74" />

            <mesh scale={1.375} position={[0, 0, 1.1]} rotation={[0, 0, 0]}>
                <planeGeometry args={[1, 1, 1]} />
                <meshBasicMaterial
                    map={texture}
                    transparent
                    opacity={0}
                />
                <Decal
                    position={[0, 0, 0]}
                    scale={[0.9, 1, 1]}>
                    <meshBasicMaterial
                        map={texture}
                        color={"#9a845c"}
                        toneMapped={false}
                        alphaTest={0.5}
                        transparent
                        polygonOffset
                        polygonOffsetFactor={-1}
                    />
                </Decal>
            </mesh>
        </motion.mesh>)
}


const Top: React.FC = () => {
    const { nodes }: any = useGLTF("/module_top.glb")
    const texture = useTexture("/images/LetsGo2.png")
    // set ready state
    const [ready, setReady] = useState(false)
    // uef ready
    useEffect(() => {
        setTimeout(() => {
            setReady(true)
        }, 2000)
    }, []);
    //animation controls
    const controls = useAnimation();
    //animation trigger -> position
    useEffect(() => {
        ready && controls.start({
            x: 0, y: 2, z: 0, rotateX: 0,
            rotateY: 0,
            rotateZ: 0,
        })
    }, [ready])
    // animation trigger -> cleanUp from random
    return (
        <motion.mesh
            geometry={nodes.top.geometry}
            initial={{
                rotateX: Math.random(),
                rotateY: Math.random(),
                rotateZ: Math.random(),
                x: 0 + Math.random() * 10,
                y: 2 + Math.random() * 10,
                z: 0 + Math.random() * 10
            }} animate={controls} transition={{ type: "spring", damping: 20, stiffness: 75 }}>
            <Mat active={true} color={"hsl(201, 50%, 55%)"} />

            <mesh scale={1.375} position={[0, -.125, 1.1]} rotation={[0, 0, 0]}>
                <planeGeometry args={[1, 1, 1]} />
                <meshBasicMaterial
                    map={texture}
                    transparent
                    opacity={0}
                />
                <Decal
                    position={[0, 0, 0]}
                    scale={[0.9, 1, 1]}>
                    <meshBasicMaterial
                        map={texture}
                        color={"white"}
                        toneMapped={false}
                        alphaTest={0.5}
                        transparent
                        polygonOffset
                        polygonOffsetFactor={-1}
                    />
                </Decal>
            </mesh>
        </motion.mesh>)
}

const Module: React.FC<ModuleProps> = ({ position, label, size, svgSrc, color }) => {
    const { nodes }: any = useGLTF('/roundedCube.glb');
    const texture = useTexture(svgSrc)
    const [active, setActive] = useState(true);
    // animation trigger -> cleanUp from random
    return (<>
        {size[1] !== 0 &&
            <motion.group initial={{
                rotateX: Math.random(),
                rotateY: Math.random(),
                rotateZ: Math.random(),
                x: position[0],
                y: position[1],
                z: position[2],
                scale: 0
            }}
                animate={{
                    rotateX: 0,
                    rotateY: 0,
                    rotateZ: 0,
                    x: position[0],
                    y: position[1],
                    z: position[2],
                    scale: 1
                }}
                exit={{
                    rotateX: Math.random(),
                    rotateY: Math.random(),
                    rotateZ: Math.random(),
                    x: position[0],
                    y: position[1],
                    z: position[2],
                    scale: 0
                }}
            >
                <mesh scale={size} geometry={nodes.Cube.geometry}>
                    <Mat active={active} color={color} />
                    <Decal
                        position={[0, 0, 0.7]}
                        scale={size[1] === 2 ? [1.5, 1.5, 0.9] : size[1] === 1 ? [1.4, 1.4, 0.9] : [0.45, 1.5, 0.9]} >
                        <motion3d.meshBasicMaterial
                            map={texture}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            color={color === "#f4e5ca" ? "#b19c73" : color === "#bec6ae" ? "#858f6f" : "white"}
                            toneMapped={false}
                            alphaTest={0.5}
                            transparent
                            polygonOffset
                            polygonOffsetFactor={-1}
                        />
                    </Decal>
                </mesh>

            </motion.group>
        }
    </>
    );
};

const Game: React.FC = () => {
    const [currentModuleSet, setModuleSet] = useAtom(moduleSet)
    const [globalIndex, setGlobalIndex] = useAtom(globalModuleIndex)
    const [pvAtom, setPVAtom] = useAtom(modulesViewer);
    const router = useRouter();
    const { viewport } = useThree();
    const group = useRef<any>();
    const [pos, setPos] = useState<any>([]);
    const [scl, setScale] = useState<any>([]);

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
            size(0.5, viewport.width / 5, 1.5) -
            ((pvAtom?.height / window.innerHeight) * viewport.height) / 2 +
            viewport.height / 2 -
            (pvAtom?.top / window.innerHeight) * viewport.height,
            0,
        ];
        setPos(position);
        setScale(scale);
    }, [pvAtom]);

    const [ms, setMS] = useState(Object.entries(currentModuleSet.first))

    useEffect(() => {
        if (globalIndex == 0) {
            setMS(Object.entries(currentModuleSet.first))
        } else if (globalIndex === 1) {
            setMS(Object.entries(currentModuleSet.second))
        } else if (globalIndex === 2) {
            setMS(Object.entries(currentModuleSet.third))
        } else {
            setMS(Object.entries(currentModuleSet.fourth))
        }
    }, [globalIndex]);





    return (
        <group ref={group} position={pos} visible={router.pathname === "/business"}
            scale={size(0.5, viewport.width / 12, 1.5)} >
            <Top />
            <AnimatePresence initial mode="wait">
                <MotionConfig transition={{
                    type: "spring",
                    damping: 15,
                    stiffness: 55,
                    restDelta: 0.01,


                }}>
                    {ms.map(([label, { position, size, svgSrc, color, UID }]) =>
                        <Module key={UID} UID={UID} position={position} color={color} svgSrc={svgSrc} label={`${label}`} size={size} />
                    )}
                </MotionConfig>
            </AnimatePresence>
            <Base />
        </group>
    );
};

export default Game;
