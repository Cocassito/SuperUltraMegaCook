import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

export default function Menu() {
  const router = useRouter();

  const handleStart = () => {
    router.push('/interface');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Megacook</Text>
      <TouchableOpacity style={styles.button} onPress={handleStart}>
        <Text>Commencer</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF2DD',
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    marginBottom: 40,
  },
  button: {
    backgroundColor: '#C8A2DA',
    color: '#55256D',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
    fontSize: 20,
    textAlign: 'center',
  },
});
