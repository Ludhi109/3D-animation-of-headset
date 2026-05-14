import { useGLTF } from "@react-three/drei";
import { useEffect } from "react";

const MODEL_URL = "https://raw.githubusercontent.com/antony-monu/react-three-fiber-headphones/main/public/models/headphones.glb";

export const ModelInspector = () => {
  const { scene } = useGLTF(MODEL_URL);

  useEffect(() => {
    if (scene) {
      console.log("Model Structure:");
      scene.traverse((child) => {
        if (child.isMesh) {
          console.log(`Mesh Name: ${child.name}`);
        }
      });
    }
  }, [scene]);

  return null;
};
