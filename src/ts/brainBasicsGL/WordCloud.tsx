import { FC, useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, Text, useCursor } from '@react-three/drei';
import { motion as motion3d } from 'framer-motion-3d';
import CustomBillboard from '../CustomBillboard';
import { Color, Vector3 } from 'three';
import { useCustomCursor } from '../utils';

// Word Component
interface WordProps {
    children: string;
    position: [number, number, number];
    active: boolean;
    color: string;
}

const Word: FC<WordProps> = ({ children, color, active, ...props }) => {
    const fontProps = { font: '/fonts/poppins-v21-latin-700.ttf', fontSize: 2.5, letterSpacing: -0.05, lineHeight: 1, 'material-toneMapped': false };
    const ref = useRef<any>(null);
    let myState = useRef<string>("");
    useCustomCursor(myState.current === "hovered" ? true : false, 'pointer');

    const still = useMemo(() => {
        const delay = Math.random() / 2;
        return {
            y: 0,
            scale: 0,
            transition: {
                scale: {
                    ease: 'easeInOut',
                    delay: delay,
                },
                y: {
                    ease: 'easeInOut',
                    delay: delay,
                },
            },

        };
    }, []);
    const floating = useMemo(() => {
        const delay = 1 + Math.random() * 5;
        const duration = 6 + Math.random() * 4;
        const scale = 0.5 + Math.random() * 0.8;
        return {
            y: [0, scale, -scale, 0],
            scale: [1, scale, 1],
            transition: {
                scale: {
                    duration: duration,
                    repeat: Infinity,
                    repeatType: 'loop',
                    ease: 'easeInOut',
                    delay: delay,
                },
                y: {
                    duration: 20 + duration,
                    repeat: Infinity,
                    repeatType: 'loop',
                    ease: 'easeInOut',
                    delay: delay,
                },
            },
        };
    }, []);

    const opacityChange = useMemo(() => {
        const opacity = Math.random();
        return {
            opacity: [1, opacity, 1],
            transition: {
                opacity: {
                    duration: 6 + Math.random() * 4,
                    repeat: Infinity,
                    repeatType: 'loop',
                    ease: 'easeInOut',
                    delay: 1 + Math.random() * 5,
                },
            },
        };
    }, []);

    return (
        <motion3d.group {...props}
            animate={
                active ?
                    floating :
                    still}
        >
            <CustomBillboard>
                <Text
                    ref={ref}
                    scale={0.2}
                    onClick={() => console.log('clicked')}
                    {...fontProps}>
                    {children}
                    <motion3d.meshBasicMaterial toneMapped={false} color={color} transparent animate={opacityChange} />
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
}

const WordCloud: FC<WordCloudProps> = ({ words, colors, active }) => {
    const { viewport } = useThree();

    // states
    const r = (size: number, index: number) => ((Math.PI * 2) / size) * index;
    const radius = Math.max(2.25, Math.min(viewport.width / 10, 5.5));

    // Repeat words until we reach the desired count
    const desiredCount = 33;
    const repeatedWords = useMemo(() => Array.from({ length: desiredCount }, (_, index) => words[index % words.length]), [words, desiredCount]);
    const repeatedColors = useMemo(() => Array.from({ length: desiredCount }, (_, index) => colors[index % colors.length]), [colors, desiredCount]);

    return (
        <motion3d.group position={[0, 1.9, 0]} scale={0.125}>
            <motion3d.group position={[0, -2, 0]}>
                {Array.from({ length: 9 }).map((_, index: number) => (
                    <Word
                        active={active}
                        color={repeatedColors[index]}
                        key={index}
                        position={[
                            Math.sin(r(9, index)) * radius / 2,
                            0,
                            Math.cos(r(9, index)) * radius / 2
                        ]}
                    >
                        {repeatedWords[index]}
                    </Word>
                ))}
            </motion3d.group>
            <motion3d.group position={[0, 0, 0]}>
                {Array.from({ length: 15 }).map((_, index: number) => (
                    <Word
                        active={active}
                        color={repeatedColors[index]}
                        key={index}
                        position={[
                            Math.sin(r(15, index)) * radius,
                            0,
                            Math.cos(r(15, index)) * radius
                        ]}
                    >
                        {repeatedWords[9 + index]}
                    </Word>
                ))}
            </motion3d.group>
            <motion3d.group position={[0, 2, 0]}>
                {Array.from({ length: 9 }).map((_, index: number) => (
                    <Word
                        active={active}
                        color={repeatedColors[index]}
                        key={index}
                        position={[
                            Math.sin(r(9, index)) * radius / 2,
                            0,
                            Math.cos(r(9, index)) * radius / 2
                        ]}
                    >
                        {repeatedWords[24 + index]}
                    </Word>
                ))}
            </motion3d.group>
        </motion3d.group>
    );
}

export default WordCloud;

