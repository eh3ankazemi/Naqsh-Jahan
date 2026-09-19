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
  const pressedKeys = useRef(new Set<string>());
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

  useEffect(() => {
    const movementKeys = new Set([
      "ArrowUp",
      "ArrowDown",
      "ArrowLeft",
      "ArrowRight",
      "w",
      "a",
      "s",
      "d",
    ]);
    const onKeyDown = (event: KeyboardEvent) => {
      if (
        !movementKeys.has(event.key) ||
        event.target instanceof HTMLInputElement ||
        event.target instanceof HTMLTextAreaElement
      )
        return;
      event.preventDefault();
      pressedKeys.current.add(event.key.toLowerCase());
      animating.current = false;
    };
    const onKeyUp = (event: KeyboardEvent) => {
      pressedKeys.current.delete(event.key.toLowerCase());
    };
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
    };
  }, []);

  useFrame((_, dt) => {
    const c = controls.current;
    if (!c) return;
    const keys = pressedKeys.current;
    const moveX =
      Number(keys.has("arrowright") || keys.has("d")) -
      Number(keys.has("arrowleft") || keys.has("a"));
    const moveZ =
      Number(keys.has("arrowdown") || keys.has("s")) - Number(keys.has("arrowup") || keys.has("w"));
    if (moveX || moveZ) {
      const forward = new THREE.Vector3().subVectors(c.target, camera.position);
      forward.y = 0;
      forward.normalize();
      const right = new THREE.Vector3().crossVectors(forward, camera.up).normalize();
      const movement = new THREE.Vector3()
        .addScaledVector(right, moveX)
        .addScaledVector(forward, moveZ)
        .normalize()
        .multiplyScalar(42 * Math.min(dt, 0.05));
      camera.position.add(movement);
      c.target.add(movement);
      camera.position.x = THREE.MathUtils.clamp(camera.position.x, -245, 245);
      camera.position.z = THREE.MathUtils.clamp(camera.position.z, -265, 265);
      c.target.x = THREE.MathUtils.clamp(c.target.x, -245, 245);
      c.target.z = THREE.MathUtils.clamp(c.target.z, -265, 265);
    }
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
