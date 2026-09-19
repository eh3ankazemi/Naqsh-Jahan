import { UI, type Lang, type TimeKey } from "@/data/content";
import { useExperience } from "@/store/experienceStore";

const KEYS: TimeKey[] = ["dawn", "day", "sunset", "night"];

export function TimeController({ lang, hidden }: { lang: Lang; hidden: boolean }) {
  const timeOfDay = useExperience((s) => s.timeOfDay);
  const setTimeOfDay = useExperience((s) => s.setTimeOfDay);

  return (
    <div className={`ui-layer time-bar ${hidden ? "ui-hidden" : ""}`} role="group">
      {KEYS.map((k) => (
        <button
          key={k}
          type="button"
          className={`time-bar__btn ${timeOfDay === k ? "is-active" : ""}`}
          onClick={() => setTimeOfDay(k)}
          aria-pressed={timeOfDay === k}
        >
          {UI.time[k][lang]}
        </button>
      ))}
    </div>
  );
}
