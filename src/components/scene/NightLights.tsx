import type { TimeKey } from "@/data/content";

export function NightLights({ timeOfDay, perfMode }: { timeOfDay: TimeKey; perfMode: boolean }) {
  if (timeOfDay !== "night") return null;
  const intensity = perfMode ? 18 : 28;
  return (
    <group>
      <pointLight position={[-97, 12, 0]} color="#e8b56d" intensity={intensity} distance={42} />
      <pointLight position={[0, 10, -160]} color="#e8b56d" intensity={intensity} distance={46} />
      <pointLight position={[96, 9, 0]} color="#e8b56d" intensity={intensity * 0.8} distance={38} />
      <pointLight
        position={[0, 9, 162]}
        color="#e8b56d"
        intensity={intensity * 0.8}
        distance={40}
      />
    </group>
  );
}
