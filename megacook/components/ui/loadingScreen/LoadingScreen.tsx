import { View, Text, StyleSheet, ActivityIndicator } from "react-native";

export const LoadingScreen = () => {
  return (
    <View style={[styles.container, styles.loadingContainer]}>
      <ActivityIndicator size="large" color="#55256D" />
      <Text style={styles.loadingText}>Chargement des modèles 3D...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: "#666",
  },
});
