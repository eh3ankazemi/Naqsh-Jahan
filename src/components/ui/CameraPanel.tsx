import { X } from "lucide-react";
import { CAMERA_PRESETS, UI, type CameraPresetId, type Lang } from "@/data/content";
import { useExperience } from "@/store/experienceStore";

export function CameraPanel({ lang }: { lang: Lang }) {
  const open = useExperience((s) => s.cameraOpen);
  const focus = useExperience((s) => s.focus);
  const setTime = useExperience((s) => s.setTimeOfDay);
  const toggle = useExperience((s) => s.toggle);
  if (!open) return null;
  const keys = Object.keys(CAMERA_PRESETS) as CameraPresetId[];
  return <aside className="ui-layer camera-panel">
    <div className="info-panel__head"><h2>{UI.cameraTitle[lang]}</h2><button className="icon-btn" aria-label={UI.close[lang]} onClick={() => toggle("cameraOpen", false)}><X size={16} /></button></div>
    <div className="explore-grid">{keys.map((key) => <button key={key} className="explore-item" onClick={() => { if (key === "sunset" || key === "night") setTime(key); focus(CAMERA_PRESETS[key]); toggle("cameraOpen", false); }}>{UI.cameraViews[key][lang]}</button>)}</div>
  </aside>;
}
