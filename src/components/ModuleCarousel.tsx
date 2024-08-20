import { Suspense, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, MotionConfig, useInView } from "framer-motion";
import { wrap } from "popmotion";
import Image from "next/image";
import { globalModuleIndex, moduleSet, modulesViewer } from "@/ts/atoms";
import { useAtom } from "jotai";
import { useSearchParams } from "next/navigation";

interface textObject {
    title: string;
    text: string;
}

interface carouselProps {
    images: textObject[];
}

const num = ["Kombo 1", "Titel 2", "Kombination 3", "Variante 4"]

export const ModuleCarousel = ({ images }: carouselProps) => {
    const searchParams = useSearchParams();
    const [pvAtom, setPVAtom] = useAtom(modulesViewer);
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

    const [[page, direction], setPage] = useState([0, 0]);
    const [globalIndex, setGlobalIndex] = useAtom(globalModuleIndex)
    const imageIndex = wrap(0, images?.length, page);
    const paginate = (newDirection: number) => {
        setPage([page + newDirection, newDirection]);
    };

    useEffect(() => {
        setGlobalIndex(imageIndex)
    }, [imageIndex])



    return (
        <>
            <div className="module_carousel-wrapper">
                <motion.h3 className="modules__header">Modulprogramm für unsere Business-Kunden</motion.h3>
                <motion.ul className="module__pills">
                    {num.map((item: any, index: number) =>
                        <motion.li
                            key={index}
                            animate={page === index ?
                                { backgroundColor: "#165c8f" } :
                                { backgroundColor: "#3285c0" }}
                            onClick={() => setPage([index, index])}>
                            {item}
                        </motion.li>
                    )}
                </motion.ul>
                <motion.div
                    className="landing__wrapper"
                    viewport={{ amount: 0.25, once: false, margin: "0px" }}
                    initial="initial"
                    animate={searchParams.get("view") || searchParams.get("test") ? "exit" : "enter"}
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
                    <motion.div className="module__viewer viewer"
                        ref={lpViewer}

                    >                <motion.div className="module__controls">
                            <div className="next " onClick={() => paginate(1)}>
                                {"‣"}
                            </div>
                            <div className="prev" onClick={() => paginate(-1)}>
                                {"‣"}
                            </div>
                        </motion.div></motion.div>


                </motion.div>
                <Suspense>


                </Suspense>
            </div>
        </>
    );
};
