import { useMemo } from "react";
import * as THREE from "three";
import { createPavingTexture } from "./materials";

export function SquareGround({ perfMode }: { perfMode: boolean }) {
  const paving = useMemo(() => createPavingTexture(), []);
  return (
    <group name="historic-plaza">
      <mesh rotation-x={-Math.PI / 2} position={[0, -0.12, 0]} receiveShadow>
        <planeGeometry args={[520, 620]} />
        <meshStandardMaterial color="#8c826f" roughness={1} />
      </mesh>
      <mesh rotation-x={-Math.PI / 2} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[214, 356, perfMode ? 1 : 8, perfMode ? 1 : 12]} />
        <meshStandardMaterial map={paving} roughness={0.96} color="#b5a58d" />
      </mesh>
      {[-72, 72].map((x) => (
        <group key={x}>
          <mesh rotation-x={-Math.PI / 2} position={[x, 0.035, 0]} receiveShadow>
            <planeGeometry args={[22, 322]} />
            <meshStandardMaterial color="#817963" roughness={0.98} />
          </mesh>
          <mesh position={[x, 0.32, 0]} receiveShadow>
            <boxGeometry args={[0.45, 0.62, 322]} />
            <meshStandardMaterial color="#b9ab91" roughness={0.92} />
          </mesh>
        </group>
      ))}
      {[-164, 164].map((z) => (
        <mesh key={z} position={[0, 0.16, z]} receiveShadow>
          <boxGeometry args={[205, 0.32, 2.2]} />
          <meshStandardMaterial color="#c0ae91" roughness={0.9} />
        </mesh>
      ))}
    </group>
  );
}
