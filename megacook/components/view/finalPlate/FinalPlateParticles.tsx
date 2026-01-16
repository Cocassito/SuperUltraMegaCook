import { Sparkles } from "@react-three/drei";

interface FinalPlateParticlesProps {
  count?: number;
  radius?: number;
  speed?: number;
  size?: number;
  color?: string;
}

// Particules Sparkles prêtes à l'emploi
export const FinalPlateParticles = ({
  count = 300,
  radius = 20,
  speed = 0.4,
  size = 6,
  color = "#FFD084",
}: FinalPlateParticlesProps) => {
  return (
    <Sparkles
      count={count}
      speed={speed}
      size={size}
      color={color}
      scale={[radius, radius, radius]}
    />
  );
};
