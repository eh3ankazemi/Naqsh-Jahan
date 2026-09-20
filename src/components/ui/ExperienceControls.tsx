import {
  Camera,
  Compass,
  Expand,
  Film,
  Gauge,
  HelpCircle,
  MapPin,
  RotateCcw,
  Settings2,
  Tags,
  type LucideIcon,
} from "lucide-react";
import { UI, type Lang } from "@/data/content";
import { useExperience } from "@/store/experienceStore";

export function ExperienceControls({
  lang,
  hidden,
  onCapture,
}: {
  lang: Lang;
  hidden: boolean;
  onCapture: () => void;
}) {
  const resetCamera = useExperience((s) => s.resetCamera);
  const toggle = useExperience((s) => s.toggle);
  const labelsOn = useExperience((s) => s.labelsOn);
  const moreOpen = useExperience((s) => s.moreOpen);
  const perfMode = useExperience((s) => s.perfMode);
  const cinematic = useExperience((s) => s.cinematic);
  type ControlItem = {
    key: string;
    label: string;
    icon: LucideIcon;
    on: boolean;
    action: () => void;
  };
  const main: ControlItem[] = [
    {
      key: "explore",
      label: UI.explore[lang],
      icon: MapPin,
      on: false,
      action: () => toggle("exploreOpen"),
    },
    {
      key: "camera",
      label: UI.camera[lang],
      icon: Compass,
      on: false,
      action: () => toggle("cameraOpen"),
    },
    {
      key: "labels",
      label: UI.labels[lang],
      icon: Tags,
      on: labelsOn,
      action: () => toggle("labelsOn"),
    },
    { key: "reset", label: UI.reset[lang], icon: RotateCcw, on: false, action: resetCamera },
    {
      key: "more",
      label: UI.more[lang],
      icon: Settings2,
      on: moreOpen,
      action: () => toggle("moreOpen"),
    },
  ];
  const advanced: ControlItem[] = [
    {
      key: "cinematic",
      label: UI.cinematic[lang],
      icon: Film,
      on: cinematic,
      action: () => toggle("cinematic"),
    },
    {
      key: "perf",
      label: UI.performance[lang],
      icon: Gauge,
      on: perfMode,
      action: () => toggle("perfMode"),
    },
    { key: "capture", label: UI.capture[lang], icon: Camera, on: false, action: onCapture },
    {
      key: "full",
      label: UI.fullscreen[lang],
      icon: Expand,
      on: false,
      action: () =>
        document.fullscreenElement
          ? void document.exitFullscreen()
          : void document.documentElement.requestFullscreen?.(),
    },
    {
      key: "help",
      label: UI.help[lang],
      icon: HelpCircle,
      on: false,
      action: () => toggle("helpOpen"),
    },
  ];
  const render = (it: ControlItem) => (
    <button
      key={it.key}
      type="button"
      className={`dock-btn ${it.on ? "is-active" : ""}`}
      onClick={it.action}
      aria-label={it.label}
      aria-pressed={it.on}
    >
      <it.icon size={16} />
      <span className="dock-btn__label">{it.label}</span>
    </button>
  );
  return (
    <div className={`ui-layer control-dock ${hidden ? "ui-hidden" : ""}`}>
      <div className="control-dock__main">{main.map(render)}</div>
      {moreOpen && <div className="control-dock__advanced">{advanced.map(render)}</div>}
    </div>
  );
}
