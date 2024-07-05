import * as THREE from 'three'
import { useRef, useState, useMemo, useEffect, Suspense } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Billboard, Text, TrackballControls, useCursor } from '@react-three/drei'
import { motion as motion3d } from "framer-motion-3d"

function Word({ children, ...props }: any) {
    const color = new THREE.Color()
    const fontProps = { font: '/fonts/poppins-v21-latin-700.ttf', fontSize: 2.5, letterSpacing: -0.05, lineHeight: 1, 'material-toneMapped': false }

    const [hovered, setHovered] = useState(false)
    const over = (e: any) => (e.stopPropagation(), setHovered(true))
    const out = () => setHovered(false)
    // Change the mouse cursor on hover¨
    useCursor(hovered)

    return (
        <Billboard {...props}>
            <Text scale={0.2} onPointerOver={over} onPointerOut={out} onClick={() => console.log('clicked')} {...fontProps}>
                {children}
                <motion3d.meshBasicMaterial toneMapped={false} animate={hovered ? { color: "#2a3916" } : { color: "#ffffff" }} />
            </Text>
        </Billboard>
    )
}

export default function WordCloud() {
    const { viewport } = useThree();

    // states
    const [hovered, setHover] = useState(false);
    const [clicked, setClicked] = useState(false);
    const [disposed, setDisposed] = useState(false);
    const [isInPage, setIsInPage] = useState(false);
    const r = (size: number, index: number) => ((Math.PI * 2) / size) * index;
    const radius = Math.max(2.25, Math.min(viewport.width / 10, 5.5));



    return (<>
        <motion3d.group position={[0, -2, 0]}>{Array.from({ length: 6 }).map((_, index: number) =>

            <Word key={index} position={[
                Math.sin(r(6, index)) * radius / 2,
                0,
                Math.cos(r(6, index)) * radius / 2
            ]} children={"Hello"} />)}</motion3d.group>
        <motion3d.group position={[0, 0, 0]}>{Array.from({ length: 15 }).map((_, index: number) =>

            <Word key={index} position={[
                Math.sin(r(15, index)) * radius,
                0,
                Math.cos(r(15, index)) * radius
            ]} children={"Hello"} />)}</motion3d.group>
        <motion3d.group position={[0, 2, 0]}>{Array.from({ length: 6 }).map((_, index: number) =>

            <Word key={index} position={[
                Math.sin(r(6, index)) * radius / 2,
                0,
                Math.cos(r(6, index)) * radius / 2
            ]} children={"Hello"} />)}</motion3d.group>
    </>)
}


