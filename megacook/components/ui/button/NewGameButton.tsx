import { useRouter } from "expo-router";
import PixelButton from "./PixelButtonComponent";
import { useMusicSound } from "@/hooks/useButtonSound";

export default function NewGameButton() {
  const router = useRouter();
  const playMusic = useMusicSound();

  return (
    <PixelButton 
      onPress={() => {
        playMusic();
        router.push("/App");
      }}
      title="Nouvelle partie"
      colorPrimary="#C8A2DA"
      colorSecondary="#773B94"
      colorBorder="#55256D"
      colorInnerShadow="#E9DAF0"
    />
  );
}
