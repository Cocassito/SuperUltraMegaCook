import { useRouter } from "expo-router";
import PixelButton from "./PixelButtonComponent";
import SettingsIcon from "@/components/svg/SettingsIcon";

type CloseButtonProps = {
  onClose: () => void;
};
export const CloseButton = ({ onClose }: CloseButtonProps) => {
  return (
    <PixelButton
      onPress={onClose}
      icon={<SettingsIcon />}
      colorPrimary="#C8A2DA"
      colorSecondary="#773B94"
      colorBorder="#55256D"
      colorInnerShadow="#E9DAF0"
    />
  );
};
