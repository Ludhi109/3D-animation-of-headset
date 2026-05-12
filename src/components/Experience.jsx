import { Canvas } from "@react-three/fiber";
import { Environment, Stars, Float } from "@react-three/drei";
import { EffectComposer, Bloom, Noise, Vignette } from "@react-three/postprocessing";
import { Headset3D } from "./Headset3D";
import { Suspense, useRef, useEffect } from "react";

export const Experience = ({ explosionFactor = 0, color = "#050505" }) => {
  const mouse = useRef([0, 0]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouse.current = [
        (e.clientX / window.innerWidth) * 2 - 1,
        -(e.clientY / window.innerHeight) * 2 + 1,
      ];
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <Canvas shadows camera={{ position: [0, 0, 8], fov: 45 }} dpr={[1, 2]}>
        <Suspense fallback={null}>
          <color attach="background" args={["#050505"]} />
          <fog attach="fog" args={["#050505", 5, 20]} />
          
          <Stars radius={100} depth={50} count={7000} factor={4} saturation={0} fade speed={1.5} />
          
          <Headset3D mouse={mouse} explosionFactor={explosionFactor} color={color} />
          
          <Environment preset="night" />
          
          <EffectComposer multisampling={4}>
            <Bloom 
              intensity={1.5} 
              luminanceThreshold={0.2} 
              luminanceSmoothing={0.9} 
              mipmapBlur
            />
            <Noise opacity={0.05} />
            <Vignette eskil={false} offset={0.1} darkness={1.1} />
          </EffectComposer>
        </Suspense>
      </Canvas>
    </div>
  );
};



