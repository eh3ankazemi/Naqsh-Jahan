import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { TIME_PRESETS } from "@/data/timeOfDay";
import type { TimeKey } from "@/data/content";

const vertex = /* glsl */ `
  varying vec3 vPos;
  void main() {
    vPos = position;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragment = /* glsl */ `
  uniform vec3 top;
  uniform vec3 bottom;
  varying vec3 vPos;
  void main() {
    float h = clamp(normalize(vPos).y * 0.5 + 0.5, 0.0, 1.0);
    vec3 c = mix(bottom, top, pow(h, 0.75));
    gl_FragColor = vec4(c, 1.0);
  }
`;

const tmp = new THREE.Color();

export function SkyDome({
  timeOfDay,
  reducedMotion,
}: {
  timeOfDay: TimeKey;
  reducedMotion: boolean;
}) {
  const uniforms = useMemo(
    () => ({
      top: { value: new THREE.Color(TIME_PRESETS.sunset.skyTop) },
      bottom: { value: new THREE.Color(TIME_PRESETS.sunset.skyBottom) },
    }),
    [],
  );
  const mat = useRef<THREE.ShaderMaterial>(null);

  useFrame((_, dt) => {
    const p = TIME_PRESETS[timeOfDay];
    const k = reducedMotion ? 1 : Math.min(1, dt * 1.6);
    uniforms.top.value.lerp(tmp.set(p.skyTop), k);
    uniforms.bottom.value.lerp(tmp.set(p.skyBottom), k);
    if (mat.current) mat.current.uniformsNeedUpdate = true;
  });

  return (
    <mesh scale={[-1, 1, 1]} frustumCulled={false}>
      <sphereGeometry args={[400, 32, 24]} />
      <shaderMaterial
        ref={mat}
        uniforms={uniforms}
        vertexShader={vertex}
        fragmentShader={fragment}
        depthWrite={false}
        side={THREE.BackSide}
        fog={false}
      />
    </mesh>
  );
}
