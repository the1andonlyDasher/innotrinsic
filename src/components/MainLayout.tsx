
import { useRouter } from "next/router";
import { AnimatePresence, motion, MotionValue, useAnimation, useAnimationFrame, useMotionValue, useMotionValueEvent, useScroll, useSpring, useTransform, useVelocity } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import WebGL from "@/ts/GL";
import { useAtom } from "jotai";
import { globalScroll } from "@/ts/atoms";
import Navbar from "./Navbar/navbar";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBuilding, faPersonDigging } from "@fortawesome/free-solid-svg-icons";

const navbarVariants = {
    closed: { gridTemplateRows: "0fr", transition: { when: "afterChildren", type: "spring", damping: 20, stiffness: 100 } },
    open: { gridTemplateRows: "1fr", transition: { when: "beforeChildren", type: "spring", damping: 20, stiffness: 100 } }
}

const innerWrapperVariants = {
    closed: { opacity: 0, transition: { duration: 0.2 } },
    open: { opacity: 1, transition: { duration: 0.2, delay: 0.5 } }
}

export default function MainLayout({ children, navbar, legals }: any) {
    const [gScroll, setGScroll] = useAtom(globalScroll)
    const router = useRouter()
    const ref = useRef<any>(!null)
    const scrollContainer = useRef<any>(!null)
    const scroll = useRef(0)
    const variants = {
        initial: { opacity: 0 },
        enter: {
            opacity: 1,
            transition: { staggerChildren: 0.25, delayChildren: 0.25, duration: 0.5 },
        },
        exit: {
            opacity: 0,
            transition: {
                staggerChildren: 0.5,
                staggerDirection: -1,
                duration: 0.5,
                delay: 0.25,
            },
        },
    };


    const handExitComplete = () => {

        setTimeout(() => {
            if (typeof window !== "undefined") {
                window.scrollTo(0, 0);
                ref.current.scrollTo(0, 0)
                // Get the hash from the url
                const hashId = window.location.hash;

                if (hashId) {
                    // Use the hash to find the first element with that id
                    const element = document.querySelector(`${hashId}`);

                    if (element) {
                        // Smooth scroll to that elment
                        element.scrollIntoView({
                            behavior: "smooth",
                            block: "start",
                            inline: "nearest",
                        });
                        // console.log("scrollToHash");
                    }
                }
                else {
                    window.scrollTo(0, 0)
                    // console.log("scrollTop")
                }
            }
        }, 200)
    };

    const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
        const target = e.currentTarget;
        if (e.currentTarget instanceof HTMLDivElement) {
            scroll.current = target.scrollTop / (target.scrollHeight - window.innerHeight)
            setGScroll(scroll.current)
        }
    }



    const baseScale = useMotionValue(1);
    const controls = useAnimation()
    const { scrollY } = useScroll({ container: ref })
    const scrollVelocity = useVelocity(scrollY);
    const smoothVelocity = useSpring(scrollVelocity, {
        damping: 50,
        stiffness: 400
    });
    const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
        clamp: false
    });


    useMotionValueEvent(scrollY, "change", () => {
        if (velocityFactor.get() < 0) {
            controls.start("open")
        } else if (velocityFactor.get() > 0) {
            controls.start("closed")
        }
    })




    return (<>
        <div className="content-grid bg-[#04070e] text-sm">
            <div className="hidden lg:flex flex-col lg:flex-row items-center justify-center h-auto p-6 w-full  text-white gap-2">
                Unsere Webseite befindet sich im Aufbau <FontAwesomeIcon className="mx-4 text-[#e0dd70] h-full text-xl max-h-6" icon={faPersonDigging} />
                Mehr Inormationen zu MY InnoTrinsic folgen in Kürze. Wer nicht warten möchte, kann uns gerne kontaktieren.
            </div>
            <div className="flex lg:hidden flex-row lg:flex-row items-center justify-center h-auto p-6 w-full  text-white gap-2">
                Unsere Webseite befindet sich im Aufbau <FontAwesomeIcon className="mx-4 text-[#e0dd70] h-full text-xl max-h-6" icon={faPersonDigging} />

            </div>
        </div>
        <motion.div className="navbar__wrapper"
            initial="open"
            variants={navbarVariants}
            animate={controls}>
            <motion.div
                variants={innerWrapperVariants}
                className="navbar__wrapper-inner content-grid"
            >
                <Navbar contentContainer={ref} className={`navbar`} navbar={navbar} legals={legals} />
            </motion.div>
        </motion.div>
        <div ref={ref} className="main"
            onScroll={handleScroll}
        >
            <AnimatePresence
                mode="wait"
                initial={true}
                onExitComplete={handExitComplete}
            >
                <motion.div
                    key={router.route}
                    variants={variants}
                    initial="initial"
                    animate={"enter"}
                    exit="exit"
                    className="content-grid"
                >
                    {children}
                </motion.div>
            </AnimatePresence>
        </div>
        <WebGL scroll={scroll} eventSource={ref} />

    </>

    );
}

