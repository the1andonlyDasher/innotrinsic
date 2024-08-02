import React, { useRef, useMemo, FC } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { TextureLoader } from 'three/src/loaders/TextureLoader.js';
import { motion as motion3d } from 'framer-motion-3d';
import { lerp } from 'three/src/math/MathUtils.js';
import { ShaderMaterial } from 'three/src/materials/ShaderMaterial.js';
import { size, transition } from '../utils';


interface PlaneProps {
    active: boolean;
    image: string;
}





const imagePlaneVariants = {
    initial: { scale: 0 },
    enter: { scale: 1, transition: transition({ delay: 0 }) },
    exit: { scale: 0, transition: transition({ delay: 1 }) },
}

const Plane: FC<PlaneProps> = ({ active, image }) => {
    const meshRef: any = useRef();
    const imageTexture = useMemo(() => new TextureLoader().load(image), []);
    const cloudTexture = useMemo(() => new TextureLoader().load('/images/clouds.webp'), []);
    const maskTexture = useMemo(() => new TextureLoader().load('/images/clouds_mask.webp'), []);
    const shaderRef = useRef<ShaderMaterial>(null);
    const { viewport } = useThree();

    const uniforms = useMemo(() =>
    ({
        uImage: { value: imageTexture },
        uActive: { value: 0.0 },
        uMask: { value: maskTexture },
        uCloud: { value: cloudTexture },
        uTime: { value: 0 }
    })
        , [])



    const shaderMat = <shaderMaterial
        ref={shaderRef}
        vertexShader={`
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `}


        fragmentShader={`
uniform sampler2D uImage;      // Main image texture
uniform sampler2D uMask;       // Mask texture for edge opacity
uniform float uTime;
uniform float uActive;
varying vec2 vUv;

// Simplex noise implementation
vec3 mod289(vec3 x) {
  return x - floor(x * (1.0 / 289.0)) * 289.0;
}

vec2 mod289(vec2 x) {
  return x - floor(x * (1.0 / 289.0)) * 289.0;
}

vec3 permute(vec3 x) {
  return mod289(((x*34.0)+1.0)*x);
}

float snoise(vec2 v) {
  const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                      -0.577350269189626, 0.024390243902439);
  vec2 i  = floor(v + dot(v, C.yy) );
  vec2 x0 = v -   i + dot(i, C.xx);
  vec2 i1;
  i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod289(i);
  vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
      + i.x + vec3(0.0, i1.x, 1.0 ));
  vec3 m = max(0.375 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
  m = m*m ;
  m = m*m ;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
  vec3 g;
  g.x  = a0.x  * x0.x  + h.x  * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

void main() {
    vec2 uv = vUv;

    // Add animated noise to the UV coordinates for the mask texture
    float noiseValue = snoise(uv * 5.0 + uTime * 0.05) * 0.2; // Larger scale and lower frequency
    vec2 distortedUV = uv + vec2(noiseValue, noiseValue);

    // Clamp distorted UV coordinates to keep the visible part of the image within bounds
    distortedUV = clamp(distortedUV, 0.0, 1.0);

    // Sample the edge mask texture with distorted UV coordinates
    float maskOpacity = texture2D(uMask, distortedUV).r;

    // Calculate cloud opacity based on noise value directly
    float distortedCloudOpacity = 1.0 + 6.0 * snoise(distortedUV * 2.0 + uTime * 0.005); // Adjust scale and frequency as needed

    float cloudOpacity = 1.0 + 1.0 * snoise(uv * 2.0 + uTime * 0.05); // Adjust scale and frequency as needed

    float mixedOpacity = cloudOpacity * distortedCloudOpacity + 2.5;

    // Apply delay for brighter areas
    float delayFactor = 2.0 - mixedOpacity * 2.0; // Invert cloudOpacity to delay more in brighter areas

    // Generate region-based delays using noise function
    float regionNoise = snoise(uv * 5.0); // Adjust scale (5.0) as needed
    float regionThreshold = 0.25; // Adjust threshold for splitting regions
    float regionID = step(regionThreshold, regionNoise); // 1.0 for regions above threshold, 0.0 otherwise
    float regionDelay = mix(3.0, 8.0, regionNoise); // Adjust min and max delays based on regionNoise

    // Adjusted active state opacity based on delay
    float adjustedActive = uActive * mix(regionDelay, 4.0 - pow(abs(delayFactor), 2.0), regionID);

    // Combine edge mask opacity, cloud opacity, and adjusted active state opacity
    float combinedOpacity = maskOpacity * cloudOpacity * adjustedActive;

    // Get the color from the main image texture
    vec4 color = texture2D(uImage, uv);

    // Set the final color with combined opacity
    gl_FragColor = vec4(color.rgb, color.a * combinedOpacity);
}

    `
        }
        uniforms={uniforms}
        transparent={true}
        alphaTest={0.05}
        depthTest={false}
        depthWrite={false}
        attach="material"
        needsUpdate
    />;

    useFrame((state) => {
        if (shaderRef.current) {
            const targetOpacity = active ? 1.0 : 0.0;
            const lerpFactor = active ? 0.0125 : 0.125;
            uniforms.uActive.value = lerp(uniforms.uActive.value, targetOpacity, lerpFactor);
            uniforms.uTime.value = state.clock.getElapsedTime();
            shaderRef.current.needsUpdate = true;
        }
    })

    return (
        <motion3d.mesh
            renderOrder={2}
            variants={imagePlaneVariants}
            initial="initial"
            animate={active ? "enter" : "exit"}
            exit="exit"
            ref={meshRef}>
            {shaderMat}
            <planeGeometry args={[size(1, viewport.width / 5, 2), size(1, viewport.width / 5, 2) * 0.666]} />
            {/* <planeGeometry args={[2 * 5, (5 / 3 * 5)]} /> */}
        </motion3d.mesh>
    );
};



export default Plane;
