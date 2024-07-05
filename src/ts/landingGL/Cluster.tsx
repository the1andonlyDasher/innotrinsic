import { Instance, Instances } from "@react-three/drei";
import { Vector3, useThree } from "@react-three/fiber";
import { FC, useEffect, useState } from "react";
import { motion as motion3d } from 'framer-motion-3d';
import { useSearchParams } from "next/navigation";
import { useAnimation } from "framer-motion";


interface ClusterProps {
    name: string;
}

const ClusterPart = ({ index, count, name, visible }: any) => {
    const { viewport } = useThree();
    const r = (size: number, index: number) => ((Math.PI * 2) / size) * index;
    const radius = Math.max(1, Math.min(viewport.width / 10, 1.5));
    const searchParams = useSearchParams();
    const controls = useAnimation();
    useEffect(() => {
        controls.start(searchParams.get("neuron") === name ?
            {
                x: Math.sin(r(count, index)) * radius / 2,
                y: 0.5,
                z: Math.cos(r(count, index)) * radius / 2
            } :
            { x: 0, y: 0, z: 0 }
        );
    }, [searchParams]);
    return (
        <motion3d.group
            visible={visible}
            initial={{ x: 0, y: 0, z: 0 }}
            animate={controls}
            transition={{
                type: "spring",
                damping: 25,
                stiffness: 75,
                restDelta: 0.001
            }}
        >
            <Instance >
            </Instance>
        </motion3d.group>)
}

const Cluster: FC<ClusterProps> = ({ name }) => {
    const count = 3;
    const searchParams = useSearchParams();
    const arr = Array.from({ length: count })
    const controls = useAnimation();
    const [disposed, setDisposed] = useState(true);
    const [inPage, setInPage] = useState(false);
    useEffect(() => {
        if (searchParams.get("neuron") === name) {
            setDisposed(false), setInPage(true)
        } else {
            controls.start({ opacity: 0 }).then(() => {
                setDisposed(true), setInPage(false)
            })
        }
    }, [searchParams]);

    useEffect(() => {
        inPage && controls.start({ opacity: 1 });
    }, [inPage]);

    return (<Instances >
        {arr.map((_, index: number) =>
            <ClusterPart
                visible={!disposed}
                index={index}
                count={count}
                name={name} />)}
        <motion3d.meshStandardMaterial
            initial={{ opacity: 0 }}
            animate={controls}
            toneMapped={false}

            color="#fefffa"
            transparent />
        <sphereGeometry args={[0.2, 20, 20]} />

    </Instances>);
}

export default Cluster;