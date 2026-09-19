import { useLayoutEffect, useRef } from "react";
import * as THREE from "three";

export function SquareArcades({ perfMode }: { perfMode: boolean }) {
  const count = perfMode ? 22 : 34;
  const west = useRef<THREE.InstancedMesh>(null);
  const east = useRef<THREE.InstancedMesh>(null);
  const westOpenings = useRef<THREE.InstancedMesh>(null);
  const eastOpenings = useRef<THREE.InstancedMesh>(null);

  useLayoutEffect(() => {
    const dummy = new THREE.Object3D();
    [west.current, east.current, westOpenings.current, eastOpenings.current].forEach((mesh) => {
      if (!mesh) return;
      for (let i = 0; i < count; i += 1) {
        const z = -158 + (316 / Math.max(1, count - 1)) * i;
        const opening = mesh === westOpenings.current || mesh === eastOpenings.current;
        const westSide = mesh === west.current || mesh === westOpenings.current;
        dummy.position.set(westSide ? -106 : 106, opening ? 4.4 : 5.3, z);
        dummy.scale.set(opening ? 0.12 : 1, 1, 1);
        dummy.rotation.set(0, 0, 0);
        dummy.updateMatrix();
        mesh.setMatrixAt(i, dummy.matrix);
      }
      mesh.instanceMatrix.needsUpdate = true;
    });
  }, [count]);

  return (
    <group name="square-arcades">
      <instancedMesh ref={west} args={[undefined, undefined, count]} castShadow receiveShadow>
        <boxGeometry args={[8, 10.6, 8.2]} />
        <meshStandardMaterial color="#ad835f" roughness={0.94} />
      </instancedMesh>
      <instancedMesh ref={east} args={[undefined, undefined, count]} castShadow receiveShadow>
        <boxGeometry args={[8, 10.6, 8.2]} />
        <meshStandardMaterial color="#b38b67" roughness={0.94} />
      </instancedMesh>
      <instancedMesh ref={westOpenings} args={[undefined, undefined, count]}>
        <boxGeometry args={[8.2, 6.2, 4.2]} />
        <meshStandardMaterial color="#392820" roughness={1} />
      </instancedMesh>
      <instancedMesh ref={eastOpenings} args={[undefined, undefined, count]}>
        <boxGeometry args={[8.2, 6.2, 4.2]} />
        <meshStandardMaterial color="#392820" roughness={1} />
      </instancedMesh>
      {[-110, 110].map((x) => (
        <mesh key={x} position={[x, 11.2, 0]} castShadow>
          <boxGeometry args={[9, 1.2, 340]} />
          <meshStandardMaterial color="#c2a07a" roughness={0.9} />
        </mesh>
      ))}
    </group>
  );
}
