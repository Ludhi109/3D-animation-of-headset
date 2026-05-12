import { useGLTF, Float, Points, PointMaterial } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef, useEffect, useState, Suspense, useMemo } from "react";
import * as THREE from "three";

// Using a stable pmndrs market URL
const MODEL_URL = "https://vazxmixjsiawhamofvsi.supabase.co/storage/v1/object/public/models/headphone/model.gltf";

const Model = ({ mouse, explosionFactor, color }) => {
  const [modelError, setModelError] = useState(false);
  let gltf;

  try {
    gltf = useGLTF(MODEL_URL);
  } catch (e) {
    console.error("GLTF Loading Error:", e);
    return <Fallback />;
  }

  const { scene } = gltf;
  const modelRef = useRef();

  useEffect(() => {
    if (!scene) return;
    scene.traverse((child) => {
      if (child.isMesh) {
        child.material = child.material.clone();
        child.castShadow = true;
        child.receiveShadow = true;
        
        // Enhance material for cinematic look
        child.material.roughness = 0.2;
        child.material.metalness = 0.8;
      }
    });
  }, [scene]);

  useFrame((state) => {
    if (modelRef.current) {
      const targetX = mouse.current[1] * 0.15;
      const targetY = mouse.current[0] * 0.15;
      modelRef.current.rotation.x = THREE.MathUtils.lerp(modelRef.current.rotation.x, targetX, 0.05);
      modelRef.current.rotation.y = THREE.MathUtils.lerp(modelRef.current.rotation.y, targetY, 0.05);
      
      // Gentle floating animation
      modelRef.current.position.y = -0.5 + Math.sin(state.clock.elapsedTime * 0.5) * 0.1;

      modelRef.current.traverse((child) => {
        if (child.isMesh && child.userData.originalPos) {
          const offset = child.userData.direction.clone().multiplyScalar(explosionFactor * 2.5);
          child.position.copy(child.userData.originalPos).add(offset);
          
          // Rotate components during explosion for more drama
          child.rotation.x = (child.userData.originalRot?.x || 0) + explosionFactor * 2;
          child.rotation.z = (child.userData.originalRot?.z || 0) + explosionFactor * 1.5;
        }
      });
    }
  });

  useEffect(() => {
    if (!scene) return;
    scene.traverse((child) => {
      if (child.isMesh) {
        if (!child.userData.originalPos) {
          child.userData.originalPos = child.position.clone();
          child.userData.originalRot = child.rotation.clone();
          child.userData.direction = new THREE.Vector3(
            (Math.random() - 0.5) * 4,
            (Math.random() - 0.5) * 4,
            (Math.random() - 0.5) * 4
          ).normalize();
        }
        
        if (child.name.toLowerCase().includes("body") || child.name.toLowerCase().includes("frame")) {
          child.material.color.set(color);
        }
      }
    });
  }, [scene, color]);

  return <primitive object={scene} ref={modelRef} scale={18} position={[0, -0.5, 0]} />;
};

const Particles = ({ count = 2000 }) => {
  const points = useMemo(() => {
    const p = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      p[i * 3] = (Math.random() - 0.5) * 15;
      p[i * 3 + 1] = (Math.random() - 0.5) * 15;
      p[i * 3 + 2] = (Math.random() - 0.5) * 15;
    }
    return p;
  }, [count]);

  const pointsRef = useRef();

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.05;
      pointsRef.current.rotation.x = state.clock.elapsedTime * 0.02;
    }
  });

  return (
    <Points ref={pointsRef} positions={points} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#00f2ff"
        size={0.02}
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
        ring.rotation.z = state.clock.elapsedTime * (0.1 + i * 0.05);
        ring.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 0.5 + i) * 0.02);
      });
    }
  });

  return (
    <group ref={ringsRef}>
      {[...Array(5)].map((_, i) => (
        <mesh key={i} rotation={[Math.PI / 2, 0, 0]} position={[0, 0, -1]}>
          <torusGeometry args={[2.5 + i * 0.8, 0.008, 16, 100]} />
          <meshBasicMaterial 
            color="#00f2ff" 
            transparent 
            opacity={0.2 - i * 0.03} 
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      ))}
    </group>
  );
};

const Fallback = () => (
  <group scale={1.5}>
    <mesh position={[0, 0, 0]}>
      <torusGeometry args={[1, 0.08, 16, 100, Math.PI]} />
      <meshStandardMaterial color="#00f2ff" emissive="#00f2ff" emissiveIntensity={5} />
    </mesh>
    <mesh position={[1, -0.6, 0]}>
      <cylinderGeometry args={[0.5, 0.5, 0.3, 32]} />
      <meshStandardMaterial color="#111" metalness={0.8} roughness={0.2} />
    </mesh>
    <mesh position={[-1, -0.6, 0]}>
      <cylinderGeometry args={[0.5, 0.5, 0.3, 32]} />
      <meshStandardMaterial color="#111" metalness={0.8} roughness={0.2} />
    </mesh>
    {/* Inner glow */}
    <mesh position={[1, -0.6, 0.1]} scale={0.8}>
      <circleGeometry args={[0.4, 32]} />
      <meshBasicMaterial color="#00f2ff" />
    </mesh>
    <mesh position={[-1, -0.6, 0.1]} scale={0.8}>
      <circleGeometry args={[0.4, 32]} />
      <meshBasicMaterial color="#00f2ff" />
    </mesh>
  </group>
);

export const Headset3D = ({ mouse, explosionFactor = 0, color = "#222222" }) => {
  return (
    <group>
      <NeonRings />
      <Particles />

      <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.2}>
        <Suspense fallback={<Fallback />}>
          <Model mouse={mouse} explosionFactor={explosionFactor} color={color} />
        </Suspense>
      </Float>
      
      {/* Cinematic Lighting */}
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={2} color="#00f2ff" castShadow />
      <spotLight position={[-10, 5, 5]} angle={0.2} penumbra={1} intensity={1} color="#ffffff" />
      <pointLight position={[0, 0, 5]} intensity={0.5} color="#00f2ff" />
      <rectAreaLight width={10} height={10} position={[0, 0, -5]} intensity={2} color="#00f2ff" />
    </group>
  );
};

