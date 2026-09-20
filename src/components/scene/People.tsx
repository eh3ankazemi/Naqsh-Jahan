import { useCallback, useLayoutEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export function People({ perfMode, reducedMotion }: { perfMode: boolean; reducedMotion: boolean }) {
  const count = perfMode ? 12 : 30;
  const bodies = useRef<THREE.InstancedMesh>(null);
  const heads = useRef<THREE.InstancedMesh>(null);
  const base = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        x: (i % 2 ? -1 : 1) * (33 + ((i * 17) % 58)),
        z: -145 + ((i * 41) % 290),
        phase: i * 0.71,
        scale: 0.82 + (i % 5) * 0.06,
      })),
    [count],
  );

  const update = useCallback(
    (elapsed: number) => {
      const dummy = new THREE.Object3D();
      base.forEach((person, i) => {
        const walk = reducedMotion ? 0 : Math.sin(elapsed * 0.22 + person.phase) * 2.4;
        dummy.position.set(person.x + walk, 1.45 * person.scale, person.z);
        dummy.scale.setScalar(person.scale);
        dummy.updateMatrix();
        bodies.current?.setMatrixAt(i, dummy.matrix);
        dummy.position.y = 3.05 * person.scale;
        dummy.scale.setScalar(person.scale);
        dummy.updateMatrix();
        heads.current?.setMatrixAt(i, dummy.matrix);
      });
      if (bodies.current) bodies.current.instanceMatrix.needsUpdate = true;
      if (heads.current) heads.current.instanceMatrix.needsUpdate = true;
    },
    [base, reducedMotion],
  );

  useLayoutEffect(() => update(0), [update]);
  useFrame(({ clock }) => update(clock.elapsedTime));

  return (
    <group name="visitors">
      <instancedMesh ref={bodies} args={[undefined, undefined, count]} castShadow={!perfMode}>
        <capsuleGeometry args={[0.34, 1.7, 3, 7]} />
        <meshStandardMaterial color="#554e51" roughness={0.96} />
      </instancedMesh>
      <instancedMesh ref={heads} args={[undefined, undefined, count]} castShadow={!perfMode}>
        <sphereGeometry args={[0.36, 8, 6]} />
        <meshStandardMaterial color="#b58b6a" roughness={0.94} />
      </instancedMesh>
    </group>
  );
}
