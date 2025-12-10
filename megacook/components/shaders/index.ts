export const vertexShader = `
  varying vec2 vUv;

  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

export const fragmentShader = `
  varying vec2 vUv;
  uniform float time;

  void main() {
    // Animated pink color - pulsating effect
    float pulse = sin(time * 2.0) * 0.1 + 0.9;
    vec3 color = vec3(1.0, 0.75 * pulse, 0.9 * pulse);
    
    // Animated alpha - breathing effect on edges
    float breathe = sin(time * 1.5) * 0.05;
    
    float alpha = 1.0;
    alpha *= smoothstep(0.0, 0.15 + breathe, vUv.x);      // Côté Gauche
    alpha *= smoothstep(1.0, 0.85 - breathe, vUv.x);      // Côté Droit
    alpha *= smoothstep(0.0, 0.15 + breathe, vUv.y);      // Côté Bas
    alpha *= smoothstep(1.0, 0.85 - breathe, vUv.y);      // Côté Haut
    
    gl_FragColor = vec4(color, alpha);
  }
`;
