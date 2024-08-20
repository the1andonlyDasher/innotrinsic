import Sec from "@/components/Section";
import { productViewer } from "@/ts/atoms";
import { faArrowDown, faCalendar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "framer-motion";
import { useAtom } from "jotai";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { FC, useEffect, useRef } from "react";

interface InnotrinsicLandingProps {

}

const variants = {
    initial: { y: 20, filter: "blur(20px)", opacity: 0 },
    enter: { y: 0, filter: "blur(0px)", opacity: 1, delay: 1 },
    exit: { y: 20, filter: "blur(20px)", opacity: 0 },
};

const InnotrinsicLanding: FC<InnotrinsicLandingProps> = () => {
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
    return <Sec single left sectionName="landingBusiness">
        <motion.div
            className="landing__wrapper py-6"
            viewport={{ amount: 0.25, once: false, margin: "0px" }}
            initial="initial"
            whileInView="enter"
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
                <motion.h3 variants={variants} className="text-white font-header font-bold">
                    Immer dann wirkungsvoll, wenn der Faktor MENSCH im Spiel ist
                </motion.h3>
                <motion.p variants={variants} className="text-white font-header font-normal">
                    Neues, Veränderung, Entwicklung, Wachstum... beginnt im Kopf - aber... unser Gehirn ist keine Maschine.
                </motion.p>
                <motion.div variants={variants} className="button__wrapper">
                    <Link href={"/#mehr"} className="btn__primary business">
                        Erfahre mehr{" "}
                        <FontAwesomeIcon className="ml-2" icon={faArrowDown} />
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
    </Sec>;
}

export default InnotrinsicLanding;