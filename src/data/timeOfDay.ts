import type { TimeKey, Vec3 } from "./content";

export interface TimePreset {
  sunPosition: Vec3;
  sunColor: string;
  sunIntensity: number;
  ambientColor: string;
  ambientIntensity: number;
  skyTop: string;
  skyBottom: string;
  fogColor: string;
  fogDensity: number;
  facadeGlow: number;
}

export const TIME_PRESETS: Record<TimeKey, TimePreset> = {
  dawn: {
    sunPosition: [-60, 18, 40],
    sunColor: "#ffc79a",
    sunIntensity: 2.0,
    ambientColor: "#9fc6d8",
    ambientIntensity: 0.55,
    skyTop: "#1b3556",
    skyBottom: "#e7b58c",
    fogColor: "#8fa3b8",
    fogDensity: 0.0032,
    facadeGlow: 0.05,
  },
  day: {
    sunPosition: [40, 70, 40],
    sunColor: "#fff3df",
    sunIntensity: 3.0,
    ambientColor: "#bcd6e8",
    ambientIntensity: 0.7,
    skyTop: "#2f6f9e",
    skyBottom: "#cfe3ef",
    fogColor: "#c6d7e2",
    fogDensity: 0.0018,
    facadeGlow: 0,
  },
  sunset: {
    sunPosition: [80, 26, 40],
    sunColor: "#ff9d52",
    sunIntensity: 2.9,
    ambientColor: "#8f6f86",
    ambientIntensity: 0.5,
    skyTop: "#2a2144",
    skyBottom: "#f0894a",
    fogColor: "#b9784f",
    fogDensity: 0.0028,
    facadeGlow: 0.08,
  },
  night: {
    sunPosition: [-30, 40, -30],
    sunColor: "#9fb6e8",
    sunIntensity: 0.35,
    ambientColor: "#42557a",
    ambientIntensity: 0.28,
    skyTop: "#070d1c",
    skyBottom: "#16243c",
    fogColor: "#0d1526",
    fogDensity: 0.005,
    facadeGlow: 0.55,
  },
};
