import { View, Text, StyleSheet, Pressable, Image } from "react-native";
import Animated from "react-native-reanimated";
import { useEffect } from "react";
import CloseIcon from "@/components/svg/CloseIcon";
import PixelButton from "@/components/ui/button/PixelButtonComponent";
import { useScaleAnimation } from "@/hooks/useScaleAnimation";
import { useAlertSound } from "@/hooks/useButtonSound";

export type BurnedSalmonAlertProps = {
  onClose: () => void;
};

export function BurnedSalmonAlert({ onClose }: BurnedSalmonAlertProps) {
  const { animatedStyle, handleClose } = useScaleAnimation(onClose);
  const playAlertSound = useAlertSound();

  useEffect(() => {
    playAlertSound();
  }, [playAlertSound]);

  return (
    <View style={styles.overlay}>
      <Pressable style={StyleSheet.absoluteFill} onPress={handleClose} />
      <Animated.View style={[styles.card, animatedStyle]}>
        <View style={styles.closeButton}>
          <PixelButton
            icon={<CloseIcon />}
            colorPrimary="#E23A3A"
            colorSecondary="#B72A2A"
            colorBorder="#9C1111"
            colorInnerShadow="#f45cbfff"
            onPress={handleClose}
          />
        </View>
        <View style={styles.container}>

          <View style={styles.imageWrapper}>
            <Image
              source={require("../../../assets/images/autres/salmonalert.png")}
              style={styles.illustration}
              resizeMode="contain"
            />
          </View>

          <View style={styles.contentSection}>
            <Text style={styles.lead}>Oooh non...</Text>
            <Text style={styles.text}>Le saumon a décidé de devenir bien croustillant... un peu trop.</Text>
            <Text style={styles.text}>
              Il a cramé, ça n'arrive pas souvent, mais pour ne pas perdre de temps on va devoir composer avec.
              Je suis sûr que le client ne le remarquera même pas...
            </Text>
          </View>
        </View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 12,
    backgroundColor: "rgba(0,0,0,0.60)",
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    width: 540,
    backgroundColor: "#FFF2DD",
    borderColor: "#000",
    borderWidth: 2,
    overflow: "hidden",
    elevation: 12,
    position: "relative",
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 20,
    zIndex: 2,
    transform: [{ scale: 0.7 }],
  },
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    gap: 18,
  },
  contentSection: {
    flex: 1,
  },
  lead: {
    fontSize: 24,
    fontWeight: "bold",
    fontFamily: "pixelgridtrial-linedownbolds",
  },
  text: {
    fontSize: 12,
    fontFamily: "pixelgridtrial-linedownbolds",
  },
  imageWrapper: {
    width: 140,
    alignItems: "center",
  },
  illustration: {
    width: 140,
    height: 140,
  },
});
