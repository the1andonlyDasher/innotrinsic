import { FunctionComponent } from "react";
import { LayerMaterial, Color, Depth } from 'lamina'
import { useThree } from "@react-three/fiber";
import { BackSide } from "three";

interface BackgroundGLProps {

}

const BackgroundGL: FunctionComponent<BackgroundGLProps> = () => {
    const viewport = useThree(state => state.viewport)
    return (
        <mesh scale={[viewport.width, viewport.height, 1]}>
            <LayerMaterial
                color="#ffffff" //
                lighting="physical"
                transmission={1}
            >
                <Depth
                    colorA="#810000" //
                    colorB="#ffd0d0"
                    alpha={0.5}
                    mode="multiply"
                    near={0}
                    far={2}
                    origin={[1, 1, 1]}
                />
            </LayerMaterial>
            <planeGeometry args={[viewport.width, viewport.height, 1]} />
        </mesh>);
}

export default BackgroundGL;