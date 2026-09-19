import { PersianDome, Minaret, PointedPortal } from "./ArchitecturalParts";

export function ImamMosque({ night }: { night: boolean }) {
  return (
    <group name="imam-mosque">
      <mesh position={[0, 11, -4]} castShadow receiveShadow>
        <boxGeometry args={[58, 22, 12]} />
        <meshStandardMaterial color="#cbb68f" roughness={0.9} />
      </mesh>
      <group position={[0, 1, 2.2]}>
        <PointedPortal width={18} height={27} depth={3} color="#237e89" />
      </group>
      {[-14, 14].map((x) => (
        <group key={x} position={[x, 0, 1.4]}>
          <Minaret height={38} />
        </group>
      ))}
      <mesh position={[0, 21, -17]} castShadow>
        <cylinderGeometry args={[11, 13, 8, 32]} />
        <meshStandardMaterial color="#d5c69f" roughness={0.82} />
      </mesh>
      <group position={[0, 25, -17]}>
        <PersianDome radius={12} height={15} color="#3d9ca5" />
      </group>
      <mesh position={[0, 26.2, -2.5]}>
        <boxGeometry args={[25, 1.2, 0.45]} />
        <meshStandardMaterial color="#d7b965" roughness={0.62} />
      </mesh>
      {[-24, -19, 19, 24].map((x) => (
        <mesh key={x} position={[x, 9, 2.2]}>
          <boxGeometry args={[3.4, 8, 0.5]} />
          <meshStandardMaterial color="#3b2b24" roughness={1} />
        </mesh>
      ))}
      {night && <pointLight position={[0, 10, 10]} color="#e9b768" intensity={30} distance={45} />}
    </group>
  );
}
