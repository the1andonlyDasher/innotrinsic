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
import { backgroundColors, orbitTarget } from "../atoms";
import { useRouter } from "next/router";

const materialVariants = {
    initial: { opacity: 0 },
    enter: { opacity: 1 },
    exit: { opacity: 0 },
};

const circleVariants = {
    initial: { scale: 0 },
    enter: { scale: 1 },
    exit: { scale: 0 },
};

const groupVariants = {
    initial: { scale: 0 },
    enter: { scale: 1 },
    exit: { scale: 0 },
};

interface IdeaProps {
    centerPoint: [number, number, number];
    position: [number, number, number];
    rotation: [number, number, number];
    duration: number;
    text: string;
    colors: string[];
    delayFactor: number;
}

const Idea: FunctionComponent<IdeaProps> = (props) => {
    {
        /*
                const bind = useGesture({
                        onTouchStartCapture: () => {
                            setHover(!hovered), console.log("touch");
                        },
                    });
                */
    }

    // router
    const router = useRouter();

    // refs
    const idea = useRef<any>(!null);
    const instance = useRef<any>(!null);
    const line = useRef<any>(!null);

    // states
    const [hovered, setHover] = useState(false);
    const [clicked, setClicked] = useState(false);
    const [disposed, setDisposed] = useState(false);
    const [isInPage, setIsInPage] = useState(false);

    // framer controls
    const sphereControls = useAnimation();
    const textControls = useAnimation();
    const groupControls = useAnimation();
    const subGroupControls = useAnimation();
    const circleControls = useAnimation();
    const controls = useAnimation();

    // cursor state
    useCursor(hovered);

    // atoms
    const [orbTarget, setOrbitTarget] = useAtom(orbitTarget)

    // random
    const rand =
        Math.round(Math.random()) === 1
            ? +Math.max(0.1, Math.min(Math.random(), 0.4))
            : -Math.max(0.1, Math.min(Math.random(), 0.4));

    // render loop
    useFrame((state) =>
        line.current.setPoints(props.centerPoint, idea.current.position)
    );


    // UEF for hover state
    useEffect(() => {
        sphereControls.start(hovered && clicked ? { scale: 1.5 } : clicked && !hovered ? { scale: 1.5 } : !clicked && hovered ? { scale: 1.5 } : { scale: 1 });
        textControls.start(hovered && clicked ? { scale: 0.75, y: 0.2 } : clicked && !hovered ? { scale: 0.75, y: 0.2 } : !clicked && hovered ? { scale: 0.75, y: 0.2 } : { scale: 0, y: 0 });
        circleControls.start(hovered && clicked ? { scale: 1, z: -102, } : clicked && !hovered ? { scale: 1, z: -102 } : !clicked && hovered ? { scale: 1 } : { scale: 0 });
        controls.start(hovered && clicked ? "enter" : clicked && !hovered ? "enter" : !clicked && hovered ? "enter" : "exit");
        hovered && clicked
            ? subGroupControls.stop() :
            clicked && !hovered
                ? subGroupControls.stop() :
                !clicked && hovered
                    ? subGroupControls.stop() :
                    subGroupControls.start({
                        x: props.position[0] + rand,
                        y: props.position[1] + rand,
                        z: props.position[2] + rand,
                    });
    }, [hovered, clicked]);

    // UEF for mounting and visibility
    useEffect(() => {
        if (router.pathname === "/") {
            setTimeout(() => {
                setDisposed(false);
                setIsInPage(true);
            }, 1000);
        } else {
            setTimeout(() => {
                groupControls.start("exit").then(() => {
                    setIsInPage(false), setDisposed(true);
                });
            }, 800);
        }
    }, [router.pathname]);

    useEffect(() => {
        if (isInPage) {
            groupControls.start("enter");
        }
    }, [isInPage]);
    const p: any = useRef()
    return (
        <>

            <motion3d.group
                initial="initial"
                variants={groupVariants}
                visible={!disposed}
                animate={groupControls}
            >
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
                    animate={
                        subGroupControls
                        // rotateY: props.rotation[0] + rand,
                        // rotateZ: props.rotation[1] + rand,
                        // rotateX: props.rotation[2] + rand,
                    }
                    transition={{
                        repeat: Infinity,
                        repeatType: "mirror",
                        duration: props.duration,
                        type: "tween",
                    }}
                >
                    <motion3d.group
                        animate={sphereControls}
                        transition={{
                            type: "spring",
                            damping: 10,
                            stiffness: 50,
                            restDelta: 0.001,
                        }}
                    >
                        <Billboard renderOrder={clicked ? 2 : 0}>
                            <motion3d.mesh
                                variants={circleVariants}
                                initial="initial"
                                animate={circleControls}
                                exit="exit"
                                transition={{
                                    type: "spring",
                                    damping: 20,
                                    stiffness: 100,
                                    restDelta: 0.1,
                                }}
                                position={[0, 0, -100]}
                            >
                                <circleGeometry args={[200, 50]} />
                                <motion3d.meshStandardMaterial
                                    transparent
                                    initial="initial"
                                    animate={controls}
                                    variants={materialVariants}
                                >
                                    <GradientTexture
                                        stops={[0, 1]}
                                        colors={props.colors}
                                        attach="map"
                                        size={1024}
                                    />
                                </motion3d.meshStandardMaterial>
                            </motion3d.mesh>
                        </Billboard>
                        <Instance
                            ref={instance}
                            // {...() => bind()}
                            // onPointerDown={(e) =>()}
                            onClick={(e) => (e.stopPropagation(), setClicked(true), p.current.updateWorldMatrix(true, true), setOrbitTarget(e.eventObject.localToWorld(p.current.position)))}
                            onPointerMissed={(e) => (setClicked(false), setOrbitTarget({ x: 0, y: 1, z: 0 }))}
                            onPointerOver={(e) => (e.stopPropagation(), setHover(true))}
                            onPointerOut={(e) => setHover(false)}
                        >
                            <mesh position={[0, 0, 0]} ref={p}></mesh>
                            {hovered ? (
                                <Outlines
                                    angle={0}
                                    color={"#ffffff"}
                                    thickness={0.02}
                                    toneMapped={false}
                                />
                            ) : clicked ?
                                <Outlines
                                    angle={0}
                                    color={"#ffffff"}
                                    thickness={0.03}
                                    toneMapped={false}
                                /> : null}
                            <Billboard>
                                <motion3d.group animate={textControls}>
                                    <Text
                                        lookAt={() => [0, 0, -5]}
                                        textAlign="center"
                                        anchorX="center"
                                        anchorY="bottom"
                                        color={"white"}
                                        font="/fonts/montserrat-alternates-v17-latin-700.ttf"
                                    >
                                        <meshBasicMaterial toneMapped={false} />
                                        {`${props.text}`}
                                    </Text>
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
            </motion3d.group>
        </>
    );
};

export default Idea;
