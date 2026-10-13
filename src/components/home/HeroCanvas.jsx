"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function ParticleField() {
  const pointsRef = useRef();

  // Generate 1200 lightweight particles in a spherical/toroidal constellation
  const [positions, colors] = useMemo(() => {
    const count = 1200;
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);

    const color1 = new THREE.Color("#b0772d");
    const color2 = new THREE.Color("#c98d3b");
    const color3 = new THREE.Color("#e0aa62");

    for (let i = 0; i < count; i++) {
      // Concentrated spatial distribution
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      const radius = 2.4 + (Math.random() - 0.5) * 1.6;

      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);

      pos[i * 3] = x;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = z;

      // Smooth color gradient mix
      const mixRatio = Math.random();
      const mixedColor = mixRatio < 0.5
        ? color1.clone().lerp(color2, mixRatio * 2)
        : color2.clone().lerp(color3, (mixRatio - 0.5) * 2);

      col[i * 3] = mixedColor.r;
      col[i * 3 + 1] = mixedColor.g;
      col[i * 3 + 2] = mixedColor.b;
    }

    return [pos, col];
  }, []);

  useFrame((state, delta) => {
    if (!pointsRef.current) return;
    // Gentle continuous cosmic drift
    pointsRef.current.rotation.y += delta * 0.08;
    pointsRef.current.rotation.x += delta * 0.04;

    // React softly to mouse cursor position
    const mouseX = state.pointer.x * 0.35;
    const mouseY = state.pointer.y * 0.35;

    pointsRef.current.rotation.y = THREE.MathUtils.lerp(
      pointsRef.current.rotation.y,
      pointsRef.current.rotation.y + mouseX * 0.05,
      0.08
    );
    pointsRef.current.rotation.x = THREE.MathUtils.lerp(
      pointsRef.current.rotation.x,
      mouseY * 0.3,
      0.08
    );
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.035}
        vertexColors
        transparent
        opacity={0.8}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

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

export default function HeroCanvas() {
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
        dpr={[1, 1.5]} // optimize for 60fps on retina
      >
        <ambientLight intensity={0.5} />
        <ParticleField />
        <WireframeMesh />
      </Canvas>
    </div>
  );
}
