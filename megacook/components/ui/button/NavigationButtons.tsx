import { TouchableOpacity, Text, StyleSheet, View } from "react-native";
import { useState, useEffect } from "react";
import PixelButton from "./PixelButtonComponent";
import { WarningButton } from "./WarningButton";
import { useWarningSound } from "@/hooks/useButtonSound";
import ArrowLeft from "@/components/svg/ArrowLeft";
import ArrowRight from "@/components/svg/ArrowRight";
import { LeftInfo } from "../../LeftInfo";
import { RightInfo } from "../../RightInfo";

interface NavigationButtonsProps {
  prevView: () => void;
  nextView: () => void;
  currentView?: number;
  onWarningLeftPress?: () => void;
  onWarningRightPress?: () => void;
  hasOpenedOrder?: boolean;
  allValidated?: boolean;
}

export const NavigationButtons = ({
  prevView,
  nextView,
  currentView,
  onWarningLeftPress,
  onWarningRightPress,
  hasOpenedOrder = false,
  allValidated = false,
}: NavigationButtonsProps) => {
  const [showWarnings, setShowWarnings] = useState(false);

  // Délai de 5 secondes pour afficher les warnings
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowWarnings(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  // Logique pour afficher les warning buttons selon la vue et l'état
  let showWarningLeft = false;
  let showWarningRight = false;

  // Ne plus afficher les warnings si tous les aliments sont validés
  if (allValidated) {
    showWarningLeft = false;
    showWarningRight = false;
  } else if (!hasOpenedOrder) {
    if (currentView === 0) {
      showWarningLeft = showWarnings;
    } else if (currentView === 6) {
      showWarningRight = showWarnings;
    } else if (currentView === 1) {
      showWarningLeft = showWarnings;
    }
  } else {
    // Après avoir ouvert l'ordre : warning droite pour aller à RightView
    if (currentView === 0 || currentView === 2) {
      showWarningRight = true;
    } else if (currentView === 6) {
      showWarningLeft = true;
    }
  }

  return (
    <>
      <View style={styles.arrowLeft}>
        <PixelButton
          icon={<ArrowLeft />}
          colorPrimary="#C8A2DA"
          colorSecondary="#773B94"
          colorBorder="#55256D"
          colorInnerShadow="#E9DAF0"
          onPress={prevView}
        />
      </View>

      <View style={styles.arrowRight}>
        <PixelButton
          icon={<ArrowRight />}
          colorPrimary="#C8A2DA"
          colorSecondary="#773B94"
          colorBorder="#55256D"
          colorInnerShadow="#E9DAF0"
          onPress={nextView}
        />
      </View>

      {showWarningLeft && (
        <View style={styles.warningLeft}>
          <LeftInfo />
        </View>
      )}

      {showWarningRight && (
        <View style={styles.warningRight}>
          <RightInfo />
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  arrowText: {
    color: "#55256D",
    fontSize: 28,
    fontWeight: "bold",
  },
  arrowLeft: {
    position: "absolute",
    left: 46,
    bottom: 40,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 9999,
    elevation: 10,
  },
  arrowRight: {
    position: "absolute",
    right: 46,
    bottom: 40,
    backgroundColor: "#FFF2DD",
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 9999,
    elevation: 10,
  },
  warningLeft: {
    position: "absolute",
    left: 46,
    top: "50%",
    zIndex: 9999,
    elevation: 10,
  },
  warningRight: {
    position: "absolute",
    right: 46,
    top: "50%",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 9999,
    elevation: 10,
  },
});
