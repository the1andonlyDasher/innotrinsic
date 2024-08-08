import * as THREE from 'three';

class SimulationMaterial extends THREE.ShaderMaterial {
    constructor(size: number | undefined) {
        super({
            uniforms: {
                uTime: { value: 0 },
                uResolution: { value: new THREE.Vector2(size, size) },
                uPositions: { value: null }, // The texture with initial positions
            },
            vertexShader: `
        uniform sampler2D uPositions;
        uniform float uTime;
        varying vec2 vUv;

        void main() {
          vUv = uv;
          vec4 pos = texture2D(uPositions, uv);
          vec3 newPos = pos.xyz + vec3(sin(uTime) * 0.1, cos(uTime) * 0.1, sin(uTime) * 0.1);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(newPos, 1.0);
          gl_PointSize = 1.0;
        }
      `,
            fragmentShader: `
        void main() {
          gl_FragColor = vec4(1.0);
        }
      `,
            depthWrite: false,
            transparent: true,
        });
    }
}

export default SimulationMaterial;
