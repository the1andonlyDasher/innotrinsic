import { loc } from "@/ts/atoms";
import { motion, MotionConfig } from "framer-motion";
import { useAtom } from "jotai";
import { FunctionComponent, useEffect, useState } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { transition, useMediaQuery } from "@/ts/utils";

interface AboutUsSectionProps { }

const variants = {
    initial: { y: 20, filter: "blur(20px)", opacity: 0 },
    enter: { y: 0, filter: "blur(0px)", opacity: 1, delay: 1 },
    exit: { y: 20, filter: "blur(20px)", opacity: 0 },
};

const outerDesktopVariantsKarin = {
    initial: { translateX: "50%" },
    enter: { translateX: "0%", transition: transition({ delay: 2 }) },
};

const outerMobileVariantsKarin = {
    initial: { translateY: "50%" },
    enter: { translateY: "0%", transition: transition({ delay: 2 }) },
};

const outerDesktopVariantsUlrike = {
    initial: { translateX: "-50%" },
    enter: { translateX: "0%", transition: transition({ delay: 2 }) },
};

const outerMobileVariantsUlrike = {
    initial: { translateY: "-50%" },
    enter: { translateY: "0%", transition: transition({ delay: 2 }) },
};

const varaintsBrainMobile = {
    initial: { opacity: 1, y: 0 },
    enter: {
        opacity: 0,
        y: -63,
        transition: { opacity: { delay: 1.1 } },
        transitionEnd: { display: "none" },
    }
}

const varaintsBrainDekstop = {
    initial: { opacity: 1, y: 0 },
    enter: {
        opacity: 0,
        y: -75,
        transition: { opacity: { delay: 1.1 } },
        transitionEnd: { display: "none" },
    }
}

const varaintsHandMobile = {
    initial: { opacity: 1, y: 0 },
    enter: {
        opacity: 0,
        y: 63,
        transition: { delay: 0.5 },
        transitionEnd: { display: "none" },
    }
}

const varaintsHandDekstop = {
    initial: { opacity: 1, y: 0 },
    enter: {
        opacity: 0,
        y: 75,
        transition: { delay: 0.5 },
        transitionEnd: { display: "none" },
    }
}



type Variants =
    | {
        initial: { translateX: string };
        enter: {
            translateX: string;
            transition: {
                type: string;
                damping: number;
                stiffness: number;
                restDelta: number;
                delay: number;
            };
        };
    }
    | {
        initial: { translateY: string };
        enter: {
            translateY: string;
            transition: {
                type: string;
                damping: number;
                stiffness: number;
                restDelta: number;
                delay: number;
            };
        };
    };

