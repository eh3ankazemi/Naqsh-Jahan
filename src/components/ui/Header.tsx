import { Info, Volume2, VolumeX } from "lucide-react";
import { UI, type Lang } from "@/data/content";
import { useExperience } from "@/store/experienceStore";

export function Header({ lang, hidden }: { lang: Lang; hidden: boolean }) {
  const setLang = useExperience((s) => s.setLang);
  const soundOn = useExperience((s) => s.soundOn);
  const toggle = useExperience((s) => s.toggle);

  return (
    <header className={`ui-layer header ${hidden ? "ui-hidden" : ""}`}>
      <div className="header__brand">
        <span className="header__mark">{UI.brand[lang]}</span>
        <span className="header__sub">{UI.subtitle[lang]}</span>
      </div>
      <div className="header__actions">
        <div className="lang-switch" role="group" aria-label="Language">
          {(["fa", "en"] as Lang[]).map((l) => (
            <button
              key={l}
              type="button"
              className={`lang-switch__btn ${lang === l ? "is-active" : ""}`}
              onClick={() => setLang(l)}
            >
              {l === "fa" ? "فا" : "EN"}
            </button>
          ))}
        </div>
        <button
          type="button"
          className="icon-btn"
          aria-label={UI.sound[lang]}
          aria-pressed={soundOn}
          onClick={() => toggle("soundOn")}
        >
          {soundOn ? <Volume2 size={17} /> : <VolumeX size={17} />}
        </button>
        <button
          type="button"
          className="icon-btn"
          aria-label={UI.about[lang]}
          onClick={() => toggle("aboutOpen")}
        >
          <Info size={17} />
        </button>
      </div>
    </header>
  );
}
