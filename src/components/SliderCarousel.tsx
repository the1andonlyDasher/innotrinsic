import * as React from "react";
import { Suspense, useEffect, useState } from "react";
import { motion, AnimatePresence, MotionConfig } from "framer-motion";
import { wrap } from "popmotion";
import Image from "next/image";
import { globalModuleIndex, moduleSet } from "@/ts/atoms";
import { useAtom } from "jotai";


const variants = {
    enter: (direction: number) => {
        return {
            x: direction > 0 ? 1000 : -1000,
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
            x: direction < 0 ? 1000 : -1000,
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
    title: string | null;
    text: string | null;
}

interface carouselProps {
    images: textObject[];
}
export const SliderCarousel = ({ images }: carouselProps) => {
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
            <div className="img_carousel-wrapper slider">
                <Suspense>
                    {images && <AnimatePresence initial={false} custom={direction}>
                        <motion.div
                            className="slide"
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

                                <motion.h3
                                    key={images[imageIndex].title}
                                    initial="initial"
                                    animate="center"
                                    exit="exit"
                                    variants={variants2}
                                    className="module__header"
                                >
                                    {images[imageIndex].title}
                                </motion.h3>
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
                    <div className="next " onClick={() => paginate(1)}>
                        {"‣"}
                    </div>
                    <div className="prev" onClick={() => paginate(-1)}>
                        {"‣"}
                    </div>
                </Suspense>
            </div>
        </>
    );
};
