import { GLTFLoader, DRACOLoader } from "three-stdlib";

// Singleton DRACOLoader pour optimiser les performances
let dracoLoader: DRACOLoader | null = null;

function getDRACOLoader(): DRACOLoader {
  if (!dracoLoader) {
    dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath(
      "https://www.gstatic.com/draco/versioned/decoders/1.4.1/",
    );
  }
  return dracoLoader;
}

export function configureGLTFLoader(loader: GLTFLoader) {
  loader.setDRACOLoader(getDRACOLoader() as any);
}
