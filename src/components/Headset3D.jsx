import { Float, Points, PointMaterial, ContactShadows, PerspectiveCamera, MeshDistortMaterial } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef, useMemo } from "react";
import * as THREE from "three";

const PremiumMaterial = ({ color, emissiveIntensity = 0.5, roughness = 0.1, metalness = 0.9 }) => (
  <meshPhysicalMaterial
    color={color}
    metalness={metalness}
    roughness={roughness}
    clearcoat={1}
    clearcoatRoughness={0.1}
    reflectivity={1}
    emissive={color}
    emissiveIntensity={emissiveIntensity}
    envMapIntensity={2}
  />
);

const SoundWaveRings = ({ color, count = 3 }) => {
  const ringsRef = useRef([]);

  useFrame((state) => {
    ringsRef.current.forEach((ring, i) => {
      if (ring) {
        const speed = 0.5;
        const offset = i * (1 / count);
        const progress = (state.clock.elapsedTime * speed + offset) % 1;
        ring.scale.setScalar(1 + progress * 5);
        ring.material.opacity = (1 - progress) * 0.3;
      }
    });
  });

  return (
    <group rotation={[0, Math.PI / 2, 0]}>
      {Array.from({ length: count }).map((_, i) => (
        <mesh key={i} ref={(el) => (ringsRef.current[i] = el)}>
          <torusGeometry args={[1, 0.01, 16, 100]} />
          <meshBasicMaterial color={color} transparent opacity={0.3} />
        </mesh>
      ))}
    </group>
  );
};

