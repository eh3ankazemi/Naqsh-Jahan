import { X } from "lucide-react";
import { UI, type Lang } from "@/data/content";
import { useExperience } from "@/store/experienceStore";

export function HelpOverlay({ lang }: { lang: Lang }) {
  const open = useExperience((s) => s.helpOpen);
  const toggle = useExperience((s) => s.toggle);
  if (!open) return null;
  return (
    <div className="ui-layer modal-scrim" onClick={() => toggle("helpOpen", false)}>
      <div className="modal" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true">
        <div className="info-panel__head">
          <h2>{UI.help[lang]}</h2>
          <button
            type="button"
            className="icon-btn"
            aria-label={UI.close[lang]}
            onClick={() => toggle("helpOpen", false)}
          >
            <X size={17} />
          </button>
        </div>
        <ul className="modal__list">
          {UI.helpItems.map((item) => (
            <li key={item.en}>{item[lang]}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function AboutOverlay({ lang }: { lang: Lang }) {
  const open = useExperience((s) => s.aboutOpen);
  const toggle = useExperience((s) => s.toggle);
  if (!open) return null;
  return (
    <div className="ui-layer modal-scrim" onClick={() => toggle("aboutOpen", false)}>
      <div className="modal" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true">
        <div className="info-panel__head">
          <h2>{UI.about[lang]}</h2>
          <button
            type="button"
            className="icon-btn"
            aria-label={UI.close[lang]}
            onClick={() => toggle("aboutOpen", false)}
          >
            <X size={17} />
          </button>
        </div>
        <p className="info-panel__body">{UI.aboutBody[lang]}</p>
        <p className="info-panel__source">UNESCO World Heritage — Meidan Emam, Esfahan</p>
      </div>
    </div>
  );
}

export function CinematicExit({ lang }: { lang: Lang }) {
  const cinematic = useExperience((s) => s.cinematic);
  const toggle = useExperience((s) => s.toggle);
  if (!cinematic) return null;
  return (
    <button
      type="button"
      className="ui-layer cinematic-exit"
      onClick={() => toggle("cinematic", false)}
    >
      {UI.showUi[lang]}
    </button>
  );
}
