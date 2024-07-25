import React, { useRef, useMemo, useLayoutEffect, FC, useState, ReactNode } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { motion as motion3d } from "framer-motion-3d";
import * as THREE from "three";
import { TextureLoader } from "three";
import { size } from "../utils";
import { lerp } from "three/src/math/MathUtils.js";

interface MorphingMeshProps {
    textureUrl: string;
    count: number;
    clicked: boolean;
    inactive: boolean;
    focused: boolean;
    position: [number, number, number]
}

const MorphingMesh: FC<MorphingMeshProps> = ({
    textureUrl,
    count,
    clicked,
    focused,
    inactive,
    position
}) => {
    const imageTexture = useMemo(
        () => new TextureLoader().load(textureUrl),
        [textureUrl]
    );
    const cloudTexture = useMemo(
        () => new TextureLoader().load("/images/clouds.webp"),
        []
    );
    const maskTexture = useMemo(
        () => new TextureLoader().load("/images/clouds_mask.webp"),
        []
    );

    const shaderRef = useRef<THREE.ShaderMaterial>(null);
    const { viewport } = useThree();

    const planeGeom = useMemo(() => {
        const geom = new THREE.PlaneGeometry(size(1, viewport.width / 5, 2), size(1, viewport.width / 5, 2) * 0.666, 64, 64);
        geom.morphAttributes.position = [];

        const sphereFormation: number[] = [];
        const uvs = geom.attributes.uv as THREE.BufferAttribute;
        const uv = new THREE.Vector2();
        const V = new THREE.Vector3();
        for (let i = 0; i < uvs.count; i++) {
            uv.fromBufferAttribute(uvs, i);
            V.setFromSphericalCoords(
                0.35,
                Math.PI * (1 - uv.y),
                Math.PI * (uv.x - 0.5) * 2
            );
            sphereFormation.push(V.x, V.y, V.z);
        }
        geom.morphAttributes.position[0] = new THREE.Float32BufferAttribute(
            sphereFormation,
            3
        );
        return geom;
    }, []);

    const uniforms = useMemo(
        () => ({
            uImage: { value: imageTexture },
            uActive: { value: 0.0 },
            uFocused: { value: 0.0 },
            uInactive: { value: 0.0 },
            uMask: { value: maskTexture },
            uCloud: { value: cloudTexture },
            uTime: { value: 0 },
            uBeigeColor: { value: new THREE.Color(0xf5f5dc) }, // Beige color
        }),
        [imageTexture, maskTexture, cloudTexture]
    );

    const shaderMat = useMemo(
        () => (
            <shaderMaterial
                ref={shaderRef}
                vertexShader={`
                    #include <morphtarget_pars_vertex>
                    varying vec2 vUv;
    
                    void main() {
                        vUv = uv;
                        #include <begin_vertex>
                        #include <morphtarget_vertex>
                        gl_Position = projectionMatrix * modelViewMatrix * vec4(transformed, 1.0);
                    }
                `}
                fragmentShader={`
// Main image texture
uniform sampler2D uImage;

// Mask texture for edge opacity      
uniform sampler2D uMask;       

uniform float uTime;
uniform float uActive;
uniform float uInactive;
uniform float uFocused;

// Beige color uniform
uniform vec3 uBeigeColor;

// Varying UV coordinates
varying vec2 vUv;     

// Simplex noise implementation
vec3 mod289(vec3 x) {
    return x - floor(x * (1.0 / 289.0)) * 289.0;
}

vec2 mod289(vec2 x) {
    return x - floor(x * (1.0 / 289.0)) * 289.0;
}

vec3 permute(vec3 x) {
    return mod289(((x * 34.0) + 1.0) * x);
}

float snoise(vec2 v) {
    const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy));
    vec2 x0 = v - i + dot(i, C.xx);
    vec2 i1;
    i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod289(i);
    vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
    vec3 m = max(0.375 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
    m = m * m ;
    m = m * m ;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);
    vec3 g;
    g.x  = a0.x * x0.x + h.x * x0.y;
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
    float distortedCloudOpacity = 1.0 + 6.0 * snoise(uv * 10.0 + uTime * 0.05) * 0.2; // Adjust scale and frequency as needed

    float cloudOpacity = 2.0 + 1.0 * snoise(uv * 2.0 + uTime * 0.05); // Adjust scale and frequency as needed

    float mixedOpacity = cloudOpacity * distortedCloudOpacity + 2.5;

    // Apply delay for brighter areas
    float delayFactor = 6.0 - mixedOpacity * 0.01; // Invert cloudOpacity to delay more in brighter areas

    // Generate region-based delays using noise function
    float regionNoise = snoise(uv * 3.0); // Adjust scale (5.0) as needed
    float regionThreshold = 0.25; // Adjust threshold for splitting regions
    float regionID = step(regionThreshold, regionNoise); // 1.0 for regions above threshold, 0.0 otherwise
    float regionDelay = mix(3.0, 12.0, regionNoise); // Adjust min and max delays based on regionNoise

    // Adjusted active state opacity based on delay
    float adjustedActive = uActive * mix(regionDelay, 8.0 - pow(abs(delayFactor), 2.0), regionID);

    // Combine edge mask opacity, cloud opacity, and adjusted active state opacity
    float combinedOpacity = maskOpacity  * cloudOpacity * distortedCloudOpacity * adjustedActive * uFocused;

    float combinedOpacity2 =  cloudOpacity * (1.0 - adjustedActive) * uInactive ;

    // Get the color from the main image texture
    vec4 color = texture2D(uImage, uv);

    vec4 imgColor = vec4(color.rgb, color.a * combinedOpacity);

    // Beige color with full opacity
    vec4 beigeColor = vec4(uBeigeColor ,  combinedOpacity2 );

    // Blend between beige color and the texture color based on uActive
    vec4 finalColor = mix(beigeColor, imgColor, uActive);

    // Set the final color with combined opacity
    gl_FragColor = vec4(finalColor.rgb, finalColor.a );
}

          `}
                uniforms={uniforms}
                transparent={true}
                alphaTest={0}
                attach="material"
            />
        ),
        [uniforms]
    );

    useFrame((state) => {
        if (shaderRef.current) {
            const targetOpacity = clicked ? 1.0 : 0.0;
            const lerpFactor = clicked ? 0.0125 : 0.0475;
            const lerpFactor2 = focused ? 0.0475 : 0.0125;
            uniforms.uInactive.value = lerp(uniforms.uInactive.value, inactive ? 0.0 : 1.0, lerpFactor);
            uniforms.uFocused.value = lerp(uniforms.uFocused.value, focused ? 0.0 : 1.0, lerpFactor2);
            uniforms.uActive.value = lerp(
                uniforms.uActive.value,
                targetOpacity,
                lerpFactor
            );
            uniforms.uTime.value = state.clock.getElapsedTime();
            shaderRef.current.needsUpdate = true;
        }
    });

    const meshRefs = useRef<any>([]);

    useLayoutEffect(() => {
        meshRefs.current.forEach((mesh: any) => {
            if (mesh) {
                mesh.updateMorphTargets();
            }
        });
    }, [planeGeom]);

    useFrame(() => {
        if (meshRefs.current) {
            meshRefs.current.renderOrder = clicked ? 3 : 0;
            meshRefs.current.forEach((mesh: any) => {
                if (mesh) {
                    const influences = mesh.morphTargetInfluences!;
                    influences[0] = THREE.MathUtils.lerp(
                        influences[0],
                        clicked ? 0 : 1,
                        0.05
                    );
                }
            });
        }
    });

    const positions = useMemo(() => {
        const pos: [number, number, number][] = [];
        for (let i = 0; i < count; i++) {
            const angle = (i / count) * Math.PI * 2;
            pos.push([Math.cos(angle) * 10, 0, Math.sin(angle) * 10]);
        }
        return pos;
    }, [count]);

    return (
        <group position={position}>
            {positions.map((pos, i) => (
                <motion3d.mesh

                    key={i}
                    ref={(el: any) => (meshRefs.current[i] = el)}
                    geometry={planeGeom}
                    position={[0, 0, 0]}
                // position={pos}
                >
                    {shaderMat}
                </motion3d.mesh>
            ))}
        </group>
    );
};

export default MorphingMesh;
