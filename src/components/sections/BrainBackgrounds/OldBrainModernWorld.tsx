import Sec from "@/components/Section";
import { faArrowDown, faCalendar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";

interface OldBrainModernWorldProps {

}

const variants = {
    initial: { y: 20, filter: "blur(20px)", opacity: 0 },
    enter: { y: 0, filter: "blur(0px)", opacity: 1, delay: 1 },
    exit: { y: 20, filter: "blur(20px)", opacity: 0 },
};

const OldBrainModernWorld: FC<OldBrainModernWorldProps> = () => {
    return (<Sec single left sectionName="science">
        <motion.div
            className="landing__wrapper py-6"
            viewport={{ amount: 0.25, once: false, margin: "0px" }}
            initial="initial"
            // animate={searchParams.get("view") || searchParams.get("test") ? "exit" : "enter"}
            whileInView={"enter"}
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

                className="right__wrapper "
            >
                <motion.h3 variants={variants} className="text-[#32689C] font-bold italic business">
                    BrainBasic: Wir tragen ein uraltes Gehirn in einer modernen Welt
                </motion.h3>
                <motion.p variants={variants} className="text-md">
                    Um InnoTrinsic-Management wirkungsvoll einzusetzen, ist ein grundlegendes Verständnis der neuronalen Strukturen wesentlich. Ganz wesentlich ist dabei das Verständnis von der Grundausrichtung, dem zentralen Bestreben des Gehirns. Denn das folgt immer noch den gleichen Prinzipien wie vor 2 Millionen Jahren. Wie schon vor Millionen Jahren ist das Gehirn bestrebt, das Überleben des Menschen zu sichern.

                    Das bedeutet, es ist bestrebt, Energie zu sparen (für ein Organ, das ohnehin 70% des täglichen Energiebedarfs für sich beansprucht, eine enorme Aufgabe) und
                    es ist darauf ausgerichtet, den Menschen vor Gefahren zu schützen (die Flucht vor dem Säbelzahntiger sichert schlichtweg das Überleben).

                    Dieses Verständnis ist grundlegend für neuronale Funktionen und deren Effekte und Konsequenzen: Zum Beispiel die Macht der Routinen und die sich daraus ergebende Tendenz von Menschen, sich mit Neuem und Veränderungen schwer zu tun, oder die Dominanz des Fehlersystems (die Flucht vor dem Säbelzahntiger ist wichtiger, als das Pflücken der Beeren), die bremsen kann, das Selbstbewusstsein einschränkt oder Angst vor Neuem und Veränderung treibt.
                </motion.p>

            </motion.div>
            <motion.div className="left__wrapper">
                <Image className="rounded-3xl" src="/images/stoothtiger.jpeg" width={400} height={600} alt={"tiger"} />

            </motion.div>

            {/* HERO SECTION ENDE */}
        </motion.div>
    </Sec>);
}

export default OldBrainModernWorld;