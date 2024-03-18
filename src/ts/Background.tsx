import { Billboard, GradientTexture } from "@react-three/drei";
import { useAtom } from "jotai";
import { FunctionComponent, useEffect } from "react";
import { backgroundColors } from "./atoms";
import { useAnimation } from "framer-motion";
import { motion as motion3d } from "framer-motion-3d"
import { useRouter } from "next/router";

interface BackgroundProps {

}

const Background: FunctionComponent<BackgroundProps> = () => {
    const [bgColors, setBGColors]: any = useAtom<any>(backgroundColors);
    const router = useRouter();
    const circleControls = useAnimation();
    const controls = useAnimation();
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

    useEffect(() => {
        if (bgColors[1] === "#e5fcfc") {
            circleControls.start("exit")
            controls.start("exit")
        } else {
            circleControls.start("enter")
            controls.start("enter")
        }

    }, [bgColors]);
    return (<Billboard>
        <motion3d.mesh
            variants={circleVariants}
            initial="initial"
            animate={"enter"}
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
                    colors={bgColors}
                    attach="map"
                    size={1024}
                />
            </motion3d.meshStandardMaterial>
        </motion3d.mesh>
    </Billboard>);
}

export default Background;