import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { TIME_PRESETS } from "@/data/timeOfDay";
import type { TimeKey } from "@/data/content";

const tmpColor = new THREE.Color();
const tmpVec = new THREE.Vector3();

export function LightingSystem({
  timeOfDay,
  perfMode,
  reducedMotion,
}: {
  timeOfDay: TimeKey;
  perfMode: boolean;
  reducedMotion: boolean;
}) {
  const sun = useRef<THREE.DirectionalLight>(null);
  const hemi = useRef<THREE.HemisphereLight>(null);
  const { scene } = useThree();
  const fog = useRef(new THREE.FogExp2("#b9784f", 0.0065));

  if (scene.fog !== fog.current) scene.fog = fog.current;

  useFrame((_, dt) => {
    const p = TIME_PRESETS[timeOfDay];
    const k = reducedMotion ? 1 : Math.min(1, dt * 1.6);
    if (sun.current) {
      sun.current.position.lerp(tmpVec.set(...p.sunPosition), k);
      sun.current.color.lerp(tmpColor.set(p.sunColor), k);
      sun.current.intensity += (p.sunIntensity - sun.current.intensity) * k;
    }
    if (hemi.current) {
      hemi.current.color.lerp(tmpColor.set(p.skyBottom), k);
      hemi.current.groundColor.lerp(tmpColor.set(p.ambientColor), k);
      hemi.current.intensity += (p.ambientIntensity - hemi.current.intensity) * k;
    }
    fog.current.color.lerp(tmpColor.set(p.fogColor), k);
    fog.current.density += (p.fogDensity - fog.current.density) * k;
  });

  const shadowSize = perfMode ? 1024 : 2048;

  return (
    <>
      <hemisphereLight ref={hemi} intensity={0.6} />
      <directionalLight
        ref={sun}
        castShadow={!perfMode}
        position={[70, 12, 26]}
        intensity={2.2}
        shadow-mapSize-width={shadowSize}
        shadow-mapSize-height={shadowSize}
        shadow-bias={-0.0006}
        shadow-camera-left={-70}
        shadow-camera-right={70}
        shadow-camera-top={70}
        shadow-camera-bottom={-40}
        shadow-camera-far={220}
      />
      <ambientLight intensity={0.18} />
    </>
  );
}
