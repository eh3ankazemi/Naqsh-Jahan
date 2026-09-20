import { useMemo } from "react";
import { createPavingTexture } from "./materials";

export function SquareGround({ perfMode }: { perfMode: boolean }) {
  const paving = useMemo(() => createPavingTexture(), []);
  return (
    <group name="historic-plaza">
      <mesh rotation-x={-Math.PI / 2} position={[0, -0.25, 0]} receiveShadow>
        <planeGeometry args={[520, 620]} />
        <meshStandardMaterial color="#8d8572" roughness={1} />
      </mesh>

      <mesh rotation-x={-Math.PI / 2} position={[0, 0.02, 0]} receiveShadow>
        <planeGeometry args={[236, 392, perfMode ? 1 : 12, perfMode ? 1 : 16]} />
        <meshStandardMaterial map={paving} roughness={0.96} color="#b6a58a" />
      </mesh>

      <mesh rotation-x={-Math.PI / 2} position={[0, 0.08, 0]} receiveShadow>
        <planeGeometry args={[178, 312]} />
        <meshStandardMaterial color="#c8b898" roughness={0.98} />
      </mesh>

      {[-82, 82].map((x) => (
        <group key={x}>
          <mesh rotation-x={-Math.PI / 2} position={[x, 0.12, 0]} receiveShadow>
            <planeGeometry args={[22, 338]} />
            <meshStandardMaterial color="#867a67" roughness={0.98} />
          </mesh>
          <mesh position={[x, 0.38, 0]} receiveShadow>
            <boxGeometry args={[0.6, 0.7, 338]} />
            <meshStandardMaterial color="#c2ab8a" roughness={0.92} />
          </mesh>
        </group>
      ))}

      {[-156, 156].map((z) => (
        <mesh key={z} position={[0, 0.18, z]} receiveShadow>
          <boxGeometry args={[206, 0.4, 2.4]} />
          <meshStandardMaterial color="#c7b18d" roughness={0.9} />
        </mesh>
      ))}

      {[-12, 12].map((x) => (
        <mesh key={`axis-${x}`} position={[x, 0.16, 0]} receiveShadow>
          <boxGeometry args={[2.4, 0.24, 304]} />
          <meshStandardMaterial color="#d9c8a4" roughness={0.9} />
        </mesh>
      ))}

      {[-98, 98].map((x) => (
        <mesh key={`path-${x}`} position={[x, 0.12, 0]} receiveShadow>
          <boxGeometry args={[12, 0.12, 280]} />
          <meshStandardMaterial color="#a9967a" roughness={0.95} />
        </mesh>
      ))}

      <mesh position={[0, 0.34, -1]} receiveShadow>
        <boxGeometry args={[16, 0.5, 328]} />
        <meshStandardMaterial color="#bca887" roughness={0.92} />
      </mesh>
    </group>
  );
}
