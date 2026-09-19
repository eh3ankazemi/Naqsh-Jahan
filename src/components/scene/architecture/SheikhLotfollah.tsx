import { PersianDome, PointedPortal } from "./ArchitecturalParts";

export function SheikhLotfollah({ night }: { night: boolean }) {
  return (
    <group name="sheikh-lotfollah">
      <mesh position={[0, 9, -3]} castShadow receiveShadow>
        <boxGeometry args={[43, 18, 12]} />
        <meshStandardMaterial color="#d6c29e" roughness={0.9} />
      </mesh>
      <group position={[0, 0.7, 3.2]}>
        <PointedPortal width={14} height={21} depth={2.4} color="#347f86" />
      </group>
      <mesh position={[0, 18, -7]} castShadow>
        <cylinderGeometry args={[9.2, 10.5, 5.5, 36]} />
        <meshStandardMaterial color="#d7c69e" roughness={0.78} />
      </mesh>
      <group position={[0, 20.5, -7]}>
        <PersianDome radius={10} height={12} color="#d4b877" />
      </group>
      <mesh position={[0, 20, 3.4]}>
        <boxGeometry args={[18, 0.9, 0.4]} />
        <meshStandardMaterial color="#2f858e" roughness={0.56} />
      </mesh>
      {[-16, 16].map((x) => (
        <mesh key={x} position={[x, 8, 3.2]}>
          <boxGeometry args={[4.5, 8.5, 0.5]} />
          <meshStandardMaterial color="#5b4435" roughness={1} />
        </mesh>
      ))}
      {night && <pointLight position={[0, 8, 11]} color="#eab76e" intensity={24} distance={35} />}
    </group>
  );
}
