import PixelButton from "./PixelButtonComponent";

type ResetButtonProps = {};

export const ResetButton = ({}: ResetButtonProps) => {
  return (
    <PixelButton
      title="Réinitialiser"
      colorPrimary="#C8A2DA"
      colorSecondary="#773B94"
      colorBorder="#55256D"
      colorInnerShadow="#E9DAF0"
    />
  );
};
