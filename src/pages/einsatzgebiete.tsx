import Sec from "@/components/Section";
import { globalScroll, productViewer } from "@/ts/atoms";
import { IdeaData } from "@/ts/landingGL/IdeaCloud";
import { motion } from "framer-motion";
import { useAtom } from "jotai";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { FunctionComponent, useEffect, useRef } from "react";

const variants = {
    initial: { y: 20, filter: "blur(20px)", opacity: 0 },
    enter: { y: 0, filter: "blur(0px)", opacity: 1, delay: 1 },
    exit: { y: 20, filter: "blur(20px)", opacity: 0 },
};

const blurVariants = {
    initial: { y: 20, filter: "blur(20px)", opacity: 0 },
    animate: {
        y: 0,
        filter: "blur(0px)",
        opacity: 1,
        transition: { staggerChildren: 0.1375, when: "beforeChildren" },
    },
    exit: {
        y: 20,
        filter: "blur(20px)",
        opacity: 0,
        transition: { staggerChildren: 0.1, when: "afterChildren" },
    },
}

const More = () => {
    // search params
    const searchParams = useSearchParams();
    //atoms
    const [pvAtom, setPVAtom] = useAtom(productViewer);
    const [scroll, setGSCroll] = useAtom(globalScroll);
    //ref
    const lpViewer = useRef<any>(!null);
    //set coordinates for head
    const setCoords = () => {
        const { width, height, left, top } =
            lpViewer?.current.getBoundingClientRect();
        setPVAtom({ width, height, left, top });
    };


    //uefs
    useEffect(() => {
        setCoords();
    }, []);

    useEffect(() => {
        setCoords();
    }, [scroll]);

    useEffect(() => {
        window.addEventListener('resize', setCoords, false);
        return () => {
            window.removeEventListener('resize', setCoords, false);
        };
    });
    return (
        <Sec single left sectionName="landing" id="first"><motion.div className="relative w-full h-full" ref={lpViewer}>
            {IdeaData.map((item: any, i: number) => (
                <motion.div
                    key={i}
                    initial="initial"
                    animate={
                        searchParams.get("neuron") === item.text ? "enter" : "exit"
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
                    className="absolute bottom-0 py-5 md:py-10 flex flex-col gap-2 items-start justify-end text-white "
                >
                    <motion.h3 variants={variants}>{item.text}</motion.h3>
                    <motion.p variants={variants}>
                        Quo usque tandem abutere, Catilina, patientia nostra? quam diu
                        etiam furor iste tuus nos eludet? quem ad finem sese effrenata
                        iactabit audacia?
                    </motion.p>
                    <motion.div variants={variants} className="flex flex-wrap gap-4">
                        <Link href={"/kontakt"} className="btn__alt">
                            Mehr erfahren
                        </Link>
                        <Link href={"/einsatzgebiete"} className="btn__outline">
                            Zurück
                        </Link>
                    </motion.div>
                </motion.div>
            ))}
            {/* RUBRIKEN ENDE  */}
        </motion.div></Sec>
    );
}

export default More;