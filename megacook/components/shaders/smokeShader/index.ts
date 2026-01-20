export const vertexShader = `
  uniform float uTime;
  varying vec2 vUv;

  // Fonction rotate2D
  vec2 rotate2D(vec2 value, float angle) {
    float s = sin(angle);
    float c = cos(angle);
    mat2 m = mat2(c, s, -s, c);
    return m * value;
  }

  // Bruit simple pour le twist
  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
  }

  float smoothNoise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    
    float n00 = hash(i + vec2(0.0, 0.0));
    float n10 = hash(i + vec2(1.0, 0.0));
    float n01 = hash(i + vec2(0.0, 1.0));
    float n11 = hash(i + vec2(1.0, 1.0));
    
    float n0 = mix(n00, n10, f.x);
    float n1 = mix(n01, n11, f.x);
    return mix(n0, n1, f.y);
  }

  void main() {
    vec3 newPosition = position;

    // Twist - rotation légère basée sur le bruit
    float twistPerlin = smoothNoise(vec2(0.5, uv.y * 0.2 - uTime * 0.005));
    float angle = twistPerlin * 2.0;  // Réduit de 10.0 à 2.0
    newPosition.xz = rotate2D(newPosition.xz, angle);

    // Wind - décalage léger basé sur le bruit
    vec2 windOffset = vec2(
      smoothNoise(vec2(0.25, uTime * 0.01)) - 0.5,
      smoothNoise(vec2(0.75, uTime * 0.01)) - 0.5
    );
    windOffset *= pow(uv.y, 3.0) * 2.0;  // Réduit de 10.0 à 2.0
    newPosition.xz += windOffset;

    // Position finale
    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);

    // Varyings
    vUv = uv;
  }
`;

export const fragmentShader = `
  uniform float uTime;
  uniform float uIsDark;
  varying vec2 vUv;

  // Fonction de bruit simple (hash-based)
  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
  }

  // Interpolation lisse
  float smoothNoise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f); // Smoothstep
    
    float n00 = hash(i + vec2(0.0, 0.0));
    float n10 = hash(i + vec2(1.0, 0.0));
    float n01 = hash(i + vec2(0.0, 1.0));
    float n11 = hash(i + vec2(1.0, 1.0));
    
    float n0 = mix(n00, n10, f.x);
    float n1 = mix(n01, n11, f.x);
    return mix(n0, n1, f.y);
  }

  // Perlin noise avec plusieurs octaves
  float perlinNoise(vec2 p) {
    float value = 0.0;
    float amplitude = 1.0;
    float frequency = 1.0;
    float maxValue = 0.0;
    
    for (int i = 0; i < 4; i++) {
      value += amplitude * smoothNoise(p * frequency);
      maxValue += amplitude;
      amplitude *= 0.5;
      frequency *= 2.0;
    }
    
    return value / maxValue;
  }

  void main() {
    // Génère du bruit Perlin animé
    vec2 noiseCoord = vUv * 3.0;
    noiseCoord.y -= uTime * 0.5; // Animation verticale
    
    float noise = perlinNoise(noiseCoord);
    
    // Remap et edge fade
    float smoke = smoothstep(0.4, 1.0, noise);
    
    // Fade sur les bords
    smoke *= smoothstep(0.0, 0.1, vUv.x);
    smoke *= smoothstep(1.0, 0.9, vUv.x);
    smoke *= smoothstep(0.0, 0.3, vUv.y);  // Fade bas plus smooth
    smoke *= smoothstep(1.0, 0.2, vUv.y);  // Fade haut plus smooth
    
    // Couleur - blanc (1.0) ou noir (0.0) selon uIsDark
    vec3 smokeColor = vec3(1.0 - uIsDark);
    
    gl_FragColor = vec4(smokeColor, smoke);
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
  }
`;


