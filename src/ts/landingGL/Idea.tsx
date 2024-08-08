import {
    Instance,
    Outlines,
    Text,
    useCursor,
} from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useAnimation } from "framer-motion";
import { motion as motion3d } from "framer-motion-3d";
import {
    FunctionComponent,
    MutableRefObject,
    Suspense,
    useEffect,
    useRef,
    useState,
} from "react";

import { useRouter } from "next/router";

import { useSearchParams } from "next/navigation";

import MorphingMesh from "./Bubble";
import { transition as t, transition } from '../utils';
import CustomBillboard from "../CustomBillboard";
import { ShaderMaterial } from "three";
import BShader from "./BubbleShader";

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
    r: number;
    rotation: [number, number, number];
    duration: number;
    text: string;
    colors: string[];
    delayFactor: number;
    active: boolean;
    children?: any;
    index: number;
    scroll: MutableRefObject<number>;
    ShaderMaterialRef: MutableRefObject<ShaderMaterial>
}

const Idea: FunctionComponent<IdeaProps> = (props) => {
    // router
    const router = useRouter();
    const searchParams = useSearchParams();

    // refs
    const idea = useRef<any>(!null);
    const instance = useRef<any>(!null);
    const line = useRef<any>(!null);

    //three helper
    const { viewport } = useThree();
    const radius = Math.max(2.25, Math.min(viewport.width / 10, 2.5));

    // states
    const [hovered, setHover] = useState(false);
    const [clicked, setClicked] = useState(false);

    const [disposed, setDisposed] = useState(false);
    const [isInPage, setIsInPage] = useState(false);
    const [r, setR] = useState(((Math.PI * 1.15) / props.r) * props.index);
    const [position, setPosition] = useState<number[]>([
        Math.cos(r) * radius,
        Math.sin(r) * (radius / 1.45),
        0,
    ]);

    // framer controls
    const sphereControls = useAnimation();
    const textControls = useAnimation();
    const groupControls = useAnimation();
    const subGroupControls = useAnimation();
    const controls = useAnimation();
    const textMatControls = useAnimation();

    // cursor state
    useCursor(hovered);

    // random
    const rand =
        Math.round(Math.random()) === 1
            ? +Math.max(0.1, 0.1 + Math.random() * 0.1)
            : -Math.max(0.1, 0.1 + Math.random() * 0.1);

    // // render loop
    // useFrame((state) => {
    //     line.current.setPoints(props.centerPoint, idea.current.position);
    //     line.current.needsUpdate = true;
    // });


    //uef for router state change
    useEffect(() => {
        if (router.pathname === "/" && !searchParams.get("view")) {
            setClicked(false);
            setHover(false);
        }

    }, [router.pathname, searchParams]);

    // UEF for hover state
    useEffect(() => {

        textControls.start(
            hovered && clicked
                ? { scale: 0.75, y: 0.9, z: -0.2, transition: t({ delay: 0 }) }
                : clicked && !hovered
                    ? {
                        scale: Math.max(0.75, Math.min(viewport.width / 20, 0.9)),
                        y: 0.5,
                        z: 0.2, transition: t({ delay: 0 })

                    }
                    : !clicked && hovered
                        ? { scale: 0.75, y: 0.5, z: 0, transition: t({ delay: 0 }) }
                        : { scale: 0.65, y: 0.3, z: 0, transition: t({ delay: 0.5 }) }
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
            searchParams.get("focusGroup") ? "exit" :
                searchParams.get("neuron") === props.text && clicked ? "clicked" :
                    searchParams.get("neuron") && !clicked ? "hide" : hovered ? "enter" : "initial"
        );
    }, [hovered, clicked, searchParams]);




    useEffect(() => {
        groupControls.start(searchParams.get("test") ? "exit" : "enter");
        setClicked(searchParams.get("neuron") === props.text ? true : false);
        sphereControls.start(
            !clicked
                ? { scale: 1, transition: t({ delay: 0.5 }) }
                : searchParams.get("neuron") !== props.text
                    ? { scale: 1, transition: t({ delay: 0.5 }) }
                    : { scale: 1.5 }
        );

    }, [searchParams]);

    // UEF for mounting and visibility for scrolling on index page
    useEffect(() => {
        const enterHomePage = () => {
            handleEnter(
                Math.cos(((Math.PI * 1.15) / props.r) * props.index) * radius,
                Math.sin(((Math.PI * 1.15) / props.r) * props.index) * radius / 1.45,
                0,
                0.5
            );
        };

        const enterEinsatzgebietePage = () => {
            handleEnter(
                Math.sin(((Math.PI * 2) / props.r) * props.index) * radius,
                0,
                Math.cos(((Math.PI * 2) / props.r) * props.index) * radius,
                0.5
            );
        };

        const handleEnter = (x: any, y: any, z: any, delay: any) => {
            subGroupControls.start({
                x: x,
                y: y,
                z: z,
                transition: t({ delay: delay })
            });
        };

        const handleExit = (delay: any) => {
            textMatControls.start("exit");
            sphereControls.start({ scale: 0 });
            subGroupControls.start({ x: 0, y: 0, z: 0, transition: t({ delay: delay }) });
            groupControls.start("exit").then(() => {
                setTimeout(() => {
                    setIsInPage(false);
                    setDisposed(true);
                }, 0);
            });
        };

        if (router.pathname === "/") {
            if (props.scroll.current < 0.015) {
                if (disposed) {
                    setDisposed(false);
                    setIsInPage(true);
                    setTimeout(() => {
                        enterHomePage();
                    }, 500)
                } else {
                    setTimeout(() => {
                        enterHomePage();
                    }, 500)
                }
            } else {
                handleExit(0.0);
            }
        } else if (router.pathname === "/einsatzgebiete") {
            if (disposed) {
                setDisposed(false);
                setIsInPage(true);
                setTimeout(() => {
                    enterEinsatzgebietePage();
                }, 500)
            } else {
                setTimeout(() => {
                    enterEinsatzgebietePage();
                }, 500)
            }
        } else {
            handleExit(0.5);
        }
    }, [router.pathname, props.scroll.current]);




    const [groupVisible, setGroupVisible] = useState(true)
    useEffect(() => {
        if (searchParams.get("focusGroup")) {
            setTimeout(() => { setGroupVisible(false) }, 1300)
        } else {
            setGroupVisible(true)
        }
    }, [searchParams]);

    useEffect(() => {
        if (isInPage) {
            groupControls.start("enter");
            sphereControls.start({ scale: 1, transition: t({ delay: 0.5 }) });
            textMatControls.start("initial")
        }
    }, [isInPage]);


    return (
        <>

            <motion3d.group
                initial="initial"
                variants={groupVariants}
                // visible={!disposed}
                animate={groupControls}
                transition={t({ delay: 0.5 + props.delayFactor / 10 })}
            >

                <motion3d.group
                    ref={idea}
                    initial={{
                        x: position[0],
                        y: position[1],
                        z: position[2],
                    }}
                    animate={subGroupControls}
                // transition={transition({ delay: 0 })}
                >
                    <CustomBillboard >

                        <motion3d.group
                            animate={textControls}
                            visible={groupVisible}

                        >

                            <Text
                                lookAt={() => [0, 0, -5]}
                                scale={Math.max(0.35, Math.min(viewport.width / 20, 0.4))}
                                textAlign="center"
                                maxWidth={clicked ? 10 : 0.4}
                                lineHeight={1.2}
                                position={[0, 0.1, 0]}
                                anchorX="center"
                                overflowWrap="normal"
                                strokeWidth={0}

                                anchorY="bottom"
                                font="/fonts/poppins-v21-latin-800.ttf"
                            >
                                <motion3d.meshBasicMaterial
                                    color={"#475946"}
                                    toneMapped={false}
                                    initial="initial"
                                    animate={textMatControls}
                                    exit="exit"
                                    variants={{
                                        initial: { opacity: 1, color: "#475946" },
                                        hide: { opacity: 0.1, color: "#475946" },
                                        enter: { opacity: 1, color: "#ffffff" },
                                        clicked: { opacity: 0, color: "#ffffff" },
                                        exit: { opacity: 0, color: "#475946" },
                                    }}
                                />
                                {`${props.text}`}
                            </Text>

                        </motion3d.group>

                        <motion3d.group
                            animate={sphereControls}

                            visible={groupVisible}
                        >
                            {/* <Billboard>
                            <motion3d.mesh
                          
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
                        </Billboard> */}
                            <Instance
                                name={props.text}
                                ref={instance}
                                onClick={(e) => (
                                    searchParams.get("view") ? null :

                                        router.push(
                                            router.pathname === "/" ? router.pathname :
                                                router.pathname + `?view=true&neuron=${props.text}`,
                                            undefined,
                                            {
                                                shallow: true,
                                            }
                                        )
                                )}
                                onPointerMissed={(e) => (

                                    searchParams.get("focusGroup") ? null :
                                        searchParams.get("view") !== null &&
                                        router.replace(
                                            router.pathname === "/" ? "/" : router.pathname,
                                            undefined,
                                            { shallow: true }
                                        ))
                                }
                                onPointerOver={(e) => (
                                    e.stopPropagation(),
                                    setHover(searchParams.get("view") !== null ? false : true)
                                )}
                                onPointerOut={(e) => setHover(false)}
                                position={[0, 0, 0]}
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
                            <MorphingMesh
                                position={[0, 0, 0]}
                                clicked={clicked}
                                focused={searchParams.get("focusGroup") !== null}
                                inactive={searchParams.get("neuron") !== null && searchParams.get("neuron") !== props.text}
                                textureUrl={"/images/business_img.jpg"}
                                count={1}
                            />


                            <Suspense fallback={null}>
                                <motion3d.group
                                    initial={{ scale: 0 }}
                                    animate={
                                        clicked
                                            ? {
                                                scale: 1,
                                                transition: {
                                                    type: "spring",
                                                    damping: 10,
                                                    stiffness: 50,
                                                    restDelta: 0.01,
                                                    delay: 0.5,
                                                },
                                            }
                                            : { scale: 0 }
                                    }
                                >
                                    {props.children}
                                </motion3d.group>
                            </Suspense>
                        </motion3d.group>
                    </CustomBillboard>
                </motion3d.group >
                {/* 
                {idea && (
                    <QuadraticBezierLine
                        dashed
                        visible={!searchParams.get("focusGroup")}
                        color={searchParams.get("neuron") === props.text ? "#ffffff" : "#a3b57a"}
                        dashScale={10}
                        lineWidth={3}
                        start={idea.current?.position}
                        end={props.centerPoint}
                        ref={line}
                        opacity={
                            searchParams.get("neuron")
                                ? 0.2
                                : 1
                        }
                        transparent
                    />
                )
                } */}
            </motion3d.group >

        </>
    );
};

export default Idea;
