import { useRouter } from "expo-router";
import PixelButton from "./PixelButtonComponent";
import SettingsIcon from "@/components/svg/SettingsIcon";

export default function SettingsButton() {
  return (
    <PixelButton
      icon={<SettingsIcon />}
      colorPrimary="#C8A2DA"
      colorSecondary="#773B94"
      colorBorder="#55256D"
      colorInnerShadow="#E9DAF0"
      useMarginLeft={true}
      useMarginTop={true}
    />
  );
}
