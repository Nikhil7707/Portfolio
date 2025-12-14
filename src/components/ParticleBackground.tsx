import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

function ParticleField() {
  const ref = useRef<THREE.Points>(null);
  
  const particles = useMemo(() => {
    const count = 2000;
    const positions = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * 20;
      positions[i3 + 1] = (Math.random() - 0.5) * 20;
      positions[i3 + 2] = (Math.random() - 0.5) * 20;
    }
    
    return positions;
  }, []);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = state.clock.getElapsedTime() * 0.02;
      ref.current.rotation.y = state.clock.getElapsedTime() * 0.03;
    }
  });

  return (
    <Points ref={ref} positions={particles} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#00F0FF"
        size={0.02}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
}

function FloatingOrbs() {
  const meshRef = useRef<THREE.Mesh>(null);
  const meshRef2 = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    
    if (meshRef.current) {
      meshRef.current.position.x = Math.sin(t * 0.3) * 3;
      meshRef.current.position.y = Math.cos(t * 0.4) * 2;
      meshRef.current.position.z = Math.sin(t * 0.2) * 2 - 5;
    }
    
    if (meshRef2.current) {
      meshRef2.current.position.x = Math.cos(t * 0.2) * 4;
      meshRef2.current.position.y = Math.sin(t * 0.3) * 3;
      meshRef2.current.position.z = Math.cos(t * 0.4) * 2 - 5;
    }
  });

  return (
    <>
      <mesh ref={meshRef} position={[0, 0, -5]}>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshBasicMaterial color="#00F0FF" transparent opacity={0.1} />
      </mesh>
      <mesh ref={meshRef2} position={[0, 0, -5]}>
        <sphereGeometry args={[0.3, 32, 32]} />
        <meshBasicMaterial color="#FF00FF" transparent opacity={0.1} />
      </mesh>
    </>
  );
}

const ParticleBackground = () => {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.5} />
        <ParticleField />
        <FloatingOrbs />
      </Canvas>
      
      {/* Static gradient overlay for performance */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 50% 0%, hsl(var(--primary) / 0.08) 0%, transparent 50%)',
        }}
      />
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 80% 80%, hsl(var(--secondary) / 0.05) 0%, transparent 40%)',
        }}
      />
    </div>
  );
};

export default ParticleBackground;
