import { create } from "zustand";
import { HERO_VIEW, INTRO_VIEW, type CameraView, type Lang, type TimeKey } from "@/data/content";

interface ExperienceState {
  lang: Lang;
  timeOfDay: TimeKey;
  activeHotspot: string | null;
  view: CameraView;
  viewToken: number;
  introDone: boolean;
  cinematic: boolean;
  perfMode: boolean;
  soundOn: boolean;
  helpOpen: boolean;
  aboutOpen: boolean;
  labelsOn: boolean;
  exploreOpen: boolean;
  cameraOpen: boolean;
  moreOpen: boolean;
  setLang: (lang: Lang) => void;
  setTimeOfDay: (t: TimeKey) => void;
  focus: (view: CameraView, hotspot?: string | null) => void;
  resetCamera: () => void;
  closePanel: () => void;
  finishIntro: () => void;
  toggle: (
    key:
      | "cinematic"
      | "perfMode"
      | "soundOn"
      | "helpOpen"
      | "aboutOpen"
      | "labelsOn"
      | "exploreOpen"
      | "cameraOpen"
      | "moreOpen",
    value?: boolean,
  ) => void;
}

export const useExperience = create<ExperienceState>((set, get) => ({
  lang: "fa",
  timeOfDay: "day",
  activeHotspot: null,
  view: INTRO_VIEW,
  viewToken: 0,
  introDone: false,
  cinematic: false,
  perfMode: false,
  soundOn: false,
  helpOpen: false,
  aboutOpen: false,
  labelsOn: true,
  exploreOpen: false,
  cameraOpen: false,
  moreOpen: false,
  setLang: (lang) => set({ lang }),
  setTimeOfDay: (timeOfDay) => set({ timeOfDay }),
  focus: (view, hotspot = null) =>
    set({ view, viewToken: get().viewToken + 1, activeHotspot: hotspot }),
  resetCamera: () => set({ view: HERO_VIEW, viewToken: get().viewToken + 1, activeHotspot: null }),
  closePanel: () => set({ activeHotspot: null }),
  finishIntro: () => set({ introDone: true }),
  toggle: (key, value) => set((s) => ({ [key]: value ?? !s[key] }) as Partial<ExperienceState>),
}));
