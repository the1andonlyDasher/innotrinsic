import AktionSection from "@/components/sections/Home/Business/AktionSection";
import BenefitsSection from "@/components/sections/Home/Business/BenefitsSection";
import BrainInsights from "@/components/sections/Home/Business/BrainInsights";
import BraincareSection from "@/components/sections/Home/Business/BraincareSection";
import HeroSectionBusiness from "@/components/sections/Home/Business/HerosectionBusiness";
import Modules from "@/components/sections/Home/Business/Modules";
import QuoteSection from "@/components/sections/Home/Business/QuoteSection";
import SliderSection from "@/components/sections/Home/Business/Slidersection";
import { FC } from "react";

interface BusinessProps {

}

const Business: FC<BusinessProps> = () => {
    return (<>
        <HeroSectionBusiness />
        <QuoteSection />
        <BraincareSection />
        <BrainInsights />
        <SliderSection />
        <BenefitsSection />
        <Modules />
        <AktionSection />
    </>);
}

export default Business;