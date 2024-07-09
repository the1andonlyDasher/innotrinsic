import React, { useState, useEffect, FC, useRef } from "react";
import {
    Canvas,
    Color,
    MeshProps,
    extend,
    useFrame,
    useThree,
} from "@react-three/fiber";
import {
    Html,
    Instances,
    Instance,
    useGLTF,
    useTexture,
    Svg,
    Text,
    useCursor,
    Outlines,
    RoundedBox,
} from "@react-three/drei";
import { motion } from "framer-motion-3d";
import { AnimatePresence, MotionConfig, useAnimation } from "framer-motion";
import { useAtom } from "jotai";
import {
    globalModuleIndex,
    moduleSet,
    modulesViewer,
    openModule,
} from "./atoms";
import { globalAgent } from "http";
import { MeshStandardMaterial } from "three/src/materials/MeshStandardMaterial.js";
import Image from "next/image";
import { size } from "./utils";
import { motion as motion3d } from "framer-motion-3d";
import { useRouter } from "next/router";
import { Group } from "three";
import { lerp } from "./threeExport/math/MathUtils";

interface ModuleProps {
    position: [number, number, number];
    label: string;
    size: [number, number, number];
    svgSrc: string;
    color: string;
    textColor: string;
    UID: number;
    name: string;
}
interface CustomMeshProps extends MeshProps {
    color: Color | string | number;
    active: boolean;
}
extend({ MeshStandardMaterial });

interface TextMatProps {
    textColor: string;
}
const TextMaterial = (props: TextMatProps) => (
    <meshBasicMaterial toneMapped={false} color={props.textColor} />
);

const Mat: FC<CustomMeshProps> = ({ color, active, ...props }) => {
    return (
        <motion3d.meshStandardMaterial
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            roughness={0.3}
            transparent
            attach="material"
            color={color}
            toneMapped={false}
        />
    );
};

const Base: React.FC = () => {
    const { nodes }: any = useGLTF("/HTG.glb");
    const texture = useTexture("/images/Rastergrafik.png");
    // set ready state
    const [ready, setReady] = useState(false);
    // uef ready
    useEffect(() => {
        setTimeout(() => {
            setReady(true);
        }, 2000);
    }, []);
    //animation controls
    const controls = useAnimation();
    //animation trigger -> position
    useEffect(() => {
        ready &&
            controls.start({
                x: -0.15,
                y: -5,
                z: 0,
                rotateX: 0,
                rotateY: 0,
                rotateZ: 0,
            });
    }, [ready]);
    //atoms
    const [currentModule, setCurrentModule] = useAtom(openModule);
    const [hovered, setHover] = useState(false);
    useCursor(hovered);
    return (
        <motion.mesh
            onClick={() => {
                setCurrentModule("WhyToGo");
            }}
            onPointerEnter={() => {
                setHover(true);
            }}
            onPointerLeave={() => {
                setHover(false);
            }}
            scale={1.05}
            geometry={nodes.Plane.geometry}
            initial={{
                rotateX: Math.random(),
                rotateY: Math.random(),
                rotateZ: Math.random(),
                x: 0 - Math.random() * 10,
                y: -5.25 - Math.random() * 10,
                z: 0 + Math.random() * 10,
            }}
            animate={controls}
            transition={{ type: "spring", damping: 20, stiffness: 75 }}
        >
            <Mat active={true} color="#e7bf74" />
            <Outlines
                toneMapped={false}
                thickness={0.1}
                visible={hovered}
                color="hsl(52, 22%, 86%)"
            >
            </Outlines>
            <mesh position={[-5, 0.2, 1.01]} scale={[2.5, 1, 1]} rotation={[0, 0, 0]}>
                <planeGeometry args={[1.2 / 3, 1.5]} />
                <meshBasicMaterial
                    color={"#a17323"} alphaMap={texture} toneMapped={false} transparent map={texture} alphaTest={0.0125} />
            </mesh>
            <Text
                scale={[0.5, 0.55, 1]}
                position={[-2.5, 0.25, 1.2]}
                anchorY="middle"
                anchorX="center"
                lineHeight={1}
                font="/fonts/poppins-v21-latin-700.ttf"
            >
                <TextMaterial textColor={"#a17323"} />
                {`Let's Go!? \nWhy To Go?`}
            </Text>
        </motion.mesh>
    );
};

