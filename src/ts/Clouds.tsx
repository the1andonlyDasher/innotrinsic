import { FunctionComponent } from "react";
import { Billboard, Image } from "@react-three/drei";
interface CloudsProps {

}

const Clouds: FunctionComponent<CloudsProps> = () => {

    return (<Billboard lockZ lockX follow={false} position={[0, 0, 0]}>
        <Image lookAt={() => [0, 0, 0]} transparent scale={[160, 100]} url="/images/clouds.png" position={[300, 250, -500]} />
        <Image transparent scale={[160, 100]} url="/images/clouds2.png" position={[10, 200, -600]} />
        <Image transparent scale={[160, 100]} url="/images/clouds3.png" position={[10, 250, -700]} />
        <Image transparent scale={[160, 100]} url="/images/clouds4.png" position={[-100, 400, -1000]} />
    </Billboard>);
}

export default Clouds;