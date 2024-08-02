import Sec from "@/components/Section";
import { motion } from "framer-motion";
import Image from "next/image";
import { FC } from "react";

interface QuoteSectionProps {

}

const QuoteSection: FC<QuoteSectionProps> = () => {
    return (<Sec left single sectionName="business" addClass="breakout">
        <motion.div className="quote__wrapper">
            <motion.p className="quote">Irritierend, oder? So viele Programme für einen gesunden Rücken! Als würden wir den Unternehmenserfolg auf dem Rücken unserer Mitarbeitenden suchen. Dabei liegt die wahre Schaltzentrale für Leistung, Motivation und Zufriedenheit und resultierend Unternehmenserfolg im Gehirn. Warum also nicht endlich Management mit BrainCare? Zeit, unser Denkorgan in die VIP-Lounge von Corporate- und Personal-Growth einzuladen!“</motion.p>
            <Image alt="Unterschrift von Dr. Karin Koert-Lehmann" src="/images/karin_unterschrift.png" width={200} height={200} />
        </motion.div>
    </Sec>);
}

export default QuoteSection;