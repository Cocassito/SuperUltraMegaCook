import { CloseButton } from "@/components/ui/button/CloseButton";
import { Text, View, Image, StyleSheet, Pressable } from "react-native";
import DashLine from "@/components/svg/DashLine";
import LineSVG from "@/components/svg/Line";
 
type AverageResultProps = {
  onClose: () => void;
};

type RatingRowProps = {
  label: string;
  value: number;
  stacked?: boolean;
};

const RatingRow = ({ label, value, stacked }: RatingRowProps) => (
  <View style={stacked ? styles.ratingRowStacked : styles.ratingRow}>
    <Text style={styles.text}>{label}</Text>
    <View style={[styles.barContainer, stacked && styles.barContainerFull]}>
      <View style={[styles.barFill, { width: `${(value / 5) * 100}%` }]} />
    </View>
  </View>
);

export const AverageResult = ({ onClose }: AverageResultProps) => {
  return (
    <Pressable style={styles.orderOverlay} onPress={onClose}>
      <View style={styles.orderCard}>
        <View style={styles.container}>

          <View style={styles.titleSection}>

            <DashLine />
            <Text style={styles.title}>Résultats</Text>
            <DashLine />

          </View>

          <View style={styles.contentSection}>
            <Text style={styles.sectionLabel}>Goûts</Text>
            <RatingRow label="Sucré" value={3} />
            <RatingRow label="Sucre" value={3} />
            <RatingRow label="Acidité" value={3} />
            <RatingRow label="Amertume" value={3} />
          </View>

          <LineSVG />

          <View style={styles.contentSection}>
            <Text style={styles.sectionLabel}>Note du client</Text>
            <RatingRow label="Respect de la demande" value={4} stacked />
            <RatingRow label="Originalité" value={3} stacked />
          </View>

          <DashLine />

          {/* <View style={styles.contentSection}>
            <Text style={styles.sectionLabel}>Total</Text>
            <View style={styles.flexSection}>
              <Text style={styles.text}>Prix</Text>
              <Text style={styles.text}>$59.90</Text>
            </View>
          </View> */}

          <View style={{ marginTop: 8 }}>
            <Image
              source={require("../../../assets/images/autres/codebarre.png")}
              style={styles.barcode}
              resizeMode="contain"
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
    backgroundColor: "rgba(0,0,0,0.60)",
    alignItems: "center",
    justifyContent: "center",
  },
  orderCard: {
    width: 220,
    height: 340,
    backgroundColor: "#fff",
    borderColor: "#000",
    borderWidth: 2,
    overflow: "hidden",
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
    color: "#000",
    textAlign: "center",
    marginVertical: 1,
  },
  sectionLabel: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 4,
  },
  contentSection: {
    marginVertical: 8,
    flex: 1,
    width: "100%",
  },
  flexSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  ratingRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  ratingRowStacked: {
    flexDirection: "column",
    gap: 2,
    width: "100%",
  },
  barContainer: {
    width: 90,
    height: 10,
    borderRadius: 4,
    backgroundColor: "#EEE",
    overflow: "hidden",
  },
  barContainerFull: {
    width: "100%",
  },
  barFill: {
    height: "100%",
    backgroundColor: "#000000ff",
  },
  text: {
    fontSize: 14,
  },
  barcode: {
    width: 160,
    height: 25,
  },
});
