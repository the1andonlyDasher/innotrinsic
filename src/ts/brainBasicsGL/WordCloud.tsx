import { FC, MutableRefObject, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, Text, useCursor } from "@react-three/drei";
import { motion as motion3d } from "framer-motion-3d";
import CustomBillboard from "../CustomBillboard";
import { Color, Mesh, Vector3 } from "three";
import { size, useCustomCursor } from "../utils";
import AutoSizedText from "./AutoSizedText";
import { useAnimation } from "framer-motion";

interface WordProps {
    children: string;
    position: [number, number, number];
    active: boolean;
    color: string;
    isCenter?: boolean;
    heightDifference: number;
    maxWidth: number;
    minFontSize?: number;
    scroll: MutableRefObject<number>
}


const Word: FC<WordProps> = ({ maxWidth,
    minFontSize = 3, children, color, active, isCenter, position, heightDifference, scroll, ...props }) => {
    const [fontSize, setFontSize] = useState<number>(1);
    const { viewport } = useThree()
    const [ready, setReady] = useState<boolean>(false);
    const fontProps = {
        font: "/fonts/poppins-v21-latin-700.ttf",
        fontSize: fontSize,
        letterSpacing: -0.05,
        lineHeight: 1,
        "material-toneMapped": false,
    };
    const ref = useRef<Mesh>(null);
    let myState = useRef<string>("");
    useCustomCursor(myState.current === "hovered" ? true : false, "pointer");

    const still = useMemo(() => {
        const delay = Math.random() / 2;
        return {
            y: 0,
            x: position[0],
            z: position[2],
            scale: 0,
            transition: {
                scale: {
                    ease: "easeInOut",
                    delay: delay,
                },
                y: {
                    ease: "easeInOut",
                    delay: delay,
                },
            },
        };
    }, []);
    const floating = useMemo(() => {
        const delay = 1 + Math.random() * 5;
        const duration = 6 + Math.random() * 4;
        const scale = 0.45 + Math.random() * 0.8;
        const rand = Math.random() < 0.5 ? 1 : -1;
        return {
            y: [0, scale * rand, -scale * rand, 0],
            x: position[0],
            z: position[2],
            scale: [0, scale, 1, scale, 0],

            transition: {
                scale: {
                    duration: 20 + duration,
                    repeat: Infinity,
                    repeatType: "loop",
                    ease: "easeInOut",
                    delay: delay,
                },
                y: {
                    duration: 20 + duration,
                    repeat: Infinity,
                    repeatType: "loop",
                    ease: "easeInOut",
                    delay: delay,
                },
            },
        };
    }, []);

    const opacityChange = useMemo(() => {
        const opacity = Math.random() / 1.25;
        return {
            opacity: [0, opacity, 0, opacity, 0],
            color: [color, "#ffffff", color, "#ffffff", color],
            transition: {
                opacity: {
                    duration: 20 + Math.random() * 4,
                    repeat: Infinity,
                    repeatType: "loop",
                    ease: "easeInOut",
                    delay: 1 + Math.random() * 5,
                },
            },
        };
    }, []);



    useEffect(() => {
        if (ref.current) {
            ref.current.geometry.computeBoundingBox();
            const size = new Vector3();
            ref.current.geometry.boundingBox?.getSize(size);
            const textWidth = size.x;

            if (textWidth > maxWidth) {
                const newFontSize = (maxWidth / textWidth) * fontSize;
                setFontSize(Math.max(newFontSize, minFontSize));
            }
            setReady(true);
        }
    }, [children, maxWidth, fontSize, minFontSize]);


    const [disposed, setDisposed] = useState(true)
    const [inPage, setInPage] = useState(false)
    const controls = useAnimation()

    const wordVariants = {
        initial: { scale: 0 },
        center: {
            x: [0, 0, 0],
            y: heightDifference === 2 ? [-2, -2, -2] : heightDifference === -2 ? [2, 2, 2] : [0, 0, 0],
            z: [0, 3, 3], scale: [0, 1, 1],
            transition: {
                duration: 4, times: [0.1, 0.6, 1]
            }
        },
        floating: floating,
        exit: still
    }


    useEffect(() => {
        if (active && scroll.current < 0.015) {
            setInPage(true)
            if (active && isCenter) {
                controls.start("center")
            } else if (active && !isCenter) {
                controls.start("floating")
            }
        } else {

            setInPage(false)
            controls.start("exit")

        }
    }, [active, isCenter, scroll.current]);

    useEffect(() => {
        if (!inPage) {
            setTimeout(() => setDisposed(true), 500)
        } else {
            setDisposed(false)
        }
    }, [inPage])

    return (

        <motion3d.group
            visible={!disposed}
            {...props}
            variants={wordVariants}
            initial="initial"
            animate={controls}
        >
            <CustomBillboard>
                <Text
                    {...fontProps}
                    // onSync={() => {
                    //     if (ref.current) {
                    //         ref.current.geometry.computeBoundingBox();
                    //     }
                    // }}
                    {...props}
                    // ref={ref}
                    scale={isCenter ? 1 : 0.4}
                    // onClick={() => console.log("clicked")}
                    maxWidth={0.1}
                    renderOrder={2}
                >
                    {children}
                    <motion3d.meshBasicMaterial
                        toneMapped={false}
                        transparent
                        initial={{ opacity: 0 }}
                        animate={isCenter && active ? { opacity: [0, 1, 0], color: ["#e6b84d", "#183855", "#183855"], transition: { duration: 4, times: [0.2, 0.8, 1] } } : opacityChange}
                    />
                </Text>
            </CustomBillboard>
        </motion3d.group>

    );
};

