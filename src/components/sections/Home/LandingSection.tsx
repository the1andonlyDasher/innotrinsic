import { faArrowDown, faCalendar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { FunctionComponent, useEffect, useRef } from "react";
import Sec from "../../Section";
import { productViewer } from "@/ts/atoms";
import { useAtom } from "jotai";
import { useSearchParams } from "next/navigation";

interface LandingSectionProps { }

const variants = {
    initial: { y: 20, filter: "blur(20px)", opacity: 0 },
    enter: { y: 0, filter: "blur(0px)", opacity: 1, delay: 1 },
    exit: { y: 20, filter: "blur(20px)", opacity: 0 },
};

const variants2 = {
    initial: { y: 20, filter: "blur(20px)", opacity: 0 },
    enter: { y: 0, filter: "blur(0px)", opacity: 1 },
    exit: { y: 20, filter: "blur(20px)", opacity: 0 },
};

const blurVariants = {
    initial: { opacity: 0 },
    animate: {
        opacity: 1,
        transition: { staggerChildren: 0.1, when: "afterChildren" },
    },
    exit: {
        opacity: 0,
        transition: { staggerChildren: 0.1, when: "afterChildren" },
    },
};

const LandingSection: FunctionComponent<LandingSectionProps> = () => {
    const searchParams = useSearchParams();
    const [, setPVAtom] = useAtom(productViewer);
    const lpViewer = useRef<any>(!null);


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
    return (
        <Sec single left sectionName="landing" id="first">
            <motion.div
                className="landing__wrapper"
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
                <motion.div
                    variants={variants}
                    ref={lpViewer}
                    className="right__wrapper viewer"
                ></motion.div>
                <motion.div className="left__wrapper">
                    <motion.header variants={variants} className="landing__header">
                        Jetzt, besser, <strong>Neuro</strong>Loyal
                    </motion.header>
                    <motion.p variants={variants} className="landing__text">
                        Mehrwert durch BrainCare: MY InnoTrinsic eröffnet neuroloyale
                        Perspektiven und bietet „Do-it-Lösungen“ für Menschen, Unternehmen
                        und Organisationen.
                    </motion.p>
                    <motion.div variants={variants} className="button__wrapper">
                        <Link href={"/#mehr"} className="btn__primary">
                            Erfahre mehr{" "}
                            <FontAwesomeIcon className="ml-2" icon={faArrowDown} />
                        </Link>
                        <Link href={"/#kontakt"} className="btn__outline">
                            Erstgespräch{" "}
                            <FontAwesomeIcon className="ml-2" icon={faCalendar} />
                        </Link>
                    </motion.div>
                </motion.div>

                {/* HERO SECTION ENDE */}
            </motion.div>
        </Sec>
    );
};

export default LandingSection;
