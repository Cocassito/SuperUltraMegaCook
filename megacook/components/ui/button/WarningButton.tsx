import Warning from "@/components/svg/Warning";
import PixelButton from "./PixelButtonComponent";

type WarningButtonProps = {
  onClose: () => void;
};

export const CloseButton = ({ onClose }: WarningButtonProps) => {
  return (
    <PixelButton
      onPress={onClose}
      icon={<Warning />}
      colorPrimary="#E23A3A"
      colorSecondary="#B72A2A"
      colorBorder="#9C1111"
      colorInnerShadow="#f45cbfff"
    />
  );
};
