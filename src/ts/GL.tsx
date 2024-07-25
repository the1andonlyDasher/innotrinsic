import {
    CameraControls,
    Environment,
    GradientTexture,


} from "@react-three/drei";
import {
    Canvas,
    extend,
    ReactThreeFiber,
} from "@react-three/fiber";
import { Suspense, forwardRef, useEffect, useRef, useState } from "react";
import { RoundedPlaneGeometry } from "maath/geometry";
import * as geometry from "maath/geometry";
import {

    glReady,
    globalTarget,
    loc,
    orbitTarget,

} from "./atoms";
import { useAtom } from "jotai";
import {
    animate,
    motion,
    useAnimation,
} from "framer-motion";
import { useRouter } from "next/router";
import { useSearchParams } from "next/navigation";



import { NewHead4 } from "@/3DModels/NewHead4";
import { Model } from "@/3DModels/BrainOnly";
import CustomBezierLine from "./CustomLine";
import Game from "./ModuleSpiel";
import WordCloud from "./brainBasicsGL/WordCloud";



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
    landing: ["#c5cf8f", "#89B069", "#699051"],
    landingBusiness: ["#ccf1fa", "#97b9c1", "#6790a5"],
    business: ["#e3f9ff", "#fffde1", "#fbffe1"],
    "/": ["#ffffff", "#fffde1", "#f6ffe1"],
    science: ["#ffffff", "#fffde1", "#fffde1"],
    symbols: ["#ffffff", "#fffde1", "#fffde1"],
    perspective: ["#ffffff", "#fffde1", "#fffde1"],
    braincare: ["#ffffff", "#fffde1", "#fffde1"],
    universal: ["#ffffff", "#fffde1", "#fffde1"],
    architekt: ["#ffffff", "#fffde1", "#fffde1"],
    freund: ["#ffffff", "#fffde1", "#fffde1"],
    head: ["#ffffff", "#fffde1", "#fffde1"],
    services: ["#ffffff", "#fffde1", "#fffde1"],
    faq: ["#ffffff", "#fffde1", "#fffde1"],
    different: ["#ffffff", "#fffde1", "#fffde1"],
    mountain: ["#ffffff", "#fffde1", "#fffde1"],
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
    const [currentColor2, setColor2] = useState("#c1e9a4")
    const [currentColor3, setColor3] = useState("#96c972")
    const [controlsEnabled, setControlsEnabled] = useState(false)
    const [nextColor1, setNextColor1] = useState(targetColors[`${location}`][0])
    const [nextColor2, setNextColor2] = useState(targetColors[`${location}`][1])
    const [nextColor3, setNextColor3] = useState(targetColors[`${location}`][2])
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        setNextColor1(targetColors[`${location}`][0])
        setNextColor2(targetColors[`${location}`][1])
        setNextColor3(targetColors[`${location}`][2])
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
        animate(currentColor3, nextColor3, {
            type: "spring",
            stiffness: 30,
            damping: 10,
            restDelta: 0.001,
            onUpdate: (latest) => setColor3(latest),
        });
    }, [nextColor1, nextColor2, nextColor3]);

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
        cameraControls.current?.setTarget(gTarget.x, gTarget.y - 1, gTarget.z, true);
    }, [gTarget]);

    let coneRotation: any;
    coneRotation = coneRotation === undefined ? Math.PI * 3 : coneRotation;
    var i = 0;

    function resolveConnect(pathname: string, searchParams: any) {
        return new Promise(() => {
            if (pathname === "/einsatzgebiete" && !searchParams.get("focusGroup") || searchParams.get("focus")) {
                setLoaded(true)
                cameraControls.current?.connect(props.eventSource.current)
            } else {
                cameraControls.current?.disconnect()
            }
        })
    }

    async function resetCamera(pathname: string, searchParams: any) {
        cameraControls.current?.rotateTo(0, Math.PI / 2, true),
            await resolveConnect(pathname, searchParams)
    }

    async function moveCamera(pathname: string, searchParams: any) {
        await resolveConnect(pathname, searchParams)
    }



    useEffect(() => {
        cameraControls.current?.zoomTo(
            searchParams.get("view") && !searchParams.get("focusGroup") ? 3 :
                searchParams.get("view") && searchParams.get("focusGroup") ? 3 :
                    1,
            true
        );
    }, [searchParams]);

    useEffect(() => {
        moveCamera(router.pathname, searchParams)
    }, [searchParams]);

    useEffect(() => {
        resetCamera(router.pathname, searchParams);
    }, [router.pathname]);

    const [shaderCompiled, setShaderCompiled] = useAtom(glReady);

    // Custom loader component
    const Loader = () => {
        return (
            <motion.div initial={{ display: "flex", opacity: 1 }} animate={shaderCompiled ? { opacity: 0, transitionEnd: { display: "none" } } : { display: "flex", opacity: 1 }} className="fixed z-50 top-0 left-0 bg-gradient-to-bl from-[#698151] to-[#A5C791] text-white font-header font-semibold text-2xl flex flex-col justify-center items-center w-full h-full" >
                Loading...
            </motion.div>
        );
    };

    const words = [
        "Think",
        "Act",
        "Move",
        "Motivation",
        "Satisfaction",
        "Flexible",
        "Exzellenz",
        "Kreativität",
        "Entscheiden",
        "Problemlösung",
        "Adaptability",
        "Fokus",
        "Resilienz",
        "Kollaboration",
        "Courage",
        "Engagement",
        "Effizienz",
        "Productivity"
    ]
    const colors = [
        "#e9f3ff",  // Brighter
        "#f4f9ff",  // Brighter
        "#f2ffdf",  // Brighter
        "#c6dfe8",  // Brighter
        "#c0c8b2",  // Brighter
        "#f0f7ff",  // Brighter
        "#e7f1ff",  // Brighter
        "#dfedb6",  // Brighter
        "#ecf8ff",  // Brighter
        "#e3ffb6",  // Brighter
        "#d5ebff",  // Brighter
        "#f5f8ff",  // Brighter
        "#f9ffdb",  // Brighter
        "#dde5f0",  // Brighter
        "#fdffec",  // Brighter
        "#f7faff",  // Brighter
        "#cfdff0"   // Brighter
    ];




    return (<>
        {/* {!shaderCompiled && <Loader />} */}
        <div className="canvas__wrapper">

            <Canvas
                camera={{ position: [0, 1.5, 30], fov: 45 }}
                dpr={[1, 1.5]}
                gl={{ antialias: true }}
                eventSource={props.eventSource}
                eventPrefix="client"

            >

                {/* <WordCloud words={words} colors={colors} /> */}
                {loaded &&
                    <CameraControls
                        infinityDolly={false}
                        smoothTime={0.5}
                        ref={cameraControls}
                        polarAngle={Math.PI / 2}
                        azimuthAngle={0}
                        maxDistance={25}
                        enabled={true}
                        distance={25}
                        minDistance={25}
                        minPolarAngle={0}
                        maxPolarAngle={Math.PI / 2}
                        minAzimuthAngle={-Math.PI / 2}
                        maxAzimuthAngle={Math.PI / 2}
                    />}
                {/* <Stats showPanel={0} /> */}
                {/* <Game /> */}
                <GradientTexture
                    stops={[0, 0.5, 1]}
                    width={100}
                    colors={[currentColor1, currentColor2, currentColor3]}
                    rotation={Math.PI / -2.5}
                    attach="background"
                    size={1024}
                />
                <NewHead4 scroll={props.scroll} />


                <Environment background={false} preset="apartment" blur={0} />



                <ambientLight intensity={0.2} />


            </Canvas>
        </div>
    </>
    );
};

const WebGL = forwardRef<any, glProps>((props, ref) => (
    <GL scroll={props.scroll} eventSource={props.eventSource}></GL>
));
WebGL.displayName = "WebGL";

export default WebGL;
