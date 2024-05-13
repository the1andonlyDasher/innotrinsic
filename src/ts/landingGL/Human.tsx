import {
    FunctionComponent,
    MutableRefObject,
    RefObject,
    useEffect,
    useRef,
    useState,
} from "react";
import { motion as motion3d } from "framer-motion-3d";
import { Head } from "@/ts/landingGL/head";
import { Brain } from "@/ts/landingGL/brain";
import { GroupProps, useFrame, useThree } from "@react-three/fiber";
import { HeadHands } from "@/HeadHands";
import { loc, productViewer, globalTarget, orbitTarget } from "../atoms";
import { Billboard, Shadow, useAspect } from "@react-three/drei";
import { useAtom } from "jotai";
import { lerp } from "../threeExport/math/MathUtils";
import { useAnimation } from "framer-motion";
import { Hand } from "@/Hand";

interface HumanProps {
    scroll: MutableRefObject<number>;
    props?: JSX.IntrinsicElements["group"];
}

const Human: FunctionComponent<HumanProps> = (props) => {
    const [pvAtom, setPVAtom] = useAtom(productViewer);
    const [gTarget, setGTarget] = useAtom(globalTarget);
    const [target, setTarget] = useAtom(orbitTarget);
    const [app, setApp] = useAtom(loc);
    const [pos, setPos] = useState<any>([]);
    const [scl, setScale] = useState<any>([]);
    const { viewport, size } = useThree();
    const [w, h] = useAspect(size.width, size.height);

    //refs
    const group: any = useRef(!null);

    useEffect(() => {
        Math.max(0.8, Math.min(viewport.height, 2));
    }, [viewport]);

    useEffect(() => {
        const scale: any = [
            (pvAtom?.width / window.innerWidth) * viewport?.width,
            (pvAtom?.height / window.innerHeight) * viewport?.height,
            1,
        ];
        const position: any = [
            ((pvAtom?.width / window.innerWidth) * viewport.width) / 2 -
            viewport.width / 2 +
            (pvAtom?.left / window.innerWidth) * viewport.width,
            2.5 -
            ((pvAtom?.height / window.innerHeight) * viewport.height) / 2 +
            viewport.height / 2 -
            (pvAtom?.top / window.innerHeight) * viewport.height,
            0,
        ];
        setPos(position);
        setScale(scale);
    }, [pvAtom]);

    const groupControls = useAnimation();

    useEffect(() => {
        app !== "landing" ? groupControls.start({ x: 30, y: pos[1], z: 0, scale: 0 }) :
            groupControls.start({ x: pos[0], y: pos[1], z: 0, scale: Math.max(0.8, Math.min(viewport.width / 10, 2)) })
    }, [pos, app]);
    return (
        // <motion3d.group scale={Math.max(0.8, Math.min(viewport.height / 10, 1.5))} position={[0, 3 + Math.max(1, Math.min(viewport.height / 10, 3)), 0]}>
        <motion3d.group
            ref={group}
            animate={groupControls}
            rotation={[0, 0.2, 0]}
            transition={{
                type: "spring",
                damping: 25,
                stiffness: 50,
                restDelta: 0.1,
                duration: 0.25
            }}
        // position={pos}
        >
            {/* <Head rotation={[0, Math.PI / 1.25, 0]} position={[0, -5.5, 0]} />
       */}
            <HeadHands scroll={props.scroll} />
            {/* <Hand scale={1} rotation={[0, Math.PI / 1.25, 0]} position={[1, -6, -1]} /> */}

            <Shadow
                color="#111"
                scale={5}
                colorStop={0}
                position={[-0.5, -7, 0]}
                opacity={0.2}
                fog={false}
            />
        </motion3d.group>
    );
};

export default Human;
