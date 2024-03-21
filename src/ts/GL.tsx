
import { Billboard, Bounds, Bvh, CameraControls, ContactShadows, Float, GradientTexture, Grid, Instance, Instances, MeshReflectorMaterial, OrbitControls, OrthographicCamera, PerspectiveCamera, Shadow, useGLTF } from "@react-three/drei";
import { Canvas, Vector3, extend, ReactThreeFiber, useThree } from "@react-three/fiber";
import { forwardRef, useEffect, useRef, useState } from "react";
import { RoundedPlaneGeometry } from "maath/geometry";
import * as geometry from "maath/geometry";
import { CubicBezierCurve3, CatmullRomCurve3 } from "three";
import CurveGL from "./FBO";
import { backgroundColors, currentDistance, leftCardViewer, loc, orbitTarget, rightCardViewer, servicesViewer } from "./atoms";
import { useAtom } from "jotai";
import { motion as motion3d } from "framer-motion-3d"
import { useAnimate, useAnimation, useMotionValueEvent, useScroll, useSpring } from "framer-motion";
import Clouds from "./Clouds";
import { Model } from "@/ts/landingGL/neuron";
import { NeuronNet } from "./NeuronNet";
import Human from "./landingGL/Human";
import { BloomFilter } from "next/dist/shared/lib/bloom-filter";
import Background from "./Background";
import { useRouter } from "next/router";



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
    const router = useRouter()
    const [target, setTarget]: any = useAtom<any>(orbitTarget);
    const cameraControls = useRef<CameraControls | null>(null);
    const [distance, setDistance] = useAtom(currentDistance)

    useEffect(() => {
        setTarget(router.pathname !== "/" ? { x: 0, y: 1, z: 0 } : target)
        cameraControls.current?.zoomTo(router.pathname !== "/" ? 1 : 1, true)
    }, [router.pathname]);

    useEffect(() => {
        console.log(target)
        cameraControls.current?.setTarget(target.x, target.y, target.z, true);

    }, [target])

    useEffect(() => {
        cameraControls.current?.zoomTo(distance, true)
    }, [distance]);
    return (
        <div className="canvas__wrapper">
            <Canvas
                camera={{ position: [0, 1.5, 30], fov: 45 }}
                dpr={[1, 1.5]}
                gl={{ antialias: true }}
                eventSource={props.eventSource}
                eventPrefix="client">

                <CameraControls onChange={(e) => { console.log("cahnge") }} smoothTime={0.5} ref={cameraControls} maxDistance={25} distance={25} minDistance={10} minPolarAngle={0} maxPolarAngle={Math.PI / 2} minAzimuthAngle={-Math.PI / 2} maxAzimuthAngle={Math.PI / 2} />
                {/* <OrbitControls ref={cameraControlsRef} makeDefault dampingFactor={0.05} minDistance={5} maxDistance={10} minPolarAngle={0} maxPolarAngle={Math.PI / 2} minAzimuthAngle={-Math.PI / 2} maxAzimuthAngle={Math.PI / 2} /> */}
                {/* <motion3d.mesh position={[0, 0, 0]} transition={{ type: "spring", stiffness: 50, damping: 15, restDelta: 0.001 }}
                ><PerspectiveCamera makeDefault fov={75} /></motion3d.mesh> */}
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
                    color="#111"
                    scale={5}
                    colorStop={0}
                    position={[-.5, -7, 0]}
                    opacity={0.2}
                    fog={false}
                />
                {/* </Bounds> */}
                {/* <Background /> */}
            </Canvas>
        </div >
    );
}

const WebGL = forwardRef<any, glProps>((props, ref) => (
    <GL eventSource={props.eventSource}></GL>
));
WebGL.displayName = "WebGL";

export default WebGL;