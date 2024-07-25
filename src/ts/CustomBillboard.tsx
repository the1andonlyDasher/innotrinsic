import React, { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Group, Quaternion } from "three";

interface CustomBillboardProps {
    children: React.ReactNode;
    follow?: boolean;
    lockXAxis?: boolean;
    lockYAxis?: boolean;
    lockZAxis?: boolean;
    [key: string]: any;
}

const CustomBillboard: React.FC<CustomBillboardProps> = ({
    children,
    follow = true,
    lockXAxis = false,
    lockYAxis = false,
    lockZAxis = false,
    ...props
}) => {
    const { camera } = useThree();
    const groupRef = useRef<Group>(null);
    const innerRef = useRef<Group>(null);
    const quaternion = new Quaternion();

    useFrame(() => {
        if (groupRef.current) {
            if (!follow || !groupRef.current || !innerRef.current) return;

            const prevRotation = groupRef.current.rotation.clone();

            groupRef.current.updateMatrix();
            groupRef.current.updateWorldMatrix(false, false);
            groupRef.current.getWorldQuaternion(quaternion);
            camera.getWorldQuaternion(innerRef.current.quaternion).premultiply(quaternion.invert());

            // Apply rotation based on locked axes
            if (!lockXAxis) groupRef.current.rotation.x = prevRotation.x;
            if (!lockYAxis) groupRef.current.rotation.y = prevRotation.y;
            if (!lockZAxis) groupRef.current.rotation.z = prevRotation.z;
        }
    });

    return <group ref={groupRef} {...props}>
        <group ref={innerRef}>
            {children}
        </group>
    </group>;
};

export default CustomBillboard;
