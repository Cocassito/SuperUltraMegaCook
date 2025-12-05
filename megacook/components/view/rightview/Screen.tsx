import { Html } from "../../lib/drei/index";
import { BaseType } from "@/data/basesData";
import ScreenContent from "./ScreenContent";

type ScreenProps = {
  selectedBase: BaseType | null;
  onValidate?: () => void;
};

export default function Screen({ selectedBase, onValidate }: ScreenProps) {
  return (
    <>
      <group position={[10, 3, 0]} rotation={[0, -Math.PI / 4, 0]}>
        <Html transform occlude position={[0, 0, 0.01]} style={htmlStyle}>
          <ScreenContent selectedBase={selectedBase} onValidate={onValidate} />
        </Html>
      </group>
    </>
  );
}

const htmlStyle = {
  width: "400px",
  height: "300px",
  pointerEvents: "auto",
  border: "10px solid #000",
} as const;
