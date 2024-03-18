import { Float, Text } from "@react-three/drei";
import { useAtom } from "jotai";
import { FunctionComponent, useEffect, useState } from "react";
import { leftCardViewer, rightCardViewer, servicesViewer } from "./atoms";
import { useThree } from "@react-three/fiber";
import { Card } from "./portfolio/Card";
import { Astro } from "./astro";
import { propagateServerField } from "next/dist/server/lib/render-server";
import { useMotionValueEvent, useScroll } from "framer-motion";

interface ServicesProps {
    eventSource: any;
}

const serviceTexts: any = [
    {
        header: "Standortanalyse",
        text: "Gemeinsam entwickle ich mit dir deine persönliche Marke für einen authentischen Auftritt",
    },
    {
        header: `Bewerbungs-\nunterlagen`,
        text: "Ich helfe dir beim Erstellen qualifizierter Bewerbungsunterlagen, individuell und originell abgestimmt auf deine Persönlichkeit",
    },
    {
        header: `Vorstellungs-\ngespräch`,
        text: "Ich bereite dich auf dein persönliches Interview vor. Meine Starthilfe für deinen neuen Job bringt deine beste Seite zum Vorschein",
    },
    {
        header: "Astrologische Beratung",
        text: "Der Weg zu Deiner Berufung! Ich gebe dir einen Einblick in dein Geburtsradix, um deine Talente und Fähigkeiten zu beleuchten und deine wahre Berufung zu erkennen!",
    }
]

interface textProps {
    header: string;
    text: string;

}


const Services: FunctionComponent<ServicesProps> = (props) => {
    const [rCV, setrCV] = useAtom(rightCardViewer);
    const [pos, setPos] = useState<any>([])
    const [scl, setScale] = useState<any>([])
    const { viewport } = useThree();
    const { scrollYProgress } = useScroll({ container: props.eventSource })
    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        const xFloor = Math.floor(latest * 6);
        // console.log(latest);
    })

    useEffect(() => {
        const scale: any = [
            (((rCV?.width) / window.innerWidth) * viewport?.width),

            (((rCV?.height) / window.innerHeight) * viewport?.height),
            1,
        ]
        const position: any =
            [
                ((rCV?.width / window.innerWidth) * viewport.width) / 2 -
                viewport.width / 2 +
                (rCV?.left / window.innerWidth) * viewport.width,
                0.5 -
                ((rCV?.height / window.innerHeight) * viewport.height) / 2 +
                viewport.height / 2 -
                (rCV?.top / window.innerHeight) * viewport.height,
                -3,
            ];
        console.log(pos)
        setPos(position)
        setScale(scale)
    }, [rCV]);
    return (<>
        <group position={pos}>
            <Astro />
        </group>
    </>);
}

export default Services;