import { Html } from "@react-three/drei";
import { LANDMARKS, type Lang } from "@/data/content";
import { useExperience } from "@/store/experienceStore";

export function WorldLabels({ lang, hidden }: { lang: Lang; hidden: boolean }) {
  const labelsOn = useExperience((s) => s.labelsOn);
  if (!labelsOn || hidden) return null;
  return (
    <>
      {LANDMARKS.filter((landmark) => landmark.id !== "full-square").map((landmark) => (
        <Html key={landmark.id} position={landmark.labelAnchor} center distanceFactor={105} zIndexRange={[10, 0]}>
          <div className="world-label">
            <span>{landmark.title.fa}</span>
            <small>{landmark.title.en}</small>
          </div>
        </Html>
      ))}
    </>
  );
}
