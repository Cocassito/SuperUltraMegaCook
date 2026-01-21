import { useRouter } from "expo-router";
import PixelButton from "./PixelButtonComponent";

type LoadGameButtonProps = {
  onOpen: () => void;
};

export default function LoadGameButton({ onOpen }: LoadGameButtonProps) {
  return (
    <PixelButton
      onPress={onOpen}
      title="Charger la partie"
      colorPrimary="#C8A2DA"
      colorSecondary="#773B94"
      colorBorder="#55256D"
      colorInnerShadow="#E9DAF0"
    />
  );
}
