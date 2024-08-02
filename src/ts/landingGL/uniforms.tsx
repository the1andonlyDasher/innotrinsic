// src/shaders/uniforms.ts
import { Color, Texture } from 'three';

export const createUniforms = (textures: { [key: string]: Texture }) => ({
    uImage: { value: textures.image },
    uActive: { value: 0.0 },
    uFocused: { value: 0.0 },
    uInactive: { value: 0.0 },
    uMask: { value: textures.mask },
    uCloud: { value: textures.cloud },
    uTime: { value: 0 },
    uBeigeColor: { value: new Color(0xf5f5dc) },
});
