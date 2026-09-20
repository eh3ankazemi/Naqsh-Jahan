import { PersianDome, Minaret, PointedPortal } from "./ArchitecturalParts";

export function ImamMosque({ night }: { night: boolean }) {
  return (
    <group name="imam-mosque">
      <mesh position={[0, 11, -4]} castShadow receiveShadow>
        <boxGeometry args={[64, 24, 14]} />
        <meshStandardMaterial color="#d0b88a" roughness={0.9} />
      </mesh>
      <mesh position={[0, 20.5, -2]} castShadow receiveShadow>
        <boxGeometry args={[56, 2.5, 6]} />
        <meshStandardMaterial color="#d9c7ab" roughness={0.88} />
      </mesh>
      <group position={[0, 1.2, 2.4]}>
        <PointedPortal width={17.5} height={27.5} depth={3.5} color="#1d7c83" />
      </group>
      {[-14, 14].map((x) => (
        <group key={x} position={[x, 0, 1.8]}>
          <Minaret height={39} />
        </group>
      ))}
      <mesh position={[0, 23, -18]} castShadow>
        <cylinderGeometry args={[12.5, 14.8, 8.5, 32]} />
        <meshStandardMaterial color="#d8c9a3" roughness={0.82} />
      </mesh>
      <group position={[0, 27, -18]}>
        <PersianDome radius={12.5} height={15.5} color="#3e9da3" />
      </group>
      <mesh position={[0, 28.2, -2.5]}>
        <boxGeometry args={[28, 1.2, 0.5]} />
        <meshStandardMaterial color="#d7b965" roughness={0.62} />
      </mesh>
      <mesh position={[0, 21.5, 3.4]}>
        <boxGeometry args={[30, 0.8, 0.5]} />
        <meshStandardMaterial color="#2b7f84" roughness={0.52} />
      </mesh>
      {[-26, -18, 18, 26].map((x) => (
        <mesh key={x} position={[x, 9.2, 2.1]}>
          <boxGeometry args={[3.4, 8.5, 0.45]} />
          <meshStandardMaterial color="#3b2b24" roughness={1} />
        </mesh>
      ))}
      {[-18, 0, 18].map((x) => (
        <mesh key={`window-${x}`} position={[x, 11, 7.2]} castShadow>
          <boxGeometry args={[7, 6.5, 0.5]} />
          <meshStandardMaterial color="#3a2e2a" roughness={1} />
        </mesh>
      ))}
      <mesh position={[0, 0, 0]} receiveShadow>
        <boxGeometry args={[52, 0.8, 20]} />
        <meshStandardMaterial color="#9e856a" roughness={0.9} />
      </mesh>
      {night && <pointLight position={[0, 10, 10]} color="#e9b768" intensity={30} distance={45} />}
    </group>
  );
}
