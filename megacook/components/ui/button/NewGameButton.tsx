import { useRouter } from "expo-router";
import { useButtonSound } from "@/hooks/useButtonSound";
import PixelButton from "./PixelButtonComponent";

export default function NewGameButton() {
  const router = useRouter();
  const playButtonSound = useButtonSound();

  const handlePress = async () => {
    await playButtonSound();
    router.push("/App");
  };

  return (
    <PixelButton
      onPress={handlePress}
      title="Nouvelle partie"
      colorPrimary="#C8A2DA"
      colorSecondary="#773B94"
      colorBorder="#55256D"
      colorInnerShadow="#E9DAF0"
    />
  );
}
