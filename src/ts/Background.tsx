import { useAtom } from "jotai";
import { FunctionComponent, MutableRefObject, useEffect, useRef } from "react";
import { useAnimation } from "framer-motion";
import { motion as motion3d } from "framer-motion-3d"
import { Vector3, useFrame, useThree } from "@react-three/fiber";
import { Center, Float, Instance, Instances, QuadraticBezierLine, useAspect } from "@react-three/drei";
import { loc } from "./atoms";
import { size } from "./utils";
import { lerp } from "./threeExport/math/MathUtils";

interface BackgroundProps {
    position: [number, number, number];
    nextPos: [number, number, number];
    line: boolean;
    scroll: MutableRefObject<number>;
    index: number;
}

const materialVariants = {
    initial: { opacity: 0, color: "#d7e096" },
    animate: { opacity: 1, color: "#fdf5d1" },
    exit: { opacity: 0, color: "#d7e096" }
}

const Sphere: FunctionComponent<BackgroundProps> = (props) => {
    //refs
    const line = useRef<any>();
    const sphere = useRef<any>();
    //atoms
    const [location, setLocation] = useAtom(loc)
    // random
    const rand =
        Math.round(Math.random()) === 1
            ? +Math.max(0.1, Math.min(Math.random(), 0.2))
            : -Math.max(0.1, Math.min(Math.random(), 0.2));

    // render loop
    useFrame((state) =>
        props.line && line.current.setPoints(props.position, props.nextPos)
    );
    // three helpers
    const { width, height } = useThree((state) => state.viewport)
    const controls = useAnimation()
    const materialControls = useAnimation()
    useEffect(() => {
        location === "science" ?
            controls.start("animate") :
            controls.start("exit");
        location === "science" ?
            materialControls.start("animate") :
            materialControls.start("exit");
        if (props.line) {
            location === "science" ?
                setTimeout(() => {
                    line.current.material.opacity =
                        lerp(line.current.material.opacity, 1, 0.5)
                }, 500) :
                line.current.material.opacity =
                lerp(line.current.material.opacity, 0, 0.5)
        };
        console.log(line.current)
    }, [location])

    const sphereMaterial = <motion3d.meshStandardMaterial
        variants={materialVariants}
        initial="initial"
        animate={materialControls}
        exit="exit"
        transparent
        transition={{
            type: "spring",
            damping: 20,
            stiffness: 50,
            restDelta: 0.001,
            velocity: 1,
            delay: props.index / 5
        }}
    />

    return (
        <motion3d.group
            scale={2}
            rotation={[0, 0, 0]}>
            <motion3d.mesh ref={sphere}
                initial="initial"
                animate={controls}
                position={props.position}
                variants={{
                    initial: { y: props.position[0] - 1 },
                    animate: { y: props.position[1] },
                    exit: { y: props.position[2] + 1 },
                }}
                transition={{
                    type: "spring",
                    damping: 20,
                    stiffness: 50,
                    restDelta: 0.001,
                    velocity: 1,
                    delay: props.index / 5
                }}
            >
                {sphereMaterial}
                <sphereGeometry args={[2, 40, 40]} />
            </motion3d.mesh>
            {props.line && <motion3d.group
                initial="initial"
                animate={controls}
                variants={{
                    initial: { visibility: "hidden" },
                    animate: { visibility: "visible" },
                    exit: { visibility: "hidden" },
                }}
                transition={{
                    type: "spring",
                    damping: 20,
                    stiffness: 50,
                    restDelta: 0.001,
                    velocity: 1,
                    delay: props.index / 10
                }}
            >
                <QuadraticBezierLine
                    lineWidth={30}
                    start={props.position}
                    end={props.nextPos}
                    ref={line}
                    isMaterial
                    color={"#ffffff"}
                    transparent
                    toneMapped
                /></motion3d.group>}
        </motion3d.group>);
}

interface BGProps {
    scroll: MutableRefObject<number>
}

const Background: FunctionComponent<BGProps> = (props) => {
    const factor = 2;
    //atoms
    const [location, setLocation] = useAtom(loc)
    // three helpers
    const { viewport } = useThree()
    const [width, height] = useAspect(viewport.width, viewport.height)
    const controls = useAnimation()
    //UEF
    useEffect(() => {
        location === "science" ? controls.start("animate") : controls.start("exit")
    }, [location])
    return (
        <Float rotationIntensity={0.3} floatIntensity={0.3} floatingRange={[-0.2, 0.2]}>
            <Center rotation={[0, 0, 0.2]} top right position={[-width / 2, -height / 2 + viewport.width / 10, 0]}>
                <motion3d.group

                    rotation={[0, 0, -size(1.5, viewport.width / 10, Math.PI)]}
                    scale={size(0.5, viewport.width / 20, 1)}>




                    <Sphere
                        index={1}
                        scroll={props.scroll}
                        position={[-10 - factor, 0 + factor, 2 + factor]}
                        nextPos={[-5 - factor, 2 + factor, 1 + factor]}
                        line />
                    <Sphere
                        index={2}
                        scroll={props.scroll}
                        position={[-5 - factor, 2 + factor, 1 + factor]}
                        nextPos={[-2 + factor, 0 + factor, 3 + factor]}
                        line />
                    <Sphere
                        index={3}
                        scroll={props.scroll}
                        position={[-3 + factor, 0 + factor, 3 + factor]}
                        nextPos={[2 + factor, 1 - factor, -1 - factor]}
                        line />
                    <Sphere
                        index={4}
                        scroll={props.scroll}
                        position={[2 + factor, 1 - factor, -1 - factor]}
                        nextPos={[7 + factor, -1 + factor, 0 + factor]}
                        line />
                    <Sphere
                        index={5}
                        scroll={props.scroll}
                        position={[7 + factor, -1 + factor, 0 + factor]}
                        nextPos={[5 + factor, -3 + factor, 10 - factor]}
                        line={false} />


                </motion3d.group>
            </Center>
        </Float>)
}

export default Background;