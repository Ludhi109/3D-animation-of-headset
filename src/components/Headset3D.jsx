import { useGLTF, Float, Points, PointMaterial } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef, useEffect, useState, Suspense, useMemo } from "react";
import * as THREE from "three";

const MODEL_URL = "https://raw.githubusercontent.com/antony-monu/react-three-fiber-headphones/main/public/models/headphones.glb";

const Model = ({ mouse, explosionFactor, color, neonGlow }) => {
  const { scene } = useGLTF(MODEL_URL);
  const modelRef = useRef();

  useEffect(() => {
    if (!scene) return;
    scene.traverse((child) => {
      if (child.isMesh) {
        child.material = child.material.clone();
        child.castShadow = true;
        child.receiveShadow = true;
        
        // Premium Matte Black Finish
        child.material.roughness = 0.6;
        child.material.metalness = 0.2;
        
        // Apply Base Color
        if (child.material && !child.name.toLowerCase().includes("logo") && !child.name.toLowerCase().includes("cable")) {
          child.material.color.set(color);
          
          // Apply Neon Blue Edge Glow if requested
          if (neonGlow) {
            child.material.emissive = new THREE.Color("#00f2ff");
            child.material.emissiveIntensity = 0.3;
          }
        }
      }
    });
  }, [scene, color, neonGlow]);

  useFrame((state) => {
    if (modelRef.current) {
      // Smooth Mouse Interaction
      const targetX = mouse.current[1] * 0.3;
      const targetY = mouse.current[0] * 0.3;
      modelRef.current.rotation.x = THREE.MathUtils.lerp(modelRef.current.rotation.x, targetX, 0.05);
      modelRef.current.rotation.y = THREE.MathUtils.lerp(modelRef.current.rotation.y, targetY, 0.05);
      
      // Anti-Gravity Floating Motion
      modelRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.2;
      
      // Explosion logic for other sections
      if (explosionFactor > 0) {
        modelRef.current.traverse((child) => {
          if (child.isMesh && child.userData.originalPos) {
            const offset = child.userData.direction.clone().multiplyScalar(explosionFactor * 3);
            child.position.copy(child.userData.originalPos).add(offset);
          }
        });
      }
    }
  });

  useEffect(() => {
    if (!scene) return;
    scene.traverse((child) => {
      if (child.isMesh && !child.userData.originalPos) {
        child.userData.originalPos = child.position.clone();
        child.userData.direction = new THREE.Vector3(
          (Math.random() - 0.5) * 2,
          (Math.random() - 0.5) * 2,
          (Math.random() - 0.5) * 2
        ).normalize();
      }
    });
  }, [scene]);

  return <primitive object={scene} ref={modelRef} scale={22} position={[0, 0, 0]} />;
};

const AtmosphericEffects = () => {
  const pointsRef = useRef();
  
  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.02;
    }
  });

  const positions = useMemo(() => {
    const p = new Float32Array(1000 * 3);
    for (let i = 0; i < 1000; i++) {
      p[i * 3] = (Math.random() - 0.5) * 20;
      p[i * 3 + 1] = (Math.random() - 0.5) * 20;
      p[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    return p;
  }, []);

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

const NeonRings = () => {
  const ringsRef = useRef();
  useFrame((state) => {
    if (ringsRef.current) {
      ringsRef.current.children.forEach((ring, i) => {
        ring.rotation.z = state.clock.elapsedTime * (0.05 + i * 0.02);
        ring.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 0.5 + i) * 0.03);
      });
    }
  });

  return (
    <group ref={ringsRef}>
      {[...Array(4)].map((_, i) => (
        <mesh key={i} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[3 + i * 1.2, 0.005, 16, 100]} />
          <meshBasicMaterial 
            color="#00f2ff" 
            transparent 
            opacity={0.15 - i * 0.03} 
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      ))}
    </group>
  );
};

export const Headset3D = ({ mouse, explosionFactor = 0, color = "#0a0a0a", neonGlow = false }) => {
  return (
    <group>
      <AtmosphericEffects />
      <NeonRings />
      
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
        <Suspense fallback={null}>
          <Model mouse={mouse} explosionFactor={explosionFactor} color={color} neonGlow={neonGlow} />
        </Suspense>
      </Float>
      
      {/* Cinematic Lighting Suite */}
      <ambientLight intensity={0.2} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={5} color="#00f2ff" castShadow />
      <spotLight position={[-10, 5, 5]} angle={0.2} penumbra={1} intensity={2} color="#ffffff" />
      <pointLight position={[0, 0, 5]} intensity={1} color="#00f2ff" />
      <rectAreaLight width={10} height={10} position={[0, 0, -5]} intensity={3} color="#00f2ff" />
    </group>
  );
};
