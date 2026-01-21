import { CloseButton } from "@/components/ui/button/CloseButton";
import { Text, View, Image, StyleSheet, Pressable } from "react-native";
import DashLine from "@/components/svg/DashLine";
import ordersData, { OrderType } from "@/data/ordersData";
import Animated from "react-native-reanimated";
import { useCardAnimation } from "@/hooks/useCardAnimation";

type OrderProps = {
  onClose: () => void;
  orderType: OrderType;
};

export const Order = ({ onClose, orderType }: OrderProps) => {
  const order = ordersData[orderType];
  const { animatedStyle, handleClose } = useCardAnimation(onClose);

  return (
    <View style={styles.orderOverlay}>
      <Pressable style={StyleSheet.absoluteFill} onPress={handleClose} />
      <Animated.View style={[styles.orderCard, animatedStyle]}>
        <View style={styles.container}>
          <View style={styles.titleSection}>
            <DashLine />
            <Text style={styles.title}>Commande</Text>
            <DashLine />
          </View>
          <View style={styles.contentSection}>
            <Text style={styles.sectionLabel}>Demande Client</Text>
            <Text style={styles.clientRequest}>"{order.clientRequest}"</Text>
          </View>
          <DashLine />
          <View style={{ marginTop: 16 }}>
            <Image
              source={require("../../../assets/images/autres/codebarre.png")}
              style={styles.barcode}
              resizeMode="contain"
            />
          </View>
        </View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  orderOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 2,
    backgroundColor: "rgba(0,0,0,0.60)",
    alignItems: "center",
    justifyContent: "center",
  },
  orderCard: {
    width: 220,
    height: 240,
    backgroundColor: "#fff",
    borderColor: "#000",
    borderWidth: 2,
    overflow: "hidden",
    elevation: 12,
  },
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#ffffffff",
    padding: 15,
  },
  titleSection: {
    width: "100%",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#260100",
    textAlign: "center",
    marginVertical: 10,
    fontFamily: "pixelgridtrial-linedownboldm",
  },
  sectionLabel: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 8,
    fontFamily: "pixelgridtrial-linedownbolds",
  },
  contentSection: {
    marginVertical: 16,
  },
  clientRequest: {
    fontSize: 14,
    fontStyle: "italic",
    fontFamily: "pixelgridtrial-linedownbolds",
  },
  barcode: {
    width: 160,
    height: 25,
  },
});
