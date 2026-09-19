import { Html } from "@react-three/drei";
import { HOTSPOTS, UI, type Lang } from "@/data/content";
import { useExperience } from "@/store/experienceStore";

export function Hotspots({ lang, hidden }: { lang: Lang; hidden: boolean }) {
  const focus = useExperience((s) => s.focus);
  const active = useExperience((s) => s.activeHotspot);
  if (hidden) return null;

  return (
    <>
      {HOTSPOTS.map((h) => (
        <Html key={h.id} position={h.anchor} center distanceFactor={44} zIndexRange={[20, 0]}>
          <button
            type="button"
            className={`hotspot ${active === h.id ? "hotspot--active" : ""}`}
            onClick={() => focus(h.view, h.id)}
            aria-label={`${h.title[lang]} — ${UI.about[lang]}`}
          >
            <span className="hotspot__dot" />
            <span className="hotspot__label">{h.title[lang]}</span>
          </button>
        </Html>
      ))}
    </>
  );
}
