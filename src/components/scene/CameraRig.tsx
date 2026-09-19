import { useEffect, useRef, type ComponentRef } from "react";
import { OrbitControls } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useExperience } from "@/store/experienceStore";

type Controls = ComponentRef<typeof OrbitControls>;

const targetPos = new THREE.Vector3();
const targetLook = new THREE.Vector3();

export function CameraRig({ reducedMotion }: { reducedMotion: boolean }) {
  const controls = useRef<Controls>(null);
  const animating = useRef(true);
  const { camera, gl } = useThree();
  const view = useExperience((s) => s.view);
  const viewToken = useExperience((s) => s.viewToken);

  useEffect(() => {
    animating.current = true;
    if (reducedMotion) {
      camera.position.set(...view.position);
      controls.current?.target.set(...view.target);
      controls.current?.update();
      animating.current = false;
    }
  }, [viewToken, view, camera, reducedMotion]);

  useEffect(() => {
    const el = gl.domElement;
    const stop = () => {
      animating.current = false;
    };
    el.addEventListener("pointerdown", stop);
    el.addEventListener("wheel", stop, { passive: true });
    return () => {
      el.removeEventListener("pointerdown", stop);
      el.removeEventListener("wheel", stop);
    };
  }, [gl]);

  useFrame((_, dt) => {
    const c = controls.current;
    if (!c) return;
    if (animating.current) {
      const k = 1 - Math.pow(0.0009, Math.min(dt, 0.05));
      targetPos.set(...view.position);
      targetLook.set(...view.target);
      camera.position.lerp(targetPos, k);
      c.target.lerp(targetLook, k);
      if (camera.position.distanceTo(targetPos) < 0.08) animating.current = false;
    }
    c.update();
  });

  return (
    <OrbitControls
      ref={controls}
      enableDamping
      dampingFactor={0.06}
      minDistance={24}
      maxDistance={460}
      minPolarAngle={0.25}
      maxPolarAngle={Math.PI / 2 - 0.06}
      target={[0, 10, 0]}
      makeDefault
    />
  );
}
