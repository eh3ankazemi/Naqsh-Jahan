import { useEffect, useState } from "react";
import { UI, type Lang } from "@/data/content";

export function Intro({
  lang,
  ready,
  progress,
  onDone,
  reducedMotion,
}: {
  lang: Lang;
  ready: boolean;
  progress: number;
  onDone: () => void;
  reducedMotion: boolean;
}) {
  const [closing, setClosing] = useState(false);

  useEffect(() => {
    if (!ready) return;
    const hold = reducedMotion ? 300 : 3600;
    const t = setTimeout(() => setClosing(true), hold);
    return () => clearTimeout(t);
  }, [ready, reducedMotion]);

  useEffect(() => {
    if (!closing) return;
    const t = setTimeout(onDone, reducedMotion ? 100 : 900);
    return () => clearTimeout(t);
  }, [closing, onDone, reducedMotion]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setClosing(true);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div className={`ui-layer intro ${closing ? "intro--closing" : ""}`}>
      <div className="intro__inner">
        <p className="intro__brand">{UI.brand[lang]}</p>
        <h1 className="intro__tagline">{UI.tagline[lang]}</h1>
        {!ready ? (
          <div className="intro__loading">
            <span>{UI.loading[lang]}</span>
            <div className="intro__bar">
              <i style={{ width: `${Math.round(progress)}%` }} />
            </div>
          </div>
        ) : (
          <div className="intro__actions">
            <button type="button" className="ghost-btn" onClick={() => setClosing(true)}>
              {UI.enter[lang]}
            </button>
            <button type="button" className="text-btn" onClick={() => setClosing(true)}>
              {UI.skip[lang]}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
