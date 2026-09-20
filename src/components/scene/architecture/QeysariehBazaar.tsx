import { PointedPortal } from "./ArchitecturalParts";

function ArcadeBay({ x, variation }: { x: number; variation: number }) {
  return (
    <group position-x={x}>
      <mesh position={[0, 5.5, 0]} castShadow receiveShadow>
        <boxGeometry args={[8.7, 11, 8]} />
        <meshStandardMaterial
          color={variation % 3 === 0 ? "#ad835f" : "#b58d69"}
          roughness={0.94}
        />
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
      <mesh position={[0, 12, -2]} castShadow receiveShadow>
        <boxGeometry args={[42, 24, 14]} />
        <meshStandardMaterial color="#b88b64" roughness={0.94} />
      </mesh>
      <mesh position={[0, 25.5, -2]} castShadow>
        <boxGeometry args={[26, 3, 12]} />
        <meshStandardMaterial color="#c9ae87" roughness={0.9} />
      </mesh>
      <group position={[0, 1.1, 3.2]}>
        <PointedPortal width={16} height={24} depth={3.2} color="#b99d7c" />
      </group>
      <mesh position={[0, 20.5, 3.8]}>
        <boxGeometry args={[20, 0.8, 0.45]} />
        <meshStandardMaterial color="#356d79" roughness={0.58} />
      </mesh>
      <mesh position={[0, 18.5, 4.2]}>
        <circleGeometry args={[3.6, 32]} />
        <meshStandardMaterial color="#42545a" roughness={0.55} />
      </mesh>
      {Array.from({ length: bays }, (_, i) => i - Math.floor(bays / 2)).map((i) => (
        <ArcadeBay key={`left-${i}`} x={-31 - Math.abs(i) * 9.2} variation={i} />
      ))}
      {Array.from({ length: bays }, (_, i) => i - Math.floor(bays / 2)).map((i) => (
        <ArcadeBay key={`right-${i}`} x={31 + Math.abs(i) * 9.2} variation={i + 1} />
      ))}
      <mesh position={[0, 5, -26]} castShadow>
        <boxGeometry args={[24, 10, 32]} />
        <meshStandardMaterial color="#684a36" roughness={1} />
      </mesh>
      {[-15, 15].map((x) => (
        <mesh key={`divider-${x}`} position={[x, 7, -10]} castShadow>
          <boxGeometry args={[2.6, 12, 30]} />
          <meshStandardMaterial color="#7e5d41" roughness={1} />
        </mesh>
      ))}
      {night && <pointLight position={[0, 10, 10]} color="#e5aa60" intensity={30} distance={38} />}
    </group>
  );
}
