import { useState } from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

interface NavigationButtonsProps {
  prevView: () => void;
  nextView: () => void;
  bottomView: () => void;
  bottomRightView: () => void;
  bottomLeftView: () => void;
  topView: () => void;
  backView: () => void;
  currentView?: number;
}

export const NavigationButtons = ({ prevView, nextView, bottomView, bottomRightView, bottomLeftView, topView, currentView }: NavigationButtonsProps) => {
  return (
    <>
      {currentView === 3 || currentView === 4 || currentView === 5 ? (
        // Si on est en bottom view, afficher seulement ↑
        <TouchableOpacity style={styles.arrowTop} onPress={topView}>
          <Text style={styles.arrowText}>↑</Text>
        </TouchableOpacity>
      ) : currentView === 6 ? (
        // Si on est en back view, afficher seulement ← →
        <>
          <TouchableOpacity style={styles.arrowLeft} onPress={prevView}>
            <Text style={styles.arrowText}>←</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.arrowRight} onPress={nextView}>
            <Text style={styles.arrowText}>→</Text>
          </TouchableOpacity>
        </>
      ) : (
        // Vues normales : ← → et ↓ selon la vue
        <>
          <TouchableOpacity style={styles.arrowLeft} onPress={prevView}>
            <Text style={styles.arrowText}>←</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.arrowRight} onPress={nextView}>
            <Text style={styles.arrowText}>→</Text>
          </TouchableOpacity>
          {currentView === 0 && (
            <TouchableOpacity style={styles.arrowBottom} onPress={bottomView}>
              <Text style={styles.arrowText}>↓</Text>
            </TouchableOpacity>
          )}
          {currentView === 1 && (
            <TouchableOpacity style={styles.arrowBottom} onPress={bottomRightView}>
              <Text style={styles.arrowText}>↓</Text>
            </TouchableOpacity>
          )}
          {currentView === 2 && (
            <TouchableOpacity style={styles.arrowBottom} onPress={bottomLeftView}>
              <Text style={styles.arrowText}>↓</Text>
            </TouchableOpacity>
          )}
        </>
      )}
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
    zIndex: 9999,
    elevation: 10,
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
    zIndex: 9999,
    elevation: 10,
  },
  arrowTop: {
    position: 'absolute',
    right: '50%',
    top: 12,
    marginRight: -24,
    backgroundColor: '#FFF2DD',
    borderRadius: 24,
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 9999,
    elevation: 10,
  },
  arrowBottom: {
    position: 'absolute',
    right: '50%', 
    bottom: 12,
    marginRight: -24,
    backgroundColor: '#FFF2DD',
    borderRadius: 24,
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 9999,
    elevation: 10,
  },
});
