"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function WireframeMesh() {
  const meshRef = useRef();

  useFrame((state, delta) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.y -= delta * 0.05;
    meshRef.current.rotation.z += delta * 0.03;

    const mouseX = state.pointer.x * 0.2;
    const mouseY = state.pointer.y * 0.2;
    meshRef.current.position.x = THREE.MathUtils.lerp(meshRef.current.position.x, mouseX, 0.05);
    meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, mouseY, 0.05);
  });

  return (
    <mesh ref={meshRef}>
      <icosahedronGeometry args={[1.8, 2]} />
      <meshBasicMaterial
        wireframe
        color="#b0772d"
        transparent
        opacity={0.18}
      />
    </mesh>
  );
}

export default function HeroCanvas({ isPaused = false, eventSource, showParticles = false }) {
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden">
      <Canvas
        eventSource={eventSource}
        camera={{ position: [0, 0, 5], fov: 50 }}
        gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
        dpr={[1, 1.5]} // optimize for 60fps on retina
        frameloop={isPaused ? "never" : "always"}
      >
        <ambientLight intensity={0.5} />
        <WireframeMesh />
      </Canvas>
    </div>
  );
}
