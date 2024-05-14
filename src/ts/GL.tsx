import {
    CameraControls,
    Environment,
    Float,
    GradientTexture,
    OrbitControls,
    Shadow,
    Stats,
} from "@react-three/drei";
import {
    Canvas,
    extend,
    ReactThreeFiber,
    useThree,
} from "@react-three/fiber";
import { Suspense, forwardRef, useEffect, useLayoutEffect, useRef, useState } from "react";
import { RoundedPlaneGeometry } from "maath/geometry";
import * as geometry from "maath/geometry";
import {
    currentDistance,
    globalTarget,
    loc,
    orbitTarget,
} from "./atoms";
import { useAtom } from "jotai";
import {
    animate,
    useAnimation,
} from "framer-motion";
import { useRouter } from "next/router";
import { useSearchParams } from "next/navigation";
import { Mountain } from "@/Mountain";
import ContactGL from "./contactGL/ContactGL";
import BGText from "./BGText";
import { motion as motion3d } from "framer-motion-3d"
import Background from "./Background";
import Human from "./landingGL/Human";
import { Neurons } from "@/Neurons2";
import { Bloom, DepthOfField, EffectComposer, Noise, ToneMapping, Vignette } from '@react-three/postprocessing'
import { Model_Hands } from "@/Hands";
import { Model, Neuron } from "@/Neuron5";

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

type glProps = {
    eventSource?: any;
    scroll: any
}

const palette: any =
{
    dark: "#041220",
    lightgrey: "#d8dbdf",
    darkgrey: "#a6bdcc",
    blue: "#32689c",
    darkgreen: "#83aa06",
    lightgreen: "#b0e431",
    beige: "#eddfab",
    white: "#f8f3e0"
}


const targetColors: any = {
    landing: ["#698151", "#A5C791"],
    "/": ["#ffffff", "#fffde1"],
    science: ["#ffffff", "#fffde1"],
    symbols: ["#ffffff", "#fffde1"],
    perspective: ["#ffffff", "#fffde1"],
    braincare: ["#ffffff", "#fffde1"],
    universal: ["#ffffff", "#fffde1"],
    architekt: ["#ffffff", "#fffde1"],
    freund: ["#ffffff", "#fffde1"],
    head: ["#ffffff", "#fffde1"],
    services: ["#ffffff", "#fffde1"],
    faq: ["#ffffff", "#fffde1"],
    different: ["#ffffff", "#fffde1"],
    mountain: ["#ffffff", "#fffde1"],
}


