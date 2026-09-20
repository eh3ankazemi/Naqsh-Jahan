import { PersianDome, PointedPortal } from "./ArchitecturalParts";

export function SheikhLotfollah({ night }: { night: boolean }) {
  return (
    <group name="sheikh-lotfollah">
      <mesh position={[0, 9, -3]} castShadow receiveShadow>
        <boxGeometry args={[46, 19, 12]} />
        <meshStandardMaterial color="#d6c29e" roughness={0.9} />
      </mesh>
      <mesh position={[0, 19.5, -2]} castShadow>
        <boxGeometry args={[24, 2.1, 6]} />
        <meshStandardMaterial color="#e4d4af" roughness={0.84} />
      </mesh>
      <group position={[0, 0.8, 3]}>
        <PointedPortal width={14.5} height={22} depth={2.6} color="#2d7c88" />
      </group>
      <mesh position={[0, 18, -8]} castShadow>
        <cylinderGeometry args={[9.5, 11.5, 6.2, 40]} />
        <meshStandardMaterial color="#d7c69e" roughness={0.78} />
      </mesh>
      <group position={[0, 21.5, -8]}>
        <PersianDome radius={10.5} height={13.5} color="#d7b579" />
      </group>
      <mesh position={[0, 20.7, 3.4]}>
        <boxGeometry args={[18.5, 0.9, 0.4]} />
        <meshStandardMaterial color="#2f858e" roughness={0.56} />
      </mesh>
      <mesh position={[0, 9.5, 7.3]}>
        <boxGeometry args={[20, 0.8, 0.5]} />
        <meshStandardMaterial color="#d3b36a" roughness={0.6} />
      </mesh>
      {[-16, 16].map((x) => (
        <mesh key={x} position={[x, 8.3, 3.2]}>
          <boxGeometry args={[4.5, 8.5, 0.5]} />
          <meshStandardMaterial color="#5b4435" roughness={1} />
        </mesh>
      ))}
      {[-12, 12].map((x) => (
        <mesh key={`window-${x}`} position={[x, 10.8, 7]}>
          <boxGeometry args={[5.6, 5.4, 0.42]} />
          <meshStandardMaterial color="#3a2e2a" roughness={1} />
        </mesh>
      ))}
      {night && <pointLight position={[0, 8, 11]} color="#eab76e" intensity={24} distance={35} />}
    </group>
  );
}
