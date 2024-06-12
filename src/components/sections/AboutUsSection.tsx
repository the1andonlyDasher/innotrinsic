import { loc } from "@/ts/atoms";
import { motion } from "framer-motion";
import { useAtom } from "jotai";
import { FunctionComponent } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";

interface AboutUsSectionProps { }

const variants = {
    initial: { y: 20, filter: "blur(20px)", opacity: 0 },
    enter: { y: 0, filter: "blur(0px)", opacity: 1, delay: 1 },
    exit: { y: 20, filter: "blur(20px)", opacity: 0 },
};

const AboutUsSection: FunctionComponent<AboutUsSectionProps> = () => {
    const searchParams = useSearchParams();
    return (
        <motion.div variants={variants} className="science__wrapper">
            <motion.h4 className="">
                Menschen bewegen uns. Wir sind MY InnoTrinsic.
            </motion.h4>
            <motion.div
                className="science__img-wrapper"
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
                <motion.div className="avatar__container">
                    <Image
                        className="avatar"
                        src="/images/karin-bild.jpg"
                        width={709}
                        height={709}
                        alt="Bild von Dr. Karin Koert-Lehmann"
                    />
                    <Image
                        className="signature"
                        alt="Unterschrift von Dr. Karin Koert-Lehmann"
                        src="/images/karin_unterschrift.png"
                        width={300}
                        height={50}
                    />
                    <h5>Dr. Karin Koert-Lehmann</h5>
                </motion.div>
                <motion.div className="avatar__container">
                    <Image
                        className="avatar"
                        src="/images/ulrike-bild.jpg"
                        width={709}
                        height={709}
                        alt="Bild von Ulrike Corneliussen"
                    />
                    <Image
                        className="signature"
                        alt="Unterschrift von Ulrike Corneliussen"
                        src="/images/ulrike_unterschrift.png"
                        width={200}
                        height={100}
                    />
                    <h5>Ulrike Corneliussen</h5>
                </motion.div>
            </motion.div>
        </motion.div>
    );
};

export default AboutUsSection;
