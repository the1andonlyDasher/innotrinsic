import { faArrowDown, faCalendar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AnimatePresence, MotionConfig, motion, useInView } from "framer-motion";
import Link from "next/link";
import { FunctionComponent, useEffect, useRef, useState } from "react";
import Sec from "@/components/Section";
import { mountainViewer, productViewer } from "@/ts/atoms";
import { useAtom } from "jotai";
import { useSearchParams } from "next/navigation";

interface HeroSectionBusinessProps { }

const variants = {
    initial: { y: 20, filter: "blur(20px)", opacity: 0 },
    enter: { y: 0, filter: "blur(0px)", opacity: 1, delay: 1 },
    exit: { y: 20, filter: "blur(20px)", opacity: 0 },
};

const variants_words = {
    initial: { x: -10, filter: "blur(20px)", opacity: 0 },
    enter: { x: 0, filter: "blur(0px)", opacity: 1, delay: 1 },
    exit: { x: 10, filter: "blur(20px)", opacity: 0 },
};

const HeroSectionBusiness: FunctionComponent<HeroSectionBusinessProps> = () => {
    const searchParams = useSearchParams();
    const [pvAtom, setPVAtom] = useAtom(mountainViewer);
    const lpViewer = useRef<any>(!null);
    const inView = useInView(lpViewer, { margin: "0px", amount: 0.1 });
    const setCoords = () => {
        const { width, height, left, top } =
            lpViewer?.current.getBoundingClientRect();
        setPVAtom({ width, height, left, top });
    };

    useEffect(() => {
        setCoords();
    }, []);

    useEffect(() => {
        if (typeof window !== undefined) {
            document.body.childNodes[0].childNodes[2].addEventListener(
                "scroll",
                setCoords,
                false
            );
        }
        return () => {
            document.body.childNodes[0].childNodes[2].removeEventListener(
                "scroll",
                setCoords,
                false
            );
        };
    });

    useEffect(() => {
        window.addEventListener("resize", setCoords, false);
        return () => {
            window.removeEventListener("resize", setCoords, false);
        };
    });


    const headers = [
        "wachsen", "verwalten", "umsetzen"
    ];

    const [index, setIndex] = useState(0);
    const [header1, setHeader1] = useState(headers[index]);




    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((index) => (index + 1) % 3); // limit to 4
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        setHeader1(headers[index]);
    }, [index]);


    return (
        <Sec single left sectionName="landingBusiness" id="first">
            <motion.div
                className="landing__wrapper reverse"
                viewport={{ amount: 0.25, once: false, margin: "0px" }}
                initial="initial"
                // animate={searchParams.get("view") || searchParams.get("test") ? "exit" : "enter"}
                whileInView={
                    searchParams.get("view") || searchParams.get("test")
                        ? "exit"
                        : "enter"
                }
                variants={{
                    initial: { opacity: 0 },
                    enter: {
                        opacity: 1,
                        display: "flex",
                        filter: "blur(0px)",
                        transition: { staggerChildren: 0.1, when: "beforeChildren" },
                    },
                    exit: {
                        opacity: 0,
                        transitionEnd: { display: "none" },
                        transition: { staggerChildren: 0.1, when: "afterChildren" },
                    },
                }}
            >

                <motion.div className="left__wrapper">
                    <motion.header variants={variants} className="landing__header">
                        <strong className="business">Neuro</strong>loyal
                        <AnimatePresence initial mode="wait">
                            <MotionConfig transition={{ type: "tween", ease: "easeInOut", duration: 0.5 }}>
                                <motion.div
                                    key={header1}
                                    initial="initial"
                                    animate="enter"
                                    exit="exit"
                                    variants={variants_words}
                                >
                                    {header1}
                                </motion.div>
                            </MotionConfig>
                        </AnimatePresence>
                        und mehr.
                    </motion.header>
                    <motion.p variants={variants} className="landing__text">
                        Mehrwert durch BrainCare: MY InnoTrinsic eröffnet neuroloyale
                        Perspektiven und bietet „Do-it-Lösungen“ für Menschen, Unternehmen
                        und Organisationen.
                    </motion.p>
                    <motion.div variants={variants} className="button__wrapper">
                        <Link href={"/#mehr"} className="btn__primary business">
                            Erfahre mehr{" "}
                            <FontAwesomeIcon className="ml-2" icon={faArrowDown} />
                        </Link>
                        <Link href={"/#kontakt"} className="btn__outline business">
                            Erstgespräch{" "}
                            <FontAwesomeIcon className="ml-2" icon={faCalendar} />
                        </Link>
                    </motion.div>
                </motion.div>
                <motion.div
                    variants={variants}
                    ref={lpViewer}
                    className="right__wrapper viewer"
                ></motion.div>
                {/* HERO SECTION ENDE */}
            </motion.div>
        </Sec>
    );
};

export default HeroSectionBusiness;
