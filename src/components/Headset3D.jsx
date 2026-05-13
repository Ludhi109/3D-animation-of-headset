import { useGLTF, Float, Points, PointMaterial } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef, useEffect, useState, Suspense, useMemo } from "react";
import * as THREE from "three";

const MODEL_URL = "https://raw.githubusercontent.com/antony-monu/react-three-fiber-headphones/main/public/models/headphones.glb";

const Model = ({ mouse, explosionFactor, color, hologram }) => {
  const { scene } = useGLTF(MODEL_URL);
  const modelRef = useRef();

  useEffect(() => {
    if (!scene) return;
    scene.traverse((child) => {
      if (child.isMesh) {
        child.material = child.material.clone();
        child.castShadow = !hologram;
        child.receiveShadow = !hologram;
        
        if (hologram) {
          // Holographic / Wireframe Style
          child.material.wireframe = true;
          child.material.transparent = true;
          child.material.opacity = 0.15;
          child.material.color.set("#00f2ff");
          child.material.emissive = new THREE.Color("#00f2ff");
          child.material.emissiveIntensity = 0.5;
        } else {
          // Premium Matte Black Finish
          child.material.roughness = 0.6;
          child.material.metalness = 0.2;
          child.material.color.set(color);
        }
      }
    });
  }, [scene, color, hologram]);

  useFrame((state) => {
    if (modelRef.current) {
      const targetX = mouse.current[1] * 0.2;
      const targetY = mouse.current[0] * 0.2;
      modelRef.current.rotation.x = THREE.MathUtils.lerp(modelRef.current.rotation.x, targetX, 0.05);
      modelRef.current.rotation.y = THREE.MathUtils.lerp(modelRef.current.rotation.y, targetY, 0.05);
      
      // Floating Motion
      modelRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.3;
      
      // Rotate slowly if hologram
      if (hologram) {
        modelRef.current.rotation.y += 0.002;
      }
    }
  });

  return <primitive object={scene} ref={modelRef} scale={25} position={[0, -0.5, 0]} />;
};

const AtmosphericEffects = () => {
  const pointsRef = useRef();
  const positions = useMemo(() => {
    const p = new Float32Array(1500 * 3);
    for (let i = 0; i < 1500; i++) {
      p[i * 3] = (Math.random() - 0.5) * 25;
      p[i * 3 + 1] = (Math.random() - 0.5) * 25;
      p[i * 3 + 2] = (Math.random() - 0.5) * 25;
    }
    return p;
  }, []);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.01;
    }
  });

  return (
    <Points ref={pointsRef} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#00f2ff"
        size={0.015}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
};

const NeonRings = ({ color }) => {
  const ringsRef = useRef();
  useFrame((state) => {
    if (ringsRef.current) {
      ringsRef.current.children.forEach((ring, i) => {
        ring.rotation.z = state.clock.elapsedTime * (0.05 + i * 0.02);
        ring.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 0.5 + i) * 0.05);
      });
    }
  });

  return (
    <group ref={ringsRef}>
      {[...Array(3)].map((_, i) => (
        <mesh key={i} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[3.5 + i * 1.5, 0.005, 16, 100]} />
          <meshBasicMaterial 
            color={color} 
            transparent 
            opacity={0.1 - i * 0.02} 
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      ))}
    </group>
  );
};

export const Headset3D = ({ mouse, explosionFactor = 0, color = "#00f2ff", hologram = false }) => {
  return (
    <group>
      <AtmosphericEffects />
      <NeonRings color={color} />
      
      <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.2}>
        <Suspense fallback={null}>
          <Model mouse={mouse} explosionFactor={explosionFactor} color={color} hologram={hologram} />
        </Suspense>
      </Float>
      
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} color={color} />
      <spotLight position={[-10, 10, 10]} intensity={0.5} color="#ffffff" />
    </group>
  );
};
