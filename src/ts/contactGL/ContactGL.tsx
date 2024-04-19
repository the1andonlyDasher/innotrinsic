import { Hand } from "@/Hand";
import { FunctionComponent } from "react";
import { Input } from "./ControlledInput";
import { Bounds, Text } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { motion as motion3d } from "framer-motion-3d"
import { useRouter } from "next/router";
import { size } from "../utils";

interface ContactGLProps {

}

const ContactGL: FunctionComponent<ContactGLProps> = () => {
    const { viewport } = useThree()
    const router = useRouter()
    return (
        <motion3d.group
            animate={router.pathname === "/kontakt" ? { scale: 1 } : { scale: 0 }}
        >
            <Hand scale={2} rotation={[0, Math.PI / 1.25, 0]} position={[0, -3, -2]} />
            <Text
                lookAt={() => [0, 0, -5]}
                position={[0, 6, -1]}
                scale={Math.max(0.65, Math.min(viewport.width / 20, 1))}
                textAlign="center"
                anchorX="center"
                strokeWidth={0}
                renderOrder={5}
                anchorY="bottom"
                font="/fonts/montserrat-alternates-v17-latin-800.ttf"
            >
                <meshBasicMaterial
                    toneMapped={false}
                />
                {`Rauchzeichen sind außer Mode...`}
            </Text>
            <Input placeholder={"Name..."} x={1} y={1} scale={2} position={[0.4, 5, -1]} />
            <Input placeholder={"Email..."} x={1} y={1} scale={2} position={[0.4, 3.25, -1]} />
            <Input placeholder={"Nachricht..."} x={1} y={3} scale={2} position={[0.4, 0.25, -1]} />
        </motion3d.group>

    );
}

export default ContactGL;