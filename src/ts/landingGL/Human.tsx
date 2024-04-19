import { FunctionComponent, MutableRefObject } from "react";
import { motion as motion3d } from "framer-motion-3d"
import { Head } from "@/ts/landingGL/head";
import { Brain } from "@/ts/landingGL/brain";
import { useThree } from "@react-three/fiber";
import { HeadHands } from "@/HeadHands";

interface HumanProps {
    scroll: MutableRefObject<number>;
    props?: JSX.IntrinsicElements['group']
}

const Human: FunctionComponent<HumanProps> = (props) => {
    const { viewport } = useThree();
    return (
        <motion3d.group scale={Math.max(0.8, Math.min(viewport.height / 10, 1.5))} position={[0, 3 + Math.max(1, Math.min(viewport.height / 10, 3)), 0]}>
            {/* <Head rotation={[0, Math.PI / 1.25, 0]} position={[0, -5.5, 0]} />
             */}
            <HeadHands scroll={props.scroll} />
        </motion3d.group>
    );
}

export default Human;