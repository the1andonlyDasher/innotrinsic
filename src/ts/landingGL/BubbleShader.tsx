import React, { useRef, useMemo, FC, forwardRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { TextureLoader, ShaderMaterial } from "three";
import * as THREE from "three";
import { size } from "../utils";
import { lerp } from "three/src/math/MathUtils.js";

interface BubbleShaderProps {
    textureUrl: string;
    count: number;
    clicked: boolean;
    inactive: boolean;
    focused: boolean;
}

const BubbleShader: FC<BubbleShaderProps> = ({
    textureUrl,
    clicked,
    focused,
    inactive,
}) => {
    const shaderRef = useRef<THREE.ShaderMaterial>(null);


    const imageTexture = useMemo(() => new TextureLoader().load(textureUrl), [textureUrl]);
    const cloudTexture = useMemo(() => new TextureLoader().load("/images/clouds.webp"), []);
    const maskTexture = useMemo(() => new TextureLoader().load("/images/clouds_mask.webp"), []);



    const uniforms = useMemo(() => ({
        uImage: { value: imageTexture },
        uActive: { value: 0.0 },
        uFocused: { value: 0.0 },
        uInactive: { value: 0.0 },
        uMask: { value: maskTexture },
        uCloud: { value: cloudTexture },
        uTime: { value: 0 },
        uBeigeColor: { value: new THREE.Color(0xf5f5dc) },
    }), [imageTexture, maskTexture, cloudTexture]);

    useFrame((state) => {
        if (shaderRef.current) {
            const targetOpacity = clicked ? 1.0 : 0.0;
            const lerpFactor = clicked ? 0.0125 : 0.0475;
            const lerpFactor2 = focused ? 0.0475 : 0.0125;
            uniforms.uInactive.value = lerp(uniforms.uInactive.value, inactive ? 0.0 : 1.0, lerpFactor);
            uniforms.uFocused.value = lerp(uniforms.uFocused.value, focused ? 0.0 : 1.0, lerpFactor2);
            uniforms.uActive.value = lerp(uniforms.uActive.value, targetOpacity, lerpFactor);
            uniforms.uTime.value = state.clock.getElapsedTime();
            shaderRef.current.needsUpdate = true;
        }
    });

    return (
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
                uniform sampler2D uImage;
                uniform sampler2D uMask;
                uniform float uTime;
                uniform float uActive;
                uniform float uInactive;
                uniform float uFocused;
                uniform vec3 uBeigeColor;
                varying vec2 vUv;

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

                    float noiseValue = snoise(uv * 5.0 + uTime * 0.05) * 0.2;
                    vec2 distortedUV = uv + vec2(noiseValue, noiseValue);
                    distortedUV = clamp(distortedUV, 0.0, 1.0);

                    float maskOpacity = texture2D(uMask, distortedUV).r;

                    float distortedCloudOpacity = 1.0 + 6.0 * snoise(uv * 10.0 + uTime * 0.05) * 0.2;
                    float cloudOpacity = 2.0 + 1.0 * snoise(uv * 2.0 + uTime * 0.05);
                    float mixedOpacity = cloudOpacity * distortedCloudOpacity + 2.5;

                    float delayFactor = 6.0 - mixedOpacity * 0.01;
                    float regionNoise = snoise(uv * 3.0);
                    float regionThreshold = 0.25;
                    float regionID = step(regionThreshold, regionNoise);
                    float regionDelay = mix(3.0, 12.0, regionNoise);
                    float adjustedActive = uActive * mix(regionDelay, 8.0 - pow(abs(delayFactor), 2.0), regionID);

                    float combinedOpacity = maskOpacity * cloudOpacity * distortedCloudOpacity * adjustedActive * uFocused;
                    float combinedOpacity2 = cloudOpacity * (1.0 - adjustedActive) * uInactive;

                    vec4 color = texture2D(uImage, uv);
                    vec4 imgColor = vec4(color.rgb, color.a * combinedOpacity);

                    vec4 beigeColor = vec4(uBeigeColor, combinedOpacity2);
                    vec4 finalColor = mix(beigeColor, imgColor, uActive);

                    gl_FragColor = vec4(finalColor.rgb, finalColor.a);
                }
            `}
            uniforms={uniforms}
            transparent={true}
            alphaTest={0}
            attach="material"
        />
    );
};

const BShader = forwardRef<THREE.ShaderMaterial, BubbleShaderProps>((props, ref) => (
    <BubbleShader {...props} />
));
BShader.displayName = "BubbleShader";

export default BShader;
