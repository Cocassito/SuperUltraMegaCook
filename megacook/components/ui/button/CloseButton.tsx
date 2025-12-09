import { useRouter } from "expo-router";
import PixelButton from "./PixelButtonComponent";
import CloseIcon from "@/components/svg/CloseIcon";

type CloseButtonProps = {
  onClose: () => void;
};

export const CloseButton = ({ onClose }: CloseButtonProps) => {
  return (
    <PixelButton
      onPress={onClose}
      icon={<CloseIcon />}
      colorPrimary="#E23A3A"
      colorSecondary="#B72A2A"
      colorBorder="#9C1111"
      colorInnerShadow="#F45C5C"
    />
  );
};
