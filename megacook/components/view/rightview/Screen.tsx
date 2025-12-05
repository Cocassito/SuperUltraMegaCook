import { Html } from "../../lib/drei/index";
import DOMComponent from "./ScreenContent";
import { BaseType } from "@/data/basesData";

type ScreenProps = {
  selectedBase: BaseType | null;
};

export default function Screen({ selectedBase }: ScreenProps) {
  return (
    <>
      <group position={[10, 3, 0]} rotation={[0, -Math.PI / 4, 0]}>
        <Html transform occlude position={[0, 0, 0.01]} style={htmlStyle}>
          <DOMComponent selectedBase={selectedBase} />
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
