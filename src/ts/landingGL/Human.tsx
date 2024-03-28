import { FunctionComponent } from "react";
import { motion as motion3d } from "framer-motion-3d"
import { Head } from "@/ts/landingGL/head";
import { Brain } from "@/ts/landingGL/brain";
import { useThree } from "@react-three/fiber";

interface HumanProps {

}

const Human: FunctionComponent<HumanProps> = () => {
    const { viewport } = useThree();
    return (
        <motion3d.group position={[0, 3 + Math.max(1, Math.min(viewport.height / 10, 2)), 0]}>
            <Head rotation={[0, Math.PI / 1.25, 0]} position={[0, -5.5, 0]} />
        </motion3d.group>
    );
}

export default Human;