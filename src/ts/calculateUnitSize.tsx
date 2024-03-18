import { Vector3 } from "@react-three/fiber";

interface calculateUnitSizeProps {
    meshPosZ: number;
    fov: number;
    aspect: number
}

export function calculateUnitSize(props: calculateUnitSizeProps) {
    const vFov = (props.fov * Math.PI) / 180;
    const height = 2 * Math.tan(vFov / 2) * props.meshPosZ;
    const width = height * props.aspect;

    return { width, height };
}

