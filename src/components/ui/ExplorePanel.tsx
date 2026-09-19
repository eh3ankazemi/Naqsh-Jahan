import { X } from "lucide-react";
import { LANDMARKS, UI, type Lang } from "@/data/content";
import { useExperience } from "@/store/experienceStore";

export function ExplorePanel({ lang }: { lang: Lang }) {
  const open = useExperience((s) => s.exploreOpen);
  const focus = useExperience((s) => s.focus);
  const toggle = useExperience((s) => s.toggle);
  if (!open) return null;
  return <aside className="ui-layer explore-panel">
    <div className="info-panel__head"><h2>{UI.exploreTitle[lang]}</h2><button className="icon-btn" aria-label={UI.close[lang]} onClick={() => toggle("exploreOpen", false)}><X size={16} /></button></div>
    <div className="explore-grid">{LANDMARKS.map((place) => <button key={place.id} className="explore-item" onClick={() => { focus(place.view, place.id === "full-square" ? null : place.id); toggle("exploreOpen", false); }}><span>{place.title[lang]}</span><small>{place.title[lang === "fa" ? "en" : "fa"]}</small></button>)}</div>
  </aside>;
}
