
import { useRouter } from "next/router";
import { AnimatePresence, motion } from "framer-motion";
import { useRef } from "react";
import WebGL from "@/ts/GL";
import { useAtom } from "jotai";
import { globalScroll } from "@/ts/atoms";
import Navbar from "./Navbar/navbar";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBuilding, faPersonDigging } from "@fortawesome/free-solid-svg-icons";


export default function MainLayout({ preview, children, navbar, legals, t }: any) {
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
            // else {
            //   window.scrollTo(0,0)
            //   // console.log("scrollTop")
            // }
        }
    };

    const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
        const target = e.currentTarget;
        if (e.currentTarget instanceof HTMLDivElement) {
            // console.log(scroll.current.toFixed(1))
            scroll.current = target.scrollTop / (target.scrollHeight - window.innerHeight)
            setGScroll(scroll.current)
        }
    }



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
        <div className="top-0 left-0 h-[100px] content-grid">
            <Navbar className={`navbar`} navbar={navbar} legals={legals} />
        </div>
        <div ref={ref} className="main"
            onScroll={handleScroll}
        >
            <AnimatePresence
                mode="wait"
                initial={true}
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

