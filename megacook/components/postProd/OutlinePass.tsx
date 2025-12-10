import { useThree, useFrame } from "@react-three/fiber";
import { useRef, useEffect } from "react";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { OutlinePass } from "three/examples/jsm/postprocessing/OutlinePass.js";
import { OutputPass } from "three/examples/jsm/postprocessing/OutputPass.js";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass.js";
import { FXAAShader } from "three/examples/jsm/shaders/FXAAShader.js";
import * as THREE from "three";

type OutlinePassProps = {
  selectedObjects?: THREE.Object3D[];
  edgeStrength?: number;
  edgeGlow?: number;
  edgeThickness?: number;
  pulsePeriod?: number;
  visibleEdgeColor?: string;
  hiddenEdgeColor?: string;
  usePatternTexture?: boolean;
};

export default function OutlinePassEffect({
  selectedObjects = [],
  edgeStrength = 3.0,
  edgeGlow = 0.0,
  edgeThickness = 1.0,
  pulsePeriod = 0,
  visibleEdgeColor = "#ffffff",
  hiddenEdgeColor = "#190a05",
  usePatternTexture = false,
}: OutlinePassProps) {
  const { gl, scene, camera, size } = useThree();
  const composerRef = useRef<EffectComposer | null>(null);
  const outlinePassRef = useRef<OutlinePass | null>(null);

  useEffect(() => {
    const composer = new EffectComposer(gl);

    // Render pass
    const renderPass = new RenderPass(scene, camera);
    composer.addPass(renderPass);

    // Outline pass
    const outlinePass = new OutlinePass(
      new THREE.Vector2(size.width, size.height),
      scene,
      camera
    );
    outlinePass.edgeStrength = edgeStrength;
    outlinePass.edgeGlow = edgeGlow;
    outlinePass.edgeThickness = edgeThickness;
    outlinePass.pulsePeriod = pulsePeriod;
    outlinePass.visibleEdgeColor.set(visibleEdgeColor);
    outlinePass.hiddenEdgeColor.set(hiddenEdgeColor);
    outlinePass.usePatternTexture = usePatternTexture;

    composer.addPass(outlinePass);
    outlinePassRef.current = outlinePass;

    // Output pass
    const outputPass = new OutputPass();
    composer.addPass(outputPass);

    // FXAA antialiasing pass
    const effectFXAA = new ShaderPass(FXAAShader);
    effectFXAA.uniforms["resolution"].value.set(
      1 / size.width,
      1 / size.height
    );
    composer.addPass(effectFXAA);

    composer.setSize(size.width, size.height);
    composerRef.current = composer;

    return () => {
      if (composer && (composer as any).dispose) (composer as any).dispose();
    };
  }, [gl, scene, camera, size.width, size.height]);

  // Update outline pass parameters
  useEffect(() => {
    if (outlinePassRef.current) {
      outlinePassRef.current.edgeStrength = edgeStrength;
      outlinePassRef.current.edgeGlow = edgeGlow;
      outlinePassRef.current.edgeThickness = edgeThickness;
      outlinePassRef.current.pulsePeriod = pulsePeriod;
      outlinePassRef.current.visibleEdgeColor.set(visibleEdgeColor);
      outlinePassRef.current.hiddenEdgeColor.set(hiddenEdgeColor);
      outlinePassRef.current.usePatternTexture = usePatternTexture;
    }
  }, [
    edgeStrength,
    edgeGlow,
    edgeThickness,
    pulsePeriod,
    visibleEdgeColor,
    hiddenEdgeColor,
    usePatternTexture,
  ]);

  // Update selected objects
  useEffect(() => {
    if (outlinePassRef.current) {
      outlinePassRef.current.selectedObjects = selectedObjects;
    }
  }, [selectedObjects]);

  // Handle resize
  useEffect(() => {
    if (composerRef.current) {
      composerRef.current.setSize(size.width, size.height);
    }
  }, [size]);

  useFrame(() => {
    if (composerRef.current) composerRef.current.render();
  }, 1);

  return null;
}
