import {
    Billboard,
    GradientTexture,
    Instance,
    Outlines,
    QuadraticBezierLine,
    Text,
    useCursor,
} from "@react-three/drei";
import { Vector3, useFrame } from "@react-three/fiber";
import { animate, useAnimation } from "framer-motion";
import { motion as motion3d } from "framer-motion-3d";
import { FunctionComponent, useEffect, useRef, useState } from "react";
import { useGesture } from "@use-gesture/react";
import { useAtom } from "jotai";
import { backgroundColors } from "../atoms";

interface IdeaProps {
    centerPoint: [number, number, number];
    position: [number, number, number];
    rotation: [number, number, number];
    duration: number;
    text: string;
    colors: string[];
}

const Idea: FunctionComponent<IdeaProps> = (props) => {
    const bind = useGesture({
        onTouchStartCapture: () => {
            setHover(!hovered), console.log("otuch");
        },
    });
    const idea = useRef<any>(!null);
    const line = useRef<any>(!null);
    const [hovered, setHover] = useState(false);
    const animControls = useAnimation();
    const textControls = useAnimation();

    const circleControls = useAnimation();
    useCursor(hovered);
    const rand =
        Math.floor(Math.random() * 10) === 1
            ? +Math.max(0.1, Math.min(Math.random(), 1))
            : -Math.max(0.1, Math.min(Math.random(), 1));
    useFrame((state) =>
        line.current.setPoints(props.centerPoint, idea.current.position)
    );
    useEffect(() => {
        animControls.start(hovered ? { scale: 1.5 } : { scale: 1 });
        textControls.start(hovered ? { scale: 0.75, y: 0.2 } : { scale: 0, y: 0 });
        circleControls.start(hovered ? { scale: 1 } : { scale: 0 });
    }, [hovered]);

    return (
        <>
            <motion3d.group
                ref={idea}
                initial={{
                    x: props.position[0],
                    y: props.position[1],
                    z: props.position[2],
                    // rotateY: props.rotation[0],
                    // rotateZ: props.rotation[1],
                    // rotateX: props.rotation[2],
                }}
                animate={{
                    x: props.position[0] + rand,
                    y: props.position[1] + rand,
                    z: props.position[2] + rand,
                    // rotateY: props.rotation[0] + rand,
                    // rotateZ: props.rotation[1] + rand,
                    // rotateX: props.rotation[2] + rand,
                }}
                transition={{
                    repeat: Infinity,
                    repeatType: "mirror",
                    duration: props.duration,
                    type: "tween",
                }}
            >
                <motion3d.group
                    animate={animControls}
                    transition={{
                        type: "spring",
                        damping: 10,
                        stiffness: 50,
                        restDelta: 0.001,
                    }}
                ><Billboard>
                        <motion3d.mesh
                            initial={{ scale: 0 }}
                            animate={circleControls}
                            position={[0, 0, -100]}
                        >
                            <circleGeometry args={[200, 50]} />
                            <meshStandardMaterial>
                                <GradientTexture
                                    stops={[0, 1]}
                                    colors={props.colors}
                                    attach="map"
                                    size={1024}
                                />
                            </meshStandardMaterial>
                        </motion3d.mesh>
                    </Billboard>
                    <Instance
                        {...() => bind()}
                        onPointerOver={(e) => (e.stopPropagation(), setHover(true))}
                        onPointerOut={(e) => setHover(false)}
                    >
                        {hovered && (
                            <Outlines angle={0} color={"#ffffff"} thickness={0.02} toneMapped={false} />
                        )}
                        <Billboard>
                            <motion3d.group animate={textControls}>
                                <Text
                                    lookAt={() => [0, 0, -5]}
                                    textAlign="center"
                                    anchorX="center"
                                    anchorY="bottom"
                                    color={"white"}
                                    font="/fonts/montserrat-alternates-v17-latin-700.ttf"
                                ><meshBasicMaterial toneMapped={false} />{`${props.text}`}</Text>
                            </motion3d.group>

                        </Billboard>
                    </Instance>
                </motion3d.group>
            </motion3d.group>
            <QuadraticBezierLine
                dashed
                dashScale={10}
                start={idea.current.position}
                end={props.centerPoint}
                ref={line}
                color={"white"}
            />
        </>
    );
};

export default Idea;
