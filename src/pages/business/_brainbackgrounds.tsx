import Sec from "@/components/Section";
import BBLanding from "@/components/sections/BrainBackgrounds/BBLanding";
import BentoGridBB from "@/components/sections/BrainBackgrounds/BentoGridBB";
import OldBrainModernWorld from "@/components/sections/BrainBackgrounds/OldBrainModernWorld";
import { FC } from "react";

interface BrainBackgroundsProps {

}

const BrainBackgrounds: FC<BrainBackgroundsProps> = () => {
    return (<><BBLanding />
        <OldBrainModernWorld />
        <BentoGridBB />
    </>);
}

export default BrainBackgrounds;