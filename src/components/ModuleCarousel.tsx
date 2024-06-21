import { Suspense, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, MotionConfig, useInView } from "framer-motion";
import { wrap } from "popmotion";
import Image from "next/image";
import { globalModuleIndex, moduleSet, modulesViewer } from "@/ts/atoms";
import { useAtom } from "jotai";
import { useSearchParams } from "next/navigation";


const variants = {
    enter: (direction: number) => {
        return {
            x: direction > 0 ? 10 : -10,
            opacity: 0
        };
    },
    center: {
        zIndex: 1,
        x: 0,
        opacity: 1
    },
    exit: (direction: number) => {
        return {
            zIndex: 0,
            x: direction < 0 ? 10 : -10,
            opacity: 0
        };
    }
};

const variants2 = {
    initial: { filter: "blur(20px)", opacity: 0 },
    center: { filter: "blur(0px)", opacity: 1, },
    exit: { filter: "blur(20px)", opacity: 0 },
};

/**
 * Experimenting with distilling swipe offset and velocity into a single variable, so the
 * less distance a user has swiped, the more velocity they need to register as a swipe.
 * Should accomodate longer swipes and short flicks without having binary checks on
 * just distance thresholds and velocity > 0.
 */
const swipeConfidenceThreshold = 10000;
const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
};

interface textObject {
    title: string;
    text: string;
}

interface carouselProps {
    images: textObject[];
}

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

    //carousel settings
    const [[page, direction], setPage] = useState([0, 0]);
    const [globalIndex, setGlobalIndex] = useAtom(globalModuleIndex)
    // We only have 3 images, but we paginate them absolutely (ie 1, 2, 3, 4, 5...) and
    // then wrap that within 0-2 to find our image ID in the array below. By passing an
    // absolute page index as the `motion` component's `key` prop, `AnimatePresence` will
    // detect it as an entirely new image. So you can infinitely paginate as few as 1 images.
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
                <motion.div className="module__controls">
                    <div className="next " onClick={() => paginate(1)}>
                        {"‣"}
                    </div>
                    <div className="prev" onClick={() => paginate(-1)}>
                        {"‣"}
                    </div>
                </motion.div>
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
                        ref={lpViewer}
                        className="right__wrapper viewer"
                    ></motion.div>
                    <motion.div className="left__wrapper relative">

                        <motion.div className="relative w-full h-auto my-auto">
                            {images && <AnimatePresence initial={false} custom={direction}>
                                <motion.div
                                    className="module__slide"
                                    key={page}
                                    custom={direction}
                                    variants={variants}
                                    initial="enter"
                                    animate="center"
                                    exit="exit"
                                    transition={{
                                        x: { type: "spring", stiffness: 300, damping: 30 },
                                        opacity: { duration: 0.2 }
                                    }}
                                    drag="x"
                                    dragConstraints={{ left: 0, right: 0 }}
                                    dragElastic={1}
                                    onDragEnd={(e, { offset, velocity }) => {
                                        const swipe = swipePower(offset.x, velocity.x);

                                        if (swipe < -swipeConfidenceThreshold) {
                                            paginate(1);
                                        } else if (swipe > swipeConfidenceThreshold) {
                                            paginate(-1);
                                        }
                                    }}
                                >
                                    <MotionConfig transition={{ type: "tween", ease: "easeInOut", duration: 0.5 }}>

                                        <motion.div
                                            key={images[imageIndex].title}
                                            initial="initial"
                                            animate="center"
                                            exit="exit"
                                            variants={variants2}
                                            className="module__header"
                                        >
                                            {images[imageIndex].title}
                                        </motion.div>
                                        <motion.p
                                            key={images[imageIndex].text}
                                            initial="initial"
                                            animate="center"
                                            exit="exit"
                                            className="module__text"
                                            variants={variants2}
                                        >
                                            {images[imageIndex].text}
                                        </motion.p>

                                    </MotionConfig>
                                </motion.div>

                            </AnimatePresence>}
                        </motion.div>
                    </motion.div>

                </motion.div>
                <Suspense>


                </Suspense>
            </div>
        </>
    );
};
