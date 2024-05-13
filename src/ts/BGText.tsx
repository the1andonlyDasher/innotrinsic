import { Bounds, Center, Resize, Text } from "@react-three/drei";
import { FunctionComponent, useEffect, useState } from "react";
import { useAtom } from "jotai";
import { backgroundText, loc } from "./atoms";
import { motion as motion3d } from "framer-motion-3d"
import { useThree } from "@react-three/fiber";
import { AnimatePresence, MotionConfig, animate, useAnimation, useAnimationControls } from "framer-motion";
import { size } from "./utils";
import { useRouter } from "next/router";

interface BGTextProps {

}

const textVariants = {
    initial: { x: -1 },
    enter: { x: 0 },
    exit: { x: 1 }
}

const fontVariants = {
    initial: { opacity: 0 },
    enter: { opacity: 0.375 },
    exit: { opacity: 0 }
}

const groupVariants = {
    initial: { scaleY: 0, x: -1 },
    enter: { scaleY: 1, x: 0 },
    exit: { scaleY: 0, x: 1 }
}

const targets: string[] = [
    "science",
    "braincare",
    "universal",
    "empowering",
    "authentisch"
]

const BGText: FunctionComponent<BGTextProps> = () => {
    const font = "/fonts/montserrat-alternates-v17-latin-900.ttf"
    const [bText, setBText] = useState(targets[0])
    const [location, setLocation] = useAtom(loc)
    const { width, height } = useThree((state) => state.viewport)
    const [index, setIndex] = useState(0)
    const [landing, setLanding] = useState("notLanding")
    const router = useRouter()
    const [disposed, setDisposed] = useState(false)
    const [inPage, setIsInPage] = useState(false)

    useEffect(() => {
        setLanding(location === "landing" ? "landing" : "notLanding")
    }, [location]);


    useEffect(() => {
        const interval = setInterval(() => {
            setIndex(index => (index + 1) % 5); // limit to 5
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        setBText(targets[index])
    }, [index]);

    useEffect(() => {
        inPage && controls.start("enter")
    }, [inPage])

    useEffect(() => {
        if (location === "landing" && router.pathname === "/") {
            setDisposed(false), setIsInPage(true)
        } else
            controls.start("exit").then(() => { setDisposed(true), setIsInPage(false) })
    }, [location, router.pathname]);

    const controls = useAnimation()

    return (
        <Center bottom right position={[-width / 2, height / 2 + 1, -10]}>
            <MotionConfig transition={{ type: "spring", damping: 10, stiffness: 40, restDelta: 0.001 }}>
                <motion3d.group variants={groupVariants} initial="initial" animate={controls} exit="exit">
                    <AnimatePresence mode="wait" >
                        <motion3d.mesh key={bText} variants={textVariants} initial="initial" animate={"enter"} exit="exit">
                            <Text textAlign="center" anchorX={"left"} anchorY={"middle"} scale={8} font={font}>{bText}
                                <motion3d.meshStandardMaterial transparent variants={fontVariants} color={"#8fc861"} />
                            </Text>
                            {/* {bText.split("").map((char, charIndex) => (
                        <Text key={charIndex + char} position={[charIndex * 6, 0, 0]} anchorX={"center"} anchorY={"middle"} scale={10} color={"#6afb8c"} font={font}>{char}</Text>
                    ))} */}
                        </motion3d.mesh>

                    </AnimatePresence>
                </motion3d.group>
            </MotionConfig>
        </Center>
    );

}

export default BGText;