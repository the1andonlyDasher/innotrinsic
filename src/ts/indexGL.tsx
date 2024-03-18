import { useFrame, useThree } from "@react-three/fiber";
import { Physics, PlaneProps, useBox, usePlane, useSphere } from "@react-three/cannon"
// import { Model } from "./symbols/yacht";
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { Color, InstancedMesh, Mesh } from "three";
import { motion as motion3d } from "framer-motion-3d";
import { useAnimation } from "framer-motion";
import { Model } from "@/symbols/yacht";

let mouseX: any;
let mouseY: any;
let windowHalfX: any;
let windowHalfY: any;


function Plane({ color, position = [0, -0.5, 0], ...props }: any) {
    const [, api]: any = usePlane(() => ({ ...props }))
    useEffect(() => api.position.set(...position), [api, position])
    return (<></>)
}

function Borders() {
    const { viewport }: any = useThree()
    return (
        <>
            <Plane position={[0, -viewport.height / 2 + 0.5, 0]} rotation={[-Math.PI / 2, 0, 0]} />
            <Plane position={[-viewport.width / 2 - 2, 0, 0]} rotation={[0, Math.PI / 2, 0]} />
            <Plane position={[viewport.width / 2 + 2, 0, 0]} rotation={[0, -Math.PI / 2, 0]} />
            <Plane position={[0, 0, -0.5]} rotation={[0, 0, 0]} />
            <Plane position={[0, 0, 12]} rotation={[0, -Math.PI, 0]} />
        </>
    )
}

type InstancedGeometryProps = {
    colors: Float32Array
    number: number
    size: number
}

const Spheres = ({ colors, number, size }: InstancedGeometryProps) => {
    const [ref, { at }] = useSphere(
        () => ({
            args: [size],
            mass: 1,
            position: [Math.random() * size * 10 - 0.5, Math.random() * 2, Math.random() - 0.5],
        }),
        useRef<InstancedMesh>(null),
    )
    useEffect(() => at(Math.floor(Math.random() * number)).position.set(Math.random() * 10 - 0.5, Math.random() * 2, Math.random() - 0.5), [])
    return (
        <instancedMesh castShadow ref={ref} args={[undefined, undefined, number]}>
            <sphereGeometry args={[size, 48]}>
                <instancedBufferAttribute attach="attributes-color" args={[colors, 3]} />
            </sphereGeometry>
            <meshLambertMaterial vertexColors />
        </instancedMesh>
    )
}


function Mouse() {
    const { viewport } = useThree()
    const [ref, api]: any = useSphere(() => ({ type: "Kinematic", args: [1], position: [0, 0, 0] }))
    return useFrame((state) => api.position.set((state.pointer.x * viewport.width) / 2, (state.pointer.y * viewport.height) / 2, 1))
}


export function IndexGL() {

    const [number] = useState(300)
    const [size] = useState(0.3)

    const colors = useMemo(() => {
        const array = new Float32Array(number * 3)
        const color = new Color()
        color.setStyle('hsl(180, 90%, 49%)');
        for (let i = 0; i < number; i++)
            color
                .set(`hsl(1${8 + Math.floor(Math.random() * 2)}${Math.floor(Math.random() * 10)},  90%, 75%)`)
                .convertSRGBToLinear()
                .toArray(array, i * 3)
        return array
    }, [number])

    const InstancedGeometry = Spheres

    return (<>
        <Physics gravity={[0, -10, 0]} defaultContactMaterial={{ restitution: 0.5 }} iterations={10}>
            <group position={[0, 1, -3]}>
                <Model position={[0, 1, -5]} />
                <Mouse />
                <Borders />
                <InstancedGeometry {...{ colors, number, size }} />
            </group>
        </Physics>
    </>
    )
}