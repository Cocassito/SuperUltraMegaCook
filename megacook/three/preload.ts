import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three-stdlib";
import { configureGLTFLoader } from "./gltfLoader";

import scene from "@/assets/models/environment/scene.glb";
import sitdown from "@/assets/models/character/sitdown.glb";
import customer from "@/assets/models/character/customer.glb";
import walking from "@/assets/models/character/walking.glb";
import dance1 from "@/assets/models/character/dance1.glb";
import dance2 from "@/assets/models/character/dance2.glb";
import dance3 from "@/assets/models/character/dance3.glb";

useLoader.preload(GLTFLoader, scene, configureGLTFLoader);
useLoader.preload(GLTFLoader, sitdown, configureGLTFLoader);
useLoader.preload(GLTFLoader, customer, configureGLTFLoader);
useLoader.preload(GLTFLoader, walking, configureGLTFLoader);
useLoader.preload(GLTFLoader, dance1, configureGLTFLoader);
useLoader.preload(GLTFLoader, dance2, configureGLTFLoader);
useLoader.preload(GLTFLoader, dance3, configureGLTFLoader);
