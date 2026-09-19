import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Scene } from "@/components/scene/Scene";
import { Header } from "@/components/ui/Header";
import { Intro } from "@/components/ui/Intro";
import { InfoPanel } from "@/components/ui/InfoPanel";
import { TimeController } from "@/components/ui/TimeController";
import { ExperienceControls } from "@/components/ui/ExperienceControls";
import { ExplorePanel } from "@/components/ui/ExplorePanel";
import { CameraPanel } from "@/components/ui/CameraPanel";
import { AboutOverlay, CinematicExit, HelpOverlay } from "@/components/ui/Overlays";
import { useExperience } from "@/store/experienceStore";
import { HERO_VIEW, HOTSPOTS, SOCIAL_VIEWS, UI, type Lang, type TimeKey } from "@/data/content";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Naqsh-e Jahan — Interactive 3D Square | نقش‌جهان" },
      {
        name: "description",
        content:
          "Explore Naqsh-e Jahan Square in Isfahan through an interactive 3D reconstruction of Ali Qapu, Imam Mosque, Sheikh Lotfollah Mosque and Qeysarieh Bazaar.",
      },
      { property: "og:title", content: "Naqsh-e Jahan — Interactive 3D Reconstruction" },
      {
        property: "og:description",
        content:
          "A cinematic bilingual reconstruction of Naqsh-e Jahan Square and its four Safavid landmarks, from daylight to night.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Experience,
});

function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const on = () => setReduced(mq.matches);
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);
  return reduced;
}

function Experience() {
  const reducedMotion = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const [progress, setProgress] = useState(8);

  const lang = useExperience((s) => s.lang);
  const timeOfDay = useExperience((s) => s.timeOfDay);
  const perfMode = useExperience((s) => s.perfMode);
  const cinematic = useExperience((s) => s.cinematic);
  const introDone = useExperience((s) => s.introDone);
  const activeHotspot = useExperience((s) => s.activeHotspot);
  const focus = useExperience((s) => s.focus);
  const resetCamera = useExperience((s) => s.resetCamera);
  const closePanel = useExperience((s) => s.closePanel);
  const finishIntro = useExperience((s) => s.finishIntro);

  useEffect(() => setMounted(true), []);

  // Read shareable state from the URL once on mount.
  useEffect(() => {
    const p = new URLSearchParams(window.location.search);
    const store = useExperience.getState();
    const l = p.get("lang");
    if (l === "fa" || l === "en") store.setLang(l);
    const view = p.get("view") as TimeKey | null;
    if (view && view in SOCIAL_VIEWS) store.setTimeOfDay(view);
    const spot = HOTSPOTS.find((h) => h.id === p.get("spot"));
    if (spot) store.focus(spot.view, spot.id);
  }, []);

  // Keep the URL in sync so a view can be shared.
  useEffect(() => {
    const p = new URLSearchParams();
    p.set("lang", lang);
    p.set("view", timeOfDay);
    if (activeHotspot) p.set("spot", activeHotspot);
    window.history.replaceState(null, "", `?${p.toString()}`);
  }, [lang, timeOfDay, activeHotspot]);

  // Fake-but-honest progress while the renderer warms up.
  useEffect(() => {
    if (ready) {
      setProgress(100);
      return;
    }
    const id = setInterval(() => setProgress((v) => Math.min(92, v + Math.random() * 12)), 180);
    return () => clearInterval(id);
  }, [ready]);

  // Cinematic reveal: glide from the far atmospheric view to the hero angle.
  useEffect(() => {
    if (!ready) return;
    if (useExperience.getState().activeHotspot) return;
    const t = setTimeout(() => focus(HERO_VIEW), reducedMotion ? 0 : 400);
    return () => clearTimeout(t);
  }, [ready, focus, reducedMotion]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (useExperience.getState().cinematic) useExperience.getState().toggle("cinematic", false);
        else closePanel();
      }
      if (e.key.toLowerCase() === "h") resetCamera();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [closePanel, resetCamera]);

  const onCapture = useCallback(() => {
    const canvas = document.querySelector("canvas");
    if (!canvas) return;
    const a = document.createElement("a");
    a.href = canvas.toDataURL("image/png");
    a.download = `ali-qapu-${timeOfDay}.png`;
    a.click();
  }, [timeOfDay]);

  const dir = lang === "fa" ? "rtl" : "ltr";
  const hideUi = useMemo(() => cinematic || !introDone, [cinematic, introDone]);

  return (
    <main className="experience" dir={dir} lang={lang} data-lang={lang}>
      {mounted && !failed && (
        <Scene
          lang={lang}
          timeOfDay={timeOfDay}
          perfMode={perfMode}
          cinematic={cinematic}
          reducedMotion={reducedMotion}
          onReady={() => setReady(true)}
          onError={() => setFailed(true)}
        />
      )}

      {failed && <Fallback lang={lang} onRetry={() => window.location.reload()} />}

      <div className="vignette" aria-hidden />

      {!introDone && !failed && (
        <Intro
          lang={lang}
          ready={ready}
          progress={progress}
          reducedMotion={reducedMotion}
          onDone={finishIntro}
        />
      )}

      {!failed && (
        <>
          <Header lang={lang} hidden={hideUi} />
          <TimeController lang={lang} hidden={hideUi} />
          <ExperienceControls lang={lang} hidden={hideUi} onCapture={onCapture} />
          <InfoPanel lang={lang} />
          <HelpOverlay lang={lang} />
          <AboutOverlay lang={lang} />
          <CinematicExit lang={lang} />
        </>
      )}
    </main>
  );
}

function Fallback({ lang, onRetry }: { lang: Lang; onRetry: () => void }) {
  return (
    <div className="ui-layer fallback">
      <div className="modal">
        <h2>{UI.brand[lang]}</h2>
        <p className="info-panel__body">{UI.webglError[lang]}</p>
        <p className="info-panel__body">{UI.aboutBody[lang]}</p>
        <button type="button" className="ghost-btn" onClick={onRetry}>
          {UI.retry[lang]}
        </button>
      </div>
    </div>
  );
}