const GL = (props: glProps) => {
    const router = useRouter();
    const [gTarget, setGTarget]: any = useAtom<any>(globalTarget);
    const cameraControls: any = useRef(null);
    const [location, setLocation] = useAtom(loc);
    const searchParams = useSearchParams();
    const controls = useAnimation();
    const primitiveRef = useRef<any>(!null);
    const [currentColor1, setColor1] = useState("#fffcef")
    const [currentColor2, setColor2] = useState("#96c972")
    const [controlsEnabled, setControlsEnabled] = useState(false)
    const [nextColor1, setNextColor1] = useState(targetColors[`${location}`][0])
    const [nextColor2, setNextColor2] = useState(targetColors[`${location}`][1])
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        setNextColor1(targetColors[`${location}`][0])
        setNextColor2(targetColors[`${location}`][1])
    }, [location]);

    useEffect(() => {
        animate(currentColor1, nextColor1, {
            type: "spring",
            stiffness: 30,
            damping: 10,
            restDelta: 0.001,
            onUpdate: (latest) => setColor1(latest),
        });
        animate(currentColor2, nextColor2, {
            type: "spring",
            stiffness: 30,
            damping: 10,
            restDelta: 0.001,
            onUpdate: (latest) => setColor2(latest),
        });
    }, [nextColor1, nextColor2]);

    useEffect(() => {
        const handleResize = () => {
            cameraControls.current?.setTarget(gTarget.x, gTarget.y, gTarget.z, true);
        };
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);



    useEffect(() => {
        console.log(props.eventSource.current)
    }, []);

    useEffect(() => {
        cameraControls.current?.zoomTo(
            searchParams.get("view") !== null ? 3 : 1,
            true
        );
    }, [searchParams]);

    useEffect(() => {
        cameraControls.current?.setTarget(gTarget.x, gTarget.y, gTarget.z, true);
        // controls.start({ x: target.x, y: target.y, z: target.z })

    }, [gTarget]);

    let coneRotation: any;
    coneRotation = coneRotation === undefined ? Math.PI * 3 : coneRotation;
    var i = 0;

    function resolveConnect(pathname: any) {
        return new Promise((resolve) => {
            if (pathname === "/einsatzgebiete") {
                setLoaded(true)
                cameraControls.current?.connect(props.eventSource.current)
            } else {
                cameraControls.current?.disconnect()
            }


        })
    }

    async function resetCamera(pathname: string) {
        cameraControls.current?.rotateTo(0, Math.PI / 2, true),
            cameraControls.current?.zoomTo(1, true)
        await resolveConnect(pathname)
    }

    useEffect(() => {
        resetCamera(router.pathname);
    }, [router.pathname]);

    return (
        <div className="canvas__wrapper">

            <Canvas
                camera={{ position: [0, 1.5, 30], fov: 45 }}
                dpr={[1, 1.5]}
                gl={{ antialias: true }}
                eventSource={props.eventSource}
                eventPrefix="client"
            >
                {/* <motion3d.mesh initial={{ x: target.x, y: target.y, z: target.z }} ref={primitiveRef} animate={controls}>
                    <boxGeometry args={[3, 3, 3]} />
                    <meshStandardMaterial color="beige" />
                </motion3d.mesh> */}
                {/* <Stats /> */}
                {/* <OrbitControls
                    // makeDefault={}
                    ref={cameraControls}
                    maxDistance={25}
                    enableZoom={false}
                    position={[10, 10, 1]}
                    minDistance={10}

                    minPolarAngle={0}
                    maxPolarAngle={Math.PI / 2}
                    minAzimuthAngle={-Math.PI / 2}
                    maxAzimuthAngle={Math.PI / 2}
                /> */}
                {loaded &&
                    <CameraControls
                        infinityDolly={false}
                        smoothTime={0.5}
                        ref={cameraControls}
                        polarAngle={Math.PI / 2}
                        azimuthAngle={0}
                        maxDistance={25}
                        enabled={loaded}
                        distance={25}
                        minDistance={10}
                        minPolarAngle={0}
                        maxPolarAngle={Math.PI / 2}
                        minAzimuthAngle={-Math.PI / 2}
                        maxAzimuthAngle={Math.PI / 2}
                    />}


                {/* <Neuron
                    scroll={props.scroll} /> */}



                <GradientTexture
                    stops={[0, 1]}
                    // colors={["#f6fff0", "#e5fcfc"]}
                    // colors={["#e5fcfc", "#E5F9A9"]}
                    // colors={["#e5fcfc", "#F8F3E0"]}
                    // colors={["#C8E99B", "#B0E431"]}
                    // colors={["#e5fcfc", "#96c972"]}
                    colors={[currentColor1, currentColor2]}
                    rotation={-0.95}
                    attach="background"
                    size={1024}
                />
                <Environment preset="apartment" blur={0} />
                {/* <ambientLight intensity={1.5} />
                <directionalLight intensity={2.5} color={"#BDED4C"} /> */}

                {/* <Model_Hands scroll={props.scroll} /> */}

                {/* <mesh>
                    <boxGeometry args={[3, 3, 3]} />
                    <meshStandardMaterial color="beige" />
                </mesh> */}
                {/* <Mountain scroll={props.scroll} /> */}
                {/* <Suspense>
                    <Float floatIntensity={0.1} rotationIntensity={0.5}>
                        <Human scroll={props.scroll} />
                       

                    </Float>
                </Suspense> */}
                {/* <BGText /> */}

                {/* <ContactGL /> */}
                <ambientLight intensity={1} />
            </Canvas>
        </div>
    );
};

const WebGL = forwardRef<any, glProps>((props, ref) => (
    <GL scroll={props.scroll} eventSource={props.eventSource}></GL>
));
WebGL.displayName = "WebGL";

export default WebGL;
