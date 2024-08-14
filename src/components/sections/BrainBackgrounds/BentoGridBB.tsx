import Sec from "@/components/Section";
import { FC } from "react";

interface BentoGridBBProps {

}

const BentoGridBB: FC<BentoGridBBProps> = () => {
    return (<Sec single left sectionName="science"><div className="bento-grid">
        <div className="grid-item item-1">Item 1</div>
        <div className="grid-item item-2">Item 2</div>
        <div className="grid-item item-3">Item 3</div>
        <div className="grid-item item-4">Item 4</div>
        <div className="grid-item item-5">Item 5</div>
        <div className="grid-item item-6">Item 6</div>
        <div className="grid-item item-7">Item 7</div>
    </div></Sec>);
}

export default BentoGridBB;