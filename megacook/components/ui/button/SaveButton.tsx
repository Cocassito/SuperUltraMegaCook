import PixelButton from "./PixelButtonComponent";

type SaveButtonProps = {};

export const SaveButton = ({}: SaveButtonProps) => {
  return (
    <PixelButton
      title="Sauvegarder"
      colorPrimary="#C8A2DA"
      colorSecondary="#773B94"
      colorBorder="#55256D"
      colorInnerShadow="#E9DAF0"
    />
  );
};
