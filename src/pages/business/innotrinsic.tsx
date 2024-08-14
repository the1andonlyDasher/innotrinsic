import InnotrinsicLanding from "@/components/sections/Home/Innotrinsic/InnotrinsicLanding";
import InnotrinsicManagementSection from "@/components/sections/Home/Innotrinsic/ManagementSection";
import SystemSection from "@/components/sections/Home/Innotrinsic/SystemSection";
import { FC } from "react";

interface InnotrinsicProps {

}

const Innotrinsic: FC<InnotrinsicProps> = () => {
    return (<>
        <InnotrinsicLanding />
        <InnotrinsicManagementSection />
        <SystemSection /></>);
}

export default Innotrinsic;