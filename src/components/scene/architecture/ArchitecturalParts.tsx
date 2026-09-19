import { useMemo } from "react";
import * as THREE from "three";

export function PointedPortal({
  width = 12,
  height = 20,
  depth = 2,
  color = "#247d88",
  innerColor = "#30251f",
}: {
  width?: number;
  height?: number;
  depth?: number;
  color?: string;
  innerColor?: string;
}) {
  const { frame, opening } = useMemo(() => {
    const make = (w: number, h: number) => {
      const shape = new THREE.Shape();
      shape.moveTo(-w / 2, 0);
      shape.lineTo(-w / 2, h * 0.58);
      shape.quadraticCurveTo(-w * 0.42, h * 0.9, 0, h);
      shape.quadraticCurveTo(w * 0.42, h * 0.9, w / 2, h * 0.58);
      shape.lineTo(w / 2, 0);
      shape.closePath();
      return shape;
    };
    const outer = make(width, height);
    const inner = make(width * 0.72, height * 0.84);
    outer.holes.push(new THREE.Path(inner.getPoints(42)));
    return { frame: outer, opening: inner };
  }, [width, height]);
  return (
    <group>
      <mesh position={[0, 0, -0.2]} castShadow>
        <extrudeGeometry args={[opening, { depth: depth + 0.3, bevelEnabled: false, curveSegments: 18 }]} />
        <meshStandardMaterial color={innerColor} roughness={1} />
      </mesh>
      <mesh castShadow>
        <extrudeGeometry args={[frame, { depth, bevelEnabled: false, curveSegments: 18 }]} />
        <meshStandardMaterial color={color} roughness={0.65} />
      </mesh>
    </group>
  );
}

export function PersianDome({
  radius = 12,
  height = 11,
  color = "#4c9ca3",
}: {
  radius?: number;
  height?: number;
  color?: string;
}) {
  const geometry = useMemo(() => {
    const points: THREE.Vector2[] = [];
    for (let i = 0; i <= 18; i += 1) {
      const t = i / 18;
      const r = radius * Math.sin(Math.PI * t * 0.5) * (0.78 + t * 0.22);
      const y = height * (1 - t);
      points.push(new THREE.Vector2(Math.max(0.05, r), y));
    }
    points.push(new THREE.Vector2(0.05, 0));
    return new THREE.LatheGeometry(points, 48);
  }, [radius, height]);
  return (
    <mesh geometry={geometry} castShadow receiveShadow>
      <meshStandardMaterial color={color} roughness={0.55} metalness={0.04} />
    </mesh>
  );
}

export function Minaret({ height = 34 }: { height?: number }) {
  return (
    <group>
      <mesh position-y={height * 0.47} castShadow>
        <cylinderGeometry args={[1.25, 1.75, height * 0.94, 18]} />
        <meshStandardMaterial color="#d7c49f" roughness={0.82} />
      </mesh>
      <mesh position-y={height * 0.78} castShadow>
        <cylinderGeometry args={[2.15, 2.15, 1.1, 18]} />
        <meshStandardMaterial color="#276f79" roughness={0.55} />
      </mesh>
      <mesh position-y={height} castShadow>
        <coneGeometry args={[1.75, 4, 18]} />
        <meshStandardMaterial color="#3c878e" roughness={0.5} />
      </mesh>
    </group>
  );
}
