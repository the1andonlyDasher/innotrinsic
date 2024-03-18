import {
    Bounds,
    Center,
    GradientTexture,
    Html,
    MeshPortalMaterial,
    PointMaterial,
    Points,
    Stage,
    Text,
    Text3D,
    useAspect,
    useCursor,
} from "@react-three/drei";
import {
    ReactThreeFiber,
    extend,
    useFrame,
    useThree,
} from "@react-three/fiber";
import * as geometry from "maath/geometry";
import { RoundedPlaneGeometry } from "maath/geometry";
import { FunctionComponent, useEffect, useRef, useState } from "react";
import { inSphere } from "maath/random";
import { easing } from "maath";
import { BoxGeometry, MeshLambertMaterial, Quaternion, Vector3 } from "three";
import { useRouter } from "next/router";
import { motion } from "framer-motion-3d";
import { useAnimate, useAnimation } from "framer-motion";
import { useAtom } from "jotai";

declare global {
    namespace JSX {
        interface IntrinsicElements {
            roundedPlaneGeometry: ReactThreeFiber.Object3DNode<
                RoundedPlaneGeometry,
                typeof RoundedPlaneGeometry
            >;
        }
    }
}

extend(geometry);

interface cardTypes {
    title?: string;
    text?: string;
    border: number;
    borderColor?: string;
    color?: string;
    position: any;
    number: string | number;
    children?: any;
    url: any;
    pageUrl?: string;
    images?: any;
    scale: number
}

function Stars(props: any) {
    const ref = useRef<any>(null!);
    const [sphere] = useState(() =>
        inSphere(new Float32Array(5000), { radius: 10.5 })
    );
    useFrame((state, delta) => {
        ref.current.rotation.x -= delta / 10;
        ref.current.rotation.y -= delta / 15;
    });
    return (
        <group rotation={[0, 0, Math.PI / 4]}>
            <Points
                ref={ref}
                positions={sphere}
                stride={3}
                frustumCulled={false}
                {...props}
            >
                <PointMaterial
                    transparent
                    color="#ffa0e0"
                    size={0.005}
                    sizeAttenuation={true}
                    depthWrite={false}
                />
            </Points>
        </group>
    );
}



const videoVariants = {
    initial: { scale: 0 },
    enter: { scale: 1, transition: { delay: 0.5 } },
    exit: { scale: 0 },
};

export const Card: FunctionComponent<cardTypes> = (props) => {
    const { size } = useThree();
    const [w, h] = useAspect(size.width, size.height);
    const ref = useRef<any>(null!);
    const group = useRef<any>(null!);
    const origin = new Vector3(0, 1, 0);
    const [hovered, hover] = useState(false);

    const cardVariants = {
        initial: { scale: 0 },
        enter: { scale: 1 },
        exit: { scale: 0 },
    };

    // cursor
    useCursor(hovered);
    // scene
    // useFrame((state, dt) => {
    //     ref.current.lookAt(origin);
    // });
    //control scene objects


    const width = Math.max(0.5, Math.min(w / 2, 0.75));
    const height = Math.max(2.25, Math.min(w, 3));
    return (
        <motion.group position={props.position} ref={group} variants={cardVariants}>
            <mesh
                scale={props.scale}
                ref={ref}
                name={`0${props.number}`}
                onPointerOver={(e: any) => hover(true)}
                onPointerOut={() => hover(false)}
            >

                <mesh position={[0, 0, -0.01]}>
                    <roundedPlaneGeometry
                        args={[width + props.border * 0.8, width * 1.5 + props.border, 0.1]}
                    />
                    <meshBasicMaterial color={props.borderColor} toneMapped={false} />
                </mesh>
                <Text
                    position={[0, -width * 1.5 / 2 + 0.1, 0.01]}
                    scale={Math.max(.04, Math.min(width * 0.05, .075))}
                    maxWidth={15}
                    lineHeight={1.8}
                    whiteSpace="overflowWrap"
                    textAlign="center"
                    color="#000"
                    anchorX="center"
                    anchorY="bottom"
                    font={"/fonts/pt-serif-v18-latin-700.woff"}
                    characters="abcdefghijklmnopqrstuvwxyz0123456789!"
                    material-toneMapped={false}
                >
                    {props.text}
                </Text>
                <Text
                    position={[0, width / 1.5 + 0, 0.01]}
                    scale={width * 0.1}
                    maxWidth={width}
                    whiteSpace="overflowWrap"
                    color="#000"
                    anchorX="center"
                    textAlign="center"
                    anchorY="top"
                    font={"/fonts/sansita-v11-latin-900.woff"}
                    characters="abcdefghijklmnopqrstuvwxyz0123456789!"
                    material-toneMapped={false}
                >
                    {props.title}
                </Text>

                <Text
                    position={[width / 2, width / 1.5 + 0.4, 0.25]}
                    scale={width * 0.2}
                    color="#a971fc"
                    anchorX="right"
                    anchorY="top"
                    font={"/fonts/pt-serif-v18-latin-700.woff"}
                    characters="abcdefghijklmnopqrstuvwxyz0123456789!"
                    material-toneMapped={false}
                >
                    {props.number}
                </Text>
            </mesh>
        </motion.group>
    );
}
