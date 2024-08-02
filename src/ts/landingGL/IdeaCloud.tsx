import { FunctionComponent, MutableRefObject, useEffect, useRef } from "react";
import Idea from "./Idea";
import { Instances } from "@react-three/drei";
import { motion as motion3d } from "framer-motion-3d";
import { useAnimation } from "framer-motion";
import { useSearchParams } from "next/navigation";
import { useAtom } from "jotai";
import { currentDistance, loc, globalTarget } from "../atoms";
import { Vector3 as V3 } from "@/ts/threeExport/math/Vector3";
import { Business } from "@/3DModels/Business";
import { Private } from "@/3DModels/Private";
import { GePoVe } from "@/3DModels/GePoVe";
import { Public } from "@/3DModels/Public";
import { Sport } from "@/3DModels/Sport";
import { useThree } from "@react-three/fiber";
import { useRouter } from "next/router";
import BubbleShader from "./BubbleShader";
import ReactNode from 'react';
import MorphingMesh from "./Bubble";
import BShader from "./BubbleShader";

interface IdeaCloudProps {
    centerPoint: [number, number, number];
    scroll: MutableRefObject<number>;
}

export const IdeaData = [
    {
        // colors: ["#3564A1", "#33e3d4"],
        colors: ["#fcfdd9", "#327217"],
        text: "Sport",
        model: <Sport scale={0.05} />

    },
    {
        // colors: ["#42c46d", "#3561A1"],
        colors: ["#fcfdd9", "#b5f299"],
        text: `Public Persons`,
        model: <Public scale={0.05} />
    },
    {
        // colors: ["#5bff4f", "#bf95fa"],
        colors: ["#fcfdd9", "#b5f299"],
        text: "Gesellschaft",
        model: <GePoVe scale={0.05} />
    },
    {
        // colors: ["#B0E431", "#EDDFAB"],
        colors: ["#fcfdd9", "#b5f299"],
        text: "Privat",
        model: <Private scale={0.05} />
    },
    {
        // colors: ["#297dad", "#e054c0"],
        colors: ["#fcfdd9", "#b5f299"],
        text: "Business",
        model: <Business scale={0.05} rotation={[0, Math.PI / 4, 0]} />
    },
];

const IdeaCloud: FunctionComponent<IdeaCloudProps> = (props) => {
    // search params
    const searchParams = useSearchParams();
    // helpers
    const { viewport } = useThree();
    //refs
    const group = useRef<any>();
    // atoms
    const [orbTarget, setOrbitTarget] = useAtom(globalTarget);
    const [distance, setDistance] = useAtom(currentDistance);
    const [location, setLocation] = useAtom(loc);

    let coneRotation: any;
    coneRotation = coneRotation === undefined ? Math.PI * 3 : coneRotation;
    var i = 0;

    // const radius = Math.max(3, Math.min(viewport.width / 10, 4));
    const radius = Math.max(1.5, Math.min(viewport.width / 10, 2.5));
    const counter = 5;
    const r = ((Math.PI * 2) / counter) * i;
    const numIdeas = Array.from(IdeaData);
    const sphereMaterialControls = useAnimation();
    const p: any = new V3();
    const router = useRouter();

    function setTarget() {
        searchParams.get("view")
            ? setOrbitTarget(
                group.current
                    .getObjectByName(`${searchParams.get("neuron")}`)
                    .localToWorld(p.set(0, 0.2, 0))
            )
            : setOrbitTarget({ x: 0, y: 0, z: 0 });
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
        if (group.current) {
            searchParams.get("neuron")
                ? setOrbitTarget(
                    group.current
                        .getObjectByName(`${searchParams.get("neuron")}`)
                        .localToWorld(p.set(0, -0.2, 0))
                )
                : setOrbitTarget({ x: 0, y: 0, z: 0 });
            sphereMaterialControls.start(searchParams.get("view") !== null || false ? "hide" : "visible");
            searchParams.get("view") === null || false && sphereMaterialControls.start(searchParams.get("test") ? "hide" : "visible");
        }
    }, []);


    useEffect(() => {
        if (group.current) {
            searchParams.get("neuron") && !searchParams.get("focusGroup")
                ? setOrbitTarget(
                    group.current
                        .getObjectByName(`${searchParams.get("neuron")}`)
                        .localToWorld(p.set(0, 0.2, 0))
                ) : searchParams.get("neuron") && searchParams.get("focusGroup") ? setTimeout(() => { setOrbitTarget({ x: 0, y: -1, z: 0 }) }, 1300)
                    : setOrbitTarget({ x: 0, y: -1, z: 0 });
            sphereMaterialControls.start(searchParams.get("view") !== null || false ? "hide" : "visible");
            searchParams.get("view") === null || false && sphereMaterialControls.start(searchParams.get("test") ? "hide" : "visible");
        }
    }, [searchParams]);

    const shaderMaterialRef: any = useRef(null)

    return (
        <group ref={group} position={props.centerPoint}>
            <Instances >
                <sphereGeometry args={[0.35, 30, 30]} />
                <motion3d.meshStandardMaterial
                    visible={false}
                    transparent
                // initial="initial"
                // animate={sphereMaterialControls}
                // variants={{
                //     intitial: { opacity: 0.1, color: "#ebfbca" },
                //     hide: { opacity: 0.1, color: "#ebfbca" },
                //     visible: { opacity: 1, color: "#ebfbca", transition: { delay: 0.5 } },
                // }}
                />
                {numIdeas.map((data: any, i: number) =>
                    <group key={i}>
                        <Idea
                            ShaderMaterialRef={shaderMaterialRef}
                            scroll={props.scroll}
                            active={searchParams.get("neuron") === data.text ? true : false}
                            delayFactor={i + 1 / 10}
                            text={data.text}
                            colors={data.colors}
                            centerPoint={[0, 0, 0]}
                            index={i}
                            r={counter}
                            rotation={[0, coneRotation, 0]}
                            duration={3 + Math.random() * 2 + i * Math.random()}
                        >
                        </Idea>
                    </group>

                )}
            </Instances>
        </group>
    );
};

export default IdeaCloud;
