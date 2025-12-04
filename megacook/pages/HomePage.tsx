import { View, StyleSheet } from "react-native";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import PixelButton from "@/components/ui/button/PixelButton";

export default function HomePage() {
  const router = useRouter();
  const handleStart = () => {
    router.push("/App");
  };

  return (
    <>
      <View style={styles.container}>
        <Image
          source={require("../assets/images/logo/Logo_MC_Complet.webp")}
          style={styles.logo}
          contentFit="contain"
        />
        <PixelButton
          onPress={handleStart}
          title="START"
          colorPrimary="#C8A2DA"
          colorSecondary="#773B94"
          colorBorder="#55256D"
          colorInnerShadow="#E9DAF0"
        />
      </View>
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFF2DD",
    gap: 4,
  },
  logo: {
    width: 200,
    height: 200,
  },
});
