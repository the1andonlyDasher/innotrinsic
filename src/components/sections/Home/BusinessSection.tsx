import { motion } from "framer-motion";
import { FunctionComponent } from "react";

interface BusinessSectionProps { }

const BusinessSection: FunctionComponent<BusinessSectionProps> = () => {
    return (
        <motion.div className="business-section">
            <motion.div className="business-container">
                <motion.h3 className="business-title">MY InnoTrinsic in Aktion</motion.h3>
                <motion.div className="business-grid">
                    <div className="business-item">

                        <h4 className="business-heading">High Performing Business</h4>

                    </div>
                    <div className="business-item">

                        <h4 className="business-heading">Neuroloyales Management für Corporate Growth</h4>

                    </div>
                    <div className="business-item">

                        <h4 className="business-heading">Neuroloyale Personalarbeit & Personal Development</h4>

                    </div>
                    <div className="business-item">

                        <h4 className="business-heading">Neuroloyales HR Management</h4>

                    </div>
                </motion.div>
            </motion.div>
        </motion.div>
    );
}

export default BusinessSection;
