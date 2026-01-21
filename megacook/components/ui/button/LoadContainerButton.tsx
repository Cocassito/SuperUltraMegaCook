import { View, Text, StyleSheet } from "react-native";

import Star from "@/components/svg/Star";

interface LoadContainerButtonProps {
  rating: number;
  title: string;
  date: string;
}

export const LoadContainerButton = ({
  rating,
  title,
  date,
}: LoadContainerButtonProps) => {
  return (
    <>
      <View style={styles.bloc}>
        <Text style={styles.textMain}>{title}</Text>
        <Text style={styles.text}>Dernière sauvegarde : {date}</Text>
        <View style={styles.starsContainer}>
          <Text style={styles.text}>Note :</Text>
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
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  bloc: {
    padding: 12,
    width: "100%",
    backgroundColor: "#FFF2DD",
    borderWidth: 2,
    borderColor: "#B7927D",
    borderRadius: 8,
    gap: 8,
  },

  textMain: {
    fontSize: 20,
    color: "#260100",
    fontFamily: "pixelgridtrial-linedownboldm",
  },

  text: {
    fontSize: 10,
    color: "#260100",
    fontFamily: "pixelgridtrial-linedownboldm",
  },

  starsContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },

  stars: {
    flexDirection: "row",
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
