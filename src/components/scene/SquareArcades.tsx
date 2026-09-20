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
        dummy.position.set(westSide ? -109 : 109, opening ? 4.3 : 5.5, z);
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
        <boxGeometry args={[8.5, 10.8, 8.2]} />
        <meshStandardMaterial color="#ad835f" roughness={0.94} />
      </instancedMesh>
      <instancedMesh ref={east} args={[undefined, undefined, count]} castShadow receiveShadow>
        <boxGeometry args={[8.5, 10.8, 8.2]} />
        <meshStandardMaterial color="#b38b67" roughness={0.94} />
      </instancedMesh>
      <instancedMesh ref={westOpenings} args={[undefined, undefined, count]}>
        <boxGeometry args={[8.6, 6.1, 4.2]} />
        <meshStandardMaterial color="#392820" roughness={1} />
      </instancedMesh>
      <instancedMesh ref={eastOpenings} args={[undefined, undefined, count]}>
        <boxGeometry args={[8.6, 6.1, 4.2]} />
        <meshStandardMaterial color="#392820" roughness={1} />
      </instancedMesh>
      {[-109, 109].map((x) => (
        <mesh key={x} position={[x, 11.4, 0]} castShadow>
          <boxGeometry args={[9.2, 1.2, 340]} />
          <meshStandardMaterial color="#c2a07a" roughness={0.9} />
        </mesh>
      ))}
      {[-100, 100].map((x) => (
        <mesh key={`roof-${x}`} position={[x, 15.1, 0]} castShadow>
          <boxGeometry args={[14, 0.8, 336]} />
          <meshStandardMaterial color="#d9c3a0" roughness={0.85} />
        </mesh>
      ))}
      {[-150, -90, 90, 150].map((z) => (
        <mesh key={`stair-${z}`} position={[0, 0.5, z]} receiveShadow>
          <boxGeometry args={[218, 0.6, 6]} />
          <meshStandardMaterial color="#ae997c" roughness={0.92} />
        </mesh>
      ))}
    </group>
  );
}
