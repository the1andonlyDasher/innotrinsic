import React, { useMemo } from 'react';
import { extend, useFrame } from '@react-three/fiber';
import { Color, ShaderMaterial } from 'three';
import { useRef } from 'react';
import { DoubleSide } from 'three';
import { fragment, vertex } from './brainBasicsShader';
import { motion as motion3d } from "framer-motion-3d"

extend({ ShaderMaterial });

interface CSMProps {
    colors: string[]
    active?: boolean;
}

export const CamouflageShaderMaterial = ({ colors, active }: CSMProps) => {
    const materialRef = useRef<ShaderMaterial>(null);

    const uniforms = useMemo(
        () => ({
            u_time: { value: 0.0 },
            u_colors: { value: colors.map((hex: string) => new Color(hex)) }
        }),
        [colors]
    );

    useFrame(({ clock }) => {
        if (materialRef.current) {
            materialRef.current.uniforms.u_time.value = clock.getElapsedTime();
        }
    });



    return (
        <motion3d.shaderMaterial
            ref={materialRef}
            animate={active ? { opacity: 1 } : { opacity: 0 }}
            uniforms={uniforms}
            vertexShader={vertex}
            fragmentShader={fragment}
            transparent
            wireframe

        />
    );
};

const Camouflage = ({ colors }: CSMProps) => {
    return (
        <mesh position={[0, 1, 0]}>
            <boxGeometry args={[1, 1, 1]} />
            <CamouflageShaderMaterial colors={colors} />
        </mesh>
    );
};

export default Camouflage;
