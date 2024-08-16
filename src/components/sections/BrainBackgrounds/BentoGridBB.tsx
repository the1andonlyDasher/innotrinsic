import Sec from "@/components/Section";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FC } from "react";

interface BentoGridBBProps {

}

const BentoGridBB: FC<BentoGridBBProps> = () => {
    return (<Sec single left sectionName="slider"><div className="bento-grid">
        <div className="grid-item item-1">
            <FontAwesomeIcon icon={faArrowRight} />
        </div>
        <div className="grid-item item-2">
            <FontAwesomeIcon icon={faArrowRight} />
        </div>
        <div className="grid-item item-3">
            <FontAwesomeIcon icon={faArrowRight} />
        </div>
        <div className="grid-item item-4">
            <FontAwesomeIcon icon={faArrowRight} />
        </div>
        <div className="grid-item item-5">
            <div className="bgOverlay"></div>
            <FontAwesomeIcon icon={faArrowRight} />
        </div>
        <div className="grid-item item-6">
            <FontAwesomeIcon icon={faArrowRight} />
        </div>
        <div className="grid-item item-7">
            <FontAwesomeIcon icon={faArrowRight} />
        </div>
    </div></Sec>);
}

export default BentoGridBB;