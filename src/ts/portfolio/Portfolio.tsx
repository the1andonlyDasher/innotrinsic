import { useEffect, useRef, useState } from "react";
import { Card } from "./Card";
import { Bounds, ScrollControls, useScroll as Scroll } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRouter } from "next/router";
import { motion } from "framer-motion-3d";
import { useAnimation, useMotionValue, useScroll, scroll, useSpring } from "framer-motion";

interface portfolioInterface {
    scrollEl?: any;
}

const pages: any = {
    Kopfsache: {
        color: ["#111", "#000", "#000"],
        url: "https://kopfsachebystephan.de",
        video: "/videos/kopfsache.mp4",
    },
    "Malie Sports": {
        color: ["#FF887A", "#c4533c", "#b23f29"],
        url: "https://malie-sports.de",
        video: "/videos/malie.mp4",
    },
    "CR Jobtraining": {
        color: ["#41d8d3", "#114189", "#000"],
        url: "https://cr-jobtraining.de",
        video: "/videos/cr.mp4",
    },
    "Rule Zero Archive": {
        color: ["#5b5b71", "#19191f", "#000"],
        url: "https://rulezeroarchive.com",
        video: "/videos/rz.mp4",
    },
};

const contentVariants = {
    initial: { scaleY: 0 },
    enter: { scaleY: 1, transition: { staggerChildren: 0.2, delay: 0.5 } },
    exit: {
        scaleY: 0,
        transition: { staggerChildren: 0.2, staggerDirection: -1 },
    },
};

export function Content(scrollEl: any) {
    const ref = useRef<any>(null!);
    const wheel = useRef<any>(null!);
    const router = useRouter();
    const scroll = Scroll()
    const controls = useAnimation();
    const [disposed, setDisposed] = useState(false);
    const [isInPage, setIsInPage] = useState(false);
    const ob: any = Object.values(scrollEl)[0]

    const { scrollYProgress }: any = useScroll({
        container: ob,
        layoutEffect: true
    })

    const x: any = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    useFrame(() => { ref.current.position.x = -x.current * 9.21 })

    useEffect(() => {
        if (router.pathname === "/portfolio") {
            setTimeout(() => {
                setDisposed(false);
                setIsInPage(true);
            }, 1000);
        } else {
            setTimeout(() => {
                controls.start("exit").then(() => {
                    setIsInPage(false), setDisposed(true);
                });
            }, 800);
        }
    }, [router.pathname]);


    useEffect(() => {
        if (isInPage) {
            controls.start("enter");
        }
    }, [isInPage]);
    return (
        <>
            <motion.group
                ref={ref}
                position={[0, 1, -3]}
                variants={contentVariants}
                initial="initial"
                visible={!disposed}
                animate={controls}
                exit="exit"
            >
                <motion.group variants={contentVariants}>
                    {Object.values(pages).map((item: any, index: number) => (
                        <Card
                            key={Object.keys(pages)[index]}
                            url={item.video}
                            pageUrl={item.url}
                            number={index + 1}
                            position={[0 + index * 3, 0, 0]}
                            border={0.025}
                            color={item.color}
                            borderColor="#444"
                            title={Object.keys(pages)[index]}
                        />
                    ))}
                </motion.group>
            </motion.group>

        </>
    );
}





export function Portfolio(props: portfolioInterface) {
    const router = useRouter()
    const [disposed, setDisposed] = useState(false);
    const [isInPage, setIsInPage] = useState(false);
    useEffect(() => {
        if (router.pathname === "/portfolio") {
            setTimeout(() => {
                setDisposed(false);
                setIsInPage(true);
            }, 1000);
        } else {
            setTimeout(() => {
                setIsInPage(false), setDisposed(true);
            }, 1200);
        }
    }, [router.pathname]);

    return (
        <>
            {!disposed && <Content scrollEl={props.scrollEl} />}
        </>
    );
}
