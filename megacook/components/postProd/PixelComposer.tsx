import { useThree, useFrame } from "@react-three/fiber";
import { useRef, useEffect } from "react";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPixelatedPass } from "three/addons/postprocessing/RenderPixelatedPass.js";

export default function PixelatedPass({
  pixelSize = 6,
}: {
  pixelSize?: number;
}) {
  const { gl, scene, camera, size } = useThree();
  const composerRef = useRef<any>(null);

  useEffect(() => {
    const composer = new EffectComposer(gl);
    const pass = new RenderPixelatedPass(pixelSize, scene, camera);
    
    // Désactive le normalEdgeStrength pour éviter les bordures blanches
    (pass as any).normalEdgeStrength = 0;
    (pass as any).depthEdgeStrength = 0;
    
    composer.addPass(pass);
    composer.setSize(size.width, size.height);
    composerRef.current = composer;

    return () => {
      if (composer && (composer as any).dispose) (composer as any).dispose();
    };
  }, [gl, scene, camera, pixelSize]);

  useEffect(() => {
    if (composerRef.current)
      composerRef.current.setSize(size.width, size.height);
  }, [size]);

  useFrame(() => {
    if (composerRef.current) composerRef.current.render();
  }, 1);

  return null;
}
