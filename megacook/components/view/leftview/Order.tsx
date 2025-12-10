import { CloseButton } from "@/components/ui/button/CloseButton";
import { Text, View, Image, StyleSheet, Pressable } from "react-native";
import DashLine from "@/components/svg/DashLine";
 
type OrderProps = {
  onClose: () => void;
};

export const Order = ({ onClose }: OrderProps) => {
  return (
    <Pressable style={styles.orderOverlay} onPress={onClose}>
      <View style={styles.orderCard}>
        <View style={styles.closeButtonWrapper}>
          <CloseButton onClose={onClose} />
        </View>
        <View style={styles.container}>
          <View style={styles.titleSection}>
            <DashLine />
            <Text style={styles.title}>Commande</Text>
            <DashLine />
          </View>
          <View style={styles.contentSection}>
            <Text style={styles.sectionLabel}>Demande Client</Text>
            <Text style={styles.clientRequest}>"Je voudrais un plat qui me court après la nuit."</Text>
          </View>
          <DashLine />
          <View style={styles.barcodeSection}>
            <Image
              source={require("../../../assets/images/autres/codebarre.png")}
              style={styles.barcode}
            />
          </View>
        </View>
      </View>
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
    width: 320,
    height: 350,
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
    padding: 30,
  },
  titleSection: {
    width: "100%",
    alignItems: "center",
    marginBottom: 16,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#000",
    textAlign: "center",
    marginVertical: 8,
  },
  sectionLabel: {
    fontSize: 24,
    fontWeight: "600",
    marginBottom: 8,
  },
  contentSection: {
    marginBottom: 16,
  },
  clientRequest: {
    fontSize: 24,
    fontStyle: "italic",
  },
  barcodeSection: {
    alignItems: "center",
    marginTop: 16,
  },
  barcode: {
    width: 250,
    height: 40,
    resizeMode: "contain",
  },
  closeButtonWrapper: {
    position: "absolute",
    top: 8,
    right: 8,
  },
});
