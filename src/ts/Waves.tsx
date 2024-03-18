import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import { Color } from "three";
const vertexShader = `uniform float u_time;

varying float vZ;

void main() {
  vec4 modelPosition = modelMatrix * vec4(position, 1.0);
  
  modelPosition.y += sin(modelPosition.x * 2.0 + u_time * 3.0) * 0.1;
  modelPosition.y += sin(modelPosition.z * 4.0 + u_time * 2.0) * 0.1;
  
  vZ = modelPosition.y;

  vec4 viewPosition = viewMatrix * modelPosition;
  vec4 projectedPosition = projectionMatrix * viewPosition;

  gl_Position = projectedPosition;
}
`

const fragmentShader = `uniform vec3 u_colorA;
uniform vec3 u_colorB;
varying float vZ;


void main() {
  vec3 color = mix(u_colorA, u_colorB, vZ * 2.0 + 0.5); 
  gl_FragColor = vec4(color, 1.0);
}
`

const MovingPlane = () => {
    // This reference will give us direct access to the mesh
    const mesh = useRef<any>();

    const uniforms = useMemo(
        () => ({
            u_time: {
                value: 0.0,
            },
            u_colorA: { value: new Color("#a1e7fc") },
            u_colorB: { value: new Color("#a6dcfc") },
        }), []
    );

    useFrame((state) => {
        const { clock } = state;
        mesh.current.material.uniforms.u_time.value = clock.getElapsedTime() * 0.8;
    });

    return (
        <mesh ref={mesh} position={[3, 0, -3]} rotation={[-Math.PI / 2, 0, 0]} scale={1.5}>
            <planeGeometry args={[100, 100, 320, 320]} />
            <shaderMaterial
                fragmentShader={fragmentShader}
                vertexShader={vertexShader}
                uniforms={uniforms}
                wireframe={false}
            />
        </mesh>
    );
};

const Waves = () => {
    return (

        <MovingPlane />

    );
};


export default Waves;
