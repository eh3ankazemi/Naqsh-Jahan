import { X } from "lucide-react";
import { HOTSPOTS, UI, type Lang } from "@/data/content";
import { useExperience } from "@/store/experienceStore";

export function InfoPanel({ lang }: { lang: Lang }) {
  const activeHotspot = useExperience((s) => s.activeHotspot);
  const closePanel = useExperience((s) => s.closePanel);
  const cinematic = useExperience((s) => s.cinematic);
  const spot = HOTSPOTS.find((h) => h.id === activeHotspot);
  if (!spot || cinematic) return null;

  return (
    <aside className="ui-layer info-panel" aria-live="polite">
      <div className="info-panel__head">
        <h2>{spot.title[lang]}</h2>
        <button type="button" className="icon-btn" aria-label={UI.close[lang]} onClick={closePanel}>
          <X size={17} />
        </button>
      </div>
      <p className="info-panel__meta">{spot.meta[lang]}</p>
      <p className="info-panel__body">{spot.body[lang]}</p>
      <p className="info-panel__source">
        {UI.source[lang]}: {spot.source}
      </p>
    </aside>
  );
}
