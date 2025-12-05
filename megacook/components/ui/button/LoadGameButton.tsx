import { useRouter } from "expo-router";
import PixelButton from "./PixelButtonComponent";

export default function LoadGameButton() {
  const router = useRouter();

  return (
    <PixelButton
      onPress={() => router.push("/App")}
      title="Charger la partie"
      colorPrimary="#C8A2DA"
      colorSecondary="#773B94"
      colorBorder="#55256D"
      colorInnerShadow="#E9DAF0"
    />
  );
}