const Base_Left: React.FC = () => {
    const { nodes }: any = useGLTF("/BB.glb");
    const texture = useTexture("/images/Rastergrafik7.png");
    // set ready state
    const [ready, setReady] = useState(false);
    // uef ready
    useEffect(() => {
        setTimeout(() => {
            setReady(true);
        }, 2000);
    }, []);
    //animation controls
    const controls = useAnimation();
    //animation trigger -> position
    useEffect(() => {
        ready &&
            controls.start({
                x: -0.15,
                y: -5,
                z: 0,
                rotateX: 0,
                rotateY: 0,
                rotateZ: 0,
            });
    }, [ready]);
    //atoms
    const [currentModule, setCurrentModule] = useAtom(openModule);
    const [hovered, setHover] = useState(false);
    useCursor(hovered);
    return (
        <motion.mesh
            onClick={() => {
                setCurrentModule("BrainBasics");
            }}
            onPointerEnter={() => {
                setHover(true);
            }}
            onPointerLeave={() => {
                setHover(false);
            }}
            scale={1.05}
            geometry={nodes.left_module.geometry}
            initial={{
                rotateX: Math.random(),
                rotateY: Math.random(),
                rotateZ: Math.random(),
                x: 0 - Math.random() * 10,
                y: -5.25 - Math.random() * 10,
                z: 0 + Math.random() * 10,
            }}
            animate={controls}
            transition={{ type: "spring", damping: 20, stiffness: 75 }}
        >
            <Mat active={true} color="#5784a9" />
            <Outlines
                toneMapped={false}
                thickness={0.1}
                visible={hovered}
                color="hsl(52, 22%, 86%)"
            >
            </Outlines>
            <mesh position={[2.5, 0.2, 1.01]} scale={[2.5, 1, 1]} rotation={[0, 0, 0]}>
                <planeGeometry args={[1.2 / 3, 1.5]} />
                <meshBasicMaterial
                    color={"#ffffff"} alphaMap={texture} toneMapped={false} transparent map={texture} alphaTest={0.0125} />
            </mesh>
            <Text
                scale={[0.5, 0.55, 1]}
                position={[5, 0.25, 1.2]}
                anchorY="middle"
                anchorX="center"
                font="/fonts/poppins-v21-latin-700.ttf"
            >
                <TextMaterial textColor={"#ffffff"} />
                {`Brain Basics`}
            </Text>
        </motion.mesh>
    );
};

const Top: React.FC = () => {
    const { nodes }: any = useGLTF("/module_top.glb");
    const texture = useTexture("/images/Rastergrafik6.png");
    // set ready state
    const [ready, setReady] = useState(false);
    // uef ready
    useEffect(() => {
        setTimeout(() => {
            setReady(true);
        }, 2000);
    }, []);
    //animation controls
    const controls = useAnimation();

    // animation trigger -> cleanUp from random
    //atoms
    const [currentModule, setCurrentModule] = useAtom(openModule);
    const [hovered, setHover] = useState(false);
    useCursor(hovered);

    return (
        <motion.mesh
            onPointerEnter={() => {
                setHover(true);
            }}
            onPointerLeave={() => {
                setHover(false);
            }}
            onClick={() => {
                setCurrentModule(`LetsGo`);
            }}
            geometry={nodes.top.geometry}
            scale={[3, 1.25, 1]}
            initial={{
                rotateX: Math.random(),
                rotateY: Math.random(),
                rotateZ: Math.random(),

                x: 0 + Math.random() * 10,
                y: 2.25 + Math.random() * 10,
                z: 0 + Math.random() * 10,
            }}
            animate={
                ready && {
                    x: 0,
                    y: 2.25,
                    z: 0,
                    rotateX: 0,
                    rotateY: 0,
                    rotateZ: 0,
                }
            }
            transition={{ type: "spring", damping: 20, stiffness: 75 }}
        >
            <Mat active={true} color={"hsl(201, 50%, 55%)"} />
            <Outlines
                toneMapped={false}
                thickness={0.1}
                visible={hovered}
                color="hsl(52, 22%, 86%)"
            >
            </Outlines>
            <mesh position={[-0.5, -0.1, 1.01]} scale={[1.2, 1, 1]} rotation={[0, 0, 0]}>
                <planeGeometry args={[1.2 / 3, 1.2]} />
                <meshBasicMaterial color={"hsl(0, 0%, 100%)"} alphaMap={texture} toneMapped={false} transparent map={texture} alphaTest={0.0125} />
            </mesh>
            <Text
                scale={[0.35, 0.85, 1]}
                position={[0.6, -0.2, 1.2]}
                anchorY="middle"
                anchorX="center"
                font="/fonts/poppins-v21-latin-700.ttf"
            >
                {`Let's Go`}
                <TextMaterial textColor={"hsl(0, 0%, 100%)"} />
            </Text>
        </motion.mesh>
    );
};

