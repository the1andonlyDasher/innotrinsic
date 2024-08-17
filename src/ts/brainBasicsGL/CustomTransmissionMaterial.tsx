import { extend, useFrame } from '@react-three/fiber';
import { MeshTransmissionMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { forwardRef } from 'react';

// Extend the MeshTransmissionMaterial to create a custom material
const CustomTransmissionMaterial = forwardRef((props, ref: any) => {
    return <meshTransmissionMaterial ref={ref} {...props} />;
});

extend({ CustomTransmissionMaterial });


export default CustomTransmissionMaterial