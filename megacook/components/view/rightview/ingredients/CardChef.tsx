import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ImageSourcePropType,
} from "react-native";
import Star from "@/components/svg/Star";

export type ChefPoint = string;

interface CardChefProps {
  name: string;
  image: ImageSourcePropType; // ← ici
  rating: number;
  strengths: ChefPoint[];
  weaknesses: ChefPoint[];
}

const CardChef: React.FC<CardChefProps> = ({
  name,
  image,
  rating,
  strengths,
  weaknesses,
}) => {
  return (
    <View style={styles.card}>
      <Image source={image} style={styles.image} />

      <View style={styles.content}>
        <Text style={styles.name}>{name.toUpperCase()}</Text>

        <View style={styles.stars}>
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              width={20}
              height={20}
              style={[
                styles.icon,
                i < rating ? styles.iconActive : styles.iconInactive,
              ]}
            />
          ))}
        </View>

        <View style={styles.columns}>
          <View style={styles.column}>
            <Text style={styles.title}>Points forts</Text>
            {strengths.map((point, index) => (
              <Text key={index} style={styles.text}>
                • {point}
              </Text>
            ))}
          </View>

          <View style={styles.column}>
            <Text style={styles.title}>Points faibles</Text>
            {weaknesses.map((point, index) => (
              <Text key={index} style={styles.text}>
                • {point}
              </Text>
            ))}
          </View>
        </View>
      </View>
    </View>
  );
};

export default CardChef;

const styles = StyleSheet.create({
  card: {
    width: 320,
    borderRadius: 20,
    backgroundColor: "#E9D5FF",
    overflow: "hidden",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    elevation: 8,
  },
  image: {
    width: "100%",
    height: 220,
    resizeMode: "cover",
  },
  content: {
    padding: 16,
    backgroundColor: "#F5E9FF",
  },
  name: {
    fontSize: 20,
    fontWeight: "800",
    textAlign: "center",
    marginBottom: 8,
    letterSpacing: 1,
  },
  stars: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 12,
  },
  star: {
    fontSize: 20,
    color: "#FACC15",
    marginHorizontal: 2,
  },
  columns: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  column: {
    flex: 1,
  },
  title: {
    fontWeight: "700",
    marginBottom: 4,
  },
  text: {
    fontSize: 13,
    marginBottom: 2,
  },

  icon: {
    marginHorizontal: 3,
  },
  iconActive: {
    opacity: 1,
  },
  iconInactive: {
    opacity: 0.3,
  },
});
