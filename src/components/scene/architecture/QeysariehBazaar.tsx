import { PointedPortal } from "./ArchitecturalParts";

function ArcadeBay({ x, variation }: { x: number; variation: number }) {
  return (
    <group position-x={x}>
      <mesh position={[0, 5.5, 0]} castShadow receiveShadow>
        <boxGeometry args={[8.7, 11, 8]} />
        <meshStandardMaterial color={variation % 3 === 0 ? "#ad835f" : "#b58d69"} roughness={0.94} />
      </mesh>
      <mesh position={[0, 4.2, 4.08]}>
        <boxGeometry args={[4.8, 7.2, 0.45]} />
        <meshStandardMaterial color="#38271f" roughness={1} />
      </mesh>
      <mesh position={[0, 1.6, 4.35]}>
        <boxGeometry args={[4.1, 3.2, 0.32]} />
        <meshStandardMaterial color={variation % 2 ? "#65432c" : "#785338"} roughness={0.82} />
      </mesh>
    </group>
  );
}

export function QeysariehBazaar({ perfMode, night }: { perfMode: boolean; night: boolean }) {
  const bays = perfMode ? 7 : 13;
  return (
    <group name="qeysarieh-bazaar">
      <mesh position={[0, 12, -3]} castShadow receiveShadow>
        <boxGeometry args={[38, 24, 12]} />
        <meshStandardMaterial color="#b88b64" roughness={0.94} />
      </mesh>
      <group position={[0, 0.8, 3.2]}>
        <PointedPortal width={14} height={23} depth={2.8} color="#b99d7c" />
      </group>
      <mesh position={[0, 25, -3]} castShadow>
        <boxGeometry args={[24, 3, 10]} />
        <meshStandardMaterial color="#c9ae87" roughness={0.9} />
      </mesh>
      <mesh position={[0, 19, 3.6]}>
        <circleGeometry args={[3.4, 32]} />
        <meshStandardMaterial color="#42545a" roughness={0.55} />
      </mesh>
      {Array.from({ length: bays }, (_, i) => i - Math.floor(bays / 2)).map((i) => (
        <ArcadeBay key={`left-${i}`} x={-27 - Math.abs(i) * 8.8} variation={i} />
      ))}
      {Array.from({ length: bays }, (_, i) => i - Math.floor(bays / 2)).map((i) => (
        <ArcadeBay key={`right-${i}`} x={27 + Math.abs(i) * 8.8} variation={i + 1} />
      ))}
      <mesh position={[0, 5, -24]} castShadow>
        <boxGeometry args={[18, 10, 35]} />
        <meshStandardMaterial color="#684a36" roughness={1} />
      </mesh>
      {night && <pointLight position={[0, 7, 11]} color="#e5aa60" intensity={28} distance={38} />}
    </group>
  );
}
