import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, Lightformer } from "@react-three/drei";
import * as THREE from "three";
import { AliQapu } from "./AliQapu";
import { LightingSystem } from "./LightingSystem";
import { SkyDome } from "./SkyDome";
import { SquareGround } from "./SquareGround";
import { SquareArcades } from "./SquareArcades";
import { CentralPool } from "./CentralPool";
import { People } from "./People";
import { NightLights } from "./NightLights";
import { CameraRig } from "./CameraRig";
import { Hotspots } from "./Hotspots";
import { WorldLabels } from "./WorldLabels";
import { ImamMosque } from "./architecture/ImamMosque";
import { SheikhLotfollah } from "./architecture/SheikhLotfollah";
import { QeysariehBazaar } from "./architecture/QeysariehBazaar";
import { TIME_PRESETS } from "@/data/timeOfDay";
import { INTRO_VIEW, type Lang, type TimeKey } from "@/data/content";

export function Scene({ lang, timeOfDay, perfMode, cinematic, reducedMotion, onReady, onError }: { lang: Lang; timeOfDay: TimeKey; perfMode: boolean; cinematic: boolean; reducedMotion: boolean; onReady: () => void; onError: () => void }) {
  const night = timeOfDay === "night";
  return (
    <Canvas shadows={!perfMode} dpr={perfMode ? 1 : [1, 1.6]} gl={{ antialias: !perfMode, preserveDrawingBuffer: true }} camera={{ position: INTRO_VIEW.position, fov: 43, near: 0.5, far: 1100 }} onCreated={({ gl }) => { gl.toneMapping = THREE.ACESFilmicToneMapping; gl.toneMappingExposure = night ? 1.35 : 1.12; gl.shadowMap.type = THREE.PCFShadowMap; onReady(); }} onError={onError}>
      <Suspense fallback={null}>
        <SkyDome timeOfDay={timeOfDay} reducedMotion={reducedMotion} />
        <Environment resolution={64}>
          <Lightformer intensity={1.5} position={[0, 90, 0]} scale={[260, 260, 1]} />
          <Lightformer intensity={0.7} color="#8eb5bd" position={[120, 24, 0]} rotation-y={Math.PI / 2} scale={[180, 30, 1]} />
        </Environment>
        <LightingSystem timeOfDay={timeOfDay} perfMode={perfMode} reducedMotion={reducedMotion} />
        <SquareGround perfMode={perfMode} />
        <SquareArcades perfMode={perfMode} />
        <CentralPool timeOfDay={timeOfDay} perfMode={perfMode} />
        <group position={[-110, 0, 0]} rotation-y={Math.PI / 2}><AliQapu glow={TIME_PRESETS[timeOfDay].facadeGlow} /></group>
        <group position={[0, 0, -176]}><ImamMosque night={night} /></group>
        <group position={[108, 0, 0]} rotation-y={-Math.PI / 2}><SheikhLotfollah night={night} /></group>
        <group position={[0, 0, 176]} rotation-y={Math.PI}><QeysariehBazaar perfMode={perfMode} night={night} /></group>
        <People perfMode={perfMode} reducedMotion={reducedMotion} />
        <NightLights timeOfDay={timeOfDay} perfMode={perfMode} />
        <Hotspots lang={lang} hidden={cinematic} />
        <WorldLabels lang={lang} hidden={cinematic} />
        <CameraRig reducedMotion={reducedMotion} />
      </Suspense>
    </Canvas>
  );
}
