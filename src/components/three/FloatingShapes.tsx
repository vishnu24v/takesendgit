'use client';

import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sphere, MeshWobbleMaterial } from '@react-three/drei';
import * as THREE from 'three';

function Scene() {
  const sphereRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const { clock, mouse } = state;
    if (sphereRef.current) {
      sphereRef.current.rotation.x = clock.getElapsedTime() * 0.2;
      sphereRef.current.rotation.y = clock.getElapsedTime() * 0.3;
      sphereRef.current.position.x = THREE.MathUtils.lerp(sphereRef.current.position.x, mouse.x * 2, 0.1);
      sphereRef.current.position.y = THREE.MathUtils.lerp(sphereRef.current.position.y, mouse.y * 2, 0.1);
    }
  });

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <pointLight position={[-10, -10, -5]} intensity={1} color="#8b5cf6" />
      
      <Float speed={4} rotationIntensity={1} floatIntensity={2}>
        <Sphere ref={sphereRef} args={[1, 100, 100]} scale={1.5}>
          <MeshDistortMaterial
            color="#8b5cf6"
            attach="material"
            distort={0.4}
            speed={2}
            roughness={0}
          />
        </Sphere>
      </Float>

      <Float speed={2} rotationIntensity={2} floatIntensity={5} position={[3, 2, -2]}>
        <Sphere args={[0.5, 64, 64]} scale={0.8}>
          <MeshWobbleMaterial color="#ec4899" factor={0.6} speed={2} />
        </Sphere>
      </Float>

      <Float speed={3} rotationIntensity={1} floatIntensity={3} position={[-4, -2, -3]}>
        <Sphere args={[0.3, 32, 32]} scale={1}>
          <MeshDistortMaterial color="#3b82f6" distort={0.5} speed={4} />
        </Sphere>
      </Float>
    </>
  );
}

export default function FloatingShapes() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
        <Scene />
      </Canvas>
    </div>
  );
}
