import { TouchableOpacity, Text, StyleSheet } from "react-native";

interface NavigationButtonsProps {
  prevView: () => void;
  nextView: () => void;
}

export const NavigationButtons = ({ prevView, nextView }: NavigationButtonsProps) => {
  return (
    <>
      <TouchableOpacity style={styles.arrowLeft} onPress={prevView}>
        <Text style={styles.arrowText}>←</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.arrowRight} onPress={nextView}>
        <Text style={styles.arrowText}>→</Text>
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  arrowText: {
    color: '#55256D',
    fontSize: 28,
    fontWeight: 'bold',
  },
  arrowLeft: {
    position: 'absolute',
    left: 12,
    top: '50%',
    marginTop: -24,
    backgroundColor: '#FFF2DD',
    borderRadius: 24,
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 30,
  },
  arrowRight: {
    position: 'absolute',
    right: 12,
    top: '50%',
    marginTop: -24,
    backgroundColor: '#FFF2DD',
    borderRadius: 24,
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 30,
  },
});
