export const vertex = `
varying vec2 vUv;

void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`

export const fragment = `
uniform float u_time;
uniform vec3 u_colors[8]; // Farben-Array für bunte Flecke

varying vec2 vUv;

float random(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f*f*(3.0-2.0*f);
  return mix(mix(random(i + vec2(0.0, 0.0)), random(i + vec2(1.0, 0.0)), u.x),
             mix(random(i + vec2(0.0, 1.0)), random(i + vec2(1.0, 1.0)), u.x),
             u.y);
}

void main() {
  vec2 st = vUv * 1.0 * sin(u_time * 0.5); // uv vergrößern/verkleinern für mehr Flekce
  vec2 pos = vec2(st.x, st.y + u_time * 0.1); // Moving pattern with time

  float n = noise(pos);

  // Farbe wird auf noise Funktion basierend ausgewählt
  vec3 color = mix(u_colors[0], u_colors[1], smoothstep(0.3, 0.5, n));
  color = mix(color, u_colors[2], smoothstep(0.5, 0.7, n));
  color = mix(color, u_colors[3], smoothstep(0.7, 1.0, n));

  gl_FragColor = vec4(color, 1.0);
}
`