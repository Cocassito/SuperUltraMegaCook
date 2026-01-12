import { TouchableOpacity, Text, StyleSheet, View } from "react-native";
import PixelButton from "./PixelButtonComponent";
import ArrowLeft from "@/components/svg/ArrowLeft";
import ArrowRight from "@/components/svg/ArrowRight";

interface NavigationButtonsProps {
  prevView: () => void;
  nextView: () => void;
  bottomView: () => void;
  bottomRightView: () => void;
  bottomLeftView: () => void;
  topView: () => void;
  backView: () => void;
  currentView?: number;
}

export const NavigationButtons = ({
  prevView,
  nextView,
  bottomView,
  bottomRightView,
  bottomLeftView,
  topView,
  currentView,
}: NavigationButtonsProps) => {
  return (
    <>
      {currentView === 3 || currentView === 5 ? (
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
        </>
      ) : (
        // Vues normales : ← → et ↓ selon la vue
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
          {/* {currentView === 0 && (
            <TouchableOpacity style={styles.arrowBottom} onPress={bottomView}>
              <Text style={styles.arrowText}>↓</Text>
            </TouchableOpacity>
          )}
          {currentView === 1 && (
            <TouchableOpacity style={styles.arrowBottom} onPress={bottomRightView}>
              <Text style={styles.arrowText}>↓</Text>
            </TouchableOpacity>
          )}
          {currentView === 2 && (
            <TouchableOpacity style={styles.arrowBottom} onPress={bottomLeftView}>
              <Text style={styles.arrowText}>↓</Text>
            </TouchableOpacity> */}
        </>
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
  // arrowTop: {
  //   position: "absolute",
  //   right: "50%",
  //   top: 12,
  //   marginRight: -24,
  //   backgroundColor: "#FFF2DD",
  //   borderRadius: 24,
  //   width: 48,
  //   height: 48,
  //   alignItems: "center",
  //   justifyContent: "center",
  //   zIndex: 9999,
  //   elevation: 10,
  // },
  // arrowBottom: {
  //   position: "absolute",
  //   right: "50%",
  //   bottom: 12,
  //   marginRight: -24,
  //   backgroundColor: "#FFF2DD",
  //   borderRadius: 24,
  //   width: 48,
  //   height: 48,
  //   alignItems: "center",
  //   justifyContent: "center",
  //   zIndex: 9999,
  //   elevation: 10,
  // },
});
