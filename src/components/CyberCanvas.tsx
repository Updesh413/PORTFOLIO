"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, useState, useEffect } from "react";
import * as THREE from "three";

function FloatingCore() {
  const coreRef = useRef<THREE.Mesh>(null);
  const shellRef = useRef<THREE.Mesh>(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMouse({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (coreRef.current) {
      coreRef.current.rotation.x = THREE.MathUtils.lerp(
        coreRef.current.rotation.x,
        mouse.y * 0.4 + time * 0.08,
        0.05
      );
      coreRef.current.rotation.y = THREE.MathUtils.lerp(
        coreRef.current.rotation.y,
        mouse.x * 0.4 + time * 0.12,
        0.05
      );
    }
    if (shellRef.current) {
      shellRef.current.rotation.x = THREE.MathUtils.lerp(
        shellRef.current.rotation.x,
        -mouse.y * 0.2 - time * 0.04,
        0.05
      );
      shellRef.current.rotation.y = THREE.MathUtils.lerp(
        shellRef.current.rotation.y,
        -mouse.x * 0.2 - time * 0.06,
        0.05
      );
    }
  });

  return (
    <group>
      {/* Central holographic knot */}
      <mesh ref={coreRef}>
        <torusKnotGeometry args={[1.2, 0.35, 100, 16, 2, 3]} />
        <meshBasicMaterial
          color="#00ff41"
          wireframe
          transparent
          opacity={0.4}
        />
      </mesh>
      
      {/* Outer cyber ring structure */}
      <mesh ref={shellRef}>
        <sphereGeometry args={[2.2, 16, 16]} />
        <meshBasicMaterial
          color="#00f1fd"
          wireframe
          transparent
          opacity={0.15}
        />
      </mesh>
    </group>
  );
}

function Particles() {
  const pointsRef = useRef<THREE.Points>(null);
  const count = 250;
  
  // Create static buffer array once, to avoid hooks mismatch or re-instantiating.
  const positions = useRef<Float32Array | null>(null);
  if (!positions.current) {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i++) {
      arr[i] = (Math.random() - 0.5) * 10;
    }
    positions.current = arr;
  }

  useFrame((state) => {
    if (!pointsRef.current) return;
    const time = state.clock.getElapsedTime();
    pointsRef.current.rotation.y = time * 0.03;
    pointsRef.current.rotation.x = time * 0.01;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions.current, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#00f1fd"
        size={0.06}
        sizeAttenuation
        transparent
        opacity={0.5}
      />
    </points>
  );
}

export default function CyberCanvas() {
  return (
    <div className="w-full h-full relative">
      <Canvas camera={{ position: [0, 0, 5.5], fov: 60 }} gl={{ antialias: true, alpha: true }}>
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={0.8} />
        <FloatingCore />
        <Particles />
      </Canvas>
    </div>
  );
}
