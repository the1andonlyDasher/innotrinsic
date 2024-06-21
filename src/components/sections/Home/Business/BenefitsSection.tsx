import Sec from "@/components/Section";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "framer-motion";
import { FC } from "react";

interface BenefitsSectionProps {

}

interface CardsProps {
    title: string;
    list: string[];
    footerText: string;
    bgColor: string;
}

const companyBenefits = [
    "Nachhaltiger Erfolg, Wachstum, Zukunftsfähigkeit",
    "Nachhaltiger Erfolg, Wachstum, Zukunftsfähigkeit",
    "Corporate Growth und Corporate Resilienz durch Exzellenz und Umsetzung wesentlicher Wachstumstreiber",
    "Hohe Bindung der Mitarbeitenden",
    "Vielfältige Inventionen - neue Lösungsideen",
]

const employeeBenefits = [
    "Zufrieden und motiviert trotz großer Adaptions und Flexibilitätserwartungen",
    "Persönliches Wachstum und hohe Arbeitszufriedenheit",
    "Größere Kongruenz von Unternehmensstrategie und Zielen & Antrieben des Mitarbeitenden",
    "Lust und Energie: Handeln & MitWirken, Neues & Vorantreiben, Besser werden & Verbessern",
    "Entdecken neuer Potenziale: Neue Möglichkeiten für eigene Entwicklung",
]

const BenefitsCard = ({ title, list, footerText, bgColor }: CardsProps) => {
    return (<motion.div className={`benefits__card bg-[${bgColor}]`}>
        <motion.h3>{title}</motion.h3>
        <motion.ul>
            {list.map((item: string, index: number) => <motion.li key={index}><p className="check"><FontAwesomeIcon icon={faCheckCircle} /></p><p className="check__text">{item}</p></motion.li>)}
        </motion.ul>
        <h4>{footerText}</h4>
    </motion.div>)
}

const BenefitsSection: FC<BenefitsSectionProps> = () => {
    return (<Sec single left sectionName="business" addClass="breakout">
        <motion.div className="benefits__wrapper">
            <motion.div className="benefits__cover-image" />
            <motion.div className="benefits__cards">
                <BenefitsCard bgColor="#d6e5f3" title="Für das Unternehmen" list={companyBenefits} footerText="Flexibilität & intrinsische Motivation als Wachstumsmotor" />
                <BenefitsCard bgColor="#FFFFFF" title="Für die Beschäftigten" list={employeeBenefits} footerText="Intrinsische Motivation  als treibende Kraft & Zufriedenheitsgarant" />
            </motion.div>
        </motion.div>
    </Sec>);
}

export default BenefitsSection;