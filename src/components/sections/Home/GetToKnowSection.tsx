import { motion } from "framer-motion";
import { FunctionComponent } from "react";
import Image from "next/image";


interface GetToKnowSectionProps {

}

const GetToKnowSection: FunctionComponent<GetToKnowSectionProps> = () => {
    return (
        <motion.div className="get-to-know-section">
            <motion.div className="get-to-know-container">
                <motion.h3 className="get-to-know-title">MY InnoTrinsic kennenlernen</motion.h3>
                <motion.div className="get-to-know-grid">
                    <div className="get-to-know-item md-flex-row">
                        <Image className="get-to-know-image" alt="Leute in einem Businessmeeting" src="/images/brainbasics.jpg" width={300} height={300} />
                        <div className="get-to-know-text md-px-12">
                            <h4 className="get-to-know-heading">BrainBasics für Business</h4>
                            <p>Ausgerichtet an jeweiliger Fragestellung</p>
                        </div>
                    </div>
                    <div className="get-to-know-item md-flex-row">
                        <Image className="get-to-know-image" alt="Zwei Leute bei einem Einzelgespräch" src="/images/firstview-ich.jpg" width={300} height={300} />
                        <div className="get-to-know-text md-px-12">
                            <h4 className="get-to-know-heading">First View: Jetzt Ich</h4>
                            <p>Dein Weg zu deiner BrainCare-Solution</p>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </motion.div>
    );
}

export default GetToKnowSection;
