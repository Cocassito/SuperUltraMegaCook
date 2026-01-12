import { Text, View, Image, StyleSheet, Pressable } from "react-native";
import DashLine from "@/components/svg/DashLine";
import LineSVG from "@/components/svg/Line";
import { BaseType } from "@/data/basesData";
import { FruitType } from "@/data/fruitsData";
import { SauceType } from "@/data/saucesData";
import { AutreType } from "@/data/autresData";
import ordersData, { OrderType } from "@/data/ordersData";
import { computeIngredientsAverage } from "@/utils/nutrition";
import Animated from "react-native-reanimated";
import { useCardAnimation } from "@/hooks/useCardAnimation";
 
type AverageResultProps = {
  onClose: () => void;
  validatedBase?: BaseType | null;
  validatedFruit?: FruitType | null;
  validatedSauce?: SauceType | null;
  validatedAutre?: AutreType | null;
  orderType: OrderType;
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

export const AverageResult = ({ onClose, validatedBase, validatedFruit, validatedSauce, validatedAutre, orderType }: AverageResultProps) => {
  const { animatedStyle, handleClose } = useCardAnimation(onClose);
  
  const average = computeIngredientsAverage(validatedBase || null, validatedFruit || null, validatedSauce || null, validatedAutre || null) || { sweet: 0, salty: 0, fat: 0, bitter: 0, acidity: 0, spicy: 0, protein: 0 };

  const target = ordersData[orderType]?.nutritional;

  const scoreFor = (value: number, targetValue: number) => {
    const diff = Math.abs(value - targetValue);
    if (diff <= 0.5) return 5;
    if (diff <= 0.75) return 4;
    if (diff <= 1) return 3;
    return 1;
  };

  const respectScore = (() => {
    if (!target) return 0;
    const scores = [
      scoreFor(average.sweet, target.sweet),
      scoreFor(average.salty, target.salty),
      scoreFor(average.acidity, target.acidity),
      scoreFor(average.spicy, target.spicy),
      scoreFor(average.protein, target.protein),
      scoreFor(average.bitter, target.bitter),
      scoreFor(average.fat, target.fat),
    ];
    const sum = scores.reduce((acc, v) => acc + v, 0);
    return sum / scores.length;
  })();

  return (
    <Pressable style={styles.orderOverlay} onPress={handleClose}>
      <Animated.View style={[styles.orderCard, animatedStyle]}>
        <View style={styles.container}>

          <View style={styles.titleSection}>

            <DashLine />
            <Text style={styles.title}>Résultats</Text>
            <DashLine />

          </View>

          <View style={styles.contentSection}>
            <Text style={styles.sectionLabel}>Goûts</Text>
            <RatingRow label="Sucré" value={average.sweet} />
            <RatingRow label="Salé" value={average.salty} />
            <RatingRow label="Acidité" value={average.acidity} />
            <RatingRow label="Épicé" value={average.spicy} />
            <RatingRow label="Protéines" value={average.protein} />
            <RatingRow label="Amer" value={average.bitter} />
            <RatingRow label="Gras" value={average.fat} />
          </View>

          <LineSVG />

          <View style={styles.contentSection}>
            <Text style={styles.sectionLabel}>Note du client</Text>
            <RatingRow label="Respect de la demande" value={respectScore} stacked />
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
      </Animated.View>
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
    height: 370,
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
