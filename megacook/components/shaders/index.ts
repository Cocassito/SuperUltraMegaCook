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
    // Rose foncé et rose clair
    vec3 roseDark = vec3(1.0, 1.0, 1.0);      // Rose foncé
    
    // Alpha avec smoothstep sur les bords
    float alpha = 1.0;
    alpha *= smoothstep(0.0, 0.05, vUv.x);      // Côté Gauche
    alpha *= smoothstep(1.0, 0.95, vUv.x);      // Côté Droit
    alpha *= smoothstep(0.0, 0.05, vUv.y);      // Côté Bas
    alpha *= smoothstep(1.0, 0.95, vUv.y);      // Côté Haut
    
    // Anime l'opacité - apparaît et disparaît
    float opacity = 0.5 + 0.5 * sin(time * 3.5);
    alpha *= opacity;
    
    gl_FragColor = vec4(roseDark, alpha);
  }
`;
