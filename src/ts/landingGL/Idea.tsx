import {
    Billboard,
    GradientTexture,
    Instance,
    Outlines,
    QuadraticBezierLine,
    Text,
    useCursor,
} from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useAnimation } from "framer-motion";
import { motion as motion3d } from "framer-motion-3d";
import { FunctionComponent, Suspense, useEffect, useRef, useState } from "react";
import { useAtom } from "jotai";
import { currentDistance, orbitTarget } from "../atoms";
import { useRouter } from "next/router";
import { Vector3 as V3 } from "@/ts/threeExport/math/Vector3";
import { useSearchParams } from "next/navigation";


const materialVariants = {
    visible: { opacity: 1 },
    hidden: { opacity: 0, transition: { delay: 0.1 } },
};

const circleVariants = {
    visible: { scale: 1 },
    hidden: { scale: 0 },

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
    active: boolean;
    children?: any;

}

const Idea: FunctionComponent<IdeaProps> = (props) => {
    // router
    const router = useRouter();
    const searchParams = useSearchParams();


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
    const controls = useAnimation();
    const textMatControls = useAnimation();

    //three helper
    const { viewport } = useThree();

    // cursor state
    useCursor(hovered);

    // atoms
    const [orbTarget, setOrbitTarget] = useAtom(orbitTarget);
    const [distance, setDistance] = useAtom(currentDistance);

    // random
    const rand =
        Math.round(Math.random()) === 1
            ? +Math.max(0.1, Math.min(Math.random(), 0.4))
            : -Math.max(0.1, Math.min(Math.random(), 0.4));

    // render loop
    useFrame((state) =>
        line.current.setPoints(props.centerPoint, idea.current.position)
    );

    //uef for router state change
    useEffect(() => {
        if (router.pathname !== "/") {
            setClicked(false);
            setHover(false);
        }
    }, [router.pathname]);

    // UEF for hover state
    useEffect(() => {
        sphereControls.start(
            hovered && clicked
                ? { scale: 1.5 }
                : clicked && !hovered
                    ? { scale: 1.5 }
                    : !clicked && hovered
                        ? { scale: 1.5 }
                        : { scale: 1 }
        );
        textControls.start(
            hovered && clicked
                ? { scale: 0.75, y: 0.9, z: -0.2 }
                : clicked && !hovered
                    ? { scale: Math.max(0.75, Math.min(viewport.width / 20, 0.9)), y: 0.9, z: -0.2 }
                    : !clicked && hovered
                        ? { scale: 0.75, y: 0.5, z: 0 }
                        : { scale: 0.65, y: 0.3, z: 0 }
        );

        controls.start(
            hovered && clicked
                ? "enter"
                : clicked && !hovered
                    ? "enter"
                    : !clicked && hovered
                        ? "enter"
                        : "exit"
        );
        textMatControls.start(
            hovered && clicked
                ? "enter"
                : clicked && !hovered
                    ? "enter"
                    : !clicked && hovered
                        ? "enter"
                        : "exit"
        );
        hovered && clicked
            ? subGroupControls.stop()
            : clicked && !hovered
                ? subGroupControls.stop()
                : !clicked && hovered
                    ? subGroupControls.stop()
                    : subGroupControls.start({
                        x: props.position[0] + rand,
                        y: props.position[1] + rand,
                        z: props.position[2] + rand,
                    });
    }, [hovered, clicked]);


    useEffect(() => {
        groupControls.start(searchParams.get("test") ? "exit" : "enter");
        setClicked(searchParams.get("neuron") === props.text ? true : false)
        textMatControls.start(searchParams.get("neuron") === null ? "visible" : searchParams.get("neuron") !== props.text ? "hide" : "visible")
        sphereControls.start(searchParams.get("neuron") === null ? { scale: 1 } : searchParams.get("neuron") !== props.text ? { scale: 1 } : { scale: 1.5 })
    }, [searchParams])

    useEffect(() => {
        setOrbitTarget
    }, [])


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



    const p: any = new V3();
    return (
        <>
            <motion3d.group
                initial="initial"
                variants={groupVariants}
                visible={!disposed}
                animate={groupControls}
                transition={{ type: "spring", duration: 0.5, damping: 20, stifness: 60, restDetla: 0.01, delay: props.delayFactor / 10 }}
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

                    <Billboard>
                        <motion3d.group animate={textControls} transition={{ type: "spring", damping: 10, stifness: 60, restDetla: 0.001 }}>
                            <Text
                                lookAt={() => [0, 0, -5]}
                                scale={Math.max(0.65, Math.min(viewport.width / 20, 0.75))}
                                textAlign="center"
                                anchorX="center"
                                strokeWidth={0}
                                renderOrder={5}
                                anchorY="bottom"
                                font="/fonts/montserrat-alternates-v17-latin-800.ttf"
                            >
                                <motion3d.meshBasicMaterial
                                    toneMapped={false}
                                    initial="initial"
                                    animate={textMatControls}
                                    variants={{
                                        initial: { color: "#061C32" },
                                        hide: { opacity: 0.2 },
                                        visible: { opacity: 1 },
                                        enter: { color: "#ffffff" },
                                        exit: { color: "#061C32" },
                                    }}
                                />
                                {`${props.text}`}
                            </Text>
                        </motion3d.group>
                    </Billboard>
                    <motion3d.group
                        animate={sphereControls}
                        transition={{
                            type: "spring",
                            damping: 10,
                            stiffness: 50,
                            restDelta: 0.001,
                        }}
                    >

                        <Billboard >
                            <motion3d.mesh
                                renderOrder={clicked ? 0 : -1}
                                variants={circleVariants}
                                animate={
                                    hovered && clicked
                                        ? "visible"
                                        : clicked && !hovered
                                            ? "visible"
                                            : !clicked && hovered
                                                ? "visible"
                                                : "hidden"
                                }
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
                                    toneMapped
                                    transparent
                                    variants={materialVariants}
                                >
                                    <GradientTexture
                                        stops={[0.3, 0.7]}
                                        colors={props.colors}
                                        attach="map"
                                        size={1024}
                                    />
                                </motion3d.meshStandardMaterial>
                            </motion3d.mesh>
                        </Billboard>
                        <Instance
                            name={props.text}
                            ref={instance}
                            // {...() => bind()}
                            // onPointerDown={(e) =>()}
                            onClick={(e) => (
                                e.stopPropagation(),
                                // setClicked(true),
                                // setDistance(3),
                                // setOrbitTarget(e.object.localToWorld(p.set(0, 0, 0))),
                                router.push(router.pathname + `?view=true&neuron=${props.text}`, undefined, {
                                    shallow: true,
                                })
                            )}

                            onPointerMissed={(e) => (
                                // setClicked(false),
                                // setDistance(1),
                                // setOrbitTarget({ x: 0, y: 1, z: 0 }),

                                searchParams.get("view") !== null && router.replace(router.pathname, undefined, { shallow: true })
                            )}
                            onPointerOver={(e) => (e.stopPropagation(), setHover(searchParams.get("view") !== null ? false : true))}
                            onPointerOut={(e) => setHover(false)}
                        >
                            {hovered ? (
                                <Outlines
                                    angle={0}
                                    color={"#ffffff"}
                                    thickness={0.02}
                                    transparent
                                    opacity={clicked ? 0.2 : 1}
                                    toneMapped={false}
                                />
                            ) : searchParams.get("neuron") === props.text ? (
                                <Outlines
                                    angle={0}
                                    transparent
                                    color={"#ffffff"}
                                    opacity={clicked ? 0.2 : 1}
                                    thickness={0.03}
                                    toneMapped={false}

                                />
                            ) : null}

                        </Instance>
                        <Suspense fallback={null}>
                            <motion3d.group
                                initial={{ scale: 0 }}
                                animate={clicked ? { scale: 1, transition: { type: "spring", damping: 10, stiffness: 50, restDelta: 0.01, delay: 0.5 } } : { scale: 0 }}

                            >
                                {props.children}
                            </motion3d.group>
                        </Suspense>
                    </motion3d.group>
                </motion3d.group>
                {idea && <QuadraticBezierLine
                    dashed
                    dashScale={10}
                    lineWidth={3}
                    start={idea.current?.position}
                    end={props.centerPoint}
                    ref={line}
                    isMaterial
                    opacity={
                        searchParams.get("neuron") === null ? 1 : searchParams.get("neuron") !== props.text ? 0.2 : 1
                    }
                    transparent
                >
                </QuadraticBezierLine>}
            </motion3d.group>
        </>
    );
};

export default Idea;
