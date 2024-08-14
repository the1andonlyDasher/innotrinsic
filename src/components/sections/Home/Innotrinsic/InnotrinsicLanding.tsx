import Sec from "@/components/Section";
import { motion } from "framer-motion";
import { FC } from "react";

interface InnotrinsicLandingProps {

}

const InnotrinsicLanding: FC<InnotrinsicLandingProps> = () => {
    return <Sec single left sectionName="mountain">
        <><motion.div className="management__wrapper">
            <h2 className="management__header">MY InnoTrinsic - Neuro-Wissen wird managementfähig.</h2>
            <h2 className="management__header">InnoTrinsic addiert einen völlig neuen Faktor: den Menschen.</h2>
        </motion.div>
            <p className="management__text"><strong>InnoTrinsic Economy: Mit neuer Perspektive mehr erreichen:</strong><br />

                Während das tägliche Tun im Management und in jedem (Unternehmens)Alltag auf das Außen des Menschen fokussiert ist, also dem Menschen „nur bis vor den Kopf schaut“, erweitert InnoTrinsic-Management die Perspektive. Es berücksichtigt explizit die neuronalen Faktoren, die das Verhalten, Leistungsfähigkeit, Ressourceneinsatz, Motivation, Zufriedenheit… des Menschen steuern und verändern. Die InnoTrinsic Economy betrachtet den Menschen also holistisch. Sie erweitert den Blick auf die neuronale Natur des Menschen die nach Innen & Außen wirkt.</p>
        </>
    </Sec>;
}

export default InnotrinsicLanding;