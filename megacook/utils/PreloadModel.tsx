import { GLTFLoader, DRACOLoader } from "three-stdlib";
import { useLoader } from "@react-three/fiber";

export const preloadModel = (src: string) => {
  useLoader.preload(GLTFLoader, src, (loader) => {
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath(
      "https://www.gstatic.com/draco/versioned/decoders/1.4.1/"
    );
    loader.setDRACOLoader(dracoLoader as any);
  });
};