const Module: React.FC<ModuleProps> = ({
    position,
    label,
    size,
    svgSrc,
    color,
    textColor,
    name,
}) => {
    // const { nodes }: any = useGLTF("/roundedCube.glb");
    const texture = useTexture(svgSrc);
    const [active, setActive] = useState(true);
    const [clicked, setClick] = useState(false);
    //atoms
    const [currentModule, setCurrentModule] = useAtom(openModule);

    const [hovered, setHover] = useState(false);
    useCursor(hovered);

    return (
        <>
            {size[1] !== 0 && (
                <motion.group
                    onPointerEnter={() => {
                        setHover(true);
                    }}
                    onPointerLeave={() => {
                        setHover(false);
                    }}
                    onClick={() => {
                        setCurrentModule(name);
                    }}
                    initial={{
                        rotateX: Math.random(),
                        rotateY: Math.random(),
                        rotateZ: Math.random(),
                        x: position[0],
                        y: position[1],
                        z: position[2],
                        scale: 0,
                    }}
                    animate={{
                        rotateX: 0,
                        rotateY: 0,
                        rotateZ: 0,
                        x: position[0],
                        y: position[1],
                        z: position[2],
                        scale: 1,
                    }}
                    exit={{
                        rotateX: Math.random(),
                        rotateY: Math.random(),
                        rotateZ: Math.random(),
                        x: position[0],
                        y: position[1],
                        z: position[2],
                        scale: 0,
                    }}
                >
                    <RoundedBox scale={2} args={[size[0], size[1]]}>

                        <Mat active={active} color={color} />
                        <Outlines
                            scale={[0.95, 1, 1]}
                            toneMapped={false}
                            thickness={0.1}
                            visible={hovered}
                            color="hsl(52, 22%, 86%)"
                        >
                        </Outlines>
                        <mesh position={[-0.9, 0, 0.6]} rotation={[0, 0, 0]}>
                            <planeGeometry args={[0.8 / 1.5, 0.8]} />
                            <meshBasicMaterial color={textColor} alphaMap={texture} toneMapped={false} transparent map={texture} alphaTest={0.0125} />
                        </mesh>
                        <Text
                            scale={
                                size[1] === 1.01 // four
                                    ? [size[0] / 13, size[1] / 3.5, 1]
                                    : size[1] === 2 // big one
                                        ? [0.25, 0.5, 2]
                                        : size[1] === 0.666
                                            ? [0.1, 0.666, 1] // three ones
                                            : [0.23, 0.35, 1]
                            }
                            position={[0.35, 0, 0.6]}
                            maxWidth={
                                size[1] === 1.01 // four
                                    ? size[0] * 2
                                    : size[1] === 2 // big one
                                        ? size[0] / 2
                                        : size[1] === 0.666
                                            ? size[0] * 3 // three ones
                                            : size[0] * 4
                            }
                            anchorY="middle"
                            lineHeight={1.2}
                            anchorX="center"
                            textAlign="center"
                            overflowWrap="normal"
                            font="/fonts/poppins-v21-latin-700.ttf"
                        >
                            <TextMaterial textColor={textColor} />
                            {label}
                        </Text>
                    </RoundedBox>
                </motion.group>
            )}
        </>
    );
};

const Game: React.FC = () => {
    const [currentModuleSet, setModuleSet] = useAtom(moduleSet);
    const [globalIndex, setGlobalIndex] = useAtom(globalModuleIndex);
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

    const [ms, setMS] = useState(Object.entries(currentModuleSet.first));

    useEffect(() => {
        if (globalIndex == 0) {
            setMS(Object.entries(currentModuleSet.first));
        } else if (globalIndex === 1) {
            setMS(Object.entries(currentModuleSet.second));
        } else if (globalIndex === 2) {
            setMS(Object.entries(currentModuleSet.third));
        } else if (globalIndex === 3) {
            setMS(Object.entries(currentModuleSet.fourth));
        } else {
            setMS(Object.entries(currentModuleSet.fifth));
        }
    }, [globalIndex]);

    return (
        <group
            ref={group}
            position={pos}
            visible={router.pathname === "/business"}
            scale={size(0.5, viewport.width / 12, 1.5)}
        >
            <Top />
            <AnimatePresence initial mode="wait">
                <MotionConfig
                    transition={{
                        type: "spring",
                        damping: 15,
                        stiffness: 55,
                        restDelta: 0.01,
                    }}
                >
                    {ms.map(([item, { position, label, size, svgSrc, color, textColor, UID }]) => (
                        <Module
                            name={item}
                            key={UID}
                            UID={UID}
                            position={position}
                            color={color}
                            textColor={textColor}
                            svgSrc={svgSrc}
                            label={`${label}`}
                            size={size}
                        />
                    ))}
                </MotionConfig>
            </AnimatePresence>
            <Base />
            <Base_Left />
        </group>
    );
};

export default Game;
