
import { Billboard, Bounds, Bvh, CameraControls, ContactShadows, Float, GradientTexture, Grid, Instance, Instances, MeshReflectorMaterial, OrbitControls, OrthographicCamera, PerspectiveCamera, Shadow, useGLTF } from "@react-three/drei";
import { Canvas, Vector3, extend, ReactThreeFiber, useThree } from "@react-three/fiber";
import { forwardRef, useEffect, useRef, useState } from "react";
import { RoundedPlaneGeometry } from "maath/geometry";
import * as geometry from "maath/geometry";
import { CubicBezierCurve3, CatmullRomCurve3 } from "three";
import CurveGL from "./FBO";
import { backgroundColors, leftCardViewer, loc, orbitTarget, rightCardViewer, servicesViewer } from "./atoms";
import { useAtom } from "jotai";
import { motion as motion3d } from "framer-motion-3d"
import { useAnimate, useAnimation, useMotionValueEvent, useScroll, useSpring } from "framer-motion";
import Clouds from "./Clouds";
import { Model } from "@/ts/landingGL/neuron";
import { NeuronNet } from "./NeuronNet";
import Human from "./landingGL/Human";
import { BloomFilter } from "next/dist/shared/lib/bloom-filter";



declare global {
    namespace JSX {
        interface IntrinsicElements {
            roundedPlaneGeometry: ReactThreeFiber.Object3DNode<
                RoundedPlaneGeometry,
                typeof RoundedPlaneGeometry
            >;
        }
    }
}

extend(geometry);


interface glProps {
    eventSource?: any;
}

const GL = (props: glProps) => {
    const leftCards = useRef<any>()
    const rightCards = useRef<any>()
    const v: Vector3 = [0, 2, 20]
    const [lCV, setLCV] = useAtom(leftCardViewer);
    const [rCV, setRCV] = useAtom(rightCardViewer);

    const setRightCoords = () => {
        const { width, height, left, top } =
            rightCards?.current.getBoundingClientRect();
        setRCV({ width, height, left, top });
    };

    const setLeftCoords = () => {
        const { width, height, left, top } =
            leftCards?.current.getBoundingClientRect();
        setLCV({ width, height, left, top });
    };

    function setCoords() {
        setLeftCoords();
        setRightCoords();
    }

    useEffect(() => {
        setCoords();
    }, []);

    useEffect(() => {
        if (typeof window !== "undefined") {
            window.addEventListener('scroll', setCoords, false);
        }
        return () => {
            window.removeEventListener('scroll', setCoords, false);
        };

    });

    useEffect(() => {
        window.addEventListener('resize', setCoords, false);
        return () => {
            window.removeEventListener('resize', setCoords, false);
        };
    });




    const cameraPositions: any = {
        0: { y: 0, x: 10, z: 0, rotateX: 0 },
        1: { y: 50, x: 0, z: -15, rotateX: -1.5 },
        2: { y: 2, x: 0, z: 0, rotateX: 0 },
        3: { y: 2, x: 0, z: 0, rotateX: 0 },
        4: { y: 2, x: 0, z: 0, rotateX: 0 },
        5: { y: 2, x: 0, z: 0, rotateX: 0 },
        6: { y: 2, x: 0, z: 0, rotateX: 0 },
    }


    const [target, setTarget]: any = useAtom<any>(orbitTarget);
    const [bgColors, setBGColors]: any = useAtom<any>(backgroundColors);
    const cameraControls = useAnimation();

    const { scrollYProgress } = useScroll({ container: props.eventSource })
    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        const xFloor = Math.floor(latest * 6);
        cameraControls.start(cameraPositions[xFloor]);
        // console.log(latest);
    })



    return (
        <div className="canvas__wrapper">
            <div className="fixed w-full h-full top-0 left-0 right-0 bottom-0 z-[-10]  content-grid">
                <div className="targetC">
                    <div ref={leftCards} className="flex flex-1 w-full"></div>
                    <div ref={rightCards} className="flex flex-1 w-full"></div>
                </div>
            </div >
            <Canvas
                // camera={{ position: [0, 4, 0], fov: 75, }}
                dpr={[1, 1.5]}
                gl={{ antialias: true }}
                eventSource={props.eventSource}
                eventPrefix="client">

                <OrbitControls makeDefault dampingFactor={0.05} minDistance={5} maxDistance={10} minPolarAngle={0} maxPolarAngle={Math.PI / 2} minAzimuthAngle={-Math.PI / 2} maxAzimuthAngle={Math.PI / 2} target={[0, 0, -5]} />
                {/* <CameraControls maxDistance={10} minDistance={5} makeDefault minPolarAngle={0} maxPolarAngle={Math.PI / 2} minAzimuthAngle={-Math.PI / 2} maxAzimuthAngle={Math.PI / 2} />
                <motion3d.mesh transition={{ type: "spring", stiffness: 50, damping: 15, restDelta: 0.001 }} initial={cameraPositions[0]} animate={cameraControls}
                ><PerspectiveCamera makeDefault fov={45} /></motion3d.mesh> */}
                {/* <color attach="background" args={["#F7FFF2"]}></color> */}
                {/* <fog attach={"fog"} args={["#0B1123", 5, 10]}></fog> */}
                <GradientTexture stops={[0, 1]} colors={["#f6fff0", "#e5fcfc"]} attach="background" size={1024} />

                <ambientLight intensity={1.5} />

                <directionalLight intensity={10.5} color={"green"} />
                {/* <Bounds fit clip observe margin={1.2}> */}
                <Float floatIntensity={0.1} rotationIntensity={0.5}>
                    <Human />
                </Float>
                <Shadow
                    color="#012828"
                    scale={5}
                    colorStop={0}
                    position={[-.5, -6, -5]}
                    opacity={0.2}
                    fog={false} // Reacts to fog (default=false)
                />
                {/* </Bounds> */}
            </Canvas>
        </div >
    );
}

const WebGL = forwardRef<any, glProps>((props, ref) => (
    <GL eventSource={props.eventSource}></GL>
));
WebGL.displayName = "WebGL";

export default WebGL;