const SonyHeadset = ({ color, explosionProgress, mousePos }) => {
  const groupRef = useRef();

  useFrame((state) => {
    if (groupRef.current) {
      const targetX = mousePos.y * 0.15;
      const targetY = mousePos.x * 0.15;
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetX, 0.05);
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetY, 0.05);
      
      // Gentle floating motion
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  const gap = explosionProgress * 4;

  return (
    <group ref={groupRef} scale={1.2}>
      {/* 1. Main Headband */}
      <mesh position={[0, 1.2 + gap * 0.2, 0]} rotation={[0, 0, Math.PI / 2]}>
        <torusGeometry args={[1.6, 0.08, 32, 100, Math.PI]} />
        <PremiumMaterial color="#050505" />
      </mesh>
      
      {/* 2. Adjustment Sliders */}
      <mesh position={[-1.6, 0.5 + gap * 0.1, 0]} castShadow>
        <cylinderGeometry args={[0.04, 0.04, 1.2, 16]} />
        <PremiumMaterial color="#222" />
      </mesh>
      <mesh position={[1.6, 0.5 + gap * 0.1, 0]} castShadow>
        <cylinderGeometry args={[0.04, 0.04, 1.2, 16]} />
        <PremiumMaterial color="#222" />
      </mesh>

      {/* 3. Left Ear Assembly */}
      <group position={[-1.6 - gap * 0.5, 0, 0]}>
        {/* Outer Shell */}
        <mesh rotation={[0, 0, Math.PI / 2]} castShadow>
          <cylinderGeometry args={[1, 0.9, 0.4, 64]} />
          <PremiumMaterial color="#080808" />
        </mesh>
        
        {/* Glowing LED Ring */}
        <mesh rotation={[0, Math.PI / 2, 0]} position={[-0.21, 0, 0]}>
          <torusGeometry args={[0.92, 0.02, 16, 64]} />
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={5} />
        </mesh>

        {/* Cushion */}
        <mesh position={[0.3 + gap * 0.2, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[1.05, 1.05, 0.3, 64]} />
          <PremiumMaterial color="#111" roughness={0.8} metalness={0.1} />
        </mesh>
        
        {/* Internal Components (Visible when exploded) */}
        <group position={[0.5 + gap * 0.4, 0, 0]} scale={explosionProgress}>
          {/* Speaker Driver */}
          <mesh rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.8, 0.8, 0.05, 32]} />
            <PremiumMaterial color="#333" />
          </mesh>
          <mesh rotation={[0, 0, Math.PI / 2]} position={[0.03, 0, 0]}>
             <ringGeometry args={[0.2, 0.7, 32]} />
             <MeshDistortMaterial color={color} speed={2} distort={0.2} transparent opacity={0.5} />
          </mesh>
          
          {/* Technical UI Ring */}
          <mesh rotation={[0, Math.PI / 2, 0]} position={[0.1, 0, 0]}>
             <ringGeometry args={[0.85, 0.9, 64]} />
             <meshBasicMaterial color={color} transparent opacity={0.2} side={THREE.DoubleSide} />
          </mesh>
        </group>
      </group>

      {/* 4. Right Ear Assembly */}
      <group position={[1.6 + gap * 0.5, 0, 0]}>
        {/* Outer Shell */}
        <mesh rotation={[0, 0, Math.PI / 2]} castShadow>
          <cylinderGeometry args={[1, 0.9, 0.4, 64]} />
          <PremiumMaterial color="#080808" />
        </mesh>
        
        {/* Glowing LED Ring */}
        <mesh rotation={[0, Math.PI / 2, 0]} position={[0.21, 0, 0]}>
          <torusGeometry args={[0.92, 0.02, 16, 64]} />
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={5} />
        </mesh>

        {/* Cushion */}
        <mesh position={[-0.3 - gap * 0.2, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[1.05, 1.05, 0.3, 64]} />
          <PremiumMaterial color="#111" roughness={0.8} metalness={0.1} />
        </mesh>

        {/* Internal Components */}
        <group position={[-0.5 - gap * 0.4, 0, 0]} scale={explosionProgress}>
          <mesh rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.8, 0.8, 0.05, 32]} />
            <PremiumMaterial color="#333" />
          </mesh>
          {/* Bluetooth Chipset Mockup */}
          <mesh position={[-0.05, 0.2, 0.1]} rotation={[0, 0, Math.PI / 2]}>
             <boxGeometry args={[0.2, 0.2, 0.05]} />
             <meshStandardMaterial color="#222" metalness={1} />
          </mesh>
        </group>
      </group>

      {/* 5. Center Visualizer / Energy Core */}
      <group scale={explosionProgress * 1.5}>
         <SoundWaveRings color={color} />
         <mesh>
            <sphereGeometry args={[0.4, 32, 32]} />
            <meshPhysicalMaterial 
              color={color} 
              transmission={1} 
              thickness={0.5} 
              roughness={0} 
              emissive={color}
              emissiveIntensity={0.5}
            />
         </mesh>
      </group>

      {/* Holographic Connection Lines */}
      {explosionProgress > 0.1 && (
        <group>
           <line>
             <bufferGeometry attach="geometry">
               <float32BufferAttribute attach="attributes-position" args={[new Float32Array([-1.6-gap*0.5, 0, 0, 1.6+gap*0.5, 0, 0]), 3]} />
             </bufferGeometry>
             <lineBasicMaterial attach="material" color={color} transparent opacity={0.2 * explosionProgress} />
           </line>
        </group>
      )}
    </group>
  );
};

export const Headset3D = ({ mousePos, color = "#00f2ff", explosionProgress = 0 }) => {
  return (
    <group>
      <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={45} />
      
      <Particles color={color} />
      
      <SonyHeadset color={color} explosionProgress={explosionProgress} mousePos={mousePos} />
      
      {/* Cinematic Lighting */}
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={5} castShadow color="#fff" />
      <pointLight position={[-5, 2, 5]} color={color} intensity={10} distance={20} />
      <pointLight position={[5, -2, 5]} color="#ffffff" intensity={5} distance={20} />
      
      <ContactShadows 
        position={[0, -3.5, 0]} 
        opacity={0.4} 
        scale={20} 
        blur={2} 
        far={4.5} 
      />
    </group>
  );
};

const Particles = ({ color }) => {
  const pointsRef = useRef();
  const count = 2000;
  const positions = useMemo(() => {
    const p = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      p[i * 3] = (Math.random() - 0.5) * 30;
      p[i * 3 + 1] = (Math.random() - 0.5) * 30;
      p[i * 3 + 2] = (Math.random() - 0.5) * 30;
    }
    return p;
  }, []);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.02;
      pointsRef.current.rotation.x = state.clock.elapsedTime * 0.01;
    }
  });

  return (
    <Points ref={pointsRef} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color={color}
        size={0.02}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        opacity={0.6}
      />
    </Points>
  );
};


