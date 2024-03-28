import {
    Billboard,
    Bounds,
    Bvh,
    CameraControls,
    ContactShadows,
    Float,
    GradientTexture,
    Grid,
    Instance,
    Instances,
    MeshReflectorMaterial,
    OrbitControls,
    OrthographicCamera,
    PerspectiveCamera,
    Shadow,
    Stats,
    useGLTF,
} from "@react-three/drei";
import {
    Canvas,
    Vector3,
    extend,
    ReactThreeFiber,
    useThree,
} from "@react-three/fiber";
import { Suspense, forwardRef, useEffect, useRef, useState } from "react";
import { RoundedPlaneGeometry } from "maath/geometry";
import * as geometry from "maath/geometry";
import { CubicBezierCurve3, CatmullRomCurve3 } from "three";

import {
    backgroundColors,
    currentDistance,
    leftCardViewer,
    loc,
    orbitTarget,
    rightCardViewer,
    servicesViewer,
} from "./atoms";
import { useAtom } from "jotai";
import { motion as motion3d } from "framer-motion-3d";
import {
    useAnimate,
    useAnimation,
    useMotionValueEvent,
    useScroll,
    useSpring,
} from "framer-motion";
import { Model } from "@/ts/landingGL/neuron";
import { NeuronNet } from "./NeuronNet";
import Human from "./landingGL/Human";
import { BloomFilter } from "next/dist/shared/lib/bloom-filter";
import Background from "./Background";
import { useRouter } from "next/router";
import { useSearchParams } from "next/navigation";
import { ShakeHands } from "./landingGL/ShakeHands";
import { Model as Stacy } from "./landingGL/ShakeHands2";
import { Business } from "@/Business";
import { Input } from "./contactGL/ControlledInput";
import { Hand } from "@/Hand";

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
    const router = useRouter();
    const [target, setTarget]: any = useAtom<any>(orbitTarget);
    const cameraControls = useRef<CameraControls | null>(null);
    const [distance, setDistance] = useAtom(currentDistance);
    const searchParams = useSearchParams();

    useEffect(() => {

        cameraControls.current?.zoomTo(
            searchParams.get("view") !== null ? 3 : 1,
            true
        );

    }, [searchParams]);

    useEffect(() => {
        cameraControls.current?.setTarget(target.x, target.y, target.z, true);
    }, [target]);

    let coneRotation: any;
    coneRotation = coneRotation === undefined ? Math.PI * 3 : coneRotation;
    var i = 0;

    const radius = 4;
    const counter = 5;
    const r = ((Math.PI * 2) / counter) * i;
    const numIdeas = Array.from({ length: 5 });
    return (
        <div className="canvas__wrapper">
            <Canvas
                camera={{ position: [0, 1.5, 30], fov: 45 }}
                dpr={[1, 1.5]}
                gl={{ antialias: true }}
                eventSource={props.eventSource}
                eventPrefix="client"
            >
                <Stats />
                <CameraControls
                    boundaryEnclosesCamera
                    smoothTime={0.5}
                    ref={cameraControls}
                    maxDistance={25}
                    distance={25}
                    minDistance={10}
                    minPolarAngle={0}
                    maxPolarAngle={Math.PI / 2}
                    minAzimuthAngle={-Math.PI / 2}
                    maxAzimuthAngle={Math.PI / 2}
                />
                <GradientTexture
                    stops={[0, 1]}
                    colors={["#f6fff0", "#e5fcfc"]}
                    attach="background"
                    size={1024}
                />
                <ambientLight intensity={1.5} />
                <directionalLight intensity={10.5} color={"green"} />

                <Suspense>
                    <Float floatIntensity={0.1} rotationIntensity={0.5}>
                        <Human />
                        <Shadow
                            color="#111"
                            scale={5}
                            colorStop={0}
                            position={[-0.5, -7, 0]}
                            opacity={0.2}
                            fog={false}
                        />
                    </Float>
                </Suspense>

                {router.pathname === "/kontakt" && <>
                    <Hand scale={2} rotation={[0, Math.PI / 1.25, 0]} position={[0, -2, -2]} />
                    <Input scale={2} position={[0.4, 0.25, -1]} />
                </>}
            </Canvas>
        </div>
    );
};

const WebGL = forwardRef<any, glProps>((props, ref) => (
    <GL eventSource={props.eventSource}></GL>
));
WebGL.displayName = "WebGL";

export default WebGL;
