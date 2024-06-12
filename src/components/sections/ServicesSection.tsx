import { motion } from "framer-motion";
import { FunctionComponent } from "react";
import Image from "next/image";




const ServicesSection: FunctionComponent = () => {
  return (
    <motion.div className="services-section">
      <motion.div className="services-content">
        <motion.h3 className="section-title">Unsere Angebote</motion.h3>
        <motion.div className="services-grid">
          <motion.div className="service-item">
            <Image className="service-image" width={200} height={200} src={"/images/business_meeting.png"} alt={"Business meeting"} />
            <motion.h4 className="service-title">Gruppenscouting</motion.h4>
          </motion.div>
          <motion.div className="service-item">
            <Image className="service-image" width={200} height={200} src={"/images/person.png"} alt={"Person"} />
            <motion.h4 className="service-title">Einzelscouting</motion.h4>
          </motion.div>
          <motion.div className="service-item">
            <Image className="service-image" width={200} height={200} src={"/images/academy.png"} alt={"Academy"} />
            <motion.h4 className="service-title">MY InnoTrinsic Academy</motion.h4>
          </motion.div>
          <motion.div className="service-item">
            <Image className="service-image" width={200} height={200} src={"/images/brain_as_mic.png"} alt={"Brain as a microphone"} />
            <motion.h4 className="service-title">Vortrag</motion.h4>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export default ServicesSection;
