"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { getThemeColors } from "@/lib/colors";

function WireframeMesh() {
  const meshRef = useRef();
  const colors = useMemo(() => getThemeColors(), []);

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
    <group ref={meshRef}>
      {/* Outer wireframe sphere in slate-blue secondary */}
      <mesh>
        <icosahedronGeometry args={[1.8, 2]} />
        <meshBasicMaterial
          wireframe
          color={colors.secondary}
          transparent
          opacity={0.32}
        />
      </mesh>
      {/* Inner highlight sphere in primary gold */}
      <mesh scale={0.75}>
        <icosahedronGeometry args={[1.8, 1]} />
        <meshBasicMaterial
          wireframe
          color={colors.primary}
          transparent
          opacity={0.16}
        />
      </mesh>
    </group>
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
