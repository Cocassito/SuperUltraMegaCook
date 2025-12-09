import React, { useEffect, useRef } from "react";
import { useLoader } from "@react-three/fiber";
import { GLTFLoader, DRACOLoader } from "three-stdlib";
import { GLTF } from "three-stdlib";

export default function Model({
  src,
  scale = 1,
}: {
  src: string;
  scale?: number;
}) {
  const dracoRef = useRef<DRACOLoader | null>(null);

  const gltf = useLoader(
    GLTFLoader,
    src,
    // configure loader: attach a DRACOLoader so compressed glTFs can be decoded
    (loader) => {
      const dracoLoader = new DRACOLoader();
      // use the official Google CDN decoders; change path if you host them locally
      dracoLoader.setDecoderPath(
        "https://www.gstatic.com/draco/versioned/decoders/1.4.1/"
      );
      loader.setDRACOLoader(dracoLoader as any);
      dracoRef.current = dracoLoader;
    }
  ) as GLTF;

  useEffect(() => {
    return () => {
      if (dracoRef.current) {
        dracoRef.current.dispose();
        dracoRef.current = null;
      }
    };
  }, []);

  return <primitive object={gltf.scene} scale={scale} />;
}
