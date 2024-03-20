import { FunctionComponent } from "react";
import Idea from "./Idea";
import { Instances } from "@react-three/drei";
import { motion as motion3d } from "framer-motion-3d"

interface IdeaCloudProps {
    centerPoint: [number, number, number];
}

const IdeaData = [
    {
        colors: ["#A2FDFD", "#3564A1"],
        text: "Business"
    },
    {
        colors: ["#BDED4C", "#F7FFF2"],
        text: "Private"
    },
    {
        colors: ["#29A2A6", "#F7FFF2"],
        text: "GePoVe"
    },
    {
        colors: ["#BDED4C", "#3564A1"],
        text: "Sport"
    },
    {
        colors: ["#A2FDFD", "#F7FFF2"],
        text: "PLP"
    }

]

const IdeaCloud: FunctionComponent<IdeaCloudProps> = (props) => {
    let coneRotation: any;
    coneRotation = coneRotation === undefined ? Math.PI * 3 : coneRotation;
    var i = 0;

    const radius = 3;
    const counter = 5;
    const r = ((Math.PI * 2) / counter) * i;
    const numIdeas = Array.from(IdeaData);
    return (
        <group position={props.centerPoint}>
            <Instances>
                <sphereGeometry args={[0.2, 30, 30]} />
                <motion3d.meshStandardMaterial variants={
                    {
                        initial: { opacity: 0 }, enter: { opacity: 1 }, exit: { opacity: 0 }
                    }
                } color={"white"} />
                {numIdeas.map((data: any, i: number) => {
                    var r = ((Math.PI * 2) / counter) * i;
                    // random
                    const rand =
                        Math.round(Math.random()) === 1
                            ? +Math.max(0.1, Math.min(Math.random(), 0.4))
                            : -Math.max(0.1, Math.min(Math.random(), 0.4));
                    return <Idea
                        delayFactor={i + 1 / 10}
                        text={data.text}
                        colors={data.colors}
                        key={i}
                        centerPoint={[0, 0, 0]}
                        position={[Math.cos(r) * radius, 0 + rand, Math.sin(r) * radius]}
                        rotation={[0, coneRotation, 0]}
                        duration={3 + Math.random() * 2 + (i * Math.random())}
                    />
                }
                )}
            </Instances>
        </group>
    );
};

export default IdeaCloud;
