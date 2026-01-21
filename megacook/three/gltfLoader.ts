import { GLTFLoader, DRACOLoader } from "three-stdlib";

const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath(
  "https://www.gstatic.com/draco/versioned/decoders/1.4.1/",
);

export function configureGLTFLoader(loader: GLTFLoader) {
  loader.setDRACOLoader(dracoLoader as any);
}
