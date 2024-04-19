import { FunctionComponent, useEffect, useRef } from "react";
import Idea from "./Idea";
import { Instances } from "@react-three/drei";
import { motion as motion3d } from "framer-motion-3d";
import { useAnimation } from "framer-motion";
import { useSearchParams } from "next/navigation";
import { useAtom } from "jotai";
import { orbitTarget, currentDistance } from "../atoms";
import { Vector3 as V3 } from "@/ts/threeExport/math/Vector3";
import { ShakeHands } from "./ShakeHands";
import { Business } from "@/Business";
import { Private } from "@/Private";
import { GePoVe } from "@/GePoVe";
import { Public } from "@/Public";
import { Sport } from "@/Sport";
import { useThree } from "@react-three/fiber";

interface IdeaCloudProps {
    centerPoint: [number, number, number];
}

export const IdeaData = [
    {
        colors: ["#e5fcfc", "#3564A1"],
        text: "Business",
        model: <Business scale={0.05} rotation={[0, Math.PI / 4, 0]} />
    },
    {
        colors: ["#e5fcfc", "#25b4d1"],
        text: "Private",
        model: <Private scale={0.05} />
    },
    {
        colors: ["#e5fcfc", "#32689C"],
        text: "Gesellschaft",
        model: <GePoVe scale={0.05} />
    },
    {
        colors: ["#32689C", "#abe91c"],
        text: "Sport",
        model: <Sport scale={0.05} />
    },
    {
        colors: ["#e5fcfc", "#abe91c"],
        text: "Public Life",
        model: <Public scale={0.05} />
    },
];

const IdeaCloud: FunctionComponent<IdeaCloudProps> = (props) => {
    const searchParams = useSearchParams();
    const { viewport } = useThree();
    const group = useRef<any>();

    // atoms
    const [orbTarget, setOrbitTarget] = useAtom(orbitTarget);
    const [distance, setDistance] = useAtom(currentDistance);

    let coneRotation: any;
    coneRotation = coneRotation === undefined ? Math.PI * 3 : coneRotation;
    var i = 0;

    const radius = Math.max(3, Math.min(viewport.width / 10, 4));
    const counter = 5;
    const r = ((Math.PI * 2) / counter) * i;
    const numIdeas = Array.from(IdeaData);
    const sphereControls = useAnimation();
    const p: any = new V3();

    function setTarget() {
        searchParams.get("view")
            ? setOrbitTarget(
                group.current
                    .getObjectByName(`${searchParams.get("neuron")}`)
                    .localToWorld(p.set(0, 0.2, 0))
            )
            : setOrbitTarget({ x: 0, y: 1, z: 0 });
    }

    useEffect(() => {
        if (typeof window !== undefined) {
            window.addEventListener('resize', setTarget, false);
            return () => {
                window.removeEventListener('resize', setTarget, false);
            };
        }
    });


    useEffect(() => {
        searchParams.get("neuron")
            ? setOrbitTarget(
                group.current
                    .getObjectByName(`${searchParams.get("neuron")}`)
                    .localToWorld(p.set(0, 0.2, 0))
            )
            : setOrbitTarget({ x: 0, y: 1, z: 0 });
        sphereControls.start(searchParams.get("view") ? "hide" : "visible");
        searchParams.get("view") === null || false && sphereControls.start(searchParams.get("test") ? "hide" : "visible");
    }, [searchParams]);

    return (
        <group ref={group} position={props.centerPoint}>
            <Instances renderOrder={3}>
                <sphereGeometry args={[0.3, 30, 30]} />
                <motion3d.meshStandardMaterial
                    transparent
                    toneMapped
                    animate={sphereControls}
                    variants={{
                        hide: { opacity: 0.2, color: "#fff" },
                        visible: { opacity: 1, color: "#fff" },
                    }}
                />
                {numIdeas.map((data: any, i: number) => {
                    var r = ((Math.PI * 2) / counter) * i;
                    // random
                    const rand =
                        Math.round(Math.random()) === 1
                            ? +Math.max(0.1, Math.min(Math.random(), 0.4))
                            : -Math.max(0.1, Math.min(Math.random(), 0.4));
                    return (
                        <group key={i}>
                            <Idea
                                active={searchParams.get("neuron") === data.text ? true : false}
                                delayFactor={i + 1 / 10}
                                text={data.text}
                                colors={data.colors}
                                centerPoint={[0, 0, 0]}
                                position={[
                                    Math.cos(r) * radius,
                                    0 + rand,
                                    Math.sin(r) * radius,
                                ]}
                                rotation={[0, coneRotation, 0]}
                                duration={3 + Math.random() * 2 + i * Math.random()}
                            >
                                {data.model}
                            </Idea>
                        </group>
                    );
                })}
            </Instances>
        </group>
    );
};

export default IdeaCloud;
