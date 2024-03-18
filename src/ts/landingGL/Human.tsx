import { FunctionComponent } from "react";
import { motion as motion3d } from "framer-motion-3d"
import { Head } from "@/ts/landingGL/head";
import { Brain } from "@/ts/landingGL/brain";

interface HumanProps {

}

const Human: FunctionComponent<HumanProps> = () => {
    return (<motion3d.group>
        <Head rotation={[0, Math.PI / 1.25, 0]} position={[0, -4, -5]} />
    </motion3d.group>);
}

export default Human;