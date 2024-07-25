import React, { useEffect, useMemo, useRef } from 'react';
import { extend, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { motion } from 'framer-motion-3d';
import { useSearchParams } from 'next/navigation';

extend({ Line_: THREE.Line });

const CustomBezierLine = ({ start, control, end, color, index, ...props }: any) => {
    const ref: any = useRef();
    const materialRef: any = useRef();
    const searchParams = useSearchParams()

    const points = useMemo(() => {
        const curve = new THREE.QuadraticBezierCurve3(
            new THREE.Vector3(...start),
            new THREE.Vector3(...control),
            new THREE.Vector3(...end)
        );
        return curve.getPoints(30);
    }, [start, control, end]);

    const lineGeometry = useMemo(() => {
        const geometry = new THREE.BufferGeometry().setFromPoints(points);
        return geometry;
    }, [points]);

    useEffect(() => {
        if (ref.current) {
            ref.current.computeLineDistances();
        }
    }, [points]);


    return (
        <motion.line

            ref={ref}
            geometry={lineGeometry}
            {...props}
        >
            <motion.lineDashedMaterial
                ref={materialRef}
                linewidth={2}
                toneMapped={false}
                scale={1}
                dashSize={0.1}
                gapSize={0.1}
                initial={{ opacity: 0, strokeDashoffset: 0 }}
                animate={searchParams.get("focusGroup") ? { opacity: 1, transition: { delay: 4 + (index / 10) } } :
                    { opacity: 0, strokeDashoffset: 1 }}
                attach="material"
                color={color} />
        </motion.line>
    );
};

export default CustomBezierLine;
