import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "framer-motion";
import { FunctionComponent } from "react";
import Sec from "../Section";
import Image from "next/image";

interface MountainSectionProps {

}

const MountainSection: FunctionComponent<MountainSectionProps> = () => {
    return (<Sec sectionName="mountain" left={false} single>
        <motion.div
            initial="initial"
            whileInView={"animate"}
            viewport={{ once: false, margin: "100px", amount: 0.1 }}
            variants={{
                initial: { opacity: 1 },
                animate: {
                    opacity: 1,
                    display: "flex",
                    filter: "blur(0px)",
                    transition: {
                        staggerChildren: 0.1,
                        when: "beforeChildren",
                        delay: 0.25,
                    },
                },
                exit: {
                    opacity: 0,
                    transitionEnd: { display: "none" },
                    transition: { staggerChildren: 0.1, when: "afterChildren" },
                },
            }}
            className="mountain__wrapper"
        >
            <motion.div className="inner__wrapper">
                <motion.h4 >Ein Gehirn, das Berge versetzen kann.</motion.h4>
                <motion.ul >
                    <motion.li ><p className="check"><FontAwesomeIcon icon={faCheck} /></p><p className="check__text">Neues & Veränderung: Starten - Machen - Dranbleiben</p></motion.li>
                    <motion.li ><p className="check"><FontAwesomeIcon icon={faCheck} /></p><p className="check__text">Motivationsboost: Umbrüche zu Durchbrüchen machen</p></motion.li>
                    <motion.li ><p className="check"><FontAwesomeIcon icon={faCheck} /></p><p className="check__text">MehrWert für alle: Gemeinsam wachsen</p> </motion.li>
                    <motion.li ><p className="check"><FontAwesomeIcon icon={faCheck} /></p><p className="check__text">Zukunftsmacher: Authentische Impulse und High Quality-Ideen
                    </p> </motion.li>
                    <motion.li ><p className="check"><FontAwesomeIcon icon={faCheck} /></p><p className="check__text">Neuroloyales Empowering: Antriebsgerecht mit Zufriedenheitsboost</p> </motion.li>
                </motion.ul>
            </motion.div>
            <motion.div className="mountain__image-wrapper">
                <Image width={500} height={300} alt="Ein Gehirn das Berge versetzt" src="/images/brain_and_mountain.png" />
            </motion.div>
        </motion.div>
    </Sec>);
}

export default MountainSection;