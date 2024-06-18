import { motion } from "framer-motion";
import { FunctionComponent, useEffect } from "react";
import Card from "../Card";
import BraincareSVG from "../svgs/Braincare";
import JederSVG from "../svgs/Jedermann";
import ManipulateSVG from "../svgs/Manipulate";
import NeuroSVG from "../svgs/Neuroscience";
import WomenSVG from "../svgs/Women";
import { loc } from "@/ts/atoms";
import { useAtom } from "jotai";

interface IconsSectionProps { }

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

const IconsSection: FunctionComponent<IconsSectionProps> = () => {
    const [location, setLocation] = useAtom(loc);
    return (
        <motion.div
            id="mehr"
            viewport={{ amount: 0.1, once: false, margin: "0px" }}
            initial="initial"
            whileInView="enter"
            variants={{
                initial: { opacity: 0 },
                enter: {
                    opacity: 1,
                },
                exit: {
                    opacity: 0,
                },
            }}
            onViewportEnter={(entry) => {
                entry?.isIntersecting && setLocation("science");
            }}
            className="breakout icons__wrapper"
        >
            <motion.div variants={variants} className="icons__card-wrapper">
                <Card header={`Neurowissen\n-schaftlich\nbasiert`}>
                    <NeuroSVG />
                </Card>
                <Card header={`Besser mit\nBraincare`}>
                    <BraincareSVG />
                </Card>
                <Card header={"Alltags-\nkompatibel"}>
                    <JederSVG />
                </Card>
                <Card header={"Leicht zu \nlernen"}>
                    <ManipulateSVG />
                </Card>
                <Card header={`Selbstbestimmt`}>
                    <WomenSVG />
                </Card>
            </motion.div>
            <motion.h3 variants={variants}>Das ist MY InnoTrinsic:</motion.h3>

            <motion.div variants={variants} className="icons__text-section">
                <motion.p className="w-full mb-16 text-center" variants={variants}>
                    Unser Gehirn ist der Architekt unseres Alltags. Wenn wir aktiv mit
                    unserem Gehirn zusammenarbeiten, seine Vorgehensweise verstehen und es
                    zu unserem besten Freund machen, schaffen wir Mehrwert durch
                    BrainCare. MY InnoTrinsic öffnet einen Raum für den neuroloyalen
                    Perspektivwechsel auf das Gehirn und sein immenses Potenzial. Unsere
                    Strukturen, Instrumente und Prozesse sind umsetzungsorientiert, leicht
                    erlernbar und alltagspraktikabel - für Menschen, Unternehmen und
                    Organisationen.
                </motion.p>
                <motion.h4 variants={variants} className="section-description">
                    Neuroloyaler Perspektiven-Wechsel
                </motion.h4>
                <motion.p variants={variants}>
                    Wir verändern Perspektiven, basierend auf der Leitidee des
                    &quot;Respekts vor dem Menschen&quot; und der Kooperation und
                    Kollaboration mit der Natur des Menschen - konkret der
                    neuropsychologischen Zusammenhänge - unserem Gehirn. Unser Ziel ist
                    es, allseitigen und wechselseitigen Mehrwert zu schaffen, Wachstum zu
                    fördern und Durchbrüche für Menschen, Organisationen, Umwelt und
                    Gesellschaft zu erreichen.
                </motion.p>
            </motion.div>

            <motion.div variants={variants} className="icons__text-section">
                <motion.h4 variants={variants} className="section-description">
                    Alltagsarchitekt Gehirn
                </motion.h4>
                <motion.p variants={variants}>
                    MY InnoTrinsic konzentriert sich auf das Gehirn und seine enorme
                    Komplexität, die einen entscheidenden Einfluss auf unser Handeln,
                    unsere Leistungsfähigkeit, unser Wohlbefinden und das Wachstum von
                    Organisationen und Gesellschaft hat. Wir schöpfen aus den
                    Neurowissenschaften und der Neuropsychologie, um dieses Wissen in
                    praktische Strukturen und Methoden zu überführen, die im
                    Unternehmensalltag und im Leben jedes Menschen unterstützen können.
                </motion.p>
            </motion.div>
            <motion.div variants={variants} className="icons__text-section">
                <motion.h4 variants={variants} className="section-description">
                    Das Gehirn wird zum besten Freund
                </motion.h4>
                <motion.p variants={variants}>
                    Mit einem respektvollen Blick auf die Natur des Menschen gehen wir
                    neue Wege der Kooperation und Kollaboration mit dem mächtigsten Organ
                    des Körpers. Ähnlich wie wir für unsere physische Gesundheit sorgen,
                    zeigen wir Wege auf, wie das hochkomplexe Gehirn optimal genutzt
                    werden kann. Das Gehirn wird zum besten Freund, der uns unterstützt
                    und begleitet.
                </motion.p>
            </motion.div>
            <motion.div variants={variants} className="icons__text-section">
                <motion.h4 variants={variants} className="section-description">
                    BrainCare pragmatisch und mit Struktur
                </motion.h4>
                <motion.p variants={variants}>
                    Als verlässlicher Partner von Menschen und Organisationen haben wir
                    aus dem Wissen der Neurowissenschaften ein neuroloyales
                    Strukturprinzip entwickelt, um Menschen und Organisationen für diese
                    Komplexität zu sensibilisieren und neuroloyales Handeln mit BrainCare
                    zu ermöglichen. Unsere pragmatischen Strukturen und Bausteine sind
                    bedarfsgerecht, zielgenau, flexibel und leicht erlernbar - für jeden
                    nutzbar und anwendbar.
                </motion.p>
            </motion.div>
        </motion.div>
    );
};

export default IconsSection;
