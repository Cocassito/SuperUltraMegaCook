import { CloseButton } from "@/components/ui/button/CloseButton";
import { Text, View, Image, StyleSheet, Pressable } from "react-native";

type OrderProps = {
  onClose: () => void;
};

export const Order = ({ onClose }: OrderProps) => {
  return (
    <Pressable
      style={styles.orderOverlay}
      onPress={onClose}
    >
      <Pressable
        style={styles.orderCard}
        onPress={(e) => e.stopPropagation()}
      >
        <View style={styles.closeButtonWrapper}>
          <CloseButton onClose={onClose} />
        </View>
        <View style={styles.container}>
          <Text>Order Component</Text>
          <View>
            <Text>Demande Client</Text>
            <Text>"Je voudrais un plat qui me court après la nuit."</Text>
          </View>
          <Image
            source={require("../../../assets/images/codebarre.png")}
            style={{ width: 100, height: 20 }}
          />
        </View>
      </Pressable>
    </Pressable>
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
    backgroundColor: "rgba(0,0,0,0.45)",
    alignItems: "center",
    justifyContent: "center",
  },
  orderCard: {
    width: 420,
    height: 420,
    backgroundColor: "#fff",
    borderRadius: 16,
    overflow: "hidden",
    elevation: 12,
  },
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ffffffff",
    padding: 20,
  },
  closeButtonWrapper: {
    position: "absolute",
    top: 8,
    right: 8,
    backgroundColor: '#ff00ff',
  },
});
