import { CameraControls as DreiCameraControls } from "../components/lib/drei";
import { Vector3, Mesh } from "three";
import { forwardRef, useRef, useEffect, useState } from "react";

interface CameraControlsProps {
  assetsLoaded?: boolean;
}

export const useCameraControls = (assetsLoaded: boolean) => {
  const controlsRef = useRef<any | null>(null);
  const meshFitCamera1 = useRef<Mesh | null>(null);
  const meshFitCamera2 = useRef<Mesh | null>(null);
  const meshFitCamera3 = useRef<Mesh | null>(null);
  const meshFitCamera4 = useRef<Mesh | null>(null);
  const meshFitCamera5 = useRef<Mesh | null>(null);
  const [currentViewIndex, setCurrentViewIndex] = useState(0);

  const fitCamera = (index: number) => {
    if (!controlsRef.current) return;
    controlsRef.current.smoothTime = 0.8;
    const meshRefs = [meshFitCamera1, meshFitCamera2, meshFitCamera3, meshFitCamera4, meshFitCamera5];
    if (meshRefs[index]?.current) {
      controlsRef.current.fitToBox(meshRefs[index].current, true);
    }
  };

  const nextView = () => {
    const nextIndex = (currentViewIndex + 1) % 5;
    setCurrentViewIndex(nextIndex);
    fitCamera(nextIndex);
  };

  const prevView = () => {
    const prevIndex = (currentViewIndex - 1 + 5) % 5;
    setCurrentViewIndex(prevIndex);
    fitCamera(prevIndex);
  };

  useEffect(() => {
    if (controlsRef.current && assetsLoaded) {
      fitCamera(0);
    }
  }, [assetsLoaded]);

  return {
    controlsRef,
    meshFitCamera1,
    meshFitCamera2,
    meshFitCamera3,
    meshFitCamera4,
    meshFitCamera5,
    nextView,
    prevView,
  };
};
