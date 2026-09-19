import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import type { TimeKey } from "@/data/content";

const WATER_COLORS: Record<TimeKey, string> = {
  dawn: "#6d9eaa",
  day: "#4c94a5",
  sunset: "#8b786d",
  night: "#1b3547",
};

export function CentralPool({ timeOfDay, perfMode }: { timeOfDay: TimeKey; perfMode: boolean }) {
  const water = useRef<THREE.MeshStandardMaterial>(null);
  const ripple = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = canvas.height = 128;
    const ctx = canvas.getContext("2d");
    if (!ctx) return new THREE.Texture();
    const gradient = ctx.createRadialGradient(64, 64, 2, 64, 64, 64);
    gradient.addColorStop(0, "rgba(255,255,255,.28)");
    gradient.addColorStop(0.45, "rgba(255,255,255,.04)");
    gradient.addColorStop(1, "rgba(0,0,0,.1)");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 128, 128);
    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(8, 3);
    return texture;
  }, []);

  useFrame((_, rawDelta) => {
    const dt = Math.min(rawDelta, 0.05);
    ripple.offset.x = (ripple.offset.x + dt * 0.008) % 1;
    ripple.offset.y = (ripple.offset.y + dt * 0.004) % 1;
    if (water.current) water.current.color.lerp(new THREE.Color(WATER_COLORS[timeOfDay]), 1 - Math.exp(-2 * dt));
  });

  return (
    <group name="central-pool" position={[0, 0.08, 4]}>
      <mesh position={[0, 0.12, 0]} receiveShadow>
        <boxGeometry args={[48, 0.55, 116]} />
        <meshStandardMaterial color="#a7a093" roughness={0.9} />
      </mesh>
      <mesh position={[0, 0.45, 0]}>
        <boxGeometry args={[44.5, 0.35, 112.5]} />
        <meshStandardMaterial color="#31586a" roughness={0.82} />
      </mesh>
      <mesh position={[0, 0.66, 0]} rotation-x={-Math.PI / 2}>
        <planeGeometry args={[43.5, 111.5, perfMode ? 1 : 12, perfMode ? 1 : 24]} />
        <meshStandardMaterial
          ref={water}
          color={WATER_COLORS[timeOfDay]}
          map={ripple}
          transparent
          opacity={0.86}
          roughness={0.22}
          metalness={0.16}
        />
      </mesh>
      {!perfMode && [-38, 0, 38].map((z) => (
        <group key={z} position={[0, 0.8, z]}>
          <mesh position-y={0.2}>
            <cylinderGeometry args={[0.55, 0.75, 0.4, 16]} />
            <meshStandardMaterial color="#8e887c" roughness={0.88} />
          </mesh>
          <mesh position-y={0.75}>
            <cylinderGeometry args={[0.07, 0.15, 1.1, 10]} />
            <meshStandardMaterial color="#b8d3d1" emissive="#6eaaa7" emissiveIntensity={0.15} />
          </mesh>
        </group>
      ))}
    </group>
  );
}
