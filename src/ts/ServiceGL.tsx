import { Flex, Box } from "@react-three/flex"
import { Vector3, useFrame, useThree } from "@react-three/fiber"
import { Card } from "./portfolio/Card"
import { Scroll, ScrollControls, useAspect, useIntersect } from "@react-three/drei"
import { useEffect, useRef, useState } from "react"
import { motion as motion3d } from "framer-motion-3d"
import { useAnimation, useScroll, useSpring } from "framer-motion"
import { loc, productViewer, servicesViewer } from "./atoms"
import { useAtom } from "jotai"
import { useRouter } from "next/router"
import { calculateUnitSize } from "./calculateUnitSize"
import { IconDefinition, faLocation } from "@fortawesome/free-solid-svg-icons"

interface SGLProps {
    scrollElement: any;
}

interface serviceProps {
    value: {
        header: string;
        text: string;
        icon: IconDefinition
    }
}

const services = [
    {
        header: "Standortanalyse",
        text: "Gemeinsam entwickle ich mit dir deine persönliche Marke für einen authentischen Auftritt",
        icon: { faLocation }
    },
    {
        header: "Bewerbungsunterlagen",
        text: "Ich helfe dir beim Erstellen qualifizierter Bewerbungsunterlagen, individuell und originell abgestimmt auf deine Persönlichkeit",
        icon: { faLocation }
    },
    {
        header: "Vorstellungsgespräch",
        text: "Ich bereite dich auf dein persönliches Interview vor. Meine Starthilfe für deinen neuen Job bringt deine beste Seite zum Vorschein",
        icon: { faLocation }
    },
    {
        header: "Astrologische Beratung",
        text: "Der Weg zu Deiner Berufung! Ich gebe dir einen Einblick in dein Geburtsradix, um deine Talente und FÃ¤higkeiten zu beleuchten und deine wahre Berufung zu erkennen!",
        icon: { faLocation }
    }
]

export const ServiceGL = (props: SGLProps) => {
    const [svAtom, setSVAtom] = useAtom(servicesViewer);
    const loc = useRouter()
    const [pos, setPos] = useState<any>([])
    const [scl, setScale] = useState<any>([])
    const { viewport, size } = useThree();
    const [w, h] = useAspect(size.width, size.height)

    useEffect(() => {
        console.log(viewport)
        const scale: any = [
            (((svAtom?.width) / window.innerWidth) * viewport?.width),
            0 -
            (((svAtom?.height) / window.innerHeight) * viewport?.height),
            1,
        ]
        const position: any =
            [
                ((svAtom?.width / window.innerWidth) * viewport.width) / 2 -
                viewport.width / 2 - ((svAtom?.width / window.innerWidth) * viewport.width) / 2 +
                (svAtom?.left / window.innerWidth) * viewport.width,

                ((svAtom?.height / window.innerHeight) * viewport.height) / 2 +
                viewport.height / 2 -
                (svAtom?.top / window.innerHeight) * viewport.height,
                0,
            ];
        setPos(position)
        setScale(scale)
    }, [svAtom]);

    const headControls = useAnimation()

    useEffect(() => {
        headControls.start({ x: pos[0], y: pos[1], z: pos[2], transition: { type: "spring", damping: 10, stiffness: 50 } })
        // headControls.start({ scaleX: scl[0] / 3, scaleY: scl[1] / 3, z: scl[2], transition: { type: "spring", damping: 10, stiffness: 50 } })
    }, [pos])

    return (<>
        <Flex
            flexDirection="row"
            flexWrap="wrap"
            justifyContent="center"
            alignItems="center"
            position={pos}
            size={scl}
        >

            {services.map((item: any, index: number) =>
                <Box
                    key={index}
                    centerAnchor
                    margin={0.2}
                    width={0.5}
                    height={1}
                    flexBasis={0.5}
                    flexGrow={1}

                ><Card text={item.text} title={item.header} color="black" border={0} position={[0, 0, 0]} number={index + 1} url={undefined} /></Box>)}
        </Flex>
    </>
    )
}