const AboutUsSection: FunctionComponent<AboutUsSectionProps> = () => {
    const searchParams = useSearchParams();
    const isMobile = useMediaQuery("(max-width: 1024px)");

    const [variantsKarin, setVariantsKarin] = useState<Variants | undefined>(
        undefined
    );
    const [variantsUlrike, setVariantsUlrike] = useState<Variants | undefined>(
        undefined
    );
    const [variantsBrain, setVariantsBrain] = useState<any | undefined>(
        undefined
    );
    const [variantsHand, setVariantsHand] = useState<any | undefined>(
        undefined
    );

    useEffect(() => {
        if (isMobile !== null) {
            setVariantsKarin(
                isMobile ? outerMobileVariantsKarin : outerDesktopVariantsKarin
            );
            setVariantsUlrike(
                isMobile ? outerMobileVariantsUlrike : outerDesktopVariantsUlrike
            );
            setVariantsBrain(
                isMobile ? varaintsBrainMobile : varaintsBrainDekstop
            )
            setVariantsHand(
                isMobile ? varaintsHandMobile : varaintsHandDekstop
            )
        }
    }, [isMobile]);

    return (
        <motion.div variants={variants} className="science__wrapper">
            <motion.h4>Menschen bewegen uns. Wir sind MY InnoTrinsic.</motion.h4>
            <motion.div
                className="science__img-wrapper"
                viewport={{ amount: 0.25, once: false, margin: "0px" }}
                initial="initial"
                whileInView={
                    searchParams.get("view") || searchParams.get("test")
                        ? "exit"
                        : "enter"
                }
                variants={{
                    initial: { opacity: 0, gap: 0 },
                    enter: {
                        opacity: 1,
                        display: "flex",
                        filter: "blur(0px)",
                        gap: "2.5rem",
                        transition: { staggerChildren: 0.1, when: "beforeChildren", gap: { delay: 2.5 } },
                    },
                    exit: {
                        opacity: 0,
                        transitionEnd: { display: "none" },
                        transition: { staggerChildren: 0.1, when: "afterChildren" },
                    },
                }}
            >


                {variantsKarin && <motion.div
                    variants={variantsKarin}
                    initial="initial"
                    whileInView="enter"
                    viewport={{ once: true }}
                    className="avatar__container"
                >
                    <motion.img
                        className="avatar"
                        initial={{ opacity: 0 }}
                        whileInView={{
                            opacity: [0, 1],
                            transition: transition({ delay: 2 }),
                        }}
                        viewport={{ once: true }}
                        src="/images/karin-bild.jpg"
                        width={709}
                        height={709}
                        alt="Bild von Dr. Karin Koert-Lehmann"
                    />
                    <motion.img
                        className="avatar absolute top-0"
                        src="/images/karin_brain2.webp"
                        initial={{ opacity: 0 }}
                        whileHover={{ opacity: 1 }}
                        whileTap={{ opacity: 1 }}
                        width={709}
                        height={709}
                        alt="Bild von Dr. Karin Koert-Lehmann"
                    />
                    <motion.img
                        className="avatar absolute top-0"
                        initial={{ opacity: 0.5 }}
                        whileInView={{
                            opacity: [0.5, 0],
                            transition: transition({ delay: 2 }),
                            transitionEnd: { display: "none" },
                        }}
                        viewport={{ once: true }}
                        src="/images/karin_brain.webp"
                        width={709}
                        height={709}
                        alt="Bild von Dr. Karin Koert-Lehmann"
                    />
                    <motion.h5
                        initial={{ opacity: 0, filter: "blur(20px)" }}
                        whileInView={{ opacity: 1, filter: "blur(0px)", transition: { delay: 2.5 } }}
                        viewport={{ once: true }}
                    >Dr. Karin Koert-Lehmann</motion.h5>

                </motion.div>}
                {variantsUlrike && <motion.div
                    variants={variantsUlrike}
                    initial="initial"
                    whileInView="enter"
                    viewport={{ once: true }}
                    className="avatar__container"
                >
                    <motion.img
                        className="avatar"
                        initial={{ opacity: 0 }}
                        whileInView={{
                            opacity: [0, 1],
                            transition: transition({ delay: 2 }),
                        }}
                        viewport={{ once: true }}
                        src="/images/ulrike-bild.webp"
                        width={709}
                        height={709}
                        alt="Bild von Ulrike Corneliussen"
                    />
                    <motion.img
                        className="avatar absolute top-0"
                        initial={{ opacity: 0 }}
                        whileHover={{ opacity: 1 }}
                        whileTap={{ opacity: 1 }}
                        src="/images/ulrike_brain2.webp"
                        width={709}
                        height={709}
                        alt="Bild von Ulrike Corneliussen"
                    />
                    <motion.img
                        className="avatar absolute top-0"
                        initial={{ opacity: 0.5 }}
                        whileInView={{
                            opacity: [0.5, 0],
                            transition: transition({ delay: 2 }),
                            transitionEnd: { display: "none" },
                        }}
                        viewport={{ once: true }}
                        src="/images/ulrike_brain.webp"
                        width={709}
                        height={709}
                        alt="Bild von Ulrike Corneliussen"
                    />
                    <motion.div
                        className="avatar absolute top-0 bg-white w-[250px] h-[250px] lg:w-[300px] lg:h-[300px]"
                        initial={{ scale: 1.025 }}
                        whileInView={{
                            opacity: 0,
                            transition: transition({ delay: 1 }),
                            transitionEnd: { display: "none" },
                        }}
                        viewport={{ once: true }}
                    />
                    {variantsBrain && <motion.img
                        className="avatar absolute top-0 "
                        variants={variantsBrain}
                        initial="initial"
                        whileInView="enter"
                        viewport={{ once: true }}
                        src="/images/brain.webp"
                        width={709}
                        height={709}
                        alt="Bild von Ulrike Corneliussen"
                    />}
                    {variantsHand && <motion.img
                        className="avatar absolute top-0"
                        src="/images/hand.webp"
                        variants={variantsHand}
                        initial="initial"
                        whileInView="enter"
                        viewport={{ once: true }}
                        width={709}
                        height={709}
                        alt="Bild von Ulrike Corneliussen"
                    />}
                    <motion.h5
                        initial={{ opacity: 0, filter: "blur(20px)" }}
                        whileInView={{ opacity: 1, filter: "blur(0px)", transition: { delay: 2.5 } }}
                        viewport={{ once: true }}
                    >Ulrike Corneliussen</motion.h5>
                </motion.div>}
            </motion.div>
        </motion.div>
    );
};

export default AboutUsSection;
