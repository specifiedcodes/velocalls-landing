"use client";

import { useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

function Particles({ count = 500 }: { count?: number }) {
  const mesh = useRef<THREE.Points>(null!);
  const mousePos = useRef({ x: 0, y: 0 });

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    return pos;
  }, [count]);

  const sizes = useMemo(() => {
    const s = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      s[i] = Math.random() * 2 + 0.5;
    }
    return s;
  }, [count]);

  const { viewport } = useThree();

  useFrame((state) => {
    if (!mesh.current) return;
    const pointer = state.pointer;
    mousePos.current.x +=
      (pointer.x * viewport.width * 0.05 - mousePos.current.x) * 0.02;
    mousePos.current.y +=
      (pointer.y * viewport.height * 0.05 - mousePos.current.y) * 0.02;

    mesh.current.rotation.y = state.clock.elapsedTime * 0.02 + mousePos.current.x * 0.1;
    mesh.current.rotation.x = mousePos.current.y * 0.1;
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-size"
          args={[sizes, 1]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        color="#6366f1"
        transparent
        opacity={0.6}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function FloatingShape({
  position,
  geometry,
  color,
  speed = 1,
  rotationIntensity = 1,
  floatIntensity = 1,
  distort = 0.3,
  scale = 1,
}: {
  position: [number, number, number];
  geometry: "icosahedron" | "torus" | "octahedron" | "torusKnot";
  color: string;
  speed?: number;
  rotationIntensity?: number;
  floatIntensity?: number;
  distort?: number;
  scale?: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    if (!meshRef.current) return;
    const pointer = state.pointer;
    meshRef.current.position.x += pointer.x * 0.002;
    meshRef.current.position.y += pointer.y * 0.002;
  });

  const geometryNode = useMemo(() => {
    switch (geometry) {
      case "icosahedron":
        return <icosahedronGeometry args={[1, 1]} />;
      case "torus":
        return <torusGeometry args={[1, 0.4, 16, 32]} />;
      case "octahedron":
        return <octahedronGeometry args={[1, 0]} />;
      case "torusKnot":
        return <torusKnotGeometry args={[0.8, 0.3, 64, 16]} />;
      default:
        return <icosahedronGeometry args={[1, 1]} />;
    }
  }, [geometry]);

  return (
    <Float
      speed={speed}
      rotationIntensity={rotationIntensity}
      floatIntensity={floatIntensity}
    >
      <mesh ref={meshRef} position={position} scale={scale}>
        {geometryNode}
        <MeshDistortMaterial
          color={color}
          transparent
          opacity={0.15}
          wireframe
          distort={distort}
          speed={2}
          roughness={0.5}
        />
      </mesh>
    </Float>
  );
}

function GlowingSphere({
  position,
  color,
  scale = 0.3,
}: {
  position: [number, number, number];
  color: string;
  scale?: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.scale.setScalar(
      scale + Math.sin(state.clock.elapsedTime * 2) * 0.05
    );
  });

  return (
    <Float speed={1.5} floatIntensity={2}>
      <mesh ref={meshRef} position={position}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshBasicMaterial color={color} transparent opacity={0.08} />
      </mesh>
    </Float>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.2} />
      <pointLight position={[10, 10, 10]} intensity={0.5} color="#6366f1" />
      <pointLight position={[-10, -10, -10]} intensity={0.3} color="#8b5cf6" />
      <pointLight position={[0, 5, -5]} intensity={0.2} color="#06b6d4" />

      <FloatingShape
        position={[-4, 2, -3]}
        geometry="icosahedron"
        color="#6366f1"
        speed={1.2}
        rotationIntensity={0.8}
        floatIntensity={1.2}
        distort={0.4}
        scale={1.5}
      />

      <FloatingShape
        position={[4, -1, -4]}
        geometry="torusKnot"
        color="#8b5cf6"
        speed={0.8}
        rotationIntensity={0.6}
        floatIntensity={0.8}
        distort={0.2}
        scale={1.2}
      />

      <FloatingShape
        position={[-2, -3, -2]}
        geometry="octahedron"
        color="#06b6d4"
        speed={1}
        rotationIntensity={1}
        floatIntensity={1}
        distort={0.3}
        scale={1}
      />

      <FloatingShape
        position={[3, 3, -5]}
        geometry="torus"
        color="#6366f1"
        speed={0.6}
        rotationIntensity={0.5}
        floatIntensity={0.6}
        distort={0.2}
        scale={1.3}
      />

      <FloatingShape
        position={[-5, 0, -6]}
        geometry="icosahedron"
        color="#8b5cf6"
        speed={0.9}
        rotationIntensity={0.7}
        floatIntensity={0.9}
        distort={0.5}
        scale={0.8}
      />

      <GlowingSphere position={[2, 2, -3]} color="#6366f1" scale={0.5} />
      <GlowingSphere position={[-3, -2, -4]} color="#8b5cf6" scale={0.4} />
      <GlowingSphere position={[5, -3, -6]} color="#06b6d4" scale={0.6} />

      <Particles count={400} />
    </>
  );
}

export default function ThreeBackground() {
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    const updateOpacity = () => {
      const isDark = document.documentElement.classList.contains("dark");
      setOpacity(isDark ? 1 : 0.4);
    };

    updateOpacity();

    const observer = new MutationObserver(updateOpacity);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div
      className="absolute inset-0 z-0 transition-opacity duration-500"
      style={{ opacity }}
    >
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        dpr={[1, 1.5]}
        style={{ background: "transparent" }}
        gl={{ alpha: true, antialias: true }}
      >
        <Scene />
      </Canvas>
    </div>
  );
}
