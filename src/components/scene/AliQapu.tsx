import { useMemo } from "react";
import * as THREE from "three";

/**
 * Stylised, interpretive massing model of Ali Qapu Palace.
 *
 * The whole building is procedural so the experience runs with zero external
 * assets. To swap in a final GLB, replace this component's contents with a
 * <primitive object={gltf.scene} /> — nothing else in the app reads its
 * internals; hotspot anchors live in src/data/content.ts.
 */

const COL_ROWS = [6, 2, -2];
const COL_X = [-9, -5.4, -1.8, 1.8, 5.4, 9];

export function AliQapu({ glow = 0 }: { glow?: number }) {
  const mats = useMemo(() => {
    const brick = new THREE.MeshStandardMaterial({ color: "#b98a63", roughness: 0.92 });
    const plaster = new THREE.MeshStandardMaterial({ color: "#d8c3a2", roughness: 0.85 });
    const shade = new THREE.MeshStandardMaterial({ color: "#6b4f3a", roughness: 0.95 });
    const wood = new THREE.MeshStandardMaterial({ color: "#7c4b2a", roughness: 0.7 });
    const stone = new THREE.MeshStandardMaterial({ color: "#9a9285", roughness: 0.95 });
    const tile = new THREE.MeshStandardMaterial({
      color: "#2f8f96",
      roughness: 0.35,
      metalness: 0.1,
    });
    return { brick, plaster, shade, wood, stone, tile };
  }, []);

  useMemo(() => {
    const e = new THREE.Color("#ffb977");
    for (const m of [mats.brick, mats.plaster]) {
      m.emissive = e;
      m.emissiveIntensity = glow;
      m.needsUpdate = true;
    }
  }, [glow, mats]);

  const { archShape, archFrame } = useMemo(() => {
    const make = (w: number, h: number, apex: number) => {
      const sh = new THREE.Shape();
      sh.moveTo(-w, 0);
      sh.lineTo(-w, h);
      sh.quadraticCurveTo(-w * 0.75, apex, 0, apex);
      sh.quadraticCurveTo(w * 0.75, apex, w, h);
      sh.lineTo(w, 0);
      sh.lineTo(-w, 0);
      return sh;
    };
    const outer = make(3.35, 7.2, 10.9);
    const inner = make(2.9, 7.0, 10.4);
    outer.holes.push(new THREE.Path(inner.getPoints(48)));
    return { archShape: make(2.9, 7.0, 10.4), archFrame: outer };
  }, []);

  const wings: [number, number][] = [
    [-6.5, -1],
    [6.5, 1],
  ];

  return (
    <group name="ali-qapu">
      {/* podium */}
      <mesh position={[0, 0.5, 1]} receiveShadow castShadow material={mats.stone}>
        <boxGeometry args={[34, 1, 28]} />
      </mesh>

      {/* layered base courses and facade rhythm */}
      {[2.2, 6.8, 11.4, 16].map((y) => (
        <mesh key={`band-${y}`} position={[0, y, 8.25]} material={mats.plaster}>
          <boxGeometry args={[21.5, 0.22, 0.32]} />
        </mesh>
      ))}
      {/* main block — two wings leaving a central iwan */}
      {wings.map(([x, sign]) => (
        <group key={x}>
          <mesh position={[x, 9, 0]} castShadow receiveShadow material={mats.brick}>
            <boxGeometry args={[7, 16, 16]} />
          </mesh>
          {/* blind arches and recessed windows on the facade */}
          {[0, 1].map((c) =>
            [0, 1, 2].map((r) => (
              <mesh
                key={`${c}-${r}`}
                position={[x + (c === 0 ? -1.7 : 1.7), 4.5 + r * 4.6, 8.05]}
                material={mats.shade}
              >
                <boxGeometry args={[2.1, 3.4, 0.55]} />
              </mesh>
            )),
          )}
          {[0, 1].map((c) => [0, 1, 2].map((r) => (
            <mesh key={`frame-${c}-${r}`} position={[x + (c === 0 ? -1.7 : 1.7), 4.5 + r * 4.6, 8.38]} material={mats.plaster}>
              <boxGeometry args={[2.6, 0.24, 0.18]} />
            </mesh>
          )))}
          {/* side pilaster */}
          <mesh position={[x + sign * 3.6, 9, 0]} castShadow material={mats.plaster}>
            <boxGeometry args={[0.5, 16, 16.4]} />
          </mesh>
        </group>
      ))}

      {/* iwan back wall + lintel */}
      <mesh position={[0, 7, -6]} castShadow receiveShadow material={mats.shade}>
        <boxGeometry args={[6, 14, 4]} />
      </mesh>
      <mesh position={[0, 14.5, 0]} castShadow receiveShadow material={mats.brick}>
        <boxGeometry args={[6, 5, 16]} />
      </mesh>
      {/* pointed arch of the portal, extruded into the iwan */}
      <mesh position={[0, 1, 2]} material={mats.shade}>
        <extrudeGeometry args={[archShape, { depth: 6, bevelEnabled: false, curveSegments: 24 }]} />
      </mesh>
      <mesh position={[0, 1, 8.02]} material={mats.plaster}>
        <extrudeGeometry
          args={[archFrame, { depth: 0.35, bevelEnabled: false, curveSegments: 24 }]}
        />
      </mesh>
      {/* turquoise banding above the portal */}
      <mesh position={[0, 12.4, 8.1]} material={mats.tile}>
        <boxGeometry args={[6.4, 0.5, 0.3]} />
      </mesh>

      {/* talar platform */}
      <mesh position={[0, 17.6, 2]} castShadow receiveShadow material={mats.stone}>
        <boxGeometry args={[22, 1.4, 13]} />
      </mesh>
      <mesh position={[0, 16.8, 8.3]} material={mats.tile}>
        <boxGeometry args={[22, 0.4, 0.4]} />
      </mesh>

      {/* veranda rail, floor edge and wooden columns */}
      <mesh position={[0, 19.2, 8.15]} material={mats.wood} castShadow>
        <boxGeometry args={[21.5, 0.35, 0.35]} />
      </mesh>
      {COL_X.map((x) => (
        <mesh key={`rail-${x}`} position={[x, 18.7, 8.15]} material={mats.wood}>
          <boxGeometry args={[0.18, 1.4, 0.22]} />
        </mesh>
      ))}
      {/* wooden columns of the veranda */}
      {COL_ROWS.map((z) =>
        COL_X.map((x) => (
          <group key={`${x}-${z}`} position={[x, 18.3, z]}>
            <mesh position={[0, 0.3, 0]} castShadow material={mats.stone}>
              <cylinderGeometry args={[0.46, 0.5, 0.6, 12]} />
            </mesh>
            <mesh position={[0, 5.1, 0]} castShadow material={mats.wood}>
              <cylinderGeometry args={[0.32, 0.4, 9, 14]} />
            </mesh>
            <mesh position={[0, 9.8, 0]} castShadow material={mats.wood}>
              <boxGeometry args={[0.9, 0.5, 0.9]} />
            </mesh>
          </group>
        )),
      )}

      {[-4, 0, 4].map((z) => (
        <mesh key={`beam-${z}`} position={[0, 27.75, z]} castShadow material={mats.wood}>
          <boxGeometry args={[22.2, 0.38, 0.42]} />
        </mesh>
      ))}
      {/* talar roof */}
      <mesh position={[0, 28.4, 2]} castShadow receiveShadow material={mats.wood}>
        <boxGeometry args={[22.6, 0.7, 13.6]} />
      </mesh>
      <mesh position={[0, 29, 2]} castShadow material={mats.plaster}>
        <boxGeometry args={[23.4, 0.5, 14.4]} />
      </mesh>

      {/* rear pavilion rising behind the talar */}
      <mesh position={[0, 23, -4.5]} castShadow receiveShadow material={mats.brick}>
        <boxGeometry args={[20, 12, 7]} />
      </mesh>
      <mesh position={[0, 31.5, -4.5]} castShadow receiveShadow material={mats.brick}>
        <boxGeometry args={[13, 5, 7]} />
      </mesh>
      <mesh position={[0, 34.3, -4.5]} material={mats.plaster}>
        <boxGeometry args={[13.8, 0.6, 7.8]} />
      </mesh>
      {/* upper windows and frames */}
      {[-4.2, 0, 4.2].map((x) => (
        <group key={x}>
          <mesh position={[x, 31.4, -0.9]} material={mats.shade}>
            <boxGeometry args={[2.2, 2.8, 0.3]} />
          </mesh>
          <mesh position={[x, 33, -0.7]} material={mats.tile}>
            <boxGeometry args={[2.7, 0.28, 0.18]} />
          </mesh>
        </group>
      ))}
    </group>
  );
}