// WordCloud Component
interface WordCloudProps {
    words: string[];
    colors: string[];
    active: boolean;
    scroll: MutableRefObject<number>

}

const WordCloud: FC<WordCloudProps> = ({ words, colors, active, scroll }) => {
    const { viewport } = useThree();
    const [centerWordIndex, setCenterWordIndex] = useState<number | null>(null);
    const [isCenter, setIsCenter] = useState<boolean>(false);

    // Radius und Position der Wörter
    const r = (size: number, index: number) => ((Math.PI * 2) / size) * index;
    const radius = Math.max(2.25, Math.min(viewport.width / 10, 5.5));

    // Wörter über die Ringe gleichmäßig verteilen
    const desiredCount = 18;
    const firstRingCount = Math.min(6, desiredCount); // Max 6 für den ersten ring
    const remainingCount = desiredCount - firstRingCount;
    const secondRingCount = Math.min(remainingCount, 8); // Max 8 für den zweiten
    const thirdRingCount = remainingCount - secondRingCount; // alle anderen für den dritten
    const [currentWords, setCurrentWords] = useState<string[]>([]);

    // Wörter so oft wiederholen, dass sie der angegebenen anzahl entsprechen + Farben
    const repeatedWords = useMemo(
        () => Array.from({ length: desiredCount }, (_, index) => words[index % words.length]),
        [words, desiredCount]
    );
    const repeatedColors = useMemo(
        () => Array.from({ length: desiredCount }, (_, index) => colors[index % colors.length]),
        [colors, desiredCount]
    );

    // Animation Loop für die Wörter in der Mitte
    useEffect(() => {
        let timeout: NodeJS.Timeout;
        let index = 0;

        const loop = () => {
            setCenterWordIndex(index);
            setIsCenter(true);

            // zum nächsten Wort gehen
            timeout = setTimeout(() => {
                setIsCenter(false);
                index = (index + 1) % repeatedWords.length;
                timeout = setTimeout(loop, 1000); // Delay bevor das nächste Wort kommt
            }, 4000); // Dauer der animation
        };

        loop();

        return () => clearTimeout(timeout);
    }, [repeatedWords.length]);

    // Wörter initialisieren wenn die Komponent mounted
    useEffect(() => {
        setCurrentWords(Array.from({ length: desiredCount }, (_, index) => words[index % words.length]));
    }, [words, desiredCount]);

    // tauschmechanik
    useEffect(() => {
        const swapWords = () => {
            setCurrentWords((prevWords) =>
                prevWords.map((word, index) => words[(words.indexOf(word) + 1) % words.length])
            );
        };

        const interval = setInterval(swapWords, 5000); // alle 5 sek tauschen

        return () => clearInterval(interval); // bei unmount aufräumen
    }, [words]);

    return (
        <motion3d.group
            position={[0.1, 1.9, 0]}
            scale={0.125}
        // animate={{
        //     rotateY: Math.PI,
        //     transition: {
        //         repeat: Infinity,
        //         repeatType: "loop",
        //         ease: "easeInOut",
        //         duration: 150,
        //     },
        // }}
        >
            {/* Erster Ring */}
            <motion3d.group

                position={[0, -2, 0]}>
                {Array.from({ length: firstRingCount }).map((_, index) => (
                    <Word
                        maxWidth={15}
                        heightDifference={-2}
                        active={active}
                        color={repeatedColors[index]}
                        key={index}
                        scroll={scroll}
                        position={[
                            (Math.sin(r(firstRingCount, index)) * radius) / 2,
                            0,
                            (Math.cos(r(firstRingCount, index)) * radius) / 2,
                        ]}
                        isCenter={centerWordIndex === index && isCenter}
                    >
                        {repeatedWords[index]}
                    </Word>
                ))}
            </motion3d.group>
            {/* Zweiter Ring */}
            <motion3d.group

                position={[0, 0, 0]}>
                {Array.from({ length: secondRingCount }).map((_, index) => (
                    <Word
                        maxWidth={15}
                        heightDifference={0}
                        scroll={scroll}
                        active={active}
                        color={repeatedColors[firstRingCount + index]}
                        key={firstRingCount + index}
                        position={[
                            Math.sin(r(secondRingCount, index)) * radius,
                            0,
                            Math.cos(r(secondRingCount, index)) * radius,
                        ]}
                        isCenter={centerWordIndex === firstRingCount + index && isCenter}
                    >
                        {repeatedWords[firstRingCount + index]}
                    </Word>
                ))}
            </motion3d.group>
            {/* Dritter Ring */}
            <motion3d.group

                position={[0, 2, 0]}>
                {Array.from({ length: thirdRingCount }).map((_, index) => (
                    <Word
                        maxWidth={15}
                        scroll={scroll}
                        heightDifference={2}
                        active={active}
                        color={repeatedColors[firstRingCount + secondRingCount + index]}
                        key={firstRingCount + secondRingCount + index}
                        position={[
                            (Math.sin(r(thirdRingCount, index)) * radius) / 2,
                            0,
                            (Math.cos(r(thirdRingCount, index)) * radius) / 2,
                        ]}
                        isCenter={centerWordIndex === firstRingCount + secondRingCount + index && isCenter}
                    >
                        {repeatedWords[firstRingCount + secondRingCount + index]}
                    </Word>
                ))}
            </motion3d.group>
        </motion3d.group>
    );
};

export default WordCloud;
