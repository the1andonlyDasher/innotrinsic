import Sec from "@/components/Section";
import { motion } from "framer-motion";
import { FC } from "react";

interface BraincareSectionProps {

}

const BraincareSection: FC<BraincareSectionProps> = () => {
    return (<Sec single left sectionName="business"><>
        <h3>MY InnoTrinsic - Exzellenz durch BrainCare</h3>
        <motion.div>

        </motion.div>
    </>
    </Sec>);
}

export default BraincareSection;